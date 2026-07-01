/**
 * Razorpay Webhook — POST /api/webhooks/razorpay
 *
 * Receives payment events from Razorpay and writes entitlements/purchases
 * to the database using the service-role client (bypasses RLS).
 *
 * IDEMPOTENT: unique constraints on entitlements.payment_reference and
 * purchases.razorpay_payment_id mean a duplicate insert fails with Postgres
 * error 23505 (unique_violation), which is treated as an already-processed
 * no-op rather than a real failure.
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
import { getAdminClient } from "@/lib/api/_shared";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  // Use timingSafeEqual to prevent timing attacks
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
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

        const razorpayPaymentId = paymentEntity.id;
        const razorpayOrderId = paymentEntity.order_id;
        const amountPaise = paymentEntity.amount;
        const notes = paymentEntity.notes as Record<string, string> | undefined;

        if (
          typeof razorpayPaymentId !== "string" ||
          !razorpayPaymentId ||
          typeof razorpayOrderId !== "string" ||
          !razorpayOrderId ||
          typeof amountPaise !== "number" ||
          !Number.isFinite(amountPaise)
        ) {
          console.error("[razorpay-webhook] Malformed payment entity:", paymentEntity);
          return new Response("Malformed payment entity", { status: 400 });
        }

        if (!notes?.productType || !notes?.userId) {
          console.error("[razorpay-webhook] Missing required notes:", notes);
          return new Response("Missing order notes", { status: 400 });
        }

        const { productType, userId } = notes;
        const amountInr = Math.round(amountPaise / 100);

        const supabase = getAdminClient();

        if (productType === "assessment_category") {
          if (!notes.tier || !notes.productCategory) {
            console.error("[razorpay-webhook] Missing tier/productCategory in notes:", notes);
            return new Response("Missing order notes", { status: 400 });
          }

          // Grant category entitlement — product_category is the real ProductCategory
          // string (matches config.meta.productCategory), NOT the tier name; the tier
          // only ever decided the price at order-creation time.
          // Idempotent: unique index on payment_reference.
          const { error } = await supabase.from("entitlements").insert({
            user_id: userId,
            access_type: "category",
            product_category: notes.productCategory,
            expires_at: null,
            payment_reference: razorpayPaymentId,
          });

          if (error && error.code !== "23505") {
            // 23505 = unique_violation (already processed — OK)
            console.error("[razorpay-webhook] Error inserting entitlement:", error);
            return new Response("DB error", { status: 500 });
          }
        } else if (productType === "ebook") {
          if (!notes.productRef) {
            console.error("[razorpay-webhook] Missing productRef in notes:", notes);
            return new Response("Missing order notes", { status: 400 });
          }

          // Record ebook purchase
          // Idempotent: UNIQUE on razorpay_payment_id
          const { error } = await supabase.from("purchases").insert({
            user_id: userId,
            product_type: "ebook",
            product_id: notes.productRef,
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
          `[razorpay-webhook] Processed payment.captured: ${razorpayPaymentId} | type=${productType}`,
        );

        return new Response("OK", { status: 200 });
      },
    },
  },
});
