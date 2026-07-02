/**
 * A20. Workplace Assertiveness Style
 * Tier: Professional
 * Shows how a person expresses opinions, boundaries, disagreement and needs in professional situations.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplaceAssertiveness: ProfileAssessmentConfig = {
  slug: "workplace-assertiveness-style",
  order: 20,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Assertiveness Style",
    subtitle: "How do you express yourself at work?",
    description:
      "See how you express opinions, set boundaries and handle disagreement in professional situations. Four styles, ten workplace scenarios.",
    purpose:
      "Shows how a person expresses opinions, boundaries, disagreement and needs in professional situations.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "message-circle",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["was2", "was6", "was9"],
  profileQuestions: [
    {
      id: "was1",
      text: "A colleague repeatedly sends work to you at the last moment. You are most likely to:",
      options: [
        { label: "Accept and manage it somehow", profileCode: "A" },
        { label: "Explain the difficulty and request earlier notice", profileCode: "B" },
        {
          label: "State you cannot continue accepting last-minute work and agree a process",
          profileCode: "C",
        },
        { label: "Tell them firmly this behaviour must stop immediately", profileCode: "D" },
      ],
    },
    {
      id: "was2",
      text: "You disagree with your manager's plan. You would:",
      options: [
        { label: "Stay quiet unless directly asked", profileCode: "A" },
        { label: "Ask questions that gently highlight the concern", profileCode: "B" },
        { label: "State your disagreement, reasons and an alternative", profileCode: "C" },
        { label: "Challenge the plan strongly to prevent a poor decision", profileCode: "D" },
      ],
    },
    {
      id: "was3",
      text: "During a meeting, someone interrupts you repeatedly. You:",
      options: [
        { label: "Let them continue and contribute later when there is space", profileCode: "A" },
        { label: "Politely say you would like to complete the point", profileCode: "B" },
        { label: "Stop the interruption and clearly reclaim the floor", profileCode: "C" },
        { label: "Tell them directly not to interrupt you again", profileCode: "D" },
      ],
    },
    {
      id: "was4",
      text: "A deadline is unrealistic. Your usual response is:",
      options: [
        { label: "Try to meet it without raising concern", profileCode: "A" },
        {
          label: "Explain the constraints and ask whether priorities can change",
          profileCode: "B",
        },
        {
          label: "State clearly what can realistically be delivered and by when",
          profileCode: "C",
        },
        { label: "Reject the deadline and insist it be reset", profileCode: "D" },
      ],
    },
    {
      id: "was5",
      text: "When saying no to a request, you tend to:",
      options: [
        { label: "Feel uncomfortable and often say yes anyway", profileCode: "A" },
        { label: "Give a detailed explanation to soften the refusal", profileCode: "B" },
        { label: "Decline briefly and offer an alternative where appropriate", profileCode: "C" },
        { label: "Refuse clearly without much concern about the reaction", profileCode: "D" },
      ],
    },
    {
      id: "was6",
      text: "A team member takes credit for your contribution. You:",
      options: [
        { label: "Avoid creating an issue", profileCode: "A" },
        { label: "Clarify your contribution privately with them", profileCode: "B" },
        { label: "Correct the record calmly with the relevant people", profileCode: "C" },
        { label: "Confront them immediately and strongly", profileCode: "D" },
      ],
    },
    {
      id: "was7",
      text: "When expressing an unpopular opinion, you:",
      options: [
        { label: "Often decide it is safer not to share it", profileCode: "A" },
        { label: "Frame it carefully and test the reaction first", profileCode: "B" },
        { label: "Share it clearly while acknowledging other perspectives", profileCode: "C" },
        {
          label: "Present it firmly and defend it until challenged with evidence",
          profileCode: "D",
        },
      ],
    },
    {
      id: "was8",
      text: "Your communication under pressure becomes:",
      options: [
        { label: "More hesitant and accommodating", profileCode: "A" },
        { label: "More cautious and diplomatic", profileCode: "B" },
        { label: "Clearer and more concise", profileCode: "C" },
        { label: "Sharper and more commanding", profileCode: "D" },
      ],
    },
    {
      id: "was9",
      text: "If your workload is already full and you receive another request, you:",
      options: [
        { label: "Accept and work longer to fit it in", profileCode: "A" },
        { label: "Ask which existing task should be deprioritised", profileCode: "B" },
        { label: "State your capacity and negotiate scope or timing", profileCode: "C" },
        {
          label: "Refuse unless the requester removes another responsibility first",
          profileCode: "D",
        },
      ],
    },
    {
      id: "was10",
      text: "People are most likely to describe your style as:",
      options: [
        { label: "Easygoing and agreeable", profileCode: "A" },
        { label: "Tactful and considerate", profileCode: "B" },
        { label: "Clear and self-respecting", profileCode: "C" },
        { label: "Strong and uncompromising", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Quiet Adapter",
      meaning: "Often preserves harmony by accommodating or withholding disagreement.",
      interpretation:
        "Your responses suggest you tend to prioritise peace and avoid friction. You accommodate more than you challenge, and disagreement often stays unspoken.",
      nextStep: "Prepare one clear sentence stating your view, need or boundary.",
      color: "blue",
    },
    {
      code: "B",
      label: "Diplomatic Balancer",
      meaning: "Expresses views carefully while protecting the relationship.",
      interpretation:
        "Your responses suggest you are tactful and considerate. You express yourself but soften the message to protect the relationship — sometimes at the cost of clarity.",
      nextStep: "Avoid over-softening important messages; state the request explicitly.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Direct Asserter",
      meaning: "Communicates needs and disagreement clearly and respectfully.",
      interpretation:
        "Your responses suggest you communicate with confidence and respect. You say what you mean, hold appropriate boundaries and do not rely on others to infer your needs.",
      nextStep: "Check how your directness lands across different personalities and cultures.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Forceful Driver",
      meaning: "Pushes strongly for a position, particularly when time or results matter.",
      interpretation:
        "Your responses suggest you are direct and persistent. You push your position firmly and may move quickly past others' objections in the pursuit of results.",
      nextStep: "Make space for questions and dissent before closing the conversation.",
      color: "orange",
    },
  ],
  dimensions: [],
};
