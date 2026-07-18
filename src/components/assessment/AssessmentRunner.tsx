/**
 * AssessmentRunner — THE engine component.
 *
 * Feed it a config → it renders start screen, questions, progress, and results.
 * Handles both standard (14) and personality-compass (1) assessment types.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { usePostHog } from "@posthog/react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "./QuestionCard";
import { ResultsView } from "./ResultsView";
import { PersonalityCompassResults } from "./PersonalityCompassResults";
import { scoreAssessment } from "@/lib/assessment-engine";
import { ArrowLeft, ArrowRight, Clock, Lock, Sparkles } from "lucide-react";
import { TIER_BADGE } from "./TierBadge";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import { haptic } from "@/lib/haptics";
import { project, CARD_SPRING, CARD_SLIDE, SWIPE_COMMIT } from "@/lib/fluid";
import type {
  AssessmentConfig,
  AssessmentState,
  AssessmentResult,
  StandardResult,
} from "@/data/assessments/types";

interface AssessmentRunnerProps {
  config: AssessmentConfig;
  /**
   * Optional override for what happens when the assessment is completed.
   * When provided, it replaces the default "save to my account / stash"
   * behaviour — used by the B2B employee runner to persist against an invite
   * token instead of a logged-in user.
   */
  onComplete?: (
    config: AssessmentConfig,
    result: AssessmentResult,
    answers: Record<string, number>,
  ) => void | Promise<void>;
  /**
   * When provided (e.g. from "My Results"), the runner mounts straight into the
   * results view for these previously-saved answers, rather than the start
   * screen. "Retake" still resets to a fresh run.
   */
  initialAnswers?: Record<string, number>;
}

export function AssessmentRunner({ config, onComplete, initialAnswers }: AssessmentRunnerProps) {
  const restored = initialAnswers && Object.keys(initialAnswers).length > 0 ? initialAnswers : null;
  const [state, setState] = useState<AssessmentState>(() => ({
    currentIndex: 0,
    answers: restored ?? {},
    completed: restored !== null,
  }));
  const [started, setStarted] = useState(restored !== null);
  const [result, setResult] = useState<AssessmentResult | null>(() =>
    restored ? scoreAssessment(config, restored) : null,
  );
  // +1 = advancing forward, -1 = going back. Drives the directional slide (§7):
  // forward cards enter from the right, back cards enter from the left.
  const [direction, setDirection] = useState(1);

  const reduce = useReducedMotion();
  // Pending auto-advance timer, so we can cancel it if the user navigates
  // manually or unmounts before it fires.
  const autoAdvance = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearAuto = useCallback(() => {
    if (autoAdvance.current) {
      clearTimeout(autoAdvance.current);
      autoAdvance.current = null;
    }
  }, []);
  useEffect(() => clearAuto, [clearAuto]);

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
    clearAuto();
    setDirection(1);
    if (isLast) {
      haptic("commit");
      const scored = scoreAssessment(config, state.answers);
      setResult(scored);
      setState((prev) => ({ ...prev, completed: true }));
      // B2B employee runner overrides persistence; otherwise save if logged in
      // or stash in sessionStorage when anonymous.
      if (onComplete) {
        void onComplete(config, scored, state.answers);
      } else {
        void saveIfAuthed(config, scored, state.answers);
      }
      posthog.capture("assessment_completed", {
        assessment: config.meta.title,
        slug: config.slug,
        tier: config.tier,
        result_type: scored.type,
        question_count: config.meta.questionCount,
      });
    } else {
      haptic("commit");
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    }
  }, [isLast, config, state.answers, saveIfAuthed, onComplete, posthog, clearAuto]);

  const goPrev = useCallback(() => {
    clearAuto();
    if (!isFirst) {
      setDirection(-1);
      haptic("commit");
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  }, [isFirst, clearAuto]);

  // Selecting an answer auto-advances after a brief beat, so a decisive user
  // barely touches the Next button — but the pause leaves room to correct a
  // mis-tap. Only on non-final questions; the last step commits explicitly via
  // "See Results" (§2 agency: don't auto-fire an irreversible-feeling step).
  const handleSelect = useCallback(
    (value: number) => {
      selectAnswer(value);
      clearAuto();
      if (!isLast) {
        autoAdvance.current = setTimeout(() => goNext(), 280);
      }
    },
    [selectAnswer, clearAuto, isLast, goNext],
  );

  // §2/§6: a swipe tracks the finger, then projects its momentum to decide
  // whether it lands on the next/previous question or rubber-bands home.
  const onDragEnd = useCallback(
    (_e: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
      const projected = info.offset.x + project(info.velocity.x);
      if (projected < -SWIPE_COMMIT && hasAnswer) {
        goNext();
      } else if (projected > SWIPE_COMMIT && !isFirst) {
        goPrev();
      } else if (Math.abs(projected) > SWIPE_COMMIT) {
        // Wanted to move but there's nothing that way — §9 boundary feedback.
        haptic("boundary");
      }
    },
    [hasAnswer, isFirst, goNext, goPrev],
  );

  const retake = useCallback(() => {
    clearAuto();
    setDirection(1);
    setState({ currentIndex: 0, answers: {}, completed: false });
    setResult(null);
    setStarted(false);
    posthog.capture("assessment_retaken", {
      assessment: config.meta.title,
      slug: config.slug,
      tier: config.tier,
    });
  }, [posthog, config, clearAuto]);

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

      {/* Current question — swipe left/right to move between questions. The
          card tracks the finger, then projects momentum to land or spring back
          (§2/§6). Enter/exit slide direction mirrors nav direction (§7). */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          {currentQ && (
            <motion.div
              key={state.currentIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: reduce ? 0 : dir > 0 ? CARD_SLIDE : -CARD_SLIDE,
                  opacity: 0,
                }),
                center: { x: 0, opacity: 1 },
                exit: (dir: number) => ({
                  x: reduce ? 0 : dir > 0 ? -CARD_SLIDE : CARD_SLIDE,
                  opacity: 0,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={CARD_SPRING}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              // Progressive resistance = §9 rubber-banding at the edges.
              dragElastic={0.5}
              dragSnapToOrigin
              onDragEnd={onDragEnd}
              className="touch-pan-y"
              whileDrag={{ cursor: "grabbing" }}
            >
              <QuestionCard
                question={currentQ}
                selectedValue={state.answers[currentQ.id]}
                onSelect={handleSelect}
                questionNumber={state.currentIndex + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
