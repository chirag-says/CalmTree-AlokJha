/**
 * G9. Attention Fragmentation Check
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Assesses frequent task-switching, interrupted concentration and difficulty sustaining attention in study or work.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const attentionFragmentationCheck: AssessmentConfig = {
  slug: "attention-fragmentation-check",
  order: 69,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Attention Fragmentation Check",
    subtitle: "A quick read on your attention fragmentation.",
    description:
      "Assesses frequent task-switching, interrupted concentration and difficulty sustaining attention in study or work. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses frequent task-switching, interrupted concentration and difficulty sustaining attention in study or work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "monitor",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g9q1",
      text: "I switch between tasks before reaching a natural stopping point.",
      options: [...LIKERT_5],
      dimension: "task-switching",
    },
    {
      id: "g9q2",
      text: "I can work on one demanding activity for a planned period.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "sustained-focus",
    },
    {
      id: "g9q3",
      text: "I open apps or tabs without remembering why I opened them.",
      options: [...LIKERT_5],
      dimension: "automatic-switching",
    },
    {
      id: "g9q4",
      text: "Notifications remain active while I study or complete important work.",
      options: [...LIKERT_5],
      dimension: "environmental-interruption",
    },
    {
      id: "g9q5",
      text: "I can return to a task quickly after an unavoidable interruption.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "g9q6",
      text: "I need multiple forms of stimulation to avoid feeling restless.",
      options: [...LIKERT_5],
      dimension: "stimulation-dependence",
    },
    {
      id: "g9q7",
      text: "I underestimate the time lost when moving between small activities.",
      options: [...LIKERT_5],
      dimension: "time-awareness",
    },
    {
      id: "g9q8",
      text: "I create periods where one task is the only available option.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "focus-design",
    },
    {
      id: "g9q9",
      text: "Longer reading or thinking feels unusually difficult compared with short content.",
      options: [...LIKERT_5],
      dimension: "depth-tolerance",
    },
    {
      id: "g9q10",
      text: "I review whether my digital environment supports the work I want to do.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "environment-design",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "task-switching", label: "Task switching", questionIds: ["g9q1"] },
    { id: "sustained-focus", label: "Sustained focus", questionIds: ["g9q2"] },
    { id: "automatic-switching", label: "Automatic switching", questionIds: ["g9q3"] },
    {
      id: "environmental-interruption",
      label: "Environmental interruption",
      questionIds: ["g9q4"],
    },
    { id: "recovery", label: "Recovery", questionIds: ["g9q5"] },
    { id: "stimulation-dependence", label: "Stimulation dependence", questionIds: ["g9q6"] },
    { id: "time-awareness", label: "Time awareness", questionIds: ["g9q7"] },
    { id: "focus-design", label: "Focus design", questionIds: ["g9q8"] },
    { id: "depth-tolerance", label: "Depth tolerance", questionIds: ["g9q9"] },
    { id: "environment-design", label: "Environment design", questionIds: ["g9q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Focus Protected",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of attention fragmentation. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Some Fragmentation",
      color: "yellow",
      interpretation:
        "Some signs of attention fragmentation are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Fragmented Attention Pattern",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of attention fragmentation that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Continuous Attention Switching",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of attention fragmentation. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
