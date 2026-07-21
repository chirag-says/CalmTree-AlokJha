/**
 * P8. Couple-to-Parent Role Balance
 * Pack 9 — Family, Parenting and Social Roles
 * Explores how well partners protect communication, teamwork and connection after becoming parents.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const coupleToParentRoleBalance: AssessmentConfig = {
  slug: "couple-to-parent-role-balance",
  order: 88,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Couple-to-Parent Role Balance",
    subtitle: "A quick read on your couple-to-parent role balance.",
    description:
      "Explores how well partners protect communication, teamwork and connection after becoming parents. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores how well partners protect communication, teamwork and connection after becoming parents.",
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
      id: "p8q1",
      text: "We discuss parenting responsibilities rather than assuming one person will notice and manage them.",
      options: [...LIKERT_5],
      dimension: "workload-clarity",
    },
    {
      id: "p8q2",
      text: "Most communication is now limited to logistics and problems.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "couple-connection",
    },
    {
      id: "p8q3",
      text: "Each person has some opportunity for rest or personal time.",
      options: [...LIKERT_5],
      dimension: "reciprocity",
    },
    {
      id: "p8q4",
      text: "We can disagree about parenting without attacking each other’s care or character.",
      options: [...LIKERT_5],
      dimension: "respect",
    },
    {
      id: "p8q5",
      text: "Invisible planning and emotional work are recognised and discussed.",
      options: [...LIKERT_5],
      dimension: "mental-load",
    },
    {
      id: "p8q6",
      text: "We avoid asking for help because the other person should already know.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "communication",
    },
    {
      id: "p8q7",
      text: "We make some time for connection that is not centred on children.",
      options: [...LIKERT_5],
      dimension: "couple-identity",
    },
    {
      id: "p8q8",
      text: "One person regularly becomes the default parent regardless of circumstances.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "role-imbalance",
    },
    {
      id: "p8q9",
      text: "We review responsibilities when work, health or family needs change.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "p8q10",
      text: "We can repair after stress creates distance or conflict.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "workload-clarity", label: "Workload clarity", questionIds: ["p8q1"] },
    { id: "couple-connection", label: "Couple connection", questionIds: ["p8q2"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["p8q3"] },
    { id: "respect", label: "Respect", questionIds: ["p8q4"] },
    { id: "mental-load", label: "Mental load", questionIds: ["p8q5"] },
    { id: "communication", label: "Communication", questionIds: ["p8q6"] },
    { id: "couple-identity", label: "Couple identity", questionIds: ["p8q7"] },
    { id: "role-imbalance", label: "Role imbalance", questionIds: ["p8q8"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["p8q9"] },
    { id: "repair", label: "Repair", questionIds: ["p8q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Couple Role Overloaded",
      color: "blue",
      interpretation:
        "Your responses suggest that couple-to-parent role balance is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Balance Conversations Needed",
      color: "yellow",
      interpretation:
        "You show some foundations of couple-to-parent role balance, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Parenting Partnership Developing",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of couple-to-parent role balance, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong Couple-Parent Team",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of couple-to-parent role balance. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
