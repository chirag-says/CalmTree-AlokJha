/**
 * W12. Deadline Pressure Response Check
 * Profile-based: shows the person's typical behavioural pattern as deadlines approach.
 */

import type { ProfileAssessmentConfig } from "./types";

export const deadlinePressureResponse: ProfileAssessmentConfig = {
  slug: "deadline-pressure-response",
  order: 27,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Deadline Pressure Response Check",
    subtitle: "How do you respond to deadlines?",
    description: "Discover your typical behavioural pattern as deadlines approach and pressure increases.",
    purpose: "Shows the person's typical behavioural pattern as deadlines approach and pressure increases.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "zap",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w12q1", "w12q5", "w12q9"],
  profileQuestions: [
    { id: "w12q1", text: "When a deadline is assigned, you first:", options: [
      { label: "Break the work into milestones", profileCode: "A" },
      { label: "Start and build a regular rhythm", profileCode: "B" },
      { label: "Note the date and wait for urgency", profileCode: "C" },
      { label: "Feel overwhelmed and hesitate", profileCode: "D" },
    ]},
    { id: "w12q2", text: "Your productivity is highest:", options: [
      { label: "Early, when there is time to organise", profileCode: "A" },
      { label: "Across the full work period", profileCode: "B" },
      { label: "Near the deadline", profileCode: "C" },
      { label: "After someone helps clarify the first step", profileCode: "D" },
    ]},
    { id: "w12q3", text: "If a deadline moves earlier, you:", options: [
      { label: "Re-plan immediately", profileCode: "A" },
      { label: "Increase pace and simplify", profileCode: "B" },
      { label: "Rely on an intense sprint", profileCode: "C" },
      { label: "Struggle to decide where to begin", profileCode: "D" },
    ]},
    { id: "w12q4", text: "You use reminders and trackers:", options: [
      { label: "From the beginning", profileCode: "A" },
      { label: "For key checkpoints", profileCode: "B" },
      { label: "Mainly near the end", profileCode: "C" },
      { label: "Inconsistently when stressed", profileCode: "D" },
    ]},
    { id: "w12q5", text: "A long deadline can lead you to:", options: [
      { label: "Create your own earlier dates", profileCode: "A" },
      { label: "Maintain a moderate pace", profileCode: "B" },
      { label: "Postpone because urgency is absent", profileCode: "C" },
      { label: "Avoid the task because it feels too large", profileCode: "D" },
    ]},
    { id: "w12q6", text: "Under time pressure, quality usually:", options: [
      { label: "Remains stable because planning protected it", profileCode: "A" },
      { label: "Stays acceptable through prioritisation", profileCode: "B" },
      { label: "Varies depending on the sprint", profileCode: "C" },
      { label: "Drops because thinking becomes blocked", profileCode: "D" },
    ]},
    { id: "w12q7", text: "Your main deadline risk is:", options: [
      { label: "Over-planning", profileCode: "A" },
      { label: "Underestimating final complexity", profileCode: "B" },
      { label: "Leaving too little recovery or review time", profileCode: "C" },
      { label: "Avoidance and delayed initiation", profileCode: "D" },
    ]},
    { id: "w12q8", text: "When several deadlines overlap, you:", options: [
      { label: "Map dependencies and sequence them", profileCode: "A" },
      { label: "Prioritise and communicate trade-offs", profileCode: "B" },
      { label: "Move rapidly between urgent tasks", profileCode: "C" },
      { label: "Feel stuck and may switch without progress", profileCode: "D" },
    ]},
    { id: "w12q9", text: "You most need from a manager:", options: [
      { label: "Early clarity", profileCode: "A" },
      { label: "Priority decisions", profileCode: "B" },
      { label: "A firm external deadline", profileCode: "C" },
      { label: "Help breaking the task into a first step", profileCode: "D" },
    ]},
    { id: "w12q10", text: "Your development priority is:", options: [
      { label: "Starting before the plan is perfect", profileCode: "A" },
      { label: "Adding contingency time", profileCode: "B" },
      { label: "Creating earlier checkpoints", profileCode: "C" },
      { label: "Using tiny starts and visible support", profileCode: "D" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Early Planner", meaning: "Reduces pressure through early structure and steady progress.", interpretation: "Your responses suggest you reduce pressure through early structure and steady progress.", nextStep: "Time-box planning and begin a small deliverable early.", color: "blue" },
    { code: "B", label: "Steady Executor", meaning: "Works consistently and increases pace as the deadline approaches.", interpretation: "Your responses suggest you work consistently and increase pace as the deadline approaches.", nextStep: "Add contingency for complexity and communicate trade-offs before the final stage.", color: "emerald" },
    { code: "C", label: "Deadline Sprinter", meaning: "Uses urgency to create focus and completes much of the work late.", interpretation: "Your responses suggest you use urgency to create focus and complete much of the work late.", nextStep: "Create external mid-point commitments and protect review time.", color: "yellow" },
    { code: "D", label: "Pressure Freezer", meaning: "Loses clarity or delays action when urgency becomes intense.", interpretation: "Your responses suggest you may lose clarity or delay action when urgency becomes intense.", nextStep: "Define a five-minute first action and ask for prioritisation before pressure escalates.", color: "orange" },
  ],
  dimensions: [],
};
