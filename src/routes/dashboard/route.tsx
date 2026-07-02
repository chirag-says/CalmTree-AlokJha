/**
 * /dashboard — thin layout: auth guard + shared AppShell (sidebar).
 * The sidebar and chrome live in AppShell, shared with the _authed content
 * routes so the whole signed-in experience is one cohesive app.
 */

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <RequireAuth>
      <AppShell>
        <Outlet />
      </AppShell>
    </RequireAuth>
  );
}
