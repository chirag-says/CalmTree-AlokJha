/**
 * Calmtree Assessment Scoring Engine v2
 *
 * Pure functions. No side effects. No UI. No network calls.
 *
 * Two scoring paths:
 *   1. Standard — sum answers (with reverse scoring), map to archetype, compute dimension sub-scores
 *   2. Personality Compass — compute per-dimension averages, determine leanings, match profile archetype
 *
 * Percentage formula (from client spec): ((score - 10) / 40) × 100
 */

import type {
  AssessmentConfig,
  AssessmentResult,
  StandardResult,
  PersonalityCompassResult,
  ProfileResult,
  ProfileDef,
  ProfileAssessmentConfig,
  Question,
  DimensionScore,
  PersonalityDimension,
} from "@/data/assessments/types";

// ─── Main entry ─────────────────────────────────────────────────────

export function scoreAssessment(
  config: AssessmentConfig | ProfileAssessmentConfig,
  answers: Record<string, number>,
): AssessmentResult {
  if (config.type === "profile-based") {
    return scoreProfileBased(config as ProfileAssessmentConfig, answers);
  }
  const stdConfig = config as AssessmentConfig;
  if (stdConfig.type === "personality-compass") {
    return scorePersonalityCompass(stdConfig, answers);
  }
  return scoreStandard(stdConfig, answers);
}

// ─── Standard scoring (14 assessments) ──────────────────────────────

function scoreStandard(config: AssessmentConfig, answers: Record<string, number>): StandardResult {
  const { questions, scoring, archetypes, dimensions } = config;

  let total = 0;
  let answeredCount = 0;

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined) continue;
    total += scoreQuestion(q, raw);
    answeredCount++;
  }

  // Client formula: ((score - 10) / 40) * 100
  const percentage = Math.round(((total - scoring.min) / (scoring.max - scoring.min)) * 100);

  // Find matching archetype
  const archetype =
    archetypes.find((a) => total >= a.min && total <= a.max) ?? archetypes[archetypes.length - 1]!;

  // Compute dimension sub-scores
  const dimensionScores = computeDimensionScores(questions, answers, dimensions);

  return {
    type: "standard",
    totalScore: total,
    percentage: Math.max(0, Math.min(100, percentage)),
    archetype,
    dimensionScores,
    answeredCount,
    totalQuestions: questions.length,
  };
}

// ─── Personality Compass scoring ────────────────────────────────────

