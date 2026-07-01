/**
 * A16. Workplace Personality Style
 * Tier: Professional
 * Identifies the person's most natural way of approaching tasks, people, information and execution at work.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplacePersonalityStyle: ProfileAssessmentConfig = {
  slug: "workplace-personality-style",
  order: 16,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Personality Style",
    subtitle: "What's your natural working style?",
    description:
      "Discover your most natural approach to tasks, people and execution at work. Ten situational questions, instant private results.",
    purpose:
      "Identifies the person's most natural way of approaching tasks, people, information and execution at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "briefcase",
    productCategory: "Workplace Effectiveness",
    isFree: true,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["wp1q2", "wp1q7", "wp1q10"],
  profileQuestions: [
    {
      id: "wp1q1",
      text: "A new project is assigned with a broad outcome but few details. What do you do first?",
      options: [
        { label: "Create milestones, define roles and build a schedule", profileCode: "A" },
        { label: "Start a small experiment to learn quickly", profileCode: "B" },
        {
          label: "Speak with the people involved to understand needs and concerns",
          profileCode: "C",
        },
        { label: "Gather information and define the problem clearly", profileCode: "D" },
        { label: "Take ownership of the most urgent action immediately", profileCode: "E" },
      ],
    },
    {
      id: "wp1q2",
      text: "When a team falls behind, your instinct is to:",
      options: [
        { label: "Re-plan and track progress more closely", profileCode: "A" },
        { label: "Change the approach to find a better path", profileCode: "B" },
        { label: "Check what support or coordination the team needs", profileCode: "C" },
        { label: "Identify the root cause before acting", profileCode: "D" },
        { label: "Push for faster decisions and execution", profileCode: "E" },
      ],
    },
    {
      id: "wp1q3",
      text: "Which workday feels most satisfying?",
      options: [
        { label: "Everything followed the plan and commitments were met", profileCode: "A" },
        { label: "A day full of variety and unexpected challenges", profileCode: "B" },
        { label: "Productive conversations and strong teamwork", profileCode: "C" },
        { label: "A complex problem was solved accurately and thoroughly", profileCode: "D" },
        { label: "Several high-impact tasks were completed and moved forward", profileCode: "E" },
      ],
    },
    {
      id: "wp1q4",
      text: "In meetings, you are most likely to:",
      options: [
        { label: "Clarify the agenda, actions and timelines", profileCode: "A" },
        { label: "Offer alternative possibilities or approaches", profileCode: "B" },
        { label: "Notice who is disengaged and help everyone contribute", profileCode: "C" },
        { label: "Question assumptions and examine the facts", profileCode: "D" },
        { label: "Move the group towards a firm decision", profileCode: "E" },
      ],
    },
    {
      id: "wp1q5",
      text: "When instructions conflict, you usually:",
      options: [
        { label: "Ask for priorities and create a clear sequence", profileCode: "A" },
        { label: "Choose the interpretation that best fits the situation", profileCode: "B" },
        { label: "Speak to the people involved and build agreement", profileCode: "C" },
        { label: "Compare the evidence and identify the most logical reading", profileCode: "D" },
        { label: "Choose a direction and take responsibility for it", profileCode: "E" },
      ],
    },
    {
      id: "wp1q6",
      text: "A colleague describes you as someone who:",
      options: [
        { label: "Can be relied on to organise and follow through", profileCode: "A" },
        { label: "Finds a way forward when plans change", profileCode: "B" },
        { label: "Makes collaboration easier and more effective", profileCode: "C" },
        { label: "Sees details and risks that others miss", profileCode: "D" },
        { label: "Creates momentum and gets things done", profileCode: "E" },
      ],
    },
    {
      id: "wp1q7",
      text: "What frustrates you most?",
      options: [
        { label: "Poor planning and missed commitments", profileCode: "A" },
        { label: "Rigid rules that prevent useful adaptation", profileCode: "B" },
        { label: "Insensitive behaviour and avoidable conflict", profileCode: "C" },
        { label: "Decisions made without sufficient evidence", profileCode: "D" },
        { label: "Long discussions without visible action", profileCode: "E" },
      ],
    },
    {
      id: "wp1q8",
      text: "When starting an unfamiliar task, you prefer to:",
      options: [
        { label: "Break it into clear steps before beginning", profileCode: "A" },
        { label: "Try a workable approach and refine as you go", profileCode: "B" },
        { label: "Find someone with experience to discuss it first", profileCode: "C" },
        { label: "Research thoroughly and understand the standards", profileCode: "D" },
        { label: "Begin immediately with the highest-value action", profileCode: "E" },
      ],
    },
    {
      id: "wp1q9",
      text: "How do you judge good performance?",
      options: [
        { label: "Consistency, reliability and timely delivery", profileCode: "A" },
        { label: "Resourcefulness and the ability to adjust", profileCode: "B" },
        { label: "Contribution to team effectiveness and morale", profileCode: "C" },
        { label: "Accuracy, depth and quality of reasoning", profileCode: "D" },
        { label: "Speed, ownership and measurable outcomes", profileCode: "E" },
      ],
    },
    {
      id: "wp1q10",
      text: "Under pressure, you tend to rely more heavily on:",
      options: [
        { label: "Routines, lists and established procedures", profileCode: "A" },
        { label: "Improvisation and rapid adaptation", profileCode: "B" },
        { label: "Communication and shared support", profileCode: "C" },
        { label: "Facts, analysis and careful checking", profileCode: "D" },
        { label: "Decisive action and personal drive", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Structured Planner",
      meaning: "Creates order, schedules and dependable processes.",
      interpretation:
        "Your responses suggest you bring reliability and organisation to your work. You tend to create structure where others see ambiguity, and people depend on you to keep things on track.",
      nextStep: "Protect time for planning, but practise responding without complete certainty.",
      color: "blue",
    },
    {
      code: "B",
      label: "Adaptive Explorer",
      meaning: "Responds quickly, experiments and adjusts as situations change.",
      interpretation:
        "Your responses suggest you are energised by variety and challenge. You move quickly, experiment readily, and find a way forward when others are still deciding.",
      nextStep: "Add simple checkpoints so flexibility does not become unfinished work.",
      color: "emerald",
    },
    {
      code: "C",
      label: "People Connector",
      meaning: "Builds cooperation, morale and shared understanding.",
      interpretation:
        "Your responses suggest you naturally draw people together. You notice the human side of work and help teams function better through communication and care.",
      nextStep: "Balance relationship sensitivity with clear decisions and boundaries.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Analytical Specialist",
      meaning: "Examines evidence, quality and underlying logic.",
      interpretation:
        "Your responses suggest you bring rigour and precision to your work. You ask the questions others overlook and raise the quality of decisions through careful thinking.",
      nextStep: "Set a decision deadline to prevent analysis from delaying action.",
      color: "purple",
    },
    {
      code: "E",
      label: "Action Driver",
      meaning: "Moves work forward rapidly and focuses on visible outcomes.",
      interpretation:
        "Your responses suggest you create momentum. You take ownership, make decisions and push work across the line when others are still discussing.",
      nextStep: "Slow down briefly for risks, stakeholder input and follow-through.",
      color: "orange",
    },
  ],
  dimensions: [],
};
