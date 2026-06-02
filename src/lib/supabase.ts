/**
 * Supabase Client — single instance, reused everywhere.
 *
 * Environment variables:
 *   VITE_SUPABASE_URL     — project URL (e.g. https://xxx.supabase.co)
 *   VITE_SUPABASE_ANON_KEY — public anon key
 *
 * These are safe to expose in client-side code — Row Level Security
 * on Supabase handles authorization.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[CalmTree] Supabase credentials not configured. Assessment data will use local fallback.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
