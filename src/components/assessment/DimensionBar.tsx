/**
 * DimensionBar — horizontal progress bar for a single dimension sub-score.
 */

interface DimensionBarProps {
  label: string;
  score: number;
  percentage: number;
}

export function DimensionBar({ label, score, percentage }: DimensionBarProps) {
  const getColor = (pct: number) => {
    if (pct >= 75) return "bg-emerald-500";
    if (pct >= 50) return "bg-amber-500";
    if (pct >= 25) return "bg-orange-500";
    return "bg-red-400";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-border overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getColor(percentage)}`}
          style={{ width: `${Math.max(4, percentage)}%` }}
        />
      </div>
    </div>
  );
}
