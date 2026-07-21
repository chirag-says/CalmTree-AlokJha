/**
 * G7. External Validation Dependence
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Examines how strongly approval, praise, attention and others’ reactions determine confidence and choices.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const externalValidationDependence: AssessmentConfig = {
  slug: "external-validation-dependence",
  order: 67,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "External Validation Dependence",
    subtitle: "A quick read on your external-validation dependence.",
    description:
      "Examines how strongly approval, praise, attention and others’ reactions determine confidence and choices. Ten honest questions, instant results, completely private.",
    purpose:
      "Examines how strongly approval, praise, attention and others’ reactions determine confidence and choices.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "monitor",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g7q1",
      text: "I feel uncertain about a decision until someone important approves it.",
      options: [...LIKERT_5],
      dimension: "reassurance",
    },
    {
      id: "g7q2",
      text: "I can recognise my own progress without public acknowledgement.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "internal-reference",
    },
    {
      id: "g7q3",
      text: "Criticism from one person can outweigh positive evidence from many situations.",
      options: [...LIKERT_5],
      dimension: "criticism-sensitivity",
    },
    {
      id: "g7q4",
      text: "I change preferences to avoid appearing different from the group.",
      options: [...LIKERT_5],
      dimension: "conformity",
    },
    {
      id: "g7q5",
      text: "I can receive praise without needing more of it to feel secure.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "praise-balance",
    },
    {
      id: "g7q6",
      text: "I monitor how people react before deciding whether I was authentic or acceptable.",
      options: [...LIKERT_5],
      dimension: "social-monitoring",
    },
    {
      id: "g7q7",
      text: "I can tolerate someone misunderstanding or disliking a reasonable choice.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "autonomy",
    },
    {
      id: "g7q8",
      text: "Low engagement online makes me question whether something was worth sharing.",
      options: [...LIKERT_5],
      dimension: "digital-validation",
    },
    {
      id: "g7q9",
      text: "I use personal values to judge important decisions.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "values-reference",
    },
    {
      id: "g7q10",
      text: "I avoid setting boundaries because approval may decrease.",
      options: [...LIKERT_5],
      dimension: "approval-based-boundaries",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "reassurance", label: "Reassurance", questionIds: ["g7q1"] },
    { id: "internal-reference", label: "Internal reference", questionIds: ["g7q2"] },
    { id: "criticism-sensitivity", label: "Criticism sensitivity", questionIds: ["g7q3"] },
    { id: "conformity", label: "Conformity", questionIds: ["g7q4"] },
    { id: "praise-balance", label: "Praise balance", questionIds: ["g7q5"] },
    { id: "social-monitoring", label: "Social monitoring", questionIds: ["g7q6"] },
    { id: "autonomy", label: "Autonomy", questionIds: ["g7q7"] },
    { id: "digital-validation", label: "Digital validation", questionIds: ["g7q8"] },
    { id: "values-reference", label: "Values reference", questionIds: ["g7q9"] },
    { id: "approval-based-boundaries", label: "Approval-based boundaries", questionIds: ["g7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Internally Anchored",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of external-validation dependence. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Approval Sensitive",
      color: "yellow",
      interpretation:
        "Some signs of external-validation dependence are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Validation-Driven",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of external-validation dependence that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Approval Dependence High",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of external-validation dependence. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
