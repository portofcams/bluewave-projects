// Shared presentational pieces for the Iditarod 2027 sample/proof pages.
// Honest framing per the brief: this is a sample built on public info, not an
// official ITC product. Photography is public-domain / openly-licensed; the
// final build would swap in the ITC's own official imagery and logo.
//
// THEME: "Rugged heritage" (Direction 3, approved) — a vintage race-poster look
// on a warm cream paper canvas, deep spruce ink, rust/oxblood accents, and an
// aged-gold seal. Matches the .t3- section of
// /public/demos/iditarod-themes.html.
//
// SCOPING RULE: every style this file injects is namespaced under the
// `.idit-heritage` wrapper class (see <HeritageShell>). There are NO bare
// body/html/:root/h1/h2 selectors, so nothing leaks to the rest of
// bluewaveprojects.com. Pages MUST wrap their content in <HeritageShell> for the
// scoped font + paper canvas + card/photo styles to apply.

import type { CSSProperties } from "react";
import type { IditarodEvent } from "./events";
import { SITE } from "./events";

// Page-local brand tokens (kept here so the pages share one source of truth).
// Same export name as before (IDITAROD) so existing imports keep resolving; only
// the values change to the heritage palette. New named fields are additive.
export const IDITAROD = {
  // core heritage palette
  paper: "#F3EAD7", // warm cream canvas
  paperDeep: "#efe3c9", // shaded cream (gradients / card wells)
  kraft: "#e6d7ba", // aged kraft tone
  ink: "#1f3d2f", // deep spruce ink (body text)
  inkDark: "#14241c", // darker spruce for small text
  spruce: "#1f3d2f", // primary accent (spruce green)
  spruceDeep: "#152a20", // deep spruce (borders / shadows)
  rust: "#B5502A", // secondary accent (rust / oxblood)
  rustDeep: "#7d3517", // shaded rust (button borders)
  gold: "#C08A2D", // aged gold (seal ring)
  muted: "#6b5f4a", // muted warm brown (captions / meta)
  border: "#d8c9a8", // hairline on cream
  // legacy alias kept so any old reference to `.text` still resolves to ink
  text: "#1f3d2f",
} as const;

// ---------------------------------------------------------------------------
// REAL, LICENSE-VERIFIED PHOTOGRAPHY
// ---------------------------------------------------------------------------
// Every image below was verified on Wikimedia Commons before use. Source URL +
// exact license recorded per image. Public-domain (US Gov) images need no
// credit; CC-BY / CC-BY-SA images carry an on-image credit chip AND a line in
// the SampleNote. If a license could not be confidently verified, NO image was
// added and the designed SVG placeholder is kept instead.
//
// Files live in /public/demos/iditarod/ (scoped to this demo only).
export type IditarodImage = {
  /** /public path */
  src: string;
  /** short credit shown on-image when attribution is required (CC) */
  credit?: string;
  /** full credit + license + source for the SampleNote */
  attribution?: string;
  /** how it should be framed in the placeholder box */
  position?: string;
  /** true for US-Government public-domain works (no attribution required) */
  publicDomain?: boolean;
};

