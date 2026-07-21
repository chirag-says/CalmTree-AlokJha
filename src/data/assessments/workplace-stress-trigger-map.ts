/**
 * W11. Workplace Stress Trigger Map
 * Profile-based: identifies the work condition most likely to activate stress.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplaceStressTriggerMap: ProfileAssessmentConfig = {
  slug: "workplace-stress-trigger-map",
  order: 26,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Stress Trigger Map",
    subtitle: "What triggers your workplace stress?",
    description:
      "Identify the work condition most likely to activate your stress: workload, uncertainty, relationships, control or evaluation.",
    purpose:
      "Identifies the work condition most likely to activate stress: workload, uncertainty, relationships, control or evaluation.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "alert-circle",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w11q1", "w11q5", "w11q9"],
  profileQuestions: [
    {
      id: "w11q1",
      text: "Which situation raises your tension fastest?",
      options: [
        { label: "Several urgent tasks arriving together", profileCode: "A" },
        { label: "Being asked to act without clear information", profileCode: "B" },
        { label: "Conflict or cold behaviour from colleagues", profileCode: "C" },
        { label: "Decisions being made without your input", profileCode: "D" },
        { label: "A visible review of your performance", profileCode: "E" },
      ],
    },
    {
      id: "w11q2",
      text: "Before a difficult workday, you worry most about:",
      options: [
        { label: "Not having enough time", profileCode: "A" },
        { label: "Not knowing what will happen", profileCode: "B" },
        { label: "Difficult conversations", profileCode: "C" },
        { label: "Being unable to influence the situation", profileCode: "D" },
        { label: "Being judged or compared", profileCode: "E" },
      ],
    },
    {
      id: "w11q3",
      text: "When pressure continues, your thoughts focus on:",
      options: [
        { label: "The size of the workload", profileCode: "A" },
        { label: "Unknowns and possible surprises", profileCode: "B" },
        { label: "What people are thinking or doing", profileCode: "C" },
        { label: "Loss of choice or control", profileCode: "D" },
        { label: "Whether you will appear competent", profileCode: "E" },
      ],
    },
    {
      id: "w11q4",
      text: "A change announcement is stressful mainly when:",
      options: [
        { label: "It adds more work", profileCode: "A" },
        { label: "Details are missing", profileCode: "B" },
        { label: "It may disrupt relationships", profileCode: "C" },
        { label: "It removes autonomy", profileCode: "D" },
        { label: "It changes how success will be judged", profileCode: "E" },
      ],
    },
    {
      id: "w11q5",
      text: "In meetings, you feel most stressed by:",
      options: [
        { label: "Too many new actions", profileCode: "A" },
        { label: "Ambiguous decisions", profileCode: "B" },
        { label: "Tension or disrespect", profileCode: "C" },
        { label: "Having no influence", profileCode: "D" },
        { label: "Being challenged publicly", profileCode: "E" },
      ],
    },
    {
      id: "w11q6",
      text: "Your body reacts most strongly when:",
      options: [
        { label: "Deadlines compress", profileCode: "A" },
        { label: "You cannot predict the next step", profileCode: "B" },
        { label: "Someone is angry or dismissive", profileCode: "C" },
        { label: "You are closely controlled", profileCode: "D" },
        { label: "Your work is being evaluated", profileCode: "E" },
      ],
    },
    {
      id: "w11q7",
      text: "The reassurance that helps most is:",
      options: [
        { label: "A realistic priority plan", profileCode: "A" },
        { label: "Clear information", profileCode: "B" },
        { label: "A supportive conversation", profileCode: "C" },
        { label: "Meaningful choice or authority", profileCode: "D" },
        { label: "Specific and fair feedback", profileCode: "E" },
      ],
    },
    {
      id: "w11q8",
      text: "You recover faster when:",
      options: [
        { label: "Workload reduces", profileCode: "A" },
        { label: "Uncertainty is resolved", profileCode: "B" },
        { label: "The relationship is repaired", profileCode: "C" },
        { label: "You regain influence", profileCode: "D" },
        { label: "You understand how performance is viewed", profileCode: "E" },
      ],
    },
    {
      id: "w11q9",
      text: "A recurring work frustration is:",
      options: [
        { label: "Too much to do", profileCode: "A" },
        { label: "Constant ambiguity", profileCode: "B" },
        { label: "Difficult people dynamics", profileCode: "C" },
        { label: "Micromanagement or powerlessness", profileCode: "D" },
        { label: "Unfair or unclear evaluation", profileCode: "E" },
      ],
    },
    {
      id: "w11q10",
      text: "Your best stress plan should first address:",
      options: [
        { label: "Capacity and priorities", profileCode: "A" },
        { label: "Information and scenario planning", profileCode: "B" },
        { label: "Boundaries and support", profileCode: "C" },
        { label: "Decision rights and agency", profileCode: "D" },
        { label: "Standards, feedback and self-worth", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Workload Trigger",
      meaning: "Stress rises mainly when volume, pace or competing demands exceed capacity.",
      interpretation:
        "Your responses suggest stress rises mainly when volume, pace or competing demands exceed capacity.",
      nextStep: "Use capacity planning, explicit trade-offs and workload boundaries.",
      color: "blue",
    },
    {
      code: "B",
      label: "Uncertainty Trigger",
      meaning: "Stress rises when expectations, information or outcomes are unclear.",
      interpretation:
        "Your responses suggest stress rises when expectations, information or outcomes are unclear.",
      nextStep:
        "Ask what is known, unknown and next review point rather than seeking total certainty.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Relationship Trigger",
      meaning: "Stress rises through conflict, disrespect, isolation or difficult interactions.",
      interpretation:
        "Your responses suggest stress rises through conflict, disrespect, isolation or difficult interactions.",
      nextStep: "Strengthen communication, support and interpersonal boundaries.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Control Trigger",
      meaning: "Stress rises when autonomy, influence or decision rights are limited.",
      interpretation:
        "Your responses suggest stress rises when autonomy, influence or decision rights are limited.",
      nextStep: "Identify the smallest area of choice or influence and negotiate decision rights.",
      color: "orange",
    },
    {
      code: "E",
      label: "Evaluation Trigger",
      meaning: "Stress rises when performance, reputation or comparison feels highly visible.",
      interpretation:
        "Your responses suggest stress rises when performance, reputation or comparison feels highly visible.",
      nextStep: "Clarify standards and separate specific feedback from global self-worth.",
      color: "purple",
    },
  ],
  dimensions: [],
};
