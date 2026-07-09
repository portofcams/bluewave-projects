"use client";

// Per-prospect demo analytics. Drop <DemoTracking demo="valdez-fly-in" /> at the
// top of a demo page; send the outreach link as
//   bluewaveprojects.com/demos/valdez-fly-in?ref=valdez-flyin
// and PostHog then tells you whether that prospect opened it, dwelled, and
// scrolled the proof — before you follow up.
//
// Events (all carry { demo, demo_ref }):
//   demo_viewed        — on mount (may include email-scanner prefetches)
//   demo_engaged       — real-human signal: 8 s dwell OR first scroll
//   demo_scrolled_deep — scrolled past ~60% of the page
//
// Bot note: security/email scanners prefetch links and fire demo_viewed, but
// they don't dwell or scroll — so demo_engaged / demo_scrolled_deep are the
// trustworthy "they actually looked" signals. Link DIRECTLY to the demo with
// ?ref= (do NOT route through the /r redirect, which scanners prefetch).
//
// Silent and side-effect-free unless NEXT_PUBLIC_POSTHOG_KEY is set — safe to
// ship without a key; tracking simply doesn't fire.

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const enabled = () => typeof window !== "undefined" && !!process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function DemoTracking({ demo }: { demo: string }) {
  const engaged = useRef(false);
  const deep = useRef(false);

  useEffect(() => {
    if (!enabled()) return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("utm_source") || null;

    // Attach demo + ref to every subsequent event in this session.
    posthog.register({ demo, demo_ref: ref });
    posthog.capture("demo_viewed", { demo, demo_ref: ref });

    const markEngaged = (reason: "dwell" | "scroll") => {
      if (engaged.current) return;
      engaged.current = true;
      posthog.capture("demo_engaged", { demo, demo_ref: ref, reason });
    };

    const dwellId = window.setTimeout(() => markEngaged("dwell"), 8000);

    const onScroll = () => {
      markEngaged("scroll");
      const scrolled = window.scrollY + window.innerHeight;
      const full = document.documentElement.scrollHeight;
      if (!deep.current && full > 0 && scrolled / full > 0.6) {
        deep.current = true;
        posthog.capture("demo_scrolled_deep", { demo, demo_ref: ref });
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
