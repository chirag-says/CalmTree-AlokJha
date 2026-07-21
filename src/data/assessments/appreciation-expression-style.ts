/**
 * R7. Appreciation Expression Style
 * Pack 5 — Relationships & Emotional Connection
 * Measures how naturally and effectively a person communicates appreciation,
 * gratitude and positive recognition in close relationships.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const appreciationExpressionStyle: AssessmentConfig = {
  slug: "appreciation-expression-style",
  order: 47,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Appreciation Expression Style",
    subtitle: "How well do you express appreciation?",
    description:
      "Measure how naturally you communicate appreciation and positive recognition in close relationships.",
    purpose:
      "Measures how naturally and effectively a person communicates appreciation, gratitude and positive recognition in close relationships.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "award",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "r7q1",
      text: "I tell the other person specifically what I appreciate about them.",
      options: [...LIKERT_5],
      dimension: "specificity",
    },
    {
      id: "r7q2",
      text: "I notice small positive things the other person does.",
      options: [...LIKERT_5],
      dimension: "noticing",
    },
    {
      id: "r7q3",
      text: "I express appreciation soon after the moment rather than only in hindsight.",
      options: [...LIKERT_5],
      dimension: "timing",
    },
    {
      id: "r7q4",
      text: "I assume the other person already knows I value them without saying it.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "assumption",
    },
    {
      id: "r7q5",
      text: "I can accept appreciation without deflecting or minimising it.",
      options: [...LIKERT_5],
      dimension: "receiving",
    },
    {
      id: "r7q6",
      text: "I vary how I express appreciation based on what the other person values.",
      options: [...LIKERT_5],
      dimension: "adaptation",
    },
    {
      id: "r7q7",
      text: "I balance appreciation with honest, kind feedback when needed.",
      options: [...LIKERT_5],
      dimension: "balance",
    },
    {
      id: "r7q8",
      text: "I continue expressing appreciation even during periods of frustration.",
      options: [...LIKERT_5],
      dimension: "consistency",
    },
    {
      id: "r7q9",
      text: "I express gratitude for ongoing contributions, not only for extraordinary ones.",
      options: [...LIKERT_5],
      dimension: "everyday-gratitude",
    },
    {
      id: "r7q10",
      text: "My appreciation comes across as genuine rather than obligatory.",
      options: [...LIKERT_5],
      dimension: "authenticity",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "specificity", label: "Specificity", questionIds: ["r7q1"] },
    { id: "noticing", label: "Noticing", questionIds: ["r7q2"] },
    { id: "timing", label: "Timing", questionIds: ["r7q3"] },
    { id: "assumption", label: "Assumption", questionIds: ["r7q4"] },
    { id: "receiving", label: "Receiving", questionIds: ["r7q5"] },
    { id: "adaptation", label: "Adaptation", questionIds: ["r7q6"] },
    { id: "balance", label: "Balance", questionIds: ["r7q7"] },
    { id: "consistency", label: "Consistency", questionIds: ["r7q8"] },
    { id: "everyday-gratitude", label: "Everyday Gratitude", questionIds: ["r7q9"] },
    { id: "authenticity", label: "Authenticity", questionIds: ["r7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Silent Valuer",
      color: "blue",
      interpretation:
        "Your responses suggest that appreciation expression is currently limited or inconsistent.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Occasional Appreciator",
      color: "yellow",
      interpretation:
        "You show some foundations of appreciation expression, although they may become less reliable under pressure.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Warm Recogniser",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of appreciation expression, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Genuine Appreciator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of appreciation expression.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
