/**
 * /for-organizations — Calmtree for Organizations.
 *
 * B2B marketing surface and entry point into the org funnel. "Get started"
 * routes to /org, whose auth guard handles login and whose empty state offers
 * self-serve org creation → buy credits → send.
 *
 * Design: an editorial, calm, premium page that evolves Calmtree's existing
 * identity (warm cream ground, sage green, Fraunces display serif). Motion is
 * restrained and breathing — see components/org/marketing/motion-primitives.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  Lock,
  Mail,
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Users,
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
import { CREDIT_PACKS, perCreditInr } from "@/data/credit-packs";
import { HeroComposition } from "@/components/org/marketing/HeroComposition";
import { Reveal, Stagger, RevealItem, Counter } from "@/components/org/marketing/motion-primitives";

export const Route = createFileRoute("/for-organizations")({
  head: () => ({
    meta: [
      { title: `For Organizations | ${SITE.name}` },
      {
        name: "description",
        content:
          "Understand your team's wellbeing without crossing the line. Send Calmtree psychology assessments by email and see aggregated, anonymised insights — never individual answers.",
      },
      { property: "og:title", content: `${SITE.name} for Organizations` },
    ],
  }),
  component: ForOrganizations,
});

/** Fraunces display face for numerals that aren't heading tags. */
const serif = { fontFamily: '"Fraunces", Georgia, serif' } as const;

const HERO_TRUST = ["Private", "Anonymous", "Enterprise-ready"];

const STEPS = [
  {
    n: "01",
    title: "Create an assessment",
    body: "Choose from Calmtree's library of psychology assessments — from workplace wellbeing to leadership and team health.",
  },
  {
    n: "02",
    title: "Invite your employees",
    body: "Paste employee emails and launch. Each person receives a private link — no account, no password, a few quiet minutes on any device.",
  },
  {
    n: "03",
    title: "Understand the results",
    body: "Watch completion in real time and read results aggregated by team. You see the shape of your organisation, never a single person's answers.",
  },
];

const ASSESSMENT_FLOW = [
  { icon: Mail, label: "Assessment email", sub: "A private, personal invite" },
  { icon: ClipboardCheck, label: "Questionnaire", sub: "Calm, a few minutes" },
  { icon: CheckCircle2, label: "Completion", sub: "Anonymous by default" },
  { icon: Sparkles, label: "AI analysis", sub: "Patterns, not people" },
  { icon: BarChart3, label: "Org dashboard", sub: "Trends by team" },
];

const FAQS = [
  {
    q: "Can employees actually trust this?",
    a: "Yes — and that's the point. Results are aggregated by default. Employers only ever see group trends, and a minimum group size means small teams can't be reverse-engineered into individuals. No manager sees a single person's answers.",
  },
  {
    q: "Do employees need to create an account?",
    a: "No. Each employee receives a private magic link by email — no sign-up, no password. It takes a few minutes on any device. They can optionally claim a free personal Calmtree account afterwards, entirely their choice.",
  },
  {
    q: "What assessments are available?",
    a: "The full Calmtree library — assessments spanning workplace wellbeing, stress and burnout, leadership, team health, and more. The same instruments used across the Calmtree platform.",
  },
  {
    q: "How does pricing work?",
    a: "You buy credits, and one credit sends one assessment to one employee. No subscription. Unused credits from a closed campaign are refunded to your balance. Need volume or invoice billing? Talk to us.",
  },
  {
    q: "Is our data secure?",
    a: "Responses are stored securely and used only to produce your organisation's aggregated insights. We don't sell data, and individual answers are never exposed to employers unless you explicitly unlock individual results — a separate, deliberate step.",
  },
];

