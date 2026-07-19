/**
 * motion-primitives — the small, shared motion vocabulary for the marketing
 * surfaces (currently the /for-organizations page).
 *
 * Deliberately restrained: on a calm psychology product, motion should feel
 * like breathing, not bouncing. Every primitive respects reduced-motion and
 * degrades to a plain, fully-visible element.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
  type Variants,
} from "motion/react";

/** Calm ease — slow in, confident settle. No overshoot. */
const CALM_EASE = [0.22, 1, 0.36, 1] as const;

/** True only after the component has mounted on the client. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Reveal — fades + rises its children into place.
 *
 * Default: reveals the first time the element scrolls into view — the editorial
 * rhythm for long marketing pages. Pass `onMount` for above-the-fold surfaces
 * (dashboards, hero content) where the reveal should play on load and must
 * never be left stuck invisible waiting for a scroll: a client `mounted` flag
 * drives a real prop change, which Motion animates reliably.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  if (onMount) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0, y }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : y }}
        transition={{ duration: 0.8, ease: CALM_EASE, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: CALM_EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger — reveals a list of children in sequence. Pair with `RevealItem`.
 */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: CALM_EASE } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/**
 * Counter — counts a number up when it scrolls into view. Used for impact
 * statistics. Formats with an optional prefix/suffix and locale grouping.
 */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  prefix = "",
  suffix = "",
  className,
  immediate = false,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Start on mount instead of waiting to scroll into view (use in the hero). */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(from);
  const [display, setDisplay] = useState(from);
  const shouldRun = immediate || inView;

  useEffect(() => {
    if (!shouldRun) return;
    if (reduce) {
      setDisplay(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: CALM_EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return controls.stop;
  }, [shouldRun, reduce, to, duration, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Float — a gentle, endless vertical drift for the layered hero composition.
 * `depth` scales the travel so nearer cards move a touch more (parallax feel).
 */
export function Float({
  children,
  depth = 1,
  delay = 0,
  className,
}: {
  children: ReactNode;
  depth?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -10 * depth, 0] }}
      transition={{
        duration: 6 + depth,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
