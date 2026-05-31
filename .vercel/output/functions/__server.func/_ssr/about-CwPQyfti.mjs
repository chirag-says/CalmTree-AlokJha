import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as SiteLayout, P as PageHeader, B as Button } from "./SiteLayout-xyxx2_P_.mjs";
import { S as SITE } from "./router-DN3jm67H.mjs";
import "../_libs/sonner.mjs";
import { G as GraduationCap, c as Briefcase, T as Target, U as User } from "../_libs/lucide-react.mjs";
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
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "About", title: SITE.founder, description: `${SITE.founderTitle} On a mission to make the mind a little easier to understand.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-16 grid gap-12 md:grid-cols-[1fr_2fr] items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/founder.jpg", alt: SITE.founder, className: "aspect-square rounded-3xl object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-semibold", children: "Psychology that meets real life." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-lg text-muted-foreground", children: [
          SITE.founder,
          " is an entrepreneur and psychology educator. With an MBA and a Master's in Psychology, he brings together two worlds — the practical clarity of business and the depth of psychological insight."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-lg text-muted-foreground", children: [
          "He founded ",
          SITE.name,
          " to make psychology simple, practical and useful in everyday life — not as therapy or medical advice, but as education that helps you understand yourself and the people around you."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 sm:grid-cols-2", children: [{
          icon: GraduationCap,
          t: "Education",
          d: "MBA · Master's in Psychology"
        }, {
          icon: Briefcase,
          t: "Background",
          d: "Entrepreneur & psychology educator"
        }, {
          icon: Target,
          t: "Mission",
          d: "Make psychology simple, practical, and useful for everyday life."
        }, {
          icon: User,
          t: "Audience",
          d: "Curious learners, professionals, and self-discoverers — India and beyond."
        }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-semibold", children: b.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: b.d })
        ] }, b.t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/decode-your-mind", children: "Watch Decode Your Mind" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Get in touch" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
