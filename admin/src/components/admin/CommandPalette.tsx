/**
 * CommandPalette — global Ctrl/⌘+K launcher: navigate between admin pages,
 * toggle the theme, and search users by name.
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  Moon,
  ShoppingBag,
  Sun,
  User,
  Users,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { listUsers } from "@/server/functions/admin.functions";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";

const NAV_COMMANDS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/purchases", label: "Purchases", icon: ShoppingBag },
  { to: "/admin/results", label: "Results", icon: ClipboardList },
  { to: "/admin/ebooks", label: "Ebooks", icon: BookOpen },
] as const;

interface UserHit {
  id: string;
  full_name: string | null;
  email: string | null;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [userHits, setUserHits] = useState<UserHit[]>([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { session } = useAuth();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Debounced user search against the existing listUsers server fn.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const token = session?.access_token;
    if (!open || !token || query.trim().length < 2) {
      setUserHits([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await listUsers({
          data: { accessToken: token, page: 1, pageSize: 5, search: query.trim() },
        });
        setUserHits("error" in res && res.error ? [] : (res.users as UserHit[]));
      } catch {
        setUserHits([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, open, session?.access_token]);

  function run(action: () => void) {
    onOpenChange(false);
    setQuery("");
    action();
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages or users…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>{searching ? "Searching…" : "No results found."}</CommandEmpty>
        <CommandGroup heading="Navigate">
          {NAV_COMMANDS.map((cmd) => (
            <CommandItem key={cmd.to} onSelect={() => run(() => navigate({ to: cmd.to }))}>
              <cmd.icon className="h-4 w-4" />
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => run(toggle)}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </CommandItem>
        </CommandGroup>
        {userHits.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Users">
              {userHits.map((hit) => (
                <CommandItem
                  key={hit.id}
                  value={`user-${hit.id}-${hit.full_name ?? hit.email ?? ""}`}
                  onSelect={() =>
                    run(() =>
                      navigate({
                        to: "/admin/users",
                        search: { q: hit.full_name ?? hit.email ?? undefined },
                      }),
                    )
                  }
                >
                  <User className="h-4 w-4" />
                  <span>{hit.full_name ?? "Unnamed"}</span>
                  {hit.email && <span className="text-muted-foreground">{hit.email}</span>}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
