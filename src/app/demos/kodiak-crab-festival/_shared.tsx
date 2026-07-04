// Shared presentational pieces for the Kodiak Crab Festival sample /
// community information-hub site.
//
// HONEST FRAMING (per brief): this is a sample built on PUBLICLY VERIFIED
// information by BlueWave Projects. It is NOT an official Kodiak Crab
// Festival product and is not affiliated with or endorsed by the festival,
// its organizers, or the City of Kodiak. All photos are license-clean
// (public-domain / Creative-Commons) Kodiak / Alaska maritime imagery from
// Wikimedia Commons (see /public/demos/kodiak-crab-festival/CREDITS.md),
// used only as sample placeholders — the final build would use the
// festival's own official photography, branding, and logo. No Kodiak Crab
// Festival property photos, no identifiable attendees, no festival
// branding/logos are used.
//
// THEME: lively maritime-carnival. Deep fishing-fleet blue/teal ink and
// canvas, a warm red/orange carnival-flag accent, a sturdy condensed display
// face (Oswald) for a "harbor signage / regatta pennant" feel, paired with a
// clean sans body. Deliberately distinct from the premium-lodge demo (warm
// parchment + forest-green + amber) and the heritage-poster demos (wheat +
// WPA fir-green) — this should read like a working harbor town throwing its
// biggest party of the year, not a luxury brand or a vintage poster.
//
// SCOPING RULE: every style injected here is namespaced under the
// `.kcf-fest` wrapper class (see <FestShell>). There are NO bare
// body/html/:root/h1/h2 selectors, so nothing leaks to the rest of
// bluewaveprojects.com. Pages MUST wrap their content in <FestShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/kodiak-crab-festival";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — fishing-fleet blue/teal + carnival red/orange
// ---------------------------------------------------------------------------
export const FEST = {
  night: "#061c26", // deepest harbor-night ink
  deep: "#0b2d3d", // deep harbor-blue
  teal: "#0f4a58", // working teal
  slate: "#1c5266", // slate-teal
  mist: "#8fc4cf", // pale sea-mist teal
  paper: "#f4f8f7", // cool sea-foam white
  // carnival accents
  flag: "#e2542a", // carnival-flag red-orange
  flagDeep: "#b8391a", // deep carnival red
  gold: "#f2a93c", // buoy-gold accent
  goldDeep: "#c9821f", // deep buoy-gold
  // canvas
  canvas: "#eef4f3", // cool sea-foam canvas
  canvasDeep: "#dde9e7", // shaded canvas
  card: "#ffffff", // lightest card
  // text
  ink: "#0d2530", // deep harbor ink (body)
  inkSoft: "#3c5c66", // muted slate-teal
  muted: "#5f7d85", // captions / meta
} as const;

export type FestAccent = "teal" | "slate" | "flag" | "gold" | "night" | "mist";

export const accentGradient: Record<FestAccent, string> = {
  teal: "from-[#0b2d3d] via-[#0f4a58] to-[#061c26]",
  slate: "from-[#0f4a58] via-[#1c5266] to-[#0b2d3d]",
  flag: "from-[#b8391a] via-[#e2542a] to-[#0b2d3d]",
  gold: "from-[#c9821f] via-[#f2a93c] to-[#0f4a58]",
  night: "from-[#0b2d3d] via-[#061c26] to-[#030d12]",
  mist: "from-[#1c5266] via-[#0f4a58] to-[#0b2d3d]",
};

