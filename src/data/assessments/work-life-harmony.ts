/**
 * A6. Work-Life Harmony Check
 * Pack 2 — Emotional Wellbeing and Digital Balance
 * Assesses boundaries, mental detachment, recovery, role flexibility and
 * whether work and personal life can coexist sustainably.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workLifeHarmony: AssessmentConfig = {
  slug: "work-life-harmony",
  order: 6,
  type: "standard",
  tier: "professional",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Work-Life Harmony Check",
    subtitle: "Is your work-life balance sustainable?",
    description:
      "Assess your boundaries, mental detachment, recovery and role flexibility. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses boundaries, mental detachment, recovery, role flexibility and whether work and personal life can coexist sustainably.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a6q1",
      text: "I can give personal relationships attention even during demanding work periods.",
      options: [...LIKERT_5],
      dimension: "presence",
    },
    {
      id: "a6q2",
      text: "I have a reasonably clear boundary between work time and personal time.",
      options: [...LIKERT_5],
      dimension: "boundaries",
    },
    {
      id: "a6q3",
      text: "I continue thinking about work during most of my personal time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "detachment",
    },
    {
      id: "a6q4",
      text: "I can adjust plans when either work or personal life temporarily needs more attention.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
    {
      id: "a6q5",
      text: "Rest makes me feel guilty when work remains unfinished.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-permission",
    },
    {
      id: "a6q6",
      text: "My schedule includes activities that are unrelated to achievement or productivity.",
      options: [...LIKERT_5],
      dimension: "identity-balance",
    },
    {
      id: "a6q7",
      text: "I frequently cancel personal commitments because of avoidable work demands.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary-erosion",
    },
    {
      id: "a6q8",
      text: "People close to me usually receive my attention when I am with them.",
      options: [...LIKERT_5],
      dimension: "presence",
    },
    {
      id: "a6q9",
      text: "I can stop checking work communication after a reasonable hour.",
      options: [...LIKERT_5],
      dimension: "digital-boundary",
    },
    {
      id: "a6q10",
      text: "My current combination of responsibilities feels sustainable.",
      options: [...LIKERT_5],
      dimension: "sustainability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "presence", label: "Presence", questionIds: ["a6q1", "a6q8"] },
    { id: "boundaries", label: "Boundaries", questionIds: ["a6q2"] },
    { id: "detachment", label: "Detachment", questionIds: ["a6q3"] },
    { id: "flexibility", label: "Flexibility", questionIds: ["a6q4"] },
    { id: "recovery-permission", label: "Recovery Permission", questionIds: ["a6q5"] },
    { id: "identity-balance", label: "Identity Balance", questionIds: ["a6q6"] },
    { id: "boundary-erosion", label: "Boundary Erosion", questionIds: ["a6q7"] },
    { id: "digital-boundary", label: "Digital Boundary", questionIds: ["a6q9"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["a6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Work Dominated",
      color: "red",
      interpretation:
        "Your responses suggest that work-life harmony is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Constant Juggler",
      color: "orange",
      interpretation:
        "You show some foundations of work-life harmony, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Busy Balancer",
      color: "yellow",
      interpretation:
        "Your responses suggest a generally steady level of work-life harmony, with a few areas that could become more consistent.",
      nextStep:
        "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Harmony Builder",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of work-life harmony. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
