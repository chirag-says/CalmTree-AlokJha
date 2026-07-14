/**
 * W18. Pressure Decision Style
 * Profile-based: identifies the decision pattern relied on when time is limited.
 */

import type { ProfileAssessmentConfig } from "./types";

export const pressureDecisionStyle: ProfileAssessmentConfig = {
  slug: "pressure-decision-style",
  order: 33,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Pressure Decision Style",
    subtitle: "How do you decide under pressure?",
    description: "Identify your decision pattern when time is limited and consequences matter.",
    purpose: "Identifies the decision pattern a person relies on when time is limited and consequences matter.",
    duration: "3–5 minutes", questionCount: 10, icon: "zap",
    productCategory: "Leadership & Teams", isFree: false,
  },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w18q1", "w18q5", "w18q9"],
  profileQuestions: [
    { id: "w18q1", text: "A decision must be made within an hour. You first:", options: [
      { label: "Choose the strongest available option", profileCode: "A" },
      { label: "Identify the critical facts and assumptions", profileCode: "B" },
      { label: "Consult the people most affected", profileCode: "C" },
      { label: "Look for the option with least irreversible downside", profileCode: "D" },
      { label: "Choose a workable path and prepare to adjust", profileCode: "E" },
    ]},
    { id: "w18q2", text: "When information conflicts, you:", options: [
      { label: "Use judgement and move", profileCode: "A" },
      { label: "Check source quality", profileCode: "B" },
      { label: "Ask people to explain their perspective", profileCode: "C" },
      { label: "Delay irreversible commitment", profileCode: "D" },
      { label: "Test an option in action", profileCode: "E" },
    ]},
    { id: "w18q3", text: "Your pressure strength is:", options: [
      { label: "Speed", profileCode: "A" },
      { label: "Accuracy", profileCode: "B" },
      { label: "Alignment", profileCode: "C" },
      { label: "Risk control", profileCode: "D" },
      { label: "Adaptation", profileCode: "E" },
    ]},
    { id: "w18q4", text: "Your pressure blind spot may be:", options: [
      { label: "Acting too soon", profileCode: "A" },
      { label: "Taking too long", profileCode: "B" },
      { label: "Seeking too much agreement", profileCode: "C" },
      { label: "Becoming overly cautious", profileCode: "D" },
      { label: "Changing direction too frequently", profileCode: "E" },
    ]},
    { id: "w18q5", text: "When consequences are high, you:", options: [
      { label: "Take responsibility for a firm choice", profileCode: "A" },
      { label: "Increase analysis and checking", profileCode: "B" },
      { label: "Ensure key people are involved", profileCode: "C" },
      { label: "Protect against the worst plausible outcome", profileCode: "D" },
      { label: "Use staged commitments", profileCode: "E" },
    ]},
    { id: "w18q6", text: "A team is waiting for direction. You:", options: [
      { label: "Give a clear decision", profileCode: "A" },
      { label: "Ask for the two most important facts", profileCode: "B" },
      { label: "Invite rapid views, then decide", profileCode: "C" },
      { label: "Clarify what must not go wrong", profileCode: "D" },
      { label: "Set an initial direction with a review point", profileCode: "E" },
    ]},
    { id: "w18q7", text: "Pressure makes you rely more on:", options: [
      { label: "Instinct and experience", profileCode: "A" },
      { label: "Evidence and logic", profileCode: "B" },
      { label: "Conversation and collective knowledge", profileCode: "C" },
      { label: "Rules and safeguards", profileCode: "D" },
      { label: "Real-time feedback", profileCode: "E" },
    ]},
    { id: "w18q8", text: "After a decision, you:", options: [
      { label: "Drive execution", profileCode: "A" },
      { label: "Monitor whether assumptions remain true", profileCode: "B" },
      { label: "Keep people informed and aligned", profileCode: "C" },
      { label: "Watch risk indicators closely", profileCode: "D" },
      { label: "Adjust quickly if reality changes", profileCode: "E" },
    ]},
    { id: "w18q9", text: "Others value you under pressure because you:", options: [
      { label: "Create momentum", profileCode: "A" },
      { label: "Prevent careless errors", profileCode: "B" },
      { label: "Keep the group together", profileCode: "C" },
      { label: "Protect against serious harm", profileCode: "D" },
      { label: "Find a route through changing conditions", profileCode: "E" },
    ]},
    { id: "w18q10", text: "Your development priority is:", options: [
      { label: "Building a brief pause", profileCode: "A" },
      { label: "Using a decision deadline", profileCode: "B" },
      { label: "Knowing when consultation is enough", profileCode: "C" },
      { label: "Distinguishing reversible from irreversible risk", profileCode: "D" },
      { label: "Keeping a stable objective while adapting method", profileCode: "E" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Rapid Decider", meaning: "Chooses quickly and values momentum under pressure.", interpretation: "Your responses suggest you choose quickly and value momentum under pressure.", nextStep: "Use a short pause to check the biggest assumption and irreversible risk.", color: "blue" },
    { code: "B", label: "Analytical Checker", meaning: "Slows down to verify evidence, risk and assumptions.", interpretation: "Your responses suggest you slow down to verify evidence, risk and assumptions.", nextStep: "Set a clear decision deadline and define what evidence is sufficient.", color: "emerald" },
    { code: "C", label: "Consultative Decider", meaning: "Seeks stakeholder input and shared understanding.", interpretation: "Your responses suggest you seek stakeholder input and shared understanding.", nextStep: "Limit consultation to the people with relevant information or consequence.", color: "yellow" },
    { code: "D", label: "Risk Protector", meaning: "Prioritises avoiding serious downside or irreversible error.", interpretation: "Your responses suggest you prioritise avoiding serious downside or irreversible error.", nextStep: "Separate reversible experiments from truly irreversible decisions.", color: "orange" },
    { code: "E", label: "Adaptive Improviser", meaning: "Makes a workable decision and adjusts as events unfold.", interpretation: "Your responses suggest you make a workable decision and adjust as events unfold.", nextStep: "Keep the objective and review criteria stable even when method changes.", color: "purple" },
  ],
  dimensions: [],
};
