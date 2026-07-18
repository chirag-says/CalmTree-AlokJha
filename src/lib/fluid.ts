/**
 * fluid — shared primitives for iOS-style fluid motion.
 *
 * Kept framework-agnostic so both assessment runners (and later the ebook
 * reader / drawers) can share one definition of "how a flick lands".
 */

/**
 * §6 Momentum projection — Apple's exact deceleration-decay projection from
 * the WWDC "Designing Fluid Interfaces" sample code. Given a release velocity
 * (px/s), returns how far the gesture would still travel if left to
 * decelerate. Add it to the release position to get the projected endpoint,
 * then snap to the nearest target relative to THAT — not the release point.
 *
 * This is NOT the physics-textbook v²/(2·decel); it's the exponential-decay
 * form that matches native scroll feel.
 */
export function project(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Calm, critically-damped card spring (§4 default: no overshoot on a
 * reflective UI). Distance is subtle so questions glide rather than fly.
 */
export const CARD_SPRING = { type: "spring", bounce: 0, duration: 0.4 } as const;

/** Horizontal offset a question enters from / exits to (px). */
export const CARD_SLIDE = 64;

/** How far a projected swipe must land past origin to commit a nav (px). */
export const SWIPE_COMMIT = 80;
