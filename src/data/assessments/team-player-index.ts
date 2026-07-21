/**
 * A11. Team Player Index
 * Pack 3 — Workplace Effectiveness and Stress
 * Reflects reliability, collaboration, openness, contribution, conflict
 * behaviour and balance between individual and shared ownership.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const teamPlayerIndex: AssessmentConfig = {
  slug: "team-player-index",
  order: 11,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Team Player Index",
    subtitle: "How effective are you as a team player?",
    description:
      "Reflect on your reliability, collaboration, openness and conflict behaviour. Ten honest questions, instant results.",
    purpose:
      "Reflects reliability, collaboration, openness, contribution, conflict behaviour and balance between individual and shared ownership.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "a11q1",
      text: "I keep commitments that other people are depending on.",
      options: [...LIKERT_5],
      dimension: "reliability",
    },
    {
      id: "a11q2",
      text: "I share useful information rather than protecting it for personal advantage.",
      options: [...LIKERT_5],
      dimension: "transparency",
    },
    {
      id: "a11q3",
      text: "I ask for input when another person has relevant expertise.",
      options: [...LIKERT_5],
      dimension: "collaboration",
    },
    {
      id: "a11q4",
      text: "I withdraw effort when my preferred idea is not selected.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "commitment",
    },
    {
      id: "a11q5",
      text: "I can disagree with a teammate without attacking the person.",
      options: [...LIKERT_5],
      dimension: "conflict-skill",
    },
    {
      id: "a11q6",
      text: "I notice when someone is overloaded and offer practical support.",
      options: [...LIKERT_5],
      dimension: "support",
    },
    {
      id: "a11q7",
      text: "I take credit carefully and acknowledge other people's contribution.",
      options: [...LIKERT_5],
      dimension: "fairness",
    },
    {
      id: "a11q8",
      text: "I avoid raising problems because I do not want discomfort.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "voice",
    },
    {
      id: "a11q9",
      text: "I can work independently without losing alignment with the group.",
      options: [...LIKERT_5],
      dimension: "balanced-ownership",
    },
    {
      id: "a11q10",
      text: "I help the team move from discussion to clear next steps.",
      options: [...LIKERT_5],
      dimension: "execution",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "reliability", label: "Reliability", questionIds: ["a11q1"] },
    { id: "transparency", label: "Transparency", questionIds: ["a11q2"] },
    { id: "collaboration", label: "Collaboration", questionIds: ["a11q3"] },
    { id: "commitment", label: "Commitment", questionIds: ["a11q4"] },
    { id: "conflict-skill", label: "Conflict Skill", questionIds: ["a11q5"] },
    { id: "support", label: "Support", questionIds: ["a11q6"] },
    { id: "fairness", label: "Fairness", questionIds: ["a11q7"] },
    { id: "voice", label: "Voice", questionIds: ["a11q8"] },
    { id: "balanced-ownership", label: "Balanced Ownership", questionIds: ["a11q9"] },
    { id: "execution", label: "Execution", questionIds: ["a11q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Independent Contributor",
      color: "blue",
      interpretation:
        "Your responses suggest that team contribution is currently limited or inconsistent. The pattern may depend heavily on reassurance or favourable conditions.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Cooperative Partner",
      color: "yellow",
      interpretation:
        "You show some foundations of team contribution, although they may become less reliable under pressure or uncertainty.",
      nextStep:
        "Identify situations where the skill already works and deliberately transfer that behaviour to one harder context.",
    },
    {
      min: 30,
      max: 39,
      label: "Team Catalyst",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of team contribution, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest subdomain while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Collaborative Anchor",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of team contribution. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and practise adapting it to people and contexts that need a different approach.",
    },
  ],
};
