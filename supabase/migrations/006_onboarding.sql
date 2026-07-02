-- ═══════════════════════════════════════════════════════════════
-- CalmTree Onboarding — Migration 006
-- Adds onboarding fields to profiles to drive the gated funnel
-- and personalized dashboard.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed    BOOLEAN     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ,
  -- Product categories the user cares about (matches ProductCategory strings)
  ADD COLUMN IF NOT EXISTS focus_areas             TEXT[]      NOT NULL DEFAULT '{}',
  -- Free-text primary goal / intent captured in onboarding
  ADD COLUMN IF NOT EXISTS primary_goal            TEXT,
  -- Optional self-reported experience level: 'new' | 'some' | 'experienced'
  ADD COLUMN IF NOT EXISTS experience_level        TEXT;

-- No new RLS needed: existing "Users can update own profile" (002) and
-- "Admins can view all profiles" (004) already cover these columns.
