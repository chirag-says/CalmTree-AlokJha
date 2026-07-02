/**
 * A8. Relationship Health™ Check
 * Tier: Growth (₹99-299)
 * Measures trust, communication, emotional support, and mutual respect.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const relationshipHealth: AssessmentConfig = {
  slug: "relationship-health",
  order: 8,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Relationship Health™",
    subtitle: "How healthy are your closest relationships?",
    description:
      "Explore the quality of your important relationships — trust, communication, support, and boundaries. Quick and private.",
    purpose: "Measures trust, communication, emotional support, and mutual respect.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Think about your closest relationships — partner, family, or close friends. Answer based on your general experience. There are no right or wrong answers.",
  questions: [
    {
      id: "a8q1",
      text: "How comfortable are you discussing important issues with people close to you?",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "a8q2",
      text: "How often do you feel heard when expressing your thoughts or feelings?",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "a8q3",
      text: "During disagreements, how often are issues resolved respectfully?",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "a8q4",
      text: "How comfortable are you asking for support when needed?",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "a8q5",
      text: "How often do you assume positive intentions from people close to you?",
      options: [...LIKERT_5],
      dimension: "trust",
    },
    {
      id: "a8q6",
      text: "How frequently do misunderstandings remain unresolved?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "trust",
    },
    {
      id: "a8q7",
      text: "How often do you express appreciation to important people in your life?",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "a8q8",
      text: "How much trust do you generally have in your close relationships?",
      options: [...LIKERT_5],
      dimension: "trust",
    },
    {
      id: "a8q9",
      text: "How often do you feel emotionally supported?",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "a8q10",
      text: "How comfortable are you setting and respecting personal boundaries?",
      options: [...LIKERT_5],
      dimension: "trust",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "trust", label: "Trust", questionIds: ["a8q5", "a8q6", "a8q8", "a8q10"] },
    { id: "communication", label: "Communication", questionIds: ["a8q1", "a8q2", "a8q3"] },
    { id: "support", label: "Support", questionIds: ["a8q4", "a8q7", "a8q9"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Independent Navigator",
      color: "blue",
      interpretation:
        "You may tend toward self-reliance in relationships. Building trust and openness takes time and is worth investing in.",
    },
    {
      min: 20,
      max: 29,
      label: "Caring Partner",
      color: "yellow",
      interpretation:
        "Your relationships show care and effort. Some areas — like communication or vulnerability — may benefit from attention.",
    },
    {
      min: 30,
      max: 39,
      label: "Trusted Companion",
      color: "emerald",
      interpretation:
        "You maintain healthy, communicative relationships with a strong foundation of trust and mutual support.",
    },
    {
      min: 40,
      max: 50,
      label: "Deep Connector",
      color: "green",
      interpretation:
        "Your relationships reflect deep trust, open communication, and genuine emotional support. This is a real strength.",
    },
  ],
};
