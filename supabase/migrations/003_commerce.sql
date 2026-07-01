-- ═══════════════════════════════════════════════════════════════
-- CalmTree Commerce — Migration 003
-- Adds: ebooks catalog, purchases ledger.
-- Idempotency constraint on entitlements.payment_reference.
-- Extends 002_auth_and_access.sql — additive only.
-- ═══════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────
-- 1. EBOOKS
--    Catalog of PDF ebooks available for purchase.
--    Public SELECT where status = 'active' (browsing needs no login).
--    Writes are service-role only (no user-facing INSERT/UPDATE policy).
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ebooks (
  id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  slug                  TEXT        NOT NULL UNIQUE,
  title                 TEXT        NOT NULL,
  subtitle              TEXT,
  description           TEXT,
  cover_image_url       TEXT,
  -- Cloudinary public_id for generating signed download URLs server-side.
  cloudinary_public_id  TEXT,
  -- Price stored as whole rupees. Convert to paise (× 100) at Razorpay call site.
  price_inr             INTEGER     NOT NULL DEFAULT 0,
  page_count            INTEGER,
  -- 'active' | 'draft' | 'archived'
  status                TEXT        NOT NULL DEFAULT 'draft',
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

-- Anyone can browse the active catalog without logging in.
CREATE POLICY "Anyone can view active ebooks"
  ON public.ebooks FOR SELECT
  USING (status = 'active');

-- Writes are service-role only — no user-facing policy needed.


-- ────────────────────────────────────────────────────────────────
-- 2. PURCHASES
--    One-time SKU ownership ledger.
--    product_type is open-ended ('ebook' today; 'course'/'certificate'
--    can be added later without rearchitecting this table).
--    Idempotency via UNIQUE razorpay_payment_id — Razorpay retries
--    webhooks, so the handler must be safe to process twice.
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.purchases (
  id                    UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Extensible product type — 'ebook' now; courses/certificates later.
  product_type          TEXT        NOT NULL,     -- 'ebook' | future: 'course' | 'certificate'
  -- UUID of the purchased item in its catalog table (ebooks.id, etc.)
  product_id            UUID        NOT NULL,

  amount_paid_inr       INTEGER     NOT NULL DEFAULT 0,

  -- Razorpay identifiers for audit trail + idempotency.
  razorpay_order_id     TEXT,
  -- UNIQUE so duplicate webhook deliveries cannot create double purchases.
  razorpay_payment_id   TEXT        UNIQUE,

  -- 'pending' | 'completed' | 'failed' | 'refunded'
  status                TEXT        NOT NULL DEFAULT 'pending',

  purchased_at          TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Users can only see their own purchase rows.
CREATE POLICY "Users can view own purchases"
  ON public.purchases FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT / UPDATE restricted to service-role (webhook handler).


-- ────────────────────────────────────────────────────────────────
-- 3. IDEMPOTENCY CONSTRAINT ON ENTITLEMENTS
--    Adds a unique partial index on payment_reference so the
--    webhook handler can use ON CONFLICT DO NOTHING safely.
--    Nullable-safe: NULL values are excluded (NULL != NULL in SQL).
-- ────────────────────────────────────────────────────────────────
CREATE UNIQUE INDEX IF NOT EXISTS idx_entitlements_payment_ref
  ON public.entitlements (payment_reference)
  WHERE payment_reference IS NOT NULL;


-- ────────────────────────────────────────────────────────────────
-- 4. INDEXES
-- ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_purchases_user_id     ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product     ON public.purchases(product_type, product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status      ON public.purchases(status);
CREATE INDEX IF NOT EXISTS idx_ebooks_slug           ON public.ebooks(slug);
CREATE INDEX IF NOT EXISTS idx_ebooks_status         ON public.ebooks(status);
