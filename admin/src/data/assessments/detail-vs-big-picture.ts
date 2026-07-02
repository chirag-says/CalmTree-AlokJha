/**
 * A24. Detail vs Big-Picture Orientation
 * Tier: Professional
 * Identifies whether a person naturally focuses on accuracy, interconnected systems, strategic direction or translating between levels.
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
      "Find out whether you naturally focus on accuracy, systems, strategic direction or connecting strategy to action. Four profiles, ten workplace questions.",
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
  tieBreakQuestionIds: ["dbp2", "dbp6", "dbp10"],
  profileQuestions: [
    {
      id: "dbp1",
      text: "When reviewing a proposal, your attention goes first to:",
      options: [
        { label: "Errors, assumptions and missing details", profileCode: "A" },
        { label: "How the parts affect one another", profileCode: "B" },
        { label: "Whether it supports the larger direction", profileCode: "C" },
        { label: "Whether the strategy can be translated into execution", profileCode: "D" },
      ],
    },
    {
      id: "dbp2",
      text: "In planning, you most naturally ask:",
      options: [
        { label: "What exactly must be done and to what standard?", profileCode: "A" },
        { label: "What dependencies and consequences must we consider?", profileCode: "B" },
        { label: "Where are we trying to go and why?", profileCode: "C" },
        { label: "What sequence will connect the goal to practical delivery?", profileCode: "D" },
      ],
    },
    {
      id: "dbp3",
      text: "Which task is most satisfying?",
      options: [
        { label: "Improving the accuracy and quality of an output", profileCode: "A" },
        { label: "Understanding and redesigning a complex process", profileCode: "B" },
        { label: "Creating a future direction or new possibility", profileCode: "C" },
        { label: "Turning a broad idea into an executable plan", profileCode: "D" },
      ],
    },
    {
      id: "dbp4",
      text: "When information is incomplete, you:",
      options: [
        { label: "Look for the missing facts before proceeding", profileCode: "A" },
        { label: "Map possible relationships and scenarios", profileCode: "B" },
        { label: "Work from the core purpose and directional choice", profileCode: "C" },
        { label: "Define enough detail to move while keeping the goal visible", profileCode: "D" },
      ],
    },
    {
      id: "dbp5",
      text: "Colleagues seek your help when they need:",
      options: [
        { label: "Careful checking and reliable standards", profileCode: "A" },
        { label: "Understanding of a complex situation", profileCode: "B" },
        { label: "Fresh direction and strategic perspective", profileCode: "C" },
        { label: "Clarity on how to make an idea workable", profileCode: "D" },
      ],
    },
    {
      id: "dbp6",
      text: "Your common frustration is:",
      options: [
        { label: "Carelessness and imprecision", profileCode: "A" },
        { label: "Siloed thinking and unintended consequences", profileCode: "B" },
        { label: "Short-term thinking without ambition", profileCode: "C" },
        { label: "Plans that are either too vague or too operational", profileCode: "D" },
      ],
    },
    {
      id: "dbp7",
      text: "During presentations, you prefer:",
      options: [
        { label: "Specific facts and evidence", profileCode: "A" },
        { label: "A model showing how factors connect", profileCode: "B" },
        { label: "A clear narrative about direction and impact", profileCode: "C" },
        { label: "A clear story supported by executable steps", profileCode: "D" },
      ],
    },
    {
      id: "dbp8",
      text: "When solving a problem, you tend to:",
      options: [
        { label: "Fix the exact point where quality failed", profileCode: "A" },
        { label: "Examine the wider system that produced the problem", profileCode: "B" },
        { label: "Reconsider the overall goal or approach", profileCode: "C" },
        { label: "Connect root cause, strategic choice and implementation", profileCode: "D" },
      ],
    },
    {
      id: "dbp9",
      text: "A strong leader should primarily:",
      options: [
        { label: "Protect standards and execution quality", profileCode: "A" },
        { label: "Understand systems and align dependencies", profileCode: "B" },
        { label: "Set direction and inspire belief", profileCode: "C" },
        { label: "Connect direction to disciplined delivery", profileCode: "D" },
      ],
    },
    {
      id: "dbp10",
      text: "Which compliment fits you best?",
      options: [
        { label: "You notice what others miss", profileCode: "A" },
        { label: "You see how everything connects", profileCode: "B" },
        { label: "You help us see what is possible", profileCode: "C" },
        { label: "You make complex ideas practical", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Precision Specialist",
      meaning: "Notices detail, quality standards and execution accuracy.",
      interpretation:
        "Your responses suggest your attention goes to the precise, the accurate and the carefully checked. You raise quality by seeing what others overlook.",
      nextStep: "Regularly reconnect details to the purpose and desired outcome.",
      color: "blue",
    },
    {
      code: "B",
      label: "Systems Thinker",
      meaning: "Looks for relationships, dependencies and second-order effects.",
      interpretation:
        "Your responses suggest you naturally see how the pieces connect. You look beyond the immediate task to understand the wider system it operates within.",
      nextStep: "Translate complex connections into a few clear priorities.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Strategic Visionary",
      meaning: "Focuses on direction, possibility and long-term impact.",
      interpretation:
        "Your responses suggest you are drawn to the bigger picture — where things are heading, what is possible and why it matters. You inspire others with direction.",
      nextStep: "Use execution partners and concrete checkpoints to ground the vision.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Strategy-to-Action Bridge",
      meaning: "Moves between broad goals and operational detail.",
      interpretation:
        "Your responses suggest you are at your best connecting strategy to execution. You translate ambiguous goals into workable plans and operational steps into strategic meaning.",
      nextStep:
        "Avoid becoming the translator for everything; build shared understanding in the team.",
      color: "orange",
    },
  ],
  dimensions: [],
};
