/**
 * analytics.functions.ts — PostHog-backed server functions for the admin
 * analytics surface.
 *
 * Every handler: requireAdmin(accessToken) → notConfigured short-circuit →
 * cached HogQL query. User input is validated with zod and passed to HogQL
 * via placeholder `values` (never string-interpolated). The Personal API Key
 * lives only in server env and never appears in any response.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin.functions";
import {
  cachedQuery,
  getPostHogConfig,
  PostHogRateLimitError,
  queryHogQL,
  replayUrl,
  rowsToObjects,
} from "../posthog.server";

// ─── Shared ───────────────────────────────────────────────────────────────────

const PeriodSchema = z.enum(["7d", "30d", "90d"]);
type Period = z.infer<typeof PeriodSchema>;
const PERIOD_DAYS: Record<Period, number> = { "7d": 7, "30d": 30, "90d": 90 };

const AuthPeriodSchema = z.object({ accessToken: z.string(), period: PeriodSchema });

/** Consistent guard: returns null when OK, or an error result to return. */
async function guard(
  accessToken: string,
): Promise<{ error: string } | { notConfigured: true } | null> {
  try {
    await requireAdmin(accessToken);
  } catch {
    return { error: "Forbidden" };
  }
  if (!getPostHogConfig()) return { notConfigured: true };
  return null;
}

/** Wraps a query body, translating PostHog failures into safe results. */
async function safeQuery<T>(fn: () => Promise<T>): Promise<T | { error: string }> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof PostHogRateLimitError) {
      return { error: "Analytics is rate-limited. Try again shortly." };
    }
    console.error("[analytics] query error:", err);
    return { error: "Analytics query failed." };
  }
}

/** Builds a continuous, zero-filled day window so charts don't skip days. */
function emptyDayWindow(days: number): Map<string, TrendDay> {
  const map = new Map<string, TrendDay>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    map.set(key, {
      date: key,
      pageviews: 0,
      uniqueUsers: 0,
      assessmentsStarted: 0,
      assessmentsCompleted: 0,
      checkouts: 0,
      purchases: 0,
      signIns: 0,
    });
  }
  return map;
}

// ─── 1. Daily trends ──────────────────────────────────────────────────────────

export interface TrendDay {
  date: string;
  pageviews: number;
  uniqueUsers: number;
  assessmentsStarted: number;
  assessmentsCompleted: number;
  checkouts: number;
  purchases: number;
  signIns: number;
}

export const getAnalyticsTrends = createServerFn({ method: "POST" })
  .inputValidator(AuthPeriodSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;
    const days = PERIOD_DAYS[data.period];

    return safeQuery(async () => {
      const result = await cachedQuery(`trends:${data.period}`, 5 * 60_000, () =>
        queryHogQL(
          `SELECT toDate(timestamp) AS day,
                  countIf(event = '$pageview') AS pageviews,
                  count(DISTINCT person_id) AS unique_users,
                  countIf(event = 'assessment_started') AS assessments_started,
                  countIf(event = 'assessment_completed') AS assessments_completed,
                  countIf(event = 'checkout_initiated') AS checkouts,
                  countIf(event = 'purchase_completed') AS purchases,
                  countIf(event = 'user_signed_in') AS sign_ins
           FROM events
           WHERE timestamp >= now() - INTERVAL ${days} DAY
           GROUP BY day ORDER BY day ASC
           LIMIT 200`,
        ),
      );

      const window = emptyDayWindow(days);
      for (const row of rowsToObjects(result)) {
        const key = String(row.day).slice(0, 10);
        const day = window.get(key);
        if (day) {
          day.pageviews = Number(row.pageviews) || 0;
          day.uniqueUsers = Number(row.unique_users) || 0;
          day.assessmentsStarted = Number(row.assessments_started) || 0;
          day.assessmentsCompleted = Number(row.assessments_completed) || 0;
          day.checkouts = Number(row.checkouts) || 0;
          day.purchases = Number(row.purchases) || 0;
          day.signIns = Number(row.sign_ins) || 0;
        }
      }
      return { days: [...window.values()] };
    });
  });

// ─── 2. Event breakdown ───────────────────────────────────────────────────────

export const getEventBreakdown = createServerFn({ method: "POST" })
  .inputValidator(AuthPeriodSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;
    const days = PERIOD_DAYS[data.period];

    return safeQuery(async () => {
      const result = await cachedQuery(`events:${data.period}`, 5 * 60_000, () =>
        queryHogQL(
          `SELECT event, count() AS total, count(DISTINCT person_id) AS unique_users
           FROM events
           WHERE timestamp >= now() - INTERVAL ${days} DAY
           GROUP BY event ORDER BY total DESC
           LIMIT 50`,
        ),
      );
      const events = rowsToObjects(result).map((r) => ({
        event: String(r.event),
        total: Number(r.total) || 0,
        uniqueUsers: Number(r.unique_users) || 0,
      }));
      return { events };
    });
  });

