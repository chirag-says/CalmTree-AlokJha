/**
 * Admin Analytics — /admin/analytics
 * PostHog-backed product analytics: traffic, engagement, conversion funnel,
 * top pages, referrers, event breakdown, and a live activity feed.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
} from "recharts";
import { Activity, ExternalLink, Eye, MousePointerClick, ShoppingBag, Users } from "lucide-react";
import {
  useAnalyticsTrends,
  useConversionFunnel,
  useEventBreakdown,
  useRecentEvents,
  useReferrers,
  useTopPages,
  type Period,
} from "@/data/analytics-queries";
import { getPostHogProjectUrl } from "@/lib/posthog-links";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ChartCard } from "@/components/admin/ChartCard";
import { FunnelChart } from "@/components/admin/FunnelChart";
import { ActivityTimeline } from "@/components/admin/ActivityTimeline";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { EmptyState } from "@/components/admin/EmptyState";
import { ErrorState } from "@/components/admin/ErrorState";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import type { TimelineEvent } from "@/server/functions/analytics.functions";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — CalmTree Admin" }] }),
  component: AdminAnalyticsPage,
});

const trafficConfig = {
  pageviews: { label: "Pageviews", color: "var(--chart-1)" },
  uniqueUsers: { label: "Unique users", color: "var(--chart-2)" },
} satisfies ChartConfig;

const assessmentConfig = {
  assessmentsStarted: { label: "Started", color: "var(--chart-2)" },
  assessmentsCompleted: { label: "Completed", color: "var(--chart-1)" },
  purchases: { label: "Purchases", color: "var(--chart-3)" },
} satisfies ChartConfig;

const REFERRER_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/** True when any analytics query reports the PostHog env isn't configured. */
function notConfigured(...results: { data?: unknown }[]): boolean {
  return results.some(
    (r) =>
      r.data &&
      typeof r.data === "object" &&
      "notConfigured" in r.data &&
      (r.data as { notConfigured?: boolean }).notConfigured,
  );
}

