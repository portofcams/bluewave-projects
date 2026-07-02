// Shared presentational pieces for the HIFF 2026 sample/proof pages.
//
// Honest framing per the brief: this is a sample built on public info, not an
// official Hawai'i International Film Festival product. Photography is
// openly-licensed (Creative Commons, verified below); the final build would
// swap in HIFF's own festival photography and logo.
//
// THEME: "Golden hour premiere" — a deep dusk-violet tropical-evening canvas
// under warm sunset-gold and coral, with an orchid accent standing in for
// Hawai'i's flora and a soft ocean-teal for the neighbor-island threads.
// Sibling to Iditarod (rugged heritage brown/bronze), Rondy (midwinter
// carnival navy/gold/brick-red), Fair (WPA harvest wheat/cream), and AIFF
// (marquee-lights charcoal/gold/aurora-blue) — deliberately distinct: HIFF is
// a Hawai'i film festival, not an Alaska race, carnival, fair, or northern
// marquee. The palette echoes a Waikiki sunset premiere: warm light fading
// into a violet evening sky, a lei-orchid accent, and the ocean's teal.
//
// SCOPING RULE: every style this file injects is namespaced under the
// `.hiff-premiere` wrapper class (see <PremiereShell>). There are NO bare
// body/html/:root/h1/h2 selectors, so nothing leaks to the rest of
// bluewaveprojects.com. Pages MUST wrap their content in <PremiereShell>.

import type { CSSProperties } from "react";
import type { HiffScreening } from "./events";
import { SITE } from "./events";

// Page-local brand tokens — one source of truth for the pages.
export const HIFF = {
  // deep dusk-violet tropical-evening canvas
  dusk: "#1c1030", // deep violet-plum canvas
  duskDeep: "#0e0819", // darkest violet (gradients / footers)
  panel: "#2a1a42", // premiere-panel violet (cards)
  panelDeep: "#20132f", // shaded panel
  // ocean-teal atmosphere (Pacific horizon, background-only)
  oceanTeal: "#3fc4b0", // ocean-teal — horizon/accent glow, never UI text on its own
  oceanTealDeep: "#268f80",
  // sunset brand accents
  gold: "#f5a742", // sunset-gold — string lights, CTAs, eyebrows
  goldDeep: "#d8862a",
  coral: "#f16a5c", // coral — fills/borders, "now showing" accents
  coralBright: "#ff8b7d", // lifted coral for text/hover on violet
  orchid: "#d081d9", // orchid — Hawai'i flora accent
  // type
  snow: "#f7f2ea", // near-white body text on violet (warm white)
  frost: "#b3a6c4", // muted captions / meta
  border: "#3a2652", // hairline on violet
} as const;

// ---------------------------------------------------------------------------
// REAL, LICENSE-VERIFIED PHOTOGRAPHY
// ---------------------------------------------------------------------------
// Same discipline as the Iditarod/Rondy/Fair/AIFF samples: every image is
// verified at its source before use, with source URL + exact license
// recorded here. CC images carry an on-image credit chip AND a line in the
// SampleNote. If a license can't be confidently verified, NO image is added
// and the designed SVG art is kept.
//
// NOTE: photos here are deliberately Honolulu/Waikiki and cinema-motif, NOT
// HIFF-specific — no openly-licensed HIFF festival photography was found
// during research (their own photos are copyrighted festival property, as
// expected — same pattern AIFF hit with Anchorage). This mirrors how the
// AIFF and Fair demos mixed real-but-generic sourcing where festival-
// specific CC photography didn't exist.
//
// Files live in /public/demos/hiff/ (scoped to this demo only).
export type HiffImage = {
  src: string;
  credit?: string;
  attribution?: string;
  position?: string;
  publicDomain?: boolean;
  caption?: string;
};

