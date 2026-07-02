/**
 * A36. Natural Leadership Orientation
 * Tier: Professional
 * Identifies the leadership approach a person most naturally uses to create direction, performance and commitment.
 */

import type { ProfileAssessmentConfig } from "./types";

export const naturalLeadershipOrientation: ProfileAssessmentConfig = {
  slug: "natural-leadership-orientation",
  order: 36,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Natural Leadership Orientation",
    subtitle: "What is your natural leadership style?",
    description:
      "Identify the leadership approach you most naturally use to create direction, performance and commitment. Five profiles, ten workplace scenarios.",
    purpose:
      "Identifies the leadership approach a person most naturally uses to create direction, performance and commitment.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "award",
    productCategory: "Leadership & Teams",
    isFree: true,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["nlo1", "nlo4", "nlo8"],
  profileQuestions: [
    {
      id: "nlo1",
      text: "When a team is uncertain, you first:",
      options: [
        { label: "Set direction and clarify what must happen", profileCode: "A" },
        { label: "Ask questions that help people find their own way", profileCode: "B" },
        { label: "Bring the group together to build a shared plan", profileCode: "C" },
        { label: "Explain the technical or professional approach required", profileCode: "D" },
        { label: "Reconnect the team to the larger purpose and possibility", profileCode: "E" },
      ],
    },
    {
      id: "nlo2",
      text: "When performance falls, you tend to:",
      options: [
        { label: "Reset expectations and accountability", profileCode: "A" },
        { label: "Explore what is blocking the person and coach improvement", profileCode: "B" },
        { label: "Review the situation with the team and agree changes", profileCode: "C" },
        { label: "Examine capability, method and quality standards", profileCode: "D" },
        { label: "Re-energise people around the significance of the goal", profileCode: "E" },
      ],
    },
    {
      id: "nlo3",
      text: "Your strongest contribution as a leader is:",
      options: [
        { label: "Decisiveness and clarity", profileCode: "A" },
        { label: "Developing people's confidence and capability", profileCode: "B" },
        { label: "Creating commitment and cooperation", profileCode: "C" },
        { label: "Providing expert judgement and standards", profileCode: "D" },
        { label: "Creating belief in a meaningful direction", profileCode: "E" },
      ],
    },
    {
      id: "nlo4",
      text: "In a crisis, you are most likely to:",
      options: [
        { label: "Take command and assign actions", profileCode: "A" },
        { label: "Support people to stay capable under pressure", profileCode: "B" },
        { label: "Coordinate collective information and response", profileCode: "C" },
        { label: "Diagnose the problem and prescribe the best method", profileCode: "D" },
        {
          label: "Frame the challenge and mobilise people around a bold response",
          profileCode: "E",
        },
      ],
    },
    {
      id: "nlo5",
      text: "When delegating, you emphasise:",
      options: [
        { label: "Expected output, deadline and accountability", profileCode: "A" },
        { label: "Learning, questions and progressive independence", profileCode: "B" },
        { label: "Shared context and collaboration points", profileCode: "C" },
        { label: "Correct method and professional quality", profileCode: "D" },
        { label: "Connection between the task and the wider mission", profileCode: "E" },
      ],
    },
    {
      id: "nlo6",
      text: "A team member proposes a different approach. You:",
      options: [
        { label: "Decide whether it supports the required outcome", profileCode: "A" },
        { label: "Ask them to explain their reasoning and learning", profileCode: "B" },
        { label: "Invite the team to examine the trade-offs", profileCode: "C" },
        { label: "Evaluate its technical validity and standards", profileCode: "D" },
        { label: "Consider whether it advances the future direction", profileCode: "E" },
      ],
    },
    {
      id: "nlo7",
      text: "People are most likely to follow you because:",
      options: [
        { label: "They know where they stand and what to do", profileCode: "A" },
        { label: "They feel supported to grow", profileCode: "B" },
        { label: "They feel heard and involved", profileCode: "C" },
        { label: "They trust your competence", profileCode: "D" },
        { label: "They believe in the direction you describe", profileCode: "E" },
      ],
    },
    {
      id: "nlo8",
      text: "Your possible leadership blind spot is:",
      options: [
        { label: "Becoming too controlling or abrupt", profileCode: "A" },
        { label: "Avoiding hard performance decisions", profileCode: "B" },
        { label: "Taking too long to reach consensus", profileCode: "C" },
        { label: "Over-relying on your own expertise", profileCode: "D" },
        { label: "Underestimating execution detail", profileCode: "E" },
      ],
    },
    {
      id: "nlo9",
      text: "A successful team should primarily be:",
      options: [
        { label: "Disciplined and accountable", profileCode: "A" },
        { label: "Capable and continuously developing", profileCode: "B" },
        { label: "Connected and mutually responsible", profileCode: "C" },
        { label: "Skilled and committed to excellence", profileCode: "D" },
        { label: "Inspired and aligned to a compelling purpose", profileCode: "E" },
      ],
    },
    {
      id: "nlo10",
      text: "When starting a major initiative, you begin with:",
      options: [
        { label: "Direction, roles and non-negotiables", profileCode: "A" },
        { label: "Capability needs and development conversations", profileCode: "B" },
        { label: "Stakeholder involvement and shared design", profileCode: "C" },
        { label: "Evidence, method and standards", profileCode: "D" },
        { label: "Purpose, ambition and a picture of success", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Directive Leader",
      meaning: "Creates clarity through decisions, standards and direct accountability.",
      interpretation:
        "Your responses suggest you lead through clarity. You define direction, set standards and hold people accountable. People follow you because they know exactly where they stand and what they must do.",
      nextStep: "Explain the rationale and invite useful challenge before closing decisions.",
      color: "blue",
    },
    {
      code: "B",
      label: "Coaching Leader",
      meaning: "Develops people through questions, feedback and gradual ownership.",
      interpretation:
        "Your responses suggest you lead through development. You grow capability, ask rather than tell and give people the ownership they need to perform at their best.",
      nextStep:
        "Know when the situation needs a decision rather than another developmental conversation.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Collaborative Leader",
      meaning: "Builds commitment through participation and shared problem-solving.",
      interpretation:
        "Your responses suggest you lead through inclusion. You bring people into decisions, build shared understanding and create commitment through genuine participation.",
      nextStep: "Clarify decision rights and avoid consensus on every issue.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Expert Leader",
      meaning: "Leads through competence, insight and high professional standards.",
      interpretation:
        "Your responses suggest you lead through mastery. People follow your judgement because your expertise is visible, credible and consistently applied.",
      nextStep: "Translate expertise into accessible guidance and develop other experts.",
      color: "purple",
    },
    {
      code: "E",
      label: "Visionary Leader",
      meaning: "Creates energy through purpose, possibility and future direction.",
      interpretation:
        "Your responses suggest you lead through inspiration. You articulate a future that people want to reach and generate the belief and energy needed to get there.",
      nextStep: "Connect inspiration to priorities, resources and operational follow-through.",
      color: "orange",
    },
  ],
  dimensions: [],
};
