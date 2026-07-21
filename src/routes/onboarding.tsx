/**
 * /onboarding — Rich multi-step onboarding flow.
 *
 * Steps:
 *   1. Welcome + name confirmation
 *   2. Focus areas (multi-select ProductCategory chips)
 *   3. Experience level + primary goal
 *   4. Recommended assessments + finish
 *
 * Guards:
 *   - Not ready        → spinner
 *   - No user          → /login
 *   - Profile error    → Retry screen (shared)
 *   - Already onboarded → redirect target
 *
 * Step components are defined at MODULE level (not inside OnboardingPage) so they
 * keep a stable identity across renders — otherwise every chip click remounts the
 * step and inputs lose focus.
 */

import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import { FullPageSpinner } from "@/components/auth/RequireAuth";
import { completeOnboarding } from "@/server/functions/profile.functions";
import { ASSESSMENT_LIST } from "@/data/assessments";
import type { ProductCategory } from "@/data/assessments/types";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import posthogJs from "posthog-js";

// ─── Route ────────────────────────────────────────────────────────────────────

const searchSchema = z.object({
  redirect: z
    .string()
    .optional()
    .transform((v) => {
      if (!v || !v.startsWith("/") || v.startsWith("//")) return "/dashboard";
      return v;
    }),
});

export const Route = createFileRoute("/onboarding")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{ title: "Welcome to Calmtree | Personalize Your Experience" }],
  }),
  component: OnboardingPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

type ExperienceLevel = "new" | "some" | "experienced";
type Assessment = (typeof ASSESSMENT_LIST)[number];

const FOCUS_AREA_OPTIONS: { label: string; value: ProductCategory }[] = [
  { label: "Self-Awareness & Personality", value: "Self-Awareness & Personality" },
  { label: "Emotional Strength", value: "Emotional Strength & Everyday Mind" },
  { label: "Relationships", value: "Relationships & Emotional Connection" },
  { label: "Workplace Effectiveness", value: "Workplace Effectiveness" },
  { label: "Leadership & Teams", value: "Leadership & Teams" },
  { label: "Founders & Entrepreneurship", value: "Founders & Entrepreneurship" },
  { label: "Gen Z & Digital Life", value: "Gen Z & Digital Life" },
  { label: "Career Direction", value: "Career Direction" },
  { label: "Family & Parenting", value: "Family & Parenting" },
  { label: "Life Transitions", value: "Life Transitions & Healthy Ageing" },
];

const GOAL_OPTIONS = [
  "Understand myself better",
  "Manage stress and burnout",
  "Grow as a leader",
  "Improve my relationships",
  "Navigate a career change",
  "Build better habits",
  "Support my team",
];

const nameSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
});
type NameFields = z.infer<typeof nameSchema>;

// ─── Step indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i < current
              ? "bg-primary flex-1"
              : i === current
                ? "bg-primary flex-[2]"
                : "bg-border flex-1"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Step 0: Welcome + name (module-level, stable identity) ────────────────────

