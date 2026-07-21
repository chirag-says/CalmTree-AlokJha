/**
 * L8. Change and Loss Adjustment
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Helps users reflect on emotional processing, support, identity and adaptation after significant change or loss.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const changeAndLossAdjustment: AssessmentConfig = {
  slug: "change-and-loss-adjustment",
  order: 98,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Change and Loss Adjustment",
    subtitle: "A quick read on your adjustment to change and loss.",
    description:
      "Helps users reflect on emotional processing, support, identity and adaptation after significant change or loss. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps users reflect on emotional processing, support, identity and adaptation after significant change or loss.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "refresh-cw",
    productCategory: "Life Transitions & Healthy Ageing",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "l8q1",
      text: "I allow difficult feelings to be present without demanding that they disappear immediately.",
      options: [...LIKERT_5],
      dimension: "emotional-allowance",
    },
    {
      id: "l8q2",
      text: "I avoid all reminders because any emotion feels unmanageable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "avoidance",
    },
    {
      id: "l8q3",
      text: "I can maintain basic routines even when motivation is reduced.",
      options: [...LIKERT_5],
      dimension: "stability",
    },
    {
      id: "l8q4",
      text: "I have at least one person or source of support I can use honestly.",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "l8q5",
      text: "I judge myself for not adjusting according to someone else’s timeline.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-compassion",
    },
    {
      id: "l8q6",
      text: "I can recognise both what has ended and what remains.",
      options: [...LIKERT_5],
      dimension: "continuity",
    },
    {
      id: "l8q7",
      text: "I make major irreversible decisions mainly to escape the present feeling.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-caution",
    },
    {
      id: "l8q8",
      text: "I can ask for professional help if functioning remains seriously affected.",
      options: [...LIKERT_5],
      dimension: "support-awareness",
    },
    {
      id: "l8q9",
      text: "I am gradually finding ways to engage with life without denying the loss.",
      options: [...LIKERT_5],
      dimension: "re-engagement",
    },
    {
      id: "l8q10",
      text: "I can carry memories or meaning without needing life to return to its earlier form.",
      options: [...LIKERT_5],
      dimension: "integration",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-allowance", label: "Emotional allowance", questionIds: ["l8q1"] },
    { id: "avoidance", label: "Avoidance", questionIds: ["l8q2"] },
    { id: "stability", label: "Stability", questionIds: ["l8q3"] },
    { id: "support", label: "Support", questionIds: ["l8q4"] },
    { id: "self-compassion", label: "Self-compassion", questionIds: ["l8q5"] },
    { id: "continuity", label: "Continuity", questionIds: ["l8q6"] },
    { id: "decision-caution", label: "Decision caution", questionIds: ["l8q7"] },
    { id: "support-awareness", label: "Support awareness", questionIds: ["l8q8"] },
    { id: "re-engagement", label: "Re-engagement", questionIds: ["l8q9"] },
    { id: "integration", label: "Integration", questionIds: ["l8q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Adjustment Overwhelmed",
      color: "blue",
      interpretation:
        "Your responses suggest that adjustment to change and loss is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Early Adaptation",
      color: "yellow",
      interpretation:
        "You show some foundations of adjustment to change and loss, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Adjustment Developing",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of adjustment to change and loss, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Meaningful Integration Emerging",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of adjustment to change and loss. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
