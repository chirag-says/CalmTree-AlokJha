import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { usePostHog } from "@posthog/react";
import { supabase } from "@/lib/supabase";
import { signUp, signIn, signOut, sendOtp, verifyOtp, setPassword } from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  /** True while the initial session is being fetched from Supabase. */
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  /** OTP primary path — sends a 6-digit code to the given email. */
  sendOtp: (email: string) => Promise<{ error: string | null }>;
  /** OTP primary path — verifies the 6-digit code and signs the user in. */
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null }>;
  /** Optional — lets a logged-in user set a password for faster repeat logins. */
  setPassword: (password: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const posthog = usePostHog();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    // Populate initial session synchronously if already cached, then clear loading.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      // Identify returning users whose session was already active (by user ID only)
      if (data.session?.user) {
        posthog.identify(data.session.user.id);
      }
      setLoading(false);
    });

    // Keep state in sync with Supabase auth events (sign-in, sign-out, token refresh).
    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (event === "SIGNED_IN" && newSession?.user) {
        posthog.identify(newSession.user.id);
        posthog.capture("user_signed_in");
      } else if (event === "SIGNED_OUT") {
        posthog.reset();
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [posthog]);

  const value: AuthContextValue = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    sendOtp,
    verifyOtp,
    setPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}