export const eventImages: Record<string, IditarodImage> = {
  // Iditarod start line 2020 — Quintin Soloviev, CC BY-SA 4.0
  // https://commons.wikimedia.org/wiki/File:Iditarod_start_line_2020_(Quintin_Soloviev).jpg
  hero: {
    src: "/demos/iditarod/hero-start-line.webp",
    credit: "Photo: Quintin Soloviev (CC BY-SA 4.0)",
    attribution:
      "Hero — Iditarod start line, 2020. Photo by Quintin Soloviev, CC BY-SA 4.0, via Wikimedia Commons.",
    position: "center 38%",
  },
  // Ceremonial start 2022 — Paxson Woelber / The Alaska Landmine, CC BY 2.0
  // https://commons.wikimedia.org/wiki/File:Iditarod_ceremonial_start_2022_(51929466131).jpg
  "ceremonial-start": {
    src: "/demos/iditarod/event-ceremonial-start.webp",
    credit: "Photo: Paxson Woelber / The Alaska Landmine (CC BY 2.0)",
    attribution:
      "Ceremonial Start — 2022 Iditarod ceremonial start, Anchorage. Photo used via Creative Commons license courtesy Paxson Woelber, The Alaska Landmine (CC BY 2.0), via Wikimedia Commons.",
    position: "center 42%",
  },
  // Brent Sass departing Rainy Pass, Iditarod 2020 — Quintin Soloviev, CC BY-SA 4.0
  // https://commons.wikimedia.org/wiki/File:Brent_Sass_departing_Rainy_Pass_checkpoint_during_Iditarod_2020_(Quintin_Soloviev).jpg
  "restart-willow": {
    src: "/demos/iditarod/event-rainy-pass.webp",
    credit: "Photo: Quintin Soloviev (CC BY-SA 4.0)",
    attribution:
      "Official Restart — Brent Sass departing Rainy Pass, Iditarod 2020. Photo by Quintin Soloviev, CC BY-SA 4.0, via Wikimedia Commons.",
    position: "center 30%",
  },
  // 2005 Iditarod start in Willow — Tech. Sgt. Keith Brown, US Air Force, Public Domain
  // https://commons.wikimedia.org/wiki/File:Iditarod_2005_-_Knolmayer_start_in_Willow.JPG
  "finishers-banquet-nome": {
    src: "/demos/iditarod/event-dog-team.webp",
    credit: "Photo: Frank Kovalchek (CC BY 2.0)",
    attribution:
      "Finisher's Banquet — Iditarod sled-dog team on the trail (Jen Seavey's team, 2009 ceremonial start). Photo by Frank Kovalchek, CC BY 2.0, via Wikimedia Commons.",
    position: "center 35%",
  },
  // Jen Seavey's team comin' round the bend, 2009 ceremonial start — Frank Kovalchek, CC BY 2.0
  // https://commons.wikimedia.org/wiki/File:Jen_Seavy's_Iditarod_sled_dog_team_comin'_round_the_bend_(3420562034).jpg
  "mushers-banquet": {
    src: "/demos/iditarod/event-willow-start.webp",
    publicDomain: true,
    attribution:
      "Musher's Banquet — 2005 Iditarod start in Willow, Alaska. U.S. Air Force photo by Tech. Sgt. Keith Brown (public domain), via Wikimedia Commons.",
    position: "center 22%",
  },
  // Aurora borealis over Eielson AFB — USAF / Senior Airman Joshua Strang, Public Domain
  // https://commons.wikimedia.org/wiki/File:Aurora_borealis_over_Eielson_Air_Force_Base,_Alaska.jpg
  "documentary-premiere": {
    src: "/demos/iditarod/event-aurora.webp",
    publicDomain: true,
    attribution:
      "Documentary Premiere — Aurora borealis over Eielson Air Force Base, Alaska. U.S. Air Force photo by Senior Airman Joshua Strang (public domain), via Wikimedia Commons.",
    position: "center 45%",
  },
};

// Accent gradients per event — heritage spruce/rust duotone wells sitting behind
// the photo placeholders. The `accent` key still maps 1:1 to the event data;
// only the colors changed from the old blue palette to spruce/rust/gold so the
// SVG fallback art and the photo wash both read as vintage race-poster.
export const accentGradient: Record<IditarodEvent["accent"], string> = {
  ice: "from-[#2b4d3b] via-[#1f3d2f] to-[#152a20]",
  lava: "from-[#c05f36] via-[#B5502A] to-[#7d3517]",
  ocean: "from-[#2b4d3b] via-[#1f3d2f] to-[#14241c]",
  glacier: "from-[#3a5c49] via-[#1f3d2f] to-[#152a20]",
  aurora: "from-[#c9922f] via-[#8a6320] to-[#1f3d2f]",
};

