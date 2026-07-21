/**
 * Admin Org Detail — /admin/orgs/$orgId
 *
 * Shows org settings, member list (add/remove), campaigns, credit ledger,
 * and a "Grant Credits" action. This is the admin's control center for
 * managing any B2B organization.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Megaphone,
  Plus,
  Trash2,
  Users,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
} from "lucide-react";
import {
  useOrgDetail,
  useAddOrgMember,
  useRemoveOrgMember,
  useGrantOrgCredits,
} from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export const Route = createFileRoute("/admin/orgs/$orgId")({
  head: () => ({ meta: [{ title: "Organization Detail — Calmtree Admin" }] }),
  component: OrgDetailPage,
});

function OrgDetailPage() {
  const { orgId } = Route.useParams();
  const detail = useOrgDetail(orgId);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [grantCreditsOpen, setGrantCreditsOpen] = useState(false);
  const [removeMemberId, setRemoveMemberId] = useState<string | null>(null);
  const removeMember = useRemoveOrgMember();

  if (detail.isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (detail.error || !detail.data) {
    return (
      <div className="space-y-4">
        <Link
          to="/admin/orgs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to organizations
        </Link>
        <div className="surface-raised rounded-2xl p-8 text-center">
          <p className="text-sm text-destructive">
            {detail.error?.message ?? "Organization not found."}
          </p>
        </div>
      </div>
    );
  }

  const { org, members, campaigns, ledger, creditBalance } = detail.data;

  return (
    <div>
      {/* Back link */}
      <Link
        to="/admin/orgs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 sm:mb-4 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      {/* Header */}
      <PageHeader
        title={org.name}
        description={`slug: ${org.slug} · Created ${formatDistanceToNow(new Date(org.created_at as string), { addSuffix: true })}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Dialog open={grantCreditsOpen} onOpenChange={setGrantCreditsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1.5 sm:gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden xs:inline">Grant</span> Credits
                </Button>
              </DialogTrigger>
              <GrantCreditsDialog
                orgId={orgId}
                onClose={() => setGrantCreditsOpen(false)}
              />
            </Dialog>
            <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5 sm:gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden xs:inline">Add</span> Member
                </Button>
              </DialogTrigger>
              <AddMemberDialog
                orgId={orgId}
                onClose={() => setAddMemberOpen(false)}
              />
            </Dialog>
          </div>
        }
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
        <StatCard
          icon={<CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />}
          label="Credit Balance"
          value={creditBalance.toLocaleString()}
        />
        <StatCard
          icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />}
          label="Members"
          value={members.length.toString()}
        />
        <StatCard
          icon={<Megaphone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />}
          label="Campaigns"
          value={campaigns.length.toString()}
        />
      </div>

      {/* Settings */}
      <div className="surface-raised rounded-2xl p-4 sm:p-5 mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3">Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Individual results:</span>{" "}
            {org.individual_results_unlocked ? (
              <StatusPill tone="success">Unlocked</StatusPill>
            ) : (
              <StatusPill tone="neutral">Locked</StatusPill>
            )}
          </div>
          <div>
            <span className="text-muted-foreground">Min aggregate group:</span>{" "}
            <span className="font-medium">{org.min_aggregate_group_size}</span>
          </div>
        </div>
      </div>

      {/* Members table */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" /> Members ({members.length})
        </h2>
        <div className="surface-raised overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  User
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Role
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                  Added
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-muted-foreground w-16" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    No members yet. Add one above.
                  </TableCell>
                </TableRow>
              ) : (
                members.map((m) => (
                  <TableRow key={m.id as string}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {(m.fullName as string) ?? "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(m.email as string) ?? (m.user_id as string).slice(0, 12) + "…"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RolePill role={m.role as string} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(m.created_at as string), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setRemoveMemberId(m.id as string)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>

      {/* Remove member confirmation */}
      <ConfirmDialog
        open={!!removeMemberId}
        onOpenChange={(open) => !open && setRemoveMemberId(null)}
        title="Remove member?"
        description="This user will lose access to this organization's dashboard."
        confirmLabel="Remove"
        destructive
        onConfirm={() => {
          if (removeMemberId) {
            removeMember.mutate(
              { memberId: removeMemberId, orgId },
              { onSuccess: () => setRemoveMemberId(null) },
            );
          }
        }}
      />

      {/* Campaigns */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Megaphone className="h-4 w-4" /> Campaigns ({campaigns.length})
        </h2>
        {campaigns.length === 0 ? (
          <div className="surface-raised rounded-2xl p-6 text-center text-sm text-muted-foreground">
            No campaigns yet.
          </div>
        ) : (
          <div className="surface-raised overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Title
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Assessment
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Launched
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((c) => (
                  <TableRow key={c.id as string}>
                    <TableCell className="font-medium text-foreground text-sm">
                      {c.title as string}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {c.assessment_slug as string}
                    </TableCell>
                    <TableCell>
                      <CampaignStatusPill status={c.status as string} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {c.launched_at
                        ? formatDistanceToNow(new Date(c.launched_at as string), {
                            addSuffix: true,
                          })
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </div>
        )}
      </div>

      {/* Credit Ledger */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Credit Ledger ({ledger.length} entries)
        </h2>
        {ledger.length === 0 ? (
          <div className="surface-raised rounded-2xl p-6 text-center text-sm text-muted-foreground">
            No credit transactions yet. Grant credits above to get started.
          </div>
        ) : (
          <div className="surface-raised overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Reason
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground">
                    Note
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wider text-muted-foreground text-right">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledger.map((entry) => {
                  const delta = entry.delta as number;
                  const isPositive = delta > 0;
                  return (
                    <TableRow key={entry.id as string}>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(entry.created_at as string).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <LedgerIcon reason={entry.reason as string} delta={delta} />
                          <span className="capitalize">
                            {formatReason(entry.reason as string)}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {(entry.note as string) || "—"}
                      </TableCell>
                      <TableCell
                        className={`text-right text-sm font-semibold whitespace-nowrap ${
                          isPositive ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {delta}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="surface-raised rounded-xl sm:rounded-2xl p-3 sm:p-5">
      <div className="flex items-center gap-2 sm:gap-3 mb-1">
        {icon}
        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
          {label}
        </span>
      </div>
      <p className="text-lg sm:text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function RolePill({ role }: { role: string }) {
  const tone =
    role === "owner" ? "primary" : role === "admin" ? "info" : "neutral";
  return (
    <StatusPill tone={tone as "primary" | "info" | "neutral"}>
      {role}
    </StatusPill>
  );
}

function CampaignStatusPill({ status }: { status: string }) {
  const tone =
    status === "active"
      ? "success"
      : status === "closed"
        ? "warning"
        : "neutral";
  return (
    <StatusPill tone={tone as "success" | "warning" | "neutral"}>
      {status}
    </StatusPill>
  );
}

function LedgerIcon({ reason, delta }: { reason: string; delta: number }) {
  if (reason === "grant") return <ArrowUpCircle className="h-4 w-4 text-emerald-500" />;
  if (reason === "expiry_refund") return <RefreshCw className="h-4 w-4 text-blue-500" />;
  if (reason === "campaign_send") return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
  if (delta > 0) return <ArrowUpCircle className="h-4 w-4 text-emerald-500" />;
  return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
}

function formatReason(reason: string): string {
  const map: Record<string, string> = {
    grant: "Credit Grant",
    campaign_send: "Campaign Launch",
    expiry_refund: "Expiry Refund",
    adjustment: "Adjustment",
  };
  return map[reason] ?? reason;
}

// ─── Dialogs ─────────────────────────────────────────────────────────────────

function AddMemberDialog({ orgId, onClose }: { orgId: string; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("viewer");
  const addMember = useAddOrgMember();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    addMember.mutate({ orgId, email: email.trim(), role }, { onSuccess: () => onClose() });
  }

  return (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Add a Calmtree user to this organization by their email address.
            They must have an existing account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email *</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@company.com"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-muted-foreground">
              Owners can manage campaigns and members. Admins can manage campaigns.
              Viewers can only see reports.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!email.trim() || addMember.isPending}>
            {addMember.isPending ? "Adding…" : "Add Member"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function GrantCreditsDialog({ orgId, onClose }: { orgId: string; onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const grantCredits = useGrantOrgCredits();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = parseInt(amount, 10);
    if (!num || num <= 0) return;
    grantCredits.mutate(
      { orgId, amount: num, note: note.trim() || undefined },
      { onSuccess: () => onClose() },
    );
  }

  return (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Grant Credits</DialogTitle>
          <DialogDescription>
            Add credits to this organization's balance. Credits are used 1-per-invitation
            when launching campaigns.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Amount *</label>
            <Input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Note <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Initial onboarding package"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!amount || parseInt(amount, 10) <= 0 || grantCredits.isPending}
          >
            {grantCredits.isPending
              ? "Granting…"
              : `Grant ${parseInt(amount, 10) || 0} Credits`}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
