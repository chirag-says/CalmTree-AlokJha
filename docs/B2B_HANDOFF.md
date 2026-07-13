# CalmTree B2B Enterprise — Build Handoff

> **Purpose of this doc:** a self-contained brief so another coding assistant
> (Sonnet in Antigravity) can continue the B2B build, and so Sakha can verify
> that work faithfully when Chirag returns. Read it top to bottom before writing
> code. Last updated 2026-07-13 by Sakha.

---

## 1. What we're building

CalmTree is adding an **enterprise assessment layer**. Companies buy assessment
**credits**, then run **campaigns** — sending an assessment to a list of
employees by email. Each employee gets a private magic-link, takes the
assessment with no login, and the company sees an **aggregate** report.

### Locked product decisions (from Chirag)
1. **Privacy:** aggregate-only by default. A paid add-on unlocks individual
   results per company (`organizations.individual_results_unlocked`). Below a
   floor group size (`min_aggregate_group_size`, default 5) even the aggregate
   is withheld unless individual results are unlocked.
2. **Credits:** RESERVED when a campaign launches (1 per invite), auto-REFUNDED
   at campaign close for invites that were never completed.
3. Employees may later create a free CalmTree account to keep their result
   (schema supports it via `invitation_responses.claimed_by_user_id`).
4. All 44 assessments are in the B2B catalog (client will add more).
5. Pricing = credit packs.
6. **Demo phase — keep it minimal.** Email must fit the Resend free tier.

---

## 2. Architecture — THREE apps, ONE Supabase

This is the load-bearing decision. Do not collapse it.

| App | Domain | Role | On this machine? |
|---|---|---|---|
| **Client** | calmtree.in | Public site, B2C dashboard, **employee assessment runner** `/a/:token` | ✅ this repo (`D:\CalmTree Discover`) |
| **Org** | org.calmtree.in | Company dashboard: campaigns, credits, reports | ❌ to be cloned from admin |
| **Admin** | admin.calmtree.in | Platform staff: create orgs, grant credits | ❌ separate existing repo |

**Why the employee runner lives in the client app:** it reuses the assessment
engine (`src/lib/assessment-engine.ts` + the 44 configs in
`src/data/assessments/`). Duplicating that into another app guarantees drift.
Only the company *dashboard* goes to org.calmtree.in.

All three apps talk to the **same Supabase project**. The migration is applied
once and all apps read the same tables.

---

## 3. Current status — DONE and verified (client repo)

`npx tsc --noEmit` → exit 0. `npx vite build` → success. ESLint clean.

| File | What it is |
|---|---|
| `supabase/migrations/009_b2b_enterprise.sql` | **The entire data layer.** Canonical migration home (alongside 001–008). |
| `src/server/b2b/invite-token.ts` | Generate + SHA-256-hash invite tokens (server-only). |
| `src/server/functions/invitations.functions.ts` | Token-authenticated (no login) endpoints: `getInvitationByToken`, `submitInvitationResponse`. |
| `src/routes/a.$token.tsx` | The public employee runner. Standalone — no AppShell, no navbar, no upsell. |
| `src/components/assessment/AssessmentRunner.tsx` | Added optional `onComplete` prop (B2B override). B2C behaviour unchanged. |
| `src/components/assessment/ProfileRunner.tsx` | Same `onComplete` prop. |
| `src/hooks/useResultPersistence.ts` | Exported `buildPayload` for reuse by the employee runner. |

**Do not modify these unless a bug is found.** They're the finished half.

---

## 4. Data model reference (migration 009)

Tables (all RLS-enabled):
- `organizations` — company accounts. `individual_results_unlocked` (bool),
  `min_aggregate_group_size` (int, default 5), `status`.
- `org_members` — `(org_id, user_id, role)`, role ∈ `owner|admin|viewer`,
  UNIQUE(org_id, user_id).
- `credit_ledger` — **append-only**. `delta` (+grant/refund, −spend), `reason`
  ∈ `grant|campaign_send|expiry_refund|adjustment`, `campaign_id`, `created_by`.
  Balance = `SUM(delta)`. NEVER update/delete rows here.
- `campaigns` — `(org_id, assessment_slug, title, status, closes_at, …)`,
  status ∈ `draft|active|closed`.
- `invitations` — one per employee per campaign. `token_hash` (SHA-256, UNIQUE),
  `status` ∈ `pending|sent|opened|completed|expired`. UNIQUE(campaign_id, email).
- `invitation_responses` — org-owned scored result, keyed by invitation
  (UNIQUE invitation_id). Deliberately SEPARATE from `assessment_results` so the
  B2C table's `user_id NOT NULL` stays intact. `claimed_by_user_id` for later
  account-claim.

Postgres functions (SECURITY DEFINER, avoid RLS recursion):
- `is_org_member(org_id)`, `is_org_admin(org_id)`, `org_credit_balance(org_id)`.
- `spend_org_credits(org_id, amount, campaign_id, created_by)` — **locks the org
  row `FOR UPDATE`** so concurrent launches can't overspend; raises
  `insufficient_credits` if short; inserts the negative ledger row; returns new
  balance. Call it via `supabase.rpc("spend_org_credits", {...})`.

