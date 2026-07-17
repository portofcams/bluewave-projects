"use client";

// Per-prospect demo analytics. Drop <DemoTracking demo="valdez-fly-in" /> at the
// top of a demo page; send the outreach link as
//   bluewaveprojects.com/demos/valdez-fly-in?ref=valdez-flyin
// and you can then see whether that prospect opened it, dwelled, and scrolled the
// proof — before you follow up.
//
// Events (all carry { demo, demo_ref }):
//   demo_viewed        — on mount (may include email-scanner prefetches)
//   demo_engaged       — real-human signal: 8 s dwell OR first scroll
//   demo_scrolled_deep — scrolled past ~60% of the page
//
// TWO SINKS, ON PURPOSE:
//   1. PostHog — full session analytics. Only fires when NEXT_PUBLIC_POSTHOG_KEY
//      is set, and we can't query it server-side (no personal API key exists), so
//      it can't feed a dashboard.
//   2. First-party beacon → ai.portofcams.com/api/events, the SAME `atlas_events`
//      store the PermitPulse `?ref=cx-` links already land in. This is what powers
//      the /warm board ("who do I call next"), and it's ours — no vendor between
//      us and our own outreach signal. It fires independently of PostHog.
//
// REF-GATED BY DESIGN: the beacon only fires when the URL carries a ?ref=. This is
// an outreach-RESPONSE signal, not site analytics — a ref-less visitor to /demos
// isn't someone to call, and logging them would just add noise to a board used for
// decisions. PostHog still sees that traffic.
//
// Bot note: security/email scanners prefetch links and fire demo_viewed, but they
// don't dwell or scroll — so demo_engaged / demo_scrolled_deep are the trustworthy
// "they actually looked" signals (the server also flags obvious bot UAs). Link
// DIRECTLY to the demo with ?ref= (do NOT route through /r, which scanners prefetch).
//
// Silent and side-effect-free on failure — tracking must never break a demo.

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

// Same origin the audit form already posts to (CORS allows bluewaveprojects.com).
const EVENTS_API = "https://ai.portofcams.com/api/events";

// Server-side allowlist (CLIENT_EVENTS in routers/atlas_events.py) drops anything
// outside its vocabulary — keep these three names in sync with it.
type DemoEvent = "demo_viewed" | "demo_engaged" | "demo_scrolled_deep";

export function DemoTracking({ demo }: { demo: string }) {
  const engaged = useRef(false);
  const deep = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("utm_source") || null;
    const ph = !!process.env.NEXT_PUBLIC_POSTHOG_KEY;

    // First-party: only outreach clicks, and never let it throw into the page.
    const beacon = (type: DemoEvent) => {
      if (!ref) return;
      try {
        void fetch(EVENTS_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, slug: demo, ref, path: window.location.pathname }),
          keepalive: true, // survive the tab closing mid-read
          mode: "cors",
        }).catch(() => {});
      } catch {
        /* tracking is best-effort */
      }
    };

    const track = (type: DemoEvent, props: Record<string, unknown> = {}) => {
      if (ph) {
        try {
          posthog.capture(type, { demo, demo_ref: ref, ...props });
        } catch {
          /* best-effort */
        }
      }
      beacon(type);
    };

    if (ph) {
      try {
        // Attach demo + ref to every subsequent event in this session.
        posthog.register({ demo, demo_ref: ref });
      } catch {
        /* best-effort */
      }
    }
    track("demo_viewed");

    const markEngaged = (reason: "dwell" | "scroll") => {
      if (engaged.current) return;
      engaged.current = true;
      track("demo_engaged", { reason });
    };

    const dwellId = window.setTimeout(() => markEngaged("dwell"), 8000);

    const onScroll = () => {
      markEngaged("scroll");
      const scrolled = window.scrollY + window.innerHeight;
      const full = document.documentElement.scrollHeight;
      if (!deep.current && full > 0 && scrolled / full > 0.6) {
        deep.current = true;
        track("demo_scrolled_deep");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(dwellId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [demo]);

  return null;
}
