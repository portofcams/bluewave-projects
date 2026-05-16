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
  | "sample_pdf";

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
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    const text =
      cta_text_override ||
      (typeof children === "string" ? children : "[non-text-child]");
    posthog.capture("cta_clicked", {
      cta_location: location,
      cta_text: text,
      destination_path: href,
      source_page:
        typeof window !== "undefined" ? window.location.pathname : "",
      ...(tier ? { tier } : {}),
    });
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
