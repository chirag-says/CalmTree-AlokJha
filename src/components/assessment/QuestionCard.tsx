import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { haptic } from "@/lib/haptics";
import type { Question } from "@/data/assessments/types";

interface QuestionCardProps {
  question: Question;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

/**
 * QuestionCard — purely presentational. The AssessmentRunner owns enter/exit
 * motion and gesture handling; this component only renders the question and
 * its options, with per-option press feedback.
 *
 * §1 Response: the press scale fires on pointer-DOWN (whileTap), so feedback is
 *   instant, not on release.
 * §10 Gesture: the actual selection commits on click (pointer-up), which is the
 *   correct edge to commit a tap.
 * §13 Multimodal: a selection is a meaningful commit — pair it with a haptic.
 */
export function QuestionCard({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  const reduce = useReducedMotion();

  return (
    <div>
      <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase mb-4">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-snug mb-8">
        {question.text}
      </h3>
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              // §1: instant, physical press feedback on pointer-down.
              whileTap={reduce ? undefined : { scale: 0.985 }}
              // Critically damped settle — no bounce on a reflective UI (§4).
              transition={{ type: "spring", bounce: 0, duration: 0.25 }}
              onClick={() => {
                // §13: only tick when the value actually changes.
                if (!isSelected) haptic("select");
                onSelect(opt.value);
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
                animate={{
                  opacity: isSelected ? 1 : 0,
                  scale: isSelected ? 1 : 0.6,
                }}
                transition={
                  reduce ? { duration: 0.12 } : { type: "spring", bounce: 0.3, duration: 0.3 }
                }
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
