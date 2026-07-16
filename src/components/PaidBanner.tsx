"use client";

// Shown at the top of /booked-direct only when Stripe returns the buyer with
// ?paid=1 (the payment link's after-completion redirect points here). A $250
// audit buyer needs exactly one next step — tell us which site to audit — so
// this banner says that plainly instead of leaving them on Stripe's receipt.
// useSearchParams must sit under a Suspense boundary on an otherwise-static page.

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";

function PaidBannerInner() {
  const params = useSearchParams();
  const paid = params.get("paid") === "1";

  useEffect(() => {
    if (paid && typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      try {
        posthog.capture("audit_purchase_confirmed", { tier: "visibility-audit", amount: 250 });
      } catch {
        /* tracking is best-effort; never block the page */
      }
    }
  }, [paid]);

  if (!paid) return null;

  return (
    <section className="px-6 pt-28 pb-2 max-w-3xl mx-auto">
      <div className="rounded-2xl border border-wave-500/40 bg-wave-500/10 p-6 sm:p-8">
        <div className="text-xs uppercase tracking-[0.16em] text-wave-300/90 font-mono mb-3">
          Payment received — mahalo
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Your Visibility Audit is reserved. Here&apos;s the one thing we need.
        </h2>
        <p className="text-white/70 leading-relaxed mb-5">
          Send us the website you want audited and your recorded, plain-English walkthrough lands within 48 hours.
          Reply to your Stripe receipt with the URL, email it to{" "}
          <a href="mailto:portofcams@gmail.com" className="text-wave-300 hover:text-wave-200 underline">
            portofcams@gmail.com
          </a>
          , or drop it in the form below — whichever&apos;s easiest.
        </p>
        <a
          href="#audit"
          className="btn-primary inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-white"
        >
          Send my website →
        </a>
      </div>
    </section>
  );
}

export default function PaidBanner() {
  return (
    <Suspense fallback={null}>
      <PaidBannerInner />
    </Suspense>
  );
}
