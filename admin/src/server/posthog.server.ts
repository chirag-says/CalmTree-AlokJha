/**
 * posthog.server.ts — server-only PostHog Query API client.
 *
 * The Personal API Key is a secret and must NEVER reach the browser: this
 * file has no VITE_ exports and is only imported by requireAdmin-gated
 * server functions. All env is read INSIDE functions (module-scope reads are
 * unsafe on request-time-bound runtimes).
 */

import process from "node:process";

export interface PostHogConfig {
  apiKey: string;
  projectId: string;
  /** Base host WITHOUT trailing slash, e.g. https://us.posthog.com */
  host: string;
}

/** Returns the PostHog config, or null when the integration isn't set up. */
export function getPostHogConfig(): PostHogConfig | null {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = (process.env.POSTHOG_API_HOST || "https://us.posthog.com").replace(/\/+$/, "");
  if (!apiKey || !projectId) return null;
  return { apiKey, projectId, host };
}

/** Deep link to a session recording on posthog.com. */
export function replayUrl(sessionId: string): string {
  const cfg = getPostHogConfig();
  const host = cfg?.host ?? "https://us.posthog.com";
  const projectId = cfg?.projectId ?? "";
  return `${host}/project/${projectId}/replay/${sessionId}`;
}

export class PostHogRateLimitError extends Error {
  constructor() {
    super("PostHog rate limit reached. Try again shortly.");
    this.name = "PostHogRateLimitError";
  }
}

export interface HogQLResult {
  columns: string[];
  results: unknown[][];
}

/**
 * Runs a HogQL query. User-controlled values MUST be passed via `values`
 * (HogQL placeholders like {distinct_id}) — never string-interpolated.
 */
export async function queryHogQL(
  query: string,
  values?: Record<string, string | number>,
): Promise<HogQLResult> {
  const cfg = getPostHogConfig();
  if (!cfg) throw new Error("PostHog is not configured.");

  const res = await fetch(`${cfg.host}/api/projects/${cfg.projectId}/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query, values },
    }),
  });

  if (res.status === 429) throw new PostHogRateLimitError();
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Log server-side for debugging; never surface the key or raw body to callers.
    console.error(`[posthog] query failed ${res.status}: ${body.slice(0, 500)}`);
    throw new Error(`PostHog query failed (${res.status}).`);
  }

  const json = (await res.json()) as { columns?: string[]; results?: unknown[][] };
  return { columns: json.columns ?? [], results: json.results ?? [] };
}

// ─── In-memory TTL cache (per server instance) ────────────────────────────────

interface CacheEntry {
  expires: number;
  promise: Promise<unknown>;
}
const cache = new Map<string, CacheEntry>();

/**
 * Caches the PROMISE keyed by `key` for `ttlMs`, deduping concurrent identical
 * requests. A rejected promise is evicted so failures aren't cached.
 */
export async function cachedQuery<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expires > now) {
    return hit.promise as Promise<T>;
  }

  const promise = fn().catch((err) => {
    cache.delete(key);
    throw err;
  });
  cache.set(key, { expires: now + ttlMs, promise });
  return promise as Promise<T>;
}

/** Maps HogQL rows (array-of-arrays) into objects keyed by column name. */
export function rowsToObjects<T = Record<string, unknown>>(result: HogQLResult): T[] {
  return result.results.map((row) => {
    const obj: Record<string, unknown> = {};
    result.columns.forEach((col, i) => {
      // Column exprs like "properties.$pathname" arrive as-is; alias in SQL.
      obj[col] = row[i];
    });
    return obj as T;
  });
}
