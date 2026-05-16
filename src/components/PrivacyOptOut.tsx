"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

const OPT_OUT_KEY = "bw_analytics_opted_out_v1";

// Tiny opt-out control. Drop into footer or a /privacy page so any user
// who doesn't want analytics tracking can disable it. PostHog respects
// opt_out_capturing() across all subsequent events. Storage in
// localStorage so the choice persists across visits.
export function PrivacyOptOut() {
  const [optedOut, setOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(OPT_OUT_KEY) === "true";
    setOptedOut(stored);
    if (stored && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.opt_out_capturing();
    }
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    if (typeof window === "undefined") return;
    const next = !optedOut;
    setOptedOut(next);
    if (next) {
      localStorage.setItem(OPT_OUT_KEY, "true");
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) posthog.opt_out_capturing();
    } else {
      localStorage.removeItem(OPT_OUT_KEY);
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) posthog.opt_in_capturing();
    }
  };

  return (
    <button
      onClick={toggle}
      className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
      aria-label={optedOut ? "Re-enable analytics tracking" : "Opt out of analytics tracking"}
    >
      {optedOut ? "Analytics opted out — re-enable" : "Opt out of analytics"}
    </button>
  );
}
