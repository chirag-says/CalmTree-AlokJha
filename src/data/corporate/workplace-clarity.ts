/**
 * WES Battery — Clarity
 * Dimension: Clarity — understanding of priorities and responsibilities.
 *
 * This is the EXEMPLAR that locks the authoring pattern for the six-assessment
 * Workplace Effectiveness battery. The remaining five (productivity, management,
 * collaboration, accountability, sustainability) follow this exact shape.
 *
 * Authoring rules for every WES assessment:
 *   • 10 statements, uniform 1–5 Likert (score 10–50), reused engine.
 *   • Oriented HIGHER = BETTER. A high dimension % must always mean "healthy".
 *     Negatively-worded items carry `reverse: true` so they invert correctly.
 *   • archetype bands run low→high with the GOOD band at the top (40–50), so the
 *     headline percentage reads intuitively for the employer aggregate.
 *   • Internal `dimensions` enrich the personal report; the WES only uses the
 *     assessment's headline `percentage`.
 *
 * Wording here is a first, defensible draft — Calmtree's psychology author
 * validates final phrasing and reverse-coding before launch.
 */

import type { AssessmentConfig } from "@/data/assessments/types";
import { LIKERT_5 } from "@/data/assessments/types";

export const workplaceClarity: AssessmentConfig = {
  slug: "workplace-clarity",
  order: 1,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Clarity at Work",
    subtitle: "How clear are your priorities and responsibilities?",
    description:
      "A short, confidential check on how well you understand what's expected of you, what matters most, and where your work fits. Ten questions, private to you.",
    purpose:
      "Measures understanding of priorities, role responsibilities, decision boundaries and how work connects to team goals.",
    duration: "2–3 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience over the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "clq1",
      text: "I know what my most important priorities are for the week.",
      options: [...LIKERT_5],
      dimension: "priorities",
    },
    {
      id: "clq2",
      text: "I understand exactly what I am responsible for in my role.",
      options: [...LIKERT_5],
      dimension: "responsibilities",
    },
    {
      id: "clq3",
      text: "I am unsure which tasks matter most when everything feels urgent.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "priorities",
    },
    {
      id: "clq4",
      text: "I know how my work contributes to my team's goals.",
      options: [...LIKERT_5],
      dimension: "purpose",
    },
    {
      id: "clq5",
      text: "It is clear to me which decisions I can make on my own and which need approval.",
      options: [...LIKERT_5],
      dimension: "boundaries",
    },
    {
      id: "clq6",
      text: "I receive conflicting instructions about what I should focus on.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "boundaries",
    },
    {
      id: "clq7",
      text: "I understand what a good outcome looks like for my main tasks.",
      options: [...LIKERT_5],
      dimension: "expectations",
    },
    {
      id: "clq8",
      text: "I am clear on who to go to when I need a decision or information.",
      options: [...LIKERT_5],
      dimension: "responsibilities",
    },
    {
      id: "clq9",
      text: "I often discover too late that my priorities had changed.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "priorities",
    },
    {
      id: "clq10",
      text: "I can explain how this week's work connects to a larger objective.",
      options: [...LIKERT_5],
      dimension: "purpose",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "priorities", label: "Priorities", questionIds: ["clq1", "clq3", "clq9"] },
    { id: "responsibilities", label: "Responsibilities", questionIds: ["clq2", "clq8"] },
    { id: "purpose", label: "Purpose & Connection", questionIds: ["clq4", "clq10"] },
    { id: "boundaries", label: "Decision Boundaries", questionIds: ["clq5", "clq6"] },
    { id: "expectations", label: "Expectations", questionIds: ["clq7"] },
  ],
  // Bands run low→high with the healthy band at the top: higher % = clearer.
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Lost in the Fog",
      color: "red",
      interpretation:
        "Priorities and responsibilities are frequently unclear. Day-to-day work likely involves guesswork, rework and conflicting signals about what matters.",
      nextStep:
        "Agree a short weekly priorities check-in with your manager and confirm what a good outcome looks like before starting major tasks.",
    },
    {
      min: 20,
      max: 29,
      label: "Often Unclear",
      color: "orange",
      interpretation:
        "You have a partial picture of priorities and scope, but ambiguity returns often, especially when demands compete or plans change.",
      nextStep:
        "Identify the one recurring area of confusion and ask for an explicit decision boundary or a clearer definition of done.",
    },
    {
      min: 30,
      max: 39,
      label: "Mostly Clear",
      color: "blue",
      interpretation:
        "You generally understand your priorities and how your work connects, with occasional uncertainty during busy or changing periods.",
      nextStep:
        "Protect clarity under pressure — restate priorities at the start of the week and flag conflicts early rather than absorbing them.",
    },
    {
      min: 40,
      max: 50,
      label: "Clear & Aligned",
      color: "green",
      interpretation:
        "You have a strong, consistent understanding of your priorities, responsibilities and how your work contributes to the bigger picture.",
      nextStep:
        "Maintain this by keeping shared expectations explicit and helping teammates who have less clarity find theirs.",
    },
  ],
};
