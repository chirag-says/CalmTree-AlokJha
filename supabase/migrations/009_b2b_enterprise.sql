-- ═══════════════════════════════════════════════════════════════
-- CalmTree B2B Enterprise — Migration 009
-- Adds the company-facing assessment-distribution layer:
--   organizations, org_members, credit_ledger, campaigns,
--   invitations, invitation_responses.
--
-- Design notes (first principles):
--   • Credits are an APPEND-ONLY LEDGER, never a mutable balance.
--     Balance = SUM(delta). This gives a free audit trail and makes
--     concurrent spends safe (see spend_org_credits).
--   • Credits are RESERVED at campaign launch (one per invitation) and
--     REFUNDED at expiry for invitations that were never completed.
--   • Employees are NOT auth users. They authenticate via an
--     unguessable single-use token in their invite email. Their answers
--     live in invitation_responses (org-owned), keyed by invitation —
--     never in assessment_results (user-owned). This keeps the B2C
--     table's NOT NULL user_id intact and cleanly isolates org data.
--   • The employer sees AGGREGATES only by default. Individual results
--     are gated behind organizations.individual_results_unlocked.
--     invitation_responses has NO user-facing RLS policy — every read
--     goes through a server function that enforces the privacy rule.
--
-- Extends 002/003/004 — additive only. Idempotent.
-- ═══════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────
-- 1. ORGANIZATIONS
--    One row per company account.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.organizations (
  id                          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name                        TEXT        NOT NULL,
  slug                        TEXT        NOT NULL UNIQUE,
  billing_email               TEXT,
  -- When true, the company has paid the add-on to view individual
  -- employee results. Default false = aggregate-only (basic plan).
  individual_results_unlocked BOOLEAN     NOT NULL DEFAULT false,
  -- Below this group size, no aggregate is shown (privacy floor).
  min_aggregate_group_size    INTEGER     NOT NULL DEFAULT 5,
  status                      TEXT        NOT NULL DEFAULT 'active',  -- 'active' | 'suspended'
  created_at                  TIMESTAMPTZ DEFAULT now(),
  updated_at                  TIMESTAMPTZ DEFAULT now()
);


-- ────────────────────────────────────────────────────────────────
-- 2. ORG_MEMBERS
--    Which auth users belong to which org, and their role.
--    role: 'owner'  — full control, billing
--          'admin'  — launch campaigns, view reports
--          'viewer' — view reports only
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.org_members (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id     UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT        NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (org_id, user_id)
);


-- ────────────────────────────────────────────────────────────────
-- 3. CREDIT_LEDGER
--    Append-only. Positive delta = grant / refund. Negative = spend.
--    Never UPDATE or DELETE rows here — corrections are new rows.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id      UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  delta       INTEGER     NOT NULL,          -- e.g. +500, -40, +3
  reason      TEXT        NOT NULL,          -- 'grant'|'campaign_send'|'expiry_refund'|'adjustment'
  campaign_id UUID,                          -- set for campaign_send / expiry_refund
  note        TEXT,
  created_by  UUID,                          -- admin or org user who caused it (nullable)
  created_at  TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT credit_ledger_delta_nonzero CHECK (delta <> 0)
);


-- ────────────────────────────────────────────────────────────────
-- 4. CAMPAIGNS
--    One send-event: an assessment sent to a list of employees.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.campaigns (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  org_id          UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  assessment_slug TEXT        NOT NULL,       -- matches the frontend assessment config slug
  title           TEXT        NOT NULL,
  -- 'draft'   — created, not yet launched (no credits spent)
  -- 'active'  — launched, invites sent, credits reserved
  -- 'closed'  — manually closed or expired; unused credits refunded
  status          TEXT        NOT NULL DEFAULT 'draft',
  closes_at       TIMESTAMPTZ,
  created_by      UUID,
  launched_at     TIMESTAMPTZ,
  closed_at       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);


-- ────────────────────────────────────────────────────────────────
-- 5. INVITATIONS
--    One row per employee per campaign. Carries the hashed token.
--    We store SHA-256(token) — the raw token lives only in the email,
--    exactly like a password hash. A leaked DB hands out no live links.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.invitations (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id  UUID        NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  -- Denormalised for simpler queries / RLS. Always == campaign.org_id.
  org_id       UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email        TEXT        NOT NULL,
  token_hash   TEXT        NOT NULL UNIQUE,   -- SHA-256 hex of the raw invite token
  -- 'pending' — created, credit reserved, email not yet sent
  -- 'sent'    — invite email dispatched
  -- 'opened'  — employee opened the link
  -- 'completed' — employee finished the assessment
  -- 'expired' — campaign closed before completion; credit refunded
  status       TEXT        NOT NULL DEFAULT 'pending',
  sent_at      TIMESTAMPTZ,
  opened_at    TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (campaign_id, email)
);


-- ────────────────────────────────────────────────────────────────
-- 6. INVITATION_RESPONSES
--    The employee's scored result. Org-owned, keyed by invitation.
--    NO user-facing RLS policy — reads go through server functions
--    that enforce the aggregate-only / individual-unlock privacy rule.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.invitation_responses (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id      UUID        NOT NULL UNIQUE REFERENCES public.invitations(id) ON DELETE CASCADE,
  campaign_id        UUID        NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  org_id             UUID        NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,

  assessment_slug    TEXT        NOT NULL,
  assessment_type    TEXT        NOT NULL,   -- 'standard'|'personality-compass'|'profile-based'
  total_score        INTEGER,
  percentage         INTEGER,
  primary_label      TEXT,
  secondary_label    TEXT,
  dimension_scores   JSONB,
  answers            JSONB       NOT NULL,

  -- If the employee later creates a CalmTree account to keep their
  -- result, we set this so it can be surfaced in their B2C dashboard.
  claimed_by_user_id UUID        REFERENCES auth.users(id) ON DELETE SET NULL,

  completed_at       TIMESTAMPTZ DEFAULT now()
);


