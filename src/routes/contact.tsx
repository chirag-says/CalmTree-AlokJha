import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SITE } from "@/data/constants";
import { Mail, Send, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${SITE.name}` },
      {
        name: "description",
        content: `Get in touch with ${SITE.name}. Questions, collaborations and feedback welcome.`,
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

const MESSAGE_MAX = 1000;

function Page() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
      setSent(true);
    }, 600);
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        description="Questions, collaborations or feedback. We read every message."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 grid gap-10 md:grid-cols-[2fr_1fr] items-start">
        {/* Form or success state */}
        {sent ? (
          <div className="rounded-3xl border border-border bg-card p-10 flex flex-col items-center text-center gap-5">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </span>
            <div>
              <h2 className="text-xl font-semibold">Message received!</h2>
              <p className="mt-2 text-muted-foreground text-sm max-w-sm">
                Thanks for reaching out. We'll get back to you at{" "}
                <span className="font-medium text-foreground">{form.email || "your email"}</span>{" "}
                within 24 hours.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full px-6 mt-2"
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", message: "" });
              }}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-6 md:p-8 space-y-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Your name</Label>
                <Input
                  id="contact-name"
                  placeholder="Arjun Sharma"
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
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="contact-message">Message</Label>
                <span
                  className={`text-xs tabular-nums transition-colors ${
                    form.message.length > MESSAGE_MAX * 0.9
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {form.message.length} / {MESSAGE_MAX}
                </span>
              </div>
              <Textarea
                id="contact-message"
                rows={6}
                placeholder="What's on your mind? A question, collaboration idea, or just a hello. All welcome."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={MESSAGE_MAX}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="h-11 px-7 rounded-full gap-2">
              {loading ? (
                "Sending…"
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Email us
                </p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Clock className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Response time
                </p>
                <p className="text-sm font-medium">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Follow us
                </p>
                <p className="text-sm font-medium">Decode Your Mind</p>
              </div>
            </div>
            <SocialLinks platforms={["youtube", "instagram"]} />
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
