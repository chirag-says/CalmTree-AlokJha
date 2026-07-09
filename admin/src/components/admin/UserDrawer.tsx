/**
 * UserDrawer — right-side detail sheet for one user: profile, access
 * management (admin + entitlements), history, and (Phase 6) PostHog activity.
 */

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Loader2, PlayCircle, Shield, ShieldOff, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusPill, purchaseStatusTone } from "./StatusPill";
import { ConfirmDialog } from "./ConfirmDialog";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { SetupNotice } from "./SetupNotice";
import { ActivityTimeline } from "./ActivityTimeline";
import {
  useGrantEntitlement,
  useRevokeEntitlement,
  useSetUserAdmin,
  useUserDetail,
} from "@/data/admin-queries";
import { useUserSessions, useUserTimeline } from "@/data/analytics-queries";
import type { TimelineEvent } from "@/server/functions/analytics.functions";

const PRODUCT_CATEGORIES = [
  "Self-Awareness & Personality",
  "Emotional Strength & Everyday Mind",
  "Relationships & Emotional Connection",
  "Workplace Effectiveness",
  "Leadership & Teams",
  "Founders & Entrepreneurship",
  "Gen Z & Digital Life",
  "Career Direction",
  "Family & Parenting",
  "Life Transitions & Healthy Ageing",
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

export function UserDrawer({
  userId,
  currentAdminId,
  open,
  onOpenChange,
}: {
  userId: string | null;
  currentAdminId: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const detail = useUserDetail(open ? userId : null);
  const setAdmin = useSetUserAdmin();
  const grant = useGrantEntitlement();
  const revoke = useRevokeEntitlement();
  const [grantCategory, setGrantCategory] = useState<string>(PRODUCT_CATEGORIES[0]);

  const d = detail.data;
  const isSelf = userId === currentAdminId;
  const busy = setAdmin.isPending || grant.isPending || revoke.isPending;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>User detail</SheetTitle>
          <SheetDescription className="sr-only">
            Profile, access, and activity for this user.
          </SheetDescription>
        </SheetHeader>

        {detail.isPending ? (
          <div className="mt-4 space-y-3 px-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : detail.error || !d ? (
          <ErrorState
            message={detail.error?.message ?? "Could not load this user."}
            onRetry={() => void detail.refetch()}
          />
        ) : (
          <div className="space-y-4 px-4 pb-6">
            {/* Identity card */}
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/15 font-semibold text-primary">
                    {(d.profile.full_name ?? d.email ?? "?")[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {d.profile.full_name ?? "—"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{d.email ?? "no email"}</p>
                </div>
              </div>
              <p className="mt-2 break-all font-mono text-xs text-muted-foreground/60">
                {d.profile.id}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <StatusPill tone={d.profile.onboarding_completed ? "success" : "neutral"}>
                  {d.profile.onboarding_completed ? "Onboarded" : "Not onboarded"}
                </StatusPill>
                {d.profile.is_admin && <StatusPill tone="primary">Admin</StatusPill>}
                <StatusPill tone="neutral">
                  Joined {formatDistanceToNow(new Date(d.profile.created_at), { addSuffix: true })}
                </StatusPill>
                {d.lastSignInAt && (
                  <StatusPill tone="neutral">
                    Last seen {formatDistanceToNow(new Date(d.lastSignInAt), { addSuffix: true })}
                  </StatusPill>
                )}
              </div>
            </div>

            <Tabs defaultValue="profile">
              <TabsList className="w-full">
                <TabsTrigger value="profile" className="flex-1">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="access" className="flex-1">
                  Access
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1">
                  History
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* ── Profile ── */}
              <TabsContent value="profile" className="mt-4 space-y-4">
                <Section title="Onboarding">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Primary goal</dt>
                      <dd className="text-right text-foreground">
                        {d.profile.primary_goal ?? "—"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Experience level</dt>
                      <dd className="text-right text-foreground">
                        {d.profile.experience_level ?? "—"}
                      </dd>
                    </div>
                  </dl>
                  {d.profile.focus_areas && d.profile.focus_areas.length > 0 && (
                    <div className="mt-3">
                      <p className="mb-1.5 text-xs text-muted-foreground">Focus areas</p>
                      <div className="flex flex-wrap gap-1.5">
                        {d.profile.focus_areas.map((area: string) => (
                          <Badge key={area} variant="secondary">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Section>
              </TabsContent>

              {/* ── Access ── */}
              <TabsContent value="access" className="mt-4 space-y-4">
                <Section title="Admin access">
                  <ConfirmDialog
                    title={d.profile.is_admin ? "Revoke admin access?" : "Grant admin access?"}
                    description={`${d.email ?? d.profile.full_name ?? "This user"} will ${
                      d.profile.is_admin
                        ? "immediately lose access to this panel."
                        : "get full access to this admin panel."
                    }`}
                    confirmLabel={d.profile.is_admin ? "Revoke admin" : "Grant admin"}
                    destructive={d.profile.is_admin}
                    onConfirm={() =>
                      setAdmin
                        .mutateAsync({ userId: d.profile.id, isAdmin: !d.profile.is_admin })
                        .then(() => undefined)
                    }
                    trigger={
                      <Button
                        variant={d.profile.is_admin ? "destructive" : "outline"}
                        size="sm"
                        disabled={busy || isSelf}
                      >
                        {d.profile.is_admin ? (
                          <ShieldOff className="h-3.5 w-3.5" />
                        ) : (
                          <Shield className="h-3.5 w-3.5" />
                        )}
                        {d.profile.is_admin ? "Revoke admin" : "Grant admin"}
                      </Button>
                    }
                  />
                  {isSelf && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      You cannot change your own access.
                    </p>
                  )}
                </Section>

                <Section title={`Entitlements (${d.entitlements.length})`}>
                  {d.entitlements.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No entitlements.</p>
                  ) : (
                    <ul className="space-y-2">
                      {d.entitlements.map((e) => (
                        <li
                          key={e.id}
                          className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 px-3 py-2 text-sm"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-foreground">
                              {e.access_type === "universal"
                                ? "Universal access"
                                : (e.product_category ?? e.access_type)}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {e.payment_reference?.startsWith("manual:")
                                ? "manually granted"
                                : (e.payment_reference ?? "—")}
                            </p>
                          </div>
                          <ConfirmDialog
                            title="Remove this entitlement?"
                            description="The user loses access immediately."
                            confirmLabel="Revoke"
                            destructive
                            onConfirm={() =>
                              revoke
                                .mutateAsync({ entitlementId: e.id, userId: d.profile.id })
                                .then(() => undefined)
                            }
                            trigger={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0 text-muted-foreground hover:text-destructive"
                                disabled={busy}
                                title="Revoke"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Select value={grantCategory} onValueChange={setGrantCategory}>
                        <SelectTrigger className="min-w-0 flex-1 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        disabled={busy}
                        onClick={() =>
                          grant.mutate({
                            userId: d.profile.id,
                            accessType: "category",
                            productCategory: grantCategory,
                          })
                        }
                      >
                        {grant.isPending ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          "Grant category"
                        )}
                      </Button>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="self-start"
                      disabled={busy}
                      onClick={() =>
                        grant.mutate({ userId: d.profile.id, accessType: "universal" })
                      }
                    >
                      Grant universal access
                    </Button>
                  </div>
                </Section>
              </TabsContent>

              {/* ── History ── */}
              <TabsContent value="history" className="mt-4 space-y-4">
                <Section title={`Recent results (${d.results.length})`}>
                  {d.results.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No assessments taken.</p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {d.results.map((r) => (
                        <li key={r.id} className="flex items-center justify-between gap-2">
                          <span className="truncate text-foreground">{r.assessment_slug}</span>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {r.primary_label}
                            {r.percentage != null ? ` · ${r.percentage}%` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Section>

                <Section title={`Purchases (${d.purchases.length})`}>
                  {d.purchases.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No purchases.</p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {d.purchases.map((p) => (
                        <li key={p.id} className="flex items-center justify-between gap-2">
                          <span className="text-foreground">{p.product_type}</span>
                          <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            ₹{p.amount_paid_inr.toLocaleString("en-IN")}
                            <StatusPill tone={purchaseStatusTone(p.status)}>{p.status}</StatusPill>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Section>
              </TabsContent>

              {/* ── Activity (PostHog) ── */}
              <TabsContent value="activity" className="mt-4">
                <ActivityTab userId={d.profile.id} open={open} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

/** PostHog-backed sessions + event timeline for one user. */
function ActivityTab({ userId, open }: { userId: string; open: boolean }) {
  const sessions = useUserSessions(open ? userId : null);
  const timeline = useUserTimeline(open ? userId : null);

  const configured = !(
    (sessions.data && "notConfigured" in sessions.data && sessions.data.notConfigured) ||
    (timeline.data && "notConfigured" in timeline.data && timeline.data.notConfigured)
  );
  if (!configured) {
    return (
      <SetupNotice
        title="Connect PostHog"
        description="Add the PostHog server env vars to see this user's product activity and session recordings."
      />
    );
  }

  const sessionList = sessions.data && "sessions" in sessions.data ? sessions.data.sessions : [];
  const events: TimelineEvent[] =
    timeline.data && "events" in timeline.data ? timeline.data.events : [];

  return (
    <div className="space-y-4">
      <Section title={`Sessions (${sessionList.length})`}>
        {sessions.isPending ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : sessionList.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recorded sessions.</p>
        ) : (
          <ul className="space-y-2">
            {sessionList.map((s) => (
              <li
                key={s.sessionId}
                className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 px-3 py-2"
              >
                <div className="min-w-0 text-sm">
                  <p className="text-foreground">
                    {formatDistanceToNow(new Date(s.startedAt), { addSuffix: true })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDuration(s.durationS)} · {s.clicks} clicks
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild className="shrink-0">
                  <a href={s.replayUrl} target="_blank" rel="noreferrer">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Watch
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Event timeline">
        {timeline.isError ? (
          <ErrorState message={timeline.error?.message} onRetry={() => void timeline.refetch()} />
        ) : timeline.data && "noPostHogPerson" in timeline.data && timeline.data.noPostHogPerson ? (
          <EmptyState
            title="No product events"
            description="This user hasn't triggered any tracked events yet."
          />
        ) : (
          <ActivityTimeline events={events} isLoading={timeline.isPending} />
        )}
      </Section>
    </div>
  );
}
