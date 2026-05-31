import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as SiteLayout, P as PageHeader, B as Button } from "./SiteLayout-xyxx2_P_.mjs";
import "../_libs/sonner.mjs";
import { F as FileText, D as Download } from "../_libs/lucide-react.mjs";
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
import "./router-DN3jm67H.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const items = [{
  t: "Burnout Recovery Workbook",
  d: "A 14-day guided workbook to rebuild energy and clarity."
}, {
  t: "Emotional Intelligence Workbook",
  d: "Prompts and exercises to grow self-awareness and empathy."
}, {
  t: "Stress Management Toolkit",
  d: "Tools to reduce daily stress without overhauling your life."
}, {
  t: "Self-Reflection Journal",
  d: "30 days of psychology-led prompts for honest self-inquiry."
}, {
  t: "Habit Tracker",
  d: "A simple, printable system to build habits that last."
}];
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Resources", title: "Practical tools you'll actually use.", description: "Workbooks, journals and toolkits — designed to be simple, repeatable and rooted in psychology." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-5 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: items.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 rounded-xl bg-gradient-to-br from-accent/40 to-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-10 w-10 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold", children: c.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground flex-1", children: c.d }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-5", variant: "secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        "Download PDF"
      ] })
    ] }, c.t)) }) })
  ] });
}
export {
  Page as component
};
