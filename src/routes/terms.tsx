import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { SITE } from "@/data/constants";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Terms of Use — ${SITE.name}` },
      {
        name: "description",
        content:
          "Terms and conditions for using CalmTree's psychology education platform, including disclaimers, intellectual property, and user responsibilities.",
      },
      { property: "og:title", content: `Terms of Use — ${SITE.name}` },
      {
        property: "og:description",
        content: "The rules and responsibilities for using CalmTree's platform and content.",
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
        title="Terms of Use"
        description="By using CalmTree, you agree to these terms. Please read them carefully."
      />
      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using the CalmTree website, mobile content, newsletters, courses,
            assessments, and any other services (collectively, the "Services"), you agree to be
            bound by these Terms of Use. If you do not agree, please do not use the Services.
          </p>
        </Section>

        <Section title="2. Nature of Our Services">
          <p>
            CalmTree is a <strong>psychology education and self-discovery platform</strong>. Our
            content — including videos, articles, courses, assessments, and workbooks — is designed
            for educational and informational purposes only.
          </p>
          <p>
            <strong className="text-foreground">
              CalmTree is not a medical or mental health service provider.
            </strong>{" "}
            We do not diagnose, treat, or provide therapy for any mental health condition. If you
            are experiencing a mental health crisis or need professional support, please contact a
            licensed mental health professional or emergency services.
          </p>
        </Section>

        <Section title="3. No Medical or Counselling Advice">
          <p>
            Nothing on CalmTree constitutes medical, psychological, or professional counselling
            advice. The information provided is general in nature and may not apply to your specific
            situation. Always seek the advice of a qualified professional regarding any mental
            health concerns.
          </p>
        </Section>

        <Section title="4. User Accounts and Responsibilities">
          <p>
            When you create an account or subscribe to our services, you agree to provide accurate
            and complete information. You are responsible for maintaining the confidentiality of
            your account credentials and for all activities that occur under your account.
          </p>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Use the Services for any unlawful purpose or in violation of any applicable law.
            </li>
            <li>Attempt to gain unauthorised access to any portion of the Services.</li>
            <li>Interfere with or disrupt the integrity or performance of the Services.</li>
            <li>
              Reproduce, duplicate, copy, sell, or exploit any portion of the Services without
              express written permission.
            </li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content on CalmTree — including text, graphics, logos, videos, courses, assessments,
            workbooks, and software — is the property of CalmTree or its content creators and is
            protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may access and use the content for personal, non-commercial purposes. You may not
            modify, distribute, transmit, display, perform, reproduce, publish, license, create
            derivative works from, or sell any content without prior written consent.
          </p>
        </Section>

        <Section title="6. Purchases and Refunds">
          <p>
            Some of our courses and resources may be available for purchase. All prices are listed
            in Indian Rupees (INR) unless otherwise stated. We use secure third-party payment
            processors. Refund policies, where applicable, will be specified at the point of
            purchase.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, CalmTree and its founders, employees, and
            affiliates shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or related to your use of the Services, even if advised
            of the possibility of such damages.
          </p>
          <p>
            Our total liability to you for any claim arising from these Terms shall not exceed the
            amount you paid to CalmTree, if any, in the twelve (12) months preceding the claim.
          </p>
        </Section>

        <Section title="8. Indemnification">
          <p>
            You agree to indemnify and hold harmless CalmTree and its team from any claims, damages,
            losses, or expenses (including legal fees) arising out of your use of the Services or
            violation of these Terms.
          </p>
        </Section>

        <Section title="9. Termination">
          <p>
            We reserve the right to suspend or terminate your access to the Services at any time,
            without notice, for conduct that we believe violates these Terms or is harmful to other
            users, us, or third parties.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any
            disputes arising under these Terms shall be subject to the exclusive jurisdiction of the
            courts in New Delhi, India.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Changes will be posted on this page with an
            updated effective date. Continued use of the Services after changes constitutes
            acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            For questions about these Terms, please contact us at:{" "}
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
