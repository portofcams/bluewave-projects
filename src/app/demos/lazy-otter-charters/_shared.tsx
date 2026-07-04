// Shared presentational pieces for the Lazy Otter Charters sample
// marketing / inquiry site.
//
// HONEST FRAMING (per brief): this is a cold-outreach SAMPLE built on
// PUBLICLY VERIFIED information by BlueWave Projects. It is NOT an official
// Lazy Otter Charters product and is NOT affiliated with or endorsed by the
// business. All photos are license-clean (public-domain / Creative-Commons)
// Prince William Sound / Whittier scenery and wildlife imagery from
// Wikimedia Commons (see /public/demos/lazy-otter-charters/CREDITS.md), used
// only as sample placeholders — a real build would use the operator's own
// official photography, branding, and logo. No Lazy Otter Charters boats,
// crew, guests, or copyrighted photography are used.
//
// THEME: clean adventure-outfitter aesthetic for a small Prince William
// Sound boat-tour operator. Icy glacier blue-green + slate, warm sunset
// coral/amber accent. Deliberately distinct from the lodge (river-green /
// evening-amber / salmon, warm parchment) and the festival/event-hub demos
// (aviation gathering, fairs) — this should read like a small family-run
// PWS glacier-and-wildlife tour outfit's site, crisp and nautical, not a
// festival information hub or a $16k/week fly-in lodge.
//
// SCOPING RULE: every style injected here is namespaced under the `.loc-tour`
// wrapper class (see <TourShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <TourShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/lazy-otter-charters";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — glacier ice blue-green / deep sound slate / sunset coral
// ---------------------------------------------------------------------------
export const TOUR = {
  night: "#071c22", // deepest sound-water ink
  deep: "#0d2e36", // deep glacier-water teal
  fjord: "#134450", // mid fjord blue-green
  slate: "#1d5c68", // slate teal
  ice: "#5fb8c4", // glacier ice blue
  mist: "#bfe6e8", // pale glacier mist
  paper: "#f2f8f7", // cool white paper
  // sunset accents
  coral: "#e07a4e", // warm sunset coral
  coralDeep: "#bd5e37", // deep coral / low sun
  amber: "#e8a23c", // evening amber
  amberDeep: "#c17f27", // deep amber
  // canvas
  canvas: "#eef6f6", // cool pale canvas
  canvasDeep: "#dfeeed", // shaded canvas
  card: "#fbfefe", // lightest card
  // text
  ink: "#0e2a30", // deep sound-water ink (body)
  inkSoft: "#3a5c62", // muted slate-teal
  muted: "#5f7f84", // captions / meta
} as const;

export type TourAccent = "fjord" | "slate" | "coral" | "amber" | "night" | "ice";

export const accentGradient: Record<TourAccent, string> = {
  fjord: "from-[#0d2e36] via-[#134450] to-[#071c22]",
  slate: "from-[#134450] via-[#1d5c68] to-[#0d2e36]",
  coral: "from-[#bd5e37] via-[#e07a4e] to-[#134450]",
  amber: "from-[#c17f27] via-[#e8a23c] to-[#134450]",
  night: "from-[#0d2e36] via-[#071c22] to-[#040f12]",
  ice: "from-[#1d5c68] via-[#5fb8c4]/40 to-[#0d2e36]",
};

