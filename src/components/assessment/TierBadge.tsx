/**
 * TierBadge — renders a small pill showing the assessment tier.
 */

import React from "react";
import type { AssessmentTier } from "@/data/assessments/types";

const TIER_STYLES: Record<AssessmentTier, { bg: string; text: string; label: string }> = {
  discovery: { bg: "bg-emerald-500/10", text: "text-emerald-600", label: "Free" },
  growth: { bg: "bg-blue-500/10", text: "text-blue-600", label: "Growth · ₹99–299" },
  professional: { bg: "bg-purple-500/10", text: "text-purple-600", label: "Professional · ₹299–999" },
};

export function TierBadge({ tier }: { tier: AssessmentTier }) {
  const style = TIER_STYLES[tier];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
}

/** Pre-built badge components for each tier */
export const TIER_BADGE: Record<AssessmentTier, () => React.ReactElement> = {
  discovery: () => <TierBadge tier="discovery" />,
  growth: () => <TierBadge tier="growth" />,
  professional: () => <TierBadge tier="professional" />,
};
