/**
 * W10. Workplace Adaptability Style
 * Measures comfort with changing priorities, unfamiliar methods, learning demands and uncertainty at work.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workplaceAdaptabilityStyle: AssessmentConfig = {
  slug: "workplace-adaptability-style",
  order: 25,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Adaptability Style",
    subtitle: "How well do you adapt to change at work?",
    description:
      "Measure your comfort with changing priorities, unfamiliar methods and uncertainty at work.",
    purpose:
      "Measures comfort with changing priorities, unfamiliar methods, learning demands and uncertainty at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "refresh-cw",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w10q1",
      text: "I can shift priorities without remaining frustrated by the earlier plan.",
      options: [...LIKERT_5],
      dimension: "priority-shift",
    },
    {
      id: "w10q2",
      text: "I need considerable time before I feel effective in a new process.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "learning-transition",
    },
    {
      id: "w10q3",
      text: "I look for useful information when circumstances change.",
      options: [...LIKERT_5],
      dimension: "learning-orientation",
    },
    {
      id: "w10q4",
      text: "Unexpected change quickly reduces my confidence.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-adjustment",
    },
    {
      id: "w10q5",
      text: "I can experiment with a new method before mastering it.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "w10q6",
      text: "I continue using familiar methods even when they are no longer effective.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "rigidity",
    },
    {
      id: "w10q7",
      text: "I can work productively while some details remain uncertain.",
      options: [...LIKERT_5],
      dimension: "uncertainty-tolerance",
    },
    {
      id: "w10q8",
      text: "I learn from colleagues whose approach differs from mine.",
      options: [...LIKERT_5],
      dimension: "openness",
    },
    {
      id: "w10q9",
      text: "Repeated change without explanation makes me disengage.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "change-meaning",
    },
    {
      id: "w10q10",
      text: "After an adjustment period, I can build new routines.",
      options: [...LIKERT_5],
      dimension: "integration",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "priority-shift", label: "Priority Shift", questionIds: ["w10q1"] },
    { id: "learning-transition", label: "Learning Transition", questionIds: ["w10q2"] },
    { id: "learning-orientation", label: "Learning Orientation", questionIds: ["w10q3"] },
    { id: "emotional-adjustment", label: "Emotional Adjustment", questionIds: ["w10q4"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["w10q5"] },
    { id: "rigidity", label: "Rigidity", questionIds: ["w10q6"] },
    { id: "uncertainty-tolerance", label: "Uncertainty Tolerance", questionIds: ["w10q7"] },
    { id: "openness", label: "Openness", questionIds: ["w10q8"] },
    { id: "change-meaning", label: "Change Meaning", questionIds: ["w10q9"] },
    { id: "integration", label: "Integration", questionIds: ["w10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Stability Seeker",
      color: "blue",
      interpretation:
        "Your responses suggest that workplace adaptability is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Cautious Adapter",
      color: "yellow",
      interpretation:
        "You show some foundations of workplace adaptability, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Flexible Operator",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of workplace adaptability, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Adaptive Explorer",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of workplace adaptability. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
