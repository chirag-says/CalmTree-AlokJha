/**
 * profile.functions.ts
 *
 * Server functions for onboarding and profile updates.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

// The complete set of valid ProductCategory strings — keeps server validation
// in sync with the client type definition.
const VALID_CATEGORIES = new Set([
  "Self-Awareness & Personality",
  "Emotional Strength & Everyday Mind",
  "Relationships & Emotional Connection",
  "Workplace Effectiveness",
  "Leadership & Teams",
  "Founders & Entrepreneurship",
  "Gen Z & Digital Life",
  "Career Direction",
  "Family & Parenting",
  "Life Transitions & Healthy Ageing",
]);

const CompleteOnboardingSchema = z.object({
  accessToken: z.string(),
  fullName: z.string().min(1),
  focusAreas: z.array(z.string()),
  primaryGoal: z.string().nullable(),
  experienceLevel: z.enum(["new", "some", "experienced"]).nullable(),
});

const UpdateProfileSchema = z.object({
  accessToken: z.string(),
  fullName: z.string().min(1).optional(),
  focusAreas: z.array(z.string()).optional(),
  primaryGoal: z.string().nullable().optional(),
  experienceLevel: z.enum(["new", "some", "experienced"]).nullable().optional(),
});

/**
 * completeOnboarding — Persists onboarding data and sets onboarding_completed = true.
 * Called at the end of the onboarding flow. Fires once per user (idempotent on re-run).
 */
export const completeOnboarding = createServerFn({ method: "POST" })
  .inputValidator(CompleteOnboardingSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    // Validate focus areas against the known ProductCategory set
    const invalidCategories = data.focusAreas.filter((c) => !VALID_CATEGORIES.has(c));
    if (invalidCategories.length > 0) {
      return { error: `Invalid focus areas: ${invalidCategories.join(", ")}` };
    }

    const supabase = getAdminClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.fullName,
        focus_areas: data.focusAreas,
        primary_goal: data.primaryGoal,
        experience_level: data.experienceLevel,
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("[completeOnboarding] error:", error);
      return { error: error.message };
    }

    return { ok: true };
  });

/**
 * updateProfile — Updates profile fields without changing onboarding_completed.
 * Used by the Settings page.
 */
export const updateProfile = createServerFn({ method: "POST" })
  .inputValidator(UpdateProfileSchema)
  .handler(async ({ data }) => {
    let userId: string;
    try {
      userId = await requireUser(data.accessToken);
    } catch {
      return { error: "Unauthorized: invalid or expired access token." };
    }

    if (data.focusAreas) {
      const invalid = data.focusAreas.filter((c) => !VALID_CATEGORIES.has(c));
      if (invalid.length > 0) {
        return { error: `Invalid focus areas: ${invalid.join(", ")}` };
      }
    }

    const supabase = getAdminClient();
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (data.fullName !== undefined) updates.full_name = data.fullName;
    if (data.focusAreas !== undefined) updates.focus_areas = data.focusAreas;
    if (data.primaryGoal !== undefined) updates.primary_goal = data.primaryGoal;
    if (data.experienceLevel !== undefined) updates.experience_level = data.experienceLevel;

    const { error } = await supabase.from("profiles").update(updates).eq("id", userId);

    if (error) {
      console.error("[updateProfile] error:", error);
      return { error: error.message };
    }

    return { ok: true };
  });
