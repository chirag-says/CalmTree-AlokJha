/**
 * Admin Results — /admin/results
 *
 * Mobile: expandable cards showing assessment name + result label up front,
 * with score, user ID, and date revealed on expand. Desktop: standard table.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ClipboardList } from "lucide-react";
import { useResults } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminTable, type ColumnDef } from "@/components/admin/AdminTable";
import { MobileCardList } from "@/components/admin/MobileCardList";
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

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

const columns: ColumnDef<ResultRow>[] = [
  {
    key: "assessment",
    header: "Assessment",
    className: "text-foreground",
    cell: (r) => formatSlug(r.assessment_slug),
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

      {/* Mobile: expandable card list */}
      <div className="sm:hidden">
        <MobileCardList
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
          title={(r) => formatSlug(r.assessment_slug)}
          subtitle={(r) => (
            <span className="text-primary">{r.primary_label}</span>
          )}
          badges={(r) =>
            r.percentage !== null ? (
              <span className="text-xs font-medium text-foreground">
                {Math.round(r.percentage)}%
              </span>
            ) : null
          }
          details={(r) => [
            {
              label: "Result",
              value: (
                <span className="text-xs font-medium text-primary">
                  {r.primary_label}
                </span>
              ),
            },
            {
              label: "Score",
              value: (
                <span className="text-xs text-foreground">
                  {r.percentage !== null ? `${Math.round(r.percentage)}%` : "—"}
                </span>
              ),
            },
            {
              label: "User",
              value: (
                <span className="font-mono text-[10px] text-muted-foreground">
                  {r.user_id.slice(0, 16)}…
                </span>
              ),
            },
            {
              label: "Completed",
              value: (
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(r.completed_at), { addSuffix: true })}
                </span>
              ),
            },
          ]}
        />
      </div>

      {/* Desktop: table view */}
      <div className="hidden sm:block">
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
      </div>

      <TablePagination page={page} pageSize={20} total={total} onPageChange={setPage} />
    </div>
  );
}
