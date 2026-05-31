import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { NAV_LINKS, FOOTER_LINKS } from "@/data/navigation";
import { SITE } from "@/data/constants";

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <span onClick={() => setOpen(false)}>
          <Logo />
        </span>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden lg:inline-flex rounded-full px-5">
            <Link to="/assessments">
              Start Your Journey
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <button
            aria-label="Menu"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="mx-auto max-w-6xl px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo static />
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Decode Your Mind by {SITE.name}. Psychology education, courses,
            assessments, and resources for everyday self-awareness and growth.
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
    <section
      className="border-b border-border/60"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        {eyebrow && (
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-primary mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}