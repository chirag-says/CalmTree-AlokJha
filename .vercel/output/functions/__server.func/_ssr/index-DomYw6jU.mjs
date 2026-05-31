import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as SiteLayout, P as PageHeader, B as Button } from "./SiteLayout-xyxx2_P_.mjs";
import { A as ASSESSMENT_LIST, S as SITE } from "./router-DN3jm67H.mjs";
import "../_libs/sonner.mjs";
import { j as Sparkles, U as User, d as ClipboardCheck, H as Heart, b as Brain, f as Flame, k as Timer, h as Lock, a as ArrowRight } from "../_libs/lucide-react.mjs";
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
const ICON_MAP = {
  flame: Flame,
  brain: Brain,
  heart: Heart,
  "clipboard-check": ClipboardCheck,
  user: User,
  sparkles: Sparkles
};
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Assessments", title: "Self-checks for self-awareness.", description: "These assessments are educational tools — not diagnoses. Use them to reflect, learn and choose what to work on next." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: ASSESSMENT_LIST.map((a) => {
        const Icon = ICON_MAP[a.meta.icon] ?? ClipboardCheck;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-semibold", children: a.meta.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground flex-1", children: a.meta.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3.5 w-3.5" }),
              a.meta.duration
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
              "Private"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/assessments/$slug", params: {
            slug: a.slug
          }, children: [
            "Start assessment",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) })
        ] }, a.slug);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 text-sm text-muted-foreground max-w-2xl", children: [
        "Note: ",
        SITE.name,
        " assessments are for psychology education and self-reflection only. They are not a substitute for clinical evaluation, diagnosis or counselling."
      ] })
    ] })
  ] });
}
export {
  Page as component
};
