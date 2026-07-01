/**
 * entitlements.functions.ts
 *
 * Server functions for reading a user's content entitlements.
 * All handlers run server-side only (TanStack Start server functions).
 *
 * Auth pattern: the caller passes the Supabase JWT access token.
 * We verify it server-side with supabase.auth.getUser(token) before
 * touching the database.
 *
 * Write access (granting paid entitlements) is intentionally absent here —
 * that happens exclusively via the payments webhook using the service role.
 */

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Creates a Supabase admin client using the service role key.
 * Service role bypasses RLS — only use server-side, never expose to clients.
 */
function getAdminClient() {
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
async function requireUser(accessToken: string): Promise<string> {
  const supabase = getAdminClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    throw new Error("Unauthorized: invalid or expired access token.");
  }

  return data.user.id;
}

// ─── Schemas ────────────────────────────────────────────────────────────────

const GetEntitlementsInputSchema = z.object({
  accessToken: z.string(),
});

// ─── Server Functions ────────────────────────────────────────────────────────

/**
 * getMyEntitlements
 *
 * Returns all entitlement rows for the authenticated user.
 * The client uses this to determine which assessments/categories are unlocked.
 *
 * Access types:
 *   'free'       — granted automatically on signup, no expiry
 *   'category'   — unlocks a specific productCategory
 *   'universal'  — unlocks all categories (product_category is NULL)
 */
export const getMyEntitlements = createServerFn({ method: "POST" })
  .inputValidator(GetEntitlementsInputSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    const supabase = getAdminClient();

    const { data: entitlements, error } = await supabase
      .from("entitlements")
      .select("id, access_type, product_category, expires_at, created_at, payment_reference")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getMyEntitlements] Supabase select error:", error);
      return { error: "Failed to fetch entitlements." };
    }

    return { entitlements: entitlements ?? [] };
  });
