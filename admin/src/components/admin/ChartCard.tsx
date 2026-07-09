/**
 * ChartCard — card chrome for Recharts blocks with built-in loading and
 * empty variants so charts never render on missing data.
 */

import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { BarChart3 } from "lucide-react";

export function ChartCard({
  title,
  description,
  action,
  isLoading = false,
  isEmpty = false,
  emptyLabel = "No data for this period",
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="surface-raised rounded-2xl p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {isLoading ? (
        <Skeleton className="h-[250px] w-full rounded-xl" />
      ) : isEmpty ? (
        <div className="flex h-[250px] items-center justify-center">
          <EmptyState icon={BarChart3} title={emptyLabel} />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
