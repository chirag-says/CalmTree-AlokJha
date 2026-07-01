/**
 * A39. Psychological Safety Experience Check
 * Tier: Professional
 * Measures whether the person experiences their immediate work environment as safe for questions, mistakes, disagreement and honest contribution.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const psychologicalSafetyCheck: AssessmentConfig = {
  slug: "psychological-safety-check",
  order: 39,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Psychological Safety Experience Check",
    subtitle: "Does your team feel safe to speak up?",
    description:
      "Measure whether you experience your immediate work environment as safe for questions, mistakes, disagreement and honest contribution.",
    purpose:
      "Measures whether the person experiences their immediate work environment as safe for questions, mistakes, disagreement and honest contribution.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Rate each statement according to your typical experience during the past four weeks. 1 = Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost always.",
  questions: [
    {
      id: "psc1",
      text: "I can ask for clarification without being made to feel incompetent.",
      options: [...LIKERT_5],
      dimension: "question-safety",
    },
    {
      id: "psc2",
      text: "People in my team admit mistakes without expecting humiliation or blame.",
      options: [...LIKERT_5],
      dimension: "mistake-safety",
    },
    {
      id: "psc3",
      text: "I hesitate to disagree with senior or influential people.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "dissent-safety",
    },
    {
      id: "psc4",
      text: "Unpopular concerns are taken seriously when expressed respectfully.",
      options: [...LIKERT_5],
      dimension: "voice-safety",
    },
    {
      id: "psc5",
      text: "People are excluded or labelled after making a visible mistake.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "mistake-safety",
    },
    {
      id: "psc6",
      text: "I can say that I do not know something and ask for help.",
      options: [...LIKERT_5],
      dimension: "question-safety",
    },
    {
      id: "psc7",
      text: "Team members can discuss interpersonal tension directly and respectfully.",
      options: [...LIKERT_5],
      dimension: "conflict-safety",
    },
    {
      id: "psc8",
      text: "I worry that raising a problem may damage my reputation or opportunities.",
      options: [...LIKERT_5],
      reverse: true,
      dimension: "voice-safety",
    },
    {
      id: "psc9",
      text: "Different perspectives are explored rather than quickly shut down.",
      options: [...LIKERT_5],
      dimension: "dissent-safety",
    },
    {
      id: "psc10",
      text: "Leaders respond constructively when someone brings difficult information.",
      options: [...LIKERT_5],
      dimension: "leadership-response",
    },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "question-safety", label: "Question Safety", questionIds: ["psc1", "psc6"] },
    { id: "mistake-safety", label: "Mistake Safety", questionIds: ["psc2", "psc5"] },
    { id: "dissent-safety", label: "Dissent Safety", questionIds: ["psc3", "psc9"] },
    { id: "voice-safety", label: "Voice Safety", questionIds: ["psc4", "psc8"] },
    { id: "conflict-safety", label: "Conflict Safety", questionIds: ["psc7"] },
    { id: "leadership-response", label: "Leadership Response", questionIds: ["psc10"] },
  ],
  archetypes: [
    {
      min: 10,
      max: 20,
      label: "Very Low Psychological Safety",
      color: "red",
      interpretation:
        "You may be operating in an environment where speaking honestly, asking for help or making mistakes feels personally risky. Use trusted allies and appropriate escalation.",
    },
    {
      min: 21,
      max: 30,
      label: "Limited Psychological Safety",
      color: "orange",
      interpretation:
        "Some forms of contribution feel acceptable, while disagreement, mistakes or difficult information may still carry risk. Identify the safest channels and encourage explicit team norms.",
    },
    {
      min: 31,
      max: 40,
      label: "Generally Safe Environment",
      color: "yellow",
      interpretation:
        "You can usually contribute honestly, though safety may vary by person, topic or pressure level. Strengthen consistency by responding constructively when others take interpersonal risks.",
    },
    {
      min: 41,
      max: 50,
      label: "Strong Psychological Safety",
      color: "green",
      interpretation:
        "Your environment generally supports questions, learning, respectful disagreement and early problem reporting. Protect this culture through inclusive facilitation and fair responses.",
    },
  ],
};
