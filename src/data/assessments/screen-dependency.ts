/**
 * A14. Screen Dependency Score
 * Pack 2 — Emotional Wellbeing and Digital Balance
 * Reflects automatic checking, loss of control, emotional reliance,
 * sleep disruption and interference with attention or relationships.
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
    title: "Screen Dependency Score",
    subtitle: "How dependent are you on screens?",
    description:
      "Reflect on automatic checking, loss of control and interference with attention or relationships. Ten honest questions, instant results.",
    purpose:
      "Reflects automatic checking, loss of control, emotional reliance, sleep disruption and interference with attention or relationships.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "monitor",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a14q1",
      text: "I check my phone or another screen without a clear reason.",
      options: [...LIKERT_5],
      dimension: "automatic-use",
    },
    {
      id: "a14q2",
      text: "I can leave my device out of reach during focused work or conversation.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "control",
    },
    {
      id: "a14q3",
      text: "I continue scrolling or watching longer than I intended.",
      options: [...LIKERT_5],
      dimension: "loss-of-control",
    },
    {
      id: "a14q4",
      text: "I feel restless when I cannot check messages or feeds.",
      options: [...LIKERT_5],
      dimension: "emotional-reliance",
    },
    {
      id: "a14q5",
      text: "Screens regularly delay my sleep or reduce sleep quality.",
      options: [...LIKERT_5],
      dimension: "sleep",
    },
    {
      id: "a14q6",
      text: "I can enjoy waiting, travelling or resting without immediately using a screen.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "tolerance",
    },
    {
      id: "a14q7",
      text: "People close to me have commented that I am distracted by my device.",
      options: [...LIKERT_5],
      dimension: "relationships",
    },
    {
      id: "a14q8",
      text: "I use screens mainly by choice rather than habit.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "intentionality",
    },
    {
      id: "a14q9",
      text: "I switch between apps even when none of them is useful at that moment.",
      options: [...LIKERT_5],
      dimension: "automatic-use",
    },
    {
      id: "a14q10",
      text: "I have tried to reduce screen use but quickly returned to the same pattern.",
      options: [...LIKERT_5],
      dimension: "control",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "automatic-use", label: "Automatic Use", questionIds: ["a14q1", "a14q9"] },
    { id: "control", label: "Control", questionIds: ["a14q2", "a14q10"] },
    { id: "loss-of-control", label: "Loss of Control", questionIds: ["a14q3"] },
    { id: "emotional-reliance", label: "Emotional Reliance", questionIds: ["a14q4"] },
    { id: "sleep", label: "Sleep", questionIds: ["a14q5"] },
    { id: "tolerance", label: "Tolerance", questionIds: ["a14q6"] },
    { id: "relationships", label: "Relationships", questionIds: ["a14q7"] },
    { id: "intentionality", label: "Intentionality", questionIds: ["a14q8"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Intentional User",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of screen dependency. Protective habits appear to be working reasonably well.",
      nextStep:
        "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build.",
    },
    {
      min: 20,
      max: 29,
      label: "Habitual Checker",
      color: "yellow",
      interpretation:
        "Some signs of screen dependency are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise your score most often and make one practical change this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Digitally Pulled",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of screen dependency that may be affecting energy, concentration, relationships or performance.",
      nextStep:
        "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan.",
    },
    {
      min: 40,
      max: 50,
      label: "Screen-Dependent Pattern",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of screen dependency. The present pace or environment may be difficult to sustain.",
      nextStep:
        "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent.",
    },
  ],
};