export const screeningImages: Record<string, HiffImage> = {
  // Waikiki Beach at sunset — Alan Light, CC BY 2.0 (license verified at
  // source 2026-07-02).
  // https://commons.wikimedia.org/wiki/File:Waikiki_Beach_sunset.jpg
  hero: {
    src: "/demos/hiff/hero-waikiki-sunset.webp",
    credit: "Photo: Alan Light (CC BY 2.0)",
    attribution:
      "Hero — Waikiki Beach at sunset. Photo by Alan Light, CC BY 2.0, via Wikimedia Commons.",
    caption: "Waikiki, sunset — HIFF's home turf",
    position: "center 60%",
  },
  // Honolulu skyline from Kaka'ako Waterfront Park — The Eloquent Peasant,
  // CC BY-SA 4.0 (license verified at source 2026-07-02).
  // https://commons.wikimedia.org/wiki/File:Skyline_from_Kaka%27ako_Waterfront_Park,_Honolulu_01.jpg
  "opening-night-rental-family": {
    src: "/demos/hiff/honolulu-skyline.webp",
    credit: "Photo: The Eloquent Peasant (CC BY-SA 4.0)",
    attribution:
      "Honolulu skyline from Kakaʻako Waterfront Park. Photo by The Eloquent Peasant, CC BY-SA 4.0, via Wikimedia Commons.",
    caption: "Honolulu skyline",
    position: "center 50%",
  },
  // Film reel detail — big-ashb, CC BY 2.0 (license verified at source
  // 2026-07-02). https://www.flickr.com/photos/big-ashb/4106848123
  "passes-and-pricing-explainer": {
    src: "/demos/hiff/film-reel.webp",
    credit: "Photo: big-ashb (CC BY 2.0)",
    attribution:
      "Film reel detail. Photo by big-ashb, CC BY 2.0, via Flickr / Openverse.",
    caption: "35mm film reel",
    position: "center 50%",
  },
  // Vintage movie projector — John Levanen, CC BY-SA 2.0 (license verified
  // at source 2026-07-02).
  // https://www.flickr.com/photos/.../10516460744
  "hifilm-industry-conference": {
    src: "/demos/hiff/vintage-projector.webp",
    credit: "Photo: John Levanen (CC BY-SA 2.0)",
    attribution:
      "Vintage movie projector. Photo by John Levanen, CC BY-SA 2.0, via Flickr / Openverse.",
    caption: "Projector, ready to run",
    position: "center 40%",
  },
  // Neighbor Island Tour intentionally keeps the designed sunset art: no
  // openly licensed photography specific to HIFF's neighbor-island venues
  // (Kaua'i, Maui, Molokaʻi, Hawaiʻi Island) was verified during research,
  // and we never substitute a generic look-alike (honesty guard).
};

// Accent gradients per screening — violet-dusk duotone wells behind the
// photo placeholders. Five accents map 1:1 to the event data.
export const accentGradient: Record<HiffScreening["accent"], string> = {
  "sunset-gold": "from-[#4a2a10] via-[#2a1a42] to-[#0e0819]",
  orchid: "from-[#3a1e42] via-[#2a1a42] to-[#0e0819]",
  "ocean-teal": "from-[#123a35] via-[#1c1030] to-[#0e0819]",
  "dusk-violet": "from-[#241338] via-[#1c1030] to-[#0a0612]",
  sand: "from-[#3a2c1c] via-[#241a32] to-[#0e0819]",
};

// On-brand text color for dates / inline accents (used on violet panels).
export const accentText: Record<HiffScreening["accent"], string> = {
  "sunset-gold": "text-[#f5a742]",
  orchid: "text-[#d081d9]",
  "ocean-teal": "text-[#3fc4b0]",
  "dusk-violet": "text-[#ff8b7d]",
  sand: "text-[#f5a742]",
};

export const ticketBadge: Record<
  HiffScreening["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Ticketed",
    cls: "bg-[#f5a742]/12 text-[#f5a742] border-[#f5a742]/40",
  },
  free: {
    label: "Free",
    cls: "bg-[#f7f2ea]/10 text-[#f7f2ea] border-[#f7f2ea]/35",
  },
  unpublished: {
    label: "2026 pricing not yet live",
    cls: "bg-[#3fc4b0]/12 text-[#3fc4b0] border-[#3fc4b0]/40",
  },
};

