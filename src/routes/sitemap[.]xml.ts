import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/data/constants";
import { ASSESSMENT_LIST } from "@/data/assessments";
import type {} from "@tanstack/react-start";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
          {
            path: "/decode-your-mind",
            changefreq: "weekly",
            priority: "0.9",
          },
          { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/for-organizations", changefreq: "monthly", priority: "0.8" },
          { path: "/assessments", changefreq: "weekly", priority: "0.8" },
          // Only free assessments are indexed — premium slugs still require
          // login to take and have no anonymous-visitor value yet.
          ...ASSESSMENT_LIST.filter((a) => a.meta.isFree).map(
            (a): SitemapEntry => ({
              path: `/assessments/${a.slug}`,
              changefreq: "monthly",
              priority: "0.7",
            }),
          ),
          { path: "/resources", changefreq: "weekly", priority: "0.8" },
          { path: "/academy", changefreq: "monthly", priority: "0.5" },
        ];

        const today = new Date().toISOString().split("T")[0];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${SITE.url}${e.path}</loc>`,
            `    <lastmod>${today}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
