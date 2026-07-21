/**
 * W19. Workplace Emotional Load Check
 * Measures emotional effort of managing reactions, supporting others,
 * hiding feelings and carrying unresolved tension at work.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workplaceEmotionalLoad: AssessmentConfig = {
  slug: "workplace-emotional-load",
  order: 34,
  type: "standard",
  tier: "professional",
  category: "Mental Wellness",
  status: "active",
  meta: {
    title: "Workplace Emotional Load Check",
    subtitle: "How heavy is your emotional load at work?",
    description:
      "Measure the emotional effort of managing reactions, supporting others and carrying tension.",
    purpose:
      "Measures the emotional effort of managing reactions, supporting others, hiding feelings and carrying unresolved interpersonal tension at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w19q1",
      text: "I regularly absorb other people's frustration or worry.",
      options: [...LIKERT_5],
      dimension: "emotional-absorption",
    },
    {
      id: "w19q2",
      text: "I can care about colleagues without feeling responsible for fixing everything.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary",
    },
    {
      id: "w19q3",
      text: "I hide my true reactions for much of the workday.",
      options: [...LIKERT_5],
      dimension: "emotional-masking",
    },
    {
      id: "w19q4",
      text: "Difficult interactions stay with me long after they end.",
      options: [...LIKERT_5],
      dimension: "carryover",
    },
    {
      id: "w19q5",
      text: "I know when to step back from an emotionally demanding conversation.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary",
    },
    {
      id: "w19q6",
      text: "I am expected to remain calm even when others behave poorly.",
      options: [...LIKERT_5],
      dimension: "emotional-labour",
    },
    {
      id: "w19q7",
      text: "I have a trusted person or process for debriefing difficult work experiences.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "support",
    },
    {
      id: "w19q8",
      text: "I feel guilty when I cannot meet everyone's emotional needs.",
      options: [...LIKERT_5],
      dimension: "over-responsibility",
    },
    {
      id: "w19q9",
      text: "My role exposes me to repeated conflict, distress or emotional intensity.",
      options: [...LIKERT_5],
      dimension: "exposure",
    },
    {
      id: "w19q10",
      text: "I can leave another person's emotion with them rather than carrying it home.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "detachment",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-absorption", label: "Emotional Absorption", questionIds: ["w19q1"] },
    { id: "boundary", label: "Boundary", questionIds: ["w19q2", "w19q5"] },
    { id: "emotional-masking", label: "Emotional Masking", questionIds: ["w19q3"] },
    { id: "carryover", label: "Carryover", questionIds: ["w19q4"] },
    { id: "emotional-labour", label: "Emotional Labour", questionIds: ["w19q6"] },
    { id: "support", label: "Support", questionIds: ["w19q7"] },
    { id: "over-responsibility", label: "Over-responsibility", questionIds: ["w19q8"] },
    { id: "exposure", label: "Exposure", questionIds: ["w19q9"] },
    { id: "detachment", label: "Detachment", questionIds: ["w19q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Low Emotional Load",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of workplace emotional load. Protective habits appear to be working reasonably well.",
      nextStep:
        "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build.",
    },
    {
      min: 20,
      max: 29,
      label: "Manageable Emotional Demand",
      color: "yellow",
      interpretation:
        "Some signs of workplace emotional load are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise your score most often and make one practical change this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Emotional Carryover",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of workplace emotional load that may be affecting energy, concentration, relationships or performance.",
      nextStep:
        "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan.",
    },
    {
      min: 40,
      max: 50,
      label: "Heavy Emotional Load",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of workplace emotional load. The present pace or environment may be difficult to sustain.",
      nextStep:
        "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent.",
    },
  ],
};
