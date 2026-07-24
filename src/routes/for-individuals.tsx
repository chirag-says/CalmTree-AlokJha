/**
 * /for-individuals — Calmtree for Individuals.
 *
 * B2C marketing surface and companion to /for-organizations. Same editorial,
 * calm-premium visual language (warm cream ground, sage green, Fraunces
 * display serif, restrained motion) — this page just makes the case to a
 * person taking an assessment for themselves, not a company buying credits.
 *
 * "Get started" routes to /assessments, which needs no account for the free
 * (Discovery) tier — the same self-serve path the header CTA already uses.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  Lock,
  CheckCircle2,
  Sparkles,
  BarChart3,
  RefreshCw,
  Flame,
  Heart,
  HeartPulse,
  Briefcase,
  Award,
  Rocket,
  Smartphone,
  Compass,
  Users,
  Sun,
  User,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/SiteLayout";
import { SITE } from "@/data/constants";
import { ASSESSMENT_LIST } from "@/data/assessments";
import { getCategoryPrice } from "@/data/category-pricing";
import { ScoreGauge } from "@/components/assessment/ScoreGauge";
import { Reveal, Stagger, RevealItem, Float } from "@/components/org/marketing/motion-primitives";
import type { ProductCategory } from "@/data/assessments/types";

export const Route = createFileRoute("/for-individuals")({
  head: () => ({
    meta: [
      { title: `For Individuals | ${SITE.name}` },
      {
        name: "description",
        content:
          "Understand yourself with ten honest questions and an instant, plain-English result. Free to start, completely private, built on real psychology.",
      },
      { property: "og:title", content: `${SITE.name} for Individuals` },
    ],
  }),
  component: ForIndividuals,
});

/** Fraunces display face for numerals that aren't heading tags. */
const serif = { fontFamily: '"Fraunces", Georgia, serif' } as const;

const HERO_TRUST = ["100 assessments", "Completely private", "Free to start"];

const STEPS = [
  {
    n: "01",
    title: "Pick what's on your mind",
    body: "Browse 100 assessments across ten areas of life — stress, relationships, career, leadership, parenting and more.",
  },
  {
    n: "02",
    title: "Answer ten honest questions",
    body: "A few calm minutes, on any device. Nothing is scored against you — there's no right answer to game.",
  },
  {
    n: "03",
    title: "Get an instant, plain result",
    body: "A clear label, a short interpretation, and one practical next step. No 40-page report to decode alone.",
  },
];

const CATEGORY_META: { value: ProductCategory; label: string; icon: typeof User }[] = [
  { value: "Self-Awareness & Personality", label: "Self-Awareness", icon: User },
  { value: "Emotional Strength & Everyday Mind", label: "Emotional Strength", icon: HeartPulse },
  { value: "Relationships & Emotional Connection", label: "Relationships", icon: Heart },
  { value: "Workplace Effectiveness", label: "Workplace", icon: Briefcase },
  { value: "Leadership & Teams", label: "Leadership", icon: Award },
  { value: "Founders & Entrepreneurship", label: "Founders", icon: Rocket },
  { value: "Gen Z & Digital Life", label: "Gen Z & Digital Life", icon: Smartphone },
  { value: "Career Direction", label: "Career Direction", icon: Compass },
  { value: "Family & Parenting", label: "Family & Parenting", icon: Users },
  { value: "Life Transitions & Healthy Ageing", label: "Life Transitions", icon: Sun },
];

const CATEGORY_COUNTS = CATEGORY_META.map((c) => ({
  ...c,
  count: ASSESSMENT_LIST.filter((a) => a.meta.productCategory === c.value).length,
  price: getCategoryPrice(c.value),
}));

const PRICED_CATEGORIES = CATEGORY_COUNTS.filter(
  (c): c is typeof c & { price: number } => c.price !== null,
).sort((a, b) => a.price - b.price);

