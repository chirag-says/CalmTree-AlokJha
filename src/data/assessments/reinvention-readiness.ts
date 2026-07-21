/**
 * L10. Reinvention Readiness
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Assesses curiosity, identity flexibility, practical experimentation and confidence to begin a new chapter.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const reinventionReadiness: AssessmentConfig = {
  slug: "reinvention-readiness",
  order: 100,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Reinvention Readiness",
    subtitle: "A quick read on your reinvention readiness.",
    description:
      "Assesses curiosity, identity flexibility, practical experimentation and confidence to begin a new chapter. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses curiosity, identity flexibility, practical experimentation and confidence to begin a new chapter.",
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
      id: "l10q1",
      text: "I can imagine a future that is not simply an extension of my previous roles.",
      options: [...LIKERT_5],
      dimension: "future-imagination",
    },
    {
      id: "l10q2",
      text: "Beginning again feels unacceptable because I should already be established.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "beginner-tolerance",
    },
    {
      id: "l10q3",
      text: "I am willing to test a new direction through small, low-risk experiments.",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "l10q4",
      text: "I can use past experience without assuming old methods are always best.",
      options: [...LIKERT_5],
      dimension: "experience-flexibility",
    },
    {
      id: "l10q5",
      text: "Concern about other people’s judgement prevents meaningful exploration.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "social-pressure",
    },
    {
      id: "l10q6",
      text: "I have identified time, skills or relationships that could support a new chapter.",
      options: [...LIKERT_5],
      dimension: "resource-awareness",
    },
    {
      id: "l10q7",
      text: "I can learn from younger or differently experienced people without defensiveness.",
      options: [...LIKERT_5],
      dimension: "learning-openness",
    },
    {
      id: "l10q8",
      text: "I separate a temporary lack of competence from permanent inability.",
      options: [...LIKERT_5],
      dimension: "growth-belief",
    },
    {
      id: "l10q9",
      text: "I have one practical action I can take within the next month.",
      options: [...LIKERT_5],
      dimension: "action",
    },
    {
      id: "l10q10",
      text: "I view reinvention as evolution rather than rejection of my earlier life.",
      options: [...LIKERT_5],
      dimension: "identity-integration",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "future-imagination", label: "Future imagination", questionIds: ["l10q1"] },
    { id: "beginner-tolerance", label: "Beginner tolerance", questionIds: ["l10q2"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["l10q3"] },
    { id: "experience-flexibility", label: "Experience flexibility", questionIds: ["l10q4"] },
    { id: "social-pressure", label: "Social pressure", questionIds: ["l10q5"] },
    { id: "resource-awareness", label: "Resource awareness", questionIds: ["l10q6"] },
    { id: "learning-openness", label: "Learning openness", questionIds: ["l10q7"] },
    { id: "growth-belief", label: "Growth belief", questionIds: ["l10q8"] },
    { id: "action", label: "Action", questionIds: ["l10q9"] },
    { id: "identity-integration", label: "Identity integration", questionIds: ["l10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Past Identity Anchored",
      color: "blue",
      interpretation:
        "Your responses suggest that reinvention readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Reinvention Curiosity",
      color: "yellow",
      interpretation:
        "You show some foundations of reinvention readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "New Chapter Testing",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of reinvention readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Reinvention Ready",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of reinvention readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
