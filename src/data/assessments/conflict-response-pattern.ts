/**
 * R4. Conflict Response Pattern
 * Pack 5 — Relationships & Emotional Connection
 * Measures typical responses to relationship conflict: avoidance, escalation,
 * emotional flooding, repair attempts and constructive resolution.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const conflictResponsePattern: AssessmentConfig = {
  slug: "conflict-response-pattern",
  order: 44,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Conflict Response Pattern",
    subtitle: "How do you handle conflict in relationships?",
    description:
      "Measure your typical responses to relationship conflict: avoidance, escalation, repair and resolution.",
    purpose:
      "Measures typical responses to relationship conflict: avoidance, escalation, emotional flooding, repair attempts and constructive resolution.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "r4q1",
      text: "I can stay in a disagreement without shutting down or walking away.",
      options: [...LIKERT_5],
      dimension: "engagement",
    },
    {
      id: "r4q2",
      text: "I express frustration without attacking the other person's character.",
      options: [...LIKERT_5],
      dimension: "expression",
    },
    {
      id: "r4q3",
      text: "I try to understand the other person's position even when I disagree.",
      options: [...LIKERT_5],
      dimension: "perspective-taking",
    },
    {
      id: "r4q4",
      text: "I bring up past grievances during current arguments.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "containment",
    },
    {
      id: "r4q5",
      text: "I can pause and calm myself before a disagreement escalates.",
      options: [...LIKERT_5],
      dimension: "self-regulation",
    },
    {
      id: "r4q6",
      text: "I avoid important conversations because I fear conflict.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "avoidance",
    },
    {
      id: "r4q7",
      text: "I take responsibility for my part in a disagreement.",
      options: [...LIKERT_5],
      dimension: "accountability",
    },
    {
      id: "r4q8",
      text: "Conflict often ends with a practical understanding or next step.",
      options: [...LIKERT_5],
      dimension: "resolution",
    },
    {
      id: "r4q9",
      text: "I can accept that some disagreements will not be fully resolved.",
      options: [...LIKERT_5],
      dimension: "acceptance",
    },
    {
      id: "r4q10",
      text: "I feel emotionally safe enough to be honest during disagreements.",
      options: [...LIKERT_5],
      dimension: "safety",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "engagement", label: "Engagement", questionIds: ["r4q1"] },
    { id: "expression", label: "Expression", questionIds: ["r4q2"] },
    { id: "perspective-taking", label: "Perspective-taking", questionIds: ["r4q3"] },
    { id: "containment", label: "Containment", questionIds: ["r4q4"] },
    { id: "self-regulation", label: "Self-regulation", questionIds: ["r4q5"] },
    { id: "avoidance", label: "Avoidance", questionIds: ["r4q6"] },
    { id: "accountability", label: "Accountability", questionIds: ["r4q7"] },
    { id: "resolution", label: "Resolution", questionIds: ["r4q8"] },
    { id: "acceptance", label: "Acceptance", questionIds: ["r4q9"] },
    { id: "safety", label: "Safety", questionIds: ["r4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Conflict Avoidant",
      color: "blue",
      interpretation:
        "Your responses suggest that conflict management is currently limited or inconsistent.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Reactive Responder",
      color: "yellow",
      interpretation:
        "You show some foundations of conflict management, although they may become less reliable under pressure.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Constructive Engager",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of conflict management, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Skilled Navigator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of conflict management.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
