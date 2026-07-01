/**
 * A5. Personality Compass™
 * Tier: Growth (₹99-299)
 *
 * SPECIAL: This assessment does NOT produce a single score.
 * It produces a personality profile based on four dimensions.
 * Each dimension is scored independently, then combined into an archetype.
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
    title: "Personality Compass™",
    subtitle: "What's your personality profile?",
    description:
      "Discover your personality across four core dimensions — social energy, structure, decision style, and adaptability. Quick, private, and insightful.",
    purpose: "Produces a personality profile based on four independent dimensions.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "compass",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions:
    "Answer based on how you generally are now, not how you wish to be. There are no right or wrong answers — every profile is valid.",
  questions: [
    // Dimension 1: Social Energy
    {
      id: "a5q1",
      text: "After spending time with a group, do you usually feel energized or drained?",
      options: [...LIKERT_5],
      dimension: "social-energy",
    },
    {
      id: "a5q2",
      text: "In new environments, how likely are you to start conversations?",
      options: [...LIKERT_5],
      dimension: "social-energy",
    },
    // Dimension 2: Structure
    {
      id: "a5q3",
      text: "Before starting a project, how important is it to have a plan?",
      options: [...LIKERT_5],
      dimension: "structure",
    },
    {
      id: "a5q4",
      text: "When plans change unexpectedly, how comfortable are you adapting?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "structure",
    },
    // Dimension 3: Decision Style
    {
      id: "a5q5",
      text: "When making decisions, how much weight do you give to objective facts?",
      options: [...LIKERT_5],
      dimension: "decision-style",
    },
    {
      id: "a5q6",
      text: "When making decisions, how much weight do you give to the impact on people?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-style",
    },
    // Dimension 4: Adaptability
    {
      id: "a5q7",
      text: "How likely are you to try a new approach if the current one is working reasonably well?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a5q8",
      text: "How comfortable are you with uncertainty?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a5q9",
      text: "How often do you seek new experiences or perspectives?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "a5q10",
      text: "How quickly do you adjust when circumstances change?",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "social-energy", label: "Social Energy", questionIds: ["a5q1", "a5q2"] },
    { id: "structure", label: "Structure", questionIds: ["a5q3", "a5q4"] },
    { id: "decision-style", label: "Decision Style", questionIds: ["a5q5", "a5q6"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["a5q7", "a5q8", "a5q9", "a5q10"] },
  ],
  archetypes: [], // Not used — personality compass uses personalityArchetypes
  personalityArchetypes: [
    {
      profile: "structured+logic+introvert",
      label: "Strategic Builder",
      description:
        "You combine deep focus, logical thinking, and systematic planning. You excel at building frameworks and solving complex problems independently.",
    },
    {
      profile: "structured+empathy",
      label: "Reliable Guide",
      description:
        "You blend organisation with genuine care for others. People trust you to lead with both structure and heart.",
    },
    {
      profile: "adaptive+social",
      label: "Dynamic Connector",
      description:
        "You thrive on human connection and adapt easily to new situations. Your energy and flexibility make you a natural networker and collaborator.",
    },
    {
      profile: "adaptive+logic",
      label: "Innovative Explorer",
      description:
        "You combine analytical thinking with openness to change. You're drawn to new ideas and approach problems with both logic and creativity.",
    },
    {
      profile: "introvert+structured",
      label: "Thoughtful Architect",
      description:
        "You prefer working independently with clear plans. Your strength lies in careful, methodical thinking and attention to detail.",
    },
    {
      profile: "social+empathy",
      label: "Harmonizer",
      description:
        "You're attuned to people's emotions and energised by social connection. You naturally create warmth and unity in groups.",
    },
    {
      profile: "adaptive+flexible",
      label: "Creative Pathfinder",
      description:
        "You embrace change, resist rigidity, and find unconventional solutions. Your flexibility is your superpower.",
    },
    {
      profile: "balanced",
      label: "Versatile Navigator",
      description:
        "You show a balanced profile across dimensions — adaptable and well-rounded in your approach to life and work.",
    },
  ],
};
