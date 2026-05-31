/**
 * Schutte Self-Report Emotional Intelligence Test (SSEIT) — Short Form
 * Based on Schutte et al., 1998.
 *
 * Adapted to a 12-item short form covering 4 EI dimensions:
 * perception, managing own emotions, managing others' emotions, utilisation.
 * Freely available for educational use.
 * Score range: 12–60.
 */

import type { AssessmentConfig } from "./types";

const AGREE_5 = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neither agree nor disagree", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly agree", value: 5 },
];

export const emotionalIntelligence: AssessmentConfig = {
  slug: "emotional-intelligence",
  meta: {
    title: "Emotional Intelligence Assessment",
    subtitle: "How well do you read and manage emotions?",
    description:
      "Explore your emotional intelligence across four key dimensions: perception, self-management, social skills, and utilisation. Quick, private, research-backed.",
    duration: "4–6 minutes",
    questionCount: 12,
    icon: "sparkles",
    source:
      "Adapted from the Schutte Self-Report Emotional Intelligence Test (SSEIT) by Schutte et al., 1998.",
  },
  instructions:
    "Read each statement and choose how much you agree or disagree based on how you typically feel and behave. Answer based on what you actually do — not what you think you should do.",
  questions: [
    // Perception of emotion
    { id: "ei1", text: "I can tell how people are feeling by looking at their facial expressions.", options: AGREE_5 },
    { id: "ei2", text: "I am aware of my emotions as I experience them.", options: AGREE_5 },
    { id: "ei3", text: "I can tell when someone close to me is upset, even if they don't say so.", options: AGREE_5 },
    // Managing own emotions
    { id: "ei4", text: "When I am faced with a difficult situation, I can usually find a way to calm myself down.", options: AGREE_5 },
    { id: "ei5", text: "I have control over my emotions.", options: AGREE_5 },
    { id: "ei6", text: "When I am in a positive mood, I can come up with new ideas more easily.", options: AGREE_5 },
    // Managing others' emotions
    { id: "ei7", text: "I can usually motivate myself to keep going when things get tough.", options: AGREE_5 },
    { id: "ei8", text: "I compliment others when they have done something well.", options: AGREE_5 },
    { id: "ei9", text: "I help others feel better when they are down.", options: AGREE_5 },
    // Utilisation of emotion
    { id: "ei10", text: "I use good moods to help me keep trying in the face of obstacles.", options: AGREE_5 },
    { id: "ei11", text: "I arrange events that others enjoy.", options: AGREE_5 },
    { id: "ei12", text: "I present myself in a way that makes a good impression on others.", options: AGREE_5 },
  ],
  scoring: { method: "sum", min: 12, max: 60 },
  resultRanges: [
    {
      min: 12, max: 28,
      label: "Developing EI",
      color: "orange",
      interpretation:
        "Your emotional intelligence has room for growth. This is completely normal — EI is a learnable skill, not a fixed trait. The fact that you're here shows awareness, which is step one.",
      suggestions: [
        "Start with self-awareness: pause 3 times a day and name what you're feeling",
        "Practice active listening — focus on understanding, not responding",
        "Our Emotional Intelligence Fundamentals course builds EI systematically",
        "Read about the four dimensions of EI — knowing the framework helps",
      ],
    },
    {
      min: 29, max: 44,
      label: "Moderate EI",
      color: "yellow",
      interpretation:
        "You have a solid foundation of emotional intelligence. You're reasonably aware of emotions in yourself and others, and you can manage them in most situations. There's room to deepen specific areas.",
      suggestions: [
        "Identify which EI dimension feels weakest — focus growth there",
        "Practice naming nuanced emotions (not just 'good' or 'bad')",
        "Seek feedback from people you trust: 'How do I come across when I'm stressed?'",
        "Our EI Workbook offers structured exercises for each dimension",
      ],
    },
    {
      min: 45, max: 60,
      label: "High EI",
      color: "green",
      interpretation:
        "You demonstrate strong emotional intelligence. You're attuned to your own emotional states and those of others, and you use emotions constructively. This is a real asset in relationships, work, and leadership.",
      suggestions: [
        "Your EI is a strength — use it to mentor and support others",
        "Watch for emotional labour fatigue: managing others' emotions takes energy",
        "Continue developing: EI deepens with intentional practice, even at high levels",
        "Consider how your EI skills translate to leadership and influence",
      ],
    },
  ],
};
