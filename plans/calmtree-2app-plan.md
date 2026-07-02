# CalmTree — Client + Admin Split & Client-Flow Rebuild (Definitive Plan)

**For:** Sonnet (implementer) · Owner: Chirag
**Supersedes:** `plans/three-app-split-plan.md` and `plans/nav-onboarding-server-admin-plan.md`.
**Stack (unchanged):** TanStack Start + Supabase, used for BOTH apps. No Express, no MongoDB,
**no separate backend service.**

---

## 0. The architecture in one screen

Two separately-hosted apps, one shared Supabase project.

```
   calmtree.in                         admin.calmtree.in
 ┌───────────────────┐               ┌───────────────────┐
 │  client (website) │               │   admin (panel)   │
 │  TanStack Start   │               │   TanStack Start  │
 │  • landing/pages  │               │  • overview       │
 │  • assessments    │               │  • users          │
 │  • dashboard      │               │  • purchases      │
 │  • login/onboard  │               │  • results        │
 │  server layer:    │               │  • ebooks (CRUD)  │
 │  user + payments  │               │  server layer:    │
 │  (service key ✓)  │               │  admin fns (key ✓)│
 └─────────┬─────────┘               └─────────┬─────────┘
           └───────────────┬───────────────────┘
                           ▼
                     ┌──────────┐
                     │ Supabase │  (Postgres + Auth + RLS + Storage)
                     └──────────┘
```

**Why no separate backend:** in TanStack Start each app already has a private server side.
Any `createServerFn` / server code and any env var **without** the `VITE_` prefix runs only on the
server and is never sent to the browser. So the Supabase *service-role* key and Razorpay secret
live safely inside each app's own server layer. A third "backend" app would add deployment cost
and buy nothing here.

**Login** stays exactly as today: Supabase emails a 6-digit OTP; the browser holds the session.
The admin app uses the **same** Supabase login, then checks `profiles.is_admin`.

