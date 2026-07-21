/**
 * W2. Social Energy at Work Check
 * Pack 1 — Self-Awareness and Personality
 * Shows whether workplace interaction generally energises, requires recovery
 * or works best in a balanced pattern.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const socialEnergyAtWork: AssessmentConfig = {
  slug: "social-energy-at-work",
  order: 17,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Social Energy at Work Check",
    subtitle: "Does interaction energise or drain you?",
    description:
      "Discover whether workplace interaction energises you, requires recovery or works best in a balanced pattern.",
    purpose:
      "Shows whether workplace interaction generally energises the person, requires recovery or works best in a balanced pattern.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Self-Awareness & Personality",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w2q1",
      text: "I feel more mentally alert after a useful group discussion.",
      options: [...LIKERT_5],
      dimension: "interaction-gain",
    },
    {
      id: "w2q2",
      text: "Frequent conversations leave me needing quiet time before I can focus again.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-need",
    },
    {
      id: "w2q3",
      text: "I am comfortable initiating conversations with unfamiliar colleagues.",
      options: [...LIKERT_5],
      dimension: "interaction-confidence",
    },
    {
      id: "w2q4",
      text: "I prefer to think through an idea alone before discussing it.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "processing-preference",
    },
    {
      id: "w2q5",
      text: "Collaborative work usually increases my motivation.",
      options: [...LIKERT_5],
      dimension: "interaction-gain",
    },
    {
      id: "w2q6",
      text: "Back-to-back interactions reduce my patience and concentration.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-need",
    },
    {
      id: "w2q7",
      text: "I find it easy to contribute in a lively group setting.",
      options: [...LIKERT_5],
      dimension: "interaction-confidence",
    },
    {
      id: "w2q8",
      text: "I do my best thinking when I have uninterrupted individual time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "processing-preference",
    },
    {
      id: "w2q9",
      text: "Networking or cross-team conversations often give me new energy.",
      options: [...LIKERT_5],
      dimension: "interaction-gain",
    },
    {
      id: "w2q10",
      text: "After a socially demanding workday, I need substantial time to reset.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-need",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "interaction-gain", label: "Interaction Gain", questionIds: ["w2q1", "w2q5", "w2q9"] },
    { id: "recovery-need", label: "Recovery Need", questionIds: ["w2q2", "w2q6", "w2q10"] },
    {
      id: "interaction-confidence",
      label: "Interaction Confidence",
      questionIds: ["w2q3", "w2q7"],
    },
    { id: "processing-preference", label: "Processing Preference", questionIds: ["w2q4", "w2q8"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Quiet Energy Profile",
      color: "blue",
      interpretation:
        "You likely work best with protected focus time and selective interaction. Social demands may consume energy even when you communicate well.",
      nextStep:
        "Prepare for meetings, create recovery gaps and choose meaningful rather than constant interaction.",
    },
    {
      min: 21,
      max: 30,
      label: "Selective Connector",
      color: "yellow",
      interpretation:
        "You can engage effectively but prefer purpose-driven interaction and adequate individual processing time.",
      nextStep:
        "Alternate collaboration with uninterrupted blocks and treat the need for quiet as useful information.",
    },
    {
      min: 31,
      max: 40,
      label: "Balanced Social Energy",
      color: "emerald",
      interpretation:
        "You draw energy from both interaction and independent work, depending on task and environment.",
      nextStep: "Collaborate for exploration, then switch to solo focus for completion.",
    },
    {
      min: 41,
      max: 50,
      label: "Interaction-Energised Profile",
      color: "green",
      interpretation:
        "Conversation, collaboration and visible engagement tend to increase your energy and momentum.",
      nextStep:
        "Protect reflection time so enthusiasm and quick discussion do not replace deeper thinking.",
    },
  ],
};
