import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { getAssessmentsByTier, TIER_INFO } from "@/data/assessments";
import { TierBadge } from "@/components/assessment/TierBadge";
import type { AssessmentConfig, AssessmentTier, AssessmentIcon } from "@/data/assessments/types";
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
  Briefcase,
  Users,
  MessageCircle,
  BookOpen,
  Monitor,
  Sun,
  Compass,
  Shield,
  Target,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/assessments/")(({
  head: () => ({
    meta: [
      { title: `Psychology Assessments — ${SITE.name}` },
      {
        name: "description",
        content:
          "15 CalmTree Original™ assessments: burnout, stress, confidence, emotional intelligence, personality, leadership, and more.",
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
}));

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
};

function AssessmentCard({ assessment }: { assessment: AssessmentConfig }) {
  const Icon = ICON_MAP[assessment.meta.icon] ?? ClipboardCheck;
  return (
    <article className="rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <Icon className="h-6 w-6 text-primary" />
        <TierBadge tier={assessment.tier} />
      </div>
      <h3 className="mt-1 text-lg font-semibold">{assessment.meta.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">
        {assessment.meta.description}
      </p>
      <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5" />
          {assessment.meta.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          Private
        </span>
      </div>
      <Button asChild className="mt-5">
        <Link to="/assessments/$slug" params={{ slug: assessment.slug }}>
          Start assessment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}

function TierSection({ tier }: { tier: AssessmentTier }) {
  const assessments = getAssessmentsByTier(tier);
  const info = TIER_INFO[tier];

  if (assessments.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-semibold">{info.label}</h2>
          <span className="text-sm text-muted-foreground px-3 py-0.5 rounded-full bg-muted">
            {info.price}
          </span>
        </div>
        <p className="text-muted-foreground">{info.description}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {assessments.map((a) => (
          <AssessmentCard key={a.slug} assessment={a} />
        ))}
      </div>
    </div>
  );
}

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Assessments"
        title="CalmTree Original Assessments™"
        description="Situational, non-clinical self-checks designed for self-awareness. Under 2 minutes each. Completely private."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <TierSection tier="discovery" />
        <TierSection tier="growth" />
        <TierSection tier="professional" />

        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          Note: {SITE.name} assessments are for psychology education and
          self-reflection only. They are not a substitute for clinical
          evaluation, diagnosis or counselling.
        </p>
      </section>
    </SiteLayout>
  );
}
