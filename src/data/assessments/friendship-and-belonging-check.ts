/**
 * G8. Friendship and Belonging Check
 * Pack 7 — Gen Z, Student Life and Digital Wellbeing
 * Explores the quality, reciprocity and emotional safety of a young adult’s friendship network.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const friendshipAndBelongingCheck: AssessmentConfig = {
  slug: "friendship-and-belonging-check",
  order: 68,
  type: "standard",
  tier: "discovery",
  category: "Lifestyle",
  status: "active",
  meta: {
    title: "Friendship and Belonging Check",
    subtitle: "A quick read on your healthy friendship and belonging.",
    description:
      "Explores the quality, reciprocity and emotional safety of a young adult’s friendship network. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores the quality, reciprocity and emotional safety of a young adult’s friendship network.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "users",
    productCategory: "Gen Z & Digital Life",
    isFree: true,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "g8q1",
      text: "I have at least one person with whom I can speak honestly.",
      options: [...LIKERT_5],
      dimension: "emotional-safety",
    },
    {
      id: "g8q2",
      text: "I feel pressure to perform a version of myself to remain included.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "authenticity",
    },
    {
      id: "g8q3",
      text: "Friendships involve reasonably balanced effort over time.",
      options: [...LIKERT_5],
      dimension: "reciprocity",
    },
    {
      id: "g8q4",
      text: "I can spend time alone without concluding that I do not belong anywhere.",
      options: [...LIKERT_5],
      dimension: "secure-belonging",
    },
    {
      id: "g8q5",
      text: "I avoid sharing difficulties because friends may judge or exclude me.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "vulnerability",
    },
    {
      id: "g8q6",
      text: "I can set a boundary without expecting the friendship to end.",
      options: [...LIKERT_5],
      dimension: "safety",
    },
    {
      id: "g8q7",
      text: "My social circle respects differences in interests, identity and pace.",
      options: [...LIKERT_5],
      dimension: "acceptance",
    },
    {
      id: "g8q8",
      text: "I remain in friendships mainly because losing the group feels frightening.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "fear-based-belonging",
    },
    {
      id: "g8q9",
      text: "I make room for new connections instead of relying only on one group.",
      options: [...LIKERT_5],
      dimension: "network-flexibility",
    },
    {
      id: "g8q10",
      text: "I can recognise when a friendship repeatedly harms my wellbeing.",
      options: [...LIKERT_5],
      dimension: "discernment",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-safety", label: "Emotional safety", questionIds: ["g8q1"] },
    { id: "authenticity", label: "Authenticity", questionIds: ["g8q2"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["g8q3"] },
    { id: "secure-belonging", label: "Secure belonging", questionIds: ["g8q4"] },
    { id: "vulnerability", label: "Vulnerability", questionIds: ["g8q5"] },
    { id: "safety", label: "Safety", questionIds: ["g8q6"] },
    { id: "acceptance", label: "Acceptance", questionIds: ["g8q7"] },
    { id: "fear-based-belonging", label: "Fear-based belonging", questionIds: ["g8q8"] },
    { id: "network-flexibility", label: "Network flexibility", questionIds: ["g8q9"] },
    { id: "discernment", label: "Discernment", questionIds: ["g8q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Belonging Fragile",
      color: "blue",
      interpretation:
        "Your responses suggest that healthy friendship and belonging is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Connection Emerging",
      color: "yellow",
      interpretation:
        "You show some foundations of healthy friendship and belonging, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Secure Friendship Base",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of healthy friendship and belonging, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong and Flexible Belonging",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of healthy friendship and belonging. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
