"use client";

// Tracked hop to the LIVE Clearspar Heli demo (heli.binnacleai.com has no
// analytics of its own — kept clean on purpose). This fires one PostHog event
// carrying the ?ref= slug, then forwards to the live app. Send prospects
//   bluewaveprojects.com/go/heli?ref=<slug>
// and PostHog tells you who actually opened the live demo.

import { useEffect } from "react";
import posthog from "posthog-js";

const DEST = "https://heli.binnacleai.com/";

export default function GoHeliRedirect() {
  useEffect(() => {
    let ref: string | null = null;
    try {
      ref = new URLSearchParams(window.location.search).get("ref");
    } catch {
      /* ignore */
    }
    try {
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture("demo_live_click", {
          demo: "clearspar-heli-live",
          demo_ref: ref,
          dest: DEST,
        });
      }
    } catch {
      /* tracking is best-effort; never block the redirect */
    }
    // Small delay so the event flushes before the page unloads; posthog also
    // sends via sendBeacon on pagehide, so this is belt-and-suspenders.
    const t = window.setTimeout(() => {
      window.location.replace(DEST);
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#090d12",
        color: "#e9eff5",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <div
          style={{
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#79d1e8",
          }}
        >
          Clearspar Heli
        </div>
        <p style={{ marginTop: 12, color: "#94a5b4" }}>Opening the live demo…</p>
        <noscript>
          <a href={DEST} style={{ color: "#79d1e8" }}>
            Continue to the live demo
          </a>
        </noscript>
      </div>
    </main>
  );
}
