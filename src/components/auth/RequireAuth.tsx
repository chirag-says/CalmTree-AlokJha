/**
 * RequireAuth — single, declarative auth guard for protected areas.
 *
 * Replaces the old ad-hoc guards (some used window.location.href hard reloads,
 * some fell through to render protected content when the profile failed to load).
 *
 * Behavior:
 *   1. Not ready (auth/profile still resolving) → full-page spinner.
 *   2. No user                                  → redirect to /login?redirect=<here>.
 *   3. Profile failed to load                   → Retry screen (never strand the user).
 *   4. requireOnboarded && not onboarded        → redirect to /onboarding?redirect=<here>.
 *   5. Otherwise                                → render children.
 */

import { Navigate, useLocation } from "@tanstack/react-router";
import { useRef, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function ProfileErrorRetry() {
  const { refreshProfile, signOut } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-semibold text-foreground">We couldn't load your account</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Something went wrong reaching our servers. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => void refreshProfile()}>Retry</Button>
        <Button variant="outline" onClick={() => void signOut()}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

export function RequireAuth({
  requireOnboarded = true,
  children,
}: {
  /** Set false for routes reachable before onboarding is finished. */
  requireOnboarded?: boolean;
  children: ReactNode;
}) {
  const { user, isReady, profile, profileError } = useAuth();
  const location = useLocation();
  // Captured once when a redirect is first needed. RequireAuth re-renders while
  // the navigation is in flight (location already points at /login), so reading
  // location.href on every render would wrap the redirect param recursively.
  const redirectTarget = useRef<string | null>(null);

  if (!isReady) return <FullPageSpinner />;

  // location.href is the full path + query string (location.search is a parsed
  // object in TanStack Router, never concatenate it).
  if (!user) {
    redirectTarget.current ??= location.href.startsWith("/login") ? "/dashboard" : location.href;
    return <Navigate to="/login" search={{ redirect: redirectTarget.current }} />;
  }

  if (profileError) {
    redirectTarget.current = null;
    return <ProfileErrorRetry />;
  }

  if (requireOnboarded && profile && !profile.onboarding_completed) {
    redirectTarget.current ??= location.href.startsWith("/onboarding")
      ? "/dashboard"
      : location.href;
    return <Navigate to="/onboarding" search={{ redirect: redirectTarget.current }} />;
  }

  redirectTarget.current = null;
  return <>{children}</>;
}
