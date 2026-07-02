/**
 * AdminLayout.tsx — Admin sidebar shell + is_admin guard.
 * Distinct dark-teal accent to differentiate from the user dashboard.
 */

import { Link, Navigate, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ClipboardList,
  BookOpen,
  Menu,
  X,
  LogOut,
  Shield,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ADMIN_NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "Users", icon: Users, exact: false },
  { to: "/admin/purchases", label: "Purchases", icon: ShoppingBag, exact: false },
  { to: "/admin/results", label: "Results", icon: ClipboardList, exact: false },
  { to: "/admin/ebooks", label: "Ebooks", icon: BookOpen, exact: false },
] as const;

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out.");
  }

  const displayName = user?.user_metadata?.full_name as string | undefined;
  const initial = displayName
    ? displayName[0].toUpperCase()
    : (user?.email?.[0].toUpperCase() ?? "A");

  return (
    <aside className="flex flex-col h-full bg-[#0a1f2e] text-white min-w-[220px] max-w-[260px] w-full border-r border-white/10">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Logo static />
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:text-white/60">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Admin badge */}
      <div className="px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 tracking-wide uppercase">
          <Shield className="h-3.5 w-3.5" />
          Admin Panel
        </div>
      </div>

      {/* User chip */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold shrink-0">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{displayName ?? "Admin"}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              activeProps={{ className: "bg-cyan-500/15 text-cyan-200 font-medium" }}
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
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:bg-white/10 hover:text-white/80 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060f18]">
      <div className="h-8 w-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
    </div>
  );
}

function NotAuthorized() {
  const { user, signOut } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#060f18] px-4 text-center text-white">
      <Shield className="h-10 w-10 text-cyan-400/70" />
      <h1 className="mt-4 text-xl font-semibold">Not authorized</h1>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        The account <span className="text-white/80">{user?.email}</span> doesn't have admin access.
      </p>
      <button
        onClick={() => void signOut()}
        className="mt-6 rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
      >
        Sign in with a different account
      </button>
    </div>
  );
}

export function AdminLayout() {
  const { user, isReady, profile, profileError } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Wait for auth + profile to resolve.
  if (!isReady) return <FullPageSpinner />;
  // Not signed in → admin login.
  if (!user) return <Navigate to="/login" />;
  // Profile failed to load → treat as not-authorized (safe default).
  if (profileError) return <NotAuthorized />;
  // Signed in but not an admin → turn them away (no redirect loop).
  if (!profile?.is_admin) return <NotAuthorized />;

  return (
    <div className="min-h-screen flex bg-[#060f18] text-white">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-[240px] lg:shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <AdminSidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-10 flex flex-col h-full">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 lg:hidden h-14 flex items-center px-4 bg-[#0a1f2e] border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 text-sm font-semibold text-cyan-300">Admin</span>
        </header>

        <main className="flex-1 px-5 py-8 md:px-8 md:py-10 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Reusable stat card ───────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-cyan-400/60" />}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}
