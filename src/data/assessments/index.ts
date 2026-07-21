/**
 * Assessment Registry — single import to get any assessment.
 *
 * All 100 Calmtree assessments (Packs 1-10), organized by tier.
 * Add a new assessment: import it, add to the map and list. Done.
 */

import type { AssessmentConfig, ProfileAssessmentConfig, AssessmentTier } from "./types";
export type { ProductCategory } from "./types";

// ─── Pack 1: Self-Awareness and Personality ────────────────────────
import { confidenceQuotient } from "./confidence-quotient";
import { emotionalIntelligence } from "./emotional-intelligence";
import { personalityCompass } from "./personality-compass";
import { happinessBlueprint } from "./happiness-blueprint";
import { workplacePersonalityStyle } from "./workplace-personality-style";
import { socialEnergyAtWork } from "./social-energy-at-work";
import { structureVsFlexibility } from "./structure-vs-flexibility";
import { detailVsBigPicture } from "./detail-vs-big-picture";
import { communicationStyle } from "./communication-style";
import { learningStyle } from "./learning-style";

// ─── Pack 2: Emotional Wellbeing and Digital Balance ───────────────
import { burnoutRiskCheck } from "./burnout-risk-check";
import { stressLevelCheck } from "./stress-level-check";
import { screenDependency } from "./screen-dependency";
import { workLifeHarmony } from "./work-life-harmony";
import { workloadRecoveryCapacity } from "./workload-recovery-capacity";
import { meetingFatigueCheck } from "./meeting-fatigue-check";
import { workplaceInterruptionSensitivity } from "./workplace-interruption-sensitivity";
import { afterWorkDetachment } from "./after-work-detachment";
import { workplaceEmotionalLoad } from "./workplace-emotional-load";
import { changeFatigue } from "./change-fatigue";

// ─── Pack 3: Workplace Effectiveness and Stress ────────────────────
import { careerSatisfaction } from "./career-satisfaction";
import { teamPlayerIndex } from "./team-player-index";
import { riskTakingAtWork } from "./risk-taking-at-work";
import { workplaceAssertiveness } from "./workplace-assertiveness-style";
import { controlOrientation } from "./control-orientation";
import { recognitionNeedAtWork } from "./recognition-need-at-work";
import { independenceVsCollaboration } from "./independence-vs-collaboration";
import { workplaceAdaptabilityStyle } from "./workplace-adaptability-style";
import { workplaceStressTriggerMap } from "./workplace-stress-trigger-map";
import { unclearRoleStress } from "./unclear-role-stress";

// ─── Pack 4: Leadership, Relationships and Influence ───────────────
import { entrepreneurResilience } from "./entrepreneur-resilience";
import { relationshipHealth } from "./relationship-health";
import { leadershipDNA } from "./leadership-dna";
import { deadlinePressureResponse } from "./deadline-pressure-response";
import { pressureDecisionStyle } from "./pressure-decision-style";
import { naturalLeadershipOrientation } from "./natural-leadership-orientation";
import { feedbackResponseStyle } from "./feedback-response-style";
import { teamTrustStyle } from "./team-trust-style";
import { psychologicalSafetyCheck } from "./psychological-safety-check";
import { workplaceInfluenceStyle } from "./workplace-influence-style";

// ─── Pack 5: Relationships and Emotional Connection ────────────────
import { relationshipCommunicationPattern } from "./relationship-communication-pattern";
import { emotionalNeedsAwareness } from "./emotional-needs-awareness";
import { closenessPersonalSpace } from "./closeness-personal-space";
import { conflictResponsePattern } from "./conflict-response-pattern";
import { trustVulnerabilityReadiness } from "./trust-vulnerability-readiness";
import { relationshipExpectationsCheck } from "./relationship-expectations-check";
import { appreciationExpressionStyle } from "./appreciation-expression-style";
import { boundaryBalanceRelationships } from "./boundary-balance-relationships";
import { difficultConversationReadiness } from "./difficult-conversation-readiness";
import { repairAfterConflict } from "./repair-after-conflict";

