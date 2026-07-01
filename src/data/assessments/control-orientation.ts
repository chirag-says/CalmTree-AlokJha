/**
 * A21. Control Orientation Assessment
 * Tier: Professional
 * Explores how a person balances personal control, shared ownership, delegation and adaptation when outcomes matter.
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
    subtitle: "How do you balance control and trust at work?",
    description:
      "Explore how you balance personal oversight, shared ownership, delegation and adaptation when outcomes matter. Four profiles, ten workplace scenarios.",
    purpose:
      "Explores how a person balances personal control, shared ownership, delegation and adaptation when outcomes matter.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "settings",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["co1", "co4", "co9"],
  profileQuestions: [
    {
      id: "co1",
      text: "When delegating an important task, you prefer to:",
      options: [
        { label: "Review the method and progress frequently", profileCode: "A" },
        { label: "Agree roles and maintain shared progress updates", profileCode: "B" },
        {
          label: "Define the outcome and allow the person to choose their method",
          profileCode: "C",
        },
        { label: "Let the situation evolve and step in only if necessary", profileCode: "D" },
      ],
    },
    {
      id: "co2",
      text: "A project depends on another department. You:",
      options: [
        { label: "Create detailed follow-ups to ensure they deliver", profileCode: "A" },
        { label: "Set joint milestones and maintain regular coordination", profileCode: "B" },
        { label: "Trust their ownership once expectations are clear", profileCode: "C" },
        { label: "Plan to adjust your part if their delivery changes", profileCode: "D" },
      ],
    },
    {
      id: "co3",
      text: "When quality is inconsistent, your first instinct is to:",
      options: [
        { label: "Take closer control of the work yourself", profileCode: "A" },
        { label: "Bring people together to reset shared standards", profileCode: "B" },
        { label: "Coach the owner and let them correct it", profileCode: "C" },
        { label: "Change the plan to work around the limitation", profileCode: "D" },
      ],
    },
    {
      id: "co4",
      text: "Which situation is most uncomfortable?",
      options: [
        { label: "Not knowing exactly how work is being done", profileCode: "A" },
        { label: "People working separately without coordination", profileCode: "B" },
        { label: "People waiting for approval instead of taking ownership", profileCode: "C" },
        {
          label: "Being expected to control factors that are inherently unpredictable",
          profileCode: "D",
        },
      ],
    },
    {
      id: "co5",
      text: "When plans are disrupted by events outside your control, you:",
      options: [
        { label: "Try to regain control through tighter planning", profileCode: "A" },
        { label: "Coordinate everyone around a revised plan", profileCode: "B" },
        { label: "Ask owners to adapt their areas independently", profileCode: "C" },
        { label: "Accept the change and improvise around it", profileCode: "D" },
      ],
    },
    {
      id: "co6",
      text: "Your ideal team environment has:",
      options: [
        { label: "Clear supervision and dependable standards", profileCode: "A" },
        { label: "Shared goals and transparent collaboration", profileCode: "B" },
        { label: "High autonomy with accountability for results", profileCode: "C" },
        { label: "Freedom to respond as circumstances require", profileCode: "D" },
      ],
    },
    {
      id: "co7",
      text: "If someone chooses a different method but gets a good result, you:",
      options: [
        { label: "Still want to understand and standardise the method", profileCode: "A" },
        { label: "Discuss what the team can learn from it", profileCode: "B" },
        { label: "Accept it because the outcome was achieved", profileCode: "C" },
        { label: "See it as proof that flexibility matters", profileCode: "D" },
      ],
    },
    {
      id: "co8",
      text: "In uncertain situations, you are reassured by:",
      options: [
        { label: "Direct visibility and personal control", profileCode: "A" },
        { label: "Frequent communication and shared decisions", profileCode: "B" },
        { label: "Capable people owning their areas", profileCode: "C" },
        { label: "Confidence that you can adjust later", profileCode: "D" },
      ],
    },
    {
      id: "co9",
      text: "When overloaded, you usually:",
      options: [
        { label: "Hold onto key work because errors would be too costly", profileCode: "A" },
        { label: "Distribute work but keep everyone closely connected", profileCode: "B" },
        { label: "Delegate decisions as well as tasks", profileCode: "C" },
        { label: "Reduce expectations and adapt to what is possible", profileCode: "D" },
      ],
    },
    {
      id: "co10",
      text: "A useful reminder for you may be:",
      options: [
        { label: "Not everything important must be personally controlled", profileCode: "A" },
        { label: "Shared ownership still needs clear accountability", profileCode: "B" },
        { label: "Autonomy works best with context and feedback loops", profileCode: "C" },
        { label: "Adaptation should not replace deliberate influence", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Hands-On Controller",
      meaning: "Feels secure when personally monitoring decisions, quality and progress.",
      interpretation:
        "Your responses suggest you feel most confident when you can directly monitor progress and quality. Personal visibility is your primary way of maintaining standards.",
      nextStep: "Delegate outcome plus checkpoints rather than retaining every task.",
      color: "blue",
    },
    {
      code: "B",
      label: "Shared-Ownership Coordinator",
      meaning: "Prefers clear collaboration, mutual visibility and collective responsibility.",
      interpretation:
        "Your responses suggest you create shared understanding and keep everyone connected. You prefer collective ownership with transparent progress over solo control.",
      nextStep: "Clarify final decision rights so consensus does not slow action.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Autonomy-Enabling Delegator",
      meaning: "Gives people ownership and focuses on outcomes rather than method.",
      interpretation:
        "Your responses suggest you give people real ownership and trust them to find the best path. You focus on results rather than prescribing how work is done.",
      nextStep: "Match autonomy to capability and agree escalation signals.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Adaptive Responder",
      meaning: "Accepts limited control and adjusts pragmatically to circumstances.",
      interpretation:
        "Your responses suggest you accept that much is outside your direct control and focus your energy on adapting well to what emerges.",
      nextStep: "Identify the few controllable levers where proactive action will matter most.",
      color: "orange",
    },
  ],
  dimensions: [],
};
