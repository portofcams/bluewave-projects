// Shared presentational pieces for the Port Townsend Wooden Boat Festival
// information-hub sample.
//
// HONEST FRAMING (per brief): a cold-outreach SAMPLE information hub built on
// PUBLICLY verified information by BlueWave Projects. NOT affiliated with or
// endorsed by the Port Townsend Wooden Boat Festival or Northwest Maritime. All
// imagery is designed SVG art (no photographs) — a real build would use the
// event's own official photography, branding, and logo.
//
// THEME — "Port Townsend: varnish & brass." A heritage wooden-boat / Victorian-
// seaport aesthetic: varnished-mahogany wood, brass fittings, deep Salish-Sea
// slate-teal, Douglas-fir green, and a warm sailcloth-cream canvas. Playfair
// Display for the Victorian-port character. Deliberately distinct from the cold
// northern-teal demos and the warm tropical Waikiki demo — this reads like a
// classic wooden-boat show, wood-and-brass warm on Salish-Sea slate.
//
// SCOPING RULE: every style is namespaced under `.ptw` (see <HarborShell>). No
// bare body/html/:root/h1/h2 selectors — nothing leaks. Pages MUST wrap their
// content in <HarborShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/port-townsend-wooden-boat";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — varnished wood / brass / Salish slate-sea / sailcloth
// ---------------------------------------------------------------------------
export const PT = {
  night: "#12262b", // deep Salish dusk
  deep: "#1b3a41", // deep sea slate-teal
  sea: "#2c5560", // Salish slate-teal
  fir: "#2f5142", // Douglas-fir green (support)
  steel: "#4a6b72", // weathered steel
  mist: "#cfe0dd", // sea mist
  // heritage warm accents
  wood: "#8a5a2a", // varnished mahogany
  woodDeep: "#5f3d1c", // deep varnish
  brass: "#c99a3f", // brass fittings
  brassDeep: "#a87d2c", // deep brass
  // canvas — warm sailcloth cream (distinct)
  canvas: "#f2e9d6",
  canvasDeep: "#e7dbc2",
  card: "#fbf6ea",
  // text
  ink: "#17332f", // deep sea ink (body)
  inkSoft: "#3f5b58",
  muted: "#6b7d78",
} as const;

export type PtAccent = "sea" | "fir" | "wood" | "brass" | "night" | "steel";

export const accentGradient: Record<PtAccent, string> = {
  sea: "from-[#1b3a41] via-[#2c5560] to-[#12262b]",
  fir: "from-[#1b3a41] via-[#2f5142] to-[#12262b]",
  wood: "from-[#5f3d1c] via-[#8a5a2a] to-[#2c5560]",
  brass: "from-[#a87d2c] via-[#c99a3f] to-[#2c5560]",
  night: "from-[#1b3a41] via-[#12262b] to-[#0a1619]",
  steel: "from-[#1b3a41] via-[#4a6b72] to-[#12262b]",
};

