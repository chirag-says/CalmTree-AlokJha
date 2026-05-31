import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as SITE } from "./router-DN3jm67H.mjs";
import { S as Send, I as Instagram, Y as Youtube, a as ArrowRight, X, i as Menu, M as Mail } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function LogoMark({ size = "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: SITE.logoPath,
      alt: `${SITE.name} logo`,
      className: `${dim} rounded-full object-cover`,
      width: size === "sm" ? 32 : 36,
      height: size === "sm" ? 32 : 36
    }
  );
}
function Logo({ size = "md", static: isStatic, className = "" }) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogoMark, { size }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lg tracking-tight", children: SITE.name })
  ] });
  if (isStatic) return content;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "group", "aria-label": `${SITE.name} home`, children: content });
}
const SOCIAL = {
  youtube: {
    url: "https://www.youtube.com/@calmtree",
    // TODO: confirm with Alok
    label: "YouTube"
  },
  instagram: {
    url: "https://www.instagram.com/calmtree.in",
    // TODO: confirm with Alok
    label: "Instagram"
  },
  telegram: {
    url: "https://t.me/calmtree",
    // TODO: confirm with Alok
    label: "Telegram"
  }
};
const ICONS = {
  youtube: Youtube,
  instagram: Instagram,
  telegram: Send
};
function SocialLinks({
  platforms = ["youtube", "instagram", "telegram"],
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex gap-3 ${className}`, children: platforms.map((key) => {
    const { url, label } = SOCIAL[key];
    const Icon = ICONS[key];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": label,
        className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:text-primary hover:border-primary/40 transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
      },
      key
    );
  }) });
}
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/decode-your-mind", label: "Decode Your Mind" },
  { to: "/academy", label: "Academy" },
  { to: "/assessments", label: "Assessments" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
const FOOTER_LINKS = {
  explore: NAV_LINKS.filter((l) => l.to !== "/" && l.to !== "/contact" && l.to !== "/about"),
  company: [
    { to: "/about", label: `About Alok Jha` },
    { to: "/contact", label: "Contact" },
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms" }
  ]
};
function Header() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-7", children: NAV_LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          activeProps: { className: "text-foreground font-medium" },
          activeOptions: { exact: l.to === "/" },
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "hidden lg:inline-flex rounded-full px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/assessments", children: [
          "Start Your Journey",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            "aria-label": "Menu",
            className: "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted",
            onClick: () => setOpen((v) => !v),
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-border/60 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-5 py-3 flex flex-col gap-1", children: NAV_LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: l.to,
        onClick: () => setOpen(false),
        className: "py-2 text-base text-muted-foreground hover:text-foreground",
        activeProps: { className: "text-foreground font-medium" },
        activeOptions: { exact: l.to === "/" },
        children: l.label
      },
      l.to
    )) }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border/60 bg-secondary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14 grid gap-10 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { static: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground max-w-sm", children: [
          "Decode Your Mind by ",
          SITE.name,
          ". Psychology education, courses, assessments, and resources for everyday self-awareness and growth."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialLinks, { platforms: ["youtube", "instagram"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              "aria-label": "Contact",
              className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border hover:text-primary hover:border-primary/40 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-3", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: FOOTER_LINKS.explore.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "hover:text-foreground", children: l.label }) }, l.to)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold mb-3", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: FOOTER_LINKS.company.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "hover:text-foreground", children: l.label }) }, l.to)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        SITE.name,
        ". ",
        SITE.disclaimer
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Made with care in ",
        SITE.location,
        "."
      ] })
    ] }) })
  ] });
}
function SiteLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function PageHeader({
  eyebrow,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "border-b border-border/60",
      style: { background: "var(--gradient-hero)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-16 md:py-24", children: [
        eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tracking-[0.18em] uppercase text-primary mb-4", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-semibold text-foreground max-w-3xl", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-2xl", children: description })
      ] })
    }
  );
}
export {
  Button as B,
  PageHeader as P,
  SOCIAL as S,
  SiteLayout as a,
  SocialLinks as b,
  cn as c
};
