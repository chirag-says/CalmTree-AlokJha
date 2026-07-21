/**
 * /org/campaigns/$campaignId — campaign detail page.
 *
 * Shows:
 *   - Campaign metadata + status
 *   - Per-invitation status funnel (getCampaign)
 *   - Aggregate report (getCampaignReport) — PRIVACY GATED:
 *     * aggregateLocked = true → "Need N responses to protect anonymity"
 *     * individualsUnlocked = true → show individual results table
 *   - Close campaign + send reminders actions
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft,
  XCircle,
  Bell,
  Shield,
  Lock,
  BarChart3,
  Users,
  Mail,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Link2,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getCampaign,
  getCampaignReport,
  closeCampaign,
  sendReminders,
  getInviteLinks,
} from "@/server/functions/campaigns.functions";
import { CampaignStatusBadge } from "@/routes/org/index";
import { toast } from "sonner";

export const Route = createFileRoute("/org/campaigns/$campaignId")({
  component: CampaignDetailPage,
  head: () => ({
    meta: [{ title: "Campaign Detail | Calmtree Enterprise" }],
  }),
});

function CampaignDetailPage() {
  const { session } = useAuth();
  const { campaignId } = Route.useParams();
  const queryClient = useQueryClient();
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [inviteLinks, setInviteLinks] = useState<{ email: string; link: string }[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Campaign detail (metadata + invitation list)
  const detailQuery = useQuery({
    queryKey: ["org", "campaign", campaignId],
    queryFn: () => getCampaign({ data: { accessToken: session!.access_token, campaignId } }),
    enabled: !!session,
    staleTime: 10_000,
  });

  // Campaign report (aggregate + privacy flags)
  const reportQuery = useQuery({
    queryKey: ["org", "campaignReport", campaignId],
    queryFn: () => getCampaignReport({ data: { accessToken: session!.access_token, campaignId } }),
    enabled: !!session,
    staleTime: 10_000,
  });

  // Close mutation
  const closeMutation = useMutation({
    mutationFn: () => closeCampaign({ data: { accessToken: session!.access_token, campaignId } }),
    onSuccess: (result) => {
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if ("closed" in result) {
        toast.success(`Campaign closed. ${result.refunded} credit(s) refunded.`);
        queryClient.invalidateQueries({ queryKey: ["org"] });
        setShowCloseConfirm(false);
      }
    },
    onError: () => toast.error("Failed to close campaign."),
  });

  // Get invite links mutation
  const getLinksMutation = useMutation({
    mutationFn: () => getInviteLinks({ data: { accessToken: session!.access_token, campaignId } }),
    onSuccess: (result) => {
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if (result.links.length === 0) {
        toast.info("No pending invitations — everyone has already completed the assessment.");
        return;
      }
      setInviteLinks(result.links);
      setShowLinks(true);
      setCopiedIdx(null);
    },
    onError: () => toast.error("Failed to generate invite links."),
  });

  // Reminders mutation
  const reminderMutation = useMutation({
    mutationFn: () => sendReminders({ data: { accessToken: session!.access_token, campaignId } }),
    onSuccess: (result) => {
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if ("reminded" in result) {
        toast.success(`Reminders sent to ${result.reminded} people.`);
        queryClient.invalidateQueries({ queryKey: ["org", "campaign", campaignId] });
      }
    },
    onError: () => toast.error("Failed to send reminders."),
  });

  // Loading
  if (detailQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Error
  const detail = detailQuery.data;
  if (!detail || "error" in detail) {
    return (
      <div className="max-w-2xl">
        <Link
          to="/org/campaigns"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to campaigns
        </Link>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">
            {detail && "error" in detail ? detail.error : "Campaign not found."}
          </p>
        </div>
      </div>
    );
  }

  const { campaign, invitations } = detail;
  const report = reportQuery.data;

  return (
    <div>
      {/* Back + header */}
      <Link
        to="/org/campaigns"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to campaigns
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{campaign.title}</h1>
            <CampaignStatusBadge status={campaign.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Assessment: {campaign.assessment_slug}
          </p>
          {campaign.launched_at && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Launched{" "}
              {new Date(campaign.launched_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Actions */}
        {campaign.status === "active" && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setShowLinks(false);
                getLinksMutation.mutate();
              }}
              disabled={getLinksMutation.isPending}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-input bg-background text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              {getLinksMutation.isPending ? (
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
              Get Links
            </button>
            <button
              onClick={() => reminderMutation.mutate()}
              disabled={reminderMutation.isPending}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-input bg-background text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              {reminderMutation.isPending ? (
                <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              ) : (
                <Bell className="h-4 w-4" />
              )}
              Send Reminders
            </button>
            <button
              onClick={() => setShowCloseConfirm(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/5 transition-colors"
            >
              <XCircle className="h-4 w-4" />
              Close Campaign
            </button>
          </div>
        )}
      </div>

      {/* Close confirmation */}
      {showCloseConfirm && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-amber-900">Close this campaign?</h3>
              <p className="text-sm text-amber-800 mt-1">
                This will expire all pending invitations and refund unused credits. Completed
                responses are preserved.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => closeMutation.mutate()}
                  disabled={closeMutation.isPending}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 disabled:opacity-50"
                >
                  {closeMutation.isPending ? "Closing..." : "Yes, close campaign"}
                </button>
                <button
                  onClick={() => setShowCloseConfirm(false)}
                  className="px-3.5 py-2 rounded-lg border border-amber-300 text-sm text-amber-800 hover:bg-amber-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite links panel */}
      {showLinks && inviteLinks.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Invite Links
            </h3>
            <button
              onClick={() => setShowLinks(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Dismiss
            </button>
          </div>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
            These links are freshly generated. Any previously sent links for the same people are now
            invalid. Share each link only with the person it's addressed to.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Email</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {inviteLinks.map((l, idx) => (
                  <tr key={idx} className="border-t border-border/50">
                    <td className="py-2 px-3 text-foreground">{l.email}</td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(l.link);
                          setCopiedIdx(idx);
                          setTimeout(() => setCopiedIdx(null), 2000);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy link
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status funnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Invitation status breakdown */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-4 w-4" /> Invitation Status
          </h2>
          <FunnelTable invitations={invitations} />
        </div>

        {/* Report summary */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Report
          </h2>
          <ReportSummary report={report} isLoading={reportQuery.isLoading} />
        </div>
      </div>

      {/* Detailed report */}
      {report && !("error" in report) && !report.aggregateLocked && (
        <DetailedReport report={report} />
      )}

      {/* Invitation table */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Mail className="h-4 w-4" /> All Invitations ({invitations.length})
        </h2>
        <InvitationTable invitations={invitations} />
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FunnelTable({ invitations }: { invitations: { status: string }[] }) {
  const counts: Record<string, number> = {};
  for (const inv of invitations) {
    counts[inv.status] = (counts[inv.status] ?? 0) + 1;
  }
  const total = invitations.length;

  const statuses = [
    { key: "pending", label: "Pending", icon: Clock, color: "text-gray-500" },
    { key: "sent", label: "Sent", icon: Mail, color: "text-blue-500" },
    { key: "opened", label: "Opened", icon: Mail, color: "text-purple-500" },
    { key: "completed", label: "Completed", icon: CheckCircle2, color: "text-green-500" },
    { key: "expired", label: "Expired", icon: XCircle, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-2">
      {statuses.map(({ key, label, icon: Icon, color }) => {
        const count = counts[key] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={key} className="flex items-center gap-3">
            <Icon className={`h-4 w-4 shrink-0 ${color}`} />
            <span className="text-sm text-foreground w-24">{label}</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary/60 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
          </div>
        );
      })}
      <p className="text-xs text-muted-foreground pt-1">Total: {total}</p>
    </div>
  );
}

function ReportSummary({ report, isLoading }: { report: unknown; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!report || (typeof report === "object" && report !== null && "error" in report)) {
    return <p className="text-sm text-muted-foreground">Report data not available.</p>;
  }

  const r = report as Record<string, unknown>;

  // PRIVACY: aggregateLocked — show privacy message
  if (r.aggregateLocked) {
    const minGroupSize = (r.minGroupSize as number) ?? 5;
    const completed = (r.completed as number) ?? 0;
    const needed = minGroupSize - completed;
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center mb-3">
          <Shield className="h-6 w-6 text-amber-600" />
        </div>
        <p className="text-sm font-medium text-foreground">Protecting anonymity</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          Need {needed} more completed response{needed !== 1 ? "s" : ""} to show aggregate results
          (minimum group size: {minGroupSize}).
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {completed} of {minGroupSize} completed
        </p>
      </div>
    );
  }

  // Unlocked aggregate
  const avgPct = r.avgPercentage as number | null;
  const completed = r.completed as number;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Completed responses</span>
        <span className="text-sm font-medium">{completed}</span>
      </div>
      {avgPct !== null && avgPct !== undefined && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Average score</span>
          <span className="text-sm font-semibold text-primary">{avgPct}%</span>
        </div>
      )}
      {!!r.labelDistribution &&
        Object.keys(r.labelDistribution as Record<string, number>).length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Distribution</p>
            {Object.entries(r.labelDistribution as Record<string, number>).map(([label, count]) => (
              <div key={label} className="flex items-center justify-between text-sm py-0.5">
                <span className="text-foreground">{label}</span>
                <span className="text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

function DetailedReport({ report }: { report: Record<string, unknown> }) {
  const dimensionAverages = report.dimensionAverages as
    | { dimensionId: string; label: string; averagePercentage: number }[]
    | undefined;
  const individualsUnlocked = report.individualsUnlocked as boolean;
  const individuals = report.individuals as
    | { email: string; primaryLabel: string | null; percentage: number | null }[]
    | undefined;

  return (
    <div className="space-y-6">
      {/* Dimension averages */}
      {dimensionAverages && dimensionAverages.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Dimension Averages</h3>
          <div className="space-y-3">
            {dimensionAverages.map((d) => (
              <div key={d.dimensionId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{d.label}</span>
                  <span className="text-sm font-medium text-primary">{d.averagePercentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${d.averagePercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual results — ONLY when unlocked */}
      {individualsUnlocked && individuals && individuals.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            Individual Results
            <span className="inline-flex items-center gap-1 text-xs font-normal text-emerald-600">
              <Lock className="h-3 w-3" /> Unlocked
            </span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Email</th>
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Result</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {individuals.map((ind, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2 pr-4 text-foreground">{ind.email}</td>
                    <td className="py-2 pr-4 text-foreground">{ind.primaryLabel ?? "—"}</td>
                    <td className="py-2 text-right text-foreground">
                      {ind.percentage !== null ? `${ind.percentage}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* If not unlocked, show locked message */}
      {!individualsUnlocked && (
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <Lock className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Individual results are not enabled for this organization.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Contact Calmtree to enable individual-level reporting.
          </p>
        </div>
      )}
    </div>
  );
}

function InvitationTable({
  invitations,
}: {
  invitations: {
    id: string;
    email: string;
    status: string;
    sent_at: string | null;
    opened_at: string | null;
    completed_at: string | null;
  }[];
}) {
  if (invitations.length === 0) {
    return <p className="text-sm text-muted-foreground">No invitations yet.</p>;
  }

  const statusColor: Record<string, string> = {
    pending: "text-gray-500",
    sent: "text-blue-600",
    opened: "text-purple-600",
    completed: "text-green-600",
    expired: "text-amber-600",
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Email</th>
            <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Status</th>
            <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Sent</th>
            <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Completed</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((inv) => (
            <tr key={inv.id} className="border-t border-border/50">
              <td className="py-2.5 px-4 text-foreground">{inv.email}</td>
              <td className={`py-2.5 px-4 font-medium capitalize ${statusColor[inv.status] ?? ""}`}>
                {inv.status}
              </td>
              <td className="py-2.5 px-4 text-muted-foreground">
                {inv.sent_at
                  ? new Date(inv.sent_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })
                  : "—"}
              </td>
              <td className="py-2.5 px-4 text-muted-foreground">
                {inv.completed_at
                  ? new Date(inv.completed_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
