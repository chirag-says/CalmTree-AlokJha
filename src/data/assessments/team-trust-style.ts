/**
 * W23. Team Trust Style
 * Profile-based: identifies how a person builds, evaluates and extends trust.
 */

import type { ProfileAssessmentConfig } from "./types";

export const teamTrustStyle: ProfileAssessmentConfig = {
  slug: "team-trust-style",
  order: 38, type: "profile-based", tier: "professional", category: "Professional", status: "active",
  meta: { title: "Team Trust Style", subtitle: "How do you build and evaluate trust?", description: "Identify how you build, evaluate and extend trust in teams and work relationships.", purpose: "Identifies how a person builds, evaluates and extends trust in work relationships.", duration: "3–5 minutes", questionCount: 10, icon: "shield", productCategory: "Leadership & Teams", isFree: false },
  instructions: "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["w23q1", "w23q5", "w23q9"],
  profileQuestions: [
    { id: "w23q1", text: "With a new colleague, you usually:", options: [
      { label: "Wait and observe before trusting", profileCode: "A" },
      { label: "Trust the role and adjust gradually", profileCode: "B" },
      { label: "Extend trust early and correct if needed", profileCode: "C" },
      { label: "Trust immediately and assume good intent", profileCode: "D" },
    ]},
    { id: "w23q2", text: "Trust is most strongly built through:", options: [
      { label: "Repeated evidence of reliability", profileCode: "A" },
      { label: "Clear accountability and structure", profileCode: "B" },
      { label: "Good-faith action and correction", profileCode: "C" },
      { label: "Open communication and warmth", profileCode: "D" },
    ]},
    { id: "w23q3", text: "When someone makes a mistake, you:", options: [
      { label: "Become more cautious about trusting them", profileCode: "A" },
      { label: "Review whether safeguards should change", profileCode: "B" },
      { label: "Keep trust if they acknowledge and adjust", profileCode: "C" },
      { label: "Assume it was unintentional and continue", profileCode: "D" },
    ]},
    { id: "w23q4", text: "You delegate important work when:", options: [
      { label: "The person has proved capable on smaller tasks", profileCode: "A" },
      { label: "Roles and checkpoints are clear", profileCode: "B" },
      { label: "You believe in their potential even with limited evidence", profileCode: "C" },
      { label: "You feel comfortable with them personally", profileCode: "D" },
    ]},
    { id: "w23q5", text: "A breach of trust causes you to:", options: [
      { label: "Withdraw significantly", profileCode: "A" },
      { label: "Restructure the agreement", profileCode: "B" },
      { label: "Discuss and rebuild with clear expectations", profileCode: "C" },
      { label: "Forgive quickly and try again", profileCode: "D" },
    ]},
    { id: "w23q6", text: "Your trust risk is:", options: [
      { label: "Trusting too slowly", profileCode: "A" },
      { label: "Over-relying on process over relationship", profileCode: "B" },
      { label: "Extending trust before enough evidence", profileCode: "C" },
      { label: "Being taken advantage of", profileCode: "D" },
    ]},
    { id: "w23q7", text: "You feel most trusted when:", options: [
      { label: "Others rely on your consistent track record", profileCode: "A" },
      { label: "Clear shared expectations are met", profileCode: "B" },
      { label: "Others take risks based on your word", profileCode: "C" },
      { label: "Personal warmth and openness are reciprocated", profileCode: "D" },
    ]},
    { id: "w23q8", text: "In a new team, trust develops for you through:", options: [
      { label: "Working together over time", profileCode: "A" },
      { label: "Agreeing norms and boundaries", profileCode: "B" },
      { label: "Early collaborative success", profileCode: "C" },
      { label: "Genuine personal connection", profileCode: "D" },
    ]},
    { id: "w23q9", text: "People may perceive you as:", options: [
      { label: "Cautious or reserved", profileCode: "A" },
      { label: "Structured and professional", profileCode: "B" },
      { label: "Open and willing to take trust risks", profileCode: "C" },
      { label: "Very warm but possibly naïve", profileCode: "D" },
    ]},
    { id: "w23q10", text: "Your development priority is:", options: [
      { label: "Extending trust earlier", profileCode: "A" },
      { label: "Adding relational flexibility", profileCode: "B" },
      { label: "Using better boundaries", profileCode: "C" },
      { label: "Verifying trust with evidence", profileCode: "D" },
    ]},
  ],
  profiles: [
    { code: "A", label: "Evidence Builder", meaning: "Trusts slowly after sustained evidence of reliability.", interpretation: "Your responses suggest you trust slowly after sustained evidence of reliability.", nextStep: "Extend small trust earlier and adjust rather than waiting for full proof.", color: "blue" },
    { code: "B", label: "Structured Truster", meaning: "Uses roles, agreements and accountability to build trust.", interpretation: "Your responses suggest you use roles, agreements and accountability to build trust.", nextStep: "Add personal connection so structure does not feel impersonal.", color: "emerald" },
    { code: "C", label: "Proactive Truster", meaning: "Extends trust early and corrects quickly when needed.", interpretation: "Your responses suggest you extend trust early and correct quickly when needed.", nextStep: "Set clearer boundaries so early trust does not become unchecked risk.", color: "yellow" },
    { code: "D", label: "Relationship Truster", meaning: "Trusts through personal warmth, openness and assumed good intent.", interpretation: "Your responses suggest you trust through personal warmth, openness and assumed good intent.", nextStep: "Verify through evidence and respond promptly when trust is violated.", color: "purple" },
  ],
  dimensions: [],
};
