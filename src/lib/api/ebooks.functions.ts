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
import { z } from "zod";
import crypto from "crypto";
import { getAdminClient, requireUser } from "./_shared";

/**
 * Generates a Cloudinary signed download URL for a private/authenticated PDF asset,
 * using Cloudinary's documented `private_download_url` scheme (the same one their
 * official SDKs implement): sign a sorted `key=value&...` string of the request
 * params with SHA-1 + the API secret, then call the `/download` API endpoint.
 *
 * We don't rely on Cloudinary's own link-expiry features (those need a separate
 * "auth token" account feature enabled) — the real access control is that this
 * function is only ever called after re-verifying the purchase row server-side,
 * fresh on every download click (never cached client-side).
 *
 * @param publicId — the Cloudinary public_id stored on the ebook row
 */
function generateCloudinarySignedUrl(publicId: string): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  const timestamp = Math.floor(Date.now() / 1000);

  // Params to sign — sorted alphabetically by key, joined as key=value&key=value,
  // per Cloudinary's api_sign_request convention (api_key/signature excluded).
  const paramsToSign: Record<string, string> = {
    attachment: "true",
    public_id: publicId,
    timestamp: String(timestamp),
    type: "authenticated",
  };
  const toSign = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");
  const signature = crypto
    .createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");

  const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/raw/download`);
  for (const [key, value] of Object.entries(paramsToSign)) {
    url.searchParams.set(key, value);
  }
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
      .select(
        "id, slug, title, subtitle, description, cover_image_url, price_inr, page_count, status",
      )
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
