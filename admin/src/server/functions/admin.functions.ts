/**
 * admin.functions.ts
 *
 * Server functions for the admin dashboard.
 * ALL functions require is_admin=true — this is the ONLY gate between a
 * normal user token and full service-role DB access.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

// ─── Admin gate helper ────────────────────────────────────────────────────────

async function requireAdmin(accessToken: string): Promise<string> {
  const userId = await requireUser(accessToken);
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();

  if (error || !data?.is_admin) {
    throw new Error("Forbidden: admin access required.");
  }

  return userId;
}

// ─── Schemas ──────────────────────────────────────────────────────────────────

const AdminAuthSchema = z.object({ accessToken: z.string() });

const PaginatedSchema = z.object({
  accessToken: z.string(),
  page: z.number().default(1),
  pageSize: z.number().default(20),
});

// ─── Server Functions ─────────────────────────────────────────────────────────

/** Overview counts for the admin dashboard home. */
export const getAdminOverview = createServerFn({ method: "POST" })
  .inputValidator(AdminAuthSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    const supabase = getAdminClient();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [usersRes, newUsersRes, onboardedRes, resultsRes, purchasesRes, ebooksRes, slugsRes] =
      await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .gte("created_at", thirtyDaysAgo),
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("onboarding_completed", true),
        supabase
          .from("assessment_results")
          .select("id", { count: "exact", head: true })
          .gte("completed_at", thirtyDaysAgo),
        supabase.from("purchases").select("amount_paid_inr").eq("status", "completed"),
        supabase.from("ebooks").select("id", { count: "exact", head: true }).eq("status", "active"),
        // Slugs from the last 30 days → tally the most-taken assessments in JS.
        supabase
          .from("assessment_results")
          .select("assessment_slug")
          .gte("completed_at", thirtyDaysAgo)
          .limit(5000),
      ]);

    const revenue = (purchasesRes.data ?? []).reduce(
      (sum, p) => sum + ((p.amount_paid_inr as number) ?? 0),
      0,
    );

    const totalUsers = usersRes.count ?? 0;
    const onboarded = onboardedRes.count ?? 0;

    const tally = new Map<string, number>();
    for (const row of slugsRes.data ?? []) {
      const slug = (row as { assessment_slug: string }).assessment_slug;
      tally.set(slug, (tally.get(slug) ?? 0) + 1);
    }
    const topAssessments = [...tally.entries()]
      .map(([slug, count]) => ({ slug, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalUsers,
      newUsers30d: newUsersRes.count ?? 0,
      onboardingRate: totalUsers > 0 ? Math.round((onboarded / totalUsers) * 100) : 0,
      resultsLast30d: resultsRes.count ?? 0,
      totalPurchases: purchasesRes.data?.length ?? 0,
      revenueInr: revenue,
      activeEbooks: ebooksRes.count ?? 0,
      topAssessments,
    };
  });

/** Paginated list of profiles (users). */
export const listUsers = createServerFn({ method: "POST" })
  .inputValidator(PaginatedSchema.extend({ search: z.string().optional() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden", users: [], total: 0 };
    }

    const supabase = getAdminClient();
    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;

    let query = supabase
      .from("profiles")
      .select("id, full_name, is_admin, onboarding_completed, focus_areas, created_at", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (data.search) {
      query = query.ilike("full_name", `%${data.search}%`);
    }

    const { data: users, error, count } = await query;

    if (error) {
      console.error("[listUsers] error:", error);
      return { error: "Failed to fetch users.", users: [], total: 0 };
    }

    return { users: users ?? [], total: count ?? 0 };
  });

/** Paginated list of purchases. */
export const listPurchases = createServerFn({ method: "POST" })
  .inputValidator(PaginatedSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden", purchases: [], total: 0 };
    }

    const supabase = getAdminClient();
    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;

    const {
      data: purchases,
      error,
      count,
    } = await supabase
      .from("purchases")
      .select(
        "id, user_id, product_type, product_id, amount_paid_inr, status, razorpay_payment_id, purchased_at",
        { count: "exact" },
      )
      .order("purchased_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("[listPurchases] error:", error);
      return { error: "Failed to fetch purchases.", purchases: [], total: 0 };
    }

    return { purchases: purchases ?? [], total: count ?? 0 };
  });

/** Paginated list of assessment results. */
export const listResults = createServerFn({ method: "POST" })
  .inputValidator(PaginatedSchema.extend({ userId: z.string().optional() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden", results: [], total: 0 };
    }

    const supabase = getAdminClient();
    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;

    let query = supabase
      .from("assessment_results")
      .select("id, user_id, assessment_slug, primary_label, percentage, completed_at", {
        count: "exact",
      })
      .order("completed_at", { ascending: false })
      .range(from, to);

    if (data.userId) {
      query = query.eq("user_id", data.userId);
    }

    const { data: results, error, count } = await query;

    if (error) {
      console.error("[listResults] error:", error);
      return { error: "Failed to fetch results.", results: [], total: 0 };
    }

    return { results: results ?? [], total: count ?? 0 };
  });

// ─── Ebook CRUD ───────────────────────────────────────────────────────────────

const EbookWriteSchema = z.object({
  accessToken: z.string(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  cover_image_url: z.string().optional(),
  cloudinary_public_id: z.string().optional(),
  price_inr: z.number(),
  page_count: z.number().optional(),
  status: z.enum(["active", "inactive", "draft"]),
  slug: z.string().min(1),
});

/** List all ebooks including inactive (admin only). */
export const listAllEbooks = createServerFn({ method: "POST" })
  .inputValidator(AdminAuthSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden", ebooks: [] };
    }

    const supabase = getAdminClient();
    const { data: ebooks, error } = await supabase
      .from("ebooks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[listAllEbooks] error:", error);
      return { error: "Failed to fetch ebooks.", ebooks: [] };
    }

    return { ebooks: ebooks ?? [] };
  });

/** Create a new ebook. */
export const createEbook = createServerFn({ method: "POST" })
  .inputValidator(EbookWriteSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    const { accessToken: _, ...fields } = data;
    const supabase = getAdminClient();
    const { data: ebook, error } = await supabase
      .from("ebooks")
      .insert(fields)
      .select("id")
      .single();

    if (error) {
      console.error("[createEbook] error:", error);
      return { error: error.message };
    }

    return { id: ebook.id as string };
  });

/** Update an existing ebook. */
export const updateEbook = createServerFn({ method: "POST" })
  .inputValidator(EbookWriteSchema.extend({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    const { accessToken: _, id, ...fields } = data;
    const supabase = getAdminClient();
    const { error } = await supabase.from("ebooks").update(fields).eq("id", id);

    if (error) {
      console.error("[updateEbook] error:", error);
      return { error: error.message };
    }

    return { ok: true };
  });

/** Delete an ebook. */
export const deleteEbook = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), id: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    const supabase = getAdminClient();
    const { error } = await supabase.from("ebooks").delete().eq("id", data.id);

    if (error) {
      console.error("[deleteEbook] error:", error);
      return { error: error.message };
    }

    return { ok: true };
  });
