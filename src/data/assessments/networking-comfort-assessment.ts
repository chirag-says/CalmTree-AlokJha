/**
 * C7. Networking Comfort Assessment
 * Pack 8 — Career Direction and Professional Growth
 * Explores confidence in building authentic professional relationships, asking for help and maintaining contact.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const networkingComfortAssessment: AssessmentConfig = {
  slug: "networking-comfort-assessment",
  order: 77,
  type: "standard",
  tier: "growth",
  category: "Professional",
  status: "active",
  meta: {
    title: "Networking Comfort Assessment",
    subtitle: "A quick read on your professional networking comfort.",
    description:
      "Explores confidence in building authentic professional relationships, asking for help and maintaining contact. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores confidence in building authentic professional relationships, asking for help and maintaining contact.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Career Direction",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "c7q1",
      text: "I can introduce myself without needing a perfect opening line.",
      options: [...LIKERT_5],
      dimension: "initiation",
    },
    {
      id: "c7q2",
      text: "I contact people only when I need an immediate favour.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "relationship-building",
    },
    {
      id: "c7q3",
      text: "I can ask thoughtful questions about another person’s work or experience.",
      options: [...LIKERT_5],
      dimension: "curiosity",
    },
    {
      id: "c7q4",
      text: "I follow up after useful conversations within a reasonable time.",
      options: [...LIKERT_5],
      dimension: "follow-through",
    },
    {
      id: "c7q5",
      text: "I avoid events because I assume everyone else already belongs.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "belonging-confidence",
    },
    {
      id: "c7q6",
      text: "I can explain briefly what I do and what I am exploring.",
      options: [...LIKERT_5],
      dimension: "self-presentation",
    },
    {
      id: "c7q7",
      text: "I offer information, introductions or support when appropriate.",
      options: [...LIKERT_5],
      dimension: "reciprocity",
    },
    {
      id: "c7q8",
      text: "I can reconnect after a long gap without excessive embarrassment.",
      options: [...LIKERT_5],
      dimension: "reconnection",
    },
    {
      id: "c7q9",
      text: "I respect boundaries and do not treat networking as extracting value.",
      options: [...LIKERT_5],
      dimension: "ethics",
    },
    {
      id: "c7q10",
      text: "I maintain a small number of professional relationships over time.",
      options: [...LIKERT_5],
      dimension: "continuity",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "initiation", label: "Initiation", questionIds: ["c7q1"] },
    { id: "relationship-building", label: "Relationship building", questionIds: ["c7q2"] },
    { id: "curiosity", label: "Curiosity", questionIds: ["c7q3"] },
    { id: "follow-through", label: "Follow-through", questionIds: ["c7q4"] },
    { id: "belonging-confidence", label: "Belonging confidence", questionIds: ["c7q5"] },
    { id: "self-presentation", label: "Self-presentation", questionIds: ["c7q6"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["c7q7"] },
    { id: "reconnection", label: "Reconnection", questionIds: ["c7q8"] },
    { id: "ethics", label: "Ethics", questionIds: ["c7q9"] },
    { id: "continuity", label: "Continuity", questionIds: ["c7q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Networking Avoidant",
      color: "blue",
      interpretation:
        "Your responses suggest that professional networking comfort is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Selective Networker",
      color: "yellow",
      interpretation:
        "You show some foundations of professional networking comfort, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Comfortable Relationship Builder",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of professional networking comfort, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Confident and Generous Networker",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of professional networking comfort. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
