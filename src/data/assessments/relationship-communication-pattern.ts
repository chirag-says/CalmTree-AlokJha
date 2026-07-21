/**
 * R1. Relationship Communication Pattern
 * Pack 5 — Relationships & Emotional Connection
 * Measures openness, clarity, timing, emotional tone and repair behaviour
 * in a person's closest relationship communication.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const relationshipCommunicationPattern: AssessmentConfig = {
  slug: "relationship-communication-pattern",
  order: 41,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Relationship Communication Pattern",
    subtitle: "How well do you communicate in your closest relationship?",
    description:
      "Measure openness, clarity, emotional tone and repair behaviour in your closest relationship.",
    purpose:
      "Measures openness, clarity, timing, emotional tone and repair behaviour in a person's closest relationship communication.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "message-circle",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "r1q1",
      text: "I express my feelings before they build up and become difficult to manage.",
      options: [...LIKERT_5],
      dimension: "timing",
    },
    {
      id: "r1q2",
      text: "I listen without planning my reply while the other person is still speaking.",
      options: [...LIKERT_5],
      dimension: "listening",
    },
    {
      id: "r1q3",
      text: "I speak about what I need rather than only about what the other person did wrong.",
      options: [...LIKERT_5],
      dimension: "expression",
    },
    {
      id: "r1q4",
      text: "I raise difficult topics when the timing and setting are reasonable.",
      options: [...LIKERT_5],
      dimension: "timing",
    },
    {
      id: "r1q5",
      text: "I notice the emotional tone of a conversation and adjust before it escalates.",
      options: [...LIKERT_5],
      dimension: "emotional-awareness",
    },
    {
      id: "r1q6",
      text: "I check whether my message was understood rather than assuming it was.",
      options: [...LIKERT_5],
      dimension: "clarity",
    },
    {
      id: "r1q7",
      text: "I use silence, withdrawal or sarcasm instead of saying what I mean.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "indirect-communication",
    },
    {
      id: "r1q8",
      text: "After a disagreement, I can be the first to re-open communication.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
    {
      id: "r1q9",
      text: "I ask questions to understand the other person's experience.",
      options: [...LIKERT_5],
      dimension: "curiosity",
    },
    {
      id: "r1q10",
      text: "I can express disagreement without attacking the person.",
      options: [...LIKERT_5],
      dimension: "respectful-challenge",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "timing", label: "Timing", questionIds: ["r1q1", "r1q4"] },
    { id: "listening", label: "Listening", questionIds: ["r1q2"] },
    { id: "expression", label: "Expression", questionIds: ["r1q3"] },
    { id: "emotional-awareness", label: "Emotional Awareness", questionIds: ["r1q5"] },
    { id: "clarity", label: "Clarity", questionIds: ["r1q6"] },
    { id: "indirect-communication", label: "Indirect Communication", questionIds: ["r1q7"] },
    { id: "repair", label: "Repair", questionIds: ["r1q8"] },
    { id: "curiosity", label: "Curiosity", questionIds: ["r1q9"] },
    { id: "respectful-challenge", label: "Respectful Challenge", questionIds: ["r1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Guarded Communicator",
      color: "blue",
      interpretation:
        "Your responses suggest that relationship communication is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Developing Voice",
      color: "yellow",
      interpretation:
        "You show some foundations of relationship communication, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Open Communicator",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of relationship communication, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Connected Communicator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of relationship communication. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
