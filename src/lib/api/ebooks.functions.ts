/**
 * ebooks.functions.ts
 *
 * Server functions for ebook catalog queries and secure PDF delivery.
 *
 * Design:
 *   - getActiveEbooks   — public (no auth), returns catalog for browsing.
 *   - getMyPurchasedEbookIds — returns ebook IDs the user owns.
 *   - getEbookDownloadUrl — verifies ownership, generates a short-TTL
 *     Cloudinary signed URL. Called fresh per download; no permanent links stored.
 *
 * Env vars needed:
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import crypto from "crypto";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("[CalmTree] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function requireUser(accessToken: string): Promise<string> {
  const supabase = getAdminClient();
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) throw new Error("Unauthorized: invalid or expired access token.");
  return data.user.id;
}

/**
 * Generates a short-TTL Cloudinary signed URL for a PDF asset.
 * The signature is computed server-side — CLOUDINARY_API_SECRET never leaves this module.
 *
 * @param publicId  — the Cloudinary public_id stored on the ebook row
 * @param ttlSecs   — how long the URL should be valid (default 600s = 10 min)
 */
function generateCloudinarySignedUrl(publicId: string, ttlSecs = 600): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const expiration = timestamp + ttlSecs;

  // Parameters to sign (sorted alphabetically)
  const paramsToSign = `expires_at=${expiration}&public_id=${publicId}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha256")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  // Construct the authenticated URL for private Cloudinary assets
  const url = new URL(
    `https://res.cloudinary.com/${cloudName}/raw/authenticated/s--${signature.slice(0, 8)}--/fl_attachment/${publicId}`,
  );
  url.searchParams.set("timestamp", String(timestamp));
  url.searchParams.set("expires_at", String(expiration));
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("signature", signature);

  return url.toString();
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const AuthSchema = z.object({ accessToken: z.string() });
const DownloadSchema = z.object({ accessToken: z.string(), ebookId: z.string().uuid() });

// ─── Server Functions ─────────────────────────────────────────────────────────

/** Public — returns active ebook catalog. No auth required. */
export const getActiveEbooks = createServerFn({ method: "POST" })
  .inputValidator(z.object({}))
  .handler(async () => {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("ebooks")
      .select("id, slug, title, subtitle, description, cover_image_url, price_inr, page_count, status")
      .eq("status", "active")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[getActiveEbooks] error:", error);
      return { error: "Failed to fetch ebooks.", ebooks: [] };
    }

    return { ebooks: data ?? [] };
  });

/** Returns the list of ebook IDs the authenticated user has purchased. */
export const getMyPurchasedEbookIds = createServerFn({ method: "POST" })
  .inputValidator(AuthSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized", ebookIds: [] as string[] };
    }

    const supabase = getAdminClient();
    const { data: purchases, error } = await supabase
      .from("purchases")
      .select("product_id")
      .eq("user_id", userId)
      .eq("product_type", "ebook")
      .eq("status", "completed");

    if (error) {
      console.error("[getMyPurchasedEbookIds] error:", error);
      return { error: "Failed to fetch purchases.", ebookIds: [] as string[] };
    }

    return { ebookIds: (purchases ?? []).map((p) => p.product_id as string) };
  });

/**
 * Verifies the user owns the ebook, then generates a short-TTL signed download URL.
 * Call this fresh on every download click — do NOT cache the URL client-side.
 */
export const getEbookDownloadUrl = createServerFn({ method: "POST" })
  .inputValidator(DownloadSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized" };
    }

    const supabase = getAdminClient();

    // Verify ownership
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .eq("product_type", "ebook")
      .eq("product_id", data.ebookId)
      .eq("status", "completed")
      .maybeSingle();

    if (purchaseError) {
      console.error("[getEbookDownloadUrl] purchase lookup error:", purchaseError);
      return { error: "Failed to verify purchase." };
    }

    if (!purchase) {
      return { error: "You do not own this ebook." };
    }

    // Fetch Cloudinary public_id
    const { data: ebook, error: ebookError } = await supabase
      .from("ebooks")
      .select("cloudinary_public_id, title")
      .eq("id", data.ebookId)
      .single();

    if (ebookError || !ebook?.cloudinary_public_id) {
      return { error: "Ebook file not found." };
    }

    let downloadUrl: string;
    try {
      downloadUrl = generateCloudinarySignedUrl(ebook.cloudinary_public_id as string);
    } catch (e) {
      console.error("[getEbookDownloadUrl] Cloudinary error:", e);
      return { error: "Could not generate download link. Please try again." };
    }

    return { downloadUrl, title: ebook.title as string };
  });
