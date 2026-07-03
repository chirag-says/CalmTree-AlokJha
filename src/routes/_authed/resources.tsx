/**
 * /resources — the ebook storefront (auth-gated, like all content pages).
 *
 * Renders the real catalog from the ebooks table:
 *   - not owned → Razorpay buy button (webhook writes the purchase row)
 *   - owned     → signed-URL download button
 *
 * After a successful checkout the purchase row lands via webhook, so we
 * re-fetch owned IDs shortly after the success callback fires.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/SiteLayout";
import { SITE } from "@/data/constants";
import { FileText, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getActiveEbooks, getMyPurchasedEbookIds } from "@/server/functions/ebooks.functions";
import { RazorpayCheckoutButton } from "@/components/payments/RazorpayCheckoutButton";
import { EbookDownloadButton } from "@/components/ebooks/EbookDownloadButton";

export const Route = createFileRoute("/_authed/resources")({
  head: () => ({
    meta: [
      { title: `Resources | ${SITE.name} Workbooks & Journals` },
      {
        name: "description",
        content:
          "Download practical psychology workbooks, journals and toolkits to reflect and grow.",
      },
      { property: "og:title", content: `${SITE.name} Resources` },
      {
        property: "og:description",
        content: "Workbooks, journals and toolkits for practical self-work.",
      },
    ],
  }),
  component: Page,
});

interface EbookRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  cover_image_url: string | null;
  price_inr: number;
  page_count: number | null;
}

function Page() {
  const { user, session, loading: authLoading } = useAuth();
  const [ebooks, setEbooks] = useState<EbookRow[]>([]);
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  // Re-fetch timers scheduled after checkout; cleared on unmount.
  const refetchTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fetchOwned = useCallback(async () => {
    if (!session?.access_token) return;
    const res = await getMyPurchasedEbookIds({ data: { accessToken: session.access_token } });
    if (!("error" in res)) setOwnedIds(new Set(res.ebookIds));
  }, [session]);

  useEffect(() => {
    if (authLoading || !user || !session?.access_token) return;
    setLoading(true);

    Promise.all([
      getActiveEbooks({ data: {} }),
      getMyPurchasedEbookIds({ data: { accessToken: session.access_token } }),
    ])
      .then(([catalogRes, purchasedRes]) => {
        if (!("error" in catalogRes)) setEbooks(catalogRes.ebooks as EbookRow[]);
        if (!("error" in purchasedRes)) setOwnedIds(new Set(purchasedRes.ebookIds));
      })
      .catch((e) => {
        console.error("[resources] failed to load catalog:", e);
      })
      .finally(() => setLoading(false));
  }, [user, session, authLoading]);

  useEffect(() => {
    const timers = refetchTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  // The webhook writes the purchase row asynchronously — poll a few times so
  // the buy button flips to a download button without a manual refresh.
  function handlePurchaseSuccess() {
    for (const delay of [2500, 6000, 12000]) {
      refetchTimers.current.push(setTimeout(() => void fetchOwned(), delay));
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Practical tools you'll actually use."
        description="Workbooks, journals and toolkits, designed to be simple, repeatable and rooted in psychology."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : ebooks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              New workbooks and journals are on the way. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ebooks.map((e) => {
              const owned = ownedIds.has(e.id);
              return (
                <article
                  key={e.id}
                  className="rounded-2xl border border-border bg-card p-6 flex flex-col hover:shadow-[var(--shadow-soft)] transition-shadow"
                >
                  <div className="h-32 rounded-xl bg-gradient-to-br from-accent/40 to-primary/15 flex items-center justify-center overflow-hidden">
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
                  <h3 className="mt-5 text-lg font-semibold">{e.title}</h3>
                  {e.subtitle && <p className="mt-1 text-sm text-muted-foreground">{e.subtitle}</p>}
                  <p className="mt-2 text-sm text-muted-foreground flex-1">
                    {e.description ?? "Print-ready PDF."}
                    {e.page_count ? ` · ${e.page_count} pages` : ""}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    {owned ? (
                      <>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                          <CheckCircle2 className="h-4 w-4" />
                          Owned
                        </span>
                        {session?.access_token && (
                          <EbookDownloadButton ebookId={e.id} accessToken={session.access_token} />
                        )}
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-foreground">
                          ₹{e.price_inr}
                        </span>
                        <RazorpayCheckoutButton
                          productType="ebook"
                          productRef={e.id}
                          label={`Buy for ₹${e.price_inr}`}
                          size="sm"
                          onSuccess={handlePurchaseSuccess}
                        />
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
