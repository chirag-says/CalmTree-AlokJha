/**
 * A32. After-Work Detachment Check
 * Tier: Professional
 * Measures the person's ability to mentally disengage from work and re-enter personal life after working hours.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const afterWorkDetachment: AssessmentConfig = {
  slug: "after-work-detachment",
  order: 32,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "After-Work Detachment Check",
    subtitle: "Can you mentally switch off after work?",
    description:
      "Measure your ability to mentally disengage from work and re-enter personal life after working hours. Ten questions, instant private results.",
    purpose:
      "Measures the person's ability to mentally disengage from work and re-enter personal life after working hours.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "sun",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "awd1",
      text: "I can stop checking work messages after my working day ends.",
      options: [...LIKERT_5],
      dimension: "digital-boundary",
    },
    {
      id: "awd2",
      text: "I replay difficult work conversations during personal time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "mental-carryover",
    },
    {
      id: "awd3",
      text: "My evenings include activities that feel separate from my work identity.",
      options: [...LIKERT_5],
      dimension: "identity-shift",
    },
    {
      id: "awd4",
      text: "I feel guilty when I am not available for work outside normal hours.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "availability-guilt",
    },
    {
      id: "awd5",
      text: "I can enjoy personal time even when some work remains unfinished.",
      options: [...LIKERT_5],
      dimension: "completion-tolerance",
    },
    {
      id: "awd6",
      text: "Work thoughts regularly interfere with sleep or relaxation.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "mental-carryover",
    },
    {
      id: "awd7",
      text: "I have a clear ritual or boundary that marks the end of work.",
      options: [...LIKERT_5],
      dimension: "transition-routine",
    },
    {
      id: "awd8",
      text: "I continue monitoring work issues during weekends or leave.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "digital-boundary",
    },
    {
      id: "awd9",
      text: "People close to me receive my attention when I am with them.",
      options: [...LIKERT_5],
      dimension: "presence",
    },
    {
      id: "awd10",
      text: "A difficult day at work usually affects my mood for the rest of the evening.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-carryover",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "digital-boundary", label: "Digital Boundary", questionIds: ["awd1", "awd8"] },
    { id: "mental-carryover", label: "Mental Carryover", questionIds: ["awd2", "awd6"] },
    { id: "identity-shift", label: "Identity Shift", questionIds: ["awd3"] },
    { id: "availability-guilt", label: "Availability Guilt", questionIds: ["awd4"] },
    { id: "completion-tolerance", label: "Completion Tolerance", questionIds: ["awd5"] },
    { id: "transition-routine", label: "Transition Routine", questionIds: ["awd7"] },
    { id: "presence", label: "Presence", questionIds: ["awd9"] },
    { id: "emotional-carryover", label: "Emotional Carryover", questionIds: ["awd10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Very Low Detachment",
      color: "red",
      interpretation:
        "Work is likely continuing to occupy substantial mental and emotional space outside working hours. Introduce a firm end-of-day ritual and reduce after-hours access.",
    },
    {
      min: 21,
      max: 30,
      label: "Limited Detachment",
      color: "orange",
      interpretation:
        "You disconnect partially, but work often follows you into personal time. Create a shutdown list, delay message checking and schedule absorbing non-work activities.",
    },
    {
      min: 31,
      max: 40,
      label: "Generally Healthy Detachment",
      color: "yellow",
      interpretation:
        "You usually transition out of work, though demanding periods can spill into personal time. Protect the boundaries that work and strengthen them during pressure periods.",
    },
    {
      min: 41,
      max: 50,
      label: "Strong Detachment",
      color: "green",
      interpretation:
        "You are generally able to end the workday mentally and be present in personal life. Maintain flexibility for genuine emergencies without normalising constant availability.",
    },
  ],
};
