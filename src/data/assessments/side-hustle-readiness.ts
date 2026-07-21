/**
 * C9. Side-Hustle Readiness
 * Pack 8 — Career Direction and Professional Growth
 * Assesses clarity, time capacity, discipline, market testing and financial expectations before starting a side business.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const sideHustleReadiness: AssessmentConfig = {
  slug: "side-hustle-readiness",
  order: 79,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Side-Hustle Readiness",
    subtitle: "A quick read on your side-hustle readiness.",
    description:
      "Assesses clarity, time capacity, discipline, market testing and financial expectations before starting a side business. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses clarity, time capacity, discipline, market testing and financial expectations before starting a side business.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c9q1",
      text: "I can describe the customer problem or useful outcome clearly.",
      options: [...LIKERT_5],
      dimension: "offer-clarity",
    },
    {
      id: "c9q2",
      text: "I am relying mainly on motivation without a realistic weekly time commitment.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "time-capacity",
    },
    {
      id: "c9q3",
      text: "I can begin with a small offer before building a full brand or platform.",
      options: [...LIKERT_5],
      dimension: "lean-testing",
    },
    {
      id: "c9q4",
      text: "I understand any employer, legal or conflict-of-interest restrictions.",
      options: [...LIKERT_5],
      dimension: "risk-awareness",
    },
    {
      id: "c9q5",
      text: "I expect income quickly enough to solve immediate financial pressure.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "expectation",
    },
    {
      id: "c9q6",
      text: "I have a simple way to reach the first ten potential customers.",
      options: [...LIKERT_5],
      dimension: "distribution",
    },
    {
      id: "c9q7",
      text: "I can track costs, revenue and time invested.",
      options: [...LIKERT_5],
      dimension: "business-discipline",
    },
    {
      id: "c9q8",
      text: "I am willing to repeat unglamorous tasks after the initial excitement fades.",
      options: [...LIKERT_5],
      dimension: "consistency",
    },
    {
      id: "c9q9",
      text: "I know what success would look like after 90 days.",
      options: [...LIKERT_5],
      dimension: "measurement",
    },
    {
      id: "c9q10",
      text: "I can protect health and primary responsibilities while testing the idea.",
      options: [...LIKERT_5],
      dimension: "sustainability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "offer-clarity", label: "Offer clarity", questionIds: ["c9q1"] },
    { id: "time-capacity", label: "Time capacity", questionIds: ["c9q2"] },
    { id: "lean-testing", label: "Lean testing", questionIds: ["c9q3"] },
    { id: "risk-awareness", label: "Risk awareness", questionIds: ["c9q4"] },
    { id: "expectation", label: "Expectation", questionIds: ["c9q5"] },
    { id: "distribution", label: "Distribution", questionIds: ["c9q6"] },
    { id: "business-discipline", label: "Business discipline", questionIds: ["c9q7"] },
    { id: "consistency", label: "Consistency", questionIds: ["c9q8"] },
    { id: "measurement", label: "Measurement", questionIds: ["c9q9"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["c9q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Idea Without Capacity",
      color: "blue",
      interpretation:
        "Your responses suggest that side-hustle readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Side-Hustle Foundations",
      color: "yellow",
      interpretation:
        "You show some foundations of side-hustle readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Ready to Test",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of side-hustle readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Disciplined Side-Hustle Builder",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of side-hustle readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
