# CalmTree — Splitting Into 3 Separately-Hosted Apps

**For:** Chirag (new to this stack — this plan keeps everything you already use)
**Stack (unchanged):** TanStack Start + Supabase everywhere. No Express, no MongoDB.
**Goal:** Take the ONE app you have now and split it into THREE folders you can host separately,
the same way DealDirect has `backend` / `client` / `admin`.

---

## 1. The big picture (read this first)

Right now you have **one** app that does three jobs. We're separating those three jobs into
three folders. **We are not rewriting anything — we are moving files that already exist and
adding a bit of "phone wiring" so the folders can talk to each other over the internet.**

```
        BEFORE (one app)                     AFTER (three apps, hosted separately)

   ┌───────────────────────┐           ┌───────────┐   ┌───────────┐
   │  CalmTree (one thing)  │           │  client   │   │   admin   │
   │  • website             │           │ (website) │   │  (panel)  │
   │  • admin panel         │           └─────┬─────┘   └─────┬─────┘
   │  • server code         │                 │  calls over HTTP │
   └───────────────────────┘                 └────────┬────────┘
                                                       ▼
                                                ┌────────────┐
                                                │  backend   │  ← holds the secret keys
                                                │  (server)  │
                                                └─────┬──────┘
                                                      ▼
                                                ┌──────────┐
                                                │ Supabase │  ← same database as today
                                                └──────────┘
```

**The three folders map to things that already exist in your project:**

| What you have today                         | New home    | What it is                         |
|---------------------------------------------|-------------|-------------------------------------|
| `src/server/*`                              | `backend/`  | The server (holds secret keys)      |
| `src/admin/*` + `src/routes/admin/*`        | `admin/`    | The admin panel                     |
| Everything else (landing, assessments, dashboard, login, onboarding) | `client/` | The public website |

All three keep using the **same Supabase project** (same login, same database). You do not
migrate any data.

---

## 2. What each app does (and how they talk)

### `client/` — the website (calmtree.com)
- Everything a normal visitor/user sees: landing page, Decode Your Mind, About, Contact,
  Assessments, Academy, Resources, Login, Onboarding, and the user Dashboard.
- **Login stays exactly as it is today**: Supabase sends the 6-digit code by email, the browser
  keeps the session (this is client-side and does not change).
- When it needs data or an action that touches money/secrets, it **calls `backend/` over HTTP**
  instead of calling its own built-in server code.

### `admin/` — the admin panel (admin.calmtree.com)
- Only for you / staff. Overview stats, users, purchases, results, ebook add/edit/delete.
- Same Supabase login, but only lets in accounts where `is_admin = true`.
- Also **calls `backend/` over HTTP** for its data.

### `backend/` — the server (api.calmtree.com)
- The ONLY place that holds the **secret keys**: the Supabase *service-role* key and the
  Razorpay secret. Nothing secret ever lives in `client/` or `admin/`.
- Exposes simple web addresses (endpoints) like `POST /api/results/mine`,
  `POST /api/admin/overview`, `POST /api/payments/razorpay/order`, etc.
- Checks the caller's login token on every protected endpoint, and checks `is_admin` on admin
  endpoints.

### How they talk — the one new idea (it's simple)
1. User logs in on `client/` (or `admin/`). Supabase gives the browser an **access token**
   (a long string that proves who they are).
2. When `client/`/`admin/` calls `backend/`, it sends that token in the request header:
   `Authorization: Bearer <token>`.
3. `backend/` asks Supabase "is this token valid, and who is it?" (this is your existing
   `requireUser` function — unchanged), then does the work and returns JSON.

That's the whole architecture. Everything below is just steps to get there.

---

## 3. Repo & folder layout (one repo, three folders)

Keep it all in this same git repo. Move today's app into `client/`, then create `backend/` and
`admin/` beside it.

