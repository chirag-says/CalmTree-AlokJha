import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { SITE } from "@/data/constants";
import { ArrowUpRight } from "lucide-react";
import { sortedPosts, readingMinutes, formatPostDate } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: `Blog | ${SITE.name}` },
      {
        name: "description",
        content:
          "Practical, plain-language psychology for self-awareness, emotions, stress, and everyday life. Notes and essays from Calmtree.",
      },
      { property: "og:title", content: `Blog | ${SITE.name}` },
      {
        property: "og:description",
        content: "Practical psychology for everyday life, written simply.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = sortedPosts();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Blog"
        title="Psychology for everyday life"
        description="Short, practical reads on self-awareness, emotions, and the mind. No jargon, no therapy-speak. Just useful psychology."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div
                  className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${post.cover}`}
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      loading="lazy"
                    />
                  ) : (
                    <post.icon
                      className="h-10 w-10 text-primary/80 transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      strokeWidth={1.5}
                    />
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-muted-foreground">
                    {formatPostDate(post.publishedAt)} · {readingMinutes(post)} min read
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
