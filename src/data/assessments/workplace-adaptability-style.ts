/**
 * A25. Workplace Adaptability Style
 * Tier: Professional
 * Shows how a person responds to new systems, shifting priorities, unfamiliar roles and repeated workplace change.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplaceAdaptabilityStyle: ProfileAssessmentConfig = {
  slug: "workplace-adaptability-style",
  order: 25,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Adaptability Style",
    subtitle: "How do you respond to change at work?",
    description:
      "See how you respond to new systems, shifting priorities and repeated workplace change. Four profiles, ten situational questions.",
    purpose:
      "Shows how a person responds to new systems, shifting priorities, unfamiliar roles and repeated workplace change.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "refresh-cw",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["was10q1", "was10q3", "was10q8"],
  profileQuestions: [
    {
      id: "was10q1",
      text: "A new system replaces one you know well. You:",
      options: [
        { label: "Prefer to keep current system unless benefit is proven", profileCode: "A" },
        { label: "Learn the reason, plan transition and then adjust", profileCode: "B" },
        { label: "Explore the new system and learn by using it", profileCode: "C" },
        { label: "Encourage early adoption and help others see the opportunity", profileCode: "D" },
      ],
    },
    {
      id: "was10q2",
      text: "When priorities change suddenly, you:",
      options: [
        { label: "Need time to reorganise and regain stability", profileCode: "A" },
        { label: "Clarify what changed and revise the plan", profileCode: "B" },
        { label: "Shift quickly and work out details while moving", profileCode: "C" },
        { label: "Use the change to rethink the wider approach", profileCode: "D" },
      ],
    },
    {
      id: "was10q3",
      text: "A restructuring is announced. Your first concern is:",
      options: [
        { label: "What stability, role clarity and routines will be lost", profileCode: "A" },
        { label: "What the new structure means and how transition will happen", profileCode: "B" },
        { label: "What new possibilities and ways of working may emerge", profileCode: "C" },
        { label: "How to help shape the change rather than only respond to it", profileCode: "D" },
      ],
    },
    {
      id: "was10q4",
      text: "When learning unfamiliar work, you prefer:",
      options: [
        { label: "Clear instructions and proven examples", profileCode: "A" },
        { label: "A structured orientation and time to practise", profileCode: "B" },
        { label: "Hands-on experimentation with quick feedback", profileCode: "C" },
        { label: "Freedom to redesign the approach from the start", profileCode: "D" },
      ],
    },
    {
      id: "was10q5",
      text: "People may experience you during change as:",
      options: [
        { label: "A source of continuity and caution", profileCode: "A" },
        { label: "A calm planner who helps people adjust", profileCode: "B" },
        { label: "A flexible problem-solver", profileCode: "C" },
        { label: "An energetic advocate for movement", profileCode: "D" },
      ],
    },
    {
      id: "was10q6",
      text: "Which change is hardest for you?",
      options: [
        { label: "Change that removes dependable routines", profileCode: "A" },
        { label: "Change without a clear rationale or transition plan", profileCode: "B" },
        { label: "Change restricted by too many rules", profileCode: "C" },
        { label: "Change that is too slow or limited in ambition", profileCode: "D" },
      ],
    },
    {
      id: "was10q7",
      text: "When a pilot produces mixed results, you:",
      options: [
        { label: "Prefer returning to the established method", profileCode: "A" },
        { label: "Review evidence and improve the implementation plan", profileCode: "B" },
        { label: "Modify the experiment and test again", profileCode: "C" },
        { label: "Use the learning to push for a broader redesign", profileCode: "D" },
      ],
    },
    {
      id: "was10q8",
      text: "Your confidence during change comes from:",
      options: [
        { label: "Continuity, experience and proven practice", profileCode: "A" },
        { label: "Preparation, communication and support", profileCode: "B" },
        { label: "Ability to learn and adjust quickly", profileCode: "C" },
        { label: "Belief in the future direction and ability to influence it", profileCode: "D" },
      ],
    },
    {
      id: "was10q9",
      text: "If colleagues resist change, you tend to:",
      options: [
        { label: "Understand why they want to protect what works", profileCode: "A" },
        { label: "Explain the transition and address practical concerns", profileCode: "B" },
        { label: "Help them try the new approach in a low-risk way", profileCode: "C" },
        { label: "Challenge the status quo and create momentum", profileCode: "D" },
      ],
    },
    {
      id: "was10q10",
      text: "You are most engaged when change is:",
      options: [
        { label: "Necessary, limited and well controlled", profileCode: "A" },
        { label: "Clearly explained and competently managed", profileCode: "B" },
        { label: "Flexible, iterative and open to learning", profileCode: "C" },
        { label: "Transformative and capable of creating a better future", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Steady Preserver",
      meaning: "Values continuity, proven methods and stable expectations.",
      interpretation:
        "Your responses suggest you value stability and continuity. You protect what works, absorb change carefully and ensure transitions do not discard hard-won reliability.",
      nextStep: "Ask what must remain stable while testing one change at a time.",
      color: "blue",
    },
    {
      code: "B",
      label: "Prepared Adapter",
      meaning: "Adjusts well when the rationale, plan and support are clear.",
      interpretation:
        "Your responses suggest you adapt effectively when change is well-managed. You adjust through understanding and planning, not through instinct or pressure.",
      nextStep: "Act before every detail is settled; use early feedback to refine.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Agile Experimenter",
      meaning: "Adapts through trying, learning and rapid adjustment.",
      interpretation:
        "Your responses suggest you are comfortable learning by doing. You prefer to explore a new way than read about it, and you recover quickly from what does not work.",
      nextStep: "Document learning and avoid change for novelty alone.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Change Catalyst",
      meaning: "Actively promotes new approaches and helps others move forward.",
      interpretation:
        "Your responses suggest you are drawn to transformation. You see possibility where others see risk, and you help organisations move from comfortable but limited to capable and forward-facing.",
      nextStep: "Acknowledge transition costs and protect what already works.",
      color: "orange",
    },
  ],
  dimensions: [],
};
