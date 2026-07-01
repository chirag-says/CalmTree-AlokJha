/**
 * A29. Unclear Role Stress Assessment
 * Tier: Professional
 * Measures how strongly unclear responsibilities, shifting expectations and uncertain decision rights affect the person's functioning.
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
    subtitle: "How much does role ambiguity affect you?",
    description:
      "Measure how strongly unclear responsibilities, shifting expectations and uncertain decision rights affect your functioning at work.",
    purpose:
      "Measures how strongly unclear responsibilities, shifting expectations and uncertain decision rights affect the person's functioning.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "alert-circle",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "urs1",
      text: "I receive different expectations from different people.",
      options: [...LIKERT_5],
      dimension: "conflicting-expectations",
    },
    {
      id: "urs2",
      text: "I am unsure which responsibilities are genuinely mine.",
      options: [...LIKERT_5],
      dimension: "role-boundaries",
    },
    {
      id: "urs3",
      text: "Priorities change without a clear explanation of what should be deprioritised.",
      options: [...LIKERT_5],
      dimension: "priority-ambiguity",
    },
    {
      id: "urs4",
      text: "I know who has the authority to make important decisions affecting my work.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-clarity",
    },
    {
      id: "urs5",
      text: "I sometimes discover success criteria only after work has been reviewed.",
      options: [...LIKERT_5],
      dimension: "performance-clarity",
    },
    {
      id: "urs6",
      text: "My role allows me to understand where my responsibility begins and ends.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "role-boundaries",
    },
    {
      id: "urs7",
      text: "I spend time guessing what senior people really want.",
      options: [...LIKERT_5],
      dimension: "performance-clarity",
    },
    {
      id: "urs8",
      text: "When instructions conflict, there is a clear way to resolve them.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "decision-clarity",
    },
    {
      id: "urs9",
      text: "Uncertainty about my role makes it harder to prioritise confidently.",
      options: [...LIKERT_5],
      dimension: "priority-ambiguity",
    },
    {
      id: "urs10",
      text: "I can explain my role and expected outcomes in a few clear sentences.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "role-boundaries",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "conflicting-expectations", label: "Conflicting Expectations", questionIds: ["urs1"] },
    { id: "role-boundaries", label: "Role Boundaries", questionIds: ["urs2", "urs6", "urs10"] },
    { id: "priority-ambiguity", label: "Priority Ambiguity", questionIds: ["urs3", "urs9"] },
    { id: "decision-clarity", label: "Decision Clarity", questionIds: ["urs4", "urs8"] },
    { id: "performance-clarity", label: "Performance Clarity", questionIds: ["urs5", "urs7"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Low Role-Ambiguity Stress",
      color: "green",
      interpretation:
        "Your role and decision environment appear relatively clear. Maintain written priorities and clarify changes before ambiguity accumulates.",
    },
    {
      min: 21,
      max: 30,
      label: "Manageable Ambiguity",
      color: "yellow",
      interpretation:
        "Some uncertainty exists, but you can usually work through it without major disruption. Confirm priorities, owners and success criteria at the start of important work.",
    },
    {
      min: 31,
      max: 40,
      label: "High Ambiguity Strain",
      color: "orange",
      interpretation:
        "Unclear or conflicting expectations may be consuming significant attention and confidence. A role-clarity conversation using written outcomes and boundaries can help.",
    },
    {
      min: 41,
      max: 50,
      label: "Severe Role-Ambiguity Strain",
      color: "red",
      interpretation:
        "Persistent uncertainty may be making it difficult to prioritise, perform or feel secure in the role. Escalate for formal clarification and document agreements.",
    },
  ],
};
