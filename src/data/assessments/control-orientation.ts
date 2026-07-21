/**
 * W6. Control Orientation Assessment
 * Profile-based: explores whether a person responds to work outcomes through
 * personal agency, shared-system thinking, contextual adaptation or increased control.
 */

import type { ProfileAssessmentConfig } from "./types";

export const controlOrientation: ProfileAssessmentConfig = {
  slug: "control-orientation",
  order: 21,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Control Orientation Assessment",
    subtitle: "How do you relate to control at work?",
    description:
      "Explore whether you respond to outcomes through personal agency, shared thinking, adaptation or increased control.",
    purpose:
      "Explores whether a person responds to work outcomes through personal agency, shared-system thinking, contextual adaptation or increased control.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "settings",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w6q1", "w6q5", "w6q9"],
  profileQuestions: [
    {
      id: "w6q1",
      text: "When a project goes poorly, you first examine:",
      options: [
        { label: "Your choices and execution", profileCode: "A" },
        { label: "Your actions plus system and stakeholder factors", profileCode: "B" },
        { label: "The circumstances that made success difficult", profileCode: "C" },
        { label: "Where control or compliance was lost", profileCode: "D" },
      ],
    },
    {
      id: "w6q2",
      text: "When outcomes depend on several people, you:",
      options: [
        { label: "Focus on your own contribution", profileCode: "A" },
        { label: "Clarify shared ownership and dependencies", profileCode: "B" },
        { label: "Wait to see how others respond", profileCode: "C" },
        { label: "Take tighter control of the process", profileCode: "D" },
      ],
    },
    {
      id: "w6q3",
      text: "Uncertainty makes you want to:",
      options: [
        { label: "Act on what you can influence", profileCode: "A" },
        { label: "Map controllable and uncontrollable factors", profileCode: "B" },
        { label: "Adapt as events unfold", profileCode: "C" },
        { label: "Add rules, checks and approvals", profileCode: "D" },
      ],
    },
    {
      id: "w6q4",
      text: "When a decision is outside your authority, you:",
      options: [
        { label: "Find another way to influence it", profileCode: "A" },
        { label: "Engage the right people with a clear case", profileCode: "B" },
        { label: "Accept the constraint and adjust", profileCode: "C" },
        { label: "Try to regain direct control", profileCode: "D" },
      ],
    },
    {
      id: "w6q5",
      text: "People may describe you as:",
      options: [
        { label: "Accountable", profileCode: "A" },
        { label: "Realistic and collaborative", profileCode: "B" },
        { label: "Adaptable but reactive", profileCode: "C" },
        { label: "Controlling or highly vigilant", profileCode: "D" },
      ],
    },
    {
      id: "w6q6",
      text: "When delegating, you:",
      options: [
        { label: "Set the outcome and trust ownership", profileCode: "A" },
        { label: "Agree checkpoints and decision rights", profileCode: "B" },
        { label: "Adjust based on the person and situation", profileCode: "C" },
        { label: "Monitor closely and retain key decisions", profileCode: "D" },
      ],
    },
    {
      id: "w6q7",
      text: "A sudden external change leads you to:",
      options: [
        { label: "Identify the next useful action", profileCode: "A" },
        { label: "Re-plan with affected people", profileCode: "B" },
        { label: "Wait for more clarity before committing", profileCode: "C" },
        { label: "Increase control and reporting", profileCode: "D" },
      ],
    },
    {
      id: "w6q8",
      text: "Your stress rises most when:",
      options: [
        { label: "You have not acted on what you can control", profileCode: "A" },
        { label: "Ownership and dependencies are unclear", profileCode: "B" },
        { label: "The environment keeps changing", profileCode: "C" },
        { label: "Others make decisions without your oversight", profileCode: "D" },
      ],
    },
    {
      id: "w6q9",
      text: "Success is mainly produced by:",
      options: [
        { label: "Effort and choices", profileCode: "A" },
        { label: "Agency interacting with context and support", profileCode: "B" },
        { label: "Timing, opportunity and constraints", profileCode: "C" },
        { label: "Strong control and disciplined execution", profileCode: "D" },
      ],
    },
    {
      id: "w6q10",
      text: "Your growth priority is:",
      options: [
        { label: "Recognising real external constraints", profileCode: "A" },
        { label: "Keeping responsibility clear", profileCode: "B" },
        { label: "Strengthening proactive agency", profileCode: "C" },
        { label: "Tolerating shared control and uncertainty", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Internal Owner",
      meaning: "Believes personal choices and actions strongly shape outcomes.",
      interpretation:
        "Your responses suggest you believe personal choices and actions strongly shape outcomes.",
      nextStep:
        "Separate healthy ownership from taking responsibility for factors you cannot control.",
      color: "blue",
    },
    {
      code: "B",
      label: "Shared-Control Realist",
      meaning: "Balances personal agency with systems, resources and other people.",
      interpretation:
        "Your responses suggest you balance personal agency with systems, resources and other people.",
      nextStep:
        "Keep ownership explicit so balanced thinking does not become diffused accountability.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Context Responder",
      meaning: "Adapts primarily to external constraints and available opportunity.",
      interpretation:
        "Your responses suggest you adapt primarily to external constraints and available opportunity.",
      nextStep: "Name one action you can take before waiting for the environment to change.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Control Protector",
      meaning: "Seeks tight control to reduce uncertainty, dependence and surprise.",
      interpretation:
        "Your responses suggest you seek tight control to reduce uncertainty, dependence and surprise.",
      nextStep: "Delegate one reversible decision with clear boundaries instead of close control.",
      color: "orange",
    },
  ],
  dimensions: [],
};
