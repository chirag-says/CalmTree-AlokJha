# CalmTree B2B — staging for the org & admin apps

The DB migration (`009_b2b_enterprise.sql`) lives in the **client repo** (canonical
home for all Supabase migrations) and applies to the **shared** Supabase project.
Run it once; both other apps read the same tables.

These files belong to the **other two apps**, which aren't on this machine. Drop them
in when those repos are available.

## Where each file goes

### org.calmtree.in (clone of admin app)
| Staged file | Destination in org app |
|---|---|
| `shared/invite-token.ts` | `src/server/b2b/invite-token.ts` |
| `org-app/authz.ts` | `src/server/b2b/authz.ts` |
| `org-app/email-resend.ts` | `src/server/email/resend.ts` |
| `org-app/org.functions.ts` | `src/server/functions/org.functions.ts` |
| `org-app/campaigns.functions.ts` | `src/server/functions/campaigns.functions.ts` |

The org app also needs the **dashboard UI** (routes) — build after the repo exists:
- `/` — org home: pick org (if user is in several), show credit balance, campaign list
- `/campaigns/new` — create + launch a campaign (assessment picker, email list, closes_at)
- `/campaigns/:id` — live tracking (sent / opened / completed) + aggregate report
- `/credits` — ledger history

### admin.calmtree.in (existing app)
| Staged file | Destination in admin app |
|---|---|
| `shared/invite-token.ts` | not needed |
| `admin-app/authz.ts` | `src/server/b2b/authz.ts` (only `isPlatformAdmin`) |
| `admin-app/admin-org.functions.ts` | `src/server/functions/admin-org.functions.ts` |

Admin UI to add: a "Companies" section — create org, attach owner (by user id),
grant credits after payment, toggle individual-results unlock.

## Shared server helpers each app must already have
Both apps are "TanStack Start + Supabase". These files assume the same helpers the
client app has:
- `src/server/supabase-admin.ts` → `getAdminClient()` (service-role client)
- `src/server/require-user.ts` → `requireUser(accessToken)` (verifies JWT → userId)

If the admin/org clone lacks them, copy from the client repo verbatim.

## Env vars
Shared Supabase (both apps): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

Org app only (email + links):
- `RESEND_API_KEY` — Resend key. Unset ⇒ email is a graceful no-op (demo).
- `EMAIL_FROM` — e.g. `CalmTree <noreply@mail.calmtree.in>`. Until a domain is
  verified in Resend, delivery is limited to the account owner's address.
- `PUBLIC_SITE_URL` — base of the CLIENT app, e.g. `https://calmtree.in`.
  Invite links are `${PUBLIC_SITE_URL}/a/<token>` → the client employee runner.

## Demo email limits (Resend free)
~100/day, 3,000/month, and pre-domain-verification only to your own address.
Keep campaign sizes tiny until the client buys a plan + verifies `mail.calmtree.in`.
