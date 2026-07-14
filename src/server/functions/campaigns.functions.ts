/**
 * campaigns.functions.ts — the org-app campaign engine.
 * Runs in the ORG app (org.calmtree.in).
 *
 * Credit model: RESERVED at launch (one per invitation), REFUNDED at close for
 * invitations that were never completed. Spend is atomic (spend_org_credits
 * locks the org row) so two concurrent launches can't overspend.
 *
 * Privacy model: getCampaignReport returns AGGREGATES only unless the org has
 * paid for individual unlock; and it withholds even the aggregate when the
 * completed group is smaller than the org's min_aggregate_group_size.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireOrgRole } from "../b2b/authz";
import { generateInviteToken, hashInviteToken } from "../b2b/invite-token";
import { getPublicSiteUrl, sendInviteEmail, sendReminderEmail } from "../email/resend";

const DEMO_MAX_INVITES = 100; // guard against blowing the Resend free tier

// ─── createCampaign (draft) ──────────────────────────────────────────────────

export const createCampaign = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      orgId: z.string().uuid(),
      assessmentSlug: z.string().min(1),
      title: z.string().min(1),
      closesAt: z.string().datetime().nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    let ctx;
    try {
      ctx = await requireOrgRole(data.accessToken, data.orgId, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const supabase = getAdminClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .insert({
        org_id: data.orgId,
        assessment_slug: data.assessmentSlug,
        title: data.title,
        status: "draft",
        closes_at: data.closesAt ?? null,
        created_by: ctx.userId,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[createCampaign] error:", error);
      return { error: "Failed to create campaign." };
    }
    return { campaignId: campaign.id as string };
  });

// ─── listCampaigns ───────────────────────────────────────────────────────────

export const listCampaigns = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), orgId: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await requireOrgRole(data.accessToken, data.orgId, "viewer");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const supabase = getAdminClient();
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("id, assessment_slug, title, status, closes_at, launched_at, created_at")
      .eq("org_id", data.orgId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[listCampaigns] error:", error);
      return { error: "Failed to load campaigns." };
    }

    // Attach invited/completed counts per campaign.
    const withCounts = await Promise.all(
      (campaigns ?? []).map(async (c) => {
        const { count: invited } = await supabase
          .from("invitations")
          .select("id", { count: "exact", head: true })
          .eq("campaign_id", c.id);
        const { count: completed } = await supabase
          .from("invitations")
          .select("id", { count: "exact", head: true })
          .eq("campaign_id", c.id)
          .eq("status", "completed");
        return { ...c, invited: invited ?? 0, completed: completed ?? 0 };
      }),
    );

    return { campaigns: withCounts };
  });

// ─── getCampaign (detail + per-invitation status) ────────────────────────────

export const getCampaign = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), campaignId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select(
        "id, org_id, assessment_slug, title, status, closes_at, launched_at, closed_at, created_at",
      )
      .eq("id", data.campaignId)
      .maybeSingle();

    if (error || !campaign) return { error: "Campaign not found." };

    try {
      await requireOrgRole(data.accessToken, campaign.org_id, "viewer");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const { data: invitations } = await supabase
      .from("invitations")
      .select("id, email, status, sent_at, opened_at, completed_at")
      .eq("campaign_id", data.campaignId)
      .order("email");

    return { campaign, invitations: invitations ?? [] };
  });

// ─── launchCampaign (reserve credits + mint invites + send) ──────────────────

export const launchCampaign = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      campaignId: z.string().uuid(),
      emails: z.array(z.string().email()).min(1),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getAdminClient();

    // Load campaign + org name.
    const { data: campaign, error: cErr } = await supabase
      .from("campaigns")
      .select("id, org_id, assessment_slug, title, status, closes_at, organizations(name)")
      .eq("id", data.campaignId)
      .maybeSingle();
    if (cErr || !campaign) return { error: "Campaign not found." };

    let ctx;
    try {
      ctx = await requireOrgRole(data.accessToken, campaign.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    if (campaign.status !== "draft") {
      return { error: "This campaign has already been launched." };
    }

    // Normalise + dedupe emails.
    const emails = Array.from(
      new Set(data.emails.map((e) => e.trim().toLowerCase()).filter(Boolean)),
    );
    if (emails.length === 0) return { error: "No valid email addresses." };
    if (emails.length > DEMO_MAX_INVITES) {
      return { error: `Demo limit is ${DEMO_MAX_INVITES} invites per campaign.` };
    }

    // Reserve credits atomically (raises insufficient_credits if short).
    const { error: spendErr } = await supabase.rpc("spend_org_credits", {
      p_org_id: campaign.org_id,
      p_amount: emails.length,
      p_campaign_id: campaign.id,
      p_created_by: ctx.userId,
    });
    if (spendErr) {
      if (spendErr.message?.includes("insufficient_credits")) {
        const { data: bal } = await supabase.rpc("org_credit_balance", {
          p_org_id: campaign.org_id,
        });
        return {
          error: `Not enough credits. You need ${emails.length} but have ${(bal as number) ?? 0}.`,
        };
      }
      console.error("[launchCampaign] spend error:", spendErr);
      return { error: "Could not reserve credits." };
    }

    // Mint invitations. Keep raw tokens in-memory to build the email links.
    const minted = emails.map((email) => {
      const rawToken = generateInviteToken();
      return { email, rawToken, token_hash: hashInviteToken(rawToken) };
    });

    const { error: insErr } = await supabase.from("invitations").insert(
      minted.map((m) => ({
        campaign_id: campaign.id,
        org_id: campaign.org_id,
        email: m.email,
        token_hash: m.token_hash,
        status: "pending",
      })),
    );
    if (insErr) {
      // Refund the reservation — the launch didn't happen.
      await supabase.from("credit_ledger").insert({
        org_id: campaign.org_id,
        delta: emails.length,
        reason: "adjustment",
        campaign_id: campaign.id,
        note: "Refund — launch failed before invites were created",
        created_by: ctx.userId,
      });
      console.error("[launchCampaign] invitation insert error:", insErr);
      return { error: "Failed to create invitations. Credits were refunded." };
    }

    // Flip to active.
    await supabase
      .from("campaigns")
      .update({ status: "active", launched_at: new Date().toISOString() })
      .eq("id", campaign.id);

    // Send invite emails (best-effort). Mark sent per success.
    const orgName = (campaign.organizations as unknown as { name: string })?.name ?? "Your company";
    const assessmentTitle = campaign.title;
    let emailsSent = 0;
    let emailsSkipped = 0;

    for (const m of minted) {
      const link = `${getPublicSiteUrl()}/a/${m.rawToken}`;
      const result = await sendInviteEmail({
        to: m.email,
        orgName,
        assessmentTitle,
        link,
        closesAt: campaign.closes_at ?? null,
      });
      if (result.ok) {
        emailsSent++;
        await supabase
          .from("invitations")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("campaign_id", campaign.id)
          .eq("token_hash", m.token_hash);
      } else {
        emailsSkipped++;
      }
    }

    return {
      launched: true,
      invited: emails.length,
      emailsSent,
      emailsSkipped,
      // Raw links are returned here (and only here) so the UI can surface them
      // for manual distribution when Resend is not configured or emails are
      // skipped. These are one-time values — they're gone after this response.
      links: minted.map((m) => ({
        email: m.email,
        link: `${getPublicSiteUrl()}/a/${m.rawToken}`,
      })),
    };
  });

// ─── closeCampaign (expire non-completed + refund) ───────────────────────────

export const closeCampaign = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), campaignId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select("id, org_id, status")
      .eq("id", data.campaignId)
      .maybeSingle();
    if (error || !campaign) return { error: "Campaign not found." };

    let ctx;
    try {
      ctx = await requireOrgRole(data.accessToken, campaign.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    if (campaign.status === "closed") return { closed: true, refunded: 0 };

    // Non-completed invitations → expired; their reserved credits are refunded.
    const { data: toExpire } = await supabase
      .from("invitations")
      .select("id")
      .eq("campaign_id", campaign.id)
      .in("status", ["pending", "sent", "opened"]);
    const refund = toExpire?.length ?? 0;

    if (refund > 0) {
      await supabase
        .from("invitations")
        .update({ status: "expired" })
        .eq("campaign_id", campaign.id)
        .in("status", ["pending", "sent", "opened"]);
      await supabase.from("credit_ledger").insert({
        org_id: campaign.org_id,
        delta: refund,
        reason: "expiry_refund",
        campaign_id: campaign.id,
        note: `Refund for ${refund} uncompleted invite(s)`,
        created_by: ctx.userId,
      });
    }

    await supabase
      .from("campaigns")
      .update({ status: "closed", closed_at: new Date().toISOString() })
      .eq("id", campaign.id);

    return { closed: true, refunded: refund };
  });

// ─── sendReminders (best-effort) ─────────────────────────────────────────────

export const sendReminders = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), campaignId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select("id, org_id, title, status, closes_at, organizations(name)")
      .eq("id", data.campaignId)
      .maybeSingle();
    if (error || !campaign) return { error: "Campaign not found." };

    try {
      await requireOrgRole(data.accessToken, campaign.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }
    if (campaign.status !== "active") return { error: "Campaign is not active." };

    // Reminders can't reuse the original token (we only stored its hash), so
    // this re-mints a fresh token for each unfinished invite and updates the row.
    const { data: pending } = await supabase
      .from("invitations")
      .select("id, email, token_hash")
      .eq("campaign_id", campaign.id)
      .in("status", ["pending", "sent", "opened"]);

    const orgName = (campaign.organizations as unknown as { name: string })?.name ?? "Your company";
    let sent = 0;
    for (const inv of pending ?? []) {
      const rawToken = generateInviteToken();
      await supabase
        .from("invitations")
        .update({ token_hash: hashInviteToken(rawToken) })
        .eq("id", inv.id);
      const link = `${getPublicSiteUrl()}/a/${rawToken}`;
      const result = await sendReminderEmail({
        to: inv.email,
        orgName,
        assessmentTitle: campaign.title,
        link,
        closesAt: campaign.closes_at ?? null,
      });
      if (result.ok) sent++;
    }

    return { reminded: sent };
  });

// ─── getInviteLinks (re-mint tokens → raw links, no email) ───────────────────
// Used when Resend is not configured or emails were skipped, so the admin can
// copy-paste links directly to employees. Re-minting invalidates any earlier
// links for the same invitations — that's intentional.

export const getInviteLinks = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), campaignId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();

    const { data: campaign } = await supabase
      .from("campaigns")
      .select("id, org_id, status")
      .eq("id", data.campaignId)
      .maybeSingle();
    if (!campaign) return { error: "Campaign not found." };

    try {
      await requireOrgRole(data.accessToken, campaign.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    if (campaign.status === "closed") {
      return { error: "Campaign is closed — no links to generate." };
    }

    const { data: invitations } = await supabase
      .from("invitations")
      .select("id, email, status")
      .eq("campaign_id", data.campaignId)
      .in("status", ["pending", "sent", "opened"])
      .order("email");

    const links: { email: string; link: string }[] = [];
    for (const inv of invitations ?? []) {
      const rawToken = generateInviteToken();
      await supabase
        .from("invitations")
        .update({ token_hash: hashInviteToken(rawToken) })
        .eq("id", inv.id as string);
      links.push({
        email: inv.email as string,
        link: `${getPublicSiteUrl()}/a/${rawToken}`,
      });
    }

    return { links };
  });

// ─── getCampaignReport (privacy-gated aggregate) ─────────────────────────────

export const getCampaignReport = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), campaignId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select(
        "id, org_id, assessment_slug, title, status, organizations(individual_results_unlocked, min_aggregate_group_size)",
      )
      .eq("id", data.campaignId)
      .maybeSingle();
    if (error || !campaign) return { error: "Campaign not found." };

    try {
      await requireOrgRole(data.accessToken, campaign.org_id, "viewer");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const org = campaign.organizations as unknown as {
      individual_results_unlocked: boolean;
      min_aggregate_group_size: number;
    };
    const unlocked = org?.individual_results_unlocked ?? false;
    const minGroup = org?.min_aggregate_group_size ?? 5;

    // Funnel counts (never individual data — safe to show always).
    const statuses = ["pending", "sent", "opened", "completed", "expired"] as const;
    const funnel: Record<string, number> = {};
    let invited = 0;
    for (const s of statuses) {
      const { count } = await supabase
        .from("invitations")
        .select("id", { count: "exact", head: true })
        .eq("campaign_id", campaign.id)
        .eq("status", s);
      funnel[s] = count ?? 0;
      invited += count ?? 0;
    }
    const completed = funnel["completed"];

    // Privacy floor: below min group size and not unlocked → withhold scores.
    if (completed < minGroup && !unlocked) {
      return {
        campaign: { id: campaign.id, title: campaign.title, slug: campaign.assessment_slug },
        invited,
        funnel,
        aggregateLocked: true,
        minGroupSize: minGroup,
        completed,
      };
    }

    // Load responses and compute the aggregate.
    const { data: responses } = await supabase
      .from("invitation_responses")
      .select("invitation_id, total_score, percentage, primary_label, dimension_scores")
      .eq("campaign_id", campaign.id);

    const rows = responses ?? [];
    const pctValues = rows.map((r) => r.percentage).filter((p): p is number => p != null);
    const avgPercentage =
      pctValues.length > 0
        ? Math.round(pctValues.reduce((a, b) => a + b, 0) / pctValues.length)
        : null;

    const labelDistribution: Record<string, number> = {};
    for (const r of rows) {
      if (r.primary_label)
        labelDistribution[r.primary_label] = (labelDistribution[r.primary_label] ?? 0) + 1;
    }

    // Per-dimension average percentage.
    const dimAgg: Record<string, { label: string; total: number; n: number }> = {};
    for (const r of rows) {
      const dims = r.dimension_scores as Record<
        string,
        { label: string; percentage: number }
      > | null;
      if (!dims) continue;
      for (const [id, d] of Object.entries(dims)) {
        if (!dimAgg[id]) dimAgg[id] = { label: d.label, total: 0, n: 0 };
        dimAgg[id].total += d.percentage;
        dimAgg[id].n += 1;
      }
    }
    const dimensionAverages = Object.entries(dimAgg).map(([id, d]) => ({
      dimensionId: id,
      label: d.label,
      averagePercentage: d.n > 0 ? Math.round(d.total / d.n) : 0,
    }));

    // Individual rows only when the org has paid for unlock.
    let individuals:
      | { email: string; primaryLabel: string | null; percentage: number | null }[]
      | undefined;
    if (unlocked) {
      const { data: joined } = await supabase
        .from("invitation_responses")
        .select("percentage, primary_label, invitations(email)")
        .eq("campaign_id", campaign.id);
      individuals = (joined ?? []).map((j) => ({
        email: (j.invitations as unknown as { email: string })?.email ?? "—",
        primaryLabel: j.primary_label,
        percentage: j.percentage,
      }));
    }

    return {
      campaign: { id: campaign.id, title: campaign.title, slug: campaign.assessment_slug },
      invited,
      funnel,
      aggregateLocked: false,
      completed,
      avgPercentage,
      labelDistribution,
      dimensionAverages,
      individualsUnlocked: unlocked,
      individuals,
    };
  });
