/**
 * AnimatedNumber — spring-animates numeric changes without re-rendering
 * (writes straight to textContent). Falls back to a static value when the
 * user prefers reduced motion.
 */

import { useEffect, useMemo, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function AnimatedNumber({
  value,
  format,
  prefix = "",
  suffix = "",
}: {
  value: number;
  format?: Intl.NumberFormatOptions;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 90, damping: 22 });

  // Stable formatter — `format` callers pass literals, so serialize for identity.
  const formatKey = JSON.stringify(format ?? {});
  const formatter = useMemo(
    () => new Intl.NumberFormat("en-IN", format),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formatKey],
  );
  const wantsFraction = (format?.maximumFractionDigits ?? 0) > 0;

  useEffect(() => {
    if (reducedMotion) {
      motionValue.jump(value);
    } else {
      motionValue.set(value);
    }
  }, [value, reducedMotion, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatter.format(wantsFraction ? v : Math.round(v))}${suffix}`;
      }
    });
  }, [spring, formatter, prefix, suffix, wantsFraction]);

  // SSR / first paint shows the final value; the spring takes over on mount.
  return (
    <span ref={ref}>
      {prefix}
      {formatter.format(value)}
      {suffix}
    </span>
  );
}
