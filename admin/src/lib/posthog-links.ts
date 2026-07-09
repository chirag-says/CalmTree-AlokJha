/**
 * posthog-links.ts — client-safe PostHog deep links.
 *
 * The project id and host are NOT secrets (only the Personal API Key is, and
 * that stays server-side). These power "Open in PostHog" convenience links.
 * Overridable via VITE_ vars; defaults match the CalmTree project.
 */

const PROJECT_ID = import.meta.env.VITE_POSTHOG_PROJECT_ID || "493249";
const UI_HOST = (import.meta.env.VITE_POSTHOG_HOST || "https://us.posthog.com").replace(/\/+$/, "");

export function getPostHogProjectUrl(): string {
  return `${UI_HOST}/project/${PROJECT_ID}`;
}
