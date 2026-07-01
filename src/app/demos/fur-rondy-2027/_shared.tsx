// Shared presentational pieces for the Fur Rondy 2027 sample/proof pages.
// Honest framing per the brief: this is a sample built on public info, not an
// official Greater Anchorage, Inc. product. Photography is public-domain /
// openly-licensed; the final build would swap in Rondy's own imagery and logo.
//
// THEME: "Midwinter carnival" (approved) — a night-sky navy canvas under
// aurora green/violet ribbons, warm string-light gold, and chunky
// carnival-poster slab display type. Sibling to the Iditarod 2027 demo's
// rugged-heritage theme, deliberately distinct: Rondy is a winter carnival,
// not a wilderness race.
//
// SCOPING RULE: every style this file injects is namespaced under the
// `.rondy-carnival` wrapper class (see <CarnivalShell>). There are NO bare
// body/html/:root/h1/h2 selectors, so nothing leaks to the rest of
// bluewaveprojects.com. Pages MUST wrap their content in <CarnivalShell>.

import type { CSSProperties } from "react";
import type { RondyEvent } from "./events";
import { SITE } from "./events";

// Page-local brand tokens — one source of truth for the pages.
export const RONDY = {
  // night-sky canvas
  night: "#0c1230", // deep navy canvas
  nightDeep: "#070b1e", // darkest navy (gradients / footers)
  panel: "#121a3f", // booth-panel navy (cards)
  panelDeep: "#0e1533", // shaded panel
  // aurora atmosphere (background-only after the brand-hybrid retheme)
  aurora: "#3ddc97", // aurora green — sky ribbons only, never UI
  auroraDeep: "#1e9c66",
  violet: "#8b6cf0", // aurora violet — sky ribbons only, never UI
  violetDeep: "#5f43c4",
  // Rondy brand accents (sampled from furrondy.net: #eed24c / #af3334)
  gold: "#eed24c", // Rondy gold — string lights, CTAs, eyebrows
  goldDeep: "#c4a52e",
  red: "#af3334", // Rondy brick red — fills/borders
  redBright: "#e06568", // lifted red for text/hover on navy
  // type
  snow: "#eef2ff", // near-white body text on navy
  frost: "#aab4d8", // muted captions / meta
  border: "#26305c", // hairline on navy
} as const;

// ---------------------------------------------------------------------------
// REAL, LICENSE-VERIFIED PHOTOGRAPHY
// ---------------------------------------------------------------------------
// Same discipline as the Iditarod sample: every image is verified on Wikimedia
// Commons / DVIDS before use, with source URL + exact license recorded here.
// Public-domain (US Gov) images need no credit; CC images carry an on-image
// credit chip AND a line in the SampleNote. If a license can't be confidently
// verified, NO image is added and the designed SVG night-carnival art is kept.
//
// Files live in /public/demos/fur-rondy/ (scoped to this demo only).
export type RondyImage = {
  src: string;
  credit?: string;
  attribution?: string;
  position?: string;
  publicDomain?: boolean;
  /** Overrides the visible caption when the photo shows something more
   *  specific than the page context (honesty guard — never mislabel). */
  caption?: string;
};

