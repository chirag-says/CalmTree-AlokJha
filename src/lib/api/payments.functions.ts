/**
 * payments.functions.ts
 *
 * Server functions for Razorpay order creation.
 *
 * Security rules:
 *   - Price is looked up server-side only — never trust a client-supplied amount.
 *   - The Razorpay secret key (RAZORPAY_KEY_SECRET) never leaves this module.
 *   - Only the public key ID (RAZORPAY_KEY_ID) is returned to the client.
 *   - Product metadata (type, ref, userId) is stashed in the order's `notes`
 *     so the webhook can reconstruct context without trusting the client callback.
 *
 * Env vars needed:
 *   RAZORPAY_KEY_ID          — public (returned to client)
 *   RAZORPAY_KEY_SECRET      — secret (server-only)
 *   RAZORPAY_WEBHOOK_SECRET  — for webhook signature verification (see webhook route)
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import crypto from "crypto";
import { TIER_INFO } from "@/data/assessments";
import { getAdminClient, requireUser } from "./_shared";

/** Fetch an ebook's price from the DB server-side. Never trust the client. */
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

/** Tier price server-side — reads the same TIER_INFO the frontend displays from. */
function getTierPrice(tier: "growth" | "professional"): number {
  const price = TIER_INFO[tier].priceInr;
  if (!price) throw new Error(`Tier "${tier}" has no purchasable price.`);
  return price;
}

// ─── Schemas ─────────────────────────────────────────────────────────────────
//
// Two distinct product shapes:
//   - assessment_category: unlocks every assessment in `productCategory` (the real
//     ProductCategory string, e.g. "Workplace Effectiveness") for the price of `tier`.
//   - ebook: a single one-time SKU purchase, priced from the ebooks table.
//
// Kept as a discriminated union so the webhook can reconstruct exactly what to
// grant without conflating "which tier sets the price" with "which category to unlock".

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

// ─── Server Functions ─────────────────────────────────────────────────────────

/**
 * createRazorpayOrder
 *
 * Creates a Razorpay order server-side.
 * Returns { orderId, amount (paise), currency, keyId } to the client.
 * The client uses these to open the Razorpay checkout modal.
 */
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

    // Razorpay amounts are in paise (1 INR = 100 paise)
    const amountPaise = amountInr * 100;

    // Create a Razorpay order via their REST API (no SDK needed — avoids CJS issues)
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const body = JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      notes,
    });

    let orderId: string;
    try {
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
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

    return {
      orderId,
      amount: amountPaise,
      currency: "INR",
      keyId, // public key — safe to return to client
    };
  });

/**
 * verifyRazorpayPayment
 *
 * Client-side optimistic verification (not the source of truth — the webhook is).
 * Called from the Razorpay success callback to show optimistic UI.
 * Returns { verified: boolean } only — does NOT write to the database.
 * Real entitlement/purchase rows are created by the webhook.
 */
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
    try {
      await requireUser(data.accessToken);
    } catch {
      return { verified: false };
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) return { verified: false };

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest("hex");

    return { verified: expectedSignature === data.razorpaySignature };
  });
