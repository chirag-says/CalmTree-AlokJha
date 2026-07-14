/**
 * W14. Unclear Role Stress Assessment
 * Measures stress created by uncertain priorities, conflicting expectations,
 * unclear authority and ambiguous success criteria.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const unclearRoleStress: AssessmentConfig = {
  slug: "unclear-role-stress",
  order: 29,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Unclear Role Stress Assessment",
    subtitle: "Is role ambiguity causing you stress?",
    description: "Measure stress from uncertain priorities, conflicting expectations and unclear authority.",
    purpose: "Measures stress created by uncertain priorities, conflicting expectations, unclear authority and ambiguous success criteria.",
    duration: "3–5 minutes", questionCount: 10, icon: "alert-circle",
    productCategory: "Workplace Effectiveness", isFree: false,
  },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "w14q1", text: "I know which outcomes matter most in my role.", options: [...LIKERT_5], reverse: true, dimension: "priority-clarity" },
    { id: "w14q2", text: "Different people give me expectations that conflict with one another.", options: [...LIKERT_5], dimension: "expectation-conflict" },
    { id: "w14q3", text: "I understand where my authority begins and ends.", options: [...LIKERT_5], reverse: true, dimension: "decision-rights" },
    { id: "w14q4", text: "I often discover important responsibilities only after a problem appears.", options: [...LIKERT_5], dimension: "role-definition" },
    { id: "w14q5", text: "Success in my role is measured consistently.", options: [...LIKERT_5], reverse: true, dimension: "success-criteria" },
    { id: "w14q6", text: "I spend time guessing what senior people really want.", options: [...LIKERT_5], dimension: "expectation-clarity" },
    { id: "w14q7", text: "I know whom to approach when priorities conflict.", options: [...LIKERT_5], reverse: true, dimension: "escalation-path" },
    { id: "w14q8", text: "My role changes frequently without an explicit discussion.", options: [...LIKERT_5], dimension: "change-clarity" },
    { id: "w14q9", text: "I can explain my main responsibilities in a few clear sentences.", options: [...LIKERT_5], reverse: true, dimension: "role-definition" },
    { id: "w14q10", text: "Ambiguity in my role regularly affects sleep, confidence or concentration.", options: [...LIKERT_5], dimension: "stress-impact" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "priority-clarity", label: "Priority Clarity", questionIds: ["w14q1"] },
    { id: "expectation-conflict", label: "Expectation Conflict", questionIds: ["w14q2"] },
    { id: "decision-rights", label: "Decision Rights", questionIds: ["w14q3"] },
    { id: "role-definition", label: "Role Definition", questionIds: ["w14q4", "w14q9"] },
    { id: "success-criteria", label: "Success Criteria", questionIds: ["w14q5"] },
    { id: "expectation-clarity", label: "Expectation Clarity", questionIds: ["w14q6"] },
    { id: "escalation-path", label: "Escalation Path", questionIds: ["w14q7"] },
    { id: "change-clarity", label: "Change Clarity", questionIds: ["w14q8"] },
    { id: "stress-impact", label: "Stress Impact", questionIds: ["w14q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Clear Role Experience", color: "green", interpretation: "Your responses currently show relatively few signs of role ambiguity. Protective habits appear to be working reasonably well.", nextStep: "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build." },
    { min: 20, max: 29, label: "Manageable Ambiguity", color: "yellow", interpretation: "Some signs of role ambiguity are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.", nextStep: "Identify the two situations that raise your score most often and make one practical change this week." },
    { min: 30, max: 39, label: "Role Strain", color: "orange", interpretation: "Your responses suggest a recurring pattern of role ambiguity that may be affecting energy, concentration, relationships or performance.", nextStep: "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan." },
    { min: 40, max: 50, label: "High Ambiguity Stress", color: "red", interpretation: "Your responses suggest a strong and persistent pattern of role ambiguity. The present pace or environment may be difficult to sustain.", nextStep: "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent." },
  ],
};
