/**
 * F3. Decision-Making Under Uncertainty
 * Pack 6 — Founders and Entrepreneurship
 * Assesses how effectively a founder frames, tests and commits to decisions when information is incomplete.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const decisionMakingUnderUncertainty: AssessmentConfig = {
  slug: "decision-making-under-uncertainty",
  order: 53,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Decision-Making Under Uncertainty",
    subtitle: "A quick read on your decision-making under uncertainty.",
    description:
      "Assesses how effectively a founder frames, tests and commits to decisions when information is incomplete. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses how effectively a founder frames, tests and commits to decisions when information is incomplete.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f3q1",
      text: "I separate what is known, assumed and still unknown before deciding.",
      options: [...LIKERT_5],
      dimension: "framing",
    },
    {
      id: "f3q2",
      text: "I keep collecting information after the decision is already reversible and time-sensitive.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-speed",
    },
    {
      id: "f3q3",
      text: "I define what evidence would cause me to change course.",
      options: [...LIKERT_5],
      dimension: "decision-rules",
    },
    {
      id: "f3q4",
      text: "I treat a strong intuition as sufficient evidence for high-impact decisions.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "bias-control",
    },
    {
      id: "f3q5",
      text: "I involve people who can challenge my preferred answer.",
      options: [...LIKERT_5],
      dimension: "challenge",
    },
    {
      id: "f3q6",
      text: "I distinguish between decisions that can be reversed and those that cannot.",
      options: [...LIKERT_5],
      dimension: "reversibility",
    },
    {
      id: "f3q7",
      text: "I delay communicating a decision because I want everyone to agree first.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "commitment",
    },
    {
      id: "f3q8",
      text: "I record the assumptions behind important decisions.",
      options: [...LIKERT_5],
      dimension: "learning",
    },
    {
      id: "f3q9",
      text: "I revisit decisions when new evidence becomes material rather than when anxiety rises.",
      options: [...LIKERT_5],
      dimension: "review-discipline",
    },
    {
      id: "f3q10",
      text: "I can commit to a direction while acknowledging uncertainty openly.",
      options: [...LIKERT_5],
      dimension: "leadership-communication",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "framing", label: "Framing", questionIds: ["f3q1"] },
    { id: "decision-speed", label: "Decision speed", questionIds: ["f3q2"] },
    { id: "decision-rules", label: "Decision rules", questionIds: ["f3q3"] },
    { id: "bias-control", label: "Bias control", questionIds: ["f3q4"] },
    { id: "challenge", label: "Challenge", questionIds: ["f3q5"] },
    { id: "reversibility", label: "Reversibility", questionIds: ["f3q6"] },
    { id: "commitment", label: "Commitment", questionIds: ["f3q7"] },
    { id: "learning", label: "Learning", questionIds: ["f3q8"] },
    { id: "review-discipline", label: "Review discipline", questionIds: ["f3q9"] },
    { id: "leadership-communication", label: "Leadership communication", questionIds: ["f3q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Uncertainty-Stalled",
      color: "blue",
      interpretation:
        "Your responses suggest that decision-making under uncertainty is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Intuitive Decider",
      color: "yellow",
      interpretation:
        "You show some foundations of decision-making under uncertainty, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Structured Judgement",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of decision-making under uncertainty, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Disciplined Uncertainty Leader",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of decision-making under uncertainty. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
