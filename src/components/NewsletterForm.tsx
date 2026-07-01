import { useState } from "react";
import { usePostHog } from "@posthog/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      posthog.capture("newsletter_subscribed");
      toast.success("You're on the list. Check your inbox.");
    }, 600);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${compact ? "max-w-md" : "max-w-xl"}`}
    >
      <Input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 bg-background"
        aria-label="Email address"
      />
      <Button type="submit" disabled={loading} className="h-12 px-6">
        {loading ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
