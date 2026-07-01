/**
 * Razorpay Webhook — POST /api/webhooks/razorpay
 *
 * Receives payment events from Razorpay and writes entitlements/purchases
 * to the database using the service-role client (bypasses RLS).
 *
 * IDEMPOTENT: uses ON CONFLICT DO NOTHING on the unique constraints
 * (entitlements.payment_reference, purchases.razorpay_payment_id) so
 * duplicate webhook deliveries are silently ignored.
 *
 * Security: signature is verified via HMAC-SHA256 before any DB writes.
 *
 * Env vars required:
 *   RAZORPAY_WEBHOOK_SECRET  — from Razorpay dashboard webhook settings
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createFileRoute } from "@tanstack/react-router";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("[webhook] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  // Use timingSafeEqual to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex"),
    );
  } catch {
    return false;
  }
}

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/api/webhooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret) {
          console.error("[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET is not set.");
          return new Response("Webhook secret not configured", { status: 500 });
        }

        // Read raw body for signature verification
        const rawBody = await request.text();
        const signature = request.headers.get("x-razorpay-signature") ?? "";

        if (!verifySignature(rawBody, signature, webhookSecret)) {
          console.warn("[razorpay-webhook] Signature verification failed.");
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: Record<string, unknown>;
        try {
          payload = JSON.parse(rawBody) as Record<string, unknown>;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const event = payload.event as string;

        // Only act on payment.captured
        if (event !== "payment.captured") {
          return new Response("OK", { status: 200 });
        }

        const paymentEntity = (
          (payload.payload as Record<string, unknown>)?.payment as Record<string, unknown>
        )?.entity as Record<string, unknown> | undefined;

        if (!paymentEntity) {
          return new Response("Missing payment entity", { status: 400 });
        }

        const razorpayPaymentId = paymentEntity.id as string;
        const razorpayOrderId = paymentEntity.order_id as string;
        const amountPaise = paymentEntity.amount as number;
        const notes = paymentEntity.notes as Record<string, string> | undefined;

        if (!notes?.productType || !notes?.productRef || !notes?.userId) {
          console.error("[razorpay-webhook] Missing required notes:", notes);
          return new Response("Missing order notes", { status: 400 });
        }

        const { productType, productRef, userId } = notes;
        const amountInr = Math.round(amountPaise / 100);

        const supabase = getAdminClient();

        if (productType === "assessment_category") {
          // Grant category entitlement
          // TIER -> productCategory mapping: productRef is the tier name ('growth'|'professional')
          // Map to the actual productCategory string from the assessment config
          // For now, productRef IS the tier name — the webhook stores what the client passed.
          // Idempotent: unique index on payment_reference
          const { error } = await supabase.from("entitlements").insert({
            user_id: userId,
            access_type: "category",
            product_category: productRef, // tier name used as category key for now
            expires_at: null,
            payment_reference: razorpayPaymentId,
          });

          if (error && error.code !== "23505") {
            // 23505 = unique_violation (already processed — OK)
            console.error("[razorpay-webhook] Error inserting entitlement:", error);
            return new Response("DB error", { status: 500 });
          }
        } else if (productType === "ebook") {
          // Record ebook purchase
          // Idempotent: UNIQUE on razorpay_payment_id
          const { error } = await supabase.from("purchases").insert({
            user_id: userId,
            product_type: "ebook",
            product_id: productRef,
            amount_paid_inr: amountInr,
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: razorpayPaymentId,
            status: "completed",
          });

          if (error && error.code !== "23505") {
            console.error("[razorpay-webhook] Error inserting purchase:", error);
            return new Response("DB error", { status: 500 });
          }
        } else {
          console.warn("[razorpay-webhook] Unknown productType:", productType);
        }

        console.log(
          `[razorpay-webhook] Processed payment.captured: ${razorpayPaymentId} | type=${productType} | ref=${productRef}`,
        );

        return new Response("OK", { status: 200 });
      },
    },
  },
});
