import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/_authed/academy")({
  head: () => ({
    meta: [
      { title: `${SITE.name} Academy | Coming Soon` },
      {
        name: "description",
        content: "Short, practical psychology courses — coming soon.",
      },
      { property: "og:title", content: `${SITE.name} Academy` },
      {
        property: "og:description",
        content: "Practical psychology courses, coming soon.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow={`${SITE.name} Academy`}
        title="Short courses. Real psychology. No fluff."
        description="Micro courses and certificate programs designed for busy people who want practical understanding, not jargon."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl border border-primary/15 bg-primary/[0.06] p-8 md:p-12">
          <div className="flex items-center gap-2 text-primary text-xs font-medium tracking-[0.18em] uppercase">
            <GraduationCap className="h-4 w-4" /> Coming soon
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold max-w-2xl">
            Courses are on the way.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Micro courses and multi-week certificate programs in applied psychology, for self-growth
            and for professionals who want to understand people better.
          </p>
          <Button asChild className="mt-6">
            <Link to="/contact">Get notified</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
