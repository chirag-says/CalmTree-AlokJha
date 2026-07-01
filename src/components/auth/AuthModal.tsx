/**
 * OTP-first AuthModal — replaces the password-first modal.
 *
 * Primary flow: email → OTP code → signed in.
 * Secondary flow: "Sign in with password" link reveals the legacy form
 *                 for users who have set a password.
 *
 * This same underlying OTP logic is also exposed as <EmailGateForm>
 * for the inline (non-modal) report-gate usage.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { usePostHog } from "@posthog/react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

// ─── Schemas ─────────────────────────────────────────────────────────────────

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

const otpSchema = z.object({
  token: z.string().length(6, "Please enter the 6-digit code."),
});

const passwordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required."),
});

type EmailFields = z.infer<typeof emailSchema>;
type OtpFields = z.infer<typeof otpSchema>;
type PasswordFields = z.infer<typeof passwordSchema>;

// ─── OTP flow sub-components ─────────────────────────────────────────────────

/** Step 1: collect email, send OTP */
function OtpEmailStep({
  onCodeSent,
  onUsePassword,
}: {
  onCodeSent: (email: string) => void;
  onUsePassword: () => void;
}) {
  const { sendOtp } = useAuth();
  const posthog = usePostHog();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFields>({ resolver: zodResolver(emailSchema) });

  async function onSubmit(values: EmailFields) {
    const { error } = await sendOtp(values.email);
    if (error) {
      toast.error(error);
      return;
    }
    posthog.capture("email_captured");
    toast.success("Code sent! Check your inbox.");
    onCodeSent(values.email);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="otp-email">Email address</Label>
        <Input
          id="otp-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Sending code…
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            Continue with email
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Have a password?{" "}
        <button
          type="button"
          onClick={onUsePassword}
          className="text-primary underline-offset-4 hover:underline cursor-pointer"
        >
          Sign in with password
        </button>
      </p>
    </form>
  );
}

/** Step 2: enter 6-digit OTP code */
function OtpVerifyStep({
  email,
  onSuccess,
  onBack,
}: {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const { verifyOtp, sendOtp } = useAuth();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<OtpFields>({ resolver: zodResolver(otpSchema) });

  const token = watch("token") ?? "";

  async function onSubmit(values: OtpFields) {
    const { error } = await verifyOtp(email, values.token);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("You're in!");
    onSuccess();
  }

  async function handleResend() {
    const { error } = await sendOtp(email);
    if (error) {
      toast.error(error);
    } else {
      toast.success("New code sent.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Enter the 6-digit code we sent to <strong>{email}</strong>
      </p>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={token} onChange={(val) => setValue("token", val)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || token.length < 6}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Verifying…
          </>
        ) : (
          <>
            <KeyRound className="h-4 w-4" />
            Verify code
          </>
        )}
      </Button>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button type="button" onClick={onBack} className="hover:text-foreground">
          ← Change email
        </button>
        <button type="button" onClick={handleResend} className="text-primary hover:underline">
          Resend code
        </button>
      </div>
    </form>
  );
}

/** Password fallback (secondary path) */
function PasswordFallbackStep({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFields>({ resolver: zodResolver(passwordSchema) });

  async function onSubmit(values: PasswordFields) {
    const { error } = await signIn(values.email, values.password);
    if (error) {
      toast.error(error);
      return;
    }
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="pw-email">Email</Label>
        <Input id="pw-email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pw-password">Password</Label>
        <Input
          id="pw-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        <button type="button" onClick={onBack} className="hover:text-foreground">
          ← Use email code instead
        </button>
      </p>
    </form>
  );
}

// ─── OTP step machine (shared between modal and inline gate) ──────────────────

type OtpStep = "email" | "verify" | "password";

interface OtpFlowProps {
  onSuccess: () => void;
  /** Optional: hint shown to the user */
  prompt?: string;
}

export function OtpFlow({ onSuccess, prompt }: OtpFlowProps) {
  const [step, setStep] = useState<OtpStep>("email");
  const [pendingEmail, setPendingEmail] = useState("");

  return (
    <div className="space-y-4">
      {prompt && <p className="text-sm text-muted-foreground text-center">{prompt}</p>}
      {step === "email" && (
        <OtpEmailStep
          onCodeSent={(email) => {
            setPendingEmail(email);
            setStep("verify");
          }}
          onUsePassword={() => setStep("password")}
        />
      )}
      {step === "verify" && (
        <OtpVerifyStep email={pendingEmail} onSuccess={onSuccess} onBack={() => setStep("email")} />
      )}
      {step === "password" && (
        <PasswordFallbackStep onSuccess={onSuccess} onBack={() => setStep("email")} />
      )}
    </div>
  );
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────

export interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional message shown above the form */
  prompt?: string;
}

export function AuthModal({ open, onOpenChange, prompt }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden gap-0">
        <div className="px-6 pt-6 pb-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Sign in to CalmTree</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {prompt ?? "Enter your email — we'll send you a one-time code. No password needed."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="px-6 pb-6">
          <OtpFlow prompt={undefined} onSuccess={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
