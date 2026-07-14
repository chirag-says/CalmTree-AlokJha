/**
 * W20. Change Fatigue Assessment
 * Measures depletion, cynicism, confusion and reduced engagement
 * caused by repeated or poorly managed workplace change.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const changeFatigue: AssessmentConfig = {
  slug: "change-fatigue",
  order: 35, type: "standard", tier: "professional", category: "Professional", status: "active",
  meta: { title: "Change Fatigue Assessment", subtitle: "Is constant change wearing you down?", description: "Measure depletion, cynicism and reduced engagement from repeated workplace change.", purpose: "Measures depletion, cynicism, confusion and reduced engagement caused by repeated or poorly managed workplace change.", duration: "3–5 minutes", questionCount: 10, icon: "refresh-cw", productCategory: "Emotional Strength & Everyday Mind", isFree: false },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "w20q1", text: "I understand why the major changes affecting my work are necessary.", options: [...LIKERT_5], reverse: true, dimension: "meaning" },
    { id: "w20q2", text: "New initiatives often begin before earlier changes are stabilised.", options: [...LIKERT_5], dimension: "change-volume" },
    { id: "w20q3", text: "I have enough time and support to learn new ways of working.", options: [...LIKERT_5], reverse: true, dimension: "transition-support" },
    { id: "w20q4", text: "I feel sceptical when another transformation is announced.", options: [...LIKERT_5], dimension: "cynicism" },
    { id: "w20q5", text: "Priorities change so often that sustained effort feels pointless.", options: [...LIKERT_5], dimension: "instability" },
    { id: "w20q6", text: "Leaders acknowledge the effort required to adapt.", options: [...LIKERT_5], reverse: true, dimension: "leadership-response" },
    { id: "w20q7", text: "I can distinguish temporary disruption from permanent expectations.", options: [...LIKERT_5], reverse: true, dimension: "clarity" },
    { id: "w20q8", text: "I feel emotionally tired from repeatedly adjusting.", options: [...LIKERT_5], dimension: "depletion" },
    { id: "w20q9", text: "Feedback from employees meaningfully shapes implementation.", options: [...LIKERT_5], reverse: true, dimension: "voice" },
    { id: "w20q10", text: "I still believe current changes can produce useful improvement.", options: [...LIKERT_5], reverse: true, dimension: "hope" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "meaning", label: "Meaning", questionIds: ["w20q1"] },
    { id: "change-volume", label: "Change Volume", questionIds: ["w20q2"] },
    { id: "transition-support", label: "Transition Support", questionIds: ["w20q3"] },
    { id: "cynicism", label: "Cynicism", questionIds: ["w20q4"] },
    { id: "instability", label: "Instability", questionIds: ["w20q5"] },
    { id: "leadership-response", label: "Leadership Response", questionIds: ["w20q6"] },
    { id: "clarity", label: "Clarity", questionIds: ["w20q7"] },
    { id: "depletion", label: "Depletion", questionIds: ["w20q8"] },
    { id: "voice", label: "Voice", questionIds: ["w20q9"] },
    { id: "hope", label: "Hope", questionIds: ["w20q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Change Ready", color: "green", interpretation: "Your responses currently show relatively few signs of change fatigue. Protective habits appear to be working reasonably well.", nextStep: "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build." },
    { min: 20, max: 29, label: "Manageable Change Load", color: "yellow", interpretation: "Some signs of change fatigue are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.", nextStep: "Identify the two situations that raise your score most often and make one practical change this week." },
    { min: 30, max: 39, label: "Change Weariness", color: "orange", interpretation: "Your responses suggest a recurring pattern of change fatigue that may be affecting energy, concentration, relationships or performance.", nextStep: "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan." },
    { min: 40, max: 50, label: "High Change Fatigue", color: "red", interpretation: "Your responses suggest a strong and persistent pattern of change fatigue. The present pace or environment may be difficult to sustain.", nextStep: "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent." },
  ],
};
