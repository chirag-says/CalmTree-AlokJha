# Phase 1 — Corporate Workplace Effectiveness Score (WES): Technical Spec

**Goal of Phase 1:** Prove the *measurement loop* — **Assess → Measure** — that the whole
corporate pitch rests on. A company runs the six-assessment battery across its employees, we
produce a confidential per-employee report and an **anonymous org score across 6 dimensions**,
then re-measure at the end of a 30–45 day window and show the **change**.

Micro-learning, journals, weekly challenges, gamification, and per-programme coaching content
are **Phase 2–4**. Phase 1 is what makes the ₹1–2L pilot sellable: a real before/after number.

---

## Client decisions (locked)

1. **Six separate assessments** — one standard 10-question assessment per dimension (not one
   combined survey). Employees complete all six from a single program landing page.
2. **Credit-based billing stays** — funded through the existing `credit_ledger` /
   `spend_org_credits`. No new billing system. A wave reserves credits exactly like campaigns.
3. **All three programmes** — Productivity Accelerator, Manager Effectiveness, Better Teams are
   all selectable at program creation. They share the **same six-dimension WES battery**; in
   Phase 1 the programme type is a label + a set of *focus dimensions* it spotlights.
   Differentiated coaching content is Phase 2.
4. **No hardcoded scoring** — already satisfied; `scoreStandard` reads `config.scoring.min/max`.

### Consequences to price/communicate (honest flags)

- **Credit cost multiplier.** Six assessments × two waves = **up to 12 credits per employee**
  for a full before/after program (1 credit = 1 assessment delivered to 1 person, unchanged
  unit). A 100-employee pilot ≈ 1,200 credits. The client must price the pilot against that.
- **Good news from the participant model (below):** because one participant is linked across
  their six assessments, we **can** show the unified per-employee personal report *in Phase 1*,
  and compute a true person-level baseline→follow-up delta (still shown to the employer as
  aggregate-only). This is a capability the pure one-shot campaign model could not give.

---

## 1. The battery: six assessments = six dimensions

Six standard 10-question assessments, each mapping to exactly one WES dimension. Each
assessment's headline `percentage` (0–100) is that dimension's score. **Every dimension is
oriented higher = better** — author reverse flags so Sustainability/strain items read
"higher = healthier."

| Slug | Dimension | Measures |
|------|-----------|----------|
| `workplace-clarity`        | Clarity        | Understanding of priorities and responsibilities |
| `workplace-productivity`   | Productivity   | Focus, resources and ability to execute |
| `workplace-management`     | Management     | Direction, support and feedback from managers |
| `workplace-collaboration`  | Collaboration  | Communication and teamwork |
| `workplace-accountability` | Accountability | Ownership and follow-through |
| `workplace-sustainability` | Sustainability | Workload, energy and adaptability |

**Registry separation.** These live in `src/data/corporate/` in their own `WES_BATTERY`
registry — **not** in the B2C `ASSESSMENT_LIST` — so they never leak into the consumer catalog
or the existing `b2b-assessment-catalog`. The scoring engine (`scoreAssessment`) is generic and
scores any `AssessmentConfig` regardless of which registry it came from. Content authoring
(wording, reverse-coding) is validated by CalmTree's psychology author; we ship the skeleton +
dimension ids + scoring semantics.

---

## 2. Identity & privacy — the participant model, credit-funded

The measurement loop needs the *same person* to (a) complete six linked assessments and
(b) return for a follow-up wave. That requires a **persistent participant** — but still **no
auth account** in Phase 1, and still **anonymous to the employer**.

- A `program_participant` is stable for the life of the program; its token is re-mintable per
  wave (same pattern as `sendReminders`). One token → one landing page → six assessments.
- Credits fund it: launching a wave reserves `6 × participants` credits via
  `spend_org_credits`; uncompleted invitations are refunded at wave close (existing pattern).
- Employer sees **aggregates only** — matching the client's explicit promise. No individual
  WES is ever returned. We do **not** build the individual-unlock add-on here.

Full employee accounts (needed for journals/gamification/consistency) arrive in Phase 2 as a
clean upsell ("create an account to keep your report"), not a Phase 1 dependency.

---

## 3. Scoring math

Each completed assessment yields a `percentage` (0–100, higher = better) via the existing
`scoreStandard`.

- **Per participant per wave:** their WES = `round(mean of their six assessment percentages)`
  (computed over completed assessments; a wave counts for a participant only when all six —
  or a defined minimum — are done). Drives the unified personal report.
