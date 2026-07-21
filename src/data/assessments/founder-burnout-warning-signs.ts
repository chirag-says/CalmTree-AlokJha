/**
 * F8. Founder Burnout Warning Signs
 * Pack 6 — Founders and Entrepreneurship
 * Helps founders notice exhaustion, identity pressure, isolation, detachment and unsustainable operating habits.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const founderBurnoutWarningSigns: AssessmentConfig = {
  slug: "founder-burnout-warning-signs",
  order: 58,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Founder Burnout Warning Signs",
    subtitle: "A quick read on your founder-burnout warning signs.",
    description:
      "Helps founders notice exhaustion, identity pressure, isolation, detachment and unsustainable operating habits. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps founders notice exhaustion, identity pressure, isolation, detachment and unsustainable operating habits.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "flame",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f8q1",
      text: "I can stop working without feeling that the company is immediately at risk.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "detachment",
    },
    {
      id: "f8q2",
      text: "My mood depends heavily on daily business outcomes.",
      options: [...LIKERT_5],
      dimension: "identity-fusion",
    },
    {
      id: "f8q3",
      text: "I am postponing health, relationships or recovery until the venture reaches the next milestone.",
      options: [...LIKERT_5],
      dimension: "sacrifice-pattern",
    },
    {
      id: "f8q4",
      text: "I have at least one person with whom I can speak honestly about founder pressure.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "support",
    },
    {
      id: "f8q5",
      text: "I feel emotionally numb or unusually cynical about work that once mattered to me.",
      options: [...LIKERT_5],
      dimension: "detachment",
    },
    {
      id: "f8q6",
      text: "I continue making important decisions when I know I am depleted.",
      options: [...LIKERT_5],
      dimension: "decision-fatigue",
    },
    {
      id: "f8q7",
      text: "Rest often feels guilty or unproductive.",
      options: [...LIKERT_5],
      dimension: "recovery-beliefs",
    },
    {
      id: "f8q8",
      text: "I can delegate or pause work when my capacity is clearly reduced.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-management",
    },
    {
      id: "f8q9",
      text: "I feel alone even when many people depend on me.",
      options: [...LIKERT_5],
      dimension: "isolation",
    },
    {
      id: "f8q10",
      text: "My current pace feels sustainable for the next six months.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "sustainability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "detachment", label: "Detachment", questionIds: ["f8q1", "f8q5"] },
    { id: "identity-fusion", label: "Identity fusion", questionIds: ["f8q2"] },
    { id: "sacrifice-pattern", label: "Sacrifice pattern", questionIds: ["f8q3"] },
    { id: "support", label: "Support", questionIds: ["f8q4"] },
    { id: "decision-fatigue", label: "Decision fatigue", questionIds: ["f8q6"] },
    { id: "recovery-beliefs", label: "Recovery beliefs", questionIds: ["f8q7"] },
    { id: "self-management", label: "Self-management", questionIds: ["f8q8"] },
    { id: "isolation", label: "Isolation", questionIds: ["f8q9"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["f8q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Sustainable Founder Rhythm",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of founder-burnout warning signs. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Pressure Building",
      color: "yellow",
      interpretation:
        "Some signs of founder-burnout warning signs are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Founder Depletion Pattern",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of founder-burnout warning signs that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Critical Sustainability Warning",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of founder-burnout warning signs. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
