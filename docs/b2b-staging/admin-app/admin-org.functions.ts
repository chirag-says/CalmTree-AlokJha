/**
 * admin-org.functions.ts — platform-staff company management.
 * Runs in the ADMIN app (admin.calmtree.in). Concierge Phase 1: CalmTree staff
 * create company accounts, attach an owner, grant credits after payment lands
 * (invoice / bank transfer), and toggle the individual-results unlock add-on.
 *
 * Requires `isPlatformAdmin` — copy it from the org app's b2b/authz.ts, or
 * inline the profiles.is_admin check. Also needs getAdminClient/requireUser
 * (same helpers the admin app already uses).
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { isPlatformAdmin } from "../b2b/authz";

/** createOrganization — spin up a company account, optionally attach an owner. */
export const createOrganization = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      name: z.string().min(1),
      slug: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, numbers, and hyphens"),
      billingEmail: z.string().email().optional(),
      ownerUserId: z.string().uuid().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const adminId = await isPlatformAdmin(data.accessToken);
    if (!adminId) return { error: "Platform admin access required." };

    const supabase = getAdminClient();
    const { data: org, error } = await supabase
      .from("organizations")
      .insert({ name: data.name, slug: data.slug, billing_email: data.billingEmail ?? null })
      .select("id")
      .single();

    if (error) {
      console.error("[createOrganization] error:", error);
      if (error.code === "23505") return { error: "That slug is already taken." };
      return { error: "Failed to create organization." };
    }

    if (data.ownerUserId) {
      const { error: memberErr } = await supabase
        .from("org_members")
        .insert({ org_id: org.id, user_id: data.ownerUserId, role: "owner" });
      if (memberErr) console.error("[createOrganization] owner attach error:", memberErr);
    }

    return { orgId: org.id as string };
  });

/** addOrgMember — attach an existing CalmTree user to an org with a role. */
export const addOrgMember = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      orgId: z.string().uuid(),
      userId: z.string().uuid(),
      role: z.enum(["owner", "admin", "viewer"]).default("admin"),
    }),
  )
  .handler(async ({ data }) => {
    const adminId = await isPlatformAdmin(data.accessToken);
    if (!adminId) return { error: "Platform admin access required." };

    const supabase = getAdminClient();
    const { error } = await supabase
      .from("org_members")
      .upsert(
        { org_id: data.orgId, user_id: data.userId, role: data.role },
        { onConflict: "org_id,user_id" },
      );

    if (error) {
      console.error("[addOrgMember] error:", error);
      return { error: "Failed to add member." };
    }
    return { ok: true };
  });

/** grantCredits — add credits after payment lands. Append-only ledger entry. */
export const grantCredits = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      orgId: z.string().uuid(),
      amount: z.number().int().positive(),
      note: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const adminId = await isPlatformAdmin(data.accessToken);
    if (!adminId) return { error: "Platform admin access required." };

    const supabase = getAdminClient();
    const { error } = await supabase.from("credit_ledger").insert({
      org_id: data.orgId,
      delta: data.amount,
      reason: "grant",
      note: data.note ?? `Granted ${data.amount} credits`,
      created_by: adminId,
    });

    if (error) {
      console.error("[grantCredits] error:", error);
      return { error: "Failed to grant credits." };
    }

    const { data: bal } = await supabase.rpc("org_credit_balance", { p_org_id: data.orgId });
    return { ok: true, balance: (bal as number) ?? 0 };
  });

/** setIndividualResultsUnlock — toggle the paid individual-results add-on. */
export const setIndividualResultsUnlock = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      orgId: z.string().uuid(),
      unlocked: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const adminId = await isPlatformAdmin(data.accessToken);
    if (!adminId) return { error: "Platform admin access required." };

    const supabase = getAdminClient();
    const { error } = await supabase
      .from("organizations")
      .update({ individual_results_unlocked: data.unlocked, updated_at: new Date().toISOString() })
      .eq("id", data.orgId);

    if (error) {
      console.error("[setIndividualResultsUnlock] error:", error);
      return { error: "Failed to update setting." };
    }
    return { ok: true };
  });
