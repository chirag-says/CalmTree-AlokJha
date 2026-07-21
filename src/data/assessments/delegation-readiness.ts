/**
 * F5. Delegation Readiness
 * Pack 6 — Founders and Entrepreneurship
 * Assesses a founder’s ability to transfer ownership, define outcomes and avoid becoming the venture’s operating bottleneck.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const delegationReadiness: AssessmentConfig = {
  slug: "delegation-readiness",
  order: 55,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Delegation Readiness",
    subtitle: "A quick read on your delegation readiness.",
    description:
      "Assesses a founder’s ability to transfer ownership, define outcomes and avoid becoming the venture’s operating bottleneck. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses a founder’s ability to transfer ownership, define outcomes and avoid becoming the venture’s operating bottleneck.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "settings",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f5q1",
      text: "I define the outcome and decision boundaries before handing over work.",
      options: [...LIKERT_5],
      dimension: "clarity",
    },
    {
      id: "f5q2",
      text: "I take back tasks when another person’s first attempt differs from my method.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "control",
    },
    {
      id: "f5q3",
      text: "I distinguish work that requires my judgement from work that requires only visibility.",
      options: [...LIKERT_5],
      dimension: "prioritisation",
    },
    {
      id: "f5q4",
      text: "I provide context so people can make decisions without repeatedly asking me.",
      options: [...LIKERT_5],
      dimension: "context-sharing",
    },
    {
      id: "f5q5",
      text: "I delay delegation because explaining the task feels slower than doing it myself.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "short-term-bias",
    },
    {
      id: "f5q6",
      text: "I agree checkpoints instead of monitoring every step.",
      options: [...LIKERT_5],
      dimension: "trust-structure",
    },
    {
      id: "f5q7",
      text: "I allow capable people to improve the method I originally created.",
      options: [...LIKERT_5],
      dimension: "openness",
    },
    {
      id: "f5q8",
      text: "I hold others accountable for outcomes while remaining available for support.",
      options: [...LIKERT_5],
      dimension: "accountability",
    },
    {
      id: "f5q9",
      text: "I delegate only low-value tasks and retain all meaningful decisions.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "ownership-transfer",
    },
    {
      id: "f5q10",
      text: "I review whether my involvement is helping or slowing the team.",
      options: [...LIKERT_5],
      dimension: "self-awareness",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "clarity", label: "Clarity", questionIds: ["f5q1"] },
    { id: "control", label: "Control", questionIds: ["f5q2"] },
    { id: "prioritisation", label: "Prioritisation", questionIds: ["f5q3"] },
    { id: "context-sharing", label: "Context sharing", questionIds: ["f5q4"] },
    { id: "short-term-bias", label: "Short-term bias", questionIds: ["f5q5"] },
    { id: "trust-structure", label: "Trust structure", questionIds: ["f5q6"] },
    { id: "openness", label: "Openness", questionIds: ["f5q7"] },
    { id: "accountability", label: "Accountability", questionIds: ["f5q8"] },
    { id: "ownership-transfer", label: "Ownership transfer", questionIds: ["f5q9"] },
    { id: "self-awareness", label: "Self-awareness", questionIds: ["f5q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Founder Bottleneck",
      color: "blue",
      interpretation:
        "Your responses suggest that delegation readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Task Delegator",
      color: "yellow",
      interpretation:
        "You show some foundations of delegation readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Ownership Builder",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of delegation readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Scalable Delegation Leader",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of delegation readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
