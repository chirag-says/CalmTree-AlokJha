/**
 * useResultPersistence
 *
 * Handles result saving for all three assessment types.
 *
 * Strategy:
 *   - If logged in  → save immediately via the saveAssessmentResult server function.
 *   - If anonymous  → stash result+answers in sessionStorage so they survive tab
 *     navigation but are dropped when the session ends.
 *   - After OTP verification the caller invokes claimStashed(), which reads the
 *     stashed result and saves it now that a real user exists.
 *
 * The hook never throws — all errors are returned as { error: string }.
 */

import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { saveAssessmentResult } from "@/server/functions/results.functions";
import type {
  AssessmentConfig,
  ProfileAssessmentConfig,
  AssessmentResult,
  StandardResult,
  PersonalityCompassResult,
  ProfileResult,
} from "@/data/assessments/types";

// ─── SessionStorage key ──────────────────────────────────────────────────────

const STASH_KEY = "calmtree_pending_result";

// ─── Stashed payload shape ───────────────────────────────────────────────────

interface StashedPayload {
  assessmentSlug: string;
  assessmentType: "standard" | "personality-compass" | "profile-based";
  totalScore?: number;
  percentage?: number;
  primaryLabel: string;
  secondaryLabel?: string;
  dimensionScores?: Record<string, { label: string; score: number; percentage: number }>;
  answers: Record<string, number>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Maps a typed AssessmentResult into a flat payload suitable for the DB insert.
 */
export function buildPayload(
  config: AssessmentConfig | ProfileAssessmentConfig,
  result: AssessmentResult,
  answers: Record<string, number>,
): StashedPayload {
  const base = {
    assessmentSlug: config.slug,
    assessmentType: result.type,
    answers,
  };

  if (result.type === "standard") {
    const r = result as StandardResult;
    const dims: Record<string, { label: string; score: number; percentage: number }> = {};
    r.dimensionScores.forEach((d) => {
      dims[d.dimensionId] = { label: d.label, score: d.score, percentage: d.percentage };
    });
    return {
      ...base,
      totalScore: r.totalScore,
      percentage: r.percentage,
      primaryLabel: r.archetype.label,
      dimensionScores: dims,
    };
  }

  if (result.type === "personality-compass") {
    const r = result as PersonalityCompassResult;
    const dims: Record<string, { label: string; score: number; percentage: number }> = {};
    r.dimensions.forEach((d) => {
      dims[d.dimensionId] = {
        label: d.label,
        score: Math.round(d.averageScore),
        percentage: d.percentage,
      };
    });
    return {
      ...base,
      primaryLabel: r.archetype.label,
      dimensionScores: dims,
    };
  }

  // profile-based
  const r = result as ProfileResult;
  return {
    ...base,
    primaryLabel: r.primary.label,
    secondaryLabel: r.secondary?.label,
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useResultPersistence() {
  const { user, session } = useAuth();

  /**
   * Saves a result immediately if the user is authenticated, otherwise stashes it.
   * Call this at the moment the runner produces a final result.
   */
  const saveIfAuthed = useCallback(
    async (
      config: AssessmentConfig | ProfileAssessmentConfig,
      result: AssessmentResult,
      answers: Record<string, number>,
    ): Promise<{ saved: boolean; stashed: boolean; error?: string }> => {
      const payload = buildPayload(config, result, answers);

      if (user && session?.access_token) {
        const response = await saveAssessmentResult({
          data: {
            accessToken: session.access_token,
            assessmentSlug: payload.assessmentSlug,
            assessmentType: payload.assessmentType,
            totalScore: payload.totalScore,
            percentage: payload.percentage,
            primaryLabel: payload.primaryLabel,
            secondaryLabel: payload.secondaryLabel,
            dimensionScores: payload.dimensionScores,
            answers: payload.answers,
          },
        });
        if ("error" in response && response.error) {
          // Don't lose the result to a transient failure — stash it so the
          // next claimStashed() call (e.g. on the next authed page load)
          // can retry the save.
          stashForLater(payload);
          return { saved: false, stashed: true, error: response.error };
        }
        return { saved: true, stashed: false };
      }

      // Anonymous — stash for later
      stashForLater(payload);
      return { saved: false, stashed: true };
    },
    [user, session],
  );

  /**
   * Saves the stashed result now that a session is available.
   * Call this in a useEffect keyed on `user` after OTP verification.
   * Returns silently if there is nothing stashed.
   */
  const claimStashed = useCallback(async (): Promise<{ claimed: boolean; error?: string }> => {
    if (!user || !session?.access_token) return { claimed: false };

    const raw = sessionStorage.getItem(STASH_KEY);
    if (!raw) return { claimed: false };

    let payload: StashedPayload;
    try {
      payload = JSON.parse(raw) as StashedPayload;
    } catch {
      sessionStorage.removeItem(STASH_KEY);
      return { claimed: false };
    }

    const response = await saveAssessmentResult({
      data: {
        accessToken: session.access_token,
        assessmentSlug: payload.assessmentSlug,
        assessmentType: payload.assessmentType,
        totalScore: payload.totalScore,
        percentage: payload.percentage,
        primaryLabel: payload.primaryLabel,
        secondaryLabel: payload.secondaryLabel,
        dimensionScores: payload.dimensionScores,
        answers: payload.answers,
      },
    });

    if ("error" in response && response.error) {
      // Leave the stash in place — a transient failure shouldn't permanently
      // lose the user's answers. The next claimStashed() call (e.g. on retry
      // or next page load) will try again.
      return { claimed: false, error: response.error };
    }

    sessionStorage.removeItem(STASH_KEY);
    return { claimed: true };
  }, [user, session]);

  return { saveIfAuthed, claimStashed };
}

// ─── Standalone stash helpers (called outside React) ─────────────────────────

export function stashForLater(payload: StashedPayload): void {
  try {
    sessionStorage.setItem(STASH_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage might be unavailable (private browsing with storage blocked)
  }
}

export function hasPendingStash(): boolean {
  try {
    return Boolean(sessionStorage.getItem(STASH_KEY));
  } catch {
    return false;
  }
}