export const islandBadge: Record<HiffScreening["island"], { cls: string }> = {
  Oʻahu: { cls: "border-[#f5a742]/50 bg-[#f5a742]/15 text-[#f5a742]" },
  Kauaʻi: { cls: "border-[#3fc4b0]/50 bg-[#3fc4b0]/15 text-[#3fc4b0]" },
  Maui: { cls: "border-[#3fc4b0]/50 bg-[#3fc4b0]/15 text-[#3fc4b0]" },
  Molokaʻi: { cls: "border-[#3fc4b0]/50 bg-[#3fc4b0]/15 text-[#3fc4b0]" },
  Lānaʻi: { cls: "border-[#3fc4b0]/50 bg-[#3fc4b0]/15 text-[#3fc4b0]" },
  "Hawaiʻi Island": {
    cls: "border-[#3fc4b0]/50 bg-[#3fc4b0]/15 text-[#3fc4b0]",
  },
};

// ---------------------------------------------------------------------------
// PREMIERE SHELL — the scoped wrapper every page mounts its content inside.
// ---------------------------------------------------------------------------
/**
 * Wraps page content in the `.hiff-premiere` namespace and injects ONE
 * scoped <style> block that:
 *   - imports the premiere display fonts (Fraunces + Manrope) inside the
 *     shell so they apply only to these demo pages,
 *   - paints the dusk-violet tropical-evening canvas with a subtle
 *     sunset-glow gradient (pure CSS — no external image),
 *   - defines the display-font helpers (`.hiff-display`, `.hiff-eyebrow`),
 *   - defines the premiere-panel card styles + the lei-string border motif,
 *   - defines the dark photo-wash used over real images.
 *
 * ALL selectors are prefixed with `.hiff-premiere` — no bare body/html/:root
 * rules, so nothing leaks site-wide.
 */
