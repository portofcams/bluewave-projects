// Shared presentational pieces for the Alaska State Fair 2026 sample pages.
// Honest framing per the brief: a sample built on public info, not an
// official Alaska State Fair, Inc. product. Photography is openly licensed;
// the final build would swap in the fair's own imagery and marks.
//
// THEME: "WPA harvest poster" (approved) — a light, screen-print poster
// look on warm wheat paper: deep fir ink, harvest gold, and the fair's own
// brand red (#c43a2d) and ribbon blue (#2e4c90) as the working inks. Palmer
// is a 1935 New Deal colony town and the fair keeps an annual poster
// tradition, so the WPA register is earned, not costume.
//
// SCOPING RULE: every style is namespaced under `.fair-poster` (see
// <PosterShell>). No bare body/html/:root selectors — nothing leaks to the
// rest of bluewaveprojects.com.

import type { CSSProperties } from "react";
import type { FairPage } from "./events";
import { SITE } from "./events";

export const FAIR = {
  // paper + inks
  paper: "#f6eed9", // warm wheat paper
  paperDeep: "#eee1c1", // shaded paper (card wells)
  ink: "#22381f", // deep fir ink (body text)
  inkSoft: "#4a5c40", // softened fir (secondary text)
  // working inks (fair brand)
  red: "#c43a2d", // fair brand red — CTAs, prize ribbons
  redDeep: "#93291f",
  blue: "#2e4c90", // ribbon blue — badges, links
  blueDeep: "#22376b",
  // harvest
  gold: "#dfa32b", // harvest gold — sunburst, accents
  goldDeep: "#b47f19",
  cabbage: "#6f9e3f", // cabbage green
  sky: "#7fb0d4", // poster sky blue
  muted: "#7d7458", // captions / meta on paper
  border: "#d9c9a2",
} as const;

// ---------------------------------------------------------------------------
// OPENLY-LICENSED PHOTOGRAPHY — populated by the photo pass; license + source
// recorded per image, CC credits shown on-image, PD needs none. When no
// verified image exists the designed poster art renders instead (never an
// unverified or look-alike photo).
// ---------------------------------------------------------------------------
export type FairImage = {
  src: string;
  credit?: string;
  attribution?: string;
  position?: string;
  publicDomain?: boolean;
  /** Honesty guard: overrides the visible caption when the photo shows
   *  something more specific than the page context. */
  caption?: string;
};

export const eventImages: Record<string, FairImage> = {
  // Midway at the Alaska State Fair, Palmer — Luke Jones, CC BY 2.0
  // https://commons.wikimedia.org/wiki/File:Midway_Attractions_at_the_Alaska_State_Fair_in_Palmer,_AK.jpg
  hero: {
    src: "/demos/fair/hero-midway.webp",
    credit: "Photo: Luke Jones (CC BY 2.0)",
    attribution:
      "Hero — the lit midway at the Alaska State Fair, Palmer. Photo by Luke Jones, CC BY 2.0, via Wikimedia Commons.",
    caption: "The midway at dusk — Palmer",
    position: "center 55%",
  },
  // Supercross start line at the Palmer fairgrounds, Chugach behind —
  // U.S. Air Force photo by Staff Sgt. Sheila deVera, public domain.
  // https://commons.wikimedia.org/wiki/File:Alaska_State_Fair_Supercross_140823-F-XA488-110.jpg
  "grandstand-shows": {
    src: "/demos/fair/event-supercross.webp",
    publicDomain: true,
    attribution:
      "Grandstand — supercross riders at the start line, Alaska State Fair fairgrounds, Palmer, 2014. U.S. Air Force photo by Staff Sgt. Sheila deVera (public domain), via Wikimedia Commons.",
    caption: "Race day at the fairgrounds — Palmer, 2014",
    position: "center 40%",
  },
  // Long-exposure night midway at the Alaska State Fair — Cecil Sanders,
  // CC BY 2.0 (license verified at Flickr source 2026-07-01).
  // https://www.flickr.com/photos/31399686@N02/2978328707
  "carnival-midway": {
    src: "/demos/fair/event-midway-night.webp",
    credit: "Photo: Cecil Sanders (CC BY 2.0)",
    attribution:
      "Carnival midway — long-exposure night rides at the Alaska State Fair. Photo by Cecil Sanders, CC BY 2.0, via Flickr/Wikimedia Commons.",
    caption: "The midway after dark — Alaska State Fair",
    position: "center 45%",
  },
  // Concert Series, Which-Ticket, and the Cabbage Weigh-Off keep the designed
  // WPA poster art (which draws the cabbage row itself): no openly-licensed
  // photography of those specific subjects was found, and we never substitute
  // a generic look-alike (honesty guard).
};

