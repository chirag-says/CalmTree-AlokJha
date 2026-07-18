import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AssessmentRunner } from "@/components/assessment/AssessmentRunner";
import { ProfileRunner } from "@/components/assessment/ProfileRunner";
import { getAssessment } from "@/data/assessments";
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

function Page() {
  const { slug } = Route.useParams();
  const config = getAssessment(slug);
  const { session, loading: authLoading } = useAuth();

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
        {savedAnswers === undefined ? (
          <div className="h-40 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
            Loading…
          </div>
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
