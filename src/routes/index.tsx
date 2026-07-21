import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/SiteLayout";
import { NewsletterForm } from "@/components/NewsletterForm";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { SITE } from "@/data/constants";
import { useAuth } from "@/hooks/useAuth";
import { ASSESSMENT_LIST } from "@/data/assessments";
import {
  Leaf,
  Play,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  User,
  Sparkles,
  ArrowRight,
  Brain,
  HeartPulse,
  Timer,
  Flame,
  Heart,
  Briefcase,
  Users,
  MessageCircle,
  Monitor,
  Sun,
  Compass,
  Shield,
  Target,
  Zap,
  Layers,
  Activity,
  Award,
  Settings,
  TrendingUp,
  Eye,
  GitBranch,
  RefreshCw,
  AlertCircle,
  Mail,
} from "lucide-react";
import type { AssessmentIcon, ProductCategory } from "@/data/assessments/types";

// All ten Calmtree product categories — the full spread of what the 100
// assessments cover, surfaced right on the landing page.
const LANDING_CATEGORY_CHIPS: { label: string; value: ProductCategory }[] = [
  { label: "Self-Development", value: "Self-Awareness & Personality" },
  { label: "Emotional Strength", value: "Emotional Strength & Everyday Mind" },
  { label: "Relationships", value: "Relationships & Emotional Connection" },
  { label: "Workplace", value: "Workplace Effectiveness" },
  { label: "Leadership", value: "Leadership & Teams" },
  { label: "Founders", value: "Founders & Entrepreneurship" },
  { label: "Gen Z & Digital Life", value: "Gen Z & Digital Life" },
  { label: "Career", value: "Career Direction" },
  { label: "Parenting", value: "Family & Parenting" },
  { label: "Life Transitions", value: "Life Transitions & Healthy Ageing" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | Understand Your Mind. Improve Your Life.` },
      { name: "description", content: SITE.description },
      {
        property: "og:title",
        content: `${SITE.name} | Practical Psychology for Everyday Life`,
      },
      {
        property: "og:description",
        content: `Decode Your Mind. Learn at ${SITE.name} Academy. Take assessments and download resources.`,
      },
    ],
  }),
  component: Index,
});

// Assessments anyone can take without signing in (config.meta.isFree) —
// surfaced directly on the landing page so the free path is discoverable.
const FREE_ASSESSMENTS = ASSESSMENT_LIST.filter((a) => a.meta.isFree);

const ICON_MAP: Record<AssessmentIcon, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  brain: Brain,
  heart: Heart,
  "clipboard-check": ClipboardCheck,
  user: User,
  sparkles: Sparkles,
  briefcase: Briefcase,
  users: Users,
  "message-circle": MessageCircle,
  "book-open": BookOpen,
  monitor: Monitor,
  sun: Sun,
  compass: Compass,
  shield: Shield,
  target: Target,
  zap: Zap,
  layers: Layers,
  activity: Activity,
  award: Award,
  settings: Settings,
  "trending-up": TrendingUp,
  eye: Eye,
  "git-branch": GitBranch,
  "refresh-cw": RefreshCw,
  "alert-circle": AlertCircle,
};

function Index() {
  const { user, isReady, profile } = useAuth();

  // Logged-in users don't need the marketing landing page — send them to their
  // dashboard (or onboarding if they haven't finished it). Anonymous visitors
  // still get the full SSR landing page below (important for SEO).
  if (isReady && user) {
    if (profile && !profile.onboarding_completed) {
      return <Navigate to="/onboarding" search={{ redirect: "/dashboard" }} />;
    }
    return <Navigate to="/dashboard" />;
  }

  return (
    <SiteLayout>
      {/* ═══════════════════════════════════════════════
          HERO — Pixel-art forest illustration background
          Text sits on the clear sky, illustration frames below
         ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border border-[#c8d5c4]/60 rounded-xl mx-3 md:mx-5 mt-3">
        {/* Background illustration — mobile (portrait) */}
        <img
          src="/hero-illustration-mobile.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-bottom md:hidden"
          loading="eager"
        />
        {/* Background illustration — desktop (landscape) */}
        <img
          src="/hero-illustration.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-bottom hidden md:block"
          loading="eager"
        />
        {/* Light overlay — keeps top text area clean, fades to show illustration below */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #e8efe6 0%, #e8efe6e0 30%, #e8efe680 55%, transparent 75%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-5 pt-8 pb-60 md:pt-16 md:pb-72 lg:pb-80 text-center">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-white/70 text-primary text-[10px] md:text-xs font-medium tracking-wide mb-6 md:mb-10 border border-[#c8d5c4]/50">
            <Leaf className="h-3 w-3 md:h-3.5 md:w-3.5" />
            Applied Psychology by {SITE.name}
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-[#2d4a3e] leading-[1.1] tracking-tight max-w-2xl mx-auto">
            Understand Your Mind.
            <br />
            <span className="font-bold italic text-[#3d6b56]">Improve Your Life.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 md:mt-8 text-sm md:text-lg text-[#4a6b5e] max-w-sm md:max-w-lg mx-auto leading-relaxed">
            A calm, credible place to learn applied psychology, for self-awareness, emotional
            wellness, relationships, and personal growth. Not therapy. Just useful psychology for
            everyday life.
          </p>

          {/* Three pillars — always in one row */}
          <div className="mt-8 md:mt-14 grid grid-cols-3 gap-3 md:gap-14 max-w-3xl mx-auto">
            {[
              {
                icon: Play,
                title: "Decode Your Mind",
                body: "Psychology explained simply.",
                bodyFull: "Psychology explained simply, on YouTube and Instagram.",
              },
              {
                icon: GraduationCap,
                title: "Learn at Academy",
                body: "Short courses that build understanding.",
                bodyFull: "Short courses and certificates that build real understanding.",
              },
              {
                icon: ClipboardCheck,
                title: "Take Assessments",
                body: "Quick self-checks for today.",
                bodyFull: "Quick self-checks to understand where you are today.",
              },
            ].map((p) => (
              <div key={p.title} className="text-center">
                <p.icon className="h-4 w-4 md:h-5 md:w-5 text-[#3d6b56] mx-auto mb-1.5 md:mb-2.5" />
                <h3 className="font-bold text-[11px] md:text-sm tracking-wide text-[#2d4a3e]">
                  {p.title}
                </h3>
                <p className="mt-0.5 md:mt-1 text-[10px] md:text-sm text-[#5a7d6e] leading-snug md:leading-relaxed hidden md:block">
                  {p.bodyFull}
                </p>
                <p className="mt-0.5 text-[10px] text-[#5a7d6e] leading-snug md:hidden">{p.body}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-6 md:mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <Button
              asChild
              size="default"
              className="h-9 md:h-11 px-5 md:px-7 rounded-full shadow-md text-xs md:text-sm"
            >
              <Link to="/assessments">
                Start Your Journey
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              variant="outline"
              className="h-9 md:h-11 px-5 md:px-7 rounded-full bg-white/60 border-[#c8d5c4]/60 text-[#2d4a3e] shadow-sm text-xs md:text-sm"
            >
              <Link to="/decode-your-mind">
                <Play className="h-3.5 w-3.5 md:h-4 md:w-4" />
                Watch Decode Your Mind
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DECODE YOUR MIND — Video section
         ═══════════════════════════════════════════════ */}
      <Section
        eyebrow="Start with Decode Your Mind"
        title="Psychology that fits in your scroll."
        action={{ to: "/decode-your-mind", label: "Visit the channel" }}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {/* Video 1 — Real YouTube embed */}
          <article className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5">
            <YouTubeEmbed videoId="JVTlRoVoZW4" title="Decode Your Mind — Calmtree" />
            <div className="p-5">
              <span className="text-xs text-primary font-medium">Decode Your Mind</span>
              <h3 className="mt-1 font-semibold">The Silent Mind</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Decode Your Mind · by {SITE.founder}
              </p>
            </div>
          </article>

          {/* Video 2 & 3 — Placeholders (replace with real video IDs later) */}
          {[
            {
              t: "The science of burnout recovery",
              cat: "Mental Wellness",
            },
            {
              t: "Emotional intelligence in everyday life",
              cat: "Personality Education",
            },
          ].map((v) => (
            <article
              key={v.t}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/15 to-accent/40 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 ml-0.5" />
                </span>
              </div>
              <div className="p-5">
                <span className="text-xs text-primary font-medium">{v.cat}</span>
                <h3 className="mt-1 font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Decode Your Mind · Coming soon</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          FREE ASSESSMENTS — no sign-up needed, straight into the runner
         ═══════════════════════════════════════════════ */}
      <Section
        eyebrow="Try It Free"
        title="Take these assessments right now — no sign-up needed."
        action={{ to: "/assessments", label: "See all assessments" }}
      >
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {FREE_ASSESSMENTS.slice(0, 10).map((a) => {
            const Icon = ICON_MAP[a.meta.icon] ?? ClipboardCheck;
            return (
              <Link
                key={a.slug}
                to="/assessments/$slug"
                params={{ slug: a.slug }}
                className="group rounded-2xl border border-border bg-card p-5 text-center hover:shadow-[var(--shadow-soft)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary mb-2">
                  Free
                </span>
                <Icon className="h-6 w-6 text-primary mx-auto" />
                <h3 className="mt-3 text-sm font-semibold group-hover:text-primary transition-colors">
                  {a.meta.title}
                </h3>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  {a.meta.duration}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          ASSESSMENTS — Dynamic from registry
         ═══════════════════════════════════════════════ */}
      <Section
        eyebrow="Take Psychology Assessments"
        title="Quick self-checks built on real research."
        action={{ to: "/assessments", label: "See all assessments" }}
      >
        {/* Explore-by-segment chip row — routes into /assessments?category=... */}
        <div className="flex flex-wrap gap-2 mb-6">
          {LANDING_CATEGORY_CHIPS.map((c) => (
            <Link
              key={c.value}
              to="/assessments"
              search={{ category: c.value }}
              className="rounded-full px-4 py-1.5 text-sm font-medium border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {ASSESSMENT_LIST.slice(0, 10).map((a) => {
            const Icon = ICON_MAP[a.meta.icon] ?? ClipboardCheck;
            return (
              <Link
                key={a.slug}
                to="/assessments/$slug"
                params={{ slug: a.slug }}
                className="group rounded-2xl border border-border bg-card p-5 text-center hover:shadow-[var(--shadow-soft)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Icon className="h-6 w-6 text-primary mx-auto" />
                <h3 className="mt-3 text-sm font-semibold group-hover:text-primary transition-colors">
                  {a.meta.title}
                </h3>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Timer className="h-3 w-3" />
                  {a.meta.duration}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          ACADEMY — Course preview
         ═══════════════════════════════════════════════ */}
      <Section
        eyebrow={`Explore ${SITE.name} Academy`}
        title="Short courses. Real psychology. No fluff."
        action={{ to: "/academy", label: "See all courses" }}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Burnout Recovery",
              d: "A 7-day micro course to reset energy and focus.",
              icon: Flame,
            },
            {
              t: "Stop Overthinking",
              d: "Tools rooted in CBT to quiet the inner loop.",
              icon: Brain,
            },
            {
              t: "Emotional Intelligence",
              d: "Foundations of EI, for work and relationships.",
              icon: HeartPulse,
            },
          ].map((c) => (
            <div
              key={c.t}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <c.icon className="h-6 w-6 text-primary" />
              <span className="inline-block mt-3 text-xs uppercase tracking-wider text-primary font-medium">
                Micro course
              </span>
              <h3 className="mt-1 text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          RESOURCES — real ebook catalog from DB
         ═══════════════════════════════════════════════ */}
      <EbooksSection />

      {/* ═══════════════════════════════════════════════
          ABOUT — Founder section
         ═══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] items-center">
            <img
              src="/founder.jpg"
              alt={SITE.founder}
              className="aspect-square rounded-2xl object-cover mx-auto md:mx-0 max-w-[200px] w-full"
            />
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3">
                About the Founder
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">{SITE.founder}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                MBA and Master's in Psychology. {SITE.founder} founded {SITE.name} to make
                psychology simple, practical and useful in everyday life, not as therapy, but as
                education that helps you understand yourself and the people around you.
              </p>
              <Button asChild variant="outline" className="mt-6 rounded-full">
                <Link to="/about">
                  Read his story <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOR ORGANIZATIONS — B2B entry point
         ═══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-center">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3">
                For Organizations
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Bring {SITE.name} to your whole team.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
                Buy assessment credits, invite employees by email, and get aggregated, anonymised
                wellbeing insights — never individual answers. Built for HR, team leads, and
                founders.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link to="/for-organizations">
                    Explore for organizations
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/org">Get started</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <Briefcase className="h-24 w-24 text-primary/25" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
         ═══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="rounded-3xl bg-primary/[0.06] border border-primary/15 p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-2 text-primary text-xs font-medium tracking-[0.18em] uppercase mb-4">
            <Mail className="h-4 w-4" /> Newsletter
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-lg mx-auto">
            One thoughtful psychology read, each week.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Join the {SITE.name} newsletter. No noise, no spam. Just useful psychology that helps
            you understand yourself better.
          </p>
          <div className="mt-8 max-w-sm mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/* ── Reusable section layout (page-local) ──────────────────────── */

function Section({
  eyebrow,
  title,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  action?: { to: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold max-w-2xl">{title}</h2>
        </div>
        {action && (
          <Link
            to={action.to}
            className="hidden md:inline-flex items-center gap-1 text-sm text-primary hover:underline whitespace-nowrap"
          >
            {action.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── EbooksSection — renders real catalog from DB ─────────────────────────────

import { getActiveEbooks } from "@/server/functions/ebooks.functions";

interface EbookCard {
  id: string;
  title: string;
  subtitle: string | null;
  price_inr: number;
  cover_image_url: string | null;
}

const PLACEHOLDER_EBOOKS: EbookCard[] = [
  {
    id: "p1",
    title: "Burnout Recovery Workbook",
    subtitle: "Print-ready · PDF",
    price_inr: 0,
    cover_image_url: null,
  },
  {
    id: "p2",
    title: "Self-Reflection Journal",
    subtitle: "Print-ready · PDF",
    price_inr: 0,
    cover_image_url: null,
  },
  {
    id: "p3",
    title: "Habit Tracker",
    subtitle: "Print-ready · PDF",
    price_inr: 0,
    cover_image_url: null,
  },
];

function EbooksSection() {
  const [ebooks, setEbooks] = useState<EbookCard[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getActiveEbooks({ data: {} }).then((res) => {
      if (!("error" in res) && res.ebooks.length > 0) {
        setEbooks(res.ebooks as EbookCard[]);
      }
      setLoaded(true);
    });
  }, []);

  const displayEbooks = ebooks.length > 0 ? ebooks.slice(0, 3) : PLACEHOLDER_EBOOKS;

  return (
    <Section
      eyebrow="Download Practical Resources"
      title="Workbooks and journals you'll actually use."
      action={{ to: "/resources", label: "Browse resources" }}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {displayEbooks.map((e) => (
          <div
            key={e.id}
            className="group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
          >
            {e.cover_image_url ? (
              <img
                src={e.cover_image_url}
                alt={e.title}
                className="h-24 w-full object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="h-24 w-full rounded-xl bg-gradient-to-br from-primary/10 to-accent/30 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            )}
            <h3 className="font-semibold">{e.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground flex-1">
              {e.subtitle ?? "PDF · Print-ready"}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">
                {e.price_inr > 0 ? `₹${e.price_inr}` : "Free"}
              </span>
              <Link
                to="/resources"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                View <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
        {!loaded && ebooks.length === 0 && (
          // Skeleton loading state
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 h-44 animate-pulse"
              />
            ))}
          </>
        )}
      </div>
    </Section>
  );
}
