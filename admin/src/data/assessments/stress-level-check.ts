/**
 * A2. Stress Level Check™
 * Tier: Discovery (Free)
 * Measures perceived pressure, cognitive load, and recovery ability.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const stressLevelCheck: AssessmentConfig = {
  slug: "stress-level-check",
  order: 2,
  type: "standard",
  tier: "discovery",
  category: "Mental Wellness",
  status: "active",
  meta: {
    title: "Stress Level Check™",
    subtitle: "What's your real stress level?",
    description:
      "Measure your current stress using situational questions. Under 2 minutes, private, and immediately actionable.",
    purpose: "Measures perceived pressure, cognitive load, and recovery ability.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "brain",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "For each question, choose how often this applies to you in a typical week. Answer honestly — there are no right or wrong answers.",
  questions: [
    {
      id: "a2q1",
      text: "How often do you feel that several important things require your attention at the same time?",
      options: [...LIKERT_5],
      dimension: "pressure",
    },
    {
      id: "a2q2",
      text: "When plans change unexpectedly, how difficult is it to adjust?",
      options: [...LIKERT_5],
      dimension: "pressure",
    },
    {
      id: "a2q3",
      text: "How often are you able to find moments of calm during a busy day?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a2q4",
      text: "How frequently do you replay conversations or situations in your mind after they have ended?",
      options: [...LIKERT_5],
      dimension: "cognitive-load",
    },
    {
      id: "a2q5",
      text: "When facing deadlines, how often do you feel rushed?",
      options: [...LIKERT_5],
      dimension: "pressure",
    },
    {
      id: "a2q6",
      text: "How easy is it for you to relax when your responsibilities are temporarily completed?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a2q7",
      text: "How often do you feel mentally occupied even during free time?",
      options: [...LIKERT_5],
      dimension: "cognitive-load",
    },
    {
      id: "a2q8",
      text: "How often do everyday demands feel heavier than they should?",
      options: [...LIKERT_5],
      dimension: "pressure",
    },
    {
      id: "a2q9",
      text: "How often do you wake up feeling ready for the day ahead?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a2q10",
      text: "How frequently do you feel that your mind is juggling too many things at once?",
      options: [...LIKERT_5],
      dimension: "cognitive-load",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "pressure", label: "Pressure", questionIds: ["a2q1", "a2q2", "a2q5", "a2q8"] },
    { id: "cognitive-load", label: "Cognitive Load", questionIds: ["a2q4", "a2q7", "a2q10"] },
    { id: "recovery", label: "Recovery", questionIds: ["a2q3", "a2q6", "a2q9"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Calm Navigator",
      color: "green",
      interpretation:
        "You manage stress effectively and maintain a healthy sense of control over daily demands.",
    },
    {
      min: 20,
      max: 29,
      label: "Active Juggler",
      color: "yellow",
      interpretation:
        "You are handling multiple demands but may benefit from better recovery strategies.",
    },
    {
      min: 30,
      max: 39,
      label: "Pressure Carrier",
      color: "orange",
      interpretation:
        "Your cognitive load is elevated. Sustained pressure at this level can affect clarity and wellbeing.",
    },
    {
      min: 40,
      max: 50,
      label: "Constant Firefighter",
      color: "red",
      interpretation:
        "You may be operating under persistent high stress. Review your commitments and recovery patterns.",
    },
  ],
};
