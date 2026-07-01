/**
 * Assessment Registry — single import to get any assessment.
 *
 * All 40 CalmTree Original™ assessments, organized by tier.
 * Add a new assessment: import it, add to the map and list. Done.
 */

import type { AssessmentConfig, ProfileAssessmentConfig, AssessmentTier } from "./types";
export type { ProductCategory } from "./types";

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
import { independenceVsCollaboration } from "./independence-vs-collaboration";
import { detailVsBigPicture } from "./detail-vs-big-picture";
import { workplaceAdaptabilityStyle } from "./workplace-adaptability-style";
import { workplaceStressTriggerMap } from "./workplace-stress-trigger-map";
import { deadlinePressureResponse } from "./deadline-pressure-response";
import { workloadRecoveryCapacity } from "./workload-recovery-capacity";
import { unclearRoleStress } from "./unclear-role-stress";
import { workplacePersonalityStyle } from "./workplace-personality-style";
import { socialEnergyAtWork } from "./social-energy-at-work";
import { structureVsFlexibility } from "./structure-vs-flexibility";
import { riskTakingAtWork } from "./risk-taking-at-work";
import { workplaceAssertiveness } from "./workplace-assertiveness-style";
import { controlOrientation } from "./control-orientation";
import { recognitionNeedAtWork } from "./recognition-need-at-work";
import { meetingFatigueCheck } from "./meeting-fatigue-check";
import { workplaceInterruptionSensitivity } from "./workplace-interruption-sensitivity";
import { afterWorkDetachment } from "./after-work-detachment";
import { pressureDecisionStyle } from "./pressure-decision-style";
import { workplaceEmotionalLoad } from "./workplace-emotional-load";
import { changeFatigue } from "./change-fatigue";
import { naturalLeadershipOrientation } from "./natural-leadership-orientation";
import { feedbackResponseStyle } from "./feedback-response-style";
import { teamTrustStyle } from "./team-trust-style";
import { psychologicalSafetyCheck } from "./psychological-safety-check";
import { workplaceInfluenceStyle } from "./workplace-influence-style";

export type AnyAssessmentConfig = AssessmentConfig | ProfileAssessmentConfig;

/** Lookup by slug */
export const ASSESSMENTS: Record<string, AssessmentConfig | ProfileAssessmentConfig> = {
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
  "workplace-personality-style": workplacePersonalityStyle,
  "social-energy-at-work": socialEnergyAtWork,
  "structure-vs-flexibility": structureVsFlexibility,
  "risk-taking-at-work": riskTakingAtWork,
  "workplace-assertiveness-style": workplaceAssertiveness,
  "control-orientation": controlOrientation,
  "recognition-need-at-work": recognitionNeedAtWork,
  "independence-vs-collaboration": independenceVsCollaboration,
  "detail-vs-big-picture": detailVsBigPicture,
  "workplace-adaptability-style": workplaceAdaptabilityStyle,
  "workplace-stress-trigger-map": workplaceStressTriggerMap,
  "deadline-pressure-response": deadlinePressureResponse,
  "workload-recovery-capacity": workloadRecoveryCapacity,
  "unclear-role-stress": unclearRoleStress,
  "meeting-fatigue-check": meetingFatigueCheck,
  "workplace-interruption-sensitivity": workplaceInterruptionSensitivity,
  "after-work-detachment": afterWorkDetachment,
  "pressure-decision-style": pressureDecisionStyle,
  "workplace-emotional-load": workplaceEmotionalLoad,
  "change-fatigue": changeFatigue,
  "natural-leadership-orientation": naturalLeadershipOrientation,
  "feedback-response-style": feedbackResponseStyle,
  "team-trust-style": teamTrustStyle,
  "psychological-safety-check": psychologicalSafetyCheck,
  "workplace-influence-style": workplaceInfluenceStyle,
};

/** Ordered list — sorted by tier then order */
export const ASSESSMENT_LIST: AnyAssessmentConfig[] = Object.values(ASSESSMENTS).sort(
  (a: AnyAssessmentConfig, b: AnyAssessmentConfig) => {
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
export function getAssessmentsByTier(tier: AssessmentTier): AnyAssessmentConfig[] {
  return ASSESSMENT_LIST.filter((a) => a.tier === tier);
}

/** Get single assessment by slug */
export function getAssessment(slug: string): AnyAssessmentConfig | undefined {
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
