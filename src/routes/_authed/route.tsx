/**
 * _authed/route.tsx — Layout for the content pages (Assessments, Academy,
 * Resources). Despite the folder name, this no longer requires login —
 * these pages are public browsing/discovery surfaces (free assessments can be
 * taken anonymously end-to-end; premium assessments and purchases still gate
 * at the specific action, not at this layout).
 *
 * A logged-in user gets the shared AppShell (dashboard sidebar chrome) so the
 * signed-in experience stays one cohesive app. An anonymous visitor gets the
 * public SiteLayout (marketing header/footer) instead of a login redirect.
 */

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FullPageSpinner } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/app/AppShell";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authed")({
  component: ContentLayout,
});

function ContentLayout() {
  const { user, isReady } = useAuth();

  if (!isReady) return <FullPageSpinner />;

  if (user) {
    return (
      <AppShell>
        <Outlet />
      </AppShell>
    );
  }

  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
