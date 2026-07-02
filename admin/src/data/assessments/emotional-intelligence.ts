/**
 * A4. Emotional Intelligence™
 * Tier: Growth (₹99-299)
 * Measures emotional awareness, empathy, emotional regulation, and relationship awareness.
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
    title: "Emotional Intelligence™",
    subtitle: "How well do you read and manage emotions?",
    description:
      "Explore your emotional awareness, empathy, and regulation. Situational questions, private results, under 2 minutes.",
    purpose:
      "Measures emotional awareness, empathy, emotional regulation, and relationship awareness.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "Answer based on how you typically feel and behave — not what you think you should do. There are no right or wrong answers.",
  questions: [
    {
      id: "a4q1",
      text: "During a disagreement, how often can you identify what you are feeling before responding?",
      options: [...LIKERT_5],
      dimension: "awareness",
    },
    {
      id: "a4q2",
      text: "How easily do you notice when someone may be uncomfortable, even if they do not say so directly?",
      options: [...LIKERT_5],
      dimension: "empathy",
    },
    {
      id: "a4q3",
      text: "When frustrated, how often do you react before fully considering the situation?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "regulation",
    },
    {
      id: "a4q4",
      text: "How comfortable are you discussing emotions with people you trust?",
      options: [...LIKERT_5],
      dimension: "awareness",
    },
    {
      id: "a4q5",
      text: "How often do you adjust your communication style based on the person you are speaking with?",
      options: [...LIKERT_5],
      dimension: "relationship",
    },
    {
      id: "a4q6",
      text: "When someone disagrees with you, how easy is it to understand their perspective?",
      options: [...LIKERT_5],
      dimension: "empathy",
    },
    {
      id: "a4q7",
      text: "How often do strong emotions make it difficult to think clearly?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "regulation",
    },
    {
      id: "a4q8",
      text: "How frequently do people describe you as a good listener?",
      options: [...LIKERT_5],
      dimension: "relationship",
    },
    {
      id: "a4q9",
      text: "How often do you recognize when stress is affecting your behavior?",
      options: [...LIKERT_5],
      dimension: "awareness",
    },
    {
      id: "a4q10",
      text: "After an emotional situation, how likely are you to reflect on how you handled it?",
      options: [...LIKERT_5],
      dimension: "relationship",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "awareness", label: "Self-Awareness", questionIds: ["a4q1", "a4q4", "a4q9"] },
    { id: "empathy", label: "Empathy", questionIds: ["a4q2", "a4q6"] },
    { id: "regulation", label: "Emotional Regulation", questionIds: ["a4q3", "a4q7"] },
    { id: "relationship", label: "Relationship Awareness", questionIds: ["a4q5", "a4q8", "a4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Emotional Observer",
      color: "blue",
      interpretation:
        "You are beginning to develop emotional awareness. This is a learnable skill — and awareness is step one.",
    },
    {
      min: 20,
      max: 29,
      label: "Compassionate Connector",
      color: "yellow",
      interpretation:
        "You have a solid foundation of emotional intelligence with room to deepen specific areas.",
    },
    {
      min: 30,
      max: 39,
      label: "Balanced Communicator",
      color: "emerald",
      interpretation:
        "You demonstrate strong emotional awareness and can navigate emotions effectively in most situations.",
    },
    {
      min: 40,
      max: 50,
      label: "Emotional Leader",
      color: "green",
      interpretation:
        "You show exceptional emotional intelligence — attuned to yourself and others, and skilled at managing emotional dynamics.",
    },
  ],
};
