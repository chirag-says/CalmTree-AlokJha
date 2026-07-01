/**
 * _shared.ts — common server-only helpers for every *.functions.ts module
 * (and the Razorpay webhook route, which follows the same pattern manually
 * since it's a route handler rather than a createServerFn).
 *
 * Auth pattern: the caller passes the Supabase JWT access token. We verify it
 * server-side with supabase.auth.getUser(token) before touching the database —
 * this way we never trust a client-supplied userId.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client using the service role key.
 * Service role bypasses RLS — only use server-side, never expose to clients.
 */
export function getAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("[CalmTree] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

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
