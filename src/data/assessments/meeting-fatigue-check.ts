/**
 * W15. Meeting Fatigue Check
 * Measures cognitive, social and schedule-related fatigue from meetings.
 */

import type { AssessmentConfig } from "./types";
import { LIKERT_5 } from "./types";

export const meetingFatigueCheck: AssessmentConfig = {
  slug: "meeting-fatigue-check",
  order: 30,
  type: "standard",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Meeting Fatigue Check",
    subtitle: "Are meetings draining your energy?",
    description: "Measure cognitive, social and schedule-related fatigue created by meetings.",
    purpose: "Measures cognitive, social and schedule-related fatigue created by the number, length and design of meetings.",
    duration: "3–5 minutes", questionCount: 10, icon: "users",
    productCategory: "Emotional Strength & Everyday Mind", isFree: false,
  },
  instructions: "Rate each statement according to your typical experience during the past four weeks. 1 = Almost Never; 2 = Rarely; 3 = Sometimes; 4 = Often; 5 = Almost Always.",
  questions: [
    { id: "w15q1", text: "I have enough gaps between meetings to reset and prepare.", options: [...LIKERT_5], reverse: true, dimension: "recovery-gaps" },
    { id: "w15q2", text: "Back-to-back meetings reduce my ability to think clearly.", options: [...LIKERT_5], dimension: "cognitive-load" },
    { id: "w15q3", text: "Many meetings could be replaced by a short written update.", options: [...LIKERT_5], dimension: "meeting-necessity" },
    { id: "w15q4", text: "Meeting agendas and expected decisions are usually clear.", options: [...LIKERT_5], reverse: true, dimension: "meeting-design" },
    { id: "w15q5", text: "I struggle to complete focused work because meetings fragment the day.", options: [...LIKERT_5], dimension: "focus-interference" },
    { id: "w15q6", text: "I can contribute meaningfully without feeling socially depleted.", options: [...LIKERT_5], reverse: true, dimension: "social-load" },
    { id: "w15q7", text: "Meetings regularly continue longer than their useful purpose.", options: [...LIKERT_5], dimension: "duration" },
    { id: "w15q8", text: "I know when my attendance is optional rather than expected.", options: [...LIKERT_5], reverse: true, dimension: "attendance-clarity" },
    { id: "w15q9", text: "Video meetings create additional strain through constant screen presence.", options: [...LIKERT_5], dimension: "digital-load" },
    { id: "w15q10", text: "At the end of a meeting-heavy day, I still have usable mental energy.", options: [...LIKERT_5], reverse: true, dimension: "energy" },
  ],
  scoring: { method: "sum", min: 10, max: 50 },
  dimensions: [
    { id: "recovery-gaps", label: "Recovery Gaps", questionIds: ["w15q1"] },
    { id: "cognitive-load", label: "Cognitive Load", questionIds: ["w15q2"] },
    { id: "meeting-necessity", label: "Meeting Necessity", questionIds: ["w15q3"] },
    { id: "meeting-design", label: "Meeting Design", questionIds: ["w15q4"] },
    { id: "focus-interference", label: "Focus Interference", questionIds: ["w15q5"] },
    { id: "social-load", label: "Social Load", questionIds: ["w15q6"] },
    { id: "duration", label: "Duration", questionIds: ["w15q7"] },
    { id: "attendance-clarity", label: "Attendance Clarity", questionIds: ["w15q8"] },
    { id: "digital-load", label: "Digital Load", questionIds: ["w15q9"] },
    { id: "energy", label: "Energy", questionIds: ["w15q10"] },
  ],
  archetypes: [
    { min: 10, max: 19, label: "Low Meeting Strain", color: "green", interpretation: "Your responses currently show relatively few signs of meeting fatigue. Protective habits appear to be working reasonably well.", nextStep: "Maintain the routines that support recovery and notice early changes rather than waiting for strain to build." },
    { min: 20, max: 29, label: "Manageable Meeting Load", color: "yellow", interpretation: "Some signs of meeting fatigue are present, especially during demanding periods, but they may still be manageable with deliberate adjustments.", nextStep: "Identify the two situations that raise your score most often and make one practical change this week." },
    { min: 30, max: 39, label: "Meeting Fatigue", color: "orange", interpretation: "Your responses suggest a recurring pattern of meeting fatigue that may be affecting energy, concentration, relationships or performance.", nextStep: "Reduce avoidable load, strengthen boundaries and use a structured recovery or support plan." },
    { min: 40, max: 50, label: "Meeting Saturation", color: "red", interpretation: "Your responses suggest a strong and persistent pattern of meeting fatigue. The present pace or environment may be difficult to sustain.", nextStep: "Prioritise immediate load reduction and consider speaking with a qualified professional if the experience is severe or persistent." },
  ],
};
