/**
 * DimensionRadar — the "shape" of a multi-dimension result.
 *
 * A single-series radar over the dimension percentages. It complements (does not
 * replace) the DimensionBar list below it: the radar communicates the overall
 * profile shape at a glance, the bars carry the precise per-dimension numbers.
 *
 * Dataviz notes: single series → one hue (brand sage --primary), no legend, a
 * recessive polar grid, thin 2px stroke, soft fill. Theme-aware via CSS vars
 * (the same component reads correctly in light and dark). Animation is disabled
 * under prefers-reduced-motion.
 *
 * Only worth rendering with ≥ 3 axes — the caller guards on that.
 */

import { useReducedMotion } from "motion/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DimensionDatum {
  label: string;
  score: number;
  percentage: number;
}

interface DimensionRadarProps {
  dimensions: DimensionDatum[];
}

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: DimensionDatum }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-popover-foreground">{d.label}</p>
      <p className="text-xs text-muted-foreground">{d.percentage}%</p>
    </div>
  );
}

export function DimensionRadar({ dimensions }: DimensionRadarProps) {
  const reduce = useReducedMotion();
  const data = dimensions.map((d) => ({
    label: d.label,
    score: d.score,
    percentage: d.percentage,
  }));

  return (
    <div className="w-full" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius="70%"
          margin={{ top: 8, right: 24, bottom: 8, left: 24 }}
        >
          <PolarGrid stroke="var(--color-border)" strokeOpacity={0.7} />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} tickCount={5} />
          <Radar
            dataKey="percentage"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="var(--color-primary)"
            fillOpacity={0.18}
            isAnimationActive={!reduce}
            animationDuration={600}
          />
          <Tooltip content={<RadarTooltip />} cursor={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
