/**
 * Dashboard Overview — /dashboard
 *
 * Shows: latest result, quick counts (assessments taken, ebooks owned),
 * and a recent activity list.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyResults } from "@/server/functions/results.functions";
import { getMyPurchasedEbookIds } from "@/server/functions/ebooks.functions";
import { ASSESSMENT_LIST } from "@/data/assessments";
import { ArrowRight, BookText, BookOpen, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [{ title: "Dashboard | Calmtree" }],
  }),
  component: Page,
});

interface ResultRow {
  id: string;
  assessment_slug: string;
  assessment_type: string;
  primary_label: string;
  percentage: number | null;
  completed_at: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  to,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4 hover:shadow-md transition-shadow group"
    >
      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </Link>
  );
}

function Page() {
  const { user, session, loading: authLoading, profile } = useAuth();
  const [results, setResults] = useState<ResultRow[]>([]);
  const [ebookCount, setEbookCount] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user || !session?.access_token) return;
    setDataLoading(true);

    Promise.all([
      // limit 100 so the "Assessments taken" stat is a real count, not capped at
      // the recent-list size; only the first 5 are rendered below.
      getMyResults({ data: { accessToken: session.access_token, limit: 100 } }),
      getMyPurchasedEbookIds({ data: { accessToken: session.access_token } }),
    ])
      .then(([resultsRes, ebooksRes]) => {
        if (!("error" in resultsRes) && resultsRes.results) {
          setResults(resultsRes.results as ResultRow[]);
        }
        if (!("error" in ebooksRes)) {
          setEbookCount(ebooksRes.ebookIds.length);
        }
      })
      .catch((e) => {
        console.error("[dashboard] failed to load overview data:", e);
      })
      .finally(() => setDataLoading(false));
  }, [user, session, authLoading]);

  // Personalization from profile
  const displayName =
    profile?.full_name?.split(" ")?.[0] ||
    (user?.user_metadata?.full_name as string | undefined)?.split(" ")?.[0];

  // Recommended assessments from focus areas
  const recommended = profile?.focus_areas?.length
    ? ASSESSMENT_LIST.filter((a) =>
        profile.focus_areas.some((f: string) => a.meta.productCategory === f),
      ).slice(0, 3)
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Welcome back{displayName ? `, ${displayName}` : ""}
        </h1>
        {profile?.primary_goal && (
          <p className="mt-1 text-sm text-primary/80 font-medium">Goal: {profile.primary_goal}</p>
        )}
        <p className="mt-1 text-sm text-muted-foreground">
          Here's a snapshot of your Calmtree journey.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <StatCard
          icon={BookText}
          label="Assessments taken"
          value={results.length}
          to="/dashboard/results"
        />
        <StatCard icon={BookOpen} label="Ebooks owned" value={ebookCount} to="/dashboard/ebooks" />
        <Link
          to="/assessments"
          className="rounded-2xl border border-dashed border-primary/30 bg-primary/[0.03] p-5 flex items-center gap-4 hover:bg-primary/[0.06] transition-colors group"
        >
          <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Explore assessments</p>
            <p className="text-xs text-muted-foreground">40+ available</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </div>

      {/* Recommended for you */}
      {recommended.length > 0 && (
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Recommended for you</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((a) => (
              <Link
                key={a.slug}
                to="/assessments/$slug"
                params={{ slug: a.slug }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.meta.title}</p>
                  <p className="text-xs text-muted-foreground">{a.meta.duration}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent results */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Results</h2>
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/results">View all</Link>
        </Button>
      </div>

      {dataLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            You haven't taken any assessments yet.
          </p>
          <Button asChild>
            <Link to="/assessments">
              Start your first assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {results.slice(0, 5).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">
                  {r.assessment_slug
                    .split("-")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </p>
                <p className="text-xs text-primary font-medium mt-0.5">{r.primary_label}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(r.completed_at), { addSuffix: true })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
