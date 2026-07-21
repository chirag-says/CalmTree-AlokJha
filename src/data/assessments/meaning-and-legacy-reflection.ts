/**
 * L7. Meaning and Legacy Reflection
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Explores contribution, values, relationships and the kind of influence a person hopes to leave.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const meaningAndLegacyReflection: AssessmentConfig = {
  slug: "meaning-and-legacy-reflection",
  order: 97,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Meaning and Legacy Reflection",
    subtitle: "A quick read on your meaning and legacy clarity.",
    description:
      "Explores contribution, values, relationships and the kind of influence a person hopes to leave. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores contribution, values, relationships and the kind of influence a person hopes to leave.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "eye",
    productCategory: "Life Transitions & Healthy Ageing",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "l7q1",
      text: "I can name values I hope other people experience through me.",
      options: [...LIKERT_5],
      dimension: "values",
    },
    {
      id: "l7q2",
      text: "I think of legacy mainly as wealth, status or public recognition.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "legacy-breadth",
    },
    {
      id: "l7q3",
      text: "I share useful experience without expecting others to follow it exactly.",
      options: [...LIKERT_5],
      dimension: "generativity",
    },
    {
      id: "l7q4",
      text: "I make time for relationships I consider part of a meaningful life.",
      options: [...LIKERT_5],
      dimension: "relational-legacy",
    },
    {
      id: "l7q5",
      text: "There are important conversations or expressions of appreciation I continue postponing.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "unfinished-expression",
    },
    {
      id: "l7q6",
      text: "I contribute to people or causes beyond my immediate personal benefit.",
      options: [...LIKERT_5],
      dimension: "contribution",
    },
    {
      id: "l7q7",
      text: "I can accept that influence may be quiet and difficult to measure.",
      options: [...LIKERT_5],
      dimension: "recognition-balance",
    },
    {
      id: "l7q8",
      text: "I organise important knowledge, stories or practical information for others.",
      options: [...LIKERT_5],
      dimension: "knowledge-transfer",
    },
    {
      id: "l7q9",
      text: "I review whether my present choices reflect what I say matters most.",
      options: [...LIKERT_5],
      dimension: "values-alignment",
    },
    {
      id: "l7q10",
      text: "I have a practical next step for a contribution I want to make.",
      options: [...LIKERT_5],
      dimension: "action",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "values", label: "Values", questionIds: ["l7q1"] },
    { id: "legacy-breadth", label: "Legacy breadth", questionIds: ["l7q2"] },
    { id: "generativity", label: "Generativity", questionIds: ["l7q3"] },
    { id: "relational-legacy", label: "Relational legacy", questionIds: ["l7q4"] },
    { id: "unfinished-expression", label: "Unfinished expression", questionIds: ["l7q5"] },
    { id: "contribution", label: "Contribution", questionIds: ["l7q6"] },
    { id: "recognition-balance", label: "Recognition balance", questionIds: ["l7q7"] },
    { id: "knowledge-transfer", label: "Knowledge transfer", questionIds: ["l7q8"] },
    { id: "values-alignment", label: "Values alignment", questionIds: ["l7q9"] },
    { id: "action", label: "Action", questionIds: ["l7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Legacy Unexamined",
      color: "blue",
      interpretation:
        "Your responses suggest that meaning and legacy clarity is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Meaning Reflection Beginning",
      color: "yellow",
      interpretation:
        "You show some foundations of meaning and legacy clarity, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Purposeful Contribution",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of meaning and legacy clarity, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Active Legacy Builder",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of meaning and legacy clarity. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
