/**
 * A12. Communication Style™
 * Tier: Growth (₹99-299)
 * Measures listening, clarity, assertiveness, and adaptability.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const communicationStyle: AssessmentConfig = {
  slug: "communication-style",
  order: 12,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Communication Style™",
    subtitle: "How effective is your communication?",
    description:
      "Explore your listening, clarity, assertiveness, and adaptability in communication. Quick, private, and actionable.",
    purpose: "Measures listening, clarity, assertiveness, and adaptability.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "message-circle",
  },
  instructions:
    "Answer based on how you typically communicate — at work, with friends, or in daily life. There are no right or wrong answers.",
  questions: [
    { id: "a12q1", text: "How often do you focus fully on a conversation without planning your response?", options: [...LIKERT_5], dimension: "listening" },
    { id: "a12q2", text: "When explaining something important, how confident are you that your message is understood?", options: [...LIKERT_5], dimension: "clarity" },
    { id: "a12q3", text: "How comfortable are you expressing a different opinion respectfully?", options: [...LIKERT_5], dimension: "assertiveness" },
    { id: "a12q4", text: "How easily do you adjust your communication style for different audiences?", options: [...LIKERT_5], dimension: "adaptability" },
    { id: "a12q5", text: "How often do people feel heard after speaking with you?", options: [...LIKERT_5], dimension: "listening" },
    { id: "a12q6", text: "How effectively do you organize your thoughts before important conversations?", options: [...LIKERT_5], dimension: "clarity" },
    { id: "a12q7", text: "How willing are you to address misunderstandings directly?", options: [...LIKERT_5], dimension: "assertiveness" },
    { id: "a12q8", text: "How comfortable are you communicating with people from different backgrounds?", options: [...LIKERT_5], dimension: "adaptability" },
    { id: "a12q9", text: "How often do you ask questions to better understand others?", options: [...LIKERT_5], dimension: "listening" },
    { id: "a12q10", text: "How well do you balance speaking and listening during discussions?", options: [...LIKERT_5], dimension: "adaptability" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "listening", label: "Listening", questionIds: ["a12q1", "a12q5", "a12q9"] },
    { id: "clarity", label: "Clarity", questionIds: ["a12q2", "a12q6"] },
    { id: "assertiveness", label: "Assertiveness", questionIds: ["a12q3", "a12q7"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["a12q4", "a12q8", "a12q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Reserved Thinker", color: "blue", interpretation: "You tend to process internally before communicating. Practising expression can strengthen your impact." },
    { min: 20, max: 29, label: "Clear Communicator", color: "yellow", interpretation: "You communicate effectively in familiar situations. Building adaptability and assertiveness can expand your range." },
    { min: 30, max: 39, label: "Influential Speaker", color: "emerald", interpretation: "You communicate with clarity, listen actively, and adapt your style to different situations." },
    { min: 40, max: 50, label: "Master Connector", color: "green", interpretation: "You demonstrate exceptional communication skills — listening deeply, speaking clearly, and connecting with anyone." },
  ],
};
