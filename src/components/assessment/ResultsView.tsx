import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "./ScoreGauge";
import { SITE } from "@/data/constants";
import { ArrowRight, RotateCcw, CheckCircle } from "lucide-react";
import type { AssessmentConfig, AssessmentResult } from "@/data/assessments/types";

interface ResultsViewProps {
  config: AssessmentConfig;
  result: AssessmentResult;
  onRetake: () => void;
}

export function ResultsView({ config, result, onRetake }: ResultsViewProps) {
  const { range } = result;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Score display */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          Your Results
        </h2>
        <p className="text-muted-foreground">
          {config.meta.title} · {result.answeredCount} of{" "}
          {result.totalQuestions} questions answered
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <ScoreGauge
          percentage={result.percentage}
          label={range.label}
          color={range.color}
        />
      </div>

      {/* Interpretation */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
        <h3 className="text-xl font-semibold mb-3">What this means</h3>
        <p className="text-muted-foreground leading-relaxed">
          {range.interpretation}
        </p>
      </div>

      {/* Suggestions */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-8">
        <h3 className="text-xl font-semibold mb-4">What you can do</h3>
        <ul className="space-y-3">
          {range.suggestions.map((s, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Source attribution */}
      <p className="text-xs text-muted-foreground mb-8">
        {config.meta.source} This is an educational self-check, not a clinical
        diagnosis. {SITE.disclaimer}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onRetake}>
          <RotateCcw className="h-4 w-4" />
          Retake Assessment
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
