interface ScoreGaugeProps {
  /** 0–100 */
  percentage: number;
  label: string;
  color: "green" | "yellow" | "orange" | "red";
}

const COLOR_MAP = {
  green: { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-500/10" },
  yellow: { stroke: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-500/10" },
  orange: { stroke: "stroke-orange-500", text: "text-orange-600", bg: "bg-orange-500/10" },
  red: { stroke: "stroke-red-500", text: "text-red-600", bg: "bg-red-500/10" },
};

export function ScoreGauge({ percentage, label, color }: ScoreGaugeProps) {
  const colors = COLOR_MAP[color];
  // SVG circle math
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 160 160"
        >
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
          <span className={`text-4xl font-bold ${colors.text}`}>
            {percentage}
          </span>
          <span className="text-xs text-muted-foreground mt-1">out of 100</span>
        </div>
      </div>
      <span
        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
      >
        {label}
      </span>
    </div>
  );
}
