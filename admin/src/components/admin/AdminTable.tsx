/**
 * AdminTable — the one data table for all admin list pages. Owns the
 * loading-skeleton / error / empty states so pages never hand-roll them.
 */

import type { ComponentType, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  /** Applied to both the header and body cells (alignment, width). */
  className?: string;
}

export function AdminTable<T>({
  columns,
  data,
  rowKey,
  isLoading = false,
  error,
  onRetry,
  onRowClick,
  emptyState,
  skeletonRows = 5,
}: {
  columns: ColumnDef<T>[];
  data: T[] | undefined;
  rowKey: (row: T) => string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRowClick?: (row: T) => void;
  emptyState?: {
    icon?: ComponentType<{ className?: string }>;
    title: string;
    description?: string;
  };
  skeletonRows?: number;
}) {
  const showBanner = !isLoading && (error || (data ?? []).length === 0);

  return (
    <div className="surface-raised overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "text-xs uppercase tracking-wider text-muted-foreground",
                    col.className,
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: skeletonRows }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full max-w-32" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : showBanner ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0">
                  {error ? (
                    <ErrorState message={error} onRetry={onRetry} />
                  ) : (
                    <EmptyState
                      icon={emptyState?.icon}
                      title={emptyState?.title ?? "Nothing here yet"}
                      description={emptyState?.description}
                    />
                  )}
                </TableCell>
              </TableRow>
            ) : (
              (data ?? []).map((row) => (
                <TableRow
                  key={rowKey(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn("transition-colors", onRowClick && "cursor-pointer")}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
