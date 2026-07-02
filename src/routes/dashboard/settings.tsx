/**
 * Dashboard — Settings (/dashboard/settings)
 * Name edit + optional password set + sign out.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { updateProfile } from "@/server/functions/profile.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — CalmTree Dashboard" }] }),
  component: Page,
});

const nameSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

type NameFields = z.infer<typeof nameSchema>;
type PasswordFields = z.infer<typeof passwordSchema>;

function Page() {
  const { user, session, profile, setPassword, refreshProfile } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const displayName = profile?.full_name ?? (user?.user_metadata?.full_name as string | undefined);

  // Name form
  const nameForm = useForm<NameFields>({
    resolver: zodResolver(nameSchema),
    defaultValues: { fullName: displayName ?? "" },
  });

  async function onSaveName(values: NameFields) {
    if (!supabase || !session?.access_token) {
      toast.error("Auth not configured.");
      return;
    }
    // The dashboard greeting reads profiles.full_name, while the sidebar chip
    // reads auth user_metadata — keep both in sync.
    const [{ error: metaError }, profileRes] = await Promise.all([
      supabase.auth.updateUser({ data: { full_name: values.fullName } }),
      updateProfile({
        data: { accessToken: session.access_token, fullName: values.fullName },
      }),
    ]);
    const profileError = "error" in profileRes ? profileRes.error : null;
    if (metaError || profileError) {
      toast.error(metaError?.message ?? profileError ?? "Could not update name.");
      return;
    }
    await refreshProfile();
    toast.success("Name updated.");
  }

  // Password form
  const passwordForm = useForm<PasswordFields>({ resolver: zodResolver(passwordSchema) });

  async function onSetPassword(values: PasswordFields) {
    const { error } = await setPassword(values.password);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Password set. You can now use it as an alternative login.");
      setShowPasswordForm(false);
      passwordForm.reset();
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account details.</p>
      </div>

      <div className="space-y-8 max-w-lg">
        {/* Email (read-only) */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold mb-4">Account</h2>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input value={user?.email ?? ""} disabled className="bg-muted" />
            <p className="text-xs text-muted-foreground">
              Your email is set from when you first signed in. Contact us to change it.
            </p>
          </div>
        </div>

        {/* Display name */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold mb-4">Display Name</h2>
          <form onSubmit={nameForm.handleSubmit(onSaveName)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="settings-name">Full name</Label>
              <Input
                id="settings-name"
                placeholder="Your name"
                {...nameForm.register("fullName")}
              />
              {nameForm.formState.errors.fullName && (
                <p className="text-xs text-destructive">
                  {nameForm.formState.errors.fullName.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={nameForm.formState.isSubmitting}>
              {nameForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                "Save name"
              )}
            </Button>
          </form>
        </div>

        {/* Optional password */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-base font-semibold mb-1">Password (optional)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Set a password if you'd like a faster way to sign in. You can always still use the email
            code method instead.
          </p>
          {!showPasswordForm ? (
            <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
              Set a password
            </Button>
          ) : (
            <form onSubmit={passwordForm.handleSubmit(onSetPassword)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  {...passwordForm.register("password")}
                />
                {passwordForm.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {passwordForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  {...passwordForm.register("confirm")}
                />
                {passwordForm.formState.errors.confirm && (
                  <p className="text-xs text-destructive">
                    {passwordForm.formState.errors.confirm.message}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                  {passwordForm.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Setting…
                    </>
                  ) : (
                    "Set password"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowPasswordForm(false);
                    passwordForm.reset();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
