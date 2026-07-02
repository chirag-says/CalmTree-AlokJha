/**
 * /login — Admin sign-in (self-contained OTP, no dependency on the client's
 * AuthModal/assessment machinery). Same Supabase login as the main site;
 * RequireAdmin turns away non-admin accounts after they authenticate.
 */

import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin sign in — CalmTree" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { user, isReady, sendOtp, verifyOtp } = useAuth();
  const [phase, setPhase] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  // Once authenticated, go to the panel. RequireAdmin there gates non-admins.
  if (isReady && user) return <Navigate to="/admin" />;

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await sendOtp(email.trim());
    setBusy(false);
    if (error) return toast.error(error);
    toast.success("Code sent — check your inbox.");
    setPhase("code");
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await verifyOtp(email.trim(), code.trim());
    setBusy(false);
    if (error) return toast.error(error);
    // On success the auth state updates and the <Navigate> above takes over.
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#060f18] text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo static />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Admin sign in</h1>
            <p className="mt-2 text-sm text-white/60">
              {phase === "email"
                ? "Enter your admin email — we'll send a one-time code."
                : `Enter the 6-digit code sent to ${email}.`}
            </p>
          </div>

          {phase === "email" ? (
            <form onSubmit={requestCode} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-white/70">
                  Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@calmtree.in"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Send code
              </Button>
            </form>
          ) : (
            <form onSubmit={submitCode} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-code" className="text-white/70">
                  6-digit code
                </Label>
                <Input
                  id="admin-code"
                  inputMode="numeric"
                  required
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="bg-white/5 border-white/10 text-white tracking-[0.4em] text-center"
                />
              </div>
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <KeyRound className="h-4 w-4" />
                )}
                Verify & sign in
              </Button>
              <button
                type="button"
                onClick={() => setPhase("email")}
                className="w-full text-center text-xs text-white/40 hover:text-white/70"
              >
                Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