// ---------------------------------------------------------------------------
// HARBOR SHELL — scoped wrapper. Injects ONE <style> block under `.ptw`. Paints
// a warm sailcloth canvas, defines the display serif + helper classes + cards.
// ---------------------------------------------------------------------------
export function HarborShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ptw ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        /* --- warm sailcloth canvas (scoped) --- */
        .ptw {
          position: relative;
          color: ${PT.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${PT.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(201,154,63,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(44,85,96,.12) 0 3px, transparent 4px),
            linear-gradient(165deg, ${PT.card} 0%, ${PT.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .ptw ::selection { background: rgba(201,154,63,.26); }

        /* Site Nav is styled for dark pages (white links); re-ink on the cream
           canvas, but leave any link carrying its own bg (the CTA) alone. */
        .ptw nav a { color: rgba(23,51,47,.72); }
        .ptw nav a:hover { color: ${PT.ink}; }
        .ptw nav a[class*="bg-"] { color: ${PT.canvas}; }
        .ptw nav a[class*="bg-"]:hover { color: ${PT.canvas}; }

        /* --- display type helpers --- */
        .ptw .ptw-display {
          font-family: 'Playfair Display', 'Georgia', serif;
          font-weight: 700;
          letter-spacing: -0.005em;
        }
        .ptw .ptw-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-weight: 600;
          font-size: 12px;
          color: ${PT.brassDeep};
        }
        /* --- mono meta (log / conditions voice) --- */
        .ptw .ptw-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin brass/wood rule --- */
        .ptw .ptw-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${PT.brass}, ${PT.wood});
        }

        /* --- card (on canvas) --- */
        .ptw .ptw-card {
          position: relative;
          background: linear-gradient(180deg, ${PT.card}, ${PT.canvasDeep});
          border: 1px solid rgba(44,85,96,.18);
          border-radius: 16px;
          box-shadow: 0 10px 30px -18px rgba(18,38,43,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .ptw a.ptw-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(18,38,43,.5);
        }

        /* --- glass tile inside the dark conditions panel --- */
        .ptw .ptw-glass {
          background: rgba(207,224,221,.06);
          border: 1px solid rgba(207,224,221,.14);
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// BURGEE — circular "Port Townsend" wooden-boat stamp: deep sea disc, brass
// ring, a gaff schooner over a compass. Decorative, generic — NOT the event's
// own logo.
// ---------------------------------------------------------------------------
export function Burgee({
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
        background: `radial-gradient(circle at 50% 38%, rgba(207,224,221,.12), ${PT.night} 72%), ${PT.deep}`,
        border: `3px solid ${PT.canvas}`,
        boxShadow: `0 0 0 5px ${PT.brass}, 0 0 0 7px ${PT.canvas}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Port Townsend Wooden Boat Festival — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="ptw-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="ptw-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={PT.canvas}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "12.5px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 700 }}
        >
          <textPath href="#ptw-arc-top" startOffset="50%" textAnchor="middle">
            Wooden Boat Festival
          </textPath>
        </text>
        <text
          fill={PT.brass}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "11px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#ptw-arc-bot" startOffset="50%" textAnchor="middle">
            Port Townsend
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={PT.brass} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* core gaff-schooner over compass */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        {/* compass ticks */}
        <g stroke={PT.mist} strokeWidth="1" opacity="0.4">
          <line x1="50" y1="8" x2="50" y2="16" />
          <line x1="50" y1="84" x2="50" y2="92" />
          <line x1="8" y1="50" x2="16" y2="50" />
          <line x1="84" y1="50" x2="92" y2="50" />
        </g>
        {/* hull */}
        <path d="M28 70 L72 70 L64 80 L36 80 Z" fill="none" stroke={PT.brass} strokeWidth="3" strokeLinejoin="round" />
        {/* two gaff sails */}
        <path d="M46 66 L46 28 L60 40 L60 66 Z" fill={PT.mist} opacity="0.85" />
        <path d="M44 66 L44 34 L32 44 L32 66 Z" fill={PT.mist} opacity="0.6" />
        {/* masts */}
        <line x1="46" y1="28" x2="46" y2="70" stroke={PT.canvas} strokeWidth="1.6" />
        <line x1="44" y1="34" x2="44" y2="70" stroke={PT.canvas} strokeWidth="1.4" />
        {/* waterline */}
        <path d="M22 82 C 36 78, 44 86, 58 82 C 70 79, 76 84, 82 82" stroke={PT.brass} strokeWidth="2" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ART TILE — designed SVG art only. Each tile is a Port Townsend / wooden-boat
// motif behind a readable slate-sea scrim, honestly chipped "Illustration."
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "schooner",
}: {
  accent: PtAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "schooner" | "hull" | "compass" | "lighthouse" | "sea" | "boats";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#2c5560]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`ptw-sun-${accent}`} cx="76%" cy="22%" r="40%">
            <stop offset="0%" stopColor="#f4e4bf" stopOpacity="0.9" />
            <stop offset="55%" stopColor={PT.brass} stopOpacity="0.4" />
            <stop offset="100%" stopColor={PT.brass} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`ptw-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e4ecdf" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e4ecdf" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* muted PNW sky + low sun */}
        <rect width="400" height="300" fill={`url(#ptw-sky-${accent})`} />
        <circle cx="300" cy="70" r="120" fill={`url(#ptw-sun-${accent})`} />
        <circle cx="300" cy="70" r="20" fill="#f4e4bf" opacity="0.72" />

        {/* Olympic hills + fir treeline */}
        <path d="M-20 200 L60 158 L140 192 L220 152 L300 190 L380 156 L440 190 L440 300 L-20 300 Z" fill="#12262b" opacity="0.32" />
        <path d="M-20 224 L50 200 L110 220 L180 198 L250 220 L320 200 L400 220 L440 210 L440 300 L-20 300 Z" fill="#2f5142" opacity="0.38" />

        {/* Salish water */}
        <path d="M-20 262 C 80 246, 150 276, 230 256 C 310 238, 350 264, 440 250 L440 300 L-20 300 Z" fill="#2c5560" opacity="0.55" />
        <path d="M-20 262 C 80 246, 150 276, 230 256 C 310 238, 350 264, 440 250" stroke={PT.mist} strokeWidth="1.3" fill="none" opacity="0.3" />

        {/* figure motifs */}
        {figure === "schooner" && (
          <g transform="translate(180 150)" opacity="0.95">
            <path d="M-52 34 L52 34 L40 46 L-40 46 Z" fill="none" stroke={PT.brass} strokeWidth="3" strokeLinejoin="round" />
            <path d="M-4 30 L-4 -26 L20 -6 L20 30 Z" fill={PT.mist} opacity="0.85" />
            <path d="M-8 30 L-8 -16 L-30 0 L-30 30 Z" fill={PT.mist} opacity="0.6" />
            <line x1="-4" y1="-26" x2="-4" y2="34" stroke="#f4efe0" strokeWidth="1.8" />
            <line x1="-8" y1="-16" x2="-8" y2="34" stroke="#f4efe0" strokeWidth="1.4" />
          </g>
        )}
        {figure === "hull" && (
          <g transform="translate(150 150)" opacity="0.92">
            <path d="M-60 -10 C -30 30, 30 30, 60 -10" fill="none" stroke={PT.wood} strokeWidth="5" strokeLinecap="round" />
            <path d="M-50 0 C -26 32, 26 32, 50 0 M-40 10 C -20 34, 20 34, 40 10" fill="none" stroke={PT.wood} strokeWidth="2.4" opacity="0.7" />
            <line x1="-60" y1="-10" x2="-60" y2="-24" stroke={PT.brass} strokeWidth="3" />
            <line x1="60" y1="-10" x2="60" y2="-24" stroke={PT.brass} strokeWidth="3" />
          </g>
        )}
        {figure === "compass" && (
          <g transform="translate(196 150)" opacity="0.92">
            <circle r="34" fill="none" stroke={PT.brass} strokeWidth="2" />
            <path d="M0 -30 L7 0 L0 30 L-7 0 Z" fill={PT.mist} opacity="0.8" />
            <path d="M-30 0 L0 7 L30 0 L0 -7 Z" fill={PT.brass} opacity="0.6" />
          </g>
        )}
        {figure === "lighthouse" && (
          <g transform="translate(196 130)" opacity="0.92">
            <path d="M-10 60 L-6 -20 L6 -20 L10 60 Z" fill={PT.mist} opacity="0.85" />
            <rect x="-8" y="-30" width="16" height="12" fill={PT.brass} opacity="0.85" />
            <path d="M-14 -30 L14 -30 L8 -20 L-8 -20 Z" fill="#12262b" opacity="0.7" />
            <line x1="8" y1="-24" x2="30" y2="-30" stroke={PT.brass} strokeWidth="1.4" opacity="0.6" />
          </g>
        )}
        {figure === "boats" && (
          <g opacity="0.9">
            <path d="M96 150 L136 150 L130 160 L102 160 Z" fill="none" stroke={PT.brass} strokeWidth="2.4" />
            <line x1="116" y1="150" x2="116" y2="128" stroke={PT.mist} strokeWidth="1.4" />
            <path d="M240 158 L286 158 L278 170 L248 170 Z" fill="none" stroke={PT.brass} strokeWidth="2.4" />
            <line x1="263" y1="158" x2="263" y2="132" stroke={PT.mist} strokeWidth="1.4" />
          </g>
        )}
        {figure === "sea" && (
          <path d="M40 120 C 140 104, 260 150, 380 124" stroke={PT.mist} strokeWidth="1.4" fill="none" opacity="0.28" strokeDasharray="3 9" />
        )}

        {/* thin light ripple */}
        <path d="M40 110 C 140 94, 260 142, 380 114" stroke={PT.mist} strokeWidth="1.1" fill="none" opacity="0.16" strokeDasharray="2 8" />
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#12262b]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="ptw-display text-[15px] font-semibold leading-tight text-[#f4efe0] drop-shadow-[0_1px_3px_rgba(18,38,43,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#c99a3f]/45 bg-[#12262b]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f4efe0]/90 backdrop-blur-sm">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
              <path d="M2 11 L6 7.5 L9 10 L11 8.5 L14 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            Illustration
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LIVE "ON THE WATER RIGHT NOW" panel — the showpiece. Re-exported from
// conditions.tsx (a "use client" component built on the shared _wx library):
// live Port Townsend tide + water temperature + nearest-station wind, with the
// honest Live/Sample/Computed fallback.
// ---------------------------------------------------------------------------
export { PortTownsendConditions } from "./conditions";
