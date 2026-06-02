/**
 * A9. Leadership DNA™ Assessment
 * Tier: Professional (₹299-999)
 * Measures influence, accountability, decision-making, and team orientation.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const leadershipDNA: AssessmentConfig = {
  slug: "leadership-dna",
  order: 9,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Leadership DNA™",
    subtitle: "What kind of leader are you?",
    description:
      "Discover your leadership style across influence, accountability, and team development. Quick, private, and actionable.",
    purpose: "Measures influence, accountability, decision-making, and team orientation.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "briefcase",
  },
  instructions:
    "Answer based on how you typically behave when working with others, whether at work, in projects, or in daily life. There are no right or wrong answers.",
  questions: [
    { id: "a9q1", text: "When working with others, how often do people seek your guidance?", options: [...LIKERT_5], dimension: "influence" },
    { id: "a9q2", text: "How comfortable are you making decisions when outcomes are uncertain?", options: [...LIKERT_5], dimension: "influence" },
    { id: "a9q3", text: "How often do you take ownership when things do not go as planned?", options: [...LIKERT_5], dimension: "accountability" },
    { id: "a9q4", text: "How frequently do you help others develop their skills or confidence?", options: [...LIKERT_5], dimension: "development" },
    { id: "a9q5", text: "During disagreements, how often can you maintain productive conversations?", options: [...LIKERT_5], dimension: "influence" },
    { id: "a9q6", text: "How effectively do you communicate expectations?", options: [...LIKERT_5], dimension: "accountability" },
    { id: "a9q7", text: "How willing are you to make difficult decisions when necessary?", options: [...LIKERT_5], dimension: "accountability" },
    { id: "a9q8", text: "How often do you recognize the contributions of others?", options: [...LIKERT_5], dimension: "development" },
    { id: "a9q9", text: "How comfortable are you delegating responsibilities?", options: [...LIKERT_5], dimension: "development" },
    { id: "a9q10", text: "How often do you think about long-term goals rather than immediate tasks?", options: [...LIKERT_5], dimension: "influence" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "influence", label: "Influence", questionIds: ["a9q1", "a9q2", "a9q5", "a9q10"] },
    { id: "accountability", label: "Accountability", questionIds: ["a9q3", "a9q6", "a9q7"] },
    { id: "development", label: "Team Development", questionIds: ["a9q4", "a9q8", "a9q9"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Emerging Leader", color: "blue", interpretation: "Your leadership skills are developing. Every leader starts somewhere — focus on building confidence and accountability." },
    { min: 20, max: 29, label: "Reliable Manager", color: "yellow", interpretation: "You demonstrate solid management capabilities with room to develop influence and strategic thinking." },
    { min: 30, max: 39, label: "Influential Guide", color: "emerald", interpretation: "You lead with both accountability and influence. Others look to you for direction and support." },
    { min: 40, max: 50, label: "Visionary Builder", color: "green", interpretation: "You demonstrate exceptional leadership — combining vision, accountability, and genuine investment in others' growth." },
  ],
};
