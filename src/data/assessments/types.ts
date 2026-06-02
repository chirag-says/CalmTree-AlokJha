/**
 * CalmTree Assessment Engine — Type Definitions v2
 *
 * Designed to match the client's spec exactly:
 * - Uniform 1-5 Likert scale (10 questions, score 10-50)
 * - Dimensions (question groupings for sub-scores)
 * - Archetypes (branded result labels, not generic bands)
 * - Three-tier monetisation (Discovery/Growth/Professional)
 * - Special handling for Personality Compass (dimension-profile, no single score)
 *
 * Every assessment is a template. The engine consumes this shape.
 * Adding a new assessment = adding data, not code.
 */

// ─── Scale ───────────────────────────────────────────────────────────

export const LIKERT_5 = [
  { label: "Almost Never", value: 1 },
  { label: "Rarely", value: 2 },
  { label: "Sometimes", value: 3 },
  { label: "Often", value: 4 },
  { label: "Almost Always", value: 5 },
] as const;

export type ScaleOption = { label: string; value: number };

// ─── Tier & Category ────────────────────────────────────────────────

export type AssessmentTier = "discovery" | "growth" | "professional";
export type AssessmentCategory =
  | "Mental Wellness"
  | "Personal Growth"
  | "Professional"
  | "Relationships"
  | "Lifestyle";

export type AssessmentType = "standard" | "personality-compass";

// ─── Core Assessment Config ──────────────────────────────────────────

export interface AssessmentConfig {
  /** URL-safe identifier (e.g. "burnout-risk-check") */
  slug: string;
  /** Display order in the listing */
  order: number;
  /** Assessment type — standard (14) or personality-compass (1) */
  type: AssessmentType;
  meta: AssessmentMeta;
  instructions: string;
  questions: Question[];
  scoring: ScoringConfig;
  /** Archetype bands — used for standard assessments */
  archetypes: Archetype[];
  /** Dimension definitions — which questions map to which dimension */
  dimensions: DimensionDef[];
  /** For personality-compass only — archetype logic based on dimension combos */
  personalityArchetypes?: PersonalityArchetype[];
  tier: AssessmentTier;
  category: AssessmentCategory;
  /** Whether this assessment is live */
  status: "active" | "draft" | "archived";
}

export interface AssessmentMeta {
  title: string;
  subtitle: string;
  description: string;
  purpose: string;
  duration: string;
  questionCount: number;
  icon: AssessmentIcon;
}

export type AssessmentIcon =
  | "flame"
  | "brain"
  | "heart"
  | "clipboard-check"
  | "user"
  | "sparkles"
  | "briefcase"
  | "users"
  | "message-circle"
  | "book-open"
  | "monitor"
  | "sun"
  | "compass"
  | "shield"
  | "target"
  | "zap";

// ─── Questions ──────────────────────────────────────────────────────

export interface Question {
  id: string;
  text: string;
  options: ScaleOption[];
  /** If true, scoring is reversed (1→5, 2→4, etc.) */
  reverse?: boolean;
  /** Dimension this question belongs to (matches DimensionDef.id) */
  dimension?: string;
  /** Question weight (default 1) */
  weight?: number;
}

// ─── Dimensions ─────────────────────────────────────────────────────

export interface DimensionDef {
  /** Unique id (e.g. "recovery", "overload") */
  id: string;
  /** Display name (e.g. "Recovery") */
  label: string;
  /** Question IDs that belong to this dimension */
  questionIds: string[];
}

// ─── Archetypes (Standard assessments) ──────────────────────────────

export interface Archetype {
  /** Inclusive lower bound */
  min: number;
  /** Inclusive upper bound */
  max: number;
  /** Branded name (e.g. "Exhausted Warrior") */
  label: string;
  /** AI interpretation text */
  interpretation: string;
  /** Color for UI theming */
  color: "green" | "emerald" | "yellow" | "amber" | "orange" | "red" | "blue" | "purple";
}

// ─── Personality Compass Archetypes ─────────────────────────────────

export interface PersonalityArchetype {
  /** The combination trigger (e.g. "structured+logic+introvert") */
  profile: string;
  /** Display name (e.g. "Strategic Builder") */
  label: string;
  /** Description of this personality type */
  description: string;
}

// ─── Scoring Config ─────────────────────────────────────────────────

export interface ScoringConfig {
  method: "sum";
  /** Min possible total score (always 10 for 10-question Likert 1-5) */
  min: number;
  /** Max possible total score (always 50 for 10-question Likert 1-5) */
  max: number;
}

// ─── Results ────────────────────────────────────────────────────────

/** Result for standard (non-personality-compass) assessments */
export interface StandardResult {
  type: "standard";
  /** Raw total score (10-50) */
  totalScore: number;
  /** Percentage: ((score - 10) / 40) * 100 */
  percentage: number;
  /** Matched archetype */
  archetype: Archetype;
  /** Per-dimension scores */
  dimensionScores: DimensionScore[];
  answeredCount: number;
  totalQuestions: number;
}

/** Result for the Personality Compass */
export interface PersonalityCompassResult {
  type: "personality-compass";
  /** Per-dimension scores with low/high labels */
  dimensions: PersonalityDimension[];
  /** Matched personality archetype */
  archetype: PersonalityArchetype;
  answeredCount: number;
  totalQuestions: number;
}

export interface DimensionScore {
  dimensionId: string;
  label: string;
  score: number;
  /** Percentage within this dimension */
  percentage: number;
}

export interface PersonalityDimension {
  dimensionId: string;
  label: string;
  /** Average score for this dimension (1-5) */
  averageScore: number;
  /** Normalized to 0-100 for radar chart */
  percentage: number;
  /** Low end label (e.g. "Introverted") */
  lowLabel: string;
  /** High end label (e.g. "Extroverted") */
  highLabel: string;
  /** Which end the user leans toward */
  leaning: "low" | "balanced" | "high";
}

export type AssessmentResult = StandardResult | PersonalityCompassResult;

// ─── Runtime State ──────────────────────────────────────────────────

export interface AssessmentState {
  currentIndex: number;
  answers: Record<string, number>;
  completed: boolean;
}
