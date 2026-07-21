/**
 * P2. Parent-Teen Connection Check
 * Pack 9 — Family, Parenting and Social Roles
 * Helps parents reflect on trust, autonomy, listening and connection with an adolescent.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const parentTeenConnectionCheck: AssessmentConfig = {
  slug: "parent-teen-connection-check",
  order: 82,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Parent-Teen Connection Check",
    subtitle: "A quick read on your parent-teen connection.",
    description:
      "Helps parents reflect on trust, autonomy, listening and connection with an adolescent. Ten honest questions, instant results, completely private.",
    purpose:
      "Helps parents reflect on trust, autonomy, listening and connection with an adolescent.",
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
      id: "p2q1",
      text: "My teenager can disagree with me without the relationship feeling unsafe.",
      options: [...LIKERT_5],
      dimension: "psychological-safety",
    },
    {
      id: "p2q2",
      text: "Most of our conversations focus on performance, rules or correction.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "connection-range",
    },
    {
      id: "p2q3",
      text: "I show curiosity about interests that are not personally important to me.",
      options: [...LIKERT_5],
      dimension: "interest",
    },
    {
      id: "p2q4",
      text: "I adjust control as responsibility and maturity increase.",
      options: [...LIKERT_5],
      dimension: "autonomy",
    },
    {
      id: "p2q5",
      text: "I use private information shared in trust during later arguments.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "trust",
    },
    {
      id: "p2q6",
      text: "I can hear frustration without immediately treating it as disrespect.",
      options: [...LIKERT_5],
      dimension: "emotional-regulation",
    },
    {
      id: "p2q7",
      text: "We have some regular moments of connection that are not forced.",
      options: [...LIKERT_5],
      dimension: "shared-time",
    },
    {
      id: "p2q8",
      text: "I compare my teenager with siblings, relatives or peers to motivate them.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "comparison",
    },
    {
      id: "p2q9",
      text: "I discuss digital boundaries and safety rather than relying only on surveillance.",
      options: [...LIKERT_5],
      dimension: "digital-trust",
    },
    {
      id: "p2q10",
      text: "After conflict, I make an effort to restore communication.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "psychological-safety", label: "Psychological safety", questionIds: ["p2q1"] },
    { id: "connection-range", label: "Connection range", questionIds: ["p2q2"] },
    { id: "interest", label: "Interest", questionIds: ["p2q3"] },
    { id: "autonomy", label: "Autonomy", questionIds: ["p2q4"] },
    { id: "trust", label: "Trust", questionIds: ["p2q5"] },
    { id: "emotional-regulation", label: "Emotional regulation", questionIds: ["p2q6"] },
    { id: "shared-time", label: "Shared time", questionIds: ["p2q7"] },
    { id: "comparison", label: "Comparison", questionIds: ["p2q8"] },
    { id: "digital-trust", label: "Digital trust", questionIds: ["p2q9"] },
    { id: "repair", label: "Repair", questionIds: ["p2q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Connection Strained",
      color: "blue",
      interpretation:
        "Your responses suggest that parent-teen connection is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Connection Rebuilding",
      color: "yellow",
      interpretation:
        "You show some foundations of parent-teen connection, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Trust Foundation Present",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of parent-teen connection, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong and Flexible Connection",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of parent-teen connection. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
