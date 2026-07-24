/**
 * Centralized navigation config — drives header, footer, and sitemap.
 * Add a route here = it appears everywhere automatically.
 */

export interface NavLink {
  to: string;
  label: string;
  /** Only render this link when the user is authenticated + onboarded. */
  requiresAuth?: boolean;
}

export interface NavGroup {
  /** Menu label. "TBD" is a placeholder until the client picks the final name. */
  label: string;
  children: readonly NavLink[];
}

export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

/**
 * Pages merged under the "TBD" dropdown. They stay live and stay linked from
 * the footer + sitemap — only their standalone top-nav slots were removed.
 */
const TBD_CHILDREN: readonly NavLink[] = [
  { to: "/decode-your-mind", label: "Decode Your Mind" },
  { to: "/academy", label: "Academy" },
  { to: "/resources", label: "Resources" },
] as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/assessments", label: "Assessments" },
  { to: "/for-organizations", label: "For Organizations" },
  { to: "/blog", label: "Blog" },
  { label: "TBD", children: TBD_CHILDREN },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/** Flat list of every navigable page — used by the footer's Explore column. */
export const ALL_NAV_LINKS: readonly NavLink[] = NAV_ITEMS.flatMap((item) =>
  isNavGroup(item) ? item.children : [item],
);

export const FOOTER_LINKS = {
  explore: ALL_NAV_LINKS.filter((l) => l.to !== "/" && l.to !== "/contact" && l.to !== "/about"),
  company: [
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms" },
  ],
} as const;
