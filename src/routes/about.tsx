import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import {
  type LucideIcon,
  User,
  GraduationCap,
  Briefcase,
  Target,
  Code2,
  Sparkles,
} from "lucide-react";

/**
 * Co-founder + engineer, rendered as hierarchical editorial blocks below the
 * founder. The co-founder gets the same weight as the founder (full bio + four
 * detail cards); the engineer is a lighter, compact block. Alok's founder block
 * is authored inline and left untouched.
 * TODO(chirag): replace the placeholder bios/details below with real copy.
 */
interface InfoCard {
  icon: LucideIcon;
  t: string;
  d: string;
}

interface Person {
  name: string;
  role: string;
  img: string;
  heading: string;
  paragraphs: string[];
  cards: InfoCard[];
}

const APURV: Person = {
  name: "Apurv Jha",
  role: "Co-founder",
  img: "/apurv.jpg",
  heading: "Turning psychology into something people use.",
  paragraphs: [
    "Apurv Jha co-founded Calmtree to close the gap between serious psychology and everyday usefulness, shaping what the platform teaches and how it reaches people.",
    "He works across product and content, keeping every assessment and course practical, honest, and grounded in real psychological insight.",
  ],
  cards: [
    { icon: Briefcase, t: "Role", d: "Co-founder of Calmtree" },
    { icon: Target, t: "Focus", d: "Product, content, and growth" },
    { icon: GraduationCap, t: "Background", d: "Psychology & product" },
    { icon: Sparkles, t: "Mission", d: "Make self-understanding practical for everyone." },
  ],
};

const CHIRAG: Person = {
  name: "Chirag",
  role: "Engineer",
  img: "/chirag.png",
  heading: "The engineering behind Calmtree.",
  paragraphs: [
    "Chirag builds and maintains the Calmtree platform, from the assessment engine to the enterprise tooling that powers it.",
  ],
  cards: [
    { icon: Code2, t: "Role", d: "Engineering & platform" },
    { icon: Target, t: "Focus", d: "Reliability, security, and speed" },
  ],
};

/**
 * Editorial person block. `imageSide` alternates the photo left/right for
 * rhythm; `compact` shrinks the photo, heading, and detail set for lower-ranked
 * members so the visual weight follows the hierarchy.
 */
function PersonSection({
  person,
  imageSide = "left",
  compact = false,
}: {
  person: Person;
  imageSide?: "left" | "right";
  compact?: boolean;
}) {
  // Fixed square (not w-full) so the photo size is stable across devices,
  // independent of its source resolution or the grid column width. Larger for
  // the full block, smaller for the compact one, to reflect hierarchy.
  const photo = (
    <img
      src={person.img}
      alt={person.name}
      className={`${compact ? "w-44" : "w-56"} max-w-full aspect-square rounded-3xl object-cover border border-border/60 shadow-sm ${
        imageSide === "right" ? "md:order-last" : ""
      }`}
    />
  );
  const body = (
    <div>
      <p
        className={`font-serif font-semibold text-primary tracking-tight mb-2 ${
          compact ? "text-lg" : "text-xl md:text-2xl"
        }`}
      >
        {person.role}
      </p>
      <h2
        className={`font-semibold tracking-tight ${
          compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
        }`}
      >
        {person.heading}
      </h2>
      {person.paragraphs.map((p, i) => (
        <p
          key={`${person.name}-${i}`}
          className={`text-muted-foreground ${compact ? "text-base" : "text-lg"} ${
            i === 0 ? (compact ? "mt-4" : "mt-5") : "mt-4"
          }`}
        >
          {p}
        </p>
      ))}
      {person.cards.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {person.cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-5">
              <c.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  // Photo track hugs the fixed-width image (auto); body takes the rest (1fr).
  const cols =
    imageSide === "right" ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[auto_1fr]";
  return (
    <div className={`grid gap-10 md:gap-12 items-start ${cols}`}>
      {/* Photo is always first in the DOM so mobile stacks it on top; on desktop
          md:order-last moves it to the right column for the "right" variant. */}
      {photo}
      {body}
    </div>
  );
}

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
          <p className="font-serif font-semibold text-primary tracking-tight mb-2 text-xl md:text-2xl">
            CEO &amp; Founder
          </p>
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

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Meet the Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The people building {SITE.name} alongside {SITE.founder}.
            </p>
          </div>

          <div className="mt-14 md:mt-16 space-y-16 md:space-y-20">
            <PersonSection person={APURV} imageSide="right" />
            <div className="border-t border-border/60 pt-16 md:pt-20">
              <PersonSection person={CHIRAG} imageSide="left" compact />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
