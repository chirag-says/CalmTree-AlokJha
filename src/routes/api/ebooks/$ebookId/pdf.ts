/**
 * Ebook PDF stream — GET /api/ebooks/$ebookId/pdf
 *
 * Thin route shell — ownership check + streaming live in
 * src/server/ebooks/read-proxy.ts. Used by the in-app flipbook reader.
 */

import { createFileRoute } from "@tanstack/react-router";
import { handleEbookRead } from "@/server/ebooks/read-proxy";

export const Route = createFileRoute("/api/ebooks/$ebookId/pdf")({
  server: {
    handlers: {
      GET: ({ request, params }) => handleEbookRead(request, params.ebookId),
    },
  },
});
