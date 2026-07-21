/**
 * F4. Co-Founder Working Alignment
 * Pack 6 — Founders and Entrepreneurship
 * Examines the clarity, trust, role discipline and conflict habits that support a healthy co-founder working relationship.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const coFounderWorkingAlignment: AssessmentConfig = {
  slug: "co-founder-working-alignment",
  order: 54,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Co-Founder Working Alignment",
    subtitle: "A quick read on your co-founder working alignment.",
    description:
      "Examines the clarity, trust, role discipline and conflict habits that support a healthy co-founder working relationship. Ten honest questions, instant results, completely private.",
    purpose:
      "Examines the clarity, trust, role discipline and conflict habits that support a healthy co-founder working relationship.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Founders & Entrepreneurship",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "f4q1",
      text: "We have discussed what success means beyond valuation or revenue.",
      options: [...LIKERT_5],
      dimension: "shared-expectations",
    },
    {
      id: "f4q2",
      text: "Important role boundaries remain unclear because we prefer to stay flexible.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "role-clarity",
    },
    {
      id: "f4q3",
      text: "I can raise a concern with my co-founder before it becomes resentment.",
      options: [...LIKERT_5],
      dimension: "conflict-openness",
    },
    {
      id: "f4q4",
      text: "I sometimes withhold important information to avoid a difficult reaction.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "transparency",
    },
    {
      id: "f4q5",
      text: "Decision rights are clear when we disagree.",
      options: [...LIKERT_5],
      dimension: "governance",
    },
    {
      id: "f4q6",
      text: "We have discussed money, ownership, effort and personal runway directly.",
      options: [...LIKERT_5],
      dimension: "shared-expectations",
    },
    {
      id: "f4q7",
      text: "I can support a decision I disagreed with once the agreed process is complete.",
      options: [...LIKERT_5],
      dimension: "commitment",
    },
    {
      id: "f4q8",
      text: "I interpret differences in working style as a lack of commitment.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "style-tolerance",
    },
    {
      id: "f4q9",
      text: "We review whether responsibilities remain fair as the company changes.",
      options: [...LIKERT_5],
      dimension: "role-review",
    },
    {
      id: "f4q10",
      text: "We have a process for addressing repeated conflict or deadlock.",
      options: [...LIKERT_5],
      dimension: "governance",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "shared-expectations", label: "Shared expectations", questionIds: ["f4q1", "f4q6"] },
    { id: "role-clarity", label: "Role clarity", questionIds: ["f4q2"] },
    { id: "conflict-openness", label: "Conflict openness", questionIds: ["f4q3"] },
    { id: "transparency", label: "Transparency", questionIds: ["f4q4"] },
    { id: "governance", label: "Governance", questionIds: ["f4q5", "f4q10"] },
    { id: "commitment", label: "Commitment", questionIds: ["f4q7"] },
    { id: "style-tolerance", label: "Style tolerance", questionIds: ["f4q8"] },
    { id: "role-review", label: "Role review", questionIds: ["f4q9"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Alignment Fragile",
      color: "blue",
      interpretation:
        "Your responses suggest that co-founder working alignment is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Alignment Conversations Needed",
      color: "yellow",
      interpretation:
        "You show some foundations of co-founder working alignment, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Working Alignment Developing",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of co-founder working alignment, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong Founder Partnership Habits",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of co-founder working alignment. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
