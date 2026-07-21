/**
 * C3. Strengths-in-Action Assessment
 * Pack 8 — Career Direction and Professional Growth
 * Explores whether a person can recognise, apply and communicate their strengths in real work situations.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const strengthsInActionAssessment: AssessmentConfig = {
  slug: "strengths-in-action-assessment",
  order: 73,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Strengths-in-Action Assessment",
    subtitle: "A quick read on your strengths use in action.",
    description:
      "Explores whether a person can recognise, apply and communicate their strengths in real work situations. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores whether a person can recognise, apply and communicate their strengths in real work situations.",
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
      id: "c3q1",
      text: "I can name specific situations in which I perform at my best.",
      options: [...LIKERT_5],
      dimension: "strength-awareness",
    },
    {
      id: "c3q2",
      text: "I describe strengths only through broad labels without behavioural examples.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "evidence",
    },
    {
      id: "c3q3",
      text: "I deliberately choose tasks or methods that use my strongest capabilities.",
      options: [...LIKERT_5],
      dimension: "application",
    },
    {
      id: "c3q4",
      text: "I can explain the value my strengths create for others.",
      options: [...LIKERT_5],
      dimension: "impact",
    },
    {
      id: "c3q5",
      text: "I overuse a strength even when the situation requires a different approach.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "adaptability",
    },
    {
      id: "c3q6",
      text: "I seek feedback about the contribution people rely on me to make.",
      options: [...LIKERT_5],
      dimension: "feedback",
    },
    {
      id: "c3q7",
      text: "I can identify skills that compensate for my weaker areas.",
      options: [...LIKERT_5],
      dimension: "self-management",
    },
    {
      id: "c3q8",
      text: "I assume that what feels easy to me cannot be a meaningful strength.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recognition",
    },
    {
      id: "c3q9",
      text: "I can translate strengths into language relevant to a role or opportunity.",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "c3q10",
      text: "I continue developing strengths rather than treating them as fixed traits.",
      options: [...LIKERT_5],
      dimension: "growth",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "strength-awareness", label: "Strength awareness", questionIds: ["c3q1"] },
    { id: "evidence", label: "Evidence", questionIds: ["c3q2"] },
    { id: "application", label: "Application", questionIds: ["c3q3"] },
    { id: "impact", label: "Impact", questionIds: ["c3q4"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["c3q5"] },
    { id: "feedback", label: "Feedback", questionIds: ["c3q6"] },
    { id: "self-management", label: "Self-management", questionIds: ["c3q7"] },
    { id: "recognition", label: "Recognition", questionIds: ["c3q8"] },
    { id: "communication", label: "Communication", questionIds: ["c3q9"] },
    { id: "growth", label: "Growth", questionIds: ["c3q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Strengths Hidden",
      color: "blue",
      interpretation:
        "Your responses suggest that strengths use in action is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Strengths Recognised",
      color: "yellow",
      interpretation:
        "You show some foundations of strengths use in action, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Strengths Applied",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of strengths use in action, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strengths Strategically Used",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of strengths use in action. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
