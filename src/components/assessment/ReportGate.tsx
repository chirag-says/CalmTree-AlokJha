/**
 * ReportGate
 *
 * Wraps the dimension-breakdown / profile-detail section in all three result views.
 *
 * States:
 *   1. No user → inline EmailGateForm ("Enter email to see your full breakdown")
 *   2. Logged in, assessment tier not unlocked → upsell card + Razorpay button
 *   3. Unlocked → renders {children} (existing breakdown UI unchanged)
 *
 * After OTP verification a useEffect claims any stashed result.
 * The free teaser (archetype label + one-line interpretation + gauge) is always
 * visible — that lives *above* this gate in the result view, not inside it.
 */

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import { EmailGateForm } from "@/components/auth/EmailGateForm";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnyAssessmentConfig } from "@/data/assessments";

interface ReportGateProps {
  config: AnyAssessmentConfig;
  children: React.ReactNode;
}

export function ReportGate({ config, children }: ReportGateProps) {
  const { user } = useAuth();
  const { hasAccess, loading, reason } = useEntitlement(config);
  const { claimStashed } = useResultPersistence();
  const [justVerified, setJustVerified] = useState(false);

  // After OTP verification, user changes from null → User.
  // Claim any stashed result and re-render with the fresh session.
  useEffect(() => {
    if (user && justVerified) {
      void claimStashed();
      setJustVerified(false);
    }
  }, [user, justVerified, claimStashed]);

  // Still resolving — render nothing rather than flashing the gate
  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
        Loading…
      </div>
    );
  }

  // Unlocked (or free assessment for a logged-in user) — show the real UI
  if (hasAccess) {
    return <>{children}</>;
  }

  // Free assessment, no user → email gate
  if (!user && reason === null) {
    // Free assessment: no login needed for the teaser, but email unlocks the breakdown
    return (
      <EmailGateForm
        onSuccess={() => setJustVerified(true)}
        prompt="Enter your email to unlock the dimension-by-dimension analysis — free, always."
      />
    );
  }

  // Not logged in, paid assessment (shouldn't normally hit — login-required)
  if (!user && reason === "login-required") {
    return (
      <EmailGateForm
        onSuccess={() => setJustVerified(true)}
        prompt="Sign in with your email to continue."
      />
    );
  }

  // Logged in, but needs an upgrade (paid tier)
  if (reason === "upgrade-required") {
    return <UpgradeGate config={config} />;
  }

  // Fallback — should not be reached, but render nothing rather than crashing
  return null;
}

// ─── Upsell card ─────────────────────────────────────────────────────────────

import { TIER_INFO } from "@/data/assessments";
import { RazorpayCheckoutButton } from "@/components/payments/RazorpayCheckoutButton";

function UpgradeGate({ config }: { config: AnyAssessmentConfig }) {
  const tier = config.tier;
  const tierInfo = TIER_INFO[tier];

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 md:p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="h-5 w-5 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Unlock the Full Report</h3>
      <p className="text-sm text-muted-foreground mb-1">
        The dimension breakdown is part of the <strong>{tierInfo.label}</strong> tier.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        One purchase unlocks all <strong>{config.meta.productCategory}</strong> assessments.
      </p>

      <RazorpayCheckoutButton
        productType="assessment_category"
        tier={tier as "growth" | "professional"}
        productCategory={config.meta.productCategory}
        label={`Unlock for ${tierInfo.price}`}
        size="lg"
        className="gap-2"
        onSuccess={() => {
          // Optimistic — the page will re-check entitlements on next render
          // after the webhook delivers. For now invalidateEntitlementCache is
          // called inside RazorpayCheckoutButton already.
        }}
      />

      <p className="text-xs text-muted-foreground mt-4">
        Secure payment via Razorpay · Instant access · No subscription
      </p>
    </div>
  );
}
