/**
 * A22. Recognition Need at Work
 * Tier: Professional
 * Identifies the forms of appreciation, visibility and progress that most strongly reinforce a person's motivation.
 */

import type { ProfileAssessmentConfig } from "./types";

export const recognitionNeedAtWork: ProfileAssessmentConfig = {
  slug: "recognition-need-at-work",
  order: 22,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Recognition Need at Work",
    subtitle: "What kind of recognition motivates you most?",
    description:
      "Identify the forms of appreciation, visibility and progress that most strongly reinforce your motivation at work. Four profiles, ten questions.",
    purpose:
      "Identifies the forms of appreciation, visibility and progress that most strongly reinforce a person's motivation.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "award",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["rna2", "rna6", "rna10"],
  profileQuestions: [
    {
      id: "rna1",
      text: "After completing difficult work, what feels most rewarding?",
      options: [
        { label: "Knowing the work met my own standard", profileCode: "A" },
        { label: "A sincere message from someone who understands the effort", profileCode: "B" },
        { label: "Public acknowledgement of the contribution", profileCode: "C" },
        { label: "A larger opportunity or responsibility as a result", profileCode: "D" },
      ],
    },
    {
      id: "rna2",
      text: "When good work goes unnoticed, you are most likely to:",
      options: [
        { label: "Remain satisfied if the outcome was meaningful", profileCode: "A" },
        { label: "Feel disappointed that no one personally acknowledged it", profileCode: "B" },
        { label: "Feel invisible or undervalued", profileCode: "C" },
        { label: "Question whether the work is helping your progression", profileCode: "D" },
      ],
    },
    {
      id: "rna3",
      text: "Which form of praise matters most?",
      options: [
        { label: "Seeing real impact and improvement from my work", profileCode: "A" },
        { label: "Specific private feedback about what I did well", profileCode: "B" },
        { label: "Recognition in front of colleagues or leaders", profileCode: "C" },
        { label: "Recognition linked to promotion, ownership or opportunity", profileCode: "D" },
      ],
    },
    {
      id: "rna4",
      text: "You feel most valued when:",
      options: [
        { label: "You are trusted to do important work well", profileCode: "A" },
        { label: "Someone takes time to appreciate your effort personally", profileCode: "B" },
        { label: "Your contribution is clearly visible to others", profileCode: "C" },
        { label: "Your contribution leads to a bigger role or challenge", profileCode: "D" },
      ],
    },
    {
      id: "rna5",
      text: "A reward programme motivates you most when it offers:",
      options: [
        { label: "Meaningful projects or learning opportunities", profileCode: "A" },
        { label: "Personal appreciation from respected people", profileCode: "B" },
        { label: "Awards, announcements or visible status", profileCode: "C" },
        { label: "Career advancement or expanded authority", profileCode: "D" },
      ],
    },
    {
      id: "rna6",
      text: "If another person receives credit for a shared success, you:",
      options: [
        { label: "Focus on whether the work achieved its purpose", profileCode: "A" },
        { label: "Want your close colleagues to know your role", profileCode: "B" },
        { label: "Feel strongly that your contribution should also be visible", profileCode: "C" },
        { label: "Worry that it may affect future opportunities for you", profileCode: "D" },
      ],
    },
    {
      id: "rna7",
      text: "What makes repeated effort worthwhile?",
      options: [
        { label: "Improving my competence and producing good work", profileCode: "A" },
        { label: "Feeling seen by people who matter to me", profileCode: "B" },
        { label: "Building a positive professional reputation", profileCode: "C" },
        { label: "Moving towards larger goals and positions", profileCode: "D" },
      ],
    },
    {
      id: "rna8",
      text: "You are most likely to stay in an organisation that:",
      options: [
        { label: "Provides meaningful work and real autonomy", profileCode: "A" },
        { label: "Has a culture of sincere personal appreciation", profileCode: "B" },
        { label: "Celebrates contributions openly and publicly", profileCode: "C" },
        { label: "Offers clear paths to growth and advancement", profileCode: "D" },
      ],
    },
    {
      id: "rna9",
      text: "When receiving feedback, the most motivating message is:",
      options: [
        { label: "This work made a real difference", profileCode: "A" },
        { label: "I noticed the care and effort you put in", profileCode: "B" },
        { label: "People have recognised your excellent contribution", profileCode: "C" },
        { label: "You are ready for a larger opportunity", profileCode: "D" },
      ],
    },
    {
      id: "rna10",
      text: "Which absence would reduce your motivation most?",
      options: [
        { label: "Lack of purpose or opportunities to learn", profileCode: "A" },
        { label: "Lack of personal appreciation", profileCode: "B" },
        { label: "Lack of visibility and public acknowledgement", profileCode: "C" },
        { label: "Lack of progression and new challenges", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Intrinsic Contributor",
      meaning: "Motivation comes mainly from meaningful work, mastery and personal standards.",
      interpretation:
        "Your responses suggest your deepest motivation is internal. You are driven by quality, purpose and the satisfaction of meeting your own standards.",
      nextStep: "Communicate achievements even when external recognition is not your main need.",
      color: "blue",
    },
    {
      code: "B",
      label: "Private Appreciation Seeker",
      meaning: "Values sincere, specific acknowledgement from trusted people.",
      interpretation:
        "Your responses suggest you are motivated by personal, meaningful recognition from people you respect. Generic praise matters less than sincere acknowledgement of specific effort.",
      nextStep: "Ask for useful feedback instead of waiting silently for appreciation.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Visible Recognition Seeker",
      meaning: "Feels energised when contributions are publicly acknowledged and seen.",
      interpretation:
        "Your responses suggest you are motivated by visibility. Knowing your contribution is seen by others fuels your effort and sense of professional identity.",
      nextStep: "Separate healthy visibility from constant comparison with others.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Advancement-Oriented Achiever",
      meaning: "Connects recognition with greater responsibility, authority or progression.",
      interpretation:
        "Your responses suggest you are motivated by growth and progression. Recognition that comes in the form of greater opportunity is the most meaningful to you.",
      nextStep: "Define success beyond titles so progress remains sustainable and meaningful.",
      color: "orange",
    },
  ],
  dimensions: [],
};
