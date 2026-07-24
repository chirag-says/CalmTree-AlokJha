/**
 * Blog registry — single source of truth for posts. Content is stored as typed
 * blocks (not markdown) so it renders with zero runtime dependencies and stays
 * fully type-checked. Add a post here and it appears on /blog + /blog/$slug and
 * in the sitemap helper below.
 *
 * When the blog outgrows a static file, this shape maps cleanly onto a CMS or a
 * Supabase table: the block array becomes a JSON column, the rest are columns.
 */
import type { LucideIcon } from "lucide-react";
import { Compass, Waves, HeartHandshake } from "lucide-react";

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string; // ISO date
  icon: LucideIcon;
  /** Tailwind gradient classes (token-based, so covers adapt to light/dark). */
  cover: string;
  /** Path to the blog cover image (served from /public). */
  image?: string;
  content: Block[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "self-awareness-is-a-skill",
    title: "Self-Awareness Is a Skill You Can Build",
    excerpt:
      "Self-awareness is not a fixed trait you are born with or without. It is a set of habits, and small changes compound.",
    category: "Self-Awareness",
    author: "Alok Jha",
    publishedAt: "2026-07-10",
    icon: Compass,
    cover: "from-primary/15 via-secondary to-card",
    image: "/blog-self-awareness.png",
    content: [
      {
        type: "p",
        text: "Most people treat self-awareness as something you either have or you don't. That framing is comforting, because it lets you off the hook. In practice, self-awareness behaves like any other skill: it responds to attention and repetition, and it fades when you stop using it.",
      },
      { type: "h2", text: "What self-awareness actually means" },
      {
        type: "p",
        text: "It is the ability to notice what you are doing while you are doing it, and to see the gap between what you intended and what actually happened. Not judgment, not analysis after the fact. Noticing, in the moment, with enough distance to choose your next move.",
      },
      { type: "h2", text: "Why it feels harder than it should" },
      {
        type: "p",
        text: "Your mind runs most of the day on autopilot, and that is by design. Habits save energy. The cost is that the patterns you most want to change are the ones running quietest in the background, below the level where you would normally catch them.",
      },
      {
        type: "ul",
        items: [
          "You react before you notice you are reacting.",
          "The story you tell about why you did something arrives after the fact, and it is usually flattering.",
          "Strong emotion narrows attention, which is exactly when awareness would help most.",
        ],
      },
      { type: "h2", text: "Three practices that build it" },
      {
        type: "p",
        text: "Name the feeling before you act on it. A single word, said to yourself, creates a small gap between the feeling and the response. That gap is where choice lives.",
      },
      {
        type: "p",
        text: "Review one moment a day. Pick a single interaction and ask what you felt, what you assumed, and what you would do differently. One moment, not the whole day. The point is repetition, not depth.",
      },
      {
        type: "p",
        text: "Ask for one piece of outside input. Other people see the patterns you are blind to. You do not need a lot of feedback, you need it to be specific and regular.",
      },
      {
        type: "quote",
        text: "You cannot change what you cannot see. Awareness is not the whole job, but nothing useful happens before it.",
      },
      { type: "h2", text: "Start small" },
      {
        type: "p",
        text: "If you try to observe everything at once, you will observe nothing. Pick one situation that repeats, a meeting that frustrates you, a conversation at home that goes sideways, and pay attention to just that. Skill grows where attention is narrow and steady.",
      },
    ],
  },
  {
    slug: "how-your-mind-handles-stress",
    title: "How Your Mind Handles Stress",
    excerpt:
      "Stress is not the enemy. It is your mind preparing you to act. The trouble starts when the signal never switches off.",
    category: "Emotional Wellness",
    author: "Alok Jha",
    publishedAt: "2026-06-22",
    icon: Waves,
    cover: "from-accent/40 via-secondary to-card",
    image: "/blog-stress.png",
    content: [
      {
        type: "p",
        text: "Stress has a bad reputation it only half deserves. In short bursts it sharpens focus, speeds up your reactions, and gets you moving. It becomes a problem when the response stays switched on long after the situation that triggered it has passed.",
      },
      { type: "h2", text: "What is actually happening" },
      {
        type: "p",
        text: "Your body reads a demand, a deadline, a difficult conversation, a bill, and prepares you to meet it. Heart rate rises, attention narrows, energy is released. This is useful for a short, sharp challenge. It is costly when the challenge is slow and never resolves.",
      },
      { type: "h2", text: "The difference that matters" },
      {
        type: "p",
        text: "Acute stress has a beginning and an end. You face the thing, it passes, your body settles. Chronic stress has no clear end, so the settling never comes. The signal that was meant to protect you starts to wear you down instead.",
      },
      {
        type: "ul",
        items: [
          "Sleep gets lighter, which lowers your tolerance the next day.",
          "Small problems start to feel like large ones.",
          "You reach for quick relief that costs you later.",
        ],
      },
      { type: "h2", text: "What helps" },
      {
        type: "p",
        text: "Give the response an ending. A short walk, slow breathing, or a few minutes away from the screen tells your body the demand has been handled. You are not avoiding the problem, you are closing the loop the stress response left open.",
      },
      {
        type: "p",
        text: "Separate what you can act on from what you cannot. Chronic stress often comes from carrying both at once. Write down the one action you can take today, and set the rest down until it becomes actionable.",
      },
      {
        type: "quote",
        text: "Stress is a messenger, not a verdict. The goal is not to silence it, but to hear it and then let it rest.",
      },
      { type: "h2", text: "When to take it seriously" },
      {
        type: "p",
        text: "If the pressure has not eased for weeks, if it is changing how you sleep, eat, or treat the people close to you, that is a signal worth acting on. This is education, not medical advice, and persistent stress is worth talking through with a professional.",
      },
    ],
  },
  {
    slug: "understanding-emotions-without-judging-them",
    title: "Understanding Your Emotions Without Judging Them",
    excerpt:
      "Naming what you feel changes how it feels. A shift from reacting to noticing gives you room to choose.",
    category: "Emotions",
    author: "Alok Jha",
    publishedAt: "2026-06-05",
    icon: HeartHandshake,
    cover: "from-secondary via-card to-primary/10",
    image: "/blog-emotions.png",
    content: [
      {
        type: "p",
        text: "Many of us learn early that some feelings are acceptable and others are not. So we push the unwanted ones down, argue with them, or pretend they are not there. The feeling rarely leaves. It just goes quiet and waits.",
      },
      { type: "h2", text: "Emotions are information" },
      {
        type: "p",
        text: "A feeling is a signal about what matters to you. Anger often points to a boundary that was crossed. Anxiety points to something you care about and cannot yet control. The signal is not the problem. How you read it and what you do next is where things go well or badly.",
      },
      { type: "h2", text: "The cost of judging them" },
      {
        type: "p",
        text: "When you label a feeling as wrong, you add a second layer on top of it: frustration at yourself for feeling it. Now you are managing two things instead of one, and the second is usually harder than the first.",
      },
      { type: "h2", text: "Naming lowers the volume" },
      {
        type: "p",
        text: "Putting a feeling into words gives you a small amount of distance from it. You move from being inside the emotion to observing it. That shift, from being angry to noticing that you feel angry, is what makes a considered response possible.",
      },
      {
        type: "ul",
        items: [
          "Name it plainly: I feel anxious, I feel let down, I feel relieved.",
          "Locate it: notice where it sits in the body and how strong it is.",
          "Ask what it is pointing at, without deciding yet what to do.",
        ],
      },
      {
        type: "quote",
        text: "You do not have to agree with a feeling to listen to it. Listening is what lets it move on.",
      },
      { type: "h2", text: "A gentler default" },
      {
        type: "p",
        text: "Try treating your emotions the way you would treat a friend who is upset. You would not tell them they are wrong to feel it. You would ask what happened. Turning that same attention inward is not indulgent, it is how feelings get understood instead of buried.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Posts newest-first, for the index listing. */
export function sortedPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/** Rough reading time from the post's text blocks (~200 words/min, min 1). */
export function readingMinutes(post: BlogPost): number {
  const words = post.content.reduce((sum, b) => {
    if (b.type === "p" || b.type === "h2") return sum + b.text.split(/\s+/).length;
    if (b.type === "quote") return sum + b.text.split(/\s+/).length;
    if (b.type === "ul") return sum + b.items.join(" ").split(/\s+/).length;
    return sum;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