function ForOrganizations() {
  return (
    <SiteLayout>
      <Hero />
      <HowItWorks />
      <FeatureBento />
      <AiInsights />
      <Privacy />
      <AssessmentWalkthrough />
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
      {/* soft top wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-16 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.12fr] lg:gap-8">
          {/* Left */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Enterprise Psychology Platform
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[2.6rem] leading-[1.04] tracking-[-0.02em] text-foreground sm:text-6xl md:text-[4rem]">
                Understand your team's wellbeing
                <span className="block text-primary">without crossing the line.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Send Calmtree psychology assessments to your people by email. You get honest,
                aggregated insight. They get privacy, and a calm, genuinely useful experience.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-12 rounded-full px-8 text-[15px]">
                  <Link to="/org">
                    Start assessment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border bg-card px-8 text-[15px]"
                >
                  <Link to="/contact">Book a demo</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-5 text-sm text-muted-foreground">
                Already have an organization?{" "}
                <Link
                  to="/org"
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

          {/* Right — floating product composition. It runs its own on-load
              motion (a hero animates on mount, not on scroll), so no Reveal
              wrapper here. min-w-0 lets this grid cell shrink to the track
              instead of the device forcing an overflow. */}
          <div className="min-w-0 lg:pl-2">
            <HeroComposition />
          </div>
        </div>
      </div>
    </section>
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
          Enterprise intelligence, without the surveillance.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
        {/* Big — aggregated dashboard */}
        <RevealItem className="md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col rounded-[28px] border border-border bg-card p-8">
            <div className="flex items-center gap-2 text-primary">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                Aggregate dashboard
              </span>
            </div>
            <h3 className="mt-4 max-w-md text-2xl text-foreground">
              See the shape of your organisation at a glance.
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Wellbeing, stress and engagement trends by team and over time — clear enough to act
              on, private enough to trust.
            </p>
          </div>
        </RevealItem>

        {/* Privacy chip */}
        <RevealItem>
          <div className="flex h-full flex-col justify-center rounded-[28px] border border-border bg-card p-8">
            <EyeOff className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg text-foreground">No individual monitoring</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A minimum group size protects every response. There is no manager view of a single
              person.
            </p>
          </div>
        </RevealItem>

        {/* Frictionless */}
        <RevealItem className="md:col-span-2">
          <div className="flex h-full flex-col justify-center rounded-[28px] border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="max-w-sm">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg text-foreground">Frictionless for employees</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A private magic link — no sign-up, no password. A few calm minutes on any device.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 sm:mt-0">
              {[
                "/team-avatar-1.png",
                "/team-avatar-2.png",
                "/team-avatar-3.png",
                "/team-avatar-4.png",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Team member ${i + 1}`}
                  className="h-10 w-10 rounded-full border-2 border-card object-cover"
                  style={{ marginLeft: i === 0 ? 0 : -14 }}
                  loading="lazy"
                />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">+ your team</span>
            </div>
          </div>
        </RevealItem>
      </Stagger>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   AI INSIGHTS — split
   ───────────────────────────────────────────────────────────── */
function AiInsights() {
  return (
    <section className="border-y border-border/60 bg-secondary/30">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:py-32 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">AI insights</p>
          <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
            From raw responses to a clear next step.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Calmtree reads the patterns across a team's responses and surfaces what's changing, why
            it might be changing, and what a caring organisation could do about it — always at the
            group level.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Detects meaningful shifts, not noise",
              "Suggests practical next steps for your team",
              "Explains the likely drivers in plain language",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Recommendation card */}
        <Reveal delay={0.12} y={28}>
          <div className="rounded-[28px] border border-border bg-card p-7 shadow-[0_30px_70px_-45px_rgba(30,42,34,0.5)] md:p-8">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Recommendation
              </span>
              <span className="text-xs text-muted-foreground">Sample · Marketing team</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span style={serif} className="text-5xl text-foreground">
                <Counter to={18} suffix="%" />
              </span>
              <span className="text-sm text-muted-foreground">
                increase in reported stress
                <br />
                over the last quarter
              </span>
            </div>

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Likely drivers
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["High workload", "Deadline pressure", "Low recovery time"].map((c) => (
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
                Suggested action
              </p>
              <p className="mt-1.5 text-[15px] text-foreground">
                Launch a burnout-prevention check-in for the team.
              </p>
            </div>

            <Button className="mt-6 w-full rounded-full" size="lg">
              View recommendation
              <ArrowRight className="h-4 w-4" />
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
      title: "Anonymous by default",
      body: "Every response is anonymous unless your organisation deliberately chooses otherwise.",
    },
    {
      title: "Only group insights",
      body: "Employers see trends by team. A minimum group size makes individuals un-identifiable.",
    },
    {
      title: "No individual monitoring",
      body: "There is no dashboard that shows one person's answers. That view simply doesn't exist.",
    },
    {
      title: "Enterprise trust",
      body: "Data is stored securely, never sold, and used only to build your aggregate insights.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] border border-border bg-card px-6 py-16 md:px-16 md:py-20">
          {/* soft radial */}
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
              Built so employees can answer honestly.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Trust is the whole product. If people don't feel safe, the data isn't real. So we made
              privacy the default — not a setting.
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
   ASSESSMENT WALKTHROUGH
   ───────────────────────────────────────────────────────────── */
function AssessmentWalkthrough() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            The employee experience
          </p>
          <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
            Calm from the first email to the final insight.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {ASSESSMENT_FLOW.map((step, i) => (
            <RevealItem key={step.label} className="h-full">
              <div className="relative flex h-full flex-col rounded-[24px] border border-border bg-card p-6">
                <span style={serif} className="text-sm text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-medium text-foreground">{step.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.sub}</p>
                {i < ASSESSMENT_FLOW.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/30 lg:block" />
                )}
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PRICING
   ───────────────────────────────────────────────────────────── */
function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Pricing</p>
        <h2 className="mt-4 text-3xl tracking-[-0.01em] text-foreground md:text-5xl">
          Buy credits as you need them.
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          One credit sends one assessment to one employee. No subscription. Unused credits from a
          closed campaign return to your balance.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 md:grid-cols-3 md:items-center">
        {CREDIT_PACKS.map((pack) => {
          const featured = pack.popular;
          return (
            <Reveal key={pack.id} delay={featured ? 0.06 : 0} y={featured ? 20 : 28}>
              <div
                className={
                  "relative flex flex-col rounded-[28px] border p-8 " +
                  (featured
                    ? "border-primary/30 bg-card shadow-[0_40px_90px_-50px_rgba(30,42,34,0.5)] md:scale-[1.04]"
                    : "border-border bg-card/70")
                }
              >
                {featured && (
                  <span className="absolute -top-3 left-8 inline-flex items-center rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
                <p className="text-sm font-medium text-muted-foreground">{pack.label}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span style={serif} className="text-5xl text-foreground">
                    {pack.credits}
                  </span>
                  <span className="text-sm text-muted-foreground">credits</span>
                </div>
                <p className="mt-3 text-lg text-foreground">
                  ₹{pack.priceInr.toLocaleString()}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ₹{perCreditInr(pack)} / credit
                  </span>
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {pack.blurb}
                </p>
                <Button
                  asChild
                  size="lg"
                  variant={featured ? "default" : "outline"}
                  className={"mt-7 h-12 rounded-full " + (featured ? "" : "border-border bg-card")}
                >
                  <Link to="/org">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Secure checkout via Razorpay. Need a custom volume or invoice billing?{" "}
          <Link to="/contact" className="text-primary underline-offset-4 hover:underline">
            Talk to us
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
          Everything a careful buyer asks.
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
              Ready to build a healthier workplace?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Create your organisation in a minute. Buy credits when you're ready. Send your first
              assessment today.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-12 rounded-full px-8 text-[15px]">
                <Link to="/org">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-card px-8 text-[15px]"
              >
                <Link to="/contact">Book a demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
