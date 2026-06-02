/**
 * A11. Team Player Index™
 * Tier: Professional (₹299-999)
 * Measures collaboration, accountability, supportiveness, and respect for others.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const teamPlayerIndex: AssessmentConfig = {
  slug: "team-player-index",
  order: 11,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Team Player Index™",
    subtitle: "How strong a team player are you?",
    description:
      "Assess your collaboration style, accountability, and supportiveness within teams. Quick, private, and insightful.",
    purpose: "Measures collaboration, accountability, supportiveness, and respect for others.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "users",
  },
  instructions:
    "Think about how you typically behave when working in a team. Answer honestly — there are no right or wrong answers.",
  questions: [
    { id: "a11q1", text: "When working in a group, how often do you actively contribute to shared goals?", options: [...LIKERT_5], dimension: "collaboration" },
    { id: "a11q2", text: "If a project faces challenges, how willing are you to take responsibility for your part?", options: [...LIKERT_5], dimension: "accountability" },
    { id: "a11q3", text: "How often do you offer help when a teammate appears overloaded?", options: [...LIKERT_5], dimension: "supportiveness" },
    { id: "a11q4", text: "How comfortable are you working with people who have different styles or opinions?", options: [...LIKERT_5], dimension: "collaboration" },
    { id: "a11q5", text: "How often do you listen to others before forming conclusions?", options: [...LIKERT_5], dimension: "respect" },
    { id: "a11q6", text: "How reliable are you in meeting commitments made to a team?", options: [...LIKERT_5], dimension: "accountability" },
    { id: "a11q7", text: "How often do you acknowledge the contributions of others?", options: [...LIKERT_5], dimension: "supportiveness" },
    { id: "a11q8", text: "When disagreements occur, how likely are you to focus on solutions?", options: [...LIKERT_5], dimension: "collaboration" },
    { id: "a11q9", text: "How often do you encourage participation from quieter team members?", options: [...LIKERT_5], dimension: "respect" },
    { id: "a11q10", text: "How willing are you to adapt your approach for the benefit of the team?", options: [...LIKERT_5], dimension: "respect" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "collaboration", label: "Collaboration", questionIds: ["a11q1", "a11q4", "a11q8"] },
    { id: "accountability", label: "Accountability", questionIds: ["a11q2", "a11q6"] },
    { id: "supportiveness", label: "Supportiveness", questionIds: ["a11q3", "a11q7"] },
    { id: "respect", label: "Respect & Inclusion", questionIds: ["a11q5", "a11q9", "a11q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Independent Contributor", color: "blue", interpretation: "You tend to work independently. Building collaborative habits can unlock new opportunities and relationships." },
    { min: 20, max: 29, label: "Cooperative Colleague", color: "yellow", interpretation: "You contribute to teams effectively but may benefit from deeper engagement and accountability." },
    { min: 30, max: 39, label: "Trusted Collaborator", color: "emerald", interpretation: "You are a reliable and supportive team member who others can count on." },
    { min: 40, max: 50, label: "Team Catalyst", color: "green", interpretation: "You actively elevate team performance through collaboration, accountability, and genuine support for others." },
  ],
};
