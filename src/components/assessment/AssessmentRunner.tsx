/**
 * AssessmentRunner — THE engine component.
 *
 * Feed it a config → it renders start screen, questions, progress, and results.
 * Handles both standard (14) and personality-compass (1) assessment types.
 */

import { useState, useCallback } from "react";
import { usePostHog } from "@posthog/react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { ResultsView } from "./ResultsView";
import { PersonalityCompassResults } from "./PersonalityCompassResults";
import { scoreAssessment } from "@/lib/assessment-engine";
import { ArrowLeft, ArrowRight, Clock, Lock, Sparkles } from "lucide-react";
import { TIER_BADGE } from "./TierBadge";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import type {
  AssessmentConfig,
  AssessmentState,
  AssessmentResult,
  StandardResult,
} from "@/data/assessments/types";

interface AssessmentRunnerProps {
  config: AssessmentConfig;
}

export function AssessmentRunner({ config }: AssessmentRunnerProps) {
  const [state, setState] = useState<AssessmentState>({
    currentIndex: 0,
    answers: {},
    completed: false,
  });
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const { saveIfAuthed } = useResultPersistence();
  const posthog = usePostHog();

  const { questions } = config;
  const currentQ = questions[state.currentIndex];
  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === questions.length - 1;
  const hasAnswer = currentQ ? state.answers[currentQ.id] !== undefined : false;

  const progress = Math.round((Object.keys(state.answers).length / questions.length) * 100);

  const selectAnswer = useCallback(
    (value: number) => {
      if (!currentQ) return;
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [currentQ.id]: value },
      }));
    },
    [currentQ],
  );

  const goNext = useCallback(() => {
    if (isLast) {
      const scored = scoreAssessment(config, state.answers);
      setResult(scored);
      setState((prev) => ({ ...prev, completed: true }));
      // Save immediately if logged in, stash in sessionStorage if anonymous.
      void saveIfAuthed(config, scored, state.answers);
      posthog.capture("assessment_completed", {
        assessment: config.meta.title,
        slug: config.slug,
        tier: config.tier,
        result_type: scored.type,
        question_count: config.meta.questionCount,
      });
    } else {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    }
  }, [isLast, config, state.answers, saveIfAuthed, posthog]);

  const goPrev = useCallback(() => {
    if (!isFirst) {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  }, [isFirst]);

  const retake = useCallback(() => {
    setState({ currentIndex: 0, answers: {}, completed: false });
    setResult(null);
    setStarted(false);
    posthog.capture("assessment_retaken", {
      assessment: config.meta.title,
      slug: config.slug,
      tier: config.tier,
    });
  }, [posthog, config]);

  const handleStart = () => {
    setStarted(true);
    posthog.capture("assessment_started", {
      assessment: config.meta.title,
      slug: config.slug,
      tier: config.tier,
      question_count: config.meta.questionCount,
    });
  };

  // ── Results screen ──
  if (result) {
    if (result.type === "personality-compass") {
      return <PersonalityCompassResults config={config} result={result} onRetake={retake} />;
    }
    return <ResultsView config={config} result={result as StandardResult} onRetake={retake} />;
  }

  // ── Start screen ──
  if (!started) {
    const TierBadge = TIER_BADGE[config.tier];
    return (
      <div className="text-center max-w-xl mx-auto">
        <div className="mb-4">
          <TierBadge />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">{config.meta.title}</h2>
        <p className="text-muted-foreground mb-2">{config.meta.subtitle}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {config.meta.duration}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            {config.meta.questionCount} questions
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            Private
          </span>
        </div>

        {/* Purpose card */}
        <div className="rounded-2xl border border-border bg-card p-6 text-left mb-4">
          <h3 className="font-semibold mb-2">What this measures</h3>
          <p className="text-sm text-muted-foreground">{config.meta.purpose}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 text-left mb-8">
          <h3 className="font-semibold mb-2">Before you start</h3>
          <p className="text-sm text-muted-foreground">{config.instructions}</p>
        </div>

        <Button size="lg" className="h-12 px-8" onClick={handleStart}>
          Start Assessment
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-xs text-muted-foreground mt-4">
          Calmtree Original Assessment™ · Non-clinical · For self-awareness only
        </p>
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div className="max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{config.meta.title}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current question */}
      {currentQ && (
        <QuestionCard
          key={currentQ.id}
          question={currentQ}
          selectedValue={state.answers[currentQ.id]}
          onSelect={selectAnswer}
          questionNumber={state.currentIndex + 1}
          totalQuestions={questions.length}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={goPrev} disabled={isFirst} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={goNext} disabled={!hasAnswer} className="gap-2">
          {isLast ? "See Results" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
