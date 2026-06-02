/**
 * PersonalityCompassResults — Special results view for the Personality Compass.
 *
 * Displays:
 * - SVG Radar chart with 4 dimensions
 * - Each dimension with leaning label (e.g., "Leaning Introverted")
 * - Matched personality archetype with description
 */

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { ArrowRight, RotateCcw, Share2 } from "lucide-react";
import type {
  AssessmentConfig,
  PersonalityCompassResult,
  PersonalityDimension,
} from "@/data/assessments/types";

interface PersonalityCompassResultsProps {
  config: AssessmentConfig;
  result: PersonalityCompassResult;
  onRetake: () => void;
}

// ─── Radar Chart ────────────────────────────────────────────────────

function RadarChart({ dimensions }: { dimensions: PersonalityDimension[] }) {
  const size = 280;
  const center = size / 2;
  const levels = 5;
  const maxRadius = 100;

  // Calculate angles for each dimension
  const angleStep = (2 * Math.PI) / dimensions.length;

  // Get point coordinates for a given radius at a given index
  const getPoint = (index: number, radius: number) => {
    const angle = angleStep * index - Math.PI / 2; // Start from top
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate polygon points for the data shape
  const dataPoints = dimensions
    .map((dim, i) => {
      const r = (dim.percentage / 100) * maxRadius;
      const p = getPoint(i, r);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  // Color based on leaning
  const getLeaningColor = (leaning: string) => {
    if (leaning === "high") return "text-emerald-600";
    if (leaning === "low") return "text-blue-600";
    return "text-amber-600";
  };

  const getLeaningLabel = (dim: PersonalityDimension) => {
    if (dim.leaning === "high") return `Leaning ${dim.highLabel}`;
    if (dim.leaning === "low") return `Leaning ${dim.lowLabel}`;
    return "Balanced";
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mb-6">
        {/* Background grid */}
        {Array.from({ length: levels }, (_, i) => {
          const r = ((i + 1) / levels) * maxRadius;
          const points = dimensions
            .map((_, j) => {
              const p = getPoint(j, r);
              return `${p.x},${p.y}`;
            })
            .join(" ");
          return (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="currentColor"
              className="text-border"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const p = getPoint(i, maxRadius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-border"
              strokeWidth="1"
            />
          );
        })}

        {/* Data shape */}
        <polygon
          points={dataPoints}
          className="fill-primary/15 stroke-primary"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dimensions.map((dim, i) => {
          const r = (dim.percentage / 100) * maxRadius;
          const p = getPoint(i, r);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="5"
              className="fill-primary stroke-background"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {dimensions.map((dim, i) => {
          const p = getPoint(i, maxRadius + 28);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-[11px] font-medium"
            >
              {dim.label}
            </text>
          );
        })}
      </svg>

      {/* Dimension detail cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {dimensions.map((dim) => (
          <div
            key={dim.dimensionId}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className="text-xs text-muted-foreground mb-1">{dim.label}</p>
            <p className={`text-sm font-semibold ${getLeaningColor(dim.leaning)}`}>
              {getLeaningLabel(dim)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {dim.lowLabel} ↔ {dim.highLabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export function PersonalityCompassResults({
  config,
  result,
  onRetake,
}: PersonalityCompassResultsProps) {
  const { archetype, dimensions } = result;

  const handleShare = () => {
    const text = `I just took the Personality Compass™ on Calmtree and got "${archetype.label}". Try it yourself!`;
    if (navigator.share) {
      navigator.share({ text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          Your Personality Profile
        </h2>
        <p className="text-muted-foreground">
          {config.meta.title} · {result.answeredCount} of {result.totalQuestions}{" "}
          questions answered
        </p>
      </div>

      {/* Archetype card */}
      <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 md:p-8 mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Your Personality Archetype
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
          {archetype.label}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
          {archetype.description}
        </p>
      </div>

      {/* Radar chart */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Your Four Dimensions
        </h3>
        <RadarChart dimensions={dimensions} />
      </div>

      {/* Source attribution */}
      <p className="text-xs text-muted-foreground mb-8">
        Calmtree Original Assessment™ · This is an educational self-check, not a
        clinical diagnosis. {SITE.disclaimer}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onRetake}>
          <RotateCcw className="h-4 w-4" />
          Retake
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
          Share Result
        </Button>
        <Button asChild>
          <Link to="/assessments">
            Try Another Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