function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");
  const [includePageviews, setIncludePageviews] = useState(false);

  const trends = useAnalyticsTrends(period);
  const funnel = useConversionFunnel(period);
  const events = useEventBreakdown(period);
  const pages = useTopPages(period);
  const referrers = useReferrers(period);
  const feed = useRecentEvents(includePageviews);

  const isNotConfigured = notConfigured(trends, funnel, events, pages, referrers, feed);

  // KPI totals + delta vs the previous half of the window.
  const kpis = useMemo(() => {
    const days = trends.data && "days" in trends.data ? trends.data.days : [];
    if (days.length === 0) return null;
    const half = Math.floor(days.length / 2);
    const prev = days.slice(0, half);
    const curr = days.slice(half);
    const sum = (rows: typeof days, key: keyof (typeof days)[number]) =>
      rows.reduce((s, d) => s + (d[key] as number), 0);
    const delta = (c: number, p: number) => (p > 0 ? ((c - p) / p) * 100 : null);
    return {
      uniqueUsers: sum(days, "uniqueUsers"),
      pageviews: sum(days, "pageviews"),
      completed: sum(days, "assessmentsCompleted"),
      purchases: sum(days, "purchases"),
      dUniqueUsers: delta(sum(curr, "uniqueUsers"), sum(prev, "uniqueUsers")),
      dPageviews: delta(sum(curr, "pageviews"), sum(prev, "pageviews")),
      dCompleted: delta(sum(curr, "assessmentsCompleted"), sum(prev, "assessmentsCompleted")),
      dPurchases: delta(sum(curr, "purchases"), sum(prev, "purchases")),
    };
  }, [trends.data]);

  const days = trends.data && "days" in trends.data ? trends.data.days : [];
  const funnelSteps = funnel.data && "steps" in funnel.data ? funnel.data.steps : [];
  const eventRows = events.data && "events" in events.data ? events.data.events : [];
  const pageRows = pages.data && "pages" in pages.data ? pages.data.pages : [];
  const referrerRows =
    referrers.data && "referrers" in referrers.data ? referrers.data.referrers : [];
  const feedEvents: TimelineEvent[] =
    feed.data?.pages.flatMap((p) => ("events" in p ? p.events : [])) ?? [];
  const maxEventTotal = Math.max(...eventRows.map((e) => e.total), 1);

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Product behaviour on calmtree.in, powered by PostHog."
        actions={
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={period}
              onValueChange={(v) => v && setPeriod(v as Period)}
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="7d">7d</ToggleGroupItem>
              <ToggleGroupItem value="30d">30d</ToggleGroupItem>
              <ToggleGroupItem value="90d">90d</ToggleGroupItem>
            </ToggleGroup>
            <Button variant="outline" size="sm" asChild>
              <a href={getPostHogProjectUrl()} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Open in PostHog</span>
              </a>
            </Button>
          </div>
        }
      />

      {isNotConfigured ? (
        <SetupNotice
          title="Connect PostHog to unlock analytics"
          description="Add POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID, and POSTHOG_API_HOST to the admin server environment, then redeploy. Create the key in PostHog → Settings → Personal API Keys with the 'Query Read' scope."
        />
      ) : (
        <div className="space-y-8">
          {/* KPI row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trends.isPending || !kpis ? (
              [0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
            ) : (
              <>
                <StatCard
                  index={0}
                  label="Unique users"
                  value={kpis.uniqueUsers}
                  delta={kpis.dUniqueUsers}
                  icon={Users}
                />
                <StatCard
                  index={1}
                  label="Pageviews"
                  value={kpis.pageviews}
                  delta={kpis.dPageviews}
                  icon={Eye}
                />
                <StatCard
                  index={2}
                  label="Assessments done"
                  value={kpis.completed}
                  delta={kpis.dCompleted}
                  icon={MousePointerClick}
                />
                <StatCard
                  index={3}
                  label="Purchases"
                  value={kpis.purchases}
                  delta={kpis.dPurchases}
                  icon={ShoppingBag}
                />
              </>
            )}
          </div>

          {/* Traffic + assessment activity */}
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="Traffic"
              description="Pageviews & unique users"
              isLoading={trends.isPending}
              isEmpty={!days.some((d) => d.pageviews > 0 || d.uniqueUsers > 0)}
            >
              <ChartContainer config={trafficConfig} className="h-[250px] w-full">
                <AreaChart data={days} margin={{ left: 4, right: 4 }}>
                  <defs>
                    <linearGradient id="fillPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-pageviews)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-pageviews)" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="fillUu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-uniqueUsers)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="var(--color-uniqueUsers)" stopOpacity={0.05} />
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    dataKey="pageviews"
                    type="monotone"
                    stroke="var(--color-pageviews)"
                    fill="url(#fillPv)"
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="uniqueUsers"
                    type="monotone"
                    stroke="var(--color-uniqueUsers)"
                    fill="url(#fillUu)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </ChartCard>

            <ChartCard
              title="Assessment activity"
              description="Started vs completed vs purchased"
              isLoading={trends.isPending}
              isEmpty={!days.some((d) => d.assessmentsStarted > 0 || d.assessmentsCompleted > 0)}
            >
              <ChartContainer config={assessmentConfig} className="h-[250px] w-full">
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="assessmentsStarted"
                    fill="var(--color-assessmentsStarted)"
                    radius={2}
                  />
                  <Bar
                    dataKey="assessmentsCompleted"
                    fill="var(--color-assessmentsCompleted)"
                    radius={2}
                  />
                  <Bar dataKey="purchases" fill="var(--color-purchases)" radius={2} />
                </BarChart>
              </ChartContainer>
            </ChartCard>
          </div>

          {/* Conversion funnel */}
          <ChartCard
            title="Conversion funnel"
            description="Unique users reaching each step in the selected period"
            isLoading={funnel.isPending}
            isEmpty={funnelSteps.length === 0 || funnelSteps[0]?.count === 0}
          >
            <FunnelChart steps={funnelSteps} />
          </ChartCard>

          {/* Top pages + referrers */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="surface-raised rounded-2xl p-5">
              <p className="mb-4 text-sm font-medium text-foreground">Top pages</p>
              {pages.isPending ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6" />
                  ))}
                </div>
              ) : pageRows.length === 0 ? (
                <EmptyState title="No pageviews" />
              ) : (
                <ul className="space-y-2">
                  {pageRows.slice(0, 8).map((p) => (
                    <li key={p.path} className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-mono text-xs text-foreground">{p.path}</span>
                      <span className="shrink-0 text-muted-foreground">
                        {p.views.toLocaleString("en-IN")}{" "}
                        <span className="text-xs">({p.visitors} users)</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ChartCard
              title="Referrers"
              description="Where visitors come from"
              isLoading={referrers.isPending}
              isEmpty={referrerRows.length === 0}
            >
              <div className="flex items-center gap-4">
                <ChartContainer config={{}} className="h-[200px] w-[200px] shrink-0">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="referrer" />} />
                    <Pie
                      data={referrerRows.slice(0, 5)}
                      dataKey="visitors"
                      nameKey="referrer"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {referrerRows.slice(0, 5).map((_, i) => (
                        <Cell key={i} fill={REFERRER_COLORS[i % REFERRER_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <ul className="min-w-0 flex-1 space-y-1.5 text-sm">
                  {referrerRows.slice(0, 5).map((r, i) => (
                    <li key={r.referrer} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: REFERRER_COLORS[i % REFERRER_COLORS.length] }}
                      />
                      <span className="truncate text-foreground">
                        {r.referrer === "$direct" ? "Direct / none" : r.referrer}
                      </span>
                      <span className="ml-auto shrink-0 text-muted-foreground">{r.visitors}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ChartCard>
          </div>

          {/* Event breakdown */}
          <div className="surface-raised rounded-2xl p-5">
            <p className="mb-4 text-sm font-medium text-foreground">Event breakdown</p>
            {events.isPending ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6" />
                ))}
              </div>
            ) : eventRows.length === 0 ? (
              <EmptyState title="No events" />
            ) : (
              <ul className="space-y-2.5">
                {eventRows.map((e) => (
                  <li key={e.event} className="flex items-center gap-3 text-sm">
                    <span className="w-52 shrink-0 truncate font-mono text-xs text-foreground">
                      {e.event}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        className="block h-full rounded-full bg-primary/70"
                        style={{ width: `${(e.total / maxEventTotal) * 100}%` }}
                      />
                    </span>
                    <span className="w-24 shrink-0 text-right text-muted-foreground">
                      {e.total.toLocaleString("en-IN")}{" "}
                      <span className="text-xs">({e.uniqueUsers})</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Live activity feed */}
          <div className="surface-raised rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium text-foreground">Live activity</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Include pageviews
                <Switch checked={includePageviews} onCheckedChange={setIncludePageviews} />
              </label>
            </div>
            {feed.isError ? (
              <ErrorState message={feed.error?.message} onRetry={() => void feed.refetch()} />
            ) : (
              <ActivityTimeline
                events={feedEvents}
                isLoading={feed.isPending}
                showUser
                hasMore={feed.hasNextPage}
                isLoadingMore={feed.isFetchingNextPage}
                onLoadMore={() => void feed.fetchNextPage()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