// Poster-ink duotone wells behind photos / fallback art. Light theme, but the
// wells stay saturated so the art reads as printed ink on paper.
export const accentGradient: Record<FairPage["accent"], string> = {
  wheat: "from-[#dfa32b] via-[#c98f1f] to-[#8a5f10]",
  cabbage: "from-[#8ab55c] via-[#6f9e3f] to-[#42631f]",
  ribbon: "from-[#4a67ad] via-[#2e4c90] to-[#1b2c56]",
  barn: "from-[#d95643] via-[#c43a2d] to-[#7e2117]",
  sky: "from-[#9cc3e0] via-[#7fb0d4] to-[#41729c]",
};

export const accentText: Record<FairPage["accent"], string> = {
  wheat: "text-[#b47f19]",
  cabbage: "text-[#557d2b]",
  ribbon: "text-[#2e4c90]",
  barn: "text-[#c43a2d]",
  sky: "text-[#2e4c90]",
};

export const ticketBadge: Record<
  FairPage["ticketed"],
  { label: string; cls: string }
> = {
  paid: {
    label: "Separate ticket",
    cls: "bg-[#c43a2d]/10 text-[#c43a2d] border-[#c43a2d]/40",
  },
  included: {
    label: "Included with admission",
    cls: "bg-[#6f9e3f]/14 text-[#557d2b] border-[#6f9e3f]/45",
  },
  free: {
    label: "Free",
    cls: "bg-[#6f9e3f]/14 text-[#557d2b] border-[#6f9e3f]/45",
  },
  onsite: {
    label: "Sold on the midway",
    cls: "bg-[#2e4c90]/10 text-[#2e4c90] border-[#2e4c90]/40",
  },
};