function scorePersonalityCompass(
  config: AssessmentConfig,
  answers: Record<string, number>,
): PersonalityCompassResult {
  const { questions, dimensions, personalityArchetypes } = config;

  let answeredCount = 0;
  for (const q of questions) {
    if (answers[q.id] !== undefined) answeredCount++;
  }

  // For each dimension, compute average score
  const personalityDimensions: PersonalityDimension[] = dimensions.map((dim) => {
    const dimQuestions = questions.filter((q) => dim.questionIds.includes(q.id));
    let sum = 0;
    let count = 0;

    for (const q of dimQuestions) {
      const raw = answers[q.id];
      if (raw === undefined) continue;
      sum += scoreQuestion(q, raw);
      count++;
    }

    const avgScore = count > 0 ? sum / count : 3;
    const percentage = Math.round(((avgScore - 1) / 4) * 100);

    // Determine leaning: < 2.5 = low, > 3.5 = high, else balanced
    let leaning: "low" | "balanced" | "high" = "balanced";
    if (avgScore < 2.5) leaning = "low";
    else if (avgScore > 3.5) leaning = "high";

    // Extract low/high labels from dimension label
    // These are set in the dimension definition
    const labels = getDimensionLabels(dim.id);

    return {
      dimensionId: dim.id,
      label: dim.label,
      averageScore: Math.round(avgScore * 10) / 10,
      percentage: Math.max(0, Math.min(100, percentage)),
      lowLabel: labels.low,
      highLabel: labels.high,
      leaning,
    };
  });

  // Match personality archetype based on dimension leanings
  const archetype = matchPersonalityArchetype(personalityDimensions, personalityArchetypes ?? []);

  return {
    type: "personality-compass",
    dimensions: personalityDimensions,
    archetype,
    answeredCount,
    totalQuestions: questions.length,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────

function scoreQuestion(question: Question, answer: number): number {
  if (!question.reverse) return answer;
  const values = question.options.map((o) => o.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - answer + min;
}

function computeDimensionScores(
  questions: Question[],
  answers: Record<string, number>,
  dimensions: { id: string; label: string; questionIds: string[] }[],
): DimensionScore[] {
  return dimensions.map((dim) => {
    const dimQuestions = questions.filter((q) => dim.questionIds.includes(q.id));
    let sum = 0;
    let count = 0;

    for (const q of dimQuestions) {
      const raw = answers[q.id];
      if (raw === undefined) continue;
      sum += scoreQuestion(q, raw);
      count++;
    }

    const maxPossible = dimQuestions.length * 5;
    const minPossible = dimQuestions.length * 1;
    const percentage =
      count > 0 ? Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100) : 0;

    return {
      dimensionId: dim.id,
      label: dim.label,
      score: sum,
      percentage: Math.max(0, Math.min(100, percentage)),
    };
  });
}

/** Personality Compass dimension labels */
function getDimensionLabels(dimId: string): { low: string; high: string } {
  const labels: Record<string, { low: string; high: string }> = {
    "social-energy": { low: "Introverted", high: "Extroverted" },
    structure: { low: "Flexible", high: "Structured" },
    "decision-style": { low: "Empathy Driven", high: "Logic Driven" },
    adaptability: { low: "Stable", high: "Adaptive" },
  };
  return labels[dimId] ?? { low: "Low", high: "High" };
}

/**
 * Match a personality archetype based on dimension leanings.
 * Uses the client's archetype logic table.
 */
function matchPersonalityArchetype(
  dimensions: PersonalityDimension[],
  archetypes: { profile: string; label: string; description: string }[],
): { profile: string; label: string; description: string } {
  const get = (id: string) => dimensions.find((d) => d.dimensionId === id);

  const social = get("social-energy");
  const structure = get("structure");
  const decision = get("decision-style");
  const adaptability = get("adaptability");

  const isIntrovert = social?.leaning === "low";
  const isExtrovert = social?.leaning === "high";
  const isStructured = structure?.leaning === "high";
  const isFlexible = structure?.leaning === "low";
  const isLogic = decision?.leaning === "high";
  const isEmpathy = decision?.leaning === "low";
  const isAdaptive = adaptability?.leaning === "high";

  // Client's archetype matching rules (ordered by specificity)
  if (isStructured && isLogic && isIntrovert) {
    return findArchetype(archetypes, "structured+logic+introvert");
  }
  if (isStructured && isEmpathy) {
    return findArchetype(archetypes, "structured+empathy");
  }
  if (isAdaptive && isExtrovert) {
    return findArchetype(archetypes, "adaptive+social");
  }
  if (isAdaptive && isLogic) {
    return findArchetype(archetypes, "adaptive+logic");
  }
  if (isIntrovert && isStructured) {
    return findArchetype(archetypes, "introvert+structured");
  }
  if (isExtrovert && isEmpathy) {
    return findArchetype(archetypes, "social+empathy");
  }
  if (isAdaptive && isFlexible) {
    return findArchetype(archetypes, "adaptive+flexible");
  }

  // Default: balanced
  return findArchetype(archetypes, "balanced");
}

// ─── Profile-Based scoring ─────────────────────────────────────────

function scoreProfileBased(
  config: ProfileAssessmentConfig,
  answers: Record<string, number>,
): ProfileResult {
  const { profileQuestions, profiles, tieBreakQuestionIds } = config;

  // answers for profile-based store profileCode as a numeric index (0-based into the options array)
  // but ProfileRunner will store the option index; we need to map back to profileCode.
  // Convention: answers[questionId] = option index (0-based)
  const counts: Record<string, number> = {};
  for (const p of profiles) counts[p.code] = 0;

  let answeredCount = 0;

  for (const q of profileQuestions) {
    const selectedIndex = answers[q.id];
    if (selectedIndex === undefined) continue;
    const option = q.options[selectedIndex];
    if (!option) continue;
    counts[option.profileCode] = (counts[option.profileCode] ?? 0) + 1;
    answeredCount++;
  }

  // Sort profiles by count descending
  const sorted = [...profiles].sort((a, b) => (counts[b.code] ?? 0) - (counts[a.code] ?? 0));

  let primary = sorted[0]!;
  let secondary: ProfileDef | undefined;

  // Tie-break: use tieBreakQuestionIds in order
  const second = sorted[1];
  if (second && (counts[primary.code] ?? 0) === (counts[second.code] ?? 0)) {
    // Apply tie-break: whichever of the two tied profiles appears first in the tie-break questions
    for (const qId of tieBreakQuestionIds) {
      const selectedIndex = answers[qId];
      if (selectedIndex === undefined) continue;
      const q = profileQuestions.find((pq) => pq.id === qId);
      if (!q) continue;
      const option = q.options[selectedIndex];
      if (!option) continue;
      const tiedCodes = sorted
        .filter((p) => (counts[p.code] ?? 0) === (counts[sorted[0]!.code] ?? 0))
        .map((p) => p.code);
      if (tiedCodes.includes(option.profileCode)) {
        primary = profiles.find((p) => p.code === option.profileCode) ?? primary;
        break;
      }
    }
  }

  // Secondary: if second-highest is within 1 point
  if (second && primary.code !== second.code) {
    const primaryCount = counts[primary.code] ?? 0;
    const secondCount = counts[second.code] ?? 0;
    if (primaryCount - secondCount <= 1) {
      secondary = second;
    }
  }

  return {
    type: "profile-based",
    primary,
    secondary,
    counts,
    answeredCount,
    totalQuestions: profileQuestions.length,
  };
}

function findArchetype(
  archetypes: { profile: string; label: string; description: string }[],
  profile: string,
): { profile: string; label: string; description: string } {
  return (
    archetypes.find((a) => a.profile === profile) ?? {
      profile: "balanced",
      label: "Versatile Navigator",
      description:
        "You show a balanced profile across dimensions — adaptable and well-rounded in your approach to life and work.",
    }
  );
}
