/**
 * C6. Promotion Readiness
 * Pack 8 — Career Direction and Professional Growth
 * Assesses evidence of broader contribution, leadership behaviour, business understanding and readiness for increased responsibility.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const promotionReadiness: AssessmentConfig = {
  slug: "promotion-readiness",
  order: 76,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Promotion Readiness",
    subtitle: "A quick read on your promotion readiness.",
    description:
      "Assesses evidence of broader contribution, leadership behaviour, business understanding and readiness for increased responsibility. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses evidence of broader contribution, leadership behaviour, business understanding and readiness for increased responsibility.",
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
      id: "c6q1",
      text: "I consistently deliver the core expectations of my current role.",
      options: [...LIKERT_5],
      dimension: "current-performance",
    },
    {
      id: "c6q2",
      text: "I rely mainly on length of service as evidence that I should be promoted.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "promotion-logic",
    },
    {
      id: "c6q3",
      text: "I understand the outcomes expected at the next level.",
      options: [...LIKERT_5],
      dimension: "role-understanding",
    },
    {
      id: "c6q4",
      text: "I solve problems beyond my immediate task when they affect shared results.",
      options: [...LIKERT_5],
      dimension: "broader-contribution",
    },
    {
      id: "c6q5",
      text: "I can influence people without depending only on formal authority.",
      options: [...LIKERT_5],
      dimension: "influence",
    },
    {
      id: "c6q6",
      text: "I have examples of developing, supporting or enabling other people.",
      options: [...LIKERT_5],
      dimension: "leadership-behaviour",
    },
    {
      id: "c6q7",
      text: "I avoid asking for feedback because it may weaken my promotion case.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "feedback-openness",
    },
    {
      id: "c6q8",
      text: "I understand the commercial or organisational context of my work.",
      options: [...LIKERT_5],
      dimension: "business-awareness",
    },
    {
      id: "c6q9",
      text: "I can explain my impact using evidence rather than activity alone.",
      options: [...LIKERT_5],
      dimension: "impact-evidence",
    },
    {
      id: "c6q10",
      text: "I have discussed development gaps and a realistic path with my manager or mentor.",
      options: [...LIKERT_5],
      dimension: "career-dialogue",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "current-performance", label: "Current performance", questionIds: ["c6q1"] },
    { id: "promotion-logic", label: "Promotion logic", questionIds: ["c6q2"] },
    { id: "role-understanding", label: "Role understanding", questionIds: ["c6q3"] },
    { id: "broader-contribution", label: "Broader contribution", questionIds: ["c6q4"] },
    { id: "influence", label: "Influence", questionIds: ["c6q5"] },
    { id: "leadership-behaviour", label: "Leadership behaviour", questionIds: ["c6q6"] },
    { id: "feedback-openness", label: "Feedback openness", questionIds: ["c6q7"] },
    { id: "business-awareness", label: "Business awareness", questionIds: ["c6q8"] },
    { id: "impact-evidence", label: "Impact evidence", questionIds: ["c6q9"] },
    { id: "career-dialogue", label: "Career dialogue", questionIds: ["c6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Promotion Case Unclear",
      color: "blue",
      interpretation:
        "Your responses suggest that promotion readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Potential Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of promotion readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Promotion Case Developing",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of promotion readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Next-Level Readiness Strong",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of promotion readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
