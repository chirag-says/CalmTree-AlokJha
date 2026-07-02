/**
 * Razorpay Webhook — POST /api/webhooks/razorpay
 *
 * Thin route shell — all logic lives in src/server/webhooks/razorpay.ts.
 */

import { createFileRoute } from "@tanstack/react-router";
import { handleRazorpayWebhook } from "@/server/webhooks/razorpay";

export const Route = createFileRoute("/api/webhooks/razorpay")({
  server: {
    handlers: {
      POST: ({ request }) => handleRazorpayWebhook(request),
    },
  },
});
