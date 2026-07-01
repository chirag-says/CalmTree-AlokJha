/**
 * A35. Change Fatigue Assessment
 * Tier: Professional
 * Measures the strain created by repeated organisational, technological or process changes without sufficient stability or recovery.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const changeFatigue: AssessmentConfig = {
  slug: "change-fatigue",
  order: 35,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Change Fatigue Assessment",
    subtitle: "Are you exhausted by organisational change?",
    description:
      "Measure the strain created by repeated organisational, technological or process changes without sufficient stability or recovery.",
    purpose:
      "Measures the strain created by repeated organisational, technological or process changes without sufficient stability or recovery.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "refresh-cw",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "cfa1",
      text: "New initiatives arrive before earlier changes have been fully absorbed.",
      options: [...LIKERT_5],
      dimension: "change-volume",
    },
    {
      id: "cfa2",
      text: "I understand why the major changes affecting my work are necessary.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "meaning-clarity",
    },
    {
      id: "cfa3",
      text: "Repeated changes have reduced my enthusiasm for new announcements.",
      options: [...LIKERT_5],
      dimension: "cynicism",
    },
    {
      id: "cfa4",
      text: "I receive enough training and support to work effectively after changes.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "implementation-support",
    },
    {
      id: "cfa5",
      text: "Processes change so often that it feels difficult to build mastery.",
      options: [...LIKERT_5],
      dimension: "stability-loss",
    },
    {
      id: "cfa6",
      text: "I can see evidence that recent changes have improved outcomes.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "credibility",
    },
    {
      id: "cfa7",
      text: "I feel expected to adapt without having time to recover or consolidate.",
      options: [...LIKERT_5],
      dimension: "change-volume",
    },
    {
      id: "cfa8",
      text: "Leaders acknowledge the practical and emotional cost of transition.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "leadership-recognition",
    },
    {
      id: "cfa9",
      text: "I sometimes comply with new initiatives without believing they will last.",
      options: [...LIKERT_5],
      dimension: "cynicism",
    },
    {
      id: "cfa10",
      text: "I still have enough stable routines to feel competent and grounded.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "stability-loss",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "change-volume", label: "Change Volume", questionIds: ["cfa1", "cfa7"] },
    { id: "meaning-clarity", label: "Meaning Clarity", questionIds: ["cfa2"] },
    { id: "cynicism", label: "Cynicism", questionIds: ["cfa3", "cfa9"] },
    { id: "implementation-support", label: "Implementation Support", questionIds: ["cfa4"] },
    { id: "stability-loss", label: "Stability Loss", questionIds: ["cfa5", "cfa10"] },
    { id: "credibility", label: "Credibility", questionIds: ["cfa6"] },
    { id: "leadership-recognition", label: "Leadership Recognition", questionIds: ["cfa8"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Low Change Fatigue",
      color: "green",
      interpretation:
        "Change appears reasonably paced, supported or meaningful for you. Continue consolidating learning and identifying what should remain stable.",
    },
    {
      min: 21,
      max: 30,
      label: "Emerging Change Fatigue",
      color: "yellow",
      interpretation:
        "You are adapting, but repeated change is beginning to consume patience or energy. Clarify priorities, close old initiatives and protect consolidation time.",
    },
    {
      min: 31,
      max: 40,
      label: "High Change Fatigue",
      color: "orange",
      interpretation:
        "The frequency or quality of change may be reducing motivation, trust and confidence. Seek clearer rationale, implementation support and explicit removal of outdated work.",
    },
    {
      min: 41,
      max: 50,
      label: "Severe Change Fatigue",
      color: "red",
      interpretation:
        "Repeated transition may have produced substantial exhaustion, cynicism or disengagement. Escalate workload and transition concerns, and rebuild stability.",
    },
  ],
};
