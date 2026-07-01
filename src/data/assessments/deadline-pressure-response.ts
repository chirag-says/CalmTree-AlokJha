/**
 * A27. Deadline Pressure Response Check
 * Tier: Professional
 * Identifies the person's typical behavioural pattern as a deadline approaches.
 */

import type { ProfileAssessmentConfig } from "./types";

export const deadlinePressureResponse: ProfileAssessmentConfig = {
  slug: "deadline-pressure-response",
  order: 27,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Deadline Pressure Response Check",
    subtitle: "How do you behave as a deadline approaches?",
    description:
      "Identify your typical behavioural pattern as a deadline draws near. Five profiles, ten situational questions.",
    purpose: "Identifies the person's typical behavioural pattern as a deadline approaches.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["dpr1", "dpr5", "dpr10"],
  profileQuestions: [
    {
      id: "dpr1",
      text: "When a major deadline is two weeks away, you usually:",
      options: [
        { label: "Create a schedule and begin early", profileCode: "A" },
        { label: "Know you will become more productive closer to the date", profileCode: "B" },
        { label: "Think repeatedly about whether the work will be good enough", profileCode: "C" },
        { label: "Find yourself doing easier or unrelated tasks first", profileCode: "D" },
        { label: "Start immediately and push hard to finish quickly", profileCode: "E" },
      ],
    },
    {
      id: "dpr2",
      text: "As the deadline gets closer, your attention tends to:",
      options: [
        { label: "Follow the next planned step", profileCode: "A" },
        { label: "Sharpen and become highly concentrated", profileCode: "B" },
        { label: "Move between checking, worrying and revising", profileCode: "C" },
        { label: "Become scattered until urgency forces action", profileCode: "D" },
        { label: "Narrow rapidly to completion, sometimes missing details", profileCode: "E" },
      ],
    },
    {
      id: "dpr3",
      text: "If a deadline changes unexpectedly, you:",
      options: [
        { label: "Rework the plan and milestones", profileCode: "A" },
        { label: "Adjust your sprint to the new date", profileCode: "B" },
        { label: "Worry about whether there is now enough time", profileCode: "C" },
        { label: "Use the change as another reason to postpone starting", profileCode: "D" },
        { label: "Accelerate immediately and make quick trade-offs", profileCode: "E" },
      ],
    },
    {
      id: "dpr4",
      text: "Your common deadline difficulty is:",
      options: [
        { label: "Spending too much time planning or perfecting the schedule", profileCode: "A" },
        { label: "Depending on pressure to activate your best effort", profileCode: "B" },
        { label: "Overchecking and losing confidence", profileCode: "C" },
        { label: "Starting later than you intended", profileCode: "D" },
        { label: "Moving so fast that errors or communication gaps appear", profileCode: "E" },
      ],
    },
    {
      id: "dpr5",
      text: "The night before submission, you are most likely to:",
      options: [
        { label: "Complete a planned final review", profileCode: "A" },
        { label: "Do your strongest burst of work", profileCode: "B" },
        { label: "Repeatedly review and doubt the output", profileCode: "C" },
        { label: "Work intensely because much remains unfinished", profileCode: "D" },
        { label: "Submit quickly once the central task is done", profileCode: "E" },
      ],
    },
    {
      id: "dpr6",
      text: "Which thought appears most often?",
      options: [
        { label: "What is the next step?", profileCode: "A" },
        { label: "I work best when it really matters", profileCode: "B" },
        { label: "What if I missed something important?", profileCode: "C" },
        { label: "I will start when I feel more ready", profileCode: "D" },
        { label: "We need to move now", profileCode: "E" },
      ],
    },
    {
      id: "dpr7",
      text: "When several deadlines overlap, you:",
      options: [
        { label: "Sequence them and allocate time", profileCode: "A" },
        { label: "Prioritise the most urgent and sprint through each", profileCode: "B" },
        { label: "Feel mentally overloaded by competing risks", profileCode: "C" },
        { label: "Avoid looking closely until one becomes critical", profileCode: "D" },
        { label: "Attack tasks rapidly, switching whenever urgency changes", profileCode: "E" },
      ],
    },
    {
      id: "dpr8",
      text: "Feedback just before a deadline makes you:",
      options: [
        { label: "Adjust the relevant part within the plan", profileCode: "A" },
        { label: "Use the pressure to increase effort", profileCode: "B" },
        { label: "Question whether the entire output needs revision", profileCode: "C" },
        { label: "Feel tempted to disengage or delay", profileCode: "D" },
        { label: "Make fast changes, sometimes without fully testing them", profileCode: "E" },
      ],
    },
    {
      id: "dpr9",
      text: "Others may experience you near deadlines as:",
      options: [
        { label: "Organised and predictable", profileCode: "A" },
        { label: "Intense but highly productive", profileCode: "B" },
        { label: "Concerned and detail-focused", profileCode: "C" },
        { label: "Difficult to engage until late", profileCode: "D" },
        { label: "Fast, decisive and occasionally abrupt", profileCode: "E" },
      ],
    },
    {
      id: "dpr10",
      text: "The most useful improvement for you is:",
      options: [
        { label: "Simplify planning and protect contingency", profileCode: "A" },
        { label: "Create earlier activation points", profileCode: "B" },
        { label: "Limit checking and define completion", profileCode: "C" },
        { label: "Begin before motivation arrives", profileCode: "D" },
        { label: "Pause briefly before finalising", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Structured Planner",
      meaning: "Reduces pressure through early planning and staged completion.",
      interpretation:
        "Your responses suggest you address deadline pressure through preparation. You create structure early, work systematically and avoid last-minute rushes through forward planning.",
      nextStep: "Leave realistic contingency time and avoid overplanning low-risk work.",
      color: "blue",
    },
    {
      code: "B",
      label: "Focused Sprinter",
      meaning: "Becomes highly energised and productive close to a deadline.",
      interpretation:
        "Your responses suggest you work best when urgency is real and immediate. Pressure activates your focus and you often produce your best work in the final stretch.",
      nextStep:
        "Create intermediate deadlines so intensity does not depend on last-minute pressure.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Anxious Overthinker",
      meaning: "Pressure increases checking, worry and difficulty deciding.",
      interpretation:
        "Your responses suggest pressure triggers over-analysis and worry. The closer the deadline, the more energy goes into reviewing rather than completing.",
      nextStep: "Define 'good enough,' limit reviews and separate preparation from rumination.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Avoidant Delayer",
      meaning: "Discomfort leads to postponement until urgency becomes unavoidable.",
      interpretation:
        "Your responses suggest discomfort or perfectionism slows your start. You often know what needs doing but postpone beginning until urgency overrides the resistance.",
      nextStep:
        "Start with a ten-minute action and make progress visible before motivation appears.",
      color: "orange",
    },
    {
      code: "E",
      label: "Rushed Reactor",
      meaning: "Moves quickly but may sacrifice coordination, accuracy or judgement.",
      interpretation:
        "Your responses suggest you respond to pressure with speed. You act decisively and move fast, but this can create quality or communication gaps when the pace is unsustainable.",
      nextStep: "Use a final pause checklist for quality, communication and consequences.",
      color: "red",
    },
  ],
  dimensions: [],
};
