/**
 * /login — Admin sign-in (email + password only; no OTP, no self-signup).
 * Same Supabase auth as the main site; RequireAdmin turns away non-admin
 * accounts after they authenticate. Admin accounts are seeded manually.
 */

import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, KeyRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin sign in — Calmtree" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { user, isReady, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const reducedMotion = useReducedMotion();

  // Once authenticated, go to the panel. RequireAdmin there gates non-admins.
  if (isReady && user) return <Navigate to="/admin" />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) return toast.error(error);
    // On success the auth state updates and the <Navigate> above takes over.
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground">
      {/* Subtle radial glow behind the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 35%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        <div className="mb-8 flex justify-center">
          <Logo static />
        </div>
        <div className="glass rounded-2xl p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Admin sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your admin email and password.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@calmtree.in"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              Sign in
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          Admin access is provisioned manually — there is no self-signup.
        </p>
      </motion.div>
    </div>
  );
}
