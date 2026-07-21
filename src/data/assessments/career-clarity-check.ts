/**
 * C1. Career Clarity Check
 * Pack 8 — Career Direction and Professional Growth
 * Assesses how clearly a person understands preferred direction, values, strengths and next steps in work.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const careerClarityCheck: AssessmentConfig = {
  slug: "career-clarity-check",
  order: 71,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Career Clarity Check",
    subtitle: "A quick read on your career clarity.",
    description:
      "Assesses how clearly a person understands preferred direction, values, strengths and next steps in work. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses how clearly a person understands preferred direction, values, strengths and next steps in work.",
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
      id: "c1q1",
      text: "I can name the kinds of problems I want my work to involve.",
      options: [...LIKERT_5],
      dimension: "direction",
    },
    {
      id: "c1q2",
      text: "I am choosing mainly between job titles rather than understanding the work itself.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "role-understanding",
    },
    {
      id: "c1q3",
      text: "I know which values I do not want to compromise in my career.",
      options: [...LIKERT_5],
      dimension: "values",
    },
    {
      id: "c1q4",
      text: "I can identify skills I want to use more often.",
      options: [...LIKERT_5],
      dimension: "strengths",
    },
    {
      id: "c1q5",
      text: "I wait for complete certainty before exploring a possible direction.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "exploration",
    },
    {
      id: "c1q6",
      text: "I have a realistic next step for testing my preferred option.",
      options: [...LIKERT_5],
      dimension: "action",
    },
    {
      id: "c1q7",
      text: "My career decisions are driven mainly by comparison with other people.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "external-pressure",
    },
    {
      id: "c1q8",
      text: "I understand the practical constraints that affect my choices.",
      options: [...LIKERT_5],
      dimension: "reality-testing",
    },
    {
      id: "c1q9",
      text: "I can describe what a satisfying workday would contain.",
      options: [...LIKERT_5],
      dimension: "work-design",
    },
    {
      id: "c1q10",
      text: "I review career direction as new experience provides evidence.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "direction", label: "Direction", questionIds: ["c1q1"] },
    { id: "role-understanding", label: "Role understanding", questionIds: ["c1q2"] },
    { id: "values", label: "Values", questionIds: ["c1q3"] },
    { id: "strengths", label: "Strengths", questionIds: ["c1q4"] },
    { id: "exploration", label: "Exploration", questionIds: ["c1q5"] },
    { id: "action", label: "Action", questionIds: ["c1q6"] },
    { id: "external-pressure", label: "External pressure", questionIds: ["c1q7"] },
    { id: "reality-testing", label: "Reality testing", questionIds: ["c1q8"] },
    { id: "work-design", label: "Work design", questionIds: ["c1q9"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["c1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Direction Foggy",
      color: "blue",
      interpretation:
        "Your responses suggest that career clarity is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Career Questions Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of career clarity, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Direction Taking Shape",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of career clarity, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Clear Career Navigator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of career clarity. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
