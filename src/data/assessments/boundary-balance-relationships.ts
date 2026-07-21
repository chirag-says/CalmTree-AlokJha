/**
 * R8. Boundary Balance in Relationships
 * Pack 5 — Relationships & Emotional Connection
 * Measures clarity, communication and maintenance of personal boundaries
 * while remaining emotionally connected.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const boundaryBalanceRelationships: AssessmentConfig = {
  slug: "boundary-balance-relationships",
  order: 48,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Boundary Balance in Relationships",
    subtitle: "How healthy are your relationship boundaries?",
    description:
      "Measure clarity, communication and maintenance of personal boundaries while staying connected.",
    purpose:
      "Measures clarity, communication and maintenance of personal boundaries while remaining emotionally connected.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "r8q1",
      text: "I know where my responsibility ends and another person's begins.",
      options: [...LIKERT_5],
      dimension: "clarity",
    },
    {
      id: "r8q2",
      text: "I say no without excessive guilt.",
      options: [...LIKERT_5],
      dimension: "refusal",
    },
    {
      id: "r8q3",
      text: "I can maintain a boundary even when the other person is upset.",
      options: [...LIKERT_5],
      dimension: "firmness",
    },
    {
      id: "r8q4",
      text: "I take on problems that are not mine because saying no feels selfish.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "over-responsibility",
    },
    {
      id: "r8q5",
      text: "I explain a boundary with care rather than using it as punishment.",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "r8q6",
      text: "I respect the boundaries another person sets even when I disagree.",
      options: [...LIKERT_5],
      dimension: "respect",
    },
    {
      id: "r8q7",
      text: "I allow others to influence my behaviour beyond what feels comfortable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "permeability",
    },
    {
      id: "r8q8",
      text: "I can set limits on time, energy or emotional availability without withdrawing entirely.",
      options: [...LIKERT_5],
      dimension: "graduated-boundary",
    },
    {
      id: "r8q9",
      text: "I distinguish between healthy flexibility and losing my boundaries.",
      options: [...LIKERT_5],
      dimension: "discernment",
    },
    {
      id: "r8q10",
      text: "My boundaries help the relationship rather than creating permanent distance.",
      options: [...LIKERT_5],
      dimension: "constructive-use",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "clarity", label: "Clarity", questionIds: ["r8q1"] },
    { id: "refusal", label: "Refusal", questionIds: ["r8q2"] },
    { id: "firmness", label: "Firmness", questionIds: ["r8q3"] },
    { id: "over-responsibility", label: "Over-responsibility", questionIds: ["r8q4"] },
    { id: "communication", label: "Communication", questionIds: ["r8q5"] },
    { id: "respect", label: "Respect", questionIds: ["r8q6"] },
    { id: "permeability", label: "Permeability", questionIds: ["r8q7"] },
    { id: "graduated-boundary", label: "Graduated Boundary", questionIds: ["r8q8"] },
    { id: "discernment", label: "Discernment", questionIds: ["r8q9"] },
    { id: "constructive-use", label: "Constructive Use", questionIds: ["r8q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Porous Boundaries",
      color: "blue",
      interpretation:
        "Your responses suggest that boundary management is currently limited or inconsistent.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Developing Boundaries",
      color: "yellow",
      interpretation:
        "You show some foundations of boundary management, although they may become less reliable under pressure.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Clear Boundaries",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of boundary management, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Healthy Boundaries",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of boundary management.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
