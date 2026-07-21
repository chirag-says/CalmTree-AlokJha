/**
 * L5. Identity Beyond Work
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Explores whether self-worth and identity are supported by relationships, interests, values and contribution beyond employment.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const identityBeyondWork: AssessmentConfig = {
  slug: "identity-beyond-work",
  order: 95,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Identity Beyond Work",
    subtitle: "A quick read on your identity beyond work.",
    description:
      "Explores whether self-worth and identity are supported by relationships, interests, values and contribution beyond employment. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores whether self-worth and identity are supported by relationships, interests, values and contribution beyond employment.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "user",
    productCategory: "Life Transitions & Healthy Ageing",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "l5q1",
      text: "I can describe myself meaningfully without beginning with my job or title.",
      options: [...LIKERT_5],
      dimension: "identity-breadth",
    },
    {
      id: "l5q2",
      text: "A reduction in professional status would make me feel that I had little value.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "status-dependence",
    },
    {
      id: "l5q3",
      text: "I invest in relationships that do not depend on my usefulness or authority.",
      options: [...LIKERT_5],
      dimension: "relational-identity",
    },
    {
      id: "l5q4",
      text: "I have interests that engage me even when they produce no income or recognition.",
      options: [...LIKERT_5],
      dimension: "intrinsic-engagement",
    },
    {
      id: "l5q5",
      text: "I find it difficult to rest because productivity defines a good day.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "productivity-identity",
    },
    {
      id: "l5q6",
      text: "I can contribute through mentoring, care, creativity or community roles.",
      options: [...LIKERT_5],
      dimension: "contribution-breadth",
    },
    {
      id: "l5q7",
      text: "I recognise personal qualities that remain when a role changes.",
      options: [...LIKERT_5],
      dimension: "stable-qualities",
    },
    {
      id: "l5q8",
      text: "I make room for learning in areas where I am not already experienced.",
      options: [...LIKERT_5],
      dimension: "beginner-identity",
    },
    {
      id: "l5q9",
      text: "I can receive help without losing self-respect.",
      options: [...LIKERT_5],
      dimension: "interdependence",
    },
    {
      id: "l5q10",
      text: "My future plans include more than continuing the same professional identity.",
      options: [...LIKERT_5],
      dimension: "future-identity",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "identity-breadth", label: "Identity breadth", questionIds: ["l5q1"] },
    { id: "status-dependence", label: "Status dependence", questionIds: ["l5q2"] },
    { id: "relational-identity", label: "Relational identity", questionIds: ["l5q3"] },
    { id: "intrinsic-engagement", label: "Intrinsic engagement", questionIds: ["l5q4"] },
    { id: "productivity-identity", label: "Productivity identity", questionIds: ["l5q5"] },
    { id: "contribution-breadth", label: "Contribution breadth", questionIds: ["l5q6"] },
    { id: "stable-qualities", label: "Stable qualities", questionIds: ["l5q7"] },
    { id: "beginner-identity", label: "Beginner identity", questionIds: ["l5q8"] },
    { id: "interdependence", label: "Interdependence", questionIds: ["l5q9"] },
    { id: "future-identity", label: "Future identity", questionIds: ["l5q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Work-Centred Identity",
      color: "blue",
      interpretation:
        "Your responses suggest that identity beyond work is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Identity Broadening",
      color: "yellow",
      interpretation:
        "You show some foundations of identity beyond work, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Multi-Dimensional Identity",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of identity beyond work, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Resilient Identity Beyond Work",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of identity beyond work. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
