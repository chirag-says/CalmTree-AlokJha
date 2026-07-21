/**
 * P9. Sibling Relationship Pattern
 * Pack 9 — Family, Parenting and Social Roles
 * Assesses reciprocity, comparison, history, boundaries and adult connection between siblings.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const siblingRelationshipPattern: AssessmentConfig = {
  slug: "sibling-relationship-pattern",
  order: 89,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Sibling Relationship Pattern",
    subtitle: "A quick read on your healthy adult sibling relationship.",
    description:
      "Assesses reciprocity, comparison, history, boundaries and adult connection between siblings. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses reciprocity, comparison, history, boundaries and adult connection between siblings.",
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
      id: "p9q1",
      text: "We can relate as adults rather than remaining fixed in childhood roles.",
      options: [...LIKERT_5],
      dimension: "role-flexibility",
    },
    {
      id: "p9q2",
      text: "Old comparisons continue shaping how we evaluate each other.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "comparison",
    },
    {
      id: "p9q3",
      text: "Support is reasonably reciprocal over time.",
      options: [...LIKERT_5],
      dimension: "reciprocity",
    },
    {
      id: "p9q4",
      text: "Family members use one sibling to communicate with or pressure another.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "triangulation",
    },
    {
      id: "p9q5",
      text: "We can have different lifestyles or values without constant correction.",
      options: [...LIKERT_5],
      dimension: "difference-tolerance",
    },
    {
      id: "p9q6",
      text: "I can set a boundary without feeling that I have betrayed the family.",
      options: [...LIKERT_5],
      dimension: "boundaries",
    },
    {
      id: "p9q7",
      text: "Conflict is avoided because old reactions feel inevitable.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "conflict-avoidance",
    },
    {
      id: "p9q8",
      text: "We recognise different experiences of the same family history.",
      options: [...LIKERT_5],
      dimension: "perspective",
    },
    {
      id: "p9q9",
      text: "Care responsibilities and financial expectations are discussed directly.",
      options: [...LIKERT_5],
      dimension: "responsibility",
    },
    {
      id: "p9q10",
      text: "There is room to build a present relationship, not only repeat the past.",
      options: [...LIKERT_5],
      dimension: "renewal",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "role-flexibility", label: "Role flexibility", questionIds: ["p9q1"] },
    { id: "comparison", label: "Comparison", questionIds: ["p9q2"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["p9q3"] },
    { id: "triangulation", label: "Triangulation", questionIds: ["p9q4"] },
    { id: "difference-tolerance", label: "Difference tolerance", questionIds: ["p9q5"] },
    { id: "boundaries", label: "Boundaries", questionIds: ["p9q6"] },
    { id: "conflict-avoidance", label: "Conflict avoidance", questionIds: ["p9q7"] },
    { id: "perspective", label: "Perspective", questionIds: ["p9q8"] },
    { id: "responsibility", label: "Responsibility", questionIds: ["p9q9"] },
    { id: "renewal", label: "Renewal", questionIds: ["p9q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Sibling Roles Stuck",
      color: "blue",
      interpretation:
        "Your responses suggest that healthy adult sibling relationship is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Relationship Re-Negotiating",
      color: "yellow",
      interpretation:
        "You show some foundations of healthy adult sibling relationship, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Adult Sibling Balance",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of healthy adult sibling relationship, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Flexible and Supportive Sibling Bond",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of healthy adult sibling relationship. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
