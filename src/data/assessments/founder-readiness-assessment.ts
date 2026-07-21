/**
 * F1. Founder Readiness Assessment
 * Pack 6 — Founders and Entrepreneurship
 * Helps prospective founders reflect on motivation, uncertainty, customer focus, discipline and personal readiness for entrepreneurship.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const founderReadinessAssessment: AssessmentConfig = {
  slug: "founder-readiness-assessment",
  order: 51,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Founder Readiness Assessment",
    subtitle: "A quick read on your practical founder readiness.",
    description:
      "Helps prospective founders reflect on motivation, uncertainty, customer focus, discipline and personal readiness for entrepreneurship. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps prospective founders reflect on motivation, uncertainty, customer focus, discipline and personal readiness for entrepreneurship.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "briefcase",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f1q1",
      text: "I can explain the problem I want to solve without relying on the product idea alone.",
      options: [...LIKERT_5],
      dimension: "problem-clarity",
    },
    {
      id: "f1q2",
      text: "I am attracted mainly by the status or freedom associated with being a founder.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "motivation",
    },
    {
      id: "f1q3",
      text: "I can continue learning when early assumptions prove wrong.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "f1q4",
      text: "I have considered the financial and personal runway available to me.",
      options: [...LIKERT_5],
      dimension: "runway",
    },
    {
      id: "f1q5",
      text: "I avoid speaking with potential customers until the solution feels polished.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "customer-discovery",
    },
    {
      id: "f1q6",
      text: "I can make progress without a manager creating structure for me.",
      options: [...LIKERT_5],
      dimension: "self-management",
    },
    {
      id: "f1q7",
      text: "I understand which responsibilities I can and cannot carry alone.",
      options: [...LIKERT_5],
      dimension: "role-awareness",
    },
    {
      id: "f1q8",
      text: "I treat uncertainty as a reason to postpone all meaningful action.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "uncertainty-tolerance",
    },
    {
      id: "f1q9",
      text: "I can define a small test that would challenge my current assumptions.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "f1q10",
      text: "I have discussed the practical impact of this venture with people affected by the decision.",
      options: [...LIKERT_5],
      dimension: "stakeholder-readiness",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "problem-clarity", label: "Problem clarity", questionIds: ["f1q1"] },
    { id: "motivation", label: "Motivation", questionIds: ["f1q2"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["f1q3"] },
    { id: "runway", label: "Runway", questionIds: ["f1q4"] },
    { id: "customer-discovery", label: "Customer discovery", questionIds: ["f1q5"] },
    { id: "self-management", label: "Self-management", questionIds: ["f1q6"] },
    { id: "role-awareness", label: "Role awareness", questionIds: ["f1q7"] },
    { id: "uncertainty-tolerance", label: "Uncertainty tolerance", questionIds: ["f1q8"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["f1q9"] },
    { id: "stakeholder-readiness", label: "Stakeholder readiness", questionIds: ["f1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Idea Enthusiast",
      color: "blue",
      interpretation:
        "Your responses suggest that practical founder readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Founder Foundations Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of practical founder readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Prepared Experimenter",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of practical founder readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Execution-Ready Founder",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of practical founder readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
