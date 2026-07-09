/**
 * Dashboard — My Ebooks (/dashboard/ebooks)
 * Lists purchased ebooks with a signed download button.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyPurchasedEbookIds, getActiveEbooks } from "@/server/functions/ebooks.functions";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EbookDownloadButton } from "@/components/ebooks/EbookDownloadButton";
import { EbookReadButton } from "@/components/ebooks/EbookReadButton";

export const Route = createFileRoute("/dashboard/ebooks")({
  head: () => ({ meta: [{ title: "My Ebooks | CalmTree Dashboard" }] }),
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
    ])
      .then(([purchasedRes, catalogRes]) => {
        const ids = new Set("error" in purchasedRes ? [] : purchasedRes.ebookIds);
        const all = "error" in catalogRes ? [] : (catalogRes.ebooks as EbookRow[]);
        setEbooks(all.filter((e) => ids.has(e.id)));
      })
      .catch((e) => {
        console.error("[ebooks] failed to load ebooks:", e);
      })
      .finally(() => setLoading(false));
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
            <Link to="/resources">Browse ebooks</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ebooks.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border bg-card p-5 flex flex-col">
              <div className="aspect-[2/3] w-full rounded-xl bg-gradient-to-br from-accent/40 to-primary/15 flex items-center justify-center overflow-hidden mb-4">
                {e.cover_image_url ? (
                  <img
                    src={e.cover_image_url}
                    alt={e.title}
                    className="h-full w-full object-contain"
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
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {session?.access_token && (
                  <>
                    <EbookReadButton
                      ebookId={e.id}
                      accessToken={session.access_token}
                      title={e.title}
                    />
                    <EbookDownloadButton ebookId={e.id} accessToken={session.access_token} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
