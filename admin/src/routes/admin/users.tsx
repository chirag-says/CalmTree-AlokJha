/**
 * Admin Users — /admin/users
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { listUsers } from "@/server/functions/admin.functions";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — CalmTree Admin" }] }),
  component: AdminUsersPage,
});

interface UserRow {
  id: string;
  full_name: string | null;
  is_admin: boolean;
  onboarding_completed: boolean;
  created_at: string;
}

function AdminUsersPage() {
  const { session } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!session?.access_token) return;
    setLoading(true);
    listUsers({ data: { accessToken: session.access_token, page, pageSize: 20 } }).then((res) => {
      if (!("error" in res)) {
        setUsers(res.users as UserRow[]);
        setTotal(res.total);
      }
      setLoading(false);
    });
  }, [session, page]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Users</h1>
        <p className="text-sm text-white/40 mt-1">{total} total registered users.</p>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">Name / ID</th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">Onboarded</th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">Admin</th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-4 py-3">
                      <div className="h-4 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              : users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{u.full_name ?? "—"}</p>
                      <p className="text-xs text-white/30 font-mono">{u.id.slice(0, 12)}…</p>
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
                ))}
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
    </div>
  );
}
