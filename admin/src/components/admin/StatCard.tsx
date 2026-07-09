/**
 * StatCard — headline metric card with animated value and optional
 * period-over-period delta badge.
 */

import type { ComponentType } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedNumber } from "./AnimatedNumber";
import { cn } from "@/lib/utils";

type StatFormat = "number" | "currency" | "percent";

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  delta,
  format = "number",
  index = 0,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon?: ComponentType<{ className?: string }>;
  /** Percent change vs the previous period; renders a ▲/▼ badge. */
  delta?: number | null;
  format?: StatFormat;
  /** Position in a card grid — staggers the entrance animation. */
  index?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="surface-raised rounded-2xl p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-primary/70" />}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-foreground">
          {typeof value === "number" ? (
            format === "currency" ? (
              <AnimatedNumber value={value} prefix="₹" format={{ maximumFractionDigits: 0 }} />
            ) : format === "percent" ? (
              <AnimatedNumber value={value} suffix="%" />
            ) : (
              <AnimatedNumber value={value} />
            )
          ) : (
            value
          )}
        </p>
        {delta != null && Number.isFinite(delta) && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
              delta >= 0 ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
            )}
          >
            {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(Math.round(delta))}%
          </span>
        )}
      </div>
      {sub && <p className="mt-1 text-xs text-muted-foreground/80">{sub}</p>}
    </motion.div>
  );
}
