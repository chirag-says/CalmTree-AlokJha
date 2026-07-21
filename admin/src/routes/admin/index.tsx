/**
 * Admin Overview — /admin
 */

import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { BookOpen, CheckCircle2, ShoppingBag, TrendingUp, UserPlus, Users } from "lucide-react";
import { useAdminOverview, useOverviewTimeSeries } from "@/data/admin-queries";
import { ASSESSMENT_LIST } from "@/data/assessments";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ChartCard } from "@/components/admin/ChartCard";
import { ErrorState } from "@/components/admin/ErrorState";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview — Calmtree" }] }),
  component: AdminOverviewPage,
});

const activityChartConfig = {
  signups: { label: "Signups", color: "var(--chart-1)" },
  results: { label: "Results", color: "var(--chart-2)" },
} satisfies ChartConfig;

const revenueChartConfig = {
  revenue: { label: "Revenue (₹)", color: "var(--chart-3)" },
} satisfies ChartConfig;

function AdminOverviewPage() {
  const overview = useAdminOverview();
  const series = useOverviewTimeSeries();

  // slug → human title, so the top-assessments panel isn't raw slugs.
  const titleBySlug = useMemo(() => {
    const m = new Map<string, string>();
    for (const a of ASSESSMENT_LIST) m.set(a.slug, a.meta.title);
    return m;
  }, []);

  const o = overview.data;
  const days = series.data?.days ?? [];
  const hasActivity = days.some((d) => d.signups > 0 || d.results > 0);
  const hasRevenue = days.some((d) => d.revenue > 0);

  return (
    <div>
      <PageHeader title="Overview" description="Calmtree platform at a glance." />

      {overview.isPending ? (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-20 sm:h-28 rounded-xl sm:rounded-2xl" />
          ))}
        </div>
      ) : overview.error || !o ? (
        <ErrorState
          message={overview.error?.message ?? "Failed to load overview."}
          onRetry={() => void overview.refetch()}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
            <StatCard index={0} label="Total Users" value={o.totalUsers} icon={Users} />
            <StatCard index={1} label="New Users (30d)" value={o.newUsers30d} icon={UserPlus} />
            <StatCard
              index={2}
              label="Onboarded"
              value={o.onboardingRate}
              format="percent"
              sub="of all users"
              icon={CheckCircle2}
            />
            <StatCard index={3} label="Results (30d)" value={o.resultsLast30d} icon={TrendingUp} />
            <StatCard
              index={4}
              label="Revenue"
              value={o.revenueInr}
              format="currency"
              sub={`${o.totalPurchases} purchases`}
              icon={ShoppingBag}
            />
            <StatCard index={5} label="Active Ebooks" value={o.activeEbooks} icon={BookOpen} />
          </div>

          {/* Daily trends (last 30 days) */}
          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 lg:grid-cols-2">
            <ChartCard
              title="Signups & results"
              description="Daily, last 30 days"
              isLoading={series.isPending}
              isEmpty={!hasActivity}
            >
              <ChartContainer config={activityChartConfig} className="h-[200px] sm:h-[250px] w-full">
                <AreaChart data={days} margin={{ left: 4, right: 4 }}>
                  <defs>
                    <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-signups)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-signups)" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="fillResults" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-results)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-results)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeOpacity={0.15} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={24}
                    tickFormatter={(v: string) => v.slice(5)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Area
                    dataKey="signups"
                    type="monotone"
                    fill="url(#fillSignups)"
                    stroke="var(--color-signups)"
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="results"
                    type="monotone"
                    fill="url(#fillResults)"
                    stroke="var(--color-results)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ChartCard>

            <ChartCard
              title="Revenue"
              description="Daily ₹, last 30 days"
              isLoading={series.isPending}
              isEmpty={!hasRevenue}
              emptyLabel="No revenue in this window"
            >
              <ChartContainer config={revenueChartConfig} className="h-[200px] sm:h-[250px] w-full">
                <BarChart data={days} margin={{ left: 4, right: 4 }}>
                  <CartesianGrid vertical={false} strokeOpacity={0.15} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={24}
                    tickFormatter={(v: string) => v.slice(5)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </ChartCard>
          </div>

          {/* Top assessments (last 30 days) */}
          <div className="surface-raised mt-6 sm:mt-8 rounded-xl sm:rounded-2xl p-3 sm:p-5">
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              Top assessments (30d)
            </p>
            {o.topAssessments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No assessments completed yet.</p>
            ) : (
              <ul className="space-y-3">
                {o.topAssessments.map((a) => {
                  const max = o.topAssessments[0].count || 1;
                  return (
                    <li key={a.slug} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                      <span className="sm:w-48 shrink-0 truncate text-sm text-foreground">
                        {titleBySlug.get(a.slug) ?? a.slug}
                      </span>
                      <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <span
                            className="block h-full rounded-full bg-primary/70 transition-all"
                            style={{ width: `${(a.count / max) * 100}%` }}
                          />
                        </span>
                        <span className="w-10 text-right text-sm text-muted-foreground">
                          {a.count}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