RLS posture: members can SELECT their org/campaigns/ledger. `invitations` and
`invitation_responses` have **no user-facing policy** — all access is via server
functions using the service-role client, which enforce the privacy rules in
code. This is intentional; don't add permissive policies to those two tables.

---

## 5. Staged code — ready to drop in

Located in `docs/b2b-staging/` in THIS repo (moved here so it survives). The
`README.md` there has the exact destination for each file. Summary:

### → org.calmtree.in (`src/server/...`)
- `shared/invite-token.ts` → `src/server/b2b/invite-token.ts`
- `org-app/authz.ts` → `src/server/b2b/authz.ts` (`requireOrgRole`, `isPlatformAdmin`)
- `org-app/email-resend.ts` → `src/server/email/resend.ts`
- `org-app/org.functions.ts` → `src/server/functions/org.functions.ts` (`getMyOrgs`, `getOrgLedger`)
- `org-app/campaigns.functions.ts` → `src/server/functions/campaigns.functions.ts`
  (`createCampaign`, `listCampaigns`, `getCampaign`, `launchCampaign`,
  `closeCampaign`, `sendReminders`, `getCampaignReport`) — **the campaign engine**.

### → admin.calmtree.in
- `admin-app/admin-org.functions.ts` → `src/server/functions/admin-org.functions.ts`
  (`createOrganization`, `addOrgMember`, `grantCredits`, `setIndividualResultsUnlock`)
