/**
 * Assessment Engine — Type Definitions
 *
 * One schema to rule them all. Every assessment is a JSON config
 * that conforms to this shape. The engine consumes config, the UI
 * renders it, the scorer evaluates it. No assessment-specific code anywhere.
 */

export interface AssessmentConfig {
  slug: string;
  meta: {
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    questionCount: number;
    /** Lucide icon name */
    icon: "flame" | "brain" | "heart" | "clipboard-check" | "user" | "sparkles";
    /** Source attribution for the instrument */
    source: string;
  };
  instructions: string;
  questions: Question[];
  scoring: ScoringConfig;
  resultRanges: ResultRange[];
}

export interface Question {
  id: string;
  text: string;
  /** Options shown to user — order matters (low→high or as defined) */
  options: { label: string; value: number }[];
  /** If true, scoring is reversed (max - value + min) */
  reverse?: boolean;
}

export interface ScoringConfig {
  /** How to combine individual answers */
  method: "sum" | "average" | "percentage";
  /** Min possible total score */
  min: number;
  /** Max possible total score */
  max: number;
}

export interface ResultRange {
  /** Inclusive lower bound */
  min: number;
  /** Inclusive upper bound */
  max: number;
  label: string;
  /** Color for the gauge — tailwind color name */
  color: "green" | "yellow" | "orange" | "red";
  interpretation: string;
  suggestions: string[];
}

/** Runtime state for an in-progress assessment */
export interface AssessmentState {
  currentIndex: number;
  answers: Record<string, number>;
  completed: boolean;
}

/** Result after scoring */
export interface AssessmentResult {
  score: number;
  /** Normalized to 0-100 for gauge display */
  percentage: number;
  range: ResultRange;
  answeredCount: number;
  totalQuestions: number;
}
