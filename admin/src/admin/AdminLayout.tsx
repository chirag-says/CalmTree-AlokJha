/**
 * AdminLayout.tsx — Admin shell (shadcn sidebar + top bar) + is_admin guard.
 *
 * The guard order is load-bearing: wait for auth → require sign-in →
 * treat profile errors as not-authorized (safe default) → require is_admin.
 */

import { Link, Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  Building2,
  ChevronsUpDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Search,
  Shield,
  ShoppingBag,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { CommandPalette } from "@/components/admin/CommandPalette";

const ADMIN_NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false },
  { to: "/admin/users", label: "Users", icon: Users, exact: false },
  { to: "/admin/purchases", label: "Purchases", icon: ShoppingBag, exact: false },
  { to: "/admin/results", label: "Results", icon: ClipboardList, exact: false },
  { to: "/admin/orgs", label: "Organizations", icon: Building2, exact: false },
  { to: "/admin/ebooks", label: "Ebooks", icon: BookOpen, exact: false },
] as const;

function AdminSidebar() {
  const { user, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out.");
  }

  const displayName = user?.user_metadata?.full_name as string | undefined;
  const initial = displayName
    ? displayName[0].toUpperCase()
    : (user?.email?.[0].toUpperCase() ?? "A");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center">
          <Logo static />
        </div>
        <div className="flex items-center gap-2 px-2 pb-1 text-xs font-medium uppercase tracking-wide text-primary group-data-[collapsible=icon]:hidden">
          <Shield className="h-3.5 w-3.5" />
          Admin Panel
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_NAV.map((item) => {
                const isActive = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                      <Link to={item.to}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/15 text-primary text-sm font-semibold">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-medium">{displayName ?? "Admin"}</span>
                    <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel className="truncate">{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void handleSignOut()}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

function NotAuthorized() {
  const { user, signOut } = useAuth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <Shield className="h-10 w-10 text-primary/70" />
      <h1 className="mt-4 text-xl font-semibold">Not authorized</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The account <span className="text-foreground">{user?.email}</span> doesn't have admin
        access.
      </p>
      <Button variant="outline" className="mt-6 rounded-full" onClick={() => void signOut()}>
        Sign in with a different account
      </Button>
    </div>
  );
}

export function AdminLayout() {
  const { user, isReady, profile, profileError } = useAuth();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Wait for auth + profile to resolve.
  if (!isReady) return <FullPageSpinner />;
  // Not signed in → admin login.
  if (!user) return <Navigate to="/login" />;
  // Profile failed to load → treat as not-authorized (safe default).
  if (profileError) return <NotAuthorized />;
  // Signed in but not an admin → turn them away (no redirect loop).
  if (!profile?.is_admin) return <NotAuthorized />;

  const currentNav = [...ADMIN_NAV]
    .reverse()
    .find((item) => (item.exact ? pathname === item.to : pathname.startsWith(item.to)));

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-12 sm:h-14 items-center gap-1.5 sm:gap-2 border-b border-border bg-background/80 px-2 sm:px-4 backdrop-blur">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-0.5 sm:mr-1 h-4" />
          <span className="text-sm font-medium text-foreground truncate">
            {currentNav?.label ?? "Admin"}
          </span>
          <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 text-muted-foreground"
              onClick={() => setPaletteOpen(true)}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-sm">Search</span>
              <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                ⌘K
              </kbd>
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 sm:px-5 sm:py-8 md:px-8 md:py-10">
          <Outlet />
        </main>
      </SidebarInset>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </SidebarProvider>
  );
}
