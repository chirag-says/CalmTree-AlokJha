import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { ASSESSMENT_LIST } from "@/data/assessments";
import {
  Flame,
  Brain,
  Heart,
  ClipboardCheck,
  User,
  Sparkles,
  Timer,
  Lock,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/assessments/")({
  head: () => ({
    meta: [
      { title: `Psychology Assessments — ${SITE.name}` },
      {
        name: "description",
        content:
          "Free, private psychology self-checks: burnout, stress, emotional intelligence, personality style, self-esteem.",
      },
      {
        property: "og:title",
        content: `Psychology Assessments — ${SITE.name}`,
      },
      {
        property: "og:description",
        content: "Quick self-checks to understand where you are today.",
      },
    ],
  }),
  component: Page,
});

const ICON_MAP = {
  flame: Flame,
  brain: Brain,
  heart: Heart,
  "clipboard-check": ClipboardCheck,
  user: User,
  sparkles: Sparkles,
} as const;

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Assessments"
        title="Self-checks for self-awareness."
        description="These assessments are educational tools — not diagnoses. Use them to reflect, learn and choose what to work on next."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ASSESSMENT_LIST.map((a) => {
            const Icon = ICON_MAP[a.meta.icon] ?? ClipboardCheck;
            return (
              <article
                key={a.slug}
                className="rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-shadow"
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{a.meta.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">
                  {a.meta.description}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Timer className="h-3.5 w-3.5" />
                    {a.meta.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    Private
                  </span>
                </div>
                <Button asChild className="mt-5">
                  <Link to="/assessments/$slug" params={{ slug: a.slug }}>
                    Start assessment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>

        <p className="mt-12 text-sm text-muted-foreground max-w-2xl">
          Note: {SITE.name} assessments are for psychology education and
          self-reflection only. They are not a substitute for clinical
          evaluation, diagnosis or counselling.
        </p>
      </section>
    </SiteLayout>
  );
}
