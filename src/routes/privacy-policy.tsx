import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { SITE } from "@/data/constants";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${SITE.name}` },
      {
        name: "description",
        content:
          "CalmTree's privacy policy explains how we collect, use, and protect your personal information on our psychology education platform.",
      },
      { property: "og:title", content: `Privacy Policy — ${SITE.name}` },
      {
        property: "og:description",
        content:
          "How CalmTree handles your data. Transparent, simple, and respectful.",
      },
    ],
  }),
  component: Page,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

function Page() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy matters. This policy explains how we collect, use, and safeguard your information on CalmTree."
      />
      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <Section title="1. Introduction">
          <p>
            CalmTree (“we”, “us”, or “our") operates the website{" "}
            <strong>calmtree.in</strong> and related services. This Privacy Policy
            describes how we collect, use, disclose, and safeguard your personal
            information when you visit our website, use our assessments, subscribe to
            our newsletter, or engage with our courses and content.
          </p>
          <p>
            By using CalmTree, you consent to the practices described in this policy.
            If you do not agree, please discontinue use of our services.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Personal identifiers:</strong> name, email address, and contact
              details you provide when signing up for newsletters, contacting us, or
              enrolling in courses.
            </li>
            <li>
              <strong>Usage data:</strong> pages visited, time spent, device type,
              browser, and approximate location (city/region level) via analytics
              tools.
            </li>
            <li>
              <strong>Assessment responses:</strong> answers you provide during
              self-check quizzes and assessments. These are used to generate your
              personalised report and are stored securely.
            </li>
            <li>
              <strong>Communications:</strong> messages you send us via contact forms
              or email.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Deliver and improve our courses, assessments, and content.</li>
            <li>Send newsletters, updates, and relevant educational material.</li>
            <li>Respond to your enquiries and provide customer support.</li>
            <li>Analyse usage trends to improve website experience.</li>
            <li>Comply with legal obligations and protect our rights.</li>
          </ul>
        </Section>

        <Section title="4. Cookies and Tracking">
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, analyse traffic, and understand how visitors interact with our
            site. You can manage cookie preferences through your browser settings.
          </p>
        </Section>

        <Section title="5. Data Sharing and Third Parties">
          <p>
            We do not sell or rent your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Service providers:</strong> trusted vendors who help us host the
              website, send emails, and process payments (where applicable).
            </li>
            <li>
              <strong>Legal authorities:</strong> when required by law or to protect
              our rights.
            </li>
          </ul>
          <p>
            All third-party providers are contractually bound to keep your data
            confidential and secure.
          </p>
        </Section>

        <Section title="6. Data Security">
          <p>
            We implement reasonable technical and organisational measures to protect
            your data against unauthorised access, alteration, disclosure, or
            destruction. However, no internet transmission is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>
            Depending on your location, you may have the right to access, correct,
            delete, or restrict processing of your personal data. To exercise these
            rights, email us at{" "}
            <a
              href="mailto:hello@calmtree.in"
              className="text-primary underline underline-offset-2"
            >
              hello@calmtree.in
            </a>
            .
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            CalmTree is not intended for children under 13. We do not knowingly
            collect personal information from children. If you believe we have
            collected data from a child under 13, please contact us immediately.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted
            on this page with an updated effective date. We encourage you to review
            this policy periodically.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have questions about this Privacy Policy or our data practices,
            please contact us at:{" "}
            <a
              href="mailto:hello@calmtree.in"
              className="text-primary underline underline-offset-2"
            >
              hello@calmtree.in
            </a>
            .
          </p>
        </Section>
      </article>
    </SiteLayout>
  );
}
