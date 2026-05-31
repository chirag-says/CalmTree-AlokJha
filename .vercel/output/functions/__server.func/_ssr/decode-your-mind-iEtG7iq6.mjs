import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as SiteLayout, P as PageHeader, B as Button, S as SOCIAL } from "./SiteLayout-xyxx2_P_.mjs";
import { S as SITE } from "./router-DN3jm67H.mjs";
import "../_libs/sonner.mjs";
import { Y as Youtube, I as Instagram, P as Play, b as Brain, l as Users, g as HeartPulse, j as Sparkles } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function YouTubeEmbed({ videoId, title, className = "" }) {
  const [playing, setPlaying] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  if (playing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-video rounded-xl overflow-hidden ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
        title,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        className: "h-full w-full border-0",
        loading: "lazy"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: `aspect-video rounded-xl overflow-hidden ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => setPlaying(true),
      className: "relative w-full h-full group cursor-pointer bg-gradient-to-br from-primary/15 to-accent/40",
      "aria-label": `Play: ${title}`,
      children: [
        isVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: thumbnailUrl,
            alt: title,
            className: "absolute inset-0 w-full h-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-7 w-7 ml-1" }) }) })
      ]
    }
  ) });
}
const videos = [
  // Placeholder entries — will be replaced with real video IDs
  {
    id: "",
    title: "Why your brain loves overthinking"
  },
  {
    id: "",
    title: "Burnout vs stress — the real difference"
  },
  {
    id: "",
    title: "How emotional intelligence is built"
  },
  {
    id: "",
    title: "The psychology of habits that stick"
  },
  {
    id: "",
    title: "Understanding personality types"
  },
  {
    id: "",
    title: "What boundaries actually mean"
  }
];
const topics = [{
  icon: Brain,
  title: "Psychology Concepts",
  body: "Bite-sized lessons that turn theory into clarity."
}, {
  icon: Users,
  title: "Human Behaviour",
  body: "Why we do what we do — in work, love and life."
}, {
  icon: HeartPulse,
  title: "Mental Wellness",
  body: "Calm, sustainable practices for everyday life."
}, {
  icon: Sparkles,
  title: "Personality Education",
  body: "Know your style. Understand others. Communicate better."
}];
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: `The channel by ${SITE.name}`, title: "Decode Your Mind.", description: "Practical psychology on YouTube and Instagram — short, honest, useful." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-5 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "h-12 px-5", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SOCIAL.youtube.url, target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4" }),
        "Subscribe on YouTube"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "secondary", className: "h-12 px-5", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SOCIAL.instagram.url, target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }),
        "Follow on Instagram"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-semibold mb-8", children: "Latest videos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: videos.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition-shadow", children: [
        v.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(YouTubeEmbed, { videoId: v.id, title: v.title }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-gradient-to-br from-primary/15 to-accent/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-10 w-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: v.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Decode Your Mind" })
        ] })
      ] }, v.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-semibold mb-8", children: "From Instagram" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SOCIAL.instagram.url, target: "_blank", rel: "noopener noreferrer", className: "aspect-[9/16] rounded-2xl bg-gradient-to-br from-accent/40 to-primary/20 border border-border flex items-center justify-center hover:border-primary/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-7 w-7 text-primary" }) }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-semibold mb-8", children: "What we cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: topics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "h-6 w-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-semibold", children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t.body })
      ] }, t.title)) })
    ] })
  ] });
}
export {
  Page as component
};
