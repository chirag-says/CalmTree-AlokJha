/**
 * /for-organizations — B2B marketing + entry point into the org funnel.
 *
 * Public page. "Get started" routes to /org, whose auth guard handles login and
 * whose empty state offers self-serve org creation → buy credits → send.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Mail,
  ShieldCheck,
  BarChart3,
  Send,
  CreditCard,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/SiteLayout";
import { SITE } from "@/data/constants";
import { CREDIT_PACKS, perCreditInr } from "@/data/credit-packs";

export const Route = createFileRoute("/for-organizations")({
  head: () => ({
    meta: [
      { title: `For Organizations | ${SITE.name}` },
      {
        name: "description",
        content:
          "Send CalmTree psychology assessments to your team. Buy credits, invite employees by email, and see aggregated, anonymised wellbeing insights — never individual answers.",
      },
      { property: "og:title", content: `${SITE.name} for Organizations` },
    ],
  }),
  component: ForOrganizations,
});

const STEPS = [
  {
    icon: CreditCard,
    title: "Buy credits",
    body: "Pick a credit pack and pay securely. One credit sends one assessment to one employee.",
  },
  {
    icon: Send,
    title: "Invite your team",
    body: "Choose an assessment, paste employee emails, and launch. Everyone gets a private link — no account needed.",
  },
  {
    icon: BarChart3,
    title: "See the insights",
    body: "Track completion live and read aggregated results by team — trends, not individuals.",
  },
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "Aggregate-only by default",
    body: "Employers see group trends, never a single person's answers. A minimum group size protects anonymity.",
  },
  {
    icon: Mail,
    title: "Frictionless for employees",
    body: "A private magic link — no sign-up, no password. It takes a few minutes on any device.",
  },
  {
    icon: Building2,
    title: "Built on real assessments",
    body: "The same CalmTree psychology assessments, from workplace wellbeing to leadership and team health.",
  },
];

function ForOrganizations() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-12 pb-8 md:pt-20 md:pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide mb-6">
          <Building2 className="h-3.5 w-3.5" />
          {SITE.name} for Organizations
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto leading-[1.1]">
          Understand your team's wellbeing —{" "}
          <span className="text-primary">without crossing the line.</span>
        </h1>
        <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Send CalmTree psychology assessments to your employees by email. You get honest,
          aggregated insights. They get privacy and a calm, useful experience.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-11 px-7 rounded-full">
            <Link to="/org">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-7 rounded-full">
            <Link to="/contact">Talk to us</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No subscription. Pay per credit. Credits never expire.
        </p>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3">
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">Live in three steps.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / privacy */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-3">
            {TRUST.map((t) => (
              <div key={t.title}>
                <t.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3">
            Simple pricing
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">Buy credits as you need them.</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            One credit = one assessment sent to one employee. Unused credits from a closed campaign
            are refunded to your balance.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative rounded-2xl border bg-card p-6 flex flex-col ${
                pack.popular ? "border-primary shadow-sm" : "border-border"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              )}
              <p className="text-sm font-semibold text-foreground">{pack.label}</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-foreground">{pack.credits}</span>
                <span className="text-sm text-muted-foreground">credits</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-foreground">
                ₹{pack.priceInr.toLocaleString()}
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                  ₹{perCreditInr(pack)}/credit
                </span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground flex-1">{pack.blurb}</p>
              <Button
                asChild
                className="mt-5 rounded-full"
                variant={pack.popular ? "default" : "outline"}
              >
                <Link to="/org">Get started</Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          Secure checkout via Razorpay. Need a custom volume or invoice billing?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Talk to us
          </Link>
          .
        </p>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-3xl bg-primary/[0.06] border border-primary/15 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold max-w-lg mx-auto">
            Ready to check in with your team?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Create your organization in a minute. Buy credits when you're ready. Send your first
            assessment today.
          </p>
          <Button asChild size="lg" className="mt-8 h-11 px-7 rounded-full">
            <Link to="/org">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
