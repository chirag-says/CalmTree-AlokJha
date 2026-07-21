/**
 * G10. Independent Living Readiness
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Explores practical responsibility, self-management, help-seeking and emotional readiness for greater independence.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const independentLivingReadiness: AssessmentConfig = {
  slug: "independent-living-readiness",
  order: 70,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Independent Living Readiness",
    subtitle: "A quick read on your independent-living readiness.",
    description:
      "Explores practical responsibility, self-management, help-seeking and emotional readiness for greater independence. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores practical responsibility, self-management, help-seeking and emotional readiness for greater independence.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "monitor",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g10q1",
      text: "I can plan routine expenses and distinguish needs from optional spending.",
      options: [...LIKERT_5],
      dimension: "money-management",
    },
    {
      id: "g10q2",
      text: "I rely on reminders from others for important everyday responsibilities.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-management",
    },
    {
      id: "g10q3",
      text: "I can prepare basic meals or arrange healthy food reliably.",
      options: [...LIKERT_5],
      dimension: "daily-living",
    },
    {
      id: "g10q4",
      text: "I know how to seek help when a practical problem is beyond my skill.",
      options: [...LIKERT_5],
      dimension: "help-seeking",
    },
    {
      id: "g10q5",
      text: "I avoid administrative tasks until someone else takes over.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "responsibility",
    },
    {
      id: "g10q6",
      text: "I can organise sleep, study or work without constant external supervision.",
      options: [...LIKERT_5],
      dimension: "routine",
    },
    {
      id: "g10q7",
      text: "I understand basic safety, health and emergency arrangements.",
      options: [...LIKERT_5],
      dimension: "safety",
    },
    {
      id: "g10q8",
      text: "Being alone for ordinary periods feels unmanageable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-independence",
    },
    {
      id: "g10q9",
      text: "I can communicate respectfully with landlords, service providers or shared-house members.",
      options: [...LIKERT_5],
      dimension: "adult-communication",
    },
    {
      id: "g10q10",
      text: "I can recover from a mistake without abandoning responsibility.",
      options: [...LIKERT_5],
      dimension: "resilience",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "money-management", label: "Money management", questionIds: ["g10q1"] },
    { id: "self-management", label: "Self-management", questionIds: ["g10q2"] },
    { id: "daily-living", label: "Daily living", questionIds: ["g10q3"] },
    { id: "help-seeking", label: "Help seeking", questionIds: ["g10q4"] },
    { id: "responsibility", label: "Responsibility", questionIds: ["g10q5"] },
    { id: "routine", label: "Routine", questionIds: ["g10q6"] },
    { id: "safety", label: "Safety", questionIds: ["g10q7"] },
    { id: "emotional-independence", label: "Emotional independence", questionIds: ["g10q8"] },
    { id: "adult-communication", label: "Adult communication", questionIds: ["g10q9"] },
    { id: "resilience", label: "Resilience", questionIds: ["g10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Dependence Still High",
      color: "blue",
      interpretation:
        "Your responses suggest that independent-living readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Readiness Developing",
      color: "yellow",
      interpretation:
        "You show some foundations of independent-living readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Independent Foundations",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of independent-living readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Self-Directed Living Readiness",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of independent-living readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
