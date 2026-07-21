/**
 * W25. Workplace Influence Style
 * Profile-based: identifies the influence method most naturally used.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplaceInfluenceStyle: ProfileAssessmentConfig = {
  slug: "workplace-influence-style",
  order: 40,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Influence Style",
    subtitle: "How do you influence others at work?",
    description:
      "Identify the influence method you most naturally use when formal authority is absent.",
    purpose:
      "Identifies the influence method a person most naturally uses when formal authority is absent.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w25q1", "w25q5", "w25q9"],
  profileQuestions: [
    {
      id: "w25q1",
      text: "When you need agreement from a peer, you usually:",
      options: [
        { label: "Present evidence and logical reasoning", profileCode: "A" },
        { label: "Build the relationship and find shared interest", profileCode: "B" },
        { label: "Appeal to the bigger picture and shared values", profileCode: "C" },
        { label: "Use directness and personal conviction", profileCode: "D" },
      ],
    },
    {
      id: "w25q2",
      text: "Your strongest persuasion tool is:",
      options: [
        { label: "Data, analysis and preparation", profileCode: "A" },
        { label: "Empathy and rapport", profileCode: "B" },
        { label: "Vision and purpose", profileCode: "C" },
        { label: "Confidence and energy", profileCode: "D" },
      ],
    },
    {
      id: "w25q3",
      text: "When an idea faces resistance, you:",
      options: [
        { label: "Provide stronger evidence", profileCode: "A" },
        { label: "Listen and adapt the proposal", profileCode: "B" },
        { label: "Reframe the opportunity in broader terms", profileCode: "C" },
        { label: "Push with more conviction", profileCode: "D" },
      ],
    },
    {
      id: "w25q4",
      text: "You prepare for a persuasion conversation by:",
      options: [
        { label: "Gathering facts and anticipating objections", profileCode: "A" },
        { label: "Understanding the other person's interests", profileCode: "B" },
        { label: "Clarifying the vision and why it matters", profileCode: "C" },
        { label: "Deciding what you want and how firmly to push", profileCode: "D" },
      ],
    },
    {
      id: "w25q5",
      text: "Others are influenced by you mainly because you:",
      options: [
        { label: "Are well prepared", profileCode: "A" },
        { label: "Make them feel heard", profileCode: "B" },
        { label: "Connect to something meaningful", profileCode: "C" },
        { label: "Create momentum and urgency", profileCode: "D" },
      ],
    },
    {
      id: "w25q6",
      text: "When influencing upward, you:",
      options: [
        { label: "Lead with evidence and recommendations", profileCode: "A" },
        { label: "Build trust before making the request", profileCode: "B" },
        { label: "Link to the leader's priorities and values", profileCode: "C" },
        { label: "Be direct about what you need", profileCode: "D" },
      ],
    },
    {
      id: "w25q7",
      text: "Your influence risk is:",
      options: [
        { label: "Being perceived as detached or impersonal", profileCode: "A" },
        { label: "Yielding too much to maintain harmony", profileCode: "B" },
        { label: "Sounding abstract or idealistic", profileCode: "C" },
        { label: "Coming across as aggressive or impatient", profileCode: "D" },
      ],
    },
    {
      id: "w25q8",
      text: "In a cross-team negotiation, you:",
      options: [
        { label: "Build the logical case for mutual benefit", profileCode: "A" },
        { label: "Invest in the relationship first", profileCode: "B" },
        { label: "Frame the conversation around shared goals", profileCode: "C" },
        { label: "State your position clearly and negotiate directly", profileCode: "D" },
      ],
    },
    {
      id: "w25q9",
      text: "You feel most effective when influence is based on:",
      options: [
        { label: "Competence and credibility", profileCode: "A" },
        { label: "Trust and goodwill", profileCode: "B" },
        { label: "Shared meaning", profileCode: "C" },
        { label: "Action and visible results", profileCode: "D" },
      ],
    },
    {
      id: "w25q10",
      text: "Your development priority is:",
      options: [
        { label: "Adding emotional connection", profileCode: "A" },
        { label: "Increasing directness", profileCode: "B" },
        { label: "Grounding vision in practical evidence", profileCode: "C" },
        { label: "Listening before advocating", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Logical Persuader",
      meaning: "Influences through evidence, preparation and structured reasoning.",
      interpretation:
        "Your responses suggest you influence through evidence, preparation and structured reasoning.",
      nextStep: "Add emotional resonance and relationship investment.",
      color: "blue",
    },
    {
      code: "B",
      label: "Relationship Builder",
      meaning: "Influences through trust, empathy and personal connection.",
      interpretation:
        "Your responses suggest you influence through trust, empathy and personal connection.",
      nextStep: "Practise stating your position directly after rapport is established.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Visionary Inspirer",
      meaning: "Influences by connecting actions to purpose and shared meaning.",
      interpretation:
        "Your responses suggest you influence by connecting actions to purpose and shared meaning.",
      nextStep: "Ground the vision with evidence and practical next steps.",
      color: "purple",
    },
    {
      code: "D",
      label: "Direct Advocate",
      meaning: "Influences through confidence, clarity and personal conviction.",
      interpretation:
        "Your responses suggest you influence through confidence, clarity and personal conviction.",
      nextStep: "Listen and ask before advocating so others feel included.",
      color: "orange",
    },
  ],
  dimensions: [],
};
