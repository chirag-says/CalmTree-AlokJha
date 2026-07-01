/**
 * A7. Entrepreneur Resilience™ Index
 * Tier: Professional (₹299-999)
 * Measures persistence, adaptability, optimism, and recovery from setbacks.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const entrepreneurResilience: AssessmentConfig = {
  slug: "entrepreneur-resilience",
  order: 7,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Entrepreneur Resilience™",
    subtitle: "How resilient are you as a builder?",
    description:
      "Measure your persistence, adaptability, and recovery from setbacks. Built for founders, freelancers, and leaders.",
    purpose: "Measures persistence, adaptability, optimism, and recovery from setbacks.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "zap",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Answer based on how you typically respond to challenges and uncertainty. Be honest — there are no right or wrong answers.",
  questions: [
    {
      id: "a7q1",
      text: "When a project does not go as planned, how quickly do you begin exploring alternatives?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a7q2",
      text: "How comfortable are you making decisions with incomplete information?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a7q3",
      text: "How often do setbacks affect your motivation for extended periods?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "persistence",
    },
    {
      id: "a7q4",
      text: "When facing uncertainty, how likely are you to focus on opportunities rather than obstacles?",
      options: [...LIKERT_5],
      dimension: "optimism",
    },
    {
      id: "a7q5",
      text: "How willing are you to take calculated risks?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a7q6",
      text: "How often do you continue working toward goals despite slow progress?",
      options: [...LIKERT_5],
      dimension: "persistence",
    },
    {
      id: "a7q7",
      text: "When receiving criticism, how easy is it to separate feedback from personal judgment?",
      options: [...LIKERT_5],
      dimension: "optimism",
    },
    {
      id: "a7q8",
      text: "How quickly do you adapt when market conditions or circumstances change?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a7q9",
      text: "How often do challenges make you question your long-term goals?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "persistence",
    },
    {
      id: "a7q10",
      text: "How confident are you in finding solutions when facing unfamiliar problems?",
      options: [...LIKERT_5],
      dimension: "optimism",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "persistence", label: "Persistence", questionIds: ["a7q3", "a7q6", "a7q9"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["a7q1", "a7q2", "a7q5", "a7q8"] },
    { id: "optimism", label: "Optimism", questionIds: ["a7q4", "a7q7", "a7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Cautious Planner",
      color: "blue",
      interpretation:
        "You prefer certainty and careful planning. Building comfort with ambiguity can unlock new growth.",
    },
    {
      min: 20,
      max: 29,
      label: "Determined Builder",
      color: "yellow",
      interpretation:
        "You show persistence and determination but may benefit from building more adaptive strategies.",
    },
    {
      min: 30,
      max: 39,
      label: "Resilient Operator",
      color: "emerald",
      interpretation:
        "You recover well from setbacks and adapt to changing circumstances with practical optimism.",
    },
    {
      min: 40,
      max: 50,
      label: "Growth Pioneer",
      color: "green",
      interpretation:
        "You demonstrate exceptional resilience — embracing uncertainty, learning from setbacks, and maintaining forward momentum.",
    },
  ],
};
