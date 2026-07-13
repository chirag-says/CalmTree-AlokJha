/**
 * authz.ts (admin app) — platform-admin check only.
 * If the admin app already has an is_admin gate, reuse that instead.
 */

import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

/** True (returns userId) if the verified user is a platform admin. */
export async function isPlatformAdmin(accessToken: string): Promise<string | null> {
  let userId: string;
  try {
    userId = await requireUser(accessToken);
  } catch {
    return null;
  }
  const supabase = getAdminClient();
  const { data } = await supabase.from("profiles").select("is_admin").eq("id", userId).maybeSingle();
  return data?.is_admin ? userId : null;
}
