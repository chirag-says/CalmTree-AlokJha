/**
 * org.functions.ts — company-facing reads for the org dashboard.
 * Runs in the ORG app (org.calmtree.in). Service-role client + code-enforced
 * authorization via requireOrgRole.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";
import { requireOrgRole } from "../b2b/authz";

/** getMyOrgs — orgs the current user belongs to, with role + live balance. */
export const getMyOrgs = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string() }))
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    const supabase = getAdminClient();
    const { data: memberships, error } = await supabase
      .from("org_members")
      .select("role, organizations(id, name, slug, individual_results_unlocked)")
      .eq("user_id", userId);

    if (error) {
      console.error("[getMyOrgs] error:", error);
      return { error: "Failed to load organizations." };
    }

    const orgs = await Promise.all(
      (memberships ?? []).map(async (m) => {
        const org = m.organizations as unknown as {
          id: string;
          name: string;
          slug: string;
          individual_results_unlocked: boolean;
        };
        const { data: bal } = await supabase.rpc("org_credit_balance", { p_org_id: org.id });
        return {
          id: org.id,
          name: org.name,
          slug: org.slug,
          role: m.role as string,
          individualResultsUnlocked: org.individual_results_unlocked,
          creditBalance: (bal as number) ?? 0,
        };
      }),
    );

    return { orgs };
  });

/** getOrgLedger — credit history + balance for one org (members only). */
export const getOrgLedger = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), orgId: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await requireOrgRole(data.accessToken, data.orgId, "viewer");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const supabase = getAdminClient();
    const [{ data: entries, error }, { data: bal }] = await Promise.all([
      supabase
        .from("credit_ledger")
        .select("id, delta, reason, note, campaign_id, created_at")
        .eq("org_id", data.orgId)
        .order("created_at", { ascending: false })
        .limit(200),
      supabase.rpc("org_credit_balance", { p_org_id: data.orgId }),
    ]);

    if (error) {
      console.error("[getOrgLedger] error:", error);
      return { error: "Failed to load credit history." };
    }
    return { entries: entries ?? [], balance: (bal as number) ?? 0 };
  });
