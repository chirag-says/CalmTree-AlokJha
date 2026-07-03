/**
 * /login — Public route for deep-link redirect-back auth.
 *
 * Accepts: ?redirect=/some/path (sanitized to same-origin paths only).
 *
 * Flow (single source of navigation — no effects, no races):
 *   - Not ready yet          → spinner (prevents SSR/first-paint flash).
 *   - No user                → show the OTP form.
 *   - Authed, not onboarded  → /onboarding?redirect=...
 *   - Authed, onboarded      → redirect target.
 *   - Authed, profile error  → go to target; the target's RequireAuth shows the Retry screen.
 */

import { createFileRoute, Navigate } from "@tanstack/react-router";
import { z } from "zod";
import { Logo } from "@/components/shared/Logo";
import { OtpFlow } from "@/components/auth/AuthModal";
import { FullPageSpinner } from "@/components/auth/RequireAuth";
import { useAuth } from "@/hooks/useAuth";

// ─── Route + search param validation ─────────────────────────────────────────

const searchSchema = z.object({
  redirect: z
    .string()
    .optional()
    .transform((v) => {
      // Only allow same-origin paths (must start with a single "/").
      if (!v || !v.startsWith("/") || v.startsWith("//")) return "/dashboard";
      return v;
    }),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Sign in | CalmTree" }],
  }),
  component: LoginPage,
});

// ─── Page ────────────────────────────────────────────────────────────────────

function LoginPage() {
  const { user, isReady, profile } = useAuth();
  const { redirect } = Route.useSearch();

  // Wait until auth + profile have resolved before deciding anything.
  if (!isReady) return <FullPageSpinner />;

  if (user) {
    if (profile && !profile.onboarding_completed) {
      return <Navigate to="/onboarding" search={{ redirect }} />;
    }
    // Onboarded, or profile failed to load (RequireAuth on the target handles the error).
    return <Navigate to={redirect as "/dashboard"} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo static />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Sign in to CalmTree</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email. We'll send you a one-time code. No password needed.
            </p>
          </div>

          {/* On success, auth state updates and the redirects above take over. */}
          <OtpFlow onSuccess={() => {}} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By signing in you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
