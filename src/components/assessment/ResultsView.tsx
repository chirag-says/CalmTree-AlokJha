/**
 * ResultsView — Standard assessment results (14 of 15 assessments).
 *
 * Shows: archetype badge, score gauge (X/50), percentage,
 * interpretation, dimension breakdown, and suggestions.
 */

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "./ScoreGauge";
import { DimensionBar } from "./DimensionBar";
import { SITE } from "@/data/constants";
import { ArrowRight, RotateCcw, Share2 } from "lucide-react";
import type { AssessmentConfig, StandardResult } from "@/data/assessments/types";

interface ResultsViewProps {
  config: AssessmentConfig;
  result: StandardResult;
  onRetake: () => void;
}

export function ResultsView({ config, result, onRetake }: ResultsViewProps) {
  const { archetype, dimensionScores } = result;

  const handleShare = () => {
    const text = `I just took the ${config.meta.title} on Calmtree and got "${archetype.label}" (${result.totalScore}/50). Try it yourself!`;
    if (navigator.share) {
      navigator.share({ text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Score display */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">Your Results</h2>
        <p className="text-muted-foreground">
          {config.meta.title} · {result.answeredCount} of {result.totalQuestions}{" "}
          questions answered
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <ScoreGauge
          score={result.totalScore}
          maxScore={50}
          percentage={result.percentage}
          label={archetype.label}
          color={archetype.color}
        />
      </div>

      {/* Archetype card */}
      <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 md:p-8 mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Your Archetype
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
          {archetype.label}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
          {archetype.interpretation}
        </p>
      </div>

      {/* Dimension breakdown */}
      {dimensionScores.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6">Dimension Breakdown</h3>
          <div className="space-y-5">
            {dimensionScores.map((dim) => (
              <DimensionBar
                key={dim.dimensionId}
                label={dim.label}
                score={dim.score}
                percentage={dim.percentage}
              />
            ))}
          </div>
        </div>
      )}

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
