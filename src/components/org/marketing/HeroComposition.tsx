/**
 * HeroComposition — the art-directed product showcase in the B2B hero.
 *
 * A real product shot of the CalmTree org dashboard (laptop + phone, transparent
 * PNG with its own soft shadow baked in), presented on a soft ambient halo with
 * a gentle float and an on-load entrance.
 *
 * Motion (ios-design §14): the entrance is driven by a client `mounted` flag —
 * a real state change is what Motion animates reliably, and it guarantees the
 * showcase can never be left stuck in its invisible start state. Under
 * prefers-reduced-motion it renders in its final state immediately.
 */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** True only after the component has mounted on the client. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function HeroComposition() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const play = reduce || mounted;

  return (
    <motion.div
      /* Size relative to the viewport: grows with the display between a phone-safe
         floor and a ceiling, then bleeds a touch past its grid cell on large
         screens (the section is overflow-hidden, so no page horizontal scroll). */
      className="relative ml-auto w-full max-w-[clamp(520px,52vw,960px)] lg:-mr-6 xl:-mr-16"
      initial={false}
      animate={{ opacity: play ? 1 : 0, y: play ? 0 : 18 }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE }}
      style={{ willChange: "transform, opacity" }}
    >
      {/* soft ambient halo */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 75%)",
        }}
        aria-hidden
      />

      <img
        src="/hero-org-dashboard.png"
        alt="CalmTree organization dashboard shown on a laptop and phone — team credits, active campaigns and recent wellbeing checks."
        width={1536}
        height={1024}
        loading="eager"
        decoding="async"
        className="h-auto w-full select-none"
        draggable={false}
      />
    </motion.div>
  );
}
