/**
 * G6. Academic Pressure Pattern
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Helps students reflect on performance pressure, perfectionism, fear of failure and recovery around study.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const academicPressurePattern: AssessmentConfig = {
  slug: "academic-pressure-pattern",
  order: 66,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Academic Pressure Pattern",
    subtitle: "A quick read on your academic pressure.",
    description:
      "Helps students reflect on performance pressure, perfectionism, fear of failure and recovery around study. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps students reflect on performance pressure, perfectionism, fear of failure and recovery around study.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g6q1",
      text: "A disappointing result makes me question my overall ability.",
      options: [...LIKERT_5],
      dimension: "identity-pressure",
    },
    {
      id: "g6q2",
      text: "I can separate one academic outcome from my value as a person.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-worth",
    },
    {
      id: "g6q3",
      text: "I delay starting because the work may not meet my standards.",
      options: [...LIKERT_5],
      dimension: "perfectionism",
    },
    {
      id: "g6q4",
      text: "I can ask for clarification or help before falling far behind.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "support-seeking",
    },
    {
      id: "g6q5",
      text: "Rest feels undeserved when unfinished academic work remains.",
      options: [...LIKERT_5],
      dimension: "recovery-guilt",
    },
    {
      id: "g6q6",
      text: "I study mainly from fear rather than curiosity or purpose.",
      options: [...LIKERT_5],
      dimension: "motivation",
    },
    {
      id: "g6q7",
      text: "I can make a realistic plan when several deadlines arrive together.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "planning",
    },
    {
      id: "g6q8",
      text: "I compare marks even when the comparison does not help me improve.",
      options: [...LIKERT_5],
      dimension: "comparison",
    },
    {
      id: "g6q9",
      text: "I recover from a poor performance and adjust my method.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "resilience",
    },
    {
      id: "g6q10",
      text: "Academic concerns regularly interfere with sleep or relationships.",
      options: [...LIKERT_5],
      dimension: "life-impact",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "identity-pressure", label: "Identity pressure", questionIds: ["g6q1"] },
    { id: "self-worth", label: "Self-worth", questionIds: ["g6q2"] },
    { id: "perfectionism", label: "Perfectionism", questionIds: ["g6q3"] },
    { id: "support-seeking", label: "Support seeking", questionIds: ["g6q4"] },
    { id: "recovery-guilt", label: "Recovery guilt", questionIds: ["g6q5"] },
    { id: "motivation", label: "Motivation", questionIds: ["g6q6"] },
    { id: "planning", label: "Planning", questionIds: ["g6q7"] },
    { id: "comparison", label: "Comparison", questionIds: ["g6q8"] },
    { id: "resilience", label: "Resilience", questionIds: ["g6q9"] },
    { id: "life-impact", label: "Life impact", questionIds: ["g6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Healthy Academic Drive",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of academic pressure. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Pressure Building",
      color: "yellow",
      interpretation:
        "Some signs of academic pressure are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "High Academic Strain",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of academic pressure that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Performance Identity Overload",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of academic pressure. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
