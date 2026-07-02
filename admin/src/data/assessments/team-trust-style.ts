/**
 * A38. Team Trust Style
 * Tier: Professional
 * Identifies what a person needs before relying on colleagues and how trust is built, extended and withdrawn.
 */

import type { ProfileAssessmentConfig } from "./types";

export const teamTrustStyle: ProfileAssessmentConfig = {
  slug: "team-trust-style",
  order: 38,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Team Trust Style",
    subtitle: "What does trust look like for you at work?",
    description:
      "Identify what you need before relying on colleagues and how trust is built, extended and withdrawn. Five profiles, ten situational questions.",
    purpose:
      "Identifies what a person needs before relying on colleagues and how trust is built, extended and withdrawn.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Leadership & Teams",
    isFree: true,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["tts1", "tts5", "tts9"],
  profileQuestions: [
    {
      id: "tts1",
      text: "When working with a new colleague, you usually:",
      options: [
        { label: "Assume positive intent and begin openly", profileCode: "A" },
        { label: "Watch whether they deliver consistently", profileCode: "B" },
        { label: "Invest time in knowing them personally", profileCode: "C" },
        { label: "Share limited responsibility until they prove dependable", profileCode: "D" },
        { label: "Adjust trust according to the risk and task", profileCode: "E" },
      ],
    },
    {
      id: "tts2",
      text: "Someone misses an early commitment. You:",
      options: [
        { label: "Give them another chance unless it becomes a pattern", profileCode: "A" },
        { label: "Reduce trust until they demonstrate consistency", profileCode: "B" },
        { label: "Ask what happened and consider the relationship context", profileCode: "C" },
        { label: "Become cautious about relying on them again", profileCode: "D" },
        { label: "Consider the impact, reason and risk before adjusting trust", profileCode: "E" },
      ],
    },
    {
      id: "tts3",
      text: "You are most comfortable delegating when:",
      options: [
        { label: "Expectations are clear and goodwill is present", profileCode: "A" },
        { label: "The person has shown competence and reliability", profileCode: "B" },
        { label: "You have a strong personal understanding with them", profileCode: "C" },
        { label: "You retain enough visibility to protect the outcome", profileCode: "D" },
        { label: "The task has suitable controls for the level of risk", profileCode: "E" },
      ],
    },
    {
      id: "tts4",
      text: "Trust is damaged most when someone:",
      options: [
        { label: "Acts with hidden or negative intent", profileCode: "A" },
        { label: "Breaks repeated commitments", profileCode: "B" },
        { label: "Shows indifference to the relationship or your concerns", profileCode: "C" },
        { label: "Uses your openness against you", profileCode: "D" },
        { label: "Behaves unpredictably in a high-risk situation", profileCode: "E" },
      ],
    },
    {
      id: "tts5",
      text: "To rebuild trust, you need:",
      options: [
        { label: "A sincere acknowledgement and changed behaviour", profileCode: "A" },
        { label: "A consistent record over time", profileCode: "B" },
        { label: "An honest conversation and renewed connection", profileCode: "C" },
        { label: "Strong evidence that the risk will not repeat", profileCode: "D" },
        { label: "A plan appropriate to the specific context and consequences", profileCode: "E" },
      ],
    },
    {
      id: "tts6",
      text: "Which statement fits best?",
      options: [
        { label: "Most people deserve an initial chance", profileCode: "A" },
        { label: "Trust must be earned through behaviour", profileCode: "B" },
        { label: "Trust grows through relationship and mutual care", profileCode: "C" },
        { label: "Caution protects people from avoidable disappointment", profileCode: "D" },
        { label: "Trust should match the situation, not follow one fixed rule", profileCode: "E" },
      ],
    },
    {
      id: "tts7",
      text: "When information is sensitive, you:",
      options: [
        { label: "Share with people whose intentions appear sound", profileCode: "A" },
        { label: "Share with people who have proven discretion", profileCode: "B" },
        { label: "Share with people you know and feel connected to", profileCode: "C" },
        { label: "Share only what is strictly necessary", profileCode: "D" },
        { label: "Share according to role, need and consequence", profileCode: "E" },
      ],
    },
    {
      id: "tts8",
      text: "A teammate asks for freedom to handle something differently. You:",
      options: [
        { label: "Agree unless there is a clear reason not to", profileCode: "A" },
        { label: "Consider their previous results", profileCode: "B" },
        { label: "Discuss their thinking and relationship commitment", profileCode: "C" },
        { label: "Keep closer control until confidence increases", profileCode: "D" },
        { label: "Match freedom to the task's reversibility and risk", profileCode: "E" },
      ],
    },
    {
      id: "tts9",
      text: "People may sometimes see you as:",
      options: [
        { label: "Too trusting", profileCode: "A" },
        { label: "Slow to trust until proof appears", profileCode: "B" },
        { label: "Influenced by personal connection", profileCode: "C" },
        { label: "Overly cautious or private", profileCode: "D" },
        { label: "Different in different situations", profileCode: "E" },
      ],
    },
    {
      id: "tts10",
      text: "The clearest sign that someone is trustworthy is:",
      options: [
        { label: "Honest intention and openness", profileCode: "A" },
        { label: "Consistent action over time", profileCode: "B" },
        { label: "Mutual understanding and care", profileCode: "C" },
        { label: "Respect for boundaries and confidential information", profileCode: "D" },
        {
          label: "Appropriate behaviour under the specific pressures of the role",
          profileCode: "E",
        },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Open Truster",
      meaning: "Begins with goodwill and extends trust unless experience gives a reason not to.",
      interpretation:
        "Your responses suggest you start from a position of trust. You extend goodwill to new colleagues and adjust only if direct experience provides a reason to.",
      nextStep: "Use clear expectations and checkpoints for high-risk commitments.",
      color: "emerald",
    },
    {
      code: "B",
      label: "Evidence-Based Truster",
      meaning: "Builds trust through consistency, competence and delivered commitments.",
      interpretation:
        "Your responses suggest you build trust through observation. You watch what people do over time and trust grows as reliability and competence are demonstrated.",
      nextStep: "Allow room for learning so one early mistake does not define the person.",
      color: "blue",
    },
    {
      code: "C",
      label: "Relationship-Based Truster",
      meaning: "Trust grows through personal connection, empathy and mutual understanding.",
      interpretation:
        "Your responses suggest trust is relational for you. You trust people you know, understand and feel connected to — even when credentials and track records are less clear.",
      nextStep: "Separate warmth from reliability and discuss expectations explicitly.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Guarded Protector",
      meaning: "Extends trust slowly and protects against disappointment or exploitation.",
      interpretation:
        "Your responses suggest you are cautious about extending trust. You protect yourself from disappointment by moving slowly and requiring evidence before lowering your defences.",
      nextStep: "Use small tests of trust rather than waiting for complete certainty.",
      color: "orange",
    },
    {
      code: "E",
      label: "Contextual Truster",
      meaning: "Adjusts trust according to the person, task, risk and surrounding controls.",
      interpretation:
        "Your responses suggest you calibrate trust to context. Your level of trust varies with the stakes, the person and the available controls — not by a fixed default position.",
      nextStep:
        "Explain your criteria so different levels of trust do not seem inconsistent or personal.",
      color: "purple",
    },
  ],
  dimensions: [],
};
