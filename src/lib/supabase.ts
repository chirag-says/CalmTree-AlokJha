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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasCredentials = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasCredentials) {
  console.warn(
    "[CalmTree] Supabase credentials not configured. Assessment data will use local fallback.",
  );
}

/**
 * Supabase client — null when credentials are missing (dev / CI without .env).
 * Always guard usage: `if (supabase) { ... }` or use the local fallback path.
 */
export const supabase = hasCredentials
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
