// Shared presentational pieces for the San Juan Islands whale-watch sample site.
//
// HONEST FRAMING (per brief): a cold-outreach SAMPLE built on public geography
// + real live AIS vessel traffic by BlueWave Projects. The brand is a
// DELIBERATELY FICTIONAL sample; the live map shows REAL vessels transmitting
// AIS in the strait (honestly labeled), NOT fabricated whale or "our-boat"
// positions. Whale-watch tour boats DO carry AIS, so here the live map
// genuinely shows tour-boat traffic — the operator's own category. No real
// operator name, prices, or contact. Whale watching of the endangered Southern
// Resident orcas is regulated: copy stays responsible-viewing-first.
//
// THEME — "Salish twilight & orca." Deep indigo-teal Salish Sea, San-Juan
// evergreen, white foam, an orca-slate, and a signature COOL BIOLUMINESCENT-
// CYAN accent (every prior demo used a warm accent — this one goes cool) on a
// misty grey-blue canvas. Spectral display for a refined, natural-history feel.
//
// SCOPING RULE: every style is namespaced under `.sjw` (see <IslandShell>). No
// bare body/html/:root/h1/h2 selectors — nothing leaks. Pages MUST wrap their
// content in <IslandShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/san-juan-whale-watch";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — Salish indigo-teal / evergreen / bioluminescent cyan
// ---------------------------------------------------------------------------
export const SJ = {
  night: "#0a1f2e", // deep Salish night
  deep: "#0f2f3f", // deep sea
  sea: "#16495e", // indigo-teal sea
  evergreen: "#1f4a3a", // San Juan fir
  slate: "#24333d", // orca slate
  cyan: "#2fc7d6", // bioluminescent cyan (signature)
  cyanDeep: "#147a8a", // deep teal (readable accent on light)
  mist: "#cfe4e6", // sea mist
  foam: "#eaf6f6", // white foam
  // subtle warm secondary (madrona bark)
  madrona: "#e0a06a",
  madronaDeep: "#c9824a",
  // canvas — cool misty grey-blue (distinct from warm cream/sand canvases)
  canvas: "#eef3f4",
  canvasDeep: "#dde8ea",
  card: "#f7fbfb",
  // text
  ink: "#0e2a33",
  inkSoft: "#395962",
  muted: "#64808a",
} as const;

export type SjAccent = "sea" | "evergreen" | "cyan" | "madrona" | "night" | "slate";

export const accentGradient: Record<SjAccent, string> = {
  sea: "from-[#0f2f3f] via-[#16495e] to-[#0a1f2e]",
  evergreen: "from-[#0f2f3f] via-[#1f4a3a] to-[#0a1f2e]",
  cyan: "from-[#0f2f3f] via-[#147a8a] to-[#16495e]",
  madrona: "from-[#c9824a] via-[#e0a06a] to-[#16495e]",
  night: "from-[#0f2f3f] via-[#0a1f2e] to-[#05121b]",
  slate: "from-[#0f2f3f] via-[#24333d] to-[#0a1f2e]",
};

