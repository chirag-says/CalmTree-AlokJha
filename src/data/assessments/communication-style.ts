/**
 * A12. Communication Style Profile
 * Pack 1 — Self-Awareness and Personality
 * Profile-based: identifies the communication pattern a person most often uses.
 */

import type { ProfileAssessmentConfig } from "./types";

export const communicationStyle: ProfileAssessmentConfig = {
  slug: "communication-style",
  order: 12,
  type: "profile-based",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Communication Style Profile",
    subtitle: "How do you naturally communicate?",
    description: "Identify your communication pattern when sharing ideas, giving feedback and handling disagreement. Ten situational questions, instant private results.",
    purpose: "Identifies the communication pattern a person most often uses when sharing ideas, requesting action, giving feedback and handling disagreement.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "message-circle",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["a12q1", "a12q5", "a12q9"],
  profileQuestions: [
    { id: "a12q1", text: "When you disagree in a meeting, you usually:", options: [
      { label: "Listen fully and respond after thinking", profileCode: "A" },
      { label: "Find wording that reduces tension", profileCode: "B" },
      { label: "State your view and the reason clearly", profileCode: "C" },
      { label: "Challenge the point immediately and push for a decision", profileCode: "D" },
    ]},
    { id: "a12q2", text: "When someone is upset with you, you first:", options: [
      { label: "Give them space and reflect on what happened", profileCode: "A" },
      { label: "Acknowledge the emotion and protect the relationship", profileCode: "B" },
      { label: "Ask what they need and explain your position calmly", profileCode: "C" },
      { label: "Address the issue directly and quickly", profileCode: "D" },
    ]},
    { id: "a12q3", text: "Your messages are usually:", options: [
      { label: "Careful and considered", profileCode: "A" },
      { label: "Warm and tactful", profileCode: "B" },
      { label: "Clear and balanced", profileCode: "C" },
      { label: "Brief and action-oriented", profileCode: "D" },
    ]},
    { id: "a12q4", text: "When instructions are unclear, you:", options: [
      { label: "Observe and gather more context", profileCode: "A" },
      { label: "Ask in a way that avoids embarrassing anyone", profileCode: "B" },
      { label: "Request specific clarification", profileCode: "C" },
      { label: "Choose an interpretation and move forward", profileCode: "D" },
    ]},
    { id: "a12q5", text: "People may occasionally experience you as:", options: [
      { label: "Too quiet or difficult to read", profileCode: "A" },
      { label: "Indirect when the issue needs firmness", profileCode: "B" },
      { label: "More explicit than they are used to", profileCode: "C" },
      { label: "Blunt or impatient", profileCode: "D" },
    ]},
    { id: "a12q6", text: "When giving feedback, you:", options: [
      { label: "Choose your words after careful thought", profileCode: "A" },
      { label: "Begin with reassurance and relationship", profileCode: "B" },
      { label: "Describe the behaviour, impact and next step", profileCode: "C" },
      { label: "Say exactly what must change", profileCode: "D" },
    ]},
    { id: "a12q7", text: "In conflict, your priority is:", options: [
      { label: "Understanding the full situation", profileCode: "A" },
      { label: "Keeping the relationship workable", profileCode: "B" },
      { label: "Finding a fair and clear resolution", profileCode: "C" },
      { label: "Stopping delay and reaching a decision", profileCode: "D" },
    ]},
    { id: "a12q8", text: "When you need help, you:", options: [
      { label: "Try independently before asking", profileCode: "A" },
      { label: "Ask someone you have a comfortable relationship with", profileCode: "B" },
      { label: "State the need and context directly", profileCode: "C" },
      { label: "Ask quickly and specify the action required", profileCode: "D" },
    ]},
    { id: "a12q9", text: "Your strongest communication asset is:", options: [
      { label: "Listening and reflection", profileCode: "A" },
      { label: "Empathy and tact", profileCode: "B" },
      { label: "Clarity and mutual respect", profileCode: "C" },
      { label: "Speed and decisiveness", profileCode: "D" },
    ]},
    { id: "a12q10", text: "Your most useful growth area is:", options: [
      { label: "Speaking earlier", profileCode: "A" },
      { label: "Being more explicit", profileCode: "B" },
      { label: "Adapting tone to different people", profileCode: "C" },
      { label: "Slowing down and listening longer", profileCode: "D" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Reflective Listener", meaning: "Processes carefully, listens deeply and speaks after considering the situation.", interpretation: "Your responses suggest you process carefully, listen deeply and speak after considering the situation.", nextStep: "Prepare one sentence in advance and contribute earlier in important conversations.", color: "blue" },
    { code: "B", label: "Diplomatic Connector", meaning: "Protects relationships and builds agreement through tact and empathy.", interpretation: "Your responses suggest you protect relationships and build agreement through tact and empathy.", nextStep: "Practise naming the request or boundary directly after acknowledging the relationship.", color: "emerald" },
    { code: "C", label: "Clear Advocate", meaning: "Expresses needs, facts and boundaries directly while respecting others.", interpretation: "Your responses suggest you express needs, facts and boundaries directly while respecting others.", nextStep: "Keep the clarity, while checking how much context and warmth the listener needs.", color: "yellow" },
    { code: "D", label: "Direct Driver", meaning: "Communicates quickly, strongly and with emphasis on action or decision.", interpretation: "Your responses suggest you communicate quickly, strongly and with emphasis on action or decision.", nextStep: "Pause, ask one question and summarise the other person before pressing for action.", color: "orange" },
  ],
  dimensions: [],
};
