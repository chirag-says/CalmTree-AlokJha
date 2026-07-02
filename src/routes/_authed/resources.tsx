import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/_authed/resources")({
  head: () => ({
    meta: [
      { title: `Resources — ${SITE.name} Workbooks & Journals` },
      {
        name: "description",
        content:
          "Download practical psychology workbooks, journals and toolkits to reflect and grow.",
      },
      { property: "og:title", content: `${SITE.name} Resources` },
      {
        property: "og:description",
        content: "Workbooks, journals and toolkits for practical self-work.",
      },
    ],
  }),
  component: Page,
});

const items = [
  { t: "Burnout Recovery Workbook", d: "A 14-day guided workbook to rebuild energy and clarity." },
  {
    t: "Emotional Intelligence Workbook",
    d: "Prompts and exercises to grow self-awareness and empathy.",
  },
  {
    t: "Stress Management Toolkit",
    d: "Tools to reduce daily stress without overhauling your life.",
  },
  { t: "Self-Reflection Journal", d: "30 days of psychology-led prompts for honest self-inquiry." },
  { t: "Habit Tracker", d: "A simple, printable system to build habits that last." },
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Practical tools you'll actually use."
        description="Workbooks, journals and toolkits — designed to be simple, repeatable and rooted in psychology."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <article
              key={c.t}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-shadow"
            >
              <div className="h-32 rounded-xl bg-gradient-to-br from-accent/40 to-primary/15 flex items-center justify-center">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{c.d}</p>
              <Button className="mt-5" variant="secondary">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
