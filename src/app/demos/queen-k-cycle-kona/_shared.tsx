// Shared presentational pieces for the Kona (Big Island) Ironman-race-week
// bike shop sample marketing site.
//
// HONEST FRAMING (per brief): this is a cold-outreach SAMPLE built on
// PUBLICLY VERIFIED information by BlueWave Projects. It is NOT an official
// product of IRONMAN/WTC or any real Kona business, and is NOT affiliated
// with or endorsed by either. All imagery here is designed SVG art (no
// photographs) used only as sample placeholders.
//
// THEME — "Kona: lava, ocean, heat." Deep lava-rock black/brown, a sharp
// Pacific ocean cyan, and a hot finish-line orange as the signature energy
// accent — an athletic, kinetic palette distinct from every cooler-toned
// demo in this portfolio (no soft pastels; this one should feel like race
// day). Display type is a bold condensed sans (Anton) instead of this
// portfolio's usual serifs — sporty, not delicate.
//
// SCOPING RULE: every style injected here is namespaced under the `.qkc-shell`
// wrapper class (see <QkcShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <QkcShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/queen-k-cycle-kona";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — lava black/brown / Pacific ocean cyan / heat orange
// ---------------------------------------------------------------------------
export const KQ = {
  night: "#0a0705", // near-black lava
  deep: "#1c130d", // deep lava rock
  lava: "#2e1c12", // lava rock, support
  ocean: "#0891b2", // Pacific cyan-blue
  oceanDeep: "#0e5f73", // deep ocean
  paper: "#faf3ea", // warm volcanic-sand white (paper on dark)
  mist: "#d9c4b0", // muted warm tan (captions on dark)
  // signature — race-day energy
  heat: "#ff5a36", // finish-line orange-red
  heatDeep: "#d63f1f",
  gold: "#f2b134", // sun gold (secondary accent)
  goldDeep: "#c98d1f",
  // canvas — warm pale volcanic sand, deliberately warm (not this portfolio's
  // usual cool teal/navy canvases)
  canvas: "#f7f1e8",
  canvasDeep: "#ece2d0",
  card: "#fdfaf4",
  // text (on light canvas)
  ink: "#241812",
  inkSoft: "#5a463a",
  muted: "#7d6a5c",
} as const;

export type KqAccent = "heat" | "ocean" | "gold" | "night" | "lava";

export const accentGradient: Record<KqAccent, string> = {
  heat: "from-[#1c130d] via-[#d63f1f]/70 to-[#0a0705]",
  ocean: "from-[#1c130d] via-[#0e5f73] to-[#0a0705]",
  gold: "from-[#1c130d] via-[#c98d1f]/70 to-[#0a0705]",
  night: "from-[#1c130d] via-[#0a0705] to-[#040302]",
  lava: "from-[#2e1c12] via-[#1c130d] to-[#0a0705]",
};

