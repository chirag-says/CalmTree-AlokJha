import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Lock, Sparkles, ArrowRight } from "lucide-react";
import { AssessmentRunner } from "@/components/assessment/AssessmentRunner";
import { ProfileRunner } from "@/components/assessment/ProfileRunner";
import { Button } from "@/components/ui/button";
import { getAssessment } from "@/data/assessments";
import type { AnyAssessmentConfig } from "@/data/assessments";
import type { ProfileAssessmentConfig } from "@/data/assessments/types";
import { SITE } from "@/data/constants";
import { useAuth } from "@/hooks/useAuth";
import { getResultForSlug } from "@/server/functions/results.functions";

export const Route = createFileRoute("/_authed/assessments/$slug")({
  head: ({ params }) => {
    const config = getAssessment(params.slug);
    const title = config ? `${config.meta.title} | ${SITE.name}` : `Assessment | ${SITE.name}`;
    const description = config?.meta.description ?? "Take a psychology self-check.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: Page,
});

/** Shown instead of the runner when a non-free assessment is opened while signed out. */
function LockedAssessmentPreview({ config, slug }: { config: AnyAssessmentConfig; slug: string }) {
  return (
    <div className="text-center max-w-xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">{config.meta.title}</h2>
      <p className="text-muted-foreground mb-2">{config.meta.subtitle}</p>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {config.meta.duration}
        </span>
        <span>·</span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          {config.meta.questionCount} questions
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 text-left mb-8">
        <h3 className="font-semibold mb-2">What this measures</h3>
        <p className="text-sm text-muted-foreground">{config.meta.purpose}</p>
      </div>

      <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 text-center">
        <Lock className="h-6 w-6 text-primary mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-4">
          Sign in to take this assessment — it's part of the {config.tier} tier.
        </p>
        <Button asChild size="lg" className="h-12 px-8">
          <Link to="/login" search={{ redirect: `/assessments/${slug}` }}>
            Sign in to start
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function Page() {
  const { slug } = Route.useParams();
  const config = getAssessment(slug);
  const { user, session, loading: authLoading } = useAuth();

  // Restore a previously-saved result (from "My Results") so revisiting a
  // completed assessment shows the result, not the start screen.
  // undefined = still resolving, null = nothing saved / take fresh.
  const [savedAnswers, setSavedAnswers] = useState<Record<string, number> | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (authLoading) return;
    if (!config || !session?.access_token) {
      setSavedAnswers(null);
      return;
    }
    let cancelled = false;
    getResultForSlug({ data: { accessToken: session.access_token, slug } })
      .then((res) => {
        if (cancelled) return;
        if (!("error" in res) && res.result?.answers) {
          setSavedAnswers(res.result.answers as Record<string, number>);
        } else {
          setSavedAnswers(null);
        }
      })
      .catch(() => {
        if (!cancelled) setSavedAnswers(null);
      });
    return () => {
      cancelled = true;
    };
  }, [config, session, authLoading, slug]);

  if (!config) {
    return (
      <>
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h1 className="text-4xl font-semibold mb-4">Assessment not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find an assessment with that name.
          </p>
          <Link
            to="/assessments"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View all assessments
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="border-b border-border/60" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-5 py-8">
          <Link
            to="/assessments"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All assessments
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        {authLoading || savedAnswers === undefined ? (
          <div className="h-40 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
            Loading…
          </div>
        ) : !user && !config.meta.isFree ? (
          <LockedAssessmentPreview config={config} slug={slug} />
        ) : config.type === "profile-based" ? (
          <ProfileRunner
            config={config as ProfileAssessmentConfig}
            initialAnswers={savedAnswers ?? undefined}
          />
        ) : (
          <AssessmentRunner config={config} initialAnswers={savedAnswers ?? undefined} />
        )}
      </section>
    </>
  );
}
