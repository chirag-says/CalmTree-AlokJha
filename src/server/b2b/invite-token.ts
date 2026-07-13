/**
 * invite-token.ts — server-only invite token generation + hashing.
 *
 * The raw token travels in the invite email link. Only its SHA-256 hash
 * is stored (invitations.token_hash), exactly like a password. Looking up
 * an invitation from an incoming link means hashing the presented token and
 * matching the hash — a leaked DB never yields a usable link.
 */

import crypto from "crypto";

/** A URL-safe, unguessable token (32 random bytes → base64url, ~43 chars). */
export function generateInviteToken(): string {
  return crypto.randomBytes(32).toString("base64url");
}

/** SHA-256 hex of a raw token — this is what we store and query by. */
export function hashInviteToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}
