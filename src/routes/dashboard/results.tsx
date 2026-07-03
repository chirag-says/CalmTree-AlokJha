/**
 * Dashboard — My Results (/dashboard/results)
 * Full assessment history, newest first.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyResults } from "@/server/functions/results.functions";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/dashboard/results")({
  head: () => ({ meta: [{ title: "My Results | CalmTree Dashboard" }] }),
  component: Page,
});

interface ResultRow {
  id: string;
  assessment_slug: string;
  assessment_type: string;
  primary_label: string;
  secondary_label: string | null;
  percentage: number | null;
  total_score: number | null;
  completed_at: string;
}

function Page() {
  const { user, session, loading: authLoading } = useAuth();
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user || !session?.access_token) return;
    setLoading(true);
    getMyResults({ data: { accessToken: session.access_token, limit: 100 } })
      .then((res) => {
        if (!("error" in res) && res.results) {
          setResults(res.results as ResultRow[]);
        }
      })
      .catch((e) => {
        console.error("[results] failed to load results:", e);
      })
      .finally(() => setLoading(false));
  }, [user, session, authLoading]);

  function formatSlug(slug: string) {
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">My Results</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All your completed assessments, newest first.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">No assessments completed yet.</p>
          <Button asChild>
            <Link to="/assessments">
              Start an assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((r) => (
            <Link
              key={r.id}
              to="/assessments/$slug"
              params={{ slug: r.assessment_slug }}
              className="flex items-start justify-between rounded-xl border border-border bg-card px-5 py-4 hover:shadow-md transition-shadow group"
            >
              <div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {formatSlug(r.assessment_slug)}
                </p>
                <p className="text-xs text-primary font-medium mt-1">{r.primary_label}</p>
                {r.secondary_label && (
                  <p className="text-xs text-muted-foreground mt-0.5">Blend: {r.secondary_label}</p>
                )}
                {r.percentage != null && (
                  <p className="text-xs text-muted-foreground mt-0.5">Score: {r.percentage}%</p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 ml-4 mt-0.5">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(r.completed_at), { addSuffix: true })}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
