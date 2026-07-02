/**
 * CloudinaryUploadButton — direct browser → Cloudinary upload using a
 * server-signed payload (signCloudinaryUpload). No secrets touch the client.
 *
 * kind="pdf"   → raw + type=authenticated (matches the client app's signed
 *                download generator); resolves with the public_id.
 * kind="cover" → public image; resolves with the secure_url.
 */

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { signCloudinaryUpload } from "@/server/functions/admin.functions";

interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
}

export function CloudinaryUploadButton({
  kind,
  onUploaded,
}: {
  kind: "pdf" | "cover";
  /** Receives public_id for PDFs, secure_url for covers. */
  onUploaded: (value: string) => void;
}) {
  const { session } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!session?.access_token) return;
    setUploading(true);
    try {
      const sig = await signCloudinaryUpload({
        data: { accessToken: session.access_token, kind },
      });
      if ("error" in sig && sig.error) {
        toast.error(sig.error);
        return;
      }
      if (!("signature" in sig)) return;

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.apiKey);
      form.append("timestamp", String(sig.timestamp));
      form.append("signature", sig.signature);
      form.append("folder", sig.folder);
      if (sig.type) form.append("type", sig.type);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/${sig.resourceType}/upload`,
        { method: "POST", body: form },
      );
      if (!res.ok) {
        const body = await res.text();
        console.error("[cloudinary-upload] failed:", body);
        toast.error("Upload failed. Please try again.");
        return;
      }
      const uploaded = (await res.json()) as CloudinaryUploadResponse;
      onUploaded(kind === "pdf" ? uploaded.public_id : uploaded.secure_url);
      toast.success(kind === "pdf" ? "PDF uploaded." : "Cover uploaded.");
    } catch (e) {
      console.error("[cloudinary-upload] error:", e);
      toast.error("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={kind === "pdf" ? "application/pdf" : "image/*"}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2 disabled:opacity-40 transition-colors"
      >
        {uploading ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Uploading…
          </>
        ) : (
          <>
            <Upload className="h-3.5 w-3.5" />
            Upload {kind === "pdf" ? "PDF" : "image"}
          </>
        )}
      </button>
    </>
  );
}
