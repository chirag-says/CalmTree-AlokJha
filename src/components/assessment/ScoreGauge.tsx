/**
 * ScoreGauge v2 — circular gauge showing score/maxScore with archetype label.
 * Updated for the Calmtree Original format (X/50 + percentage).
 */

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  /** 0–100 normalized percentage */
  percentage: number;
  label: string;
  color: string;
}

const COLOR_MAP: Record<string, { stroke: string; text: string; bg: string }> = {
  green: { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-500/10" },
  emerald: { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-500/10" },
  yellow: { stroke: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-500/10" },
  amber: { stroke: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-500/10" },
  orange: { stroke: "stroke-orange-500", text: "text-orange-600", bg: "bg-orange-500/10" },
  red: { stroke: "stroke-red-500", text: "text-red-600", bg: "bg-red-500/10" },
  blue: { stroke: "stroke-blue-500", text: "text-blue-600", bg: "bg-blue-500/10" },
  purple: { stroke: "stroke-purple-500", text: "text-purple-600", bg: "bg-purple-500/10" },
};

export function ScoreGauge({ score, maxScore, percentage, label, color }: ScoreGaugeProps) {
  const colors = COLOR_MAP[color] ?? COLOR_MAP.green!;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth="10"
          />
          {/* Score arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            className={colors.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${colors.text}`}>{score}</span>
          <span className="text-xs text-muted-foreground mt-1">out of {maxScore}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span
          className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
        >
          {label}
        </span>
        <span className="text-sm text-muted-foreground">{percentage}% percentile</span>
      </div>
    </div>
  );
}
