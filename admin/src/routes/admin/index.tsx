/**
 * Admin Overview — /admin
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAdminOverview, getOverviewTimeSeries } from "@/server/functions/admin.functions";
import { StatCard } from "@/admin/AdminLayout";
import { ASSESSMENT_LIST } from "@/data/assessments";
import { Users, UserPlus, TrendingUp, ShoppingBag, BookOpen, CheckCircle2 } from "lucide-react";

// ─── Minimal dependency-free daily bar chart ──────────────────────────────────

interface DayPoint {
  date: string;
  signups: number;
  results: number;
  revenue: number;
}

function DailyBarChart({
  days,
  metric,
  title,
  color,
  format = (v) => String(v),
}: {
  days: DayPoint[];
  metric: keyof Omit<DayPoint, "date">;
  title: string;
  color: string;
  format?: (v: number) => string;
}) {
  const max = Math.max(...days.map((d) => d[metric]), 1);
  const total = days.reduce((s, d) => s + d[metric], 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-xs text-white/50 uppercase tracking-wider">{title}</p>
        <p className="text-sm font-semibold text-white">{format(total)} in 30d</p>
      </div>
      <div className="flex items-end gap-[3px] h-24">
        {days.map((d) => (
          <div
            key={d.date}
            className="flex-1 rounded-t-sm min-h-[2px] transition-all"
            style={{
              height: `${Math.max((d[metric] / max) * 100, 2)}%`,
              backgroundColor: d[metric] > 0 ? color : "rgba(255,255,255,0.06)",
            }}
            title={`${d.date}: ${format(d[metric])}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-white/25">
        <span>{days[0]?.date.slice(5)}</span>
        <span>{days[days.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview — CalmTree" }] }),
  component: AdminOverviewPage,
});

interface Overview {
  totalUsers: number;
  newUsers30d: number;
  onboardingRate: number;
  resultsLast30d: number;
  totalPurchases: number;
  revenueInr: number;
  activeEbooks: number;
  topAssessments: { slug: string; count: number }[];
}

function AdminOverviewPage() {
  const { session } = useAuth();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [days, setDays] = useState<DayPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // slug → human title, so the top-assessments panel isn't raw slugs.
  const titleBySlug = useMemo(() => {
    const m = new Map<string, string>();
    for (const a of ASSESSMENT_LIST) m.set(a.slug, a.meta.title);
    return m;
  }, []);

  useEffect(() => {
    if (!session?.access_token) return;
    Promise.all([
      getAdminOverview({ data: { accessToken: session.access_token } }),
      getOverviewTimeSeries({ data: { accessToken: session.access_token } }),
    ])
      .then(([overviewRes, seriesRes]) => {
        if (!("error" in overviewRes)) setOverview(overviewRes as Overview);
        if (!("error" in seriesRes)) setDays(seriesRes.days as DayPoint[]);
      })
      .catch((e) => console.error("[admin-overview] fetch failed:", e))
      .finally(() => setLoading(false));
  }, [session]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <p className="text-sm text-white/40 mt-1">CalmTree platform at a glance.</p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : overview ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Total Users" value={overview.totalUsers} icon={Users} />
            <StatCard label="New Users (30d)" value={overview.newUsers30d} icon={UserPlus} />
            <StatCard
              label="Onboarded"
              value={`${overview.onboardingRate}%`}
              sub="of all users"
              icon={CheckCircle2}
            />
            <StatCard label="Results (30d)" value={overview.resultsLast30d} icon={TrendingUp} />
            <StatCard
              label="Revenue"
              value={`₹${overview.revenueInr.toLocaleString("en-IN")}`}
              sub={`${overview.totalPurchases} purchases`}
              icon={ShoppingBag}
            />
            <StatCard label="Active Ebooks" value={overview.activeEbooks} icon={BookOpen} />
          </div>

          {/* Daily trends (last 30 days) */}
          {days.length > 0 && (
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <DailyBarChart days={days} metric="signups" title="Signups / day" color="#22d3ee" />
              <DailyBarChart days={days} metric="results" title="Results / day" color="#34d399" />
              <DailyBarChart
                days={days}
                metric="revenue"
                title="Revenue / day"
                color="#fbbf24"
                format={(v) => `₹${v.toLocaleString("en-IN")}`}
              />
            </div>
          )}

          {/* Top assessments (last 30 days) */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-4">
              Top assessments (30d)
            </p>
            {overview.topAssessments.length === 0 ? (
              <p className="text-sm text-white/40">No assessments completed yet.</p>
            ) : (
              <ul className="space-y-3">
                {overview.topAssessments.map((a) => {
                  const max = overview.topAssessments[0].count || 1;
                  return (
                    <li key={a.slug} className="flex items-center gap-3">
                      <span className="w-48 shrink-0 truncate text-sm text-white/80">
                        {titleBySlug.get(a.slug) ?? a.slug}
                      </span>
                      <span className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <span
                          className="block h-full bg-cyan-400/70"
                          style={{ width: `${(a.count / max) * 100}%` }}
                        />
                      </span>
                      <span className="w-10 text-right text-sm text-white/60">{a.count}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p className="text-white/40 text-sm">Failed to load overview.</p>
      )}
    </div>
  );
}
