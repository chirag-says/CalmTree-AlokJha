/**
 * A14. Screen Dependency Score™
 * Tier: Discovery (Free)
 * Measures digital habits, focus, awareness, and self-control.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const screenDependency: AssessmentConfig = {
  slug: "screen-dependency",
  order: 14,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Screen Dependency Score™",
    subtitle: "How dependent are you on screens?",
    description:
      "Check your digital habits — awareness, focus, and screen balance. Under 2 minutes, private, and non-judgmental.",
    purpose: "Measures digital habits, focus, awareness, and self-control.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "monitor",
    productCategory: "Gen Z & Digital Life",
    isFree: false,
  },
  instructions:
    "Answer honestly about your typical digital habits. There are no right or wrong answers — just self-awareness.",
  questions: [
    {
      id: "a14q1",
      text: "How often are you aware of how much time you spend on screens?",
      options: [...LIKERT_5],
      dimension: "awareness",
    },
    {
      id: "a14q2",
      text: "While working or studying, how often do digital distractions interrupt your focus?",
      options: [...LIKERT_5],
      dimension: "focus",
    },
    {
      id: "a14q3",
      text: "How easy is it to put away your phone when you have other priorities?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "habit-control",
    },
    {
      id: "a14q4",
      text: "How often do you intentionally take breaks from screens?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "digital-balance",
    },
    {
      id: "a14q5",
      text: "How frequently do you check devices without a specific reason?",
      options: [...LIKERT_5],
      dimension: "awareness",
    },
    {
      id: "a14q6",
      text: "How often do notifications interrupt what you are doing?",
      options: [...LIKERT_5],
      dimension: "focus",
    },
    {
      id: "a14q7",
      text: "How comfortable are you spending several hours away from digital devices?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "habit-control",
    },
    {
      id: "a14q8",
      text: "How often do screens interfere with sleep, relationships, or personal activities?",
      options: [...LIKERT_5],
      dimension: "digital-balance",
    },
    {
      id: "a14q9",
      text: "How often do you create device-free time during the day?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "digital-balance",
    },
    {
      id: "a14q10",
      text: "How easy is it to stay focused on one task without checking a screen?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "focus",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "awareness", label: "Awareness", questionIds: ["a14q1", "a14q5"] },
    { id: "focus", label: "Focus", questionIds: ["a14q2", "a14q6", "a14q10"] },
    { id: "habit-control", label: "Habit Control", questionIds: ["a14q3", "a14q7"] },
    { id: "digital-balance", label: "Digital Balance", questionIds: ["a14q4", "a14q8", "a14q9"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Digital Minimalist",
      color: "green",
      interpretation:
        "You maintain a healthy relationship with screens and technology. Your digital habits support your wellbeing.",
    },
    {
      min: 20,
      max: 29,
      label: "Balanced User",
      color: "yellow",
      interpretation:
        "You use screens purposefully but may occasionally find it hard to disconnect. Minor adjustments could help.",
    },
    {
      min: 30,
      max: 39,
      label: "Constant Connector",
      color: "orange",
      interpretation:
        "Screens play a significant role in your daily life. You may benefit from setting clearer boundaries with technology.",
    },
    {
      min: 40,
      max: 50,
      label: "Screen Dependent",
      color: "red",
      interpretation:
        "Digital devices may be consuming a significant portion of your time and attention. Consider reviewing your screen habits.",
    },
  ],
};
