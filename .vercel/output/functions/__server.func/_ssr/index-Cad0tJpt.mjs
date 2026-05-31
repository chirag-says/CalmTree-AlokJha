import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as SiteLayout, B as Button } from "./SiteLayout-xyxx2_P_.mjs";
import { I as Input } from "./input-CV4MaZRd.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as SITE, A as ASSESSMENT_LIST } from "./router-DN3jm67H.mjs";
import { L as Leaf, P as Play, G as GraduationCap, d as ClipboardCheck, a as ArrowRight, j as Sparkles, U as User, H as Heart, b as Brain, f as Flame, k as Timer, g as HeartPulse, B as BookOpen } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const schema = objectType({
  email: stringType().trim().email("Enter a valid email").max(255)
});
function NewsletterForm({ compact = false }) {
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function onSubmit(e) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're on the list. Check your inbox.");
    }, 600);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit,
      className: `flex flex-col sm:flex-row gap-3 ${compact ? "max-w-md" : "max-w-xl"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "email",
            required: true,
            placeholder: "you@example.com",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "h-12 bg-background",
            "aria-label": "Email address"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "h-12 px-6", children: loading ? "Subscribing…" : "Subscribe" })
      ]
    }
  );
}
const ICON_MAP = {
  flame: Flame,
  brain: Brain,
  heart: Heart,
  "clipboard-check": ClipboardCheck,
  user: User,
  sparkles: Sparkles
};
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border border-[#c8d5c4]/60 rounded-xl mx-3 md:mx-5 mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/hero-illustration-mobile.png", alt: "", "aria-hidden": "true", className: "absolute inset-0 w-full h-full object-cover object-bottom md:hidden", loading: "eager" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/hero-illustration.png", alt: "", "aria-hidden": "true", className: "absolute inset-0 w-full h-full object-cover object-bottom hidden md:block", loading: "eager" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "linear-gradient(to bottom, #e8efe6 0%, #e8efe6e0 30%, #e8efe680 55%, transparent 75%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-4xl px-4 md:px-5 pt-8 pb-60 md:pt-16 md:pb-72 lg:pb-80 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-white/70 text-primary text-[10px] md:text-xs font-medium tracking-wide mb-6 md:mb-10 border border-[#c8d5c4]/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-3 w-3 md:h-3.5 md:w-3.5" }),
          "Applied Psychology by ",
          SITE.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-[#2d4a3e] leading-[1.1] tracking-tight max-w-2xl mx-auto", children: [
          "Understand Your Mind.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold italic text-[#3d6b56]", children: "Improve Your Life." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 md:mt-8 text-sm md:text-lg text-[#4a6b5e] max-w-sm md:max-w-lg mx-auto leading-relaxed", children: "A calm, credible place to learn applied psychology — for self-awareness, emotional wellness, relationships, and personal growth. Not therapy. Just useful psychology for everyday life." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 md:mt-14 grid grid-cols-3 gap-3 md:gap-14 max-w-3xl mx-auto", children: [{
          icon: Play,
          title: "Decode Your Mind",
          body: "Psychology explained simply.",
          bodyFull: "Psychology explained simply — on YouTube and Instagram."
        }, {
          icon: GraduationCap,
          title: "Learn at Academy",
          body: "Short courses that build understanding.",
          bodyFull: "Short courses and certificates that build real understanding."
        }, {
          icon: ClipboardCheck,
          title: "Take Assessments",
          body: "Quick self-checks for today.",
          bodyFull: "Quick self-checks to understand where you are today."
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-4 w-4 md:h-5 md:w-5 text-[#3d6b56] mx-auto mb-1.5 md:mb-2.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[11px] md:text-sm tracking-wide text-[#2d4a3e]", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 md:mt-1 text-[10px] md:text-sm text-[#5a7d6e] leading-snug md:leading-relaxed hidden md:block", children: p.bodyFull }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] text-[#5a7d6e] leading-snug md:hidden", children: p.body })
        ] }, p.title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 md:mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "default", className: "h-9 md:h-11 px-5 md:px-7 rounded-full shadow-md text-xs md:text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/assessments", children: [
            "Start Your Journey",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 md:h-4 md:w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "default", variant: "outline", className: "h-9 md:h-11 px-5 md:px-7 rounded-full bg-white/60 border-[#c8d5c4]/60 text-[#2d4a3e] shadow-sm text-xs md:text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/decode-your-mind", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5 md:h-4 md:w-4" }),
            "Watch Decode Your Mind"
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: "Start with Decode Your Mind", title: "Psychology that fits in your scroll.", action: {
      to: "/decode-your-mind",
      label: "Visit the channel"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: [{
      t: "Why we overthink — and how to stop",
      cat: "Psychology Concepts"
    }, {
      t: "The science of burnout recovery",
      cat: "Mental Wellness"
    }, {
      t: "Emotional intelligence in everyday life",
      cat: "Personality Education"
    }].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-gradient-to-br from-primary/15 to-accent/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 ml-0.5" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-medium", children: v.cat }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-semibold", children: v.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Decode Your Mind · 6 min watch" })
      ] })
    ] }, v.t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: "Take Psychology Assessments", title: "Quick self-checks built on real research.", action: {
      to: "/assessments",
      label: "See all assessments"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3 lg:grid-cols-5", children: ASSESSMENT_LIST.map((a) => {
      const Icon = ICON_MAP[a.meta.icon] ?? ClipboardCheck;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/assessments/$slug", params: {
        slug: a.slug
      }, className: "group rounded-2xl border border-border bg-card p-5 text-center hover:shadow-[var(--shadow-soft)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-sm font-semibold group-hover:text-primary transition-colors", children: a.meta.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3 w-3" }),
          a.meta.duration
        ] })
      ] }, a.slug);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: `Explore ${SITE.name} Academy`, title: "Short courses. Real psychology. No fluff.", action: {
      to: "/academy",
      label: "See all courses"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: [{
      t: "Burnout Recovery",
      d: "A 7-day micro course to reset energy and focus.",
      icon: Flame
    }, {
      t: "Stop Overthinking",
      d: "Tools rooted in CBT to quiet the inner loop.",
      icon: Brain
    }, {
      t: "Emotional Intelligence",
      d: "Foundations of EI — for work and relationships.",
      icon: HeartPulse
    }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block mt-3 text-xs uppercase tracking-wider text-primary font-medium", children: "Micro course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-semibold", children: c.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: c.d })
    ] }, c.t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: "Download Practical Resources", title: "Workbooks and journals you'll actually use.", action: {
      to: "/resources",
      label: "Browse resources"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: ["Burnout Recovery Workbook", "Self-Reflection Journal", "Habit Tracker"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-semibold", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "PDF · Print-ready" })
    ] }, t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-5 py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl border border-border bg-card p-8 md:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-[1fr_2fr] items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/founder.jpg", alt: SITE.founder, className: "aspect-square rounded-2xl object-cover mx-auto md:mx-0 max-w-[200px] w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3", children: "About the Founder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-semibold", children: SITE.founder }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground leading-relaxed", children: [
          "MBA and Master's in Psychology. ",
          SITE.founder,
          " founded",
          " ",
          SITE.name,
          " to make psychology simple, practical and useful in everyday life — not as therapy, but as education that helps you understand yourself and the people around you."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "mt-6 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", children: [
          "Read his story ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-5 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-primary/[0.06] border border-primary/15 p-8 md:p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-primary text-xs font-medium tracking-[0.18em] uppercase mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        " Newsletter"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold max-w-lg mx-auto", children: "One thoughtful psychology read, each week." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground max-w-md mx-auto", children: [
        "Join the ",
        SITE.name,
        " newsletter — no noise, no spam. Just useful psychology that helps you understand yourself better."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-sm mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {}) })
    ] }) })
  ] });
}
function Section({
  eyebrow,
  title,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-16 md:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tracking-[0.18em] uppercase text-primary mb-3", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-semibold max-w-2xl", children: title })
      ] }),
      action && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: action.to, className: "hidden md:inline-flex items-center gap-1 text-sm text-primary hover:underline whitespace-nowrap", children: [
        action.label,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }),
    children
  ] });
}
export {
  Index as component
};
