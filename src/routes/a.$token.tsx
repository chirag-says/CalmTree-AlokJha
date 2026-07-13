/**
 * /a/$token — the B2B employee assessment runner.
 *
 * Public and standalone: NO AppShell, NO navbar, NO login. The employee arrives
 * from an invite email; the token in the URL is their authentication. We resolve
 * the token to a campaign + assessment, run the same assessment engine the B2C
 * app uses, and persist the result against the invitation (not a user account).
 */

import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AssessmentRunner } from "@/components/assessment/AssessmentRunner";
import { ProfileRunner } from "@/components/assessment/ProfileRunner";
import { getAssessment } from "@/data/assessments";
import { buildPayload } from "@/hooks/useResultPersistence";
import {
  getInvitationByToken,
  submitInvitationResponse,
} from "@/server/functions/invitations.functions";
import { SITE } from "@/data/constants";
import type {
  AssessmentConfig,
  ProfileAssessmentConfig,
  AssessmentResult,
} from "@/data/assessments/types";

export const Route = createFileRoute("/a/$token")({
  head: () => ({
    meta: [{ title: `Your assessment | ${SITE.name}` }, { name: "robots", content: "noindex" }],
  }),
  component: EmployeeRunnerPage,
});

// ─── Standalone shell ────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background" style={{ background: "var(--gradient-hero)" }}>
      <header className="mx-auto max-w-3xl px-5 pt-8 pb-2">
        <img src={SITE.logoPath} alt={SITE.name} className="h-8 w-auto" />
      </header>
      <main className="mx-auto max-w-3xl px-5 py-8 md:py-12">{children}</main>
      <footer className="mx-auto max-w-3xl px-5 pb-10 text-center">
        <p className="text-xs text-muted-foreground">
          Your individual answers are private. {SITE.name} shares only aggregated, anonymised
          results with your employer. {SITE.disclaimer}
        </p>
      </footer>
    </div>
  );
}

function CenteredCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
      <h1 className="text-2xl font-semibold mb-3">{title}</h1>
      <p className="text-muted-foreground">{body}</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function EmployeeRunnerPage() {
  const { token } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["invitation", token],
    queryFn: () => getInvitationByToken({ data: { token } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const submit = useMutation({
    mutationFn: (vars: {
      config: AssessmentConfig | ProfileAssessmentConfig;
      result: AssessmentResult;
      answers: Record<string, number>;
    }) => {
      const payload = buildPayload(vars.config, vars.result, vars.answers);
      return submitInvitationResponse({ data: { token, ...payload } });
    },
    onError: () => {
      toast.error("We couldn't save your response. Please check your connection and try again.");
    },
  });

  if (isLoading) {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-16 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading your assessment…</p>
        </div>
      </Shell>
    );
  }

  if (isError || !data || "error" in data) {
    const message =
      (data && "message" in data && (data.message as string)) || "This invite link is not valid.";
    return (
      <Shell>
        <CenteredCard title="Link unavailable" body={message} />
      </Shell>
    );
  }

  if (data.alreadyCompleted) {
    return (
      <Shell>
        <CenteredCard
          title="You're all done"
          body="You've already completed this assessment. Thank you — there's nothing more to do."
        />
      </Shell>
    );
  }

  const config = getAssessment(data.assessmentSlug);
  if (!config) {
    return (
      <Shell>
        <CenteredCard
          title="Assessment unavailable"
          body="This assessment could not be loaded. Please contact whoever invited you."
        />
      </Shell>
    );
  }

  const onComplete = (
    c: AssessmentConfig | ProfileAssessmentConfig,
    result: AssessmentResult,
    answers: Record<string, number>,
  ) => {
    submit.mutate({ config: c, result, answers });
  };

  return (
    <Shell>
      <div className="mb-6 text-center">
        <p className="text-sm text-muted-foreground">
          Invited by <span className="font-medium text-foreground">{data.orgName}</span>
        </p>
      </div>
      {config.type === "profile-based" ? (
        <ProfileRunner config={config as ProfileAssessmentConfig} onComplete={onComplete} />
      ) : (
        <AssessmentRunner config={config as AssessmentConfig} onComplete={onComplete} />
      )}
    </Shell>
  );
}