// ---------------------------------------------------------------------------
// QKC SHELL — scoped wrapper. Injects ONE <style> block, all namespaced under
// `.qkc-shell`. Paints a warm volcanic-sand canvas, defines the display sans
// + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function QkcShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`qkc-shell ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');

        /* --- warm volcanic-sand canvas (scoped) --- */
        .qkc-shell {
          position: relative;
          color: ${KQ.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${KQ.canvas};
          background-image:
            radial-gradient(circle at 92% 6%, rgba(255,90,54,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 6% 92%, rgba(8,145,178,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${KQ.card} 0%, ${KQ.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .qkc-shell ::selection { background: rgba(255,90,54,.24); }

        /* Site Nav is styled for dark pages (white links); on the pale canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .qkc-shell nav a { color: rgba(36,24,18,.72); }
        .qkc-shell nav a:hover { color: ${KQ.ink}; }
        .qkc-shell nav a[class*="bg-"] { color: ${KQ.paper}; }
        .qkc-shell nav a[class*="bg-"]:hover { color: ${KQ.paper}; }

        /* --- display type helpers --- */
        .qkc-shell .qkc-display {
          font-family: 'Anton', 'Arial Narrow', sans-serif;
          font-weight: 400;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }
        .qkc-shell .qkc-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${KQ.heatDeep};
        }
        /* --- mono meta (readout voice) --- */
        .qkc-shell .qkc-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin heat/ocean rule --- */
        .qkc-shell .qkc-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${KQ.heat}, ${KQ.ocean});
        }

        /* --- card (on canvas) --- */
        .qkc-shell .qkc-card {
          position: relative;
          background: linear-gradient(180deg, ${KQ.card}, ${KQ.canvasDeep});
          border: 1px solid rgba(36,24,18,.14);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(10,7,5,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .qkc-shell a.qkc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(10,7,5,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .qkc-shell .qkc-glass {
          background: rgba(250,243,234,.06);
          border: 1px solid rgba(250,243,234,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "Queen K" stamp. Self-contained CSS/SVG. Deep lava disc,
// ocean-cyan ring, a simple wheel-and-wave glyph in the core. Purely
// decorative — a generic Kona-cycling motif, NOT any real business's logo.
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
        background: `radial-gradient(circle at 50% 38%, rgba(250,243,234,.10), ${KQ.night} 72%), ${KQ.deep}`,
        border: `3px solid ${KQ.paper}`,
        boxShadow: `0 0 0 5px ${KQ.ocean}, 0 0 0 7px ${KQ.paper}, 0 14px 34px rgba(0,0,0,.5)`,
      }}
      aria-label="Queen K Cycle Co. — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="qkc-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="qkc-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={KQ.paper}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "12.5px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#qkc-arc-top" startOffset="50%" textAnchor="middle">
            Queen K Cycle Co.
          </textPath>
        </text>
        <text
          fill={KQ.heat}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "10.5px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#qkc-arc-bot" startOffset="50%" textAnchor="middle">
            Kailua-Kona · Hawaiʻi
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={KQ.ocean} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core wheel + wave glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.44, height: size * 0.44 }} aria-hidden="true">
        <circle cx="50" cy="42" r="22" fill="none" stroke={KQ.paper} strokeWidth="3.5" />
        <circle cx="50" cy="42" r="3" fill={KQ.heat} />
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1={50 + 20 * Math.cos((deg * Math.PI) / 180)}
            y1={42 + 20 * Math.sin((deg * Math.PI) / 180)}
            x2={50 - 20 * Math.cos((deg * Math.PI) / 180)}
            y2={42 - 20 * Math.sin((deg * Math.PI) / 180)}
            stroke={KQ.paper}
            strokeWidth="1.6"
            opacity="0.75"
          />
        ))}
        <path
          d="M8 76 C 26 68, 40 84, 58 74 C 74 66, 84 78, 94 70"
          stroke={KQ.ocean}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO / ART TILE — the feature tile. DESIGNED SVG ART only (no photographs,
// no depiction of any real sacred site — cultural landmarks near the course
// are handled in text only, never as a decorative illustration motif).
// ---------------------------------------------------------------------------
export type KqPhoto = { src: string; credit: string; position?: string };

export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "bike",
  photo,
}: {
  accent: KqAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "bike" | "lava" | "wave" | "sun" | "crosswind";
  photo?: KqPhoto;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1c130d]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `Photo — ${label}` : `Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`qkc-sun-${accent}`} cx="78%" cy="20%" r="40%">
            <stop offset="0%" stopColor="#ffe0a8" stopOpacity="0.9" />
            <stop offset="55%" stopColor={KQ.gold} stopOpacity="0.4" />
            <stop offset="100%" stopColor={KQ.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#qkc-sun-${accent})`} />
        <circle cx="320" cy="66" r="24" fill="#ffe0a8" opacity="0.85" />

        {/* black lava field, always present as ambient ground */}
        <path d="M-20 220 L60 190 L130 214 L210 178 L290 216 L370 186 L440 210 L440 300 L-20 300 Z" fill={KQ.night} opacity="0.85" />
        <path d="M-20 240 L80 218 L160 236 L240 210 L320 234 L440 214 L440 300 L-20 300 Z" fill="#040302" opacity="0.5" />

        {/* ocean strip */}
        <path d="M-20 260 C 80 250, 160 268, 240 256 C 320 246, 360 262, 440 252 L440 300 L-20 300 Z" fill={KQ.ocean} opacity="0.5" />

        {figure === "bike" && (
          <g transform="translate(190 200)" stroke={KQ.paper} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
            <circle cx="-34" cy="14" r="18" />
            <circle cx="34" cy="14" r="18" />
            <path d="M-34 14 L-6 14 L10 -10 L28 14 M-6 14 L6 -18 L-16 -18" />
            <path d="M10 -10 L18 -22" />
          </g>
        )}
        {figure === "crosswind" && (
          <g stroke={KQ.paper} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8">
            <path d="M40 90 H220" />
            <path d="M60 110 H260" />
            <path d="M50 130 H210" strokeDasharray="4 6" />
            <path d="M220 90 l14 -8 M220 90 l14 8" />
          </g>
        )}
        {figure === "lava" && (
          <path d="M60 210 L120 150 L170 200 L230 130 L290 205 L350 160" stroke={KQ.heat} strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="1 10" />
        )}
        {figure === "wave" && (
          <path d="M20 250 C 100 230, 160 270, 240 248 C 300 230, 340 258, 380 240" stroke={KQ.paper} strokeWidth="2" fill="none" opacity="0.5" />
        )}
        {figure === "sun" && (
          <g stroke={KQ.gold} strokeWidth="2" opacity="0.6">
            {[0, 30, 60, 90, 120, 150].map((a) => (
              <line key={a} x1={320} y1={66} x2={320 + 40 * Math.cos((a * Math.PI) / 180)} y2={66 + 40 * Math.sin((a * Math.PI) / 180)} />
            ))}
          </g>
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

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0705]/76 to-transparent" />

      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="qkc-display text-[15px] leading-tight text-[#faf3ea] drop-shadow-[0_1px_3px_rgba(10,7,5,0.9)]">
            {label}
          </span>
          {photo ? (
          <span className="inline-flex shrink-0 items-center rounded-full border border-white/25 bg-black/55 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">{photo.credit}</span>
          ) : (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ff5a36]/45 bg-[#0a0705]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#faf3ea]/90 backdrop-blur-sm">
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
// LIVE "QUEEN K RIGHT NOW" panel — the showpiece. Re-exported from
// conditions.tsx: live NWS PHKO wind/heat read + a wheel-choice heuristic,
// falling back to a clearly-labeled sample if the feed is unreachable.
// ---------------------------------------------------------------------------
export { QkcConditions } from "./conditions";
