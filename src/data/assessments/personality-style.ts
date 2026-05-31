/**
 * Mini-IPIP Personality Style Assessment
 * Based on the International Personality Item Pool (IPIP), Donnellan et al., 2006.
 *
 * 20-item measure of the Big Five personality traits:
 * Extraversion, Agreeableness, Conscientiousness, Neuroticism, Openness.
 * 4 items per trait. Items marked reverse are reverse-scored.
 * IPIP is explicitly public domain — free for any use.
 *
 * Note: We score this as a single "Personality Balance" metric for the
 * self-check format. The detailed per-trait breakdown is a future upgrade.
 * Score range: 20–100.
 */

import type { AssessmentConfig } from "./types";

const AGREE_5 = [
  { label: "Very inaccurate", value: 1 },
  { label: "Moderately inaccurate", value: 2 },
  { label: "Neither accurate nor inaccurate", value: 3 },
  { label: "Moderately accurate", value: 4 },
  { label: "Very accurate", value: 5 },
];

export const personalityStyle: AssessmentConfig = {
  slug: "personality-style",
  meta: {
    title: "Personality Style Assessment",
    subtitle: "What does your personality look like?",
    description:
      "A quick snapshot of your personality across five core dimensions — extraversion, agreeableness, conscientiousness, emotional stability, and openness to experience.",
    duration: "5–7 minutes",
    questionCount: 20,
    icon: "user",
    source:
      "Based on the Mini-IPIP (International Personality Item Pool) by Donnellan et al., 2006. Public domain.",
  },
  instructions:
    "Describe yourself as you generally are now, not as you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same sex and roughly your age.",
  questions: [
    // Extraversion
    { id: "p1", text: "I am the life of the party.", options: AGREE_5 },
    { id: "p2", text: "I don't talk a lot.", options: AGREE_5, reverse: true },
    { id: "p3", text: "I talk to a lot of different people at parties.", options: AGREE_5 },
    { id: "p4", text: "I keep in the background.", options: AGREE_5, reverse: true },
    // Agreeableness
    { id: "p5", text: "I sympathise with others' feelings.", options: AGREE_5 },
    { id: "p6", text: "I am not interested in other people's problems.", options: AGREE_5, reverse: true },
    { id: "p7", text: "I feel others' emotions.", options: AGREE_5 },
    { id: "p8", text: "I am not really interested in others.", options: AGREE_5, reverse: true },
    // Conscientiousness
    { id: "p9", text: "I get chores done right away.", options: AGREE_5 },
    { id: "p10", text: "I often forget to put things back in their proper place.", options: AGREE_5, reverse: true },
    { id: "p11", text: "I like order.", options: AGREE_5 },
    { id: "p12", text: "I make a mess of things.", options: AGREE_5, reverse: true },
    // Neuroticism (reverse-framed as Emotional Stability)
    { id: "p13", text: "I have frequent mood swings.", options: AGREE_5 },
    { id: "p14", text: "I am relaxed most of the time.", options: AGREE_5, reverse: true },
    { id: "p15", text: "I get upset easily.", options: AGREE_5 },
    { id: "p16", text: "I seldom feel blue.", options: AGREE_5, reverse: true },
    // Openness
    { id: "p17", text: "I have a vivid imagination.", options: AGREE_5 },
    { id: "p18", text: "I am not interested in abstract ideas.", options: AGREE_5, reverse: true },
    { id: "p19", text: "I have difficulty understanding abstract ideas.", options: AGREE_5, reverse: true },
    { id: "p20", text: "I have a rich vocabulary.", options: AGREE_5 },
  ],
  scoring: { method: "sum", min: 20, max: 100 },
  resultRanges: [
    {
      min: 20, max: 45,
      label: "Reflective & Reserved",
      color: "yellow",
      interpretation:
        "Your personality profile leans towards introversion, independence, and emotional sensitivity. You likely prefer depth over breadth in relationships and think carefully before acting. These are genuine strengths — not limitations.",
      suggestions: [
        "Lean into your strengths: deep thinking, careful observation, and genuine empathy",
        "Build energy management strategies — you may need more recharge time",
        "Understand that personality isn't destiny — traits shift with context and growth",
        "Our Understanding Personality Types course explores each dimension in depth",
      ],
    },
    {
      min: 46, max: 70,
      label: "Balanced & Adaptable",
      color: "green",
      interpretation:
        "Your personality shows a balanced mix across the five dimensions. You can adapt your style to different situations — social when needed, reflective when required. This flexibility is a real advantage.",
      suggestions: [
        "Your adaptability is a strength — use it intentionally, not just reactively",
        "Notice which traits emerge under stress vs comfort — that's revealing",
        "Explore which personality dimensions feel most 'like you' vs performed",
        "Consider how your balanced style affects your relationships and work",
      ],
    },
    {
      min: 71, max: 100,
      label: "Expressive & Engaged",
      color: "green",
      interpretation:
        "Your personality profile shows high engagement across multiple dimensions — you tend towards extraversion, agreeableness, conscientiousness, emotional stability, and openness. You're likely energetic, organized, and socially engaged.",
      suggestions: [
        "Your engagement with the world is energising — but watch for overextension",
        "High agreeableness is a strength, but ensure you're not people-pleasing",
        "Channel your openness into deliberate learning and creative projects",
        "Remember: understanding others' personality styles improves every relationship",
      ],
    },
  ],
};