```
CalmTree Discover/                (git repo root)
├── client/                       ← today's app moves here (minus admin + server)
│   ├── src/
│   │   ├── routes/               (landing, assessments, dashboard, login, onboarding, _authed)
│   │   ├── components/  data/  context/  hooks/  lib/
│   │   └── lib/api/apiClient.ts  ← NEW: tiny helper that calls the backend
│   ├── package.json  vite.config.ts  .env
│
├── admin/                        ← the admin panel as its own app
│   ├── src/
│   │   ├── routes/               (admin/index, users, purchases, results, ebooks)
│   │   ├── components/           (AdminLayout + admin UI, copied from src/admin)
│   │   ├── context/ AuthContext  (reused: Supabase login + is_admin check)
│   │   └── lib/api/apiClient.ts  ← NEW: same helper, points at backend
│   ├── package.json  vite.config.ts  .env
│
├── backend/                      ← the server (API only, no pages)
│   ├── src/
│   │   ├── routes/api/           (every endpoint — see the list in §5)
│   │   ├── lib/ (supabase-admin, require-user, require-admin, cors, config)
│   │   └── webhooks/razorpay.ts
│   ├── package.json  vite.config.ts  .env   ← ONLY this .env has secret keys
│
├── supabase/migrations/          ← stays at root, shared by all (source of truth for DB)
└── plans/                        ← this file
```

Each folder has its **own** `package.json` and `.env`, and gets deployed **on its own**.
The `supabase/migrations` folder stays at the root as the single record of your database shape.

> Tip: because all three are TanStack Start, the three `package.json` / `vite.config.ts` files
> look almost identical to your current one. You are copying a setup you already have, 3×.

---

## 4. The shared "phone line": one tiny API client

Both `client/` and `admin/` need the same small helper to call the backend. Create it in each:
`src/lib/api/apiClient.ts`.

```ts
import { supabase } from "@/lib/supabase";

const BASE = import.meta.env.VITE_BACKEND_URL; // e.g. https://api.calmtree.com

/** Calls the backend. Attaches the logged-in user's token automatically. */
export async function api<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const { data } = await supabase!.auth.getSession();
  const token = data.session?.access_token;

  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}
```

**Every place that used to `import { getMyResults } from "@/server/functions/..."` and call it**
now calls `api("/api/results/mine")` instead. Same data, different phone line.

Call sites to switch in `client/` (search for imports from `@/server/functions` and the old
`@/lib/api/*.functions`):
- `src/routes/index.tsx` → `getActiveEbooks` → `api("/api/ebooks/active")`
- `src/routes/dashboard/results.tsx`, `dashboard/ebooks.tsx`, `dashboard/index.tsx`
- `src/routes/onboarding.tsx` → `completeOnboarding` → `api("/api/profile/onboarding")`
- `src/components/payments/RazorpayCheckoutButton.tsx` → order + verify endpoints
- `src/components/assessment/*` where results are saved → `api("/api/results/save")`
- newsletter/email capture if it hits the server

Call sites to switch in `admin/`: every admin page uses the `/api/admin/*` endpoints via `api(...)`.

---

## 5. `backend/` — the endpoint list (one per existing function)

Your current server functions become plain web addresses. **The logic inside barely changes** —
you keep `getAdminClient`, `requireUser`, `requireAdmin`, and the Razorpay/Supabase code exactly
as written; you only change *how they're called* (an HTTP route wrapper instead of
`createServerFn`).

**Public (no login needed):**
| Endpoint | From today's function |
|---|---|
| `POST /api/ebooks/active` | `getActiveEbooks` |
| `POST /api/webhooks/razorpay` | the Razorpay webhook (already a route) |

**Logged-in user (needs Bearer token):**
| Endpoint | From |
|---|---|
| `POST /api/entitlements/mine` | `getMyEntitlements` |
| `POST /api/results/save` | `saveAssessmentResult` |
| `POST /api/results/mine` | `getMyResults` |
| `POST /api/ebooks/purchased` | `getMyPurchasedEbookIds` |
| `POST /api/ebooks/download` | `getEbookDownloadUrl` |
| `POST /api/payments/razorpay/order` | `createRazorpayOrder` |
| `POST /api/payments/razorpay/verify` | `verifyRazorpayPayment` |
| `POST /api/profile/onboarding` | `completeOnboarding` |

**Admin only (needs Bearer token + `is_admin`):**
| Endpoint | From |
|---|---|
| `POST /api/admin/overview` | `getAdminOverview` |
| `POST /api/admin/users` | `listUsers` |
| `POST /api/admin/purchases` | `listPurchases` |
| `POST /api/admin/results` | `listResults` |
| `POST /api/admin/ebooks` | `listAllEbooks` |
| `POST /api/admin/ebooks/create` | `createEbook` |
| `POST /api/admin/ebooks/update` | `updateEbook` |
| `POST /api/admin/ebooks/delete` | `deleteEbook` |

