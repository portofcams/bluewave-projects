// Shared presentational pieces for the North Shore Dive Co. sample site.
//
// HONEST FRAMING: a cold-outreach SAMPLE built on PUBLICLY verifiable geography
// + live public data by BlueWave Projects. "North Shore Dive Co." is a
// DELIBERATELY FICTIONAL sample brand — not a real business, not affiliated with
// or endorsed by any actual Haleʻiwa / North Shore operator. All imagery is
// designed SVG art (no photographs). No operator's name, prices, times, or
// contact appear. Examples use public landmarks (Waimea Bay, Shark's Cove,
// Haleʻiwa Harbor), never real client data.
//
// THEME — "North Shore: deep water, big season." COOL and oceanic (distinct from
// the warm Waikiki demo): deep harbor blue, bright aqua, pale sea-ice foam, a
// sunlit GOLD accent and a coral hazard note for the big-swell read.
//
// SCOPING RULE: every style is namespaced under `.nsd` (see <NorthShell>). No
// bare body/html/:root selectors — nothing leaks. Pages MUST wrap in <NorthShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/north-shore-dive";

export const NSD = {
  night: "#05192b",
  deep: "#0b2f4a",
  ocean: "#1f6f9e",
  aqua: "#57b6d6",
  foam: "#d6ecf5",
  kelp: "#2f7d6b", // green accent support
  gold: "#ffc24d", // sunlight accent
  goldDeep: "#e0a52f",
  coral: "#ff6b5a", // big-swell hazard
  coralDeep: "#e04b3d",
  canvas: "#eef4f8", // cool off-white canvas
  canvasDeep: "#dfe9f0",
  card: "#ffffff",
  ink: "#0c2a3a",
  inkSoft: "#395a68",
  muted: "#6d8592",
} as const;

export type NsdAccent = "ocean" | "kelp" | "coral" | "gold" | "night" | "aqua";

export const accentGradient: Record<NsdAccent, string> = {
  ocean: "from-[#0b2f4a] via-[#1f6f9e] to-[#05192b]",
  kelp: "from-[#0b2f4a] via-[#2f7d6b] to-[#05192b]",
  coral: "from-[#e04b3d] via-[#ff6b5a] to-[#1f6f9e]",
  gold: "from-[#e0a52f] via-[#ffc24d] to-[#1f6f9e]",
  night: "from-[#0b2f4a] via-[#05192b] to-[#02101c]",
  aqua: "from-[#1f6f9e] via-[#57b6d6]/50 to-[#0b2f4a]",
};

export function NorthShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`nsd ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .nsd {
          position: relative;
          color: ${NSD.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${NSD.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(255,194,77,.08) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(87,182,214,.14) 0 3px, transparent 4px),
            linear-gradient(165deg, ${NSD.card} 0%, ${NSD.canvasDeep} 100%);
        }
        .nsd ::selection { background: rgba(87,182,214,.28); }

        .nsd nav a { color: rgba(12,42,58,.72); }
        .nsd nav a:hover { color: ${NSD.ink}; }
        .nsd nav a[class*="bg-"] { color: ${NSD.foam}; }
        .nsd nav a[class*="bg-"]:hover { color: ${NSD.foam}; }

        .nsd .nsd-display { font-family: 'Poppins', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.015em; }
        .nsd .nsd-eyebrow { font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: .26em; font-weight: 600; font-size: 12px; color: ${NSD.ocean}; }
        .nsd .nsd-mono { font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace; letter-spacing: .02em; }

        .nsd .nsd-rule { width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px; background: linear-gradient(90deg, ${NSD.ocean}, ${NSD.gold}); }

        .nsd .nsd-card {
          position: relative;
          background: linear-gradient(180deg, ${NSD.card}, ${NSD.canvasDeep});
          border: 1px solid rgba(31,111,158,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(5,25,43,.4);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .nsd a.nsd-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(5,25,43,.5); }

        .nsd .nsd-glass {
          background: rgba(214,236,245,.06);
          border: 1px solid rgba(214,236,245,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// EMBLEM — circular North Shore stamp: deep-water disc, foam ring, a breaking
// wave + diver-down flag glyph. Decorative, generic — NOT any operator's logo.
export function Emblem({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 38%, rgba(214,236,245,.14), ${NSD.night} 72%), ${NSD.deep}`,
        border: `3px solid ${NSD.foam}`,
        boxShadow: `0 0 0 5px ${NSD.aqua}, 0 0 0 7px ${NSD.foam}, 0 14px 34px rgba(0,0,0,.4)`,
      }}
      aria-label="North Shore dive — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="nsd-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="nsd-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={NSD.foam} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#nsd-arc-top" startOffset="50%" textAnchor="middle">North Shore</textPath>
        </text>
        <text fill={NSD.gold} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#nsd-arc-bot" startOffset="50%" textAnchor="middle">Dive · Oʻahu</textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={NSD.gold} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* diver-down flag + wave glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        <rect x="30" y="30" width="40" height="28" rx="2" fill={NSD.coral} />
        <path d="M30 30 L70 58 M70 30 L30 58" stroke={NSD.foam} strokeWidth="4" />
        <path d="M12 74 C 28 68, 38 80, 52 74 C 66 68, 76 80, 90 74" stroke={NSD.aqua} strokeWidth="2.6" fill="none" opacity="0.9" />
        <path d="M16 82 C 32 76, 42 86, 56 82 C 70 78, 80 84, 88 82" stroke={NSD.aqua} strokeWidth="1.8" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

