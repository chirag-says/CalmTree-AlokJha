/**
 * Assessment Registry — single import to get any assessment by slug.
 * Add a new assessment: import it, add to the map. Done.
 */

import type { AssessmentConfig } from "./types";
import { stressCheck } from "./stress-check";
import { burnoutScore } from "./burnout-score";
import { selfEsteemCheck } from "./self-esteem-check";
import { emotionalIntelligence } from "./emotional-intelligence";
import { personalityStyle } from "./personality-style";

export const ASSESSMENTS: Record<string, AssessmentConfig> = {
  "stress-check": stressCheck,
  "burnout-score": burnoutScore,
  "self-esteem-check": selfEsteemCheck,
  "emotional-intelligence": emotionalIntelligence,
  "personality-style": personalityStyle,
};

/** Ordered list for the listing page */
export const ASSESSMENT_LIST: AssessmentConfig[] = [
  burnoutScore,
  stressCheck,
  emotionalIntelligence,
  selfEsteemCheck,
  personalityStyle,
];

export function getAssessment(slug: string): AssessmentConfig | undefined {
  return ASSESSMENTS[slug];
}
