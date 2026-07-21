/**
 * R10. Repair After Conflict
 * Pack 5 — Relationships & Emotional Connection
 * Measures the ability to reconnect, take responsibility, rebuild trust
 * and re-establish emotional safety after a conflict or rupture.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const repairAfterConflict: AssessmentConfig = {
  slug: "repair-after-conflict",
  order: 50,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Repair After Conflict",
    subtitle: "How well do you repair after conflict?",
    description:
      "Measure your ability to reconnect, take responsibility and rebuild trust after a conflict.",
    purpose:
      "Measures the ability to reconnect, take responsibility, rebuild trust and re-establish emotional safety after a conflict or rupture.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "r10q1",
      text: "I can be the first to reach out after a disagreement.",
      options: [...LIKERT_5],
      dimension: "initiation",
    },
    {
      id: "r10q2",
      text: "I acknowledge my part in the conflict without waiting for the other person to go first.",
      options: [...LIKERT_5],
      dimension: "accountability",
    },
    {
      id: "r10q3",
      text: "I can apologise sincerely without adding conditions or blame.",
      options: [...LIKERT_5],
      dimension: "apology-quality",
    },
    {
      id: "r10q4",
      text: "I hold on to resentment long after the conflict is discussed.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "release",
    },
    {
      id: "r10q5",
      text: "I check whether the other person is ready to reconnect before pushing.",
      options: [...LIKERT_5],
      dimension: "timing",
    },
    {
      id: "r10q6",
      text: "I can reconnect physically or verbally without pretending nothing happened.",
      options: [...LIKERT_5],
      dimension: "genuine-repair",
    },
    {
      id: "r10q7",
      text: "I use the conflict to understand something useful for the future.",
      options: [...LIKERT_5],
      dimension: "learning",
    },
    {
      id: "r10q8",
      text: "I punish the other person with silence, distance or coldness after a disagreement.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "punishment",
    },
    {
      id: "r10q9",
      text: "I can rebuild trust gradually after a serious rupture.",
      options: [...LIKERT_5],
      dimension: "trust-rebuilding",
    },
    {
      id: "r10q10",
      text: "I treat repair as a shared responsibility rather than waiting for the other person.",
      options: [...LIKERT_5],
      dimension: "shared-responsibility",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "initiation", label: "Initiation", questionIds: ["r10q1"] },
    { id: "accountability", label: "Accountability", questionIds: ["r10q2"] },
    { id: "apology-quality", label: "Apology Quality", questionIds: ["r10q3"] },
    { id: "release", label: "Release", questionIds: ["r10q4"] },
    { id: "timing", label: "Timing", questionIds: ["r10q5"] },
    { id: "genuine-repair", label: "Genuine Repair", questionIds: ["r10q6"] },
    { id: "learning", label: "Learning", questionIds: ["r10q7"] },
    { id: "punishment", label: "Punishment", questionIds: ["r10q8"] },
    { id: "trust-rebuilding", label: "Trust Rebuilding", questionIds: ["r10q9"] },
    { id: "shared-responsibility", label: "Shared Responsibility", questionIds: ["r10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Repair Avoidant",
      color: "blue",
      interpretation:
        "Your responses suggest that conflict repair is currently limited or inconsistent.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Slow Healer",
      color: "yellow",
      interpretation:
        "You show some foundations of conflict repair, although they may become less reliable under pressure.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Active Repairer",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of conflict repair, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Resilient Connector",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of conflict repair.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
