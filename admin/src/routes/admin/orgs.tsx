/**
 * Admin Organizations — /admin/orgs
 *
 * Lists all B2B organizations with member count, campaign count, and credit
 * balance. Mobile: expandable cards. Desktop: table. Includes "Create
 * Organization" dialog and links to org detail.
 */

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Building2, Plus, CreditCard, Users, Megaphone } from "lucide-react";
import { useOrgs, useCreateOrg } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminTable, type ColumnDef } from "@/components/admin/AdminTable";
import { MobileCardList } from "@/components/admin/MobileCardList";
import { StatusPill } from "@/components/admin/StatusPill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/orgs")({
  head: () => ({ meta: [{ title: "Organizations — CalmTree Admin" }] }),
  component: AdminOrgsPage,
});

interface OrgRow {
  id: string;
  name: string;
  slug: string;
  individual_results_unlocked: boolean;
  memberCount: number;
  campaignCount: number;
  creditBalance: number;
  created_at: string;
}

function AdminOrgsPage() {
  const orgs = useOrgs();
  const rows = (orgs.data?.orgs ?? []) as OrgRow[];
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();

  function goToOrg(o: OrgRow) {
    navigate({ to: "/admin/orgs/$orgId", params: { orgId: o.id } });
  }

  const columns: ColumnDef<OrgRow>[] = [
    {
      key: "org",
      header: "Organization",
      cell: (o) => (
        <div>
          <p className="font-medium text-foreground">{o.name}</p>
          <p className="text-xs text-muted-foreground">{o.slug}</p>
        </div>
      ),
    },
    {
      key: "members",
      header: "Members",
      cell: (o) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          {o.memberCount}
        </span>
      ),
    },
    {
      key: "campaigns",
      header: "Campaigns",
      cell: (o) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <Megaphone className="h-3.5 w-3.5 text-muted-foreground" />
          {o.campaignCount}
        </span>
      ),
    },
    {
      key: "credits",
      header: "Credits",
      cell: (o) => (
        <span className="inline-flex items-center gap-1 text-sm font-medium">
          <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
          {o.creditBalance.toLocaleString()}
        </span>
      ),
    },
    {
      key: "individual",
      header: "Individuals",
      cell: (o) =>
        o.individual_results_unlocked ? (
          <StatusPill tone="success">Unlocked</StatusPill>
        ) : (
          <StatusPill tone="neutral">Locked</StatusPill>
        ),
    },
    {
      key: "created",
      header: "Created",
      className: "text-xs text-muted-foreground",
      cell: (o) => formatDistanceToNow(new Date(o.created_at), { addSuffix: true }),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Organizations"
        description={`${rows.length} B2B organization${rows.length !== 1 ? "s" : ""}.`}
        actions={
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Organization
              </Button>
            </DialogTrigger>
            <CreateOrgDialog onClose={() => setCreateOpen(false)} />
          </Dialog>
        }
      />

      {/* Mobile: expandable card list */}
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          rowKey={(o) => o.id}
          isLoading={orgs.isPending}
          error={orgs.error?.message}
          onRetry={() => void orgs.refetch()}
          emptyState={{
            icon: Building2,
            title: "No organizations yet",
            description: "Create one to get started with B2B campaigns.",
          }}
          title={(o) => o.name}
          subtitle={(o) => o.slug}
          badges={(o) => (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
              <CreditCard className="h-3 w-3" />
              {o.creditBalance}
            </span>
          )}
          details={(o) => [
            {
              label: "Members",
              value: (
                <span className="inline-flex items-center gap-1 text-xs text-foreground">
                  <Users className="h-3 w-3 text-muted-foreground" /> {o.memberCount}
                </span>
              ),
            },
            {
              label: "Campaigns",
              value: (
                <span className="inline-flex items-center gap-1 text-xs text-foreground">
                  <Megaphone className="h-3 w-3 text-muted-foreground" /> {o.campaignCount}
                </span>
              ),
            },
            {
              label: "Credits",
              value: (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <CreditCard className="h-3 w-3" /> {o.creditBalance.toLocaleString()}
                </span>
              ),
            },
            {
              label: "Individual results",
              value: o.individual_results_unlocked ? (
                <StatusPill tone="success">Unlocked</StatusPill>
              ) : (
                <StatusPill tone="neutral">Locked</StatusPill>
              ),
            },
            {
              label: "Created",
              value: (
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(o.created_at), { addSuffix: true })}
                </span>
              ),
            },
          ]}
          footer={() => (
            <Button size="sm" variant="outline" className="w-full text-xs">
              View details →
            </Button>
          )}
          onTap={goToOrg}
        />
      </div>

      {/* Desktop: table view */}
      <div className="hidden sm:block">
        <AdminTable
          columns={columns}
          data={rows}
          rowKey={(o) => o.id}
          isLoading={orgs.isPending}
          error={orgs.error?.message}
          onRetry={() => void orgs.refetch()}
          onRowClick={goToOrg}
          emptyState={{
            icon: Building2,
            title: "No organizations yet",
            description: "Create one to get started with B2B campaigns.",
          }}
        />
      </div>
    </div>
  );
}

function CreateOrgDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const createOrg = useCreateOrg();

  function handleNameChange(val: string) {
    setName(val);
    // Auto-generate slug from name
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;
    createOrg.mutate(
      { name: name.trim(), slug: slug.trim() },
      { onSuccess: () => onClose() },
    );
  }

  return (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Add a new B2B organization. You can add members and credits after creation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Organization Name *</label>
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Acme Corp"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Slug *</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="acme-corp"
              pattern="^[a-z0-9-]+$"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              URL-safe identifier. Lowercase letters, numbers, and hyphens only.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim() || !slug.trim() || createOrg.isPending}>
            {createOrg.isPending ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
