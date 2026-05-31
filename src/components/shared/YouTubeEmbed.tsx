import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  /** YouTube video ID (the part after ?v=) */
  videoId: string;
  /** Title for accessibility */
  title: string;
  /** Aspect ratio class. Defaults to 16:9. */
  className?: string;
}

/**
 * Privacy-friendly, lazy-loaded YouTube embed.
 *
 * Shows a thumbnail + play button. Only loads the iframe when clicked.
 * This avoids loading ~800KB of YouTube scripts on page load.
 */
export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy-load thumbnail via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className={`aspect-video rounded-xl overflow-hidden ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`aspect-video rounded-xl overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="relative w-full h-full group cursor-pointer bg-gradient-to-br from-primary/15 to-accent/40"
        aria-label={`Play: ${title}`}
      >
        {isVisible && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
            <Play className="h-7 w-7 ml-1" />
          </span>
        </span>
      </button>
    </div>
  );
}
