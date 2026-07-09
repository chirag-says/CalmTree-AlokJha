/**
 * ActivityTimeline — a vertical event timeline shared by the analytics live
 * feed and the per-user drawer. Maps PostHog events to human labels + icons.
 */

import type { ComponentType } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  ClipboardCheck,
  ClipboardList,
  Eye,
  LogIn,
  Mail,
  RotateCcw,
  Share2,
  ShoppingBag,
  ShoppingCart,
  UserPlus,
  XCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { TimelineEvent } from "@/server/functions/analytics.functions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";

interface EventMeta {
  icon: ComponentType<{ className?: string }>;
  label: string;
  tone: string;
}

function eventMeta(e: TimelineEvent): EventMeta {
  switch (e.event) {
    case "$pageview":
      return { icon: Eye, label: `Viewed ${e.path ?? "a page"}`, tone: "text-muted-foreground" };
    case "user_signed_in":
      return { icon: LogIn, label: "Signed in", tone: "text-info" };
    case "assessment_started":
      return {
        icon: ClipboardList,
        label: `Started ${e.assessment ?? "an assessment"}`,
        tone: "text-primary",
      };
    case "assessment_completed":
      return {
        icon: ClipboardCheck,
        label: `Completed ${e.assessment ?? "an assessment"}${e.resultType ? ` → ${e.resultType}` : ""}`,
        tone: "text-success",
      };
    case "assessment_retaken":
      return {
        icon: RotateCcw,
        label: `Retook ${e.assessment ?? "an assessment"}`,
        tone: "text-muted-foreground",
      };
    case "assessment_result_shared":
      return { icon: Share2, label: "Shared a result", tone: "text-info" };
    case "email_captured":
      return { icon: Mail, label: "Entered their email", tone: "text-info" };
    case "newsletter_subscribed":
      return { icon: Mail, label: "Subscribed to the newsletter", tone: "text-info" };
    case "onboarding_completed":
      return { icon: UserPlus, label: "Completed onboarding", tone: "text-success" };
    case "checkout_initiated":
      return {
        icon: ShoppingCart,
        label: `Started checkout${e.productType ? ` for ${e.productType}` : ""}`,
        tone: "text-warning",
      };
    case "purchase_completed":
      return {
        icon: ShoppingBag,
        label: `Purchased${e.productType ? ` ${e.productType}` : ""}`,
        tone: "text-success",
      };
    case "payment_dismissed":
      return { icon: XCircle, label: "Abandoned checkout", tone: "text-muted-foreground" };
    default:
      return { icon: Activity, label: e.event.replace(/_/g, " "), tone: "text-muted-foreground" };
  }
}

export function ActivityTimeline({
  events,
  isLoading = false,
  showUser = false,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: {
  events: TimelineEvent[];
  isLoading?: boolean;
  /** Show the distinct_id per row (analytics feed); off inside a user drawer. */
  showUser?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState icon={Activity} title="No activity" description="Nothing recorded yet." />;
  }

  return (
    <div>
      <ol className="relative space-y-1">
        {events.map((e, i) => {
          const meta = eventMeta(e);
          const Icon = meta.icon;
          return (
            <motion.li
              key={e.uuid}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.3) }}
              className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted/50"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted",
                  meta.tone,
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{meta.label}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(e.timestamp), { addSuffix: true })}
                  {showUser && e.distinctId ? ` · ${e.distinctId.slice(0, 8)}…` : ""}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
      {hasMore && onLoadMore && (
        <div className="mt-3 flex justify-center">
          <Button variant="outline" size="sm" onClick={onLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? "Loading…" : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}
