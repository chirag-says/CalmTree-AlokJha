/**
 * P3. Family Boundary Balance
 * Pack 9 — Family, Parenting and Social Roles
 * Assesses privacy, responsibility, involvement and autonomy within family relationships.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const familyBoundaryBalance: AssessmentConfig = {
  slug: "family-boundary-balance",
  order: 83,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Family Boundary Balance",
    subtitle: "A quick read on your healthy family boundaries.",
    description:
      "Assesses privacy, responsibility, involvement and autonomy within family relationships. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses privacy, responsibility, involvement and autonomy within family relationships.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p3q1",
      text: "Family members can have private thoughts, conversations and interests.",
      options: [...LIKERT_5],
      dimension: "privacy",
    },
    {
      id: "p3q2",
      text: "I feel responsible for preventing every family member from feeling upset.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "over-responsibility",
    },
    {
      id: "p3q3",
      text: "Help is offered without taking over decisions that belong to another adult.",
      options: [...LIKERT_5],
      dimension: "autonomy",
    },
    {
      id: "p3q4",
      text: "Personal information is shared with relatives without asking the person concerned.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "confidentiality",
    },
    {
      id: "p3q5",
      text: "I can decline a family request respectfully when the cost is too high.",
      options: [...LIKERT_5],
      dimension: "assertiveness",
    },
    {
      id: "p3q6",
      text: "Different generations can hold different preferences without immediate pressure to conform.",
      options: [...LIKERT_5],
      dimension: "difference-tolerance",
    },
    {
      id: "p3q7",
      text: "Guilt is commonly used to secure agreement or participation.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-pressure",
    },
    {
      id: "p3q8",
      text: "Responsibilities are discussed rather than assumed according to gender or birth order.",
      options: [...LIKERT_5],
      dimension: "role-clarity",
    },
    {
      id: "p3q9",
      text: "Care and closeness remain possible even when someone sets a limit.",
      options: [...LIKERT_5],
      dimension: "boundaried-connection",
    },
    {
      id: "p3q10",
      text: "Family members can make age-appropriate decisions and learn from consequences.",
      options: [...LIKERT_5],
      dimension: "developmental-autonomy",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "privacy", label: "Privacy", questionIds: ["p3q1"] },
    { id: "over-responsibility", label: "Over-responsibility", questionIds: ["p3q2"] },
    { id: "autonomy", label: "Autonomy", questionIds: ["p3q3"] },
    { id: "confidentiality", label: "Confidentiality", questionIds: ["p3q4"] },
    { id: "assertiveness", label: "Assertiveness", questionIds: ["p3q5"] },
    { id: "difference-tolerance", label: "Difference tolerance", questionIds: ["p3q6"] },
    { id: "emotional-pressure", label: "Emotional pressure", questionIds: ["p3q7"] },
    { id: "role-clarity", label: "Role clarity", questionIds: ["p3q8"] },
    { id: "boundaried-connection", label: "Boundaried connection", questionIds: ["p3q9"] },
    { id: "developmental-autonomy", label: "Developmental autonomy", questionIds: ["p3q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Boundaries Blurred",
      color: "blue",
      interpretation:
        "Your responses suggest that healthy family boundaries is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Boundaries Being Discussed",
      color: "yellow",
      interpretation:
        "You show some foundations of healthy family boundaries, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Generally Balanced Boundaries",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of healthy family boundaries, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Clear and Respectful Family Boundaries",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of healthy family boundaries. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
