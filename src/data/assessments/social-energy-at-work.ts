/**
 * A17. Social Energy at Work Check
 * Tier: Professional
 * Shows whether workplace interaction generally energises the person, requires recovery, or works best in a balanced pattern.
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
    subtitle: "Does interaction energise or drain you at work?",
    description:
      "Find out whether workplace interaction energises you, requires recovery, or works best balanced. Ten honest questions, instant private results.",
    purpose:
      "Shows whether workplace interaction generally energises the person, requires recovery, or works best in a balanced pattern.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Workplace Effectiveness",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "sea1",
      text: "I feel more mentally alert after a useful group discussion.",
      options: [...LIKERT_5],
      dimension: "interaction-gain",
    },
    {
      id: "sea2",
      text: "Frequent conversations leave me needing quiet time before I can focus again.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-need",
    },
    {
      id: "sea3",
      text: "I am comfortable initiating conversations with unfamiliar colleagues.",
      options: [...LIKERT_5],
      dimension: "interaction-confidence",
    },
    {
      id: "sea4",
      text: "I prefer to think through an idea alone before discussing it.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "processing-preference",
    },
    {
      id: "sea5",
      text: "Collaborative work usually increases my motivation.",
      options: [...LIKERT_5],
      dimension: "interaction-gain",
    },
    {
      id: "sea6",
      text: "Back-to-back interactions reduce my patience and concentration.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-need",
    },
    {
      id: "sea7",
      text: "I find it easy to contribute in a lively group setting.",
      options: [...LIKERT_5],
      dimension: "interaction-confidence",
    },
    {
      id: "sea8",
      text: "I do my best thinking when I have uninterrupted individual time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "processing-preference",
    },
    {
      id: "sea9",
      text: "Networking or cross-team conversations often give me new energy.",
      options: [...LIKERT_5],
      dimension: "interaction-gain",
    },
    {
      id: "sea10",
      text: "After a socially demanding workday, I need substantial time to reset.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-need",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "interaction-gain", label: "Interaction Gain", questionIds: ["sea1", "sea5", "sea9"] },
    { id: "recovery-need", label: "Recovery Need", questionIds: ["sea2", "sea6", "sea10"] },
    {
      id: "interaction-confidence",
      label: "Interaction Confidence",
      questionIds: ["sea3", "sea7"],
    },
    { id: "processing-preference", label: "Processing Preference", questionIds: ["sea4", "sea8"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Quiet Energy Profile",
      color: "blue",
      interpretation:
        "You are likely to work best with protected focus time and selective interaction. Social demands may consume energy even when you communicate well.",
    },
    {
      min: 21,
      max: 30,
      label: "Selective Connector",
      color: "emerald",
      interpretation:
        "You can engage effectively but prefer purpose-driven interaction and adequate individual processing time.",
    },
    {
      min: 31,
      max: 40,
      label: "Balanced Social Energy",
      color: "yellow",
      interpretation:
        "You draw energy from both interaction and independent work, depending on the task and environment.",
    },
    {
      min: 41,
      max: 50,
      label: "Interaction-Energised Profile",
      color: "orange",
      interpretation:
        "Conversation, collaboration and visible engagement tend to increase your energy and momentum.",
    },
  ],
};
