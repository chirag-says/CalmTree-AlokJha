-- ═══════════════════════════════════════════════════════════════
-- CalmTree Auth & Access — Migration 002
-- Adds: profiles, assessment_results (with auth), entitlements
-- RLS policies, auto-create triggers, and indexes.
-- ═══════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────
-- 1. PROFILES
--    Extends auth.users with display name and avatar.
--    Created automatically via trigger on signup.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- ────────────────────────────────────────────────────────────────
-- 2. ASSESSMENT_RESULTS (replace)
--    Migration 001 created this table without auth; drop and
--    recreate with a non-nullable user_id FK, slug/type columns,
--    and the richer result shape the frontend scoring engine emits.
-- ────────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS public.assessment_results CASCADE;

CREATE TABLE public.assessment_results (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identifies which assessment was taken
  assessment_slug    TEXT        NOT NULL,  -- matches the slug in the frontend config
  assessment_type    TEXT        NOT NULL,  -- 'standard' | 'personality-compass' | 'profile-based'

  -- Scale / standard assessments
  total_score        INTEGER,
  percentage         INTEGER,
  primary_label      TEXT,                 -- archetype label OR primary profile label
  secondary_label    TEXT,                 -- secondary style for profile-based assessments

  -- Per-dimension breakdown (nullable — not all types produce dimensions)
  -- Shape: { "dimensionId": { "label": "...", "score": n, "percentage": n } }
  dimension_scores   JSONB,

  -- Raw answers keyed by question id — required for audit / re-scoring
  answers            JSONB       NOT NULL,

  completed_at       TIMESTAMPTZ DEFAULT now(),
  assessment_version TEXT        DEFAULT '1.0'
);


-- ────────────────────────────────────────────────────────────────
-- 3. ENTITLEMENTS
--    Tracks what content a user is allowed to access.
--    Free tier is granted automatically on signup.
--    Paid tiers are written by the payments webhook using the
--    service role (users cannot insert/update their own rows).
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.entitlements (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 'free' | 'category' | 'universal'
  access_type        TEXT        NOT NULL DEFAULT 'free',

  -- Matches the productCategory field on assessments.
  -- NULL means the entitlement covers all categories (universal access).
  product_category   TEXT,

  -- NULL means the entitlement never expires (e.g. free tier, lifetime purchase).
  expires_at         TIMESTAMPTZ,

  created_at         TIMESTAMPTZ DEFAULT now(),

  -- Stripe / payment-provider reference for paid tiers.
  payment_reference  TEXT
);


-- ────────────────────────────────────────────────────────────────
-- 4. TRIGGERS — auto-provision rows on signup
-- ────────────────────────────────────────────────────────────────

-- 4a. Create a profile row for every new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop before recreating so re-running the migration is idempotent
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 4b. Grant free-tier entitlement for every new user
CREATE OR REPLACE FUNCTION public.handle_new_user_entitlement()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.entitlements (user_id, access_type, product_category, expires_at)
  VALUES (NEW.id, 'free', NULL, NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_entitlement ON auth.users;
CREATE TRIGGER on_auth_user_entitlement
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_entitlement();


-- ────────────────────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────────

-- profiles -------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);


-- assessment_results ---------------------------------------------
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own results"
  ON public.assessment_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON public.assessment_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- entitlements ---------------------------------------------------
ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entitlements"
  ON public.entitlements FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT / UPDATE on entitlements is intentionally restricted to
-- the service role (no user-facing policy). The payments webhook
-- uses a service-role client that bypasses RLS entirely.


-- ────────────────────────────────────────────────────────────────
-- 6. INDEXES
-- ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_results_user_id   ON public.assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_slug      ON public.assessment_results(assessment_slug);
CREATE INDEX IF NOT EXISTS idx_results_completed ON public.assessment_results(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_entitlements_user ON public.entitlements(user_id);
