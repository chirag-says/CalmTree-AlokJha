/**
 * fulfillment.ts — the single place a captured payment becomes an owned product.
 *
 * One engine, two callers:
 *   - verifyRazorpayPayment (payments.functions.ts) — synchronous, on the browser
 *     success callback. This is the primary path and needs only RAZORPAY_KEY_SECRET.
 *   - handleRazorpayWebhook (webhooks/razorpay.ts) — asynchronous backup, if a
 *     webhook is ever configured. Needs RAZORPAY_WEBHOOK_SECRET.
 *
 * Idempotent by DB constraint (purchases.razorpay_payment_id UNIQUE,
 * entitlements.payment_reference unique index), so both callers firing for the
 * same payment is a harmless no-op — a duplicate insert surfaces as 23505.
 */

import { getAdminClient } from "../supabase-admin";

export interface FulfillmentInput {
  /** Order notes set at createRazorpayOrder time — the authoritative record of what was bought. */
  notes: Record<string, string>;
  /** The buyer's user id (from notes; both callers verify it independently). */
  userId: string;
  amountInr: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}

export type FulfillmentResult = { ok: true } | { ok: false; error: string };

/**
 * Writes the purchase / entitlement row for a captured, verified payment.
 * Safe to call more than once for the same payment (unique constraints dedupe).
 */
export async function fulfillPayment(input: FulfillmentInput): Promise<FulfillmentResult> {
  const { notes, userId, amountInr, razorpayOrderId, razorpayPaymentId } = input;
  const productType = notes.productType;
  const supabase = getAdminClient();

  if (productType === "assessment_category") {
    if (!notes.productCategory) {
      console.error("[fulfillPayment] missing productCategory in notes:", notes);
      return { ok: false, error: "Missing order notes" };
    }

    const { error } = await supabase.from("entitlements").insert({
      user_id: userId,
      access_type: "category",
      product_category: notes.productCategory,
      expires_at: null,
      payment_reference: razorpayPaymentId,
    });

    if (error && error.code !== "23505") {
      console.error("[fulfillPayment] entitlement insert error:", error);
      return { ok: false, error: "DB error" };
    }
    return { ok: true };
  }

  if (productType === "ebook") {
    if (!notes.productRef) {
      console.error("[fulfillPayment] missing productRef in notes:", notes);
      return { ok: false, error: "Missing order notes" };
    }

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
      console.error("[fulfillPayment] purchase insert error:", error);
      return { ok: false, error: "DB error" };
    }
    return { ok: true };
  }

  console.warn("[fulfillPayment] unknown productType:", productType);
  return { ok: false, error: `Unknown productType: ${productType}` };
}