function NameStep({
  defaultName,
  onNext,
}: {
  defaultName: string;
  onNext: (name: string) => void;
}) {
  const form = useForm<NameFields>({
    resolver: zodResolver(nameSchema),
    defaultValues: { fullName: defaultName },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary mb-2">
          Welcome to Calmtree
        </p>
        <h2 className="text-2xl font-semibold">Let's personalize your experience</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A few quick questions so we can tailor your journey. Takes less than 2 minutes.
        </p>
      </div>

      <form onSubmit={form.handleSubmit((v) => onNext(v.fullName))} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="onboarding-name">What should we call you?</Label>
          <Input
            id="onboarding-name"
            placeholder="Your first name or full name"
            autoFocus
            {...form.register("fullName")}
          />
          {form.formState.errors.fullName && (
            <p className="text-xs text-destructive">{form.formState.errors.fullName.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

// ─── Step 1: Focus areas ───────────────────────────────────────────────────

function FocusAreasStep({
  focusAreas,
  toggle,
  onBack,
  onNext,
}: {
  focusAreas: ProductCategory[];
  toggle: (v: ProductCategory) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">What areas interest you most?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select all that apply. We'll show you relevant assessments.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FOCUS_AREA_OPTIONS.map((opt) => {
          const selected = focusAreas.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 ${
                selected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {selected && <CheckCircle2 className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />}
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} disabled={focusAreas.length === 0} className="flex-[2]">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 2: Experience + goal ─────────────────────────────────────────────

function GoalStep({
  experienceLevel,
  setExperienceLevel,
  primaryGoal,
  setPrimaryGoal,
  onBack,
  onNext,
  onSkip,
}: {
  experienceLevel: ExperienceLevel | null;
  setExperienceLevel: (v: ExperienceLevel) => void;
  primaryGoal: string | null;
  setPrimaryGoal: (v: string | null) => void;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">A bit more about you</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This helps us recommend the right starting point.
        </p>
      </div>

      {/* Experience */}
      <div>
        <p className="text-sm font-medium mb-3">
          How familiar are you with psychology / self-reflection?
        </p>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              { value: "new", label: "Just starting" },
              { value: "some", label: "Some experience" },
              { value: "experienced", label: "Very familiar" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setExperienceLevel(opt.value)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium border transition-all duration-200 ${
                experienceLevel === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div>
        <p className="text-sm font-medium mb-3">What's your main goal right now?</p>
        <div className="flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setPrimaryGoal(primaryGoal === g ? null : g)}
              className={`rounded-full px-4 py-2 text-sm border transition-all duration-200 ${
                primaryGoal === g
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-[2]">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Skip for now
      </button>
    </div>
  );
}

// ─── Step 3: Recommendations + finish ─────────────────────────────────────

function RecommendedStep({
  recommended,
  submitting,
  onBack,
  onStart,
  onFinish,
}: {
  recommended: Assessment[];
  submitting: boolean;
  onBack: () => void;
  onStart: (slug: string) => void;
  onFinish: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-primary">
            Personalized for you
          </p>
        </div>
        <h2 className="text-2xl font-semibold">Your recommended starting points</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Based on your interests, here's where we suggest you begin.
        </p>
      </div>

      {recommended.length > 0 ? (
        <div className="space-y-3">
          {recommended.map((a) => (
            <div
              key={a.slug}
              className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium">{a.meta.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.meta.duration}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={submitting}
                onClick={() => onStart(a.slug)}
              >
                Start
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Explore all our assessments in the library.
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} disabled={submitting} className="flex-1">
          Back
        </Button>
        <Button onClick={onFinish} disabled={submitting} className="flex-[2]">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Setting up…
            </>
          ) : (
            <>
              Go to dashboard
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function OnboardingPage() {
  const { user, isReady, profile, profileError, session, refreshProfile } = useAuth();
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [focusAreas, setFocusAreas] = useState<ProductCategory[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [primaryGoal, setPrimaryGoal] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 4;

  // Guards ---------------------------------------------------------------------
  if (!isReady) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" search={{ redirect }} />;
  if (profileError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold">We couldn't load your account</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">Please try again.</p>
        <Button className="mt-6" onClick={() => void refreshProfile()}>
          Retry
        </Button>
      </div>
    );
  }
  // Redirect an already-onboarded user who lands here. Suppressed while we're
  // mid-completion (`submitting`): completeAndThen() refreshes the profile —
  // flipping onboarding_completed to true — *before* it navigates. Without this
  // guard, that refresh would re-render and fire this declarative <Navigate to
  // "/dashboard">, which overrides our own imperative navigation to the chosen
  // assessment (the "Start" buttons all bounced to the dashboard).
  if (profile?.onboarding_completed && !submitting) {
    return <Navigate to={redirect as "/dashboard"} />;
  }

  // Persist onboarding, then run `after()` once state is consistent. Single
  // navigation — no Link/onClick race, no bounce back to /onboarding.
  async function completeAndThen(after: () => void) {
    if (!session?.access_token) {
      toast.error("Your session expired. Please sign in again.");
      void navigate({ to: "/login", search: { redirect } });
      return;
    }
    setSubmitting(true);

    const result = await completeOnboarding({
      data: {
        accessToken: session.access_token,
        fullName: fullName || (user?.user_metadata?.full_name as string) || "Friend",
        focusAreas,
        primaryGoal,
        experienceLevel,
      },
    });

    if ("error" in result && result.error) {
      toast.error(result.error);
      setSubmitting(false);
      return;
    }

    posthogJs.capture("onboarding_completed", {
      focus_areas: focusAreas,
      experience_level: experienceLevel,
    });

    await refreshProfile();
    after();
  }

  const recommended = ASSESSMENT_LIST.filter((a) =>
    focusAreas.some((f) => a.meta.productCategory === f),
  ).slice(0, 3);

  const stepEl = [
    <NameStep
      defaultName={(user?.user_metadata?.full_name as string | undefined) ?? ""}
      onNext={(name) => {
        setFullName(name);
        setStep(1);
      }}
    />,
    <FocusAreasStep
      focusAreas={focusAreas}
      toggle={(v) =>
        setFocusAreas((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))
      }
      onBack={() => setStep(0)}
      onNext={() => setStep(2)}
    />,
    <GoalStep
      experienceLevel={experienceLevel}
      setExperienceLevel={setExperienceLevel}
      primaryGoal={primaryGoal}
      setPrimaryGoal={setPrimaryGoal}
      onBack={() => setStep(1)}
      onNext={() => setStep(3)}
      onSkip={() => void completeAndThen(() => navigate({ to: redirect as "/dashboard" }))}
    />,
    <RecommendedStep
      recommended={recommended}
      submitting={submitting}
      onBack={() => setStep(2)}
      onStart={(slug) =>
        void completeAndThen(() => navigate({ to: "/assessments/$slug", params: { slug } }))
      }
      onFinish={() => void completeAndThen(() => navigate({ to: redirect as "/dashboard" }))}
    />,
  ][step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo static />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <StepIndicator current={step} total={totalSteps} />
          {stepEl}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Step {step + 1} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
