/**
 * W9. Detail vs Big-Picture Orientation
 * Profile-based: identifies whether a person naturally focuses on accuracy,
 * interconnected systems, strategic direction or translating between levels.
 */

import type { ProfileAssessmentConfig } from "./types";

export const detailVsBigPicture: ProfileAssessmentConfig = {
  slug: "detail-vs-big-picture",
  order: 24,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Detail vs Big-Picture Orientation",
    subtitle: "Where does your attention naturally go?",
    description:
      "Identify whether you naturally focus on accuracy, systems, strategic direction or translating between levels.",
    purpose:
      "Identifies whether a person naturally focuses on accuracy, interconnected systems, strategic direction or translating between levels.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "eye",
    productCategory: "Self-Awareness & Personality",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w9q1", "w9q5", "w9q9"],
  profileQuestions: [
    {
      id: "w9q1",
      text: "When reviewing a proposal, your attention goes first to:",
      options: [
        { label: "Errors, assumptions and missing details", profileCode: "A" },
        { label: "How the parts affect one another", profileCode: "B" },
        { label: "Whether it supports the larger direction", profileCode: "C" },
        { label: "Whether strategy can be translated into execution", profileCode: "D" },
      ],
    },
    {
      id: "w9q2",
      text: "In planning, you most naturally ask:",
      options: [
        { label: "What exactly must be done and to what standard?", profileCode: "A" },
        { label: "What dependencies and consequences must be considered?", profileCode: "B" },
        { label: "Where are we trying to go and why?", profileCode: "C" },
        { label: "How will the larger goal become milestones and actions?", profileCode: "D" },
      ],
    },
    {
      id: "w9q3",
      text: "A presentation feels weak when it lacks:",
      options: [
        { label: "Accuracy and evidence", profileCode: "A" },
        { label: "Connections and system implications", profileCode: "B" },
        { label: "A clear direction or compelling idea", profileCode: "C" },
        { label: "A practical route from idea to delivery", profileCode: "D" },
      ],
    },
    {
      id: "w9q4",
      text: "You are most likely to notice:",
      options: [
        { label: "A number or wording inconsistency", profileCode: "A" },
        { label: "A hidden dependency", profileCode: "B" },
        { label: "A missed strategic opportunity", profileCode: "C" },
        { label: "A gap between promise and execution", profileCode: "D" },
      ],
    },
    {
      id: "w9q5",
      text: "When discussing the future, you:",
      options: [
        { label: "Ask for specifics", profileCode: "A" },
        { label: "Explore interacting forces", profileCode: "B" },
        { label: "Describe possibilities and direction", profileCode: "C" },
        { label: "Translate possibilities into operating choices", profileCode: "D" },
      ],
    },
    {
      id: "w9q6",
      text: "Your best contribution is often:",
      options: [
        { label: "Raising quality and precision", profileCode: "A" },
        { label: "Explaining complexity and consequences", profileCode: "B" },
        { label: "Setting direction and ambition", profileCode: "C" },
        { label: "Connecting strategy with delivery", profileCode: "D" },
      ],
    },
    {
      id: "w9q7",
      text: "You become frustrated by:",
      options: [
        { label: "Careless mistakes", profileCode: "A" },
        { label: "Silo thinking", profileCode: "B" },
        { label: "Short-term thinking", profileCode: "C" },
        { label: "Ideas with no execution path", profileCode: "D" },
      ],
    },
    {
      id: "w9q8",
      text: "When time is short, you prioritise:",
      options: [
        { label: "The most critical details", profileCode: "A" },
        { label: "The dependencies that could create failure", profileCode: "B" },
        { label: "The core strategic choice", profileCode: "C" },
        { label: "The few actions that connect to the goal", profileCode: "D" },
      ],
    },
    {
      id: "w9q9",
      text: "People may experience you as:",
      options: [
        { label: "Overly detailed", profileCode: "A" },
        { label: "Complex or abstract", profileCode: "B" },
        { label: "Too conceptual", profileCode: "C" },
        { label: "Moving repeatedly between levels", profileCode: "D" },
      ],
    },
    {
      id: "w9q10",
      text: "Your development priority is:",
      options: [
        { label: "Stepping back to the larger purpose", profileCode: "A" },
        { label: "Making systems thinking simple and actionable", profileCode: "B" },
        { label: "Adding operating detail and measures", profileCode: "C" },
        { label: "Protecting time for both strategic and detailed thinking", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Precision Specialist",
      meaning: "Notices detail, quality standards and execution accuracy.",
      interpretation:
        "Your responses suggest you notice detail, quality standards and execution accuracy.",
      nextStep: "Ask what larger outcome the detail is protecting.",
      color: "blue",
    },
    {
      code: "B",
      label: "Systems Thinker",
      meaning: "Looks for relationships, dependencies and second-order effects.",
      interpretation:
        "Your responses suggest you look for relationships, dependencies and second-order effects.",
      nextStep: "Convert system insight into a small number of practical choices.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Strategic Visionary",
      meaning: "Focuses on direction, possibility and long-term impact.",
      interpretation:
        "Your responses suggest you focus on direction, possibility and long-term impact.",
      nextStep: "Add evidence, milestones and ownership to the vision.",
      color: "purple",
    },
    {
      code: "D",
      label: "Strategy-to-Action Bridge",
      meaning: "Moves between broad goals and operational detail.",
      interpretation: "Your responses suggest you move between broad goals and operational detail.",
      nextStep:
        "Avoid being the only person who connects strategy and execution; build shared understanding.",
      color: "yellow",
    },
  ],
  dimensions: [],
};
