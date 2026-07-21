/**
 * F7. Vision-to-Execution Balance
 * Pack 6 — Founders and Entrepreneurship
 * Assesses the ability to translate an ambitious direction into priorities, experiments, ownership and operating rhythm.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const visionToExecutionBalance: AssessmentConfig = {
  slug: "vision-to-execution-balance",
  order: 57,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Vision-to-Execution Balance",
    subtitle: "A quick read on your vision-to-execution balance.",
    description:
      "Assesses the ability to translate an ambitious direction into priorities, experiments, ownership and operating rhythm. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses the ability to translate an ambitious direction into priorities, experiments, ownership and operating rhythm.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "eye",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f7q1",
      text: "I can explain the venture’s long-term direction in simple language.",
      options: [...LIKERT_5],
      dimension: "vision-clarity",
    },
    {
      id: "f7q2",
      text: "I convert strategic goals into a small number of measurable near-term priorities.",
      options: [...LIKERT_5],
      dimension: "prioritisation",
    },
    {
      id: "f7q3",
      text: "New ideas regularly displace work already agreed by the team.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "focus",
    },
    {
      id: "f7q4",
      text: "I know which current assumptions require evidence before the next investment.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "f7q5",
      text: "I review progress using outcomes rather than activity alone.",
      options: [...LIKERT_5],
      dimension: "measurement",
    },
    {
      id: "f7q6",
      text: "The team often hears the vision but lacks clarity on what to do next.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "translation",
    },
    {
      id: "f7q7",
      text: "I protect execution time from unnecessary strategic changes.",
      options: [...LIKERT_5],
      dimension: "operating-discipline",
    },
    {
      id: "f7q8",
      text: "I can stop an initiative that no longer supports the main direction.",
      options: [...LIKERT_5],
      dimension: "trade-offs",
    },
    {
      id: "f7q9",
      text: "I connect daily work to the customer or business problem it serves.",
      options: [...LIKERT_5],
      dimension: "meaning",
    },
    {
      id: "f7q10",
      text: "I revisit strategy at an agreed rhythm rather than whenever anxiety or excitement rises.",
      options: [...LIKERT_5],
      dimension: "review-rhythm",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "vision-clarity", label: "Vision clarity", questionIds: ["f7q1"] },
    { id: "prioritisation", label: "Prioritisation", questionIds: ["f7q2"] },
    { id: "focus", label: "Focus", questionIds: ["f7q3"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["f7q4"] },
    { id: "measurement", label: "Measurement", questionIds: ["f7q5"] },
    { id: "translation", label: "Translation", questionIds: ["f7q6"] },
    { id: "operating-discipline", label: "Operating discipline", questionIds: ["f7q7"] },
    { id: "trade-offs", label: "Trade-offs", questionIds: ["f7q8"] },
    { id: "meaning", label: "Meaning", questionIds: ["f7q9"] },
    { id: "review-rhythm", label: "Review rhythm", questionIds: ["f7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Vision Without Grounding",
      color: "blue",
      interpretation:
        "Your responses suggest that vision-to-execution balance is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Execution Without Coherence",
      color: "yellow",
      interpretation:
        "You show some foundations of vision-to-execution balance, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Strategy-to-Action Builder",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of vision-to-execution balance, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Integrated Vision Executor",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of vision-to-execution balance. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
