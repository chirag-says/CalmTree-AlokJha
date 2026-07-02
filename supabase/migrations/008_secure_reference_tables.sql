-- ═══════════════════════════════════════════════════════════════
-- CalmTree — Migration 008
-- Secure leftover assessment-engine reference tables.
--
-- These tables were created by migration 001 but are NOT used by the app,
-- which reads all assessment data from local TypeScript config
-- (src/data/assessments). With RLS disabled they were exposed through
-- Supabase's auto-generated REST API. Enabling RLS with no policies removes
-- all API access (the app doesn't need it).
--
-- If you ever decide to serve this reference data via the API, add explicit
-- SELECT policies (e.g. a public read-only policy).
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.assessments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archetypes             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dimension_rules        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personality_archetypes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scale_options          ENABLE ROW LEVEL SECURITY;
