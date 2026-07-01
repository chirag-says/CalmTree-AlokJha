/**
 * A3. Confidence Quotient™
 * Tier: Discovery (Free)
 * Measures self-belief, initiative, social confidence, and resilience.
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
    title: "Confidence Quotient™",
    subtitle: "How confident are you, really?",
    description:
      "Explore your self-belief, initiative, and resilience. A quick, non-clinical confidence check with instant private results.",
    purpose: "Measures self-belief, initiative, social confidence, and resilience.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions:
    "Answer each question honestly based on how you typically feel and act. There are no right or wrong answers.",
  questions: [
    {
      id: "a3q1",
      text: "When making an important decision, how comfortable are you choosing a direction without excessive reassurance?",
      options: [...LIKERT_5],
      dimension: "self-belief",
    },
    {
      id: "a3q2",
      text: "In a group discussion, how likely are you to share a different viewpoint if you disagree?",
      options: [...LIKERT_5],
      dimension: "social-confidence",
    },
    {
      id: "a3q3",
      text: "If you make a mistake publicly, how easily do you move forward?",
      options: [...LIKERT_5],
      dimension: "resilience",
    },
    {
      id: "a3q4",
      text: "How often do concerns about failure stop you from trying something new?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "initiative",
    },
    {
      id: "a3q5",
      text: "When presented with a challenge, how likely are you to believe you can learn what is needed?",
      options: [...LIKERT_5],
      dimension: "self-belief",
    },
    {
      id: "a3q6",
      text: "How comfortable are you introducing yourself to unfamiliar people in a professional setting?",
      options: [...LIKERT_5],
      dimension: "social-confidence",
    },
    {
      id: "a3q7",
      text: "How likely are you to volunteer for opportunities that stretch your abilities?",
      options: [...LIKERT_5],
      dimension: "initiative",
    },
    {
      id: "a3q8",
      text: "How often do you compare yourself negatively with others?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "resilience",
    },
    {
      id: "a3q9",
      text: "When receiving constructive feedback, how easy is it to focus on improvement rather than criticism?",
      options: [...LIKERT_5],
      dimension: "resilience",
    },
    {
      id: "a3q10",
      text: "If someone questions your opinion, how comfortable are you explaining your perspective?",
      options: [...LIKERT_5],
      dimension: "social-confidence",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "self-belief", label: "Self-Belief", questionIds: ["a3q1", "a3q5"] },
    { id: "initiative", label: "Initiative", questionIds: ["a3q4", "a3q7"] },
    { id: "social-confidence", label: "Social Confidence", questionIds: ["a3q2", "a3q6", "a3q10"] },
    { id: "resilience", label: "Resilience", questionIds: ["a3q3", "a3q8", "a3q9"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Quiet Observer",
      color: "blue",
      interpretation:
        "You tend to hold back and observe. Building confidence is a process — and awareness is the first step.",
    },
    {
      min: 20,
      max: 29,
      label: "Emerging Confident",
      color: "yellow",
      interpretation:
        "Your confidence is developing. You have moments of strength but may second-guess yourself in certain situations.",
    },
    {
      min: 30,
      max: 39,
      label: "Steady Performer",
      color: "emerald",
      interpretation:
        "You have a solid foundation of self-belief and can handle most situations with reasonable confidence.",
    },
    {
      min: 40,
      max: 50,
      label: "Bold Achiever",
      color: "green",
      interpretation:
        "You demonstrate strong self-belief, initiative, and social confidence. You embrace challenges and recover well from setbacks.",
    },
  ],
};
