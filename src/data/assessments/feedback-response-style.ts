/**
 * A37. Feedback Response Style
 * Tier: Professional
 * Shows the person's immediate and reflective pattern when receiving corrective or developmental feedback.
 */

import type { ProfileAssessmentConfig } from "./types";

export const feedbackResponseStyle: ProfileAssessmentConfig = {
  slug: "feedback-response-style",
  order: 37,
  type: "profile-based",
  tier: "professional",
  category: "Professional",
  status: "active",
  meta: {
    title: "Feedback Response Style",
    subtitle: "How do you respond when you receive feedback?",
    description:
      "See your immediate and reflective pattern when receiving corrective or developmental feedback. Five profiles, ten situational questions.",
    purpose:
      "Shows the person's immediate and reflective pattern when receiving corrective or developmental feedback.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "message-circle",
    productCategory: "Leadership & Teams",
    isFree: false,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["frs1", "frs4", "frs8"],
  profileQuestions: [
    {
      id: "frs1",
      text: "When someone gives unexpected critical feedback, your first instinct is to:",
      options: [
        { label: "Ask what you can improve", profileCode: "A" },
        { label: "Listen then take time to process it", profileCode: "B" },
        { label: "Explain the context or intention behind your action", profileCode: "C" },
        { label: "React immediately with visible emotion or a strong response", profileCode: "D" },
        {
          label: "Evaluate whether the person has enough evidence or understanding",
          profileCode: "E",
        },
      ],
    },
    {
      id: "frs2",
      text: "After a performance conversation, you are most likely to:",
      options: [
        { label: "Create a specific improvement action", profileCode: "A" },
        { label: "Replay the conversation and form a considered view", profileCode: "B" },
        { label: "Focus on what was unfair or misunderstood", profileCode: "C" },
        { label: "Feel highly motivated or discouraged depending on the tone", profileCode: "D" },
        { label: "Separate useful evidence from opinion", profileCode: "E" },
      ],
    },
    {
      id: "frs3",
      text: "Which feedback is easiest to accept?",
      options: [
        { label: "Specific feedback linked to growth", profileCode: "A" },
        { label: "Feedback given with time to reflect", profileCode: "B" },
        { label: "Feedback that acknowledges your intention and effort", profileCode: "C" },
        { label: "Feedback delivered warmly and positively", profileCode: "D" },
        { label: "Feedback supported by examples and credible expertise", profileCode: "E" },
      ],
    },
    {
      id: "frs4",
      text: "If you disagree with feedback, you:",
      options: [
        { label: "Explore whether part of it may still be useful", profileCode: "A" },
        { label: "Think privately before responding", profileCode: "B" },
        { label: "Defend your position and explain why it is different", profileCode: "C" },
        { label: "Challenge or reject it in the moment", profileCode: "D" },
        { label: "Ask for evidence, comparison and context", profileCode: "E" },
      ],
    },
    {
      id: "frs5",
      text: "Your common feedback difficulty is:",
      options: [
        { label: "Trying to improve too many things at once", profileCode: "A" },
        { label: "Taking too long to respond or act", profileCode: "B" },
        { label: "Hearing criticism as a threat to competence", profileCode: "C" },
        { label: "Allowing emotion to dominate the conversation", profileCode: "D" },
        {
          label: "Discounting feedback that does not meet your standard of proof",
          profileCode: "E",
        },
      ],
    },
    {
      id: "frs6",
      text: "When feedback is vague, you:",
      options: [
        { label: "Ask what a better behaviour would look like", profileCode: "A" },
        { label: "Note it and think about possible meanings", profileCode: "B" },
        { label: "Feel frustrated that your work is being judged unfairly", profileCode: "C" },
        { label: "Respond strongly to the uncertainty", profileCode: "D" },
        { label: "Request examples and observable evidence", profileCode: "E" },
      ],
    },
    {
      id: "frs7",
      text: "When feedback is positive, you:",
      options: [
        { label: "Ask how to build on the strength", profileCode: "A" },
        { label: "Absorb it quietly and reflect on it", profileCode: "B" },
        { label: "Feel relieved that your competence is recognised", profileCode: "C" },
        { label: "Show immediate enthusiasm", profileCode: "D" },
        { label: "Consider how consistent and credible the feedback is", profileCode: "E" },
      ],
    },
    {
      id: "frs8",
      text: "A trusted colleague says you made a mistake. You:",
      options: [
        { label: "Thank them and focus on correcting it", profileCode: "A" },
        { label: "Review the situation carefully before discussing it further", profileCode: "B" },
        {
          label: "Explain why the mistake occurred or why it was understandable",
          profileCode: "C",
        },
        { label: "React immediately then reconsider later", profileCode: "D" },
        { label: "Check facts and assess the seriousness of the claim", profileCode: "E" },
      ],
    },
    {
      id: "frs9",
      text: "The most useful feedback conversation for you includes:",
      options: [
        { label: "A clear development goal", profileCode: "A" },
        { label: "Space to think and revisit the discussion", profileCode: "B" },
        { label: "Respect for context and intention", profileCode: "C" },
        { label: "A calm tone that reduces emotional intensity", profileCode: "D" },
        { label: "Specific evidence and a credible perspective", profileCode: "E" },
      ],
    },
    {
      id: "frs10",
      text: "A balancing practice that would help you most is:",
      options: [
        { label: "Prioritise one improvement at a time", profileCode: "A" },
        { label: "Agree when you will return with a response", profileCode: "B" },
        { label: "Listen fully before explaining", profileCode: "C" },
        { label: "Use a pause before reacting", profileCode: "D" },
        { label: "Look for value even in imperfect feedback", profileCode: "E" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Growth Seeker",
      meaning: "Approaches feedback as information for learning and improvement.",
      interpretation:
        "Your responses suggest you welcome feedback as useful data. You look for the lesson, create an action and move forward without becoming defensive or overwhelmed.",
      nextStep: "Retain discernment; not every opinion deserves equal weight.",
      color: "emerald",
    },
    {
      code: "B",
      label: "Reflective Processor",
      meaning: "Needs time to think before deciding what the feedback means.",
      interpretation:
        "Your responses suggest you process feedback internally before responding. You need time to evaluate what it means before you can agree, disagree or act.",
      nextStep: "Tell the giver you are processing rather than appearing disengaged.",
      color: "blue",
    },
    {
      code: "C",
      label: "Defensive Protector",
      meaning: "Initially protects competence, intention or identity from perceived threat.",
      interpretation:
        "Your responses suggest feedback can feel like a threat to your self-image. Your first instinct is to explain, correct or protect rather than to explore.",
      nextStep: "Pause before explaining; first summarise what you heard and ask for an example.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Immediate Reactor",
      meaning: "Responds quickly and emotionally, positively or negatively.",
      interpretation:
        "Your responses suggest feedback produces an immediate emotional response. You react visibly and quickly — with enthusiasm when it is positive and with strong feeling when it is not.",
      nextStep:
        "Delay response until emotional intensity reduces and the useful message becomes clearer.",
      color: "orange",
    },
    {
      code: "E",
      label: "Selective Evaluator",
      meaning: "Assesses the credibility, context and evidence before accepting feedback.",
      interpretation:
        "Your responses suggest you evaluate feedback carefully before accepting it. Credibility, evidence and context matter before you decide how much weight to give a message.",
      nextStep:
        "Avoid dismissing uncomfortable feedback only because the delivery or source is imperfect.",
      color: "purple",
    },
  ],
  dimensions: [],
};
