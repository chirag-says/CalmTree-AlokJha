/**
 * _authed/route.tsx — Pathless layout for auth-protected content pages
 * (Assessments, Academy, Resources). URLs stay public (/assessments, etc.).
 *
 * Renders inside the shared AppShell so these pages share the dashboard's
 * sidebar chrome — a logged-in user never bounces back to the marketing layout.
 */

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/_authed")({
  component: AuthedLayout,
});

function AuthedLayout() {
  return (
    <RequireAuth>
      <AppShell>
        <Outlet />
      </AppShell>
    </RequireAuth>
  );
}
