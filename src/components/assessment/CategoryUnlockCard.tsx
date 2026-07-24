/**
 * CategoryUnlockCard — the paid-tier gate.
 *
 * Growth/Professional assessments require owning their category before you
 * can take them at all — not just to see the deep breakdown afterward. This
 * renders on the AssessmentRunner start screen (the primary gate) and
 * defensively inside ReportGate around the dimension breakdown (in case
 * access is ever lost between starting and finishing).
 *
 * One purchase (category-pricing.ts) unlocks every assessment in that
 * category, current and future — never a per-assessment charge.
 */

import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryPrice } from "@/data/category-pricing";
import { RazorpayCheckoutButton } from "@/components/payments/RazorpayCheckoutButton";
import type { AnyAssessmentConfig } from "@/data/assessments";

interface CategoryUnlockCardProps {
  config: AnyAssessmentConfig;
  reason: "login-required" | "upgrade-required" | null;
}

export function CategoryUnlockCard({ config, reason }: CategoryUnlockCardProps) {
  const category = config.meta.productCategory;

  if (reason === "login-required") {
    return (
      <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 md:p-8 text-center">
        <GateIcon />
        <h3 className="text-xl font-semibold mb-2">Sign in to continue</h3>
        <p className="text-sm text-muted-foreground mb-6">
          This is a {config.tier === "professional" ? "Professional" : "Growth"} assessment — sign
          in (it's free) to see pricing and unlock it.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link
            to="/login"
            search={{
              redirect: typeof window !== "undefined" ? window.location.pathname : "/assessments",
            }}
          >
            Log in
          </Link>
        </Button>
      </div>
    );
  }

  const price = getCategoryPrice(category);

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-primary/[0.03] p-6 md:p-8 text-center">
      <GateIcon />
      <h3 className="text-xl font-semibold mb-2">Unlock this assessment</h3>
      <p className="text-sm text-muted-foreground mb-6">
        One purchase unlocks every <strong>{category}</strong> assessment — this one and every
        other, current and future. No paying per assessment.
      </p>

      {price !== null ? (
        <RazorpayCheckoutButton
          productType="assessment_category"
          productCategory={category}
          label={`Unlock ${category} — ₹${price}`}
          size="lg"
          className="gap-2"
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          This category isn't available for purchase right now.
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        Secure payment via Razorpay · Instant access · No subscription
      </p>
    </div>
  );
}

function GateIcon() {
  return (
    <div className="flex justify-center mb-4">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Lock className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}
