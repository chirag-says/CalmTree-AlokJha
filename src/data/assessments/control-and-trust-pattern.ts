/**
 * F6. Control and Trust Pattern
 * Pack 6 — Founders and Entrepreneurship
 * Maps the extent to which a founder retains control, uses structured oversight or transfers meaningful trust to others.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const controlAndTrustPattern: AssessmentConfig = {
  slug: "control-and-trust-pattern",
  order: 56,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Control and Trust Pattern",
    subtitle: "A quick read on your control and trust pattern.",
    description:
      "Maps the extent to which a founder retains control, uses structured oversight or transfers meaningful trust to others. Ten honest questions, instant results, completely private.",
    purpose:
      "Maps the extent to which a founder retains control, uses structured oversight or transfers meaningful trust to others.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f6q1",
      text: "I am comfortable when a capable person reaches an outcome using a different method.",
      options: [...LIKERT_5],
      dimension: "method-flexibility",
    },
    {
      id: "f6q2",
      text: "I need to be copied on most important communication to feel in control.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "visibility-need",
    },
    {
      id: "f6q3",
      text: "I define which decisions a person can make without approval.",
      options: [...LIKERT_5],
      dimension: "decision-rights",
    },
    {
      id: "f6q4",
      text: "I often correct work before the person has had a chance to solve the issue.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "intervention",
    },
    {
      id: "f6q5",
      text: "I use evidence and agreed checkpoints rather than constant monitoring.",
      options: [...LIKERT_5],
      dimension: "oversight",
    },
    {
      id: "f6q6",
      text: "A mistake by one person makes me reluctant to delegate similar work again.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "trust-recovery",
    },
    {
      id: "f6q7",
      text: "I can tolerate not knowing every operational detail.",
      options: [...LIKERT_5],
      dimension: "uncertainty-tolerance",
    },
    {
      id: "f6q8",
      text: "I separate reasonable governance from personal anxiety about losing control.",
      options: [...LIKERT_5],
      dimension: "self-awareness",
    },
    {
      id: "f6q9",
      text: "I allow people to own the consequences of decisions within agreed limits.",
      options: [...LIKERT_5],
      dimension: "ownership",
    },
    {
      id: "f6q10",
      text: "I review trust based on patterns, not isolated discomfort.",
      options: [...LIKERT_5],
      dimension: "trust-judgement",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "method-flexibility", label: "Method flexibility", questionIds: ["f6q1"] },
    { id: "visibility-need", label: "Visibility need", questionIds: ["f6q2"] },
    { id: "decision-rights", label: "Decision rights", questionIds: ["f6q3"] },
    { id: "intervention", label: "Intervention", questionIds: ["f6q4"] },
    { id: "oversight", label: "Oversight", questionIds: ["f6q5"] },
    { id: "trust-recovery", label: "Trust recovery", questionIds: ["f6q6"] },
    { id: "uncertainty-tolerance", label: "Uncertainty tolerance", questionIds: ["f6q7"] },
    { id: "self-awareness", label: "Self-awareness", questionIds: ["f6q8"] },
    { id: "ownership", label: "Ownership", questionIds: ["f6q9"] },
    { id: "trust-judgement", label: "Trust judgement", questionIds: ["f6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Control Retainer",
      color: "blue",
      interpretation:
        "You are likely to retain visibility and decision-making closely, especially when quality or consequences feel important.",
      nextStep:
        "Identify one reversible area where clearer decision rights could replace direct control.",
    },
    {
      min: 20,
      max: 29,
      label: "Structured Checker",
      color: "emerald",
      interpretation:
        "You are willing to delegate but prefer frequent checkpoints, proof and clear oversight.",
      nextStep: "Reduce monitoring where capability and risk already justify wider ownership.",
    },
    {
      min: 30,
      max: 39,
      label: "Balanced Delegator",
      color: "amber",
      interpretation:
        "You generally combine clear boundaries with meaningful trust and adjust oversight to risk and capability.",
      nextStep: "Keep decision rights visible as the venture grows and roles change.",
    },
    {
      min: 40,
      max: 50,
      label: "High-Trust Delegator",
      color: "purple",
      interpretation:
        "You are comfortable transferring ownership and allowing others considerable freedom within broad expectations.",
      nextStep:
        "Ensure high trust is supported by accountability, data and early visibility of material risk.",
    },
  ],
};
