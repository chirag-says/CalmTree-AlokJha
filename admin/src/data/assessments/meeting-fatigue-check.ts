/**
 * A30. Meeting Fatigue Check
 * Tier: Professional
 * Measures the degree to which meetings reduce concentration, energy and productive work capacity.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const meetingFatigueCheck: AssessmentConfig = {
  slug: "meeting-fatigue-check",
  order: 30,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Meeting Fatigue Check",
    subtitle: "Are meetings draining your productive capacity?",
    description:
      "Measure the degree to which meetings reduce your concentration, energy and productive work capacity. Ten questions, instant private results.",
    purpose:
      "Measures the degree to which meetings reduce concentration, energy and productive work capacity.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "mfc1",
      text: "I attend meetings that do not require my direct contribution.",
      options: [...LIKERT_5],
      dimension: "relevance",
    },
    {
      id: "mfc2",
      text: "Back-to-back meetings reduce my ability to think clearly.",
      options: [...LIKERT_5],
      dimension: "density",
    },
    {
      id: "mfc3",
      text: "Meetings usually end with clear decisions, owners and next steps.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "effectiveness",
    },
    {
      id: "mfc4",
      text: "I struggle to complete focused work because meetings divide the day.",
      options: [...LIKERT_5],
      dimension: "fragmentation",
    },
    {
      id: "mfc5",
      text: "Video meetings require more energy from me than their content justifies.",
      options: [...LIKERT_5],
      dimension: "format-load",
    },
    {
      id: "mfc6",
      text: "I have enough time between meetings to reset or prepare.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "density",
    },
    {
      id: "mfc7",
      text: "The same issues are repeatedly discussed without resolution.",
      options: [...LIKERT_5],
      dimension: "effectiveness",
    },
    {
      id: "mfc8",
      text: "I often multitask during meetings because my involvement is limited.",
      options: [...LIKERT_5],
      dimension: "relevance",
    },
    {
      id: "mfc9",
      text: "Meeting schedules regularly extend beyond my most productive hours.",
      options: [...LIKERT_5],
      dimension: "fragmentation",
    },
    {
      id: "mfc10",
      text: "I can decline or leave meetings when my presence adds little value.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "autonomy",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "relevance", label: "Relevance", questionIds: ["mfc1", "mfc8"] },
    { id: "density", label: "Density", questionIds: ["mfc2", "mfc6"] },
    { id: "effectiveness", label: "Effectiveness", questionIds: ["mfc3", "mfc7"] },
    { id: "fragmentation", label: "Fragmentation", questionIds: ["mfc4", "mfc9"] },
    { id: "format-load", label: "Format Load", questionIds: ["mfc5"] },
    { id: "autonomy", label: "Autonomy", questionIds: ["mfc10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Low Meeting Load",
      color: "green",
      interpretation:
        "Meetings are generally relevant, manageable and reasonably effective. Protect the practices that keep meetings selective and outcome-focused.",
    },
    {
      min: 21,
      max: 30,
      label: "Moderate Meeting Friction",
      color: "yellow",
      interpretation:
        "Some meeting patterns reduce energy or fragment the day, but the impact remains manageable. Introduce agendas, decision notes and meeting-free focus blocks.",
    },
    {
      min: 31,
      max: 40,
      label: "High Meeting Fatigue",
      color: "orange",
      interpretation:
        "Meeting volume, relevance or quality is likely reducing concentration and productive capacity. Audit recurring meetings and shorten default durations.",
    },
    {
      min: 41,
      max: 50,
      label: "Severe Meeting Overload",
      color: "red",
      interpretation:
        "Meetings may be dominating the workday and creating sustained cognitive fatigue. Create no-meeting periods and replace status meetings with asynchronous updates.",
    },
  ],
};
