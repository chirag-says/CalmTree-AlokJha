/**
 * results.functions.ts
 *
 * Server functions for persisting and fetching assessment results.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

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

const GetResultForSlugInputSchema = z.object({
  accessToken: z.string(),
  slug: z.string(),
});

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

/**
 * Fetch the user's most recent saved result for a single assessment slug.
 * Used by the assessment page to restore a completed result (with the stored
 * answers) instead of dropping the user back onto the start screen.
 */
export const getResultForSlug = createServerFn({ method: "POST" })
  .inputValidator(GetResultForSlugInputSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    const supabase = getAdminClient();

    const { data: rows, error } = await supabase
      .from("assessment_results")
      .select("assessment_slug, assessment_type, answers, completed_at")
      .eq("user_id", userId)
      .eq("assessment_slug", data.slug)
      .order("completed_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("[getResultForSlug] Supabase select error:", error);
      return { error: "Failed to fetch assessment result." };
    }

    return { result: rows?.[0] ?? null };
  });
