/**
 * P7. Parenting Under Stress
 * Pack 9 — Family, Parenting and Social Roles
 * Assesses how pressure affects patience, consistency, repair and self-regulation in parenting.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const parentingUnderStress: AssessmentConfig = {
  slug: "parenting-under-stress",
  order: 87,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Parenting Under Stress",
    subtitle: "A quick read on your stress-related parenting disruption.",
    description:
      "Assesses how pressure affects patience, consistency, repair and self-regulation in parenting. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses how pressure affects patience, consistency, repair and self-regulation in parenting.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Family & Parenting",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "p7q1",
      text: "When overloaded, I become sharper or less patient with my child.",
      options: [...LIKERT_5],
      dimension: "reactivity",
    },
    {
      id: "p7q2",
      text: "I can notice rising stress before it controls my tone.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "awareness",
    },
    {
      id: "p7q3",
      text: "Rules change according to my energy rather than the child’s behaviour.",
      options: [...LIKERT_5],
      dimension: "consistency",
    },
    {
      id: "p7q4",
      text: "I can pause before responding to a non-urgent problem.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "regulation",
    },
    {
      id: "p7q5",
      text: "I expect age-inappropriate maturity when I am under pressure.",
      options: [...LIKERT_5],
      dimension: "developmental-expectations",
    },
    {
      id: "p7q6",
      text: "I repair the interaction when stress affected my response.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "repair",
    },
    {
      id: "p7q7",
      text: "I use threats or consequences that I do not intend to carry out.",
      options: [...LIKERT_5],
      dimension: "reactive-discipline",
    },
    {
      id: "p7q8",
      text: "I have some support or recovery time outside parenting tasks.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "recovery",
    },
    {
      id: "p7q9",
      text: "I can explain that my stress is not the child’s responsibility.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "emotional-boundaries",
    },
    {
      id: "p7q10",
      text: "Stress regularly prevents positive attention or shared enjoyment.",
      options: [...LIKERT_5],
      dimension: "connection-impact",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "reactivity", label: "Reactivity", questionIds: ["p7q1"] },
    { id: "awareness", label: "Awareness", questionIds: ["p7q2"] },
    { id: "consistency", label: "Consistency", questionIds: ["p7q3"] },
    { id: "regulation", label: "Regulation", questionIds: ["p7q4"] },
    {
      id: "developmental-expectations",
      label: "Developmental expectations",
      questionIds: ["p7q5"],
    },
    { id: "repair", label: "Repair", questionIds: ["p7q6"] },
    { id: "reactive-discipline", label: "Reactive discipline", questionIds: ["p7q7"] },
    { id: "recovery", label: "Recovery", questionIds: ["p7q8"] },
    { id: "emotional-boundaries", label: "Emotional boundaries", questionIds: ["p7q9"] },
    { id: "connection-impact", label: "Connection impact", questionIds: ["p7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Stress Managed",
      color: "green",
      interpretation:
        "Your responses currently show relatively few signs of stress-related parenting disruption. The habits or conditions protecting you appear to be working reasonably well.",
      nextStep: "Continue the routines that help and notice early changes before strain builds.",
    },
    {
      min: 20,
      max: 29,
      label: "Parenting Pressure Building",
      color: "yellow",
      interpretation:
        "Some signs of stress-related parenting disruption are present, particularly in demanding situations, but the pattern may still be manageable with deliberate adjustments.",
      nextStep:
        "Identify the two situations that raise this pattern most often and change one of them this week.",
    },
    {
      min: 30,
      max: 39,
      label: "Stress Affecting Parenting",
      color: "orange",
      interpretation:
        "Your responses suggest a recurring pattern of stress-related parenting disruption that may be affecting energy, concentration, confidence, relationships or performance.",
      nextStep:
        "Reduce avoidable pressure and use a simple plan for boundaries, recovery or support.",
    },
    {
      min: 40,
      max: 50,
      label: "Parenting Strain High",
      color: "red",
      interpretation:
        "Your responses suggest a strong and persistent pattern of stress-related parenting disruption. The current pattern may be difficult to sustain without meaningful change.",
      nextStep:
        "Prioritise immediate changes and consider qualified support if the experience is severe or persistent.",
    },
  ],
};
