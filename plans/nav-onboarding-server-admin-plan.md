# CalmTree — Auth-Gated Nav, Rich Onboarding, Server & Admin Restructure

**Status:** Ready for implementation (Sonnet)
**Branch base:** `commercialization-build`
**Author:** Sakha (plan) · Chirag (owner)

---

## 0. What we're building (one paragraph)

Keep the current landing page exactly as-is visually. Change the **navbar** so that
**Academy, Assessments, Resources** only appear once a user is authenticated **and** has
finished onboarding. Those three route trees become **fully access-protected** (anonymous
visitors are redirected to a login → onboarding funnel that returns them to their intended
page). Add a **rich, personalized onboarding flow** that runs once on first login and drives
a personalized user dashboard. Finally, do two structural refactors the codebase has grown
into: move all server-only code into a dedicated **`src/server/`** folder, and build a
dedicated **`src/admin/` + `/admin` route tree** (full read dashboards + ebook CRUD) on top
of the `is_admin` flag and RLS policies that already exist in migration `004_admin.sql`.

---

## 1. Decisions locked (do not re-litigate)

| # | Decision | Choice |
|---|----------|--------|
| 1 | Gating depth for Academy/Assessments/Resources | **Fully protected** — hidden from navbar *and* route-guarded with redirect-back |
| 2 | Onboarding richness | **Rich / personalized** — multi-step (focus areas + goal + recommended first assessment), personalizes dashboard |
| 3 | Admin scope | **Full read + ebook CRUD** — overview stats, users, purchases, results (read-only) + ebook create/edit/delete/upload |

**Public routes (no auth):** `/`, `/decode-your-mind`, `/about`, `/contact`, `/privacy-policy`, `/terms`, `/sitemap.xml`.
**Protected routes (auth + onboarding):** `/academy`, `/assessments`, `/assessments/$slug`, `/resources`, `/dashboard/*`.
**Admin routes (auth + `is_admin`):** `/admin/*`.
**New routes:** `/login`, `/onboarding`, `/admin/*`.

> Note on the landing page: it keeps its current CTAs pointing at `/assessments`, `/academy`,
> `/resources`. After this change those CTAs become the top of the conversion funnel — clicking
> them while logged out sends the visitor to `/login?redirect=<target>`. That is intended.

---

## 2. Current-state facts the implementer must know

- **Stack:** TanStack Start (React 19, Vite, file-based routing in `src/routes`), Supabase
  (OTP-first auth), TanStack Query, PostHog, Tailwind v4, Radix UI.
- **Nav is centralized** in `src/data/navigation.ts` (`NAV_LINKS`, `FOOTER_LINKS`). The header
  in `src/components/SiteLayout.tsx` maps `NAV_LINKS` unconditionally. `sitemap[.]xml.ts` also
  consumes navigation — check it before changing the export shape.
- **Auth state** lives in `src/context/AuthContext.tsx` (re-exported via `src/hooks/useAuth.ts`).
  It currently exposes `user`, `session`, `loading` + auth methods. **It does NOT load the
  `profiles` row**, so `is_admin` and onboarding status are not available client-side yet.
- **Server functions** are `createServerFn` modules in `src/lib/api/*.functions.ts`
  (`entitlements`, `results`, `ebooks`, `payments`, plus `example`). Shared server helpers are
  `src/lib/api/_shared.ts` (`getAdminClient` = service-role client, `requireUser` = JWT verify).
  Server-only config is `src/lib/config.server.ts`.
- **Webhook** is a route handler at `src/routes/api/webhooks/razorpay.ts`; it imports
  `getAdminClient` from `@/lib/api/_shared`.
- **⚠️ SSR entry name clash:** `vite.config.ts` line 20 sets `tanstackStart({ server: { entry: "server" } })`,
  which resolves to `src/server.ts`. Creating a `src/server/` folder alongside `src/server.ts`
  is ambiguous and risky. **Phase 1 moves the entry into the folder** (`src/server/entry.ts`) and
  updates the vite config to `entry: "server/entry"`.
- **DB:** migrations `001`–`005` exist. `profiles` has `id, full_name, avatar_url, is_admin,
  timestamps`. Tables: `assessment_results`, `entitlements`, `ebooks`, `purchases`. `is_admin`
  and admin read-all RLS already exist (`004`). A profile row + free entitlement are
  auto-created by triggers on signup (`002`).
