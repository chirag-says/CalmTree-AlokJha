/**
 * programs.functions.ts — the corporate Workplace Effectiveness Score (WES)
 * measurement loop. Runs in the ORG app (org.calmtree.in) for admin-facing
 * functions; the participant-facing functions are public (token-authenticated),
 * mounted on the client app for the /p/:token flow.
 *
 * Relationship to campaigns: programs REUSE the same spine — credit ledger,
 * token hashing, email, org authz, the min-group privacy floor — but with a
 * PERSISTENT participant who completes the six-assessment battery and returns
 * for a follow-up wave, so the employer sees the CHANGE.
 *
 * Credit model: a wave RESERVES (6 × participants) credits at open
 * (spend_org_credits locks the org row → no overspend); unused credits
 * (6·N − completed assessments) are REFUNDED at wave close.
 *
 * Privacy model: getProgramReport returns AGGREGATES only, and withholds even
 * the aggregate for a wave whose completed-participant count is below the
 * program's min_group_size. Department rows require ≥ 10 completions. No
 * individual WES ever leaves the server.
 *
 * Scoring: SERVER-SIDE (unlike the campaign flow, which trusts a client score).
 * The employee submits only answers; we run the engine on the battery config.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getAdminClient } from "../supabase-admin";
import { requireOrgRole } from "../b2b/authz";
import { generateInviteToken, hashInviteToken } from "../b2b/invite-token";
import { getPublicSiteUrl, sendInviteEmail } from "../email/resend";
import { scoreAssessment } from "@/lib/assessment-engine";
import type { StandardResult } from "@/data/assessments/types";
import {
  WES_BATTERY_SLUGS,
  SLUG_TO_DIMENSION,
  WES_DIMENSIONS,
  getBatteryAssessment,
  isBatteryComplete,
  isBatterySlug,
  composeWes,
  type WesDimensionId,
} from "@/data/corporate/wes-battery";

const DEMO_MAX_PARTICIPANTS = 100; // guard against blowing the Resend free tier
const BATTERY_SIZE = WES_BATTERY_SLUGS.length; // 6
const DEPT_MIN_GROUP = 10; // client rule: department trends need ≥ 10 responses

type Wave = "baseline" | "followup";

// Program status → currently-open wave (null if none accepting responses).
function activeWave(status: string): Wave | null {
  if (status === "baseline_active") return "baseline";
  if (status === "followup_active") return "followup";
  return null;
}

/** DimensionScore[] → the record shape stored in JSONB / read by reports. */
function dimensionScoresToRecord(result: StandardResult) {
  const rec: Record<string, { label: string; score: number; percentage: number }> = {};
  for (const d of result.dimensionScores) {
    rec[d.dimensionId] = { label: d.label, score: d.score, percentage: d.percentage };
  }
  return rec;
}

// ─── createProgram (draft) ───────────────────────────────────────────────────

export const createProgram = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      orgId: z.string().uuid(),
      name: z.string().min(1),
      programmeType: z.enum(["productivity", "manager", "teams"]),
    }),
  )
  .handler(async ({ data }) => {
    try {
      await requireOrgRole(data.accessToken, data.orgId, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const supabase = getAdminClient();

    // Seed the program's privacy floor from the org's configured minimum.
    const { data: org } = await supabase
      .from("organizations")
      .select("min_aggregate_group_size")
      .eq("id", data.orgId)
      .maybeSingle();

    const { data: program, error } = await supabase
      .from("programs")
      .insert({
        org_id: data.orgId,
        name: data.name,
        programme_type: data.programmeType,
        min_group_size: org?.min_aggregate_group_size ?? 5,
        status: "draft",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[createProgram] error:", error);
      return { error: "Failed to create program." };
    }
    return { programId: program.id as string };
  });

// ─── listPrograms ────────────────────────────────────────────────────────────

export const listPrograms = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), orgId: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await requireOrgRole(data.accessToken, data.orgId, "viewer");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const supabase = getAdminClient();
    const { data: programs, error } = await supabase
      .from("programs")
      .select("id, name, programme_type, status, created_at, baseline_opened_at, followup_opened_at")
      .eq("org_id", data.orgId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[listPrograms] error:", error);
      return { error: "Failed to load programs." };
    }

    const withCounts = await Promise.all(
      (programs ?? []).map(async (p) => {
        const { count: participants } = await supabase
          .from("program_participants")
          .select("id", { count: "exact", head: true })
          .eq("program_id", p.id);
        return { ...p, participants: participants ?? 0 };
      }),
    );

    return { programs: withCounts };
  });

