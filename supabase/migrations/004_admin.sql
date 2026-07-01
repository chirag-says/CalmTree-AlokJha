-- ═══════════════════════════════════════════════════════════════
-- CalmTree Admin — Migration 004
-- Adds: is_admin flag on profiles.
--       Admin-read-all RLS policies on all user-data tables.
-- ═══════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────
-- 1. ADD is_admin COLUMN
--    Simple boolean. No RBAC — founder + 1 VA is the right scale.
--
--    MANUAL STEP (do NOT add to this file):
--    After Alok's account is created, run in the Supabase SQL editor:
--      UPDATE public.profiles SET is_admin = true WHERE id = '<alok-uuid>';
--    Never hardcode a UUID into version control.
-- ────────────────────────────────────────────────────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;


-- ────────────────────────────────────────────────────────────────
-- 2. ADMIN READ-ALL POLICIES
--    Each table gets one additional SELECT policy that allows any
--    row to be read by a user whose profiles.is_admin = true.
--    This is additive — existing user-only policies still apply.
-- ────────────────────────────────────────────────────────────────

-- Helper expression reused in all four policies:
--   EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin)

-- profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin
    )
  );

-- assessment_results
CREATE POLICY "Admins can view all assessment results"
  ON public.assessment_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin
    )
  );

-- entitlements
CREATE POLICY "Admins can view all entitlements"
  ON public.entitlements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin
    )
  );

-- purchases
CREATE POLICY "Admins can view all purchases"
  ON public.purchases FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin
    )
  );

-- ebooks (admins can also manage catalog — UPDATE/DELETE)
CREATE POLICY "Admins can manage ebooks"
  ON public.ebooks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin
    )
  );