- **Dashboard** already exists (`src/routes/dashboard/{route,index,results,ebooks,settings}.tsx`)
  with a **client-side** guard (`if (!loading && !user) window.location.href = "/"`). We will
  reuse this pattern via a shared guard rather than server `beforeLoad` (session is client-held).

---

## 3. Data model — Migration `006_onboarding.sql`

Create `supabase/migrations/006_onboarding.sql`. Additive only, idempotent.

```sql
-- ═══════════════════════════════════════════════════════════════
-- CalmTree Onboarding — Migration 006
-- Adds onboarding fields to profiles to drive the gated funnel
-- and personalized dashboard.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed    BOOLEAN     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ,
  -- Product categories the user cares about (matches ProductCategory strings)
  ADD COLUMN IF NOT EXISTS focus_areas             TEXT[]      NOT NULL DEFAULT '{}',
  -- Free-text primary goal / intent captured in onboarding
  ADD COLUMN IF NOT EXISTS primary_goal            TEXT,
  -- Optional self-reported experience level: 'new' | 'some' | 'experienced'
  ADD COLUMN IF NOT EXISTS experience_level        TEXT;

-- No new RLS needed: existing "Users can update own profile" (002) and
-- "Admins can view all profiles" (004) already cover these columns.
```

> The existing UPDATE policy on `profiles` (migration 002) has no `WITH CHECK` clause — that is
> pre-existing and out of scope here; do not "fix" it in this pass unless asked.

**Apply:** run in Supabase SQL editor (or `supabase db push`). Verify columns exist before
building Phase 5.

---

## 4. Target folder structure

```
src/
  server/                       ← NEW: all server-only code
    entry.ts                    ← moved from src/server.ts (SSR fetch handler)
    supabase-admin.ts           ← getAdminClient()  (from _shared.ts)
    require-user.ts             ← requireUser()      (from _shared.ts)
    config.ts                   ← moved from lib/config.server.ts
    functions/
      entitlements.functions.ts ← moved from lib/api/
      results.functions.ts
      ebooks.functions.ts
      payments.functions.ts
      admin.functions.ts        ← NEW (admin read + ebook CRUD)
    webhooks/
      razorpay.ts               ← webhook business logic (pure fn), imported by route
  admin/                        ← NEW: admin-only UI (components, not routes)
    AdminLayout.tsx             ← sidebar shell + is_admin guard
    StatCard.tsx
    DataTable.tsx               ← thin wrapper over ui/table for admin lists
    EbookForm.tsx               ← create/edit ebook form
  routes/
    login.tsx                   ← NEW
    onboarding.tsx              ← NEW (or onboarding/route.tsx if multi-file)
    _authed/                    ← NEW pathless layout: guard for protected pages
      route.tsx                 ← RequireAuth + onboarding gate
      academy.tsx               ← moved from routes/academy.tsx
      resources.tsx             ← moved from routes/resources.tsx
      assessments/
        index.tsx               ← moved
        $slug.tsx               ← moved
    admin/                      ← NEW admin route tree
      route.tsx                 ← RequireAdmin layout (uses src/admin/AdminLayout)
      index.tsx                 ← overview stats
      users.tsx
      purchases.tsx
      results.tsx
      ebooks.tsx                ← ebook CRUD
    dashboard/ ...              ← unchanged location (already guarded)
    api/webhooks/razorpay.ts    ← thin route, imports src/server/webhooks/razorpay.ts
```

> **`_authed` pathless route:** In TanStack file routing, a leading underscore makes the segment
> pathless — URLs stay `/academy`, `/assessments`, etc. Moving the files under `_authed/` changes
> their location but **not** their public URL, and lets one `_authed/route.tsx` guard all of them.
> Regenerate the route tree (`routeTree.gen.ts`) after moving — the dev server / router plugin
> does this automatically; confirm no stale entries remain.

---

## 5. Phase 1 — Server folder refactor (do this first, isolated)

**Goal:** pure move/rename, zero behavior change. Land it green before touching features.

### Steps
1. **Move SSR entry:** `src/server.ts` → `src/server/entry.ts`. Update `vite.config.ts`:
   `tanstackStart({ server: { entry: "server/entry" } })`. Internal relative imports in the file
   (`./lib/error-capture`, `./lib/error-page`) become `../lib/error-capture`, `../lib/error-page`.
2. **Split `_shared.ts`:**
   - `src/server/supabase-admin.ts` → export `getAdminClient()`.
   - `src/server/require-user.ts` → export `requireUser()` (imports `getAdminClient`).
   - Delete `src/lib/api/_shared.ts` after updating importers. (Optionally leave a
     re-export shim for one commit, but prefer a clean move.)
