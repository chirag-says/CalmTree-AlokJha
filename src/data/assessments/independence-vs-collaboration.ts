/**
 * W8. Independence vs Collaboration Profile
 * Profile-based: shows how a person prefers to divide thinking, ownership
 * and execution between individual and group work.
 */

import type { ProfileAssessmentConfig } from "./types";

export const independenceVsCollaboration: ProfileAssessmentConfig = {
  slug: "independence-vs-collaboration",
  order: 23,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Independence vs Collaboration Profile",
    subtitle: "Do you work best alone or with others?",
    description:
      "Discover how you prefer to divide thinking, ownership and execution between individual and group work.",
    purpose:
      "Shows how a person prefers to divide thinking, ownership and execution between individual and group work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "git-branch",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w8q1", "w8q5", "w8q9"],
  profileQuestions: [
    {
      id: "w8q1",
      text: "When given a complex assignment, you prefer to:",
      options: [
        { label: "Own it independently from start to finish", profileCode: "A" },
        { label: "Work alone first and seek input at selected points", profileCode: "B" },
        { label: "Divide the work between solo and joint phases", profileCode: "C" },
        { label: "Work closely with others throughout", profileCode: "D" },
      ],
    },
    {
      id: "w8q2",
      text: "Your best ideas usually emerge when you:",
      options: [
        { label: "Have uninterrupted time to think", profileCode: "A" },
        { label: "Think alone, then test ideas with someone", profileCode: "B" },
        { label: "Move between discussion and reflection", profileCode: "C" },
        { label: "Brainstorm actively with others", profileCode: "D" },
      ],
    },
    {
      id: "w8q3",
      text: "A collaborative project feels difficult when:",
      options: [
        { label: "There are too many meetings and dependencies", profileCode: "A" },
        { label: "Input arrives at the wrong time", profileCode: "B" },
        { label: "The balance between ownership and coordination is poor", profileCode: "C" },
        { label: "People work separately without enough exchange", profileCode: "D" },
      ],
    },
    {
      id: "w8q4",
      text: "When a problem appears, you:",
      options: [
        { label: "Try to solve it before involving others", profileCode: "A" },
        { label: "Do initial analysis, then seek targeted help", profileCode: "B" },
        { label: "Decide whether solo or group work fits the problem", profileCode: "C" },
        { label: "Bring the relevant people together quickly", profileCode: "D" },
      ],
    },
    {
      id: "w8q5",
      text: "Your preferred ownership model is:",
      options: [
        { label: "Clear individual accountability", profileCode: "A" },
        { label: "Individual ownership with review points", profileCode: "B" },
        { label: "Mixed individual and shared ownership", profileCode: "C" },
        { label: "Joint ownership and frequent coordination", profileCode: "D" },
      ],
    },
    {
      id: "w8q6",
      text: "You contribute best in a team by:",
      options: [
        { label: "Taking a specialist workstream", profileCode: "A" },
        { label: "Delivering independently and integrating later", profileCode: "B" },
        { label: "Switching between task and relationship needs", profileCode: "C" },
        { label: "Connecting people and maintaining shared momentum", profileCode: "D" },
      ],
    },
    {
      id: "w8q7",
      text: "When meetings increase, you:",
      options: [
        { label: "Feel your productive time is being lost", profileCode: "A" },
        { label: "Want fewer, more purposeful touchpoints", profileCode: "B" },
        { label: "Use some meetings and protect some focus blocks", profileCode: "C" },
        { label: "Often find the interaction useful", profileCode: "D" },
      ],
    },
    {
      id: "w8q8",
      text: "When a colleague offers help, you:",
      options: [
        { label: "Prefer to continue alone unless necessary", profileCode: "A" },
        { label: "Accept help for a specific part", profileCode: "B" },
        { label: "Consider what combination would work best", profileCode: "C" },
        { label: "Welcome the chance to work together", profileCode: "D" },
      ],
    },
    {
      id: "w8q9",
      text: "People may experience you as:",
      options: [
        { label: "Too independent", profileCode: "A" },
        { label: "Selective about collaboration", profileCode: "B" },
        { label: "Flexible and balanced", profileCode: "C" },
        { label: "Over-reliant on group exchange", profileCode: "D" },
      ],
    },
    {
      id: "w8q10",
      text: "Your development priority is:",
      options: [
        { label: "Inviting input before completion", profileCode: "A" },
        { label: "Making collaboration timing explicit", profileCode: "B" },
        { label: "Choosing the mode intentionally", profileCode: "C" },
        { label: "Protecting individual focus and ownership", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Solo Specialist",
      meaning: "Prefers deep individual ownership and minimal coordination.",
      interpretation:
        "Your responses suggest you prefer deep individual ownership and minimal coordination.",
      nextStep: "Invite targeted input before your work is too complete to change.",
      color: "blue",
    },
    {
      code: "B",
      label: "Independent Collaborator",
      meaning: "Likes personal ownership with targeted input at key moments.",
      interpretation:
        "Your responses suggest you like personal ownership with targeted input at key moments.",
      nextStep: "Tell collaborators exactly when and what kind of input is useful.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Balanced Partner",
      meaning: "Moves comfortably between solo focus and shared problem-solving.",
      interpretation:
        "Your responses suggest you move comfortably between solo focus and shared problem-solving.",
      nextStep: "Choose the mode intentionally rather than defaulting to whichever is easiest.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Team Integrator",
      meaning: "Thinks and performs best through frequent exchange and shared ownership.",
      interpretation:
        "Your responses suggest you think and perform best through frequent exchange and shared ownership.",
      nextStep: "Protect some individual focus time and avoid unnecessary group dependency.",
      color: "purple",
    },
  ],
  dimensions: [],
};