// ─── Pack 6: Founders and Entrepreneurship ───
import { founderReadinessAssessment } from "./founder-readiness-assessment";
import { entrepreneurialRiskOrientation } from "./entrepreneurial-risk-orientation";
import { decisionMakingUnderUncertainty } from "./decision-making-under-uncertainty";
import { coFounderWorkingAlignment } from "./co-founder-working-alignment";
import { delegationReadiness } from "./delegation-readiness";
import { controlAndTrustPattern } from "./control-and-trust-pattern";
import { visionToExecutionBalance } from "./vision-to-execution-balance";
import { founderBurnoutWarningSigns } from "./founder-burnout-warning-signs";
import { fundraisingReadinessMindset } from "./fundraising-readiness-mindset";
import { founderLearningAgility } from "./founder-learning-agility";

// ─── Pack 7: Gen Z, Student Life and Digital Wellbeing ───
import { digitalOverloadCheck } from "./digital-overload-check";
import { socialComparisonPressure } from "./social-comparison-pressure";
import { fomoResponsePattern } from "./fomo-response-pattern";
import { onlineIdentityBalance } from "./online-identity-balance";
import { careerUncertaintyTolerance } from "./career-uncertainty-tolerance";
import { academicPressurePattern } from "./academic-pressure-pattern";
import { externalValidationDependence } from "./external-validation-dependence";
import { friendshipAndBelongingCheck } from "./friendship-and-belonging-check";
import { attentionFragmentationCheck } from "./attention-fragmentation-check";
import { independentLivingReadiness } from "./independent-living-readiness";

// ─── Pack 8: Career Direction and Professional Growth ───
import { careerClarityCheck } from "./career-clarity-check";
import { roleFitReflection } from "./role-fit-reflection";
import { strengthsInActionAssessment } from "./strengths-in-action-assessment";
import { learningAgilityCheck } from "./learning-agility-check";
import { careerChangeReadiness } from "./career-change-readiness";
import { promotionReadiness } from "./promotion-readiness";
import { networkingComfortAssessment } from "./networking-comfort-assessment";
import { meaningAtWorkReflection } from "./meaning-at-work-reflection";
import { sideHustleReadiness } from "./side-hustle-readiness";
import { futureSkillsReadiness } from "./future-skills-readiness";

// ─── Pack 9: Family, Parenting and Social Roles ───
import { parentingCommunicationPattern } from "./parenting-communication-pattern";
import { parentTeenConnectionCheck } from "./parent-teen-connection-check";
import { familyBoundaryBalance } from "./family-boundary-balance";
import { caregiverLoadReflection } from "./caregiver-load-reflection";
import { familyConflictResponse } from "./family-conflict-response";
import { intergenerationalExpectationsCheck } from "./intergenerational-expectations-check";
import { parentingUnderStress } from "./parenting-under-stress";
import { coupleToParentRoleBalance } from "./couple-to-parent-role-balance";
import { siblingRelationshipPattern } from "./sibling-relationship-pattern";
import { familyDecisionMakingStyle } from "./family-decision-making-style";

// ─── Pack 10: Life Transitions, Meaning and Healthy Ageing ───
import { psychologicalRetirementReadiness } from "./psychological-retirement-readiness";
import { attitudeTowardsAgeing } from "./attitude-towards-ageing";
import { purposeAfter50 } from "./purpose-after-50";
import { lifeTransitionAdaptability } from "./life-transition-adaptability";
import { identityBeyondWork } from "./identity-beyond-work";
import { socialConnectionCheck } from "./social-connection-check";
import { meaningAndLegacyReflection } from "./meaning-and-legacy-reflection";
import { changeAndLossAdjustment } from "./change-and-loss-adjustment";
import { healthBehaviourMotivation } from "./health-behaviour-motivation";
import { reinventionReadiness } from "./reinvention-readiness";

