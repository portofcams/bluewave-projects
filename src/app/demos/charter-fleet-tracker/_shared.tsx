// Shared presentational pieces for the charter-fishing-fleet live-tracker
// sample site.
//
// HONEST FRAMING (per brief): a cold-outreach SAMPLE built on public geography
// + real live AIS vessel traffic by BlueWave Projects. The brand is a
// DELIBERATELY FICTIONAL sample; the live map shows REAL vessels transmitting
// AIS in the bay (honestly labeled "live vessel traffic — your fleet would
// appear here in your colors"), NOT fabricated "our-boat" positions. No real
// operator name, prices, or contact. Examples use public landmarks. When the
// AIS proxy isn't reachable, the map shows a clearly-labeled animated SAMPLE
// fleet — never presented as live.
//
// THEME — "Charter: chart & sonar." A marine-instrument aesthetic: a cool
// nautical-chart paper canvas with depth contours + a lat/lon grid, deep
// chart-navy, a bright SONAR-GREEN live accent (the color of a fresh AIS pip /
// fish echo), and a SAFETY-ORANGE brand accent. Chivo display for a technical,
// marine-signage feel. Deliberately distinct from every prior demo.
//
// SCOPING RULE: every style is namespaced under `.chf` (see <ChartShell>). No
// bare body/html/:root/h1/h2 selectors — nothing leaks. Pages MUST wrap their
// content in <ChartShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/charter-fleet-tracker";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — chart navy / sonar green / safety orange on chart paper
// ---------------------------------------------------------------------------
export const CH = {
  night: "#081a2b", // deepest chart navy
  deep: "#0c2740", // chart navy
  ocean: "#16466b", // chart depth blue
  steel: "#3a6187", // weathered steel-blue
  contour: "#7fb0cc", // depth-contour line
  foam: "#d6e6ee", // pale chart foam
  // accents
  sonar: "#2fd07a", // live sonar green
  sonarDeep: "#1fa862", // deep sonar
  orange: "#ff7a3c", // safety orange (brand)
  orangeDeep: "#e05f28", // deep safety orange
  // canvas — cool chart paper (distinct from the warm/teal canvases)
  canvas: "#eaf1f5",
  canvasDeep: "#dbe6ec",
  card: "#f8fbfc",
  // text
  ink: "#0e2438", // chart ink (body)
  inkSoft: "#3a5568",
  muted: "#6a7f8e",
} as const;

export type ChAccent = "ocean" | "steel" | "sonar" | "orange" | "night" | "deep";

export const accentGradient: Record<ChAccent, string> = {
  ocean: "from-[#0c2740] via-[#16466b] to-[#081a2b]",
  steel: "from-[#0c2740] via-[#3a6187] to-[#081a2b]",
  sonar: "from-[#0c2740] via-[#1fa862] to-[#16466b]",
  orange: "from-[#e05f28] via-[#ff7a3c] to-[#16466b]",
  night: "from-[#0c2740] via-[#081a2b] to-[#04101a]",
  deep: "from-[#16466b] via-[#0c2740] to-[#081a2b]",
};

