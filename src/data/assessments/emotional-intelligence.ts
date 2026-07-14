/**
 * A4. Emotional Intelligence Snapshot
 * Pack 1 — Self-Awareness and Personality
 * Explores emotional awareness, regulation, empathy, expression and repair
 * in everyday situations.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const emotionalIntelligence: AssessmentConfig = {
  slug: "emotional-intelligence",
  order: 4,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Emotional Intelligence Snapshot",
    subtitle: "How well do you read and manage emotions?",
    description:
      "Explore your emotional awareness, regulation, empathy and expression. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores emotional awareness, regulation, empathy, expression and repair in everyday situations.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a4q1",
      text: "I notice emotional changes in myself before they strongly affect my behaviour.",
      options: [...LIKERT_5],
      dimension: "self-awareness",
    },
    {
      id: "a4q2",
      text: "I can name what I am feeling with reasonable accuracy.",
      options: [...LIKERT_5],
      dimension: "self-awareness",
    },
    {
      id: "a4q3",
      text: "I react first and understand my feelings only later.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "regulation",
    },
    {
      id: "a4q4",
      text: "I can pause before responding when I feel criticised or provoked.",
      options: [...LIKERT_5],
      dimension: "regulation",
    },
    {
      id: "a4q5",
      text: "I notice emotional signals that other people do not say directly.",
      options: [...LIKERT_5],
      dimension: "empathy",
    },
    {
      id: "a4q6",
      text: "I can listen to someone without immediately correcting, advising or defending.",
      options: [...LIKERT_5],
      dimension: "empathy",
    },
    {
      id: "a4q7",
      text: "Difficult emotions regularly control my tone or decisions.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "regulation",
    },
    {
      id: "a4q8",
      text: "I express needs and concerns without expecting others to guess them.",
      options: [...LIKERT_5],
      dimension: "expression",
    },
    {
      id: "a4q9",
      text: "After a misunderstanding, I can take steps to repair the interaction.",
      options: [...LIKERT_5],
      dimension: "relationship-management",
    },
    {
      id: "a4q10",
      text: "I can care about another person while still maintaining my own boundaries.",
      options: [...LIKERT_5],
      dimension: "balanced-empathy",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "self-awareness", label: "Self-awareness", questionIds: ["a4q1", "a4q2"] },
    { id: "regulation", label: "Regulation", questionIds: ["a4q3", "a4q4", "a4q7"] },
    { id: "empathy", label: "Empathy", questionIds: ["a4q5", "a4q6"] },
    { id: "expression", label: "Expression", questionIds: ["a4q8"] },
    { id: "relationship-management", label: "Relationship Management", questionIds: ["a4q9"] },
    { id: "balanced-empathy", label: "Balanced Empathy", questionIds: ["a4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Emotional Observer",
      color: "blue",
      interpretation:
        "Your responses suggest that emotional intelligence is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Compassionate Connector",
      color: "yellow",
      interpretation:
        "You show some foundations of emotional intelligence, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Balanced Communicator",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of emotional intelligence, with a few areas that could become more consistent.",
      nextStep:
        "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Emotional Leader",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of emotional intelligence. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
