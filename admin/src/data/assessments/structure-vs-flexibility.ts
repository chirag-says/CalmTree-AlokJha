/**
 * A18. Structure vs Flexibility Preference
 * Tier: Professional
 * Measures the degree to which a person prefers plans, predictability and defined procedures versus autonomy, experimentation and fluid priorities.
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
    subtitle: "Do you work better with plans or autonomy?",
    description:
      "Understand whether you thrive on defined processes and predictability, or prefer autonomy and fluid priorities. Quick, private and actionable.",
    purpose:
      "Measures the degree to which a person prefers plans, predictability and defined procedures versus autonomy, experimentation and fluid priorities.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "layers",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "svf1",
      text: "I am most productive when priorities and deadlines are clearly defined.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure-pref",
    },
    {
      id: "svf2",
      text: "I enjoy adapting my approach as new information appears.",
      options: [...LIKERT_5],
      dimension: "flexibility-pref",
    },
    {
      id: "svf3",
      text: "Last-minute changes usually disrupt my concentration.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure-pref",
    },
    {
      id: "svf4",
      text: "I prefer broad goals rather than detailed instructions.",
      options: [...LIKERT_5],
      dimension: "flexibility-pref",
    },
    {
      id: "svf5",
      text: "I naturally create routines for recurring work.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure-pref",
    },
    {
      id: "svf6",
      text: "I am comfortable deciding the method while the work is underway.",
      options: [...LIKERT_5],
      dimension: "flexibility-pref",
    },
    {
      id: "svf7",
      text: "I like to know what a successful day will look like before it begins.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure-pref",
    },
    {
      id: "svf8",
      text: "Variety helps me stay interested and productive.",
      options: [...LIKERT_5],
      dimension: "flexibility-pref",
    },
    {
      id: "svf9",
      text: "Unclear processes make me hesitate to begin.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure-pref",
    },
    {
      id: "svf10",
      text: "I can change direction without feeling that the earlier plan was wasted.",
      options: [...LIKERT_5],
      dimension: "flexibility-pref",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    {
      id: "structure-pref",
      label: "Structure Preference",
      questionIds: ["svf1", "svf3", "svf5", "svf7", "svf9"],
    },
    {
      id: "flexibility-pref",
      label: "Flexibility Preference",
      questionIds: ["svf2", "svf4", "svf6", "svf8", "svf10"],
    },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Structure-Seeking",
      color: "blue",
      interpretation:
        "You perform best with defined expectations, stable routines and visible progress markers.",
    },
    {
      min: 21,
      max: 30,
      label: "Structured with Flexibility",
      color: "emerald",
      interpretation:
        "You value planning while remaining able to adjust when there is a sound reason.",
    },
    {
      min: 31,
      max: 40,
      label: "Flexible with Anchors",
      color: "yellow",
      interpretation:
        "You welcome autonomy and change but still benefit from a few dependable checkpoints.",
    },
    {
      min: 41,
      max: 50,
      label: "Flexibility-Seeking",
      color: "orange",
      interpretation:
        "You are energised by variety, autonomy and evolving challenges. Highly fixed environments may feel restrictive.",
    },
  ],
};
