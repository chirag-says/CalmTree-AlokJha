/**
 * ReportGate
 *
 * Wraps the dimension-breakdown / profile-detail section in all three result views.
 *
 * States:
 *   1. No user → inline EmailGateForm ("Enter email to see your full breakdown")
 *   2. Logged in, assessment tier not unlocked → CategoryUnlockCard (defensive —
 *      AssessmentRunner already blocks starting a paid assessment before purchase,
 *      so this normally only matters for free-tier's post-completion email gate)
 *   3. Unlocked → renders {children} (existing breakdown UI unchanged)
 *
 * After OTP verification a useEffect claims any stashed result.
 * The free teaser (archetype label + one-line interpretation + gauge) is always
 * visible for Discovery-tier assessments — that lives *above* this gate in the
 * result view, not inside it.
 */

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import { EmailGateForm } from "@/components/auth/EmailGateForm";
import { CategoryUnlockCard } from "./CategoryUnlockCard";
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

  // Logged in, but needs an upgrade (paid tier). In normal use AssessmentRunner
  // already blocks starting a paid assessment before an entitlement exists, so
  // this is a defensive fallback (e.g. an entitlement lost between start and
  // finish) rather than the primary gate.
  if (reason === "upgrade-required") {
    return <CategoryUnlockCard config={config} reason="upgrade-required" />;
  }

  // Fallback — should not be reached, but render nothing rather than crashing
  return null;
}