- **Org WES per wave:** for each of the six dimensions, average the percentage across
  participants who completed it; `WES = round(mean of the six dimension averages)`. Equal
  weights in v1, stored as data so they're tunable without code change.
- **Composite bands (employer headline, tunable):**
  `0–39 Needs Attention · 40–59 Developing · 60–74 Healthy · 75–100 Thriving`.
- **Delta:** `followup − baseline`, on the composite and per-dimension, shown only when **both**
  waves clear the privacy floor.
- **Top-3 strengths / barriers:** highest / lowest three dimension averages.
- **Department trends:** shown only where a department has **≥ 10** completions in the wave
  (client's rule — stricter than the org-wide `min_aggregate_group_size` default of 5; enforce
  both, each at its own level).

---

## 4. Data model — migration `011_corporate_programs.sql` (additive, reversible)

Reuses 009's helpers (`is_org_admin`, token hashing, credit ledger, privacy floor). The credit
system and standalone campaigns are **untouched**. Rollback = `DROP` the three new tables.

```sql
-- One org's running of the six-assessment battery over a measurement window.
CREATE TABLE public.programs (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id           UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  programme_type   TEXT NOT NULL DEFAULT 'productivity', -- 'productivity'|'manager'|'teams'
  min_group_size   INTEGER NOT NULL DEFAULT 5,           -- privacy floor for this program
  -- lifecycle: draft → baseline_active → baseline_closed → followup_active → closed
  status           TEXT NOT NULL DEFAULT 'draft',
  baseline_opened_at TIMESTAMPTZ, baseline_closed_at TIMESTAMPTZ,
  followup_opened_at TIMESTAMPTZ, closed_at TIMESTAMPTZ,
  created_by       UUID,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- Persistent participant. Anonymous to the employer. Token re-mintable per wave.
CREATE TABLE public.program_participants (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id   UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  org_id       UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email        TEXT NOT NULL,
  department   TEXT,                       -- optional; drives dept trends (≥10 rule)
  token_hash   TEXT NOT NULL UNIQUE,       -- SHA-256 of current raw token (email only)
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (program_id, email)
);

-- One scored response per participant per wave per assessment. Org-owned. No user-facing RLS.
CREATE TABLE public.program_responses (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id       UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  org_id           UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  participant_id   UUID NOT NULL REFERENCES public.program_participants(id) ON DELETE CASCADE,
  wave             TEXT NOT NULL,          -- 'baseline' | 'followup'
  assessment_slug  TEXT NOT NULL,          -- one of the six battery slugs
  dimension_scores JSONB,                  -- the assessment's internal sub-dimensions
  percentage       INTEGER NOT NULL,       -- this assessment's 0–100 score = its WES dimension
  answers          JSONB NOT NULL,
  completed_at     TIMESTAMPTZ DEFAULT now(),
  UNIQUE (participant_id, wave, assessment_slug)   -- idempotency
);

-- RLS mirrors 009: programs readable by members; participants & responses have NO user-facing
-- policy (PII + individual scores) — all reads go through server functions enforcing
-- aggregate-only + min-group. Platform-admin read for support only.
-- Indexes: program_responses(program_id, wave), (program_id, assessment_slug, wave),
--          program_participants(program_id), program_participants(org_id).
```

**Credit funding:** launching a wave calls `spend_org_credits(org, 6 × participantCount, ...)`
tagged to the program; uncompleted at close are refunded. Same ledger, same atomicity.

---

## 5. Lifecycle / state machine

```
draft ──addParticipants──▶ draft
draft ──openWave(baseline)──▶ baseline_active   (reserve credits, mint tokens, email links)
baseline_active ──closeWave──▶ baseline_closed  (refund uncompleted; baseline frozen)
baseline_closed ──openWave(followup)──▶ followup_active (re-mint tokens, email links)
followup_active ──closeWave──▶ closed           (delta report if both waves ≥ floor)
```

Responses accepted only while the relevant wave is active; resubmission within an active wave
overwrites (upsert on `(participant_id, wave, assessment_slug)`); locked once the wave closes.

---

## 6. Server functions — `src/server/functions/programs.functions.ts`

Reuse `requireOrgRole`, `generateInviteToken`, `hashInviteToken`, `spend_org_credits`,
`sendInviteEmail`/`sendReminderEmail`, `getPublicSiteUrl`.

- `createProgram(accessToken, orgId, name, programmeType)` → draft. (admin)
- `addParticipants(accessToken, programId, rows[{email, department?}])` → upsert. (admin)
- `openWave(accessToken, programId, wave)` → reserve `6 × participants` credits atomically;
  mint one token per participant; email **one** program-invite link per participant
  (`/p/{token}`) that lists all six assessments. (admin)
