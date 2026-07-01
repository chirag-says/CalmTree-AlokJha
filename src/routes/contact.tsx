import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SITE } from "@/data/constants";
import { Mail } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${SITE.name}` },
      {
        name: "description",
        content: `Get in touch with ${SITE.name} — questions, collaborations and feedback welcome.`,
      },
      { property: "og:title", content: `Contact ${SITE.name}` },
      {
        property: "og:description",
        content: `Reach out to the ${SITE.name} team.`,
      },
    ],
  }),
  component: Page,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

function Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please review the form.");
      return;
    }
    setLoading(true);
    // TODO: Replace with real server function (Resend email to SITE.email)
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks! We'll be in touch soon.");
    }, 600);
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        description="Questions, collaborations or feedback — we read every message."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 grid gap-12 md:grid-cols-[2fr_1fr] items-start">
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-card p-6 md:p-8 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Your name</Label>
              <Input
                id="contact-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="h-12 px-6">
            {loading ? "Sending…" : "Send message"}
          </Button>
        </form>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">Email</h3>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {SITE.email}
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-semibold">Follow Decode Your Mind</h3>
            <div className="mt-4">
              <SocialLinks platforms={["youtube", "instagram"]} />
            </div>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
