// Shared presentational pieces for the Iditarod 2027 sample/proof pages.
// Honest framing per the brief: this is a sample built on public info, not an
// official ITC product. No copyrighted photos — labeled placeholder blocks only.

import type { IditarodEvent } from "./events";
import { SITE } from "./events";

// Accent gradients per event — keyed to the Iditarod's snow/aurora/lava palette
// using the BlueWave theme tokens so it still reads as one design system.
export const accentGradient: Record<IditarodEvent["accent"], string> = {
  ice: "from-glacier-300/25 via-ocean-700/20 to-deep-800",
  lava: "from-lava-500/25 via-ocean-800/25 to-deep-800",
  ocean: "from-ocean-500/25 via-ocean-800/25 to-deep-800",
  glacier: "from-glacier-200/25 via-wave-600/20 to-deep-800",
  aurora: "from-emerald-400/20 via-wave-600/25 to-deep-800",
};

export const accentText: Record<IditarodEvent["accent"], string> = {
  ice: "text-glacier-200",
  lava: "text-lava-500",
  ocean: "text-ocean-300",
  glacier: "text-glacier-200",
  aurora: "text-emerald-300",
};

export const ticketBadge: Record<
  IditarodEvent["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Ticketed event",
    cls: "bg-lava-500/10 text-lava-500 border-lava-500/25",
  },
  auction: {
    label: "Auction / experience",
    cls: "bg-wave-500/10 text-wave-400 border-wave-500/25",
  },
  "free-spectate": {
    label: "Free to spectate",
    cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
  },
};

/**
 * Labeled placeholder image block — clearly states no ITC photo is used.
 * Final pages would drop ITC's official photography in here.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
}: {
  accent: IditarodEvent["accent"];
  label: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[280px] sm:min-h-[360px]" : "min-h-[180px]"
      } ${className}`}
      role="img"
      aria-label={`Placeholder — ${label}`}
    >
      {/* Subtle trail/snow motif drawn in CSS so we hotlink nothing */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M0 230 C 80 200, 120 260, 200 230 S 320 200, 400 235"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 255 C 90 230, 140 285, 220 255 S 340 230, 400 260"
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {[40, 110, 190, 270, 340].map((x, i) => (
          <circle key={x} cx={x} cy={70 + (i % 3) * 18} r={1.5} fill="white" />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          Placeholder
        </span>
        <p className="max-w-xs text-sm font-medium text-white/70">{label}</p>
        <p className="mt-1 text-[11px] text-white/40">
          ITC official photo here in the final build
        </p>
      </div>
    </div>
  );
}

/**
 * Sample disclaimer shown on every proof page, per the brief.
 */
export function SampleNote() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-10">
      <p className="rounded-2xl border border-white/8 bg-white/3 px-5 py-4 text-center text-xs leading-relaxed text-white/40">
        Sample built by{" "}
        <a
          href={SITE}
          className="text-white/60 underline underline-offset-2 hover:text-white"
        >
          BlueWave Projects
        </a>{" "}
        on public info — final pages use ITC&apos;s official photos &amp;
        branding. Event dates and locations are sourced from the official
        Iditarod calendar; items marked{" "}
        <span className="font-mono text-white/55">[confirm]</span> are real
        recurring events whose 2027 prices or exact dates are not yet published.
        This page is not affiliated with or endorsed by the Iditarod Trail
        Committee.
      </p>
    </div>
  );
}

/**
 * schema.org Event JSON-LD built from grounded data. We do not assert prices
 * (none are published), so we omit the offers block rather than invent one.
 */
export function eventJsonLd(e: IditarodEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    startDate: e.isoStart,
    ...(e.isoEnd ? { endDate: e.isoEnd } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: e.city,
        addressRegion: e.region,
        addressCountry: "US",
      },
    },
    description: e.metaDescription,
    organizer: {
      "@type": "Organization",
      name: "Iditarod Trail Committee",
      url: "https://iditarod.com",
    },
    isAccessibleForFree: e.ticketed === "free-spectate",
  };
}

/**
 * FAQPage JSON-LD for the detail pages.
 */
export function faqJsonLd(e: IditarodEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: e.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
