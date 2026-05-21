"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

// Inline lead-magnet for Property Brief. Drops on any page that wants
// passive capture. Submits to /signup with plan + email prefill so
// the existing signup flow handles the real work; this is just the
// top-of-funnel email collector.
export function InlinePropertyBrief({
  variant = "card",
}: {
  variant?: "card" | "banner";
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitting(true);

    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("inline_lead_captured", {
        product: "property_brief",
        source_page: window.location.pathname,
        variant,
        email_domain: email.split("@")[1] || "unknown",
      });
    }

    // GA4 conversion event — mirrors the PostHog capture so both surfaces have it.
    type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void;
    (window as unknown as { gtag?: Gtag }).gtag?.("event", "waitlist_join", {
      product: "property_brief",
      variant,
    });

    const params = new URLSearchParams({
      plan: "property-brief",
      email: email.trim().toLowerCase(),
      redirect: "/property-brief/account",
    });
    router.push(`/signup?${params.toString()}`);
  };

  if (variant === "banner") {
    return (
      <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-wave-400 mb-1">
              Free weekly digest
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Hawaii property intel, every Wednesday.
            </h3>
            <p className="text-sm text-white/55">
              Permits, sales, comps for your address. First brief on us. $15/mo after.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 w-full sm:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@email.com"
              className="flex-1 sm:w-56 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-wave-400 text-sm"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-6 py-3 rounded-full text-white font-medium text-sm whitespace-nowrap disabled:opacity-50"
            >
              {submitting ? "..." : "Get the brief"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default: card variant
  return (
    <div className="glass rounded-3xl border border-white/10 p-10 max-w-2xl mx-auto text-center">
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-wave-400 mb-3">
        Free weekly Hawaii property digest
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Your address, every Wednesday.
      </h3>
      <p className="text-white/55 leading-relaxed mb-6">
        Permits, sales, comps, ownership changes — for the parcel you care about.
        First brief is free, $15/mo after. Cancel anytime.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@email.com"
          className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-wave-400 text-sm"
          disabled={submitting}
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary px-6 py-3 rounded-full text-white font-medium text-sm whitespace-nowrap disabled:opacity-50"
        >
          {submitting ? "..." : "Get the brief"}
        </button>
      </form>
      <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
        Built in Honolulu · Hawaii data · 384,262 parcels indexed
      </p>
    </div>
  );
}
