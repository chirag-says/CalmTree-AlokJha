import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { User, GraduationCap, Briefcase, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${SITE.founder} | Founder of ${SITE.name}` },
      {
        name: "description",
        content: `${SITE.founder}: MBA, Master's in Psychology, entrepreneur and psychology educator. On making psychology simple and useful.`,
      },
      { property: "og:title", content: `About ${SITE.founder} | ${SITE.name}` },
      {
        property: "og:description",
        content: `The story behind ${SITE.name} and Decode Your Mind.`,
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title={SITE.founder}
        description={`${SITE.founderTitle} On a mission to make the mind a little easier to understand.`}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 grid gap-12 md:grid-cols-[1fr_2fr] items-start">
        <img
          src="/founder.jpg"
          alt={SITE.founder}
          className="aspect-square rounded-3xl object-cover"
        />
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Psychology that meets real life.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {SITE.founder} is an entrepreneur and psychology educator. With an MBA and a Master's in
            Psychology, he brings together two worlds: the practical clarity of business and the
            depth of psychological insight.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            He founded {SITE.name} to make psychology simple, practical and useful in everyday life,
            not as therapy or medical advice, but as education that helps you understand yourself
            and the people around you.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                t: "Education",
                d: "MBA · Master's in Psychology",
              },
              {
                icon: Briefcase,
                t: "Background",
                d: "Entrepreneur & psychology educator",
              },
              {
                icon: Target,
                t: "Mission",
                d: "Make psychology simple, practical, and useful for everyday life.",
              },
              {
                icon: User,
                t: "Audience",
                d: "Curious learners, professionals, and self-discoverers. India and beyond.",
              },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card p-5">
                <b.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{b.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-3 flex-wrap">
            <Button asChild>
              <Link to="/decode-your-mind">Watch Decode Your Mind</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
