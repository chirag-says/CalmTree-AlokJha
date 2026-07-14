/**
 * A15. Happiness Blueprint
 * Pack 1 — Self-Awareness and Personality
 * Explores four practical foundations of wellbeing: connection,
 * engagement, meaning and recovery.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const happinessBlueprint: AssessmentConfig = {
  slug: "happiness-blueprint",
  order: 15,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Happiness Blueprint",
    subtitle: "What supports your everyday wellbeing?",
    description: "Explore the four foundations of wellbeing: connection, engagement, meaning and recovery. Ten honest questions, instant results.",
    purpose: "Explores four practical foundations of wellbeing: connection, engagement, meaning and recovery.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "a15q1", text: "I have at least one person with whom I can be honest about how I am doing.", options: [...LIKERT_5], dimension: "connection" },
    { id: "a15q2", text: "My days contain activities that fully engage my attention.", options: [...LIKERT_5], dimension: "engagement" },
    { id: "a15q3", text: "I can connect some of my effort to a purpose that matters to me.", options: [...LIKERT_5], dimension: "meaning" },
    { id: "a15q4", text: "I regularly make space for rest without needing to earn it first.", options: [...LIKERT_5], dimension: "recovery" },
    { id: "a15q5", text: "I notice small positive experiences rather than waiting only for major achievements.", options: [...LIKERT_5], dimension: "appreciation" },
    { id: "a15q6", text: "I often feel disconnected even when I am around other people.", options: [...LIKERT_5], reverse: true, dimension: "connection" },
    { id: "a15q7", text: "Most of my time is spent reacting rather than choosing what matters.", options: [...LIKERT_5], reverse: true, dimension: "agency" },
    { id: "a15q8", text: "I have routines that help my body and mind recover.", options: [...LIKERT_5], dimension: "recovery" },
    { id: "a15q9", text: "I contribute to someone or something beyond my immediate self-interest.", options: [...LIKERT_5], dimension: "meaning" },
    { id: "a15q10", text: "I can experience satisfaction without comparing it immediately with someone else's life.", options: [...LIKERT_5], dimension: "appreciation" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "connection", label: "Connection", questionIds: ["a15q1", "a15q6"] },
    { id: "engagement", label: "Engagement", questionIds: ["a15q2"] },
    { id: "meaning", label: "Meaning", questionIds: ["a15q3", "a15q9"] },
    { id: "recovery", label: "Recovery", questionIds: ["a15q4", "a15q8"] },
    { id: "appreciation", label: "Appreciation", questionIds: ["a15q5", "a15q10"] },
    { id: "agency", label: "Agency", questionIds: ["a15q7"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Searching for Grounding", color: "blue", interpretation: "Your responses suggest that everyday wellbeing is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.", nextStep: "Choose one small behaviour to practise repeatedly rather than trying to change everything at once." },
    { min: 20, max: 29, label: "Rebuilding Balance", color: "yellow", interpretation: "You show some foundations of everyday wellbeing, although they may become less reliable under pressure or uncertainty.", nextStep: "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context." },
    { min: 30, max: 39, label: "Steady Wellbeing", color: "emerald", interpretation: "Your responses suggest a generally steady level of everyday wellbeing, with a few areas that could become more consistent.", nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths." },
    { min: 40, max: 50, label: "Meaningful Flourishing", color: "green", interpretation: "Your responses indicate a strong and broadly reliable pattern of everyday wellbeing. You are likely to use it across many situations.", nextStep: "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach." },
  ],
};
