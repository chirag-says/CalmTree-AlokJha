/**
 * CreateOrgForm — self-serve organization creation.
 *
 * Shown as the /org empty state when a signed-in user belongs to no org yet
 * (the landing "For Organizations" funnel lands here). On success it invalidates
 * the myOrgs query so the layout re-renders straight into the dashboard.
 */

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Building2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { createMyOrganization } from "@/server/functions/org.functions";

export function CreateOrgForm() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const create = useMutation({
    mutationFn: () =>
      createMyOrganization({ data: { accessToken: session!.access_token, name: name.trim() } }),
    onSuccess: (result) => {
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Organization created. Add credits to get started.");
      queryClient.invalidateQueries({ queryKey: ["org", "myOrgs"] });
      navigate({ to: "/org/credits", search: { orgId: result.orgId } });
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const canSubmit = name.trim().length >= 2 && !create.isPending;

  return (
    <div className="mx-auto max-w-md py-16">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Create your organization</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          Set up a company workspace to buy assessment credits and send check-ins to your team.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) create.mutate();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="org-name" className="block text-sm font-medium text-foreground mb-1.5">
            Organization name
          </label>
          <input
            id="org-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Acme Pvt Ltd"
            autoFocus
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {create.isPending ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            <>
              Create organization
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
