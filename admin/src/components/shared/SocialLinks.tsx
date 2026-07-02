import { Youtube, Instagram, Send } from "lucide-react";
import { SOCIAL, type SocialPlatform } from "@/data/social";

const ICONS: Record<SocialPlatform, typeof Youtube> = {
  youtube: Youtube,
  instagram: Instagram,
  telegram: Send,
};

interface SocialLinksProps {
  /** Which platforms to show. Defaults to all. */
  platforms?: SocialPlatform[];
  className?: string;
}

export function SocialLinks({
  platforms = ["youtube", "instagram", "telegram"],
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {platforms.map((key) => {
        const { url, label } = SOCIAL[key];
        const Icon = ICONS[key];
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
