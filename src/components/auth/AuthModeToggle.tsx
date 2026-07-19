/**
 * AuthModeToggle — the "which door" segmented control shared by the /login page
 * and the header AuthModal.
 *
 * Individual vs. organization sign-in use the *same* Supabase OTP auth; the only
 * difference is where you land afterwards (/dashboard vs. /org). This is purely
 * presentational — the parent decides what selecting a mode does (navigate a URL
 * param on the page, or flip local state in the modal).
 */

import { Building2, User } from "lucide-react";

export type AuthMode = "individual" | "org";

const TABS: { value: AuthMode; label: string; Icon: typeof User }[] = [
  { value: "individual", label: "Individual", Icon: User },
  { value: "org", label: "Organization", Icon: Building2 },
];

export function AuthModeToggle({
  mode,
  onSelect,
  className = "",
}: {
  mode: AuthMode;
  onSelect: (mode: AuthMode) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Sign in as"
      className={`grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 ${className}`}
    >
      {TABS.map(({ value, label, Icon }) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(value)}
            className={[
              "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
