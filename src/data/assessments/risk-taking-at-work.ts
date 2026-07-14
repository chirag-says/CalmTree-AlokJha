/**
 * W4. Risk-Taking at Work Profile
 * Profile-based: identifies how a person balances opportunity, uncertainty,
 * evidence and downside when making work decisions.
 */

import type { ProfileAssessmentConfig } from "./types";

export const riskTakingAtWork: ProfileAssessmentConfig = {
  slug: "risk-taking-at-work",
  order: 19,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Risk-Taking at Work Profile",
    subtitle: "How do you handle risk at work?",
    description: "Identify how you balance opportunity, uncertainty, evidence and downside when making work decisions.",
    purpose: "Identifies how a person balances opportunity, uncertainty, evidence and downside when making work decisions.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "target",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w4q1", "w4q5", "w4q9"],
  profileQuestions: [
    { id: "w4q1", text: "A new idea could create major value but evidence is limited. You:", options: [
      { label: "Wait for stronger proof", profileCode: "A" },
      { label: "Run a small, reversible pilot", profileCode: "B" },
      { label: "Move early while tracking warning signs", profileCode: "C" },
      { label: "Commit quickly before the opportunity closes", profileCode: "D" },
    ]},
    { id: "w4q2", text: "When choosing between a safe improvement and uncertain breakthrough, you:", options: [
      { label: "Choose the safer improvement", profileCode: "A" },
      { label: "Fund a limited experiment alongside the safe option", profileCode: "B" },
      { label: "Lean towards the breakthrough if upside is meaningful", profileCode: "C" },
      { label: "Back the breakthrough strongly", profileCode: "D" },
    ]},
    { id: "w4q3", text: "A proposal has a 30% chance of high reward. You first ask:", options: [
      { label: "What could go wrong?", profileCode: "A" },
      { label: "How can we cap the downside?", profileCode: "B" },
      { label: "What is the expected value?", profileCode: "C" },
      { label: "How fast can we move?", profileCode: "D" },
    ]},
    { id: "w4q4", text: "Your response to incomplete information is to:", options: [
      { label: "Delay the decision", profileCode: "A" },
      { label: "Identify the minimum evidence needed", profileCode: "B" },
      { label: "Decide and review as information arrives", profileCode: "C" },
      { label: "Trust judgement and act", profileCode: "D" },
    ]},
    { id: "w4q5", text: "People may describe you as:", options: [
      { label: "Careful", profileCode: "A" },
      { label: "Pragmatically experimental", profileCode: "B" },
      { label: "Opportunity-oriented", profileCode: "C" },
      { label: "Fearless or impulsive", profileCode: "D" },
    ]},
    { id: "w4q6", text: "When an experiment fails, you:", options: [
      { label: "Become more cautious", profileCode: "A" },
      { label: "Review the test and redesign it", profileCode: "B" },
      { label: "Look quickly for the next option", profileCode: "C" },
      { label: "Accept it as the cost of bold action", profileCode: "D" },
    ]},
    { id: "w4q7", text: "You are most uncomfortable with:", options: [
      { label: "Unprotected downside", profileCode: "A" },
      { label: "Risks that cannot be tested", profileCode: "B" },
      { label: "Missing a promising window", profileCode: "C" },
      { label: "Slow decision cycles", profileCode: "D" },
    ]},
    { id: "w4q8", text: "Before making a risky commitment, you need:", options: [
      { label: "Strong assurance", profileCode: "A" },
      { label: "A fallback plan", profileCode: "B" },
      { label: "A persuasive opportunity case", profileCode: "C" },
      { label: "Enough conviction to move", profileCode: "D" },
    ]},
    { id: "w4q9", text: "Your preferred portfolio is:", options: [
      { label: "Mostly proven initiatives", profileCode: "A" },
      { label: "Core stability plus controlled experiments", profileCode: "B" },
      { label: "Several growth bets with review points", profileCode: "C" },
      { label: "Concentrated bets on transformative possibilities", profileCode: "D" },
    ]},
    { id: "w4q10", text: "Your best growth step is to:", options: [
      { label: "Test small risks", profileCode: "A" },
      { label: "Act before every detail is known", profileCode: "B" },
      { label: "Strengthen downside analysis", profileCode: "C" },
      { label: "Use staged commitments and stop rules", profileCode: "D" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Cautious Protector", meaning: "Minimises downside and prefers proven options.", interpretation: "Your responses suggest you minimise downside and prefer proven options.", nextStep: "Use small reversible experiments to build evidence without taking uncontrolled risk.", color: "blue" },
    { code: "B", label: "Calculated Experimenter", meaning: "Takes limited, testable risks with safeguards.", interpretation: "Your responses suggest you take limited, testable risks with safeguards.", nextStep: "Avoid making every experiment too small to reveal meaningful information.", color: "emerald" },
    { code: "C", label: "Opportunity Seeker", meaning: "Moves towards promising possibilities with moderate analysis.", interpretation: "Your responses suggest you move towards promising possibilities with moderate analysis.", nextStep: "Set explicit downside limits and decision review points.", color: "yellow" },
    { code: "D", label: "Bold Pioneer", meaning: "Accepts substantial uncertainty in pursuit of high potential.", interpretation: "Your responses suggest you accept substantial uncertainty in pursuit of high potential.", nextStep: "Use staged commitments, pre-mortems and stop rules before major bets.", color: "orange" },
  ],
  dimensions: [],
};
