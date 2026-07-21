/**
 * W3. Structure vs Flexibility Preference
 * Pack 1 — Self-Awareness and Personality
 * Measures preference for plans, predictability and defined procedures
 * versus autonomy, experimentation and fluid priorities.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const structureVsFlexibility: AssessmentConfig = {
  slug: "structure-vs-flexibility",
  order: 18,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Structure vs Flexibility Preference",
    subtitle: "Do you prefer plans or freedom?",
    description:
      "Measure your preference for structure and plans versus autonomy and experimentation.",
    purpose:
      "Measures preference for plans, predictability and defined procedures versus autonomy, experimentation and fluid priorities.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "layers",
    productCategory: "Self-Awareness & Personality",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w3q1",
      text: "I am most productive when priorities and deadlines are clearly defined.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    {
      id: "w3q2",
      text: "I enjoy adapting my approach as new information appears.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
    {
      id: "w3q3",
      text: "Last-minute changes usually disrupt my concentration.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    {
      id: "w3q4",
      text: "I prefer broad goals rather than detailed instructions.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
    {
      id: "w3q5",
      text: "I naturally create routines for recurring work.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    {
      id: "w3q6",
      text: "I am comfortable deciding the method while work is underway.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
    {
      id: "w3q7",
      text: "I like to know what a successful day will look like before it begins.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    {
      id: "w3q8",
      text: "Variety helps me stay interested and productive.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
    {
      id: "w3q9",
      text: "Unclear processes make me hesitate to begin.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    {
      id: "w3q10",
      text: "I can change direction without feeling that the earlier plan was wasted.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "structure", label: "Structure", questionIds: ["w3q1", "w3q3", "w3q5", "w3q7", "w3q9"] },
    {
      id: "flexibility",
      label: "Flexibility",
      questionIds: ["w3q2", "w3q4", "w3q6", "w3q8", "w3q10"],
    },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Structure Anchored",
      color: "blue",
      interpretation: "You prefer clear plans, stable expectations and dependable procedures.",
      nextStep: "Practise working with one deliberately open-ended task each week.",
    },
    {
      min: 21,
      max: 30,
      label: "Planned Adapter",
      color: "yellow",
      interpretation: "You value structure but can adjust when the reason for change is clear.",
      nextStep: "Build flexible checkpoints into plans instead of treating change as failure.",
    },
    {
      min: 31,
      max: 40,
      label: "Flexible Operator",
      color: "emerald",
      interpretation:
        "You are comfortable adapting methods while keeping enough structure to deliver.",
      nextStep: "Clarify non-negotiable outcomes before experimenting with process.",
    },
    {
      min: 41,
      max: 50,
      label: "Fluid Explorer",
      color: "green",
      interpretation: "You prefer autonomy, variety and freedom to change direction.",
      nextStep:
        "Add simple routines and completion criteria so flexibility produces consistent results.",
    },
  ],
};
