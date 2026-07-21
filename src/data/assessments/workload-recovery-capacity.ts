/**
 * W13. Workload Recovery Capacity
 * Measures whether energy, concentration and emotional balance return
 * adequately between demanding work periods.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workloadRecoveryCapacity: AssessmentConfig = {
  slug: "workload-recovery-capacity",
  order: 28,
  type: "standard",
  tier: "professional",
  category: "Mental Wellness",
  status: "active",
  meta: {
    title: "Workload Recovery Capacity",
    subtitle: "Can you recover between demanding periods?",
    description:
      "Measure whether your energy and concentration return adequately between demanding work periods.",
    purpose:
      "Measures whether energy, concentration and emotional balance return adequately between demanding work periods.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "activity",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "w13q1",
      text: "A normal night of rest usually restores enough energy for the next day.",
      options: [...LIKERT_5],
      dimension: "physical-recovery",
    },
    {
      id: "w13q2",
      text: "I continue feeling mentally overloaded long after a demanding period ends.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "mental-recovery",
    },
    {
      id: "w13q3",
      text: "I take short breaks before concentration collapses.",
      options: [...LIKERT_5],
      dimension: "micro-recovery",
    },
    {
      id: "w13q4",
      text: "Weekends or leave are often used mainly to recover from work exhaustion.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery-debt",
    },
    {
      id: "w13q5",
      text: "I have routines that help me move from work mode into personal time.",
      options: [...LIKERT_5],
      dimension: "transition",
    },
    {
      id: "w13q6",
      text: "My patience returns after a difficult day.",
      options: [...LIKERT_5],
      dimension: "emotional-recovery",
    },
    {
      id: "w13q7",
      text: "I rely heavily on stimulation, food or scrolling to keep going.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "compensatory-coping",
    },
    {
      id: "w13q8",
      text: "I can reduce effort temporarily without feeling that I am failing.",
      options: [...LIKERT_5],
      dimension: "recovery-permission",
    },
    {
      id: "w13q9",
      text: "After a busy phase, I review and rebalance rather than continuing at the same pace.",
      options: [...LIKERT_5],
      dimension: "reset-behaviour",
    },
    {
      id: "w13q10",
      text: "My present work rhythm allows regular restoration.",
      options: [...LIKERT_5],
      dimension: "sustainability",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "physical-recovery", label: "Physical Recovery", questionIds: ["w13q1"] },
    { id: "mental-recovery", label: "Mental Recovery", questionIds: ["w13q2"] },
    { id: "micro-recovery", label: "Micro-recovery", questionIds: ["w13q3"] },
    { id: "recovery-debt", label: "Recovery Debt", questionIds: ["w13q4"] },
    { id: "transition", label: "Transition", questionIds: ["w13q5"] },
    { id: "emotional-recovery", label: "Emotional Recovery", questionIds: ["w13q6"] },
    { id: "compensatory-coping", label: "Compensatory Coping", questionIds: ["w13q7"] },
    { id: "recovery-permission", label: "Recovery Permission", questionIds: ["w13q8"] },
    { id: "reset-behaviour", label: "Reset Behaviour", questionIds: ["w13q9"] },
    { id: "sustainability", label: "Sustainability", questionIds: ["w13q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Recovery Debt",
      color: "red",
      interpretation:
        "Your responses suggest that workload recovery is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Fragile Recovery",
      color: "orange",
      interpretation:
        "You show some foundations of workload recovery, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Functional Recovery",
      color: "yellow",
      interpretation:
        "Your responses suggest a generally steady level of workload recovery, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong Recovery Capacity",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of workload recovery. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
