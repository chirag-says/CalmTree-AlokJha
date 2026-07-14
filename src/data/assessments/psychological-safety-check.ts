/**
 * W24. Psychological Safety Check
 * Measures how safe it feels to take interpersonal risks like speaking up,
 * asking questions, admitting mistakes and offering dissent.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const psychologicalSafetyCheck: AssessmentConfig = {
  slug: "psychological-safety-check",
  order: 39, type: "standard", tier: "professional", category: "Professional", status: "active",
  meta: { title: "Psychological Safety Check", subtitle: "Does your team feel safe for honest communication?", description: "Measure how safe it feels to speak up, ask questions, admit mistakes and offer dissent.", purpose: "Measures how safe it feels to take interpersonal risks like speaking up, asking questions, admitting mistakes and offering dissent.", duration: "3–5 minutes", questionCount: 10, icon: "shield", productCategory: "Leadership & Teams", isFree: false },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "w24q1", text: "I can admit a mistake without fear of blame or ridicule.", options: [...LIKERT_5], dimension: "error-safety" },
    { id: "w24q2", text: "I can ask a question without appearing incompetent.", options: [...LIKERT_5], dimension: "learning-safety" },
    { id: "w24q3", text: "I can challenge an idea respectfully and be heard.", options: [...LIKERT_5], dimension: "challenge-safety" },
    { id: "w24q4", text: "People on the team are sometimes punished for honest feedback.", options: [...LIKERT_5], reverse: true, dimension: "feedback-risk" },
    { id: "w24q5", text: "Different viewpoints are genuinely considered, not just tolerated.", options: [...LIKERT_5], dimension: "inclusion" },
    { id: "w24q6", text: "I filter what I say to avoid negative consequences.", options: [...LIKERT_5], reverse: true, dimension: "self-censorship" },
    { id: "w24q7", text: "The team learns from problems rather than looking for someone to blame.", options: [...LIKERT_5], dimension: "learning-culture" },
    { id: "w24q8", text: "I feel comfortable raising a concern with someone in authority.", options: [...LIKERT_5], dimension: "upward-safety" },
    { id: "w24q9", text: "Differences in seniority do not prevent honest communication.", options: [...LIKERT_5], dimension: "hierarchy-safety" },
    { id: "w24q10", text: "Taking a reasonable risk that does not work out is treated as learning.", options: [...LIKERT_5], dimension: "experimentation" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "error-safety", label: "Error Safety", questionIds: ["w24q1"] },
    { id: "learning-safety", label: "Learning Safety", questionIds: ["w24q2"] },
    { id: "challenge-safety", label: "Challenge Safety", questionIds: ["w24q3"] },
    { id: "feedback-risk", label: "Feedback Risk", questionIds: ["w24q4"] },
    { id: "inclusion", label: "Inclusion", questionIds: ["w24q5"] },
    { id: "self-censorship", label: "Self-censorship", questionIds: ["w24q6"] },
    { id: "learning-culture", label: "Learning Culture", questionIds: ["w24q7"] },
    { id: "upward-safety", label: "Upward Safety", questionIds: ["w24q8"] },
    { id: "hierarchy-safety", label: "Hierarchy Safety", questionIds: ["w24q9"] },
    { id: "experimentation", label: "Experimentation", questionIds: ["w24q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Guarded Environment", color: "red", interpretation: "Your responses suggest that psychological safety is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.", nextStep: "Choose one small behaviour to practise repeatedly rather than trying to change everything at once." },
    { min: 20, max: 29, label: "Cautious Environment", color: "orange", interpretation: "You show some foundations of psychological safety, although they may become less reliable under pressure or uncertainty.", nextStep: "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context." },
    { min: 30, max: 39, label: "Generally Safe Environment", color: "yellow", interpretation: "Your responses suggest a generally steady level of psychological safety, with a few areas that could become more consistent.", nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths." },
    { min: 40, max: 50, label: "High Psychological Safety", color: "green", interpretation: "Your responses indicate a strong and broadly reliable pattern of psychological safety. You are likely to use it across many situations.", nextStep: "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach." },
  ],
};
