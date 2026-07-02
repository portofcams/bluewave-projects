// Shared presentational pieces for the AIFF 2026 sample/proof pages.
// Honest framing per the brief: this is a sample built on public info, not an
// official Anchorage International Film Festival product. Photography is
// openly-licensed (Creative Commons, verified below); the final build would
// swap in AIFF's own festival photography and logo.
//
// THEME: "Marquee lights" — a deep charcoal cinema-screen canvas under warm
// marquee-bulb gold, with a cool aurora-blue accent (Alaska, winter, night
// sky) standing in for a "spotlight" cool tone. Sibling to Iditarod
// (rugged heritage), Rondy (midwinter carnival gold/brick-red), and Fair
// (WPA harvest wheat/cream) — deliberately distinct: AIFF is a film festival,
// not a wilderness race, carnival, or agricultural fair. The marquee-bulb
// motif (a classic theater marquee's chasing lights) doubles as a visual echo
// of the site's own "Films Worth Freezing For" tagline: warm light against
// cold dark.
//
// SCOPING RULE: every style this file injects is namespaced under the
// `.aiff-marquee` wrapper class (see <MarqueeShell>). There are NO bare
// body/html/:root/h1/h2 selectors, so nothing leaks to the rest of
// bluewaveprojects.com. Pages MUST wrap their content in <MarqueeShell>.

import type { CSSProperties } from "react";
import type { AiffScreening } from "./events";
import { SITE } from "./events";

// Page-local brand tokens — one source of truth for the pages.
export const AIFF = {
  // charcoal cinema-screen canvas
  charcoal: "#15151a", // deep charcoal canvas
  charcoalDeep: "#0a0a0d", // darkest charcoal (gradients / footers)
  panel: "#1e1e26", // marquee-panel charcoal (cards)
  panelDeep: "#181820", // shaded panel
  // aurora-blue atmosphere (Alaska night sky, background-only)
  auroraBlue: "#4fd6e8", // aurora-blue — sky/spotlight glow only, never UI text on its own
  auroraBlueDeep: "#2a9bb0",
  // marquee brand accents
  gold: "#f0b94a", // marquee-bulb gold — string lights, CTAs, eyebrows
  goldDeep: "#c9962e",
  red: "#c4453a", // reel-red — fills/borders, "now showing" accents
  redBright: "#e2685c", // lifted red for text/hover on charcoal
  // type
  snow: "#f3f1ea", // near-white body text on charcoal (warm white, film-stock tone)
  frost: "#a8a6ae", // muted captions / meta
  border: "#2e2e38", // hairline on charcoal
} as const;

// ---------------------------------------------------------------------------
// REAL, LICENSE-VERIFIED PHOTOGRAPHY
// ---------------------------------------------------------------------------
// Same discipline as the Iditarod/Rondy/Fair samples: every image is verified
// on Wikimedia Commons before use, with source URL + exact license recorded
// here. CC images carry an on-image credit chip AND a line in the SampleNote.
// If a license can't be confidently verified, NO image is added and the
// designed SVG marquee art is kept.
//
// NOTE: photos here are deliberately Anchorage-skyline and cinema-motif, NOT
// AIFF-specific — no openly-licensed AIFF festival photography was found
// during research (their own photos are copyrighted festival property, as
// expected). This mirrors how the Fair demo mixed real-but-generic sourcing
// where festival-specific CC photography didn't exist.
//
// Files live in /public/demos/aiff/ (scoped to this demo only).
export type AiffImage = {
  src: string;
  credit?: string;
  attribution?: string;
  position?: string;
  publicDomain?: boolean;
  caption?: string;
};

