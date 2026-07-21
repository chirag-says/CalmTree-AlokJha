/**
 * G5. Career Uncertainty Tolerance
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Explores how well a young adult can move forward when career direction, opportunities and outcomes remain unclear.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const careerUncertaintyTolerance: AssessmentConfig = {
  slug: "career-uncertainty-tolerance",
  order: 65,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Career Uncertainty Tolerance",
    subtitle: "A quick read on your career uncertainty tolerance.",
    description:
      "Explores how well a young adult can move forward when career direction, opportunities and outcomes remain unclear. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores how well a young adult can move forward when career direction, opportunities and outcomes remain unclear.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g5q1",
      text: "I can take a useful next step without knowing my complete career path.",
      options: [...LIKERT_5],
      dimension: "action-under-uncertainty",
    },
    {
      id: "g5q2",
      text: "I feel I must choose one perfect career before investing in any skill.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "perfection-pressure",
    },
    {
      id: "g5q3",
      text: "I treat early work experiences as information rather than permanent identity decisions.",
      options: [...LIKERT_5],
      dimension: "exploration",
    },
    {
      id: "g5q4",
      text: "Changing direction feels like evidence that I previously failed.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "reframing",
    },
    {
      id: "g5q5",
      text: "I can compare options using values, strengths and practical constraints.",
      options: [...LIKERT_5],
      dimension: "decision-process",
    },
    {
      id: "g5q6",
      text: "I seek small experiments such as projects, internships or conversations.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "g5q7",
      text: "Other people’s certainty makes me distrust my own pace.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "comparison",
    },
    {
      id: "g5q8",
      text: "I can hold a plan while remaining open to new evidence.",
      options: [...LIKERT_5],
      dimension: "flexible-planning",
    },
    {
      id: "g5q9",
      text: "I understand that career clarity often develops through action.",
      options: [...LIKERT_5],
      dimension: "learning-orientation",
    },
    {
      id: "g5q10",
      text: "I can discuss uncertainty without feeling ashamed or inadequate.",
      options: [...LIKERT_5],
      dimension: "emotional-tolerance",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "action-under-uncertainty", label: "Action under uncertainty", questionIds: ["g5q1"] },
    { id: "perfection-pressure", label: "Perfection pressure", questionIds: ["g5q2"] },
    { id: "exploration", label: "Exploration", questionIds: ["g5q3"] },
    { id: "reframing", label: "Reframing", questionIds: ["g5q4"] },
    { id: "decision-process", label: "Decision process", questionIds: ["g5q5"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["g5q6"] },
    { id: "comparison", label: "Comparison", questionIds: ["g5q7"] },
    { id: "flexible-planning", label: "Flexible planning", questionIds: ["g5q8"] },
    { id: "learning-orientation", label: "Learning orientation", questionIds: ["g5q9"] },
    { id: "emotional-tolerance", label: "Emotional tolerance", questionIds: ["g5q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Career Uncertainty-Stalled",
      color: "blue",
      interpretation:
        "Your responses suggest that career uncertainty tolerance is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Direction Searching",
      color: "yellow",
      interpretation:
        "You show some foundations of career uncertainty tolerance, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Adaptive Explorer",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of career uncertainty tolerance, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Confident Career Navigator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of career uncertainty tolerance. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
