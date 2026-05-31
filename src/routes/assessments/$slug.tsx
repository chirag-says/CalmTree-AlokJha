import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { AssessmentRunner } from "@/components/assessment/AssessmentRunner";
import { getAssessment } from "@/data/assessments";
import { SITE } from "@/data/constants";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/assessments/$slug")({
  head: ({ params }) => {
    const config = getAssessment(params.slug);
    const title = config
      ? `${config.meta.title} — ${SITE.name}`
      : `Assessment — ${SITE.name}`;
    const description = config?.meta.description ?? "Take a psychology self-check.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const config = getAssessment(slug);

  if (!config) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h1 className="text-4xl font-semibold mb-4">Assessment not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find an assessment with that name.
          </p>
          <Link
            to="/assessments"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View all assessments
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section
        className="border-b border-border/60"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8">
          <Link
            to="/assessments"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All assessments
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <AssessmentRunner config={config} />
      </section>
    </SiteLayout>
  );
}
