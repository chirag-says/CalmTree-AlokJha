/**
 * C4. Learning Agility Check
 * Pack 8 — Career Direction and Professional Growth
 * Assesses openness to feedback, experimentation, unlearning and applying lessons across new professional situations.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const learningAgilityCheck: AssessmentConfig = {
  slug: "learning-agility-check",
  order: 74,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Learning Agility Check",
    subtitle: "A quick read on your professional learning agility.",
    description:
      "Assesses openness to feedback, experimentation, unlearning and applying lessons across new professional situations. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses openness to feedback, experimentation, unlearning and applying lessons across new professional situations.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "book-open",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c4q1",
      text: "I seek feedback before a problem becomes visible to everyone.",
      options: [...LIKERT_5],
      dimension: "feedback-seeking",
    },
    {
      id: "c4q2",
      text: "I defend a familiar method mainly because it worked in the past.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "unlearning",
    },
    {
      id: "c4q3",
      text: "I can apply a lesson from one context to a different problem.",
      options: [...LIKERT_5],
      dimension: "transfer",
    },
    {
      id: "c4q4",
      text: "I test new skills through small practical assignments.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "c4q5",
      text: "A mistake makes me more curious about the process, not only the outcome.",
      options: [...LIKERT_5],
      dimension: "reflection",
    },
    {
      id: "c4q6",
      text: "I avoid beginner situations because they may reduce how competent I appear.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "learner-identity",
    },
    {
      id: "c4q7",
      text: "I update my view when credible evidence contradicts me.",
      options: [...LIKERT_5],
      dimension: "belief-updating",
    },
    {
      id: "c4q8",
      text: "I ask people with different expertise how they would approach the issue.",
      options: [...LIKERT_5],
      dimension: "diverse-input",
    },
    {
      id: "c4q9",
      text: "I record or review important lessons so they are not repeatedly lost.",
      options: [...LIKERT_5],
      dimension: "learning-capture",
    },
    {
      id: "c4q10",
      text: "I can stop using a skill or habit that is no longer valuable.",
      options: [...LIKERT_5],
      dimension: "adaptation",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "feedback-seeking", label: "Feedback seeking", questionIds: ["c4q1"] },
    { id: "unlearning", label: "Unlearning", questionIds: ["c4q2"] },
    { id: "transfer", label: "Transfer", questionIds: ["c4q3"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["c4q4"] },
    { id: "reflection", label: "Reflection", questionIds: ["c4q5"] },
    { id: "learner-identity", label: "Learner identity", questionIds: ["c4q6"] },
    { id: "belief-updating", label: "Belief updating", questionIds: ["c4q7"] },
    { id: "diverse-input", label: "Diverse input", questionIds: ["c4q8"] },
    { id: "learning-capture", label: "Learning capture", questionIds: ["c4q9"] },
    { id: "adaptation", label: "Adaptation", questionIds: ["c4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Learning Defended",
      color: "blue",
      interpretation:
        "Your responses suggest that professional learning agility is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Learning Intent Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of professional learning agility, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Adaptive Learner",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of professional learning agility, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "High Learning Agility",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of professional learning agility. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
