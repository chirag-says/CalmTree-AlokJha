/**
 * C2. Role Fit Reflection
 * Pack 8 — Career Direction and Professional Growth
 * Helps users evaluate alignment between a current role and their strengths, values, work preferences and development needs.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const roleFitReflection: AssessmentConfig = {
  slug: "role-fit-reflection",
  order: 72,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Role Fit Reflection",
    subtitle: "A quick read on your current role fit.",
    description:
      "Helps users evaluate alignment between a current role and their strengths, values, work preferences and development needs. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps users evaluate alignment between a current role and their strengths, values, work preferences and development needs.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c2q1",
      text: "My core responsibilities use strengths I value in myself.",
      options: [...LIKERT_5],
      dimension: "strength-use",
    },
    {
      id: "c2q2",
      text: "The role regularly requires me to work against my natural preferences without support.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "work-preference",
    },
    {
      id: "c2q3",
      text: "I understand how my work contributes to a meaningful outcome.",
      options: [...LIKERT_5],
      dimension: "meaning",
    },
    {
      id: "c2q4",
      text: "The pace and demands are broadly sustainable for me.",
      options: [...LIKERT_5],
      dimension: "sustainability",
    },
    {
      id: "c2q5",
      text: "I remain mainly because change feels frightening, not because the role fits.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "choice",
    },
    {
      id: "c2q6",
      text: "The role provides enough challenge for continued development.",
      options: [...LIKERT_5],
      dimension: "growth",
    },
    {
      id: "c2q7",
      text: "The organisation’s everyday behaviour is reasonably consistent with my values.",
      options: [...LIKERT_5],
      dimension: "values-fit",
    },
    {
      id: "c2q8",
      text: "I can see a realistic path to improve the parts of the role that do not fit.",
      options: [...LIKERT_5],
      dimension: "agency",
    },
    {
      id: "c2q9",
      text: "Most dissatisfaction comes from one temporary condition rather than the role itself.",
      options: [...LIKERT_5],
      dimension: "context-clarity",
    },
    {
      id: "c2q10",
      text: "I would still choose many aspects of this work if status and comparison were removed.",
      options: [...LIKERT_5],
      dimension: "intrinsic-fit",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "strength-use", label: "Strength use", questionIds: ["c2q1"] },
    { id: "work-preference", label: "Work preference", questionIds: ["c2q2"] },
    { id: "meaning", label: "Meaning", questionIds: ["c2q3"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["c2q4"] },
    { id: "choice", label: "Choice", questionIds: ["c2q5"] },
    { id: "growth", label: "Growth", questionIds: ["c2q6"] },
    { id: "values-fit", label: "Values fit", questionIds: ["c2q7"] },
    { id: "agency", label: "Agency", questionIds: ["c2q8"] },
    { id: "context-clarity", label: "Context clarity", questionIds: ["c2q9"] },
    { id: "intrinsic-fit", label: "Intrinsic fit", questionIds: ["c2q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Role Misalignment",
      color: "blue",
      interpretation:
        "Your responses suggest that current role fit is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Mixed Fit",
      color: "yellow",
      interpretation:
        "You show some foundations of current role fit, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Generally Good Fit",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of current role fit, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong Role Alignment",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of current role fit. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
