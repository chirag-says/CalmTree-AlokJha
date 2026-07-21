/**
 * P5. Family Conflict Response
 * Pack 9 — Family, Parenting and Social Roles
 * Explores how a family handles disagreement, hierarchy, emotion and repair.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const familyConflictResponse: AssessmentConfig = {
  slug: "family-conflict-response",
  order: 85,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Family Conflict Response",
    subtitle: "A quick read on your constructive family-conflict response.",
    description:
      "Explores how a family handles disagreement, hierarchy, emotion and repair. Ten honest questions, instant results, completely private.",
    purpose: "Explores how a family handles disagreement, hierarchy, emotion and repair.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p5q1",
      text: "People can discuss one issue without bringing in every past grievance.",
      options: [...LIKERT_5],
      dimension: "focus",
    },
    {
      id: "p5q2",
      text: "The loudest or most senior person usually decides the outcome.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "power-pattern",
    },
    {
      id: "p5q3",
      text: "Family members can ask for a pause without being accused of disrespect.",
      options: [...LIKERT_5],
      dimension: "regulation",
    },
    {
      id: "p5q4",
      text: "Silence, withdrawal or involving other relatives is used instead of direct conversation.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "indirect-conflict",
    },
    {
      id: "p5q5",
      text: "Different viewpoints are heard before a decision is made.",
      options: [...LIKERT_5],
      dimension: "inclusion",
    },
    {
      id: "p5q6",
      text: "Personal insults or comparisons appear during disagreement.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "respect",
    },
    {
      id: "p5q7",
      text: "Expectations and responsibilities are clarified after conflict.",
      options: [...LIKERT_5],
      dimension: "problem-solving",
    },
    {
      id: "p5q8",
      text: "Children or dependent members are pulled into adult conflict.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary-protection",
    },
    {
      id: "p5q9",
      text: "People can acknowledge harm without losing all status or authority.",
      options: [...LIKERT_5],
      dimension: "accountability",
    },
    {
      id: "p5q10",
      text: "There is some process for repairing connection after difficult events.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "focus", label: "Focus", questionIds: ["p5q1"] },
    { id: "power-pattern", label: "Power pattern", questionIds: ["p5q2"] },
    { id: "regulation", label: "Regulation", questionIds: ["p5q3"] },
    { id: "indirect-conflict", label: "Indirect conflict", questionIds: ["p5q4"] },
    { id: "inclusion", label: "Inclusion", questionIds: ["p5q5"] },
    { id: "respect", label: "Respect", questionIds: ["p5q6"] },
    { id: "problem-solving", label: "Problem-solving", questionIds: ["p5q7"] },
    { id: "boundary-protection", label: "Boundary protection", questionIds: ["p5q8"] },
    { id: "accountability", label: "Accountability", questionIds: ["p5q9"] },
    { id: "repair", label: "Repair", questionIds: ["p5q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Conflict Avoided or Controlled",
      color: "blue",
      interpretation:
        "Your responses suggest that constructive family-conflict response is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Reactive Family Conflict",
      color: "yellow",
      interpretation:
        "You show some foundations of constructive family-conflict response, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Problem-Solving Emerging",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of constructive family-conflict response, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Constructive Family Dialogue",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of constructive family-conflict response. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
