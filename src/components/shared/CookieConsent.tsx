/**
 * CookieConsent
 *
 * Lightweight, dismissible (non-blocking) cookie notice bar.
 * Shows once per browser session (persisted in localStorage).
 * Dismissing sets a flag so it never re-appears.
 *
 * Does NOT block PostHog — Calmtree uses a minimal analytics posture
 * (pageviews + custom events, no session recording) to keep the
 * compliance surface small under India's DPDP Act.
 */

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

const STORAGE_KEY = "calmtree_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if not already dismissed
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // no-op
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="alertdialog"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="rounded-2xl border border-border bg-card shadow-lg p-4 flex gap-3 items-start">
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">We use cookies</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use analytics cookies to understand how visitors use Calmtree. No session recording.
            See our{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <button
          id="cookie-consent-dismiss-btn"
          onClick={dismiss}
          aria-label="Dismiss cookie notice"
          className="shrink-0 p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
