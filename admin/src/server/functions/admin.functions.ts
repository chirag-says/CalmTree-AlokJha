/**
 * admin.functions.ts
 *
 * Server functions for the admin dashboard.
 * ALL functions require is_admin=true — this is the ONLY gate between a
 * normal user token and full service-role DB access.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import crypto from "crypto";
import { getAdminClient } from "../supabase-admin";
import { requireUser } from "../require-user";

// ─── Admin gate helper ────────────────────────────────────────────────────────

export async function requireAdmin(accessToken: string): Promise<string> {
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

    // profiles has no email column — enrich the page (≤ pageSize rows) from
    // the auth admin API in parallel.
    const enriched = await Promise.all(
      (users ?? []).map(async (u) => {
        const { data: authUser } = await supabase.auth.admin.getUserById(u.id as string);
        return {
          ...u,
          email: authUser?.user?.email ?? null,
          last_sign_in_at: authUser?.user?.last_sign_in_at ?? null,
        };
      }),
    );

    return { users: enriched, total: count ?? 0 };
  });

/** Full detail for one user: profile + auth info + entitlements + activity. */
export const getUserDetail = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), userId: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" as const };
    }

    const supabase = getAdminClient();

    const [profileRes, authRes, entitlementsRes, resultsRes, purchasesRes] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          "id, full_name, is_admin, onboarding_completed, focus_areas, primary_goal, experience_level, created_at",
        )
        .eq("id", data.userId)
        .single(),
      supabase.auth.admin.getUserById(data.userId),
      supabase
        .from("entitlements")
        .select("id, access_type, product_category, expires_at, created_at, payment_reference")
        .eq("user_id", data.userId)
        .order("created_at", { ascending: false }),
      supabase
        .from("assessment_results")
        .select("id, assessment_slug, primary_label, percentage, completed_at")
        .eq("user_id", data.userId)
        .order("completed_at", { ascending: false })
        .limit(10),
      supabase
        .from("purchases")
        .select("id, product_type, product_id, amount_paid_inr, status, purchased_at")
        .eq("user_id", data.userId)
        .order("purchased_at", { ascending: false })
        .limit(10),
    ]);

    if (profileRes.error || !profileRes.data) {
      return { error: "User not found." };
    }

    return {
      profile: profileRes.data,
      email: authRes.data?.user?.email ?? null,
      lastSignInAt: authRes.data?.user?.last_sign_in_at ?? null,
      entitlements: entitlementsRes.data ?? [],
      results: resultsRes.data ?? [],
      purchases: purchasesRes.data ?? [],
    };
  });

/** Grant or revoke admin access. An admin can never revoke their own access. */
export const setUserAdmin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({ accessToken: z.string(), userId: z.string().uuid(), isAdmin: z.boolean() }),
  )
  .handler(async ({ data }) => {
    let adminId: string;
    try {
      adminId = await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    if (data.userId === adminId && !data.isAdmin) {
      return { error: "You cannot revoke your own admin access." };
    }

    const supabase = getAdminClient();
    const { error } = await supabase
      .from("profiles")
      .update({ is_admin: data.isAdmin, updated_at: new Date().toISOString() })
      .eq("id", data.userId);

    if (error) {
      console.error("[setUserAdmin] error:", error);
      return { error: error.message };
    }

    console.log(`[admin-audit] ${adminId} set is_admin=${data.isAdmin} on user ${data.userId}`);
    return { ok: true };
  });

// The complete ProductCategory set — mirrors the client's category type.
const PRODUCT_CATEGORIES = [
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
] as const;

/** Manually grant an entitlement (support/goodwill). Idempotent on duplicates. */
export const grantEntitlement = createServerFn({ method: "POST" })
  .inputValidator(
    z.discriminatedUnion("accessType", [
      z.object({
        accessToken: z.string(),
        userId: z.string().uuid(),
        accessType: z.literal("category"),
        productCategory: z.enum(PRODUCT_CATEGORIES),
      }),
      z.object({
        accessToken: z.string(),
        userId: z.string().uuid(),
        accessType: z.literal("universal"),
      }),
    ]),
  )
  .handler(async ({ data }) => {
    let adminId: string;
    try {
      adminId = await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    const supabase = getAdminClient();
    const { error } = await supabase.from("entitlements").insert({
      user_id: data.userId,
      access_type: data.accessType,
      product_category: data.accessType === "category" ? data.productCategory : null,
      expires_at: null,
      payment_reference: `manual:${adminId}`,
    });

    // 23505 = duplicate — the user already has this entitlement; treat as success.
    if (error && error.code !== "23505") {
      console.error("[grantEntitlement] error:", error);
      return { error: error.message };
    }

    console.log(
      `[admin-audit] ${adminId} granted ${data.accessType} entitlement to user ${data.userId}`,
    );
    return { ok: true };
  });

/** Remove an entitlement row. */
export const revokeEntitlement = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), entitlementId: z.string().uuid() }))
  .handler(async ({ data }) => {
    let adminId: string;
    try {
      adminId = await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" };
    }

    const supabase = getAdminClient();
    const { error } = await supabase.from("entitlements").delete().eq("id", data.entitlementId);

    if (error) {
      console.error("[revokeEntitlement] error:", error);
      return { error: error.message };
    }

    console.log(`[admin-audit] ${adminId} revoked entitlement ${data.entitlementId}`);
    return { ok: true };
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

// ─── Purchases CSV export ─────────────────────────────────────────────────────

/** All purchases (capped) with buyer emails — for the CSV export button. */
export const exportPurchases = createServerFn({ method: "POST" })
  .inputValidator(AdminAuthSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden", purchases: [] };
    }

    const supabase = getAdminClient();
    const { data: purchases, error } = await supabase
      .from("purchases")
      .select(
        "id, user_id, product_type, product_id, amount_paid_inr, status, razorpay_order_id, razorpay_payment_id, purchased_at",
      )
      .order("purchased_at", { ascending: false })
      .limit(10000);

    if (error) {
      console.error("[exportPurchases] error:", error);
      return { error: "Failed to fetch purchases.", purchases: [] };
    }

    // Resolve buyer emails — one auth lookup per DISTINCT buyer, not per row.
    const userIds = [...new Set((purchases ?? []).map((p) => p.user_id as string))];
    const emailById = new Map<string, string>();
    await Promise.all(
      userIds.map(async (id) => {
        const { data: authUser } = await supabase.auth.admin.getUserById(id);
        if (authUser?.user?.email) emailById.set(id, authUser.user.email);
      }),
    );

    return {
      purchases: (purchases ?? []).map((p) => ({
        ...p,
        email: emailById.get(p.user_id as string) ?? null,
      })),
    };
  });

