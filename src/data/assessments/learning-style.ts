/**
 * A13. Learning Style Preferences
 * Pack 1 — Self-Awareness and Personality
 * Profile-based: highlights the learning formats a person naturally prefers.
 */

import type { ProfileAssessmentConfig } from "./types";

export const learningStyle: ProfileAssessmentConfig = {
  slug: "learning-style",
  order: 13,
  type: "profile-based",
  tier: "growth",
  category: "Personal Growth",
  status: "active",
  meta: {
    title: "Learning Style Preferences",
    subtitle: "How do you learn best?",
    description:
      "Discover the learning formats you naturally prefer while encouraging a flexible, mixed-method approach. Ten situational questions, instant private results.",
    purpose:
      "Highlights the learning formats a person naturally prefers while encouraging a flexible, mixed-method approach.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "book-open",
    productCategory: "Self-Awareness & Personality",
    isFree: true,
  },
  instructions:
    "Select the option that most closely reflects what you would usually do, not what you believe is the ideal answer.",
  tieBreakQuestionIds: ["a13q1", "a13q5", "a13q9"],
  profileQuestions: [
    {
      id: "a13q1",
      text: "When learning a new concept, you prefer to begin with:",
      options: [
        { label: "A diagram or overview", profileCode: "A" },
        { label: "A conversation or explanation", profileCode: "B" },
        { label: "A demonstration or task", profileCode: "C" },
        { label: "A clear written description", profileCode: "D" },
      ],
    },
    {
      id: "a13q2",
      text: "You remember information best when you:",
      options: [
        { label: "See where it fits in a visual pattern", profileCode: "A" },
        { label: "Explain it aloud", profileCode: "B" },
        { label: "Use it in a real situation", profileCode: "C" },
        { label: "Write notes and revisit them", profileCode: "D" },
      ],
    },
    {
      id: "a13q3",
      text: "A difficult topic becomes clearer when:",
      options: [
        { label: "Someone maps the parts and connections", profileCode: "A" },
        { label: "You can ask questions and discuss it", profileCode: "B" },
        { label: "You try it and correct mistakes", profileCode: "C" },
        { label: "You read several explanations quietly", profileCode: "D" },
      ],
    },
    {
      id: "a13q4",
      text: "In an online course, you value most:",
      options: [
        { label: "Slides, diagrams and visual summaries", profileCode: "A" },
        { label: "Instructor explanation and discussion", profileCode: "B" },
        { label: "Exercises and simulations", profileCode: "C" },
        { label: "Detailed notes and reading material", profileCode: "D" },
      ],
    },
    {
      id: "a13q5",
      text: "When preparing to teach someone, you:",
      options: [
        { label: "Create a model or sequence", profileCode: "A" },
        { label: "Rehearse how you will explain it", profileCode: "B" },
        { label: "Plan an activity or example", profileCode: "C" },
        { label: "Organise written points and references", profileCode: "D" },
      ],
    },
    {
      id: "a13q6",
      text: "When instructions are confusing, you:",
      options: [
        { label: "Sketch the process", profileCode: "A" },
        { label: "Ask someone to talk it through", profileCode: "B" },
        { label: "Start and learn from what happens", profileCode: "C" },
        { label: "Read them again and annotate them", profileCode: "D" },
      ],
    },
    {
      id: "a13q7",
      text: "Your notes usually contain:",
      options: [
        { label: "Arrows, boxes and visual grouping", profileCode: "A" },
        { label: "Key phrases from discussion", profileCode: "B" },
        { label: "Examples, steps and lessons from practice", profileCode: "C" },
        { label: "Detailed written summaries", profileCode: "D" },
      ],
    },
    {
      id: "a13q8",
      text: "You lose interest fastest when learning is:",
      options: [
        { label: "Visually disorganised", profileCode: "A" },
        { label: "Silent and isolated", profileCode: "B" },
        { label: "Entirely theoretical", profileCode: "C" },
        { label: "Too fast to reflect or take notes", profileCode: "D" },
      ],
    },
    {
      id: "a13q9",
      text: "You test understanding by:",
      options: [
        { label: "Recreating the map from memory", profileCode: "A" },
        { label: "Explaining it to another person", profileCode: "B" },
        { label: "Completing a task without help", profileCode: "C" },
        { label: "Writing a structured summary", profileCode: "D" },
      ],
    },
    {
      id: "a13q10",
      text: "The best learning plan for you combines your preference with:",
      options: [
        { label: "Practice and discussion", profileCode: "A" },
        { label: "Reading and independent review", profileCode: "B" },
        { label: "Conceptual explanation and reflection", profileCode: "C" },
        { label: "Examples and active application", profileCode: "D" },
      ],
    },
  ],
  profiles: [
    {
      code: "A",
      label: "Visual Mapper",
      meaning: "Learns by seeing relationships, diagrams, examples and organised visual structure.",
      interpretation:
        "Your responses suggest you learn by seeing relationships, diagrams, examples and organised visual structure.",
      nextStep:
        "Add retrieval practice and real tasks so visual understanding becomes usable skill.",
      color: "blue",
    },
    {
      code: "B",
      label: "Verbal Explorer",
      meaning: "Learns by discussing, explaining and hearing ideas in language.",
      interpretation:
        "Your responses suggest you learn by discussing, explaining and hearing ideas in language.",
      nextStep: "After discussion, write a short summary to check independent understanding.",
      color: "emerald",
    },
    {
      code: "C",
      label: "Practical Experimenter",
      meaning: "Learns by doing, testing and receiving immediate feedback.",
      interpretation:
        "Your responses suggest you learn by doing, testing and receiving immediate feedback.",
      nextStep: "Pause after practice to name the principle behind what worked.",
      color: "yellow",
    },
    {
      code: "D",
      label: "Reflective Reader",
      meaning: "Learns through reading, note-making and private reflection.",
      interpretation:
        "Your responses suggest you learn through reading, note-making and private reflection.",
      nextStep: "Add explanation, examples and action so reading does not remain passive.",
      color: "purple",
    },
  ],
  dimensions: [],
};
