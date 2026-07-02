/**
 * supabase-admin.ts — Service-role Supabase client.
 * Server-only: never import from client components.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client using the service role key.
 * Service role bypasses RLS — only use server-side, never expose to clients.
 */
export function getAdminClient(): SupabaseClient {
  // The project URL is not a secret — fall back to the public VITE_ var so a
  // missing SUPABASE_URL doesn't surface as a confusing "Unauthorized" error.
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "[CalmTree] SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
