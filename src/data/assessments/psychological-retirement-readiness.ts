/**
 * L1. Psychological Retirement Readiness
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Explores identity, routine, relationships, purpose and emotional preparation for retirement.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const psychologicalRetirementReadiness: AssessmentConfig = {
  slug: "psychological-retirement-readiness",
  order: 91,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Psychological Retirement Readiness",
    subtitle: "A quick read on your psychological retirement readiness.",
    description:
      "Explores identity, routine, relationships, purpose and emotional preparation for retirement. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores identity, routine, relationships, purpose and emotional preparation for retirement.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Life Transitions & Healthy Ageing",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "l1q1",
      text: "I can describe a meaningful life structure beyond paid work.",
      options: [...LIKERT_5],
      dimension: "future-structure",
    },
    {
      id: "l1q2",
      text: "My sense of value depends mainly on my professional role or title.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "identity",
    },
    {
      id: "l1q3",
      text: "I have interests or responsibilities I want to develop after retirement.",
      options: [...LIKERT_5],
      dimension: "purpose",
    },
    {
      id: "l1q4",
      text: "I have discussed expectations about time and roles with people close to me.",
      options: [...LIKERT_5],
      dimension: "relationship-planning",
    },
    {
      id: "l1q5",
      text: "Unstructured time feels more frightening than inviting.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "time-adaptation",
    },
    {
      id: "l1q6",
      text: "I have realistic expectations about the emotional adjustment retirement may require.",
      options: [...LIKERT_5],
      dimension: "expectation",
    },
    {
      id: "l1q7",
      text: "I maintain relationships that are not dependent on work.",
      options: [...LIKERT_5],
      dimension: "social-foundation",
    },
    {
      id: "l1q8",
      text: "I can imagine contributing without formal authority or status.",
      options: [...LIKERT_5],
      dimension: "contribution-identity",
    },
    {
      id: "l1q9",
      text: "I am willing to experiment with routines before making retirement final.",
      options: [...LIKERT_5],
      dimension: "transition-testing",
    },
    {
      id: "l1q10",
      text: "I see retirement as a transition requiring design, not simply an ending.",
      options: [...LIKERT_5],
      dimension: "transition-mindset",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "future-structure", label: "Future structure", questionIds: ["l1q1"] },
    { id: "identity", label: "Identity", questionIds: ["l1q2"] },
    { id: "purpose", label: "Purpose", questionIds: ["l1q3"] },
    { id: "relationship-planning", label: "Relationship planning", questionIds: ["l1q4"] },
    { id: "time-adaptation", label: "Time adaptation", questionIds: ["l1q5"] },
    { id: "expectation", label: "Expectation", questionIds: ["l1q6"] },
    { id: "social-foundation", label: "Social foundation", questionIds: ["l1q7"] },
    { id: "contribution-identity", label: "Contribution identity", questionIds: ["l1q8"] },
    { id: "transition-testing", label: "Transition testing", questionIds: ["l1q9"] },
    { id: "transition-mindset", label: "Transition mindset", questionIds: ["l1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Work Identity Dominant",
      color: "blue",
      interpretation:
        "Your responses suggest that psychological retirement readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Retirement Reflection Beginning",
      color: "yellow",
      interpretation:
        "You show some foundations of psychological retirement readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Transition Foundations Present",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of psychological retirement readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Psychologically Retirement Ready",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of psychological retirement readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