### Two small helpers the backend needs

**1. Read the token from the header** (instead of from the request body). Update `require-user.ts`
to accept a `Request` and pull the header:
```ts
export function getBearerToken(request: Request): string {
  const h = request.headers.get("authorization") ?? "";
  return h.startsWith("Bearer ") ? h.slice(7) : "";
}
// requireUser(token) stays exactly as it is today (verifies with Supabase).
```

**2. Allow the other two apps to call it (CORS).** Because `client/` and `admin/` live on
different web addresses, the browser blocks calls unless the backend says "these origins are
allowed." Add a small wrapper used by every route:
```ts
const ALLOWED = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean);

export function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED.includes(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}
```
Each API route: answer `OPTIONS` with these headers (the browser's pre-check), and add the same
headers to the real `POST` response.

### What a backend route looks like (example: `/api/results/mine`)
```ts
import { createFileRoute } from "@tanstack/react-router";
import { getAdminClient } from "@/lib/supabase-admin";
import { requireUser, getBearerToken } from "@/lib/require-user";
import { corsHeaders } from "@/lib/cors";

export const Route = createFileRoute("/api/results/mine")({
  server: {
    handlers: {
      OPTIONS: ({ request }) =>
        new Response(null, { headers: corsHeaders(request.headers.get("origin")) }),
      POST: async ({ request }) => {
        const cors = corsHeaders(request.headers.get("origin"));
        try {
          const userId = await requireUser(getBearerToken(request));
          const supabase = getAdminClient();
          const { data } = await supabase
            .from("assessment_results").select("*")
            .eq("user_id", userId).order("completed_at", { ascending: false });
          return Response.json({ results: data ?? [] }, { headers: cors });
        } catch {
          return Response.json({ error: "Unauthorized" }, { status: 401, headers: cors });
        }
      },
    },
  },
});
```
Every other endpoint follows this same shape. Admin endpoints call `requireAdmin(...)` instead
of `requireUser(...)` (that helper already exists in your `admin.functions.ts`).

---

## 6. Environment variables per app (who holds what)

**`backend/.env` — the ONLY place with secrets:**
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...        ← secret, backend only
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...              ← secret, backend only
RAZORPAY_WEBHOOK_SECRET=...          ← secret, backend only
CLIENT_URL=https://calmtree.com      ← for CORS
ADMIN_URL=https://admin.calmtree.com ← for CORS
```

**`client/.env` — only public values:**
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...           ← public, safe in browser
VITE_BACKEND_URL=https://api.calmtree.com
VITE_RAZORPAY_KEY_ID=...             ← public key id only (not the secret)
VITE_POSTHOG_KEY=...  VITE_POSTHOG_HOST=...
```

**`admin/.env` — same shape as client:**
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BACKEND_URL=https://api.calmtree.com
```

> Golden rule: if a key is named `VITE_...` it ends up in the browser — never put a secret there.
> Secrets live only in `backend/.env`.

---

## 7. Step-by-step build order

Do these **in order**, and test after each. Keep the current app working in `client/` the whole
time; the backend just gets carved out first.

### Phase A — Create `backend/`
1. Make the `backend/` folder. Copy your current `package.json` + `vite.config.ts` in and trim
   the frontend bits (you can start by copying the whole config and removing page-only plugins
   later — getting it to boot matters more than trimming).
2. Move `src/server/supabase-admin.ts`, `require-user.ts`, `config.ts` → `backend/src/lib/`.
3. Move `src/server/webhooks/razorpay.ts` → `backend/src/webhooks/`.
4. For each function in `src/server/functions/*`, create the matching API route file under
   `backend/src/routes/api/...` (list in §5). Paste the function body into the `POST` handler,
   read the token from the header, add CORS. Delete the `accessToken`-in-body input; use the
   header instead.
5. Add `getBearerToken` and the `corsHeaders` helper (§5).
6. Put secrets in `backend/.env`.
7. **Test locally:** run backend on a port (say 3001). Use a REST tool (or browser) to hit
   `POST /api/ebooks/active` — you should get JSON back. Hit an authed endpoint with a real
   token to confirm auth works.

### Phase B — Point `client/` at the backend
1. Move today's app into `client/` (everything except `src/server`, `src/admin`,
   `src/routes/admin`). Delete `src/server` and `src/routes/admin` from client.
2. Add `client/src/lib/api/apiClient.ts` (§4).
3. Replace every `import ... from "@/server/functions/..."` (and old `@/lib/api/*.functions`)
   call with an `api("/api/...")` call (§4 list).
4. Add `VITE_BACKEND_URL` to `client/.env`.
5. **Test the full flow locally** (backend on 3001, client on 8080): log in → onboarding →
   dashboard shows results → buy an ebook (Razorpay test) → webhook grants access. This is where
   you'll fix the "broken flow" (see §9).

### Phase C — Create `admin/`
1. New `admin/` folder, same TanStack Start setup.
2. Bring over `src/admin/*` (AdminLayout etc.) and `src/routes/admin/*` (index, users, purchases,
   results, ebooks). Bring a copy of `AuthContext`, `supabase.ts`, and the UI components the admin
   pages use (`components/ui/*` — copy the ones actually imported).
3. Add `admin/src/lib/api/apiClient.ts` and switch admin pages to call `/api/admin/*`.
4. Keep the admin login gate: on load, log in via Supabase, then check `is_admin` (the backend
   also enforces it, so this is just for a nicer UX / hiding the UI).
5. Add `VITE_BACKEND_URL` to `admin/.env`.
6. **Test:** a normal user can't get in; an `is_admin` user sees stats and can add/edit an ebook,
   and that ebook then shows on the client website's Resources page.

### Phase D — Deploy (each app on its own)
- `client/` → Vercel (it's SSR, good for SEO). Set its env vars in Vercel.
- `admin/` → Vercel (or any host). Set env vars.
- `backend/` → its own host (Vercel works; Railway/Render also fine). Set the secret env vars +
  `CLIENT_URL`/`ADMIN_URL` to the real deployed URLs so CORS allows them.
- Point Razorpay's webhook setting at `https://api.calmtree.com/api/webhooks/razorpay`.

---

## 8. Database (no change needed)
- Keep using your existing Supabase project and the `supabase/migrations` at the repo root.
- Migrations `006` (onboarding) and `007` (RLS recursion fix) should already be applied — confirm
  in the Supabase dashboard. If you see "infinite recursion" errors anywhere, `007` isn't applied.
- The backend uses the **service-role** key (bypasses RLS) for its work; RLS still protects any
  direct Supabase reads the client makes for the logged-in user's own data.

---

## 9. Fixing the "broken flow" (do this during Phase B testing)

You said the flow is currently broken. The most likely culprits, in order — check each while
testing the login → onboarding → dashboard path:

1. **RLS recursion** — if the profile won't load or admin reads error out, migration `007` isn't
   applied. Apply it. (Its whole job is fixing the `profiles` admin policy loop.)
2. **Profile not loading in `AuthContext`** — the guard in `_authed/route.tsx` waits for `profile`
   before deciding. If `profileLoading` never turns false (e.g. the profile fetch errors), the app
   is stuck on the spinner or bounces to `/login`. Make the profile fetch handle errors and always
   clear `profileLoading`.
3. **Onboarding redirect loop** — `/onboarding` must send the user OUT once
   `onboarding_completed` is true, and `_authed` must send them TO `/onboarding` when it's false.
   If the flag never gets written (backend call failing), you loop forever. Verify
   `POST /api/profile/onboarding` actually updates the row and the client calls `refreshProfile()`
   after.
4. **Redirect target** — after login, `?redirect=` should send the user back where they came from.
   Make sure the login page reads it and that it defaults to `/dashboard`.

Fix these as you wire the client to the backend — a broken call is easier to see once it's an
explicit HTTP request in the browser's Network tab.

---

## 10. Quick recap (so it's not overwhelming)

- **Same stack.** TanStack Start + Supabase, three times.
- **Three folders**, each hosted on its own: `client` (website), `admin` (panel), `backend` (server).
- **The only new idea:** the website/admin now *call* the backend over HTTP with the user's login
  token, instead of running server code inside themselves.
- **Secrets live only in `backend`.**
- **Build order:** backend first → point client at it (fix the flow here) → admin last → deploy.

Take it one phase at a time. After Phase A you have a working API. After Phase B you have your
whole website working again, just talking to a real backend. Phase C is the admin. Nothing here
throws away work you've already done — it's mostly moving files and swapping function calls for
`api("/api/...")` calls.
