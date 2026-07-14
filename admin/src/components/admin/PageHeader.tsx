/**
 * PageHeader — standard admin page title row: Fraunces heading, muted
 * description, right-aligned actions slot.
 */

import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-3 sm:gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">{title}</h1>
        {description && <p className="mt-1 sm:mt-1.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}
