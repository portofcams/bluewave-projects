// Shared presentational pieces for the Iditarod 2027 sample/proof pages.
// Honest framing per the brief: this is a sample built on public info, not an
// official ITC product. No copyrighted photos — designed placeholder blocks only.
//
// BRAND GROUNDING (real values, scoped to these pages only — no globals/config):
// Pulled from iditarod.com's Elementor global color tokens + theme style.css:
//   --e-global-color-primary:  #23557D  (Iditarod blue)
//   --e-global-color-accent:   #28556C  (deep teal-blue)
//   --e-global-color-text:     #313131
//   --e-global-color-secondary:#A8AFB7
//   theme link/hover blues:    #35A8DF, #327FA2, #04596F
// All applied below as page-local Tailwind arbitrary values so the rest of
// bluewaveprojects.com is visually unchanged.

import type { IditarodEvent } from "./events";
import { SITE } from "./events";

// Page-local brand tokens (kept here so the three pages share one source).
export const IDITAROD = {
  blue: "#23557D",
  blueDark: "#1B4565",
  blueDeep: "#0F2E47",
  accent: "#28556C",
  teal: "#04596F",
  sky: "#35A8DF",
  skyMid: "#327FA2",
  snow: "#F5F8FB",
  border: "#E2EAF1",
  text: "#1F2D3A",
  muted: "#5B6B7A",
} as const;

// Accent gradients per event — branded snow-on-blue treatment for the photo
// placeholders. Keyed to the Iditarod's own blue/teal/sky palette.
export const accentGradient: Record<IditarodEvent["accent"], string> = {
  ice: "from-[#2E6A9C] via-[#23557D] to-[#1B4565]",
  lava: "from-[#327FA2] via-[#28556C] to-[#1B4565]",
  ocean: "from-[#35A8DF] via-[#327FA2] to-[#23557D]",
  glacier: "from-[#4C90C0] via-[#327FA2] to-[#23557D]",
  aurora: "from-[#3FA9C7] via-[#28556C] to-[#1B4565]",
};

// On-brand text color for dates / inline accents (used on light cards).
export const accentText: Record<IditarodEvent["accent"], string> = {
  ice: "text-[#23557D]",
  lava: "text-[#327FA2]",
  ocean: "text-[#1E6FA8]",
  glacier: "text-[#327FA2]",
  aurora: "text-[#28556C]",
};

export const ticketBadge: Record<
  IditarodEvent["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Ticketed event",
    cls: "bg-[#23557D]/8 text-[#23557D] border-[#23557D]/25",
  },
  auction: {
    label: "Auction / experience",
    cls: "bg-[#327FA2]/10 text-[#2A6E91] border-[#327FA2]/30",
  },
  "free-spectate": {
    label: "Free to spectate",
    cls: "bg-[#35A8DF]/10 text-[#1E6FA8] border-[#35A8DF]/35",
  },
};

