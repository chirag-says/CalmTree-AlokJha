/**
 * A6. Work-Life Harmony™ Check
 * Tier: Professional (₹299-999)
 * Measures balance between responsibilities, personal wellbeing, boundaries, and recovery.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workLifeHarmony: AssessmentConfig = {
  slug: "work-life-harmony",
  order: 6,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Work-Life Harmony™",
    subtitle: "How balanced is your life, really?",
    description:
      "Check the balance between your work demands and personal wellbeing. Situational, quick, and private.",
    purpose: "Measures balance between responsibilities, personal wellbeing, boundaries, and recovery.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "sun",
  },
  instructions:
    "Answer based on your typical experience over the past few weeks. Be honest — there are no right or wrong answers.",
  questions: [
    { id: "a6q1", text: "How often do you have enough time for activities that are important to you outside of work?", options: [...LIKERT_5], reverse: true, dimension: "boundaries" },
    { id: "a6q2", text: "At the end of the day, how easy is it to mentally disconnect from responsibilities?", options: [...LIKERT_5], reverse: true, dimension: "boundaries" },
    { id: "a6q3", text: "How frequently do work or obligations interrupt your personal plans?", options: [...LIKERT_5], dimension: "boundaries" },
    { id: "a6q4", text: "How often do you feel guilty when taking time for yourself?", options: [...LIKERT_5], dimension: "satisfaction" },
    { id: "a6q5", text: "How regularly do you make time for exercise, hobbies, or relaxation?", options: [...LIKERT_5], reverse: true, dimension: "recovery" },
    { id: "a6q6", text: "How often do you feel in control of how your time is spent?", options: [...LIKERT_5], reverse: true, dimension: "satisfaction" },
    { id: "a6q7", text: "During vacations or breaks, how easy is it to truly switch off?", options: [...LIKERT_5], reverse: true, dimension: "recovery" },
    { id: "a6q8", text: "How often do you sacrifice sleep to meet responsibilities?", options: [...LIKERT_5], dimension: "recovery" },
    { id: "a6q9", text: "How satisfied are you with the balance between your work and personal life?", options: [...LIKERT_5], reverse: true, dimension: "satisfaction" },
    { id: "a6q10", text: "How often do you feel you have enough energy for both work and personal commitments?", options: [...LIKERT_5], reverse: true, dimension: "satisfaction" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "boundaries", label: "Boundaries", questionIds: ["a6q1", "a6q2", "a6q3"] },
    { id: "recovery", label: "Recovery", questionIds: ["a6q5", "a6q7", "a6q8"] },
    { id: "satisfaction", label: "Satisfaction", questionIds: ["a6q4", "a6q6", "a6q9", "a6q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Harmony Builder", color: "green", interpretation: "You appear to maintain healthy boundaries and recovery habits." },
    { min: 20, max: 29, label: "Busy Balancer", color: "yellow", interpretation: "Your balance is generally stable, though some areas may need attention." },
    { min: 30, max: 39, label: "Constant Juggler", color: "orange", interpretation: "Competing priorities may be reducing personal recovery and satisfaction." },
    { min: 40, max: 50, label: "Work Dominated", color: "red", interpretation: "Responsibilities appear to be consuming most available time and energy." },
  ],
};