-- ────────────────────────────────────────────────────────────────
-- 7. SECURITY DEFINER HELPERS
--    Mirror the is_admin() pattern from migration 007 — a policy that
--    queries the same table it protects would recurse. These run as
--    owner (bypass RLS) so membership checks never trigger recursion.
-- ────────────────────────────────────────────────────────────────

-- True if the current user belongs to the given org.
CREATE OR REPLACE FUNCTION public.is_org_member(p_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.org_members m
    WHERE m.org_id = p_org_id AND m.user_id = auth.uid()
  );
$$;

-- True if the current user is owner/admin of the given org.
CREATE OR REPLACE FUNCTION public.is_org_admin(p_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.org_members m
    WHERE m.org_id = p_org_id
      AND m.user_id = auth.uid()
      AND m.role IN ('owner', 'admin')
  );
$$;

-- Current credit balance for an org (sum of the ledger).
CREATE OR REPLACE FUNCTION public.org_credit_balance(p_org_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(delta), 0)::INTEGER
  FROM public.credit_ledger
  WHERE org_id = p_org_id;
$$;


-- ────────────────────────────────────────────────────────────────
-- 8. ATOMIC SPEND
--    Reserves p_amount credits for a campaign. Locks the org row so
--    two concurrent launches can't both pass the balance check and
--    overspend. Raises 'insufficient_credits' if the balance is short.
--    Returns the new balance.
-- ────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.spend_org_credits(
  p_org_id      UUID,
  p_amount      INTEGER,
  p_campaign_id UUID,
  p_created_by  UUID DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'amount_must_be_positive';
  END IF;

  -- Serialize all spends for this org — the FOR UPDATE lock is held
  -- until the surrounding transaction commits.
  PERFORM 1 FROM public.organizations WHERE id = p_org_id FOR UPDATE;

  SELECT COALESCE(SUM(delta), 0) INTO v_balance
  FROM public.credit_ledger WHERE org_id = p_org_id;

  IF v_balance < p_amount THEN
    RAISE EXCEPTION 'insufficient_credits' USING DETAIL = v_balance::text;
  END IF;

  INSERT INTO public.credit_ledger (org_id, delta, reason, campaign_id, created_by, note)
  VALUES (p_org_id, -p_amount, 'campaign_send', p_campaign_id, p_created_by,
          'Reserved ' || p_amount || ' credit(s) at launch');

  RETURN v_balance - p_amount;
END;
$$;


-- ────────────────────────────────────────────────────────────────
-- 9. ROW LEVEL SECURITY
--    Members may READ their org's org/membership/campaign rows (for
--    direct supabase reads if ever needed). All WRITES and all reads of
--    ledger / invitations / responses go through server functions using
--    the service-role client, which bypasses RLS. RLS here is
--    defense-in-depth: it ensures a leaked anon key can read nothing.
-- ────────────────────────────────────────────────────────────────

ALTER TABLE public.organizations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_ledger        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_responses ENABLE ROW LEVEL SECURITY;

-- organizations — members and platform admins can read.
CREATE POLICY "Members can view their organization"
  ON public.organizations FOR SELECT
  USING (public.is_org_member(id) OR public.is_admin());

-- org_members — a user can see membership rows for orgs they belong to.
CREATE POLICY "Members can view co-members"
  ON public.org_members FOR SELECT
  USING (public.is_org_member(org_id) OR public.is_admin());

-- credit_ledger — members can read (transparency), platform admins too.
CREATE POLICY "Members can view credit ledger"
  ON public.credit_ledger FOR SELECT
  USING (public.is_org_member(org_id) OR public.is_admin());

-- campaigns — members can read their org's campaigns.
CREATE POLICY "Members can view campaigns"
  ON public.campaigns FOR SELECT
  USING (public.is_org_member(org_id) OR public.is_admin());

-- invitations — NO user-facing policy. Contains employee PII + tokens.
--   Read via server functions only. Platform admin read for support:
CREATE POLICY "Admins can view invitations"
  ON public.invitations FOR SELECT
  USING (public.is_admin());

-- invitation_responses — NO user-facing policy. Individual results are
--   gated by the aggregation rule enforced in the server layer.
--   Platform admin read only:
CREATE POLICY "Admins can view invitation responses"
  ON public.invitation_responses FOR SELECT
  USING (public.is_admin());


-- ────────────────────────────────────────────────────────────────
-- 10. INDEXES
-- ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_org_members_user     ON public.org_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org      ON public.org_members(org_id);
CREATE INDEX IF NOT EXISTS idx_ledger_org           ON public.credit_ledger(org_id);
CREATE INDEX IF NOT EXISTS idx_ledger_campaign      ON public.credit_ledger(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_org        ON public.campaigns(org_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status     ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_invitations_campaign ON public.invitations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_invitations_org      ON public.invitations(org_id);
CREATE INDEX IF NOT EXISTS idx_invitations_status   ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_responses_campaign   ON public.invitation_responses(campaign_id);
CREATE INDEX IF NOT EXISTS idx_responses_org        ON public.invitation_responses(org_id);
CREATE INDEX IF NOT EXISTS idx_responses_claimed    ON public.invitation_responses(claimed_by_user_id);
