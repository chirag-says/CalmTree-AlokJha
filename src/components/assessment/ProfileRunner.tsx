/**
 * ProfileRunner — assessment engine for profile-based assessments.
 *
 * Each question has labelled options that map to a profile code.
 * Scoring counts votes per profile; the highest count wins.
 *
 * Motion mirrors the AssessmentRunner fluid slice (ios-design): swipe-to-advance
 * with momentum projection (§2/§6), directional spring slides (§7), instant
 * per-option press feedback + haptics (§1/§13), a brief auto-advance after a
 * pick, and reduced-motion fallbacks (§14). Options are rendered inline here
 * (this runner is index-based, so it does NOT share QuestionCard).
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { usePostHog } from "@posthog/react";
import { Button } from "@/components/ui/button";
import { ProfileResultsView } from "./ProfileResultsView";
import { scoreAssessment } from "@/lib/assessment-engine";
import { ArrowLeft, ArrowRight, Clock, Lock, Sparkles, Check } from "lucide-react";
import { TIER_BADGE } from "./TierBadge";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import { haptic } from "@/lib/haptics";
import { project, CARD_SPRING, CARD_SLIDE, SWIPE_COMMIT } from "@/lib/fluid";
import type { ProfileAssessmentConfig } from "@/data/assessments/types";
import type { ProfileResult, AssessmentResult } from "@/data/assessments/types";

interface ProfileRunnerProps {
  config: ProfileAssessmentConfig;
  /**
   * Optional completion override — replaces the default account-save / stash.
   * Used by the B2B employee runner to persist against an invite token.
   */
  onComplete?: (
    config: ProfileAssessmentConfig,
    result: AssessmentResult,
    answers: Record<string, number>,
  ) => void | Promise<void>;
  /**
   * When provided (e.g. from "My Results"), mounts straight into the results
   * view for these saved answers rather than the start screen.
   */
  initialAnswers?: Record<string, number>;
}

export function ProfileRunner({ config, onComplete, initialAnswers }: ProfileRunnerProps) {
  const restored = initialAnswers && Object.keys(initialAnswers).length > 0 ? initialAnswers : null;
  const [started, setStarted] = useState(restored !== null);
  // answers: questionId -> option index (0-based)
  const [answers, setAnswers] = useState<Record<string, number>>(() => restored ?? {});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<ProfileResult | null>(() =>
    restored ? (scoreAssessment(config, restored) as ProfileResult) : null,
  );
  // +1 = advancing forward, -1 = going back. Drives the directional slide (§7).
  const [direction, setDirection] = useState(1);

  const reduce = useReducedMotion();
  // Pending auto-advance timer — cancel it if the user navigates manually or
  // unmounts before it fires.
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

  const { profileQuestions } = config;
  const currentQ = profileQuestions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === profileQuestions.length - 1;
  const hasAnswer = currentQ ? answers[currentQ.id] !== undefined : false;

  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / profileQuestions.length) * 100);

  const selectAnswer = useCallback(
    (optionIndex: number) => {
      if (!currentQ) return;
      setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
    },
    [currentQ],
  );

  const goNext = useCallback(() => {
    clearAuto();
    setDirection(1);
    if (isLast) {
      haptic("commit");
      const scored = scoreAssessment(config, answers) as ProfileResult;
      setResult(scored);
      // B2B employee runner overrides persistence; otherwise save-if-authed.
      if (onComplete) {
        void onComplete(config, scored, answers);
      } else {
        void saveIfAuthed(config, scored, answers);
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
      setCurrentIndex((i) => i + 1);
    }
  }, [isLast, config, answers, saveIfAuthed, onComplete, posthog, clearAuto]);

  const goPrev = useCallback(() => {
    clearAuto();
    if (!isFirst) {
      setDirection(-1);
      haptic("commit");
      setCurrentIndex((i) => i - 1);
    }
  }, [isFirst, clearAuto]);

  // Picking an option auto-advances after a brief beat, so a decisive user
  // barely touches Next — but the pause leaves room to correct a mis-tap. Only
  // on non-final questions; the last step commits explicitly via "See Results"
  // (§2 agency: don't auto-fire a step that feels irreversible).
  const handleSelect = useCallback(
    (optionIndex: number) => {
      selectAnswer(optionIndex);
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
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setStarted(false);
    posthog.capture("assessment_retaken", {
      assessment: config.meta.title,
      slug: config.slug,
      tier: config.tier,
    });
  }, [posthog, config, clearAuto]);

  const handleStart = useCallback(() => {
    setStarted(true);
    posthog.capture("assessment_started", {
      assessment: config.meta.title,
      slug: config.slug,
      tier: config.tier,
      question_count: config.meta.questionCount,
    });
  }, [posthog, config]);

  // ── Results ──
  if (result) {
    return <ProfileResultsView config={config} result={result} onRetake={retake} />;
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

      {/* Current question — swipe left/right to move between questions. The card
          tracks the finger, then projects momentum to land or spring back
          (§2/§6). Enter/exit slide mirrors nav direction (§7). */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          {currentQ && (
            <motion.div
              key={currentIndex}
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
              <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-4">
                Question {currentIndex + 1} of {profileQuestions.length}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug mb-8">
                {currentQ.text}
              </h3>
              <div className="flex flex-col gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <motion.button
                      key={idx}
                      type="button"
                      // §1: instant, physical press feedback on pointer-down.
                      whileTap={reduce ? undefined : { scale: 0.985 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                      onClick={() => {
                        // §13: only tick when the value actually changes.
                        if (!isSelected) haptic("select");
                        handleSelect(idx);
                      }}
                      className={`group flex w-full items-center justify-between gap-3 text-left px-5 py-4 rounded-xl border-2 cursor-pointer
                        transition-colors duration-150
                        ${
                          isSelected
                            ? "border-primary bg-primary/8 text-foreground shadow-sm"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/[0.03]"
                        }`}
                    >
                      <span className="text-sm font-medium">{opt.label}</span>
                      {/* Confirmation mark materializes with the selection (§8 hint). */}
                      <motion.span
                        aria-hidden
                        initial={false}
                        animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.6 }}
                        transition={
                          reduce
                            ? { duration: 0.12 }
                            : { type: "spring", bounce: 0.3, duration: 0.3 }
                        }
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </motion.span>
                    </motion.button>
                  );
                })}
              </div>
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
