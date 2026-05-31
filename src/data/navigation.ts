/**
 * Centralized navigation config — drives header, footer, sitemap, and mobile menu.
 * Add a route here = it appears everywhere automatically.
 */

export interface NavLink {
  to: string;
  label: string;
  /** If true, only show in footer "Explore" section, not main nav */
  footerOnly?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/decode-your-mind", label: "Decode Your Mind" },
  { to: "/academy", label: "Academy" },
  { to: "/assessments", label: "Assessments" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  explore: NAV_LINKS.filter((l) => l.to !== "/" && l.to !== "/contact" && l.to !== "/about"),
  company: [
    { to: "/about", label: `About Alok Jha` },
    { to: "/contact", label: "Contact" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms" },
  ],
} as const;
