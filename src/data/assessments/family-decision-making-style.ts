/**
 * P10. Family Decision-Making Style
 * Pack 9 — Family, Parenting and Social Roles
 * Explores participation, transparency, authority and follow-through in important family decisions.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const familyDecisionMakingStyle: AssessmentConfig = {
  slug: "family-decision-making-style",
  order: 90,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Family Decision-Making Style",
    subtitle: "A quick read on your collaborative family decision-making.",
    description:
      "Explores participation, transparency, authority and follow-through in important family decisions. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores participation, transparency, authority and follow-through in important family decisions.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p10q1",
      text: "People affected by an important decision have an appropriate chance to contribute.",
      options: [...LIKERT_5],
      dimension: "participation",
    },
    {
      id: "p10q2",
      text: "Decisions are announced after they have effectively already been made.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "transparency",
    },
    {
      id: "p10q3",
      text: "Roles and final decision authority are clear when consensus is not possible.",
      options: [...LIKERT_5],
      dimension: "governance",
    },
    {
      id: "p10q4",
      text: "Children or dependent members are included in age-appropriate ways.",
      options: [...LIKERT_5],
      dimension: "developmental-inclusion",
    },
    {
      id: "p10q5",
      text: "Money decisions are discussed with the people who carry the consequences.",
      options: [...LIKERT_5],
      dimension: "financial-transparency",
    },
    {
      id: "p10q6",
      text: "Disagreement is treated as disloyalty or disrespect.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "psychological-safety",
    },
    {
      id: "p10q7",
      text: "We distinguish urgent decisions from issues that allow more discussion.",
      options: [...LIKERT_5],
      dimension: "decision-speed",
    },
    {
      id: "p10q8",
      text: "One person carries the mental work while others comment only at the end.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-labour",
    },
    {
      id: "p10q9",
      text: "The reasons for major decisions are communicated clearly.",
      options: [...LIKERT_5],
      dimension: "rationale",
    },
    {
      id: "p10q10",
      text: "We review whether a decision is working and make adjustments when needed.",
      options: [...LIKERT_5],
      dimension: "review",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "participation", label: "Participation", questionIds: ["p10q1"] },
    { id: "transparency", label: "Transparency", questionIds: ["p10q2"] },
    { id: "governance", label: "Governance", questionIds: ["p10q3"] },
    { id: "developmental-inclusion", label: "Developmental inclusion", questionIds: ["p10q4"] },
    { id: "financial-transparency", label: "Financial transparency", questionIds: ["p10q5"] },
    { id: "psychological-safety", label: "Psychological safety", questionIds: ["p10q6"] },
    { id: "decision-speed", label: "Decision speed", questionIds: ["p10q7"] },
    { id: "decision-labour", label: "Decision labour", questionIds: ["p10q8"] },
    { id: "rationale", label: "Rationale", questionIds: ["p10q9"] },
    { id: "review", label: "Review", questionIds: ["p10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Authority-Dominated",
      color: "blue",
      interpretation:
        "Your responses suggest that collaborative family decision-making is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Consultation Limited",
      color: "yellow",
      interpretation:
        "You show some foundations of collaborative family decision-making, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Collaborative Process Emerging",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of collaborative family decision-making, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Transparent Family Governance",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of collaborative family decision-making. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
