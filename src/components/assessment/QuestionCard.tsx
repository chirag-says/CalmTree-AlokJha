import type { Question } from "@/data/assessments/types";

interface QuestionCardProps {
  question: Question;
  selectedValue: number | undefined;
  onSelect: (value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  selectedValue,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
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
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
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
  );
}
