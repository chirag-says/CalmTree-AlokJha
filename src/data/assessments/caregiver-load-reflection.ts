/**
 * P4. Caregiver Load Reflection
 * Pack 9 — Family, Parenting and Social Roles
 * Helps people providing family care notice emotional load, practical strain, isolation and sustainability.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const caregiverLoadReflection: AssessmentConfig = {
  slug: "caregiver-load-reflection",
  order: 84,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Caregiver Load Reflection",
    subtitle: "A quick read on your caregiver strain.",
    description:
      "Helps people providing family care notice emotional load, practical strain, isolation and sustainability. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps people providing family care notice emotional load, practical strain, isolation and sustainability.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p4q1",
      text: "I have regular periods when someone else can reliably take over care responsibilities.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "respite",
    },
    {
      id: "p4q2",
      text: "I feel guilty when I attend to my own needs.",
      options: [...LIKERT_5],
      dimension: "caregiver-guilt",
    },
    {
      id: "p4q3",
      text: "Care responsibilities interfere with sleep, health or essential work.",
      options: [...LIKERT_5],
      dimension: "life-impact",
    },
    {
      id: "p4q4",
      text: "I can ask family members or services for specific help.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "support-seeking",
    },
    {
      id: "p4q5",
      text: "I feel that other people do not understand the amount I am carrying.",
      options: [...LIKERT_5],
      dimension: "isolation",
    },
    {
      id: "p4q6",
      text: "I have clear information about the care needs and available options.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "clarity",
    },
    {
      id: "p4q7",
      text: "I become irritable or emotionally numb more often than before.",
      options: [...LIKERT_5],
      dimension: "emotional-exhaustion",
    },
    {
      id: "p4q8",
      text: "I can maintain at least one part of life that is not defined by caregiving.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "identity-balance",
    },
    {
      id: "p4q9",
      text: "I worry that care will fail if I reduce my involvement even briefly.",
      options: [...LIKERT_5],
      dimension: "over-responsibility",
    },
    {
      id: "p4q10",
      text: "The current arrangement feels sustainable for the next three months.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "sustainability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "respite", label: "Respite", questionIds: ["p4q1"] },
    { id: "caregiver-guilt", label: "Caregiver guilt", questionIds: ["p4q2"] },
    { id: "life-impact", label: "Life impact", questionIds: ["p4q3"] },
    { id: "support-seeking", label: "Support seeking", questionIds: ["p4q4"] },
    { id: "isolation", label: "Isolation", questionIds: ["p4q5"] },
    { id: "clarity", label: "Clarity", questionIds: ["p4q6"] },
    { id: "emotional-exhaustion", label: "Emotional exhaustion", questionIds: ["p4q7"] },
    { id: "identity-balance", label: "Identity balance", questionIds: ["p4q8"] },
    { id: "over-responsibility", label: "Over-responsibility", questionIds: ["p4q9"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["p4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Care Load Manageable",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of caregiver strain. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Care Pressure Building",
      color: "yellow",
      interpretation:
        "Some signs of caregiver strain are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "High Caregiver Strain",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of caregiver strain that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Caregiver Sustainability at Risk",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of caregiver strain. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
