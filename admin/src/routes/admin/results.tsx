/**
 * Admin Results — /admin/results
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ClipboardList } from "lucide-react";
import { useResults } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminTable, type ColumnDef } from "@/components/admin/AdminTable";
import { TablePagination } from "@/components/admin/TablePagination";

export const Route = createFileRoute("/admin/results")({
  head: () => ({ meta: [{ title: "Results — CalmTree Admin" }] }),
  component: AdminResultsPage,
});

interface ResultRow {
  id: string;
  user_id: string;
  assessment_slug: string;
  primary_label: string;
  percentage: number | null;
  completed_at: string;
}

const columns: ColumnDef<ResultRow>[] = [
  {
    key: "assessment",
    header: "Assessment",
    className: "text-foreground",
    cell: (r) =>
      r.assessment_slug
        .split("-")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
  },
  {
    key: "result",
    header: "Result",
    className: "text-primary",
    cell: (r) => r.primary_label,
  },
  {
    key: "score",
    header: "Score",
    className: "text-muted-foreground",
    cell: (r) => (r.percentage !== null ? `${Math.round(r.percentage)}%` : "—"),
  },
  {
    key: "user",
    header: "User",
    className: "font-mono text-xs text-muted-foreground/70",
    cell: (r) => `${r.user_id.slice(0, 10)}…`,
  },
  {
    key: "date",
    header: "Date",
    className: "text-xs text-muted-foreground",
    cell: (r) => formatDistanceToNow(new Date(r.completed_at), { addSuffix: true }),
  },
];

function AdminResultsPage() {
  const [page, setPage] = useState(1);
  const results = useResults(page);

  const rows = (results.data?.results ?? []) as ResultRow[];
  const total = results.data?.total ?? 0;

  return (
    <div>
      <PageHeader
        title="Assessment Results"
        description={`${total.toLocaleString("en-IN")} total results (read-only).`}
      />

      <AdminTable
        columns={columns}
        data={rows}
        rowKey={(r) => r.id}
        isLoading={results.isPending}
        error={results.error?.message}
        onRetry={() => void results.refetch()}
        emptyState={{
          icon: ClipboardList,
          title: "No results yet",
          description: "Completed assessments will appear here.",
        }}
      />

      <TablePagination page={page} pageSize={20} total={total} onPageChange={setPage} />
    </div>
  );
}
