/**
 * /org/credits — credit ledger page.
 * Shows the org's credit balance and transaction history.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CreditCard, ArrowUpCircle, ArrowDownCircle, RefreshCw, Minus, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getOrgLedger } from "@/server/functions/org.functions";
import { extractOrg, type GetMyOrgsResult, type GetOrgLedgerResult } from "@/types/org-types";
import { CREDIT_PACKS, perCreditInr } from "@/data/credit-packs";
import { RazorpayCheckoutButton } from "@/components/payments/RazorpayCheckoutButton";

export const Route = createFileRoute("/org/credits")({
  component: CreditsPage,
  head: () => ({
    meta: [{ title: "Credits | Calmtree Enterprise" }],
  }),
});

function CreditsPage() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  // Get org from parent
  const orgsQuery = useQuery<GetMyOrgsResult>({ queryKey: ["org", "myOrgs"], enabled: false });
  const { org } = extractOrg(orgsQuery.data, Route.useSearch().orgId);

  const {
    data: result,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["org", "ledger", org?.id],
    queryFn: () => getOrgLedger({ data: { accessToken: session!.access_token, orgId: org!.id } }),
    enabled: !!session && !!org,
    staleTime: 15_000,
  });

  if (!org) return null;

  const lResult = result as GetOrgLedgerResult | undefined;
  const entries = lResult && "entries" in lResult ? lResult.entries : [];
  const balance = lResult && "balance" in lResult ? lResult.balance : org.creditBalance;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Credits</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Credit balance and transaction history for {org.name}.
        </p>
      </div>

      {/* Balance card */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Available Balance
            </p>
            <p className="text-3xl font-bold text-foreground">{balance.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Credits are used when launching campaigns (1 credit per invitation). Unused credits are
          refunded when a campaign is closed.
        </p>
      </div>

      {/* Buy credits — owner/admin only (server also enforces this) */}
      {(org.role === "owner" || org.role === "admin") && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-1">Buy Credits</h2>
          <p className="text-sm text-muted-foreground mb-4">
            One credit sends one assessment to one employee. Credits never expire.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {CREDIT_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`relative rounded-xl border bg-card p-5 flex flex-col ${
                  pack.popular ? "border-primary shadow-sm" : "border-border"
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-2.5 left-5 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground">
                    Most popular
                  </span>
                )}
                <p className="text-sm font-semibold text-foreground">{pack.label}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{pack.credits}</span>
                  <span className="text-sm text-muted-foreground">credits</span>
                </div>
                <p className="mt-1 text-sm text-foreground">
                  ₹{pack.priceInr.toLocaleString()}{" "}
                  <span className="text-xs text-muted-foreground">
                    (₹{perCreditInr(pack)}/credit)
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground flex-1">{pack.blurb}</p>
                <RazorpayCheckoutButton
                  productType="credit_pack"
                  packId={pack.id}
                  orgId={org.id}
                  label={`Buy ${pack.credits} credits`}
                  size="sm"
                  className="mt-4 w-full"
                  onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ["org"] });
                  }}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            Secure payment via Razorpay. Credits are added to your balance instantly.
          </p>
        </div>
      )}

      {/* Transaction history */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Transaction History</h2>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        {/* Error */}
        {(queryError || (result && "error" in result)) && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">
              {result && "error" in result ? result.error : "Failed to load credit history."}
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !queryError && entries.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <CreditCard className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No credit transactions yet.</p>
          </div>
        )}

        {/* Ledger table */}
        {entries.length > 0 && (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-2.5 px-4 text-muted-foreground font-medium">Note</th>
                  <th className="text-right py-2.5 px-4 text-muted-foreground font-medium">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const isPositive = entry.delta > 0;
                  return (
                    <tr key={entry.id} className="border-t border-border/50">
                      <td className="py-2.5 px-4 text-muted-foreground whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="inline-flex items-center gap-1.5">
                          <ReasonIcon reason={entry.reason} delta={entry.delta} />
                          <span className="text-foreground capitalize">
                            {formatReason(entry.reason)}
                          </span>
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-muted-foreground max-w-xs truncate">
                        {entry.note || "—"}
                      </td>
                      <td
                        className={`py-2.5 px-4 text-right font-semibold whitespace-nowrap ${
                          isPositive ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {entry.delta}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ReasonIcon({ reason, delta }: { reason: string; delta: number }) {
  if (reason === "grant") return <ArrowUpCircle className="h-4 w-4 text-emerald-500" />;
  if (reason === "expiry_refund") return <RefreshCw className="h-4 w-4 text-blue-500" />;
  if (reason === "campaign_send") return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
  if (delta > 0) return <ArrowUpCircle className="h-4 w-4 text-emerald-500" />;
  if (delta < 0) return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-gray-400" />;
}

function formatReason(reason: string): string {
  const map: Record<string, string> = {
    grant: "Credit Grant",
    campaign_send: "Campaign Launch",
    expiry_refund: "Expiry Refund",
    adjustment: "Adjustment",
  };
  return map[reason] ?? reason;
}
