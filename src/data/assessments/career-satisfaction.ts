/**
 * A10. Career Satisfaction Index
 * Pack 3 — Workplace Effectiveness and Stress
 * Measures alignment between work, strengths, growth, recognition,
 * relationships, autonomy and personal meaning.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const careerSatisfaction: AssessmentConfig = {
  slug: "career-satisfaction",
  order: 10,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Career Satisfaction Index",
    subtitle: "How aligned is your career with your values?",
    description:
      "Measure alignment between your work, strengths, growth and personal meaning. Ten honest questions, instant results.",
    purpose:
      "Measures alignment between work, strengths, growth, recognition, relationships, autonomy and personal meaning.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a10q1",
      text: "My work uses strengths that matter to me.",
      options: [...LIKERT_5],
      dimension: "strength-use",
    },
    {
      id: "a10q2",
      text: "I understand how my work contributes to something worthwhile.",
      options: [...LIKERT_5],
      dimension: "meaning",
    },
    {
      id: "a10q3",
      text: "I have realistic opportunities to learn or grow.",
      options: [...LIKERT_5],
      dimension: "growth",
    },
    {
      id: "a10q4",
      text: "I regularly feel trapped with no practical choices.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "agency",
    },
    {
      id: "a10q5",
      text: "My contribution is recognised in ways that feel fair.",
      options: [...LIKERT_5],
      dimension: "recognition",
    },
    {
      id: "a10q6",
      text: "The daily environment allows me to work with reasonable dignity and respect.",
      options: [...LIKERT_5],
      dimension: "environment",
    },
    {
      id: "a10q7",
      text: "I can influence at least some of the decisions that affect my work.",
      options: [...LIKERT_5],
      dimension: "autonomy",
    },
    {
      id: "a10q8",
      text: "My current role fits the life I want outside work.",
      options: [...LIKERT_5],
      dimension: "life-fit",
    },
    {
      id: "a10q9",
      text: "I stay mainly because change feels frightening, not because the role still fits.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "stagnation",
    },
    {
      id: "a10q10",
      text: "I can imagine a meaningful next chapter from my current position.",
      options: [...LIKERT_5],
      dimension: "future-path",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "strength-use", label: "Strength Use", questionIds: ["a10q1"] },
    { id: "meaning", label: "Meaning", questionIds: ["a10q2"] },
    { id: "growth", label: "Growth", questionIds: ["a10q3"] },
    { id: "agency", label: "Agency", questionIds: ["a10q4"] },
    { id: "recognition", label: "Recognition", questionIds: ["a10q5"] },
    { id: "environment", label: "Environment", questionIds: ["a10q6"] },
    { id: "autonomy", label: "Autonomy", questionIds: ["a10q7"] },
    { id: "life-fit", label: "Life Fit", questionIds: ["a10q8"] },
    { id: "stagnation", label: "Stagnation", questionIds: ["a10q9"] },
    { id: "future-path", label: "Future Path", questionIds: ["a10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Exploring Options",
      color: "blue",
      interpretation:
        "Your responses suggest that career satisfaction is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Stable Contributor",
      color: "yellow",
      interpretation:
        "You show some foundations of career satisfaction, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Growth Seeker",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of career satisfaction, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Purpose-Driven Professional",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of career satisfaction. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