/**
 * Designed placeholder image block. This is intentional branded art — a snow-
 * on-blue Iditarod gradient with a subtle aurora + sled-team-on-the-trail SVG
 * motif — not an empty hole. It still clearly signals the final build drops in
 * ITC's own official photography.
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
      className={`group/ph relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Iditarod photography placeholder — ${label}`}
    >
      {/* Aurora wash + snow drift + a sled team on the trail. All inline SVG so
          nothing is hotlinked and no copyrighted image is used. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`aurora-${accent}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9FE7FF" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#7FD1C9" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3FA9C7" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`glow-${accent}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft overhead glow */}
        <rect width="400" height="300" fill={`url(#glow-${accent})`} />

        {/* aurora ribbons */}
        <path
          d="M-20 60 C 80 20, 160 90, 250 50 S 420 30, 440 70"
          stroke={`url(#aurora-${accent})`}
          strokeWidth="34"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M-20 95 C 90 70, 180 120, 260 88 S 420 78, 440 104"
          stroke={`url(#aurora-${accent})`}
          strokeWidth="20"
          fill="none"
          opacity="0.7"
        />

        {/* stars */}
        {[28, 72, 150, 210, 300, 360, 120, 250].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={18 + (i % 4) * 14}
            r={i % 3 === 0 ? 1.4 : 0.9}
            fill="#ffffff"
            opacity="0.65"
          />
        ))}

        {/* snow horizon / drifts */}
        <path
          d="M0 210 C 70 196, 130 224, 210 208 S 340 196, 400 214 L400 300 L0 300 Z"
          fill="#ffffff"
          opacity="0.10"
        />
        <path
          d="M0 240 C 90 226, 150 256, 230 240 S 350 230, 400 246 L400 300 L0 300 Z"
          fill="#ffffff"
          opacity="0.14"
        />

        {/* trail line winding to the horizon */}
        <path
          d="M40 286 C 120 262, 150 250, 200 244 S 280 234, 318 226"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeDasharray="2 6"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />

        {/* a sled dog team + musher silhouette on the trail */}
        <g
          fill="#0F2E47"
          opacity="0.82"
          transform="translate(86 232) scale(1.05)"
        >
          {/* gangline */}
          <path
            d="M2 14 L120 4"
            stroke="#0F2E47"
            strokeWidth="1"
            opacity="0.5"
            fill="none"
          />
          {/* four dogs in a line (simple side-profile silhouettes) */}
          {[112, 86, 60, 34].map((x) => (
            <g key={x} transform={`translate(${x} 6)`}>
              <ellipse cx="0" cy="4" rx="7" ry="3.4" />
              <circle cx="6.5" cy="2" r="2.4" />
              <path d="M-6 6 L-9 11 M-2 6 L-4 12 M3 6 L2 12 M6 6 L7 11" stroke="#0F2E47" strokeWidth="1" />
              <path d="M-7 3 L-11 1" stroke="#0F2E47" strokeWidth="1.3" />
            </g>
          ))}
          {/* sled + musher */}
          <g transform="translate(-2 0)">
            <path d="M-12 14 L8 12" stroke="#0F2E47" strokeWidth="1.6" />
            <path d="M-12 14 L-15 8 M-10 14 L-12 6" stroke="#0F2E47" strokeWidth="1.4" />
            <ellipse cx="-13" cy="2" rx="2.6" ry="3.4" />
            <rect x="-15" y="5" width="5" height="6" rx="1.5" />
          </g>
        </g>
      </svg>

      {/* Soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0F2E47]/55 to-transparent" />

      {/* Classy, small caption — reads as deliberate design, signals the final
          build uses ITC's own image. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-center justify-between gap-3">
          <span className="text-[13px] font-semibold leading-tight text-white drop-shadow-sm">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
            <svg
              viewBox="0 0 16 16"
              className="h-2.5 w-2.5"
              fill="none"
              aria-hidden="true"
            >
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
              <path d="M2 11 L6 7.5 L9 10 L11 8.5 L14 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            ITC photo
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Sample disclaimer shown on every proof page, per the brief.
 */
export function SampleNote() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-12">
      <p className="rounded-2xl border border-[#E2EAF1] bg-white px-5 py-4 text-center text-xs leading-relaxed text-[#5B6B7A]">
        Iditarod photography throughout is a{" "}
        <span className="font-medium text-[#23557D]">designed placeholder</span> —
        the final build drops in the Iditarod Trail Committee&apos;s own official
        images and logo. Sample built by{" "}
        <a
          href={SITE}
          className="font-medium text-[#23557D] underline underline-offset-2 hover:text-[#1B4565]"
        >
          BlueWave Projects
        </a>{" "}
        on public info. Event dates and locations are sourced from the official
        Iditarod calendar; items marked{" "}
        <span className="rounded bg-[#F0F4F8] px-1 py-0.5 font-mono text-[#327FA2]">
          [confirm]
        </span>{" "}
        are real recurring events whose 2027 prices or exact dates are not yet
        published. This page is not affiliated with or endorsed by the Iditarod
        Trail Committee.
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
