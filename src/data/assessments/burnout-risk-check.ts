/**
 * A1. Burnout Risk Check
 * Pack 2 — Emotional Wellbeing and Digital Balance
 * Helps users reflect on emotional exhaustion, detachment, recovery and
 * whether their current pace feels sustainable.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const burnoutRiskCheck: AssessmentConfig = {
  slug: "burnout-risk-check",
  order: 1,
  type: "standard",
  tier: "discovery",
  category: "Mental Wellness",
  status: "active",
  meta: {
    title: "Burnout Risk Check",
    subtitle: "How close to burnout are you?",
    description:
      "A quick, situational self-check on your burnout risk. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps users reflect on emotional exhaustion, detachment, recovery and whether their current pace feels sustainable.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "flame",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a1q1",
      text: "I begin most days feeling physically and mentally restored.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a1q2",
      text: "I can finish demanding work without feeling completely drained.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "energy",
    },
    {
      id: "a1q3",
      text: "Even small tasks feel heavier than they used to.",
      options: [...LIKERT_5],
      dimension: "exhaustion",
    },
    {
      id: "a1q4",
      text: "I can mentally switch off after my responsibilities end.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "detachment",
    },
    {
      id: "a1q5",
      text: "I feel emotionally distant from activities I once cared about.",
      options: [...LIKERT_5],
      dimension: "engagement",
    },
    {
      id: "a1q6",
      text: "I push myself despite clear signs that I need rest.",
      options: [...LIKERT_5],
      dimension: "self-pressure",
    },
    {
      id: "a1q7",
      text: "I find it difficult to recover between demanding days.",
      options: [...LIKERT_5],
      dimension: "recovery",
    },
    {
      id: "a1q8",
      text: "I still feel interested and effective in what I do.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "efficacy",
    },
    {
      id: "a1q9",
      text: "My current pace feels sustainable for the next several months.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "sustainability",
    },
    {
      id: "a1q10",
      text: "I feel irritable or numb when other people need something from me.",
      options: [...LIKERT_5],
      dimension: "emotional-load",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "recovery", label: "Recovery", questionIds: ["a1q1", "a1q7"] },
    { id: "energy", label: "Energy", questionIds: ["a1q2"] },
    { id: "exhaustion", label: "Exhaustion", questionIds: ["a1q3"] },
    { id: "detachment", label: "Detachment", questionIds: ["a1q4"] },
    { id: "engagement", label: "Engagement", questionIds: ["a1q5"] },
    { id: "self-pressure", label: "Self-pressure", questionIds: ["a1q6"] },
    { id: "efficacy", label: "Efficacy", questionIds: ["a1q8"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["a1q9"] },
    { id: "emotional-load", label: "Emotional Load", questionIds: ["a1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Sustainable Performer",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of burnout-related strain. Protective habits appear to be working reasonably well.",
      nextStep:
        "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build.",
    },
    {
      min: 20,
      max: 29,
      label: "Busy Balancer",
      color: "yellow",
      interpretation:
        "Some signs of burnout-related strain are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise your score most often and make one practical change this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Overloaded Achiever",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of burnout-related strain that may be affecting energy, concentration, relationships or performance.",
      nextStep:
        "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan.",
    },
    {
      min: 40,
      max: 50,
      label: "Exhausted Warrior",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of burnout-related strain. The present pace or environment may be difficult to sustain.",
      nextStep:
        "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent.",
    },
  ],
};
