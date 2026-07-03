/**
 * Social media links — one place to update, used everywhere.
 */

export const SOCIAL = {
  youtube: {
    url: "https://www.youtube.com/@decodeminddeep",
    label: "YouTube",
  },
  instagram: {
    url: "https://www.instagram.com/calmtree.in?igsh=MW5uczZ2eXJ4MHRsOA==",
    label: "Instagram",
  },
  telegram: {
    url: "https://t.me/calmtree",
    label: "Telegram",
  },
} as const;

export type SocialPlatform = keyof typeof SOCIAL;
