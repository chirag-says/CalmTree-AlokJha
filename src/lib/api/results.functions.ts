/**
 * results.functions.ts
 *
 * Server functions for persisting and fetching assessment results.
 * All handlers run server-side only (TanStack Start server functions).
 *
 * Auth pattern: the caller passes the Supabase JWT access token.
 * We verify it server-side with supabase.auth.getUser(token) before
 * touching the database — this way we never trust a client-supplied userId.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient, requireUser } from "./_shared";

// ─── Schemas ────────────────────────────────────────────────────────────────

const DimensionScoreSchema = z.object({
  label: z.string(),
  score: z.number(),
  percentage: z.number(),
});

const SaveResultInputSchema = z.object({
  accessToken: z.string(),
  assessmentSlug: z.string(),
  assessmentType: z.enum(["standard", "personality-compass", "profile-based"]),
  totalScore: z.number().optional(),
  percentage: z.number().optional(),
  primaryLabel: z.string(),
  secondaryLabel: z.string().optional(),
  dimensionScores: z.record(DimensionScoreSchema).optional(),
  answers: z.record(z.number()),
});

const GetResultsInputSchema = z.object({
  accessToken: z.string(),
  limit: z.number().default(50),
});

// ─── Server Functions ────────────────────────────────────────────────────────

/**
 * saveAssessmentResult
 *
 * Persists a completed assessment result for the authenticated user.
 * Returns the new row's id on success, or an error string on failure.
 */
export const saveAssessmentResult = createServerFn({ method: "POST" })
  .inputValidator(SaveResultInputSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    const supabase = getAdminClient();

    const { data: result, error } = await supabase
      .from("assessment_results")
      .insert({
        user_id: userId,
        assessment_slug: data.assessmentSlug,
        assessment_type: data.assessmentType,
        total_score: data.totalScore ?? null,
        percentage: data.percentage ?? null,
        primary_label: data.primaryLabel,
        secondary_label: data.secondaryLabel ?? null,
        dimension_scores: data.dimensionScores ?? null,
        answers: data.answers,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[saveAssessmentResult] Supabase insert error:", error);
      return { error: "Failed to save assessment result." };
    }

    return { id: result.id as string };
  });

/**
 * getMyResults
 *
 * Returns all assessment results for the authenticated user,
 * ordered newest-first. Respects the optional `limit` parameter.
 */
export const getMyResults = createServerFn({ method: "POST" })
  .inputValidator(GetResultsInputSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    const supabase = getAdminClient();

    const { data: results, error } = await supabase
      .from("assessment_results")
      .select(
        "id, assessment_slug, assessment_type, total_score, percentage, primary_label, secondary_label, dimension_scores, answers, completed_at, assessment_version",
      )
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })
      .limit(data.limit);

    if (error) {
      console.error("[getMyResults] Supabase select error:", error);
      return { error: "Failed to fetch assessment results." };
    }

    return { results: results ?? [] };
  });
