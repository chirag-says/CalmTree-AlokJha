/**
 * read-proxy.ts — streams an owned ebook's PDF bytes to the in-app reader.
 *
 * Why a proxy instead of handing the browser a Cloudinary URL:
 *   - Same-origin, so pdf.js fetches it with no CORS setup.
 *   - The signed Cloudinary URL never leaves the server (can't be shared/leaked).
 *   - Ownership is re-checked on every request, exactly like the download path.
 *
 * Auth: the reader passes the Supabase access token as a Bearer header (pdf.js
 * `httpHeaders`), so nothing sensitive lands in the URL/query string or logs.
 * Range requests are forwarded so pdf.js can load the file progressively.
 */

import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";
import { generateCloudinarySignedUrl } from "../functions/ebooks.functions";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function handleEbookRead(request: Request, ebookId: string): Promise<Response> {
  if (!UUID_RE.test(ebookId)) {
    return new Response("Bad request", { status: 400 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return new Response("Unauthorized", { status: 401 });

  let userId: string;
  try {
    userId = await requireUser(token);
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = getAdminClient();

  // Ownership — mirrors getEbookDownloadUrl.
  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("product_type", "ebook")
    .eq("product_id", ebookId)
    .eq("status", "completed")
    .maybeSingle();

  if (purchaseError) {
    console.error("[ebook-read] purchase lookup error:", purchaseError);
    return new Response("Server error", { status: 500 });
  }
  if (!purchase) return new Response("You do not own this ebook.", { status: 403 });

  const { data: ebook, error: ebookError } = await supabase
    .from("ebooks")
    .select("cloudinary_public_id")
    .eq("id", ebookId)
    .single();

  if (ebookError || !ebook?.cloudinary_public_id) {
    return new Response("Ebook file not found.", { status: 404 });
  }

  let signedUrl: string;
  try {
    signedUrl = generateCloudinarySignedUrl(ebook.cloudinary_public_id as string);
  } catch (e) {
    console.error("[ebook-read] Cloudinary signing error:", e);
    return new Response("Could not load the ebook.", { status: 500 });
  }

  // Forward Range so pdf.js can request byte ranges (progressive load).
  const range = request.headers.get("range");
  let upstream: Response;
  try {
    upstream = await fetch(signedUrl, { headers: range ? { Range: range } : {} });
  } catch (e) {
    console.error("[ebook-read] upstream fetch failed:", e);
    return new Response("Upstream error", { status: 502 });
  }

  if (!upstream.ok && upstream.status !== 206) {
    console.error("[ebook-read] upstream status:", upstream.status);
    return new Response("Upstream error", { status: 502 });
  }

  // Re-emit with our own headers: always inline PDF, regardless of what
  // Cloudinary set. Pass through range/length so the reader streams smoothly.
  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", "inline");
  headers.set("Cache-Control", "private, no-store");
  for (const h of ["content-length", "content-range", "accept-ranges"]) {
    const v = upstream.headers.get(h);
    if (v) headers.set(h, v);
  }

  return new Response(upstream.body, { status: upstream.status, headers });
}