export function PremiereShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`hiff-premiere ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');

        /* --- dusk-violet tropical-evening canvas + base type (scoped) --- */
        .hiff-premiere {
          position: relative;
          color: ${HIFF.snow};
          font-family: 'Manrope', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          background-color: ${HIFF.dusk};
          background-image:
            radial-gradient(ellipse 110% 55% at 50% -8%, rgba(245,167,66,.14), transparent 55%),
            radial-gradient(ellipse 80% 45% at 85% 0%, rgba(63,196,176,.09), transparent 60%),
            radial-gradient(ellipse 70% 40% at 12% 6%, rgba(208,129,217,.10), transparent 60%),
            linear-gradient(180deg, #23153a 0%, ${HIFF.dusk} 40%, ${HIFF.duskDeep} 100%);
        }
        .hiff-premiere ::selection { background: rgba(241,106,92,.5); }

        /* --- display type helpers --- */
        /* Fraunces for warm, editorial premiere headlines. */
        .hiff-premiere .hiff-display {
          font-family: 'Fraunces', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .hiff-premiere .hiff-cond {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
        }
        .hiff-premiere .hiff-eyebrow {
          font-family: 'Manrope', sans-serif;
          text-transform: uppercase;
          letter-spacing: .34em;
          font-weight: 700;
          font-size: 12px;
          color: ${HIFF.gold};
        }

        /* --- sunset section rule: a soft horizon band --- */
        .hiff-premiere .hiff-rule {
          width: 140px; height: 4px; margin: 16px auto 0;
          background: linear-gradient(90deg, transparent, ${HIFF.gold}, ${HIFF.coral}, transparent);
          border-radius: 999px;
          filter: drop-shadow(0 0 5px rgba(245,167,66,.5));
        }

        /* --- PREMIERE PANEL (card) ------------------------------------- */
        .hiff-premiere .hiff-panel {
          position: relative;
          background: linear-gradient(180deg, ${HIFF.panel}, ${HIFF.panelDeep});
          border: 1px solid ${HIFF.border};
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,.4);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .hiff-premiere a.hiff-panel:hover,
        .hiff-premiere .hiff-panel-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(245,167,66,.45);
          box-shadow: 0 16px 40px rgba(0,0,0,.5), 0 0 24px rgba(245,167,66,.10);
        }
        /* lei-string dotted border along a panel's top edge */
        .hiff-premiere .hiff-lei {
          position: relative;
        }
        .hiff-premiere .hiff-lei::before {
          content: ""; position: absolute; left: 14px; right: 14px; top: -4px;
          height: 8px; z-index: 3; pointer-events: none;
          background-image: radial-gradient(circle 3px at 8px 4px, ${HIFF.orchid} 0 2.2px, rgba(208,129,217,.35) 2.2px 3.4px, transparent 3.5px),
                             radial-gradient(circle 2.4px at 21px 4px, ${HIFF.gold} 0 1.9px, rgba(245,167,66,.35) 1.9px 3px, transparent 3.2px);
          background-size: 26px 8px, 26px 8px;
          background-repeat: repeat-x;
          filter: drop-shadow(0 0 4px rgba(208,129,217,.5));
        }

        /* --- DARK PHOTO WASH --------------------------------------------- */
        .hiff-premiere .hiff-photo-wash {
          background: linear-gradient(180deg, rgba(28,16,48,.35), rgba(14,8,25,.72));
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEAL — circular festival stamp: "HAWAI'I INTERNATIONAL FILM FESTIVAL ·
// 46TH ANNUAL · EST. 1981" — a sunset ring around a hibiscus/reel core.
// ---------------------------------------------------------------------------
/**
 * Self-contained CSS/SVG seal. Gold ring on a violet disc with curved text
 * and "46th" in the core. Purely presentational (aria-hidden internals).
 * HIFF's own materials frame 2026 as the 46th annual edition (HIFF46).
 */
export function Seal({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        transform: "rotate(-6deg)",
        background: `radial-gradient(circle at 50% 42%, rgba(241,106,92,.22), ${HIFF.duskDeep} 74%), ${HIFF.panel}`,
        border: `3px solid ${HIFF.snow}`,
        boxShadow: `0 0 0 6px ${HIFF.gold}, 0 0 0 8px ${HIFF.duskDeep}, 0 14px 34px rgba(0,0,0,.5)`,
      }}
      aria-label="Hawai'i International Film Festival — 46th annual, Honolulu, Hawai'i"
    >
      <svg
        viewBox="0 0 230 230"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="hiff-seal-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="hiff-seal-arc-bot" d="M 34 115 A 81 81 0 0 0 196 115" fill="none" />
        </defs>
        <text
          fill={HIFF.snow}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <textPath href="#hiff-seal-arc-top" startOffset="50%" textAnchor="middle">
            Hawai&apos;i Int&apos;l Film Fest
          </textPath>
        </text>
        <text
          fill={HIFF.snow}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <textPath href="#hiff-seal-arc-bot" startOffset="50%" textAnchor="middle">
            Honolulu · Hawai&apos;i
          </textPath>
        </text>
        <circle cx="115" cy="115" r="70" fill="none" stroke={HIFF.gold} strokeWidth="1.5" opacity="0.85" />
      </svg>
      <div
        className="relative text-center"
        style={{
          color: HIFF.snow,
          fontFamily: "'Manrope', sans-serif",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "block", fontSize: 10, letterSpacing: "0.24em" }}>
          The
        </span>
        <b
          style={{
            display: "block",
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1,
            color: HIFF.gold,
            textShadow: "0 1px 3px rgba(0,0,0,.6)",
          }}
        >
          46th
        </b>
        <span
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.28em",
            marginTop: 6,
            color: "#d8cfe2",
          }}
        >
          Annual
        </span>
      </div>
    </div>
  );
}

/**
 * Photo block. When an `imageKey` resolves to a license-verified photo (see
 * `screeningImages`), the real image is shown behind a dark wash so text
 * stays readable. When no verified image exists, this gracefully falls back
 * to the designed sunset SVG art — a Waikiki-style horizon with a film-strip
 * silhouette — never an empty hole, never an unverified image.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  imageKey,
}: {
  accent: HiffScreening["accent"];
  label: string;
  className?: string;
  tall?: boolean;
  /** key into screeningImages — usually an event slug, or "hero" */
  imageKey?: string;
}) {
  const img = imageKey ? screeningImages[imageKey] : undefined;

  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#3a2652] bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={
        img
          ? `HIFF photograph — ${label}`
          : `HIFF photography placeholder — ${label}`
      }
    >
      {img && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/ph:scale-[1.04]"
            style={{
              objectPosition: img.position ?? "center",
              filter: "saturate(1.08) contrast(1.03) brightness(.92)",
            }}
          />
          {/* violet-dusk wash for legibility + on-brand grade */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1030]/50 via-[#f16a5c]/12 to-[#0e0819]/72 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#0e0819]/15" />
        </>
      )}

      {/* Golden-hour art: a sunset horizon, palm silhouette, and a small
          film-strip motif. Always rendered — full strength as the fallback,
          dimmed to a texture layer over real photos. All inline SVG —
          nothing hotlinked. */}
      <svg
        className={`absolute inset-0 h-full w-full transition-opacity ${
          img ? "opacity-20" : "opacity-100"
        }`}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`hiff-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1030" stopOpacity="1" />
            <stop offset="45%" stopColor="#5a2f52" stopOpacity="1" />
            <stop offset="75%" stopColor="#f16a5c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f5a742" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id={`hiff-sun-${accent}`} cx="50%" cy="72%" r="30%">
            <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f5a742" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5a742" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sky */}
        <rect width="400" height="300" fill={`url(#hiff-sky-${accent})`} />
        {/* sun glow */}
        <circle cx="200" cy="216" r="90" fill={`url(#hiff-sun-${accent})`} />
        {/* sun disc */}
        <circle cx="200" cy="216" r="34" fill="#ffe3ab" opacity="0.9" />

        {/* stars, upper sky */}
        {[24, 70, 132, 205, 290, 352, 110, 245, 330].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={8 + (i % 4) * 10}
            r={i % 3 === 0 ? 1.2 : 0.7}
            fill="#f7f2ea"
            opacity="0.55"
          />
        ))}

        {/* ocean horizon band + soft reflection */}
        <rect x="0" y="230" width="400" height="70" fill="#12222a" opacity="0.55" />
        <rect x="0" y="230" width="400" height="6" fill="#f5a742" opacity="0.25" />

        {/* palm silhouette, lower-left */}
        <g transform="translate(48 300)" opacity="0.9" fill="#0e0819">
          <path d="M0 0 C -3 -60 4 -110 10 -140 C 14 -118 18 -70 12 0 Z" />
          <path d="M10 -138 C -18 -150 -34 -142 -46 -122 C -24 -128 -8 -128 8 -118 Z" />
          <path d="M10 -138 C 2 -160 -8 -168 -26 -172 C -8 -166 4 -154 10 -134 Z" />
          <path d="M12 -138 C 34 -150 50 -140 60 -120 C 40 -126 24 -124 12 -116 Z" />
          <path d="M12 -138 C 26 -158 40 -164 56 -164 C 38 -158 24 -148 14 -132 Z" />
          <path d="M11 -139 C 9 -162 12 -176 20 -190 C 14 -174 12 -158 13 -136 Z" />
        </g>

        {/* film-strip border motif along the bottom */}
        <g opacity="0.4">
          {[16, 44, 72, 100, 128, 156, 184, 212, 240, 268, 296, 324, 352, 380].map((x) => (
            <rect key={x} x={x} y="286" width="10" height="8" rx="1.5" fill="#f7f2ea" opacity="0.5" />
          ))}
        </g>
      </svg>

      {/* Soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0612]/72 to-transparent" />

      {/* Caption + license credit chip (CC) or swap-in note (fallback) */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="hiff-cond text-[13px] font-semibold leading-tight text-[#f7f2ea] drop-shadow-sm">
            {img?.caption ?? label}
          </span>
          {img?.credit ? (
            <span className="inline-flex shrink-0 items-center rounded-md border border-[#f7f2ea]/25 bg-[#0e0819]/55 px-2.5 py-1 text-[9px] font-medium leading-tight text-[#f7f2ea]/90 backdrop-blur-sm">
              {img.credit}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#f5a742]/40 bg-[#0e0819]/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f7f2ea]/90 backdrop-blur-sm">
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
              HIFF sample art
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Page-local hero background motion: a slow sunset-glow shimmer and gentle
 * drifting light "sparkle" (standing in for sun-on-water glints), plus a
 * soft palm-frond sway on the horizon.
 *
 * CSS/SVG only — no JS, no canvas, no new deps. All keyframes/classes are
 * namespaced `hiff-*` in a scoped <style> block.
 *
 * ACCESSIBILITY: every animation is wrapped in
 * `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users get
 * a still sunset scene. Pointer events disabled, aria-hidden throughout.
 */
export function PremiereMotion() {
  const glints = [
    { l: "8%", s: 2.0, d: 8, delay: 0, o: 0.5 },
    { l: "18%", s: 1.3, d: 11, delay: 2, o: 0.35 },
    { l: "27%", s: 2.4, d: 7, delay: 1, o: 0.55 },
    { l: "36%", s: 1.5, d: 9.5, delay: 3.5, o: 0.35 },
    { l: "45%", s: 1.9, d: 8.5, delay: 1.6, o: 0.45 },
    { l: "54%", s: 1.2, d: 12, delay: 4.5, o: 0.3 },
    { l: "63%", s: 2.2, d: 7.5, delay: 2.4, o: 0.5 },
    { l: "72%", s: 1.6, d: 10, delay: 3.2, o: 0.4 },
    { l: "81%", s: 2.0, d: 8, delay: 0.5, o: 0.45 },
    { l: "90%", s: 1.4, d: 11.5, delay: 4, o: 0.35 },
  ];

  return (
    <div className="hiff-motion pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Sunset shimmer band */}
      <div className="hiff-sunsetglow absolute inset-x-0 top-0 h-2/3" />

      {/* Water glints along the lower band */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 overflow-hidden">
        {glints.map((g, i) => (
          <span
            key={i}
            className="hiff-glint absolute rounded-full bg-[#ffe3ab]"
            style={
              {
                left: g.l,
                bottom: `${10 + (i % 4) * 12}%`,
                width: `${g.s}px`,
                height: `${g.s}px`,
                opacity: g.o,
                ["--hiff-twinkle" as string]: `${g.d}s`,
                ["--hiff-delay" as string]: `${g.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Palm silhouette on the right horizon, gentle sway */}
      <div className="hiff-palm absolute bottom-0 right-[6%] w-[110px] opacity-[0.5] sm:w-[150px]">
        <svg viewBox="0 0 100 220" className="h-auto w-full" fill="none" aria-hidden="true">
          <path d="M50 220 C 46 150 52 90 58 40" stroke="#0e0819" strokeWidth="7" fill="none" />
          <g fill="#0e0819">
            <path d="M58 40 C 20 20 -6 34 -18 66 C 14 52 42 52 58 62 Z" />
            <path d="M58 40 C 30 8 4 -6 -22 -6 C 4 6 30 24 56 54 Z" />
            <path d="M60 40 C 88 18 116 26 132 54 C 100 44 74 46 58 58 Z" />
            <path d="M60 40 C 84 4 112 -8 138 -4 C 108 4 80 20 58 52 Z" />
            <path d="M58 42 C 54 10 60 -14 74 -34 C 62 -10 56 16 58 46 Z" />
          </g>
        </svg>
      </div>

      <style>{`
        /* Static defaults — what reduced-motion users (and no-CSS) get. */
        .hiff-sunsetglow {
          background:
            radial-gradient(120% 80% at 22% 100%, rgba(245,167,66,0.16), transparent 58%),
            radial-gradient(120% 90% at 74% 100%, rgba(241,106,92,0.12), transparent 62%),
            radial-gradient(90% 70% at 50% 0%, rgba(208,129,217,0.10), transparent 60%);
          opacity: 0.9;
          filter: blur(2px);
        }
        .hiff-glint { display: none; }
        .hiff-palm { transform-origin: bottom center; }

        @media (prefers-reduced-motion: no-preference) {
          .hiff-glint {
            display: block;
            animation: hiff-twinkle var(--hiff-twinkle, 9s) ease-in-out infinite;
            animation-delay: var(--hiff-delay, 0s);
          }
          @keyframes hiff-twinkle {
            0%, 100% { opacity: 0.15; transform: scale(0.8); }
            50%      { opacity: 1;    transform: scale(1.15); }
          }

          .hiff-sunsetglow { animation: hiff-shimmer 16s ease-in-out infinite; }
          @keyframes hiff-shimmer {
            0%, 100% { opacity: 0.7; transform: translateX(-2%) scaleY(1); }
            50%      { opacity: 1;   transform: translateX(3%) scaleY(1.06); }
          }

          .hiff-palm { animation: hiff-sway 7s ease-in-out infinite; }
          @keyframes hiff-sway {
            0%, 100% { transform: rotate(-1.2deg); }
            50%      { transform: rotate(1.2deg); }
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Sample disclaimer shown on every proof page, per the brief.
 */
export function SampleNote() {
  const credits = Object.values(screeningImages)
    .map((i) => i.attribution)
    .filter((a): a is string => Boolean(a));

  return (
    <div className="mx-auto max-w-5xl px-6 pb-12">
      <div className="hiff-panel px-5 py-4 text-center text-xs leading-relaxed text-[#b3a6c4]">
        <p>
          Photography on this sample uses{" "}
          <span className="font-semibold text-[#f7f2ea]">
            openly-licensed Creative Commons
          </span>{" "}
          Waikiki, Honolulu, and cinema imagery, credited below. No HIFF-
          specific festival photography was available under an open license,
          so this sample uses verified Waikiki/Honolulu and film-motif
          photography instead. The final build would use{" "}
          <span className="font-semibold text-[#f7f2ea]">
            HIFF&apos;s own official festival photography
          </span>{" "}
          and logo in their place. Sample built by{" "}
          <a
            href={SITE}
            className="font-semibold text-[#f5a742] underline underline-offset-2 hover:text-[#d8862a]"
          >
            BlueWave Projects
          </a>{" "}
          on public info. HIFF46&apos;s October 22–November 1, 2026 dates and
          October 21 kickoff are confirmed directly by HIFF&apos;s own site;
          the detailed program shown reflects the most recently completed
          (HIFF45, 2025) festival and is clearly labeled as past-festival
          reference, not a 2026 claim. This page is not affiliated with or
          endorsed by the Hawai&apos;i International Film Festival.
        </p>

        {credits.length > 0 && (
          <details className="mt-3 text-left">
            <summary className="hiff-cond cursor-pointer text-center text-[11px] font-semibold tracking-[0.14em] text-[#f7f2ea] marker:content-none">
              Image credits &amp; licenses
            </summary>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#9c8fae]">
              {credits.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * schema.org Event JSON-LD built from grounded data. We do not assert prices
 * (none are published for HIFF46), so we omit the offers block rather than
 * invent one.
 */
export function screeningJsonLd(e: HiffScreening) {
  return {
    "@context": "https://schema.org",
    "@type": "ScreeningEvent",
    name: e.name,
    startDate: e.isoStart,
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
    description: e.deep?.metaDescription ?? e.teaser,
    organizer: {
      "@type": "Organization",
      name: "Hawai'i International Film Festival",
      url: "https://hiff.org",
    },
    isAccessibleForFree: e.ticketed === "free",
  };
}

/**
 * FAQPage JSON-LD for the detail pages.
 */
export function faqJsonLd(e: HiffScreening) {
  if (!e.deep) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: e.deep.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