// ─── 3. Conversion funnel ─────────────────────────────────────────────────────

export const getConversionFunnel = createServerFn({ method: "POST" })
  .inputValidator(AuthPeriodSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;
    const days = PERIOD_DAYS[data.period];

    return safeQuery(async () => {
      const result = await cachedQuery(`funnel:${data.period}`, 5 * 60_000, () =>
        queryHogQL(
          `SELECT
             count(DISTINCT if(event = 'assessment_started',  person_id, NULL)) AS started,
             count(DISTINCT if(event = 'assessment_completed', person_id, NULL)) AS completed,
             count(DISTINCT if(event = 'checkout_initiated',   person_id, NULL)) AS checkout,
             count(DISTINCT if(event = 'purchase_completed',   person_id, NULL)) AS purchased
           FROM events
           WHERE timestamp >= now() - INTERVAL ${days} DAY`,
        ),
      );
      const row = rowsToObjects(result)[0] ?? {};
      const started = Number(row.started) || 0;
      const completed = Number(row.completed) || 0;
      const checkout = Number(row.checkout) || 0;
      const purchased = Number(row.purchased) || 0;
      const pct = (n: number) => (started > 0 ? Math.round((n / started) * 100) : 0);
      return {
        steps: [
          { label: "Started assessment", count: started, pct: 100 },
          { label: "Completed assessment", count: completed, pct: pct(completed) },
          { label: "Initiated checkout", count: checkout, pct: pct(checkout) },
          { label: "Purchased", count: purchased, pct: pct(purchased) },
        ],
        overallPct: pct(purchased),
      };
    });
  });

// ─── 4. Recent events feed ────────────────────────────────────────────────────

const RecentEventsSchema = z.object({
  accessToken: z.string(),
  before: z.string().datetime().optional(),
  includePageviews: z.boolean().optional(),
});

export interface TimelineEvent {
  uuid: string;
  event: string;
  timestamp: string;
  distinctId: string;
  personId: string | null;
  path: string | null;
  sessionId: string | null;
  assessment: string | null;
  resultType: string | null;
  productType: string | null;
  productRef: string | null;
}

export const getRecentEvents = createServerFn({ method: "POST" })
  .inputValidator(RecentEventsSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;

    const before = data.before ?? new Date().toISOString();
    // Hide PostHog's auto-captured noise ($autocapture, $rageclick, $pageview,
    // …) — they all start with '$'. The toggle brings back only $pageview.
    const eventFilter = data.includePageviews
      ? "AND (event NOT LIKE '$%' OR event = '$pageview')"
      : "AND event NOT LIKE '$%'";

    return safeQuery(async () => {
      const result = await cachedQuery(
        `recent:${before}:${data.includePageviews ? 1 : 0}`,
        60_000,
        () =>
          queryHogQL(
            `SELECT uuid, event, timestamp, distinct_id, person_id,
                    properties.$pathname AS path,
                    properties.$session_id AS session_id,
                    properties.assessment AS assessment,
                    properties.result_type AS result_type,
                    properties.product_type AS product_type,
                    properties.product_ref AS product_ref
             FROM events
             WHERE timestamp < toDateTime({before}) ${eventFilter}
             ORDER BY timestamp DESC
             LIMIT 50`,
            { before },
          ),
      );
      const events = mapTimeline(result);
      const nextCursor = events.length === 50 ? events[events.length - 1].timestamp : null;
      return { events, nextCursor };
    });
  });

// ─── 5. Per-user timeline ─────────────────────────────────────────────────────

const UserTimelineSchema = z.object({
  accessToken: z.string(),
  userId: z.string().uuid(),
  before: z.string().datetime().optional(),
});

export const getUserTimeline = createServerFn({ method: "POST" })
  .inputValidator(UserTimelineSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;

    const before = data.before ?? new Date().toISOString();

    return safeQuery(async () => {
      const result = await cachedQuery(`timeline:${data.userId}:${before}`, 60_000, () =>
        queryHogQL(
          // Filter on person_id (resolved from distinct_id) so anonymous
          // pre-login events merged by identify() are included.
          `SELECT uuid, event, timestamp, distinct_id, person_id,
                  properties.$pathname AS path,
                  properties.$session_id AS session_id,
                  properties.assessment AS assessment,
                  properties.result_type AS result_type,
                  properties.product_type AS product_type,
                  properties.product_ref AS product_ref
           FROM events
           WHERE person_id = (
                   SELECT person_id FROM person_distinct_ids
                   WHERE distinct_id = {distinct_id} LIMIT 1
                 )
             AND timestamp < toDateTime({before})
           ORDER BY timestamp DESC
           LIMIT 100`,
          { distinct_id: data.userId, before },
        ),
      );
      const events = mapTimeline(result);
      return { events, noPostHogPerson: events.length === 0 };
    });
  });