3. **Move config:** `src/lib/config.server.ts` → `src/server/config.ts`. Update importers.
4. **Move function modules:** `src/lib/api/{entitlements,results,ebooks,payments}.functions.ts`
   → `src/server/functions/`. Update their internal import of `_shared` to
   `../supabase-admin` / `../require-user`. Move `example.functions.ts` too (or delete if unused —
   grep first).
5. **Extract webhook logic:** move the body of the POST handler into
   `src/server/webhooks/razorpay.ts` as an exported `handleRazorpayWebhook(request: Request): Promise<Response>`
   (plus the `verifySignature` helper). The route file `src/routes/api/webhooks/razorpay.ts`
   becomes a thin shell:
   ```ts
   import { createFileRoute } from "@tanstack/react-router";
   import { handleRazorpayWebhook } from "@/server/webhooks/razorpay";
   export const Route = createFileRoute("/api/webhooks/razorpay")({
     server: { handlers: { POST: ({ request }) => handleRazorpayWebhook(request) } },
   });
   ```
6. **Update every importer.** Grep and fix:
   - `@/lib/api/_shared` → `@/server/supabase-admin` or `@/server/require-user`
   - `@/lib/api/(entitlements|results|ebooks|payments).functions` → `@/server/functions/...`
   - `@/lib/config.server` → `@/server/config`
   Client components that import the `createServerFn` exports (e.g. `getActiveEbooks` in
   `routes/index.tsx`, dashboard pages, `RazorpayCheckoutButton`, `EmailGateForm`/newsletter)
   must point at the new paths.

### Verify Phase 1
- `npm run lint` clean, `npx tsc --noEmit` clean (no path exists? use `tsc -p tsconfig.json --noEmit`).
- `npm run dev` → app boots, SSR renders (confirm entry resolved, no "entry not found").
- `npm run build` succeeds (Nitro/Vercel output generated) — this is the real proof the SSR
  entry rename worked.
- Smoke: home page loads ebooks (exercises a moved server fn), a dashboard page loads results.
- **Commit** as an isolated refactor: `refactor: consolidate server-only code into src/server/`.

---

## 6. Phase 2 — Load profile into AuthContext

**Why:** nav gating, the onboarding gate, and the admin guard all need `is_admin` and
`onboarding_completed` client-side.

**File:** `src/context/AuthContext.tsx`

- Add a `profiles` fetch after the session resolves and on `SIGNED_IN`. Use the anon
  `supabase` client (RLS lets a user read their own profile).
- Extend `AuthContextValue`:
  ```ts
  interface Profile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    is_admin: boolean;
    onboarding_completed: boolean;
    focus_areas: string[];
    primary_goal: string | null;
    experience_level: string | null;
  }
  // added to context:
  profile: Profile | null;
  profileLoading: boolean;              // true until first profile fetch resolves
  refreshProfile: () => Promise<void>;  // call after onboarding / settings save
  ```
- Fetch: `supabase.from("profiles").select("*").eq("id", userId).single()`. On sign-out reset
  `profile` to `null`. Handle the null-`supabase` (unconfigured) case like the existing code.
- **Loading semantics matter for guards:** a guard must not redirect while auth or profile is
  still loading. Expose a combined `isReady = !loading && !profileLoading` (or have guards check
  both). Keep the initial `profileLoading = true` only while `user` exists and profile is pending.

### Verify Phase 2
- Log in → `profile` populates (check React devtools / a temporary log).
- `is_admin` reflects the DB value (set your account admin via the manual SQL step from `004`).
- No layout flash / premature redirect on refresh while logged in.

---

## 7. Phase 3 — Navigation gating

**File:** `src/data/navigation.ts`

Add an auth flag per link and split the header's source list. Keep `sitemap[.]xml.ts` working —
the sitemap should list only **publicly indexable** pages, so protected pages should be excluded
from it (verify current behavior and keep the sitemap public-only).

```ts
export interface NavLink {
  to: string;
  label: string;
  /** Only render this link when the user is authenticated + onboarded. */
  requiresAuth?: boolean;
  footerOnly?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/decode-your-mind", label: "Decode Your Mind" },
  { to: "/academy", label: "Academy", requiresAuth: true },
  { to: "/assessments", label: "Assessments", requiresAuth: true },
  { to: "/resources", label: "Resources", requiresAuth: true },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
```

