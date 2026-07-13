/**
 * admin-queries.ts — react-query hooks over the admin server functions.
 *
 * Conventions:
 * - The access token is read from useAuth() at call time and kept OUT of
 *   queryKeys (a token refresh must not invalidate the cache).
 * - Queries are gated on `enabled: !!token`.
 * - Server fns soft-return `{ error }`; hooks throw it inside queryFn so
 *   react-query's error state drives the UI.
 */

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  addOrgMember,
  createEbook,
  createOrg,
  deleteEbook,
  exportPurchases,
  getAdminOverview,
  getOrgDetail,
  getOverviewTimeSeries,
  getUserDetail,
  grantEntitlement,
  grantOrgCredits,
  listAllEbooks,
  listOrgs,
  listPurchases,
  listResults,
  listUsers,
  removeOrgMember,
  revokeEntitlement,
  setUserAdmin,
  updateEbook,
} from "@/server/functions/admin.functions";

export const adminKeys = {
  overview: ["admin", "overview"] as const,
  timeSeries: ["admin", "timeseries"] as const,
  users: (page: number, search: string) => ["admin", "users", page, search] as const,
  userDetail: (id: string) => ["admin", "user", id] as const,
  purchases: (page: number) => ["admin", "purchases", page] as const,
  results: (page: number, userId?: string) => ["admin", "results", page, userId] as const,
  ebooks: ["admin", "ebooks"] as const,
  orgs: ["admin", "orgs"] as const,
  orgDetail: (id: string) => ["admin", "org", id] as const,
};

function useAccessToken() {
  return useAuth().session?.access_token;
}

/**
 * Narrows a server-fn result: throws its soft `{ error }` variant so
 * react-query surfaces it, and returns the success variant (error branch
 * excluded) so callers get non-optional fields.
 */
function unwrap<T extends { error?: string }>(res: T): Exclude<T, { error: string }> {
  if (res.error) throw new Error(res.error);
  return res as Exclude<T, { error: string }>;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useAdminOverview() {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.overview,
    enabled: !!token,
    queryFn: async () => unwrap(await getAdminOverview({ data: { accessToken: token! } })),
  });
}

export function useOverviewTimeSeries() {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.timeSeries,
    enabled: !!token,
    queryFn: async () => unwrap(await getOverviewTimeSeries({ data: { accessToken: token! } })),
  });
}

export function useUsers(page: number, search: string) {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.users(page, search),
    enabled: !!token,
    placeholderData: keepPreviousData,
    queryFn: async () =>
      unwrap(
        await listUsers({
          data: { accessToken: token!, page, pageSize: 20, search: search || undefined },
        }),
      ),
  });
}

export function useUserDetail(userId: string | null) {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.userDetail(userId ?? "none"),
    enabled: !!token && !!userId,
    queryFn: async () =>
      unwrap(await getUserDetail({ data: { accessToken: token!, userId: userId! } })),
  });
}

export function usePurchases(page: number) {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.purchases(page),
    enabled: !!token,
    placeholderData: keepPreviousData,
    queryFn: async () =>
      unwrap(await listPurchases({ data: { accessToken: token!, page, pageSize: 20 } })),
  });
}

export function useResults(page: number, userId?: string) {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.results(page, userId),
    enabled: !!token,
    placeholderData: keepPreviousData,
    queryFn: async () =>
      unwrap(await listResults({ data: { accessToken: token!, page, pageSize: 20, userId } })),
  });
}

