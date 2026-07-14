/**
 * A5. Personality Compass
 * Pack 1 — Self-Awareness and Personality
 * Maps four everyday preference dimensions: social energy, structure,
 * decision style and adaptability.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const personalityCompass: AssessmentConfig = {
  slug: "personality-compass",
  order: 5,
  type: "personality-compass",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Personality Compass",
    subtitle: "What drives your everyday preferences?",
    description:
      "Map your social energy, structure preference, decision style and adaptability. Ten honest questions, instant results, completely private.",
    purpose:
      "Maps four everyday preference dimensions: social energy, structure, decision style and adaptability.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "compass",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a5q1",
      text: "I gain clarity by discussing ideas with other people.",
      options: [...LIKERT_5],
      dimension: "social-energy",
    },
    {
      id: "a5q2",
      text: "I prefer to decide the sequence and timeline before starting.",
      options: [...LIKERT_5],
      dimension: "structure",
    },
    {
      id: "a5q3",
      text: "I rely first on evidence and logical consistency when making important choices.",
      options: [...LIKERT_5],
      dimension: "decision-style",
    },
    {
      id: "a5q4",
      text: "I enjoy changing direction when a new possibility appears.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a5q5",
      text: "I usually need quiet reflection before sharing a considered opinion.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "social-energy",
    },
    {
      id: "a5q6",
      text: "I feel comfortable leaving some details open until later.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    {
      id: "a5q7",
      text: "I give significant weight to values and people impact when deciding.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-style",
    },
    {
      id: "a5q8",
      text: "I prefer familiar methods when the consequences of error are high.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "adaptability",
    },
    {
      id: "a5q9",
      text: "Frequent interaction usually increases my energy.",
      options: [...LIKERT_5],
      dimension: "social-energy",
    },
    {
      id: "a5q10",
      text: "Clear routines help me perform consistently.",
      options: [...LIKERT_5],
      dimension: "structure",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "social-energy", label: "Social Energy", questionIds: ["a5q1", "a5q5", "a5q9"] },
    { id: "structure", label: "Structure", questionIds: ["a5q2", "a5q6", "a5q10"] },
    { id: "decision-style", label: "Decision Style", questionIds: ["a5q3", "a5q7"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["a5q4", "a5q8"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Thoughtful Architect",
      color: "blue",
      interpretation:
        "A reflective, structured and careful pattern is likely to be prominent. You may value depth, preparation and accuracy.",
      nextStep:
        "Make space for experimentation and visible communication when circumstances require speed.",
    },
    {
      min: 20,
      max: 29,
      label: "Reliable Guide",
      color: "yellow",
      interpretation:
        "You are likely to combine steadiness with people awareness and practical judgement.",
      nextStep:
        "Avoid carrying too much responsibility simply because others experience you as dependable.",
    },
    {
      min: 30,
      max: 39,
      label: "Versatile Navigator",
      color: "emerald",
      interpretation:
        "Your responses suggest a relatively balanced pattern that changes with context.",
      nextStep:
        "Name your preferred default so flexibility remains intentional rather than reactive.",
    },
    {
      min: 40,
      max: 50,
      label: "Dynamic Explorer",
      color: "green",
      interpretation:
        "You may gain energy from interaction, variety and movement, and adapt readily to new possibilities.",
      nextStep:
        "Use simple structure and reflection checkpoints to improve consistency and follow-through.",
    },
  ],
  personalityArchetypes: [
    { profile: "structured+logic+introvert", label: "Strategic Builder", description: "Combines deep thinking with structured execution and evidence-based decisions." },
    { profile: "structured+people+introvert", label: "Reliable Guide", description: "Steady, people-aware and dependable, with careful structured support." },
    { profile: "flexible+people+extrovert", label: "Dynamic Connector", description: "Energised by interaction, variety and people-centred adaptive leadership." },
    { profile: "flexible+logic+extrovert", label: "Innovative Explorer", description: "Combines quick experimentation with logical assessment and social energy." },
    { profile: "structured+logic+introvert+detail", label: "Thoughtful Architect", description: "Values depth, preparation, accuracy and careful decision-making." },
    { profile: "balanced+people", label: "Harmonizer", description: "Balances multiple dimensions with a people-centred approach." },
    { profile: "flexible+logic+introvert", label: "Creative Pathfinder", description: "Combines independent reflection with adaptable, evidence-based exploration." },
    { profile: "balanced", label: "Versatile Navigator", description: "A balanced pattern that changes flexibly with context and demands." },
  ],
};