// ---------------------------------------------------------------------------
// POSTER SHELL — scoped wrapper + the one style block.
// ---------------------------------------------------------------------------
export function PosterShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`fair-poster ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Work+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        /* --- wheat paper canvas + base type --- */
        .fair-poster {
          position: relative;
          color: ${FAIR.ink};
          font-family: 'Work Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          background-color: ${FAIR.paper};
          background-image:
            radial-gradient(circle at 15% 20%, rgba(196,58,45,.045) 0 2px, transparent 3px),
            radial-gradient(circle at 70% 60%, rgba(46,76,144,.04) 0 2px, transparent 3px),
            radial-gradient(circle at 42% 85%, rgba(34,56,31,.04) 0 1px, transparent 2px),
            repeating-linear-gradient(90deg, rgba(34,56,31,.016) 0 2px, transparent 2px 5px),
            repeating-linear-gradient(0deg, rgba(34,56,31,.02) 0 2px, transparent 2px 6px),
            linear-gradient(160deg, #f9f2df 0%, ${FAIR.paper} 45%, ${FAIR.paperDeep} 100%);
        }
        .fair-poster ::selection { background: rgba(223,163,43,.4); }

        /* The shared site Nav is styled for dark pages (white links at 50%);
           on this wheat canvas they wash out. Re-ink the links — but leave
           any link that carries its own bg (the CTA button) untouched. */
        .fair-poster nav a { color: rgba(34,56,31,.72); }
        .fair-poster nav a:hover { color: ${FAIR.ink}; }
        .fair-poster nav a[class*="bg-"] { color: #ffffff; }
        .fair-poster nav a[class*="bg-"]:hover { color: #ffffff; }

        /* --- display type: Anton = heavy WPA condensed sans --- */
        .fair-poster .fair-display {
          font-family: 'Anton', 'Oswald', sans-serif;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: .025em;
        }
        .fair-poster .fair-cond {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .fair-poster .fair-eyebrow {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .38em;
          font-weight: 600;
          font-size: 12px;
          color: ${FAIR.red};
        }

        /* --- section rule: a wheat-stalk / grain divider in gold ink --- */
        .fair-poster .fair-rule {
          width: 150px; height: 7px; margin: 16px auto 0;
          background-image: radial-gradient(ellipse 3.2px 2.2px at 8px 3.5px, ${FAIR.gold} 0 2px, transparent 2.6px);
          background-size: 16px 7px;
          background-repeat: repeat-x;
        }

        /* --- POSTER CARD: screen-print panel with offset-ink shadow --- */
        .fair-poster .fair-card {
          position: relative;
          background: linear-gradient(180deg, #faf4e3, ${FAIR.paperDeep});
          border: 2px solid ${FAIR.ink};
          border-radius: 6px;
          box-shadow: 5px 5px 0 rgba(34,56,31,.22);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .fair-poster a.fair-card:hover,
        .fair-poster .fair-card-hover:hover {
          transform: translate(-2px, -3px);
          box-shadow: 8px 9px 0 rgba(196,58,45,.28);
        }
        /* prize-ribbon top band available on any card */
        .fair-poster .fair-band {
          position: relative;
        }
        .fair-poster .fair-band::before {
          content: ""; position: absolute; left: -2px; right: -2px; top: -2px;
          height: 6px; z-index: 3; border-radius: 6px 6px 0 0;
          background: repeating-linear-gradient(90deg,
            ${FAIR.red} 0 26px, ${FAIR.paper} 26px 30px,
            ${FAIR.blue} 30px 56px, ${FAIR.paper} 56px 60px);
        }

        /* --- warm print grade over real photos --- */
        .fair-poster .fair-photo-grade {
          filter: saturate(1.08) contrast(1.04) sepia(.08);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ROSETTE — a blue-ribbon prize rosette (the fair's native icon), CSS/SVG.
// ---------------------------------------------------------------------------
export function Rosette({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const petals = Array.from({ length: 14 }, (_, i) => (i * 360) / 14);
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size * 1.32 }}
      aria-label="Alaska State Fair — Palmer, Alaska, since 1936"
    >
      <svg viewBox="0 0 200 264" className="h-full w-full" aria-hidden="true">
        {/* ribbon tails */}
        <g>
          <path d="M78 150 L60 250 L84 232 L100 258 L104 160 Z" fill={FAIR.blue} stroke={FAIR.blueDeep} strokeWidth="2" />
          <path d="M122 150 L140 250 L116 232 L100 258 L96 160 Z" fill={FAIR.blueDeep} stroke={FAIR.blueDeep} strokeWidth="2" />
        </g>
        {/* rosette petals */}
        {petals.map((a) => (
          <ellipse
            key={a}
            cx={100 + 62 * Math.cos((a * Math.PI) / 180)}
            cy={100 + 62 * Math.sin((a * Math.PI) / 180)}
            rx="22"
            ry="14"
            fill={FAIR.blue}
            stroke={FAIR.blueDeep}
            strokeWidth="1.5"
            transform={`rotate(${a} ${100 + 62 * Math.cos((a * Math.PI) / 180)} ${100 + 62 * Math.sin((a * Math.PI) / 180)})`}
          />
        ))}
        {/* center disc */}
        <circle cx="100" cy="100" r="52" fill={FAIR.paper} stroke={FAIR.blueDeep} strokeWidth="3" />
        <circle cx="100" cy="100" r="45" fill="none" stroke={FAIR.gold} strokeWidth="1.6" opacity="0.9" />
      </svg>
      <div
        className="absolute text-center"
        style={{
          top: "18%",
          left: 0,
          right: 0,
          color: FAIR.ink,
          fontFamily: "'Oswald', sans-serif",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "block", fontSize: 9, letterSpacing: "0.22em" }}>
          Palmer · AK
        </span>
        <b
          style={{
            display: "block",
            fontSize: 30,
            fontFamily: "'Anton', sans-serif",
            fontWeight: 400,
            lineHeight: 1.05,
            color: FAIR.red,
          }}
        >
          1936
        </b>
        <span style={{ display: "block", fontSize: 8.5, letterSpacing: "0.2em", marginTop: 2, color: FAIR.inkSoft }}>
          Matanuska Valley
        </span>
      </div>
    </div>
  );
}

/**
 * Photo block. Verified photos render under a warm print grade inside a
 * poster frame; with no verified image, the designed WPA poster art shows —
 * sunburst over Pioneer Peak, ferris wheel, cabbage row — never an empty
 * hole, never an unverified image.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  imageKey,
}: {
  accent: FairPage["accent"];
  label: string;
  className?: string;
  tall?: boolean;
  imageKey?: string;
}) {
  const img = imageKey ? eventImages[imageKey] : undefined;

  return (
    <div
      className={`group/ph relative overflow-hidden rounded-md border-2 border-[#22381f] bg-gradient-to-b ${accentGradient[accent]} shadow-[5px_5px_0_rgba(34,56,31,0.22)] ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={
        img
          ? `Alaska State Fair photograph — ${label}`
          : `Alaska State Fair poster art — ${label}`
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
              filter: "saturate(1.08) contrast(1.04) sepia(.08)",
            }}
          />
          {/* light warm wash so captions read; keeps the daylight feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#22381f]/55 via-transparent to-[#22381f]/10" />
        </>
      )}

      {/* WPA poster art: sunburst rays, Pioneer Peak, ferris wheel + cabbage
          row silhouettes. Fallback at full strength; texture layer over real
          photos. */}
      <svg
        className={`absolute inset-0 h-full w-full transition-opacity ${
          img ? "opacity-15" : "opacity-100"
        }`}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`fair-sun-${accent}`} cx="50%" cy="26%" r="45%">
            <stop offset="0%" stopColor="#f9f2df" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f9f2df" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* sun + rays */}
        <circle cx="200" cy="78" r="26" fill="#f6eed9" opacity="0.92" />
        <circle cx="200" cy="78" r="60" fill={`url(#fair-sun-${accent})`} />
        {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
          <path
            key={a}
            d={`M200 78 L${200 + 190 * Math.cos(((a + 8) * Math.PI) / 180)} ${78 + 190 * Math.sin(((a + 8) * Math.PI) / 180)} L${200 + 190 * Math.cos(((a + 20) * Math.PI) / 180)} ${78 + 190 * Math.sin(((a + 20) * Math.PI) / 180)} Z`}
            fill="#f6eed9"
            opacity="0.13"
          />
        ))}
        {/* Pioneer Peak ridge */}
        <path
          d="M-10 190 L60 120 L108 168 L150 96 L204 176 L258 122 L306 170 L352 138 L410 196 L410 300 L-10 300 Z"
          fill="#22381f"
          opacity="0.32"
        />
        {/* snow caps */}
        <path d="M150 96 L165 122 L150 118 L138 126 Z" fill="#f6eed9" opacity="0.7" />
        <path d="M258 122 L270 142 L258 138 L247 146 Z" fill="#f6eed9" opacity="0.6" />
        {/* field rows sweeping to the horizon */}
        {[236, 252, 268, 284].map((y, i) => (
          <path
            key={y}
            d={`M-10 ${y + 8} C 120 ${y - 10}, 280 ${y + 16}, 410 ${y - 6}`}
            stroke="#22381f"
            strokeWidth={2.4 - i * 0.35}
            fill="none"
            opacity="0.34"
          />
        ))}
        {/* cabbage row silhouettes */}
        {[48, 108, 168, 228, 288, 348].map((x, i) => (
          <g key={x} transform={`translate(${x} ${246 + (i % 2) * 14})`} opacity="0.45">
            <circle cx="0" cy="0" r="11" fill="#22381f" />
            <path d="M-11 -2 Q -4 -14 2 -3 Q 8 -13 11 -1" stroke="#22381f" strokeWidth="2.4" fill="none" />
          </g>
        ))}
        {/* ferris wheel silhouette on the ridge line */}
        <g transform="translate(322 196)" opacity="0.55">
          <path d="M-14 42 L0 0 L14 42" stroke="#22381f" strokeWidth="3.4" fill="none" />
          <circle cx="0" cy="0" r="26" stroke="#22381f" strokeWidth="2.6" fill="none" />
          {[0, 45, 90, 135].map((a) => (
            <line
              key={a}
              x1={-26 * Math.cos((a * Math.PI) / 180)}
              y1={-26 * Math.sin((a * Math.PI) / 180)}
              x2={26 * Math.cos((a * Math.PI) / 180)}
              y2={26 * Math.sin((a * Math.PI) / 180)}
              stroke="#22381f"
              strokeWidth="2"
            />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <circle
              key={a}
              cx={26 * Math.cos((a * Math.PI) / 180)}
              cy={26 * Math.sin((a * Math.PI) / 180)}
              r="2.6"
              fill="#22381f"
            />
          ))}
        </g>
      </svg>

      {/* caption + credit chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="fair-cond text-[13px] font-semibold leading-tight text-[#f6eed9] drop-shadow-[0_1px_2px_rgba(34,56,31,0.8)]">
            {img?.caption ?? label}
          </span>
          {img?.credit ? (
            <span className="inline-flex shrink-0 items-center rounded-sm border border-[#f6eed9]/40 bg-[#22381f]/55 px-2.5 py-1 text-[9px] font-medium leading-tight text-[#f6eed9] backdrop-blur-sm">
              {img.credit}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#f6eed9]/40 bg-[#22381f]/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f6eed9] backdrop-blur-sm">
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
                <path d="M2 11 L6 7.5 L9 10 L11 8.5 L14 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </svg>
              {img ? "Public domain" : "ASF photo"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Hero motion: a slow-turning sunburst behind the headline, two drifting
 * clouds, and a wheat row swaying along the hero's bottom edge. Poster-still
 * by default for reduced-motion users. CSS/SVG only, all `fair-*` scoped.
 */
export function FairMotion() {
  return (
    <div className="fair-motion pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* rotating sunburst anchored behind the hero art column */}
      <div className="fair-burst absolute -top-[26%] right-[2%] h-[560px] w-[560px] opacity-[0.5]">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a) => (
            <path
              key={a}
              d={`M200 200 L${200 + 200 * Math.cos((a * Math.PI) / 180)} ${200 + 200 * Math.sin((a * Math.PI) / 180)} L${200 + 200 * Math.cos(((a + 10) * Math.PI) / 180)} ${200 + 200 * Math.sin(((a + 10) * Math.PI) / 180)} Z`}
              fill="#dfa32b"
              opacity="0.16"
            />
          ))}
          <circle cx="200" cy="200" r="52" fill="#dfa32b" opacity="0.26" />
        </svg>
      </div>

      {/* drifting poster clouds */}
      <svg className="fair-cloud-a absolute left-[6%] top-[14%] w-40 opacity-30" viewBox="0 0 120 40">
        <path d="M12 30 Q10 18 24 18 Q28 6 44 10 Q58 2 66 14 Q84 10 86 22 Q100 22 98 30 Z" fill="#f9f2df" stroke="#22381f" strokeWidth="1.6" strokeOpacity=".35" />
      </svg>
      <svg className="fair-cloud-b absolute left-[38%] top-[6%] w-28 opacity-25" viewBox="0 0 120 40">
        <path d="M12 30 Q10 18 24 18 Q28 6 44 10 Q58 2 66 14 Q84 10 86 22 Q100 22 98 30 Z" fill="#f9f2df" stroke="#22381f" strokeWidth="1.6" strokeOpacity=".3" />
      </svg>

      {/* swaying wheat row along the hero base */}
      <div className="absolute -bottom-1 left-0 right-0 h-16">
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none" className="h-full w-full">
          {Array.from({ length: 40 }, (_, i) => i * 30 + 8).map((x, i) => (
            <g key={x} className="fair-wheat" style={{ ["--fair-delay" as string]: `${(i % 5) * 0.4}s`, transformOrigin: `${x}px 64px` } as CSSProperties}>
              <path d={`M${x} 64 C ${x + 2} 44, ${x - 2} 34, ${x + 3} 22`} stroke="#b47f19" strokeWidth="2" fill="none" opacity="0.5" />
              {[26, 32, 38].map((y, j) => (
                <g key={y}>
                  <ellipse cx={x + 3 - j} cy={y} rx="2.6" ry="5" fill="#dfa32b" opacity="0.55" transform={`rotate(${18 - j * 6} ${x + 3 - j} ${y})`} />
                  <ellipse cx={x - 1 + j} cy={y + 2} rx="2.6" ry="5" fill="#b47f19" opacity="0.45" transform={`rotate(${-20 + j * 6} ${x - 1 + j} ${y + 2})`} />
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>

      <style>{`
        /* static poster by default */
        @media (prefers-reduced-motion: no-preference) {
          .fair-burst { animation: fair-turn 90s linear infinite; }
          @keyframes fair-turn { to { transform: rotate(360deg); } }

          .fair-cloud-a { animation: fair-drift 46s ease-in-out infinite alternate; }
          .fair-cloud-b { animation: fair-drift 62s ease-in-out infinite alternate-reverse; }
          @keyframes fair-drift { from { transform: translateX(0); } to { transform: translateX(60px); } }

          .fair-wheat { animation: fair-sway 4.2s ease-in-out infinite; animation-delay: var(--fair-delay, 0s); }
          @keyframes fair-sway {
            0%, 100% { transform: rotate(-2.2deg); }
            50% { transform: rotate(2.4deg); }
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Sample disclaimer shown on every proof page.
 */
export function SampleNote() {
  const credits = Object.values(eventImages)
    .map((i) => i.attribution)
    .filter((a): a is string => Boolean(a));

  return (
    <div className="mx-auto max-w-5xl px-6 pb-12">
      <div className="fair-card px-5 py-4 text-center text-xs leading-relaxed text-[#7d7458]">
        <p>
          A working sample by{" "}
          <a
            href={SITE}
            className="font-semibold text-[#c43a2d] underline underline-offset-2 hover:text-[#93291f]"
          >
            BlueWave Projects
          </a>
          , built from public information on alaskastatefair.org — 2026 dates,
          hours, closed days, and the concert lineup come from the fair&apos;s
          own published pages (verified July 2026). Photography is{" "}
          <span className="font-semibold text-[#22381f]">
            public-domain / openly licensed
          </span>
          {credits.length > 0 ? " (credited below)" : ""}; the final build
          would use the fair&apos;s own imagery and marks. Items tagged{" "}
          <span className="rounded-sm bg-[#22381f]/8 px-1 py-0.5 font-mono text-[#c43a2d]">
            [confirm]
          </span>{" "}
          are published-but-unstructured details to verify at the source.
          Always buy tickets through the official links on alaskastatefair.org.
          This page is not affiliated with or endorsed by Alaska State Fair,
          Inc.
        </p>

        {credits.length > 0 && (
          <details className="mt-3 text-left">
            <summary className="fair-cond cursor-pointer text-center text-[11px] font-semibold tracking-[0.14em] text-[#22381f] marker:content-none">
              Image credits &amp; licenses
            </summary>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#7d7458]">
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
 * schema.org Event JSON-LD — grounded data, no invented prices.
 */
export function eventJsonLd(p: FairPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: p.name,
    startDate: p.isoStart,
    ...(p.isoEnd ? { endDate: p.isoEnd } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: p.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: p.city,
        addressRegion: p.region,
        addressCountry: "US",
      },
    },
    description: p.deep.metaDescription,
    organizer: {
      "@type": "Organization",
      name: "Alaska State Fair, Inc.",
      url: "https://www.alaskastatefair.org",
    },
    isAccessibleForFree: false,
  };
}

export function faqJsonLd(p: FairPage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.deep.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
