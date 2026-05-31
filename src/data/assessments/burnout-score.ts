/**
 * Copenhagen Burnout Inventory — Personal Burnout Subscale
 * By Kristensen et al., 2005.
 *
 * 6-item measure of personal (non-work-specific) burnout.
 * Freely available — no copyright restrictions for educational use.
 * Score range: 0–100 (percentage scale).
 */

import type { AssessmentConfig } from "./types";

const FREQUENCY_5 = [
  { label: "Never / Almost never", value: 0 },
  { label: "Seldom", value: 25 },
  { label: "Sometimes", value: 50 },
  { label: "Often", value: 75 },
  { label: "Always", value: 100 },
];

const DEGREE_5 = [
  { label: "Very little", value: 0 },
  { label: "A little", value: 25 },
  { label: "Somewhat", value: 50 },
  { label: "A lot", value: 75 },
  { label: "Very much", value: 100 },
];

export const burnoutScore: AssessmentConfig = {
  slug: "burnout-score",
  meta: {
    title: "Burnout Score",
    subtitle: "How close to burnout are you?",
    description:
      "A quick, research-backed check on your personal burnout level. Six honest questions, instant results, completely private.",
    duration: "2–3 minutes",
    questionCount: 6,
    icon: "flame",
    source: "Based on the Copenhagen Burnout Inventory (CBI) by Kristensen et al., 2005.",
  },
  instructions:
    "Answer each question based on how you've been feeling in general over the past two weeks. Be honest with yourself — there are no right or wrong answers.",
  questions: [
    { id: "b1", text: "How often do you feel tired?", options: FREQUENCY_5 },
    { id: "b2", text: "How often are you physically exhausted?", options: FREQUENCY_5 },
    { id: "b3", text: "How often are you emotionally exhausted?", options: FREQUENCY_5 },
    { id: "b4", text: "How often do you think: \"I can't take it anymore\"?", options: FREQUENCY_5 },
    { id: "b5", text: "How often do you feel worn out?", options: FREQUENCY_5 },
    { id: "b6", text: "How often do you feel weak and susceptible to illness?", options: FREQUENCY_5 },
  ],
  scoring: { method: "average", min: 0, max: 100 },
  resultRanges: [
    {
      min: 0, max: 25,
      label: "Low Burnout",
      color: "green",
      interpretation: "You're in a healthy zone. Your energy levels and emotional reserves are strong. This is a great foundation to build on.",
      suggestions: [
        "Keep doing what's working — your habits are serving you well",
        "Use this clarity to invest in growth, not just maintenance",
        "Check in with yourself monthly to catch any shifts early",
      ],
    },
    {
      min: 26, max: 50,
      label: "Moderate Burnout",
      color: "yellow",
      interpretation: "You're showing early signs of burnout. You might be pushing through more than you realise. This is the best time to intervene — before it gets worse.",
      suggestions: [
        "Identify one thing draining you most — can you reduce or delegate it?",
        "Build recovery into your routine: sleep, movement, or a creative outlet",
        "Our Burnout Recovery Micro Course offers a structured 7-day reset",
      ],
    },
    {
      min: 51, max: 75,
      label: "High Burnout",
      color: "orange",
      interpretation: "You're experiencing significant burnout. This level of exhaustion affects your work, relationships, and health. It's not weakness — it's a sign your system needs recovery.",
      suggestions: [
        "Treat recovery as non-negotiable, not something to earn",
        "Communicate your state to someone — a partner, friend, or manager",
        "Our Burnout Recovery Workbook provides a 14-day guided plan",
        "Consider reducing commitments temporarily — protect your capacity",
      ],
    },
    {
      min: 76, max: 100,
      label: "Severe Burnout",
      color: "red",
      interpretation: "Your burnout level is severe. You're likely feeling physically and emotionally depleted. This is your mind and body telling you that something fundamental needs to change.",
      suggestions: [
        "This is a strong signal — please take it seriously",
        "Speak with a healthcare professional if exhaustion is persistent",
        "Reduce your load as much as possible, even temporarily",
        "Our Burnout Recovery Workbook + Micro Course together offer a comprehensive reset",
        "You are not broken — you are overloaded. Recovery is possible.",
      ],
    },
  ],
};