export type AnyAssessmentConfig = AssessmentConfig | ProfileAssessmentConfig;

/** Lookup by slug */
export const ASSESSMENTS: Record<string, AssessmentConfig | ProfileAssessmentConfig> = {
  // Pack 1
  "confidence-quotient": confidenceQuotient,
  "emotional-intelligence": emotionalIntelligence,
  "personality-compass": personalityCompass,
  "happiness-blueprint": happinessBlueprint,
  "workplace-personality-style": workplacePersonalityStyle,
  "social-energy-at-work": socialEnergyAtWork,
  "structure-vs-flexibility": structureVsFlexibility,
  "detail-vs-big-picture": detailVsBigPicture,
  "communication-style": communicationStyle,
  "learning-style": learningStyle,
  // Pack 2
  "burnout-risk-check": burnoutRiskCheck,
  "stress-level-check": stressLevelCheck,
  "screen-dependency": screenDependency,
  "work-life-harmony": workLifeHarmony,
  "workload-recovery-capacity": workloadRecoveryCapacity,
  "meeting-fatigue-check": meetingFatigueCheck,
  "workplace-interruption-sensitivity": workplaceInterruptionSensitivity,
  "after-work-detachment": afterWorkDetachment,
  "workplace-emotional-load": workplaceEmotionalLoad,
  "change-fatigue": changeFatigue,
  // Pack 3
  "career-satisfaction": careerSatisfaction,
  "team-player-index": teamPlayerIndex,
  "risk-taking-at-work": riskTakingAtWork,
  "workplace-assertiveness-style": workplaceAssertiveness,
  "control-orientation": controlOrientation,
  "recognition-need-at-work": recognitionNeedAtWork,
  "independence-vs-collaboration": independenceVsCollaboration,
  "workplace-adaptability-style": workplaceAdaptabilityStyle,
  "workplace-stress-trigger-map": workplaceStressTriggerMap,
  "unclear-role-stress": unclearRoleStress,
  // Pack 4
  "entrepreneur-resilience": entrepreneurResilience,
  "relationship-health": relationshipHealth,
  "leadership-dna": leadershipDNA,
  "deadline-pressure-response": deadlinePressureResponse,
  "pressure-decision-style": pressureDecisionStyle,
  "natural-leadership-orientation": naturalLeadershipOrientation,
  "feedback-response-style": feedbackResponseStyle,
  "team-trust-style": teamTrustStyle,
  "psychological-safety-check": psychologicalSafetyCheck,
  "workplace-influence-style": workplaceInfluenceStyle,
  // Pack 5
  "relationship-communication-pattern": relationshipCommunicationPattern,
  "emotional-needs-awareness": emotionalNeedsAwareness,
  "closeness-personal-space": closenessPersonalSpace,
  "conflict-response-pattern": conflictResponsePattern,
  "trust-vulnerability-readiness": trustVulnerabilityReadiness,
  "relationship-expectations-check": relationshipExpectationsCheck,
  "appreciation-expression-style": appreciationExpressionStyle,
  "boundary-balance-relationships": boundaryBalanceRelationships,
  "difficult-conversation-readiness": difficultConversationReadiness,
  "repair-after-conflict": repairAfterConflict,
  // Pack 6: Founders and Entrepreneurship
  "founder-readiness-assessment": founderReadinessAssessment,
  "entrepreneurial-risk-orientation": entrepreneurialRiskOrientation,
  "decision-making-under-uncertainty": decisionMakingUnderUncertainty,
  "co-founder-working-alignment": coFounderWorkingAlignment,
  "delegation-readiness": delegationReadiness,
  "control-and-trust-pattern": controlAndTrustPattern,
  "vision-to-execution-balance": visionToExecutionBalance,
  "founder-burnout-warning-signs": founderBurnoutWarningSigns,
  "fundraising-readiness-mindset": fundraisingReadinessMindset,
  "founder-learning-agility": founderLearningAgility,
  // Pack 7: Gen Z, Student Life and Digital Wellbeing
  "digital-overload-check": digitalOverloadCheck,
  "social-comparison-pressure": socialComparisonPressure,
  "fomo-response-pattern": fomoResponsePattern,
  "online-identity-balance": onlineIdentityBalance,
  "career-uncertainty-tolerance": careerUncertaintyTolerance,
  "academic-pressure-pattern": academicPressurePattern,
  "external-validation-dependence": externalValidationDependence,
  "friendship-and-belonging-check": friendshipAndBelongingCheck,
  "attention-fragmentation-check": attentionFragmentationCheck,
  "independent-living-readiness": independentLivingReadiness,
  // Pack 8: Career Direction and Professional Growth
  "career-clarity-check": careerClarityCheck,
  "role-fit-reflection": roleFitReflection,
  "strengths-in-action-assessment": strengthsInActionAssessment,
  "learning-agility-check": learningAgilityCheck,
  "career-change-readiness": careerChangeReadiness,
  "promotion-readiness": promotionReadiness,
  "networking-comfort-assessment": networkingComfortAssessment,
  "meaning-at-work-reflection": meaningAtWorkReflection,
  "side-hustle-readiness": sideHustleReadiness,
  "future-skills-readiness": futureSkillsReadiness,
  // Pack 9: Family, Parenting and Social Roles
  "parenting-communication-pattern": parentingCommunicationPattern,
  "parent-teen-connection-check": parentTeenConnectionCheck,
  "family-boundary-balance": familyBoundaryBalance,
  "caregiver-load-reflection": caregiverLoadReflection,
  "family-conflict-response": familyConflictResponse,
  "intergenerational-expectations-check": intergenerationalExpectationsCheck,
  "parenting-under-stress": parentingUnderStress,
  "couple-to-parent-role-balance": coupleToParentRoleBalance,
  "sibling-relationship-pattern": siblingRelationshipPattern,
  "family-decision-making-style": familyDecisionMakingStyle,
  // Pack 10: Life Transitions, Meaning and Healthy Ageing
  "psychological-retirement-readiness": psychologicalRetirementReadiness,
  "attitude-towards-ageing": attitudeTowardsAgeing,
  "purpose-after-50": purposeAfter50,
  "life-transition-adaptability": lifeTransitionAdaptability,
  "identity-beyond-work": identityBeyondWork,
  "social-connection-check": socialConnectionCheck,
  "meaning-and-legacy-reflection": meaningAndLegacyReflection,
  "change-and-loss-adjustment": changeAndLossAdjustment,
  "health-behaviour-motivation": healthBehaviourMotivation,
  "reinvention-readiness": reinventionReadiness,
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

/** Get assessments by pack */
export function getAssessmentsByPack(pack: number): AnyAssessmentConfig[] {
  const ranges: Record<number, [number, number]> = {
    1: [1, 10],
    2: [11, 20],
    3: [21, 30],
    4: [31, 40],
    5: [41, 50],
    6: [51, 60],
    7: [61, 70],
    8: [71, 80],
    9: [81, 90],
    10: [91, 100],
  };
  const range = ranges[pack];
  if (!range) return [];
  return ASSESSMENT_LIST.filter((a) => a.order >= range[0] && a.order <= range[1]);
}

/** Tier metadata for display */
export const TIER_INFO: Record<
  AssessmentTier,
  { label: string; description: string; price: string; priceInr: number | null; color: string }
> = {
  discovery: {
    label: "Discovery",
    description: "Free self-checks to understand where you are today.",
    price: "Free",
    priceInr: null,
    color: "green",
  },
  growth: {
    label: "Growth",
    description: "Deeper assessments with detailed reports and insights.",
    price: "₹99",
    priceInr: 99,
    color: "blue",
  },
  professional: {
    label: "Professional",
    description: "Premium assessments for leaders, teams, and career growth.",
    price: "₹299",
    priceInr: 299,
    color: "purple",
  },
};
