/**
 * A13. Learning Style™ Profile
 * Tier: Growth (₹99-299)
 * Measures curiosity, experimentation, reflection, and practical application.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const learningStyle: AssessmentConfig = {
  slug: "learning-style",
  order: 13,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Learning Style™",
    subtitle: "How do you learn best?",
    description:
      "Discover your learning style across curiosity, reflection, experimentation, and application. Quick, private, and insightful.",
    purpose: "Measures curiosity, experimentation, reflection, and practical application.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "book-open",
    productCategory: "Self-Awareness & Personality",
    isFree: false,
  },
  instructions:
    "Answer based on how you typically approach learning and new information. There are no right or wrong answers.",
  questions: [
    {
      id: "a13q1",
      text: "When encountering a new topic, how likely are you to explore it further?",
      options: [...LIKERT_5],
      dimension: "curiosity",
    },
    {
      id: "a13q2",
      text: "How often do you reflect on lessons learned from recent experiences?",
      options: [...LIKERT_5],
      dimension: "reflection",
    },
    {
      id: "a13q3",
      text: "How willing are you to try new approaches when solving problems?",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "a13q4",
      text: "How quickly do you apply newly learned information in real situations?",
      options: [...LIKERT_5],
      dimension: "application",
    },
    {
      id: "a13q5",
      text: "How often do you ask questions to deepen your understanding?",
      options: [...LIKERT_5],
      dimension: "curiosity",
    },
    {
      id: "a13q6",
      text: "How frequently do you review what worked and what didn't after completing a task?",
      options: [...LIKERT_5],
      dimension: "reflection",
    },
    {
      id: "a13q7",
      text: "How comfortable are you learning through trial and error?",
      options: [...LIKERT_5],
      dimension: "experimentation",
    },
    {
      id: "a13q8",
      text: "How often do you connect new knowledge to existing experiences?",
      options: [...LIKERT_5],
      dimension: "application",
    },
    {
      id: "a13q9",
      text: "How curious are you about perspectives different from your own?",
      options: [...LIKERT_5],
      dimension: "curiosity",
    },
    {
      id: "a13q10",
      text: "How likely are you to turn ideas into action?",
      options: [...LIKERT_5],
      dimension: "application",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "curiosity", label: "Curiosity", questionIds: ["a13q1", "a13q5", "a13q9"] },
    { id: "reflection", label: "Reflection", questionIds: ["a13q2", "a13q6"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["a13q3", "a13q7"] },
    { id: "application", label: "Application", questionIds: ["a13q4", "a13q8", "a13q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Observer",
      color: "blue",
      interpretation:
        "You prefer to absorb information passively. Building active learning habits can accelerate your growth.",
    },
    {
      min: 20,
      max: 29,
      label: "Practitioner",
      color: "yellow",
      interpretation:
        "You learn through doing and apply knowledge practically. Deepening reflection could strengthen your growth.",
    },
    {
      min: 30,
      max: 39,
      label: "Explorer",
      color: "emerald",
      interpretation:
        "You actively seek new knowledge, experiment with ideas, and reflect on your experiences.",
    },
    {
      min: 40,
      max: 50,
      label: "Continuous Learner",
      color: "green",
      interpretation:
        "You demonstrate exceptional learning agility — curious, reflective, experimental, and action-oriented.",
    },
  ],
};
