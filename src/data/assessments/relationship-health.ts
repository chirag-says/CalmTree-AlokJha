/**
 * A8. Relationship Health Check
 * Pack 4 — Leadership, Relationships and Influence
 * Reflects communication, trust, emotional safety, reciprocity, repair
 * and respect for individuality in a close relationship.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const relationshipHealth: AssessmentConfig = {
  slug: "relationship-health",
  order: 8,
  type: "standard",
  tier: "growth",
  category: "Relationships",
  status: "active",
  meta: {
    title: "Relationship Health Check",
    subtitle: "How healthy is your closest relationship?",
    description:
      "Reflect on communication, trust, emotional safety and reciprocity. Ten honest questions, instant results, completely private.",
    purpose:
      "Reflects communication, trust, emotional safety, reciprocity, repair and respect for individuality in a close relationship.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    productCategory: "Relationships & Emotional Connection",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a8q1",
      text: "We can discuss difficult topics without repeated humiliation, threats or contempt.",
      options: [...LIKERT_5],
      dimension: "emotional-safety",
    },
    {
      id: "a8q2",
      text: "Both people can express needs without expecting the other to read their mind.",
      options: [...LIKERT_5],
      dimension: "communication",
    },
    {
      id: "a8q3",
      text: "One person regularly carries most of the emotional or practical responsibility.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "reciprocity",
    },
    {
      id: "a8q4",
      text: "Disagreements can end with understanding or a workable next step.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
    {
      id: "a8q5",
      text: "I can remain myself without constantly managing the other person's reactions.",
      options: [...LIKERT_5],
      dimension: "autonomy",
    },
    {
      id: "a8q6",
      text: "Trust is supported by consistent behaviour rather than only reassurance.",
      options: [...LIKERT_5],
      dimension: "trust",
    },
    {
      id: "a8q7",
      text: "Problems are ignored until they become much larger.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "avoidance",
    },
    {
      id: "a8q8",
      text: "We can appreciate each other without using praise as control or obligation.",
      options: [...LIKERT_5],
      dimension: "respect",
    },
    {
      id: "a8q9",
      text: "Both people can maintain friendships, interests and reasonable privacy.",
      options: [...LIKERT_5],
      dimension: "individuality",
    },
    {
      id: "a8q10",
      text: "After tension, we are usually able to reconnect without pretending nothing happened.",
      options: [...LIKERT_5],
      dimension: "repair",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-safety", label: "Emotional Safety", questionIds: ["a8q1"] },
    { id: "communication", label: "Communication", questionIds: ["a8q2"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["a8q3"] },
    { id: "repair", label: "Repair", questionIds: ["a8q4", "a8q10"] },
    { id: "autonomy", label: "Autonomy", questionIds: ["a8q5"] },
    { id: "trust", label: "Trust", questionIds: ["a8q6"] },
    { id: "avoidance", label: "Avoidance", questionIds: ["a8q7"] },
    { id: "respect", label: "Respect", questionIds: ["a8q8"] },
    { id: "individuality", label: "Individuality", questionIds: ["a8q9"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Independent Navigator",
      color: "blue",
      interpretation:
        "Your responses suggest that relationship health is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Caring Partner",
      color: "yellow",
      interpretation:
        "You show some foundations of relationship health, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Trusted Companion",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of relationship health, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Deep Connector",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of relationship health. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
