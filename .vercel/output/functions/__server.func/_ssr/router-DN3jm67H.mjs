import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
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
const appCss = "/assets/styles-CfKYJEbn.css";
const SITE = {
  name: "Calmtree",
  description: "Practical psychology for self-awareness, emotional wellness, behaviour, work, relationships, and personal growth.",
  url: "https://calmtree.com",
  email: "hello@calmtree.in",
  founder: "Alok Jha",
  founderTitle: "Founder of Calmtree. Psychology educator.",
  /** Legal disclaimer shown in footer and assessment pages */
  disclaimer: "Psychology education — not medical or counselling advice.",
  location: "India",
  logoPath: "/logo.png"
};
function organizationSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logoPath}`,
    description: SITE.description,
    email: SITE.email,
    foundingLocation: {
      "@type": "Place",
      name: SITE.location
    },
    sameAs: [
      // TODO: add real YouTube and Instagram URLs
    ]
  });
}
function websiteSchema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name
    }
  });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    console.error("[CalmTree] Unhandled error:", error);
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${SITE.name} — Understand Your Mind. Improve Your Life.` },
        {
          name: "description",
          content: SITE.description
        },
        { name: "author", content: SITE.name },
        {
          property: "og:title",
          content: `${SITE.name} — Practical Psychology for Everyday Life`
        },
        {
          property: "og:description",
          content: "Decode Your Mind. Learn at Calmtree Academy. Take psychology assessments and download practical resources."
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: SITE.url },
        { name: "twitter:card", content: "summary" }
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        },
        { rel: "icon", href: SITE.logoPath, type: "image/png" }
      ]
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent
  }
);
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: organizationSchema() }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: websiteSchema() }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
const $$splitComponentImporter$9 = () => import("./terms-77vWuf4r.mjs");
const Route$a = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: `Terms of Use — ${SITE.name}`
    }, {
      name: "description",
      content: "Terms and conditions for using CalmTree's psychology education platform, including disclaimers, intellectual property, and user responsibilities."
    }, {
      property: "og:title",
      content: `Terms of Use — ${SITE.name}`
    }, {
      property: "og:description",
      content: "The rules and responsibilities for using CalmTree's platform and content."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const Route$9 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/academy", changefreq: "weekly", priority: "0.9" },
          { path: "/assessments", changefreq: "weekly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          {
            path: "/decode-your-mind",
            changefreq: "weekly",
            priority: "0.9"
          },
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/resources", changefreq: "weekly", priority: "0.8" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" }
        ];
        const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${SITE.url}${e.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$8 = () => import("./resources-C_FzwLv0.mjs");
const Route$8 = createFileRoute("/resources")({
  head: () => ({
    meta: [{
      title: `Resources — ${SITE.name} Workbooks & Journals`
    }, {
      name: "description",
      content: "Download practical psychology workbooks, journals and toolkits to reflect and grow."
    }, {
      property: "og:title",
      content: `${SITE.name} Resources`
    }, {
      property: "og:description",
      content: "Workbooks, journals and toolkits for practical self-work."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./privacy-policy-Cmf5zLdR.mjs");
const Route$7 = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{
      title: `Privacy Policy — ${SITE.name}`
    }, {
      name: "description",
      content: "CalmTree's privacy policy explains how we collect, use, and protect your personal information on our psychology education platform."
    }, {
      property: "og:title",
      content: `Privacy Policy — ${SITE.name}`
    }, {
      property: "og:description",
      content: "How CalmTree handles your data. Transparent, simple, and respectful."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./decode-your-mind-iEtG7iq6.mjs");
const Route$6 = createFileRoute("/decode-your-mind")({
  head: () => ({
    meta: [{
      title: `Decode Your Mind — by ${SITE.name}`
    }, {
      name: "description",
      content: `The media channel by ${SITE.name}. YouTube videos and Instagram reels on psychology, behaviour and mental wellness.`
    }, {
      property: "og:title",
      content: `Decode Your Mind by ${SITE.name}`
    }, {
      property: "og:description",
      content: "Psychology concepts, human behaviour and personality education — simply explained."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-DnATs2q8.mjs");
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: `Contact ${SITE.name}`
    }, {
      name: "description",
      content: `Get in touch with ${SITE.name} — questions, collaborations and feedback welcome.`
    }, {
      property: "og:title",
      content: `Contact ${SITE.name}`
    }, {
      property: "og:description",
      content: `Reach out to the ${SITE.name} team.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./academy-D9WXxnYs.mjs");
const Route$4 = createFileRoute("/academy")({
  head: () => ({
    meta: [{
      title: `${SITE.name} Academy — Micro & Certificate Courses`
    }, {
      name: "description",
      content: "Short, practical psychology courses. Build real understanding at your pace."
    }, {
      property: "og:title",
      content: `${SITE.name} Academy`
    }, {
      property: "og:description",
      content: "Micro courses and certificate courses in practical psychology."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-CwPQyfti.mjs");
const Route$3 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: `About ${SITE.founder} — Founder of ${SITE.name}`
    }, {
      name: "description",
      content: `${SITE.founder} — MBA, Master's in Psychology, entrepreneur and psychology educator — on making psychology simple and useful.`
    }, {
      property: "og:title",
      content: `About ${SITE.founder} — ${SITE.name}`
    }, {
      property: "og:description",
      content: `The story behind ${SITE.name} and Decode Your Mind.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-Cad0tJpt.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: `${SITE.name} — Understand Your Mind. Improve Your Life.`
    }, {
      name: "description",
      content: SITE.description
    }, {
      property: "og:title",
      content: `${SITE.name} — Practical Psychology for Everyday Life`
    }, {
      property: "og:description",
      content: `Decode Your Mind. Learn at ${SITE.name} Academy. Take assessments and download resources.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DomYw6jU.mjs");
const Route$1 = createFileRoute("/assessments/")({
  head: () => ({
    meta: [{
      title: `Psychology Assessments — ${SITE.name}`
    }, {
      name: "description",
      content: "Free, private psychology self-checks: burnout, stress, emotional intelligence, personality style, self-esteem."
    }, {
      property: "og:title",
      content: `Psychology Assessments — ${SITE.name}`
    }, {
      property: "og:description",
      content: "Quick self-checks to understand where you are today."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const LIKERT_5 = [
  { label: "Never", value: 0 },
  { label: "Almost never", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Fairly often", value: 3 },
  { label: "Very often", value: 4 }
];
const stressCheck = {
  slug: "stress-check",
  meta: {
    title: "Stress Check",
    subtitle: "How stressed are you, really?",
    description: "Measure your current stress levels using a research-backed scale. Takes under 5 minutes and gives you immediate, private results.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "brain",
    source: "Based on the Perceived Stress Scale (PSS-10) by Cohen et al., 1983."
  },
  instructions: "For each question, choose how often you have felt or thought a certain way during the last month. Answer quickly and honestly — there are no right or wrong answers.",
  questions: [
    { id: "s1", text: "In the last month, how often have you been upset because of something that happened unexpectedly?", options: LIKERT_5 },
    { id: "s2", text: "In the last month, how often have you felt that you were unable to control the important things in your life?", options: LIKERT_5 },
    { id: "s3", text: "In the last month, how often have you felt nervous and stressed?", options: LIKERT_5 },
    { id: "s4", text: "In the last month, how often have you felt confident about your ability to handle your personal problems?", options: LIKERT_5, reverse: true },
    { id: "s5", text: "In the last month, how often have you felt that things were going your way?", options: LIKERT_5, reverse: true },
    { id: "s6", text: "In the last month, how often have you found that you could not cope with all the things that you had to do?", options: LIKERT_5 },
    { id: "s7", text: "In the last month, how often have you been able to control irritations in your life?", options: LIKERT_5, reverse: true },
    { id: "s8", text: "In the last month, how often have you felt that you were on top of things?", options: LIKERT_5, reverse: true },
    { id: "s9", text: "In the last month, how often have you been angered because of things that were outside of your control?", options: LIKERT_5 },
    { id: "s10", text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?", options: LIKERT_5 }
  ],
  scoring: { method: "sum", min: 0, max: 40 },
  resultRanges: [
    {
      min: 0,
      max: 13,
      label: "Low Stress",
      color: "green",
      interpretation: "Your stress levels are well within a healthy range. You're managing life's demands effectively and maintaining a good sense of control.",
      suggestions: [
        "Continue your current stress management habits",
        "Share what works for you with people around you",
        "Stay mindful — low stress now doesn't mean ignoring self-care"
      ]
    },
    {
      min: 14,
      max: 26,
      label: "Moderate Stress",
      color: "yellow",
      interpretation: "You're experiencing a moderate level of stress. This is common, but worth paying attention to — especially if it's been consistent over time.",
      suggestions: [
        "Identify your top 2–3 stress triggers this month",
        "Build one daily micro-habit: breathing exercises, journaling, or a short walk",
        "Consider a structured approach like our Stress Management Toolkit"
      ]
    },
    {
      min: 27,
      max: 40,
      label: "High Stress",
      color: "red",
      interpretation: "Your stress levels are high. This doesn't mean something is wrong with you — it means your current load is exceeding your coping capacity. This is a signal to act.",
      suggestions: [
        "Prioritise rest and recovery — even small amounts matter",
        "Talk to someone you trust about what you're going through",
        "Our Burnout Recovery Workbook offers a structured 14-day reset plan",
        "If stress is persistent, consider speaking with a mental health professional"
      ]
    }
  ]
};
const FREQUENCY_5 = [
  { label: "Never / Almost never", value: 0 },
  { label: "Seldom", value: 25 },
  { label: "Sometimes", value: 50 },
  { label: "Often", value: 75 },
  { label: "Always", value: 100 }
];
const burnoutScore = {
  slug: "burnout-score",
  meta: {
    title: "Burnout Score",
    subtitle: "How close to burnout are you?",
    description: "A quick, research-backed check on your personal burnout level. Six honest questions, instant results, completely private.",
    duration: "2–3 minutes",
    questionCount: 6,
    icon: "flame",
    source: "Based on the Copenhagen Burnout Inventory (CBI) by Kristensen et al., 2005."
  },
  instructions: "Answer each question based on how you've been feeling in general over the past two weeks. Be honest with yourself — there are no right or wrong answers.",
  questions: [
    { id: "b1", text: "How often do you feel tired?", options: FREQUENCY_5 },
    { id: "b2", text: "How often are you physically exhausted?", options: FREQUENCY_5 },
    { id: "b3", text: "How often are you emotionally exhausted?", options: FREQUENCY_5 },
    { id: "b4", text: `How often do you think: "I can't take it anymore"?`, options: FREQUENCY_5 },
    { id: "b5", text: "How often do you feel worn out?", options: FREQUENCY_5 },
    { id: "b6", text: "How often do you feel weak and susceptible to illness?", options: FREQUENCY_5 }
  ],
  scoring: { method: "average", min: 0, max: 100 },
  resultRanges: [
    {
      min: 0,
      max: 25,
      label: "Low Burnout",
      color: "green",
      interpretation: "You're in a healthy zone. Your energy levels and emotional reserves are strong. This is a great foundation to build on.",
      suggestions: [
        "Keep doing what's working — your habits are serving you well",
        "Use this clarity to invest in growth, not just maintenance",
        "Check in with yourself monthly to catch any shifts early"
      ]
    },
    {
      min: 26,
      max: 50,
      label: "Moderate Burnout",
      color: "yellow",
      interpretation: "You're showing early signs of burnout. You might be pushing through more than you realise. This is the best time to intervene — before it gets worse.",
      suggestions: [
        "Identify one thing draining you most — can you reduce or delegate it?",
        "Build recovery into your routine: sleep, movement, or a creative outlet",
        "Our Burnout Recovery Micro Course offers a structured 7-day reset"
      ]
    },
    {
      min: 51,
      max: 75,
      label: "High Burnout",
      color: "orange",
      interpretation: "You're experiencing significant burnout. This level of exhaustion affects your work, relationships, and health. It's not weakness — it's a sign your system needs recovery.",
      suggestions: [
        "Treat recovery as non-negotiable, not something to earn",
        "Communicate your state to someone — a partner, friend, or manager",
        "Our Burnout Recovery Workbook provides a 14-day guided plan",
        "Consider reducing commitments temporarily — protect your capacity"
      ]
    },
    {
      min: 76,
      max: 100,
      label: "Severe Burnout",
      color: "red",
      interpretation: "Your burnout level is severe. You're likely feeling physically and emotionally depleted. This is your mind and body telling you that something fundamental needs to change.",
      suggestions: [
        "This is a strong signal — please take it seriously",
        "Speak with a healthcare professional if exhaustion is persistent",
        "Reduce your load as much as possible, even temporarily",
        "Our Burnout Recovery Workbook + Micro Course together offer a comprehensive reset",
        "You are not broken — you are overloaded. Recovery is possible."
      ]
    }
  ]
};
const AGREE_4 = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Agree", value: 3 },
  { label: "Strongly agree", value: 4 }
];
const selfEsteemCheck = {
  slug: "self-esteem-check",
  meta: {
    title: "Self-Esteem Check",
    subtitle: "A gentle look at how you see yourself.",
    description: "Understand your current self-esteem level using the world's most widely used self-esteem scale. Private, quick, and judgment-free.",
    duration: "3–5 minutes",
    questionCount: 10,
    icon: "heart",
    source: "Based on the Rosenberg Self-Esteem Scale (RSES) by Rosenberg, 1965."
  },
  instructions: "Read each statement and choose how much you agree or disagree with it right now. There are no right or wrong answers — just be honest about how you feel today.",
  questions: [
    { id: "se1", text: "On the whole, I am satisfied with myself.", options: AGREE_4 },
    { id: "se2", text: "At times I think I am no good at all.", options: AGREE_4, reverse: true },
    { id: "se3", text: "I feel that I have a number of good qualities.", options: AGREE_4 },
    { id: "se4", text: "I am able to do things as well as most other people.", options: AGREE_4 },
    { id: "se5", text: "I feel I do not have much to be proud of.", options: AGREE_4, reverse: true },
    { id: "se6", text: "I certainly feel useless at times.", options: AGREE_4, reverse: true },
    { id: "se7", text: "I feel that I'm a person of worth, at least on an equal plane with others.", options: AGREE_4 },
    { id: "se8", text: "I wish I could have more respect for myself.", options: AGREE_4, reverse: true },
    { id: "se9", text: "All in all, I am inclined to feel that I am a failure.", options: AGREE_4, reverse: true },
    { id: "se10", text: "I take a positive attitude toward myself.", options: AGREE_4 }
  ],
  scoring: { method: "sum", min: 10, max: 40 },
  resultRanges: [
    {
      min: 10,
      max: 19,
      label: "Low Self-Esteem",
      color: "red",
      interpretation: "Your self-esteem is currently low. This doesn't define you — it reflects how you're seeing yourself right now, and that can change. Many people experience this during challenging periods.",
      suggestions: [
        "Start small: write down one thing you did well today, every day",
        "Challenge one self-critical thought — ask: would I say this to a friend?",
        "Our Self-Reflection Journal offers 30 days of guided prompts",
        "If low self-esteem is persistent, consider speaking with a counsellor"
      ]
    },
    {
      min: 20,
      max: 29,
      label: "Normal Self-Esteem",
      color: "yellow",
      interpretation: "Your self-esteem is in the normal range. Most people fall here. You have a realistic view of yourself — a mix of confidence and self-doubt, which is human.",
      suggestions: [
        "Build on your strengths — identify what you're naturally good at",
        "Notice when self-doubt is loudest — is it situational?",
        "Our Emotional Intelligence course can deepen self-awareness"
      ]
    },
    {
      min: 30,
      max: 40,
      label: "High Self-Esteem",
      color: "green",
      interpretation: "You have a strong, healthy sense of self-worth. You see yourself clearly — strengths and areas for growth — without being overly harsh or unrealistic.",
      suggestions: [
        "Your self-regard is a real asset — use it to lift others too",
        "Stay open to feedback without feeling threatened by it",
        "Consider how your confidence can support your relationships and leadership"
      ]
    }
  ]
};
const AGREE_5$1 = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neither agree nor disagree", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly agree", value: 5 }
];
const emotionalIntelligence = {
  slug: "emotional-intelligence",
  meta: {
    title: "Emotional Intelligence Assessment",
    subtitle: "How well do you read and manage emotions?",
    description: "Explore your emotional intelligence across four key dimensions: perception, self-management, social skills, and utilisation. Quick, private, research-backed.",
    duration: "4–6 minutes",
    questionCount: 12,
    icon: "sparkles",
    source: "Adapted from the Schutte Self-Report Emotional Intelligence Test (SSEIT) by Schutte et al., 1998."
  },
  instructions: "Read each statement and choose how much you agree or disagree based on how you typically feel and behave. Answer based on what you actually do — not what you think you should do.",
  questions: [
    // Perception of emotion
    { id: "ei1", text: "I can tell how people are feeling by looking at their facial expressions.", options: AGREE_5$1 },
    { id: "ei2", text: "I am aware of my emotions as I experience them.", options: AGREE_5$1 },
    { id: "ei3", text: "I can tell when someone close to me is upset, even if they don't say so.", options: AGREE_5$1 },
    // Managing own emotions
    { id: "ei4", text: "When I am faced with a difficult situation, I can usually find a way to calm myself down.", options: AGREE_5$1 },
    { id: "ei5", text: "I have control over my emotions.", options: AGREE_5$1 },
    { id: "ei6", text: "When I am in a positive mood, I can come up with new ideas more easily.", options: AGREE_5$1 },
    // Managing others' emotions
    { id: "ei7", text: "I can usually motivate myself to keep going when things get tough.", options: AGREE_5$1 },
    { id: "ei8", text: "I compliment others when they have done something well.", options: AGREE_5$1 },
    { id: "ei9", text: "I help others feel better when they are down.", options: AGREE_5$1 },
    // Utilisation of emotion
    { id: "ei10", text: "I use good moods to help me keep trying in the face of obstacles.", options: AGREE_5$1 },
    { id: "ei11", text: "I arrange events that others enjoy.", options: AGREE_5$1 },
    { id: "ei12", text: "I present myself in a way that makes a good impression on others.", options: AGREE_5$1 }
  ],
  scoring: { method: "sum", min: 12, max: 60 },
  resultRanges: [
    {
      min: 12,
      max: 28,
      label: "Developing EI",
      color: "orange",
      interpretation: "Your emotional intelligence has room for growth. This is completely normal — EI is a learnable skill, not a fixed trait. The fact that you're here shows awareness, which is step one.",
      suggestions: [
        "Start with self-awareness: pause 3 times a day and name what you're feeling",
        "Practice active listening — focus on understanding, not responding",
        "Our Emotional Intelligence Fundamentals course builds EI systematically",
        "Read about the four dimensions of EI — knowing the framework helps"
      ]
    },
    {
      min: 29,
      max: 44,
      label: "Moderate EI",
      color: "yellow",
      interpretation: "You have a solid foundation of emotional intelligence. You're reasonably aware of emotions in yourself and others, and you can manage them in most situations. There's room to deepen specific areas.",
      suggestions: [
        "Identify which EI dimension feels weakest — focus growth there",
        "Practice naming nuanced emotions (not just 'good' or 'bad')",
        "Seek feedback from people you trust: 'How do I come across when I'm stressed?'",
        "Our EI Workbook offers structured exercises for each dimension"
      ]
    },
    {
      min: 45,
      max: 60,
      label: "High EI",
      color: "green",
      interpretation: "You demonstrate strong emotional intelligence. You're attuned to your own emotional states and those of others, and you use emotions constructively. This is a real asset in relationships, work, and leadership.",
      suggestions: [
        "Your EI is a strength — use it to mentor and support others",
        "Watch for emotional labour fatigue: managing others' emotions takes energy",
        "Continue developing: EI deepens with intentional practice, even at high levels",
        "Consider how your EI skills translate to leadership and influence"
      ]
    }
  ]
};
const AGREE_5 = [
  { label: "Very inaccurate", value: 1 },
  { label: "Moderately inaccurate", value: 2 },
  { label: "Neither accurate nor inaccurate", value: 3 },
  { label: "Moderately accurate", value: 4 },
  { label: "Very accurate", value: 5 }
];
const personalityStyle = {
  slug: "personality-style",
  meta: {
    title: "Personality Style Assessment",
    subtitle: "What does your personality look like?",
    description: "A quick snapshot of your personality across five core dimensions — extraversion, agreeableness, conscientiousness, emotional stability, and openness to experience.",
    duration: "5–7 minutes",
    questionCount: 20,
    icon: "user",
    source: "Based on the Mini-IPIP (International Personality Item Pool) by Donnellan et al., 2006. Public domain."
  },
  instructions: "Describe yourself as you generally are now, not as you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same sex and roughly your age.",
  questions: [
    // Extraversion
    { id: "p1", text: "I am the life of the party.", options: AGREE_5 },
    { id: "p2", text: "I don't talk a lot.", options: AGREE_5, reverse: true },
    { id: "p3", text: "I talk to a lot of different people at parties.", options: AGREE_5 },
    { id: "p4", text: "I keep in the background.", options: AGREE_5, reverse: true },
    // Agreeableness
    { id: "p5", text: "I sympathise with others' feelings.", options: AGREE_5 },
    { id: "p6", text: "I am not interested in other people's problems.", options: AGREE_5, reverse: true },
    { id: "p7", text: "I feel others' emotions.", options: AGREE_5 },
    { id: "p8", text: "I am not really interested in others.", options: AGREE_5, reverse: true },
    // Conscientiousness
    { id: "p9", text: "I get chores done right away.", options: AGREE_5 },
    { id: "p10", text: "I often forget to put things back in their proper place.", options: AGREE_5, reverse: true },
    { id: "p11", text: "I like order.", options: AGREE_5 },
    { id: "p12", text: "I make a mess of things.", options: AGREE_5, reverse: true },
    // Neuroticism (reverse-framed as Emotional Stability)
    { id: "p13", text: "I have frequent mood swings.", options: AGREE_5 },
    { id: "p14", text: "I am relaxed most of the time.", options: AGREE_5, reverse: true },
    { id: "p15", text: "I get upset easily.", options: AGREE_5 },
    { id: "p16", text: "I seldom feel blue.", options: AGREE_5, reverse: true },
    // Openness
    { id: "p17", text: "I have a vivid imagination.", options: AGREE_5 },
    { id: "p18", text: "I am not interested in abstract ideas.", options: AGREE_5, reverse: true },
    { id: "p19", text: "I have difficulty understanding abstract ideas.", options: AGREE_5, reverse: true },
    { id: "p20", text: "I have a rich vocabulary.", options: AGREE_5 }
  ],
  scoring: { method: "sum", min: 20, max: 100 },
  resultRanges: [
    {
      min: 20,
      max: 45,
      label: "Reflective & Reserved",
      color: "yellow",
      interpretation: "Your personality profile leans towards introversion, independence, and emotional sensitivity. You likely prefer depth over breadth in relationships and think carefully before acting. These are genuine strengths — not limitations.",
      suggestions: [
        "Lean into your strengths: deep thinking, careful observation, and genuine empathy",
        "Build energy management strategies — you may need more recharge time",
        "Understand that personality isn't destiny — traits shift with context and growth",
        "Our Understanding Personality Types course explores each dimension in depth"
      ]
    },
    {
      min: 46,
      max: 70,
      label: "Balanced & Adaptable",
      color: "green",
      interpretation: "Your personality shows a balanced mix across the five dimensions. You can adapt your style to different situations — social when needed, reflective when required. This flexibility is a real advantage.",
      suggestions: [
        "Your adaptability is a strength — use it intentionally, not just reactively",
        "Notice which traits emerge under stress vs comfort — that's revealing",
        "Explore which personality dimensions feel most 'like you' vs performed",
        "Consider how your balanced style affects your relationships and work"
      ]
    },
    {
      min: 71,
      max: 100,
      label: "Expressive & Engaged",
      color: "green",
      interpretation: "Your personality profile shows high engagement across multiple dimensions — you tend towards extraversion, agreeableness, conscientiousness, emotional stability, and openness. You're likely energetic, organized, and socially engaged.",
      suggestions: [
        "Your engagement with the world is energising — but watch for overextension",
        "High agreeableness is a strength, but ensure you're not people-pleasing",
        "Channel your openness into deliberate learning and creative projects",
        "Remember: understanding others' personality styles improves every relationship"
      ]
    }
  ]
};
const ASSESSMENTS = {
  "stress-check": stressCheck,
  "burnout-score": burnoutScore,
  "self-esteem-check": selfEsteemCheck,
  "emotional-intelligence": emotionalIntelligence,
  "personality-style": personalityStyle
};
const ASSESSMENT_LIST = [
  burnoutScore,
  stressCheck,
  emotionalIntelligence,
  selfEsteemCheck,
  personalityStyle
];
function getAssessment(slug) {
  return ASSESSMENTS[slug];
}
const $$splitComponentImporter = () => import("../_slug-CdycqChY.mjs");
const Route = createFileRoute("/assessments/$slug")({
  head: ({
    params
  }) => {
    const config = getAssessment(params.slug);
    const title = config ? `${config.meta.title} — ${SITE.name}` : `Assessment — ${SITE.name}`;
    const description = config?.meta.description ?? "Take a psychology self-check.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: description
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: description
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsRoute = Route$a.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$b
});
const SitemapDotxmlRoute = Route$9.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$b
});
const ResourcesRoute = Route$8.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$b
});
const PrivacyPolicyRoute = Route$7.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$b
});
const DecodeYourMindRoute = Route$6.update({
  id: "/decode-your-mind",
  path: "/decode-your-mind",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const AcademyRoute = Route$4.update({
  id: "/academy",
  path: "/academy",
  getParentRoute: () => Route$b
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const AssessmentsIndexRoute = Route$1.update({
  id: "/assessments/",
  path: "/assessments/",
  getParentRoute: () => Route$b
});
const AssessmentsSlugRoute = Route.update({
  id: "/assessments/$slug",
  path: "/assessments/$slug",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AcademyRoute,
  ContactRoute,
  DecodeYourMindRoute,
  PrivacyPolicyRoute,
  ResourcesRoute,
  SitemapDotxmlRoute,
  TermsRoute,
  AssessmentsSlugRoute,
  AssessmentsIndexRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ASSESSMENT_LIST as A,
  Route as R,
  SITE as S,
  getAssessment as g,
  router as r
};