// ---------------------------------------------------------------------------
// TOUR SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.loc-tour`. Paints a cool glacier-water canvas, defines the display
// serif + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function TourShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`loc-tour ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool glacier-water canvas (scoped) --- */
        .loc-tour {
          position: relative;
          color: ${TOUR.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${TOUR.canvas};
          background-image:
            radial-gradient(circle at 88% 6%, rgba(232,162,60,.08) 0 3px, transparent 4px),
            radial-gradient(circle at 10% 94%, rgba(95,184,196,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${TOUR.card} 0%, ${TOUR.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .loc-tour ::selection { background: rgba(95,184,196,.32); }

        /* Site Nav is styled for dark pages (white links); on the pale canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .loc-tour nav a { color: rgba(14,42,48,.72); }
        .loc-tour nav a:hover { color: ${TOUR.ink}; }
        .loc-tour nav a[class*="bg-"] { color: ${TOUR.paper}; }
        .loc-tour nav a[class*="bg-"]:hover { color: ${TOUR.paper}; }

        /* --- display type helpers --- */
        .loc-tour .loc-display {
          font-family: 'Fraunces', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .loc-tour .loc-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${TOUR.coralDeep};
        }
        /* --- mono meta (log / conditions voice) --- */
        .loc-tour .loc-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin coral/amber rule --- */
        .loc-tour .loc-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${TOUR.coral}, ${TOUR.amber});
        }

        /* --- tour card (on canvas) --- */
        .loc-tour .loc-card {
          position: relative;
          background: linear-gradient(180deg, ${TOUR.card}, ${TOUR.canvasDeep});
          border: 1px solid rgba(29,92,104,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(7,28,34,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .loc-tour a.loc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(7,28,34,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .loc-tour .loc-glass {
          background: rgba(242,248,247,.06);
          border: 1px solid rgba(242,248,247,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "otter + glacier water" stamp. Self-contained CSS/SVG.
// Deep fjord disc, ice-blue ring, a simple floating-otter glyph in the core.
// Purely decorative — a generic PWS-tour motif, NOT Lazy Otter Charters' own
// logo or branding.
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
        background: `radial-gradient(circle at 50% 38%, rgba(242,248,247,.12), ${TOUR.night} 72%), ${TOUR.deep}`,
        border: `3px solid ${TOUR.paper}`,
        boxShadow: `0 0 0 5px ${TOUR.ice}, 0 0 0 7px ${TOUR.paper}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Prince William Sound glacier & wildlife tours — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="loc-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="loc-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={TOUR.paper}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            letterSpacing: "2.4px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#loc-arc-top" startOffset="50%" textAnchor="middle">
            Prince William Sound
          </textPath>
        </text>
        <text
          fill={TOUR.amber}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#loc-arc-bot" startOffset="50%" textAnchor="middle">
            Family Run · Since 1994
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={TOUR.amber} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core floating-otter glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.42, height: size * 0.42 }} aria-hidden="true">
        <g fill="none" stroke={TOUR.mist} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          {/* otter body floating on back, simple rounded silhouette */}
          <ellipse cx="48" cy="58" rx="30" ry="14" />
          <circle cx="26" cy="46" r="9" />
          <path d="M20 44 L14 38 M32 44 L36 38" />
          <path d="M64 58 Q 78 54 84 44" />
        </g>
        <circle cx="24" cy="44" r="1.8" fill={TOUR.amber} />
        {/* water ripples */}
        <path
          d="M10 74 C 26 70, 40 78, 56 74 C 72 70, 82 78, 92 74"
          stroke={TOUR.ice}
          strokeWidth="2.4"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO — the feature tile.
//
// When a `photo` (license-clean public-domain/Creative-Commons image,
// verified and stored under /public/demos/lazy-otter-charters/) is supplied,
// we render that REAL photo behind a readable fjord-teal scrim, with the
// label and an honest chip + on-image credit. When NO fitting licensed photo
// exists, `photo` is omitted and we fall back to designed SVG tour art (a
// glacier/boat/kayak/otter motif). Either way the tile carries the honest
// note that the final build swaps in the operator's own photography.
// ---------------------------------------------------------------------------
export type PhotoSrc = {
  /** path under /public, e.g. "/demos/lazy-otter-charters/hero-tidewater-glacier.webp" */
  src: string;
  /** short attribution shown on-image, e.g. "USFWS Alaska · Public domain" */
  credit: string;
  /** object-position, e.g. "center", "50% 30%" */
  position?: string;
};

export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  figure = "glacier",
  photo,
}: {
  accent: TourAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "glacier" | "boat" | "kayak" | "otter" | "seal";
  photo?: PhotoSrc;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1d5c68]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `${label} — sample photo` : `Tour illustration placeholder — ${label}`}
    >
      {/* REAL PHOTO branch — license-clean image behind a readable fjord scrim */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={`${label} — sample Prince William Sound photo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* deep-fjord scrim: keeps the palette + makes the label legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#071c22]/35 via-[#0d2e36]/25 to-[#071c22]/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#071c22]/85 via-[#071c22]/35 to-transparent" />
          {/* on-image credit (top-left, unobtrusive) */}
          <span className="absolute left-3 top-3 rounded-full bg-[#071c22]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f2f8f7]/80 backdrop-blur-sm">
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
            <radialGradient id={`loc-sun-${accent}`} cx="76%" cy="24%" r="36%">
              <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.9" />
              <stop offset="55%" stopColor={TOUR.amber} stopOpacity="0.5" />
              <stop offset="100%" stopColor={TOUR.amber} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`loc-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d5eef0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d5eef0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* sky wash + low evening sun */}
          <rect width="400" height="300" fill={`url(#loc-sky-${accent})`} />
          <circle cx="304" cy="72" r="120" fill={`url(#loc-sun-${accent})`} />
          <circle cx="304" cy="72" r="24" fill="#ffd9a8" opacity="0.82" />

          {/* mountain / glacier horizon */}
          <path
            d="M-20 214 L60 168 L110 196 L170 150 L232 200 L300 158 L360 198 L440 168 L440 300 L-20 300 Z"
            fill="#071c22"
            opacity="0.32"
          />
          <path
            d="M-20 232 L70 198 L140 224 L220 190 L300 222 L380 196 L440 220 L440 300 L-20 300 Z"
            fill="#040f12"
            opacity="0.4"
          />
          {/* glacier ice cap streaks on the highest peak */}
          <path
            d="M150 200 L170 150 L192 178 L178 186 L188 196 Z"
            fill={TOUR.mist}
            opacity="0.5"
          />

          {/* sound-water ribbon */}
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250 L440 300 L-20 300 Z"
            fill="#134450"
            opacity="0.55"
          />
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250"
            stroke={TOUR.mist}
            strokeWidth="1.4"
            fill="none"
            opacity="0.3"
          />

          {/* figure motifs */}
          {figure === "otter" && (
            <g transform="translate(190 160)" opacity="0.92">
              <ellipse cx="0" cy="0" rx="46" ry="20" fill="#04141a" />
              <circle cx="-34" cy="-16" r="13" fill="#04141a" />
              <path d="M-42 -20 L-50 -28 M-26 -20 L-20 -28" stroke="#04141a" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-36" cy="-18" r="2.6" fill={TOUR.amber} />
            </g>
          )}
          {figure === "seal" && (
            <g transform="translate(180 172)" fill="#04141a" opacity="0.92">
              <ellipse cx="0" cy="10" rx="42" ry="18" />
              <circle cx="-32" cy="-4" r="12" />
              <path d="M40 10 Q 54 6 60 -4" stroke="#04141a" strokeWidth="5" fill="none" strokeLinecap="round" />
            </g>
          )}
          {figure === "kayak" && (
            <g transform="translate(150 130)" fill="#04141a" opacity="0.92">
              <path d="M-56 8 Q 0 -14 56 8 Q 0 22 -56 8 Z" />
              <path d="M-30 -18 L-14 4 M30 -18 L14 4" stroke="#04141a" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="-30" cy="-18" r="3" fill={TOUR.amber} />
              <circle cx="30" cy="-18" r="3" fill={TOUR.amber} />
            </g>
          )}
          {figure === "boat" && (
            <g transform="translate(150 140)" fill="#04141a" opacity="0.92">
              <path d="M-50 30 L-34 -6 L60 -6 L64 30 Z" />
              <rect x="-8" y="-34" width="18" height="30" opacity="0.85" />
              <rect x="4" y="-46" width="3" height="14" opacity="0.9" />
            </g>
          )}
          {figure === "glacier" && (
            <g transform="translate(170 150)" opacity="0.9">
              <path
                d="M-50 30 L-20 -20 L10 10 L40 -30 L70 30 Z"
                fill="#04141a"
              />
              <path d="M0 -8 L10 10 L-4 12 Z" fill={TOUR.mist} opacity="0.7" />
            </g>
          )}

          {/* thin evening light ripple */}
          <path
            d="M40 96 C 140 80, 260 130, 380 100"
            stroke={TOUR.paper}
            strokeWidth="1.4"
            fill="none"
            opacity="0.22"
            strokeDasharray="2 7"
          />
        </svg>
      )}

      {/* soft vignette for caption legibility (SVG art only — the photo branch
          already lays down its own bottom scrim) */}
      {!photo && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071c22]/70 to-transparent" />
      )}

      {/* caption + honest chip: "Sample photo" over real imagery, "Illustration"
          over the designed SVG art. Both signal the final build uses the
          operator's own official photography. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="loc-display text-[15px] font-semibold leading-tight text-[#f2f8f7] drop-shadow-[0_1px_3px_rgba(7,28,34,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e8a23c]/45 bg-[#071c22]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f2f8f7]/90 backdrop-blur-sm">
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
// LIVE "PRINCE WILLIAM SOUND RIGHT NOW" CONDITIONS — the showpiece.
// Re-exported from conditions.tsx (a "use client" component): attempts a
// live PATO observation, decodes it, and falls back to a clearly-labeled
// sample if unreachable.
// ---------------------------------------------------------------------------
export { SoundConditions } from "./conditions";
