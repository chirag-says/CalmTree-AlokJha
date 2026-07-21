/**
 * L4. Life Transition Adaptability
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Assesses flexibility, emotional processing, planning and support during major life transitions.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const lifeTransitionAdaptability: AssessmentConfig = {
  slug: "life-transition-adaptability",
  order: 94,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Life Transition Adaptability",
    subtitle: "A quick read on your life-transition adaptability.",
    description:
      "Assesses flexibility, emotional processing, planning and support during major life transitions. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses flexibility, emotional processing, planning and support during major life transitions.",
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
      id: "l4q1",
      text: "I can acknowledge the emotional impact of change without treating it as weakness.",
      options: [...LIKERT_5],
      dimension: "emotional-processing",
    },
    {
      id: "l4q2",
      text: "I continue using an old routine even when the new situation clearly requires adjustment.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "behavioural-flexibility",
    },
    {
      id: "l4q3",
      text: "I identify what remains within my control during change.",
      options: [...LIKERT_5],
      dimension: "agency",
    },
    {
      id: "l4q4",
      text: "I seek reliable information before making assumptions about the future.",
      options: [...LIKERT_5],
      dimension: "reality-testing",
    },
    {
      id: "l4q5",
      text: "I expect myself to feel fully adjusted very quickly.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "adjustment-expectations",
    },
    {
      id: "l4q6",
      text: "I can preserve useful parts of my identity while letting other parts change.",
      options: [...LIKERT_5],
      dimension: "identity-continuity",
    },
    {
      id: "l4q7",
      text: "I ask for practical or emotional support when needed.",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "l4q8",
      text: "I create small routines that provide stability during uncertainty.",
      options: [...LIKERT_5],
      dimension: "structure",
    },
    {
      id: "l4q9",
      text: "I can revise plans as new information becomes available.",
      options: [...LIKERT_5],
      dimension: "planning-flexibility",
    },
    {
      id: "l4q10",
      text: "I notice opportunities and losses rather than focusing exclusively on one side.",
      options: [...LIKERT_5],
      dimension: "balanced-meaning",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-processing", label: "Emotional processing", questionIds: ["l4q1"] },
    { id: "behavioural-flexibility", label: "Behavioural flexibility", questionIds: ["l4q2"] },
    { id: "agency", label: "Agency", questionIds: ["l4q3"] },
    { id: "reality-testing", label: "Reality testing", questionIds: ["l4q4"] },
    { id: "adjustment-expectations", label: "Adjustment expectations", questionIds: ["l4q5"] },
    { id: "identity-continuity", label: "Identity continuity", questionIds: ["l4q6"] },
    { id: "support", label: "Support", questionIds: ["l4q7"] },
    { id: "structure", label: "Structure", questionIds: ["l4q8"] },
    { id: "planning-flexibility", label: "Planning flexibility", questionIds: ["l4q9"] },
    { id: "balanced-meaning", label: "Balanced meaning", questionIds: ["l4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Change Resistant",
      color: "blue",
      interpretation:
        "Your responses suggest that life-transition adaptability is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Adjustment Underway",
      color: "yellow",
      interpretation:
        "You show some foundations of life-transition adaptability, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Adaptive Transition Manager",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of life-transition adaptability, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Flexible Life Navigator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of life-transition adaptability. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
