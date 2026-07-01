# CalmTree — Commercialization Build Plan (Assessments + Ebooks + Admin Panel + Analytics)

## Context

CalmTree already ships a consolidated single-page landing experience (hero → Decode Your Mind →
Assessments → Academy preview → Resources preview → About → Newsletter) — there is no separate
onboarding step today, and there doesn't need to be one. What's actually missing is everything
*after* that: a way to turn anonymous visitors into tracked users, a way to charge for paid-tier
assessments and ebooks, a place logged-in users go (dashboard), and a place the client (Alok) goes
to see who's using the site and what they're buying (admin panel + analytics).

The codebase already has significant scaffolding in progress that this plan builds on rather than
replaces: `AuthContext`/`AuthModal` (password auth), `useEntitlement` (category/universal access
checks), a `results.functions.ts` / `entitlements.functions.ts` server-function pair, and a
`002_auth_and_access.sql` migration with `profiles` / `assessment_results` / `entitlements` tables
and RLS already in place. 40 assessments are already built (discovery/growth/professional tiers).
Two design mockups (`design-mockups/*.png`) establish the intended visual language for a user
dashboard and admin panel — dark green sidebar, card stat tiles, Recharts charts (already
installed), activity table — which this plan reuses structurally.

**Decisions already confirmed with the client, not to be re-litigated:**
- Free assessments need **zero login**. Full report/dimension breakdown is unlocked by entering an
  **email only** — this triggers a real (passwordless) Supabase account creation, so these users
  show up as real Users in the admin panel from step one.
- Passwordless (OTP) is the **default, permanent login method** everywhere (header sign-in
  included) — not just a one-off report-gate trick. Users may *optionally* set a password later in
  account settings if they want a faster repeat login; password is never required.
- Paid-tier purchases require OTP verification first (so payments always attach to a real user).
- A paid assessment purchase unlocks the **whole product category** (matches the existing
  `entitlements.access_type = 'category'` row — no schema change needed).
