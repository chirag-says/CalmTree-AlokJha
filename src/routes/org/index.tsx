/**
 * /org/ — Org dashboard home.
 *
 * Shows org overview: name, role, credit balance, quick stats, and recent
 * campaigns. The heavy lifting (org loading) is done in the parent layout
 * route; this page reads from the same react-query cache.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  Megaphone,
  CreditCard,
  Plus,
  ArrowRight,
  Users,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { listCampaigns } from "@/server/functions/campaigns.functions";
import { extractOrg, type GetMyOrgsResult, type ListCampaignsResult } from "@/types/org-types";

export const Route = createFileRoute("/org/")({
  component: OrgHome,
  head: () => ({
    meta: [{ title: "Organization Dashboard | CalmTree" }],
  }),
});

function OrgHome() {
  const { session } = useAuth();

  const orgsQuery = useQuery<GetMyOrgsResult>({
    queryKey: ["org", "myOrgs"],
    enabled: false,
  });

  const { org } = extractOrg(orgsQuery.data, Route.useSearch().orgId);

  const campaignsQuery = useQuery({
    queryKey: ["org", "campaigns", org?.id],
    queryFn: () => listCampaigns({ data: { accessToken: session!.access_token, orgId: org!.id } }),
    enabled: !!session && !!org,
    staleTime: 15_000,
  });

  if (!org) return null;

  const cResult = campaignsQuery.data as ListCampaignsResult | undefined;
  const campaigns = cResult && "campaigns" in cResult ? cResult.campaigns : [];

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const totalInvited = campaigns.reduce((sum, c) => sum + c.invited, 0);
  const totalCompleted = campaigns.reduce((sum, c) => sum + c.completed, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{org.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground capitalize">Your role: {org.role}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<CreditCard className="h-5 w-5 text-emerald-600" />}
          label="Credits Available"
          value={org.creditBalance.toLocaleString()}
          href="/org/credits"
        />
        <StatCard
          icon={<Megaphone className="h-5 w-5 text-blue-600" />}
          label="Active Campaigns"
          value={activeCampaigns.length.toString()}
          href="/org/campaigns"
        />
        <StatCard
          icon={<Users className="h-5 w-5 text-purple-600" />}
          label="Total Invited"
          value={totalInvited.toLocaleString()}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
          label="Total Completed"
          value={totalCompleted.toLocaleString()}
        />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          to="/org/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Link>
        <Link
          to="/org/campaigns"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <Megaphone className="h-4 w-4" />
          All Campaigns
        </Link>
        <Link
          to="/org/credits"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          <CreditCard className="h-4 w-4" />
          Credit History
        </Link>
      </div>

      {/* Recent campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Campaigns</h2>
          {campaigns.length > 3 && (
            <Link
              to="/org/campaigns"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {campaignsQuery.isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <TrendingUp className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No campaigns yet. Create your first campaign to get started.
            </p>
            <Link
              to="/org/campaigns/new"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              Create campaign
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                to="/org/campaigns/$campaignId"
                params={{ campaignId: c.id }}
                className="block rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {c.assessment_slug} · {c.invited} invited · {c.completed} completed
                    </p>
                  </div>
                  <CampaignStatusBadge status={c.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }
  return content;
}

export function CampaignStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700 border-gray-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status] ?? variants.draft}`}
    >
      {status}
    </span>
  );
}
