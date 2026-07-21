/**
 * C5. Career Change Readiness
 * Pack 8 — Career Direction and Professional Growth
 * Explores motivation, evidence, financial preparation and emotional readiness for a meaningful career transition.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const careerChangeReadiness: AssessmentConfig = {
  slug: "career-change-readiness",
  order: 75,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Career Change Readiness",
    subtitle: "A quick read on your career-change readiness.",
    description:
      "Explores motivation, evidence, financial preparation and emotional readiness for a meaningful career transition. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores motivation, evidence, financial preparation and emotional readiness for a meaningful career transition.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "refresh-cw",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c5q1",
      text: "I can explain what I am moving towards, not only what I want to leave.",
      options: [...LIKERT_5],
      dimension: "positive-direction",
    },
    {
      id: "c5q2",
      text: "My decision is based mainly on one recent difficult period.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-stability",
    },
    {
      id: "c5q3",
      text: "I have researched the daily reality of the target field or role.",
      options: [...LIKERT_5],
      dimension: "reality-testing",
    },
    {
      id: "c5q4",
      text: "I know which skills transfer and which gaps require development.",
      options: [...LIKERT_5],
      dimension: "skill-mapping",
    },
    {
      id: "c5q5",
      text: "I have considered the financial transition period.",
      options: [...LIKERT_5],
      dimension: "runway",
    },
    {
      id: "c5q6",
      text: "I expect the new career to remove all stress or uncertainty.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "expectation",
    },
    {
      id: "c5q7",
      text: "I have tested the direction through conversations, projects or short experiences.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "c5q8",
      text: "I can tolerate a temporary reduction in status or confidence while learning.",
      options: [...LIKERT_5],
      dimension: "identity-flexibility",
    },
    {
      id: "c5q9",
      text: "People affected by the transition understand the likely impact.",
      options: [...LIKERT_5],
      dimension: "stakeholder-readiness",
    },
    {
      id: "c5q10",
      text: "I have a realistic first 90-day action plan.",
      options: [...LIKERT_5],
      dimension: "execution",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "positive-direction", label: "Positive direction", questionIds: ["c5q1"] },
    { id: "decision-stability", label: "Decision stability", questionIds: ["c5q2"] },
    { id: "reality-testing", label: "Reality testing", questionIds: ["c5q3"] },
    { id: "skill-mapping", label: "Skill mapping", questionIds: ["c5q4"] },
    { id: "runway", label: "Runway", questionIds: ["c5q5"] },
    { id: "expectation", label: "Expectation", questionIds: ["c5q6"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["c5q7"] },
    { id: "identity-flexibility", label: "Identity flexibility", questionIds: ["c5q8"] },
    { id: "stakeholder-readiness", label: "Stakeholder readiness", questionIds: ["c5q9"] },
    { id: "execution", label: "Execution", questionIds: ["c5q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Escape Without Plan",
      color: "blue",
      interpretation:
        "Your responses suggest that career-change readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Transition Exploring",
      color: "yellow",
      interpretation:
        "You show some foundations of career-change readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Change Foundations Ready",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of career-change readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Career Transition Ready",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of career-change readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
