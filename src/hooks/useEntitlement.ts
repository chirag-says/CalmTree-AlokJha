/**
 * useEntitlement — checks whether the current user can access a given assessment.
 *
 * Rules:
 *   - isFree assessments: always accessible, no login required
 *   - Logged-in users: fetch their entitlements once, cache in context
 *   - "free" entitlement row: unlocks all isFree assessments
 *   - "category" entitlement row: unlocks all assessments in that productCategory
 *   - "universal" entitlement row (product_category = null): unlocks everything
 *   - Expired entitlements are ignored
 */

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import type { AnyAssessmentConfig } from "@/data/assessments";

interface EntitlementRow {
  access_type: "free" | "category" | "universal";
  product_category: string | null;
  expires_at: string | null;
}

interface UseEntitlementResult {
  /** Whether the user can access this assessment right now */
  hasAccess: boolean;
  /** Still fetching entitlement data */
  loading: boolean;
  /** Why access is denied (for UI prompts) */
  reason: "login-required" | "upgrade-required" | null;
}

// Module-level cache so we don't re-fetch on every component mount
let cachedEntitlements: EntitlementRow[] | null = null;
let cachedUserId: string | null = null;

export function useEntitlement(config: AnyAssessmentConfig): UseEntitlementResult {
  const { user, loading: authLoading } = useAuth();
  const [entitlements, setEntitlements] = useState<EntitlementRow[] | null>(null);
  const [loading, setLoading] = useState(false);

  const isFree = config.meta.isFree;

  useEffect(() => {
    // Free assessments need no entitlement check
    if (isFree) return;
    // Not logged in — no point fetching
    if (!user) return;

    // Use cache if same user
    if (cachedUserId === user.id && cachedEntitlements !== null) {
      setEntitlements(cachedEntitlements);
      return;
    }

    setLoading(true);
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("entitlements")
      .select("access_type, product_category, expires_at")
      .eq("user_id", user.id)
      .then(({ data }) => {
        const rows = (data ?? []) as EntitlementRow[];
        cachedUserId = user.id;
        cachedEntitlements = rows;
        setEntitlements(rows);
        setLoading(false);
      });
  }, [user, isFree]);

  // Reset cache when user changes
  useEffect(() => {
    if (!user) {
      cachedUserId = null;
      cachedEntitlements = null;
      setEntitlements(null);
    }
  }, [user]);

  // Still loading auth
  if (authLoading) return { hasAccess: false, loading: true, reason: null };

  // Free assessments — always open
  if (isFree) return { hasAccess: true, loading: false, reason: null };

  // Paid assessment, not logged in
  if (!user) return { hasAccess: false, loading: false, reason: "login-required" };

  // Still fetching entitlements
  if (loading || entitlements === null) return { hasAccess: false, loading: true, reason: null };

  const now = new Date();
  const active = entitlements.filter(
    (e) => !e.expires_at || new Date(e.expires_at) > now,
  );

  // Universal access
  if (active.some((e) => e.access_type === "universal")) {
    return { hasAccess: true, loading: false, reason: null };
  }

  // Category access
  const productCategory = config.meta.productCategory;
  if (active.some((e) => e.access_type === "category" && e.product_category === productCategory)) {
    return { hasAccess: true, loading: false, reason: null };
  }

  return { hasAccess: false, loading: false, reason: "upgrade-required" };
}

/** Invalidate the entitlement cache (call after purchase) */
export function invalidateEntitlementCache() {
  cachedUserId = null;
  cachedEntitlements = null;
}
