/**
 * C10. Future Skills Readiness
 * Pack 8 — Career Direction and Professional Growth
 * Explores awareness, adaptability and deliberate action to remain professionally relevant as work changes.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const futureSkillsReadiness: AssessmentConfig = {
  slug: "future-skills-readiness",
  order: 80,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Future Skills Readiness",
    subtitle: "A quick read on your future-skills readiness.",
    description:
      "Explores awareness, adaptability and deliberate action to remain professionally relevant as work changes. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores awareness, adaptability and deliberate action to remain professionally relevant as work changes.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "book-open",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c10q1",
      text: "I regularly review how technology and market change may affect my work.",
      options: [...LIKERT_5],
      dimension: "environmental-awareness",
    },
    {
      id: "c10q2",
      text: "I wait for my organisation to decide all of my learning priorities.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "ownership",
    },
    {
      id: "c10q3",
      text: "I can identify skills likely to remain valuable across roles.",
      options: [...LIKERT_5],
      dimension: "transferable-skills",
    },
    {
      id: "c10q4",
      text: "I have a current learning project connected to future work needs.",
      options: [...LIKERT_5],
      dimension: "active-learning",
    },
    {
      id: "c10q5",
      text: "I avoid new tools because early use makes me feel less competent.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "technology-openness",
    },
    {
      id: "c10q6",
      text: "I combine technical, human and business skills rather than depending on one area.",
      options: [...LIKERT_5],
      dimension: "skill-portfolio",
    },
    {
      id: "c10q7",
      text: "I use projects or evidence to demonstrate new capability.",
      options: [...LIKERT_5],
      dimension: "proof-of-skill",
    },
    {
      id: "c10q8",
      text: "I seek perspectives from people working in emerging areas.",
      options: [...LIKERT_5],
      dimension: "external-input",
    },
    {
      id: "c10q9",
      text: "I can stop investing in a skill whose future value has declined.",
      options: [...LIKERT_5],
      dimension: "resource-allocation",
    },
    {
      id: "c10q10",
      text: "I review and update my professional plan at least periodically.",
      options: [...LIKERT_5],
      dimension: "planning-rhythm",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "environmental-awareness", label: "Environmental awareness", questionIds: ["c10q1"] },
    { id: "ownership", label: "Ownership", questionIds: ["c10q2"] },
    { id: "transferable-skills", label: "Transferable skills", questionIds: ["c10q3"] },
    { id: "active-learning", label: "Active learning", questionIds: ["c10q4"] },
    { id: "technology-openness", label: "Technology openness", questionIds: ["c10q5"] },
    { id: "skill-portfolio", label: "Skill portfolio", questionIds: ["c10q6"] },
    { id: "proof-of-skill", label: "Proof of skill", questionIds: ["c10q7"] },
    { id: "external-input", label: "External input", questionIds: ["c10q8"] },
    { id: "resource-allocation", label: "Resource allocation", questionIds: ["c10q9"] },
    { id: "planning-rhythm", label: "Planning rhythm", questionIds: ["c10q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Future Skills Passive",
      color: "blue",
      interpretation:
        "Your responses suggest that future-skills readiness is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Awareness Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of future-skills readiness, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Future Skills Builder",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of future-skills readiness, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Adaptive Career Investor",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of future-skills readiness. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