- `admin-app/authz.ts` → `src/server/b2b/authz.ts` (only `isPlatformAdmin`; reuse
  the admin app's existing is_admin gate if it has one).

These files assume each app already has `src/server/supabase-admin.ts`
(`getAdminClient()`) and `src/server/require-user.ts` (`requireUser()`) — the
same helpers this client repo has. If the clone lacks them, copy verbatim from
`src/server/` here.

---

## 6. Remaining work (phased)

### Phase A — Database (do first, ~10 min)
- [ ] Apply `supabase/migrations/009_b2b_enterprise.sql` to the shared Supabase
  project (Supabase CLI `db push`, or paste into SQL editor). It's additive and
  idempotent.
- [ ] Verify the 6 tables + 4 functions exist.

### Phase B — Org app (org.calmtree.in)
- [ ] Clone the admin app into a new folder (e.g. `D:\CalmTree Org`), rename,
  set up its own Vercel project + `org.calmtree.in` domain.
- [ ] Drop in the staged org-app server functions (section 5).
- [ ] Confirm `getAdminClient`/`requireUser`/`supabase` client exist; copy from
  client repo if missing.
- [ ] Build the dashboard UI (reuse the admin app's shell, theme, react-query):
  - [ ] **Org switcher / home** — call `getMyOrgs`; show name, role, credit
    balance. If the user is in one org, go straight in.
  - [ ] **Campaign list** — `listCampaigns(orgId)`; show title, assessment,
    status, invited/completed counts. "New campaign" button.
  - [ ] **Create + launch** — pick an assessment (the 44 slugs; see note below),
    title, optional `closes_at`; paste/upload employee emails; call
    `createCampaign` then `launchCampaign`. Show credit cost vs balance BEFORE
    launch; block if short. Handle the `insufficient_credits` error.
  - [ ] **Campaign detail** — `getCampaign` for the per-invite status funnel +
    `getCampaignReport` for the aggregate. **Respect `aggregateLocked`** — when
    true, show "Need N completed responses to protect anonymity", not data.
    Show individual table ONLY when `individualsUnlocked`.
  - [ ] **Close campaign** — `closeCampaign` (expires + refunds). Confirm first.
  - [ ] **Reminders** — `sendReminders` button on active campaigns.
  - [ ] **Credit ledger page** — `getOrgLedger(orgId)`.
- [ ] **Assessment catalog note:** the org app needs the list of assessment
  slugs + titles to populate the picker. Cleanest for demo: a small static
  array of `{ slug, title, category }` (copy from
  `src/data/assessments/index.ts` keys + each config's `meta.title`). Don't try
  to import the whole engine into the org app.

### Phase C — Admin app (admin.calmtree.in)
- [ ] Drop in `admin-org.functions.ts` + `isPlatformAdmin`.
- [ ] Add a **Companies** section: list orgs; create org (name, slug, billing
  email, owner user id); grant credits (amount + note); toggle individual-results
  unlock. All gated by the existing admin auth.

### Phase D — Polish (after demo works)
- [ ] Employee post-completion: offer "create a free account to keep your
  result" → on signup, set `invitation_responses.claimed_by_user_id` and surface
  it in the B2C dashboard.
- [ ] Company logo on invite emails; scheduled auto-reminders (cron); CSV/PDF
  export of the aggregate report.
- [ ] Self-serve Razorpay credit packs (reuse the client's verify-and-fulfill
  pattern in `src/server/payments/fulfillment.ts` — add a `credit_pack`
  productType).

---

## 7. Environment variables

**All three apps** (shared Supabase):
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`.

**Org app only:**
- `RESEND_API_KEY` — Resend key. **Unset ⇒ email is a graceful no-op** (launch
  still works; invites stay `pending`). Good enough for a UI demo.
- `EMAIL_FROM` — e.g. `CalmTree <noreply@mail.calmtree.in>`. Until a domain is
  verified in Resend, delivery is limited to the Resend account owner's address.
- `PUBLIC_SITE_URL` — base of the CLIENT app, e.g. `https://calmtree.in`. Invite
  links are `${PUBLIC_SITE_URL}/a/<rawToken>`.

Resend free tier: ~100 emails/day, 3,000/month. `launchCampaign` caps at 100
invites (`DEMO_MAX_INVITES`). Keep campaigns tiny until a plan + domain exist.

---

## 8. Conventions Antigravity MUST follow

Match the existing codebase exactly (see any file in `src/server/functions/`):
- Server functions: `createServerFn({ method: "POST" }).inputValidator(zodSchema).handler(async ({ data }) => …)`.
- All server data access via `getAdminClient()` (service role). Verify identity
  with `requireUser(accessToken)` for user endpoints, or `requireOrgRole(...)`
  for org endpoints, or the token itself for employee endpoints.
- **Return `{ error: string }` on failure — never throw across the boundary.**
- Every UI path has loading / error / empty states (see `a.$token.tsx`).
- Credit spend goes ONLY through `spend_org_credits` (never compute-then-insert
  in JS — that reintroduces the race condition).
- Business logic server-side; the dashboard renders, it doesn't decide.

---

## 9. Known traps

- **Don't** weaken `assessment_results.user_id` to NULL for employees — that's
  exactly why `invitation_responses` exists.
- **Don't** add a user-facing RLS SELECT policy to `invitation_responses` or
  `invitations` — the privacy gate is enforced in `getCampaignReport`, not RLS.
- **Reminder tokens:** `sendReminders` re-mints a fresh token (we only stored the
  old hash) and updates `token_hash`. This invalidates the original link — that's
  intended, but note it.
- **Route tree:** the client repo's `routeTree.gen.ts` regenerates on
  `vite build` / `vite dev`. If `/a/:token` type errors appear, run a build.
- The org app is a *separate* TanStack Start project — its server functions run
  in its own deployment with its own service-role key.

---

## 10. ✅ Verification checklist for Sakha (when Chirag returns)

Run these to verify Antigravity's work. Trust nothing; check each.

**Migration integrity**
- [ ] All 6 tables + 4 functions present; `spend_org_credits` still has
  `FOR UPDATE` on `organizations` (the anti-overspend lock).
- [ ] `invitation_responses` / `invitations` have NO permissive user SELECT policy.
- [ ] `credit_ledger` is never UPDATEd/DELETEd anywhere in code (grep).

**Credit correctness (the money path)**
- [ ] Launch spends exactly `emails.length` credits, once, via `spend_org_credits`.
- [ ] Insufficient credits blocks launch AND no invitations were created (no
  orphan invites, no partial spend).
- [ ] Close refunds exactly the count of non-completed invites; a second close
  is a no-op (doesn't double-refund).
- [ ] Balance = `SUM(delta)` everywhere; no cached/mutable balance column crept in.

**Privacy (the reputation path)**
- [ ] `getCampaignReport` returns `aggregateLocked: true` when
  `completed < min_aggregate_group_size` AND not unlocked — and the UI honours it.
- [ ] Individual rows are returned/shown ONLY when `individual_results_unlocked`.
- [ ] The employer never receives a single employee's answers via any org endpoint
  unless unlocked.

**Auth boundaries**
- [ ] Every org endpoint calls `requireOrgRole` with the right min role
  (viewer for reads, admin for launch/close/remind).
- [ ] Every admin endpoint calls `isPlatformAdmin`.
- [ ] Employee endpoints authenticate by token hash only, and reject
  closed/expired campaigns.

**Tokens**
- [ ] Raw tokens are never stored — only `hashInviteToken()` output.
- [ ] Invite links point at `${PUBLIC_SITE_URL}/a/<rawToken>` (the client app).

**Build health (each app)**
- [ ] `npx tsc --noEmit` exit 0, `npx vite build` succeeds, ESLint clean.
- [ ] No secrets committed; service-role key only in server-side env.

**End-to-end smoke (once deployed/local)**
- [ ] Admin grants credits → org sees balance.
- [ ] Org launches a 2-person campaign → 2 credits spent, 2 invitations.
- [ ] Open a magic link → assessment runs → submit → invite `completed`,
  response row written, credit NOT refunded.
- [ ] Close campaign with 1 unfinished → 1 credit refunded, that invite `expired`.
- [ ] Report shows funnel; aggregate locked under group floor.

---

*If anything here conflicts with what Antigravity built, the built code is
suspect until proven — this doc is the intended design.* ~Sakha