export function useEbooks() {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.ebooks,
    enabled: !!token,
    queryFn: async () => unwrap(await listAllEbooks({ data: { accessToken: token! } })),
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Shared shape: run the server fn, surface { error } as a thrown error. */
function useAdminMutation<TArgs>(opts: {
  fn: (token: string, args: TArgs) => Promise<{ error?: string }>;
  invalidate: (args: TArgs) => readonly (readonly unknown[])[];
  successMessage?: string;
}) {
  const token = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: TArgs) => {
      if (!token) throw new Error("Not signed in.");
      const res = await opts.fn(token, args);
      if (res.error) throw new Error(res.error);
      return res;
    },
    onSuccess: (_res, args) => {
      for (const key of opts.invalidate(args)) {
        void queryClient.invalidateQueries({ queryKey: key });
      }
      if (opts.successMessage) toast.success(opts.successMessage);
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useSetUserAdmin() {
  return useAdminMutation({
    fn: (accessToken, args: { userId: string; isAdmin: boolean }) =>
      setUserAdmin({ data: { accessToken, ...args } }),
    invalidate: (args) => [adminKeys.userDetail(args.userId), ["admin", "users"]],
    successMessage: "Admin access updated.",
  });
}

export function useGrantEntitlement() {
  return useAdminMutation({
    fn: (
      accessToken,
      args:
        | { userId: string; accessType: "universal" }
        | { userId: string; accessType: "category"; productCategory: string },
    ) =>
      grantEntitlement({
        // The zod discriminated union validates productCategory server-side.
        data: { accessToken, ...args } as Parameters<typeof grantEntitlement>[0]["data"],
      }),
    invalidate: (args) => [adminKeys.userDetail(args.userId)],
    successMessage: "Entitlement granted.",
  });
}

export function useRevokeEntitlement() {
  return useAdminMutation({
    fn: (accessToken, args: { entitlementId: string; userId: string }) =>
      revokeEntitlement({ data: { accessToken, entitlementId: args.entitlementId } }),
    invalidate: (args) => [adminKeys.userDetail(args.userId)],
    successMessage: "Entitlement revoked.",
  });
}

export interface EbookWrite {
  title: string;
  subtitle?: string;
  description?: string;
  cover_image_url?: string;
  cloudinary_public_id?: string;
  price_inr: number;
  page_count?: number;
  status: "active" | "inactive" | "draft";
  slug: string;
}

export function useCreateEbook() {
  return useAdminMutation({
    fn: (accessToken, args: EbookWrite) => createEbook({ data: { accessToken, ...args } }),
    invalidate: () => [adminKeys.ebooks],
    successMessage: "Ebook created.",
  });
}

export function useUpdateEbook() {
  return useAdminMutation({
    fn: (accessToken, args: EbookWrite & { id: string }) =>
      updateEbook({ data: { accessToken, ...args } }),
    invalidate: () => [adminKeys.ebooks],
    successMessage: "Ebook updated.",
  });
}

export function useDeleteEbook() {
  return useAdminMutation({
    fn: (accessToken, args: { id: string }) => deleteEbook({ data: { accessToken, ...args } }),
    invalidate: () => [adminKeys.ebooks],
    successMessage: "Ebook deleted.",
  });
}

/** CSV export runs on demand — a mutation, not a cached query. */
export function useExportPurchases() {
  const token = useAccessToken();
  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("Not signed in.");
      return unwrap(await exportPurchases({ data: { accessToken: token } }));
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

// ─── B2B Org Queries & Mutations ──────────────────────────────────────────────

export function useOrgs() {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.orgs,
    enabled: !!token,
    queryFn: async () => unwrap(await listOrgs({ data: { accessToken: token! } })),
  });
}

export function useOrgDetail(orgId: string | null) {
  const token = useAccessToken();
  return useQuery({
    queryKey: adminKeys.orgDetail(orgId ?? "none"),
    enabled: !!token && !!orgId,
    queryFn: async () =>
      unwrap(await getOrgDetail({ data: { accessToken: token!, orgId: orgId! } })),
  });
}

export function useCreateOrg() {
  return useAdminMutation({
    fn: (accessToken, args: { name: string; slug: string }) =>
      createOrg({ data: { accessToken, ...args } }),
    invalidate: () => [adminKeys.orgs],
    successMessage: "Organization created.",
  });
}

export function useAddOrgMember() {
  return useAdminMutation({
    fn: (accessToken, args: { orgId: string; email: string; role: string }) =>
      addOrgMember({ data: { accessToken, ...args } as Parameters<typeof addOrgMember>[0]["data"] }),
    invalidate: (args) => [adminKeys.orgDetail(args.orgId)],
    successMessage: "Member added.",
  });
}

export function useRemoveOrgMember() {
  return useAdminMutation({
    fn: (accessToken, args: { memberId: string; orgId: string }) =>
      removeOrgMember({ data: { accessToken, memberId: args.memberId } }),
    invalidate: (args) => [adminKeys.orgDetail(args.orgId)],
    successMessage: "Member removed.",
  });
}

export function useGrantOrgCredits() {
  return useAdminMutation({
    fn: (accessToken, args: { orgId: string; amount: number; note?: string }) =>
      grantOrgCredits({ data: { accessToken, ...args } }),
    invalidate: (args) => [adminKeys.orgDetail(args.orgId), adminKeys.orgs],
    successMessage: "Credits granted.",
  });
}
