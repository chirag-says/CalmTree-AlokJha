/**
 * R9. Difficult Conversation Readiness
 * Pack 5 — Relationships & Emotional Connection
 * Measures willingness, preparation, emotional regulation, timing and
 * repair skill for conversations that carry emotional risk.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const difficultConversationReadiness: AssessmentConfig = {
  slug: "difficult-conversation-readiness",
  order: 49,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Difficult Conversation Readiness",
    subtitle: "Can you handle tough conversations?",
    description:
      "Measure your willingness, preparation and emotional regulation for conversations that carry emotional risk.",
    purpose:
      "Measures willingness, preparation, emotional regulation, timing and repair skill for conversations that carry emotional risk.",
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
      id: "r9q1",
      text: "I raise difficult topics rather than hoping they will resolve themselves.",
      options: [...LIKERT_5],
      dimension: "initiation",
    },
    {
      id: "r9q2",
      text: "I prepare what I want to say without scripting the entire conversation.",
      options: [...LIKERT_5],
      dimension: "preparation",
    },
    {
      id: "r9q3",
      text: "I can stay regulated when the other person reacts emotionally.",
      options: [...LIKERT_5],
      dimension: "self-regulation",
    },
    {
      id: "r9q4",
      text: "I postpone conversations indefinitely because I dread the reaction.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "avoidance",
    },
    {
      id: "r9q5",
      text: "I choose a suitable time and setting for a serious conversation.",
      options: [...LIKERT_5],
      dimension: "timing",
    },
    {
      id: "r9q6",
      text: "I can hold my position without becoming aggressive or backing down entirely.",
      options: [...LIKERT_5],
      dimension: "assertiveness",
    },
    {
      id: "r9q7",
      text: "I listen to the other person's reaction even when it is uncomfortable.",
      options: [...LIKERT_5],
      dimension: "receptivity",
    },
    {
      id: "r9q8",
      text: "I aim for understanding rather than winning.",
      options: [...LIKERT_5],
      dimension: "goal",
    },
    {
      id: "r9q9",
      text: "I can repair the relationship after a difficult conversation.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
    {
      id: "r9q10",
      text: "I know the difference between an important conversation and a pointless argument.",
      options: [...LIKERT_5],
      dimension: "discernment",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "initiation", label: "Initiation", questionIds: ["r9q1"] },
    { id: "preparation", label: "Preparation", questionIds: ["r9q2"] },
    { id: "self-regulation", label: "Self-regulation", questionIds: ["r9q3"] },
    { id: "avoidance", label: "Avoidance", questionIds: ["r9q4"] },
    { id: "timing", label: "Timing", questionIds: ["r9q5"] },
    { id: "assertiveness", label: "Assertiveness", questionIds: ["r9q6"] },
    { id: "receptivity", label: "Receptivity", questionIds: ["r9q7"] },
    { id: "goal", label: "Goal", questionIds: ["r9q8"] },
    { id: "repair", label: "Repair", questionIds: ["r9q9"] },
    { id: "discernment", label: "Discernment", questionIds: ["r9q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Conversation Avoider",
      color: "blue",
      interpretation:
        "Your responses suggest that difficult conversation readiness is currently limited or inconsistent.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Reluctant Initiator",
      color: "yellow",
      interpretation:
        "You show some foundations of difficult conversation readiness, although they may become less reliable under pressure.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Capable Communicator",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of difficult conversation readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Courageous Communicator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of difficult conversation readiness.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
