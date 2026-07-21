/**
 * P1. Parenting Communication Pattern
 * Pack 9 — Family, Parenting and Social Roles
 * Explores listening, clarity, emotional safety and age-appropriate communication between a parent and child.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const parentingCommunicationPattern: AssessmentConfig = {
  slug: "parenting-communication-pattern",
  order: 81,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Parenting Communication Pattern",
    subtitle: "A quick read on your constructive parenting communication.",
    description:
      "Explores listening, clarity, emotional safety and age-appropriate communication between a parent and child. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores listening, clarity, emotional safety and age-appropriate communication between a parent and child.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "message-circle",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p1q1",
      text: "I listen to the full concern before giving advice or correction.",
      options: [...LIKERT_5],
      dimension: "listening",
    },
    {
      id: "p1q2",
      text: "I use lectures when a shorter conversation would be enough.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "communication-length",
    },
    {
      id: "p1q3",
      text: "I separate the child’s behaviour from their worth or character.",
      options: [...LIKERT_5],
      dimension: "respect",
    },
    {
      id: "p1q4",
      text: "I explain the reason behind important boundaries when appropriate.",
      options: [...LIKERT_5],
      dimension: "clarity",
    },
    {
      id: "p1q5",
      text: "I dismiss feelings when the issue seems small from an adult perspective.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-validation",
    },
    {
      id: "p1q6",
      text: "I can apologise when my tone or response was unfair.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
    {
      id: "p1q7",
      text: "I ask questions that help the child think rather than only obey.",
      options: [...LIKERT_5],
      dimension: "reflection",
    },
    {
      id: "p1q8",
      text: "I communicate expectations mainly after something has gone wrong.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "proactive-clarity",
    },
    {
      id: "p1q9",
      text: "I adapt language and choice to the child’s age and capacity.",
      options: [...LIKERT_5],
      dimension: "developmental-fit",
    },
    {
      id: "p1q10",
      text: "I make regular space for conversation that is not about performance or problems.",
      options: [...LIKERT_5],
      dimension: "connection",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "listening", label: "Listening", questionIds: ["p1q1"] },
    { id: "communication-length", label: "Communication length", questionIds: ["p1q2"] },
    { id: "respect", label: "Respect", questionIds: ["p1q3"] },
    { id: "clarity", label: "Clarity", questionIds: ["p1q4"] },
    { id: "emotional-validation", label: "Emotional validation", questionIds: ["p1q5"] },
    { id: "repair", label: "Repair", questionIds: ["p1q6"] },
    { id: "reflection", label: "Reflection", questionIds: ["p1q7"] },
    { id: "proactive-clarity", label: "Proactive clarity", questionIds: ["p1q8"] },
    { id: "developmental-fit", label: "Developmental fit", questionIds: ["p1q9"] },
    { id: "connection", label: "Connection", questionIds: ["p1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Directive and Distant",
      color: "blue",
      interpretation:
        "Your responses suggest that constructive parenting communication is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Communication Awareness Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of constructive parenting communication, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Respectful Guide",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of constructive parenting communication, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Connected Parenting Communicator",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of constructive parenting communication. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
