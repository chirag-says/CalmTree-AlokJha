/**
 * A10. Career Satisfaction™ Index
 * Tier: Professional (₹299-999)
 * Measures fulfillment, growth, recognition, and purpose.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const careerSatisfaction: AssessmentConfig = {
  slug: "career-satisfaction",
  order: 10,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Career Satisfaction™",
    subtitle: "How satisfied are you with your career?",
    description:
      "Explore your career fulfillment across purpose, growth, and recognition. Under 2 minutes, private, and actionable.",
    purpose: "Measures fulfillment, growth, recognition, and purpose.",
    duration: "Under 2 minutes",
    questionCount: 10,
    icon: "target",
  },
  instructions:
    "Answer based on how you feel about your current work or career. Be honest — there are no right or wrong answers.",
  questions: [
    { id: "a10q1", text: "How often do you feel your work makes meaningful use of your strengths?", options: [...LIKERT_5], dimension: "purpose" },
    { id: "a10q2", text: "How satisfied are you with your opportunities for growth?", options: [...LIKERT_5], dimension: "growth" },
    { id: "a10q3", text: "How often do you feel motivated to perform at your best?", options: [...LIKERT_5], dimension: "purpose" },
    { id: "a10q4", text: "How valued do you feel for your contributions?", options: [...LIKERT_5], dimension: "recognition" },
    { id: "a10q5", text: "How often do you look forward to your workday?", options: [...LIKERT_5], dimension: "purpose" },
    { id: "a10q6", text: "How aligned is your work with your long-term goals?", options: [...LIKERT_5], dimension: "growth" },
    { id: "a10q7", text: "How frequently do you think about changing jobs or careers?", options: [...LIKERT_5], reverse: true, dimension: "recognition" },
    { id: "a10q8", text: "How satisfied are you with the learning opportunities available to you?", options: [...LIKERT_5], dimension: "growth" },
    { id: "a10q9", text: "How often do you feel your work has purpose beyond completing tasks?", options: [...LIKERT_5], dimension: "purpose" },
    { id: "a10q10", text: "How optimistic are you about your future career path?", options: [...LIKERT_5], dimension: "growth" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "purpose", label: "Purpose", questionIds: ["a10q1", "a10q3", "a10q5", "a10q9"] },
    { id: "growth", label: "Growth", questionIds: ["a10q2", "a10q6", "a10q8", "a10q10"] },
    { id: "recognition", label: "Recognition", questionIds: ["a10q4", "a10q7"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Exploring Options", color: "blue", interpretation: "You may be seeking a clearer sense of direction or purpose in your career. This is a valid and important phase." },
    { min: 20, max: 29, label: "Stable Contributor", color: "yellow", interpretation: "You find value in your work but may feel that growth or recognition could improve." },
    { min: 30, max: 39, label: "Growth Seeker", color: "emerald", interpretation: "You are actively invested in your career and seeking opportunities to grow and contribute more meaningfully." },
    { min: 40, max: 50, label: "Purpose-Driven Professional", color: "green", interpretation: "Your career feels aligned with your strengths, values, and long-term vision. This is a strong position to build from." },
  ],
};
