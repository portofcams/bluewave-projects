"use client";

// Client hop from /audit -> /booked-direct#audit. Reads ?ref= off the URL,
// fires one PostHog event so shortlink clicks are attributable, then forwards.
// Mirrors the /go/heli redirect pattern. The hash must come last, so ref is
// spliced in before it: /booked-direct?ref=<slug>#audit.

import { useEffect } from "react";
import posthog from "posthog-js";

export default function AuditRedirectClient() {
  useEffect(() => {
    let ref: string | null = null;
    try {
      ref = new URLSearchParams(window.location.search).get("ref");
    } catch {
      /* ignore */
    }
    try {
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture("audit_shortlink_click", { audit_ref: ref });
      }
    } catch {
      /* tracking is best-effort; never block the redirect */
    }
    const dest = ref
      ? `/booked-direct?ref=${encodeURIComponent(ref)}#audit`
      : "/booked-direct#audit";
    const t = window.setTimeout(() => {
      window.location.replace(dest);
    }, 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main className="ocean-gradient min-h-screen flex items-center justify-center px-6">
      <p className="text-white/60 text-sm">Taking you to your free visibility audit…</p>
    </main>
  );
}