// ─── addParticipants (draft only — cohort is fixed once measurement starts) ──

export const addParticipants = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      programId: z.string().uuid(),
      participants: z
        .array(z.object({ email: z.string().email(), department: z.string().optional() }))
        .min(1),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: program } = await supabase
      .from("programs")
      .select("id, org_id, status")
      .eq("id", data.programId)
      .maybeSingle();
    if (!program) return { error: "Program not found." };

    try {
      await requireOrgRole(data.accessToken, program.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    if (program.status !== "draft") {
      return { error: "Participants can only be added before the program starts." };
    }

    // Normalise + dedupe by email; last department wins.
    const byEmail = new Map<string, string | null>();
    for (const p of data.participants) {
      const email = p.email.trim().toLowerCase();
      if (email) byEmail.set(email, p.department?.trim() || null);
    }
    if (byEmail.size === 0) return { error: "No valid email addresses." };

    const { count: existing } = await supabase
      .from("program_participants")
      .select("id", { count: "exact", head: true })
      .eq("program_id", program.id);
    if ((existing ?? 0) + byEmail.size > DEMO_MAX_PARTICIPANTS) {
      return { error: `Demo limit is ${DEMO_MAX_PARTICIPANTS} participants per program.` };
    }

    // A token is minted now to satisfy NOT NULL; it is re-minted at wave open,
    // and cannot be used to submit until a wave is active (server-gated).
    const rows = Array.from(byEmail.entries()).map(([email, department]) => ({
      program_id: program.id,
      org_id: program.org_id,
      email,
      department,
      token_hash: hashInviteToken(generateInviteToken()),
    }));

    // Ignore rows that collide with an already-added email (idempotent add).
    const { error: insErr } = await supabase
      .from("program_participants")
      .upsert(rows, { onConflict: "program_id,email", ignoreDuplicates: true });
    if (insErr) {
      console.error("[addParticipants] insert error:", insErr);
      return { error: "Failed to add participants." };
    }

    const { count: total } = await supabase
      .from("program_participants")
      .select("id", { count: "exact", head: true })
      .eq("program_id", program.id);

    return { added: byEmail.size, total: total ?? 0 };
  });

// ─── openWave (reserve credits + re-mint tokens + email hub links) ───────────