// ART TILE — designed SVG art only (no photographs). Each tile is a North Shore
// motif behind a readable deep-water scrim, honestly chipped "Illustration."
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "wave",
}: {
  accent: NsdAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "wave" | "diver" | "turtle" | "reef" | "cliff" | "boat";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1f6f9e]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`nsd-sun-${accent}`} cx="78%" cy="18%" r="42%">
            <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.85" />
            <stop offset="60%" stopColor={NSD.gold} stopOpacity="0.4" />
            <stop offset="100%" stopColor={NSD.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="60" r="120" fill={`url(#nsd-sun-${accent})`} />
        {/* horizon + deep water */}
        <path d="M-20 188 L440 188 L440 300 L-20 300 Z" fill="#05192b" opacity="0.34" />
        <path d="M-20 210 C 90 196, 150 224, 230 208 C 310 194, 350 218, 440 204 L440 300 L-20 300 Z" fill="#1f6f9e" opacity="0.5" />
        <path d="M-20 210 C 90 196, 150 224, 230 208 C 310 194, 350 218, 440 204" stroke={NSD.foam} strokeWidth="1.3" fill="none" opacity="0.3" />

        {figure === "wave" && (
          <g opacity="0.95">
            <path d="M30 150 C 110 108, 150 168, 220 150 C 260 138, 280 112, 320 122 C 276 150, 262 182, 220 182 C 150 182, 118 170, 30 178 Z" fill="#04202f" opacity="0.55" />
            <path d="M320 122 C 280 112, 260 138, 220 150" stroke={NSD.foam} strokeWidth="3" fill="none" opacity="0.85" />
          </g>
        )}
        {figure === "diver" && (
          <g transform="translate(150 120)" opacity="0.95" stroke={NSD.foam} strokeWidth="3" fill="none" strokeLinecap="round">
            <circle cx="40" cy="10" r="8" fill="#04202f" />
            <path d="M46 16 C 58 26, 66 30, 82 26" />
            <path d="M40 18 C 36 34, 30 44, 18 52" />
            <path d="M44 20 C 52 34, 54 48, 50 62" />
            <path d="M14 50 l-6 -3 M14 54 l-6 3" stroke={NSD.aqua} />
            <circle cx="30" cy="-2" r="2.5" fill={NSD.foam} stroke="none" opacity="0.7" />
            <circle cx="24" cy="-12" r="1.8" fill={NSD.foam} stroke="none" opacity="0.5" />
          </g>
        )}
        {figure === "turtle" && (
          <g transform="translate(196 150)" opacity="0.95">
            <ellipse cx="0" cy="0" rx="34" ry="24" fill="#04202f" />
            <path d="M-8 -10 L8 -10 L4 6 L-4 6 Z M-16 -2 L-6 -6 M16 -2 L6 -6 M-12 12 L-4 8 M12 12 L4 8" stroke={NSD.kelp} strokeWidth="2" fill="none" opacity="0.85" />
            <circle cx="30" cy="-8" r="8" fill="#04202f" />
          </g>
        )}
        {figure === "reef" && (
          <g transform="translate(150 168)" opacity="0.92">
            <path d="M-40 40 C -36 8, -24 8, -22 40 M-8 40 C -4 0, 8 0, 10 40 M22 40 C 26 12, 38 12, 40 40" stroke={NSD.coral} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="60" cy="6" r="5" fill={NSD.gold} />
            <path d="M64 6 L74 2 L74 10 Z" fill={NSD.gold} />
          </g>
        )}
        {figure === "cliff" && (
          <g opacity="0.9">
            <path d="M60 188 L60 96 L120 78 L170 100 L200 188 Z" fill="#04202f" opacity="0.6" />
            <path d="M120 78 L134 96 L124 100 L136 110 L108 108 Z" fill={NSD.foam} opacity="0.25" />
          </g>
        )}
        {figure === "boat" && (
          <g transform="translate(150 168)" opacity="0.95">
            <path d="M0 8 L96 8 L84 26 L12 26 Z" fill="#04202f" />
            <path d="M0 8 L96 8" stroke={NSD.foam} strokeWidth="2" opacity="0.6" />
            <line x1="48" y1="8" x2="48" y2="-24" stroke={NSD.foam} strokeWidth="2.4" />
            <path d="M50 -22 L74 2 L50 2 Z" fill={NSD.gold} opacity="0.85" />
          </g>
        )}
        <path d="M40 100 C 140 84, 260 132, 380 104" stroke={NSD.foam} strokeWidth="1.2" fill="none" opacity="0.2" strokeDasharray="2 8" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#05192b]/74 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="nsd-display text-[15px] font-semibold leading-tight text-[#eef7fb] drop-shadow-[0_1px_3px_rgba(5,25,43,0.9)]">{label}</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ffc24d]/45 bg-[#05192b]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eef7fb]/90 backdrop-blur-sm">
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

export { NorthShoreConditions } from "./conditions";
