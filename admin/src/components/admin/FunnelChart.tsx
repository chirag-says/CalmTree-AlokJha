/**
 * FunnelChart — horizontal, motion-animated conversion funnel. Each bar is
 * scaled to the first step's count; per-step conversion % is labelled.
 */

import { motion, useReducedMotion } from "motion/react";

export interface FunnelStep {
  label: string;
  count: number;
  pct: number;
}

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const reducedMotion = useReducedMotion();
  const max = Math.max(steps[0]?.count ?? 0, 1);

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const width = Math.max((step.count / max) * 100, 2);
        return (
          <div key={step.label}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className="text-foreground">{step.label}</span>
              <span className="text-muted-foreground">
                {step.count.toLocaleString("en-IN")}
                {i > 0 && <span className="ml-2 text-xs">({step.pct}%)</span>}
              </span>
            </div>
            <div className="h-8 overflow-hidden rounded-lg bg-muted">
              <motion.div
                className="h-full rounded-lg bg-primary/80"
                initial={reducedMotion ? false : { width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
