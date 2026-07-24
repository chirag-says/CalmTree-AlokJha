/**
 * credit-packs.ts — B2B credit-pack SKUs.
 *
 * One credit = one assessment invitation sent to one employee. Packs are the
 * self-serve purchase unit. Price is authoritative HERE and on the server —
 * the client never sends an amount; the order handler looks the price up by id
 * (mirrors how category-pricing.ts prices individual category purchases in
 * payments.functions.ts).
 *
 * Prices are placeholders for the demo — adjust freely; nothing else changes.
 */

export interface CreditPack {
  /** Stable SKU id used in Razorpay order notes. */
  id: string;
  label: string;
  /** Number of credits granted on purchase. */
  credits: number;
  /** Price in whole rupees. */
  priceInr: number;
  /** Short marketing line. */
  blurb: string;
  /** Highlight the recommended pack in the UI. */
  popular?: boolean;
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: "starter-25",
    label: "Starter",
    credits: 25,
    priceInr: 2499,
    blurb: "Try it with a small team or a single check-in.",
  },
  {
    id: "growth-100",
    label: "Growth",
    credits: 100,
    priceInr: 8999,
    blurb: "Run recurring check-ins across a department.",
    popular: true,
  },
  {
    id: "scale-500",
    label: "Scale",
    credits: 500,
    priceInr: 39999,
    blurb: "Company-wide programmes and repeated pulses.",
  },
];

/** Lookup by SKU id — returns undefined for an unknown pack. */
export function getCreditPack(id: string): CreditPack | undefined {
  return CREDIT_PACKS.find((p) => p.id === id);
}

/** Per-credit rupee rate, for "₹X/credit" display. */
export function perCreditInr(pack: CreditPack): number {
  return Math.round(pack.priceInr / pack.credits);
}
