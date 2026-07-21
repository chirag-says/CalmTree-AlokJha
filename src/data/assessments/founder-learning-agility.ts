/**
 * F10. Founder Learning Agility
 * Pack 6 — Founders and Entrepreneurship
 * Assesses how effectively a founder seeks evidence, updates beliefs and converts experience into better decisions.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const founderLearningAgility: AssessmentConfig = {
  slug: "founder-learning-agility",
  order: 60,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Founder Learning Agility",
    subtitle: "A quick read on your founder learning agility.",
    description:
      "Assesses how effectively a founder seeks evidence, updates beliefs and converts experience into better decisions. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses how effectively a founder seeks evidence, updates beliefs and converts experience into better decisions.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "book-open",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f10q1",
      text: "I actively search for evidence that could disprove my preferred idea.",
      options: [...LIKERT_5],
      dimension: "challenge-seeking",
    },
    {
      id: "f10q2",
      text: "I defend an early decision because changing it may look inconsistent.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "belief-updating",
    },
    {
      id: "f10q3",
      text: "I convert customer conversations into specific hypotheses or experiments.",
      options: [...LIKERT_5],
      dimension: "applied-learning",
    },
    {
      id: "f10q4",
      text: "I can explain what a failed attempt taught us beyond saying it did not work.",
      options: [...LIKERT_5],
      dimension: "reflection",
    },
    {
      id: "f10q5",
      text: "I seek input from people who see the market differently from me.",
      options: [...LIKERT_5],
      dimension: "diverse-input",
    },
    {
      id: "f10q6",
      text: "I repeat familiar actions even when the evidence of value is weak.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "adaptation",
    },
    {
      id: "f10q7",
      text: "I update team assumptions visibly when new learning becomes important.",
      options: [...LIKERT_5],
      dimension: "shared-learning",
    },
    {
      id: "f10q8",
      text: "I distinguish between persistence in the mission and attachment to one method.",
      options: [...LIKERT_5],
      dimension: "strategic-flexibility",
    },
    {
      id: "f10q9",
      text: "I document important lessons so they influence future decisions.",
      options: [...LIKERT_5],
      dimension: "knowledge-capture",
    },
    {
      id: "f10q10",
      text: "I can admit that a strongly held founder belief was wrong.",
      options: [...LIKERT_5],
      dimension: "intellectual-humility",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "challenge-seeking", label: "Challenge seeking", questionIds: ["f10q1"] },
    { id: "belief-updating", label: "Belief updating", questionIds: ["f10q2"] },
    { id: "applied-learning", label: "Applied learning", questionIds: ["f10q3"] },
    { id: "reflection", label: "Reflection", questionIds: ["f10q4"] },
    { id: "diverse-input", label: "Diverse input", questionIds: ["f10q5"] },
    { id: "adaptation", label: "Adaptation", questionIds: ["f10q6"] },
    { id: "shared-learning", label: "Shared learning", questionIds: ["f10q7"] },
    { id: "strategic-flexibility", label: "Strategic flexibility", questionIds: ["f10q8"] },
    { id: "knowledge-capture", label: "Knowledge capture", questionIds: ["f10q9"] },
    { id: "intellectual-humility", label: "Intellectual humility", questionIds: ["f10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Fixed Founder Narrative",
      color: "blue",
      interpretation:
        "Your responses suggest that founder learning agility is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Learning Intent Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of founder learning agility, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Adaptive Experimenter",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of founder learning agility, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "High-Agility Founder",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of founder learning agility. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
