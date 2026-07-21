/**
 * C8. Meaning at Work Reflection
 * Pack 8 — Career Direction and Professional Growth
 * Explores purpose, contribution, values and whether a person can locate meaning within or beyond a current role.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const meaningAtWorkReflection: AssessmentConfig = {
  slug: "meaning-at-work-reflection",
  order: 78,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Meaning at Work Reflection",
    subtitle: "A quick read on your meaning at work.",
    description:
      "Explores purpose, contribution, values and whether a person can locate meaning within or beyond a current role. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores purpose, contribution, values and whether a person can locate meaning within or beyond a current role.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "eye",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c8q1",
      text: "I understand who benefits from the work I do.",
      options: [...LIKERT_5],
      dimension: "contribution",
    },
    {
      id: "c8q2",
      text: "Most tasks feel disconnected from anything I value.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "values-connection",
    },
    {
      id: "c8q3",
      text: "I can identify moments when my work feels useful or worthwhile.",
      options: [...LIKERT_5],
      dimension: "meaning-awareness",
    },
    {
      id: "c8q4",
      text: "I expect one job to satisfy every important source of purpose in my life.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "expectation-balance",
    },
    {
      id: "c8q5",
      text: "I have some freedom to improve how I contribute.",
      options: [...LIKERT_5],
      dimension: "agency",
    },
    {
      id: "c8q6",
      text: "I recognise relationships, mastery or service as possible sources of work meaning.",
      options: [...LIKERT_5],
      dimension: "meaning-sources",
    },
    {
      id: "c8q7",
      text: "I feel that my effort rarely produces visible value.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "impact",
    },
    {
      id: "c8q8",
      text: "I can connect routine tasks to a larger outcome.",
      options: [...LIKERT_5],
      dimension: "task-connection",
    },
    {
      id: "c8q9",
      text: "I know which missing element would most improve meaning in my work.",
      options: [...LIKERT_5],
      dimension: "clarity",
    },
    {
      id: "c8q10",
      text: "I build purpose outside work when the role cannot provide it fully.",
      options: [...LIKERT_5],
      dimension: "life-balance",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "contribution", label: "Contribution", questionIds: ["c8q1"] },
    { id: "values-connection", label: "Values connection", questionIds: ["c8q2"] },
    { id: "meaning-awareness", label: "Meaning awareness", questionIds: ["c8q3"] },
    { id: "expectation-balance", label: "Expectation balance", questionIds: ["c8q4"] },
    { id: "agency", label: "Agency", questionIds: ["c8q5"] },
    { id: "meaning-sources", label: "Meaning sources", questionIds: ["c8q6"] },
    { id: "impact", label: "Impact", questionIds: ["c8q7"] },
    { id: "task-connection", label: "Task connection", questionIds: ["c8q8"] },
    { id: "clarity", label: "Clarity", questionIds: ["c8q9"] },
    { id: "life-balance", label: "Life balance", questionIds: ["c8q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Meaning Disconnected",
      color: "blue",
      interpretation:
        "Your responses suggest that meaning at work is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Meaning Searching",
      color: "yellow",
      interpretation:
        "You show some foundations of meaning at work, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Meaning Present",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of meaning at work, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Purposeful Contribution",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of meaning at work. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
