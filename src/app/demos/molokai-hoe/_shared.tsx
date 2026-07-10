// Shared presentational pieces for the Molokaʻi Hoe / Nā Wāhine O Ke Kai
// information hub — a REVERENT, respect-first tribute to the world-championship
// long-distance outrigger canoe races across the Kaʻiwi Channel.
//
// CULTURAL-CARE FRAMING (per brief): this is a do-the-work-first SAMPLE built
// by BlueWave Projects to honor the tradition and offer help to the organizers.
// It uses the REAL event names (it's a tribute hub, not a fictional brand). It
// must NEVER commercialize, appropriate, or growth-hack a sacred tradition —
// reverent, community-serving, factual. Hawaiian words are used sparingly and
// correctly (mālama, kuleana). All imagery is designed SVG art (no photographs);
// a real build would use the organizers' own official media. Not affiliated
// with or endorsed by the races or their organizers.
//
// THEME — "Kaʻiwi: koa & channel." Deep channel-blue open ocean, warm koa-wood
// (the waʻa), dawn gold (the races start before first light), and white foam,
// on a woven-lauhala light canvas. Zilla Slab display — grounded and strong,
// like the crossing. Distinct from the tropical-turquoise Waikiki demo and the
// cool-cyan San Juan demo.
//
// SCOPING RULE: every style is namespaced under `.kai` (see <ChannelShell>). No
// bare body/html/:root/h1/h2 selectors — nothing leaks. Pages MUST wrap their
// content in <ChannelShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/molokai-hoe";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — channel blue / koa wood / dawn gold / lauhala canvas
// ---------------------------------------------------------------------------
export const KI = {
  night: "#071d2e", // deep channel night
  deep: "#0c2e42", // deep ocean
  channel: "#14506e", // channel blue
  steel: "#2c6484", // steel sea
  koa: "#8a5a30", // koa wood
  koaDeep: "#5f3d1e", // deep koa
  gold: "#e9b24a", // dawn gold
  goldDeep: "#c98f2f", // deep gold
  foam: "#eaf3f6", // white foam
  mist: "#cfe0e6", // sea mist
  // canvas — warm woven-lauhala light
  canvas: "#f1ece0",
  canvasDeep: "#e5ddca",
  card: "#faf6ec",
  // text
  ink: "#10262f",
  inkSoft: "#3a555f",
  muted: "#6a7d82",
} as const;

export type KiAccent = "channel" | "steel" | "koa" | "gold" | "night" | "deep";

export const accentGradient: Record<KiAccent, string> = {
  channel: "from-[#0c2e42] via-[#14506e] to-[#071d2e]",
  steel: "from-[#0c2e42] via-[#2c6484] to-[#071d2e]",
  koa: "from-[#5f3d1e] via-[#8a5a30] to-[#14506e]",
  gold: "from-[#c98f2f] via-[#e9b24a] to-[#14506e]",
  night: "from-[#0c2e42] via-[#071d2e] to-[#040f18]",
  deep: "from-[#14506e] via-[#0c2e42] to-[#071d2e]",
};

