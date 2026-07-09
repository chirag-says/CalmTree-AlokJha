/**
 * EbookReadButton — opens the in-app flipbook reader for an owned ebook.
 * The heavy reader (pdf.js + page-flip) is code-split and only loaded on click.
 */

import { lazy, Suspense, useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const EbookReader = lazy(() => import("./EbookReader"));

export function EbookReadButton({
  ebookId,
  accessToken,
  title,
}: {
  ebookId: string;
  accessToken: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <BookOpen className="h-4 w-4" />
        Read
      </Button>
      {open && (
        <Suspense fallback={null}>
          <EbookReader
            ebookId={ebookId}
            accessToken={accessToken}
            title={title}
            onClose={() => setOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
