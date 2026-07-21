/**
 * /org/campaigns/new — create + launch a campaign.
 *
 * Two-step flow:
 *   1. Create a draft campaign (pick assessment, title, optional close date).
 *   2. Add employee emails + launch (with pre-launch credit check).
 *
 * The assessment picker uses B2B_CATALOG derived from the live registry.
 */

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Rocket,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { createCampaign, launchCampaign } from "@/server/functions/campaigns.functions";
import { B2B_CATALOG } from "@/data/b2b-assessment-catalog";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extractOrg, type GetMyOrgsResult } from "@/types/org-types";

export const Route = createFileRoute("/org/campaigns/new")({
  component: NewCampaignPage,
  head: () => ({
    meta: [{ title: "New Campaign | Calmtree Enterprise" }],
  }),
});

function NewCampaignPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get org from parent
  const orgsQuery = useQuery<GetMyOrgsResult>({ queryKey: ["org", "myOrgs"], enabled: false });
  const { org } = extractOrg(orgsQuery.data, Route.useSearch().orgId);

  // Form state
  const [step, setStep] = useState<"create" | "launch" | "links">("create");
  const [assessmentSlug, setAssessmentSlug] = useState("");
  const [title, setTitle] = useState("");
  const [closesAt, setClosesAt] = useState("");
  const [emailsText, setEmailsText] = useState("");
  const [draftCampaignId, setDraftCampaignId] = useState<string | null>(null);
  const [launchedLinks, setLaunchedLinks] = useState<{ email: string; link: string }[]>([]);
  const [emailsSentCount, setEmailsSentCount] = useState(0);
  const [emailsSkippedCount, setEmailsSkippedCount] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyLink = useCallback(async (link: string, idx: number) => {
    await navigator.clipboard.writeText(link);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }, []);

  // Group assessments by category for the picker
  const grouped = useMemo(() => {
    const groups: Record<string, { slug: string; title: string }[]> = {};
    for (const a of B2B_CATALOG) {
      if (!groups[a.category]) groups[a.category] = [];
      groups[a.category].push({ slug: a.slug, title: a.title });
    }
    return groups;
  }, []);

  // Auto-fill title when assessment is selected
  const selectedAssessment = B2B_CATALOG.find((a) => a.slug === assessmentSlug);

  // Parse emails
  const parsedEmails = useMemo(() => {
    return emailsText
      .split(/[\n,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
  }, [emailsText]);
  const uniqueEmails = useMemo(() => Array.from(new Set(parsedEmails)), [parsedEmails]);

  // Credit check
  const creditsNeeded = uniqueEmails.length;
  const creditsAvailable = org?.creditBalance ?? 0;
  const hasEnoughCredits = creditsAvailable >= creditsNeeded;

  // Create draft mutation
  const createMutation = useMutation({
    mutationFn: () =>
      createCampaign({
        data: {
          accessToken: session!.access_token,
          orgId: org!.id,
          assessmentSlug,
          title: title || selectedAssessment?.title || assessmentSlug,
          closesAt: closesAt ? new Date(closesAt).toISOString() : null,
        },
      }),
    onSuccess: (result) => {
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if ("campaignId" in result) {
        setDraftCampaignId(result.campaignId);
        setStep("launch");
        toast.success("Campaign created. Add emails and launch.");
      }
    },
    onError: () => toast.error("Failed to create campaign."),
  });

  // Launch mutation
  const launchMutation = useMutation({
    mutationFn: () =>
      launchCampaign({
        data: {
          accessToken: session!.access_token,
          campaignId: draftCampaignId!,
          emails: uniqueEmails,
        },
      }),
    onSuccess: (result) => {
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      if ("launched" in result) {
        queryClient.invalidateQueries({ queryKey: ["org"] });
        setEmailsSentCount(result.emailsSent);
        setEmailsSkippedCount(result.emailsSkipped);
        setLaunchedLinks(result.links ?? []);
        setStep("links");
      }
    },
    onError: () => toast.error("Failed to launch campaign."),
  });

  if (!org) return null;

  return (
    <div className="max-w-2xl">
      {/* Back link — hidden on the links step (we show a "View Campaign" button instead) */}
      {step !== "links" && (
        <Link
          to="/org/campaigns"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to campaigns
        </Link>
      )}

      <h1 className="text-2xl font-bold text-foreground mb-6">
        {step === "create"
          ? "Create a Campaign"
          : step === "launch"
            ? "Launch Campaign"
            : "Campaign Live"}
      </h1>

      {step === "create" && (
        <div className="space-y-5">
          {/* Assessment picker */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Assessment *</label>
            <Select
              value={assessmentSlug}
              onValueChange={(v) => {
                setAssessmentSlug(v);
                const found = B2B_CATALOG.find((a) => a.slug === v);
                if (found && !title) setTitle(found.title);
              }}
            >
              <SelectTrigger id="assessment-picker" className="w-full">
                <SelectValue placeholder="Select an assessment" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(grouped).map(([category, items]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>{category}</SelectLabel>
                    {items.map((a) => (
                      <SelectItem key={a.slug} value={a.slug}>
                        {a.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Campaign Title *
            </label>
            <input
              id="campaign-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q3 Team Burnout Check"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Close date (optional) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Close Date <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              id="campaign-close-date"
              type="date"
              value={closesAt}
              onChange={(e) => setClosesAt(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              If set, invitations will expire on this date when the campaign is closed.
            </p>
          </div>

          <button
            onClick={() => createMutation.mutate()}
            disabled={!assessmentSlug || !title || createMutation.isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createMutation.isPending ? (
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              "Continue to Launch"
            )}
          </button>
        </div>
      )}

      {step === "links" && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-emerald-900">Campaign launched successfully!</p>
                {emailsSentCount > 0 && (
                  <p className="text-emerald-800 mt-0.5">
                    {emailsSentCount} invite email{emailsSentCount !== 1 ? "s" : ""} sent.
                  </p>
                )}
                {emailsSkippedCount > 0 && (
                  <p className="text-amber-800 mt-0.5">
                    {emailsSkippedCount} email{emailsSkippedCount !== 1 ? "s" : ""} could not be
                    sent (email service not configured). Share the links below directly with your
                    team.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Links table */}
          {launchedLinks.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-2">
                Invite Links{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  — each link is unique to one person
                </span>
              </h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">
                        Email
                      </th>
                      <th className="text-right py-2.5 px-4 text-muted-foreground font-medium">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {launchedLinks.map((l, idx) => (
                      <tr key={idx} className="border-t border-border/50">
                        <td className="py-2.5 px-4 text-foreground">{l.email}</td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            onClick={() => copyLink(l.link, idx)}
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
              <p className="mt-2 text-xs text-muted-foreground">
                These links are shown once. The campaign detail page has a "Get Links" button if you
                need new ones later (this will invalidate these links).
              </p>
            </div>
          )}

          <button
            onClick={() =>
              navigate({
                to: "/org/campaigns/$campaignId",
                params: { campaignId: draftCampaignId! },
              })
            }
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Campaign
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "launch" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm">
              <span className="font-medium">Assessment:</span>{" "}
              {selectedAssessment?.title ?? assessmentSlug}
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Title:</span> {title}
            </p>
            {closesAt && (
              <p className="text-sm mt-1">
                <span className="font-medium">Closes:</span>{" "}
                {new Date(closesAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>

          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Employee Emails *
            </label>
            <textarea
              id="campaign-emails"
              value={emailsText}
              onChange={(e) => setEmailsText(e.target.value)}
              rows={6}
              placeholder="Paste email addresses, one per line (or comma/semicolon separated)"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {uniqueEmails.length} unique valid email{uniqueEmails.length !== 1 ? "s" : ""}{" "}
              detected
            </p>
          </div>

          {/* Credit check */}
          {uniqueEmails.length > 0 && (
            <div
              className={`rounded-xl border p-4 ${
                hasEnoughCredits ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {hasEnoughCredits ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <p className={hasEnoughCredits ? "text-emerald-800" : "text-red-800"}>
                    <strong>Cost:</strong> {creditsNeeded} credit{creditsNeeded !== 1 ? "s" : ""} (1
                    per invite)
                  </p>
                  <p className={`mt-0.5 ${hasEnoughCredits ? "text-emerald-700" : "text-red-700"}`}>
                    <strong>Available:</strong> {creditsAvailable.toLocaleString()} credits
                  </p>
                  {!hasEnoughCredits && (
                    <p className="mt-1 text-red-700 font-medium">
                      Not enough credits. You need {creditsNeeded - creditsAvailable} more. Contact
                      your admin to purchase credits.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep("create")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-input bg-background text-sm font-medium hover:bg-accent transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => launchMutation.mutate()}
              disabled={uniqueEmails.length === 0 || !hasEnoughCredits || launchMutation.isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {launchMutation.isPending ? (
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <Rocket className="h-4 w-4" />
                  Launch Campaign ({creditsNeeded} credits)
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
