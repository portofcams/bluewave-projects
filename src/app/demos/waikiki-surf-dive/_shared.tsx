// Shared presentational pieces for the Waikiki surf-school / dive-shop sample
// site.
//
// HONEST FRAMING (per brief): a cold-outreach SAMPLE built on PUBLICLY
// verifiable geography + live public data by BlueWave Projects. "Waikiki Surf
// & Dive Co." is a DELIBERATELY FICTIONAL sample brand — not a real business,
// not affiliated with or endorsed by any actual Waikiki operator. All imagery
// is designed SVG art (no photographs). No operator's name, prices, times, or
// contact appear. Per house rule, examples use public landmarks (Kūhiō Beach,
// Kalākaua Ave, Diamond Head), never real client data.
//
// THEME — "Waikiki: lagoon & plumeria." Deliberately WARM and sunlit, to stand
// apart from the three cold-water demos (all teal/blue): turquoise lagoon
// water, golden-sand canvas, pale reef foam, and a signature CORAL / sunset
// accent warmed by plumeria gold, with a touch of Diamond-Head palm green.
//
// SCOPING RULE: every style is namespaced under `.wsd` (see <ReefShell>).
// No bare body/html/:root/h1/h2 selectors — nothing leaks. Pages MUST wrap
// their content in <ReefShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/waikiki-surf-dive";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — turquoise lagoon / golden sand / coral sunset
// ---------------------------------------------------------------------------
export const WSD = {
  night: "#052e38", // deep ocean dusk
  deep: "#0a4a54", // deep tropical teal
  lagoon: "#12909e", // turquoise lagoon
  aqua: "#3fbfcf", // bright aqua
  foam: "#d8f3f2", // pale reef foam
  palm: "#2f7d5b", // Diamond-Head palm green (accent support)
  // warm accents
  coral: "#ff6f5e", // signature coral / sunset
  coralDeep: "#e14b3d", // deep coral / hibiscus
  gold: "#ffcf5c", // plumeria gold
  goldDeep: "#e0a52f", // deep gold
  // canvas — SAND-tinted warm off-white (distinct from the cool canvases)
  canvas: "#f7f1e4", // warm sand canvas
  canvasDeep: "#efe6d2", // shaded sand
  card: "#fffdf8", // lightest warm card
  sand: "#ecdcbb", // golden sand
  // text
  ink: "#0f333a", // deep ocean ink (body)
  inkSoft: "#3c5b60", // muted teal-slate
  muted: "#6d7f7c", // captions / meta
} as const;

export type WsdAccent = "lagoon" | "palm" | "coral" | "gold" | "night" | "aqua";

export const accentGradient: Record<WsdAccent, string> = {
  lagoon: "from-[#0a4a54] via-[#12909e] to-[#052e38]",
  palm: "from-[#0a4a54] via-[#2f7d5b] to-[#052e38]",
  coral: "from-[#e14b3d] via-[#ff6f5e] to-[#12909e]",
  gold: "from-[#e0a52f] via-[#ffcf5c] to-[#12909e]",
  night: "from-[#0a4a54] via-[#052e38] to-[#03181e]",
  aqua: "from-[#12909e] via-[#3fbfcf]/50 to-[#0a4a54]",
};