// ─── 6. Per-user session list (replay links) ──────────────────────────────────

const UserSessionsSchema = z.object({
  accessToken: z.string(),
  userId: z.string().uuid(),
});

export interface UserSession {
  sessionId: string;
  startedAt: string;
  endedAt: string;
  durationS: number;
  clicks: number;
  replayUrl: string;
}

export const getUserSessions = createServerFn({ method: "POST" })
  .inputValidator(UserSessionsSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;

    return safeQuery(async () => {
      const result = await cachedQuery(`sessions:${data.userId}`, 60_000, () =>
        queryHogQL(
          `SELECT session_id,
                  min(min_first_timestamp) AS started_at,
                  max(max_last_timestamp)  AS ended_at,
                  dateDiff('second', min(min_first_timestamp), max(max_last_timestamp)) AS duration_s,
                  sum(click_count) AS clicks
           FROM raw_session_replay_events
           WHERE distinct_id IN (
                   SELECT distinct_id FROM person_distinct_ids
                   WHERE person_id = (SELECT person_id FROM person_distinct_ids
                                      WHERE distinct_id = {distinct_id} LIMIT 1)
                 )
           GROUP BY session_id
           ORDER BY started_at DESC
           LIMIT 20`,
          { distinct_id: data.userId },
        ),
      );
      const sessions: UserSession[] = rowsToObjects(result).map((r) => ({
        sessionId: String(r.session_id),
        startedAt: String(r.started_at),
        endedAt: String(r.ended_at),
        durationS: Number(r.duration_s) || 0,
        clicks: Number(r.clicks) || 0,
        replayUrl: replayUrl(String(r.session_id)),
      }));
      return { sessions };
    });
  });

// ─── 7 & 8. Top pages / referrers ─────────────────────────────────────────────

export const getTopPages = createServerFn({ method: "POST" })
  .inputValidator(AuthPeriodSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;
    const days = PERIOD_DAYS[data.period];

    return safeQuery(async () => {
      const result = await cachedQuery(`pages:${data.period}`, 5 * 60_000, () =>
        queryHogQL(
          `SELECT properties.$pathname AS path, count() AS views,
                  count(DISTINCT person_id) AS visitors
           FROM events
           WHERE event = '$pageview' AND timestamp >= now() - INTERVAL ${days} DAY
           GROUP BY path ORDER BY views DESC
           LIMIT 20`,
        ),
      );
      const pages = rowsToObjects(result).map((r) => ({
        path: r.path ? String(r.path) : "(unknown)",
        views: Number(r.views) || 0,
        visitors: Number(r.visitors) || 0,
      }));
      return { pages };
    });
  });

export const getReferrerBreakdown = createServerFn({ method: "POST" })
  .inputValidator(AuthPeriodSchema)
  .handler(async ({ data }) => {
    const blocked = await guard(data.accessToken);
    if (blocked) return blocked;
    const days = PERIOD_DAYS[data.period];

    return safeQuery(async () => {
      const result = await cachedQuery(`referrers:${data.period}`, 5 * 60_000, () =>
        queryHogQL(
          `SELECT coalesce(nullIf(properties.$referring_domain, ''), '$direct') AS referrer,
                  count() AS views, count(DISTINCT person_id) AS visitors
           FROM events
           WHERE event = '$pageview' AND timestamp >= now() - INTERVAL ${days} DAY
           GROUP BY referrer ORDER BY visitors DESC
           LIMIT 20`,
        ),
      );
      const referrers = rowsToObjects(result).map((r) => ({
        referrer: String(r.referrer),
        views: Number(r.views) || 0,
        visitors: Number(r.visitors) || 0,
      }));
      return { referrers };
    });
  });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapTimeline(result: { columns: string[]; results: unknown[][] }): TimelineEvent[] {
  return rowsToObjects(result).map((r) => ({
    uuid: String(r.uuid),
    event: String(r.event),
    timestamp: String(r.timestamp),
    distinctId: String(r.distinct_id),
    personId: r.person_id ? String(r.person_id) : null,
    path: r.path ? String(r.path) : null,
    sessionId: r.session_id ? String(r.session_id) : null,
    assessment: r.assessment ? String(r.assessment) : null,
    resultType: r.result_type ? String(r.result_type) : null,
    productType: r.product_type ? String(r.product_type) : null,
    productRef: r.product_ref ? String(r.product_ref) : null,
  }));
}
