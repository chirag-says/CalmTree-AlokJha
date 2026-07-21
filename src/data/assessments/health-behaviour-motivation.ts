/**
 * L9. Health Behaviour Motivation
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Explores motivation, consistency, self-efficacy and practical planning around health-supporting behaviour.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const healthBehaviourMotivation: AssessmentConfig = {
  slug: "health-behaviour-motivation",
  order: 99,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Health Behaviour Motivation",
    subtitle: "A quick read on your health-behaviour motivation.",
    description:
      "Explores motivation, consistency, self-efficacy and practical planning around health-supporting behaviour. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores motivation, consistency, self-efficacy and practical planning around health-supporting behaviour.",
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
      id: "l9q1",
      text: "I can name one health behaviour that would make a meaningful difference now.",
      options: [...LIKERT_5],
      dimension: "priority-clarity",
    },
    {
      id: "l9q2",
      text: "I wait for strong motivation before taking action.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "motivation-dependence",
    },
    {
      id: "l9q3",
      text: "I choose changes small enough to repeat consistently.",
      options: [...LIKERT_5],
      dimension: "habit-design",
    },
    {
      id: "l9q4",
      text: "I understand how my environment makes the desired behaviour easier or harder.",
      options: [...LIKERT_5],
      dimension: "environment",
    },
    {
      id: "l9q5",
      text: "One missed day makes me feel the entire effort has failed.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "all-or-nothing-thinking",
    },
    {
      id: "l9q6",
      text: "I track progress in a simple way when it is useful.",
      options: [...LIKERT_5],
      dimension: "feedback",
    },
    {
      id: "l9q7",
      text: "I seek appropriate professional advice for health decisions beyond my expertise.",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "l9q8",
      text: "I connect the behaviour with a personal reason that matters to me.",
      options: [...LIKERT_5],
      dimension: "meaning",
    },
    {
      id: "l9q9",
      text: "I revise the plan when circumstances change instead of abandoning it.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "l9q10",
      text: "I recognise improvement even when progress is gradual.",
      options: [...LIKERT_5],
      dimension: "self-efficacy",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "priority-clarity", label: "Priority clarity", questionIds: ["l9q1"] },
    { id: "motivation-dependence", label: "Motivation dependence", questionIds: ["l9q2"] },
    { id: "habit-design", label: "Habit design", questionIds: ["l9q3"] },
    { id: "environment", label: "Environment", questionIds: ["l9q4"] },
    { id: "all-or-nothing-thinking", label: "All-or-nothing thinking", questionIds: ["l9q5"] },
    { id: "feedback", label: "Feedback", questionIds: ["l9q6"] },
    { id: "support", label: "Support", questionIds: ["l9q7"] },
    { id: "meaning", label: "Meaning", questionIds: ["l9q8"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["l9q9"] },
    { id: "self-efficacy", label: "Self-efficacy", questionIds: ["l9q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Motivation Unstable",
      color: "blue",
      interpretation:
        "Your responses suggest that health-behaviour motivation is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Readiness Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of health-behaviour motivation, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Consistent Health Builder",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of health-behaviour motivation, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Self-Directed Health Habits",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of health-behaviour motivation. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
