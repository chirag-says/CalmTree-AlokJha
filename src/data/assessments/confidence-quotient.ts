/**
 * A3. Confidence Quotient
 * Pack 1 — Self-Awareness and Personality
 * Explores self-belief, willingness to act, response to criticism and
 * comfort expressing needs or opinions.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const confidenceQuotient: AssessmentConfig = {
  slug: "confidence-quotient",
  order: 3,
  type: "standard",
  tier: "discovery",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Confidence Quotient",
    subtitle: "How strong is your self-confidence?",
    description:
      "Explore your self-belief, willingness to act and comfort expressing your needs. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores self-belief, willingness to act, response to criticism and comfort expressing needs or opinions.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "zap",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a3q1",
      text: "I share my view even when more experienced people are present.",
      options: [...LIKERT_5],
      dimension: "voice",
    },
    {
      id: "a3q2",
      text: "I am willing to attempt unfamiliar tasks before I feel fully ready.",
      options: [...LIKERT_5],
      dimension: "action",
    },
    {
      id: "a3q3",
      text: "I can make a mistake without treating it as proof that I am incapable.",
      options: [...LIKERT_5],
      dimension: "recovery",
    },
    {
      id: "a3q4",
      text: "I compare myself unfavourably with others before deciding whether to act.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "comparison",
    },
    {
      id: "a3q5",
      text: "I make everyday decisions without repeatedly seeking reassurance.",
      options: [...LIKERT_5],
      dimension: "self-trust",
    },
    {
      id: "a3q6",
      text: "I can accept appreciation without immediately dismissing it.",
      options: [...LIKERT_5],
      dimension: "self-recognition",
    },
    {
      id: "a3q7",
      text: "I set reasonable boundaries even when another person may disagree.",
      options: [...LIKERT_5],
      dimension: "assertiveness",
    },
    {
      id: "a3q8",
      text: "I avoid opportunities when I cannot guarantee a strong performance.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "perfection-avoidance",
    },
    {
      id: "a3q9",
      text: "I trust my ability to learn what I do not yet know.",
      options: [...LIKERT_5],
      dimension: "growth-belief",
    },
    {
      id: "a3q10",
      text: "I recover after criticism without losing confidence for a long time.",
      options: [...LIKERT_5],
      dimension: "resilience",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "voice", label: "Voice", questionIds: ["a3q1"] },
    { id: "action", label: "Action", questionIds: ["a3q2"] },
    { id: "recovery", label: "Recovery", questionIds: ["a3q3"] },
    { id: "comparison", label: "Comparison", questionIds: ["a3q4"] },
    { id: "self-trust", label: "Self-trust", questionIds: ["a3q5"] },
    { id: "self-recognition", label: "Self-recognition", questionIds: ["a3q6"] },
    { id: "assertiveness", label: "Assertiveness", questionIds: ["a3q7"] },
    { id: "perfection-avoidance", label: "Perfection Avoidance", questionIds: ["a3q8"] },
    { id: "growth-belief", label: "Growth Belief", questionIds: ["a3q9"] },
    { id: "resilience", label: "Resilience", questionIds: ["a3q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Quiet Observer",
      color: "blue",
      interpretation:
        "Your responses suggest that self-confidence is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Emerging Confident",
      color: "yellow",
      interpretation:
        "You show some foundations of self-confidence, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Steady Performer",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of self-confidence, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Bold Achiever",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of self-confidence. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
