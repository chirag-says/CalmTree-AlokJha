/**
 * L3. Purpose After 50
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Explores clarity, contribution, curiosity and meaningful direction in the second half of life.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const purposeAfter50: AssessmentConfig = {
  slug: "purpose-after-50",
  order: 93,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Purpose After 50",
    subtitle: "A quick read on your purpose after 50.",
    description:
      "Explores clarity, contribution, curiosity and meaningful direction in the second half of life. Ten honest questions, instant results, completely private.",
    purpose:
      "Explores clarity, contribution, curiosity and meaningful direction in the second half of life.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "eye",
    productCategory: "Life Transitions & Healthy Ageing",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "l3q1",
      text: "I can name activities or contributions that make the coming years meaningful.",
      options: [...LIKERT_5],
      dimension: "purpose-clarity",
    },
    {
      id: "l3q2",
      text: "I feel that my most valuable period of life is already behind me.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "future-orientation",
    },
    {
      id: "l3q3",
      text: "I have goals that are personally meaningful rather than only expected by others.",
      options: [...LIKERT_5],
      dimension: "personal-meaning",
    },
    {
      id: "l3q4",
      text: "I make time for interests that create energy, curiosity or contribution.",
      options: [...LIKERT_5],
      dimension: "engagement",
    },
    {
      id: "l3q5",
      text: "I am waiting for circumstances to become perfect before beginning something important.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "action",
    },
    {
      id: "l3q6",
      text: "I can contribute through experience without needing formal status.",
      options: [...LIKERT_5],
      dimension: "contribution",
    },
    {
      id: "l3q7",
      text: "I understand which relationships I want to invest in more deeply.",
      options: [...LIKERT_5],
      dimension: "relational-purpose",
    },
    {
      id: "l3q8",
      text: "I review and adjust purpose as health, family and responsibilities change.",
      options: [...LIKERT_5],
      dimension: "adaptability",
    },
    {
      id: "l3q9",
      text: "I have at least one project or commitment that extends beyond routine maintenance.",
      options: [...LIKERT_5],
      dimension: "forward-movement",
    },
    {
      id: "l3q10",
      text: "I can describe what I hope to give, learn or experience in the next five years.",
      options: [...LIKERT_5],
      dimension: "future-vision",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "purpose-clarity", label: "Purpose clarity", questionIds: ["l3q1"] },
    { id: "future-orientation", label: "Future orientation", questionIds: ["l3q2"] },
    { id: "personal-meaning", label: "Personal meaning", questionIds: ["l3q3"] },
    { id: "engagement", label: "Engagement", questionIds: ["l3q4"] },
    { id: "action", label: "Action", questionIds: ["l3q5"] },
    { id: "contribution", label: "Contribution", questionIds: ["l3q6"] },
    { id: "relational-purpose", label: "Relational purpose", questionIds: ["l3q7"] },
    { id: "adaptability", label: "Adaptability", questionIds: ["l3q8"] },
    { id: "forward-movement", label: "Forward movement", questionIds: ["l3q9"] },
    { id: "future-vision", label: "Future vision", questionIds: ["l3q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Purpose Unclear",
      color: "blue",
      interpretation:
        "Your responses suggest that purpose after 50 is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Purpose Searching",
      color: "yellow",
      interpretation:
        "You show some foundations of purpose after 50, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Meaningful Direction Emerging",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of purpose after 50, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Purposeful Second-Half Builder",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of purpose after 50. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
