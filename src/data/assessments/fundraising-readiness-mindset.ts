/**
 * F9. Fundraising Readiness Mindset
 * Pack 6 — Founders and Entrepreneurship
 * Explores evidence, investor communication, resilience and expectations before beginning a fundraising process.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const fundraisingReadinessMindset: AssessmentConfig = {
  slug: "fundraising-readiness-mindset",
  order: 59,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Fundraising Readiness Mindset",
    subtitle: "A quick read on your fundraising readiness.",
    description:
      "Explores evidence, investor communication, resilience and expectations before beginning a fundraising process. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores evidence, investor communication, resilience and expectations before beginning a fundraising process.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f9q1",
      text: "I can explain the problem, customer and business model without relying on jargon.",
      options: [...LIKERT_5],
      dimension: "clarity",
    },
    {
      id: "f9q2",
      text: "I treat fundraising as proof that the venture itself is successful.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "expectation",
    },
    {
      id: "f9q3",
      text: "I know which claims in the pitch are supported by evidence and which are assumptions.",
      options: [...LIKERT_5],
      dimension: "evidence",
    },
    {
      id: "f9q4",
      text: "I can hear investor rejection without immediately changing the entire strategy.",
      options: [...LIKERT_5],
      dimension: "resilience",
    },
    {
      id: "f9q5",
      text: "I understand how much capital is needed and what specific outcomes it should produce.",
      options: [...LIKERT_5],
      dimension: "capital-logic",
    },
    {
      id: "f9q6",
      text: "I avoid difficult questions about risk because they may weaken confidence.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "transparency",
    },
    {
      id: "f9q7",
      text: "I can adapt the story without changing core facts for each audience.",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "f9q8",
      text: "I have considered alternatives if fundraising takes longer or does not happen.",
      options: [...LIKERT_5],
      dimension: "optionality",
    },
    {
      id: "f9q9",
      text: "I can maintain business execution while running a disciplined fundraising process.",
      options: [...LIKERT_5],
      dimension: "operating-balance",
    },
    {
      id: "f9q10",
      text: "I know the type of investor, stage and strategic value that fit the venture.",
      options: [...LIKERT_5],
      dimension: "investor-fit",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "clarity", label: "Clarity", questionIds: ["f9q1"] },
    { id: "expectation", label: "Expectation", questionIds: ["f9q2"] },
    { id: "evidence", label: "Evidence", questionIds: ["f9q3"] },
    { id: "resilience", label: "Resilience", questionIds: ["f9q4"] },
    { id: "capital-logic", label: "Capital logic", questionIds: ["f9q5"] },
    { id: "transparency", label: "Transparency", questionIds: ["f9q6"] },
    { id: "communication", label: "Communication", questionIds: ["f9q7"] },
    { id: "optionality", label: "Optionality", questionIds: ["f9q8"] },
    { id: "operating-balance", label: "Operating balance", questionIds: ["f9q9"] },
    { id: "investor-fit", label: "Investor fit", questionIds: ["f9q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Pitch Not Yet Grounded",
      color: "blue",
      interpretation:
        "Your responses suggest that fundraising readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Fundraising Foundations Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of fundraising readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Investor-Ready Story Builder",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of fundraising readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Disciplined Fundraising Leader",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of fundraising readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
