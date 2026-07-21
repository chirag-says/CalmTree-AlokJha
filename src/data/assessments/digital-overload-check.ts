/**
 * G1. Digital Overload Check
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Helps young adults reflect on constant connectivity, mental fatigue, sleep disruption and difficulty disengaging from screens.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const digitalOverloadCheck: AssessmentConfig = {
  slug: "digital-overload-check",
  order: 61,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Digital Overload Check",
    subtitle: "A quick read on your digital overload.",
    description:
      "Helps young adults reflect on constant connectivity, mental fatigue, sleep disruption and difficulty disengaging from screens. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps young adults reflect on constant connectivity, mental fatigue, sleep disruption and difficulty disengaging from screens.",
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
      id: "g1q1",
      text: "I check my phone automatically even when I did not intend to use it.",
      options: [...LIKERT_5],
      dimension: "automatic-use",
    },
    {
      id: "g1q2",
      text: "I can complete an important task without repeatedly switching to messages or feeds.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "focus",
    },
    {
      id: "g1q3",
      text: "Online content continues occupying my mind after I stop using the device.",
      options: [...LIKERT_5],
      dimension: "mental-carryover",
    },
    {
      id: "g1q4",
      text: "I use screens later than planned even when I need sleep.",
      options: [...LIKERT_5],
      dimension: "sleep-impact",
    },
    {
      id: "g1q5",
      text: "Quiet moments feel uncomfortable unless I have digital stimulation.",
      options: [...LIKERT_5],
      dimension: "stimulation-need",
    },
    {
      id: "g1q6",
      text: "I can intentionally leave my phone away during meals or conversations.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundaries",
    },
    {
      id: "g1q7",
      text: "I feel mentally tired after long periods of scrolling, even when the content was not demanding.",
      options: [...LIKERT_5],
      dimension: "fatigue",
    },
    {
      id: "g1q8",
      text: "I notice when online activity has stopped being useful or enjoyable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "awareness",
    },
    {
      id: "g1q9",
      text: "Notifications frequently interrupt work, study or rest.",
      options: [...LIKERT_5],
      dimension: "interruption",
    },
    {
      id: "g1q10",
      text: "I have regular periods when I am not expected to be digitally available.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "automatic-use", label: "Automatic use", questionIds: ["g1q1"] },
    { id: "focus", label: "Focus", questionIds: ["g1q2"] },
    { id: "mental-carryover", label: "Mental carryover", questionIds: ["g1q3"] },
    { id: "sleep-impact", label: "Sleep impact", questionIds: ["g1q4"] },
    { id: "stimulation-need", label: "Stimulation need", questionIds: ["g1q5"] },
    { id: "boundaries", label: "Boundaries", questionIds: ["g1q6"] },
    { id: "fatigue", label: "Fatigue", questionIds: ["g1q7"] },
    { id: "awareness", label: "Awareness", questionIds: ["g1q8"] },
    { id: "interruption", label: "Interruption", questionIds: ["g1q9"] },
    { id: "recovery", label: "Recovery", questionIds: ["g1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Digitally Balanced",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of digital overload. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "High-Use but Manageable",
      color: "yellow",
      interpretation:
        "Some signs of digital overload are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Digital Overload Pattern",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of digital overload that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Always-On Strain",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of digital overload. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
