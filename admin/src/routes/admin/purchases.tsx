/**
 * Admin Purchases — /admin/purchases
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Download, Loader2, ShoppingBag } from "lucide-react";
import { useExportPurchases, usePurchases } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminTable, type ColumnDef } from "@/components/admin/AdminTable";
import { TablePagination } from "@/components/admin/TablePagination";
import { StatusPill, purchaseStatusTone } from "@/components/admin/StatusPill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ─── CSV helpers ──────────────────────────────────────────────────────────────

interface ExportRow {
  id: string;
  user_id: string;
  email: string | null;
  product_type: string;
  product_id: string | null;
  amount_paid_inr: number;
  status: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  purchased_at: string;
}

function csvEscape(value: unknown): string {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function buildCsv(rows: ExportRow[]): string {
  const header = [
    "purchase_id",
    "purchased_at",
    "email",
    "user_id",
    "product_type",
    "product_id",
    "amount_inr",
    "status",
    "razorpay_order_id",
    "razorpay_payment_id",
  ];
  const lines = rows.map((r) =>
    [
      r.id,
      r.purchased_at,
      r.email,
      r.user_id,
      r.product_type,
      r.product_id,
      r.amount_paid_inr,
      r.status,
      r.razorpay_order_id,
      r.razorpay_payment_id,
    ]
      .map(csvEscape)
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}

function ExportCsvButton() {
  const exportMutation = useExportPurchases();

  async function handleExport() {
    const res = await exportMutation.mutateAsync();
    const rows = res.purchases as ExportRow[];
    if (rows.length === 0) {
      toast("No purchases to export yet.");
      return;
    }
    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calmtree-purchases-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} purchases.`);
  }

  return (
    <Button
      variant="secondary"
      onClick={() => void handleExport().catch(() => undefined)}
      disabled={exportMutation.isPending}
    >
      {exportMutation.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Export CSV
    </Button>
  );
}

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

const columns: ColumnDef<PurchaseRow>[] = [
  {
    key: "type",
    header: "Type",
    cell: (p) => <Badge variant="secondary">{p.product_type}</Badge>,
  },
  {
    key: "amount",
    header: "Amount",
    className: "font-medium text-foreground",
    cell: (p) => `₹${(p.amount_paid_inr ?? 0).toLocaleString("en-IN")}`,
  },
  {
    key: "status",
    header: "Status",
    cell: (p) => <StatusPill tone={purchaseStatusTone(p.status)}>{p.status}</StatusPill>,
  },
  {
    key: "payment",
    header: "Payment ID",
    className: "font-mono text-xs text-muted-foreground/70",
    cell: (p) => (p.razorpay_payment_id ? `${p.razorpay_payment_id.slice(0, 14)}…` : "—"),
  },
  {
    key: "date",
    header: "Date",
    className: "text-xs text-muted-foreground",
    cell: (p) => formatDistanceToNow(new Date(p.purchased_at), { addSuffix: true }),
  },
];

function AdminPurchasesPage() {
  const [page, setPage] = useState(1);
  const purchases = usePurchases(page);

  const rows = (purchases.data?.purchases ?? []) as PurchaseRow[];
  const total = purchases.data?.total ?? 0;
  const pageRevenue = rows.reduce((s, p) => s + (p.amount_paid_inr ?? 0), 0);

  return (
    <div>
      <PageHeader
        title="Purchases"
        description={`${total.toLocaleString("en-IN")} purchases · ₹${pageRevenue.toLocaleString("en-IN")} on this page`}
        actions={<ExportCsvButton />}
      />

      <AdminTable
        columns={columns}
        data={rows}
        rowKey={(p) => p.id}
        isLoading={purchases.isPending}
        error={purchases.error?.message}
        onRetry={() => void purchases.refetch()}
        emptyState={{
          icon: ShoppingBag,
          title: "No purchases yet",
          description: "Completed Razorpay payments will appear here.",
        }}
      />

      <TablePagination page={page} pageSize={20} total={total} onPageChange={setPage} />
    </div>
  );
}