export const openWave = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      programId: z.string().uuid(),
      wave: z.enum(["baseline", "followup"]),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: program } = await supabase
      .from("programs")
      .select("id, org_id, name, status, organizations(name)")
      .eq("id", data.programId)
      .maybeSingle();
    if (!program) return { error: "Program not found." };

    let ctx;
    try {
      ctx = await requireOrgRole(data.accessToken, program.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    // A program cannot measure six dimensions until all six are authored.
    if (!isBatteryComplete()) {
      const authored = WES_BATTERY_SLUGS.filter((s) => getBatteryAssessment(s)).length;
      return { error: `The assessment battery isn't ready yet (${authored} of ${BATTERY_SIZE} authored).` };
    }

    // State gate.
    if (data.wave === "baseline" && program.status !== "draft") {
      return { error: "Baseline can only be opened from a draft program." };
    }
    if (data.wave === "followup" && program.status !== "baseline_closed") {
      return { error: "Follow-up can only be opened after the baseline is closed." };
    }

    const { data: participants } = await supabase
      .from("program_participants")
      .select("id, email")
      .eq("program_id", program.id);
    const list = participants ?? [];
    if (list.length === 0) return { error: "Add participants before opening a wave." };

    // Reserve (6 × participants) credits atomically. Raises insufficient_credits.
    const cost = list.length * BATTERY_SIZE;
    const { error: spendErr } = await supabase.rpc("spend_org_credits", {
      p_org_id: program.org_id,
      p_amount: cost,
      p_campaign_id: null,
      p_created_by: ctx.userId,
    });
    if (spendErr) {
      if (spendErr.message?.includes("insufficient_credits")) {
        const { data: bal } = await supabase.rpc("org_credit_balance", { p_org_id: program.org_id });
        return { error: `Not enough credits. This wave needs ${cost} but you have ${(bal as number) ?? 0}.` };
      }
      console.error("[openWave] spend error:", spendErr);
      return { error: "Could not reserve credits." };
    }

    // Re-mint a fresh token per participant; keep raw tokens for the email links.
    const minted = list.map((p) => {
      const rawToken = generateInviteToken();
      return { id: p.id as string, email: p.email as string, rawToken };
    });
    for (const m of minted) {
      await supabase
        .from("program_participants")
        .update({ token_hash: hashInviteToken(m.rawToken) })
        .eq("id", m.id);
    }

    // Flip status + timestamp.
    const now = new Date().toISOString();
    await supabase
      .from("programs")
      .update(
        data.wave === "baseline"
          ? { status: "baseline_active", baseline_opened_at: now, updated_at: now }
          : { status: "followup_active", followup_opened_at: now, updated_at: now },
      )
      .eq("id", program.id);

    // Email one hub link per participant (best-effort).
    const orgName = (program.organizations as unknown as { name: string })?.name ?? "Your company";
    let emailsSent = 0;
    for (const m of minted) {
      const link = `${getPublicSiteUrl()}/p/${m.rawToken}`;
      const result = await sendInviteEmail({
        to: m.email,
        orgName,
        assessmentTitle: program.name,
        link,
        closesAt: null,
      });
      if (result.ok) emailsSent++;
    }

    return {
      opened: true,
      wave: data.wave,
      participants: list.length,
      creditsReserved: cost,
      emailsSent,
      // One-time raw links for manual distribution when email isn't configured.
      links: minted.map((m) => ({ email: m.email, link: `${getPublicSiteUrl()}/p/${m.rawToken}` })),
    };
  });

// ─── closeWave (freeze wave + refund unused credits) ─────────────────────────

export const closeWave = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      accessToken: z.string(),
      programId: z.string().uuid(),
      wave: z.enum(["baseline", "followup"]),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: program } = await supabase
      .from("programs")
      .select("id, org_id, status")
      .eq("id", data.programId)
      .maybeSingle();
    if (!program) return { error: "Program not found." };

    let ctx;
    try {
      ctx = await requireOrgRole(data.accessToken, program.org_id, "admin");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const expectedStatus = data.wave === "baseline" ? "baseline_active" : "followup_active";
    if (program.status !== expectedStatus) {
      return { error: `This ${data.wave} wave is not currently open.` };
    }

    const { count: participants } = await supabase
      .from("program_participants")
      .select("id", { count: "exact", head: true })
      .eq("program_id", program.id);
    const { count: completedAssessments } = await supabase
      .from("program_responses")
      .select("id", { count: "exact", head: true })
      .eq("program_id", program.id)
      .eq("wave", data.wave);

    const reserved = (participants ?? 0) * BATTERY_SIZE;
    const refund = Math.max(0, reserved - (completedAssessments ?? 0));
    if (refund > 0) {
      await supabase.from("credit_ledger").insert({
        org_id: program.org_id,
        delta: refund,
        reason: "expiry_refund",
        note: `Program ${program.id} ${data.wave}: refund for ${refund} uncompleted assessment(s)`,
        created_by: ctx.userId,
      });
    }

    const now = new Date().toISOString();
    await supabase
      .from("programs")
      .update(
        data.wave === "baseline"
          ? { status: "baseline_closed", baseline_closed_at: now, updated_at: now }
          : { status: "closed", closed_at: now, updated_at: now },
      )
      .eq("id", program.id);

    return { closed: true, wave: data.wave, refunded: refund };
  });

