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

/** Fetch price from DB server-side. Never trust the client. */
async function getProductPrice(
  productType: "assessment_category" | "ebook",
  productRef: string,
): Promise<number> {
  const supabase = getAdminClient();

  if (productType === "ebook") {
    const { data, error } = await supabase
      .from("ebooks")
      .select("price_inr")
      .eq("id", productRef)
      .eq("status", "active")
      .single();
    if (error || !data) throw new Error("Ebook not found or not active.");
    return data.price_inr as number;
  }

  // assessment_category — tier prices from TIER_INFO equivalent
  // Prices match TIER_INFO in the frontend: growth=₹99, professional=₹299
  const CATEGORY_PRICES: Record<string, number> = {
    growth: 99,
    professional: 299,
  };
  const price = CATEGORY_PRICES[productRef];
  if (!price) throw new Error(`Unknown assessment category tier: ${productRef}`);
  return price;
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const CreateOrderSchema = z.object({
  accessToken: z.string(),
  productType: z.enum(["assessment_category", "ebook"]),
  /** For assessment_category: the tier name (e.g. "growth"). For ebook: the ebook UUID. */
  productRef: z.string(),
});

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
    try {
      amountInr = await getProductPrice(data.productType, data.productRef);
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
      notes: {
        productType: data.productType,
        productRef: data.productRef,
        userId,
      },
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