export const screeningImages: Record<string, AiffImage> = {
  // Downtown Anchorage skyline at sunset in February, Chugach Mountains
  // behind — Will Buckner, CC BY 2.0 (license verified at source 2026-07-02).
  // https://commons.wikimedia.org/wiki/File:Anchorage_Skyline_in_Winter_-_Hotel_Captain_Cook_-_Anchorage_Alaska.jpg
  hero: {
    src: "/demos/aiff/hero-anchorage-winter.webp",
    credit: "Photo: Will Buckner (CC BY 2.0)",
    attribution:
      "Hero — downtown Anchorage skyline at sunset on a cold February day, Chugach Mountains on the horizon. Photo by Will Buckner, CC BY 2.0, via Wikimedia Commons.",
    caption: "Downtown Anchorage, winter — AIFF's home turf",
    position: "center 55%",
  },
  // Aerial daylight skyline of Anchorage — Quintin Soloviev, CC BY 4.0
  // (license verified at source 2026-07-02).
  // https://commons.wikimedia.org/wiki/File:Anchorage_skyline.jpg
  "opening-night-burt": {
    src: "/demos/aiff/skyline-aerial.webp",
    credit: "Photo: Quintin Soloviev (CC BY 4.0)",
    attribution:
      "Anchorage skyline, aerial view. Photo by Quintin Soloviev, CC BY 4.0, via Wikimedia Commons.",
    caption: "Downtown Anchorage skyline",
    position: "center 50%",
  },
  // Film reel detail — big-ashb, CC BY 2.0 (license verified at source
  // 2026-07-02). https://www.flickr.com/photos/big-ashb/4106842721
  "anchorage-museum-screenings": {
    src: "/demos/aiff/film-reel.webp",
    credit: "Photo: big-ashb (CC BY 2.0)",
    attribution:
      "Film reel detail. Photo by big-ashb, CC BY 2.0, via Flickr / Openverse.",
    caption: "35mm film reel",
    position: "center 50%",
  },
  // Stacked film reels — big-ashb, CC BY 2.0 (license verified at source
  // 2026-07-02). https://www.flickr.com/photos/big-ashb/4106839701
  "all-access-pass-explainer": {
    src: "/demos/aiff/film-reels-vintage.webp",
    credit: "Photo: big-ashb (CC BY 2.0)",
    attribution:
      "Stacked film reels. Photo by big-ashb, CC BY 2.0, via Flickr / Openverse.",
    caption: "Film reels, ready to screen",
    position: "center 50%",
  },
  // Awards Ceremony intentionally keeps the designed marquee art: no openly
  // licensed photography of Williwaw Social or AIFF's own awards night
  // exists, and we never substitute a generic look-alike (honesty guard).
};

// Accent gradients per screening — charcoal duotone wells behind the photo
// placeholders. Five accents map 1:1 to the event data.
export const accentGradient: Record<AiffScreening["accent"], string> = {
  marquee: "from-[#3a2a10] via-[#1e1e26] to-[#0a0a0d]",
  "aurora-blue": "from-[#0e2f36] via-[#15151a] to-[#0a0a0d]",
  "reel-red": "from-[#3a1512] via-[#1e1e26] to-[#0a0a0d]",
  midnight: "from-[#181828] via-[#15151a] to-[#08080b]",
  frost: "from-[#1c2426] via-[#15151a] to-[#0a0a0d]",
};

// On-brand text color for dates / inline accents (used on charcoal panels).
export const accentText: Record<AiffScreening["accent"], string> = {
  marquee: "text-[#f0b94a]",
  "aurora-blue": "text-[#4fd6e8]",
  "reel-red": "text-[#e2685c]",
  midnight: "text-[#4fd6e8]",
  frost: "text-[#a8a6ae]",
};

export const ticketBadge: Record<
  AiffScreening["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Ticketed",
    cls: "bg-[#f0b94a]/12 text-[#f0b94a] border-[#f0b94a]/40",
  },
  free: {
    label: "Free",
    cls: "bg-[#f3f1ea]/10 text-[#f3f1ea] border-[#f3f1ea]/35",
  },
  unpublished: {
    label: "2026 ticketing not yet live",
    cls: "bg-[#4fd6e8]/12 text-[#4fd6e8] border-[#4fd6e8]/40",
  },
};

