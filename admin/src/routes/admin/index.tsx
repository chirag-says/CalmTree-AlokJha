/**
 * Admin Overview — /admin
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAdminOverview } from "@/server/functions/admin.functions";
import { StatCard } from "@/admin/AdminLayout";
import { ASSESSMENT_LIST } from "@/data/assessments";
import { Users, UserPlus, TrendingUp, ShoppingBag, BookOpen, CheckCircle2 } from "lucide-react";

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
  const [loading, setLoading] = useState(true);

  // slug → human title, so the top-assessments panel isn't raw slugs.
  const titleBySlug = useMemo(() => {
    const m = new Map<string, string>();
    for (const a of ASSESSMENT_LIST) m.set(a.slug, a.meta.title);
    return m;
  }, []);

  useEffect(() => {
    if (!session?.access_token) return;
    getAdminOverview({ data: { accessToken: session.access_token } }).then((res) => {
      if (!("error" in res)) setOverview(res as Overview);
      setLoading(false);
    });
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
