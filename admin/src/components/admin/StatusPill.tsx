/**
 * StatusPill — semantic status badge. Tones map to the theme's semantic
 * tokens via a static cva map (Tailwind v4 can't detect dynamic classes).
 */

import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const pillVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      tone: {
        success: "bg-success/12 text-success",
        warning: "bg-warning/12 text-warning",
        danger: "bg-destructive/12 text-destructive",
        info: "bg-info/12 text-info",
        primary: "bg-primary/12 text-primary",
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type PillTone = NonNullable<VariantProps<typeof pillVariants>["tone"]>;

export function StatusPill({ tone, children }: { tone?: PillTone; children: ReactNode }) {
  return <span className={pillVariants({ tone })}>{children}</span>;
}

/** Maps a purchases.status value to a pill tone. */
export function purchaseStatusTone(status: string): PillTone {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
    case "created":
      return "warning";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}

/** Maps an ebooks.status value to a pill tone. */
export function ebookStatusTone(status: string): PillTone {
  switch (status) {
    case "active":
      return "success";
    case "draft":
      return "warning";
    default:
      return "neutral";
  }
}
