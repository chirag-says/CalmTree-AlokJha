/**
 * analytics-queries.ts — react-query hooks over the PostHog analytics server
 * functions.
 *
 * Unlike admin-queries, `{ notConfigured: true }` is a VALID state (PostHog
 * env not set), not an error — hooks pass it through so the UI can show a
 * setup notice. Only `{ error }` is thrown. Client staleTime mirrors the
 * server TTL cache.
 */

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import {
  getAnalyticsTrends,
  getConversionFunnel,
  getEventBreakdown,
  getRecentEvents,
  getReferrerBreakdown,
  getTopPages,
  getUserSessions,
  getUserTimeline,
} from "@/server/functions/analytics.functions";

export type Period = "7d" | "30d" | "90d";

function useAccessToken() {
  return useAuth().session?.access_token;
}

/** Throws only on hard `{ error }`; passes `notConfigured` through. */
function check<T>(res: T): T {
  if (res && typeof res === "object" && "error" in res && res.error) {
    throw new Error(String(res.error));
  }
  return res;
}

const FIVE_MIN = 5 * 60_000;
const ONE_MIN = 60_000;

export function useAnalyticsTrends(period: Period) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "trends", period],
    enabled: !!token,
    staleTime: FIVE_MIN,
    queryFn: async () => check(await getAnalyticsTrends({ data: { accessToken: token!, period } })),
  });
}

export function useEventBreakdown(period: Period) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "events", period],
    enabled: !!token,
    staleTime: FIVE_MIN,
    queryFn: async () => check(await getEventBreakdown({ data: { accessToken: token!, period } })),
  });
}

export function useConversionFunnel(period: Period) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "funnel", period],
    enabled: !!token,
    staleTime: FIVE_MIN,
    queryFn: async () =>
      check(await getConversionFunnel({ data: { accessToken: token!, period } })),
  });
}

export function useTopPages(period: Period) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "pages", period],
    enabled: !!token,
    staleTime: FIVE_MIN,
    queryFn: async () => check(await getTopPages({ data: { accessToken: token!, period } })),
  });
}

export function useReferrers(period: Period) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "referrers", period],
    enabled: !!token,
    staleTime: FIVE_MIN,
    queryFn: async () =>
      check(await getReferrerBreakdown({ data: { accessToken: token!, period } })),
  });
}

export function useRecentEvents(includePageviews: boolean) {
  const token = useAccessToken();
  return useInfiniteQuery({
    queryKey: ["analytics", "recent", includePageviews],
    enabled: !!token,
    staleTime: ONE_MIN,
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) =>
      check(
        await getRecentEvents({
          data: { accessToken: token!, before: pageParam, includePageviews },
        }),
      ),
    getNextPageParam: (lastPage) =>
      "nextCursor" in lastPage ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}

export function useUserTimeline(userId: string | null) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "timeline", userId],
    enabled: !!token && !!userId,
    staleTime: ONE_MIN,
    queryFn: async () =>
      check(await getUserTimeline({ data: { accessToken: token!, userId: userId! } })),
  });
}

export function useUserSessions(userId: string | null) {
  const token = useAccessToken();
  return useQuery({
    queryKey: ["analytics", "sessions", userId],
    enabled: !!token && !!userId,
    staleTime: ONE_MIN,
    queryFn: async () =>
      check(await getUserSessions({ data: { accessToken: token!, userId: userId! } })),
  });
}
