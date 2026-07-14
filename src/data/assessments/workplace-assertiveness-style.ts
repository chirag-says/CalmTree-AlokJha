/**
 * W5. Workplace Assertiveness Style
 * Profile-based: shows how a person expresses opinions, requests,
 * boundaries and disagreement at work.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplaceAssertiveness: ProfileAssessmentConfig = {
  slug: "workplace-assertiveness-style",
  order: 20,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Assertiveness Style",
    subtitle: "How assertive are you at work?",
    description: "Discover how you express opinions, requests, boundaries and disagreement at work.",
    purpose: "Shows how a person expresses opinions, requests, boundaries and disagreement at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "shield",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w5q1", "w5q5", "w5q9"],
  profileQuestions: [
    { id: "w5q1", text: "A colleague repeatedly misses a commitment that affects you. You:", options: [
      { label: "Work around it rather than confront them", profileCode: "A" },
      { label: "Raise it gently and ask what is happening", profileCode: "B" },
      { label: "Describe the impact and agree a clear expectation", profileCode: "C" },
      { label: "Tell them directly that the behaviour is unacceptable", profileCode: "D" },
    ]},
    { id: "w5q2", text: "When your manager assigns unrealistic work, you:", options: [
      { label: "Accept and try to manage", profileCode: "A" },
      { label: "Explain the pressure carefully", profileCode: "B" },
      { label: "Clarify trade-offs and negotiate priorities", profileCode: "C" },
      { label: "Refuse the demand strongly", profileCode: "D" },
    ]},
    { id: "w5q3", text: "In meetings, you speak when:", options: [
      { label: "You are invited", profileCode: "A" },
      { label: "You can add without creating tension", profileCode: "B" },
      { label: "Your view is relevant, even if different", profileCode: "C" },
      { label: "You believe the group is wrong or too slow", profileCode: "D" },
    ]},
    { id: "w5q4", text: "When someone interrupts you, you:", options: [
      { label: "Let them finish", profileCode: "A" },
      { label: "Wait for a gap and return to your point", profileCode: "B" },
      { label: "Say you would like to complete the point", profileCode: "C" },
      { label: "Interrupt back or challenge them", profileCode: "D" },
    ]},
    { id: "w5q5", text: "Your boundary style is:", options: [
      { label: "Flexible to avoid disappointing people", profileCode: "A" },
      { label: "Gentle and relationship-aware", profileCode: "B" },
      { label: "Clear, calm and consistent", profileCode: "C" },
      { label: "Firm and non-negotiable", profileCode: "D" },
    ]},
    { id: "w5q6", text: "During disagreement, you prioritise:", options: [
      { label: "Keeping the peace", profileCode: "A" },
      { label: "Finding a tactful compromise", profileCode: "B" },
      { label: "Respectful clarity and workable resolution", profileCode: "C" },
      { label: "Winning the argument or decision", profileCode: "D" },
    ]},
    { id: "w5q7", text: "People may experience you as:", options: [
      { label: "Too yielding", profileCode: "A" },
      { label: "Indirect", profileCode: "B" },
      { label: "Clear and fair", profileCode: "C" },
      { label: "Intimidating", profileCode: "D" },
    ]},
    { id: "w5q8", text: "When asking for recognition or resources, you:", options: [
      { label: "Hope your work speaks for itself", profileCode: "A" },
      { label: "Raise the need carefully", profileCode: "B" },
      { label: "Present the case and make a direct request", profileCode: "C" },
      { label: "Press hard and escalate quickly", profileCode: "D" },
    ]},
    { id: "w5q9", text: "If a policy seems unfair, you:", options: [
      { label: "Adapt quietly", profileCode: "A" },
      { label: "Discuss it privately", profileCode: "B" },
      { label: "Raise evidence and suggest a change", profileCode: "C" },
      { label: "Challenge it publicly", profileCode: "D" },
    ]},
    { id: "w5q10", text: "Your development priority is:", options: [
      { label: "Speaking earlier", profileCode: "A" },
      { label: "Making requests more explicit", profileCode: "B" },
      { label: "Adjusting firmness to context", profileCode: "C" },
      { label: "Slowing down and reducing threat", profileCode: "D" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Accommodating Supporter", meaning: "Protects harmony and often yields to others.", interpretation: "Your responses suggest you protect harmony and often yield to others.", nextStep: "Practise one clear request or boundary in a low-risk situation.", color: "blue" },
    { code: "B", label: "Diplomatic Contributor", meaning: "Expresses concerns tactfully and looks for mutual agreement.", interpretation: "Your responses suggest you express concerns tactfully and look for mutual agreement.", nextStep: "Keep the tact, but state the actual need before offering compromise.", color: "emerald" },
    { code: "C", label: "Clear Advocate", meaning: "States needs, limits and views directly while respecting others.", interpretation: "Your responses suggest you state needs, limits and views directly while respecting others.", nextStep: "Continue using clear language and check how context affects delivery.", color: "yellow" },
    { code: "D", label: "Forceful Challenger", meaning: "Pushes strongly for a position and may prioritise outcome over comfort.", interpretation: "Your responses suggest you push strongly for a position and may prioritise outcome over comfort.", nextStep: "Use questions and impact statements before applying stronger pressure.", color: "orange" },
  ],
  dimensions: [],
};