// ---------------------------------------------------------------------------
// CHANNEL SHELL — scoped wrapper. Injects ONE <style> block under `.kai`.
// Paints a warm lauhala canvas, defines the display slab + helper classes.
// ---------------------------------------------------------------------------
export function ChannelShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`kai ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- warm lauhala canvas (scoped) --- */
        .kai {
          position: relative;
          color: ${KI.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${KI.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(233,178,74,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(20,80,110,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${KI.card} 0%, ${KI.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .kai ::selection { background: rgba(233,178,74,.28); }

        /* Site Nav is styled for dark pages (white links); re-ink on the lauhala
           canvas, but leave any link carrying its own bg (the CTA) alone. */
        .kai nav a { color: rgba(16,38,47,.72); }
        .kai nav a:hover { color: ${KI.ink}; }
        .kai nav a[class*="bg-"] { color: ${KI.foam}; }
        .kai nav a[class*="bg-"]:hover { color: ${KI.foam}; }

        /* --- display type helpers --- */
        .kai .kai-display {
          font-family: 'Zilla Slab', 'Georgia', serif;
          font-weight: 700;
          letter-spacing: -0.005em;
        }
        .kai .kai-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-weight: 600;
          font-size: 12px;
          color: ${KI.goldDeep};
        }
        /* --- mono meta --- */
        .kai .kai-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin koa/gold rule --- */
        .kai .kai-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${KI.koa}, ${KI.gold});
        }

        /* --- card (on lauhala canvas) --- */
        .kai .kai-card {
          position: relative;
          background: linear-gradient(180deg, ${KI.card}, ${KI.canvasDeep});
          border: 1px solid rgba(20,80,110,.16);
          border-radius: 16px;
          box-shadow: 0 10px 30px -18px rgba(7,29,46,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .kai a.kai-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(7,29,46,.5);
        }

        /* --- glass tile inside dark panels --- */
        .kai .kai-glass {
          background: rgba(207,224,230,.06);
          border: 1px solid rgba(207,224,230,.14);
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular tribute stamp: deep channel disc, gold ring, a six-seat
// outrigger canoe (waʻa) with its ama over channel swell. Decorative and
// respectful — a generic waʻa motif, NOT any organization's logo.
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
        background: `radial-gradient(circle at 50% 38%, rgba(207,224,230,.12), ${KI.night} 72%), ${KI.deep}`,
        border: `3px solid ${KI.foam}`,
        boxShadow: `0 0 0 5px ${KI.gold}, 0 0 0 7px ${KI.foam}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Molokaʻi Hoe — Kaʻiwi Channel — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="kai-arc-top" d="M 34 115 A 81 81 0 0 1 196 115" fill="none" />
          <path id="kai-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={KI.foam} style={{ fontFamily: "'Zilla Slab', serif", fontSize: "15px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#kai-arc-top" startOffset="50%" textAnchor="middle">
            Molokaʻi Hoe
          </textPath>
        </text>
        <text fill={KI.gold} style={{ fontFamily: "'Zilla Slab', serif", fontSize: "11px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#kai-arc-bot" startOffset="50%" textAnchor="middle">
            Kaʻiwi Channel
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={KI.gold} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* core outrigger canoe (waʻa) with ama */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.48, height: size * 0.48 }} aria-hidden="true">
        {/* hull */}
        <path d="M18 52 C 34 46, 66 46, 84 52 C 66 58, 34 58, 18 52 Z" fill="none" stroke={KI.koa} strokeWidth="4" strokeLinejoin="round" />
        {/* iako (booms) + ama (float) */}
        <path d="M40 54 L34 66 M60 54 L66 66" stroke={KI.foam} strokeWidth="2" />
        <path d="M30 66 C 42 63, 58 63, 70 66 C 58 69, 42 69, 30 66 Z" fill={KI.koa} opacity="0.8" />
        {/* paddlers as marks */}
        <g fill={KI.gold}>
          <circle cx="34" cy="50" r="2" /><circle cx="44" cy="49" r="2" /><circle cx="54" cy="49" r="2" /><circle cx="64" cy="50" r="2" />
        </g>
        {/* swell */}
        <path d="M12 78 C 28 74, 42 82, 58 78 C 72 74, 82 80, 90 78" stroke={KI.gold} strokeWidth="2.4" fill="none" opacity="0.8" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ART TILE — designed SVG art only. Each tile is a canoe / channel motif behind
