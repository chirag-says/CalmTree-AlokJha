/**
 * razorpay.ts — Webhook business logic (pure handler, no route coupling).
 *
 * Imported by the thin route shell at src/routes/api/webhooks/razorpay.ts.
 *
 * Security: signature verified via HMAC-SHA256 before any DB writes.
 * Idempotent: unique constraints prevent double-processing.
 */

import crypto from "crypto";
import { fulfillPayment } from "../payments/fulfillment";

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
  } catch {
    return false;
  }
}

export async function handleRazorpayWebhook(request: Request): Promise<Response> {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET is not set.");
    return new Response("Webhook secret not configured", { status: 500 });
  }

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

  const result = await fulfillPayment({
    notes,
    userId,
    amountInr,
    razorpayOrderId,
    razorpayPaymentId,
  });

  if (!result.ok) {
    // Malformed payload → 400. Unknown product type → 200 (ack; nothing to do,
    // don't make Razorpay retry forever). Anything else is a DB failure → 500
    // so Razorpay retries the delivery.
    if (result.error.startsWith("Unknown productType")) {
      return new Response("OK", { status: 200 });
    }
    const status = result.error === "Missing order notes" ? 400 : 500;
    return new Response(result.error, { status });
  }

  console.log(
    `[razorpay-webhook] Processed payment.captured: ${razorpayPaymentId} | type=${productType}`,
  );

  return new Response("OK", { status: 200 });
}
