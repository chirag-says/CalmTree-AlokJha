/**
 * org-types.ts — shared types for org dashboard pages.
 * Used to properly type react-query cache reads across org routes.
 */

export interface OrgInfo {
  id: string;
  name: string;
  slug: string;
  role: string;
  individualResultsUnlocked: boolean;
  creditBalance: number;
}

export type GetMyOrgsResult = { orgs: OrgInfo[] } | { error: string };

export interface CampaignListItem {
  id: string;
  assessment_slug: string;
  title: string;
  status: string;
  closes_at: string | null;
  launched_at: string | null;
  created_at: string;
  invited: number;
  completed: number;
}

export type ListCampaignsResult = { campaigns: CampaignListItem[] } | { error: string };

export interface LedgerEntry {
  id: string;
  delta: number;
  reason: string;
  note: string | null;
  campaign_id: string | null;
  created_at: string;
}

export type GetOrgLedgerResult = { entries: LedgerEntry[]; balance: number } | { error: string };

/**
 * Helper to extract the selected org from the parent's cached query data.
 * All org child routes use this pattern.
 */
export function extractOrg(
  data: unknown,
  orgId: string | undefined,
): { org: OrgInfo | null; orgs: OrgInfo[] } {
  const typed = data as GetMyOrgsResult | undefined;
  const orgs = typed && "orgs" in typed ? typed.orgs : [];
  if (orgs.length === 0) return { org: null, orgs };
  const org = orgId ? (orgs.find((o) => o.id === orgId) ?? orgs[0]) : orgs[0];
  return { org, orgs };
}
