/**
 * /login — Public route for deep-link redirect-back auth.
 *
 * Accepts:
 *   ?redirect=/some/path  (sanitized to same-origin paths only)
 *   ?mode=individual|org  (which "door" — same OTP auth, different landing)
 *
 * Individual vs. organization sign-in use the *same* Supabase OTP auth. The only
 * difference is where you land afterwards and which gates apply:
 *   - individual → onboarding gate, then /dashboard (or the redirect target).
 *   - org        → straight to /org (org users skip consumer onboarding).
 *
 * Flow (single source of navigation — no effects, no races):
 *   - Not ready yet          → spinner (prevents SSR/first-paint flash).
 *   - No user                → show the OTP form (with the mode switcher).
 *   - Authed, org mode       → /org (or an explicit org redirect target).
 *   - Authed, not onboarded  → /onboarding?redirect=...
 *   - Authed, onboarded      → redirect target.
 *   - Authed, profile error  → go to target; the target's RequireAuth shows the Retry screen.
 */

import { createFileRoute, Navigate } from "@tanstack/react-router";
import { z } from "zod";
import { Logo } from "@/components/shared/Logo";
import { OtpFlow } from "@/components/auth/AuthModal";
import { AuthModeToggle } from "@/components/auth/AuthModeToggle";
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
  mode: z.enum(["individual", "org"]).optional().default("individual"),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Sign in | Calmtree" }],
  }),
  component: LoginPage,
});

// ─── Page ────────────────────────────────────────────────────────────────────

function LoginPage() {
  const { user, isReady, profile } = useAuth();
  const { redirect, mode } = Route.useSearch();
  const navigate = Route.useNavigate();
  const isOrg = mode === "org";

  // Wait until auth + profile have resolved before deciding anything.
  if (!isReady) return <FullPageSpinner />;

  if (user) {
    // Organization sign-in: skip the consumer onboarding gate and go to /org.
    // Honor an explicit org deep-link redirect (anything other than the default).
    if (isOrg) {
      return <Navigate to={(redirect !== "/dashboard" ? redirect : "/org") as "/org"} />;
    }
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
          {/* Individual ⇆ Organization switcher — same OTP auth, different landing.
              Selecting a mode only rewrites the `mode` search param (preserving
              `redirect`); the OTP form stays mounted so in-progress entry survives. */}
          <AuthModeToggle
            mode={mode}
            onSelect={(m) => navigate({ search: { redirect, mode: m }, replace: true })}
            className="mb-6"
          />

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">
              {isOrg ? "Organization sign in" : "Sign in to Calmtree"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {isOrg
                ? "Access your organization's dashboard. Enter your work email — we'll send you a one-time code."
                : "Enter your email. We'll send you a one-time code. No password needed."}
            </p>
          </div>

          {/* On success, auth state updates and the redirects above take over. */}
          <OtpFlow onSuccess={() => {}} />
        </div>

        {isOrg && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            New here?{" "}
            <a href="/for-organizations" className="text-primary hover:underline">
              Learn about Calmtree for organizations
            </a>
          </p>
        )}

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
