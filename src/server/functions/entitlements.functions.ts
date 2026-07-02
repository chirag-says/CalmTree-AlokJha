/**
 * entitlements.functions.ts
 *
 * Server functions for reading a user's content entitlements.
 * All handlers run server-side only (TanStack Start server functions).
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

const GetEntitlementsInputSchema = z.object({
  accessToken: z.string(),
});

/**
 * getMyEntitlements — Returns all entitlement rows for the authenticated user.
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