- Analytics = **PostHog** for general traffic/funnels (don't build pageview tracking ourselves) +
  native Supabase-backed admin screens for assessment-specific data (who took what, what result).
- A lightweight, **dismissible (non-blocking) cookie/consent notice** ships alongside PostHog;
  session recording is skipped to keep the compliance surface small.
- Payments = **Razorpay**. Ebooks = PDFs in **Cloudinary**, sold as individual one-time SKUs,
  delivered via short-lived **signed URLs** generated fresh per download request (permanent
  *access*, not a permanent public link).
- Admin access = a simple `profiles.is_admin` boolean (no RBAC) — right scale for a founder + 1 VA.
- **Scope for this build**: Assessments commercialization + Ebooks + Admin panel + Analytics.
  Academy/courses stay a **catalog page linking to a future third-party LMS** — no purchase flow
  for courses yet, but the purchase data model is deliberately generic enough to add courses later
  without a rearchitecture.
- Landing page keeps its current single-page structure, plus one addition: a lightweight
  **"Explore by what you're working on" category chip row** (segment picker) mapped to the
  existing 10 `ProductCategory` values, so the client's 6 audience segments each land on relevant
  assessments without a whole new route.

---

## 1. Data model (new migrations, additive only — extends `002_auth_and_access.sql`) ✅ Done

**Principle:** keep `entitlements` exactly as it is today (category/universal *access* for
assessments). Add a **parallel** `purchases` table for one-time SKU ownership (ebooks now,
courses/certificates later via `product_type` — no rearchitecture needed when courses launch).
Never let the client write either table directly; all writes go through service-role server code
(webhook or admin-gated server function), matching the existing convention.

`supabase/migrations/003_commerce.sql`: ✅
- `public.ebooks` — catalog: `id, slug, title, subtitle, description, cover_image_url,
  cloudinary_public_id, price_inr (whole rupees), page_count, status, created_at, updated_at`.
  RLS: public SELECT where `status = 'active'` (browsing the catalog needs no login); writes
  service-role only.
- `public.purchases` — one-time SKU ownership ledger: `id, user_id, product_type ('ebook' |
  future 'course'/'certificate'/'physical_product'), product_id, amount_paid_inr,
  razorpay_order_id, razorpay_payment_id (UNIQUE — webhook idempotency), status, purchased_at`.
  RLS: user reads own rows; writes service-role only.
- Add `UNIQUE (payment_reference)` to existing `entitlements` table (nullable-safe unique) for the
  same idempotency reason on the assessment-category purchase path.

`supabase/migrations/004_admin.sql`: ✅
- `ALTER TABLE public.profiles ADD COLUMN is_admin boolean NOT NULL DEFAULT false;`
- Admin-read-all RLS policies added to `profiles`, `assessment_results`, `entitlements`,
  `purchases`: `EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin)`.
- Document (in a migration comment, not SQL) the one-time manual step: flip Alok's own
  `profiles.is_admin` to `true` via the Supabase SQL editor after his account exists — don't
  hardcode a UUID into version control.

Pricing note: store whole rupees in Postgres (matches the existing `TIER_INFO` "₹99–299" display
convention); convert to paise (`amount * 100`) only at the Razorpay order-creation call site.

---

## 2. Auth: OTP-first, password-optional ✅ Done

- `src/lib/auth.ts`: ✅ added `sendOtp(email)` and `verifyOtp(email, token)` following the
  existing `{ error }`-return convention. `setPassword(password)` added for the optional settings path.
- `src/context/AuthContext.tsx`: ✅ extended with `sendOtp`/`verifyOtp`/`setPassword` passthroughs.
- **`AuthModal.tsx` is now OTP-first**: ✅ default view is email → OTP verify. Password sign-in
  is a secondary link. Component is modular — the inner `OtpFlow` is reused by `EmailGateForm`.
- `src/components/auth/EmailGateForm.tsx`: ✅ inline (non-modal) OTP card for the report gate.
- `src/components/auth/UserMenu.tsx`: ✅ wired into `SiteLayout.tsx`'s `Header()`. Sign in →
  OTP modal. Logged in → avatar chip → Dashboard / Sign out dropdown.
- `src/routes/dashboard/settings.tsx`: ✅ includes optional "Set a password" form.

---

## 3. Assessment monetization flow (end-to-end) ✅ Done

**Result saving:**
- `src/hooks/useResultPersistence.ts`: ✅ `saveIfAuthed`, `stashForLater`, `claimStashed`,
  `hasPendingStash` — anonymous results stashed in sessionStorage, claimed on OTP verification.
- `AssessmentRunner.tsx` and `ProfileRunner.tsx`: ✅ `saveIfAuthed` wired into `goNext` when scoring.

**Teaser vs. full report:**
- `src/components/assessment/ReportGate.tsx`: ✅ wraps dimension breakdowns.
  - No user → `EmailGateForm` inline card.
  - `useEntitlement` reason `"upgrade-required"` → `UpgradeGate` with `RazorpayCheckoutButton`.
  - Unlocked → children (existing breakdown UI) rendered as-is.
- `ResultsView.tsx`, `ProfileResultsView.tsx`, `PersonalityCompassResults.tsx`: ✅ gate wired.
  Free teaser (archetype/profile label + gauge) always above the gate.

---

## 4. Razorpay integration ✅ Done

- `src/lib/api/payments.functions.ts`: ✅ `createRazorpayOrder` (price fetched server-side,
  secrets never sent to client), `verifyRazorpayPayment` (HMAC check for optimistic UI).
- `src/components/payments/RazorpayCheckoutButton.tsx`: ✅ loads checkout.js dynamically, opens
  modal. Success callback shows optimistic UI + invalidates entitlement cache.
- `src/routes/api/webhooks/razorpay.ts`: ✅ HMAC-SHA256 verification, idempotent DB writes
  (`ON CONFLICT DO NOTHING` via unique constraints from §1). Handles `payment.captured`.
- New env vars: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`.

---

## 5. Ebooks ✅ Done

- `src/lib/api/ebooks.functions.ts`: ✅ `getActiveEbooks` (public catalog), `getMyPurchasedEbookIds`
  (auth-required), `getEbookDownloadUrl` (verifies ownership, generates short-TTL Cloudinary signed URL).
- `src/routes/dashboard/ebooks.tsx`: ✅ "My Ebooks" library with per-click signed download.
- `src/routes/index.tsx` resources section: ✅ replaced hardcoded array with real `getActiveEbooks` call.
- New env vars: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

---

## 6. User dashboard (`/dashboard`) ✅ Done

- `src/routes/dashboard/route.tsx`: ✅ dark green sidebar layout, client-side auth guard.
- `src/routes/dashboard/index.tsx`: ✅ overview with stat tiles, recent results, explore CTA.
- `src/routes/dashboard/results.tsx`: ✅ full history via `getMyResults`, links back to retake.
- `src/routes/dashboard/ebooks.tsx`: ✅ purchased ebooks with signed download button.
- `src/routes/dashboard/settings.tsx`: ✅ name edit, read-only email, optional password set.

---

## 7. Admin panel — ⛔ Removed from this repo, moved to admin.calmtree.in

The admin panel originally built here (`/admin` route tree, `useIsAdmin()`, `admin.functions.ts`) has
been **deleted from this codebase**. Admin now lives on its own domain/deployment
(`admin.calmtree.in`) with its own frontend, its own copy of `getAdminClient()`/`requireAdmin()`
server functions, and its own UI — fully separate from this repo.

**What stays here** (shared Supabase project, so this schema is still load-bearing):
- `supabase/migrations/004_admin.sql` — `profiles.is_admin` column + admin-read-all RLS policies.
  The admin.calmtree.in app reads/writes through these same tables and needs this schema/RLS to
  exist on the shared DB; it does not belong to "this app's frontend" the way the deleted routes did.

**What was removed from this repo:**
- `src/routes/admin/` (route.tsx, index.tsx, users.tsx, assessments.tsx, ebooks.tsx, entitlements.tsx)
- `src/lib/api/admin.functions.ts`
- `src/hooks/useIsAdmin.ts`

`/dashboard` (the regular logged-in user's own account area — My Results, My Ebooks, Settings) is
unaffected and stays in this app; only the staff/admin panel moved out.

---

## 8. PostHog + Analytics ✅ Done

- `src/routes/__root.tsx`: ✅ PostHog initialized lazily (graceful no-op when key absent),
  SPA pageview tracking via `router.subscribe('onResolved')`.
- `src/components/shared/CookieConsent.tsx`: ✅ dismissible banner, localStorage-persisted.
- `trackEvent()` exported from `__root.tsx` for typed event firing at call sites.
- New env vars: `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`.
- Session recording disabled.

---

## 9. Landing page addition ⬜ Todo

- `index.tsx`'s existing Assessments `Section`: add a chip row above the grid — "Self-Development",
  "Workplace", "Leadership", "Founders", "Parenting", "Career" (mapped to existing
  `ProductCategory` values) — linking to `/assessments?category=...`.
- `src/routes/assessments/index.tsx` needs a `validateSearch` for the `category` param if it
  doesn't already filter by category (check current implementation; add if missing).
- Low-effort, no new route — satisfies the client's 6-audience-segment brief without a big new
  landing section.

---

## 10. Build sequence (each phase independently demoable)

1. ✅ **Result-saving gap** — `useResultPersistence`, wire into both runners for already-logged-in users.
2. ✅ **OTP auth + teaser/report gate** — `sendOtp`/`verifyOtp`, `EmailGateForm`, `ReportGate`, stash/claim.
3. ✅ **Razorpay + entitlements webhook** — SDK, `payments.functions.ts`, `RazorpayCheckoutButton`, webhook.
4. ✅ **Ebooks** — tables, Cloudinary signed URLs, real resources section, `/dashboard/ebooks`.
5. ✅ **Dashboard shell** — `/dashboard` route tree, results history, header `UserMenu`.
6. ⛔ **Admin panel** — removed from this repo; moved to its own app at admin.calmtree.in. Only
   `is_admin` + admin RLS (`004_admin.sql`) stay here as shared-DB schema.
7. ✅ **PostHog** — init, pageview, four events, consent banner.
8. ⬜ **Landing page chip filter** (§9) — next up.

Newsletter's fake backend (`NewsletterForm.tsx`) is a known small gap, explicitly out of this
phased core — pick up as a fast-follow if time remains.

---

## Assumptions carried forward (flagged, not silently buried)

- Course/certificate purchases will slot into `purchases.product_type` later via a `courses`
  catalog table mirroring `ebooks` — not built now, just designed not to block it.
- Razorpay checkout always requires OTP verification first, so the webhook never has to resolve a
  user by email or race against in-flight verification.
- India's DPDP Act has no fully-published rules yet; the dismissible-banner-without-recording
  default is a reasonable posture but isn't a substitute for a legal gut-check on the final privacy
  policy wording.

---

## Verification

- **Phase 1–2**: run the dev server, take a free assessment anonymously, confirm the teaser shows,
  complete the OTP flow, and check the Supabase dashboard directly for a new `auth.users` row, a
  `profiles` row, a free `entitlements` row, and the `assessment_results` row with the right
  `user_id`.
- **Phase 3–4**: use Razorpay's test-mode keys and test card numbers; confirm the webhook logs show
  signature verification passing and the correct table gets the new row; hit the webhook twice with
  the same payload (e.g. replay via curl) to confirm idempotency actually holds.
- **Phase 6**: log in as an `is_admin = true` user, confirm the admin routes are reachable and a
  non-admin user gets redirected; confirm the stat tiles/charts reflect real rows created in
  earlier phases.
- **Phase 7**: open the PostHog project dashboard and confirm live events appear for a real
  click-through (pageview → assessment_started → assessment_completed → email_captured →
  purchase_completed).
- Throughout: `npm run build`/typecheck should stay green after each phase, and existing routes
  (landing page, assessments catalog, academy, resources) should keep rendering unchanged where
  this plan doesn't touch them.

### Critical files
- `src/hooks/useEntitlement.ts` — existing access-check pattern, extended (not replaced) for report-depth gating
- `src/lib/api/results.functions.ts` — the `requireUser` + service-role convention all new API modules must follow
- `supabase/migrations/002_auth_and_access.sql` — schema/RLS/trigger conventions that 003/004 extend
- `src/components/assessment/AssessmentRunner.tsx` and `ProfileRunner.tsx` — where result-saving and `ReportGate` get wired in
- `src/routes/__root.tsx` — where `AuthProvider`, PostHog init, and the consent banner mount
- `src/components/auth/AuthModal.tsx` — OTP-first, password secondary path

---

## Next Steps

### Phase 9 — Landing page category chip row (⬜ Todo)
Wire the `ProductCategory` filter into the assessments landing page:

1. Add chip row above the assessment grid in `src/routes/assessments/index.tsx`:
   - "Self-Development" · "Workplace" · "Leadership" · "Founders" · "Parenting" · "Career"
   - Each chip links to `/assessments?category=<ProductCategory-value>`
2. Add `validateSearch: { category: optional string }` to the assessments index route.
3. Filter `ASSESSMENT_LIST` by `config.meta.productCategory === category` when param is present.
4. Add the chip row to the landing page hero Assessments section too (`src/routes/index.tsx`).