**File:** `src/components/SiteLayout.tsx` (`Header`)
- Read `const { user, profile } = useAuth();`
- `const isAuthed = Boolean(user);` (gate on auth; onboarding gate is enforced by the route
  guard, so navbar can show the links as soon as the user is authenticated — simpler and avoids
  a "logged in but links missing" dead-end. Confirm this matches intent; if links must wait for
  onboarding too, use `Boolean(user) && profile?.onboarding_completed`).
- Filter: `const links = NAV_LINKS.filter(l => !l.requiresAuth || isAuthed);` — apply to both
  desktop and mobile nav maps.
- Consider adding a **Dashboard** link to the authed nav (or rely on the existing `UserMenu`
  dropdown, which already links to `/dashboard`). Recommend: keep Dashboard in `UserMenu` only,
  to avoid crowding.
- The "Start Your Journey" header button currently points at `/assessments`; leave it — the
  guard funnels anonymous clicks correctly.

**Footer:** `FOOTER_LINKS.explore` is derived from `NAV_LINKS` and currently lists the now-gated
pages. Decide: either keep them in the footer (they'll funnel through login — fine) or filter
`requiresAuth` out of the footer for logged-out users. Recommend **keep them visible** in the
footer (discoverability); the guard handles access.

### Verify Phase 3
- Logged out: navbar shows Home / Decode Your Mind / About / Contact + "Sign in". No Academy/
  Assessments/Resources.
- Logged in: all seven links show. Mobile menu matches. No hydration mismatch warning (the
  server render is logged-out; the client may flip to logged-in — acceptable, but watch console).

---

## 8. Phase 4 — Route protection (`_authed` layout) + `/login`

### 8a. `/login` route — `src/routes/login.tsx`
- Public route. Reuses the OTP flow (lift the form UI out of `AuthModal`/`EmailGateForm` into a
  shared `AuthForm` component, or render `AuthModal` content inline). Accept a `redirect` search
  param (validate it's a same-origin path starting with `/`; default `/dashboard`).
- On successful auth, `AuthContext` updates. A small effect in `/login` watches `user` +
  `profile`: if `!profile.onboarding_completed` → `navigate({ to: "/onboarding", search: { redirect } })`;
  else → `navigate({ to: redirect })`.
- If already authed + onboarded when visiting `/login`, immediately redirect to `redirect`.

### 8b. Pathless guard — `src/routes/_authed/route.tsx`
- Move `academy.tsx`, `resources.tsx`, `assessments/index.tsx`, `assessments/$slug.tsx` under
  `src/routes/_authed/`. URLs unchanged (pathless).
- The layout component:
  ```tsx
  function AuthedLayout() {
    const { user, loading, profile, profileLoading } = useAuth();
    const location = useLocation();
    if (loading || (user && profileLoading)) return <FullPageSpinner />;
    if (!user) {
      return <Navigate to="/login" search={{ redirect: location.pathname + location.search }} />;
    }
    if (profile && !profile.onboarding_completed) {
      return <Navigate to="/onboarding" search={{ redirect: location.pathname + location.search }} />;
    }
    return <Outlet />;
  }
  ```
  (Use TanStack's `Navigate` component or `useNavigate` in an effect — prefer `Navigate` for a
  declarative redirect without a flash. `useLocation`/`useNavigate` from `@tanstack/react-router`.)
- These pages already wrap themselves in `<SiteLayout>`; keep that. The `_authed` layout only
  guards — it renders `<Outlet/>`, not a second chrome.
- **Search param validation:** define the route's `validateSearch` for `redirect` (string,
  optional) on `/login` and `/onboarding` so TanStack passes it through typed.

### 8c. Keep dashboard guard consistent
- Optionally refactor `src/routes/dashboard/route.tsx` to reuse the same guard logic (extract a
  `useRequireAuth()` hook or a `<RequireAuth>` wrapper in `src/components/`), but this is a
  nice-to-have. At minimum, make dashboard also respect onboarding (a logged-in but not-onboarded
  user hitting `/dashboard` should go to `/onboarding`).

### Verify Phase 4
- Logged out → visit `/assessments` → redirected to `/login?redirect=/assessments`.
- Complete OTP → (first time) `/onboarding?redirect=/assessments` → finish → land on `/assessments`.
- Logged out → `/assessments/some-slug` deep link → after login+onboarding returns to that slug.
- Logged in + onboarded → all protected pages load directly, no redirect loop.
- `/decode-your-mind`, `/about`, `/contact` remain reachable logged out.

---

## 9. Phase 5 — Rich onboarding flow

**Route:** `src/routes/onboarding.tsx` (public route, but self-redirects: if no `user` →
`/login`; if already `onboarding_completed` → `redirect` target/`/dashboard`).

**UX (multi-step, single route with local step state):**
1. **Welcome + name** — confirm/enter `full_name` (prefill from `user_metadata.full_name`).
2. **Focus areas** — multi-select over the real `ProductCategory` values (source them from
   `src/data/assessments` category list, not hardcoded, so they stay in sync). Stored to
   `profiles.focus_areas`.
3. **Primary goal + experience** — short select for `experience_level` ('new'|'some'|
   'experienced') and a one-line `primary_goal` (free text or a few presets).
4. **Recommended first assessment** — compute from selected focus areas (map category →
   first matching assessment in `ASSESSMENT_LIST`). Show 1–3 recommended assessment cards with a
   "Start" CTA and a "Go to dashboard" secondary.

Use existing UI primitives: `ui/card`, `ui/button`, `ui/checkbox` or toggle chips, `ui/radio-group`,
`ui/input`, `ui/progress` for the step indicator. Match the calm green landing aesthetic
(`#2d4a3e` / `#3d6b56`, rounded-2xl cards). Reuse `PageHeader` pattern if helpful.

**Persistence — new server function** `src/server/functions/profile.functions.ts`:
```ts
export const completeOnboarding = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; fullName: string; focusAreas: string[];
                   primaryGoal: string | null; experienceLevel: string | null }) => d)
  .handler(async ({ data }) => {
    const userId = await requireUser(data.accessToken);
    const supabase = getAdminClient();
    const { error } = await supabase.from("profiles").update({
      full_name: data.fullName,
      focus_areas: data.focusAreas,
      primary_goal: data.primaryGoal,
      experience_level: data.experienceLevel,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq("id", userId);
    if (error) return { error: error.message };
    return { ok: true };
  });
```
- Client passes `session.access_token` (that's the `accessToken` pattern used everywhere).
- After success: `await refreshProfile()` (Phase 2) then navigate to `redirect ?? "/dashboard"`.
- Fire a PostHog event (`onboarding_completed`) — reuse the `trackEvent` pattern in `__root.tsx`
  or `posthog.capture` directly.
- Validate `focusAreas` server-side against the known `ProductCategory` set (reject unknown
  strings) — don't trust the client list.

### Verify Phase 5
- New user completes all steps → `profiles` row updated (check DB), `onboarding_completed=true`.
- Re-visiting `/onboarding` after completion redirects out (no loop).
- Refresh mid-onboarding keeps you on `/onboarding` (guard: user present, not completed).
- Recommended assessments reflect chosen focus areas.

---

## 10. Phase 6 — Personalized dashboard

**Files:** `src/routes/dashboard/index.tsx` (+ small helpers).

- Use `profile.full_name` for a personalized greeting; use `profile.focus_areas` to show a
  "Recommended for you" strip (assessments filtered by chosen categories) and `primary_goal`
  as a subtle header line.
- Keep existing dashboard sections (results, ebooks) — this phase is additive. Ensure the
  dashboard also honors the onboarding gate (redirect to `/onboarding` if somehow reached
  un-onboarded — see Phase 4c).
- Settings page (`dashboard/settings.tsx`): allow editing `focus_areas` / `primary_goal` /
  `full_name` reusing `completeOnboarding` or a dedicated `updateProfile` server fn +
  `refreshProfile()`.

### Verify Phase 6
- Dashboard greets by name, shows focus-area-based recommendations, results/ebooks still work.
- Editing focus areas in settings updates recommendations after `refreshProfile`.

---

## 11. Phase 7 — Admin folder + `/admin` route tree

### 11a. Admin server functions — `src/server/functions/admin.functions.ts`
All must (1) `requireUser(accessToken)` then (2) confirm `is_admin` before returning data.
Add a helper:
```ts
async function requireAdmin(accessToken: string): Promise<string> {
  const userId = await requireUser(accessToken);
  const supabase = getAdminClient();
  const { data, error } = await supabase.from("profiles")
    .select("is_admin").eq("id", userId).single();
  if (error || !data?.is_admin) throw new Error("Forbidden: admin access required.");
  return userId;
}
```
Server functions to expose:
- `getAdminOverview` → counts: total users, results (last 30d), purchases + revenue sum, active
  ebooks. (Use `getAdminClient` service role — bypasses RLS; the `requireAdmin` check is the gate.)
- `listUsers({ page, search })` → paginated profiles join (id, full_name, email via
  `auth.admin.listUsers` or a profiles+email view), created_at, is_admin, onboarding_completed.
- `listPurchases({ page })` → purchases with user + product info.
- `listResults({ page, userId? })` → assessment_results (read-only).
- **Ebook CRUD:** `createEbook`, `updateEbook`, `deleteEbook`, `listAllEbooks` (incl. inactive),
  and a signed-upload helper if covers/PDFs go to Supabase Storage (`getEbookUploadUrl`).
  Match the existing `ebooks` table shape (see `003_commerce.sql` / `ebooks.functions.ts`).

> Security note: since these use the service-role client, the `requireAdmin` guard is the ONLY
> thing standing between a normal user and all data. Guard **every** admin function. Add a unit
> smoke test or a manual check that a non-admin token gets `Forbidden`.

### 11b. Admin UI — `src/admin/`
- `AdminLayout.tsx` — dark sidebar shell (mirror the dashboard sidebar style, distinct accent),
  nav: Overview · Users · Purchases · Results · Ebooks. Includes the client-side admin guard:
  `if (!loading && (!user || !profile?.is_admin)) redirect to "/"` (and while loading show spinner).
- `StatCard.tsx`, `DataTable.tsx` (wrap `ui/table` + `ui/pagination`), `EbookForm.tsx`
  (create/edit, uses `ui/form`, `ui/input`, `ui/textarea`, `ui/switch` for active flag).

### 11c. Admin routes — `src/routes/admin/`
- `route.tsx` → renders `<AdminLayout>` with the admin guard + `<Outlet/>`.
- `index.tsx` → overview (StatCards from `getAdminOverview`).
- `users.tsx`, `purchases.tsx`, `results.tsx` → DataTable + pagination + TanStack Query.
- `ebooks.tsx` → list + create/edit/delete via `EbookForm` and the CRUD server fns; optimistic
  or invalidate-on-success with React Query.
- Add an **Admin** entry to `UserMenu` dropdown, shown only when `profile?.is_admin`.

### Verify Phase 7
- Non-admin visiting `/admin` → redirected to `/`. Admin functions reject non-admin tokens.
- Admin sees overview numbers matching DB, can list users/purchases/results.
- Admin can create → edit → deactivate/delete an ebook; the change reflects on `/resources`
  and the landing ebooks strip.

---

## 12. Cross-cutting checks

- **Route tree regen:** after every route move/add, ensure `routeTree.gen.ts` is regenerated
  (dev server does it). Commit the regenerated file if it's tracked.
- **`tsconfig` path alias:** `@/*` → `src/*` already; new folders need no config change.
- **No secrets client-side:** admin/service-role logic stays in `src/server/**` only. Never
  import `getAdminClient` from a client component.
- **PostHog events:** add `onboarding_completed`; keep existing typed `trackEvent` union in
  `__root.tsx` updated if you route it through there.
- **Hydration:** guards render on client after auth resolves; ensure the initial SSR render (no
  session) and the client render converge without throwing. Prefer a spinner while `loading`.
- **`example.functions.ts`:** grep usages; if unused, delete rather than move.

---

## 13. Suggested commit / PR sequence

1. `refactor: move server-only code into src/server/ (entry, helpers, functions, webhook)` — Phase 1
2. `feat(auth): load profile (is_admin, onboarding) into AuthContext` — Phase 2
3. `feat(nav): gate Academy/Assessments/Resources behind auth` — Phase 3
4. `feat(auth): add /login + _authed route guard with redirect-back` — Phase 4
5. `feat(onboarding): rich multi-step onboarding + migration 006` — Phase 5 (+ run migration)
6. `feat(dashboard): personalize using onboarding focus areas` — Phase 6
7. `feat(admin): admin route tree, guards, read dashboards + ebook CRUD` — Phase 7

Each phase is independently verifiable — land them in order, keeping the app green at every step.

---

## 14. Open items for Chirag (non-blocking)

- Should the gated nav links wait for **onboarding complete** (not just login) before showing?
  Plan currently shows them on login; guard still enforces onboarding. Flip one boolean in
  `SiteLayout` if you want the stricter behavior.
- `/login` as a full page vs. keeping the modal for logged-in-triggered flows — plan adds the
  page for deep-link redirects; the modal in `UserMenu` can stay for casual sign-in.
- Ebook file storage: confirm covers/PDFs live in Supabase Storage (affects the upload helper in
  11a). Check `003_commerce.sql` for the `ebooks` columns before building `EbookForm`.
```
