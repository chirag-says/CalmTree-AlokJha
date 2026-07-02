# CalmTree — Deploying the two apps

CalmTree is **two separate apps** in one repo, both TanStack Start, sharing **one Supabase project**:

| App | Folder | Domain | What it is |
|-----|--------|--------|------------|
| Client | repo root | `calmtree.in` | Public website + user experience |
| Admin  | `admin/`  | `admin.calmtree.in` | Admin-only operations dashboard |

Each deploys independently. Local dev: client on `:8080`, admin on `:8081`
(`cd admin && npm run dev -- --port 8081`).

---

## 1. Supabase (shared — do once)
- One project serves both apps. Apply migrations `001`–`008` (Supabase SQL editor or
  `supabase db push`). **Confirm `007` is applied** (fixes RLS recursion on `profiles`).
- Make an admin: `UPDATE public.profiles SET is_admin = true WHERE id = '<your-user-uuid>';`
- **Auth → URL Configuration:** add both origins to *Site URL* / *Redirect URLs*:
  `https://calmtree.in`, `https://admin.calmtree.in` (and your local `http://localhost:8080`,
  `http://localhost:8081` for dev).

## 2. Client → Vercel project A
- New Vercel project, **Root Directory = repo root** (`.`). Framework auto-detected
  (TanStack Start / Nitro → Vercel preset is already configured in `vite.config.ts`).
- Env vars (from `.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
  `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`,
  `RAZORPAY_WEBHOOK_SECRET`, `CLOUDINARY_*`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`,
  `VITE_ADMIN_URL=https://admin.calmtree.in`, `VITE_SITE_URL=https://calmtree.in`.
- Attach domain **calmtree.in** (+ `www` redirect).
- **Razorpay webhook:** point it at `https://calmtree.in/api/webhooks/razorpay` (payments live in
  the client app). Set the same `RAZORPAY_WEBHOOK_SECRET` here.

## 3. Admin → Vercel project B
- New Vercel project, **Root Directory = `admin`**. Same framework auto-detect.
- Env vars (from `admin/.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
  `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `CLOUDINARY_CLOUD_NAME` /
  `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` (required — ebook PDF/cover uploads).
- Attach subdomain **admin.calmtree.in** (add the DNS record Vercel shows for the `admin` host).

## 4. Verify after deploy
- `calmtree.in`: logged-out visitor → nav hides Academy/Assessments/Resources; login → onboarding
  → dashboard; a Razorpay **test** purchase → webhook grants access → ebook shows in dashboard.
- `admin.calmtree.in`: a non-admin who signs in sees **"Not authorized"**; an `is_admin` account
  sees the overview, users, purchases, results, and can manage ebooks. An ebook set to **active**
  appears on `calmtree.in`; a **draft** does not.

---

## Notes
- **Secrets live only in server-only env vars** (no `VITE_` prefix): `SUPABASE_SERVICE_ROLE_KEY`,
  `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `CLOUDINARY_API_SECRET`. TanStack Start never
  ships these to the browser.
- Both apps have their **own** `node_modules` and `.env`. The root `.gitignore` covers `admin/`
  recursively (node_modules, .env, .vercel, .tanstack are all ignored).
- The admin app is `noindex` and has no public pages — its `/` redirects to `/admin`, which is
  gated by `RequireAdmin` (`is_admin` check, enforced again on every admin server function).
