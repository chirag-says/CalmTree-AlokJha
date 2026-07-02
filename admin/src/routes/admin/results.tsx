/**
 * Admin Results — /admin/results
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { listResults } from "@/server/functions/admin.functions";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/admin/results")({
  head: () => ({ meta: [{ title: "Results — CalmTree Admin" }] }),
  component: AdminResultsPage,
});

interface ResultRow {
  id: string;
  user_id: string;
  assessment_slug: string;
  primary_label: string;
  percentage: number | null;
  completed_at: string;
}

function AdminResultsPage() {
  const { session } = useAuth();
  const [results, setResults] = useState<ResultRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!session?.access_token) return;
    setLoading(true);
    listResults({ data: { accessToken: session.access_token, page, pageSize: 20 } }).then((res) => {
      if (!("error" in res)) {
        setResults(res.results as ResultRow[]);
        setTotal(res.total);
      }
      setLoading(false);
    });
  }, [session, page]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Assessment Results</h1>
        <p className="text-sm text-white/40 mt-1">{total} total results (read-only).</p>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Assessment
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Result
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-4 py-3">
                      <div className="h-4 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              : results.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 text-white">
                      {r.assessment_slug
                        .split("-")
                        .map((w) => w[0].toUpperCase() + w.slice(1))
                        .join(" ")}
                    </td>
                    <td className="px-4 py-3 text-sm text-cyan-300">{r.primary_label}</td>
                    <td className="px-4 py-3 text-white/60">
                      {r.percentage !== null ? `${Math.round(r.percentage)}%` : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-white/30 font-mono">
                      {r.user_id.slice(0, 10)}…
                    </td>
                    <td className="px-4 py-3 text-xs text-white/40">
                      {formatDistanceToNow(new Date(r.completed_at), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {total > 20 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
          >
            Previous
          </button>
          <span className="text-xs text-white/40">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button
            disabled={page >= Math.ceil(total / 20)}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
