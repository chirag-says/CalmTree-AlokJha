import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SITE } from "@/data/constants";
import { getPost, readingMinutes, formatPostDate, type Block } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    const title = post ? `${post.title} | ${SITE.name}` : `Blog | ${SITE.name}`;
    const description = post?.excerpt ?? "Practical psychology for everyday life.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: BlogPostPage,
});

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-12 text-2xl md:text-3xl font-semibold tracking-tight">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="mt-5 text-lg leading-relaxed text-foreground/90">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul
          key={i}
          className="mt-5 space-y-2 pl-5 list-disc marker:text-primary text-lg leading-relaxed text-foreground/90"
        >
          {block.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-8 border-l-2 border-primary pl-5 font-serif text-xl italic text-foreground"
        >
          {block.text}
          {block.cite && (
            <cite className="mt-2 block text-sm not-italic text-muted-foreground">
              {block.cite}
            </cite>
          )}
        </blockquote>
      );
  }
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="text-3xl font-semibold">Post not found</h1>
          <p className="mt-3 text-muted-foreground">
            This post may have moved or never existed.
          </p>
          <Button asChild className="mt-6">
            <Link to="/blog">Back to the blog</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">{post.category}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            By {post.author} · {formatPostDate(post.publishedAt)} · {readingMinutes(post)} min read
          </p>
        </header>

        {post.image ? (
          <div className="mt-8 overflow-hidden rounded-3xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
        ) : (
          <div
            className={`mt-8 flex aspect-[21/9] items-center justify-center rounded-3xl bg-gradient-to-br ${post.cover}`}
          >
            <post.icon className="h-12 w-12 text-primary/80" strokeWidth={1.5} />
          </div>
        )}

        <div className="mt-4">{post.content.map(renderBlock)}</div>

        <footer className="mt-14 border-t border-border/60 pt-8">
          <p className="text-sm text-muted-foreground">
            Written by <span className="font-medium text-foreground">{post.author}</span>. This is
            psychology education, not medical or counselling advice.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/assessments">
                Take an assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Read more posts</Link>
            </Button>
          </div>
        </footer>
      </article>
    </SiteLayout>
  );
}
