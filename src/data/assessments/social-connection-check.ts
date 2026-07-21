/**
 * L6. Social Connection Check
 * Pack 10 — Life Transitions, Meaning and Healthy Ageing
 * Assesses the availability, diversity and quality of meaningful social connection in later adulthood.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const socialConnectionCheck: AssessmentConfig = {
  slug: "social-connection-check",
  order: 96,
  type: "standard",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Social Connection Check",
    subtitle: "A quick read on your social connection.",
    description:
      "Assesses the availability, diversity and quality of meaningful social connection in later adulthood. Ten honest questions, instant results, completely private.",
    purpose:
      "Assesses the availability, diversity and quality of meaningful social connection in later adulthood.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "compass",
    productCategory: "Life Transitions & Healthy Ageing",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    {
      id: "l6q1",
      text: "I have at least one person I can contact for an honest conversation.",
      options: [...LIKERT_5],
      dimension: "emotional-support",
    },
    {
      id: "l6q2",
      text: "Most of my social interaction depends on work or one family member.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "network-concentration",
    },
    {
      id: "l6q3",
      text: "I take some initiative to maintain or renew relationships.",
      options: [...LIKERT_5],
      dimension: "initiative",
    },
    {
      id: "l6q4",
      text: "I participate in at least one group, community or shared interest.",
      options: [...LIKERT_5],
      dimension: "community",
    },
    {
      id: "l6q5",
      text: "I avoid reaching out because too much time has passed.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "reconnection-barrier",
    },
    {
      id: "l6q6",
      text: "My relationships include both giving and receiving support.",
      options: [...LIKERT_5],
      dimension: "reciprocity",
    },
    {
      id: "l6q7",
      text: "I can spend time alone without becoming persistently isolated.",
      options: [...LIKERT_5],
      dimension: "solitude-balance",
    },
    {
      id: "l6q8",
      text: "Health, mobility or technology barriers prevent connection and remain unaddressed.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "access-barriers",
    },
    {
      id: "l6q9",
      text: "I remain open to forming new relationships at this stage of life.",
      options: [...LIKERT_5],
      dimension: "new-connection",
    },
    {
      id: "l6q10",
      text: "My current social life provides enough warmth, stimulation and belonging.",
      options: [...LIKERT_5],
      dimension: "connection-quality",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "emotional-support", label: "Emotional support", questionIds: ["l6q1"] },
    { id: "network-concentration", label: "Network concentration", questionIds: ["l6q2"] },
    { id: "initiative", label: "Initiative", questionIds: ["l6q3"] },
    { id: "community", label: "Community", questionIds: ["l6q4"] },
    { id: "reconnection-barrier", label: "Reconnection barrier", questionIds: ["l6q5"] },
    { id: "reciprocity", label: "Reciprocity", questionIds: ["l6q6"] },
    { id: "solitude-balance", label: "Solitude balance", questionIds: ["l6q7"] },
    { id: "access-barriers", label: "Access barriers", questionIds: ["l6q8"] },
    { id: "new-connection", label: "New connection", questionIds: ["l6q9"] },
    { id: "connection-quality", label: "Connection quality", questionIds: ["l6q10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 19,
      label: "Connection Fragile",
      color: "blue",
      interpretation:
        "Your responses suggest that social connection is currently limited or inconsistent. It may depend heavily on favourable conditions or reassurance.",
      nextStep:
        "Choose one small behaviour to practise repeatedly rather than trying to change everything at once.",
    },
    {
      min: 20,
      max: 29,
      label: "Social Base Narrow",
      color: "yellow",
      interpretation:
        "You show some foundations of social connection, although the pattern may become less reliable under pressure, uncertainty or conflict.",
      nextStep:
        "Notice where the skill already works and transfer one successful behaviour to a harder situation.",
    },
    {
      min: 30,
      max: 39,
      label: "Connected and Supported",
      color: "emerald",
      interpretation:
        "Your responses suggest a generally steady level of social connection, with a few areas that could become more consistent.",
      nextStep: "Strengthen the lowest area while continuing to use your existing strengths.",
    },
    {
      min: 40,
      max: 50,
      label: "Strong and Diverse Social Network",
      color: "green",
      interpretation:
        "Your responses indicate a strong and broadly reliable pattern of social connection. You are likely to use it across many situations.",
      nextStep:
        "Protect the strength from becoming overused and adapt it to people and contexts that need a different approach.",
    },
  ],
};
