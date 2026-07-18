/**
 * haptics — thin wrapper over the Vibration API for §13-style feedback.
 *
 * iOS design principle: reserve haptics for meaningful commit moments
 * (a selection landing, a swipe completing), never for ambient motion.
 * Kept deliberately tiny so callers stay declarative: haptic("select").
 *
 * Note: iOS Safari does not implement navigator.vibrate, so this is a
 * progressive enhancement — it silently no-ops where unsupported, and the
 * visual + motion feedback carries the moment on its own.
 */

type HapticKind = "select" | "commit" | "boundary";

const PATTERNS: Record<HapticKind, number | number[]> = {
  // A single, barely-there tick when an answer lands.
  select: 8,
  // Slightly firmer confirmation when a question/step commits.
  commit: 12,
  // A soft double-tap when the user hits an edge (nothing more this way).
  boundary: [6, 30, 6],
};

export function haptic(kind: HapticKind): void {
  if (typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;
  // Respect users who've asked the OS to calm motion — treat it as a
  // signal to drop non-essential physical feedback too.
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }
  try {
    navigator.vibrate(PATTERNS[kind]);
  } catch {
    // Some browsers throw if called outside a user gesture — ignore.
  }
}
