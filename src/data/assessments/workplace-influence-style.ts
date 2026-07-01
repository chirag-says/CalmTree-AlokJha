/**
 * A40. Workplace Influence Style
 * Tier: Professional
 * Identifies the primary way a person gains support, changes minds and moves stakeholders towards action.
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
    subtitle: "How do you naturally move people to action?",
    description:
      "Identify your primary way of gaining support, changing minds and moving stakeholders towards action. Five profiles, ten questions.",
    purpose:
      "Identifies the primary way a person gains support, changes minds and moves stakeholders towards action.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["wis25q1", "wis25q5", "wis25q9"],
  profileQuestions: [
    {
      id: "wis25q1",
      text: "To gain support for a new idea, you first:",
      options: [
        { label: "Build the evidence and reasoning", profileCode: "A" },
        { label: "Understand the people and establish trust", profileCode: "B" },
        { label: "Clarify who can decide and what standards apply", profileCode: "C" },
        { label: "Start conversations and keep following up", profileCode: "D" },
        { label: "Describe the opportunity and why it matters", profileCode: "E" },
      ],
    },
    {
      id: "wis25q2",
      text: "When someone resists your proposal, you:",
      options: [
        { label: "Address their assumptions with facts", profileCode: "A" },
        { label: "Explore their concerns and relationship context", profileCode: "B" },
        { label: "Clarify expectations, responsibilities or consequences", profileCode: "C" },
        { label: "Continue engaging and find another route forward", profileCode: "D" },
        { label: "Reframe the proposal around a more compelling future", profileCode: "E" },
      ],
    },
    {
      id: "wis25q3",
      text: "Your strongest persuasive asset is:",
      options: [
        { label: "Credibility of analysis", profileCode: "A" },
        { label: "Personal trust and empathy", profileCode: "B" },
        { label: "Position, mandate or procedural clarity", profileCode: "C" },
        { label: "Energy, consistency and persistence", profileCode: "D" },
        { label: "Story, purpose and possibility", profileCode: "E" },
      ],
    },
    {
      id: "wis25q4",
      text: "In a stakeholder meeting, you naturally focus on:",
      options: [
        { label: "The argument and supporting data", profileCode: "A" },
        { label: "The people, concerns and alliances", profileCode: "B" },
        { label: "The decision process and authority", profileCode: "C" },
        { label: "What action can be secured now", profileCode: "D" },
        { label: "The larger narrative and desired future", profileCode: "E" },
      ],
    },
    {
      id: "wis25q5",
      text: "When your influence attempt fails, you first reconsider:",
      options: [
        { label: "Whether the logic was clear and credible", profileCode: "A" },
        { label: "Whether enough trust or understanding existed", profileCode: "B" },
        { label: "Whether decision rights and expectations were clear", profileCode: "C" },
        { label: "Whether you followed up strongly enough", profileCode: "D" },
        { label: "Whether the message was meaningful and inspiring", profileCode: "E" },
      ],
    },
    {
      id: "wis25q6",
      text: "Which request is most natural for you?",
      options: [
        { label: "Here is the evidence; let us choose the strongest option", profileCode: "A" },
        { label: "Let us find an approach that works for all of us", profileCode: "B" },
        { label: "This is the required direction and responsibility", profileCode: "C" },
        { label: "Let us agree the next step and keep moving", profileCode: "D" },
        { label: "Imagine what becomes possible if we do this well", profileCode: "E" },
      ],
    },
    {
      id: "wis25q7",
      text: "People are persuaded by you because:",
      options: [
        { label: "Your reasoning is clear", profileCode: "A" },
        { label: "They trust your intention", profileCode: "B" },
        { label: "They understand the authority or standard behind the request", profileCode: "C" },
        { label: "You create momentum and do not let the issue disappear", profileCode: "D" },
        { label: "You help them see significance and possibility", profileCode: "E" },
      ],
    },
    {
      id: "wis25q8",
      text: "Your influence blind spot may be:",
      options: [
        { label: "Underestimating emotions or politics", profileCode: "A" },
        { label: "Avoiding direct asks to protect relationships", profileCode: "B" },
        { label: "Over-relying on status or rules", profileCode: "C" },
        { label: "Pushing when listening would help", profileCode: "D" },
        { label: "Inspiring without enough practical detail", profileCode: "E" },
      ],
    },
    {
      id: "wis25q9",
      text: "When influencing across teams without authority, you rely most on:",
      options: [
        { label: "A strong business case", profileCode: "A" },
        { label: "Relationships and reciprocal support", profileCode: "B" },
        { label: "Governance, policy or senior sponsorship", profileCode: "C" },
        { label: "Repeated engagement and visible progress", profileCode: "D" },
        { label: "Shared purpose and a compelling outcome", profileCode: "E" },
      ],
    },
    {
      id: "wis25q10",
      text: "To become more versatile, you most need to add:",
      options: [
        { label: "Audience empathy and narrative", profileCode: "A" },
        { label: "Clearer evidence and direct requests", profileCode: "B" },
        { label: "Consultation and relational trust", profileCode: "C" },
        { label: "Reflection and deeper listening", profileCode: "D" },
        { label: "Execution detail and measurable proof", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Logical Influencer",
      meaning: "Persuades through evidence, structure and clear reasoning.",
      interpretation:
        "Your responses suggest you persuade through logic. You build a clear case, use evidence credibly and trust that the strength of your reasoning will carry the argument.",
      nextStep: "Connect facts to the audience's priorities and emotions, not only to correctness.",
      color: "blue",
    },
    {
      code: "B",
      label: "Relationship Builder",
      meaning: "Influences through trust, empathy and personal credibility.",
      interpretation:
        "Your responses suggest you influence through relationship. People act because they trust you, feel understood by you and believe your intentions are aligned with theirs.",
      nextStep:
        "Make the proposal and desired action explicit rather than relying on goodwill alone.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Authority Driver",
      meaning: "Uses role clarity, standards and decision rights to create movement.",
      interpretation:
        "Your responses suggest you influence through authority and process. You establish what is required, who is responsible and what standards apply — and people align accordingly.",
      nextStep:
        "Use authority transparently and invite challenge where better information may exist.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Persistent Mobiliser",
      meaning: "Builds momentum through follow-up, energy and repeated action.",
      interpretation:
        "Your responses suggest you influence through persistence. You keep the issue alive, maintain energy and create movement through consistent follow-through rather than a single persuasive moment.",
      nextStep: "Check whether resistance contains useful information before pushing harder.",
      color: "orange",
    },
    {
      code: "E",
      label: "Vision Communicator",
      meaning: "Creates commitment through purpose, narrative and an attractive future.",
      interpretation:
        "Your responses suggest you influence through inspiration. You connect work to a compelling future, and people act because they believe in the direction you describe.",
      nextStep: "Translate inspiration into evidence, ownership and concrete next steps.",
      color: "purple",
    },
  ],
  dimensions: [],
};
