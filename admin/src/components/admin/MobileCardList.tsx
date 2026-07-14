/**
 * MobileCardList — expandable card list for mobile table replacement.
 *
 * On mobile viewports, tables with many columns are hard to read. This
 * component renders each row as a compact card with a chevron that reveals
 * additional detail fields on tap.
 */

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import type { ComponentType } from "react";

export interface CardField {
  label: string;
  value: ReactNode;
}

interface MobileCardProps<T> {
  item: T;
  /** Primary line (e.g. name, title) */
  title: (item: T) => ReactNode;
  /** Secondary line (e.g. email, slug) */
  subtitle?: (item: T) => ReactNode;
  /** Inline badges visible even when collapsed (e.g. status, onboarded) */
  badges?: (item: T) => ReactNode;
  /** Detail fields shown when expanded */
  details: (item: T) => CardField[];
  /** Optional footer rendered at bottom of expanded section */
  footer?: (item: T) => ReactNode;
  /** Called when the main area (title/subtitle) is tapped */
  onTap?: () => void;
}

function MobileCard<T>({
  item,
  title,
  subtitle,
  badges,
  details,
  footer,
  onTap,
}: MobileCardProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const fields = details(item);

  return (
    <div className="surface-raised rounded-xl overflow-hidden">
      {/* Always-visible row */}
      <div className="flex items-center gap-2 p-3">
        {/* Tap main area → action (open drawer / navigate) */}
        <button
          type="button"
          className="flex-1 min-w-0 text-left"
          onClick={onTap}
        >
          <div className="font-medium text-sm text-foreground truncate">
            {title(item)}
          </div>
          {subtitle && (
            <div className="text-xs text-muted-foreground truncate">
              {subtitle(item)}
            </div>
          )}
        </button>

        {/* Quick inline badges */}
        {badges && (
          <div className="flex items-center gap-1.5 shrink-0">
            {badges(item)}
          </div>
        )}

        {/* Expand/collapse chevron */}
        {fields.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            className="shrink-0 p-1 -mr-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label={expanded ? "Collapse details" : "Expand details"}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {expanded && fields.length > 0 && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-3 py-2.5 space-y-1.5">
              {fields.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70">
                    {f.label}
                  </span>
                  <div className="text-right">{f.value}</div>
                </div>
              ))}
              {footer && <div className="pt-1">{footer(item)}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── List wrapper with loading / error / empty states ──────────────────────

export interface MobileCardListProps<T> {
  data: T[];
  rowKey: (item: T) => string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyState?: {
    icon?: ComponentType<{ className?: string }>;
    title: string;
    description?: string;
  };
  title: (item: T) => ReactNode;
  subtitle?: (item: T) => ReactNode;
  badges?: (item: T) => ReactNode;
  details: (item: T) => CardField[];
  footer?: (item: T) => ReactNode;
  onTap?: (item: T) => void;
}

export function MobileCardList<T>({
  data,
  rowKey,
  isLoading,
  error,
  onRetry,
  emptyState,
  title,
  subtitle,
  badges,
  details,
  footer,
  onTap,
}: MobileCardListProps<T>) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-14 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className="surface-raised rounded-xl p-6">
        <EmptyState
          icon={emptyState.icon}
          title={emptyState.title}
          description={emptyState.description}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <MobileCard
          key={rowKey(item)}
          item={item}
          title={title}
          subtitle={subtitle}
          badges={badges}
          details={details}
          footer={footer}
          onTap={onTap ? () => onTap(item) : undefined}
        />
      ))}
    </div>
  );
}
