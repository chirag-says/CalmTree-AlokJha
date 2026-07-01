/**
 * A34. Workplace Emotional Load Check
 * Tier: Professional
 * Measures the emotional effort created by difficult interactions, emotional labour and carrying other people's concerns at work.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workplaceEmotionalLoad: AssessmentConfig = {
  slug: "workplace-emotional-load",
  order: 34,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Emotional Load Check",
    subtitle: "How much emotional weight does work place on you?",
    description:
      "Measure the emotional effort created by difficult interactions, emotional labour and carrying other people's concerns at work.",
    purpose:
      "Measures the emotional effort created by difficult interactions, emotional labour and carrying other people's concerns at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "wel1",
      text: "I regularly absorb other people's frustration, worry or disappointment.",
      options: [...LIKERT_5],
      dimension: "emotional-absorption",
    },
    {
      id: "wel2",
      text: "I must hide or manage my real emotions to perform my role.",
      options: [...LIKERT_5],
      dimension: "emotional-display",
    },
    {
      id: "wel3",
      text: "Difficult conversations stay with me long after they end.",
      options: [...LIKERT_5],
      dimension: "carryover",
    },
    {
      id: "wel4",
      text: "I can care about colleagues or clients without taking responsibility for their emotions.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-boundary",
    },
    {
      id: "wel5",
      text: "I am expected to remain calm even when others behave unfairly or aggressively.",
      options: [...LIKERT_5],
      dimension: "emotional-display",
    },
    {
      id: "wel6",
      text: "I have a safe way to process emotionally demanding work.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "processing-support",
    },
    {
      id: "wel7",
      text: "I feel personally responsible when someone at work is distressed.",
      options: [...LIKERT_5],
      dimension: "emotional-absorption",
    },
    {
      id: "wel8",
      text: "My work requires repeated exposure to complaints, conflict or difficult news.",
      options: [...LIKERT_5],
      dimension: "exposure",
    },
    {
      id: "wel9",
      text: "I can recover emotionally after a difficult interaction.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "wel10",
      text: "Emotional demands reduce my energy for tasks that require concentration.",
      options: [...LIKERT_5],
      dimension: "functional-impact",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-absorption", label: "Emotional Absorption", questionIds: ["wel1", "wel7"] },
    { id: "emotional-display", label: "Emotional Display", questionIds: ["wel2", "wel5"] },
    { id: "carryover", label: "Carryover", questionIds: ["wel3"] },
    { id: "emotional-boundary", label: "Emotional Boundary", questionIds: ["wel4"] },
    { id: "processing-support", label: "Processing Support", questionIds: ["wel6"] },
    { id: "exposure", label: "Exposure", questionIds: ["wel8"] },
    { id: "recovery", label: "Recovery", questionIds: ["wel9"] },
    { id: "functional-impact", label: "Functional Impact", questionIds: ["wel10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Low Emotional Load",
      color: "green",
      interpretation:
        "Emotional demands appear manageable and reasonably contained. Maintain boundaries, processing support and recovery practices.",
    },
    {
      min: 21,
      max: 30,
      label: "Moderate Emotional Load",
      color: "yellow",
      interpretation:
        "Some interactions require meaningful emotional effort, but you generally retain functioning. Name the heaviest situations and build a deliberate decompression practice.",
    },
    {
      min: 31,
      max: 40,
      label: "High Emotional Load",
      color: "orange",
      interpretation:
        "Emotional labour may be consuming substantial energy and carrying into other areas of life. Strengthen boundaries and reduce unnecessary exposure where possible.",
    },
    {
      min: 41,
      max: 50,
      label: "Severe Emotional Burden",
      color: "red",
      interpretation:
        "The emotional requirements of work may be overwhelming current coping and recovery resources. Seek appropriate organisational and professional support.",
    },
  ],
};
