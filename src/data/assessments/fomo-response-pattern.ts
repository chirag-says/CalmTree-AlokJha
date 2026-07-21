/**
 * G3. FOMO Response Pattern
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Examines the fear of missing opportunities, social experiences, trends or information and how it affects choices.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const fomoResponsePattern: AssessmentConfig = {
  slug: "fomo-response-pattern",
  order: 63,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "FOMO Response Pattern",
    subtitle: "A quick read on your fear of missing out.",
    description:
      "Examines the fear of missing opportunities, social experiences, trends or information and how it affects choices. Ten honest questions, instant results, completely private.",
    purpose:
      "Examines the fear of missing opportunities, social experiences, trends or information and how it affects choices.",
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
      id: "g3q1",
      text: "I agree to plans because I worry I will feel excluded if I decline.",
      options: [...LIKERT_5],
      dimension: "social-fomo",
    },
    {
      id: "g3q2",
      text: "I can choose rest even when other people appear to be doing something exciting.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "choice-confidence",
    },
    {
      id: "g3q3",
      text: "I repeatedly check updates to make sure I am not missing important news or conversation.",
      options: [...LIKERT_5],
      dimension: "information-fomo",
    },
    {
      id: "g3q4",
      text: "I feel pressure to try opportunities mainly because others are doing them.",
      options: [...LIKERT_5],
      dimension: "trend-pressure",
    },
    {
      id: "g3q5",
      text: "I can accept that every choice means not choosing something else.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "trade-off-tolerance",
    },
    {
      id: "g3q6",
      text: "Seeing an event after it happened makes me question an otherwise good decision.",
      options: [...LIKERT_5],
      dimension: "regret",
    },
    {
      id: "g3q7",
      text: "I know which experiences genuinely matter to me.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "values-clarity",
    },
    {
      id: "g3q8",
      text: "I keep multiple options open because committing may close a better possibility.",
      options: [...LIKERT_5],
      dimension: "commitment",
    },
    {
      id: "g3q9",
      text: "I can enjoy my present activity without checking what others are doing.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "presence",
    },
    {
      id: "g3q10",
      text: "I make purchases or plans quickly because access may disappear.",
      options: [...LIKERT_5],
      dimension: "scarcity-response",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "social-fomo", label: "Social FOMO", questionIds: ["g3q1"] },
    { id: "choice-confidence", label: "Choice confidence", questionIds: ["g3q2"] },
    { id: "information-fomo", label: "Information FOMO", questionIds: ["g3q3"] },
    { id: "trend-pressure", label: "Trend pressure", questionIds: ["g3q4"] },
    { id: "trade-off-tolerance", label: "Trade-off tolerance", questionIds: ["g3q5"] },
    { id: "regret", label: "Regret", questionIds: ["g3q6"] },
    { id: "values-clarity", label: "Values clarity", questionIds: ["g3q7"] },
    { id: "commitment", label: "Commitment", questionIds: ["g3q8"] },
    { id: "presence", label: "Presence", questionIds: ["g3q9"] },
    { id: "scarcity-response", label: "Scarcity response", questionIds: ["g3q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Present-Focused",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of fear of missing out. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Occasional FOMO",
      color: "yellow",
      interpretation:
        "Some signs of fear of missing out are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "FOMO-Driven Choices",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of fear of missing out that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Always-Missing-Something Pressure",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of fear of missing out. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
