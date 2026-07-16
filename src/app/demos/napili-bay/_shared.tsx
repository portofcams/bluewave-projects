// Shared presentational pieces for the Napili Bay Beach Club sample site.
//
// HONEST FRAMING: a cold-outreach SAMPLE built on PUBLICLY verifiable geography
// + live public data by BlueWave Projects. "Napili Bay Beach Club" is a
// DELIBERATELY FICTIONAL sample brand — not a real business, not affiliated with
// or endorsed by any actual Napili / West Maui operator. All imagery is designed
// SVG art (no photographs). No operator's name, prices, times, or contact
// appear. Examples use public landmarks (Napili Bay, Kapalua, Honokeana),
// never real client data.
//
// THEME — "Napili: leeward bay, golden sunset." WARM and calm: turquoise
// leeward water, a signature SUNSET GOLD (West Maui's famous west-facing
// sunsets), coral hibiscus, and a soft palm green.
//
// SCOPING RULE: every style is namespaced under `.npb` (see <BayShell>). Pages
// MUST wrap their content in <BayShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/napili-bay";

export const NPB = {
  night: "#06303a",
  deep: "#0a4f57",
  lagoon: "#17a2a6",
  aqua: "#4fd4cf",
  foam: "#e6f6f2",
  palm: "#2f8f6b",
  coral: "#ff6f61",
  coralDeep: "#e2503f",
  gold: "#ffbf47",
  goldDeep: "#e09a2a",
  canvas: "#f8f2e6",
  canvasDeep: "#efe4cf",
  card: "#fffdf7",
  sand: "#ecdcbb",
  ink: "#123b3e",
  inkSoft: "#3f5f60",
  muted: "#6f8280",
} as const;

export type NpbAccent = "lagoon" | "palm" | "coral" | "gold" | "night" | "aqua";

export const accentGradient: Record<NpbAccent, string> = {
  lagoon: "from-[#0a4f57] via-[#17a2a6] to-[#06303a]",
  palm: "from-[#0a4f57] via-[#2f8f6b] to-[#06303a]",
  coral: "from-[#e2503f] via-[#ff6f61] to-[#17a2a6]",
  gold: "from-[#e09a2a] via-[#ffbf47] to-[#17a2a6]",
  night: "from-[#0a4f57] via-[#06303a] to-[#03181d]",
  aqua: "from-[#17a2a6] via-[#4fd4cf]/50 to-[#0a4f57]",
};

export function BayShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`npb ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .npb {
          position: relative;
          color: ${NPB.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${NPB.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(255,191,71,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(79,212,207,.12) 0 3px, transparent 4px),
            linear-gradient(165deg, ${NPB.card} 0%, ${NPB.canvasDeep} 100%);
        }
        .npb ::selection { background: rgba(255,191,71,.26); }

        .npb nav a { color: rgba(18,59,62,.72); }
        .npb nav a:hover { color: ${NPB.ink}; }
        .npb nav a[class*="bg-"] { color: ${NPB.foam}; }
        .npb nav a[class*="bg-"]:hover { color: ${NPB.foam}; }

        .npb .npb-display { font-family: 'Poppins', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.015em; }
        .npb .npb-eyebrow { font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: .26em; font-weight: 600; font-size: 12px; color: ${NPB.coralDeep}; }
        .npb .npb-mono { font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace; letter-spacing: .02em; }

        .npb .npb-rule { width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px; background: linear-gradient(90deg, ${NPB.coral}, ${NPB.gold}); }

        .npb .npb-card {
          position: relative;
          background: linear-gradient(180deg, ${NPB.card}, ${NPB.canvasDeep});
          border: 1px solid rgba(23,162,166,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(6,48,58,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .npb a.npb-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(6,48,58,.5); }

        .npb .npb-glass {
          background: rgba(230,246,242,.06);
          border: 1px solid rgba(230,246,242,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// EMBLEM — circular Napili stamp: bay disc, foam ring, sunset + palm + honu glyph.
export function Emblem({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 38%, rgba(230,246,242,.14), ${NPB.night} 72%), ${NPB.deep}`,
        border: `3px solid ${NPB.foam}`,
        boxShadow: `0 0 0 5px ${NPB.aqua}, 0 0 0 7px ${NPB.foam}, 0 14px 34px rgba(0,0,0,.4)`,
      }}
      aria-label="Napili Bay — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="npb-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="npb-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={NPB.foam} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#npb-arc-top" startOffset="50%" textAnchor="middle">Napili Bay</textPath>
        </text>
        <text fill={NPB.gold} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#npb-arc-bot" startOffset="50%" textAnchor="middle">West Maui</textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={NPB.gold} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* setting sun + palm + honu glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        <circle cx="50" cy="40" r="16" fill={NPB.gold} opacity="0.9" />
        <path d="M18 58 C 34 52, 44 62, 50 58 C 58 62, 68 52, 82 58" stroke={NPB.aqua} strokeWidth="2.6" fill="none" />
        <path d="M22 66 C 36 60, 46 70, 52 66 C 60 70, 70 60, 80 66" stroke={NPB.aqua} strokeWidth="1.8" fill="none" opacity="0.55" />
        <ellipse cx="50" cy="78" rx="12" ry="7" fill="none" stroke={NPB.palm} strokeWidth="2.4" />
        <path d="M42 76 l-4 -3 M58 76 l4 -3" stroke={NPB.palm} strokeWidth="2" />
      </svg>
    </div>
  );
}

