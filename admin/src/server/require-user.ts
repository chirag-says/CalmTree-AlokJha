/**
 * require-user.ts — JWT verification helper.
 * Server-only: never import from client components.
 */

import { getAdminClient } from "./supabase-admin";

/**
 * Verifies the JWT and returns the authenticated user's id.
 * Throws a plain Error with a user-safe message on failure.
 */
export async function requireUser(accessToken: string): Promise<string> {
  const supabase = getAdminClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new Error("Unauthorized: invalid or expired access token.");
  }

  return data.user.id;
}
