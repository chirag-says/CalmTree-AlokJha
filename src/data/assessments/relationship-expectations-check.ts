/**
 * R6. Relationship Expectations Check
 * Pack 5 — Relationships & Emotional Connection
 * Measures awareness, realism and flexibility of expectations held
 * about a close relationship.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const relationshipExpectationsCheck: AssessmentConfig = {
  slug: "relationship-expectations-check",
  order: 46,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Relationship Expectations Check",
    subtitle: "Are your relationship expectations realistic?",
    description:
      "Measure awareness, realism and flexibility of expectations in your closest relationship.",
    purpose:
      "Measures awareness, realism and flexibility of expectations held about a close relationship.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "eye",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "r6q1",
      text: "I am aware of what I expect from the other person in specific terms.",
      options: [...LIKERT_5],
      dimension: "awareness",
    },
    {
      id: "r6q2",
      text: "I communicate my expectations rather than assuming they are obvious.",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "r6q3",
      text: "I accept that the other person cannot meet every emotional need I have.",
      options: [...LIKERT_5],
      dimension: "realism",
    },
    {
      id: "r6q4",
      text: "I feel disappointed when the other person does not behave as I imagined.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "rigidity",
    },
    {
      id: "r6q5",
      text: "I adjust expectations when circumstances or capacity change.",
      options: [...LIKERT_5],
      dimension: "flexibility",
    },
    {
      id: "r6q6",
      text: "I recognise that some of my expectations come from past relationships rather than this one.",
      options: [...LIKERT_5],
      dimension: "origin-awareness",
    },
    {
      id: "r6q7",
      text: "I can negotiate expectations rather than treating them as fixed rules.",
      options: [...LIKERT_5],
      dimension: "negotiation",
    },
    {
      id: "r6q8",
      text: "I hold the other person to standards I also apply to myself.",
      options: [...LIKERT_5],
      dimension: "reciprocity",
    },
    {
      id: "r6q9",
      text: "I compare my relationship to idealised versions rather than accepting imperfection.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "idealisation",
    },
    {
      id: "r6q10",
      text: "I regularly check whether my expectations are still fair and relevant.",
      options: [...LIKERT_5],
      dimension: "review",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "awareness", label: "Awareness", questionIds: ["r6q1"] },
    { id: "communication", label: "Communication", questionIds: ["r6q2"] },
    { id: "realism", label: "Realism", questionIds: ["r6q3"] },
    { id: "rigidity", label: "Rigidity", questionIds: ["r6q4"] },
    { id: "flexibility", label: "Flexibility", questionIds: ["r6q5"] },
    { id: "origin-awareness", label: "Origin Awareness", questionIds: ["r6q6"] },
    { id: "negotiation", label: "Negotiation", questionIds: ["r6q7"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["r6q8"] },
    { id: "idealisation", label: "Idealisation", questionIds: ["r6q9"] },
    { id: "review", label: "Review", questionIds: ["r6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Unexamined Expectations",
      color: "blue",
      interpretation:
        "Your responses suggest that relationship expectations awareness is currently limited or inconsistent.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Developing Realism",
      color: "yellow",
      interpretation:
        "You show some foundations of realistic expectations, although they may become less reliable under pressure.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Flexible Realist",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of realistic expectations, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Grounded Partner",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of realistic expectations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
