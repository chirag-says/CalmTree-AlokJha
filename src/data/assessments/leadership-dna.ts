/**
 * A9. Leadership DNA Assessment
 * Pack 4 — Leadership, Relationships and Influence
 * Profile-based assessment identifying leadership contribution style.
 */

import type { ProfileAssessmentConfig } from "./types";

export const leadershipDNA: ProfileAssessmentConfig = {
  slug: "leadership-dna",
  order: 9,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Leadership DNA Assessment",
    subtitle: "What kind of leader are you?",
    description:
      "Discover your leadership style across personal example, management discipline, relational influence and vision building.",
    purpose: "Identifies the leadership contribution a person most naturally uses.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "briefcase",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["a9q1", "a9q5", "a9q9"],
  profileQuestions: [
    {
      id: "a9q1",
      text: "A team is uncertain about a new assignment. You first:",
      options: [
        { label: "Clarify what you can personally take ownership of", profileCode: "A" },
        { label: "Define roles, milestones and decision points", profileCode: "B" },
        { label: "Invite concerns and build shared understanding", profileCode: "C" },
        { label: "Explain the larger opportunity and desired future", profileCode: "D" },
      ],
    },
    {
      id: "a9q2",
      text: "When performance drops, you tend to:",
      options: [
        { label: "Improve your own contribution and learn what is missing", profileCode: "A" },
        { label: "Review standards, resources and accountability", profileCode: "B" },
        { label: "Coach the people involved and explore obstacles", profileCode: "C" },
        { label: "Reconnect the work to purpose and reset direction", profileCode: "D" },
      ],
    },
    {
      id: "a9q3",
      text: "People are most likely to follow you because you:",
      options: [
        { label: "Work hard and keep developing", profileCode: "A" },
        { label: "Are dependable and organised", profileCode: "B" },
        { label: "Listen, communicate and build trust", profileCode: "C" },
        { label: "Create belief in what could be achieved", profileCode: "D" },
      ],
    },
    {
      id: "a9q4",
      text: "In a disagreement, you usually:",
      options: [
        { label: "Observe carefully before taking a stronger role", profileCode: "A" },
        { label: "Return to facts, roles and agreed process", profileCode: "B" },
        { label: "Help people understand one another", profileCode: "C" },
        { label: "Reframe the disagreement around the shared goal", profileCode: "D" },
      ],
    },
    {
      id: "a9q5",
      text: "Your strongest leadership contribution is:",
      options: [
        { label: "Personal responsibility", profileCode: "A" },
        { label: "Execution discipline", profileCode: "B" },
        { label: "Relationship and influence", profileCode: "C" },
        { label: "Vision and transformation", profileCode: "D" },
      ],
    },
    {
      id: "a9q6",
      text: "When change is required, you:",
      options: [
        { label: "Learn the new expectations and model them", profileCode: "A" },
        { label: "Create a plan and track implementation", profileCode: "B" },
        { label: "Build readiness through dialogue", profileCode: "C" },
        { label: "Challenge the old assumptions and mobilise action", profileCode: "D" },
      ],
    },
    {
      id: "a9q7",
      text: "You are most uncomfortable when:",
      options: [
        { label: "You are expected to lead without enough experience", profileCode: "A" },
        { label: "There is no ownership or operating discipline", profileCode: "B" },
        { label: "People are disengaged or unheard", profileCode: "C" },
        { label: "The group has no ambition or direction", profileCode: "D" },
      ],
    },
    {
      id: "a9q8",
      text: "You develop other people mainly by:",
      options: [
        { label: "Sharing what you are learning", profileCode: "A" },
        { label: "Setting clear expectations and reviewing progress", profileCode: "B" },
        { label: "Coaching, encouraging and asking questions", profileCode: "C" },
        { label: "Giving them a larger challenge and possibility", profileCode: "D" },
      ],
    },
    {
      id: "a9q9",
      text: "Under pressure, you rely on:",
      options: [
        { label: "Personal effort and learning", profileCode: "A" },
        { label: "Structure, priorities and control", profileCode: "B" },
        { label: "Communication and collective support", profileCode: "C" },
        { label: "Decisive direction and confidence", profileCode: "D" },
      ],
    },
    {
      id: "a9q10",
      text: "Your next leadership step is most likely to involve:",
      options: [
        { label: "Building confidence and leadership identity", profileCode: "A" },
        { label: "Delegating beyond process control", profileCode: "B" },
        { label: "Making firmer decisions when consensus is impossible", profileCode: "C" },
        { label: "Turning vision into repeatable systems", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Emerging Leader",
      meaning: "Builds leadership through self-management, learning and dependable contribution.",
      interpretation:
        "Your responses suggest you build leadership through self-management, learning and dependable contribution.",
      nextStep: "Take ownership of a small leadership situation and request specific feedback.",
      color: "blue",
    },
    {
      code: "B",
      label: "Reliable Manager",
      meaning: "Creates clarity, process, accountability and consistent delivery.",
      interpretation:
        "Your responses suggest you create clarity, process, accountability and consistent delivery.",
      nextStep: "Practise delegation and coaching so structure does not become over-control.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Influential Guide",
      meaning: "Builds commitment through trust, coaching and communication.",
      interpretation:
        "Your responses suggest you build commitment through trust, coaching and communication.",
      nextStep: "Pair empathy with clear standards and timely decisions.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Visionary Builder",
      meaning: "Creates direction, possibility and momentum around a larger goal.",
      interpretation:
        "Your responses suggest you create direction, possibility and momentum around a larger goal.",
      nextStep: "Translate the vision into milestones, owners and operating rhythms.",
      color: "purple",
    },
  ],
  dimensions: [],
};
