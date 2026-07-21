/**
 * G4. Online Identity Balance
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Assesses authenticity, privacy, boundaries and the relationship between online presentation and offline self-worth.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const onlineIdentityBalance: AssessmentConfig = {
  slug: "online-identity-balance",
  order: 64,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Online Identity Balance",
    subtitle: "A quick read on your balanced online identity.",
    description:
      "Assesses authenticity, privacy, boundaries and the relationship between online presentation and offline self-worth. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses authenticity, privacy, boundaries and the relationship between online presentation and offline self-worth.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "user",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g4q1",
      text: "My online profile broadly reflects the values I live offline.",
      options: [...LIKERT_5],
      dimension: "authenticity",
    },
    {
      id: "g4q2",
      text: "I present a version of myself online that feels difficult to maintain.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "performance-pressure",
    },
    {
      id: "g4q3",
      text: "I decide deliberately what information should remain private.",
      options: [...LIKERT_5],
      dimension: "privacy",
    },
    {
      id: "g4q4",
      text: "Negative online feedback changes how I see myself for a long time.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "feedback-resilience",
    },
    {
      id: "g4q5",
      text: "I can enjoy an experience without needing to document it publicly.",
      options: [...LIKERT_5],
      dimension: "presence",
    },
    {
      id: "g4q6",
      text: "I understand that different platforms may require different boundaries.",
      options: [...LIKERT_5],
      dimension: "context-awareness",
    },
    {
      id: "g4q7",
      text: "I remove or hide parts of myself mainly because they may receive less approval.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "approval-pressure",
    },
    {
      id: "g4q8",
      text: "I can disagree online without treating the interaction as a total judgement of me.",
      options: [...LIKERT_5],
      dimension: "identity-separation",
    },
    {
      id: "g4q9",
      text: "I review who can access my information and how it may be used.",
      options: [...LIKERT_5],
      dimension: "digital-safety",
    },
    {
      id: "g4q10",
      text: "My self-respect remains reasonably stable when online attention is low.",
      options: [...LIKERT_5],
      dimension: "internal-worth",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "authenticity", label: "Authenticity", questionIds: ["g4q1"] },
    { id: "performance-pressure", label: "Performance pressure", questionIds: ["g4q2"] },
    { id: "privacy", label: "Privacy", questionIds: ["g4q3"] },
    { id: "feedback-resilience", label: "Feedback resilience", questionIds: ["g4q4"] },
    { id: "presence", label: "Presence", questionIds: ["g4q5"] },
    { id: "context-awareness", label: "Context awareness", questionIds: ["g4q6"] },
    { id: "approval-pressure", label: "Approval pressure", questionIds: ["g4q7"] },
    { id: "identity-separation", label: "Identity separation", questionIds: ["g4q8"] },
    { id: "digital-safety", label: "Digital safety", questionIds: ["g4q9"] },
    { id: "internal-worth", label: "Internal worth", questionIds: ["g4q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Online Identity Strain",
      color: "blue",
      interpretation:
        "Your responses suggest that balanced online identity is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Identity Balance Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of balanced online identity, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Authentic Digital Self",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of balanced online identity, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Intentional Online Identity",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of balanced online identity. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