**Golden rule:** secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`,
`RAZORPAY_WEBHOOK_SECRET`, Cloudinary secret) are **server-only** env vars (no `VITE_`), set in
each deployment. Never put a secret in a `VITE_` variable.

### Build order (do phases in sequence, verify each before moving on)
1. **Phase 1 — Fix the client flow** (in the current repo, before splitting). ← biggest quality win
2. **Phase 2 — Split** the repo into `client/` and `admin/`.
3. **Phase 3 — Build out the admin dashboard.**
4. **Phase 4 — Deploy** both apps + DNS + Razorpay webhook.

> Rationale: fixing the flow first means you split a *working* app, not a broken one. Every bug in
> Phase 1 is easier to see while everything is still in one place.

---

## PHASE 1 — Fix the client-side flow (auth → onboarding → dashboard)

The flow is fragile today. Below are the **real, root-cause bugs** found in the code, each with a
concrete fix. Fix them in this order.

### Bug 1 — Duplicate server-function layers (the silent landmine)
There are **two copies** of the server functions:
- `src/lib/api/{entitlements,results,ebooks,payments,example}.functions.ts` + `src/lib/api/_shared.ts`
- `src/server/functions/{...}.functions.ts` + `src/server/{supabase-admin,require-user}.ts`

Different files import different copies (e.g. the webhook and some routes still reference
`@/lib/api/...`). Two sources of truth = inconsistent behavior and confusing debugging.

**Fix:**
1. Make `src/server/**` the single source of truth.
2. Delete `src/lib/api/*.functions.ts` and `src/lib/api/_shared.ts`.
3. Grep for `@/lib/api/` and repoint every importer to `@/server/functions/...` /
   `@/server/supabase-admin` / `@/server/require-user`.
4. Delete `src/lib/api/example.functions.ts` if unused (grep first).
5. `npx tsc --noEmit` must be clean before continuing.

### Bug 2 — Onboarding step components remount on every keystroke/click
In `src/routes/onboarding.tsx`, `NameStep`, `FocusAreasStep`, `GoalStep`, `RecommendedStep` are
**defined inside** `OnboardingPage` (lines ~141–420) and rebuilt as new function identities on
every render. Because `FocusAreasStep`/`GoalStep` toggle **parent** state, each click re-renders
`OnboardingPage`, which gives the current step a brand-new component type → React unmounts and
remounts it. Result: inputs lose focus, chips flicker, animations restart. This is a primary
cause of the "flow feels broken."

**Fix:** Hoist each step to a **module-level** component that receives props, or render the step
content inline via a `switch` (no wrapper components). Recommended shape:

```tsx
type StepProps = {
  fullName: string; setFullName: (v: string) => void;
  focusAreas: ProductCategory[]; toggleFocus: (v: ProductCategory) => void;
  experienceLevel: ...; setExperienceLevel: ...;
  primaryGoal: ...; setPrimaryGoal: ...;
  onNext: () => void; onBack: () => void;
  recommended: Assessment[]; submitting: boolean; onFinish: (target?: string) => void;
};

// top-level (outside OnboardingPage):
function NameStep(p: StepProps) { ... }
function FocusAreasStep(p: StepProps) { ... }
// etc.

function OnboardingPage() {
  // ...state + guards...
  const stepEl = [
    <NameStep {...props} />, <FocusAreasStep {...props} />,
    <GoalStep {...props} />, <RecommendedStep {...props} />,
  ][step];
  return (/* card */ stepEl);
}
```
Keep `NameStep`'s `useForm` local to `NameStep` (it's fine once `NameStep` is stable/top-level).

### Bug 3 — "Start [assessment]" fires a navigation race
In `RecommendedStep` (lines ~381–390) the Start button is `asChild` around a `<Link>` **and** has
`onClick={() => void handleFinish()}`. Clicking it (a) navigates to the gated
`/assessments/$slug` immediately AND (b) runs async `handleFinish()` which itself calls
`navigate(redirect)`. Two competing navigations; and because `_authed` requires
`onboarding_completed`, the Link can land on the assessment **before** the save + `refreshProfile`
complete → the guard bounces the user back to `/onboarding`. Confusing loop.

**Fix:** one path only — finish, then go. Make `handleFinish` accept a target:
```tsx
async function handleFinish(target?: string) {
  if (!session?.access_token) return;
  setSubmitting(true);
  const result = await completeOnboarding({ data: { accessToken: session.access_token, /*...*/ } });
  if ("error" in result && result.error) { toast.error(result.error); setSubmitting(false); return; }
  posthogJs.capture("onboarding_completed", { /*...*/ });
  await refreshProfile();                       // profile now has onboarding_completed=true
  void navigate({ to: target ?? redirect });    // single navigation, after state is consistent
}
```
"Start" becomes a plain button: `onClick={() => handleFinish(`/assessments/${a.slug}`)}` (no `<Link>`).

### Bug 4 — A failed profile fetch strands the user (the worst one)
`AuthContext.fetchProfile` sets `profile=null` on any error. Then:
- `login.tsx`: both redirect branches require `profile` truthy → neither fires → user is logged in
  but **stuck staring at the OTP form**.
- `_authed/route.tsx`: `if (profile && !profile.onboarding_completed)` is skipped when `profile` is
  null → it renders `<Outlet/>` to a **profile-less** user → downstream pages break.
- `dashboard/route.tsx` & `AdminLayout`: same skip → render with null profile.

Causes of the failed fetch you must also rule out: migration `007` (RLS recursion fix) not applied;
the `profiles` row missing for a user; transient network.

**Fix (three parts):**
1. **Make the fetch resilient** in `AuthContext.fetchProfile`: on error, retry once; distinguish
   "row genuinely missing" (`PGRST116`) from "query failed." If the row is missing, self-heal:
   ```ts
   // upsert a minimal row so a user is never profile-less
   await supabase.from("profiles").upsert({ id: userId }, { onConflict: "id" });
   ```
   Always end with `profile` populated or a clear `profileError` state; always clear
   `profileLoading`.
2. **Add a `profileError` flag** to the context. Guards render a small "Couldn't load your
   account — Retry" screen (calling `refreshProfile`) instead of silently proceeding.
3. **Guards must handle `user && !profile`** explicitly — never fall through to protected content.

### Bug 5 — Three different, inconsistent guards
- `_authed/route.tsx` → declarative `<Navigate>` (good).
- `dashboard/route.tsx` (lines 120, 126) and `AdminLayout` (line 130) → `window.location.href="/"`
  (a **hard browser reload** — jarring white flash, loses SPA state) and duplicate the logic.

**Fix:** one shared guard, declarative. Create `src/components/auth/RequireAuth.tsx`:
```tsx
export function RequireAuth({ requireOnboarded = true, children }:
  { requireOnboarded?: boolean; children: ReactNode }) {
  const { user, isReady, profile, profileError } = useAuth();
  const location = useLocation();
  if (!isReady) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" search={{ redirect: location.pathname + location.search }} />;
  if (profileError) return <ProfileErrorRetry />;
  if (requireOnboarded && profile && !profile.onboarding_completed)
    return <Navigate to="/onboarding" search={{ redirect: location.pathname + location.search }} />;
  return <>{children}</>;
}
```
Then:
- `dashboard/route.tsx`: wrap the layout in `<RequireAuth>` and delete the `window.location.href`
  logic and the placeholder `beforeLoad`.
- `_authed/route.tsx`: reuse `RequireAuth` (keeps behavior, removes duplication).
- The admin guard becomes the admin app's `RequireAdmin` (Phase 2/3), same pattern with an
  `is_admin` check and no onboarding requirement.

### Bug 6 — `redirect` typing hacks + duplicate navigation in login
`login.tsx` casts `redirect as "/dashboard"` and has **two** navigation mechanisms (early
`<Navigate>` in `LoginPage` + an effect in `AuthRedirectOtpFlow`) plus dead code
(`handleAuthSuccess`, unused `navigate`).

**Fix:**
- Type `redirect` as `string` and navigate with `navigate({ to: redirect })` (TanStack accepts a
  runtime string path; drop the literal cast). Keep the `validateSearch` sanitizer (must start
  with `/`, default `/dashboard`) — that already prevents open-redirects.
- Keep **one** place that decides post-login navigation. Simplest: delete the child
  `AuthRedirectOtpFlow` effect and let `LoginPage`'s top-level `<Navigate>` blocks handle it (they
  re-run when `profile` updates). Remove all dead code.

### Bug 7 — Onboarding polish
- Add an optional **"Skip for now"** link on steps 2–3 that calls `handleFinish()` with whatever's
  selected (focus areas can be empty). Prevents dead-ends for users who won't fill everything.
- Guard order in `OnboardingPage` is fine, but also handle `profileError` (show retry).

### Bug 8 — SSR/first-paint correctness
Auth is client-only, so gated pages SSR as the spinner then hydrate. That's acceptable, but:
- Ensure guards return the spinner (not `<Navigate>`) until `isReady` — `<Navigate>` firing during
  SSR/first paint can cause a flash-redirect. The `isReady` check above handles this.
- In `SiteLayout` header, the nav flips logged-out → logged-in after hydration. To avoid a
  jarring pop, render the auth-gated links with a stable placeholder while `!isReady` (or simply
  accept the flip — it's minor). Confirm `requiresAuth` filtering exists in `navigation.ts` +
  `SiteLayout` (from the earlier nav plan); if not, add it: hide Academy/Assessments/Resources
  until `user` is present.

### Phase 1 verification (must all pass)
- `npx tsc --noEmit` and `npm run lint` clean.
- Fresh (logged-out) → `/assessments` → `/login?redirect=/assessments` → OTP → onboarding (name
  keeps focus while typing; chips don't flicker) → "Go to dashboard" lands on `/dashboard`.
- "Start [assessment]" on the last onboarding step lands on that assessment (not a loop).
- Returning onboarded user → `/login` → straight to `/dashboard` (no onboarding).
- Kill the network on the profile fetch → you get a "Retry" screen, **not** a stuck OTP form.
- No `window.location.href` hard reloads anywhere in the guards.
- Refresh on `/dashboard` while logged in → no bounce to `/login`.

---

## PHASE 2 — Split into `client/` and `admin/`

Goal: two sibling folders, each a self-contained TanStack Start app. Keep it simple — **each app
carries its own copy** of the shared UI/lib it needs (no monorepo workspace tooling now; you can
extract a shared package later if it ever hurts).

### 2.1 Move the current app into `client/`
- `git mv` everything that is the app (`src/`, `public/`, `index.html` if any, `vite.config.ts`,
  `tsconfig.json`, `package.json`, `package-lock.json`, `components.json`, `eslint.config.js`,
  `.env`, styles) into `client/`.
- Keep at the **repo root** (shared): `supabase/` (migrations = single DB source of truth),
  `plans/`, `README.md`, top-level docs.
- In `client/`, **remove the admin pieces** (they move to `admin/`): delete `src/admin/` and
  `src/routes/admin/` and `src/server/functions/admin.functions.ts`.
- Boot check: `cd client && npm install && npm run dev` → site works; `npm run build` succeeds.

### 2.2 Scaffold `admin/` as its own TanStack Start app
Create `admin/` with the same setup as `client/` (copy `vite.config.ts`, `tsconfig.json`, a
trimmed `package.json`, `eslint.config.js`, `components.json`, the Tailwind `styles.css`, and the
TanStack Start plumbing: `src/router.tsx`, `src/routes/__root.tsx`, `src/server/entry.ts`,
`src/lib/error-*.ts`, `src/server.ts` wiring — mirror client exactly).

Bring into `admin/src/`:
- **Routes:** `src/admin/AdminLayout.tsx` → `admin/src/components/AdminLayout.tsx`;
  `src/routes/admin/*` → `admin/src/routes/*` **rebased to the root** so URLs are `/`, `/users`,
  `/purchases`, `/results`, `/ebooks` (admin.calmtree.in already scopes it — no `/admin` prefix
  needed). i.e. `admin/index.tsx`→`routes/index.tsx`, `admin/users.tsx`→`routes/users.tsx`, etc.
- **Server layer:** `admin.functions.ts` → `admin/src/server/functions/admin.functions.ts` +
  copies of `supabase-admin.ts`, `require-user.ts`.
- **Auth/shared:** copy `context/AuthContext.tsx`, `hooks/useAuth.ts`, `lib/supabase.ts`,
  `lib/auth.ts`, `components/auth/*` (for OTP login), `components/shared/Logo.tsx`, and the
  **subset** of `components/ui/*` the admin pages import (button, card, table, dialog, input,
  label, form, select, switch, textarea, badge, pagination, sonner, tabs, dropdown-menu, chart).
- **Data:** copy `src/data/assessments` (or generate a `slug → title` map) so the Results table can
  show assessment titles instead of raw slugs. Copy `src/data/constants.ts` for SITE name/logo.

### 2.3 Admin app auth shell
- Add `admin/src/routes/login.tsx` — a minimal OTP login (reuse `OtpFlow`), no onboarding step.
- Add `admin/src/components/RequireAdmin.tsx` (same shape as `RequireAuth`, but checks
  `profile?.is_admin`; on non-admin → a clean "Not authorized" screen with a sign-out button, not
  a redirect to a user site that doesn't exist here).
- `__root.tsx` wraps everything in `AuthProvider`; `AdminLayout` uses `RequireAdmin`.
- Because the admin app contains **only** admin screens, a normal user who logs in sees the "Not
  authorized" wall — satisfying "admin has no normal-user website access."

### 2.4 Env split
`client/.env`:
```
VITE_SUPABASE_URL=...            VITE_SUPABASE_ANON_KEY=...        (public)
VITE_POSTHOG_KEY=...             VITE_POSTHOG_HOST=...
VITE_RAZORPAY_KEY_ID=...         (public key id only)
SUPABASE_URL=...                 SUPABASE_SERVICE_ROLE_KEY=...     (server-only)
RAZORPAY_KEY_ID=...              RAZORPAY_KEY_SECRET=...           (server-only)
RAZORPAY_WEBHOOK_SECRET=...      (server-only)
```
`admin/.env`:
```
VITE_SUPABASE_URL=...            VITE_SUPABASE_ANON_KEY=...        (public)
SUPABASE_URL=...                 SUPABASE_SERVICE_ROLE_KEY=...     (server-only)
CLOUDINARY_CLOUD_NAME=...        CLOUDINARY_API_KEY=...            (if using Cloudinary uploads)
CLOUDINARY_API_SECRET=...        (server-only)
```

### Phase 2 verification
- Both `client/` and `admin/` build and run independently (different ports locally, e.g. 8080 /
  8081).
- client has no `admin` code; admin has no landing/assessment/dashboard code.
- Admin login: non-admin account → "Not authorized"; admin account → dashboard.

---

## PHASE 3 — The admin dashboard (full spec)

This is what the user specifically asked to define. The admin app is an **operations dashboard for
the whole business** — not a second copy of the website. All data comes from `admin.functions.ts`
server functions (service-role, each gated by `requireAdmin`).

### 3.1 Pages & what's on them

**1) Overview (`/`) — the at-a-glance health of CalmTree**
- **KPI cards:** Total users · New users (7d / 30d) · Onboarding completion rate ·
  Assessments completed (total / 30d) · Total revenue · Revenue this month · Total purchases ·
  Avg order value · Active ebooks.
- **Charts (recharts, already a dependency):**
  - Signups over time (line, last 30/90 days).
  - Revenue over time (bar, monthly).
  - Assessments-by-category (donut) or top 5 assessments (horizontal bar).
- **Breakdowns:** Entitlements split (free vs category vs universal).
- **Recent activity feed:** latest 10 signups, latest 10 purchases, latest 10 results (tabbed or
  three small lists).

**2) Users (`/users`)**
- Table: name · email · signed-up · onboarding status · focus areas · #results · #purchases ·
  is_admin.
- Search (name/email), filter (onboarded?, admin?), pagination.
- Row → **User detail drawer/page**: profile fields, their assessment results, their purchases,
  their entitlements. Actions: **grant/revoke admin**, **grant entitlement manually**
  (category/universal, optional expiry). (Delete user = dangerous; put behind a confirm dialog or
  defer.)

**3) Purchases (`/purchases`)**
- Table: date · user (name/email) · product (ebook title) · amount ₹ · status ·
  razorpay_payment_id.
- Filter by status/date range; revenue summary for the current filter; **Export CSV** (build the
  CSV string client-side from the fetched rows — no new dependency needed).

**4) Results (`/results`)**
- Table: date · user · assessment (title via slug map) · primary label · percentage.
- Filter by assessment and by user; aggregate counts per assessment. Read-only.

**5) Ebooks (`/ebooks`) — catalog management (full CRUD)**
- List all (active / inactive / draft) with cover thumbnail, title, price, status, #sales.
- **Create / Edit form** (react-hook-form + zod — both already deps) mapping to the `ebooks`
  table (`003_commerce.sql`): `title, subtitle, description, price_inr, page_count, slug, status`
  (`draft|active|inactive`), `cover_image_url`, and the **file/PDF url column** (confirm its exact
  name in `003_commerce.sql`), plus `cloudinary_public_id`.
- **Uploads:** ebooks table has `cloudinary_public_id`, so use **Cloudinary signed uploads**: a
  server function `getEbookUploadSignature` (uses Cloudinary secret server-side) returns a
  signature; the form uploads the cover/PDF directly to Cloudinary and stores the returned URL +
  public_id. (If you'd rather use **Supabase Storage**, swap this for a signed-URL upload to a
  private bucket — decide once and be consistent. Confirm which service is actually set up.)
- Toggle status inline; delete behind a confirm dialog.

**6) Settings (`/settings`) — optional, small**
- List of admins; add/remove admin (same as user drawer action). App/build info.

**Future (mark as TODO, don't build now):** Academy/courses management, newsletter subscribers,
blog/CMS, refunds via Razorpay API.

### 3.2 Server functions to add/extend (`admin/src/server/functions/admin.functions.ts`)
Keep the existing `requireAdmin` gate on **every** function. Existing: `getAdminOverview`,
`listUsers`, `listPurchases`, `listResults`, `listAllEbooks`, `createEbook`, `updateEbook`,
`deleteEbook`. Add:
- **Extend `getAdminOverview`** to also return: newUsers7d, newUsers30d, onboardingRate,
  revenueThisMonth, avgOrderValue, entitlementsBreakdown, topAssessments (from
  `assessment_results` grouped by slug), topEbooks (join purchases→ebooks), and time series for
  signups + revenue (return arrays of `{ date, count/amount }`).
- **`getUserDetail({ userId })`** → profile + that user's results, purchases, entitlements.
- **`setUserAdmin({ userId, isAdmin })`** → flips `profiles.is_admin` (guard: don't let an admin
  remove their own last-admin access — optional safety).
- **`grantEntitlement({ userId, accessType, productCategory, expiresAt })`** → inserts an
  entitlement (service role).
- **`getEbookUploadSignature()`** → Cloudinary signed-upload params (if Cloudinary), or a Supabase
  Storage signed upload URL (if Storage).

> Note on emails: `profiles` has no email column; emails live in `auth.users`. Use the service-role
> client's `supabase.auth.admin.listUsers()` (or a join view) to show emails in the Users table.

### 3.3 Data access & RLS reminder
Admin server functions use the **service-role** client (bypasses RLS) — so `requireAdmin` is the
**only** thing protecting all data. Guard every function; return `{ error: "Forbidden" }` on a
non-admin token. Migrations `004` (admin RLS) and `007` (recursion fix / `is_admin()` function)
must be applied.

### Phase 3 verification
- Overview numbers reconcile with the DB (spot-check counts + revenue).
- Users table shows emails; drawer shows a user's results/purchases; grant-admin toggles work.
- Purchases CSV export downloads and opens correctly.
- Create → edit → deactivate → delete an ebook; an **active** ebook then appears on the client
  site's Resources page and landing strip; a **draft** does not.
- A non-admin cannot reach any admin data (test with a normal token).

---

## PHASE 4 — Deploy (two apps, two domains)

- **client/** → Vercel project A. Root directory = `client`. Framework auto-detected (TanStack
  Start / Nitro). Attach domain **calmtree.in** (and `www`). Set all `client/.env` vars in Vercel
  (mark server-only ones as non-`VITE_`).
- **admin/** → Vercel project B. Root directory = `admin`. Attach subdomain
  **admin.calmtree.in** (add a CNAME/record in your DNS pointing the `admin` subdomain to Vercel;
  Vercel shows the exact target). Set `admin/.env` vars.
- **Razorpay webhook:** point the dashboard webhook to
  `https://calmtree.in/api/webhooks/razorpay` (the webhook lives in the **client** app, since
  payments are user-facing). Set `RAZORPAY_WEBHOOK_SECRET` on the client deploy.
- **Supabase:** one project, shared. Add both domains to Supabase Auth "Redirect URLs" /
  "Site URL" so OTP flows work from both origins.
- **DB migrations:** apply `001`–`007` (and any new admin migration) via the Supabase SQL editor
  or `supabase db push`. Confirm `007` is live (no RLS recursion).

### Phase 4 verification
- calmtree.in: full user journey works end-to-end incl. a Razorpay **test** purchase → webhook
  grants access → ebook appears in the user's dashboard.
- admin.calmtree.in: admin logs in, sees live numbers, manages an ebook; the change reflects on
  calmtree.in.
- Non-admin visiting admin.calmtree.in gets the "Not authorized" wall.

---

## Appendix A — Env var matrix (who holds what)

| Variable | client | admin | Public? |
|---|---|---|---|
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | ✓ | ✓ | public (browser) |
| `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` | ✓ | — | public |
| `VITE_RAZORPAY_KEY_ID` | ✓ | — | public |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | ✓ | ✓ | **server-only** |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | ✓ | — | **server-only** |
| `RAZORPAY_WEBHOOK_SECRET` | ✓ | — | **server-only** |
| `CLOUDINARY_*` (if used) | (only where uploads happen) | ✓ | **server-only** |

## Appendix B — Master test checklist
- [ ] tsc + lint clean in both apps
- [ ] No `@/lib/api/*` imports remain (single server layer)
- [ ] Onboarding: input keeps focus; chips don't flicker; no remount jank
- [ ] Onboarding "Start" → assessment (no loop); "Go to dashboard" works; "Skip" works
- [ ] Profile-fetch failure → Retry screen (never a stuck OTP form)
- [ ] All guards use `<Navigate>` (no `window.location.href`)
- [ ] Logged-out nav hides Academy/Assessments/Resources; logged-in shows them
- [ ] Deep-link `/assessments/x` while logged out returns there after login+onboarding
- [ ] Admin: non-admin blocked everywhere (UI + server fns)
- [ ] Razorpay test purchase → webhook → entitlement/purchase row → shows in user dashboard
- [ ] Active ebook shows on site; draft doesn't

## Appendix C — What we deliberately did NOT do (and why)
- **No separate backend service** — TanStack Start's server layer already keeps secrets safe;
  a third app would only add deploy/CORS overhead.
- **No MongoDB / Express** — Supabase stays; zero data migration.
- **No monorepo workspace tooling** — each app self-contains its shared code for now; revisit only
  if duplication becomes painful.
```
