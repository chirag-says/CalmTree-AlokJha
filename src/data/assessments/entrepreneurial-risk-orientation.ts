/**
 * F2. Entrepreneurial Risk Orientation
 * Pack 6 — Founders and Entrepreneurship
 * Maps a founder’s natural preference for caution, experimentation, calculated commitment and bold risk-taking.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const entrepreneurialRiskOrientation: AssessmentConfig = {
  slug: "entrepreneurial-risk-orientation",
  order: 52,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Entrepreneurial Risk Orientation",
    subtitle: "A quick read on your entrepreneurial risk orientation.",
    description:
      "Maps a founder’s natural preference for caution, experimentation, calculated commitment and bold risk-taking. Ten honest questions, instant results, completely private.",
    purpose:
      "Maps a founder’s natural preference for caution, experimentation, calculated commitment and bold risk-taking.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f2q1",
      text: "I am comfortable committing resources before all important information is available.",
      options: [...LIKERT_5],
      dimension: "commitment",
    },
    {
      id: "f2q2",
      text: "I prefer proven demand before investing meaningful time or money.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "evidence-threshold",
    },
    {
      id: "f2q3",
      text: "A failed experiment feels acceptable when it produces useful learning.",
      options: [...LIKERT_5],
      dimension: "learning-orientation",
    },
    {
      id: "f2q4",
      text: "I avoid opportunities where the downside cannot be predicted precisely.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "loss-sensitivity",
    },
    {
      id: "f2q5",
      text: "I enjoy testing ideas that may challenge an established market assumption.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "f2q6",
      text: "I need a detailed fallback plan before taking a significant step.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "protection",
    },
    {
      id: "f2q7",
      text: "I can distinguish a reversible experiment from an irreversible decision.",
      options: [...LIKERT_5],
      dimension: "risk-judgement",
    },
    {
      id: "f2q8",
      text: "I am willing to enter a market before the operating model feels complete.",
      options: [...LIKERT_5],
      dimension: "speed",
    },
    {
      id: "f2q9",
      text: "I prefer incremental gains over a chance of a much larger but uncertain outcome.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "risk-appetite",
    },
    {
      id: "f2q10",
      text: "I define in advance how much time, money or reputation I am willing to risk.",
      options: [...LIKERT_5],
      dimension: "risk-boundaries",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "commitment", label: "Commitment", questionIds: ["f2q1"] },
    { id: "evidence-threshold", label: "Evidence threshold", questionIds: ["f2q2"] },
    { id: "learning-orientation", label: "Learning orientation", questionIds: ["f2q3"] },
    { id: "loss-sensitivity", label: "Loss sensitivity", questionIds: ["f2q4"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["f2q5"] },
    { id: "protection", label: "Protection", questionIds: ["f2q6"] },
    { id: "risk-judgement", label: "Risk judgement", questionIds: ["f2q7"] },
    { id: "speed", label: "Speed", questionIds: ["f2q8"] },
    { id: "risk-appetite", label: "Risk appetite", questionIds: ["f2q9"] },
    { id: "risk-boundaries", label: "Risk boundaries", questionIds: ["f2q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Evidence-First Builder",
      color: "blue",
      interpretation:
        "You prefer strong evidence, defined downside and gradual commitment before taking entrepreneurial risk.",
      nextStep:
        "Protect against missing time-sensitive opportunities by using small, reversible tests.",
    },
    {
      min: 20,
      max: 29,
      label: "Measured Experimenter",
      color: "emerald",
      interpretation:
        "You are open to risk when assumptions can be tested and losses remain manageable.",
      nextStep: "Keep the decision threshold explicit so caution does not quietly become delay.",
    },
    {
      min: 30,
      max: 39,
      label: "Calculated Risk Taker",
      color: "amber",
      interpretation:
        "You are generally comfortable acting before certainty when the potential value and downside have been considered.",
      nextStep: "Use pre-defined limits and independent challenge to avoid optimism bias.",
    },
    {
      min: 40,
      max: 50,
      label: "Bold Opportunity Seeker",
      color: "purple",
      interpretation:
        "You are energised by uncertain opportunities and may commit quickly when potential upside is compelling.",
      nextStep:
        "Add evidence gates, downside limits and a trusted challenger before major commitments.",
    },
  ],
};
