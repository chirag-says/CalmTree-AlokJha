/**
 * EbookDownloadButton — fetches a short-TTL signed Cloudinary URL for an owned
 * ebook and opens it in a new tab. Shared by /resources and /dashboard/ebooks.
 */

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getEbookDownloadUrl } from "@/server/functions/ebooks.functions";

export function EbookDownloadButton({
  ebookId,
  accessToken,
}: {
  ebookId: string;
  accessToken: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const res = await getEbookDownloadUrl({ data: { accessToken, ebookId } });
      if ("error" in res && res.error) {
        toast.error(res.error);
        return;
      }
      if ("downloadUrl" in res && res.downloadUrl) {
        // Open in new tab — browser handles the PDF download.
        window.open(res.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } catch (e) {
      console.error("[EbookDownloadButton] failed:", e);
      toast.error("Could not generate the download link. Please try again.");
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
