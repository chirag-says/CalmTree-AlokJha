/**
 * /org — layout route: auth guard (no onboarding requirement) + OrgShell.
 *
 * Org users authenticate with the same Supabase auth as B2C users, but they
 * don't need to complete the consumer onboarding flow. The org context
 * (selected org, memberships) is loaded here and passed to children via
 * route context + OrgShell.
 */

import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { OrgShell } from "@/components/org/OrgShell";
import { CreateOrgForm } from "@/components/org/CreateOrgForm";
import { useAuth } from "@/hooks/useAuth";
import { getMyOrgs } from "@/server/functions/org.functions";

const searchSchema = z.object({
  orgId: z.string().uuid().optional(),
});

export const Route = createFileRoute("/org")({
  validateSearch: searchSchema,
  component: OrgLayout,
});

function OrgLayout() {
  return (
    <RequireAuth requireOnboarded={false}>
      <OrgLayoutInner />
    </RequireAuth>
  );
}

function OrgLayoutInner() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const { orgId } = Route.useSearch();

  const {
    data: result,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["org", "myOrgs"],
    queryFn: () => getMyOrgs({ data: { accessToken: session!.access_token } }),
    enabled: !!session,
    staleTime: 30_000,
  });

  // Pin the selected org into the URL for multi-org users. Done in an effect —
  // never call navigate() during render (React warns + can loop). Deps are
  // primitives so this runs only when the resolved org set actually changes.
  const firstOrgId = result && "orgs" in result ? result.orgs?.[0]?.id : undefined;
  const orgCount = result && "orgs" in result ? (result.orgs?.length ?? 0) : 0;
  useEffect(() => {
    if (orgCount > 1 && !orgId && firstOrgId) {
      navigate({ to: "/org", search: { orgId: firstOrgId }, replace: true });
    }
  }, [orgCount, orgId, firstOrgId, navigate]);

  // Loading state
  if (isLoading || !session) {
    return (
      <OrgShell org={null}>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </OrgShell>
    );
  }

  // Error state
  if (queryError || (result && "error" in result)) {
    return (
      <OrgShell org={null}>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold text-foreground">Could not load organizations</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            {result && "error" in result ? result.error : "Something went wrong. Please try again."}
          </p>
        </div>
      </OrgShell>
    );
  }

  // No orgs → self-serve creation (this is the landing "For Organizations" funnel).
  const orgs = result && "orgs" in result ? result.orgs : [];
  if (orgs.length === 0) {
    return (
      <OrgShell org={null}>
        <CreateOrgForm />
      </OrgShell>
    );
  }

  // Select org — if orgId is in search, use it; else first org. The URL sync
  // for multi-org users happens in the effect above.
  const selectedOrg = orgId ? (orgs.find((o) => o.id === orgId) ?? orgs[0]) : orgs[0];

  return (
    <OrgShell org={selectedOrg} orgs={orgs}>
      <Outlet />
    </OrgShell>
  );
}
