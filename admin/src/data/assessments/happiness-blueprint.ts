/**
 * A15. Happiness Blueprint™
 * Tier: Discovery (Free)
 * Measures overall wellbeing through relationships, purpose, gratitude, and personal growth.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const happinessBlueprint: AssessmentConfig = {
  slug: "happiness-blueprint",
  order: 15,
  type: "standard",
  tier: "discovery",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Happiness Blueprint™",
    subtitle: "What does your happiness look like?",
    description:
      "Explore your wellbeing across relationships, purpose, gratitude, and growth. Under 2 minutes, private, and uplifting.",
    purpose:
      "Measures overall wellbeing through relationships, purpose, gratitude, and personal growth.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "Answer based on how you generally feel about your life right now. Be honest — there are no right or wrong answers.",
  questions: [
    {
      id: "a15q1",
      text: "How satisfied are you with the quality of your important relationships?",
      options: [...LIKERT_5],
      dimension: "relationships",
    },
    {
      id: "a15q2",
      text: "How often do your daily activities feel meaningful?",
      options: [...LIKERT_5],
      dimension: "purpose",
    },
    {
      id: "a15q3",
      text: "How often do you notice and appreciate positive things in your life?",
      options: [...LIKERT_5],
      dimension: "gratitude",
    },
    {
      id: "a15q4",
      text: "How often do you feel you are growing as a person?",
      options: [...LIKERT_5],
      dimension: "growth",
    },
    {
      id: "a15q5",
      text: "How supported do you feel by people around you?",
      options: [...LIKERT_5],
      dimension: "relationships",
    },
    {
      id: "a15q6",
      text: "How clear are you about what matters most to you?",
      options: [...LIKERT_5],
      dimension: "purpose",
    },
    {
      id: "a15q7",
      text: "How often do you focus on what is going well rather than what is missing?",
      options: [...LIKERT_5],
      dimension: "gratitude",
    },
    {
      id: "a15q8",
      text: "How excited are you about future opportunities?",
      options: [...LIKERT_5],
      dimension: "growth",
    },
    {
      id: "a15q9",
      text: "How often do you feel your actions align with your values?",
      options: [...LIKERT_5],
      dimension: "purpose",
    },
    {
      id: "a15q10",
      text: "How frequently do you challenge yourself to learn or improve?",
      options: [...LIKERT_5],
      dimension: "growth",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "relationships", label: "Relationships", questionIds: ["a15q1", "a15q5"] },
    { id: "purpose", label: "Purpose", questionIds: ["a15q2", "a15q6", "a15q9"] },
    { id: "gratitude", label: "Gratitude", questionIds: ["a15q3", "a15q7"] },
    { id: "growth", label: "Growth", questionIds: ["a15q4", "a15q8", "a15q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Searching Explorer",
      color: "blue",
      interpretation:
        "You may be in a period of searching for clarity, connection, or meaning. This is a natural and important phase.",
    },
    {
      min: 20,
      max: 29,
      label: "Content Builder",
      color: "yellow",
      interpretation:
        "You have a foundation of wellbeing with room to strengthen purpose, gratitude, or connection.",
    },
    {
      min: 30,
      max: 39,
      label: "Positive Contributor",
      color: "emerald",
      interpretation:
        "You demonstrate strong wellbeing — grounded in relationships, purpose, and personal growth.",
    },
    {
      min: 40,
      max: 50,
      label: "Flourishing Optimist",
      color: "green",
      interpretation:
        "You show exceptional wellbeing across all dimensions — relationships, purpose, gratitude, and continuous growth.",
    },
  ],
};
