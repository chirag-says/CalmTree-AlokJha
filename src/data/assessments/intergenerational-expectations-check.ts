/**
 * P6. Intergenerational Expectations Check
 * Pack 9 — Family, Parenting and Social Roles
 * Highlights pressure created by differing expectations about duty, marriage, career, money, care and independence across generations.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const intergenerationalExpectationsCheck: AssessmentConfig = {
  slug: "intergenerational-expectations-check",
  order: 86,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Intergenerational Expectations Check",
    subtitle: "A quick read on your intergenerational expectation strain.",
    description:
      "Highlights pressure created by differing expectations about duty, marriage, career, money, care and independence across generations. Ten honest questions, instant results, completely private.",
    purpose:
      "Highlights pressure created by differing expectations about duty, marriage, career, money, care and independence across generations.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p6q1",
      text: "Family duty is often treated as more important than individual circumstance.",
      options: [...LIKERT_5],
      dimension: "duty-pressure",
    },
    {
      id: "p6q2",
      text: "Different generations can discuss expectations without treating disagreement as rejection.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "dialogue",
    },
    {
      id: "p6q3",
      text: "Career or relationship choices are judged mainly through family reputation.",
      options: [...LIKERT_5],
      dimension: "reputation",
    },
    {
      id: "p6q4",
      text: "Expectations about financial support are assumed rather than discussed.",
      options: [...LIKERT_5],
      dimension: "money-expectations",
    },
    {
      id: "p6q5",
      text: "I can appreciate family values without following every traditional role.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "values-integration",
    },
    {
      id: "p6q6",
      text: "Guilt or comparison is used to enforce expected behaviour.",
      options: [...LIKERT_5],
      dimension: "emotional-pressure",
    },
    {
      id: "p6q7",
      text: "Care responsibilities are negotiated according to capacity, not only custom.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "care-negotiation",
    },
    {
      id: "p6q8",
      text: "Privacy and independence are interpreted as reduced love or loyalty.",
      options: [...LIKERT_5],
      dimension: "autonomy-conflict",
    },
    {
      id: "p6q9",
      text: "We can distinguish respect from unquestioning obedience.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "respect-definition",
    },
    {
      id: "p6q10",
      text: "There are practical conversations about how expectations may change over time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "future-planning",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "duty-pressure", label: "Duty pressure", questionIds: ["p6q1"] },
    { id: "dialogue", label: "Dialogue", questionIds: ["p6q2"] },
    { id: "reputation", label: "Reputation", questionIds: ["p6q3"] },
    { id: "money-expectations", label: "Money expectations", questionIds: ["p6q4"] },
    { id: "values-integration", label: "Values integration", questionIds: ["p6q5"] },
    { id: "emotional-pressure", label: "Emotional pressure", questionIds: ["p6q6"] },
    { id: "care-negotiation", label: "Care negotiation", questionIds: ["p6q7"] },
    { id: "autonomy-conflict", label: "Autonomy conflict", questionIds: ["p6q8"] },
    { id: "respect-definition", label: "Respect definition", questionIds: ["p6q9"] },
    { id: "future-planning", label: "Future planning", questionIds: ["p6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Expectations Flexible",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of intergenerational expectation strain. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Some Generational Tension",
      color: "yellow",
      interpretation:
        "Some signs of intergenerational expectation strain are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Strong Expectation Pressure",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of intergenerational expectation strain that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Intergenerational Strain High",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of intergenerational expectation strain. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
