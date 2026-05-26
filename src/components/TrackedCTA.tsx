"use client";

import Link from "next/link";
import posthog from "posthog-js";

type CTALocation =
  | "hero"
  | "footer"
  | "inline"
  | "nav"
  | "pricing_card"
  | "comparison_table"
  | "faq"
  | "final_cta"
  | "sample_pdf"
  | "hire-hero"
  | "hire-ai-consulting"
  | "hire-custom-app-build"
  | "hire-engineering-retainer"
  | "hire-footer-cta"
  | "hire-footer-email";

interface TrackedCTAProps {
  href: string;
  children: React.ReactNode;
  location: CTALocation;
  className?: string;
  external?: boolean;
  tier?: string; // for pricing_card location
  cta_text_override?: string; // when children isn't plain text (e.g., icon + text)
}

// Wrapper around Link/anchor that fires a `cta_clicked` PostHog event on
// click. Silent if NEXT_PUBLIC_POSTHOG_KEY is not set — no errors, no
// console noise, just a plain link. The location prop is required so
// every CTA has known taxonomy from day one (no orphan untagged clicks).
export function TrackedCTA({
  href,
  children,
  location,
  className,
  external = false,
  tier,
  cta_text_override,
}: TrackedCTAProps) {
  const handleClick = () => {
    const text =
      cta_text_override ||
      (typeof children === "string" ? children : "[non-text-child]");

    // PostHog — only fires when configured
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("cta_clicked", {
        cta_location: location,
        cta_text: text,
        destination_path: href,
        source_page:
          typeof window !== "undefined" ? window.location.pathname : "",
        ...(tier ? { tier } : {}),
      });
    }

    // GA4 — runs in parallel. Two events fire when applicable:
    //   1. cta_clicked: every CTA, so PostHog and GA stay in sync
    //   2. waitlist_join: only when the CTA is an Aloha tier card (matches
    //      the canonical waitlist_join event used by LeadMagnet (main) and
    //      InlinePropertyBrief (property_brief))
    type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (gtag) {
      gtag("event", "cta_clicked", {
        cta_location: location,
        cta_text: text,
        destination_path: href,
        ...(tier ? { tier } : {}),
      });
      if (tier && /aloha/i.test(tier)) {
        gtag("event", "waitlist_join", {
          product: "aloha",
          tier,
        });
      }
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
