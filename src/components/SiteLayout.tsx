import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { UserMenu } from "@/components/auth/UserMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NAV_ITEMS,
  FOOTER_LINKS,
  isNavGroup,
  type NavItem,
  type NavGroup,
} from "@/data/navigation";
import { SITE } from "@/data/constants";
import { useAuth } from "@/hooks/useAuth";

function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { user } = useAuth();
  const isAuthed = Boolean(user);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Filter requiresAuth links when not authenticated; keep groups (their
  // children may still be public).
  const isVisible = (item: NavItem) =>
    isNavGroup(item) || !item.requiresAuth || isAuthed;
  const visibleItems = NAV_ITEMS.filter(isVisible);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between gap-4">
        <span className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </span>
        <nav className="hidden xl:flex items-center gap-5 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visibleItems.map((item) =>
            isNavGroup(item) ? (
              <NavGroupMenu key={item.label} group={item} pathname={pathname} />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          {isAuthed && (
            <Button asChild size="sm" className="hidden xl:inline-flex rounded-full px-5">
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
          <UserMenu />
          <button
            aria-label="Menu"
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="xl:hidden border-t border-border/60 bg-background">
          <div className="mx-auto max-w-7xl px-5 py-3 flex flex-col gap-1">
            {visibleItems.map((item) =>
              isNavGroup(item) ? (
                <MobileNavGroup
                  key={item.label}
                  group={item}
                  isOpen={openGroup === item.label}
                  onToggle={() =>
                    setOpenGroup((g) => (g === item.label ? null : item.label))
                  }
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-base text-muted-foreground hover:text-foreground"
                  activeProps={{ className: "text-foreground font-medium" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Mobile accordion for a grouped set of links. Collapsed by default so the
 * group's children stay tucked behind the group label; tapping toggles a smooth
 * height reveal (grid-rows 0fr→1fr) with a rotating chevron.
 */
function MobileNavGroup({
  group,
  isOpen,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-2 text-base text-muted-foreground hover:text-foreground"
      >
        {group.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {group.children.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              onClick={onNavigate}
              className="block py-2 pl-3 text-base text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop nav dropdown for a grouped set of links. Radix DropdownMenu already
 * scales+fades the panel from the trigger's origin (spatial anchoring); the
 * chevron rotates on open and the trigger lights up when a child route is active.
 */
function NavGroupMenu({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const isActive = group.children.some(
    (c) => pathname === c.to || pathname.startsWith(`${c.to}/`),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`group inline-flex items-center gap-1 text-sm whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded-md ${
          isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {group.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10} className="min-w-52">
        {group.children.map((c) => (
          <DropdownMenuItem key={c.to} asChild>
            <Link
              to={c.to}
              className="cursor-pointer w-full"
              activeProps={{ className: "text-foreground font-medium bg-accent" }}
            >
              {c.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo static />
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Decode Your Mind by {SITE.name}. Psychology education, courses, assessments, and
            resources for everyday self-awareness and growth.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLinks platforms={["youtube", "instagram"]} />
            <Link
              to="/contact"
              aria-label="Contact"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.explore.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.company.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {SITE.disclaimer}
          </p>
          <p>Made with care in {SITE.location}.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border/60" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        {eyebrow && (
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground max-w-3xl">{title}</h1>
        {description && (
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
