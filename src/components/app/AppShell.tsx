/**
 * AppShell — the shared logged-in application chrome (left sidebar + main area).
 *
 * Used by BOTH the dashboard routes and the _authed content routes (Assessments,
 * Academy, Resources) so the whole signed-in experience is one cohesive app —
 * navigating between them never falls back to the public marketing header/footer.
 */

import { Link } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import {
  LayoutDashboard,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  BookText,
  Download,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useResultPersistence } from "@/hooks/useResultPersistence";
import { toast } from "sonner";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/assessments", label: "Assessments", icon: ClipboardCheck, exact: false },
  { to: "/academy", label: "Academy", icon: GraduationCap, exact: false },
  { to: "/resources", label: "Resources", icon: BookOpen, exact: false },
  { to: "/dashboard/results", label: "My Results", icon: BookText, exact: false },
  { to: "/dashboard/ebooks", label: "My Ebooks", icon: Download, exact: false },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
] as const;

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out.");
  }

  const displayName = user?.user_metadata?.full_name as string | undefined;
  const initial = displayName
    ? displayName[0].toUpperCase()
    : (user?.email?.[0].toUpperCase() ?? "U");

  return (
    <aside className="flex flex-col h-full bg-[#0f2d1a] text-white min-w-[220px] max-w-[260px] w-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Logo static />
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:text-white/60">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* User chip */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-white text-sm font-semibold shrink-0">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{displayName ?? "My Account"}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-white/15 text-white font-medium" }}
              activeOptions={{ exact: item.exact }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 pb-5">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:bg-white/10 hover:text-white/80 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { claimStashed } = useResultPersistence();

  // Self-heal: if a result ever failed to save (or was stashed anonymously
  // and never claimed), retry it the next time the signed-in app shell loads.
  useEffect(() => {
    if (!user) return;
    claimStashed().then((res) => {
      if (res.claimed) toast.success("Synced a saved assessment result.");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-[240px] lg:shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 lg:hidden h-14 flex items-center px-4 bg-background border-b border-border">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 text-sm font-semibold">Calmtree</span>
        </header>

        <main className="flex-1 px-5 py-8 md:px-8 md:py-10 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
