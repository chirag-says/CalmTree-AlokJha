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
      className="surface-raised rounded-xl sm:rounded-2xl p-3 sm:p-5"
    >
      <div className="mb-1 sm:mb-2 flex items-center justify-between gap-1">
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground truncate">{label}</p>
        {Icon && <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary/70" />}
      </div>
      <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
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
              "inline-flex items-center gap-0.5 rounded-full px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs font-medium",
              delta >= 0 ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
            )}
          >
            {delta >= 0 ? <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
            {Math.abs(Math.round(delta))}%
          </span>
        )}
      </div>
      {sub && <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-muted-foreground/80">{sub}</p>}
    </motion.div>
  );
}
