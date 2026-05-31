/**
 * Perceived Stress Scale (PSS-10)
 * By Sheldon Cohen, 1983.
 *
 * 10-item measure of perceived stress. Items 4, 5, 7, 8 are reverse-scored.
 * Freely available for educational and non-commercial use.
 * Score range: 0–40.
 */

import type { AssessmentConfig } from "./types";

const LIKERT_5 = [
  { label: "Never", value: 0 },
  { label: "Almost never", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Fairly often", value: 3 },
  { label: "Very often", value: 4 },
];

export const stressCheck: AssessmentConfig = {
  slug: "stress-check",
  meta: {
    title: "Stress Check",
    subtitle: "How stressed are you, really?",
    description:
      "Measure your current stress levels using a research-backed scale. Takes under 5 minutes and gives you immediate, private results.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "brain",
    source: "Based on the Perceived Stress Scale (PSS-10) by Cohen et al., 1983.",
  },
  instructions:
    "For each question, choose how often you have felt or thought a certain way during the last month. Answer quickly and honestly — there are no right or wrong answers.",
  questions: [
    { id: "s1", text: "In the last month, how often have you been upset because of something that happened unexpectedly?", options: LIKERT_5 },
    { id: "s2", text: "In the last month, how often have you felt that you were unable to control the important things in your life?", options: LIKERT_5 },
    { id: "s3", text: "In the last month, how often have you felt nervous and stressed?", options: LIKERT_5 },
    { id: "s4", text: "In the last month, how often have you felt confident about your ability to handle your personal problems?", options: LIKERT_5, reverse: true },
    { id: "s5", text: "In the last month, how often have you felt that things were going your way?", options: LIKERT_5, reverse: true },
    { id: "s6", text: "In the last month, how often have you found that you could not cope with all the things that you had to do?", options: LIKERT_5 },
    { id: "s7", text: "In the last month, how often have you been able to control irritations in your life?", options: LIKERT_5, reverse: true },
    { id: "s8", text: "In the last month, how often have you felt that you were on top of things?", options: LIKERT_5, reverse: true },
    { id: "s9", text: "In the last month, how often have you been angered because of things that were outside of your control?", options: LIKERT_5 },
    { id: "s10", text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?", options: LIKERT_5 },
  ],
  scoring: { method: "sum", min: 0, max: 40 },
  resultRanges: [
    {
      min: 0, max: 13,
      label: "Low Stress",
      color: "green",
      interpretation: "Your stress levels are well within a healthy range. You're managing life's demands effectively and maintaining a good sense of control.",
      suggestions: [
        "Continue your current stress management habits",
        "Share what works for you with people around you",
        "Stay mindful — low stress now doesn't mean ignoring self-care",
      ],
    },
    {
      min: 14, max: 26,
      label: "Moderate Stress",
      color: "yellow",
      interpretation: "You're experiencing a moderate level of stress. This is common, but worth paying attention to — especially if it's been consistent over time.",
      suggestions: [
        "Identify your top 2–3 stress triggers this month",
        "Build one daily micro-habit: breathing exercises, journaling, or a short walk",
        "Consider a structured approach like our Stress Management Toolkit",
      ],
    },
    {
      min: 27, max: 40,
      label: "High Stress",
      color: "red",
      interpretation: "Your stress levels are high. This doesn't mean something is wrong with you — it means your current load is exceeding your coping capacity. This is a signal to act.",
      suggestions: [
        "Prioritise rest and recovery — even small amounts matter",
        "Talk to someone you trust about what you're going through",
        "Our Burnout Recovery Workbook offers a structured 14-day reset plan",
        "If stress is persistent, consider speaking with a mental health professional",
      ],
    },
  ],
};
