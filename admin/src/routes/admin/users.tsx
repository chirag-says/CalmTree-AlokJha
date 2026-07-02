/**
 * Admin Users — /admin/users
 *
 * Paginated, searchable user list. Clicking a row opens a detail drawer with
 * profile info, entitlements (grant/revoke), recent activity, and the
 * grant/revoke-admin control.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  listUsers,
  getUserDetail,
  setUserAdmin,
  grantEntitlement,
  revokeEntitlement,
} from "@/server/functions/admin.functions";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Search, X, Loader2, Shield, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — CalmTree Admin" }] }),
  component: AdminUsersPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserRow {
  id: string;
  full_name: string | null;
  email: string | null;
  is_admin: boolean;
  onboarding_completed: boolean;
  created_at: string;
  last_sign_in_at: string | null;
}

interface UserDetail {
  profile: {
    id: string;
    full_name: string | null;
    is_admin: boolean;
    onboarding_completed: boolean;
    focus_areas: string[] | null;
    primary_goal: string | null;
    experience_level: string | null;
    created_at: string;
  };
  email: string | null;
  lastSignInAt: string | null;
  entitlements: {
    id: string;
    access_type: string;
    product_category: string | null;
    expires_at: string | null;
    created_at: string;
    payment_reference: string | null;
  }[];
  results: {
    id: string;
    assessment_slug: string;
    primary_label: string;
    percentage: number | null;
    completed_at: string;
  }[];
  purchases: {
    id: string;
    product_type: string;
    amount_paid_inr: number;
    status: string;
    purchased_at: string;
  }[];
}

const PRODUCT_CATEGORIES = [
  "Self-Awareness & Personality",
  "Emotional Strength & Everyday Mind",
  "Relationships & Emotional Connection",
  "Workplace Effectiveness",
  "Leadership & Teams",
  "Founders & Entrepreneurship",
  "Gen Z & Digital Life",
  "Career Direction",
  "Family & Parenting",
  "Life Transitions & Healthy Ageing",
] as const;

// ─── Detail drawer ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{children}</p>;
}

function UserDrawer({
  userId,
  currentAdminId,
  onClose,
  onChanged,
}: {
  userId: string;
  currentAdminId: string | undefined;
  onClose: () => void;
  /** Called after a mutation so the list behind the drawer refreshes. */
  onChanged: () => void;
}) {
  const { session } = useAuth();
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [grantCategory, setGrantCategory] = useState<string>(PRODUCT_CATEGORIES[0]);

  const fetchDetail = useCallback(async () => {
    if (!session?.access_token) return;
    const res = await getUserDetail({ data: { accessToken: session.access_token, userId } });
    if ("error" in res && res.error) {
      toast.error(res.error);
      setDetail(null);
    } else {
      setDetail(res as UserDetail);
    }
    setLoading(false);
  }, [session, userId]);

  useEffect(() => {
    setLoading(true);
    void fetchDetail();
  }, [fetchDetail]);

  async function mutate(action: () => Promise<{ error?: string | null } | { ok: boolean }>) {
    if (busy) return;
    setBusy(true);
    try {
      const res = await action();
      if ("error" in res && res.error) {
        toast.error(res.error);
        return;
      }
      await fetchDetail();
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function handleToggleAdmin() {
    if (!session?.access_token || !detail) return;
    const next = !detail.profile.is_admin;
    const verb = next ? "Grant" : "Revoke";
    if (!confirm(`${verb} admin access for ${detail.email ?? detail.profile.full_name}?`)) return;
    await mutate(() =>
      setUserAdmin({ data: { accessToken: session.access_token, userId, isAdmin: next } }),
    );
    toast.success(`Admin access ${next ? "granted" : "revoked"}.`);
  }

  async function handleGrant(accessType: "category" | "universal") {
    if (!session?.access_token) return;
    await mutate(() =>
      grantEntitlement({
        data:
          accessType === "category"
            ? {
                accessToken: session.access_token,
                userId,
                accessType,
                productCategory: grantCategory as (typeof PRODUCT_CATEGORIES)[number],
              }
            : { accessToken: session.access_token, userId, accessType },
      }),
    );
    toast.success("Entitlement granted.");
  }

  async function handleRevoke(entitlementId: string) {
    if (!session?.access_token) return;
    if (!confirm("Remove this entitlement? The user loses access immediately.")) return;
    await mutate(() =>
      revokeEntitlement({ data: { accessToken: session.access_token, entitlementId } }),
    );
    toast.success("Entitlement revoked.");
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 h-full w-full max-w-lg overflow-y-auto bg-[#0a1f2e] border-l border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">User detail</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : !detail ? (
          <p className="text-sm text-white/40">Could not load this user.</p>
        ) : (
          <div className="space-y-6">
            {/* Identity */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-white font-medium">{detail.profile.full_name ?? "—"}</p>
              <p className="text-sm text-white/50">{detail.email ?? "no email"}</p>
              <p className="mt-2 text-xs text-white/30 font-mono break-all">{detail.profile.id}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    detail.profile.onboarding_completed
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {detail.profile.onboarding_completed ? "Onboarded" : "Not onboarded"}
                </span>
                {detail.profile.is_admin && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400">
                    Admin
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                  Joined{" "}
                  {formatDistanceToNow(new Date(detail.profile.created_at), { addSuffix: true })}
                </span>
                {detail.lastSignInAt && (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                    Last seen{" "}
                    {formatDistanceToNow(new Date(detail.lastSignInAt), { addSuffix: true })}
                  </span>
                )}
              </div>
              {(detail.profile.primary_goal || detail.profile.focus_areas?.length) && (
                <div className="mt-3 text-xs text-white/50 space-y-1">
                  {detail.profile.primary_goal && <p>Goal: {detail.profile.primary_goal}</p>}
                  {detail.profile.focus_areas && detail.profile.focus_areas.length > 0 && (
                    <p>Focus: {detail.profile.focus_areas.join(", ")}</p>
                  )}
                </div>
              )}
            </div>

            {/* Admin access */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <SectionTitle>Admin access</SectionTitle>
              <button
                onClick={handleToggleAdmin}
                disabled={busy || userId === currentAdminId}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-40 ${
                  detail.profile.is_admin
                    ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                }`}
              >
                <Shield className="h-3.5 w-3.5" />
                {detail.profile.is_admin ? "Revoke admin" : "Grant admin"}
              </button>
              {userId === currentAdminId && (
                <p className="mt-2 text-xs text-white/30">You cannot change your own access.</p>
              )}
            </div>

            {/* Entitlements */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <SectionTitle>Entitlements ({detail.entitlements.length})</SectionTitle>
              {detail.entitlements.length === 0 ? (
                <p className="text-sm text-white/40">No entitlements.</p>
              ) : (
                <ul className="space-y-2">
                  {detail.entitlements.map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="text-white/80 truncate">
                          {e.access_type === "universal"
                            ? "Universal access"
                            : (e.product_category ?? e.access_type)}
                        </p>
                        <p className="text-xs text-white/30 truncate">
                          {e.payment_reference?.startsWith("manual:")
                            ? "manually granted"
                            : (e.payment_reference ?? "—")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRevoke(e.id)}
                        disabled={busy}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors shrink-0"
                        title="Revoke"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Grant controls */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  <select
                    value={grantCategory}
                    onChange={(e) => setGrantCategory(e.target.value)}
                    className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 text-white text-xs px-2 py-2"
                  >
                    {PRODUCT_CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0a1f2e]">
                        {c}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => void handleGrant("category")}
                    disabled={busy}
                    className="shrink-0 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium px-3 py-2 disabled:opacity-40"
                  >
                    {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Grant category"}
                  </button>
                </div>
                <button
                  onClick={() => void handleGrant("universal")}
                  disabled={busy}
                  className="self-start rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 disabled:opacity-40"
                >
                  Grant universal access
                </button>
              </div>
            </div>

            {/* Recent results */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <SectionTitle>Recent results ({detail.results.length})</SectionTitle>
              {detail.results.length === 0 ? (
                <p className="text-sm text-white/40">No assessments taken.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {detail.results.map((r) => (
                    <li key={r.id} className="flex items-center justify-between gap-2">
                      <span className="text-white/70 truncate">{r.assessment_slug}</span>
                      <span className="text-white/40 text-xs shrink-0">
                        {r.primary_label}
                        {r.percentage != null ? ` · ${r.percentage}%` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Purchases */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <SectionTitle>Purchases ({detail.purchases.length})</SectionTitle>
              {detail.purchases.length === 0 ? (
                <p className="text-sm text-white/40">No purchases.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {detail.purchases.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-2">
                      <span className="text-white/70">{p.product_type}</span>
                      <span className="text-white/40 text-xs">
                        ₹{p.amount_paid_inr.toLocaleString("en-IN")} · {p.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function AdminUsersPage() {
  const { session, user } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(() => {
    if (!session?.access_token) return;
    setLoading(true);
    listUsers({
      data: {
        accessToken: session.access_token,
        page,
        pageSize: 20,
        search: search || undefined,
      },
    })
      .then((res) => {
        if (!("error" in res)) {
          setUsers(res.users as UserRow[]);
          setTotal(res.total);
        }
      })
      .catch((e) => console.error("[admin-users] fetch failed:", e))
      .finally(() => setLoading(false));
  }, [session, page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Users</h1>
          <p className="text-sm text-white/40 mt-1">{total} total registered users.</p>
        </div>
        <form onSubmit={submitSearch} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name…"
              className="w-56 rounded-lg bg-white/5 border border-white/10 text-white text-sm pl-9 pr-3 py-2 placeholder:text-white/25"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2"
          >
            Search
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSearchInput("");
                setPage(1);
              }}
              className="text-xs text-white/40 hover:text-white"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Onboarded
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={4} className="px-4 py-3">
                    <div className="h-4 bg-white/5 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-white/40">
                  {search ? `No users matching "${search}".` : "No users yet."}
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{u.full_name ?? "—"}</p>
                    <p className="text-xs text-white/40">{u.email ?? u.id.slice(0, 12) + "…"}</p>
                  </td>
                  <td className="px-4 py-3">
                    {u.onboarding_completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-white/20" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {u.is_admin ? (
                      <span className="text-xs font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-white/40">
                    {formatDistanceToNow(new Date(u.created_at), { addSuffix: true })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-white/40">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button
            disabled={page >= Math.ceil(total / 20)}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {selectedUserId && (
        <UserDrawer
          userId={selectedUserId}
          currentAdminId={user?.id}
          onClose={() => setSelectedUserId(null)}
          onChanged={fetchUsers}
        />
      )}
    </div>
  );
}
