/**
 * Admin Users — /admin/users
 *
 * Paginated, searchable user list. Clicking a row opens the UserDrawer with
 * profile, access management, history, and activity.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, Search, Users as UsersIcon, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUsers } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminTable, type ColumnDef } from "@/components/admin/AdminTable";
import { TablePagination } from "@/components/admin/TablePagination";
import { StatusPill } from "@/components/admin/StatusPill";
import { UserDrawer } from "@/components/admin/UserDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — CalmTree Admin" }] }),
  // `q` seeds the search box (used by the command palette's user search).
  validateSearch: (search: Record<string, unknown>): { q?: string } => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  }),
  component: AdminUsersPage,
});

interface UserRow {
  id: string;
  full_name: string | null;
  email: string | null;
  is_admin: boolean;
  onboarding_completed: boolean;
  created_at: string;
  last_sign_in_at: string | null;
}

function AdminUsersPage() {
  const { q } = Route.useSearch();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(q ?? "");
  const [searchInput, setSearchInput] = useState(q ?? "");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const users = useUsers(page, search);
  const rows = (users.data?.users ?? []) as UserRow[];
  const total = users.data?.total ?? 0;

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  const columns: ColumnDef<UserRow>[] = [
    {
      key: "user",
      header: "User",
      cell: (u) => (
        <div>
          <p className="font-medium text-foreground">{u.full_name ?? "—"}</p>
          <p className="text-xs text-muted-foreground">{u.email ?? u.id.slice(0, 12) + "…"}</p>
        </div>
      ),
    },
    {
      key: "onboarded",
      header: "Onboarded",
      cell: (u) =>
        u.onboarding_completed ? (
          <CheckCircle2 className="h-4 w-4 text-success" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground/40" />
        ),
    },
    {
      key: "admin",
      header: "Admin",
      cell: (u) =>
        u.is_admin ? (
          <StatusPill tone="primary">Admin</StatusPill>
        ) : (
          <span className="text-xs text-muted-foreground/40">—</span>
        ),
    },
    {
      key: "joined",
      header: "Joined",
      className: "text-xs text-muted-foreground",
      cell: (u) => formatDistanceToNow(new Date(u.created_at), { addSuffix: true }),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        description={`${total.toLocaleString("en-IN")} total registered users.`}
        actions={
          <form onSubmit={submitSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name…"
                className="w-56 pl-9"
              />
            </div>
            <Button type="submit" variant="secondary" size="sm">
              Search
            </Button>
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                  setPage(1);
                }}
              >
                Clear
              </Button>
            )}
          </form>
        }
      />

      <AdminTable
        columns={columns}
        data={rows}
        rowKey={(u) => u.id}
        isLoading={users.isPending}
        error={users.error?.message}
        onRetry={() => void users.refetch()}
        onRowClick={(u) => {
          setSelectedUserId(u.id);
          setDrawerOpen(true);
        }}
        emptyState={{
          icon: UsersIcon,
          title: search ? `No users matching "${search}"` : "No users yet",
          description: search ? "Try a different name." : undefined,
        }}
      />

      <TablePagination page={page} pageSize={20} total={total} onPageChange={setPage} />

      <UserDrawer
        userId={selectedUserId}
        currentAdminId={user?.id}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
