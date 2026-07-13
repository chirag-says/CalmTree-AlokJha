/**
 * resend.ts — transactional email via Resend. Server-only.
 * The one new external capability the B2B layer needs.
 *
 * Env:
 *   RESEND_API_KEY  — Resend API key. Unset ⇒ sends are a graceful no-op
 *                     (returns { ok:false, skipped:true }) so the demo runs
 *                     end-to-end without email configured.
 *   EMAIL_FROM      — "CalmTree <noreply@mail.calmtree.in>". Defaults to
 *                     Resend's shared onboarding sender for demos.
 *   PUBLIC_SITE_URL — base URL of the CLIENT app; used to build invite links.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "CalmTree <onboarding@resend.dev>";

export function getPublicSiteUrl(): string {
  return (process.env.PUBLIC_SITE_URL || "https://calmtree.in").replace(/\/+$/, "");
}

export type SendResult = { ok: true } | { ok: false; skipped?: boolean; error: string };

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}

async function send({ to, subject, html }: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping send to", to);
    return { ok: false, skipped: true, error: "Email not configured" };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || DEFAULT_FROM,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[email] Resend API error:", res.status, detail);
      return { ok: false, error: `Email send failed (${res.status})` };
    }
    return { ok: true };
  } catch (e) {
    console.error("[email] network error:", e);
    return { ok: false, error: "Email network error" };
  }
}

function layout(bodyHtml: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;line-height:1.6">
    ${bodyHtml}
    <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
    <p style="font-size:12px;color:#888">
      CalmTree — psychology education, not medical or counselling advice.<br/>
      Your individual answers are private. Your employer sees only aggregated, anonymised results.
    </p>
  </div>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#1f6f54;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:500">${label}</a>`;
}

export interface InviteEmailArgs {
  to: string;
  orgName: string;
  assessmentTitle: string;
  link: string;
  closesAt: string | null;
}

export function sendInviteEmail(args: InviteEmailArgs): Promise<SendResult> {
  const closing = args.closesAt
    ? `<p style="font-size:14px;color:#666">Please complete it by <strong>${formatDate(args.closesAt)}</strong>.</p>`
    : "";
  const html = layout(`
    <h1 style="font-size:20px;margin:0 0 16px">You've been invited to a wellbeing check-in</h1>
    <p><strong>${escapeHtml(args.orgName)}</strong> has invited you to take the
    <strong>${escapeHtml(args.assessmentTitle)}</strong> assessment on CalmTree.</p>
    <p style="font-size:14px;color:#666">It takes a few minutes. No account or sign-up needed — just open the link below.</p>
    <p style="margin:24px 0">${button(args.link, "Start the assessment")}</p>
    ${closing}
    <p style="font-size:13px;color:#999">This link is personal to you — please don't forward it.</p>
  `);
  return send({ to: args.to, subject: `${args.orgName} invited you to a CalmTree check-in`, html });
}

export function sendReminderEmail(args: InviteEmailArgs): Promise<SendResult> {
  const closing = args.closesAt
    ? `<p style="font-size:14px;color:#666">It closes on <strong>${formatDate(args.closesAt)}</strong>.</p>`
    : "";
  const html = layout(`
    <h1 style="font-size:20px;margin:0 0 16px">A quick reminder</h1>
    <p>You haven't finished the <strong>${escapeHtml(args.assessmentTitle)}</strong> assessment that
    <strong>${escapeHtml(args.orgName)}</strong> invited you to.</p>
    <p style="margin:24px 0">${button(args.link, "Finish the assessment")}</p>
    ${closing}
  `);
  return send({
    to: args.to,
    subject: `Reminder: your CalmTree check-in for ${args.orgName}`,
    html,
  });
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