// ---------------------------------------------------------------------------
// ISLAND SHELL — scoped wrapper. Injects ONE <style> block under `.sjw`. Paints
// a cool misty canvas, defines the display serif + helper classes + cards.
// ---------------------------------------------------------------------------
export function IslandShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`sjw ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Spectral:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool misty canvas (scoped) --- */
        .sjw {
          position: relative;
          color: ${SJ.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${SJ.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(47,199,214,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(31,74,58,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${SJ.card} 0%, ${SJ.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .sjw ::selection { background: rgba(47,199,214,.26); }

        /* Site Nav is styled for dark pages (white links); re-ink on the misty
           canvas, but leave any link carrying its own bg (the CTA) alone. */
        .sjw nav a { color: rgba(14,42,51,.72); }
        .sjw nav a:hover { color: ${SJ.ink}; }
        .sjw nav a[class*="bg-"] { color: ${SJ.foam}; }
        .sjw nav a[class*="bg-"]:hover { color: ${SJ.foam}; }

        /* --- display type helpers --- */
        .sjw .sjw-display {
          font-family: 'Spectral', 'Georgia', serif;
          font-weight: 700;
          letter-spacing: -0.005em;
        }
        .sjw .sjw-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-weight: 600;
          font-size: 12px;
          color: ${SJ.cyanDeep};
        }
        /* --- mono meta --- */
        .sjw .sjw-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin cyan/evergreen rule --- */
        .sjw .sjw-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${SJ.cyan}, ${SJ.evergreen});
        }

        /* --- card (on misty canvas) --- */
        .sjw .sjw-card {
          position: relative;
          background: linear-gradient(180deg, ${SJ.card}, ${SJ.canvasDeep});
          border: 1px solid rgba(22,73,94,.16);
          border-radius: 16px;
          box-shadow: 0 10px 30px -18px rgba(10,31,46,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .sjw a.sjw-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(10,31,46,.5);
        }

        /* --- glass tile inside dark panels --- */
        .sjw .sjw-glass {
          background: rgba(207,228,230,.06);
          border: 1px solid rgba(207,228,230,.14);
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }

        /* --- live cyan pulse for AIS pips --- */
        @keyframes sjw-ping {
          0% { transform: scale(1); opacity: .7; }
          75%, 100% { transform: scale(2.6); opacity: 0; }
        }
        .sjw .sjw-ping { animation: sjw-ping 2.4s cubic-bezier(0,0,.2,1) infinite; }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular San Juan stamp: deep sea disc, cyan ring, an orca dorsal +
// fluke over waves + island firs. Decorative, generic — NOT any operator's logo.
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
        background: `radial-gradient(circle at 50% 38%, rgba(207,228,230,.12), ${SJ.night} 72%), ${SJ.deep}`,
        border: `3px solid ${SJ.foam}`,
        boxShadow: `0 0 0 5px ${SJ.cyan}, 0 0 0 7px ${SJ.foam}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="San Juan Islands whale & wildlife tours — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="sjw-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="sjw-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={SJ.foam} style={{ fontFamily: "'Spectral', serif", fontSize: "12.5px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#sjw-arc-top" startOffset="50%" textAnchor="middle">
            Whale &amp; Wildlife Tours
          </textPath>
        </text>
        <text fill={SJ.cyan} style={{ fontFamily: "'Spectral', serif", fontSize: "11px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#sjw-arc-bot" startOffset="50%" textAnchor="middle">
            San Juan Islands
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={SJ.cyan} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* core orca dorsal + fluke over waves */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        {/* island firs on the horizon */}
        <path d="M8 44 L16 34 L24 44 M30 46 L40 32 L50 46" stroke={SJ.evergreen} strokeWidth="2" fill="none" opacity="0.7" />
        {/* orca body arcing out */}
        <path d="M18 70 C 34 44, 58 44, 74 66" fill="none" stroke={SJ.foam} strokeWidth="5" strokeLinecap="round" />
        {/* dorsal fin */}
        <path d="M46 50 L52 30 L58 52 Z" fill={SJ.slate} />
        {/* saddle patch */}
        <path d="M52 54 q 8 -2 12 4" stroke={SJ.mist} strokeWidth="2.4" fill="none" opacity="0.8" />
        {/* fluke */}
        <path d="M74 66 q 10 -2 14 -10 q -2 10 -8 14 Z" fill={SJ.slate} />
        {/* waves */}
        <path d="M10 82 C 26 78, 40 86, 56 82 C 70 78, 82 84, 92 82" stroke={SJ.cyan} strokeWidth="2.4" fill="none" opacity="0.85" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ART TILE — designed SVG art only. Each tile is a San Juan / orca motif behind
// a readable sea scrim, honestly chipped "Illustration."
// ---------------------------------------------------------------------------
export type SjPhoto = { src: string; credit: string; position?: string };

export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "orca",
  photo,
}: {
  accent: SjAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "orca" | "island" | "boat" | "fluke" | "sea" | "lighthouse";
  photo?: SjPhoto;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#16495e]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `Photo — ${label}` : `Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`sjw-sun-${accent}`} cx="78%" cy="22%" r="42%">
            <stop offset="0%" stopColor="#ffe6c0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffe6c0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sjw-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5e8ea" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d5e8ea" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* misty sky + low sun */}
        <rect width="400" height="300" fill={`url(#sjw-sky-${accent})`} />
        <circle cx="300" cy="70" r="120" fill={`url(#sjw-sun-${accent})`} />
        <circle cx="300" cy="70" r="18" fill="#ffe6c0" opacity="0.65" />

        {/* island silhouettes with firs */}
        <path d="M-20 200 L60 168 L120 196 L200 164 L280 196 L360 168 L440 196 L440 300 L-20 300 Z" fill="#0a1f2e" opacity="0.32" />
        <g stroke="#1f4a3a" strokeWidth="2" opacity="0.5">
          <path d="M60 168 L54 158 L66 168 M120 196 L112 184 L126 196 M280 196 L272 184 L288 196 M360 168 L352 156 L368 168" fill="none" />
        </g>

        {/* Salish water */}
        <path d="M-20 262 C 80 246, 150 276, 230 256 C 310 238, 350 264, 440 250 L440 300 L-20 300 Z" fill="#16495e" opacity="0.55" />

        {/* figure motifs */}
        {figure === "orca" && (
          <g transform="translate(190 150)" opacity="0.95">
            <path d="M-60 40 C -30 6, 40 6, 66 44" fill="none" stroke="#eaf6f6" strokeWidth="6" strokeLinecap="round" />
            <path d="M-6 12 L2 -30 L12 14 Z" fill="#24333d" />
            <path d="M4 18 q 12 -2 18 6" stroke="#cfe4e6" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M66 44 q 14 -2 20 -14 q -2 14 -12 20 Z" fill="#24333d" />
          </g>
        )}
        {figure === "fluke" && (
          <g transform="translate(196 150)" opacity="0.95">
            <path d="M0 40 C -4 10, -4 0, 0 -6 C 4 0, 4 10, 0 40 Z" fill="#24333d" />
            <path d="M0 -6 C -20 -18, -40 -14, -50 -4 C -34 -2, -14 -4, 0 4 C 14 -4, 34 -2, 50 -4 C 40 -14, 20 -18, 0 -6 Z" fill="#24333d" />
            <path d="M-40 -8 C -20 -6, 20 -6, 40 -8" stroke="#eaf6f6" strokeWidth="1.4" fill="none" opacity="0.4" />
          </g>
        )}
        {figure === "boat" && (
          <g transform="translate(196 156)" opacity="0.95">
            <path d="M-52 20 L-40 0 L42 0 L54 20 Z" fill="none" stroke="#2fc7d6" strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="-12" y="-22" width="30" height="22" fill="none" stroke="#eaf6f6" strokeWidth="2.4" />
            <circle cx="3" cy="-11" r="2.2" fill="#2fc7d6" />
          </g>
        )}
        {figure === "island" && (
          <g opacity="0.9">
            <path d="M120 176 C 150 150, 250 150, 280 176 Z" fill="#0a1f2e" opacity="0.6" />
            <path d="M170 158 L162 146 L178 158 M210 156 L202 142 L218 156" stroke="#1f4a3a" strokeWidth="2.4" fill="none" />
          </g>
        )}
        {figure === "lighthouse" && (
          <g transform="translate(196 132)" opacity="0.92">
            <path d="M-8 58 L-5 -18 L5 -18 L8 58 Z" fill="#eaf6f6" opacity="0.85" />
            <rect x="-6" y="-28" width="12" height="10" fill="#2fc7d6" opacity="0.85" />
            <path d="M6 -23 L26 -30" stroke="#2fc7d6" strokeWidth="1.4" opacity="0.55" />
          </g>
        )}
        {figure === "sea" && (
          <path d="M40 120 C 140 104, 260 150, 380 124" stroke="#cfe4e6" strokeWidth="1.4" fill="none" opacity="0.26" strokeDasharray="3 9" />
        )}
      </svg>
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/ph:scale-[1.04]"
            style={{ objectPosition: photo.position ?? "center" }}
          />
        </>
      )}

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1f2e]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="sjw-display text-[15px] font-semibold leading-tight text-[#f2fbfb] drop-shadow-[0_1px_3px_rgba(10,31,46,0.9)]">
            {label}
          </span>
          {photo ? (
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/25 bg-black/55 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">{photo.credit}</span>
          ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2fc7d6]/45 bg-[#0a1f2e]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f2fbfb]/90 backdrop-blur-sm">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
              <path d="M2 11 L6 7.5 L9 10 L11 8.5 L14 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            Illustration
          </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LIVE WHALE-WATCH MAP — the showpiece. Re-exported from fleetmap.tsx (a "use
// client" component on the shared _wx library): a stylized chart of Haro Strait
// / San Juan Channel with live AIS vessel pips (the tour fleet + traffic), a
// live-conditions strip (Friday Harbor tide/current/water + wind), and — if a
// keyless sightings feed proves out — recent community whale sightings.
// ---------------------------------------------------------------------------
export { WhaleFleet } from "./fleetmap";
