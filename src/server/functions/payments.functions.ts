/**
 * payments.functions.ts
 *
 * Server functions for Razorpay order creation.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import crypto from "crypto";
import { TIER_INFO } from "@/data/assessments";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";
import { fulfillPayment } from "../payments/fulfillment";

async function getEbookPrice(ebookId: string): Promise<number> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("ebooks")
    .select("price_inr")
    .eq("id", ebookId)
    .eq("status", "active")
    .single();
  if (error || !data) throw new Error("Ebook not found or not active.");
  return data.price_inr as number;
}

function getTierPrice(tier: "growth" | "professional"): number {
  const price = TIER_INFO[tier].priceInr;
  if (!price) throw new Error(`Tier "${tier}" has no purchasable price.`);
  return price;
}

const CreateOrderSchema = z.discriminatedUnion("productType", [
  z.object({
    accessToken: z.string(),
    productType: z.literal("assessment_category"),
    tier: z.enum(["growth", "professional"]),
    productCategory: z.string(),
  }),
  z.object({
    accessToken: z.string(),
    productType: z.literal("ebook"),
    productRef: z.string(),
  }),
]);

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator(CreateOrderSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return { error: "Payment gateway is not configured." };
    }

    let amountInr: number;
    let notes: Record<string, string>;
    try {
      if (data.productType === "ebook") {
        amountInr = await getEbookPrice(data.productRef);
        notes = { productType: "ebook", productRef: data.productRef, userId };
      } else {
        amountInr = getTierPrice(data.tier);
        notes = {
          productType: "assessment_category",
          tier: data.tier,
          productCategory: data.productCategory,
          userId,
        };
      }
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Could not look up product price." };
    }

    const amountPaise = amountInr * 100;
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const body = JSON.stringify({ amount: amountPaise, currency: "INR", notes });

    let orderId: string;
    try {
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
        body,
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("[createRazorpayOrder] Razorpay API error:", err);
        return { error: "Failed to create payment order. Please try again." };
      }
      const order = (await res.json()) as { id: string };
      orderId = order.id;
    } catch (e) {
      console.error("[createRazorpayOrder] Network error:", e);
      return { error: "Failed to reach payment gateway. Please try again." };
    }

    return { orderId, amount: amountPaise, currency: "INR", keyId };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      razorpayOrderId: z.string(),
      razorpayPaymentId: z.string(),
      razorpaySignature: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { verified: false };
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return { verified: false };

    // 1. Verify the payment signature — proves Razorpay captured this exact
    //    (order, payment) pair. Uses the key secret, not any webhook secret.
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest("hex");
    if (expectedSignature !== data.razorpaySignature) {
      console.warn("[verifyRazorpayPayment] signature mismatch for order:", data.razorpayOrderId);
      return { verified: false };
    }

    // 2. Re-fetch the order from Razorpay to read the authoritative notes + amount.
    //    We never trust the client for what was bought — it comes from Razorpay.
    let order: { amount: number; notes?: Record<string, string> };
    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const res = await fetch(`https://api.razorpay.com/v1/orders/${data.razorpayOrderId}`, {
        headers: { Authorization: `Basic ${auth}` },
      });
      if (!res.ok) {
        console.error("[verifyRazorpayPayment] order fetch failed:", await res.text());
        return { verified: false };
      }
      order = (await res.json()) as { amount: number; notes?: Record<string, string> };
    } catch (e) {
      console.error("[verifyRazorpayPayment] order fetch error:", e);
      return { verified: false };
    }

    const notes = order.notes ?? {};
    // Defense in depth: the order must belong to the authenticated user.
    if (notes.userId !== userId) {
      console.error("[verifyRazorpayPayment] order/user mismatch:", {
        tokenUser: userId,
        notesUser: notes.userId,
      });
      return { verified: false };
    }

    // 3. Fulfil — write the purchase / entitlement. Idempotent, so a later
    //    webhook delivery for the same payment is a harmless no-op.
    const result = await fulfillPayment({
      notes,
      userId,
      amountInr: Math.round(order.amount / 100),
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
    });

    return { verified: result.ok };
  });
