-- ═══════════════════════════════════════════════════════════════
-- CalmTree — Migration 005
-- Fixes: "Users can update own profile" (migration 002) has no
--        WITH CHECK, and Postgres RLS has no way to compare a
--        column's proposed value against its prior value inside a
--        USING/WITH CHECK expression. Once is_admin was added
--        (migration 004), any authenticated user could self-grant
--        admin access via `update({ is_admin: true }).eq('id', uid)`
--        issued directly against PostgREST with their own JWT.
--
-- Fix: a BEFORE UPDATE trigger blocks any change to is_admin made
-- through an authenticated end-user session (auth.uid() IS NOT NULL).
-- Service-role writes (auth.uid() IS NULL — used by the admin.calmtree.in
-- backend, migrations, or a manual SQL-editor promotion) are unaffected,
-- since triggers still run for service-role connections even though RLS
-- itself is bypassed for them.
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.prevent_is_admin_self_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_admin IS DISTINCT FROM OLD.is_admin AND auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'is_admin cannot be changed via a user-authenticated update.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS prevent_is_admin_self_escalation_trigger ON public.profiles;
CREATE TRIGGER prevent_is_admin_self_escalation_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_is_admin_self_escalation();
