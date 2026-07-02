import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { PostHogProvider, usePostHog } from "@posthog/react";
import posthogJs from "posthog-js";

import appCss from "../styles.css?url";
import { SITE } from "@/data/constants";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsent } from "@/components/shared/CookieConsent";

/** Typed event tracking — usable outside React components. */
export function trackEvent(
  event:
    | "assessment_started"
    | "assessment_completed"
    | "email_captured"
    | "purchase_completed"
    | "onboarding_completed",
  properties?: Record<string, unknown>,
) {
  if (typeof window !== "undefined") {
    posthogJs.capture(event, properties);
  }
}

// ─── Not Found / Error ───────────────────────────────────────────────────────

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[CalmTree] Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Root route ──────────────────────────────────────────────────────────────

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — Understand Your Mind. Improve Your Life.` },
      {
        name: "description",
        content: SITE.description,
      },
      { name: "author", content: SITE.name },
      {
        property: "og:title",
        content: `${SITE.name} — Practical Psychology for Everyday Life`,
      },
      {
        property: "og:description",
        content:
          "Decode Your Mind. Learn at Calmtree Academy. Take psychology assessments and download practical resources.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: SITE.logoPath, type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationSchema() }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema() }} />
      </head>
      <body>
        <PostHogProvider
          apiKey={import.meta.env.VITE_POSTHOG_KEY!}
          options={{
            // In dev, the Vite proxy doesn't apply to TanStack Start's Node server,
            // so talk to PostHog directly. In prod, route through /ingest to avoid
            // ad-blocker interference.
            api_host: import.meta.env.DEV
              ? import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com"
              : "/ingest",
            ui_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.posthog.com",
            defaults: "2025-05-24",
            capture_exceptions: true,
            capture_pageview: false,
            debug: import.meta.env.DEV,
          }}
        >
          {children}
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const posthog = usePostHog();

  // Reliable SPA pageview tracking — fires on every resolved navigation
  useEffect(() => {
    const unsub = router.subscribe("onResolved", () => {
      posthog?.capture("$pageview");
    });
    return unsub;
  }, [router, posthog]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster richColors position="top-center" />
        <CookieConsent />
      </AuthProvider>
    </QueryClientProvider>
  );
}