export const vendorBadge: Record<
  "FilmBOT" | "GoElEvent",
  { cls: string }
> = {
  FilmBOT: { cls: "border-[#c4453a]/50 bg-[#c4453a]/15 text-[#e2685c]" },
  GoElEvent: { cls: "border-[#4fd6e8]/50 bg-[#4fd6e8]/15 text-[#4fd6e8]" },
};

// ---------------------------------------------------------------------------
// MARQUEE SHELL — the scoped wrapper every page mounts its content inside.
// ---------------------------------------------------------------------------
/**
 * Wraps page content in the `.aiff-marquee` namespace and injects ONE scoped
 * <style> block that:
 *   - imports the marquee display fonts (Bebas Neue + Oswald + Karla) inside
 *     the shell so they apply only to these demo pages,
 *   - paints the charcoal cinema-screen canvas with a subtle spotlight-glow
 *     gradient (pure CSS — no external image),
 *   - defines the display-font helpers (`.aiff-display`, `.aiff-eyebrow`),
 *   - defines the marquee-panel card styles + the chasing-bulb border motif,
 *   - defines the dark photo-wash used over real images.
 *
 * ALL selectors are prefixed with `.aiff-marquee` — no bare body/html/:root
 * rules, so nothing leaks site-wide.
 */
export function MarqueeShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`aiff-marquee ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Karla:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        /* --- charcoal cinema-screen canvas + base type (scoped to the shell) --- */
        .aiff-marquee {
          position: relative;
          color: ${AIFF.snow};
          font-family: 'Karla', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          background-color: ${AIFF.charcoal};
          background-image:
            radial-gradient(ellipse 110% 55% at 50% -8%, rgba(240,185,74,.10), transparent 55%),
            radial-gradient(ellipse 80% 45% at 85% 0%, rgba(79,214,232,.08), transparent 60%),
            linear-gradient(180deg, #191920 0%, ${AIFF.charcoal} 40%, ${AIFF.charcoalDeep} 100%);
        }
        .aiff-marquee ::selection { background: rgba(196,69,58,.5); }

        /* --- display type helpers --- */
        /* Bebas Neue for tall condensed marquee-poster headlines. */
        .aiff-marquee .aiff-display {
          font-family: 'Bebas Neue', 'Oswald', sans-serif;
          font-weight: 400;
          letter-spacing: .02em;
        }
        .aiff-marquee .aiff-cond {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .aiff-marquee .aiff-eyebrow {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .38em;
          font-weight: 600;
          font-size: 12px;
          color: ${AIFF.gold};
        }

        /* --- marquee section rule: a strip of chasing gold bulbs --- */
        .aiff-marquee .aiff-rule {
          width: 140px; height: 8px; margin: 16px auto 0;
          background-image: radial-gradient(circle 2.8px at 7px 4px, ${AIFF.gold} 0 2.1px, rgba(240,185,74,.28) 2.1px 3.2px, transparent 3.4px);
          background-size: 14px 8px;
          background-repeat: repeat-x;
          filter: drop-shadow(0 0 3px rgba(240,185,74,.7));
        }
        @media (prefers-reduced-motion: no-preference) {
          .aiff-marquee .aiff-rule {
            animation: aiff-chase 1s steps(2) infinite;
          }
        }
        @keyframes aiff-chase {
          to { background-position-x: 14px; }
        }

        /* --- MARQUEE PANEL (card) ------------------------------------------ */
        .aiff-marquee .aiff-panel {
          position: relative;
          background: linear-gradient(180deg, ${AIFF.panel}, ${AIFF.panelDeep});
          border: 1px solid ${AIFF.border};
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,.5);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .aiff-marquee a.aiff-panel:hover,
        .aiff-marquee .aiff-panel-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(240,185,74,.45);
          box-shadow: 0 16px 40px rgba(0,0,0,.6), 0 0 24px rgba(240,185,74,.08);
        }
        /* string of marquee bulbs along a panel's top edge */
        .aiff-marquee .aiff-string {
          position: relative;
        }
        .aiff-marquee .aiff-string::before,
        .aiff-marquee .aiff-string::after {
          content: ""; position: absolute; left: 14px; right: 14px; top: -4px;
          height: 8px; z-index: 3; pointer-events: none;
          background-image: radial-gradient(circle 3px at 8px 4px, ${AIFF.gold} 0 2.2px, rgba(240,185,74,.35) 2.2px 3.4px, transparent 3.5px);
          background-size: 26px 8px;
          background-repeat: repeat-x;
          filter: drop-shadow(0 0 4px rgba(240,185,74,.65));
        }
        .aiff-marquee .aiff-string::after {
          background-position-x: 13px;
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .aiff-marquee .aiff-string::before {
            animation: aiff-twinkle 1.4s ease-in-out infinite;
          }
          .aiff-marquee .aiff-string::after {
            animation: aiff-twinkle 1.4s ease-in-out infinite reverse;
          }
        }
        @keyframes aiff-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: .25; }
        }

        /* --- DARK PHOTO WASH ------------------------------------------------ */
        .aiff-marquee .aiff-photo-wash {
          background: linear-gradient(180deg, rgba(21,21,26,.35), rgba(10,10,13,.72));
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEAL — circular festival stamp: "ANCHORAGE INTERNATIONAL FILM FESTIVAL ·
// 26TH ANNUAL · EST. 2000" — a marquee-light ring around a projector-reel core.
// ---------------------------------------------------------------------------
/**
 * Self-contained CSS/SVG seal. Gold ring on a charcoal disc with curved text
 * and "26th" in the core. Purely presentational (aria-hidden internals).
 * AIFF's own site frames itself as the 26th annual in 2026.
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
        transform: "rotate(-8deg)",
        background: `radial-gradient(circle at 50% 42%, rgba(79,214,232,.22), ${AIFF.charcoalDeep} 74%), ${AIFF.panel}`,
        border: `3px solid ${AIFF.snow}`,
        boxShadow: `0 0 0 6px ${AIFF.gold}, 0 0 0 8px ${AIFF.charcoalDeep}, 0 14px 34px rgba(0,0,0,.55)`,
      }}
      aria-label="Anchorage International Film Festival — 26th annual, Anchorage, Alaska"
    >
      <svg
        viewBox="0 0 230 230"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="aiff-seal-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="aiff-seal-arc-bot" d="M 34 115 A 81 81 0 0 0 196 115" fill="none" />
        </defs>
        <text
          fill={AIFF.snow}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "12px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#aiff-seal-arc-top" startOffset="50%" textAnchor="middle">
            Anchorage Int&apos;l Film Fest
          </textPath>
        </text>
        <text
          fill={AIFF.snow}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "11.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#aiff-seal-arc-bot" startOffset="50%" textAnchor="middle">
            Anchorage · Alaska
          </textPath>
        </text>
        <circle cx="115" cy="115" r="70" fill="none" stroke={AIFF.gold} strokeWidth="1.5" opacity="0.85" />
      </svg>
      <div
        className="relative text-center"
        style={{
          color: AIFF.snow,
          fontFamily: "'Oswald', sans-serif",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "block", fontSize: 10, letterSpacing: "0.24em" }}>
          The
        </span>
        <b
          style={{
            display: "block",
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1,
            color: AIFF.gold,
            textShadow: "0 1px 3px rgba(0,0,0,.7)",
          }}
        >
          26th
        </b>
        <span
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.28em",
            marginTop: 6,
            color: "#c9c7d0",
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
 * to the designed marquee SVG art — a lit theater marquee with chasing bulbs
 * under an aurora-blue night sky — never an empty hole, never an unverified
 * image.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  imageKey,
}: {
  accent: AiffScreening["accent"];
  label: string;
  className?: string;
  tall?: boolean;
  /** key into screeningImages — usually an event slug, or "hero" */
  imageKey?: string;
}) {
  const img = imageKey ? screeningImages[imageKey] : undefined;

  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#2e2e38] bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={
        img
          ? `AIFF photograph — ${label}`
          : `AIFF photography placeholder — ${label}`
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
              filter: "saturate(1.05) contrast(1.04) brightness(.9)",
            }}
          />
          {/* charcoal night wash for legibility + on-brand grade */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#15151a]/50 via-[#c4453a]/14 to-[#0a0a0d]/72 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#0a0a0d]/15" />
        </>
      )}

      {/* Marquee-night art: a lit theater marquee, chasing bulbs, aurora-blue
          sky glow, and a projector beam. Always rendered — full strength as
          the fallback, dimmed to a texture layer over real photos. All inline
          SVG — nothing hotlinked. */}
      <svg
        className={`absolute inset-0 h-full w-full transition-opacity ${
          img ? "opacity-20" : "opacity-100"
        }`}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`aiff-glow-${accent}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4fd6e8" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#f0b94a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f0b94a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`aiff-spot-${accent}`} cx="50%" cy="15%" r="55%">
            <stop offset="0%" stopColor="#f0b94a" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#f0b94a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* aurora-blue sky wash */}
        <path
          d="M-20 40 C 80 5, 170 65, 260 30 S 420 15, 440 50"
          stroke={`url(#aiff-glow-${accent})`}
          strokeWidth="40"
          fill="none"
          opacity="0.85"
        />

        {/* stars */}
        {[24, 70, 132, 205, 290, 352, 110, 245, 330].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={10 + (i % 4) * 11}
            r={i % 3 === 0 ? 1.3 : 0.8}
            fill="#f3f1ea"
            opacity="0.6"
          />
        ))}

        {/* spotlight glow from above */}
        <rect width="400" height="300" fill={`url(#aiff-spot-${accent})`} />

        {/* Theater marquee: rectangle canopy with chasing bulbs + a vertical
            blade sign, positioned lower-right like a corner storefront. */}
        <g transform="translate(255 168)" opacity="0.95">
          {/* vertical blade sign */}
          <rect x="60" y="-92" width="26" height="130" rx="3" fill="#0d0d10" stroke="#f0b94a" strokeWidth="1.4" />
          <text x="73" y="-30" textAnchor="middle" fill="#f0b94a" fontSize="11" fontFamily="'Oswald', sans-serif" transform="rotate(90 73 -30)" letterSpacing="2">
            AIFF
          </text>
          {/* canopy */}
          <rect x="-10" y="-6" width="90" height="34" rx="2" fill="#101014" stroke="#f0b94a" strokeWidth="1.4" />
          <line x1="-10" y1="18" x2="80" y2="18" stroke="#f0b94a" strokeWidth="1" opacity="0.5" />
          {/* chasing bulbs along the canopy edge */}
          {[-4, 4, 12, 20, 28, 36, 44, 52, 60, 68, 76].map((x, i) => (
            <circle
              key={x}
              className="aiff-wheelbulb"
              style={{ animationDelay: `${(i % 4) * 0.4}s` }}
              cx={x}
              cy={22}
              r="1.9"
              fill="#f0b94a"
              opacity="0.95"
            />
          ))}
          {/* support pole */}
          <path d="M20 28 L20 92" stroke="#0d0d10" strokeWidth="6" opacity="0.9" />
        </g>

        {/* projector beam sweeping from lower-left toward the marquee */}
        <path
          d="M-10 260 L 220 150 L 220 168 L -10 275 Z"
          fill="#f0b94a"
          opacity="0.06"
        />

        {/* film-strip border motif along the bottom */}
        <g opacity="0.35">
          {[16, 44, 72, 100, 128, 156, 184, 212, 240, 268, 296, 324, 352, 380].map((x) => (
            <rect key={x} x={x} y="286" width="10" height="8" rx="1.5" fill="#f3f1ea" opacity="0.5" />
          ))}
        </g>
      </svg>

      {/* Soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08080b]/72 to-transparent" />

      {/* Caption + license credit chip (CC) or swap-in note (fallback) */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="aiff-cond text-[13px] font-semibold leading-tight text-[#f3f1ea] drop-shadow-sm">
            {img?.caption ?? label}
          </span>
          {img?.credit ? (
            <span className="inline-flex shrink-0 items-center rounded-md border border-[#f3f1ea]/25 bg-[#0a0a0d]/55 px-2.5 py-1 text-[9px] font-medium leading-tight text-[#f3f1ea]/90 backdrop-blur-sm">
              {img.credit}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#f0b94a]/40 bg-[#0a0a0d]/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f3f1ea]/90 backdrop-blur-sm">
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
              AIFF sample art
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Page-local hero background motion: a slow aurora-blue sky shimmer, gentle
 * falling snow, and chasing marquee bulbs along a horizon-line blade sign.
 *
 * CSS/SVG only — no JS, no canvas, no new deps. All keyframes/classes are
 * namespaced `aiff-*` in a scoped <style> block.
 *
 * ACCESSIBILITY: every animation is wrapped in
 * `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users get
 * a still night scene. Pointer events disabled, aria-hidden throughout.
 */
export function MarqueeMotion() {
  const flakes = [
    { l: "5%", s: 2.2, d: 13, delay: 0, o: 0.5 },
    { l: "14%", s: 1.4, d: 18, delay: 4, o: 0.35 },
    { l: "23%", s: 2.8, d: 11, delay: 1.5, o: 0.55 },
    { l: "32%", s: 1.6, d: 16, delay: 6, o: 0.35 },
    { l: "41%", s: 2.0, d: 14, delay: 2.5, o: 0.45 },
    { l: "50%", s: 1.3, d: 20, delay: 8, o: 0.3 },
    { l: "59%", s: 2.6, d: 12, delay: 3.5, o: 0.5 },
    { l: "68%", s: 1.7, d: 17, delay: 5.5, o: 0.4 },
    { l: "77%", s: 2.3, d: 13, delay: 0.8, o: 0.45 },
    { l: "86%", s: 1.5, d: 19, delay: 7, o: 0.35 },
    { l: "93%", s: 2.1, d: 15, delay: 2, o: 0.45 },
    { l: "10%", s: 1.2, d: 22, delay: 9, o: 0.28 },
    { l: "46%", s: 1.4, d: 21, delay: 10, o: 0.3 },
    { l: "82%", s: 1.3, d: 23, delay: 11, o: 0.28 },
  ];

  return (
    <div className="aiff-motion pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Aurora-blue shimmer band */}
      <div className="aiff-aurora absolute inset-x-0 top-0 h-2/3" />

      {/* Falling snow */}
      <div className="absolute inset-0 overflow-hidden">
        {flakes.map((f, i) => (
          <span
            key={i}
            className="aiff-flake absolute -top-2 rounded-full bg-[#f3f1ea]"
            style={
              {
                left: f.l,
                width: `${f.s}px`,
                height: `${f.s}px`,
                opacity: f.o,
                ["--aiff-fall" as string]: `${f.d}s`,
                ["--aiff-delay" as string]: `${f.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Marquee blade sign on the right horizon, chasing bulbs down its edge */}
      <div className="absolute bottom-0 right-[6%] w-[130px] opacity-[0.4] sm:w-[170px]">
        <svg viewBox="0 0 100 220" className="h-auto w-full" fill="none" aria-hidden="true">
          <rect x="18" y="8" width="64" height="196" rx="4" fill="#0d0d10" stroke="#f0b94a" strokeWidth="2" />
          <text x="50" y="115" textAnchor="middle" fill="#f0b94a" fontSize="15" fontFamily="'Oswald', sans-serif" letterSpacing="3" transform="rotate(90 50 115)">
            AIFF · 26
          </text>
          {[18, 34, 50, 66, 82, 98, 114, 130, 146, 162, 178, 194].map((y, i) => (
            <g key={y}>
              <circle
                className="aiff-wheelbulb"
                style={{ animationDelay: `${(i % 4) * 0.4}s` }}
                cx="22"
                cy={y}
                r="2.4"
                fill="#f0b94a"
              />
              <circle
                className="aiff-wheelbulb"
                style={{ animationDelay: `${((i + 2) % 4) * 0.4}s` }}
                cx="78"
                cy={y}
                r="2.4"
                fill="#f0b94a"
              />
            </g>
          ))}
        </svg>
      </div>

      <style>{`
        /* Static defaults — what reduced-motion users (and no-CSS) get. */
        .aiff-aurora {
          background:
            radial-gradient(120% 80% at 22% 0%, rgba(79,214,232,0.14), transparent 58%),
            radial-gradient(120% 90% at 74% 0%, rgba(240,185,74,0.10), transparent 62%);
          opacity: 0.85;
          filter: blur(2px);
        }
        .aiff-flake { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .aiff-flake {
            display: block;
            animation: aiff-fall var(--aiff-fall, 16s) linear infinite;
            animation-delay: var(--aiff-delay, 0s);
          }
          @keyframes aiff-fall {
            0%   { transform: translate(0, -10px); }
            100% { transform: translate(14px, 105vh); }
          }

          .aiff-aurora { animation: aiff-shimmer 14s ease-in-out infinite; }
          @keyframes aiff-shimmer {
            0%, 100% { opacity: 0.6; transform: translateX(-2%) scaleY(1); }
            50%      { opacity: 1; transform: translateX(3%) scaleY(1.08); }
          }

          .aiff-wheelbulb { animation: aiff-twinkle 1.8s ease-in-out infinite; }
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
      <div className="aiff-panel px-5 py-4 text-center text-xs leading-relaxed text-[#a8a6ae]">
        <p>
          Photography on this sample uses{" "}
          <span className="font-semibold text-[#f3f1ea]">
            openly-licensed Creative Commons
          </span>{" "}
          Anchorage and cinema imagery, credited below. No AIFF-specific
          festival photography was available under an open license, so this
          sample uses verified Anchorage skyline and film-motif photography
          instead. The final build would use{" "}
          <span className="font-semibold text-[#f3f1ea]">
            AIFF&apos;s own official festival photography
          </span>{" "}
          and logo in their place. Sample built by{" "}
          <a
            href={SITE}
            className="font-semibold text-[#f0b94a] underline underline-offset-2 hover:text-[#c9962e]"
          >
            BlueWave Projects
          </a>{" "}
          on public info. The 26th annual festival&apos;s December 4–13, 2026
          dates and four venues are confirmed directly by AIFF; the detailed
          program shown reflects the most recently completed (2025) festival
          and is clearly labeled as past-festival reference, not a 2026 claim.
          This page is not affiliated with or endorsed by the Anchorage
          International Film Festival.
        </p>

        {credits.length > 0 && (
          <details className="mt-3 text-left">
            <summary className="aiff-cond cursor-pointer text-center text-[11px] font-semibold tracking-[0.14em] text-[#f3f1ea] marker:content-none">
              Image credits &amp; licenses
            </summary>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#8a8890]">
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
 * (none are published for 2026), so we omit the offers block rather than
 * invent one.
 */
export function screeningJsonLd(e: AiffScreening) {
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
      name: "Anchorage International Film Festival",
      url: "https://anchoragefilmfestival.org",
    },
    isAccessibleForFree: e.ticketed === "free",
  };
}

/**
 * FAQPage JSON-LD for the detail pages.
 */
export function faqJsonLd(e: AiffScreening) {
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
