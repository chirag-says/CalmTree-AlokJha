/**
 * A7. Entrepreneur Resilience Index
 * Pack 4 — Leadership, Relationships and Influence
 * Explores how founders and independent builders respond to uncertainty,
 * setbacks, prolonged effort and changing evidence.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const entrepreneurResilience: AssessmentConfig = {
  slug: "entrepreneur-resilience",
  order: 7,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Entrepreneur Resilience Index",
    subtitle: "How resilient are you as a founder?",
    description:
      "Explore how you respond to uncertainty, setbacks and prolonged effort. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores how founders and independent builders respond to uncertainty, setbacks, prolonged effort and changing evidence.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a7q1",
      text: "After a setback, I can separate the event from my overall worth or capability.",
      options: [...LIKERT_5],
      dimension: "recovery",
    },
    {
      id: "a7q2",
      text: "I can continue working when outcomes are uncertain.",
      options: [...LIKERT_5],
      dimension: "uncertainty-tolerance",
    },
    {
      id: "a7q3",
      text: "I change direction when evidence shows that the current approach is weak.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a7q4",
      text: "A disappointing result makes me question the entire venture for a long time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "setback-impact",
    },
    {
      id: "a7q5",
      text: "I can ask for help without feeling that I have failed as a founder.",
      options: [...LIKERT_5],
      dimension: "support-use",
    },
    {
      id: "a7q6",
      text: "I protect basic sleep, health or recovery even during intense periods.",
      options: [...LIKERT_5],
      dimension: "sustainability",
    },
    {
      id: "a7q7",
      text: "I can make decisions with incomplete information and review them later.",
      options: [...LIKERT_5],
      dimension: "decision-agility",
    },
    {
      id: "a7q8",
      text: "I hide problems until they become difficult to solve.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "problem-openness",
    },
    {
      id: "a7q9",
      text: "I can maintain a long-term view without ignoring present cash or execution realities.",
      options: [...LIKERT_5],
      dimension: "perspective",
    },
    {
      id: "a7q10",
      text: "I learn from criticism without automatically accepting or rejecting it.",
      options: [...LIKERT_5],
      dimension: "learning-orientation",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "recovery", label: "Recovery", questionIds: ["a7q1"] },
    { id: "uncertainty-tolerance", label: "Uncertainty Tolerance", questionIds: ["a7q2"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["a7q3"] },
    { id: "setback-impact", label: "Setback Impact", questionIds: ["a7q4"] },
    { id: "support-use", label: "Support Use", questionIds: ["a7q5"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["a7q6"] },
    { id: "decision-agility", label: "Decision Agility", questionIds: ["a7q7"] },
    { id: "problem-openness", label: "Problem Openness", questionIds: ["a7q8"] },
    { id: "perspective", label: "Perspective", questionIds: ["a7q9"] },
    { id: "learning-orientation", label: "Learning Orientation", questionIds: ["a7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Cautious Planner",
      color: "blue",
      interpretation:
        "Your responses suggest that entrepreneurial resilience is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Determined Builder",
      color: "yellow",
      interpretation:
        "You show some foundations of entrepreneurial resilience, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Resilient Operator",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of entrepreneurial resilience, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Growth Pioneer",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of entrepreneurial resilience. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
