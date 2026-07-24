/**
 * Category pricing — how individuals actually pay.
 *
 * Individuals don't buy one assessment at a time. Discovery-tier assessments
 * are always free; a single purchase unlocks every Growth/Professional
 * assessment inside one product category (current and future). Org/B2B
 * pricing (credit packs) is unrelated and untouched — see credit-packs.ts.
 *
 * Price reflects the category's depth and audience: everyday, broadly
 * accessible categories sit near ₹199; specialised, high-value professional
 * audiences (founders, leadership) sit near ₹499.
 *
 * "Gen Z & Digital Life" has no entry — every assessment in it is Discovery
 * (free), so there is nothing to purchase.
 */

import type { ProductCategory } from "./assessments/types";

export const CATEGORY_PRICES: Partial<Record<ProductCategory, number>> = {
  "Emotional Strength & Everyday Mind": 199,
  "Family & Parenting": 249,
  "Self-Awareness & Personality": 279,
  "Workplace Effectiveness": 299,
  "Relationships & Emotional Connection": 349,
  "Life Transitions & Healthy Ageing": 379,
  "Career Direction": 399,
  "Leadership & Teams": 449,
  "Founders & Entrepreneurship": 499,
};

/** Returns the category's price, or null if it isn't purchasable (fully free). */
export function getCategoryPrice(category: string): number | null {
  return (CATEGORY_PRICES as Record<string, number | undefined>)[category] ?? null;
}
