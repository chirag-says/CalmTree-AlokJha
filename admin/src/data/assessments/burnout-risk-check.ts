/**
 * A1. Burnout Risk Check™
 * Tier: Discovery (Free)
 * Measures signs of depletion, recovery capacity, and sustained workload pressure.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const burnoutRiskCheck: AssessmentConfig = {
  slug: "burnout-risk-check",
  order: 1,
  type: "standard",
  tier: "discovery",
  category: "Mental Wellness",
  status: "active",
  meta: {
    title: "Burnout Risk Check™",
    subtitle: "How close to burnout are you?",
    description:
      "A quick, situational self-check on your burnout risk. Ten honest questions, instant results, completely private.",
    purpose: "Measures signs of depletion, recovery capacity, and sustained workload pressure.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "flame",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: true,
  },
  instructions:
    "Answer each question based on how you've been feeling in general recently. Be honest with yourself — there are no right or wrong answers.",
  questions: [
    {
      id: "a1q1",
      text: "After completing a demanding day, how often do you still have enough energy for activities you enjoy?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a1q2",
      text: "When unexpected tasks arise, how manageable do they usually feel?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "overload",
    },
    {
      id: "a1q3",
      text: "During a typical week, how often do small setbacks affect your mood for longer than expected?",
      options: [...LIKERT_5],
      dimension: "emotional-fatigue",
    },
    {
      id: "a1q4",
      text: "During your personal time, how easy is it to mentally switch away from work or responsibilities?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a1q5",
      text: "Compared to six months ago, how often do routine tasks feel more demanding?",
      options: [...LIKERT_5],
      dimension: "overload",
    },
    {
      id: "a1q6",
      text: "How frequently do personal plans get postponed because of obligations or workload?",
      options: [...LIKERT_5],
      dimension: "overload",
    },
    {
      id: "a1q7",
      text: "How often do you feel you are simply moving from one task to the next without much enthusiasm?",
      options: [...LIKERT_5],
      dimension: "emotional-fatigue",
    },
    {
      id: "a1q8",
      text: "After a difficult day, how quickly do you regain motivation?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a1q9",
      text: "How often do you feel refreshed after a weekend or short break?",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "a1q10",
      text: "How often does your energy seem to be used faster than it is restored?",
      options: [...LIKERT_5],
      dimension: "emotional-fatigue",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "recovery", label: "Recovery", questionIds: ["a1q1", "a1q4", "a1q8", "a1q9"] },
    { id: "overload", label: "Overload", questionIds: ["a1q2", "a1q5", "a1q6"] },
    { id: "emotional-fatigue", label: "Emotional Fatigue", questionIds: ["a1q3", "a1q7", "a1q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Sustainable Performer",
      color: "green",
      interpretation: "You appear to maintain a healthy balance between effort and recovery.",
    },
    {
      min: 20,
      max: 29,
      label: "Busy Balancer",
      color: "yellow",
      interpretation:
        "You are managing demands reasonably well but may benefit from stronger recovery habits.",
    },
    {
      min: 30,
      max: 39,
      label: "Overloaded Achiever",
      color: "orange",
      interpretation:
        "Your responsibilities may be consuming more energy than you regularly restore.",
    },
    {
      min: 40,
      max: 50,
      label: "Exhausted Warrior",
      color: "red",
      interpretation:
        "You may be operating under sustained pressure and could benefit from reviewing workload and recovery patterns.",
    },
  ],
};
