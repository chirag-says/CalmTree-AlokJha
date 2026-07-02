/**
 * Social media links — one place to update, used everywhere.
 * TODO: Replace placeholder URLs with Alok's real channel/handle.
 */

export const SOCIAL = {
  youtube: {
    url: "https://www.youtube.com/@calmtree", // TODO: confirm with Alok
    label: "YouTube",
  },
  instagram: {
    url: "https://www.instagram.com/calmtree.in", // TODO: confirm with Alok
    label: "Instagram",
  },
  telegram: {
    url: "https://t.me/calmtree", // TODO: confirm with Alok
    label: "Telegram",
  },
} as const;

export type SocialPlatform = keyof typeof SOCIAL;
