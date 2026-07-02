/**
 * A28. Workload Recovery Capacity
 * Tier: Professional
 * Measures how effectively a person restores mental, emotional and physical functioning after periods of high workload.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workloadRecoveryCapacity: AssessmentConfig = {
  slug: "workload-recovery-capacity",
  order: 28,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workload Recovery Capacity",
    subtitle: "How well do you recover after intense work periods?",
    description:
      "Measure how effectively you restore mental, emotional and physical functioning after high workload. Ten honest questions, instant private results.",
    purpose:
      "Measures how effectively a person restores mental, emotional and physical functioning after periods of high workload.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "activity",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "wrc1",
      text: "After a demanding workday, I can regain a sense of calm within a reasonable time.",
      options: [...LIKERT_5],
      dimension: "switch-off",
    },
    {
      id: "wrc2",
      text: "I begin the next workday still carrying much of the previous day's strain.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "rebound",
    },
    {
      id: "wrc3",
      text: "Short breaks help me return with better concentration.",
      options: [...LIKERT_5],
      dimension: "replenishment",
    },
    {
      id: "wrc4",
      text: "Even on lighter days, I feel as though my energy reserve remains low.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "rebound",
    },
    {
      id: "wrc5",
      text: "I have at least one reliable routine that helps me recover after work.",
      options: [...LIKERT_5],
      dimension: "replenishment",
    },
    {
      id: "wrc6",
      text: "I continue mentally solving work problems during most of my personal time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "switch-off",
    },
    {
      id: "wrc7",
      text: "After a demanding week, rest usually restores my motivation.",
      options: [...LIKERT_5],
      dimension: "rebound",
    },
    {
      id: "wrc8",
      text: "I postpone rest until I am already exhausted.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "replenishment",
    },
    {
      id: "wrc9",
      text: "I can notice early signs that I need to slow down or reset.",
      options: [...LIKERT_5],
      dimension: "self-monitoring",
    },
    {
      id: "wrc10",
      text: "When work becomes intense, I abandon the habits that normally support me.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "self-monitoring",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "switch-off", label: "Switch-Off", questionIds: ["wrc1", "wrc6"] },
    { id: "rebound", label: "Rebound", questionIds: ["wrc2", "wrc4", "wrc7"] },
    { id: "replenishment", label: "Replenishment", questionIds: ["wrc3", "wrc5", "wrc8"] },
    { id: "self-monitoring", label: "Self-Monitoring", questionIds: ["wrc9", "wrc10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Depleted Recovery Capacity",
      color: "red",
      interpretation:
        "Your current recovery pattern may not be restoring the energy used by work. Reducing non-essential demand and restoring basic routines can help — seek professional support if strain is persistent.",
    },
    {
      min: 21,
      max: 30,
      label: "Strained Recovery Capacity",
      color: "orange",
      interpretation:
        "You recover partially, but pressure may be accumulating faster than you replenish it. Protecting predictable recovery periods can help.",
    },
    {
      min: 31,
      max: 40,
      label: "Functional but Inconsistent Recovery",
      color: "yellow",
      interpretation:
        "You have useful recovery habits, though they may weaken during intense periods. Identify your two most effective routines and protect them.",
    },
    {
      min: 41,
      max: 50,
      label: "Strong Recovery Capacity",
      color: "green",
      interpretation:
        "You generally switch off, replenish energy and return with reasonable resilience. Maintain the practices that work and monitor changes during workload peaks.",
    },
  ],
};
