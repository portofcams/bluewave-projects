// Shared presentational pieces for the Great Alaska Aviation Gathering sample /
// proof info hub.
//
// HONEST FRAMING (per brief): this is a sample built on PUBLIC information by
// BlueWave Projects. It is NOT an official Alaska Airmen's Association product
// and is not affiliated with or endorsed by them. All photos are license-clean
// Creative-Commons Alaska general-aviation imagery from Wikimedia Commons (see
// /public/demos/aviation/CREDITS.md), used only as sample placeholders — the
// final build would use the Association's own official event photography,
// branding, and logo. No Great Alaska Aviation Gathering event photos, no
// identifiable people as subjects, no Airmen branding/logos are used.
//
// THEME: Alaska bush-flying / aviation. Deep sky/night blues, a subtle
// sectional-chart grid + runway + propeller motif, aviation amber accents,
// Space Grotesk display. Deliberately distinct from the other demos (the Duke
// ocean hub, the Alaska festival hubs) to prove range.
//
// SCOPING RULE: every style injected here is namespaced under the `.gaag-sky`
// wrapper class (see <SkyShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <SkyShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/alaska-aviation-gathering";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — Alaska sky / sectional chart
// ---------------------------------------------------------------------------
export const SKY = {
  night: "#071d34", // deepest night-sky ink
  deep: "#0b2a4a", // deep sky blue
  sky: "#123a63", // mid sky blue
  steel: "#1f4f7d", // steel blue
  glacier: "#4f9be0", // bright glacier blue
  ice: "#8fc0f0", // pale ice blue
  paper: "#eaf3fb", // near-white sky paper
  // sectional-chart warmth + aviation accents
  amber: "#f4b63e", // aviation amber (nav light / caution)
  amberDeep: "#e08a2b", // deep amber / sunset
  runway: "#c8551f", // runway-marking rust / warning
  // canvas
  canvas: "#eef4fb", // pale sky canvas
  canvasDeep: "#dbe7f4", // shaded canvas
  card: "#f7fbff", // lightest card
  // text
  ink: "#0e2a44", // deep sky ink (body)
  inkSoft: "#3a5670", // muted steel-grey
  muted: "#6b8199", // captions / meta
} as const;

// Accent keys used across cards. Each maps to a duotone sky/amber well.
export type SkyAccent = "sky" | "glacier" | "amber" | "sunset" | "steel" | "night";

export const accentGradient: Record<SkyAccent, string> = {
  sky: "from-[#0b2a4a] via-[#123a63] to-[#071d34]",
  glacier: "from-[#123a63] via-[#1f4f7d] to-[#4f9be0]",
  amber: "from-[#e08a2b] via-[#f4b63e] to-[#123a63]",
  sunset: "from-[#c8551f] via-[#e08a2b] to-[#123a63]",
  steel: "from-[#1f4f7d] via-[#123a63] to-[#0b2a4a]",
  night: "from-[#0b2a4a] via-[#071d34] to-[#04101f]",
};