const FREE_EXAMPLES = ASSESSMENT_LIST.filter((a) => a.meta.isFree)
  .slice(0, 4)
  .map((a) => a.meta.title)
  .join(", ");

const FAQS = [
  {
    q: "Is this therapy or a clinical diagnosis?",
    a: `No. ${SITE.disclaimer} These are educational self-reflection tools designed to help you notice patterns — not a replacement for a therapist, doctor or counsellor. If something you read feels urgent, please talk to a qualified professional.`,
  },
  {
    q: "Who can see my results?",
    a: "Only you. Your answers and results live in your own private dashboard. We don't sell your data, and no one — including anyone at Calmtree — sees your individual responses without your say-so.",
  },
  {
    q: "What's actually free?",
    a: `Every Discovery-tier assessment is completely free, no card required — things like ${FREE_EXAMPLES}. The full dimension breakdown on deeper assessments unlocks by category (see pricing below) — you're never charged per assessment.`,
  },
  {
    q: "Can I retake an assessment?",
    a: "Yes — after 30 days, so you're comparing against a real gap in time rather than the same mood twice. Retakes are measured against your own earlier result, not anyone else's.",
  },
  {
    q: "How is this different from a personality quiz I'd find online?",
    a: "Every assessment is written by a founder with an MBA and a Master's in Psychology, uses a consistent ten-question scale, and ends with a next step you can actually act on — not just a label to screenshot.",
  },
  {
    q: "My employer sent me an assessment — is that different?",
    a: "If you received a Calmtree link through your workplace, your employer only ever sees aggregated, anonymised trends across your team — never your individual answers. Read more on our page for organizations.",
  },
];

function ForIndividuals() {
  return (
    <SiteLayout>
      <Hero />
      <HowItWorks />
      <FeatureBento />
      <PersonalInsight />
      <Privacy />
      <Categories />
      <Pricing />
      <Faq />
      <FinalCta />
    </SiteLayout>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-16 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* Left */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Applied Psychology for You
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-foreground sm:text-6xl md:text-[4rem]">
                Understand yourself,
                <span className="block text-primary">one honest answer at a time.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Ten quick questions. An instant, plain-English result. A next step you can actually
                use — today, not someday.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-12 rounded-full px-8 text-[15px]">
                  <Link to="/assessments">
                    Take a free assessment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border bg-card px-8 text-[15px]"
                >
                  <Link to="/academy">Explore the Academy</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-5 text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  Log in
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </p>
            </Reveal>
            <Reveal delay={0.34}>
              <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
                {HERO_TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary/70" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — a real result card, composed from the same components the
              product actually renders after you finish an assessment. */}
          <div className="min-w-0 lg:pl-2">
            <IndividualHeroComposition />
          </div>
        </div>
      </div>
    </section>
  );
}