- `closeWave(accessToken, programId, wave)` → freeze wave, refund uncompleted. (admin)
- `getParticipantSession(token)` → **employee-facing, no auth.** Resolve participant + active
  wave; return which of the six assessments are done vs. remaining (progress).
- `submitProgramAssessment(token, assessmentSlug, answers)` → validate token + active wave +
  slug ∈ battery → score via engine → upsert `program_responses`. When all six done, return the
  unified personal report.
- `getProgramReport(accessToken, programId)` → **privacy-gated** (viewer): per-wave funnel
  (single grouped query, not the per-status loop `getCampaignReport` uses), baseline WES + 6-dim,
  followup WES + 6-dim, deltas, top-3 strengths/barriers, department breakdown where dept n ≥ 10.
  Withholds any wave with completions < `min_group_size`. **Never returns an individual WES.**

---

## 7. Employee flow — route `/p/$token`

One token, one page, six assessments — designed to the **ios-design** system (fluid springs,
translucent chrome, continuous feedback, reduced-motion + reduced-transparency fallbacks).

1. Resolve token → participant + active wave. Invalid/closed → friendly "link expired".
2. Confidentiality promise up front ("your employer sees only anonymous group averages").
3. Progress hub: six cards, completion state each; tap → run that assessment (reuse the runner).
4. On finishing all six → the **private personal report**: six-dimension radar + WES + one-line
   interpretation per dimension. (Micro-learning / journal / action plan stubs → Phase 2.)

No account required. Account creation offered later (Phase 2) to persist the report.

---

## 8. Org UI (org.calmtree.in) — ios-design

Reuse the `/org` shell + react-query. Motion: critically-damped springs (`damping 1.0`,
`response 0.3–0.4`) by default; bounce only on momentum gestures. Translucent report chrome,
scroll-edge masks (not hard dividers), theme-aware, reduced-motion fallbacks.

- `/org/programs` — list with status + participation.
- `/org/programs/new` — name, programme type, paste/upload participants (email + optional dept).
- `/org/programs/$id` — manage waves; **report**: WES headline with band, six-dimension radar
  (baseline vs follow-up overlaid), top-3 strengths / barriers, per-dimension delta, department
  table (rows with n < 10 → "Not enough responses").

---

## 9. Security / privacy checklist (L4)

- [ ] Tokens SHA-256-hashed, raw only in email (reuse 009 helpers); re-mint per wave.
- [ ] `program_participants` / `program_responses`: no user-facing RLS; reads via server fns.
- [ ] Aggregate floor enforced server-side before any score returns; org-wide ≥ `min_group_size`,
      dept ≥ 10; no individual WES to the employer.
- [ ] `requireOrgRole` on every org fn; employee fns gated by valid token + active wave only.
- [ ] Idempotent writes via `UNIQUE(participant_id, wave, assessment_slug)`.
- [ ] Credit spend atomic (`spend_org_credits` row-locks the org); refund on close.
- [ ] Report funnel uses one grouped query, not a per-status loop (L5).

---

## 10. Build order (Phase 1)

1. **Foundation (no content/UI dependency):** migration 011 + RLS/indexes; `WES_BATTERY`
   registry + dimension mapping; exemplar assessment (`workplace-clarity`) to lock the pattern.
2. **Server:** `programs.functions.ts` (create/addParticipants/openWave/closeWave), then
   `getParticipantSession` + `submitProgramAssessment`, then `getProgramReport`.
3. **Employee flow:** `/p/$token` progress hub + personal report (ios-design).
4. **Org UI:** programs list / new / detail-with-report (ios-design).
5. **Content:** remaining five assessments authored & validated by the psychology author.

Realistic engineering ≈ 2 focused weeks once instrument copy exists. Content authoring is the
long pole, and it runs in parallel with 2–4.

## 11. Success metrics (L11)

- **Primary:** baseline completion rate (all six) in the pilot cohort — target ≥ 60%.
- **Secondary:** follow-up completion rate; a measurable, defensible WES delta.
- **Counter:** mid-battery drop-off; any privacy concern raised by employees/HR.

## 12. Confidence (L10)

- **HIGH** on schema, reuse strategy, privacy model, credit funding, measurement design.
- **MEDIUM** on questions-per-assessment content and WES band cutoffs — psychometric calls for
  the client's author to validate.
- **One interpretation to confirm with the client:** the three programmes share one universal
  six-dimension battery in Phase 1 (programme type = label + focus dimensions), rather than each
  programme having its own separate assessment set.