// On-brand text color for dates / inline accents (used on cream cards).
export const accentText: Record<IditarodEvent["accent"], string> = {
  ice: "text-[#1f3d2f]",
  lava: "text-[#B5502A]",
  ocean: "text-[#1f3d2f]",
  glacier: "text-[#1f3d2f]",
  aurora: "text-[#B5502A]",
};

export const ticketBadge: Record<
  IditarodEvent["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Ticketed event",
    cls: "bg-[#1f3d2f]/8 text-[#1f3d2f] border-[#1f3d2f]/25",
  },
  auction: {
    label: "Auction / experience",
    cls: "bg-[#B5502A]/10 text-[#B5502A] border-[#B5502A]/30",
  },
  "free-spectate": {
    label: "Free to spectate",
    cls: "bg-[#C08A2D]/12 text-[#8a6320] border-[#C08A2D]/35",
  },
};

// ---------------------------------------------------------------------------
// HERITAGE SHELL — the scoped wrapper every page mounts its content inside.
// ---------------------------------------------------------------------------
/**
 * Wraps page content in the `.idit-heritage` namespace and injects ONE scoped
 * <style> block that:
 *   - imports the vintage display fonts (Oswald condensed + Zilla Slab) INSIDE
 *     the shell so they apply only to these demo pages,
 *   - paints the warm cream paper canvas with a pure-CSS paper texture (layered
 *     repeating/radial gradients — no external image),
 *   - defines the display-font helper class (`.idit-display`) and the body serif,
 *   - defines the ticket-stub card styles (perforated notch edges + dashed rule),
 *   - defines the heritage photo-overlay / duotone filter used by images.
 *
 * ALL selectors are prefixed with `.idit-heritage` — there are no bare
 * body/html/:root/h1/h2 rules, so nothing leaks site-wide.
 *
 * Usage:
 *   <HeritageShell>
 *     ...page markup...
 *   </HeritageShell>
 */
