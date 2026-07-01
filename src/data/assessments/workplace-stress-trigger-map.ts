/**
 * A26. Workplace Stress Trigger Map
 * Tier: Professional
 * Identifies the workplace condition most likely to create strain: volume, ambiguity, conflict, low control or evaluation pressure.
 */

import type { ProfileAssessmentConfig } from "./types";

export const workplaceStressTriggerMap: ProfileAssessmentConfig = {
  slug: "workplace-stress-trigger-map",
  order: 26,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Workplace Stress Trigger Map",
    subtitle: "What drains you most at work?",
    description:
      "Identify the workplace condition most likely to create strain for you — volume, ambiguity, conflict, low control or evaluation pressure. Five profiles, ten questions.",
    purpose:
      "Identifies the workplace condition most likely to create strain: volume, ambiguity, conflict, low control or evaluation pressure.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "alert-circle",
    productCategory: "Emotional Strength & Everyday Mind",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["wst1", "wst4", "wst9"],
  profileQuestions: [
    {
      id: "wst1",
      text: "Which situation is most likely to stay in your mind after work?",
      options: [
        { label: "Too many unfinished tasks", profileCode: "A" },
        { label: "Not knowing what is expected", profileCode: "B" },
        { label: "A tense interaction with someone", profileCode: "C" },
        { label: "Depending on decisions you cannot influence", profileCode: "D" },
        { label: "Worrying how your performance was judged", profileCode: "E" },
      ],
    },
    {
      id: "wst2",
      text: "When pressure builds, what do you notice first?",
      options: [
        { label: "A sense that there is never enough time", profileCode: "A" },
        { label: "Confusion about priorities or direction", profileCode: "B" },
        { label: "Emotional tension around people", profileCode: "C" },
        { label: "Frustration about lack of control", profileCode: "D" },
        { label: "Fear of making a visible mistake", profileCode: "E" },
      ],
    },
    {
      id: "wst3",
      text: "Which manager behaviour is hardest for you?",
      options: [
        { label: "Adding work without removing priorities", profileCode: "A" },
        { label: "Giving vague or changing instructions", profileCode: "B" },
        { label: "Creating hostility or unresolved tension", profileCode: "C" },
        { label: "Micromanaging while withholding real authority", profileCode: "D" },
        { label: "Criticising publicly or comparing people", profileCode: "E" },
      ],
    },
    {
      id: "wst4",
      text: "What makes a difficult project feel manageable?",
      options: [
        { label: "Realistic workload and adequate resources", profileCode: "A" },
        { label: "Clear goals, roles and decision rules", profileCode: "B" },
        { label: "Cooperative relationships and open communication", profileCode: "C" },
        { label: "Meaningful control over the method and decisions", profileCode: "D" },
        { label: "Fair evaluation and private useful feedback", profileCode: "E" },
      ],
    },
    {
      id: "wst5",
      text: "You recover fastest when:",
      options: [
        { label: "The workload becomes visibly lighter", profileCode: "A" },
        { label: "The situation becomes clearer", profileCode: "B" },
        { label: "The relationship issue is resolved", profileCode: "C" },
        { label: "You regain influence over the outcome", profileCode: "D" },
        { label: "You know how your work is being assessed", profileCode: "E" },
      ],
    },
    {
      id: "wst6",
      text: "Which uncertainty feels most stressful?",
      options: [
        { label: "Whether everything can be completed in time", profileCode: "A" },
        { label: "What the task or priority actually means", profileCode: "B" },
        { label: "How another person may react", profileCode: "C" },
        { label: "Whether others will make decisions affecting your work", profileCode: "D" },
        { label: "Whether your performance will be seen as good enough", profileCode: "E" },
      ],
    },
    {
      id: "wst7",
      text: "When you consider changing jobs, the strongest reason would be:",
      options: [
        { label: "Unsustainable workload", profileCode: "A" },
        { label: "Constant confusion and role ambiguity", profileCode: "B" },
        { label: "Toxic relationships or conflict", profileCode: "C" },
        { label: "Lack of autonomy and influence", profileCode: "D" },
        { label: "A culture of criticism and comparison", profileCode: "E" },
      ],
    },
    {
      id: "wst8",
      text: "Your body or mood reacts most strongly to:",
      options: [
        { label: "Accumulated demands and long hours", profileCode: "A" },
        { label: "Repeated changes without explanation", profileCode: "B" },
        { label: "Hostility, exclusion or difficult conversations", profileCode: "C" },
        { label: "Being trapped by dependencies or rigid rules", profileCode: "D" },
        { label: "Presentations, reviews or visible evaluation", profileCode: "E" },
      ],
    },
    {
      id: "wst9",
      text: "What support would help you most in a difficult week?",
      options: [
        { label: "Prioritisation and workload reduction", profileCode: "A" },
        { label: "Clear answers and written expectations", profileCode: "B" },
        { label: "A respectful conversation or mediation", profileCode: "C" },
        { label: "Authority, options or decision access", profileCode: "D" },
        { label: "Specific reassurance and constructive feedback", profileCode: "E" },
      ],
    },
    {
      id: "wst10",
      text: "Which statement fits best?",
      options: [
        { label: "I can handle difficulty better than endless volume", profileCode: "A" },
        { label: "I can handle difficulty better than uncertainty", profileCode: "B" },
        { label: "I can handle difficulty better than interpersonal tension", profileCode: "C" },
        { label: "I can handle difficulty better when I have influence", profileCode: "D" },
        {
          label: "I can handle difficulty better when I know how I am being judged",
          profileCode: "E",
        },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Workload-Sensitive",
      meaning: "Stress rises when demands exceed available time, energy or resources.",
      interpretation:
        "Your responses suggest volume is your primary stressor. When demands outpace your capacity, your wellbeing, quality and relationships all suffer.",
      nextStep:
        "Reduce concurrent priorities and negotiate capacity before overload becomes chronic.",
      color: "orange",
    },
    {
      code: "B",
      label: "Ambiguity-Sensitive",
      meaning: "Unclear expectations, shifting instructions and missing information create strain.",
      interpretation:
        "Your responses suggest ambiguity is your primary stressor. Uncertainty about what is expected depletes your confidence and direction.",
      nextStep: "Convert uncertainty into assumptions, questions and review points.",
      color: "blue",
    },
    {
      code: "C",
      label: "Conflict-Sensitive",
      meaning:
        "Interpersonal tension, difficult conversations and poor cooperation consume energy.",
      interpretation:
        "Your responses suggest interpersonal tension is your primary stressor. Difficult relationships or unresolved disagreement carry a disproportionate cost for you.",
      nextStep:
        "Use boundaries and structured conversations instead of carrying unresolved tension.",
      color: "red",
    },
    {
      code: "D",
      label: "Control-Sensitive",
      meaning: "Stress rises when important outcomes depend on factors you cannot influence.",
      interpretation:
        "Your responses suggest powerlessness is your primary stressor. When important outcomes rest on factors outside your control, anxiety and frustration rise quickly.",
      nextStep:
        "Separate controllable actions from uncontrollable conditions and focus effort accordingly.",
      color: "purple",
    },
    {
      code: "E",
      label: "Evaluation-Sensitive",
      meaning: "Scrutiny, comparison, visible mistakes and performance judgment create pressure.",
      interpretation:
        "Your responses suggest evaluation is your primary stressor. Being watched, judged or compared creates significant internal pressure for you.",
      nextStep: "Define success criteria early and replace mind-reading with direct feedback.",
      color: "yellow",
    },
  ],
  dimensions: [],
};
