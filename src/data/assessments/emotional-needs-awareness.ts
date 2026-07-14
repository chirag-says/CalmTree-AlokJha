/**
 * R2. Emotional Needs Awareness
 * Pack 5 — Relationships & Emotional Connection
 * Explores awareness of one's own emotional needs, comfort expressing them,
 * and ability to recognise and respond to the needs of close others.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const emotionalNeedsAwareness: AssessmentConfig = {
  slug: "emotional-needs-awareness",
  order: 42, type: "standard", tier: "growth", category: "Relationships", status: "active",
  meta: {
    title: "Emotional Needs Awareness",
    subtitle: "How well do you understand your emotional needs?",
    description: "Explore your awareness of emotional needs, comfort expressing them and ability to respond to others.",
    purpose: "Explores awareness of one's own emotional needs, comfort expressing them, and ability to recognise and respond to the needs of close others.",
    duration: "3–5 minutes", questionCount: 10, icon: "heart",
    productCategory: "Relationships & Emotional Connection", isFree: false,
  },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "r2q1", text: "I can name what I emotionally need in a given moment.", options: [...LIKERT_5], dimension: "self-awareness" },
    { id: "r2q2", text: "I express emotional needs without expecting others to guess them.", options: [...LIKERT_5], dimension: "expression" },
    { id: "r2q3", text: "I notice when someone close to me needs reassurance or support.", options: [...LIKERT_5], dimension: "other-awareness" },
    { id: "r2q4", text: "I dismiss my own emotional needs as unimportant or inconvenient.", options: [...LIKERT_5], reverse: true, dimension: "self-dismissal" },
    { id: "r2q5", text: "I can ask for comfort without feeling weak.", options: [...LIKERT_5], dimension: "vulnerability" },
    { id: "r2q6", text: "I respond to another person's emotional need even when it differs from mine.", options: [...LIKERT_5], dimension: "responsiveness" },
    { id: "r2q7", text: "I notice recurring unmet needs before they create resentment.", options: [...LIKERT_5], dimension: "pattern-recognition" },
    { id: "r2q8", text: "I can distinguish between what I need and what I want the other person to be.", options: [...LIKERT_5], dimension: "clarity" },
    { id: "r2q9", text: "I adjust how I offer support based on what the other person actually needs.", options: [...LIKERT_5], dimension: "responsiveness" },
    { id: "r2q10", text: "I take responsibility for meeting some of my own emotional needs rather than depending entirely on one person.", options: [...LIKERT_5], dimension: "self-responsibility" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "self-awareness", label: "Self-awareness", questionIds: ["r2q1"] },
    { id: "expression", label: "Expression", questionIds: ["r2q2"] },
    { id: "other-awareness", label: "Other-awareness", questionIds: ["r2q3"] },
    { id: "self-dismissal", label: "Self-dismissal", questionIds: ["r2q4"] },
    { id: "vulnerability", label: "Vulnerability", questionIds: ["r2q5"] },
    { id: "responsiveness", label: "Responsiveness", questionIds: ["r2q6", "r2q9"] },
    { id: "pattern-recognition", label: "Pattern Recognition", questionIds: ["r2q7"] },
    { id: "clarity", label: "Clarity", questionIds: ["r2q8"] },
    { id: "self-responsibility", label: "Self-responsibility", questionIds: ["r2q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Unaware or Disconnected", color: "blue", interpretation: "Your responses suggest that emotional needs awareness is currently limited or inconsistent.", nextStep: "Choose one small behaviour to practise repeatedly rather than trying to change everything at once." },
    { min: 20, max: 29, label: "Emerging Awareness", color: "yellow", interpretation: "You show some foundations of emotional needs awareness, although they may become less reliable under pressure.", nextStep: "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context." },
    { min: 30, max: 39, label: "Responsive Connector", color: "emerald", interpretation: "Your responses suggest a generally steady level of emotional needs awareness, with a few areas that could become more consistent.", nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths." },
    { min: 40, max: 50, label: "Emotionally Attuned", color: "green", interpretation: "Your responses indicate a strong and broadly reliable pattern of emotional needs awareness.", nextStep: "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach." },
  ],
};