// ─── getParticipantSession (public, token-authenticated) ─────────────────────

export const getParticipantSession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const tokenHash = hashInviteToken(data.token);

    const { data: participant, error } = await supabase
      .from("program_participants")
      .select("id, program_id, programs(name, status, organizations(name))")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (error) {
      console.error("[getParticipantSession] error:", error);
      return { error: "Something went wrong. Please try again." };
    }
    if (!participant) return { error: "invalid", message: "This link is not valid." };

    const program = participant.programs as unknown as {
      name: string;
      status: string;
      organizations: { name: string } | null;
    };
    const wave = activeWave(program.status);
    if (!wave) {
      const message =
        program.status === "closed" || program.status === "baseline_closed"
          ? "This check-in is not open right now."
          : "This check-in hasn't opened yet.";
      return { error: "not_open", message };
    }

    // Which battery assessments has this participant completed this wave?
    const { data: done } = await supabase
      .from("program_responses")
      .select("assessment_slug")
      .eq("participant_id", participant.id)
      .eq("wave", wave);
    const doneSlugs = new Set((done ?? []).map((r) => r.assessment_slug as string));

    const battery = WES_DIMENSIONS.map((dim) => {
      const cfg = getBatteryAssessment(dim.slug);
      return {
        slug: dim.slug,
        dimensionLabel: dim.label,
        title: cfg?.meta.title ?? dim.label,
        subtitle: cfg?.meta.subtitle ?? "",
        duration: cfg?.meta.duration ?? "",
        done: doneSlugs.has(dim.slug),
      };
    });

    return {
      programName: program.name,
      orgName: program.organizations?.name ?? "Your company",
      wave,
      battery,
      completedCount: doneSlugs.size,
      totalCount: BATTERY_SIZE,
      allDone: doneSlugs.size >= BATTERY_SIZE,
    };
  });

// ─── submitProgramAssessment (public, server-side scored) ────────────────────

