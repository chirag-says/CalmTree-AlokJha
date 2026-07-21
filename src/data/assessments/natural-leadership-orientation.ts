/**
 * W21. Natural Leadership Orientation
 * Profile-based: identifies the leadership contribution most used.
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
      "Identify the leadership contribution you most naturally use in teams and projects.",
    purpose: "Identifies the leadership contribution a person most naturally relies on.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "briefcase",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w21q1", "w21q5", "w21q9"],
  profileQuestions: [
    {
      id: "w21q1",
      text: "A project needs a leader. You naturally:",
      options: [
        { label: "Create the plan and organise the team", profileCode: "A" },
        { label: "Build relationships and align people", profileCode: "B" },
        { label: "Clarify the strategic direction", profileCode: "C" },
        { label: "Roll up your sleeves and deliver the hardest part", profileCode: "D" },
      ],
    },
    {
      id: "w21q2",
      text: "Your influence comes mainly from:",
      options: [
        { label: "Competence and reliability", profileCode: "A" },
        { label: "Connection and trust", profileCode: "B" },
        { label: "Vision and inspiration", profileCode: "C" },
        { label: "Action and results", profileCode: "D" },
      ],
    },
    {
      id: "w21q3",
      text: "When a team member underperforms, you:",
      options: [
        { label: "Review expectations and resources", profileCode: "A" },
        { label: "Have a supportive conversation", profileCode: "B" },
        { label: "Reconnect them to the bigger goal", profileCode: "C" },
        { label: "Pick up the critical tasks yourself", profileCode: "D" },
      ],
    },
    {
      id: "w21q4",
      text: "You add most value when:",
      options: [
        { label: "Structure is needed", profileCode: "A" },
        { label: "People need support", profileCode: "B" },
        { label: "Direction is unclear", profileCode: "C" },
        { label: "Execution is behind", profileCode: "D" },
      ],
    },
    {
      id: "w21q5",
      text: "Under pressure, you tend to:",
      options: [
        { label: "Tighten plans and processes", profileCode: "A" },
        { label: "Rally people and maintain morale", profileCode: "B" },
        { label: "Refocus on the priority and strategic goal", profileCode: "C" },
        { label: "Work harder and longer yourself", profileCode: "D" },
      ],
    },
    {
      id: "w21q6",
      text: "You energise others by:",
      options: [
        { label: "Providing clear expectations", profileCode: "A" },
        { label: "Listening and encouraging", profileCode: "B" },
        { label: "Sharing an exciting possibility", profileCode: "C" },
        { label: "Demonstrating effort and commitment", profileCode: "D" },
      ],
    },
    {
      id: "w21q7",
      text: "Your development area is:",
      options: [
        { label: "Flexibility and empowerment", profileCode: "A" },
        { label: "Tough decisions and accountability", profileCode: "B" },
        { label: "Turning vision into operating detail", profileCode: "C" },
        { label: "Delegating and developing others", profileCode: "D" },
      ],
    },
    {
      id: "w21q8",
      text: "You measure success by:",
      options: [
        { label: "On-time delivery and process quality", profileCode: "A" },
        { label: "Team satisfaction and cohesion", profileCode: "B" },
        { label: "Progress towards the larger ambition", profileCode: "C" },
        { label: "Tangible output and measurable results", profileCode: "D" },
      ],
    },
    {
      id: "w21q9",
      text: "You are most frustrated when:",
      options: [
        { label: "There is no discipline", profileCode: "A" },
        { label: "People are unheard or unsupported", profileCode: "B" },
        { label: "There is no compelling direction", profileCode: "C" },
        { label: "Talk replaces action", profileCode: "D" },
      ],
    },
    {
      id: "w21q10",
      text: "Your next leadership step involves:",
      options: [
        { label: "Inspiring beyond process", profileCode: "A" },
        { label: "Holding standards firmly", profileCode: "B" },
        { label: "Translating strategy into milestones", profileCode: "C" },
        { label: "Coaching rather than doing", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Process Architect",
      meaning: "Leads through structure, planning and reliable delivery.",
      interpretation:
        "Your responses suggest you lead through structure, planning and reliable delivery.",
      nextStep: "Practise inspiring and empowering beyond process.",
      color: "blue",
    },
    {
      code: "B",
      label: "People Developer",
      meaning: "Leads through relationships, coaching and team wellbeing.",
      interpretation:
        "Your responses suggest you lead through relationships, coaching and team wellbeing.",
      nextStep: "Combine support with explicit standards and accountability.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Strategic Visionary",
      meaning: "Leads through direction, possibility and transformation.",
      interpretation:
        "Your responses suggest you lead through direction, possibility and transformation.",
      nextStep: "Translate vision into milestones, owners and review cycles.",
      color: "purple",
    },
    {
      code: "D",
      label: "Action Leader",
      meaning: "Leads through personal effort, results and demonstration.",
      interpretation:
        "Your responses suggest you lead through personal effort, results and demonstration.",
      nextStep: "Delegate more, coach others and protect your own sustainability.",
      color: "orange",
    },
  ],
  dimensions: [],
};
