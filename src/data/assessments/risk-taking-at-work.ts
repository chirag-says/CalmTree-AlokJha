/**
 * A19. Risk-Taking at Work Profile
 * Tier: Professional
 * Identifies how a person approaches uncertainty, potential loss and untested opportunities at work.
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
    subtitle: "How do you approach uncertainty and opportunity?",
    description:
      "Identify how you approach uncertainty, potential loss and untested opportunities at work. Four profiles, ten situational questions.",
    purpose:
      "Identifies how a person approaches uncertainty, potential loss and untested opportunities at work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "trending-up",
    productCategory: "Founders & Entrepreneurship",
    isFree: true,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["rtw1", "rtw5", "rtw10"],
  profileQuestions: [
    {
      id: "rtw1",
      text: "A new tool could significantly improve productivity, but the evidence is limited. You would:",
      options: [
        { label: "Wait until the tool is proven and widely adopted", profileCode: "A" },
        {
          label: "Compare the expected benefits, costs and risks before deciding",
          profileCode: "B",
        },
        { label: "Run a small pilot with limited scope", profileCode: "C" },
        { label: "Adopt it early and solve problems as they arise", profileCode: "D" },
      ],
    },
    {
      id: "rtw2",
      text: "A client offers a large project outside your team's usual expertise. You would:",
      options: [
        { label: "Decline unless the capabilities are already established", profileCode: "A" },
        { label: "Assess the gaps, margins and risk protection carefully", profileCode: "B" },
        { label: "Accept a limited first phase to test the fit", profileCode: "C" },
        { label: "Accept quickly and build the capability in parallel", profileCode: "D" },
      ],
    },
    {
      id: "rtw3",
      text: "When choosing between a reliable option and a high-upside uncertain option, you usually:",
      options: [
        { label: "Choose the reliable option", profileCode: "A" },
        { label: "Choose based on evidence and downside limits", profileCode: "B" },
        { label: "Split the approach or test both options", profileCode: "C" },
        { label: "Choose the higher-upside option", profileCode: "D" },
      ],
    },
    {
      id: "rtw4",
      text: "A senior leader proposes an ambitious target with no clear precedent. Your response is to:",
      options: [
        { label: "Highlight feasibility concerns clearly", profileCode: "A" },
        { label: "Model scenarios and identify the conditions required", profileCode: "B" },
        { label: "Suggest a smaller experiment to test the assumptions", profileCode: "C" },
        { label: "Commit and mobilise the team immediately", profileCode: "D" },
      ],
    },
    {
      id: "rtw5",
      text: "When a previous decision goes wrong, you tend to:",
      options: [
        { label: "Become more careful and strengthen safeguards", profileCode: "A" },
        { label: "Review what information was missing or misjudged", profileCode: "B" },
        { label: "Treat it as a learning and design a better test next time", profileCode: "C" },
        { label: "Recover quickly and move on", profileCode: "D" },
      ],
    },
    {
      id: "rtw6",
      text: "Which statement fits you best?",
      options: [
        {
          label: "Avoiding a preventable loss matters more than capturing an uncertain gain",
          profileCode: "A",
        },
        { label: "Risk is acceptable when it is understood and controlled", profileCode: "B" },
        { label: "Small experiments are the safest way to discover what works", profileCode: "C" },
        { label: "Progress requires moving before you have certainty", profileCode: "D" },
      ],
    },
    {
      id: "rtw7",
      text: "When investing time in an unproven idea, you prefer to:",
      options: [
        { label: "Wait for stronger demand signals before committing", profileCode: "A" },
        { label: "Set clear decision criteria and review the evidence", profileCode: "B" },
        { label: "Build the smallest workable version first", profileCode: "C" },
        { label: "Commit significant resources to establish an early lead", profileCode: "D" },
      ],
    },
    {
      id: "rtw8",
      text: "Colleagues may sometimes see you as:",
      options: [
        { label: "Too cautious or slow to commit", profileCode: "A" },
        { label: "Too analytical or deliberate", profileCode: "B" },
        { label: "Always experimenting rather than deciding", profileCode: "C" },
        { label: "Too willing to leap without enough preparation", profileCode: "D" },
      ],
    },
    {
      id: "rtw9",
      text: "Under uncertainty, your confidence comes mainly from:",
      options: [
        { label: "Rules, safeguards and proven methods", profileCode: "A" },
        { label: "Information, comparison and contingency planning", profileCode: "B" },
        { label: "Your ability to test, learn and adjust", profileCode: "C" },
        { label: "Personal conviction and speed of action", profileCode: "D" },
      ],
    },
    {
      id: "rtw10",
      text: "Before making a risky decision, what do you most need?",
      options: [
        { label: "Evidence that the downside is minimal", profileCode: "A" },
        { label: "A balanced understanding of probability and impact", profileCode: "B" },
        { label: "A reversible first step", profileCode: "C" },
        { label: "A compelling opportunity worth pursuing", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Cautious Protector",
      meaning: "Prioritises stability, safeguards and downside protection.",
      interpretation:
        "Your responses suggest you are careful and deliberate about risk. You protect what works, avoid preventable loss and ensure decisions are reversible where possible.",
      nextStep: "Distinguish genuine danger from discomfort; test small reversible risks.",
      color: "blue",
    },
    {
      code: "B",
      label: "Calculated Evaluator",
      meaning: "Takes risk after comparing evidence, consequences and controls.",
      interpretation:
        "Your responses suggest you approach risk analytically. You neither avoid nor chase it — you weigh probability, impact and safeguards before deciding.",
      nextStep: "Set a time limit for analysis so good opportunities are not missed.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Experimental Explorer",
      meaning: "Learns through pilots, prototypes and manageable experimentation.",
      interpretation:
        "Your responses suggest you prefer to learn by doing. You use small, reversible experiments to test assumptions before committing fully.",
      nextStep: "Define success measures and stop-loss points before beginning.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Bold Mover",
      meaning: "Acts quickly when upside appears attractive and accepts uncertainty.",
      interpretation:
        "Your responses suggest you are energised by upside potential. You move quickly, accept uncertainty as normal and trust your ability to course-correct.",
      nextStep: "Add a pre-mortem, seek dissent and separate courage from avoidable exposure.",
      color: "orange",
    },
  ],
  dimensions: [],
};
