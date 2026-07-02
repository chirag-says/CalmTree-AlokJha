/**
 * Admin Purchases — /admin/purchases
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { listPurchases } from "@/server/functions/admin.functions";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/admin/purchases")({
  head: () => ({ meta: [{ title: "Purchases — CalmTree Admin" }] }),
  component: AdminPurchasesPage,
});

interface PurchaseRow {
  id: string;
  user_id: string;
  product_type: string;
  amount_paid_inr: number;
  status: string;
  razorpay_payment_id: string | null;
  purchased_at: string;
}

function AdminPurchasesPage() {
  const { session } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!session?.access_token) return;
    setLoading(true);
    listPurchases({ data: { accessToken: session.access_token, page, pageSize: 20 } }).then(
      (res) => {
        if (!("error" in res)) {
          setPurchases(res.purchases as PurchaseRow[]);
          setTotal(res.total);
        }
        setLoading(false);
      },
    );
  }, [session, page]);

  const totalRevenue = purchases.reduce((s, p) => s + (p.amount_paid_inr ?? 0), 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Purchases</h1>
        <p className="text-sm text-white/40 mt-1">
          {total} purchases · ₹{totalRevenue.toLocaleString("en-IN")} shown
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Payment ID
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-4 py-3">
                      <div className="h-4 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              : purchases.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                        {p.product_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-medium">
                      ₹{(p.amount_paid_inr ?? 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          p.status === "completed"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-white/30 font-mono">
                      {p.razorpay_payment_id?.slice(0, 14) ?? "—"}…
                    </td>
                    <td className="px-4 py-3 text-xs text-white/40">
                      {formatDistanceToNow(new Date(p.purchased_at), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {total > 20 && (
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
          >
            Previous
          </button>
          <span className="text-xs text-white/40">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button
            disabled={page >= Math.ceil(total / 20)}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