export function HeritageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`idit-heritage ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Zilla+Slab:ital,wght@0,400;0,600;0,700;1,500&family=Rye&display=swap');

        /* --- paper canvas + base type (scoped to the shell) --- */
        .idit-heritage {
          position: relative;
          color: ${IDITAROD.ink};
          font-family: 'Zilla Slab', Georgia, serif;
          line-height: 1.55;
          background-color: ${IDITAROD.paper};
          background-image:
            radial-gradient(circle at 18% 22%, rgba(181,80,42,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 72% 64%, rgba(31,61,47,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 40% 88%, rgba(20,36,28,.04) 0 1px, transparent 2px),
            repeating-linear-gradient(90deg, rgba(20,36,28,.018) 0 2px, transparent 2px 5px),
            repeating-linear-gradient(0deg, rgba(20,36,28,.02) 0 2px, transparent 2px 6px),
            linear-gradient(135deg, #f6eeda 0%, ${IDITAROD.paperDeep} 100%);
        }
        .idit-heritage ::selection { background: rgba(181,80,42,.22); }

        /* The shared site Nav is styled for dark pages (white links at 50%);
           on the cream canvas they wash out. Re-ink the links — but leave any
           link that carries its own bg (the CTA button) untouched. */
        .idit-heritage nav a { color: rgba(31,61,47,.72); }
        .idit-heritage nav a:hover { color: ${IDITAROD.ink}; }
        .idit-heritage nav a[class*="bg-"] { color: #F3EAD7; }
        .idit-heritage nav a[class*="bg-"]:hover { color: #F3EAD7; }

        /* --- display type helper --- */
        .idit-heritage .idit-display {
          font-family: 'Oswald', 'Zilla Slab', sans-serif;
          text-transform: uppercase;
          letter-spacing: .02em;
        }
        .idit-heritage .idit-eyebrow {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .4em;
          font-weight: 600;
          font-size: 12px;
          color: ${IDITAROD.rust};
        }
        /* decorative seal face (available for hero flourishes) */
        .idit-heritage .idit-fancy { font-family: 'Rye', 'Oswald', serif; }

        /* --- dashed section rule (vintage ticket perforation motif) --- */
        .idit-heritage .idit-perf-rule {
          width: 120px; height: 3px; margin: 16px auto 0;
          background: repeating-linear-gradient(90deg, ${IDITAROD.spruce} 0 10px, transparent 10px 16px);
        }

        /* --- TICKET-STUB CARD ---------------------------------------------- */
        .idit-heritage .idit-ticket {
          position: relative;
          background: linear-gradient(180deg, #fbf5e6, ${IDITAROD.paperDeep});
          border: 2px solid ${IDITAROD.spruce};
          box-shadow: 6px 6px 0 rgba(31,61,47,.18);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .idit-heritage .idit-ticket:hover {
          transform: translateY(-5px);
          box-shadow: 9px 12px 0 rgba(31,61,47,.22);
        }
        /* perforation notches punched into the left/right edges of the stub */
        .idit-heritage .idit-ticket::before,
        .idit-heritage .idit-ticket::after {
          content: ""; position: absolute; width: 22px; height: 22px;
          border-radius: 50%;
          background: ${IDITAROD.paper};
          border: 2px solid ${IDITAROD.spruce};
          top: 58%; transform: translateY(-50%); z-index: 3;
        }
        .idit-heritage .idit-ticket::before { left: -13px; }
        .idit-heritage .idit-ticket::after  { right: -13px; }
        /* dashed tear line between a stub's photo and its body */
        .idit-heritage .idit-stub-tear {
          border-bottom: 2px dashed ${IDITAROD.spruce};
        }
        .idit-heritage .idit-stub-foot {
          border-top: 2px dashed rgba(31,61,47,.4);
        }

        /* --- HERITAGE PHOTO OVERLAY / DUOTONE ------------------------------ */
        /* warm sepia grade applied to real photos so they sit in the palette */
        .idit-heritage .idit-photo-grade {
          filter: sepia(.28) saturate(1.05) contrast(1.02) brightness(.98);
        }
        /* spruce->rust wash layer (place absolutely over a photo) */
        .idit-heritage .idit-photo-wash {
          background: linear-gradient(180deg, rgba(31,61,47,.30), rgba(20,36,28,.62));
          mix-blend-mode: multiply;
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEAL — circular vintage stamp: "EST. 1973 · THE LAST GREAT RACE"
// ---------------------------------------------------------------------------
/**
 * A self-contained CSS/SVG seal. Gold ring on a spruce disc, curved text top &
 * bottom, "EST. 1973" in the core. Purely presentational (aria-hidden). Scales
 * with the `size` prop (px). No dependency on <HeritageShell> — it carries its
 * own inline colors — but it reads best on a cream or photo background.
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
        background: `radial-gradient(circle at 50% 45%, rgba(243,234,215,.14), ${IDITAROD.spruceDeep} 72%), ${IDITAROD.spruce}`,
        border: `3px solid ${IDITAROD.paper}`,
        boxShadow: `0 0 0 6px ${IDITAROD.gold}, 0 0 0 8px ${IDITAROD.paper}, 0 14px 34px rgba(0,0,0,.45)`,
      }}
      aria-label="Established 1973 — The Last Great Race"
    >
      <svg
        viewBox="0 0 230 230"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="idit-seal-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="idit-seal-arc-bot" d="M 34 115 A 81 81 0 0 0 196 115" fill="none" />
        </defs>
        <text
          fill={IDITAROD.paper}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "12.5px",
            letterSpacing: "2.4px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#idit-seal-arc-top" startOffset="50%" textAnchor="middle">
            The Last Great Race
          </textPath>
        </text>
        <text
          fill={IDITAROD.paper}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "11.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#idit-seal-arc-bot" startOffset="50%" textAnchor="middle">
            Anchorage · To · Nome
          </textPath>
        </text>
        {/* inner gold hairline ring */}
        <circle cx="115" cy="115" r="70" fill="none" stroke={IDITAROD.gold} strokeWidth="1.5" opacity="0.8" />
      </svg>
      <div
        className="relative text-center"
        style={{
          color: IDITAROD.paper,
          fontFamily: "'Oswald', sans-serif",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "block", fontSize: 10, letterSpacing: "0.24em" }}>
          EST.
        </span>
        <b
          style={{
            display: "block",
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1,
            color: IDITAROD.rust,
            textShadow: "0 1px 2px rgba(0,0,0,.6)",
          }}
        >
          1973
        </b>
        <span
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.28em",
            marginTop: 6,
            color: "#e9dcbf",
          }}
        >
          Alaska
        </span>
      </div>
    </div>
  );
}

/**
 * Photo block. When an `imageKey` resolves to a license-verified photo (see
 * `eventImages`), the real image is shown behind a warm heritage spruce/rust
 * wash + sepia grade so text stays readable and the photo sits in the palette.
 * When no verified image exists for a slot, this gracefully falls back to the
 * designed spruce/rust woodcut SVG art — never an empty hole, never an
 * unverified image. Optionally framed as a perforated ticket stub.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  imageKey,
  stub = false,
}: {
  accent: IditarodEvent["accent"];
  label: string;
  className?: string;
  tall?: boolean;
  /** key into eventImages — usually an event slug, or "hero" */
  imageKey?: string;
  /** frame as a squared-off ticket stub (heritage) instead of rounded corners */
  stub?: boolean;
}) {
  const img = imageKey ? eventImages[imageKey] : undefined;

  return (
    <div
      className={`group/ph relative overflow-hidden bg-gradient-to-br ${accentGradient[accent]} ${
        stub
          ? "border-2 border-[#1f3d2f] shadow-[6px_6px_0_rgba(31,61,47,0.18)]"
          : "rounded-3xl border border-[#1f3d2f]/25"
      } ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={
        img
          ? `Iditarod photograph — ${label}`
          : `Iditarod photography placeholder — ${label}`
      }
    >
      {/* Real, license-verified photo (when available) behind a warm heritage
          wash. The sepia grade + spruce/rust multiply layer keep the caption
          legible and pull every photo into the cream/spruce palette. */}
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
              filter: "sepia(.28) saturate(1.05) contrast(1.02) brightness(.98)",
            }}
          />
          {/* spruce->oxblood duotone wash for legibility + on-brand color grade */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f3d2f]/55 via-[#7d3517]/28 to-[#14241c]/68 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#14241c]/18" />
        </>
      )}

      {/* Woodcut aurora arc + snow drift + a sled team on the trail. Always
          rendered: it is the fallback art when no verified photo exists, and a
          subtle texture layer (dimmed) when a real photo sits behind it. All
          inline SVG in cream/gold on spruce — nothing hotlinked. */}
      <svg
        className={`absolute inset-0 h-full w-full transition-opacity ${
          img ? "opacity-25" : "opacity-100"
        }`}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`aurora-${accent}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C08A2D" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#e9dcbf" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#B5502A" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`glow-${accent}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F3EAD7" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#F3EAD7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft overhead glow */}
        <rect width="400" height="300" fill={`url(#glow-${accent})`} />

        {/* aurora ribbons (aged-gold woodcut arcs) */}
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

        {/* stars (cream flecks) */}
        {[28, 72, 150, 210, 300, 360, 120, 250].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={18 + (i % 4) * 14}
            r={i % 3 === 0 ? 1.4 : 0.9}
            fill="#F3EAD7"
            opacity="0.6"
          />
        ))}

        {/* snow horizon / drifts (cream) */}
        <path
          d="M0 210 C 70 196, 130 224, 210 208 S 340 196, 400 214 L400 300 L0 300 Z"
          fill="#F3EAD7"
          opacity="0.10"
        />
        <path
          d="M0 240 C 90 226, 150 256, 230 240 S 350 230, 400 246 L400 300 L0 300 Z"
          fill="#F3EAD7"
          opacity="0.15"
        />

        {/* trail line winding to the horizon (cream dashes) */}
        <path
          d="M40 286 C 120 262, 150 250, 200 244 S 280 234, 318 226"
          stroke="#F3EAD7"
          strokeWidth="1.4"
          strokeDasharray="2 6"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />

        {/* a sled dog team + musher woodcut silhouette on the trail */}
        <g
          fill="#14241c"
          opacity="0.85"
          transform="translate(86 232) scale(1.05)"
        >
          {/* gangline */}
          <path
            d="M2 14 L120 4"
            stroke="#14241c"
            strokeWidth="1"
            opacity="0.5"
            fill="none"
          />
          {/* four dogs in a line (simple side-profile silhouettes) */}
          {[112, 86, 60, 34].map((x) => (
            <g key={x} transform={`translate(${x} 6)`}>
              <ellipse cx="0" cy="4" rx="7" ry="3.4" />
              <circle cx="6.5" cy="2" r="2.4" />
              <path d="M-6 6 L-9 11 M-2 6 L-4 12 M3 6 L2 12 M6 6 L7 11" stroke="#14241c" strokeWidth="1" />
              <path d="M-7 3 L-11 1" stroke="#14241c" strokeWidth="1.3" />
            </g>
          ))}
          {/* sled + musher */}
          <g transform="translate(-2 0)">
            <path d="M-12 14 L8 12" stroke="#14241c" strokeWidth="1.6" />
            <path d="M-12 14 L-15 8 M-10 14 L-12 6" stroke="#14241c" strokeWidth="1.4" />
            <ellipse cx="-13" cy="2" rx="2.6" ry="3.4" />
            <rect x="-15" y="5" width="5" height="6" rx="1.5" />
          </g>
        </g>
      </svg>

      {/* Soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#14241c]/60 to-transparent" />

      {/* Classy, small caption. With a real photo it carries the required
          license credit; without one it signals the final build uses ITC's own
          official image. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="idit-display text-[13px] font-semibold leading-tight tracking-[0.02em] text-[#F3EAD7] drop-shadow-sm">
            {label}
          </span>
          {img?.credit ? (
            // CC images: on-image attribution chip (required by license).
            <span className="inline-flex shrink-0 items-center rounded-sm border border-[#F3EAD7]/25 bg-[#14241c]/45 px-2.5 py-1 text-[9px] font-medium leading-tight text-[#F3EAD7]/90 backdrop-blur-sm">
              {img.credit}
            </span>
          ) : (
            // PD images + SVG fallback: signal the live build swaps in ITC art.
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#C08A2D]/45 bg-[#1f3d2f]/40 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#F3EAD7]/90 backdrop-blur-sm">
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
              {img ? "Public domain" : "ITC photo"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Page-local hero background motion: gentle falling flecks, a soft aged-gold
 * aurora shimmer, and a spruce sled-dog team + musher woodcut running across on
 * a slow seamless loop.
 *
 * Everything here is CSS/SVG only — no JS, no canvas, no new deps. All
 * keyframes/classes are namespaced `idit-*` and defined in a scoped <style>
 * block so nothing leaks to the rest of bluewaveprojects.com.
 *
 * ACCESSIBILITY: every animation is wrapped in
 * `@media (prefers-reduced-motion: no-preference)`. Users who ask for reduced
 * motion get a still scene (the dog team is parked off-frame / static, no
 * drift, no aurora shimmer). Pointer events are disabled and the whole layer is
 * aria-hidden so it never interferes with text or screen readers.
 */
export function IditarodMotion() {
  // A handful of snowflakes with varied size / speed / start offset. Kept small
  // and low-opacity so hero text stays fully readable over the motion.
  const flakes = [
    { l: "6%", s: 2.2, d: 13, delay: 0, o: 0.5 },
    { l: "15%", s: 1.4, d: 18, delay: 4, o: 0.4 },
    { l: "24%", s: 2.8, d: 11, delay: 1.5, o: 0.55 },
    { l: "33%", s: 1.6, d: 16, delay: 6, o: 0.38 },
    { l: "42%", s: 2.0, d: 14, delay: 2.5, o: 0.5 },
    { l: "51%", s: 1.3, d: 20, delay: 8, o: 0.35 },
    { l: "60%", s: 2.6, d: 12, delay: 3.5, o: 0.55 },
    { l: "69%", s: 1.7, d: 17, delay: 5.5, o: 0.42 },
    { l: "78%", s: 2.3, d: 13, delay: 0.8, o: 0.5 },
    { l: "87%", s: 1.5, d: 19, delay: 7, o: 0.4 },
    { l: "94%", s: 2.1, d: 15, delay: 2, o: 0.48 },
    { l: "11%", s: 1.2, d: 22, delay: 9, o: 0.32 },
    { l: "47%", s: 1.4, d: 21, delay: 10, o: 0.34 },
    { l: "83%", s: 1.3, d: 23, delay: 11, o: 0.33 },
  ];

  return (
    <div className="idit-motion pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Aurora shimmer band */}
      <div className="idit-aurora absolute inset-x-0 top-0 h-2/3" />

      {/* Falling snow */}
      <div className="absolute inset-0 overflow-hidden">
        {flakes.map((f, i) => (
          <span
            key={i}
            className="idit-flake absolute -top-2 rounded-full bg-[#F3EAD7]"
            style={
              {
                left: f.l,
                width: `${f.s}px`,
                height: `${f.s}px`,
                opacity: f.o,
                ["--idit-fall" as string]: `${f.d}s`,
                ["--idit-delay" as string]: `${f.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Sled-dog team + musher running across the hero on a slow loop. The
          inner wrapper translates the whole rig from off-left to off-right; the
          legs get a tiny gait wobble. Silhouette in deep Iditarod blue, low
          opacity so it reads as atmosphere behind the headline. */}
      <div className="idit-team-track absolute bottom-[12%] left-0 w-[42%] max-w-[520px] min-w-[300px]">
        <svg
          viewBox="0 0 320 70"
          className="h-auto w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* gangline */}
          <path
            d="M14 52 L300 40"
            stroke="#1f3d2f"
            strokeWidth="1.4"
            opacity="0.55"
          />
          {/* dog team — 8 dogs in pairs, side profile */}
          {[300, 268, 236, 204, 172, 140, 108, 76].map((x, i) => (
            <g
              key={x}
              transform={`translate(${x} ${40 + i * 1.6})`}
              fill="#1f3d2f"
              opacity="0.88"
            >
              <ellipse cx="0" cy="6" rx="11" ry="5" />
              <circle cx="10" cy="2.5" r="3.6" />
              <path d="M12.5 0.5 L15.5 -2.5" stroke="#1f3d2f" strokeWidth="1.6" />
              <path d="M-11 4 L-15 1" stroke="#1f3d2f" strokeWidth="2" />
              {/* legs with subtle gait */}
              <g className="idit-legs">
                <path d="M-8 10 L-10 18 M-3 10 L-5 19 M3 10 L4 18 M8 10 L10 19" stroke="#1f3d2f" strokeWidth="1.7" />
              </g>
            </g>
          ))}
          {/* sled + musher */}
          <g transform="translate(40 38)" fill="#1f3d2f" opacity="0.9">
            <path d="M-22 16 L10 12" stroke="#1f3d2f" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M-22 16 L-27 6 M-18 16 L-23 4" stroke="#1f3d2f" strokeWidth="2" />
            {/* musher */}
            <ellipse cx="-24" cy="-2" rx="3.6" ry="4.6" />
            <rect x="-27" y="2" width="6.5" height="10" rx="2.2" />
            <path d="M-21 5 L-13 9" stroke="#1f3d2f" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <style>{`
        /* Static defaults — what reduced-motion users (and no-CSS) get. */
        .idit-team-track { transform: translateX(58%); opacity: 0.16; }
        .idit-aurora {
          background:
            radial-gradient(120% 80% at 20% 0%, rgba(192,138,45,0.18), transparent 60%),
            radial-gradient(120% 90% at 75% 0%, rgba(181,80,42,0.13), transparent 62%);
          opacity: 0.8;
          filter: blur(2px);
        }
        .idit-flake { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .idit-flake {
            display: block;
            animation: idit-fall var(--idit-fall, 16s) linear infinite;
            animation-delay: var(--idit-delay, 0s);
          }
          @keyframes idit-fall {
            0%   { transform: translate(0, -10px); }
            100% { transform: translate(14px, 105vh); }
          }

          .idit-aurora { animation: idit-shimmer 14s ease-in-out infinite; }
          @keyframes idit-shimmer {
            0%, 100% { opacity: 0.55; transform: translateX(-2%) scaleY(1); }
            50%      { opacity: 0.95; transform: translateX(3%) scaleY(1.08); }
          }

          .idit-team-track {
            opacity: 0.18;
            animation: idit-run 30s linear infinite;
          }
          /* seamless loop: start fully off the left, exit fully off the right */
          @keyframes idit-run {
            0%   { transform: translateX(-65%); }
            100% { transform: translateX(255%); }
          }

          .idit-legs { animation: idit-gait 0.5s steps(2, jump-none) infinite; transform-origin: center; }
          @keyframes idit-gait {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-0.8px); }
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
  // Credits for the openly-licensed photography used in this sample, drawn from
  // the single source of truth in `eventImages` so they can never drift.
  const credits = Object.values(eventImages)
    .map((i) => i.attribution)
    .filter((a): a is string => Boolean(a));

  return (
    <div className="mx-auto max-w-5xl px-6 pb-12">
      <div className="rounded-sm border-2 border-[#1f3d2f]/30 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] px-5 py-4 text-center text-xs leading-relaxed text-[#6b5f4a] shadow-[4px_4px_0_rgba(31,61,47,0.12)]">
        <p>
          Photography on this sample uses{" "}
          <span className="font-semibold text-[#1f3d2f]">
            public-domain and openly-licensed
          </span>{" "}
          Iditarod and Alaska imagery (U.S. government works plus Creative
          Commons photos, credited below). The final build would use the{" "}
          <span className="font-semibold text-[#1f3d2f]">
            Iditarod Trail Committee&apos;s own official photography
          </span>{" "}
          and logo in their place. Sample built by{" "}
          <a
            href={SITE}
            className="font-semibold text-[#B5502A] underline underline-offset-2 hover:text-[#7d3517]"
          >
            BlueWave Projects
          </a>{" "}
          on public info. Event dates and locations are sourced from the
          official Iditarod calendar; items marked{" "}
          <span className="rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[#B5502A]">
            [confirm]
          </span>{" "}
          are real recurring events whose 2027 prices or exact dates are not yet
          published. This page is not affiliated with or endorsed by the
          Iditarod Trail Committee.
        </p>

        <details className="mt-3 text-left">
          <summary className="idit-display cursor-pointer text-center text-[11px] font-semibold tracking-[0.14em] text-[#1f3d2f] marker:content-none">
            Image credits &amp; licenses
          </summary>
          <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#8a7d63]">
            {credits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </details>
      </div>
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
