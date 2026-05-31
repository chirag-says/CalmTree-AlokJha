import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SITE } from "@/data/constants";
import { SOCIAL } from "@/data/social";
import {
  Youtube,
  Instagram,
  Play,
  Brain,
  HeartPulse,
  Users,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/decode-your-mind")({
  head: () => ({
    meta: [
      { title: `Decode Your Mind — by ${SITE.name}` },
      {
        name: "description",
        content: `The media channel by ${SITE.name}. YouTube videos and Instagram reels on psychology, behaviour and mental wellness.`,
      },
      { property: "og:title", content: `Decode Your Mind by ${SITE.name}` },
      {
        property: "og:description",
        content:
          "Psychology concepts, human behaviour and personality education — simply explained.",
      },
    ],
  }),
  component: Page,
});

/**
 * Video data — replace these with real YouTube video IDs from Alok's channel.
 * Format: { id: "dQw4w9WgXcQ", title: "Video Title" }
 *
 * TODO: Replace placeholder IDs with Alok's actual videos once channel is live.
 */
const videos: { id: string; title: string }[] = [
  // Placeholder entries — will be replaced with real video IDs
  { id: "", title: "Why your brain loves overthinking" },
  { id: "", title: "Burnout vs stress — the real difference" },
  { id: "", title: "How emotional intelligence is built" },
  { id: "", title: "The psychology of habits that stick" },
  { id: "", title: "Understanding personality types" },
  { id: "", title: "What boundaries actually mean" },
];

const topics = [
  {
    icon: Brain,
    title: "Psychology Concepts",
    body: "Bite-sized lessons that turn theory into clarity.",
  },
  {
    icon: Users,
    title: "Human Behaviour",
    body: "Why we do what we do — in work, love and life.",
  },
  {
    icon: HeartPulse,
    title: "Mental Wellness",
    body: "Calm, sustainable practices for everyday life.",
  },
  {
    icon: Sparkles,
    title: "Personality Education",
    body: "Know your style. Understand others. Communicate better.",
  },
];

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={`The channel by ${SITE.name}`}
        title="Decode Your Mind."
        description="Practical psychology on YouTube and Instagram — short, honest, useful."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="h-12 px-5" asChild>
            <a
              href={SOCIAL.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-4 w-4" />
              Subscribe on YouTube
            </a>
          </Button>
          <Button size="lg" variant="secondary" className="h-12 px-5" asChild>
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Latest videos
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {videos.map((v) => (
            <article
              key={v.title}
              className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition-shadow"
            >
              {v.id ? (
                <YouTubeEmbed videoId={v.id} title={v.title} />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/15 to-accent/40 flex items-center justify-center">
                  <Play className="h-10 w-10 text-primary" />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Decode Your Mind
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          From Instagram
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <a
              key={i}
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-[9/16] rounded-2xl bg-gradient-to-br from-accent/40 to-primary/20 border border-border flex items-center justify-center hover:border-primary/30 transition-colors"
            >
              <Instagram className="h-7 w-7 text-primary" />
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          What we cover
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <t.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}