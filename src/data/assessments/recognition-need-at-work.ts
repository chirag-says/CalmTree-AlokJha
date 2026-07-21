/**
 * W7. Recognition Need at Work
 * Profile-based: identifies the form of recognition that most strongly
 * supports motivation and perceived value at work.
 */

import type { ProfileAssessmentConfig } from "./types";

export const recognitionNeedAtWork: ProfileAssessmentConfig = {
  slug: "recognition-need-at-work",
  order: 22,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Recognition Need at Work",
    subtitle: "What kind of recognition motivates you?",
    description:
      "Identify the form of recognition that most strongly supports your motivation and perceived value at work.",
    purpose:
      "Identifies the form of recognition that most strongly supports motivation and perceived value at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "award",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w7q1", "w7q5", "w7q9"],
  profileQuestions: [
    {
      id: "w7q1",
      text: "After strong work, the most satisfying response is:",
      options: [
        { label: "Knowing the work was useful and well done", profileCode: "A" },
        { label: "A sincere private thank-you", profileCode: "B" },
        { label: "Public acknowledgement", profileCode: "C" },
        { label: "A new opportunity or advancement", profileCode: "D" },
      ],
    },
    {
      id: "w7q2",
      text: "When your contribution is not recognised, you:",
      options: [
        { label: "Remain motivated if the work matters", profileCode: "A" },
        { label: "Feel disappointed but continue", profileCode: "B" },
        { label: "Lose energy because visibility matters", profileCode: "C" },
        { label: "Question whether the role supports progression", profileCode: "D" },
      ],
    },
    {
      id: "w7q3",
      text: "Praise feels most meaningful when it is:",
      options: [
        { label: "Connected to quality or impact", profileCode: "A" },
        { label: "Personal and specific", profileCode: "B" },
        { label: "Visible to the wider group", profileCode: "C" },
        { label: "Linked to greater responsibility", profileCode: "D" },
      ],
    },
    {
      id: "w7q4",
      text: "You are most likely to speak about an achievement to:",
      options: [
        { label: "Share the learning, not the credit", profileCode: "A" },
        { label: "Tell a trusted person", profileCode: "B" },
        { label: "Ensure the contribution is seen", profileCode: "C" },
        { label: "Build a case for the next role or opportunity", profileCode: "D" },
      ],
    },
    {
      id: "w7q5",
      text: "A reward system should primarily recognise:",
      options: [
        { label: "Contribution and quality", profileCode: "A" },
        { label: "Consistent effort and reliability", profileCode: "B" },
        { label: "Visible results and standout achievement", profileCode: "C" },
        { label: "Readiness for broader responsibility", profileCode: "D" },
      ],
    },
    {
      id: "w7q6",
      text: "When someone else receives credit for joint work, you:",
      options: [
        { label: "Focus on the result unless the pattern repeats", profileCode: "A" },
        { label: "Raise it privately", profileCode: "B" },
        { label: "Correct the record openly", profileCode: "C" },
        { label: "Document your contribution for future progression", profileCode: "D" },
      ],
    },
    {
      id: "w7q7",
      text: "You feel most valued when:",
      options: [
        { label: "Your work makes a difference", profileCode: "A" },
        { label: "Someone notices the effort personally", profileCode: "B" },
        { label: "Your contribution is publicly acknowledged", profileCode: "C" },
        { label: "You are trusted with more scope", profileCode: "D" },
      ],
    },
    {
      id: "w7q8",
      text: "Your biggest recognition frustration is:",
      options: [
        { label: "Meaningless praise", profileCode: "A" },
        { label: "Being taken for granted", profileCode: "B" },
        { label: "Invisibility", profileCode: "C" },
        { label: "No path to advancement", profileCode: "D" },
      ],
    },
    {
      id: "w7q9",
      text: "If recognition is scarce, you usually:",
      options: [
        { label: "Rely on your own standards", profileCode: "A" },
        { label: "Seek direct feedback", profileCode: "B" },
        { label: "Increase visibility", profileCode: "C" },
        { label: "Look for a role with more progression", profileCode: "D" },
      ],
    },
    {
      id: "w7q10",
      text: "Your development priority is:",
      options: [
        { label: "Communicating impact without discomfort", profileCode: "A" },
        { label: "Asking for specific acknowledgement or feedback", profileCode: "B" },
        { label: "Separating visibility from comparison", profileCode: "C" },
        { label: "Defining success beyond title alone", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Intrinsic Contributor",
      meaning: "Draws satisfaction mainly from quality, usefulness and personal standards.",
      interpretation:
        "Your responses suggest you draw satisfaction mainly from quality, usefulness and personal standards.",
      nextStep: "Make impact visible so intrinsic motivation does not lead to being overlooked.",
      color: "blue",
    },
    {
      code: "B",
      label: "Private Appreciator",
      meaning: "Values sincere acknowledgement without high visibility.",
      interpretation:
        "Your responses suggest you value sincere acknowledgement without high visibility.",
      nextStep: "Request specific feedback rather than waiting for others to notice.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Visible Recognition Seeker",
      meaning: "Feels energised when contribution is publicly noticed.",
      interpretation:
        "Your responses suggest you feel energised when contribution is publicly noticed.",
      nextStep: "Separate healthy visibility from constant comparison with others.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Advancement-Oriented Achiever",
      meaning: "Connects recognition with responsibility, influence or progression.",
      interpretation:
        "Your responses suggest you connect recognition with responsibility, influence or progression.",
      nextStep: "Define success beyond titles so progress remains sustainable and meaningful.",
      color: "purple",
    },
  ],
  dimensions: [],
};