// ---------------------------------------------------------------------------
// CHART SHELL — scoped wrapper. Injects ONE <style> block under `.chf`. Paints
// a cool chart-paper canvas, defines the display face + helper classes + cards.
// ---------------------------------------------------------------------------
export function ChartShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`chf ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool chart-paper canvas (scoped) --- */
        .chf {
          position: relative;
          color: ${CH.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${CH.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(255,122,60,.08) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(47,208,122,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${CH.card} 0%, ${CH.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .chf ::selection { background: rgba(47,208,122,.24); }

        /* Site Nav is styled for dark pages (white links); re-ink on the chart
           canvas, but leave any link carrying its own bg (the CTA) alone. */
        .chf nav a { color: rgba(14,36,56,.72); }
        .chf nav a:hover { color: ${CH.ink}; }
        .chf nav a[class*="bg-"] { color: ${CH.foam}; }
        .chf nav a[class*="bg-"]:hover { color: ${CH.foam}; }

        /* --- display type helpers --- */
        .chf .chf-display {
          font-family: 'Chivo', system-ui, sans-serif;
          font-weight: 800;
          letter-spacing: -0.015em;
        }
        .chf .chf-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-weight: 600;
          font-size: 12px;
          color: ${CH.orangeDeep};
        }
        /* --- mono meta (instrument / coordinate voice) --- */
        .chf .chf-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin orange/sonar rule --- */
        .chf .chf-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${CH.orange}, ${CH.sonar});
        }

        /* --- card (on chart paper) --- */
        .chf .chf-card {
          position: relative;
          background: linear-gradient(180deg, ${CH.card}, ${CH.canvasDeep});
          border: 1px solid rgba(22,70,107,.16);
          border-radius: 16px;
          box-shadow: 0 10px 30px -18px rgba(8,26,43,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .chf a.chf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(8,26,43,.5);
        }

        /* --- glass tile inside the dark chart/map panel --- */
        .chf .chf-glass {
          background: rgba(214,230,238,.06);
          border: 1px solid rgba(214,230,238,.14);
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }

        /* --- live sonar pulse for AIS pips --- */
        @keyframes chf-ping {
          0% { transform: scale(1); opacity: .7; }
          75%, 100% { transform: scale(2.6); opacity: 0; }
        }
        .chf .chf-ping { animation: chf-ping 2.4s cubic-bezier(0,0,.2,1) infinite; }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular charter stamp: deep chart disc, sonar ring, a halibut +
// boat over sonar arcs. Decorative, generic — NOT any operator's logo.
// ---------------------------------------------------------------------------
export function Emblem({
  size = 200,
  className = "",
  topText = "Charter Fleet",
  bottomText = "Kachemak Bay · AK",
}: {
  size?: number;
  className?: string;
  topText?: string;
  bottomText?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 38%, rgba(214,230,238,.12), ${CH.night} 72%), ${CH.deep}`,
        border: `3px solid ${CH.foam}`,
        boxShadow: `0 0 0 5px ${CH.sonar}, 0 0 0 7px ${CH.foam}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Charter fleet — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="chf-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="chf-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={CH.foam} style={{ fontFamily: "'Chivo', sans-serif", fontSize: "13px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 800 }}>
          <textPath href="#chf-arc-top" startOffset="50%" textAnchor="middle">
            {topText}
          </textPath>
        </text>
        <text fill={CH.sonar} style={{ fontFamily: "'Chivo', sans-serif", fontSize: "10.5px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#chf-arc-bot" startOffset="50%" textAnchor="middle">
            {bottomText}
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={CH.sonar} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* core halibut + boat over sonar arcs */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        {/* sonar arcs */}
        <g stroke={CH.contour} fill="none" opacity="0.5">
          <path d="M20 66 A 30 30 0 0 1 80 66" strokeWidth="1" />
          <path d="M28 66 A 22 22 0 0 1 72 66" strokeWidth="1" />
        </g>
        {/* halibut (flatfish) silhouette */}
        <g transform="translate(50 60)" fill={CH.foam} opacity="0.9">
          <ellipse cx="0" cy="0" rx="24" ry="13" />
          <path d="M22 0 L34 -8 L34 8 Z" />
          <circle cx="-12" cy="-4" r="2.2" fill={CH.deep} />
        </g>
        {/* small boat above */}
        <g transform="translate(50 30)" fill="none" stroke={CH.orange} strokeWidth="3" strokeLinejoin="round">
          <path d="M-16 6 L16 6 L11 13 L-11 13 Z" />
          <line x1="0" y1="6" x2="0" y2="-6" stroke={CH.orange} />
        </g>
        <circle cx="50" cy="24" r="2.2" fill={CH.sonar} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ART TILE — designed SVG art only. Each tile is a charter-fishing motif behind
// a readable chart-navy scrim, honestly chipped "Illustration."
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "boat",
}: {
  accent: ChAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "boat" | "halibut" | "sonar" | "chart" | "rod" | "sea";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#16466b]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`chf-grid-${accent}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#d6e6ee" strokeWidth="0.5" opacity="0.5" />
          </pattern>
          <radialGradient id={`chf-sun-${accent}`} cx="78%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* chart grid + depth contours */}
        <rect width="400" height="300" fill={`url(#chf-grid-${accent})`} opacity="0.3" />
        <circle cx="300" cy="66" r="110" fill={`url(#chf-sun-${accent})`} />
        <path d="M-20 210 C 120 180, 220 232, 420 200" stroke={CH.contour} strokeWidth="1" fill="none" opacity="0.35" />
        <path d="M-20 240 C 120 214, 220 262, 420 232" stroke={CH.contour} strokeWidth="1" fill="none" opacity="0.28" />
        <path d="M-20 268 C 120 246, 220 286, 420 260" stroke={CH.contour} strokeWidth="1" fill="none" opacity="0.22" />

        {/* figure motifs */}
        {figure === "boat" && (
          <g transform="translate(196 150)" opacity="0.95">
            <path d="M-56 22 L-42 -2 L44 -2 L58 22 Z" fill="none" stroke={CH.orange} strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="-14" y="-26" width="34" height="24" fill="none" stroke={CH.foam} strokeWidth="2.4" />
            <line x1="24" y1="-2" x2="40" y2="-22" stroke={CH.foam} strokeWidth="2" />
            <circle cx="0" cy="-14" r="2.4" fill={CH.sonar} />
          </g>
        )}
        {figure === "halibut" && (
          <g transform="translate(196 156)" fill={CH.foam} opacity="0.9">
            <ellipse cx="0" cy="0" rx="52" ry="28" />
            <path d="M46 0 L70 -16 L70 16 Z" />
            <circle cx="-26" cy="-8" r="4" fill={CH.deep} />
            <path d="M-52 0 C -30 20, 30 20, 46 0" stroke={CH.deep} strokeWidth="1.4" fill="none" opacity="0.4" />
          </g>
        )}
        {figure === "sonar" && (
          <g transform="translate(196 150)" fill="none" stroke={CH.sonar} opacity="0.9">
            <circle r="12" strokeWidth="2" />
            <circle r="30" strokeWidth="1.6" opacity="0.7" />
            <circle r="50" strokeWidth="1.2" opacity="0.5" />
            <circle cx="0" cy="0" r="3" fill={CH.sonar} stroke="none" />
            <ellipse cx="22" cy="-14" rx="6" ry="3" fill={CH.orange} stroke="none" opacity="0.9" />
          </g>
        )}
        {figure === "chart" && (
          <g opacity="0.85">
            <path d="M60 120 C 120 100, 160 150, 120 180 C 90 200, 60 170, 60 120 Z" fill="none" stroke={CH.contour} strokeWidth="1.6" />
            <path d="M240 110 C 300 90, 340 140, 300 172 C 270 196, 240 160, 240 110 Z" fill="none" stroke={CH.contour} strokeWidth="1.6" />
            <text x="96" y="152" fill={CH.foam} fontSize="10" fontFamily="ui-monospace" opacity="0.6">32</text>
            <text x="276" y="146" fill={CH.foam} fontSize="10" fontFamily="ui-monospace" opacity="0.6">18</text>
          </g>
        )}
        {figure === "rod" && (
          <g transform="translate(150 150)" opacity="0.92">
            <line x1="-40" y1="40" x2="40" y2="-40" stroke={CH.orange} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M40 -40 C 60 -30, 60 20, 40 40" stroke={CH.foam} strokeWidth="1.2" fill="none" opacity="0.6" />
            <circle cx="-30" cy="30" r="6" fill="none" stroke={CH.foam} strokeWidth="2" />
          </g>
        )}
        {figure === "sea" && (
          <path d="M40 120 C 140 104, 260 150, 380 124" stroke={CH.foam} strokeWidth="1.4" fill="none" opacity="0.24" strokeDasharray="3 9" />
        )}
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#081a2b]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="chf-display text-[15px] font-semibold leading-tight text-[#eef6fa] drop-shadow-[0_1px_3px_rgba(8,26,43,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ff7a3c]/45 bg-[#081a2b]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eef6fa]/90 backdrop-blur-sm">
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
// LIVE FLEET MAP — the showpiece. Re-exported from fleetmap.tsx (a "use client"
// component built on the shared _wx library): a stylized nautical-chart map
// with live AIS vessel pips + a fleet roster + a compact live-conditions strip.
// ---------------------------------------------------------------------------
export { CharterFleet } from "./fleetmap";
