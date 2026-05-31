/**
 * Assessment Scoring Engine
 *
 * Pure functions. No side effects. No UI. Just math.
 * Consumes an AssessmentConfig + user answers, returns a result.
 */

import type {
  AssessmentConfig,
  AssessmentResult,
  Question,
} from "@/data/assessments/types";

/**
 * Score a single question, handling reverse scoring.
 */
function scoreQuestion(question: Question, answer: number): number {
  if (!question.reverse) return answer;
  const values = question.options.map((o) => o.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - answer + min;
}

/**
 * Calculate the final assessment result from config + answers.
 */
export function scoreAssessment(
  config: AssessmentConfig,
  answers: Record<string, number>,
): AssessmentResult {
  const { questions, scoring, resultRanges } = config;

  // Score each answered question
  let total = 0;
  let answeredCount = 0;

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined) continue;
    total += scoreQuestion(q, raw);
    answeredCount++;
  }

  // Calculate final score based on method
  let score: number;
  switch (scoring.method) {
    case "sum":
      score = total;
      break;
    case "average":
      score = answeredCount > 0 ? total / answeredCount : 0;
      break;
    case "percentage":
      score =
        answeredCount > 0
          ? Math.round((total / (answeredCount * Math.max(...questions[0]!.options.map((o) => o.value)))) * 100)
          : 0;
      break;
  }

  // Normalize to 0-100 for gauge
  const percentage = Math.round(
    ((score - scoring.min) / (scoring.max - scoring.min)) * 100,
  );

  // Find matching result range
  const range =
    resultRanges.find((r) => score >= r.min && score <= r.max) ??
    resultRanges[resultRanges.length - 1]!;

  return {
    score: Math.round(score * 10) / 10,
    percentage: Math.max(0, Math.min(100, percentage)),
    range,
    answeredCount,
    totalQuestions: questions.length,
  };
}
