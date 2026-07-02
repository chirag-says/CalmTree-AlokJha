/**
 * Admin Ebooks — /admin/ebooks
 * Full CRUD: list all (incl. inactive) + create/edit/delete.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  listAllEbooks,
  createEbook,
  updateEbook,
  deleteEbook,
} from "@/server/functions/admin.functions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import { CloudinaryUploadButton } from "@/components/CloudinaryUploadButton";

export const Route = createFileRoute("/admin/ebooks")({
  head: () => ({ meta: [{ title: "Ebooks — CalmTree Admin" }] }),
  component: AdminEbooksPage,
});

// ─── Form schema ──────────────────────────────────────────────────────────────

const ebookFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  cover_image_url: z.string().optional(),
  cloudinary_public_id: z.string().optional(),
  price_inr: z.coerce.number().min(0, "Price must be ≥ 0"),
  page_count: z.coerce.number().optional(),
  status: z.enum(["active", "inactive", "draft"]),
  slug: z.string().min(1, "Slug is required"),
});

type EbookFormFields = z.infer<typeof ebookFormSchema>;

interface EbookRow {
  id: string;
  title: string;
  slug: string;
  price_inr: number;
  status: string;
  subtitle?: string;
  description?: string;
  cover_image_url?: string;
  cloudinary_public_id?: string;
  page_count?: number;
}

// ─── Form component ───────────────────────────────────────────────────────────

function EbookForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: EbookRow;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { session } = useAuth();
  const form = useForm<EbookFormFields>({
    resolver: zodResolver(ebookFormSchema),
    defaultValues: {
      title: initial?.title ?? "",
      subtitle: initial?.subtitle ?? "",
      description: initial?.description ?? "",
      cover_image_url: initial?.cover_image_url ?? "",
      cloudinary_public_id: initial?.cloudinary_public_id ?? "",
      price_inr: initial?.price_inr ?? 0,
      page_count: initial?.page_count,
      status: (initial?.status as "active" | "inactive" | "draft") ?? "draft",
      slug: initial?.slug ?? "",
    },
  });

  async function onSubmit(values: EbookFormFields) {
    if (!session?.access_token) return;

    const payload = {
      accessToken: session.access_token,
      ...values,
      subtitle: values.subtitle || undefined,
      description: values.description || undefined,
      cover_image_url: values.cover_image_url || undefined,
      cloudinary_public_id: values.cloudinary_public_id || undefined,
      page_count: values.page_count || undefined,
    };

    let result;
    if (initial) {
      result = await updateEbook({ data: { ...payload, id: initial.id } });
    } else {
      result = await createEbook({ data: payload });
    }

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(initial ? "Ebook updated." : "Ebook created.");
    onSave();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white">{initial ? "Edit ebook" : "New ebook"}</h2>
        <button onClick={onCancel} className="text-white/40 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-white/60 text-xs">Title *</Label>
          <Input {...form.register("title")} className="bg-white/5 border-white/10 text-white" />
          {form.formState.errors.title && (
            <p className="text-xs text-red-400">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-white/60 text-xs">Slug *</Label>
          <Input
            {...form.register("slug")}
            className="bg-white/5 border-white/10 text-white font-mono text-sm"
            placeholder="e.g. burnout-recovery"
          />
          {form.formState.errors.slug && (
            <p className="text-xs text-red-400">{form.formState.errors.slug.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label className="text-white/60 text-xs">Price (INR) *</Label>
          <Input
            type="number"
            {...form.register("price_inr")}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-white/60 text-xs">Status *</Label>
          <select
            {...form.register("status")}
            className="w-full rounded-md bg-white/5 border border-white/10 text-white text-sm px-3 py-2"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-white/60 text-xs">Page count</Label>
          <Input
            type="number"
            {...form.register("page_count")}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-white/60 text-xs">Subtitle</Label>
          <Input {...form.register("subtitle")} className="bg-white/5 border-white/10 text-white" />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-white/60 text-xs">Cover image</Label>
          <div className="flex gap-2">
            <Input
              {...form.register("cover_image_url")}
              placeholder="Upload an image or paste a URL"
              className="bg-white/5 border-white/10 text-white font-mono text-sm"
            />
            <CloudinaryUploadButton
              kind="cover"
              onUploaded={(url) => form.setValue("cover_image_url", url, { shouldDirty: true })}
            />
          </div>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-white/60 text-xs">Ebook PDF (Cloudinary public ID)</Label>
          <div className="flex gap-2">
            <Input
              {...form.register("cloudinary_public_id")}
              placeholder="Upload the PDF or paste a public ID"
              className="bg-white/5 border-white/10 text-white font-mono text-sm"
            />
            <CloudinaryUploadButton
              kind="pdf"
              onUploaded={(publicId) =>
                form.setValue("cloudinary_public_id", publicId, { shouldDirty: true })
              }
            />
          </div>
          <p className="text-xs text-white/30">
            The PDF is stored privately — buyers get short-lived signed links.
          </p>
        </div>

        <div className="sm:col-span-2 flex gap-3 justify-end">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-white/50">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-cyan-600 hover:bg-cyan-500 text-white"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : initial ? (
              "Save changes"
            ) : (
              "Create ebook"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function AdminEbooksPage() {
  const { session } = useAuth();
  const [ebooks, setEbooks] = useState<EbookRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<EbookRow | null>(null);

  const fetchEbooks = useCallback(() => {
    if (!session?.access_token) return;
    setLoading(true);
    listAllEbooks({ data: { accessToken: session.access_token } })
      .then((res) => {
        if (!("error" in res)) setEbooks(res.ebooks as EbookRow[]);
      })
      .catch((e) => console.error("[admin-ebooks] fetch failed:", e))
      .finally(() => setLoading(false));
  }, [session]);

  useEffect(() => {
    fetchEbooks();
  }, [fetchEbooks]);

  async function handleDelete(id: string) {
    if (!session?.access_token) return;
    if (!confirm("Delete this ebook? This cannot be undone.")) return;

    const res = await deleteEbook({ data: { accessToken: session.access_token, id } });
    if ("error" in res && res.error) {
      toast.error(res.error);
    } else {
      toast.success("Ebook deleted.");
      fetchEbooks();
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Ebooks</h1>
          <p className="text-sm text-white/40 mt-1">All ebooks including drafts and inactive.</p>
        </div>
        {!showForm && !editTarget && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white"
          >
            <Plus className="h-4 w-4" />
            New ebook
          </Button>
        )}
      </div>

      {(showForm || editTarget) && (
        <EbookForm
          initial={editTarget ?? undefined}
          onSave={() => {
            setShowForm(false);
            setEditTarget(null);
            fetchEbooks();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditTarget(null);
          }}
        />
      )}

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs text-white/40 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs text-white/40 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-4 py-3">
                      <div className="h-4 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              : ebooks.map((e) => (
                  <tr key={e.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{e.title}</p>
                      <p className="text-xs text-white/30 font-mono">{e.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      ₹{e.price_inr.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          e.status === "active"
                            ? "bg-emerald-400/10 text-emerald-400"
                            : e.status === "draft"
                              ? "bg-amber-400/10 text-amber-400"
                              : "bg-white/5 text-white/30"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditTarget(e)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
