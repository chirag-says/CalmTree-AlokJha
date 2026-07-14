/**
 * UserMenu — header auth entry point.
 *
 * Logged out → "Sign in" button → OTP-first AuthModal.
 * Logged in  → avatar/initial chip → dropdown: Dashboard · Sign out.
 */

import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, ChevronDown, Shield, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function UserMenu() {
  const { user, loading, signOut, profile } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    // Tiny skeleton to avoid layout shift
    return <div className="h-9 w-20 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) {
    return (
      <>
        <Button
          id="header-sign-in-btn"
          size="sm"
          variant="outline"
          className="rounded-full px-5"
          onClick={() => setAuthOpen(true)}
        >
          Sign in
        </Button>
        <AuthModal
          open={authOpen}
          onOpenChange={setAuthOpen}
          onAuthed={() => navigate({ to: "/dashboard" })}
        />
      </>
    );
  }

  // Derive display initial
  const displayName = user.user_metadata?.full_name as string | undefined;
  const initial = displayName
    ? displayName[0].toUpperCase()
    : (user.email?.[0].toUpperCase() ?? "U");

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out.");
    navigate({ to: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id="header-user-menu-btn"
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {initial}
          </span>
          <span className="hidden sm:inline max-w-[120px] truncate">
            {displayName ?? user.email}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/org" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organization
          </Link>
        </DropdownMenuItem>
        {profile?.is_admin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* Admin is a separate app (admin.calmtree.in) — link out, not an in-app route. */}
              <a
                href={import.meta.env.VITE_ADMIN_URL ?? "https://admin.calmtree.in"}
                className="flex items-center gap-2 text-cyan-600"
              >
                <Shield className="h-4 w-4" />
                Admin
              </a>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-destructive focus:text-destructive gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
