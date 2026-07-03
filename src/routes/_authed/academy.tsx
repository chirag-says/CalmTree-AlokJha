import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { Clock, GraduationCap, BookOpen } from "lucide-react";

export const Route = createFileRoute("/_authed/academy")({
  head: () => ({
    meta: [
      { title: `${SITE.name} Academy | Micro & Certificate Courses` },
      {
        name: "description",
        content: "Short, practical psychology courses. Build real understanding at your pace.",
      },
      { property: "og:title", content: `${SITE.name} Academy` },
      {
        property: "og:description",
        content: "Micro courses and certificate courses in practical psychology.",
      },
    ],
  }),
  component: Page,
});

const micro = [
  {
    t: "Burnout Recovery Micro Course",
    d: "Reset your energy and focus in 7 short lessons.",
    time: "7 lessons · 90 min",
  },
  {
    t: "Stop Overthinking Micro Course",
    d: "Calm the inner loop with simple CBT-based tools.",
    time: "5 lessons · 60 min",
  },
  {
    t: "Emotional Intelligence Fundamentals",
    d: "Self-awareness, empathy and emotional regulation, made practical.",
    time: "6 lessons · 75 min",
  },
  {
    t: "Psychology of Habits",
    d: "How habits form, break, and stick. Without the willpower myth.",
    time: "6 lessons · 80 min",
  },
  {
    t: "Understanding Personality Types",
    d: "Know your style. Work better with everyone else.",
    time: "5 lessons · 70 min",
  },
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`${SITE.name} Academy`}
        title="Short courses. Real psychology. No fluff."
        description="Micro courses and certificate programs designed for busy people who want practical understanding, not jargon."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Micro courses</h2>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Self-paced · Lifetime access
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {micro.map((c) => (
            <article
              key={c.t}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-primary font-medium">
                  Micro course
                </span>
                <BookOpen className="h-5 w-5 text-primary/70" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{c.d}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {c.time}
                </span>
                <Button size="sm" variant="outline">
                  Enroll
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-3xl border border-primary/15 bg-primary/[0.06] p-8 md:p-12">
          <div className="flex items-center gap-2 text-primary text-xs font-medium tracking-[0.18em] uppercase">
            <GraduationCap className="h-4 w-4" /> Certificate courses
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold max-w-2xl">
            Deeper programs. Coming soon.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Multi-week certificate courses in applied psychology, for self-growth and for
            professionals who want to understand people better.
          </p>
          <Button asChild className="mt-6">
            <Link to="/contact">Get notified</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