// a readable channel scrim, honestly chipped "Illustration."
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "canoe",
}: {
  accent: KiAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "canoe" | "paddle" | "channel" | "islands" | "sunrise" | "sea";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#14506e]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`kai-sun-${accent}`} cx="76%" cy="24%" r="44%">
            <stop offset="0%" stopColor="#ffdf9e" stopOpacity="0.9" />
            <stop offset="55%" stopColor={KI.gold} stopOpacity="0.4" />
            <stop offset="100%" stopColor={KI.gold} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dawn sky wash + rising sun */}
        <circle cx="300" cy="72" r="130" fill={`url(#kai-sun-${accent})`} />
        <circle cx="300" cy="72" r="22" fill="#ffdf9e" opacity="0.8" />

        {/* channel swell bands */}
        <path d="M-20 210 C 100 188, 200 226, 420 200" stroke={KI.mist} strokeWidth="1.2" fill="none" opacity="0.3" />
        <path d="M-20 244 C 100 222, 200 260, 420 234" stroke={KI.mist} strokeWidth="1.2" fill="none" opacity="0.24" />
        <path d="M-20 274 C 100 252, 200 290, 420 264 L420 300 L-20 300 Z" fill="#14506e" opacity="0.5" />

        {/* figure motifs */}
        {figure === "canoe" && (
          <g transform="translate(196 156)" opacity="0.95">
            <path d="M-70 6 C -40 -6, 40 -6, 72 8 C 40 18, -40 18, -70 6 Z" fill="none" stroke={KI.koa} strokeWidth="4" strokeLinejoin="round" />
            <path d="M-30 10 L-42 26 M34 10 L46 26" stroke={KI.foam} strokeWidth="2" />
            <path d="M-46 26 C -20 22, 22 22, 48 26 C 22 30, -20 30, -46 26 Z" fill={KI.koa} opacity="0.8" />
            <g fill={KI.gold}><circle cx="-40" cy="2" r="2.4" /><circle cx="-22" cy="0" r="2.4" /><circle cx="-2" cy="0" r="2.4" /><circle cx="18" cy="0" r="2.4" /><circle cx="38" cy="2" r="2.4" /></g>
          </g>
        )}
        {figure === "paddle" && (
          <g transform="translate(196 150) rotate(20)" opacity="0.92">
            <line x1="0" y1="-46" x2="0" y2="30" stroke={KI.koa} strokeWidth="5" strokeLinecap="round" />
            <path d="M-12 30 C -12 60, 12 60, 12 30 Z" fill={KI.koa} />
            <path d="M-9 6 L-9 -30 L9 -30 L9 6 Z" fill={KI.foam} opacity="0.5" />
          </g>
        )}
        {figure === "channel" && (
          <g opacity="0.9">
            <path d="M60 150 C 110 130, 150 170, 120 190 C 96 206, 70 176, 60 150 Z" fill="#071d2e" opacity="0.5" />
            <path d="M300 150 C 350 130, 390 170, 360 190 C 336 206, 310 176, 300 150 Z" fill="#071d2e" opacity="0.5" />
            <path d="M120 175 C 180 158, 240 192, 300 172" stroke={KI.gold} strokeWidth="1.6" fill="none" opacity="0.6" strokeDasharray="4 6" />
          </g>
        )}
        {figure === "islands" && (
          <g opacity="0.9">
            <path d="M40 176 C 90 150, 150 152, 180 176 Z" fill="#071d2e" opacity="0.55" />
            <path d="M240 176 C 290 148, 360 150, 400 176 Z" fill="#071d2e" opacity="0.55" />
          </g>
        )}
        {figure === "sunrise" && (
          <g opacity="0.85">
            <path d="M-20 176 L420 176" stroke={KI.gold} strokeWidth="1.4" opacity="0.4" />
            <circle cx="200" cy="176" r="30" fill="#ffdf9e" opacity="0.6" />
          </g>
        )}
        {figure === "sea" && (
          <path d="M40 120 C 140 102, 260 150, 380 122" stroke={KI.mist} strokeWidth="1.4" fill="none" opacity="0.26" strokeDasharray="3 9" />
        )}
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#071d2e]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="kai-display text-[15px] font-semibold leading-tight text-[#f4f8f6] drop-shadow-[0_1px_3px_rgba(7,29,46,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e9b24a]/45 bg-[#071d2e]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f4f8f6]/90 backdrop-blur-sm">
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
// LIVE "KAʻIWI CHANNEL RIGHT NOW" panel — the showpiece. Re-exported from
// conditions.tsx (a "use client" component on the shared _wx library): the
// live wind, swell, and tide of the crossing, offered as a genuine service to
// paddlers, escort boats, and fans — with the honest Live/Sample fallback.
// ---------------------------------------------------------------------------
export { ChannelConditions } from "./conditions";