// ---------------------------------------------------------------------------
// SKY SHELL — scoped wrapper. Injects ONE <style> block, all namespaced under
// `.gaag-sky`. Paints a pale sky canvas with a faint sectional-chart grid,
// defines the display font + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function SkyShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`gaag-sky ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- pale sky canvas + faint sectional grid (scoped) --- */
        .gaag-sky {
          position: relative;
          color: ${SKY.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${SKY.canvas};
          background-image:
            linear-gradient(rgba(31,79,125,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,79,125,.05) 1px, transparent 1px),
            radial-gradient(circle at 82% 12%, rgba(79,155,224,.06) 0 3px, transparent 4px),
            linear-gradient(165deg, ${SKY.card} 0%, ${SKY.canvasDeep} 100%);
          background-size: 44px 44px, 44px 44px, 100% 100%, 100% 100%;
        }
        .gaag-sky ::selection { background: rgba(244,182,62,.26); }

        /* Site Nav is styled for dark pages (white links); on the pale canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .gaag-sky nav a { color: rgba(14,42,68,.72); }
        .gaag-sky nav a:hover { color: ${SKY.ink}; }
        .gaag-sky nav a[class*="bg-"] { color: ${SKY.paper}; }
        .gaag-sky nav a[class*="bg-"]:hover { color: ${SKY.paper}; }

        /* --- display type helpers --- */
        .gaag-sky .gaag-display {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .gaag-sky .gaag-eyebrow {
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${SKY.runway};
        }
        /* --- mono meta (tail-number / chart voice) --- */
        .gaag-sky .gaag-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin amber rule --- */
        .gaag-sky .gaag-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${SKY.amber}, ${SKY.runway});
        }

        /* --- sky card (on canvas) --- */
        .gaag-sky .gaag-card {
          position: relative;
          background: linear-gradient(180deg, ${SKY.card}, ${SKY.canvasDeep});
          border: 1px solid rgba(31,79,125,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(7,29,52,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .gaag-sky a.gaag-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(7,29,52,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .gaag-sky .gaag-glass {
          background: rgba(219,231,244,.06);
          border: 1px solid rgba(219,231,244,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ROUNDEL — circular aviation "wing + propeller" stamp. Self-contained CSS/SVG.
// Deep sky disc, amber ring, a simple prop/wing glyph in the core. Purely
// decorative. Honors the bush-flying theme without inventing an org logo — this
// is a generic aviation motif, NOT the Alaska Airmen's Association mark.
// ---------------------------------------------------------------------------
export function Roundel({
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
        background: `radial-gradient(circle at 50% 38%, rgba(234,243,251,.12), ${SKY.night} 72%), ${SKY.deep}`,
        border: `3px solid ${SKY.paper}`,
        boxShadow: `0 0 0 5px ${SKY.amber}, 0 0 0 7px ${SKY.paper}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Alaska bush-flying — sample aviation emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="gaag-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="gaag-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={SKY.paper}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            letterSpacing: "2.4px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#gaag-arc-top" startOffset="50%" textAnchor="middle">
            Alaska Bush Flying
          </textPath>
        </text>
        <text
          fill={SKY.amber}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#gaag-arc-bot" startOffset="50%" textAnchor="middle">
            Fly Safe · Fly North
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={SKY.amber} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core propeller + hub glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.4, height: size * 0.4 }} aria-hidden="true">
        <g stroke={SKY.ice} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M50 50 C 50 24, 42 16, 34 12" />
          <path d="M50 50 C 72 62, 82 60, 88 54" />
          <path d="M50 50 C 42 74, 46 84, 54 90" />
        </g>
        <circle cx="50" cy="50" r="8" fill={SKY.amber} />
        <circle cx="50" cy="50" r="3.4" fill={SKY.night} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO — the feature tile.
//
// When a `photo` (license-clean Creative-Commons image, verified and stored
// under /public/demos/aviation/) is supplied, we render that REAL photo behind
// a readable deep-sky scrim, with the label and an honest chip + on-image
// credit. When NO fitting licensed photo exists, `photo` is omitted and we fall
// back to the designed SVG aviation art below (a sky well with a horizon,
// runway, and a small aircraft silhouette). Either way the tile carries the
// honest note that the final build swaps in the Association's own photography.
// ---------------------------------------------------------------------------
export type PhotoSrc = {
  /** path under /public, e.g. "/demos/aviation/lake-hood.webp" */
  src: string;
  /** short attribution shown on-image, e.g. "Diego Delso · CC BY-SA 4.0" */
  credit: string;
  /** object-position, e.g. "center", "50% 30%" */
  position?: string;
};

export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  figure = "highwing",
  photo,
}: {
  accent: SkyAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "highwing" | "float" | "prop" | "tent";
  photo?: PhotoSrc;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1f4f7d]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `${label} — sample photo` : `Aviation illustration placeholder — ${label}`}
    >
      {/* REAL PHOTO branch — license-clean image behind a readable sky scrim */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={`${label} — sample Alaska aviation photo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* deep-sky scrim: keeps the blue palette + makes the label legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#071d34]/35 via-[#0b2a4a]/25 to-[#071d34]/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#071d34]/85 via-[#071d34]/35 to-transparent" />
          {/* on-image credit (top-left, unobtrusive) */}
          <span className="absolute left-3 top-3 rounded-full bg-[#071d34]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#eaf3fb]/80 backdrop-blur-sm">
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
            <radialGradient id={`gaag-sun-${accent}`} cx="76%" cy="24%" r="36%">
              <stop offset="0%" stopColor="#ffe6b0" stopOpacity="0.9" />
              <stop offset="55%" stopColor={SKY.amber} stopOpacity="0.5" />
              <stop offset="100%" stopColor={SKY.amber} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`gaag-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bcd8f4" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#bcd8f4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* sky wash + low sun */}
          <rect width="400" height="300" fill={`url(#gaag-sky-${accent})`} />
          <circle cx="304" cy="72" r="120" fill={`url(#gaag-sun-${accent})`} />
          <circle cx="304" cy="72" r="24" fill="#ffe6b0" opacity="0.82" />

          {/* mountain horizon (Chugach cue) */}
          <path
            d="M-20 214 L60 168 L110 196 L170 150 L232 200 L300 158 L360 198 L440 168 L440 300 L-20 300 Z"
            fill="#071d34"
            opacity="0.32"
          />
          <path
            d="M-20 232 L70 198 L140 224 L220 190 L300 222 L380 196 L440 220 L440 300 L-20 300 Z"
            fill="#04101f"
            opacity="0.4"
          />

          {/* runway strip + centerline dashes */}
          <path d="M120 300 L180 232 L222 232 L200 300 Z" fill="#0e2a44" opacity="0.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={191 - i * 5}
              y={244 + i * 14}
              width="4"
              height="8"
              fill="#eaf3fb"
              opacity={0.32 - i * 0.05}
            />
          ))}

          {/* aircraft silhouette */}
          {figure === "highwing" && (
            <g transform="translate(150 108)" fill="#0a2136" opacity="0.92">
              {/* high wing */}
              <rect x="-46" y="-8" width="92" height="7" rx="3.5" />
              {/* fuselage */}
              <path d="M-30 2 Q 0 -4 44 2 Q 50 6 44 10 Q 0 14 -30 10 Z" />
              {/* strut + tail */}
              <path d="M-14 -1 L-10 8 M14 -1 L18 8" stroke="#0a2136" strokeWidth="2" />
              <path d="M-30 4 L-44 -6 L-42 6 Z" />
            </g>
          )}
          {figure === "float" && (
            <g transform="translate(150 118)" fill="#0a2136" opacity="0.92">
              <rect x="-44" y="-10" width="88" height="6" rx="3" />
              <path d="M-28 0 Q 0 -6 42 0 Q 48 4 42 8 Q 0 12 -28 8 Z" />
              {/* floats */}
              <rect x="-26" y="16" width="56" height="6" rx="3" />
              <path d="M-18 8 L-16 16 M18 8 L20 16" stroke="#0a2136" strokeWidth="2" />
              <path d="M-28 2 L-42 -8 L-40 4 Z" />
            </g>
          )}
          {figure === "prop" && (
            <g transform="translate(200 120)" opacity="0.9">
              <g stroke="#0a2136" strokeWidth="6" strokeLinecap="round" fill="none">
                <path d="M0 0 C 0 -30, -8 -40, -16 -46" />
                <path d="M0 0 C 26 14, 36 12, 44 4" />
                <path d="M0 0 C -8 30, -4 42, 6 50" />
              </g>
              <circle cx="0" cy="0" r="9" fill={SKY.amber} />
              <circle cx="0" cy="0" r="3.6" fill="#0a2136" />
            </g>
          )}
          {figure === "tent" && (
            <g transform="translate(140 190)" fill="#0a2136" opacity="0.9">
              {/* tent by a plane — airport camping cue */}
              <path d="M0 40 L28 -6 L56 40 Z" />
              <path d="M22 40 L28 18 L34 40 Z" fill="#eaf3fb" opacity="0.35" />
              {/* small plane tail behind */}
              <g transform="translate(78 20)">
                <rect x="0" y="10" width="46" height="5" rx="2.5" />
                <path d="M40 6 L52 -2 L50 12 Z" />
              </g>
            </g>
          )}

          {/* thin contrail */}
          <path
            d="M40 60 C 140 40, 260 96, 380 66"
            stroke="#eaf3fb"
            strokeWidth="1.4"
            fill="none"
            opacity="0.28"
            strokeDasharray="2 7"
          />
        </svg>
      )}

      {/* soft vignette for caption legibility (SVG art only — the photo branch
          already lays down its own bottom scrim) */}
      {!photo && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071d34]/70 to-transparent" />
      )}

      {/* caption + honest chip: "Sample photo" over real imagery, "Illustration"
          over the designed SVG art. Both signal the final build uses the
          Association's own official photography. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="gaag-display text-[15px] font-semibold leading-tight text-[#eaf3fb] drop-shadow-[0_1px_3px_rgba(7,29,52,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#f4b63e]/45 bg-[#071d34]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eaf3fb]/90 backdrop-blur-sm">
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
// LIVE "FLYING IN?" CONDITIONS — the showpiece. Re-exported from conditions.tsx
// (a "use client" component): attempts a live PAAQ METAR, decodes it, and falls
// back to a clearly-labeled sample if the browser can't read it cross-origin.
// ---------------------------------------------------------------------------
export { GatheringConditions } from "./conditions";
