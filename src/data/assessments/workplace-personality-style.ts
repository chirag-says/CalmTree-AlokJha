/**
 * W1. Workplace Personality Style
 * Pack 1 — Self-Awareness and Personality
 * Profile-based: identifies the person's most natural way of approaching
 * tasks, people, information and execution at work.
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
    description: "Discover your most natural approach to tasks, people and execution at work. Ten situational questions, instant private results.",
    purpose: "Identifies the person's most natural way of approaching tasks, people, information and execution at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "briefcase",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["wp1q2", "wp1q7", "wp1q10"],
  profileQuestions: [
    { id: "wp1q1", text: "A new project has a broad outcome but few details. What do you do first?", options: [
      { label: "Create milestones, roles and a working schedule", profileCode: "A" },
      { label: "Start with a small experiment and learn from it", profileCode: "B" },
      { label: "Speak with the people involved to align expectations", profileCode: "C" },
      { label: "Gather information and define the problem precisely", profileCode: "D" },
      { label: "Take ownership of the most urgent action and begin", profileCode: "E" },
    ]},
    { id: "wp1q2", text: "When a team falls behind, your instinct is to:", options: [
      { label: "Re-plan tasks and track progress more closely", profileCode: "A" },
      { label: "Change the approach based on what is working now", profileCode: "B" },
      { label: "Check what support or coordination the team needs", profileCode: "C" },
      { label: "Identify the root cause using data and evidence", profileCode: "D" },
      { label: "Push for immediate decisions and faster execution", profileCode: "E" },
    ]},
    { id: "wp1q3", text: "Which workday feels most satisfying?", options: [
      { label: "A day when everything followed a clear plan", profileCode: "A" },
      { label: "A day with variety and unexpected challenges", profileCode: "B" },
      { label: "A day with productive conversations and teamwork", profileCode: "C" },
      { label: "A day when you solved a complex problem accurately", profileCode: "D" },
      { label: "A day when you completed several high-impact tasks", profileCode: "E" },
    ]},
    { id: "wp1q4", text: "In meetings, you are most likely to:", options: [
      { label: "Clarify the agenda, actions and timelines", profileCode: "A" },
      { label: "Offer alternative possibilities as the discussion evolves", profileCode: "B" },
      { label: "Notice who is engaged and help people contribute", profileCode: "C" },
      { label: "Question assumptions and examine supporting facts", profileCode: "D" },
      { label: "Move the group towards a firm decision", profileCode: "E" },
    ]},
    { id: "wp1q5", text: "When instructions conflict, you usually:", options: [
      { label: "Ask for priorities and create a workable sequence", profileCode: "A" },
      { label: "Choose the interpretation that best fits the situation", profileCode: "B" },
      { label: "Speak to the people concerned and build agreement", profileCode: "C" },
      { label: "Compare the evidence and identify the most logical reading", profileCode: "D" },
      { label: "Choose a direction and take responsibility for it", profileCode: "E" },
    ]},
    { id: "wp1q6", text: "A colleague describes you as someone who:", options: [
      { label: "Can be relied upon to organise things", profileCode: "A" },
      { label: "Finds a way forward when plans change", profileCode: "B" },
      { label: "Makes collaboration easier", profileCode: "C" },
      { label: "Sees details and risks others miss", profileCode: "D" },
      { label: "Creates momentum and gets things done", profileCode: "E" },
    ]},
    { id: "wp1q7", text: "What frustrates you most?", options: [
      { label: "Poor planning and missed commitments", profileCode: "A" },
      { label: "Rigid rules that prevent sensible adaptation", profileCode: "B" },
      { label: "Insensitive behaviour and avoidable conflict", profileCode: "C" },
      { label: "Decisions made without enough evidence", profileCode: "D" },
      { label: "Long discussions without visible action", profileCode: "E" },
    ]},
    { id: "wp1q8", text: "When starting an unfamiliar task, you prefer to:", options: [
      { label: "Break it into steps before beginning", profileCode: "A" },
      { label: "Try a workable approach and refine it", profileCode: "B" },
      { label: "Find someone with relevant experience to discuss it with", profileCode: "C" },
      { label: "Research the subject and understand the standards", profileCode: "D" },
      { label: "Begin with the highest-value action immediately", profileCode: "E" },
    ]},
    { id: "wp1q9", text: "How do you judge good performance?", options: [
      { label: "Consistency, reliability and timely delivery", profileCode: "A" },
      { label: "Resourcefulness and ability to adjust", profileCode: "B" },
      { label: "Contribution to team effectiveness", profileCode: "C" },
      { label: "Accuracy, depth and quality of reasoning", profileCode: "D" },
      { label: "Speed, ownership and measurable outcomes", profileCode: "E" },
    ]},
    { id: "wp1q10", text: "Under pressure, you tend to rely more heavily on:", options: [
      { label: "Routines, lists and established procedures", profileCode: "A" },
      { label: "Improvisation and rapid adaptation", profileCode: "B" },
      { label: "Communication and shared support", profileCode: "C" },
      { label: "Facts, analysis and careful checking", profileCode: "D" },
      { label: "Decisive action and personal drive", profileCode: "E" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Structured Planner", meaning: "Creates order, schedules and dependable processes.", interpretation: "Your responses suggest you bring reliability and organisation to your work.", nextStep: "Protect planning time, while practising action without complete certainty.", color: "blue" },
    { code: "B", label: "Adaptive Explorer", meaning: "Responds quickly, experiments and adjusts as situations change.", interpretation: "Your responses suggest you are energised by variety and challenge.", nextStep: "Add checkpoints so flexibility does not become unfinished work.", color: "emerald" },
    { code: "C", label: "People Connector", meaning: "Builds cooperation, morale and shared understanding.", interpretation: "Your responses suggest you naturally draw people together.", nextStep: "Balance relationship sensitivity with clear decisions and boundaries.", color: "yellow" },
    { code: "D", label: "Analytical Specialist", meaning: "Examines evidence, quality and underlying logic.", interpretation: "Your responses suggest you bring rigour and precision to your work.", nextStep: "Set decision deadlines so analysis does not delay action.", color: "purple" },
    { code: "E", label: "Action Driver", meaning: "Moves work forward rapidly and focuses on visible outcomes.", interpretation: "Your responses suggest you create momentum and get things done.", nextStep: "Slow down briefly for risk, stakeholder input and follow-through.", color: "orange" },
  ],
  dimensions: [],
};