/** A floating, art-directed preview of an actual Calmtree result screen. */
function IndividualHeroComposition() {
  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
      <div
        className="pointer-events-none absolute -inset-10 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 45%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 75%)",
        }}
        aria-hidden
      />

      {/* Small floating chip — recommended-for-you preview */}
      <Float depth={1.2} className="absolute -top-5 -left-4 z-10 hidden sm:block">
        <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_20px_45px_-30px_rgba(30,42,34,0.5)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-primary">
            Recommended
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Stress Level Check
          </p>
        </div>
      </Float>

      {/* Main result card */}
      <Reveal onMount y={18}>
        <div className="relative rounded-[28px] border border-border bg-card p-7 shadow-[0_30px_70px_-45px_rgba(30,42,34,0.5)] md:p-8">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Flame className="h-3.5 w-3.5" />
              Burnout Risk Check
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              Free
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            <ScoreGauge
              score={22}
              maxScore={50}
              percentage={30}
              label="Busy Balancer"
              color="yellow"
            />
          </div>

          <p className="mt-6 text-center text-sm leading-relaxed text-muted-foreground">
            Some signs of strain are present, especially during demanding periods — still manageable
            with a few deliberate adjustments.
          </p>

          <div className="mt-6 rounded-2xl bg-primary/[0.06] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Suggested next step
            </p>
            <p className="mt-1.5 text-[15px] text-foreground">
              Notice the two situations that raise your score most, and change one this week.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Small floating dimension chip */}
      <Float depth={1.6} delay={0.6} className="absolute -bottom-6 -right-3 z-10 hidden sm:block">
        <div className="w-44 rounded-2xl border border-border bg-card p-4 shadow-[0_20px_45px_-30px_rgba(30,42,34,0.5)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            Dimension breakdown
          </p>
          <div className="mt-3 space-y-2">
            {[
              { label: "Recovery", pct: 40 },
              { label: "Energy", pct: 65 },
              { label: "Detachment", pct: 30 },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{d.label}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-secondary/60">
                  <div
                    className="h-full rounded-full bg-primary/60"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Float>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS — editorial timeline
   ───────────────────────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">How it works</p>
        <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
          Three quiet steps, start to insight.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[32px] border border-border bg-border md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className="h-full">
            <div className="flex h-full flex-col bg-card p-8 md:p-10">
              <span style={serif} className="text-5xl text-primary/30 md:text-6xl">
                {s.n}
              </span>
              <h3 className="mt-6 text-xl text-foreground">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              {i < STEPS.length - 1 && (
                <ArrowDown className="mt-6 h-4 w-4 text-primary/40 md:hidden" />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURES — bento
   ───────────────────────────────────────────────────────────── */
function FeatureBento() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">What you get</p>
        <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
          A calm, private place to keep learning about yourself.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
        {/* Big — personal dashboard */}
        <RevealItem className="md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col rounded-[28px] border border-border bg-card p-8">
            <div className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                Your dashboard
              </span>
            </div>
            <h3 className="mt-4 max-w-md text-2xl text-foreground">
              Every result, kept in one private place.
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Track what you've taken, revisit past results, and get assessments recommended from
              the areas of life you told us matter most to you.
            </p>
          </div>
        </RevealItem>

        {/* Privacy chip */}
        <RevealItem>
          <div className="flex h-full flex-col justify-center rounded-[28px] border border-border bg-card p-8">
            <EyeOff className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg text-foreground">Nobody sees your answers</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Your results are visible only to you. We never sell your data or share individual
              responses with anyone.
            </p>
          </div>
        </RevealItem>

        {/* Retake */}
        <RevealItem className="md:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-[28px] border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="max-w-sm">
              <RefreshCw className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg text-foreground">Retake and compare</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every assessment can be retaken after 30 days — so you're measuring real change
                against your own baseline, not a stranger's average.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 sm:mt-0">
              <span style={serif} className="text-5xl text-primary/25" aria-hidden>
                30
              </span>
              <span className="text-sm text-muted-foreground">
                days between
                <br />
                retakes
              </span>
            </div>
          </div>
        </RevealItem>
      </Stagger>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PERSONAL INSIGHT — split
   ───────────────────────────────────────────────────────────── */
function PersonalInsight() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:py-32 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            More than a score
          </p>
          <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
            A result you can actually act on.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Every assessment ends the same way: a clear label for where you are, a breakdown of the
            sub-areas behind that number, and one concrete thing to try next — never just a score
            with no explanation.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "An archetype label in plain language, not a jargon score",
              "A dimension breakdown showing what's driving the result",
              "One practical next step, sized for this week",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12} y={28}>
          <div className="rounded-[28px] border border-border bg-card p-7 shadow-[0_30px_70px_-45px_rgba(30,42,34,0.5)] md:p-8">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Your result
              </span>
              <span className="text-xs text-muted-foreground">Sample · Confidence Quotient</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span style={serif} className="text-5xl text-foreground">
                38<span className="text-2xl text-muted-foreground">/50</span>
              </span>
              <span className="text-sm text-muted-foreground">
                Steady Performer
                <br />a generally steady level of confidence
              </span>
            </div>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Strongest dimensions
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Self-trust", "Resilience", "Growth belief"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-primary/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Suggested next step
              </p>
              <p className="mt-1.5 text-[15px] text-foreground">
                Strengthen your lowest dimension while continuing to use your existing strengths.
              </p>
            </div>

            <Button asChild className="mt-6 w-full rounded-full" size="lg">
              <Link to="/assessments">
                Take this assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRIVACY — the differentiator
   ───────────────────────────────────────────────────────────── */
function Privacy() {
  const points = [
    {
      title: "Private by default",
      body: "Your answers and results live in your account alone. There's no setting to change to make that true.",
    },
    {
      title: "Never sold",
      body: "Your responses are used only to give you your own results. We don't sell data to advertisers or anyone else.",
    },
    {
      title: "Educational, not clinical",
      body: SITE.disclaimer + " Nothing here is a diagnosis.",
    },
    {
      title: "Yours to revisit",
      body: "Come back anytime to reread past results, retake after 30 days, or pick up where you left off.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] border border-border bg-card px-6 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-7 w-7" />
            </span>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Privacy first, always
            </p>
            <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
              Built so you can answer honestly.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              An honest answer only happens when you trust where it's going. So we made privacy the
              default — not a setting you have to go find.
            </p>
          </div>

          <div className="relative mx-auto mt-14 grid max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.title} className="flex gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="text-base text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CATEGORIES — ten areas of life
   ───────────────────────────────────────────────────────────── */
function Categories() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {ASSESSMENT_LIST.length} assessments, ten areas of life
          </p>
          <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
            Whatever's on your mind, there's a place to start.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORY_COUNTS.map((c) => (
            <RevealItem key={c.value}>
              <Link
                to="/assessments"
                search={{ category: c.value }}
                className="group flex h-full flex-col rounded-[24px] border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-medium text-foreground group-hover:text-primary">
                  {c.label}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.count} assessments · {c.price !== null ? `From ₹${c.price}` : "Free"}
                </p>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRICING — buy a whole category at once, not per assessment
   ───────────────────────────────────────────────────────────── */
function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Pricing</p>
        <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
          Free to start. One price per category after that.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          No per-assessment charges, no subscription. One purchase unlocks every deeper assessment
          in a category — current and future — for as long as you have access.
        </p>
      </Reveal>

      <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRICED_CATEGORIES.map((c) => (
          <RevealItem key={c.value}>
            <div className="flex h-full flex-col rounded-[24px] border border-border bg-card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-[15px] font-medium text-foreground">{c.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} assessments</p>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span style={serif} className="text-3xl text-foreground">
                  ₹{c.price}
                </span>
                <span className="text-xs text-muted-foreground">one-time, whole category</span>
              </div>
              <Button asChild variant="outline" className="mt-5 rounded-full border-border bg-card">
                <Link to="/assessments" search={{ category: c.value }}>
                  Browse category
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </RevealItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Gen Z & Digital Life is entirely free — nothing to unlock. Secure checkout via Razorpay.
          Sending assessments to a whole team instead?{" "}
          <Link to="/for-organizations" className="text-primary underline-offset-4 hover:underline">
            See Calmtree for organizations
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────────────── */
function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 md:py-32">
      <Reveal className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Questions</p>
        <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
          Everything a careful reader asks.
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <Accordion type="single" collapsible className="mt-12 w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-28">
      <Reveal>
        <div
          className="relative overflow-hidden rounded-[40px] border border-border px-6 py-20 text-center md:py-28"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-4xl tracking-[-0.015em] text-foreground md:text-6xl">
              Ready to understand yourself better?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Pick an assessment, answer honestly, and get a result you can use — free to start, no
              account required for the first one.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-12 rounded-full px-8 text-[15px]">
                <Link to="/assessments">
                  Take a free assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-card px-8 text-[15px]"
              >
                <Link to="/academy">Explore the Academy</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
