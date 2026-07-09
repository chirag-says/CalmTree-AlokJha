/**
 * EbookReader — full-screen flipbook reader for an owned ebook.
 *
 * Loaded lazily (client-only) so pdf.js + page-flip never touch SSR or the
 * initial bundle. pdf.js pulls the PDF from our same-origin proxy
 * (/api/ebooks/:id/pdf) with a Bearer token; page-flip (StPageFlip) gives the
 * realistic curl.
 *
 * Rendering strategy for large books: page DOM is built imperatively (React
 * never reconciles those nodes, which would fight StPageFlip), and each page's
 * canvas is drawn only when it enters a window around the current page, with far
 * pages freed — so a 289-page PDF stays responsive and memory-bounded.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { PageFlip } from "page-flip";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { X, ChevronLeft, ChevronRight, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { getEbookDownloadUrl } from "@/server/functions/ebooks.functions";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const RENDER_WIDTH = 1000; // canvas pixel width — crisp text without huge memory
const WINDOW = 3; // pages rendered on each side of the current page
const KEEP = 8; // pages kept rendered on each side before freeing

interface Props {
  ebookId: string;
  accessToken: string;
  title: string;
  onClose: () => void;
}

export default function EbookReader({ ebookId, accessToken, title, onClose }: Props) {
  const bookRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const stateRef = useRef({
    pdf: null as PDFDocumentProxy | null,
    loadingTask: null as ReturnType<typeof pdfjsLib.getDocument> | null,
    flip: null as PageFlip | null,
    canvases: [] as HTMLCanvasElement[],
    rendered: new Set<number>(),
    rendering: new Set<number>(),
    destroyed: false,
  });

  // Read the token from a ref so a Supabase session refresh (which changes the
  // token string) can't re-run the load effect and rebuild the book mid-read.
  const accessTokenRef = useRef(accessToken);
  accessTokenRef.current = accessToken;

  // Lock page scroll while the reader is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    // Per-run cancellation: an aborted/superseded run must never touch shared
    // state or set the error status on a run that is still loading fine.
    let cancelled = false;
    s.destroyed = false;
    setStatus("loading");

    async function renderPage(idx: number) {
      if (!s.pdf || cancelled) return;
      if (s.rendered.has(idx) || s.rendering.has(idx)) return;
      const canvas = s.canvases[idx];
      if (!canvas) return;
      s.rendering.add(idx);
      try {
        const pg = await s.pdf.getPage(idx + 1);
        if (cancelled) return;
        const base = pg.getViewport({ scale: 1 });
        const vp = pg.getViewport({ scale: RENDER_WIDTH / base.width });
        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await pg.render({ canvasContext: ctx, canvas, viewport: vp }).promise;
        s.rendered.add(idx);
      } catch {
        // Render tasks are cancelled on teardown — safe to ignore.
      } finally {
        s.rendering.delete(idx);
      }
    }

    function renderWindow(center: number) {
      const total = s.pdf?.numPages ?? 0;
      const from = Math.max(0, center - WINDOW);
      const to = Math.min(total - 1, center + WINDOW + 1);
      for (let i = from; i <= to; i++) void renderPage(i);
      // Free canvases far from the current page to bound memory on long books.
      for (const idx of Array.from(s.rendered)) {
        if (idx < center - KEEP || idx > center + KEEP) {
          const c = s.canvases[idx];
          if (c) {
            c.width = 0;
            c.height = 0;
          }
          s.rendered.delete(idx);
        }
      }
    }

    (async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: `/api/ebooks/${ebookId}/pdf`,
          httpHeaders: { Authorization: `Bearer ${accessTokenRef.current}` },
          withCredentials: false,
        });
        s.loadingTask = loadingTask;
        const pdf = await loadingTask.promise;
        if (cancelled) {
          void loadingTask.destroy();
          return;
        }
        s.pdf = pdf;
        setNumPages(pdf.numPages);

        const first = await pdf.getPage(1);
        if (cancelled) return;
        const vp = first.getViewport({ scale: 1 });
        const aspect = vp.height / vp.width;

        const container = bookRef.current;
        if (!container) return;

        // Build page nodes imperatively — kept out of React's vdom.
        container.replaceChildren();
        const pageEls: HTMLElement[] = [];
        s.canvases = [];
        for (let i = 0; i < pdf.numPages; i++) {
          const pageEl = document.createElement("div");
          pageEl.className = "ct-page";
          const canvas = document.createElement("canvas");
          canvas.className = "ct-page-canvas";
          pageEl.appendChild(canvas);
          container.appendChild(pageEl);
          pageEls.push(pageEl);
          s.canvases.push(canvas);
        }

        const flip = new PageFlip(container, {
          width: 550,
          height: Math.round(550 * aspect),
          size: "stretch",
          minWidth: 300,
          maxWidth: 900,
          minHeight: 380,
          maxHeight: Math.round(900 * aspect),
          drawShadow: true,
          flippingTime: 700,
          maxShadowOpacity: 0.5,
          showCover: true,
          usePortrait: true,
          mobileScrollSupport: true,
        });
        s.flip = flip;
        flip.loadFromHTML(pageEls);
        flip.on("flip", (e) => {
          const p = (e as { data: number }).data;
          setPage(p);
          renderWindow(p);
        });

        setStatus("ready");
        renderWindow(0);
      } catch (e) {
        if (!cancelled) {
          console.error("[EbookReader] load failed:", e);
          setStatus("error");
        }
      }
    })();

    return () => {
      cancelled = true;
      s.destroyed = true;
      try {
        s.flip?.destroy();
      } catch {
        /* noop */
      }
      try {
        void s.loadingTask?.destroy();
      } catch {
        /* noop */
      }
      s.flip = null;
      s.pdf = null;
      s.loadingTask = null;
      s.canvases = [];
      s.rendered.clear();
      s.rendering.clear();
    };
    // Deps: ebookId only. Token is read from a ref (accessTokenRef) so a session
    // refresh can't re-run this and rebuild the book mid-read.
  }, [ebookId]);

  // Keyboard navigation.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") stateRef.current.flip?.flipPrev();
      else if (e.key === "ArrowRight") stateRef.current.flip?.flipNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleDownload = useCallback(async () => {
    try {
      const res = await getEbookDownloadUrl({ data: { accessToken, ebookId } });
      if ("error" in res && res.error) {
        toast.error(res.error);
        return;
      }
      if ("downloadUrl" in res && res.downloadUrl) {
        window.open(res.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      toast.error("Could not generate the download link.");
    }
  }, [accessToken, ebookId]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex flex-col bg-neutral-900/95 backdrop-blur-sm">
      <style>{`
        .ct-page { background:#fff; overflow:hidden; }
        .ct-page-canvas { width:100%; height:100%; display:block; }
        .ct-flipbook { touch-action: pan-y; }
      `}</style>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white/90">
        <p className="truncate text-sm font-medium">{title}</p>
        <div className="flex items-center gap-2">
          {status === "ready" && numPages > 0 && (
            <span className="hidden sm:inline text-xs tabular-nums text-white/60">
              {Math.min(page + 1, numPages)} / {numPages}
            </span>
          )}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
            aria-label="Download PDF"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-white/80 hover:bg-white/10 transition-colors"
            aria-label="Close reader"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-14">
        <button
          onClick={() => stateRef.current.flip?.flipPrev()}
          className="absolute left-1 sm:left-3 z-10 rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div ref={bookRef} className="ct-flipbook h-full w-full max-w-5xl" />

        <button
          onClick={() => stateRef.current.flip?.flipNext()}
          className="absolute right-1 sm:right-3 z-10 rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm">Opening your book…</p>
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
            <p className="text-sm">We couldn't open this ebook.</p>
            <button
              onClick={onClose}
              className="rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
