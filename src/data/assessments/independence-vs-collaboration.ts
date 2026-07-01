/**
 * A23. Independence vs Collaboration Profile
 * Tier: Professional
 * Shows how a person prefers to divide thinking, ownership and execution between individual and group work.
 */

import type { ProfileAssessmentConfig } from "./types";

export const independenceVsCollaboration: ProfileAssessmentConfig = {
  slug: "independence-vs-collaboration",
  order: 23,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Independence vs Collaboration Profile",
    subtitle: "How do you prefer to own and share your work?",
    description:
      "Discover how you prefer to divide thinking, ownership and execution between individual and group work. Four profiles, ten situational questions.",
    purpose:
      "Shows how a person prefers to divide thinking, ownership and execution between individual and group work.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "git-branch",
    productCategory: "Workplace Effectiveness",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["ivc1", "ivc4", "ivc8"],
  profileQuestions: [
    {
      id: "ivc1",
      text: "When given a complex assignment, you prefer to:",
      options: [
        { label: "Own independently start to finish", profileCode: "A" },
        { label: "Work alone first then seek input at selected points", profileCode: "B" },
        { label: "Divide work between solo and joint phases", profileCode: "C" },
        { label: "Work closely with others throughout", profileCode: "D" },
      ],
    },
    {
      id: "ivc2",
      text: "Your best ideas usually emerge when you:",
      options: [
        { label: "Have uninterrupted time to think", profileCode: "A" },
        { label: "Develop an initial view before discussing", profileCode: "B" },
        { label: "Move between reflection and conversation", profileCode: "C" },
        { label: "Think aloud with other people", profileCode: "D" },
      ],
    },
    {
      id: "ivc3",
      text: "For an important decision, you want:",
      options: [
        { label: "Freedom to decide within your responsibility", profileCode: "A" },
        { label: "One or two informed perspectives before deciding", profileCode: "B" },
        { label: "Structured discussion followed by clear ownership", profileCode: "C" },
        { label: "Broad participation and shared agreement", profileCode: "D" },
      ],
    },
    {
      id: "ivc4",
      text: "Which situation drains you most?",
      options: [
        { label: "Frequent coordination for work I could do alone", profileCode: "A" },
        { label: "Input from too many people at the wrong time", profileCode: "B" },
        { label: "Being forced into only solo or only group work", profileCode: "C" },
        { label: "Working in isolation without discussion or support", profileCode: "D" },
      ],
    },
    {
      id: "ivc5",
      text: "In group projects, you naturally:",
      options: [
        { label: "Take a defined portion and complete it independently", profileCode: "A" },
        { label: "Own your part and coordinate at milestones", profileCode: "B" },
        { label: "Help connect individual work into a coherent whole", profileCode: "C" },
        { label: "Keep people interacting and solving problems together", profileCode: "D" },
      ],
    },
    {
      id: "ivc6",
      text: "When work becomes difficult, you first:",
      options: [
        { label: "Spend more time solving it independently", profileCode: "A" },
        { label: "Try independently then consult someone relevant", profileCode: "B" },
        { label: "Decide whether solo analysis or discussion will help more", profileCode: "C" },
        { label: "Bring others together quickly to explore it", profileCode: "D" },
      ],
    },
    {
      id: "ivc7",
      text: "Your ideal workplace gives you:",
      options: [
        { label: "Quiet, autonomy and clear personal accountability", profileCode: "A" },
        { label: "Autonomy with easy access to expertise", profileCode: "B" },
        { label: "A mix of focus time and collaboration", profileCode: "C" },
        { label: "Regular interaction and shared problem-solving", profileCode: "D" },
      ],
    },
    {
      id: "ivc8",
      text: "When receiving input on unfinished work, you:",
      options: [
        { label: "Prefer to wait until the work is more complete", profileCode: "A" },
        { label: "Want input only on specific questions", profileCode: "B" },
        { label: "Welcome input at agreed stages", profileCode: "C" },
        { label: "Prefer ongoing feedback and co-creation", profileCode: "D" },
      ],
    },
    {
      id: "ivc9",
      text: "How do you view team meetings?",
      options: [
        { label: "Useful only when individual coordination is unavoidable", profileCode: "A" },
        { label: "Helpful when tightly focused on decisions or expertise", profileCode: "B" },
        { label: "Useful when balanced with individual execution", profileCode: "C" },
        { label: "Essential for alignment, energy and shared progress", profileCode: "D" },
      ],
    },
    {
      id: "ivc10",
      text: "A successful project feels most satisfying when:",
      options: [
        { label: "You can clearly see what you personally created", profileCode: "A" },
        { label: "You had ownership and used others' expertise well", profileCode: "B" },
        { label: "Individual strengths and teamwork were well balanced", profileCode: "C" },
        { label: "The group achieved something no one could do alone", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Solo Specialist",
      meaning: "Prefers deep individual ownership and minimal coordination.",
      interpretation:
        "Your responses suggest you do your best work when you have clear personal ownership and minimal coordination overhead. Independence is a performance condition, not just a preference.",
      nextStep: "Share work-in-progress earlier so independence does not become isolation.",
      color: "blue",
    },
    {
      code: "B",
      label: "Independent Collaborator",
      meaning: "Likes personal ownership with targeted input at key moments.",
      interpretation:
        "Your responses suggest you value ownership but know when outside input adds value. You are selective about when and how you involve others.",
      nextStep: "Specify when input is useful so collaboration remains efficient.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Balanced Partner",
      meaning: "Moves comfortably between solo focus and shared problem-solving.",
      interpretation:
        "Your responses suggest you move fluidly between solo and collaborative modes depending on what the work needs. You are comfortable in both.",
      nextStep: "Choose the mode intentionally rather than defaulting to whichever is easiest.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Team Integrator",
      meaning: "Thinks and performs best through frequent exchange and shared ownership.",
      interpretation:
        "Your responses suggest your best thinking happens in dialogue. You are energised by shared ownership and prefer to solve problems together rather than alone.",
      nextStep: "Protect some individual focus time and avoid unnecessary group dependency.",
      color: "orange",
    },
  ],
  dimensions: [],
};
