/**
 * G2. Social Comparison Pressure
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Explores how strongly other people’s achievements, appearance and online visibility influence self-evaluation.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const socialComparisonPressure: AssessmentConfig = {
  slug: "social-comparison-pressure",
  order: 62,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Social Comparison Pressure",
    subtitle: "A quick read on your social-comparison pressure.",
    description:
      "Explores how strongly other people’s achievements, appearance and online visibility influence self-evaluation. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores how strongly other people’s achievements, appearance and online visibility influence self-evaluation.",
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
      id: "g2q1",
      text: "Seeing other people’s progress makes my own life feel behind.",
      options: [...LIKERT_5],
      dimension: "achievement-comparison",
    },
    {
      id: "g2q2",
      text: "I can appreciate someone else’s success without using it as evidence against myself.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "balanced-comparison",
    },
    {
      id: "g2q3",
      text: "I compare my appearance with edited or highly selected images online.",
      options: [...LIKERT_5],
      dimension: "appearance-comparison",
    },
    {
      id: "g2q4",
      text: "I remember that I am comparing my full life with another person’s visible highlights.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "perspective",
    },
    {
      id: "g2q5",
      text: "Other people’s milestones create urgency even when their goals are different from mine.",
      options: [...LIKERT_5],
      dimension: "timeline-pressure",
    },
    {
      id: "g2q6",
      text: "My confidence changes according to how much attention my posts receive.",
      options: [...LIKERT_5],
      dimension: "visibility",
    },
    {
      id: "g2q7",
      text: "I can identify personal progress that is not publicly visible.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "internal-reference",
    },
    {
      id: "g2q8",
      text: "I often search for people who confirm that I am doing better or worse than average.",
      options: [...LIKERT_5],
      dimension: "ranking",
    },
    {
      id: "g2q9",
      text: "I reduce exposure to accounts that repeatedly worsen my self-view.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "digital-boundaries",
    },
    {
      id: "g2q10",
      text: "I can use comparison as information without letting it define my worth.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-worth",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "achievement-comparison", label: "Achievement comparison", questionIds: ["g2q1"] },
    { id: "balanced-comparison", label: "Balanced comparison", questionIds: ["g2q2"] },
    { id: "appearance-comparison", label: "Appearance comparison", questionIds: ["g2q3"] },
    { id: "perspective", label: "Perspective", questionIds: ["g2q4"] },
    { id: "timeline-pressure", label: "Timeline pressure", questionIds: ["g2q5"] },
    { id: "visibility", label: "Visibility", questionIds: ["g2q6"] },
    { id: "internal-reference", label: "Internal reference", questionIds: ["g2q7"] },
    { id: "ranking", label: "Ranking", questionIds: ["g2q8"] },
    { id: "digital-boundaries", label: "Digital boundaries", questionIds: ["g2q9"] },
    { id: "self-worth", label: "Self-worth", questionIds: ["g2q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Self-Referenced",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of social-comparison pressure. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Occasional Comparison",
      color: "yellow",
      interpretation:
        "Some signs of social-comparison pressure are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Comparison-Driven",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of social-comparison pressure that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Comparison Pressure High",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of social-comparison pressure. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
