// Shared presentational pieces for the Susitna Air sample site (Talkeetna
// glacier flightseeing).
//
// HONEST FRAMING: a cold-outreach SAMPLE built on PUBLICLY verifiable geography
// + live public data by BlueWave Projects. "Susitna Air" is a DELIBERATELY
// FICTIONAL sample brand — not a real business, not affiliated with or endorsed
// by any actual Talkeetna air taxi / flightseeing operator. Scenery uses real,
// openly-licensed Alaska photographs (Wikimedia Commons / NPS, credited on each
// ArtTile, none showing a real operator's livery); the emblem is designed SVG.
// No operator's name, prices, times, or contact appear. Examples use public
// geography (Talkeetna, Denali, the Kahiltna Glacier, PATK), never real client data.
//
// THEME — "Talkeetna: granite, glacier, sectional chart." COLD alpine: deep
// spruce-night, glacier ice, a sectional-grid motif, with an ALPENGLOW accent
// (the pink-orange light on Denali at dawn) and a warm gold.
//
// SCOPING RULE: every style is namespaced under `.tka` (see <AlpineShell>).

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/talkeetna-air-taxi";

export const TKA = {
  night: "#0a1a26",
  deep: "#122a3a",
  ridge: "#1d4a56",
  teal: "#6fd0c0",
  ice: "#bfe6ea",
  snow: "#eef7f7",
  spruce: "#2f6b52",
  alpenglow: "#ff8a5c",
  alpenDeep: "#e05f34",
  gold: "#ffce6b",
  goldDeep: "#e0a52f",
  canvas: "#eef2f4",
  canvasDeep: "#dee7ea",
  card: "#ffffff",
  ink: "#10222e",
  inkSoft: "#3a5560",
  muted: "#6a8088",
} as const;

export type TkaAccent = "ridge" | "spruce" | "alpenglow" | "gold" | "night" | "teal";

export const accentGradient: Record<TkaAccent, string> = {
  ridge: "from-[#122a3a] via-[#1d4a56] to-[#0a1a26]",
  spruce: "from-[#122a3a] via-[#2f6b52] to-[#0a1a26]",
  alpenglow: "from-[#e05f34] via-[#ff8a5c] to-[#1d4a56]",
  gold: "from-[#e0a52f] via-[#ffce6b] to-[#1d4a56]",
  night: "from-[#122a3a] via-[#0a1a26] to-[#050d13]",
  teal: "from-[#1d4a56] via-[#6fd0c0]/50 to-[#122a3a]",
};

export function AlpineShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`tka ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .tka {
          position: relative;
          color: ${TKA.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${TKA.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(255,138,92,.08) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(111,208,192,.12) 0 3px, transparent 4px),
            linear-gradient(165deg, ${TKA.card} 0%, ${TKA.canvasDeep} 100%);
        }
        .tka ::selection { background: rgba(255,138,92,.24); }

        .tka nav a { color: rgba(16,34,46,.72); }
        .tka nav a:hover { color: ${TKA.ink}; }
        .tka nav a[class*="bg-"] { color: ${TKA.snow}; }
        .tka nav a[class*="bg-"]:hover { color: ${TKA.snow}; }

        .tka .tka-display { font-family: 'Poppins', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.015em; }
        .tka .tka-eyebrow { font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: .26em; font-weight: 600; font-size: 12px; color: ${TKA.alpenDeep}; }
        .tka .tka-mono { font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace; letter-spacing: .02em; }

        .tka .tka-rule { width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px; background: linear-gradient(90deg, ${TKA.alpenglow}, ${TKA.gold}); }

        .tka .tka-card {
          position: relative;
          background: linear-gradient(180deg, ${TKA.card}, ${TKA.canvasDeep});
          border: 1px solid rgba(29,74,86,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(10,26,38,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .tka a.tka-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(10,26,38,.5); }

        .tka .tka-glass {
          background: rgba(231,241,242,.06);
          border: 1px solid rgba(231,241,242,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// EMBLEM — circular Talkeetna stamp: alpine disc, ice ring, Denali + prop glyph.
export function Emblem({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 38%, rgba(231,241,242,.14), ${TKA.night} 72%), ${TKA.deep}`,
        border: `3px solid ${TKA.snow}`,
        boxShadow: `0 0 0 5px ${TKA.teal}, 0 0 0 7px ${TKA.snow}, 0 14px 34px rgba(0,0,0,.4)`,
      }}
      aria-label="Susitna Air — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="tka-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="tka-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={TKA.snow} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#tka-arc-top" startOffset="50%" textAnchor="middle">Susitna Air</textPath>
        </text>
        <text fill={TKA.gold} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#tka-arc-bot" startOffset="50%" textAnchor="middle">Talkeetna · Denali</textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={TKA.gold} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* Denali peak + prop glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        <path d="M14 66 L40 30 L54 46 L70 24 L88 66 Z" fill={TKA.ice} opacity="0.85" />
        <path d="M40 30 L48 40 L42 44 L50 52 L30 52 Z" fill={TKA.snow} opacity="0.7" />
        <circle cx="50" cy="70" r="4" fill={TKA.alpenglow} />
        <path d="M50 70 L50 52 M50 70 L64 78 M50 70 L36 78" stroke={TKA.alpenglow} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// A real, openly-licensed photograph for an ArtTile: local /demos file, the
