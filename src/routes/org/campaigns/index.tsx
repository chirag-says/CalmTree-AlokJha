/**
 * /org/campaigns/ — campaign list page.
 * Shows all campaigns for the current org with status, invited/completed counts.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Plus, Megaphone } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { listCampaigns } from "@/server/functions/campaigns.functions";
import { CampaignStatusBadge } from "@/routes/org/index";
import { extractOrg, type GetMyOrgsResult, type ListCampaignsResult } from "@/types/org-types";

export const Route = createFileRoute("/org/campaigns/")({
  component: CampaignListPage,
  head: () => ({
    meta: [{ title: "Campaigns | CalmTree Enterprise" }],
  }),
});

function CampaignListPage() {
  const { session } = useAuth();

  const orgsQuery = useQuery<GetMyOrgsResult>({ queryKey: ["org", "myOrgs"], enabled: false });
  const { org } = extractOrg(orgsQuery.data, Route.useSearch().orgId);

  const {
    data: result,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["org", "campaigns", org?.id],
    queryFn: () => listCampaigns({ data: { accessToken: session!.access_token, orgId: org!.id } }),
    enabled: !!session && !!org,
    staleTime: 15_000,
  });

  const cResult = result as ListCampaignsResult | undefined;
  const campaigns = cResult && "campaigns" in cResult ? cResult.campaigns : [];
  const hasError = queryError || (cResult && "error" in cResult);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage assessment campaigns for your team.
          </p>
        </div>
        <Link
          to="/org/campaigns/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* Error */}
      {hasError && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">
            {cResult && "error" in cResult ? cResult.error : "Failed to load campaigns."}
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !hasError && campaigns.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Megaphone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No campaigns yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
            Create your first campaign to send an assessment to your team and start gathering
            insights.
          </p>
          <Link
            to="/org/campaigns/new"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create your first campaign
          </Link>
        </div>
      )}

      {/* Campaign list */}
      {campaigns.length > 0 && (
        <div className="space-y-3">
          {campaigns.map((c) => (
            <Link
              key={c.id}
              to="/org/campaigns/$campaignId"
              params={{ campaignId: c.id }}
              className="block rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {c.title}
                    </h3>
                    <CampaignStatusBadge status={c.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Assessment: {c.assessment_slug}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{c.invited} invited</span>
                    <span>{c.completed} completed</span>
                    {c.invited > 0 && (
                      <span className="text-primary font-medium">
                        {Math.round((c.completed / c.invited) * 100)}% response rate
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {c.launched_at && (
                    <p className="text-xs text-muted-foreground">
                      Launched{" "}
                      {new Date(c.launched_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
                  {c.closes_at && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Closes{" "}
                      {new Date(c.closes_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {c.invited > 0 && (
                <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.round((c.completed / c.invited) * 100)}%` }}
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
