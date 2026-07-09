/**
 * SetupNotice — shown when an integration (PostHog) isn't configured yet.
 */

import type { ReactNode } from "react";
import { Plug } from "lucide-react";

export function SetupNotice({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/12">
        <Plug className="h-5 w-5 text-primary" />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-md text-xs text-muted-foreground">{description}</p>
      {children && <div className="mt-4 text-left">{children}</div>}
    </div>
  );
}
