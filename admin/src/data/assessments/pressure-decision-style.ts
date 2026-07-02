/**
 * A33. Pressure Decision Style
 * Tier: Professional
 * Shows the person's most common decision pattern when time, consequences or visibility create pressure.
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
    subtitle: "How do you decide when stakes are high?",
    description:
      "See your most common decision pattern when time, consequences or visibility create pressure. Five profiles, ten situational questions.",
    purpose:
      "Shows the person's most common decision pattern when time, consequences or visibility create pressure.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "zap",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["pds1", "pds5", "pds9"],
  profileQuestions: [
    {
      id: "pds1",
      text: "A decision must be made today with incomplete information. You:",
      options: [
        { label: "Choose the most workable option and move", profileCode: "A" },
        {
          label: "Identify the few facts that will materially change the choice",
          profileCode: "B",
        },
        { label: "Consult the key people and build agreement", profileCode: "C" },
        { label: "Delay if possible until the downside is clearer", profileCode: "D" },
        {
          label: "Use your experience and choose what feels directionally right",
          profileCode: "E",
        },
      ],
    },
    {
      id: "pds2",
      text: "When consequences are highly visible, you tend to:",
      options: [
        { label: "Become more decisive", profileCode: "A" },
        { label: "Document reasoning more carefully", profileCode: "B" },
        { label: "Seek greater stakeholder alignment", profileCode: "C" },
        { label: "Become more cautious about committing", profileCode: "D" },
        { label: "Trust your judgement but stay alert to signals", profileCode: "E" },
      ],
    },
    {
      id: "pds3",
      text: "Two options appear equally strong. You:",
      options: [
        { label: "Choose one quickly and adjust later", profileCode: "A" },
        { label: "Compare them against explicit criteria", profileCode: "B" },
        { label: "Ask affected people which trade-off they can support", profileCode: "C" },
        { label: "Choose the option with less potential loss", profileCode: "D" },
        { label: "Follow the option that fits the wider pattern you perceive", profileCode: "E" },
      ],
    },
    {
      id: "pds4",
      text: "When challenged after a decision, you defend it through:",
      options: [
        { label: "The need for timely action", profileCode: "A" },
        { label: "The evidence and logic used", profileCode: "B" },
        { label: "The consultation and shared agreement", profileCode: "C" },
        { label: "The safeguards and risks avoided", profileCode: "D" },
        { label: "Experience and contextual judgement", profileCode: "E" },
      ],
    },
    {
      id: "pds5",
      text: "Your common pressure-related mistake is:",
      options: [
        { label: "Moving before implications are fully considered", profileCode: "A" },
        { label: "Taking too long to gather confidence", profileCode: "B" },
        { label: "Allowing too many voices to slow the choice", profileCode: "C" },
        { label: "Avoiding a decision that carries visible risk", profileCode: "D" },
        { label: "Over-trusting a pattern that may not apply", profileCode: "E" },
      ],
    },
    {
      id: "pds6",
      text: "A senior leader asks for your recommendation immediately. You:",
      options: [
        { label: "Give the clearest current choice", profileCode: "A" },
        { label: "State what the evidence supports and what remains unknown", profileCode: "B" },
        { label: "Clarify who will be affected and whose input matters", profileCode: "C" },
        { label: "Highlight the downside and propose a safer option", profileCode: "D" },
        { label: "Offer the direction your experience suggests", profileCode: "E" },
      ],
    },
    {
      id: "pds7",
      text: "When a decision turns out poorly, you first review:",
      options: [
        { label: "Whether speed was appropriate", profileCode: "A" },
        { label: "Which assumptions or data were wrong", profileCode: "B" },
        { label: "Whether the right people were involved", profileCode: "C" },
        { label: "Which warning signs or protections were missed", profileCode: "D" },
        { label: "Whether intuition was distorted by bias or emotion", profileCode: "E" },
      ],
    },
    {
      id: "pds8",
      text: "Which environment supports your best decisions?",
      options: [
        { label: "Clear authority and freedom to act", profileCode: "A" },
        { label: "Reliable information and time to compare", profileCode: "B" },
        { label: "Open discussion and stakeholder access", profileCode: "C" },
        { label: "Defined limits and low irreversible exposure", profileCode: "D" },
        { label: "Context, experience and freedom to use judgement", profileCode: "E" },
      ],
    },
    {
      id: "pds9",
      text: "Under intense time pressure, you are most likely to say:",
      options: [
        { label: "We need a decision now", profileCode: "A" },
        { label: "What fact matters most?", profileCode: "B" },
        { label: "Who must be aligned?", profileCode: "C" },
        { label: "What could go seriously wrong?", profileCode: "D" },
        { label: "What does experience tell us?", profileCode: "E" },
      ],
    },
    {
      id: "pds10",
      text: "A useful balancing practice for you is:",
      options: [
        { label: "Pause briefly before commitment", profileCode: "A" },
        { label: "Set an evidence threshold", profileCode: "B" },
        { label: "Set a consultation boundary", profileCode: "C" },
        { label: "Use a reversible first step", profileCode: "D" },
        { label: "Seek one contrary viewpoint", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Rapid Decider",
      meaning: "Chooses quickly to create momentum and reduce uncertainty.",
      interpretation:
        "Your responses suggest you move quickly under pressure. You prioritise action over analysis, trusting that momentum is more valuable than waiting for certainty.",
      nextStep: "Use a two-minute risk and reversibility check before committing.",
      color: "orange",
    },
    {
      code: "B",
      label: "Evidence Seeker",
      meaning: "Looks for facts, comparison and a defensible rationale.",
      interpretation:
        "Your responses suggest you make pressure decisions through analysis. You look for facts, compare options and want to be able to explain your reasoning if challenged.",
      nextStep: "Define the minimum evidence required and a decision deadline.",
      color: "blue",
    },
    {
      code: "C",
      label: "Consensus Builder",
      meaning: "Seeks alignment and shared ownership before deciding.",
      interpretation:
        "Your responses suggest you make pressure decisions by building shared understanding. You seek input, create alignment and prefer decisions that people can stand behind collectively.",
      nextStep: "Separate consultation from permission and identify the final decision owner.",
      color: "emerald",
    },
    {
      code: "D",
      label: "Cautious Protector",
      meaning: "Prioritises avoiding loss, criticism or irreversible mistakes.",
      interpretation:
        "Your responses suggest you make pressure decisions conservatively. Avoiding the worst outcome matters more than capturing the best opportunity.",
      nextStep: "Compare the cost of delay with the cost of action and use reversible steps.",
      color: "purple",
    },
    {
      code: "E",
      label: "Intuitive Navigator",
      meaning: "Relies on experience, pattern recognition and an internal sense of direction.",
      interpretation:
        "Your responses suggest you make pressure decisions through intuition. You trust the signals from experience, past patterns and an internal sense of what is right.",
      nextStep: "Test intuition against one disconfirming question or external perspective.",
      color: "yellow",
    },
  ],
  dimensions: [],
};
