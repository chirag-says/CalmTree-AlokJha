/**
 * W17. After-Work Detachment Check
 * Measures the ability to mentally disengage from work and re-enter
 * personal life after working hours.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const afterWorkDetachment: AssessmentConfig = {
  slug: "after-work-detachment",
  order: 32,
  type: "standard",
  tier: "professional",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "After-Work Detachment Check",
    subtitle: "Can you switch off after work?",
    description:
      "Measure your ability to mentally disengage from work and re-enter personal life after working hours.",
    purpose:
      "Measures the ability to mentally disengage from work and re-enter personal life after working hours.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w17q1",
      text: "I can stop checking work messages after my working day ends.",
      options: [...LIKERT_5],
      dimension: "digital-boundary",
    },
    {
      id: "w17q2",
      text: "I replay difficult work conversations during personal time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "mental-carryover",
    },
    {
      id: "w17q3",
      text: "My evenings include activities that feel separate from my work identity.",
      options: [...LIKERT_5],
      dimension: "identity-shift",
    },
    {
      id: "w17q4",
      text: "I feel guilty when I am not available for work outside normal hours.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "availability-guilt",
    },
    {
      id: "w17q5",
      text: "I can enjoy personal time even when some work remains unfinished.",
      options: [...LIKERT_5],
      dimension: "completion-tolerance",
    },
    {
      id: "w17q6",
      text: "Work thoughts regularly interfere with sleep or relaxation.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "mental-carryover",
    },
    {
      id: "w17q7",
      text: "I have a clear ritual or boundary that marks the end of work.",
      options: [...LIKERT_5],
      dimension: "transition-routine",
    },
    {
      id: "w17q8",
      text: "I continue monitoring work issues during weekends or leave.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "digital-boundary",
    },
    {
      id: "w17q9",
      text: "People close to me receive my attention when I am with them.",
      options: [...LIKERT_5],
      dimension: "presence",
    },
    {
      id: "w17q10",
      text: "I can return to work after rest without feeling that I should have remained available.",
      options: [...LIKERT_5],
      dimension: "recovery-permission",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "digital-boundary", label: "Digital Boundary", questionIds: ["w17q1", "w17q8"] },
    { id: "mental-carryover", label: "Mental Carryover", questionIds: ["w17q2", "w17q6"] },
    { id: "identity-shift", label: "Identity Shift", questionIds: ["w17q3"] },
    { id: "availability-guilt", label: "Availability Guilt", questionIds: ["w17q4"] },
    { id: "completion-tolerance", label: "Completion Tolerance", questionIds: ["w17q5"] },
    { id: "transition-routine", label: "Transition Routine", questionIds: ["w17q7"] },
    { id: "presence", label: "Presence", questionIds: ["w17q9"] },
    { id: "recovery-permission", label: "Recovery Permission", questionIds: ["w17q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Work-Carryover Pattern",
      color: "red",
      interpretation:
        "Your responses suggest that after-work detachment is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Fragile Detachment",
      color: "orange",
      interpretation:
        "You show some foundations of after-work detachment, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Functional Detachment",
      color: "yellow",
      interpretation:
        "Your responses suggest a generally steady level of after-work detachment, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong Detachment",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of after-work detachment. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
