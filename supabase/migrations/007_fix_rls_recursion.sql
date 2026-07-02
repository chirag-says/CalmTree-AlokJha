-- ═══════════════════════════════════════════════════════════════
-- Migration 007 — Fix RLS infinite recursion on profiles
--
-- Root cause: "Admins can view all profiles" policy on public.profiles
-- queries public.profiles to check is_admin, causing Postgres to
-- recurse infinitely.
--
-- Fix: SECURITY DEFINER function that runs as table owner, bypassing
-- RLS, so the admin check never triggers the policy it lives in.
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- Drop the recursive policy on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate using the function — no self-reference, no recursion
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());
