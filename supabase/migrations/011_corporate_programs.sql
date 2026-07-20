-- ═══════════════════════════════════════════════════════════════
-- CalmTree Corporate Programs — Migration 011
-- The Workplace Effectiveness Score (WES) measurement loop.
--
-- A "program" is an org's running of the six-assessment WES battery over a
-- 30–45 day window, measured twice (baseline + follow-up) so the employer sees
-- the CHANGE. It sits alongside the credit-campaign system (009/010) and reuses
-- its spine: the credit ledger funds it, tokens are hashed the same way, and the
-- aggregate-only privacy rule is enforced in the server layer, not in RLS.
--
-- Design notes (first principles):
--   • Participants are PERSISTENT (unlike one-shot campaign invitations) so the
--     same person completes six linked assessments and returns for the follow-up
--     wave. They are NOT auth users; they authenticate via an unguessable token
--     (SHA-256 hashed here, raw only in the email). Still anonymous to the
--     employer — individual scores never leave the server layer.
--   • Credits fund a wave: openWave reserves (6 × participants) via
--     spend_org_credits (009); uncompleted invitations are refunded at close.
--   • program_participants / program_responses have NO user-facing RLS. Every
--     read goes through a server function that enforces the min-group privacy
--     floor. This mirrors invitation_responses in 009.
--
-- Extends 009/010 — additive only. Idempotent. No existing table is modified,
-- so rollback is simply DROP of the three tables below.
-- ═══════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────
-- 1. PROGRAMS
--    One org's running of the WES battery over a measurement window.
--    Lifecycle (status):
--      'draft'            — created, participants can be added, no credits spent
--      'baseline_active'  — baseline wave open, credits reserved, links live
--      'baseline_closed'  — baseline frozen; uncompleted refunded
--      'followup_active'  — follow-up wave open, credits reserved, links live
--      'closed'           — program complete; delta report available
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.programs (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id             UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name               TEXT        NOT NULL,
  -- Which development programme this run is framed as. All three share the same
  -- six-dimension battery in Phase 1; the type is a label + focus dimensions.
  programme_type     TEXT        NOT NULL DEFAULT 'productivity',  -- 'productivity'|'manager'|'teams'
  -- Below this many completions, no aggregate is shown (privacy floor). Seeded
  -- from the org's min_aggregate_group_size at creation, overridable per program.
  min_group_size     INTEGER     NOT NULL DEFAULT 5,
  status             TEXT        NOT NULL DEFAULT 'draft',
  baseline_opened_at TIMESTAMPTZ,
  baseline_closed_at TIMESTAMPTZ,
  followup_opened_at TIMESTAMPTZ,
  closed_at          TIMESTAMPTZ,
  created_by         UUID,
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);


-- ────────────────────────────────────────────────────────────────
-- 2. PROGRAM_PARTICIPANTS
--    Persistent, anonymous-to-employer. One token per participant (re-minted
--    per wave). We store SHA-256(token) — the raw token lives only in the email,
--    exactly like a password hash. A leaked DB hands out no live links.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.program_participants (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id   UUID        NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  -- Denormalised for simpler queries / RLS. Always == program.org_id.
  org_id       UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email        TEXT        NOT NULL,
  -- Optional. Drives department-level trends, shown only where a department has
  -- ≥ 10 completions in a wave (enforced in the server layer).
  department   TEXT,
  token_hash   TEXT        NOT NULL UNIQUE,   -- SHA-256 hex of the current raw token
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (program_id, email)
);


-- ────────────────────────────────────────────────────────────────
-- 3. PROGRAM_RESPONSES
--    One scored response per participant per wave per assessment (six per wave).
--    Org-owned. NO user-facing RLS — reads go through server functions that
--    enforce the aggregate-only / min-group privacy rule.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.program_responses (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  program_id       UUID        NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  org_id           UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  participant_id   UUID        NOT NULL REFERENCES public.program_participants(id) ON DELETE CASCADE,
  wave             TEXT        NOT NULL,      -- 'baseline' | 'followup'
  assessment_slug  TEXT        NOT NULL,      -- one of the six WES battery slugs
  -- The assessment's internal sub-dimension breakdown (for the personal report).
  dimension_scores JSONB,
  -- The matched archetype band label (e.g. "Mostly Clear") for the personal report.
  primary_label    TEXT,
  -- This assessment's headline 0–100 score = its WES dimension contribution.
  percentage       INTEGER     NOT NULL,
  answers          JSONB       NOT NULL,      -- raw answers, for audit / re-scoring
  completed_at     TIMESTAMPTZ DEFAULT now(),
  -- One response per participant per wave per assessment. Re-submission within an
  -- open wave upserts on this key; locked once the wave closes (server-enforced).
  UNIQUE (participant_id, wave, assessment_slug)
);


-- ────────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY
--    programs — members may read their org's programs (direct supabase reads).
--    participants / responses — NO user-facing policy: PII + individual scores.
--    All writes and all privacy-gated reads go through the service-role server
--    layer, which bypasses RLS. RLS here is defense-in-depth: a leaked anon key
--    reads nothing sensitive.
-- ────────────────────────────────────────────────────────────────
ALTER TABLE public.programs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_responses    ENABLE ROW LEVEL SECURITY;

-- programs — members and platform admins can read.
CREATE POLICY "Members can view their programs"
  ON public.programs FOR SELECT
  USING (public.is_org_member(org_id) OR public.is_admin());

-- program_participants — NO user-facing policy (contains employee PII + tokens).
--   Read via server functions only. Platform admin read for support:
CREATE POLICY "Admins can view program participants"
  ON public.program_participants FOR SELECT
  USING (public.is_admin());

-- program_responses — NO user-facing policy. Individual scores are gated by the
--   aggregation rule enforced in the server layer. Platform admin read only:
CREATE POLICY "Admins can view program responses"
  ON public.program_responses FOR SELECT
  USING (public.is_admin());


-- ────────────────────────────────────────────────────────────────
-- 5. INDEXES
-- ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_programs_org               ON public.programs(org_id);
CREATE INDEX IF NOT EXISTS idx_programs_status            ON public.programs(status);
CREATE INDEX IF NOT EXISTS idx_participants_program       ON public.program_participants(program_id);
CREATE INDEX IF NOT EXISTS idx_participants_org           ON public.program_participants(org_id);
CREATE INDEX IF NOT EXISTS idx_responses_program_wave     ON public.program_responses(program_id, wave);
CREATE INDEX IF NOT EXISTS idx_responses_program_slug_wave ON public.program_responses(program_id, assessment_slug, wave);
CREATE INDEX IF NOT EXISTS idx_responses_participant      ON public.program_responses(participant_id);
