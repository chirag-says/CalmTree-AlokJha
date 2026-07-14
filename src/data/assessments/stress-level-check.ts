/**
 * A2. Stress Level Check
 * Pack 2 — Emotional Wellbeing and Digital Balance
 * Measures the frequency of mental pressure, physical tension, reduced control
 * and difficulty recovering from everyday demands.
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
    title: "Stress Level Check",
    subtitle: "How much stress are you carrying?",
    description:
      "A quick self-check on your current stress patterns. Ten honest questions, instant results, completely private.",
    purpose:
      "Measures the frequency of mental pressure, physical tension, reduced control and difficulty recovering from everyday demands.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "activity",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a2q1",
      text: "My thoughts continue racing after the main demands of the day are over.",
      options: [...LIKERT_5],
      dimension: "mental-activation",
    },
    {
      id: "a2q2",
      text: "I notice tension in my body when several demands arrive together.",
      options: [...LIKERT_5],
      dimension: "physical-tension",
    },
    {
      id: "a2q3",
      text: "I can identify and use ways to calm myself before pressure escalates.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-regulation",
    },
    {
      id: "a2q4",
      text: "Small delays or mistakes feel harder to tolerate than usual.",
      options: [...LIKERT_5],
      dimension: "reactivity",
    },
    {
      id: "a2q5",
      text: "I carry several unresolved worries at the same time.",
      options: [...LIKERT_5],
      dimension: "cognitive-load",
    },
    {
      id: "a2q6",
      text: "I ask for help or adjust priorities before pressure becomes unmanageable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "coping",
    },
    {
      id: "a2q7",
      text: "My concentration drops when situations are uncertain.",
      options: [...LIKERT_5],
      dimension: "concentration",
    },
    {
      id: "a2q8",
      text: "I react more sharply to people when I am overloaded.",
      options: [...LIKERT_5],
      dimension: "reactivity",
    },
    {
      id: "a2q9",
      text: "Sleep or quiet time usually restores my mental energy.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a2q10",
      text: "I feel that important demands are beyond my control.",
      options: [...LIKERT_5],
      dimension: "control",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "mental-activation", label: "Mental Activation", questionIds: ["a2q1"] },
    { id: "physical-tension", label: "Physical Tension", questionIds: ["a2q2"] },
    { id: "self-regulation", label: "Self-regulation", questionIds: ["a2q3"] },
    { id: "reactivity", label: "Reactivity", questionIds: ["a2q4", "a2q8"] },
    { id: "cognitive-load", label: "Cognitive Load", questionIds: ["a2q5"] },
    { id: "coping", label: "Coping", questionIds: ["a2q6"] },
    { id: "concentration", label: "Concentration", questionIds: ["a2q7"] },
    { id: "recovery", label: "Recovery", questionIds: ["a2q9"] },
    { id: "control", label: "Control", questionIds: ["a2q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Calm Navigator",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of stress and pressure. Protective habits appear to be working reasonably well.",
      nextStep:
        "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build.",
    },
    {
      min: 20,
      max: 29,
      label: "Active Juggler",
      color: "yellow",
      interpretation:
        "Some signs of stress and pressure are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise your score most often and make one practical change this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Pressure Carrier",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of stress and pressure that may be affecting energy, concentration, relationships or performance.",
      nextStep:
        "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan.",
    },
    {
      min: 40,
      max: 50,
      label: "Constant Firefighter",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of stress and pressure. The present pace or environment may be difficult to sustain.",
      nextStep:
        "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent.",
    },
  ],
};