export const eventImages: Record<string, RondyImage> = {
  // Fur Rondy attendees, downtown Anchorage — Paxson Woelber, CC BY 2.0
  // https://commons.wikimedia.org/wiki/File:Fur_Rondy._Anchorage,_Alaska_(25394235224).jpg
  hero: {
    src: "/demos/fur-rondy/hero-downtown.webp",
    credit: "Photo: Paxson Woelber (CC BY 2.0)",
    attribution:
      "Hero — attendees at the Fur Rondy festival, downtown Anchorage. Photo by Paxson Woelber, CC BY 2.0, via Wikimedia Commons.",
    caption: "Rondy crowds — downtown Anchorage",
    position: "center 30%",
  },
  // Running of the Reindeer 2014 — U.S. Army photo by Sgt. 1st Class Jason
  // Epperson (JBER public affairs), public domain.
  // https://commons.wikimedia.org/wiki/File:Anchorage,_Alaska%27s_7th_Annual_Running_of_the_Reindeer_140301-A-RK974-930.jpg
  "running-of-the-reindeer": {
    src: "/demos/fur-rondy/event-reindeer.webp",
    publicDomain: true,
    attribution:
      "Running of the Reindeer — runners and reindeer in downtown Anchorage, March 2014. U.S. Army photo by Sgt. 1st Class Jason Epperson (public domain), via Wikimedia Commons.",
    caption: "Running of the Reindeer — 4th Avenue, Anchorage",
    position: "center 28%",
  },
  // Fur Rondy race day, 4th Avenue, 1950 — Anchorage High School photo,
  // public domain. (A high-school Rendezvous ski race — used here for the
  // heritage angle: Rondy has packed 4th Avenue since before statehood.)
  // https://commons.wikimedia.org/wiki/File:Fur_Rondy_ski_race,_Anchorage,_Alaska_1950.jpg
  "world-championship-sled-dog-races": {
    src: "/demos/fur-rondy/event-4th-ave-1950.webp",
    publicDomain: true,
    attribution:
      "World Championship Sled Dog Races — Rondy race-day crowds lining 4th Avenue for a Rendezvous ski race, Anchorage, 1950. Anchorage High School photo (public domain), via Wikimedia Commons.",
    caption: "Rondy race day on 4th Avenue, 1950",
    position: "center 40%",
  },
  // Fireworks over the Anchorage skyline — Nat Wilson, CC BY-SA 2.0
  // https://commons.wikimedia.org/wiki/File:Anchorage_skyline_with_Fireworks.jpg
  "first-saturday-downtown": {
    src: "/demos/fur-rondy/event-fireworks.webp",
    credit: "Photo: Nat Wilson (CC BY-SA 2.0)",
    attribution:
      "First Saturday — fireworks over the Anchorage skyline. Photo by Nat Wilson, CC BY-SA 2.0, via Wikimedia Commons.",
    caption: "Fireworks over the Anchorage skyline",
    position: "center 55%",
  },
};

// Accent gradients per event — night-sky duotone wells behind the photo
// placeholders. Five accents map 1:1 to the event data.
export const accentGradient: Record<RondyEvent["accent"], string> = {
  aurora: "from-[#123c33] via-[#0c1230] to-[#070b1e]",
  violet: "from-[#2a2258] via-[#121a3f] to-[#070b1e]",
  ember: "from-[#4a2c14] via-[#1a1636] to-[#070b1e]",
  ice: "from-[#16325a] via-[#0c1230] to-[#070b1e]",
  midnight: "from-[#141c48] via-[#0c1230] to-[#05081a]",
};

// On-brand text color for dates / inline accents (used on navy panels).
export const accentText: Record<RondyEvent["accent"], string> = {
  aurora: "text-[#eed24c]",
  violet: "text-[#e06568]",
  ember: "text-[#eed24c]",
  ice: "text-[#7fb8f5]",
  midnight: "text-[#e06568]",
};

export const ticketBadge: Record<
  RondyEvent["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Ticketed",
    cls: "bg-[#eed24c]/12 text-[#eed24c] border-[#eed24c]/40",
  },
  register: {
    label: "Register to take part",
    cls: "bg-[#af3334]/25 text-[#e06568] border-[#af3334]/60",
  },
  free: {
    label: "Free",
    cls: "bg-[#eef2ff]/10 text-[#eef2ff] border-[#eef2ff]/35",
  },
  onsite: {
    label: "Pay on-site",
    cls: "bg-[#7fb8f5]/12 text-[#7fb8f5] border-[#7fb8f5]/40",
  },
};

// ---------------------------------------------------------------------------
// CARNIVAL SHELL — the scoped wrapper every page mounts its content inside.
// ---------------------------------------------------------------------------
/**
 * Wraps page content in the `.rondy-carnival` namespace and injects ONE scoped
 * <style> block that:
 *   - imports the carnival display fonts (Alfa Slab One + Oswald + Karla)
 *     inside the shell so they apply only to these demo pages,
 *   - paints the night-sky navy canvas with a pure-CSS star field (layered
 *     radial gradients — no external image),
 *   - defines the display-font helpers (`.rondy-display`, `.rondy-eyebrow`),
 *   - defines the booth-panel card styles + the string-light border motif,
 *   - defines the night photo-wash used over real images.
 *
 * ALL selectors are prefixed with `.rondy-carnival` — no bare body/html/:root
 * rules, so nothing leaks site-wide.
 */
