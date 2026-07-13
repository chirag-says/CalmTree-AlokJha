/**
 * authz.ts — server-side org membership / role checks.
 *
 * Every B2B server function reads and writes through the service-role admin
 * client (which bypasses RLS), so authorization MUST be enforced here in code:
 * verify the caller's JWT, then confirm they belong to the org with a
 * sufficient role before touching org data.
 */

import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

export type OrgRole = "owner" | "admin" | "viewer";

const ROLE_RANK: Record<OrgRole, number> = { viewer: 0, admin: 1, owner: 2 };

export interface OrgContext {
  userId: string;
  orgId: string;
  role: OrgRole;
}

/**
 * Verifies the token and that the user is a member of orgId with at least
 * minRole. Throws a plain Error (caught by callers → { error }) on failure.
 */
export async function requireOrgRole(
  accessToken: string,
  orgId: string,
  minRole: OrgRole = "viewer",
): Promise<OrgContext> {
  const userId = await requireUser(accessToken);
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from("org_members")
    .select("role")
    .eq("org_id", orgId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[requireOrgRole] lookup error:", error);
    throw new Error("Could not verify organization membership.");
  }
  if (!data) {
    throw new Error("You are not a member of this organization.");
  }

  const role = data.role as OrgRole;
  if (ROLE_RANK[role] < ROLE_RANK[minRole]) {
    throw new Error("You don't have permission to perform this action.");
  }

  return { userId, orgId, role };
}

/** True if the verified user is a platform admin (profiles.is_admin). */
export async function isPlatformAdmin(accessToken: string): Promise<string | null> {
  let userId: string;
  try {
    userId = await requireUser(accessToken);
  } catch {
    return null;
  }
  const supabase = getAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();
  return data?.is_admin ? userId : null;
}
