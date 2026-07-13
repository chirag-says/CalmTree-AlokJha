/**
 * invitations.functions.ts — public, TOKEN-authenticated endpoints for the
 * employee assessment runner (calmtree.in/a/:token).
 *
 * These take NO accessToken and NO logged-in user — the employee is anonymous.
 * Authentication is the unguessable invite token itself: we hash the presented
 * token and match it against invitations.token_hash. All access is via the
 * service-role admin client.
 *
 * The invite token is MINTED by the org app at campaign launch; here we only
 * VERIFY it. Employee answers are written to invitation_responses (org-owned),
 * never to assessment_results (user-owned).
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { hashInviteToken } from "../b2b/invite-token";

const DimensionScoreSchema = z.object({
  label: z.string(),
  score: z.number(),
  percentage: z.number(),
});

// ─── getInvitationByToken — resolve a link into what to render ────────────────

export const getInvitationByToken = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const tokenHash = hashInviteToken(data.token);

    const { data: invitation, error } = await supabase
      .from("invitations")
      .select(
        "id, status, campaign_id, campaigns(title, assessment_slug, status, closes_at, organizations(name))",
      )
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (error) {
      console.error("[getInvitationByToken] error:", error);
      return { error: "Something went wrong. Please try again." };
    }
    if (!invitation) return { error: "invalid", message: "This invite link is not valid." };

    const campaign = invitation.campaigns as unknown as {
      title: string;
      assessment_slug: string;
      status: string;
      closes_at: string | null;
      organizations: { name: string } | null;
    };

    if (campaign.status === "closed") {
      return { error: "closed", message: "This assessment is no longer accepting responses." };
    }
    if (campaign.closes_at && new Date(campaign.closes_at) < new Date()) {
      return { error: "expired", message: "This assessment link has expired." };
    }

    // Mark opened on first view (don't overwrite a completed status).
    if (invitation.status === "pending" || invitation.status === "sent") {
      await supabase
        .from("invitations")
        .update({ status: "opened", opened_at: new Date().toISOString() })
        .eq("id", invitation.id);
    }

    return {
      assessmentSlug: campaign.assessment_slug,
      orgName: campaign.organizations?.name ?? "Your company",
      campaignTitle: campaign.title,
      alreadyCompleted: invitation.status === "completed",
      closesAt: campaign.closes_at,
    };
  });

// ─── submitInvitationResponse — persist the employee's scored result ──────────

export const submitInvitationResponse = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1),
      assessmentSlug: z.string(),
      assessmentType: z.enum(["standard", "personality-compass", "profile-based"]),
      totalScore: z.number().optional(),
      percentage: z.number().optional(),
      primaryLabel: z.string(),
      secondaryLabel: z.string().optional(),
      dimensionScores: z.record(DimensionScoreSchema).optional(),
      answers: z.record(z.number()),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const tokenHash = hashInviteToken(data.token);

    const { data: invitation, error } = await supabase
      .from("invitations")
      .select("id, org_id, campaign_id, status, campaigns(status, closes_at)")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (error || !invitation) return { error: "This invite link is not valid." };

    const campaign = invitation.campaigns as unknown as {
      status: string;
      closes_at: string | null;
    };
    if (campaign.status === "closed") return { error: "This assessment is closed." };
    if (campaign.closes_at && new Date(campaign.closes_at) < new Date()) {
      return { error: "This assessment link has expired." };
    }
    if (invitation.status === "completed") {
      return { ok: true, alreadyCompleted: true };
    }

    // Write the response (org-owned). UNIQUE(invitation_id) makes this idempotent.
    const { error: insErr } = await supabase.from("invitation_responses").insert({
      invitation_id: invitation.id,
      campaign_id: invitation.campaign_id,
      org_id: invitation.org_id,
      assessment_slug: data.assessmentSlug,
      assessment_type: data.assessmentType,
      total_score: data.totalScore ?? null,
      percentage: data.percentage ?? null,
      primary_label: data.primaryLabel,
      secondary_label: data.secondaryLabel ?? null,
      dimension_scores: data.dimensionScores ?? null,
      answers: data.answers,
    });

    if (insErr && insErr.code !== "23505") {
      console.error("[submitInvitationResponse] insert error:", insErr);
      return { error: "Could not save your response. Please try again." };
    }

    await supabase
      .from("invitations")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", invitation.id);

    return { ok: true };
  });