export function CarnivalShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rondy-carnival ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rye&family=Alfa+Slab+One&family=Oswald:wght@400;500;600;700&family=Karla:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        /* --- night-sky canvas + base type (scoped to the shell) --- */
        .rondy-carnival {
          position: relative;
          color: ${RONDY.snow};
          font-family: 'Karla', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          background-color: ${RONDY.night};
          background-image:
            radial-gradient(circle at 12% 18%, rgba(238,242,255,.55) 0 1px, transparent 2px),
            radial-gradient(circle at 34% 6%, rgba(238,242,255,.4) 0 1px, transparent 2px),
            radial-gradient(circle at 58% 22%, rgba(238,242,255,.5) 0 1.2px, transparent 2px),
            radial-gradient(circle at 79% 9%, rgba(238,242,255,.35) 0 1px, transparent 2px),
            radial-gradient(circle at 91% 30%, rgba(238,242,255,.45) 0 1px, transparent 2px),
            radial-gradient(circle at 22% 44%, rgba(238,242,255,.25) 0 1px, transparent 2px),
            radial-gradient(circle at 68% 52%, rgba(238,242,255,.3) 0 1px, transparent 2px),
            radial-gradient(ellipse 120% 60% at 50% -10%, rgba(61,220,151,.10), transparent 55%),
            radial-gradient(ellipse 90% 50% at 80% -5%, rgba(139,108,240,.12), transparent 60%),
            linear-gradient(180deg, #0e1536 0%, ${RONDY.night} 40%, ${RONDY.nightDeep} 100%);
        }
        .rondy-carnival ::selection { background: rgba(175,51,52,.5); }

        /* --- display type helpers --- */
        /* Vintage circus woodtype for the big headlines (approved): Rye leads,
           Alfa Slab One as fallback so nothing collapses to a system serif
           while fonts load. */
        .rondy-carnival .rondy-display {
          font-family: 'Rye', 'Alfa Slab One', 'Oswald', serif;
          font-weight: 400;
          letter-spacing: .015em;
        }
        .rondy-carnival .rondy-cond {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .rondy-carnival .rondy-eyebrow {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .38em;
          font-weight: 600;
          font-size: 12px;
          color: ${RONDY.gold};
        }

        /* --- marquee section rule: a strip of gold bulbs that chase --- */
        .rondy-carnival .rondy-rule {
          width: 140px; height: 8px; margin: 16px auto 0;
          background-image: radial-gradient(circle 2.8px at 7px 4px, ${RONDY.gold} 0 2.1px, rgba(238,210,76,.28) 2.1px 3.2px, transparent 3.4px);
          background-size: 14px 8px;
          background-repeat: repeat-x;
          filter: drop-shadow(0 0 3px rgba(238,210,76,.7));
        }
        @media (prefers-reduced-motion: no-preference) {
          .rondy-carnival .rondy-rule {
            animation: rondy-chase 1s steps(2) infinite;
          }
        }
        @keyframes rondy-chase {
          to { background-position-x: 14px; }
        }

        /* --- BOOTH PANEL (card) -------------------------------------------- */
        .rondy-carnival .rondy-booth {
          position: relative;
          background: linear-gradient(180deg, ${RONDY.panel}, ${RONDY.panelDeep});
          border: 1px solid ${RONDY.border};
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(4,7,20,.5);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .rondy-carnival a.rondy-booth:hover,
        .rondy-carnival .rondy-booth-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(238,210,76,.45);
          box-shadow: 0 16px 40px rgba(4,7,20,.65), 0 0 24px rgba(238,210,76,.08);
        }
        /* string-light row along a panel's top edge: warm glowing bulbs */
        .rondy-carnival .rondy-string {
          position: relative;
        }
        .rondy-carnival .rondy-string::before,
        .rondy-carnival .rondy-string::after {
          content: ""; position: absolute; left: 14px; right: 14px; top: -4px;
          height: 8px; z-index: 3; pointer-events: none;
          background-image: radial-gradient(circle 3px at 8px 4px, ${RONDY.gold} 0 2.2px, rgba(238,210,76,.35) 2.2px 3.4px, transparent 3.5px);
          background-size: 26px 8px;
          background-repeat: repeat-x;
          filter: drop-shadow(0 0 4px rgba(238,210,76,.65));
        }
        /* second bulb layer offset half a period — the two alternate opacity
           for a classic marquee twinkle (full carnival energy, approved) */
        .rondy-carnival .rondy-string::after {
          background-position-x: 13px;
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .rondy-carnival .rondy-string::before {
            animation: rondy-twinkle 1.4s ease-in-out infinite;
          }
          .rondy-carnival .rondy-string::after {
            animation: rondy-twinkle 1.4s ease-in-out infinite reverse;
          }
        }
        @keyframes rondy-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: .25; }
        }

        /* gondolas on the designed Ferris-wheel art sway gently */
        @media (prefers-reduced-motion: no-preference) {
          .rondy-carnival .rondy-gondola {
            transform-box: fill-box;
            transform-origin: 50% 0%;
            animation: rondy-sway 3.6s ease-in-out infinite;
          }
          .rondy-carnival .rondy-wheelbulb {
            animation: rondy-twinkle 1.8s ease-in-out infinite;
          }
        }
        @keyframes rondy-sway {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }

        /* --- NIGHT PHOTO WASH ---------------------------------------------- */
        .rondy-carnival .rondy-photo-wash {
          background: linear-gradient(180deg, rgba(12,18,48,.35), rgba(7,11,30,.72));
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEAL — circular festival stamp: "FUR RENDEZVOUS · ANCHORAGE ALASKA · EST. 1935"
// ---------------------------------------------------------------------------
/**
 * Self-contained CSS/SVG seal. Gold ring on a night-navy disc with curved
 * text and "EST. 1935" in the core. Purely presentational (aria-hidden
 * internals). Rondy has run since 1935 — three years older than the modern
 * festival's own carnival lights.
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
        background: `radial-gradient(circle at 50% 42%, rgba(139,108,240,.28), ${RONDY.nightDeep} 74%), ${RONDY.panel}`,
        border: `3px solid ${RONDY.snow}`,
        boxShadow: `0 0 0 6px ${RONDY.gold}, 0 0 0 8px ${RONDY.nightDeep}, 0 14px 34px rgba(0,0,0,.55)`,
      }}
      aria-label="Fur Rendezvous — established 1935, Anchorage, Alaska"
    >
      <svg
        viewBox="0 0 230 230"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="rondy-seal-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="rondy-seal-arc-bot" d="M 34 115 A 81 81 0 0 0 196 115" fill="none" />
        </defs>
        <text
          fill={RONDY.snow}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "13px",
            letterSpacing: "2.6px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#rondy-seal-arc-top" startOffset="50%" textAnchor="middle">
            Fur Rendezvous
          </textPath>
        </text>
        <text
          fill={RONDY.snow}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "11.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#rondy-seal-arc-bot" startOffset="50%" textAnchor="middle">
            Anchorage · Alaska
          </textPath>
        </text>
        <circle cx="115" cy="115" r="70" fill="none" stroke={RONDY.gold} strokeWidth="1.5" opacity="0.85" />
      </svg>
      <div
        className="relative text-center"
        style={{
          color: RONDY.snow,
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
            color: RONDY.gold,
            textShadow: "0 1px 3px rgba(0,0,0,.7)",
          }}
        >
          1935
        </b>
        <span
          style={{
            display: "block",
            fontSize: 11,
            letterSpacing: "0.28em",
            marginTop: 6,
            color: "#c9d2f2",
          }}
        >
          Rondy
        </span>
      </div>
    </div>
  );
}

/**
 * Photo block. When an `imageKey` resolves to a license-verified photo (see
 * `eventImages`), the real image is shown behind a night wash so text stays
 * readable and the photo sits in the palette. When no verified image exists,
 * this gracefully falls back to the designed night-carnival SVG art — a lit
 * Ferris wheel under aurora ribbons — never an empty hole, never an
 * unverified image.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  imageKey,
}: {
  accent: RondyEvent["accent"];
  label: string;
  className?: string;
  tall?: boolean;
  /** key into eventImages — usually an event slug, or "hero" */
  imageKey?: string;
}) {
  const img = imageKey ? eventImages[imageKey] : undefined;

  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#26305c] bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={
        img
          ? `Fur Rondy photograph — ${label}`
          : `Fur Rondy photography placeholder — ${label}`
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
              filter: "saturate(1.06) contrast(1.03) brightness(.92)",
            }}
          />
          {/* navy night wash for legibility + on-brand grade */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1230]/50 via-[#5f43c4]/18 to-[#070b1e]/72 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[#070b1e]/15" />
        </>
      )}

      {/* Night-carnival art: aurora ribbons, star flecks, snowy horizon, and a
          lit Ferris wheel with string-light bulbs. Always rendered — full
          strength as the fallback, dimmed to a texture layer over real photos.
          All inline SVG — nothing hotlinked. */}
      <svg
        className={`absolute inset-0 h-full w-full transition-opacity ${
          img ? "opacity-20" : "opacity-100"
        }`}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`rondy-aur-${accent}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3ddc97" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#8b6cf0" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#8b6cf0" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`rondy-glow-${accent}`} cx="50%" cy="88%" r="55%">
            <stop offset="0%" stopColor="#eed24c" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#eed24c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* aurora ribbons */}
        <path
          d="M-20 55 C 80 15, 170 85, 260 45 S 420 25, 440 65"
          stroke={`url(#rondy-aur-${accent})`}
          strokeWidth="32"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M-20 92 C 90 66, 180 116, 265 84 S 420 74, 440 100"
          stroke={`url(#rondy-aur-${accent})`}
          strokeWidth="18"
          fill="none"
          opacity="0.65"
        />

        {/* stars */}
        {[24, 70, 132, 205, 290, 352, 110, 245, 330].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={14 + (i % 4) * 13}
            r={i % 3 === 0 ? 1.4 : 0.9}
            fill="#eef2ff"
            opacity="0.7"
          />
        ))}

        {/* snowy horizon drifts */}
        <path
          d="M0 226 C 70 212, 130 240, 210 224 S 340 212, 400 230 L400 300 L0 300 Z"
          fill="#eef2ff"
          opacity="0.08"
        />
        <path
          d="M0 252 C 90 238, 150 268, 230 252 S 350 242, 400 258 L400 300 L0 300 Z"
          fill="#eef2ff"
          opacity="0.12"
        />

        {/* warm midway glow rising from the horizon */}
        <rect width="400" height="300" fill={`url(#rondy-glow-${accent})`} />

        {/* Ferris wheel silhouette with lit bulbs */}
        <g transform="translate(302 178)" opacity="0.95">
          {/* support legs */}
          <path
            d="M-26 78 L0 0 L26 78"
            stroke="#070b1e"
            strokeWidth="6"
            fill="none"
            opacity="0.9"
          />
          {/* wheel rim + spokes */}
          <g stroke="#101838" strokeWidth="3.4" fill="none">
            <circle cx="0" cy="0" r="52" />
            <circle cx="0" cy="0" r="52" stroke="#eed24c" strokeWidth="1.1" opacity="0.55" />
            {[0, 30, 60, 90, 120, 150].map((a) => (
              <line
                key={a}
                x1={-52 * Math.cos((a * Math.PI) / 180)}
                y1={-52 * Math.sin((a * Math.PI) / 180)}
                x2={52 * Math.cos((a * Math.PI) / 180)}
                y2={52 * Math.sin((a * Math.PI) / 180)}
              />
            ))}
          </g>
          {/* rim bulbs — twinkle in a staggered ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
            <circle
              key={a}
              className="rondy-wheelbulb"
              style={{ animationDelay: `${(i % 4) * 0.45}s` }}
              cx={52 * Math.cos((a * Math.PI) / 180)}
              cy={52 * Math.sin((a * Math.PI) / 180)}
              r="2.1"
              fill="#eed24c"
              opacity="0.95"
            />
          ))}
          {/* gondolas — gentle staggered sway */}
          {[15, 75, 135, 195, 255, 315].map((a, i) => (
            <rect
              key={a}
              className="rondy-gondola"
              style={{ animationDelay: `${i * 0.55}s` }}
              x={52 * Math.cos((a * Math.PI) / 180) - 4}
              y={52 * Math.sin((a * Math.PI) / 180) - 1}
              width="8"
              height="7"
              rx="2"
              fill="#0a1028"
              stroke="#eed24c"
              strokeWidth="0.8"
            />
          ))}
          <circle cx="0" cy="0" r="4" fill="#eed24c" />
        </g>

        {/* string of lights swooping across the foreground */}
        <path
          d="M-10 208 C 80 232, 180 226, 268 210"
          stroke="#0a1028"
          strokeWidth="1.6"
          fill="none"
          opacity="0.8"
        />
        {[10, 42, 74, 106, 138, 170, 202, 234].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={212 + Math.sin((i / 7) * Math.PI) * 12}
            r="2.4"
            fill="#eed24c"
            opacity="0.92"
          />
        ))}
      </svg>

      {/* Soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#05081a]/72 to-transparent" />

      {/* Caption + license credit chip (CC) or swap-in note (PD / fallback) */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="rondy-cond text-[13px] font-semibold leading-tight text-[#eef2ff] drop-shadow-sm">
            {img?.caption ?? label}
          </span>
          {img?.credit ? (
            <span className="inline-flex shrink-0 items-center rounded-md border border-[#eef2ff]/25 bg-[#070b1e]/55 px-2.5 py-1 text-[9px] font-medium leading-tight text-[#eef2ff]/90 backdrop-blur-sm">
              {img.credit}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[#eed24c]/40 bg-[#070b1e]/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eef2ff]/90 backdrop-blur-sm">
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
              {img ? "Public domain" : "Rondy photo"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Page-local hero background motion: gentle falling snow, an aurora shimmer in
 * green/violet, and a slowly turning Ferris wheel silhouette on the horizon.
 *
 * CSS/SVG only — no JS, no canvas, no new deps. All keyframes/classes are
 * namespaced `rondy-*` in a scoped <style> block.
 *
 * ACCESSIBILITY: every animation is wrapped in
 * `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users get a
 * still night scene. Pointer events disabled, aria-hidden throughout.
 */
export function RondyMotion() {
  const flakes = [
    { l: "5%", s: 2.2, d: 13, delay: 0, o: 0.55 },
    { l: "14%", s: 1.4, d: 18, delay: 4, o: 0.4 },
    { l: "23%", s: 2.8, d: 11, delay: 1.5, o: 0.6 },
    { l: "32%", s: 1.6, d: 16, delay: 6, o: 0.4 },
    { l: "41%", s: 2.0, d: 14, delay: 2.5, o: 0.5 },
    { l: "50%", s: 1.3, d: 20, delay: 8, o: 0.35 },
    { l: "59%", s: 2.6, d: 12, delay: 3.5, o: 0.55 },
    { l: "68%", s: 1.7, d: 17, delay: 5.5, o: 0.45 },
    { l: "77%", s: 2.3, d: 13, delay: 0.8, o: 0.5 },
    { l: "86%", s: 1.5, d: 19, delay: 7, o: 0.4 },
    { l: "93%", s: 2.1, d: 15, delay: 2, o: 0.5 },
    { l: "10%", s: 1.2, d: 22, delay: 9, o: 0.32 },
    { l: "46%", s: 1.4, d: 21, delay: 10, o: 0.35 },
    { l: "82%", s: 1.3, d: 23, delay: 11, o: 0.33 },
  ];

  return (
    <div className="rondy-motion pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Aurora shimmer band */}
      <div className="rondy-aurora absolute inset-x-0 top-0 h-2/3" />

      {/* Falling snow */}
      <div className="absolute inset-0 overflow-hidden">
        {flakes.map((f, i) => (
          <span
            key={i}
            className="rondy-flake absolute -top-2 rounded-full bg-[#eef2ff]"
            style={
              {
                left: f.l,
                width: `${f.s}px`,
                height: `${f.s}px`,
                opacity: f.o,
                ["--rondy-fall" as string]: `${f.d}s`,
                ["--rondy-delay" as string]: `${f.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Ferris wheel silhouette turning slowly on the right horizon. The
          wheel group rotates; the legs and gondola shells stay fixed. Low
          opacity so it reads as skyline behind the headline. */}
      <div className="absolute bottom-0 right-[4%] w-[220px] opacity-[0.32] sm:w-[300px]">
        <svg viewBox="0 0 200 190" className="h-auto w-full" fill="none" aria-hidden="true">
          {/* legs */}
          <path d="M72 186 L100 92 L128 186" stroke="#05081a" strokeWidth="7" opacity="0.95" />
          {/* rotating wheel */}
          <g className="rondy-wheel" style={{ transformOrigin: "100px 92px" }}>
            <g stroke="#0a1130" strokeWidth="3.6">
              <circle cx="100" cy="92" r="64" />
              {[0, 30, 60, 90, 120, 150].map((a) => (
                <line
                  key={a}
                  x1={100 - 64 * Math.cos((a * Math.PI) / 180)}
                  y1={92 - 64 * Math.sin((a * Math.PI) / 180)}
                  x2={100 + 64 * Math.cos((a * Math.PI) / 180)}
                  y2={92 + 64 * Math.sin((a * Math.PI) / 180)}
                />
              ))}
            </g>
            <circle cx="100" cy="92" r="64" stroke="#eed24c" strokeWidth="1.2" opacity="0.6" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
              <circle
                key={a}
                className="rondy-wheelbulb"
                style={{ animationDelay: `${(i % 3) * 0.6}s` }}
                cx={100 + 64 * Math.cos((a * Math.PI) / 180)}
                cy={92 + 64 * Math.sin((a * Math.PI) / 180)}
                r="2.6"
                fill="#eed24c"
              />
            ))}
          </g>
          <circle cx="100" cy="92" r="5" fill="#eed24c" />
        </svg>
      </div>

      <style>{`
        /* Static defaults — what reduced-motion users (and no-CSS) get. */
        .rondy-aurora {
          background:
            radial-gradient(120% 80% at 22% 0%, rgba(61,220,151,0.16), transparent 58%),
            radial-gradient(120% 90% at 74% 0%, rgba(139,108,240,0.18), transparent 62%);
          opacity: 0.85;
          filter: blur(2px);
        }
        .rondy-flake { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .rondy-flake {
            display: block;
            animation: rondy-fall var(--rondy-fall, 16s) linear infinite;
            animation-delay: var(--rondy-delay, 0s);
          }
          @keyframes rondy-fall {
            0%   { transform: translate(0, -10px); }
            100% { transform: translate(14px, 105vh); }
          }

          .rondy-aurora { animation: rondy-shimmer 14s ease-in-out infinite; }
          @keyframes rondy-shimmer {
            0%, 100% { opacity: 0.6; transform: translateX(-2%) scaleY(1); }
            50%      { opacity: 1; transform: translateX(3%) scaleY(1.08); }
          }

          .rondy-wheel { animation: rondy-turn 46s linear infinite; }
          @keyframes rondy-turn {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
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
  const credits = Object.values(eventImages)
    .map((i) => i.attribution)
    .filter((a): a is string => Boolean(a));

  return (
    <div className="mx-auto max-w-5xl px-6 pb-12">
      <div className="rondy-booth px-5 py-4 text-center text-xs leading-relaxed text-[#aab4d8]">
        <p>
          Photography on this sample uses{" "}
          <span className="font-semibold text-[#eef2ff]">
            public-domain and openly-licensed
          </span>{" "}
          Fur Rendezvous and Alaska imagery
          {credits.length > 0
            ? " (U.S. government works plus Creative Commons photos, credited below)"
            : ""}
          . The final build would use{" "}
          <span className="font-semibold text-[#eef2ff]">
            Greater Anchorage, Inc.&apos;s own official photography
          </span>{" "}
          and the Rondy logo in their place. Sample built by{" "}
          <a
            href={SITE}
            className="font-semibold text-[#eed24c] underline underline-offset-2 hover:text-[#c4a52e]"
          >
            BlueWave Projects
          </a>{" "}
          on public info. The 2027 festival window (February 25 – March 7) is
          published by Visit Anchorage; individual event dates marked{" "}
          <span className="rounded-sm bg-[#eef2ff]/10 px-1 py-0.5 font-mono text-[#eed24c]">
            [confirm]
          </span>{" "}
          are real recurring events mapped to their traditional slots, not yet
          published for 2027. This page is not affiliated with or endorsed by
          Greater Anchorage, Inc. or the Fur Rendezvous festival.
        </p>

        {credits.length > 0 && (
          <details className="mt-3 text-left">
            <summary className="rondy-cond cursor-pointer text-center text-[11px] font-semibold tracking-[0.14em] text-[#eef2ff] marker:content-none">
              Image credits &amp; licenses
            </summary>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#8992b8]">
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
 * (none are published), so we omit the offers block rather than invent one.
 */
export function eventJsonLd(e: RondyEvent) {
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
    description: e.deep?.metaDescription ?? e.teaser,
    organizer: {
      "@type": "Organization",
      name: "Greater Anchorage, Inc. (Fur Rendezvous)",
      url: "https://furrondy.net",
    },
    isAccessibleForFree: e.ticketed === "free",
  };
}

/**
 * FAQPage JSON-LD for the detail pages.
 */
export function faqJsonLd(e: RondyEvent) {
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
