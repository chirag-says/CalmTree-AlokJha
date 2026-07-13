-- ═══════════════════════════════════════════════════════════════
-- CalmTree B2B — Migration 010
-- Self-serve credit purchases.
--
-- Adds payment_reference to credit_ledger so a purchased credit grant can be
-- written idempotently: fulfillPayment may fire twice (synchronous verify +
-- an optional webhook) for the same payment, and a duplicate insert must NOT
-- double the credits. A UNIQUE partial index makes the second insert a 23505
-- no-op — the same idempotency pattern used by entitlements in migration 003.
--
-- Extends 009 — additive only. Idempotent.
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.credit_ledger
  ADD COLUMN IF NOT EXISTS payment_reference TEXT;

-- One ledger row per Razorpay payment. NULLs are excluded (grants, spends,
-- refunds have no payment_reference), so only purchases are constrained.
CREATE UNIQUE INDEX IF NOT EXISTS idx_credit_ledger_payment_ref
  ON public.credit_ledger (payment_reference)
  WHERE payment_reference IS NOT NULL;
