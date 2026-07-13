# Phase B — Org Dashboard Build Complete

## Verification Results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | ✅ **Zero errors** |
| `npm run dev` | ✅ Vite starts on `:8080` |
| `npx vinxi build` | ❌ Pre-existing issue (same error without my changes) |
| Existing files modified | **None** (only `routeTree.gen.ts` auto-regen) |

## Files Created (11 new files)

### Server Functions (drop-in from staging)

| File | Purpose |
|------|---------|
| [authz.ts](file:///d:/CalmTree%20Discover/src/server/b2b/authz.ts) | `requireOrgRole()` + `isPlatformAdmin()` — code-enforced org membership checks |
| [resend.ts](file:///d:/CalmTree%20Discover/src/server/email/resend.ts) | Transactional email via Resend API. Graceful no-op when `RESEND_API_KEY` is unset |
| [org.functions.ts](file:///d:/CalmTree%20Discover/src/server/functions/org.functions.ts) | `getMyOrgs` (org list + balance), `getOrgLedger` (credit history) |
| [campaigns.functions.ts](file:///d:/CalmTree%20Discover/src/server/functions/campaigns.functions.ts) | Full campaign engine: `createCampaign`, `listCampaigns`, `getCampaign`, `launchCampaign`, `closeCampaign`, `sendReminders`, `getCampaignReport` |

### Data & Types

| File | Purpose |
|------|---------|
| [b2b-assessment-catalog.ts](file:///d:/CalmTree%20Discover/src/data/b2b-assessment-catalog.ts) | Derived from `ASSESSMENT_LIST` — single source of truth, never drifts |
| [org-types.ts](file:///d:/CalmTree%20Discover/src/types/org-types.ts) | Shared types (`OrgInfo`, `CampaignListItem`, `LedgerEntry`) + `extractOrg()` helper for typed react-query cache reads |

### Components

| File | Purpose |
|------|---------|
| [OrgShell.tsx](file:///d:/CalmTree%20Discover/src/components/org/OrgShell.tsx) | Org-specific sidebar shell with nav (Overview, Campaigns, Credits), org switcher, credit badge, and responsive mobile drawer |

### Routes (under `/org/*`)

| Route | File | Features |
|-------|------|----------|
| `/org` (layout) | [route.tsx](file:///d:/CalmTree%20Discover/src/routes/org/route.tsx) | Auth guard (`requireOnboarded=false`), org membership loading, org switching |
| `/org/` | [index.tsx](file:///d:/CalmTree%20Discover/src/routes/org/index.tsx) | Stat cards, quick actions, recent campaigns list |
| `/org/campaigns` | [campaigns/index.tsx](file:///d:/CalmTree%20Discover/src/routes/org/campaigns/index.tsx) | Campaign list with status badges, response rate, progress bars |
| `/org/campaigns/new` | [campaigns/new.tsx](file:///d:/CalmTree%20Discover/src/routes/org/campaigns/new.tsx) | Two-step create+launch: assessment picker (derived), title, emails, pre-launch credit check |
| `/org/campaigns/$id` | [campaigns/$campaignId.tsx](file:///d:/CalmTree%20Discover/src/routes/org/campaigns/$campaignId.tsx) | Status funnel, privacy-gated report, close, reminders, invitation table |
| `/org/credits` | [credits.tsx](file:///d:/CalmTree%20Discover/src/routes/org/credits.tsx) | Credit balance card + ledger table with reason icons |

### Auto-generated

| File | Change |
|------|--------|
| `src/routeTree.gen.ts` | Regenerated to include all `/org/*` routes |

## Environment Variables Required

Add these to your `.env`:
```
RESEND_API_KEY=re_xxxx          # optional — emails are no-op without this
EMAIL_FROM="CalmTree <noreply@mail.calmtree.in>"  # optional
PUBLIC_SITE_URL=https://calmtree.in  # client app URL for invite links
```

## Privacy Compliance

- **`aggregateLocked`**: Report hides scores when completed < `min_aggregate_group_size` (default 5)
- **`individualsUnlocked`**: Individual results table only shown when org has paid for it
- **Credits**: All spend via `spend_org_credits` RPC (atomic, no race conditions)
- **Auth**: Every server function calls `requireOrgRole()` or `requireUser()`