// credit string shown on-image, and an optional object-position.
export type TkaPhoto = { src: string; credit: string; position?: string };

export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "peak",
  photo,
}: {
  accent: TkaAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "peak" | "plane" | "glacier" | "spruce" | "river" | "cabin";
  photo?: TkaPhoto;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1d4a56]/25 ${
        photo ? "bg-[#0a1a26]" : `bg-gradient-to-br ${accentGradient[accent]}`
      } ${tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"} ${className}`}
      role="img"
      aria-label={photo ? `Photo — ${label}` : `Illustration — ${label}`}
    >
      {photo ? (
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
      ) : (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`tka-grid-${accent}`} width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="#e7f1f2" strokeWidth="0.5" opacity="0.5" />
          </pattern>
          <radialGradient id={`tka-glow-${accent}`} cx="74%" cy="20%" r="42%">
            <stop offset="0%" stopColor="#ffd9b0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffd9b0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#tka-grid-${accent})`} />
        <circle cx="300" cy="66" r="120" fill={`url(#tka-glow-${accent})`} />

        {/* base ridgeline */}
        <path d="M-20 210 L60 150 L120 186 L200 120 L270 180 L340 140 L420 200 L420 300 L-20 300 Z" fill="#08161f" opacity="0.4" />

        {figure === "peak" && (
          <g opacity="0.92">
            <path d="M120 210 L200 96 L250 150 L300 110 L360 210 Z" fill="#bfe6ea" opacity="0.85" />
            <path d="M200 96 L214 120 L204 126 L216 140 L182 140 Z" fill="#eef7f7" opacity="0.7" />
            <path d="M200 96 L250 150" stroke="#0a1a26" strokeWidth="1" opacity="0.3" />
          </g>
        )}
        {figure === "plane" && (
          <g transform="translate(150 120) rotate(-12)" opacity="0.95" stroke={TKA.snow} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M0 20 L70 20" />
            <path d="M18 20 L44 4 M18 20 L44 36" />
            <path d="M60 12 L60 28" />
            <ellipse cx="8" cy="26" rx="14" ry="3" stroke={TKA.ice} />
            <ellipse cx="40" cy="30" rx="16" ry="3" stroke={TKA.ice} />
          </g>
        )}
        {figure === "glacier" && (
          <g opacity="0.9">
            <path d="M40 210 C 100 150, 160 170, 200 130 C 240 100, 300 120, 360 90" stroke={TKA.ice} strokeWidth="10" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M60 200 C 120 150, 170 168, 210 132" stroke="#0a1a26" strokeWidth="1" fill="none" opacity="0.3" />
          </g>
        )}
        {figure === "spruce" && (
          <g transform="translate(120 150)" opacity="0.9" fill={TKA.spruce}>
            <path d="M40 60 L40 46 M40 6 L54 30 L46 30 L58 50 L22 50 L34 30 L26 30 Z" stroke={TKA.spruce} strokeWidth="2" />
            <path d="M90 60 L90 50 M90 18 L100 36 L94 36 L104 52 L76 52 L86 36 L80 36 Z" opacity="0.7" />
          </g>
        )}
        {figure === "river" && (
          <g opacity="0.85">
            <path d="M-20 240 C 80 210, 120 250, 220 220 C 300 196, 340 228, 420 205" stroke={TKA.teal} strokeWidth="7" fill="none" opacity="0.5" strokeLinecap="round" />
            <path d="M-20 250 C 80 222, 130 258, 230 230" stroke={TKA.ice} strokeWidth="2" fill="none" opacity="0.4" />
          </g>
        )}
        {figure === "cabin" && (
          <g transform="translate(150 150)" opacity="0.92">
            <path d="M0 40 L0 16 L44 16 L44 40 Z" fill="#08161f" opacity="0.7" />
            <path d="M-6 18 L22 -4 L50 18 Z" fill={TKA.alpenglow} opacity="0.8" />
            <rect x="16" y="26" width="12" height="14" fill={TKA.gold} opacity="0.7" />
          </g>
        )}
      </svg>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1a26]/74 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="tka-display text-[15px] font-semibold leading-tight text-[#eef7f7] drop-shadow-[0_1px_3px_rgba(10,26,38,0.9)]">{label}</span>
          {photo ? (
            <span className="inline-flex shrink-0 items-center rounded-full border border-[#eef7f7]/25 bg-[#0a1a26]/60 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#eef7f7]/75 backdrop-blur-sm">
              {photo.credit}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ffce6b]/45 bg-[#0a1a26]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eef7f7]/90 backdrop-blur-sm">
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

export { TalkeetnaConditions } from "./conditions";
