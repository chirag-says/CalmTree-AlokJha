/**
 * W22. Feedback Response Style
 * Profile-based: identifies the person's default response when receiving feedback.
 */

import type { ProfileAssessmentConfig } from "./types";

export const feedbackResponseStyle: ProfileAssessmentConfig = {
  slug: "feedback-response-style",
  order: 37,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Feedback Response Style",
    subtitle: "How do you respond to feedback?",
    description:
      "Identify your default response when receiving evaluative, critical or corrective feedback.",
    purpose:
      "Identifies the person's default response when receiving evaluative, critical or corrective feedback.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "message-circle",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w22q1", "w22q5", "w22q9"],
  profileQuestions: [
    {
      id: "w22q1",
      text: "When a manager points out a weakness, you first:",
      options: [
        { label: "Withdraw and process privately", profileCode: "A" },
        { label: "Consider what part is accurate", profileCode: "B" },
        { label: "Explain your context or reasoning", profileCode: "C" },
        { label: "Dismiss feedback that feels unfair", profileCode: "D" },
      ],
    },
    {
      id: "w22q2",
      text: "After critical feedback, your energy:",
      options: [
        { label: "Drops for a noticeable period", profileCode: "A" },
        { label: "Dips briefly then returns", profileCode: "B" },
        { label: "Stays stable because you engage actively", profileCode: "C" },
        { label: "Rises because you feel challenged", profileCode: "D" },
      ],
    },
    {
      id: "w22q3",
      text: "You replay feedback in your mind:",
      options: [
        { label: "Frequently and with self-doubt", profileCode: "A" },
        { label: "Until you extract the useful part", profileCode: "B" },
        { label: "To prepare your response", profileCode: "C" },
        { label: "Rarely, because you move on quickly", profileCode: "D" },
      ],
    },
    {
      id: "w22q4",
      text: "When feedback contradicts your self-image, you:",
      options: [
        { label: "Feel shaken and uncertain", profileCode: "A" },
        { label: "Ask for examples and evidence", profileCode: "B" },
        { label: "Offer your perspective calmly", profileCode: "C" },
        { label: "Reject the feedback internally", profileCode: "D" },
      ],
    },
    {
      id: "w22q5",
      text: "After feedback you usually:",
      options: [
        { label: "Wait before deciding whether to act", profileCode: "A" },
        { label: "Create a practical action step", profileCode: "B" },
        { label: "Discuss it with someone you trust", profileCode: "C" },
        { label: "Carry on as before", profileCode: "D" },
      ],
    },
    {
      id: "w22q6",
      text: "You request feedback:",
      options: [
        { label: "Rarely, because it feels threatening", profileCode: "A" },
        { label: "Regularly, to identify improvement areas", profileCode: "B" },
        { label: "When you want to clarify expectations", profileCode: "C" },
        { label: "Only when you expect it to be positive", profileCode: "D" },
      ],
    },
    {
      id: "w22q7",
      text: "The most helpful feedback for you:",
      options: [
        { label: "Is delivered gently with encouragement", profileCode: "A" },
        { label: "Is specific, evidence-based and actionable", profileCode: "B" },
        { label: "Includes your perspective", profileCode: "C" },
        { label: "Is brief and factual", profileCode: "D" },
      ],
    },
    {
      id: "w22q8",
      text: "When feedback feels unfair, you:",
      options: [
        { label: "Doubt yourself anyway", profileCode: "A" },
        { label: "Separate the useful part from the noise", profileCode: "B" },
        { label: "Present your case respectfully", profileCode: "C" },
        { label: "Dismiss it and move on", profileCode: "D" },
      ],
    },
    {
      id: "w22q9",
      text: "Your feedback strength is:",
      options: [
        { label: "Willingness to listen deeply", profileCode: "A" },
        { label: "Turning feedback into improvement", profileCode: "B" },
        { label: "Dialogue and clarification", profileCode: "C" },
        { label: "Confidence that is not easily shaken", profileCode: "D" },
      ],
    },
    {
      id: "w22q10",
      text: "Your development priority is:",
      options: [
        { label: "Reducing emotional impact", profileCode: "A" },
        { label: "Requesting harder feedback", profileCode: "B" },
        { label: "Listening fully before explaining", profileCode: "C" },
        { label: "Considering feedback before dismissing it", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Sensitive Absorber",
      meaning: "Takes feedback deeply and may over-internalise criticism.",
      interpretation:
        "Your responses suggest you take feedback deeply and may over-internalise criticism.",
      nextStep: "Separate the actionable point from the emotional impact before responding.",
      color: "blue",
    },
    {
      code: "B",
      label: "Constructive Processor",
      meaning: "Evaluates feedback, extracts the useful part and acts.",
      interpretation:
        "Your responses suggest you evaluate feedback, extract the useful part and act.",
      nextStep: "Continue seeking harder feedback in areas that matter most.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Engaged Responder",
      meaning: "Treats feedback as a conversation and clarifies context.",
      interpretation:
        "Your responses suggest you treat feedback as a conversation and clarify context.",
      nextStep: "Listen fully before presenting your perspective.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Resilient Deflector",
      meaning: "Maintains confidence but may filter out uncomfortable truths.",
      interpretation:
        "Your responses suggest you maintain confidence but may filter out uncomfortable truths.",
      nextStep: "Sit with feedback for a day before deciding whether it is relevant.",
      color: "orange",
    },
  ],
  dimensions: [],
};
