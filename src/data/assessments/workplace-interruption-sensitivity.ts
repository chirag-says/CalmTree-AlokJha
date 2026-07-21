/**
 * W16. Workplace Interruption Sensitivity
 * Measures how strongly messages, unscheduled requests, noise and
 * task-switching affect concentration and recovery.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workplaceInterruptionSensitivity: AssessmentConfig = {
  slug: "workplace-interruption-sensitivity",
  order: 31,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Interruption Sensitivity",
    subtitle: "How sensitive are you to interruptions?",
    description:
      "Measure how strongly messages, requests and task-switching affect your concentration.",
    purpose:
      "Measures how strongly messages, unscheduled requests, noise and task-switching affect concentration and recovery.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "alert-circle",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w16q1",
      text: "A message notification can pull my attention away even when I do not open it.",
      options: [...LIKERT_5],
      dimension: "digital-interruption",
    },
    {
      id: "w16q2",
      text: "After an interruption, I return to full concentration quickly.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-speed",
    },
    {
      id: "w16q3",
      text: "Unplanned questions make it difficult to complete deep work.",
      options: [...LIKERT_5],
      dimension: "social-interruption",
    },
    {
      id: "w16q4",
      text: "I can protect focus time without feeling guilty or unavailable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary-confidence",
    },
    {
      id: "w16q5",
      text: "Background conversation or noise significantly affects my thinking.",
      options: [...LIKERT_5],
      dimension: "environmental-sensitivity",
    },
    {
      id: "w16q6",
      text: "I switch tasks frequently because new requests feel immediately urgent.",
      options: [...LIKERT_5],
      dimension: "priority-capture",
    },
    {
      id: "w16q7",
      text: "I batch messages or requests instead of responding continuously.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "interruption-control",
    },
    {
      id: "w16q8",
      text: "Several small interruptions leave me more tired than one long task.",
      options: [...LIKERT_5],
      dimension: "cumulative-load",
    },
    {
      id: "w16q9",
      text: "I communicate when I need uninterrupted time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary-communication",
    },
    {
      id: "w16q10",
      text: "My work environment supports periods of sustained concentration.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "environment-support",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "digital-interruption", label: "Digital Interruption", questionIds: ["w16q1"] },
    { id: "recovery-speed", label: "Recovery Speed", questionIds: ["w16q2"] },
    { id: "social-interruption", label: "Social Interruption", questionIds: ["w16q3"] },
    { id: "boundary-confidence", label: "Boundary Confidence", questionIds: ["w16q4"] },
    { id: "environmental-sensitivity", label: "Environmental Sensitivity", questionIds: ["w16q5"] },
    { id: "priority-capture", label: "Priority Capture", questionIds: ["w16q6"] },
    { id: "interruption-control", label: "Interruption Control", questionIds: ["w16q7"] },
    { id: "cumulative-load", label: "Cumulative Load", questionIds: ["w16q8"] },
    { id: "boundary-communication", label: "Boundary Communication", questionIds: ["w16q9"] },
    { id: "environment-support", label: "Environment Support", questionIds: ["w16q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Focus Resilient",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of interruption sensitivity. Protective habits appear to be working reasonably well.",
      nextStep:
        "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build.",
    },
    {
      min: 20,
      max: 29,
      label: "Moderate Sensitivity",
      color: "yellow",
      interpretation:
        "Some signs of interruption sensitivity are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise your score most often and make one practical change this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Interruption Sensitive",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of interruption sensitivity that may be affecting energy, concentration, relationships or performance.",
      nextStep:
        "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan.",
    },
    {
      min: 40,
      max: 50,
      label: "High Focus Disruption",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of interruption sensitivity. The present pace or environment may be difficult to sustain.",
      nextStep:
        "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent.",
    },
  ],
};
