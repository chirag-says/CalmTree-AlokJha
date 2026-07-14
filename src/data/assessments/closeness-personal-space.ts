/**
 * R3. Closeness and Personal Space Balance
 * Pack 5 — Relationships & Emotional Connection
 * Measures comfort with intimacy, need for personal space, ability to
 * negotiate closeness and tolerance for differing proximity preferences.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const closenessPersonalSpace: AssessmentConfig = {
  slug: "closeness-personal-space",
  order: 43, type: "standard", tier: "growth", category: "Relationships", status: "active",
  meta: {
    title: "Closeness and Personal Space Balance",
    subtitle: "How do you balance closeness and independence?",
    description: "Measure your comfort with intimacy, need for personal space and ability to negotiate closeness.",
    purpose: "Measures comfort with intimacy, need for personal space, ability to negotiate closeness and tolerance for differing proximity preferences.",
    duration: "3–5 minutes", questionCount: 10, icon: "users",
    productCategory: "Relationships & Emotional Connection", isFree: false,
  },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "r3q1", text: "I can enjoy closeness without feeling trapped or overwhelmed.", options: [...LIKERT_5], dimension: "closeness-comfort" },
    { id: "r3q2", text: "I can spend time alone without feeling rejected or abandoned.", options: [...LIKERT_5], dimension: "space-comfort" },
    { id: "r3q3", text: "I ask for space without expecting the other person to feel hurt.", options: [...LIKERT_5], dimension: "negotiation" },
    { id: "r3q4", text: "I feel anxious when physical or emotional distance increases.", options: [...LIKERT_5], reverse: true, dimension: "proximity-anxiety" },
    { id: "r3q5", text: "I can be emotionally present without losing my sense of self.", options: [...LIKERT_5], dimension: "identity-preservation" },
    { id: "r3q6", text: "I accept that my partner or close person may need a different amount of closeness.", options: [...LIKERT_5], dimension: "tolerance" },
    { id: "r3q7", text: "I withdraw without communicating when I need space.", options: [...LIKERT_5], reverse: true, dimension: "silent-withdrawal" },
    { id: "r3q8", text: "I can tolerate temporary distance without interpreting it as rejection.", options: [...LIKERT_5], dimension: "interpretation" },
    { id: "r3q9", text: "I have interests or friendships outside the relationship that feel healthy and balanced.", options: [...LIKERT_5], dimension: "external-connection" },
    { id: "r3q10", text: "I adjust my closeness needs based on the other person's state without resentment.", options: [...LIKERT_5], dimension: "flexibility" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "closeness-comfort", label: "Closeness Comfort", questionIds: ["r3q1"] },
    { id: "space-comfort", label: "Space Comfort", questionIds: ["r3q2"] },
    { id: "negotiation", label: "Negotiation", questionIds: ["r3q3"] },
    { id: "proximity-anxiety", label: "Proximity Anxiety", questionIds: ["r3q4"] },
    { id: "identity-preservation", label: "Identity Preservation", questionIds: ["r3q5"] },
    { id: "tolerance", label: "Tolerance", questionIds: ["r3q6"] },
    { id: "silent-withdrawal", label: "Silent Withdrawal", questionIds: ["r3q7"] },
    { id: "interpretation", label: "Interpretation", questionIds: ["r3q8"] },
    { id: "external-connection", label: "External Connection", questionIds: ["r3q9"] },
    { id: "flexibility", label: "Flexibility", questionIds: ["r3q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Proximity Struggle", color: "blue", interpretation: "Your responses suggest that closeness-space balance is currently limited or inconsistent.", nextStep: "Choose one small behaviour to practise repeatedly rather than trying to change everything at once." },
    { min: 20, max: 29, label: "Adjusting Boundaries", color: "yellow", interpretation: "You show some foundations of closeness-space balance, although they may become less reliable under pressure.", nextStep: "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context." },
    { min: 30, max: 39, label: "Balanced Connector", color: "emerald", interpretation: "Your responses suggest a generally steady level of closeness-space balance, with a few areas that could become more consistent.", nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths." },
    { min: 40, max: 50, label: "Flexible Partner", color: "green", interpretation: "Your responses indicate a strong and broadly reliable pattern of closeness-space balance.", nextStep: "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach." },
  ],
};
