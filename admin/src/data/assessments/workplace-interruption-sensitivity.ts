/**
 * A31. Workplace Interruption Sensitivity
 * Tier: Professional
 * Measures how strongly notifications, unscheduled requests and task-switching disrupt concentration and work quality.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const workplaceInterruptionSensitivity: AssessmentConfig = {
  slug: "workplace-interruption-sensitivity",
  order: 31,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Interruption Sensitivity",
    subtitle: "How much do interruptions cost your focus?",
    description:
      "Measure how strongly notifications, unscheduled requests and task-switching disrupt your concentration and work quality.",
    purpose:
      "Measures how strongly notifications, unscheduled requests and task-switching disrupt concentration and work quality.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "zap",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "wis1",
      text: "After an interruption, it takes me noticeable time to regain full concentration.",
      options: [...LIKERT_5],
      dimension: "recovery-cost",
    },
    {
      id: "wis2",
      text: "I check messages even when I am working on something demanding.",
      options: [...LIKERT_5],
      dimension: "self-interruption",
    },
    {
      id: "wis3",
      text: "My work environment allows me to protect uninterrupted focus periods.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "environment-control",
    },
    {
      id: "wis4",
      text: "Unexpected requests make it difficult to remember where I left off.",
      options: [...LIKERT_5],
      dimension: "recovery-cost",
    },
    {
      id: "wis5",
      text: "I feel pressure to respond immediately to most notifications.",
      options: [...LIKERT_5],
      dimension: "responsiveness-pressure",
    },
    {
      id: "wis6",
      text: "I can silence or postpone communication without feeling anxious or guilty.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundary-control",
    },
    {
      id: "wis7",
      text: "Frequent task-switching increases the number of mistakes I make.",
      options: [...LIKERT_5],
      dimension: "quality-impact",
    },
    {
      id: "wis8",
      text: "Colleagues understand when I am unavailable for focused work.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "environment-control",
    },
    {
      id: "wis9",
      text: "I create interruptions for myself by moving between tabs, apps or tasks.",
      options: [...LIKERT_5],
      dimension: "self-interruption",
    },
    {
      id: "wis10",
      text: "At the end of a fragmented day, I feel busy but not meaningfully productive.",
      options: [...LIKERT_5],
      dimension: "quality-impact",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "recovery-cost", label: "Recovery Cost", questionIds: ["wis1", "wis4"] },
    { id: "self-interruption", label: "Self-Interruption", questionIds: ["wis2", "wis9"] },
    { id: "environment-control", label: "Environment Control", questionIds: ["wis3", "wis8"] },
    { id: "responsiveness-pressure", label: "Responsiveness Pressure", questionIds: ["wis5"] },
    { id: "boundary-control", label: "Boundary Control", questionIds: ["wis6"] },
    { id: "quality-impact", label: "Quality Impact", questionIds: ["wis7", "wis10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Low Interruption Sensitivity",
      color: "green",
      interpretation:
        "You generally protect attention and recover quickly when interruptions occur. Continue using visible boundaries and intentional communication windows.",
    },
    {
      min: 21,
      max: 30,
      label: "Moderate Interruption Cost",
      color: "yellow",
      interpretation:
        "Interruptions affect concentration, but you can usually regain control. Batch messages, protect daily focus blocks and capture a restart note before switching.",
    },
    {
      min: 31,
      max: 40,
      label: "High Interruption Sensitivity",
      color: "orange",
      interpretation:
        "Fragmentation is likely reducing quality, speed and mental energy. Redesign notification settings and establish response norms.",
    },
    {
      min: 41,
      max: 50,
      label: "Severe Attention Fragmentation",
      color: "red",
      interpretation:
        "Your environment or habits may be preventing sustained concentration. Create protected deep-work periods and negotiate availability expectations.",
    },
  ],
};