// ---------------------------------------------------------------------------
// FEST SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.kcf-fest`. Paints a cool sea-foam canvas, defines the condensed
// display face + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function FestShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`kcf-fest ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool sea-foam canvas (scoped) --- */
        .kcf-fest {
          position: relative;
          color: ${FEST.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${FEST.canvas};
          background-image:
            radial-gradient(circle at 88% 6%, rgba(226,84,42,.09) 0 3px, transparent 4px),
            radial-gradient(circle at 10% 94%, rgba(15,74,88,.07) 0 3px, transparent 4px),
            linear-gradient(165deg, ${FEST.card} 0%, ${FEST.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .kcf-fest ::selection { background: rgba(226,84,42,.24); }

        /* Site Nav is styled for dark pages (white links); on the sea-foam
           canvas they wash out. Re-ink them, but leave any link carrying its
           own bg (the CTA) alone. */
        .kcf-fest nav a { color: rgba(13,37,48,.72); }
        .kcf-fest nav a:hover { color: ${FEST.ink}; }
        .kcf-fest nav a[class*="bg-"] { color: ${FEST.paper}; }
        .kcf-fest nav a[class*="bg-"]:hover { color: ${FEST.paper}; }

        /* --- display type helpers (condensed harbor-signage voice) --- */
        .kcf-fest .kcf-display {
          font-family: 'Oswald', 'Arial Narrow', sans-serif;
          font-weight: 600;
          letter-spacing: -0.005em;
          text-transform: none;
        }
        .kcf-fest .kcf-eyebrow {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .22em;
          font-weight: 600;
          font-size: 12px;
          color: ${FEST.flagDeep};
        }
        /* --- mono meta (harbor-board / schedule voice) --- */
        .kcf-fest .kcf-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin flag-red / gold rule --- */
        .kcf-fest .kcf-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${FEST.flag}, ${FEST.gold});
        }

        /* --- fest card (on canvas) --- */
        .kcf-fest .kcf-card {
          position: relative;
          background: linear-gradient(180deg, ${FEST.card}, ${FEST.canvasDeep});
          border: 1px solid rgba(15,74,88,.14);
          border-radius: 16px;
          box-shadow: 0 10px 30px -18px rgba(6,28,38,.45);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .kcf-fest a.kcf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(6,28,38,.5);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .kcf-fest .kcf-glass {
          background: rgba(244,248,247,.06);
          border: 1px solid rgba(244,248,247,.14);
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "crab + pennant" stamp. Self-contained CSS/SVG. Deep
// harbor-teal disc, carnival-red ring, a simple king-crab glyph in the core.
// Purely decorative — a generic maritime-festival motif, NOT the Kodiak Crab
// Festival's own logo or branding.
// ---------------------------------------------------------------------------
export function Emblem({
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
        background: `radial-gradient(circle at 50% 38%, rgba(244,248,247,.12), ${FEST.night} 72%), ${FEST.deep}`,
        border: `3px solid ${FEST.paper}`,
        boxShadow: `0 0 0 5px ${FEST.flag}, 0 0 0 7px ${FEST.paper}, 0 14px 34px rgba(0,0,0,.4)`,
      }}
      aria-label="Kodiak maritime festival — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="kcf-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="kcf-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={FEST.paper}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "12px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#kcf-arc-top" startOffset="50%" textAnchor="middle">
            Kodiak Island Alaska
          </textPath>
        </text>
        <text
          fill={FEST.gold}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#kcf-arc-bot" startOffset="50%" textAnchor="middle">
            Memorial Day Weekend
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={FEST.gold} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core king-crab glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.44, height: size * 0.44 }} aria-hidden="true">
        <g fill="none" stroke={FEST.mist} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="50" cy="52" rx="20" ry="16" />
          <path d="M32 44 L16 30 M32 60 L14 66 M68 44 L84 30 M68 60 L86 66" />
          <path d="M38 38 L28 22 M62 38 L72 22" />
        </g>
        <circle cx="43" cy="48" r="2.6" fill={FEST.flag} />
        <circle cx="57" cy="48" r="2.6" fill={FEST.flag} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO — the feature tile.
//
// When a `photo` (license-clean public-domain/Creative-Commons image,
// verified and stored under /public/demos/kodiak-crab-festival/) is
// supplied, we render that REAL photo behind a readable harbor-blue scrim,
// with the label and an honest chip + on-image credit. When NO fitting
// licensed photo exists, `photo` is omitted and we fall back to designed SVG
// art (a boat/parade/carnival motif). Either way the tile carries the
// honest note that the final build swaps in the festival's own photography.
// ---------------------------------------------------------------------------
export type PhotoSrc = {
  /** path under /public, e.g. "/demos/kodiak-crab-festival/kodiak-fleet.webp" */
  src: string;
  /** short attribution shown on-image, e.g. "James Brooks · CC BY 2.0" */
  credit: string;
  /** object-position, e.g. "center", "50% 30%" */
  position?: string;
};

export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  figure = "boat",
  photo,
}: {
  accent: FestAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "boat" | "crab" | "parade" | "carnival" | "suit";
  photo?: PhotoSrc;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#0f4a58]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `${label} — sample photo` : `Festival illustration placeholder — ${label}`}
    >
      {/* REAL PHOTO branch — license-clean image behind a readable harbor-blue scrim */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={`${label} — sample Kodiak photo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* deep-harbor scrim: keeps the palette + makes the label legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#061c26]/35 via-[#0b2d3d]/25 to-[#061c26]/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#061c26]/85 via-[#061c26]/35 to-transparent" />
          {/* on-image credit (top-left, unobtrusive) */}
          <span className="absolute left-3 top-3 rounded-full bg-[#061c26]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f4f8f7]/80 backdrop-blur-sm">
            {photo.credit}
          </span>
        </>
      )}

      {/* SVG ART branch — only when no licensed photo is supplied */}
      {!photo && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`kcf-sun-${accent}`} cx="76%" cy="22%" r="36%">
              <stop offset="0%" stopColor="#ffdca0" stopOpacity="0.85" />
              <stop offset="55%" stopColor={FEST.gold} stopOpacity="0.45" />
              <stop offset="100%" stopColor={FEST.gold} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`kcf-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfe6ea" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#cfe6ea" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* sky wash + low sun */}
          <rect width="400" height="300" fill={`url(#kcf-sky-${accent})`} />
          <circle cx="304" cy="70" r="118" fill={`url(#kcf-sun-${accent})`} />
          <circle cx="304" cy="70" r="22" fill="#ffdca0" opacity="0.8" />

          {/* mountain / island horizon */}
          <path
            d="M-20 214 L60 172 L110 198 L170 156 L232 202 L300 162 L360 200 L440 172 L440 300 L-20 300 Z"
            fill="#061c26"
            opacity="0.3"
          />
          <path
            d="M-20 232 L70 200 L140 224 L220 192 L300 222 L380 198 L440 220 L440 300 L-20 300 Z"
            fill="#030d12"
            opacity="0.4"
          />

          {/* harbor water ribbon */}
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250 L440 300 L-20 300 Z"
            fill="#0f4a58"
            opacity="0.55"
          />
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250"
            stroke="#8fc4cf"
            strokeWidth="1.4"
            fill="none"
            opacity="0.3"
          />

          {/* figure motifs */}
          {figure === "boat" && (
            <g transform="translate(160 172)" fill="#04141c" opacity="0.92">
              <path d="M-56 10 Q 0 30 56 10 L 46 26 Q 0 42 -46 26 Z" />
              <rect x="-8" y="-32" width="6" height="42" />
              <path d="M-2 -30 L28 -14 L-2 -6 Z" fill="#04141c" opacity="0.85" />
            </g>
          )}
          {figure === "crab" && (
            <g transform="translate(190 158)" opacity="0.92">
              <ellipse cx="0" cy="0" rx="34" ry="26" fill="#04141c" />
              <g stroke="#04141c" strokeWidth="5" strokeLinecap="round" fill="none">
                <path d="M-30 -8 L-52 -26 M-30 8 L-54 20 M30 -8 L52 -26 M30 8 L54 20" />
                <path d="M-18 -22 L-26 -40 M18 -22 L26 -40" />
              </g>
              <circle cx="-11" cy="-4" r="3" fill={FEST.flag} />
              <circle cx="11" cy="-4" r="3" fill={FEST.flag} />
            </g>
          )}
          {figure === "parade" && (
            <g transform="translate(150 168)" fill="#04141c" opacity="0.9">
              <rect x="-46" y="-4" width="92" height="8" rx="4" />
              <path d="M-46 -4 L-58 -22 L-34 -22 Z" fill={FEST.flag} opacity="0.9" />
              <path d="M18 -4 L6 -22 L30 -22 Z" fill={FEST.gold} opacity="0.9" />
              <circle cx="-30" cy="18" r="8" />
              <circle cx="30" cy="18" r="8" />
            </g>
          )}
          {figure === "carnival" && (
            <g transform="translate(160 160)" opacity="0.9">
              <circle cx="0" cy="0" r="46" fill="none" stroke="#04141c" strokeWidth="5" />
              <path d="M0 -46 L0 46 M-46 0 L46 0 M-32 -32 L32 32 M-32 32 L32 -32" stroke="#04141c" strokeWidth="3" />
              <circle cx="0" cy="0" r="6" fill={FEST.flag} />
            </g>
          )}
          {figure === "suit" && (
            <g transform="translate(170 176)" fill="#04141c" opacity="0.9">
              <ellipse cx="0" cy="4" rx="22" ry="30" />
              <circle cx="0" cy="-30" r="12" />
              <path d="M-22 -6 L-40 8 M22 -6 L40 8" stroke="#04141c" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}

          {/* thin wake ripple */}
          <path
            d="M40 100 C 140 84, 260 132, 380 104"
            stroke="#f4f8f7"
            strokeWidth="1.4"
            fill="none"
            opacity="0.2"
            strokeDasharray="2 7"
          />
        </svg>
      )}

      {/* soft vignette for caption legibility (SVG art only — the photo branch
          already lays down its own bottom scrim) */}
      {!photo && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061c26]/70 to-transparent" />
      )}

      {/* caption + honest chip: "Sample photo" over real imagery, "Illustration"
          over the designed SVG art. Both signal the final build uses the
          festival's own official photography. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="kcf-display text-[15px] font-semibold leading-tight text-[#f4f8f7] drop-shadow-[0_1px_3px_rgba(6,28,38,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#f2a93c]/45 bg-[#061c26]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f4f8f7]/90 backdrop-blur-sm">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
              <path d="M2 11 L6 7.5 L9 10 L11 8.5 L14 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            {photo ? "Sample photo" : "Illustration"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LIVE "KODIAK RIGHT NOW" CONDITIONS — the showpiece. Re-exported from
// conditions.tsx (a "use client" component): attempts a live PADQ observation,
// decodes it, and falls back to a clearly-labeled sample if unreachable.
// ---------------------------------------------------------------------------
export { FestConditions } from "./conditions";
