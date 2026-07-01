/**
 * ProfileRunner — assessment engine for profile-based assessments.
 *
 * Each question has labelled options that map to a profile code.
 * Scoring counts votes per profile; the highest count wins.
 */

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ProfileResultsView } from "./ProfileResultsView";
import { scoreAssessment } from "@/lib/assessment-engine";
import { ArrowLeft, ArrowRight, Clock, Lock, Sparkles } from "lucide-react";
import { TIER_BADGE } from "./TierBadge";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import type { ProfileAssessmentConfig } from "@/data/assessments/types";
import type { ProfileResult } from "@/data/assessments/types";

interface ProfileRunnerProps {
  config: ProfileAssessmentConfig;
}

export function ProfileRunner({ config }: ProfileRunnerProps) {
  const [started, setStarted] = useState(false);
  // answers: questionId -> option index (0-based)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<ProfileResult | null>(null);

  const { saveIfAuthed } = useResultPersistence();

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
    if (isLast) {
      const scored = scoreAssessment(config, answers) as ProfileResult;
      setResult(scored);
      // Save immediately if logged in, stash in sessionStorage if anonymous.
      void saveIfAuthed(config, scored, answers);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [isLast, config, answers, saveIfAuthed]);

  const goPrev = useCallback(() => {
    if (!isFirst) setCurrentIndex((i) => i - 1);
  }, [isFirst]);

  const retake = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setStarted(false);
  }, []);

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

        <Button size="lg" className="h-12 px-8" onClick={() => setStarted(true)}>
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
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
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
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectAnswer(idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                    ${
                      isSelected
                        ? "border-primary bg-primary/8 text-foreground shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/[0.03]"
                    }`}
                >
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
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