// ─── Cloudinary signed upload (ebook PDF + cover image) ───────────────────────

const SignUploadSchema = z.object({
  accessToken: z.string(),
  /** "raw" for the PDF (delivered via signed URL), "image" for public covers. */
  kind: z.enum(["pdf", "cover"]),
});

/**
 * Returns signed params for a direct browser → Cloudinary upload.
 * PDFs upload as type "authenticated" raw files (matches the client app's
 * signed-download generator); covers as plain public images.
 */
export const signCloudinaryUpload = createServerFn({ method: "POST" })
  .inputValidator(SignUploadSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden" as const };
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      return { error: "Cloudinary is not configured on the server." };
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign: Record<string, string> = {
      folder: data.kind === "pdf" ? "ebooks" : "ebook-covers",
      timestamp: String(timestamp),
      ...(data.kind === "pdf" ? { type: "authenticated" } : {}),
    };

    const toSign = Object.keys(paramsToSign)
      .sort()
      .map((key) => `${key}=${paramsToSign[key]}`)
      .join("&");
    const signature = crypto
      .createHash("sha1")
      .update(toSign + apiSecret)
      .digest("hex");

    return {
      cloudName,
      apiKey,
      timestamp,
      signature,
      folder: paramsToSign.folder,
      type: data.kind === "pdf" ? "authenticated" : undefined,
      resourceType: data.kind === "pdf" ? "raw" : "image",
    };
  });

// ─── Overview time series ─────────────────────────────────────────────────────

/** Daily signups / results / revenue for the last 30 days (overview charts). */
export const getOverviewTimeSeries = createServerFn({ method: "POST" })
  .inputValidator(AdminAuthSchema)
  .handler(async ({ data }) => {
    try {
      await requireAdmin(data.accessToken);
    } catch {
      return { error: "Forbidden", days: [] };
    }

    const supabase = getAdminClient();
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sinceIso = since.toISOString();

    const [signupsRes, resultsRes, purchasesRes] = await Promise.all([
      supabase.from("profiles").select("created_at").gte("created_at", sinceIso).limit(10000),
      supabase
        .from("assessment_results")
        .select("completed_at")
        .gte("completed_at", sinceIso)
        .limit(10000),
      supabase
        .from("purchases")
        .select("purchased_at, amount_paid_inr")
        .eq("status", "completed")
        .gte("purchased_at", sinceIso)
        .limit(10000),
    ]);

    // Build a continuous 30-day window so charts don't skip empty days.
    const days = new Map<
      string,
      { date: string; signups: number; results: number; revenue: number }
    >();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      days.set(key, { date: key, signups: 0, results: 0, revenue: 0 });
    }

    for (const row of signupsRes.data ?? []) {
      const key = (row.created_at as string)?.slice(0, 10);
      const day = days.get(key);
      if (day) day.signups += 1;
    }
    for (const row of resultsRes.data ?? []) {
      const key = (row.completed_at as string)?.slice(0, 10);
      const day = days.get(key);
      if (day) day.results += 1;
    }
    for (const row of purchasesRes.data ?? []) {
      const key = (row.purchased_at as string)?.slice(0, 10);
      const day = days.get(key);
      if (day) day.revenue += (row.amount_paid_inr as number) ?? 0;
    }

    return { days: [...days.values()] };
  });