export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "sunset",
}: {
  accent: NpbAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "sunset" | "turtle" | "palm" | "reef" | "wave" | "cottage";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#17a2a6]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`npb-sun-${accent}`} cx="72%" cy="22%" r="44%">
            <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.95" />
            <stop offset="55%" stopColor={NPB.gold} stopOpacity="0.5" />
            <stop offset="100%" stopColor={NPB.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#ffe9c2" opacity="0.05" />
        <circle cx="288" cy="82" r="120" fill={`url(#npb-sun-${accent})`} />
        <circle cx="288" cy="82" r="26" fill="#ffe6a8" opacity="0.85" />
        {/* horizon + leeward bay */}
        <path d="M-20 192 L440 192 L440 300 L-20 300 Z" fill="#0a4f57" opacity="0.3" />
        <path d="M-20 214 C 90 202, 150 226, 230 212 C 310 200, 350 220, 440 208 L440 300 L-20 300 Z" fill="#17a2a6" opacity="0.5" />
        <path d="M-20 214 C 90 202, 150 226, 230 212 C 310 200, 350 220, 440 208" stroke={NPB.foam} strokeWidth="1.3" fill="none" opacity="0.3" />

        {figure === "sunset" && (
          <g opacity="0.9">
            <path d="M120 214 C 160 208, 200 208, 288 210" stroke={NPB.gold} strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M240 214 C 260 210, 300 210, 340 212" stroke="#ffe6a8" strokeWidth="1.4" fill="none" opacity="0.6" />
          </g>
        )}
        {figure === "turtle" && (
          <g transform="translate(196 150)" opacity="0.95">
            <ellipse cx="0" cy="0" rx="34" ry="24" fill="#04302f" />
            <path d="M-8 -10 L8 -10 L4 6 L-4 6 Z M-16 -2 L-6 -6 M16 -2 L6 -6 M-12 12 L-4 8 M12 12 L4 8" stroke={NPB.palm} strokeWidth="2" fill="none" opacity="0.85" />
            <circle cx="30" cy="-8" r="8" fill="#04302f" />
          </g>
        )}
        {figure === "palm" && (
          <g transform="translate(92 150)" opacity="0.9">
            <path d="M8 60 C 4 30, 6 14, 10 4" stroke="#04302f" strokeWidth="5" fill="none" />
            <path d="M10 6 C -14 -2, -26 6, -30 16 M10 6 C 30 -6, 44 0, 50 10 M10 6 C -4 -18, 2 -30, 12 -34 M10 6 C 22 -14, 36 -16, 44 -10" stroke={NPB.palm} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        )}
        {figure === "reef" && (
          <g transform="translate(150 168)" opacity="0.92">
            <path d="M-40 40 C -36 8, -24 8, -22 40 M-8 40 C -4 0, 8 0, 10 40 M22 40 C 26 12, 38 12, 40 40" stroke={NPB.coral} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="60" cy="6" r="5" fill={NPB.gold} />
            <path d="M64 6 L74 2 L74 10 Z" fill={NPB.gold} />
          </g>
        )}
        {figure === "wave" && (
          <g opacity="0.95">
            <path d="M40 156 C 110 132, 150 172, 210 156 C 250 146, 268 132, 300 138 C 262 156, 250 178, 210 178 C 150 178, 120 170, 40 178 Z" fill="#04302f" opacity="0.5" />
            <path d="M300 138 C 268 132, 250 146, 210 156" stroke={NPB.foam} strokeWidth="3" fill="none" opacity="0.8" />
          </g>
        )}
        {figure === "cottage" && (
          <g transform="translate(150 150)" opacity="0.92">
            <path d="M0 40 L0 14 L44 14 L44 40 Z" fill="#04302f" opacity="0.7" />
            <path d="M-6 16 L22 -4 L50 16 Z" fill={NPB.coral} opacity="0.8" />
            <rect x="16" y="24" width="12" height="16" fill={NPB.gold} opacity="0.7" />
          </g>
        )}
        <path d="M40 108 C 140 92, 260 140, 380 112" stroke={NPB.foam} strokeWidth="1.2" fill="none" opacity="0.2" strokeDasharray="2 8" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#06303a]/72 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="npb-display text-[15px] font-semibold leading-tight text-[#f2fbf9] drop-shadow-[0_1px_3px_rgba(6,48,58,0.9)]">{label}</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ffbf47]/45 bg-[#06303a]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f2fbf9]/90 backdrop-blur-sm">
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

export { NapiliConditions } from "./conditions";
