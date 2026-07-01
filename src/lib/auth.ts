/**
 * Auth helpers — thin, typed wrappers around supabase.auth.*
 * All network errors are surfaced as `{ error: string }` rather than thrown.
 *
 * OTP is the default/primary login method everywhere.
 * Password auth is kept as a secondary path for users who have set one.
 */

import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export async function signUp(
  email: string,
  password: string,
  fullName: string,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Auth is not configured." };
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  return { error: error?.message ?? null };
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Auth is not configured." };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error?.message ?? null };
}

export async function signOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(
  callback: (user: User | null, session: Session | null) => void,
): () => void {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null, session);
  });
  return () => data.subscription.unsubscribe();
}

// ─── OTP auth (primary path) ─────────────────────────────────────────────────

/**
 * Sends a 6-digit OTP code to the given email via Supabase Auth.
 * Works for both new and existing users (Supabase handles both transparently).
 * Configure the email template in the Supabase dashboard to send a 6-digit code
 * (not a magic-link) so the user stays in the same tab.
 */
export async function sendOtp(email: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Auth is not configured." };
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // shouldCreateUser: true is the default — new users are created automatically.
      shouldCreateUser: true,
    },
  });
  return { error: error?.message ?? null };
}

/**
 * Verifies the 6-digit OTP the user received by email.
 * On success the Supabase session is set and AuthContext picks it up automatically.
 */
export async function verifyOtp(
  email: string,
  token: string,
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Auth is not configured." };
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  return { error: error?.message ?? null };
}

/**
 * Lets an already-logged-in user set (or change) their password.
 * This is the optional "faster repeat login" path — never required.
 */
export async function setPassword(password: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Auth is not configured." };
  const { error } = await supabase.auth.updateUser({ password });
  return { error: error?.message ?? null };
}