export const submitProgramAssessment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1),
      assessmentSlug: z.string(),
      answers: z.record(z.number()),
    }),
  )
  .handler(async ({ data }) => {
    if (!isBatterySlug(data.assessmentSlug)) {
      return { error: "Unknown assessment." };
    }
    const config = getBatteryAssessment(data.assessmentSlug);
    if (!config) return { error: "This assessment isn't available." };

    const supabase = getAdminClient();
    const tokenHash = hashInviteToken(data.token);

    const { data: participant } = await supabase
      .from("program_participants")
      .select("id, program_id, org_id, programs(status)")
      .eq("token_hash", tokenHash)
      .maybeSingle();
    if (!participant) return { error: "This link is not valid." };

    const program = participant.programs as unknown as { status: string };
    const wave = activeWave(program.status);
    if (!wave) return { error: "This check-in is not open right now." };

    // Score SERVER-SIDE — never trust a client-computed score.
    const result = scoreAssessment(config, data.answers) as StandardResult;

    const { error: upErr } = await supabase.from("program_responses").upsert(
      {
        program_id: participant.program_id,
        org_id: participant.org_id,
        participant_id: participant.id,
        wave,
        assessment_slug: data.assessmentSlug,
        dimension_scores: dimensionScoresToRecord(result),
        primary_label: result.archetype.label,
        percentage: result.percentage,
        answers: data.answers,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "participant_id,wave,assessment_slug" },
    );
    if (upErr) {
      console.error("[submitProgramAssessment] upsert error:", upErr);
      return { error: "Could not save your response. Please try again." };
    }

    // Progress after this submission.
    const { data: done } = await supabase
      .from("program_responses")
      .select("assessment_slug, percentage, primary_label")
      .eq("participant_id", participant.id)
      .eq("wave", wave);
    const rows = done ?? [];
    const allDone = rows.length >= BATTERY_SIZE;

    // Unified personal report only once all six are complete.
    let report: {
      wes: number | null;
      dimensions: {
        dimensionId: WesDimensionId;
        label: string;
        percentage: number;
        band: string | null;
        interpretation: string | null;
      }[];
    } | null = null;

    if (allDone) {
      const bySlug = new Map(rows.map((r) => [r.assessment_slug as string, r]));
      const dims = WES_DIMENSIONS.map((dim) => {
        const r = bySlug.get(dim.slug);
        const pct = (r?.percentage as number) ?? 0;
        const band = (r?.primary_label as string) ?? null;
        const cfg = getBatteryAssessment(dim.slug);
        const interpretation =
          cfg?.archetypes.find((a) => a.label === band)?.interpretation ?? null;
        return { dimensionId: dim.id, label: dim.label, percentage: pct, band, interpretation };
      });
      const wes = composeWes(
        Object.fromEntries(dims.map((d) => [d.dimensionId, d.percentage])) as Partial<
          Record<WesDimensionId, number>
        >,
      );
      report = { wes, dimensions: dims };
    }

    return {
      ok: true,
      completedCount: rows.length,
      totalCount: BATTERY_SIZE,
      allDone,
      report,
    };
  });

// ─── getProgramReport (admin/viewer, privacy-gated aggregate) ────────────────

interface WaveAggregate {
  completedParticipants: number;
  aggregateLocked: boolean;
  wes: number | null;
  dimensions: { dimensionId: WesDimensionId; label: string; averagePercentage: number }[];
  departments: { department: string; completedParticipants: number; wes: number | null }[];
}

