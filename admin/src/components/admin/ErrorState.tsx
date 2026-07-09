/**
 * ErrorState — inline failure block with an optional retry action.
 */

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/12">
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">Something went wrong</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        {message ?? "The data couldn't be loaded."}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
