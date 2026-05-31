/**
 * Rosenberg Self-Esteem Scale (RSES)
 * By Morris Rosenberg, 1965.
 *
 * 10-item measure of global self-esteem. Items 2, 5, 6, 8, 9 are reverse-scored.
 * Public domain — the most widely used self-esteem measure in psychology.
 * Score range: 10–40.
 */

import type { AssessmentConfig } from "./types";

const AGREE_4 = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Agree", value: 3 },
  { label: "Strongly agree", value: 4 },
];

export const selfEsteemCheck: AssessmentConfig = {
  slug: "self-esteem-check",
  meta: {
    title: "Self-Esteem Check",
    subtitle: "A gentle look at how you see yourself.",
    description:
      "Understand your current self-esteem level using the world's most widely used self-esteem scale. Private, quick, and judgment-free.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    source: "Based on the Rosenberg Self-Esteem Scale (RSES) by Rosenberg, 1965.",
  },
  instructions:
    "Read each statement and choose how much you agree or disagree with it right now. There are no right or wrong answers — just be honest about how you feel today.",
  questions: [
    { id: "se1", text: "On the whole, I am satisfied with myself.", options: AGREE_4 },
    { id: "se2", text: "At times I think I am no good at all.", options: AGREE_4, reverse: true },
    { id: "se3", text: "I feel that I have a number of good qualities.", options: AGREE_4 },
    { id: "se4", text: "I am able to do things as well as most other people.", options: AGREE_4 },
    { id: "se5", text: "I feel I do not have much to be proud of.", options: AGREE_4, reverse: true },
    { id: "se6", text: "I certainly feel useless at times.", options: AGREE_4, reverse: true },
    { id: "se7", text: "I feel that I'm a person of worth, at least on an equal plane with others.", options: AGREE_4 },
    { id: "se8", text: "I wish I could have more respect for myself.", options: AGREE_4, reverse: true },
    { id: "se9", text: "All in all, I am inclined to feel that I am a failure.", options: AGREE_4, reverse: true },
    { id: "se10", text: "I take a positive attitude toward myself.", options: AGREE_4 },
  ],
  scoring: { method: "sum", min: 10, max: 40 },
  resultRanges: [
    {
      min: 10, max: 19,
      label: "Low Self-Esteem",
      color: "red",
      interpretation: "Your self-esteem is currently low. This doesn't define you — it reflects how you're seeing yourself right now, and that can change. Many people experience this during challenging periods.",
      suggestions: [
        "Start small: write down one thing you did well today, every day",
        "Challenge one self-critical thought — ask: would I say this to a friend?",
        "Our Self-Reflection Journal offers 30 days of guided prompts",
        "If low self-esteem is persistent, consider speaking with a counsellor",
      ],
    },
    {
      min: 20, max: 29,
      label: "Normal Self-Esteem",
      color: "yellow",
      interpretation: "Your self-esteem is in the normal range. Most people fall here. You have a realistic view of yourself — a mix of confidence and self-doubt, which is human.",
      suggestions: [
        "Build on your strengths — identify what you're naturally good at",
        "Notice when self-doubt is loudest — is it situational?",
        "Our Emotional Intelligence course can deepen self-awareness",
      ],
    },
    {
      min: 30, max: 40,
      label: "High Self-Esteem",
      color: "green",
      interpretation: "You have a strong, healthy sense of self-worth. You see yourself clearly — strengths and areas for growth — without being overly harsh or unrealistic.",
      suggestions: [
        "Your self-regard is a real asset — use it to lift others too",
        "Stay open to feedback without feeling threatened by it",
        "Consider how your confidence can support your relationships and leadership",
      ],
    },
  ],
};
