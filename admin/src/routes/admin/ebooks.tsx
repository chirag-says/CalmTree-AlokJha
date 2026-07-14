/**
 * Admin Ebooks — /admin/ebooks
 * Full CRUD: list all (incl. inactive) + create/edit/delete.
 * Mobile: expandable cards. Desktop: standard table.
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookOpen, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useCreateEbook, useDeleteEbook, useEbooks, useUpdateEbook } from "@/data/admin-queries";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminTable, type ColumnDef } from "@/components/admin/AdminTable";
import { MobileCardList } from "@/components/admin/MobileCardList";
import { StatusPill, ebookStatusTone } from "@/components/admin/StatusPill";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { CloudinaryUploadButton } from "@/components/CloudinaryUploadButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

// ─── Form dialog ──────────────────────────────────────────────────────────────

function EbookFormDialog({
  initial,
  open,
  onOpenChange,
}: {
  initial: EbookRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const create = useCreateEbook();
  const update = useUpdateEbook();

  const form = useForm<EbookFormFields>({
    resolver: zodResolver(ebookFormSchema),
    values: {
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
    const payload = {
      ...values,
      subtitle: values.subtitle || undefined,
      description: values.description || undefined,
      cover_image_url: values.cover_image_url || undefined,
      cloudinary_public_id: values.cloudinary_public_id || undefined,
      page_count: values.page_count || undefined,
    };
    try {
      if (initial) {
        await update.mutateAsync({ ...payload, id: initial.id });
      } else {
        await create.mutateAsync(payload);
      }
      onOpenChange(false);
      form.reset();
    } catch {
      // Mutation onError already toasts; keep the dialog open for fixes.
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initial ? "Edit ebook" : "New ebook"}</DialogTitle>
          <DialogDescription>
            {initial ? "Update the ebook details." : "Add a new ebook to the storefront."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">Title *</Label>
            <Input {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Slug *</Label>
            <Input
              {...form.register("slug")}
              className="font-mono text-sm"
              placeholder="e.g. burnout-recovery"
            />
            {form.formState.errors.slug && (
              <p className="text-xs text-destructive">{form.formState.errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Price (INR) *</Label>
            <Input type="number" {...form.register("price_inr")} />
            {form.formState.errors.price_inr && (
              <p className="text-xs text-destructive">{form.formState.errors.price_inr.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Status *</Label>
            <select
              {...form.register("status")}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Page count</Label>
            <Input type="number" {...form.register("page_count")} />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">Subtitle</Label>
            <Input {...form.register("subtitle")} />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">Cover image</Label>
            <div className="flex gap-2">
              <Input
                {...form.register("cover_image_url")}
                placeholder="Upload an image or paste a URL"
                className="font-mono text-sm"
              />
              <CloudinaryUploadButton
                kind="cover"
                onUploaded={(url) => form.setValue("cover_image_url", url, { shouldDirty: true })}
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">Ebook PDF (Cloudinary public ID)</Label>
            <div className="flex gap-2">
              <Input
                {...form.register("cloudinary_public_id")}
                placeholder="Upload the PDF or paste a public ID"
                className="font-mono text-sm"
              />
              <CloudinaryUploadButton
                kind="pdf"
                onUploaded={(publicId) =>
                  form.setValue("cloudinary_public_id", publicId, { shouldDirty: true })
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              The PDF is stored privately — buyers get short-lived signed links.
            </p>
          </div>

          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
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
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function AdminEbooksPage() {
  const ebooks = useEbooks();
  const deleteMutation = useDeleteEbook();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<EbookRow | null>(null);

  const rows = (ebooks.data?.ebooks ?? []) as EbookRow[];

  const columns: ColumnDef<EbookRow>[] = [
    {
      key: "title",
      header: "Title",
      cell: (e) => (
        <div>
          <p className="font-medium text-foreground">{e.title}</p>
          <p className="font-mono text-xs text-muted-foreground/70">{e.slug}</p>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      className: "text-foreground",
      cell: (e) => `₹${e.price_inr.toLocaleString("en-IN")}`,
    },
    {
      key: "status",
      header: "Status",
      cell: (e) => <StatusPill tone={ebookStatusTone(e.status)}>{e.status}</StatusPill>,
    },
    {
      key: "actions",
      header: <span className="block text-right">Actions</span>,
      cell: (e) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            title="Edit"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              setEditTarget(e);
              setFormOpen(true);
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <ConfirmDialog
            title={`Delete "${e.title}"?`}
            description="This cannot be undone. Buyers keep their entitlements but the ebook disappears from the storefront."
            confirmLabel="Delete"
            destructive
            onConfirm={() => deleteMutation.mutateAsync({ id: e.id }).then(() => undefined)}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                title="Delete"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Ebooks"
        description="All ebooks including drafts and inactive."
        actions={
          <Button
            onClick={() => {
              setEditTarget(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            New ebook
          </Button>
        }
      />

      {/* Mobile: expandable card list */}
      <div className="sm:hidden">
        <MobileCardList
          data={rows}
          rowKey={(e) => e.id}
          isLoading={ebooks.isPending}
          error={ebooks.error?.message}
          onRetry={() => void ebooks.refetch()}
          emptyState={{
            icon: BookOpen,
            title: "No ebooks yet",
            description: "Create your first ebook to populate the storefront.",
          }}
          title={(e) => e.title}
          subtitle={(e) => e.slug}
          badges={(e) => (
            <StatusPill tone={ebookStatusTone(e.status)}>{e.status}</StatusPill>
          )}
          details={(e) => [
            {
              label: "Price",
              value: (
                <span className="text-xs font-medium text-foreground">
                  ₹{e.price_inr.toLocaleString("en-IN")}
                </span>
              ),
            },
            {
              label: "Status",
              value: <StatusPill tone={ebookStatusTone(e.status)}>{e.status}</StatusPill>,
            },
            ...(e.page_count
              ? [
                  {
                    label: "Pages",
                    value: (
                      <span className="text-xs text-muted-foreground">{e.page_count}</span>
                    ),
                  },
                ]
              : []),
          ]}
          footer={(e) => (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs gap-1.5"
                onClick={() => {
                  setEditTarget(e);
                  setFormOpen(true);
                }}
              >
                <Pencil className="h-3 w-3" />
                Edit
              </Button>
              <ConfirmDialog
                title={`Delete "${e.title}"?`}
                description="This cannot be undone."
                confirmLabel="Delete"
                destructive
                onConfirm={() => deleteMutation.mutateAsync({ id: e.id }).then(() => undefined)}
                trigger={
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1.5 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                }
              />
            </div>
          )}
        />
      </div>

      {/* Desktop: table view */}
      <div className="hidden sm:block">
        <AdminTable
          columns={columns}
          data={rows}
          rowKey={(e) => e.id}
          isLoading={ebooks.isPending}
          error={ebooks.error?.message}
          onRetry={() => void ebooks.refetch()}
          skeletonRows={3}
          emptyState={{
            icon: BookOpen,
            title: "No ebooks yet",
            description: "Create your first ebook to populate the storefront.",
          }}
        />
      </div>

      <EbookFormDialog
        initial={editTarget}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditTarget(null);
        }}
      />
    </div>
  );
}