export const getProgramReport = createServerFn({ method: "POST" })
  .inputValidator(z.object({ accessToken: z.string(), programId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getAdminClient();
    const { data: program } = await supabase
      .from("programs")
      .select("id, org_id, name, programme_type, status, min_group_size")
      .eq("id", data.programId)
      .maybeSingle();
    if (!program) return { error: "Program not found." };

    try {
      await requireOrgRole(data.accessToken, program.org_id, "viewer");
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Unauthorized." };
    }

    const minGroup = program.min_group_size ?? 5;

    // One scan each — compute aggregates in memory (pilot sizes are small).
    const { data: participants } = await supabase
      .from("program_participants")
      .select("id, department")
      .eq("program_id", program.id);
    const { data: responses } = await supabase
      .from("program_responses")
      .select("participant_id, wave, assessment_slug, percentage")
      .eq("program_id", program.id);

    const deptOf = new Map((participants ?? []).map((p) => [p.id as string, (p.department as string) || null]));
    const totalParticipants = participants?.length ?? 0;

    const aggregateWave = (wave: Wave): WaveAggregate => {
      const waveRows = (responses ?? []).filter((r) => r.wave === wave);

      // Group responses by participant to find who completed all six.
      const byParticipant = new Map<string, { slug: string; pct: number }[]>();
      for (const r of waveRows) {
        const pid = r.participant_id as string;
        const arr = byParticipant.get(pid) ?? [];
        arr.push({ slug: r.assessment_slug as string, pct: r.percentage as number });
        byParticipant.set(pid, arr);
      }
      const completedParticipantIds = [...byParticipant.entries()]
        .filter(([, arr]) => arr.length >= BATTERY_SIZE)
        .map(([pid]) => pid);
      const completedParticipants = completedParticipantIds.length;

      if (completedParticipants < minGroup) {
        return {
          completedParticipants,
          aggregateLocked: true,
          wes: null,
          dimensions: [],
          departments: [],
        };
      }

      // Per-dimension average across completed participants only.
      const dimAgg: Partial<Record<WesDimensionId, { total: number; n: number }>> = {};
      const perParticipantWes = new Map<string, number>();
      for (const pid of completedParticipantIds) {
        const arr = byParticipant.get(pid)!;
        const pctByDim: Partial<Record<WesDimensionId, number>> = {};
        for (const { slug, pct } of arr) {
          const dim = SLUG_TO_DIMENSION[slug];
          if (!dim) continue;
          pctByDim[dim.id] = pct;
          const a = dimAgg[dim.id] ?? { total: 0, n: 0 };
          a.total += pct;
          a.n += 1;
          dimAgg[dim.id] = a;
        }
        const w = composeWes(pctByDim);
        if (w != null) perParticipantWes.set(pid, w);
      }

      const dimensions = WES_DIMENSIONS.map((dim) => {
        const a = dimAgg[dim.id];
        return {
          dimensionId: dim.id,
          label: dim.label,
          averagePercentage: a && a.n > 0 ? Math.round(a.total / a.n) : 0,
        };
      });
      const wes = composeWes(
        Object.fromEntries(dimensions.map((d) => [d.dimensionId, d.averagePercentage])) as Partial<
          Record<WesDimensionId, number>
        >,
      );

      // Department breakdown — only departments with ≥ DEPT_MIN_GROUP completions.
      const deptGroups = new Map<string, number[]>();
      for (const pid of completedParticipantIds) {
        const dept = deptOf.get(pid);
        if (!dept) continue;
        const w = perParticipantWes.get(pid);
        if (w == null) continue;
        const arr = deptGroups.get(dept) ?? [];
        arr.push(w);
        deptGroups.set(dept, arr);
      }
      const departments = [...deptGroups.entries()]
        .filter(([, ws]) => ws.length >= DEPT_MIN_GROUP)
        .map(([department, ws]) => ({
          department,
          completedParticipants: ws.length,
          wes: Math.round(ws.reduce((s, x) => s + x, 0) / ws.length),
        }));

      return { completedParticipants, aggregateLocked: false, wes, dimensions, departments };
    };

    const baseline = aggregateWave("baseline");
    const followup = aggregateWave("followup");

    // Composite + per-dimension delta, only when both waves are unlocked.
    let delta: {
      wes: number | null;
      dimensions: { dimensionId: WesDimensionId; label: string; change: number }[];
    } | null = null;
    if (!baseline.aggregateLocked && !followup.aggregateLocked) {
      const baseById = new Map(baseline.dimensions.map((d) => [d.dimensionId, d.averagePercentage]));
      delta = {
        wes: followup.wes != null && baseline.wes != null ? followup.wes - baseline.wes : null,
        dimensions: followup.dimensions.map((d) => ({
          dimensionId: d.dimensionId,
          label: d.label,
          change: d.averagePercentage - (baseById.get(d.dimensionId) ?? 0),
        })),
      };
    }

    // Top-3 strengths / barriers from the latest unlocked wave.
    const latest = !followup.aggregateLocked ? followup : baseline;
    let strengths: { label: string; averagePercentage: number }[] = [];
    let barriers: { label: string; averagePercentage: number }[] = [];
    if (!latest.aggregateLocked) {
      const sorted = [...latest.dimensions].sort((a, b) => b.averagePercentage - a.averagePercentage);
      strengths = sorted.slice(0, 3).map((d) => ({ label: d.label, averagePercentage: d.averagePercentage }));
      barriers = sorted
        .slice(-3)
        .reverse()
        .map((d) => ({ label: d.label, averagePercentage: d.averagePercentage }));
    }

    return {
      program: {
        id: program.id,
        name: program.name,
        programmeType: program.programme_type,
        status: program.status,
      },
      totalParticipants,
      minGroupSize: minGroup,
      baseline,
      followup,
      delta,
      strengths,
      barriers,
    };
  });
