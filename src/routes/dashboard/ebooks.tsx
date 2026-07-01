/**
 * Dashboard — My Ebooks (/dashboard/ebooks)
 * Lists purchased ebooks with a signed download button.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getMyPurchasedEbookIds,
  getActiveEbooks,
  getEbookDownloadUrl,
} from "@/lib/api/ebooks.functions";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/ebooks")({
  head: () => ({ meta: [{ title: "My Ebooks — CalmTree Dashboard" }] }),
  component: Page,
});

interface EbookRow {
  id: string;
  title: string;
  subtitle: string | null;
  cover_image_url: string | null;
  price_inr: number;
  page_count: number | null;
}

function DownloadButton({ ebookId, session }: { ebookId: string; session: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const res = await getEbookDownloadUrl({ data: { accessToken: session, ebookId } });
      if ("error" in res && res.error) {
        toast.error(res.error);
        return;
      }
      if ("downloadUrl" in res && res.downloadUrl) {
        // Open in new tab — browser handles PDF download
        window.open(res.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" onClick={handleDownload} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating link…
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}

function Page() {
  const { user, session, loading: authLoading } = useAuth();
  const [ebooks, setEbooks] = useState<EbookRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user || !session?.access_token) return;
    setLoading(true);

    Promise.all([
      getMyPurchasedEbookIds({ data: { accessToken: session.access_token } }),
      getActiveEbooks({ data: {} }),
    ]).then(([purchasedRes, catalogRes]) => {
      const ids = new Set("error" in purchasedRes ? [] : purchasedRes.ebookIds);
      const all = "error" in catalogRes ? [] : (catalogRes.ebooks as EbookRow[]);
      setEbooks(all.filter((e) => ids.has(e.id)));
      setLoading(false);
    });
  }, [user, session, authLoading]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">My Ebooks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Download your purchased ebooks anytime.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : ebooks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">You haven't purchased any ebooks yet.</p>
          <Button asChild className="mt-4">
            <a href="/resources">Browse ebooks</a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ebooks.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col">
              <div className="h-28 rounded-xl bg-gradient-to-br from-accent/40 to-primary/15 flex items-center justify-center mb-4">
                {e.cover_image_url ? (
                  <img
                    src={e.cover_image_url}
                    alt={e.title}
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <FileText className="h-10 w-10 text-primary" />
                )}
              </div>
              <h3 className="text-sm font-semibold leading-snug">{e.title}</h3>
              {e.subtitle && <p className="text-xs text-muted-foreground mt-1">{e.subtitle}</p>}
              {e.page_count && (
                <p className="text-xs text-muted-foreground mt-1">{e.page_count} pages</p>
              )}
              <div className="mt-auto pt-4">
                {session?.access_token && (
                  <DownloadButton ebookId={e.id} session={session.access_token} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
