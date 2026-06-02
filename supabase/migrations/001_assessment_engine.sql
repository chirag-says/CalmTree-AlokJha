-- ═══════════════════════════════════════════════════════════════
-- CalmTree Assessment Engine — Supabase Database Schema
-- Run this in the Supabase SQL Editor to create all tables.
-- ═══════════════════════════════════════════════════════════════

-- 1. Assessments (master table)
CREATE TABLE IF NOT EXISTS assessments (
  id TEXT PRIMARY KEY,                    -- slug (e.g. "burnout-risk-check")
  name TEXT NOT NULL,                     -- display name
  subtitle TEXT,
  description TEXT,
  purpose TEXT,
  category TEXT NOT NULL,                 -- "Mental Wellness", "Personal Growth", etc.
  type TEXT NOT NULL DEFAULT 'standard',  -- "standard" or "personality-compass"
  tier TEXT NOT NULL DEFAULT 'discovery', -- "discovery", "growth", "professional"
  icon TEXT NOT NULL DEFAULT 'clipboard-check',
  duration TEXT DEFAULT 'Under 2 minutes',
  question_count INTEGER NOT NULL DEFAULT 10,
  instructions TEXT,
  scoring_method TEXT NOT NULL DEFAULT 'sum',
  min_score INTEGER NOT NULL DEFAULT 10,
  max_score INTEGER NOT NULL DEFAULT 50,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',  -- "active", "draft", "archived"
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Questions
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,                    -- e.g. "a1q1"
  assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  dimension TEXT,                         -- e.g. "recovery", "overload"
  reverse_scored BOOLEAN DEFAULT false,
  weight NUMERIC DEFAULT 1,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Scale Options (shared across all assessments using Likert 1-5)
CREATE TABLE IF NOT EXISTS scale_options (
  id SERIAL PRIMARY KEY,
  option_text TEXT NOT NULL,
  score INTEGER NOT NULL,
  display_order INTEGER NOT NULL
);

-- Seed the standard Likert 1-5 scale
INSERT INTO scale_options (option_text, score, display_order) VALUES
  ('Almost Never', 1, 1),
  ('Rarely', 2, 2),
  ('Sometimes', 3, 3),
  ('Often', 4, 4),
  ('Almost Always', 5, 5)
ON CONFLICT DO NOTHING;

-- 4. Interpretation Bands / Archetypes
CREATE TABLE IF NOT EXISTS archetypes (
  id SERIAL PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  label TEXT NOT NULL,                    -- e.g. "Exhausted Warrior"
  interpretation TEXT,
  color TEXT DEFAULT 'green',
  display_order INTEGER NOT NULL DEFAULT 0
);

-- 5. Dimension Rules
CREATE TABLE IF NOT EXISTS dimension_rules (
  id SERIAL PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  dimension_id TEXT NOT NULL,             -- e.g. "recovery"
  dimension_label TEXT NOT NULL,          -- e.g. "Recovery"
  question_ids TEXT[] NOT NULL            -- array of question IDs
);

-- 6. Personality Archetypes (for Personality Compass only)
CREATE TABLE IF NOT EXISTS personality_archetypes (
  id SERIAL PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  profile TEXT NOT NULL,                  -- e.g. "structured+logic+introvert"
  label TEXT NOT NULL,                    -- e.g. "Strategic Builder"
  description TEXT
);

-- 7. User Assessment Results
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,                           -- nullable for anonymous users
  assessment_id TEXT NOT NULL REFERENCES assessments(id),
  total_score INTEGER,
  percentage INTEGER,
  archetype TEXT,
  dimension_scores JSONB,                 -- {"Recovery": 12, "Overload": 15, ...}
  answers JSONB,                          -- raw answers for audit
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Recommendations (cross-sell engine)
CREATE TABLE IF NOT EXISTS recommendations (
  id SERIAL PRIMARY KEY,
  assessment_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  trigger_condition TEXT NOT NULL,        -- e.g. "score > 35"
  recommendation_text TEXT NOT NULL,
  recommendation_type TEXT DEFAULT 'guide', -- "guide", "course", "assessment"
  target_url TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_assessment ON questions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_archetypes_assessment ON archetypes(assessment_id);
CREATE INDEX IF NOT EXISTS idx_dimension_rules_assessment ON dimension_rules(assessment_id);
CREATE INDEX IF NOT EXISTS idx_results_user ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_assessment ON assessment_results(assessment_id);

-- Row Level Security (enable later when auth is configured)
-- ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own results" ON assessment_results
--   FOR SELECT USING (auth.uid() = user_id);
-- CREATE POLICY "Users can insert own results" ON assessment_results
--   FOR INSERT WITH CHECK (auth.uid() = user_id);
