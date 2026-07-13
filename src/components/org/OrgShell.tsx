/**
 * OrgShell — the org dashboard chrome (left sidebar + main area).
 *
 * Mirrors the client app's AppShell but with org-specific navigation:
 * Campaigns, Credits, and org context (name + role). Designed for clean
 * extraction to org.calmtree.in later.
 */

import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Megaphone,
  CreditCard,
  Menu,
  X,
  LogOut,
  Building2,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface OrgInfo {
  id: string;
  name: string;
  slug: string;
  role: string;
  creditBalance: number;
}

interface OrgShellProps {
  children: ReactNode;
  org: OrgInfo | null;
  orgs?: OrgInfo[];
}

function OrgSidebar({
  org,
  orgs,
  onClose,
}: {
  org: OrgInfo | null;
  orgs?: OrgInfo[];
  onClose?: () => void;
}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [orgPickerOpen, setOrgPickerOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out.");
  }

  const displayName = user?.user_metadata?.full_name as string | undefined;
  const initial = displayName
    ? displayName[0].toUpperCase()
    : (user?.email?.[0].toUpperCase() ?? "U");

  const navItems = org
    ? [
        { to: "/org", label: "Overview", icon: LayoutDashboard, exact: true },
        { to: "/org/campaigns", label: "Campaigns", icon: Megaphone, exact: false },
        { to: "/org/credits", label: "Credits", icon: CreditCard, exact: false },
      ]
    : [];

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

      {/* Org selector */}
      {org && (
        <div className="px-4 py-3 border-b border-white/10">
          {orgs && orgs.length > 1 ? (
            <div className="relative">
              <button
                onClick={() => setOrgPickerOpen(!orgPickerOpen)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
              >
                <Building2 className="h-4 w-4 text-white/60 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{org.name}</p>
                  <p className="text-xs text-white/50 capitalize">{org.role}</p>
                </div>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-white/40 transition-transform ${orgPickerOpen ? "rotate-180" : ""}`}
                />
              </button>
              {orgPickerOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-[#1a3d2a] border border-white/10 shadow-xl z-20 py-1">
                  {orgs.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => {
                        setOrgPickerOpen(false);
                        navigate({ to: "/org", search: { orgId: o.id } });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors ${o.id === org.id ? "bg-white/5 font-medium" : "text-white/70"}`}
                    >
                      {o.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2">
              <Building2 className="h-4 w-4 text-white/60 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{org.name}</p>
                <p className="text-xs text-white/50 capitalize">{org.role}</p>
              </div>
            </div>
          )}

          {/* Credit balance chip */}
          <div className="mt-2 mx-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
            <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-300 font-medium">
              {org.creditBalance.toLocaleString()} credits
            </span>
          </div>
        </div>
      )}

      {/* User chip */}
      <div className="px-4 py-3 border-b border-white/10">
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
        {navItems.map((item) => {
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

export function OrgShell({ children, org, orgs }: OrgShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-[240px] lg:shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <OrgSidebar org={org} orgs={orgs} />
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
            <OrgSidebar org={org} orgs={orgs} onClose={() => setSidebarOpen(false)} />
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
          <span className="ml-3 text-sm font-semibold">
            {org ? org.name : "CalmTree Enterprise"}
          </span>
        </header>

        <main className="flex-1 px-5 py-8 md:px-8 md:py-10 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
