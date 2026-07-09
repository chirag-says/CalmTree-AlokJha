import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { usePostHog } from "@posthog/react";
import { supabase } from "@/lib/supabase";
import { signUp, signIn, signOut as authSignOut, sendOtp, verifyOtp, setPassword } from "@/lib/auth";

// ─── Profile type (mirrors profiles table + migration 006 columns) ────────────

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  onboarding_completed: boolean;
  focus_areas: string[];
  primary_goal: string | null;
  experience_level: string | null;
}

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  /** True while the initial session is being fetched from Supabase. */
  loading: boolean;
  /** The user's profile row from public.profiles. null if not loaded yet or signed out. */
  profile: Profile | null;
  /** True while the profile is being fetched (only while user is present). */
  profileLoading: boolean;
  /** True when the profile could not be loaded (network/RLS). Guards show a Retry screen. */
  profileError: boolean;
  /** Combined ready flag — false while either auth or profile is still loading. */
  isReady: boolean;
  /**
   * True from the moment an intentional sign-out begins until the next sign-in.
   * Lets RequireAuth send the now-userless session to the landing page instead
   * of bouncing to /login?redirect=… (the deep-link path, only correct for a
   * genuine logged-out visitor).
   */
  signingOut: boolean;
  /** Re-fetch the profile row. Call after onboarding or settings save, or to retry. */
  refreshProfile: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  sendOtp: (email: string) => Promise<{ error: string | null }>;
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null }>;
  setPassword: (password: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const posthog = usePostHog();
  // Tracks whose profile we've already fetched, so re-emitted SIGNED_IN events
  // (Supabase fires one on every tab focus) don't reload the profile.
  const lastFetchedUserId = useRef<string | null>(null);

  // Fetch the profile row for a given userId.
  // Resilient: retries once, and self-heals a missing row (PGRST116) by upserting
  // a minimal profile so a signed-in user is never left profile-less. On genuine
  // failure it sets profileError=true (guards surface a Retry screen) instead of
  // silently leaving profile=null, which used to strand users on the login screen.
  const PROFILE_COLS =
    "id, full_name, avatar_url, is_admin, onboarding_completed, focus_areas, primary_goal, experience_level";

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return;
    const sb = supabase; // capture non-null for use inside closures
    setProfileLoading(true);
    setProfileError(false);

    const selectProfile = () => sb.from("profiles").select(PROFILE_COLS).eq("id", userId).single();

    let { data, error } = await selectProfile();

    // Row genuinely missing → create a minimal one, then re-read.
    if (error?.code === "PGRST116") {
      const { error: upsertError } = await sb
        .from("profiles")
        .upsert({ id: userId }, { onConflict: "id" });
      if (!upsertError) {
        ({ data, error } = await selectProfile());
      }
    } else if (error) {
      // Transient failure → one retry.
      ({ data, error } = await selectProfile());
    }

    if (error || !data) {
      console.error("[AuthContext] Failed to fetch profile:", error?.message);
      setProfile(null);
      setProfileError(true);
    } else {
      setProfile(data as Profile);
      setProfileError(false);
    }
    setProfileLoading(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  // Sign out and flag the transition. The SIGNED_OUT event clears `user`, at
  // which point RequireAuth would normally redirect to /login?redirect=<here>.
  // That's wrong for an intentional logout — `signingOut` tells RequireAuth to
  // send the user to the landing page instead. Flag clears on the next sign-in.
  const handleSignOut = useCallback(async () => {
    setSigningOut(true);
    await authSignOut();
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Populate initial session synchronously if already cached, then clear loading.
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setSession(data.session);
      setUser(sessionUser);
      if (sessionUser) {
        lastFetchedUserId.current = sessionUser.id;
        posthog.identify(sessionUser.id);
        // Kick off profile fetch immediately — profileLoading covers the gap.
        void fetchProfile(sessionUser.id);
      }
      setLoading(false);
    });

    // Keep state in sync with Supabase auth events.
    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      const newUser = newSession?.user ?? null;

      // Supabase re-emits SIGNED_IN / TOKEN_REFRESHED with fresh object
      // references on every tab focus. Preserve the previous reference when the
      // token/user id is unchanged — otherwise each tab switch churns state and
      // re-runs every page's data effect (skeletons flash, scroll resets).
      setSession((prev) =>
        prev?.access_token === newSession?.access_token ? prev : newSession,
      );
      setUser((prev) => (prev?.id === newUser?.id ? prev : newUser));

      if (event === "SIGNED_IN" && newUser) {
        setSigningOut(false);
        posthog.identify(newUser.id);
        // Only fetch the profile the first time we see this user. A re-emitted
        // SIGNED_IN for the same user must not reload the profile.
        if (lastFetchedUserId.current !== newUser.id) {
          lastFetchedUserId.current = newUser.id;
          posthog.capture("user_signed_in");
          void fetchProfile(newUser.id);
        }
      } else if (event === "SIGNED_OUT") {
        lastFetchedUserId.current = null;
        setProfile(null);
        setProfileLoading(false);
        setProfileError(false);
        posthog.reset();
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [posthog, fetchProfile]);

  // Block only on the *first* profile load (profile === null). Background
  // refreshes triggered by token renewal on tab focus must not flip isReady
  // back to false — that would blank the page with a spinner mid-session.
  const isReady = !loading && !(user && profileLoading && profile === null);

  const value: AuthContextValue = {
    user,
    session,
    loading,
    profile,
    profileLoading,
    profileError,
    isReady,
    signingOut,
    refreshProfile,
    signUp,
    signIn,
    signOut: handleSignOut,
    sendOtp,
    verifyOtp,
    setPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}
