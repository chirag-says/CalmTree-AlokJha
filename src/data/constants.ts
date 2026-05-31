/**
 * Site-wide constants — single source of truth.
 * Every component reads from here. No magic strings scattered around.
 */

export const SITE = {
  name: "Calmtree",
  tagline: "Psychology Studio",
  description:
    "Practical psychology for self-awareness, emotional wellness, behaviour, work, relationships, and personal growth.",
  domain: "calmtree.com",
  url: "https://calmtree.com",
  email: "hello@calmtree.in",
  founder: "Alok Jha",
  founderTitle: "Founder of Calmtree. Psychology educator.",
  /** Legal disclaimer shown in footer and assessment pages */
  disclaimer:
    "Psychology education — not medical or counselling advice.",
  location: "India",
  logoPath: "/logo.png",
} as const;
