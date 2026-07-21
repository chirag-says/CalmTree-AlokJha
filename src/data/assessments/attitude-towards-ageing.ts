/**
 * L2. Attitude Towards Ageing
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Assesses beliefs, flexibility, self-respect and openness to growth in later life.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const attitudeTowardsAgeing: AssessmentConfig = {
  slug: "attitude-towards-ageing",
  order: 92,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Attitude Towards Ageing",
    subtitle: "A quick read on your constructive attitude towards ageing.",
    description:
      "Assesses beliefs, flexibility, self-respect and openness to growth in later life. Ten honest questions, instant results, completely private.",
    purpose: "Assesses beliefs, flexibility, self-respect and openness to growth in later life.",
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
      id: "l2q1",
      text: "Ageing can include growth, learning and contribution as well as loss.",
      options: [...LIKERT_5],
      dimension: "growth-view",
    },
    {
      id: "l2q2",
      text: "I treat many changes as inevitable decline without examining alternatives.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decline-expectation",
    },
    {
      id: "l2q3",
      text: "I can adapt goals to current realities without feeling that ambition has ended.",
      options: [...LIKERT_5],
      dimension: "adaptation",
    },
    {
      id: "l2q4",
      text: "I compare my present self harshly with an earlier version of me.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-comparison",
    },
    {
      id: "l2q5",
      text: "I remain curious about people, ideas or skills that are new to me.",
      options: [...LIKERT_5],
      dimension: "curiosity",
    },
    {
      id: "l2q6",
      text: "I can ask for appropriate support without treating it as personal failure.",
      options: [...LIKERT_5],
      dimension: "support-acceptance",
    },
    {
      id: "l2q7",
      text: "I avoid activities because I assume they are no longer meant for my age.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "age-restriction",
    },
    {
      id: "l2q8",
      text: "I recognise experience as an asset while remaining open to change.",
      options: [...LIKERT_5],
      dimension: "experience-balance",
    },
    {
      id: "l2q9",
      text: "I care for health without allowing fear to dominate daily life.",
      options: [...LIKERT_5],
      dimension: "health-perspective",
    },
    {
      id: "l2q10",
      text: "I can respect the person I am becoming, not only the person I was.",
      options: [...LIKERT_5],
      dimension: "self-acceptance",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "growth-view", label: "Growth view", questionIds: ["l2q1"] },
    { id: "decline-expectation", label: "Decline expectation", questionIds: ["l2q2"] },
    { id: "adaptation", label: "Adaptation", questionIds: ["l2q3"] },
    { id: "self-comparison", label: "Self-comparison", questionIds: ["l2q4"] },
    { id: "curiosity", label: "Curiosity", questionIds: ["l2q5"] },
    { id: "support-acceptance", label: "Support acceptance", questionIds: ["l2q6"] },
    { id: "age-restriction", label: "Age restriction", questionIds: ["l2q7"] },
    { id: "experience-balance", label: "Experience balance", questionIds: ["l2q8"] },
    { id: "health-perspective", label: "Health perspective", questionIds: ["l2q9"] },
    { id: "self-acceptance", label: "Self-acceptance", questionIds: ["l2q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Ageing Viewed as Decline",
      color: "blue",
      interpretation:
        "Your responses suggest that constructive attitude towards ageing is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Acceptance Developing",
      color: "yellow",
      interpretation:
        "You show some foundations of constructive attitude towards ageing, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Balanced Ageing Outlook",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of constructive attitude towards ageing, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Growth-Oriented Ageing",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of constructive attitude towards ageing. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