// ---------------------------------------------------------------------------
// REEF SHELL — scoped wrapper. Injects ONE <style> block under `.wsd`. Paints a
// warm sand canvas, defines the display face + helper classes + card styles.
// ---------------------------------------------------------------------------
export function ReefShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`wsd ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        /* --- warm sand canvas (scoped) --- */
        .wsd {
          position: relative;
          color: ${WSD.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${WSD.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(255,111,94,.09) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(63,191,207,.12) 0 3px, transparent 4px),
            linear-gradient(165deg, ${WSD.card} 0%, ${WSD.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .wsd ::selection { background: rgba(255,111,94,.24); }

        /* Site Nav is styled for dark pages (white links); re-ink on the sand
           canvas, but leave any link carrying its own bg (the CTA) alone. */
        .wsd nav a { color: rgba(15,51,58,.72); }
        .wsd nav a:hover { color: ${WSD.ink}; }
        .wsd nav a[class*="bg-"] { color: ${WSD.foam}; }
        .wsd nav a[class*="bg-"]:hover { color: ${WSD.foam}; }

        /* --- display type helpers --- */
        .wsd .wsd-display {
          font-family: 'Poppins', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.015em;
        }
        .wsd .wsd-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-weight: 600;
          font-size: 12px;
          color: ${WSD.coralDeep};
        }
        /* --- mono meta (conditions voice) --- */
        .wsd .wsd-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin coral/gold rule --- */
        .wsd .wsd-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${WSD.coral}, ${WSD.gold});
        }

        /* --- card (on sand canvas) --- */
        .wsd .wsd-card {
          position: relative;
          background: linear-gradient(180deg, ${WSD.card}, ${WSD.canvasDeep});
          border: 1px solid rgba(18,144,158,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(5,46,56,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .wsd a.wsd-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(5,46,56,.5);
        }

        /* --- glass tile inside the dark conditions panel --- */
        .wsd .wsd-glass {
          background: rgba(216,243,242,.06);
          border: 1px solid rgba(216,243,242,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "Waikiki" stamp: deep lagoon disc, foam ring, a Diamond-
// Head + wave + longboard glyph. Decorative, generic — NOT any operator's logo.
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
        background: `radial-gradient(circle at 50% 38%, rgba(216,243,242,.14), ${WSD.night} 72%), ${WSD.deep}`,
        border: `3px solid ${WSD.foam}`,
        boxShadow: `0 0 0 5px ${WSD.aqua}, 0 0 0 7px ${WSD.foam}, 0 14px 34px rgba(0,0,0,.4)`,
      }}
      aria-label="Waikiki surf & dive — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="wsd-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="wsd-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={WSD.foam}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 700 }}
        >
          <textPath href="#wsd-arc-top" startOffset="50%" textAnchor="middle">
            Waikiki
          </textPath>
        </text>
        <text
          fill={WSD.gold}
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#wsd-arc-bot" startOffset="50%" textAnchor="middle">
            Surf · Dive · Oahu
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={WSD.gold} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* core Diamond-Head + wave + longboard glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        {/* Diamond Head crater silhouette */}
        <path d="M10 58 L34 40 L52 48 L74 34 L92 58 Z" fill={WSD.palm} opacity="0.6" />
        {/* longboard */}
        <ellipse cx="50" cy="52" rx="26" ry="6" fill="none" stroke={WSD.foam} strokeWidth="3" transform="rotate(-12 50 52)" />
        <line x1="50" y1="52" x2="50" y2="52" stroke={WSD.gold} strokeWidth="4" strokeLinecap="round" />
        {/* rolling wave */}
        <path d="M10 74 C 26 68, 34 80, 50 74 C 66 68, 74 80, 92 74" stroke={WSD.aqua} strokeWidth="2.6" fill="none" opacity="0.85" />
        <path d="M14 82 C 30 76, 40 86, 56 82 C 70 78, 80 84, 90 82" stroke={WSD.aqua} strokeWidth="1.8" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ART TILE — designed SVG art only (no photographs). Each tile is a Waikiki
// motif behind a readable lagoon scrim, honestly chipped "Illustration."
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "wave",
}: {
  accent: WsdAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "wave" | "board" | "turtle" | "reef" | "diamondhead" | "palm";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#12909e]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`wsd-sun-${accent}`} cx="76%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.95" />
            <stop offset="55%" stopColor={WSD.gold} stopOpacity="0.5" />
            <stop offset="100%" stopColor={WSD.gold} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`wsd-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffe9c2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* warm sky wash + tropical sun */}
        <rect width="400" height="300" fill={`url(#wsd-sky-${accent})`} />
        <circle cx="300" cy="66" r="120" fill={`url(#wsd-sun-${accent})`} />
        <circle cx="300" cy="66" r="24" fill="#ffe6a8" opacity="0.85" />

        {/* horizon + lagoon */}
        <path d="M-20 190 L440 190 L440 300 L-20 300 Z" fill="#0a4a54" opacity="0.28" />
        <path d="M-20 214 C 90 200, 150 226, 230 210 C 310 196, 350 220, 440 206 L440 300 L-20 300 Z" fill="#12909e" opacity="0.5" />
        <path d="M-20 214 C 90 200, 150 226, 230 210 C 310 196, 350 220, 440 206" stroke={WSD.foam} strokeWidth="1.3" fill="none" opacity="0.3" />

        {/* figure motifs */}
        {figure === "wave" && (
          <g opacity="0.95">
            <path d="M40 150 C 110 120, 150 170, 210 150 C 250 138, 268 120, 300 128 C 262 150, 250 176, 210 176 C 150 176, 120 168, 40 176 Z" fill="#04303a" opacity="0.55" />
            <path d="M300 128 C 268 120, 250 138, 210 150" stroke={WSD.foam} strokeWidth="3" fill="none" opacity="0.8" />
            <circle cx="238" cy="150" r="3" fill={WSD.foam} opacity="0.8" />
          </g>
        )}
        {figure === "board" && (
          <g transform="translate(200 150) rotate(-18)" opacity="0.95">
            <ellipse cx="0" cy="0" rx="70" ry="16" fill="#04303a" />
            <ellipse cx="0" cy="0" rx="70" ry="16" fill="none" stroke={WSD.foam} strokeWidth="2" opacity="0.6" />
            <line x1="0" y1="-16" x2="0" y2="16" stroke={WSD.coral} strokeWidth="3" />
          </g>
        )}
        {figure === "turtle" && (
          <g transform="translate(196 150)" opacity="0.95">
            <ellipse cx="0" cy="0" rx="34" ry="24" fill="#04303a" />
            <path d="M-8 -10 L8 -10 L4 6 L-4 6 Z M-16 -2 L-6 -6 M16 -2 L6 -6 M-12 12 L-4 8 M12 12 L4 8" stroke={WSD.palm} strokeWidth="2" fill="none" opacity="0.8" />
            <circle cx="30" cy="-8" r="8" fill="#04303a" />
          </g>
        )}
        {figure === "reef" && (
          <g transform="translate(150 168)" opacity="0.92">
            <path d="M-40 40 C -36 8, -24 8, -22 40 M-8 40 C -4 0, 8 0, 10 40 M22 40 C 26 12, 38 12, 40 40" stroke={WSD.coral} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="60" cy="6" r="5" fill={WSD.gold} />
            <path d="M64 6 L74 2 L74 10 Z" fill={WSD.gold} />
          </g>
        )}
        {figure === "diamondhead" && (
          <g opacity="0.92">
            <path d="M120 176 L210 108 L272 140 L330 176 Z" fill="#04303a" opacity="0.6" />
            <path d="M210 108 L226 128 L214 132 L224 142 L196 142 Z" fill={WSD.foam} opacity="0.3" />
          </g>
        )}
        {figure === "palm" && (
          <g transform="translate(96 150)" opacity="0.9">
            <path d="M8 60 C 4 30, 6 14, 10 4" stroke="#04303a" strokeWidth="5" fill="none" />
            <path d="M10 6 C -14 -2, -26 6, -30 16 M10 6 C 30 -6, 44 0, 50 10 M10 6 C -4 -18, 2 -30, 12 -34 M10 6 C 22 -14, 36 -16, 44 -10" stroke={WSD.palm} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* thin light ripple */}
        <path d="M40 100 C 140 84, 260 132, 380 104" stroke={WSD.foam} strokeWidth="1.2" fill="none" opacity="0.2" strokeDasharray="2 8" />
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#052e38]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="wsd-display text-[15px] font-semibold leading-tight text-[#f4fbfa] drop-shadow-[0_1px_3px_rgba(5,46,56,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ffcf5c]/45 bg-[#052e38]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f4fbfa]/90 backdrop-blur-sm">
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
// LIVE "SURF & SEA RIGHT NOW" panel — the showpiece. Re-exported from
// conditions.tsx (a "use client" component built ON the shared _wx library):
// live surf/wave + water temperature + Honolulu tide + Honolulu Intl (PHNL)
// wind, with the honest Live/Sample/Computed fallback.
// ---------------------------------------------------------------------------
export { WaikikiConditions } from "./conditions";
