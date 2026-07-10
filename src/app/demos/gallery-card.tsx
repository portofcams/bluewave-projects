"use client";

// Gallery card link with click attribution: fires demo_card_clicked {slug} so
// PostHog shows WHICH proof a prospect opened from the index. Silent without
// NEXT_PUBLIC_POSTHOG_KEY (same contract as DemoTracking).

import posthog from "posthog-js";

export function GalleryCard({
  slug,
  children,
  className = "",
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
}) {
  const onClick = () => {
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("demo_card_clicked", { slug });
    }
  };
  return (
    <a href={`/demos/${slug}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
