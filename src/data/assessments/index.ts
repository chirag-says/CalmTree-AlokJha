/**
 * Assessment Registry — single import to get any assessment.
 *
 * All 15 CalmTree Original™ assessments, organized by tier.
 * Add a new assessment: import it, add to the map and list. Done.
 */

import type { AssessmentConfig, AssessmentTier } from "./types";

// Discovery Tier (Free)
import { burnoutRiskCheck } from "./burnout-risk-check";
import { stressLevelCheck } from "./stress-level-check";
import { confidenceQuotient } from "./confidence-quotient";
import { screenDependency } from "./screen-dependency";
import { happinessBlueprint } from "./happiness-blueprint";

// Growth Tier (₹99-299)
import { emotionalIntelligence } from "./emotional-intelligence";
import { personalityCompass } from "./personality-compass";
import { relationshipHealth } from "./relationship-health";
import { communicationStyle } from "./communication-style";
import { learningStyle } from "./learning-style";

// Professional Tier (₹299-999)
import { workLifeHarmony } from "./work-life-harmony";
import { entrepreneurResilience } from "./entrepreneur-resilience";
import { leadershipDNA } from "./leadership-dna";
import { careerSatisfaction } from "./career-satisfaction";
import { teamPlayerIndex } from "./team-player-index";

/** Lookup by slug */
export const ASSESSMENTS: Record<string, AssessmentConfig> = {
  "burnout-risk-check": burnoutRiskCheck,
  "stress-level-check": stressLevelCheck,
  "confidence-quotient": confidenceQuotient,
  "screen-dependency": screenDependency,
  "happiness-blueprint": happinessBlueprint,
  "emotional-intelligence": emotionalIntelligence,
  "personality-compass": personalityCompass,
  "relationship-health": relationshipHealth,
  "communication-style": communicationStyle,
  "learning-style": learningStyle,
  "work-life-harmony": workLifeHarmony,
  "entrepreneur-resilience": entrepreneurResilience,
  "leadership-dna": leadershipDNA,
  "career-satisfaction": careerSatisfaction,
  "team-player-index": teamPlayerIndex,
};

/** Ordered list — sorted by tier then order */
export const ASSESSMENT_LIST: AssessmentConfig[] = Object.values(ASSESSMENTS).sort(
  (a, b) => {
    const tierOrder: Record<AssessmentTier, number> = {
      discovery: 0,
      growth: 1,
      professional: 2,
    };
    const tierDiff = tierOrder[a.tier] - tierOrder[b.tier];
    return tierDiff !== 0 ? tierDiff : a.order - b.order;
  },
);

/** Get assessments by tier */
export function getAssessmentsByTier(tier: AssessmentTier): AssessmentConfig[] {
  return ASSESSMENT_LIST.filter((a) => a.tier === tier);
}

/** Get single assessment by slug */
export function getAssessment(slug: string): AssessmentConfig | undefined {
  return ASSESSMENTS[slug];
}

/** Tier metadata for display */
export const TIER_INFO: Record<
  AssessmentTier,
  { label: string; description: string; price: string; color: string }
> = {
  discovery: {
    label: "Discovery",
    description: "Free self-checks to understand where you are today.",
    price: "Free",
    color: "green",
  },
  growth: {
    label: "Growth",
    description: "Deeper assessments with detailed reports and insights.",
    price: "₹99–299",
    color: "blue",
  },
  professional: {
    label: "Professional",
    description: "Premium assessments for leaders, teams, and career growth.",
    price: "₹299–999",
    color: "purple",
  },
};
