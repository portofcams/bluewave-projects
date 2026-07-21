// Shared presentational pieces for the Poʻipū Bluff Villas sample site.
//
// HONEST FRAMING: a cold-outreach SAMPLE built on PUBLICLY verifiable geography
// + live public data by BlueWave Projects. "Poʻipū Bluff Villas" is a
// DELIBERATELY FICTIONAL sample brand — not a real business, not affiliated with
// or endorsed by any actual Poʻipū / Kōloa / Kauaʻi operator. All imagery is
// designed SVG art (no photographs). No real operator's name, rate, unit, phone,
// or address appears. Examples use public landmarks (Poʻipū Beach, Kōloa, Māhāʻulepū,
// Spouting Horn) only. Every rate on this page is ILLUSTRATIVE — the arithmetic is
// the point, not the number.
//
// WHY THIS DEMO EXISTS: the premium-hospitality lead run (2026-07-17) found the
// same gap over and over — boutique HI properties and luxury villa portfolios with
// no direct booking of their own, guests routed to Airbnb/VRBO/an inquiry inbox,
// and no guest experience after the deposit clears. This sample shows the two
// halves of the fix: a DIRECT-BOOKING flow the operator owns (booking.tsx) and a
// live GUEST HUB worth coming back to (conditions.tsx).
//
// THEME — "Poʻipū: south shore sun, red dirt, deep blue." Sun gold + Kauaʻi red
// dirt against south-shore ocean blue and a dry-side palm green.
//
// SCOPING RULE: every style is namespaced under `.pbv` (see <BluffShell>). Pages
// MUST wrap their content in <BluffShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/poipu-bluff-villas";

export const PBV = {
  night: "#0b2a3d",
  deep: "#10425c",
  ocean: "#1b7fa8",
  aqua: "#4cc9d9",
  foam: "#eaf6f8",
  palm: "#2f8f6b",
  dirt: "#b4552d",
  dirtDeep: "#8f3f1f",
  gold: "#f2b134",
  goldDeep: "#d99420",
  canvas: "#f9f4ea",
  canvasDeep: "#efe6d5",
  card: "#fffdf8",
  sand: "#e8d7b6",
  ink: "#123246",
  inkSoft: "#3f5b6b",
  muted: "#6f8494",
} as const;

export type PbvAccent = "ocean" | "palm" | "dirt" | "gold" | "night" | "aqua";

export const accentGradient: Record<PbvAccent, string> = {
  ocean: "from-[#10425c] via-[#1b7fa8] to-[#0b2a3d]",
  palm: "from-[#10425c] via-[#2f8f6b] to-[#0b2a3d]",
  dirt: "from-[#8f3f1f] via-[#b4552d] to-[#1b7fa8]",
  gold: "from-[#d99420] via-[#f2b134] to-[#1b7fa8]",
  night: "from-[#10425c] via-[#0b2a3d] to-[#04151f]",
  aqua: "from-[#1b7fa8] via-[#4cc9d9]/50 to-[#10425c]",
};

export function BluffShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`pbv ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .pbv {
          position: relative;
          color: ${PBV.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${PBV.canvas};
          background-image:
            radial-gradient(circle at 88% 6%, rgba(242,177,52,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 10% 94%, rgba(76,201,217,.12) 0 3px, transparent 4px),
            linear-gradient(165deg, ${PBV.card} 0%, ${PBV.canvasDeep} 100%);
        }
        .pbv ::selection { background: rgba(242,177,52,.26); }

        .pbv nav a { color: rgba(18,50,70,.72); }
        .pbv nav a:hover { color: ${PBV.ink}; }
        .pbv nav a[class*="bg-"] { color: ${PBV.foam}; }
        .pbv nav a[class*="bg-"]:hover { color: ${PBV.foam}; }

        .pbv .pbv-display { font-family: 'Poppins', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.015em; }
        .pbv .pbv-eyebrow { font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: .26em; font-weight: 600; font-size: 12px; color: ${PBV.dirtDeep}; }
        .pbv .pbv-mono { font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace; letter-spacing: .02em; }

        .pbv .pbv-rule { width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px; background: linear-gradient(90deg, ${PBV.dirt}, ${PBV.gold}); }

        .pbv .pbv-card {
          position: relative;
          background: linear-gradient(180deg, ${PBV.card}, ${PBV.canvasDeep});
          border: 1px solid rgba(27,127,168,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(11,42,61,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .pbv a.pbv-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(11,42,61,.5); }

        .pbv .pbv-glass {
          background: rgba(234,246,248,.06);
          border: 1px solid rgba(234,246,248,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// EMBLEM — circular Poʻipū stamp: south-shore sun over the bluff, dry-side palm.
export function Emblem({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 38%, rgba(234,246,248,.14), ${PBV.night} 72%), ${PBV.deep}`,
        border: `3px solid ${PBV.foam}`,
        boxShadow: `0 0 0 5px ${PBV.aqua}, 0 0 0 7px ${PBV.foam}, 0 14px 34px rgba(0,0,0,.4)`,
      }}
      aria-label="Poʻipū Bluff — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="pbv-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="pbv-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={PBV.foam} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#pbv-arc-top" startOffset="50%" textAnchor="middle">Poʻipū Bluff</textPath>
        </text>
        <text fill={PBV.gold} style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#pbv-arc-bot" startOffset="50%" textAnchor="middle">Kauaʻi South Shore</textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={PBV.gold} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* sun over the bluff + dry-side palm */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        <circle cx="50" cy="38" r="15" fill={PBV.gold} opacity="0.92" />
        <path d="M16 62 L38 50 L54 58 L70 48 L86 62 Z" fill={PBV.dirt} opacity="0.85" />
        <path d="M14 70 C 32 64, 44 74, 52 70 C 62 74, 72 64, 88 70" stroke={PBV.aqua} strokeWidth="2.6" fill="none" />
        <path d="M18 78 C 34 72, 46 82, 54 78 C 64 82, 74 72, 84 78" stroke={PBV.aqua} strokeWidth="1.6" fill="none" opacity="0.5" />
      </svg>
    </div>
  );
}

export type PbvPhoto = { src: string; credit: string; position?: string };

export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "bluff",
  photo,
}: {
  accent: PbvAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "bluff" | "villa" | "palm" | "reef" | "swell" | "sun";
  photo?: PbvPhoto;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1b7fa8]/25 ${
        photo ? "bg-[#0b2a3d]" : `bg-gradient-to-br ${accentGradient[accent]}`
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
          <radialGradient id={`pbv-sun-${accent}`} cx="72%" cy="22%" r="44%">
            <stop offset="0%" stopColor="#ffe6a8" stopOpacity="0.95" />
            <stop offset="55%" stopColor={PBV.gold} stopOpacity="0.5" />
            <stop offset="100%" stopColor={PBV.gold} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#ffe9c2" opacity="0.05" />
        <circle cx="292" cy="78" r="120" fill={`url(#pbv-sun-${accent})`} />
        <circle cx="292" cy="78" r="24" fill="#ffe6a8" opacity="0.85" />
        {/* south-shore horizon + red-dirt bluff */}
        <path d="M-20 196 L440 196 L440 300 L-20 300 Z" fill="#10425c" opacity="0.32" />
        <path d="M-20 216 C 90 206, 150 228, 230 214 C 310 202, 350 222, 440 210 L440 300 L-20 300 Z" fill="#1b7fa8" opacity="0.5" />
        <path d="M-20 216 C 90 206, 150 228, 230 214 C 310 202, 350 222, 440 210" stroke={PBV.foam} strokeWidth="1.3" fill="none" opacity="0.3" />

        {figure === "bluff" && (
          <g opacity="0.92">
            <path d="M-20 200 L60 168 L120 188 L190 160 L260 196 L440 186 L440 216 L-20 220 Z" fill={PBV.dirtDeep} opacity="0.75" />
            <path d="M-20 200 L60 168 L120 188 L190 160 L260 196" stroke={PBV.dirt} strokeWidth="2" fill="none" opacity="0.9" />
          </g>
        )}
        {figure === "villa" && (
          <g transform="translate(148 146)" opacity="0.94">
            <path d="M0 44 L0 16 L52 16 L52 44 Z" fill="#04202e" opacity="0.72" />
            <path d="M-8 18 L26 -4 L60 18 Z" fill={PBV.dirt} opacity="0.85" />
            <rect x="10" y="26" width="12" height="18" fill={PBV.gold} opacity="0.75" />
            <rect x="32" y="26" width="12" height="12" fill={PBV.gold} opacity="0.55" />
          </g>
        )}
        {figure === "palm" && (
          <g transform="translate(88 150)" opacity="0.9">
            <path d="M8 60 C 4 30, 6 14, 10 4" stroke="#04202e" strokeWidth="5" fill="none" />
            <path d="M10 6 C -14 -2, -26 6, -30 16 M10 6 C 30 -6, 44 0, 50 10 M10 6 C -4 -18, 2 -30, 12 -34 M10 6 C 22 -14, 36 -16, 44 -10" stroke={PBV.palm} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </g>
        )}
        {figure === "reef" && (
          <g transform="translate(152 170)" opacity="0.92">
            <path d="M-40 40 C -36 8, -24 8, -22 40 M-8 40 C -4 0, 8 0, 10 40 M22 40 C 26 12, 38 12, 40 40" stroke={PBV.dirt} strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="60" cy="6" r="5" fill={PBV.gold} />
            <path d="M64 6 L74 2 L74 10 Z" fill={PBV.gold} />
          </g>
        )}
        {figure === "swell" && (
          <g opacity="0.95">
            <path d="M40 158 C 110 134, 150 174, 210 158 C 250 148, 268 134, 300 140 C 262 158, 250 180, 210 180 C 150 180, 120 172, 40 180 Z" fill="#04202e" opacity="0.5" />
            <path d="M300 140 C 268 134, 250 148, 210 158" stroke={PBV.foam} strokeWidth="3" fill="none" opacity="0.8" />
          </g>
        )}
        {figure === "sun" && (
          <g opacity="0.9">
            <path d="M120 216 C 160 210, 200 210, 292 212" stroke={PBV.gold} strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M240 216 C 260 212, 300 212, 342 214" stroke="#ffe6a8" strokeWidth="1.4" fill="none" opacity="0.6" />
          </g>
        )}
        <path d="M40 108 C 140 92, 260 140, 380 112" stroke={PBV.foam} strokeWidth="1.2" fill="none" opacity="0.2" strokeDasharray="2 8" />
      </svg>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b2a3d]/72 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="pbv-display text-[15px] font-semibold leading-tight text-[#f2fbfd] drop-shadow-[0_1px_3px_rgba(11,42,61,0.9)]">{label}</span>
          {photo ? (
            <span className="inline-flex shrink-0 items-center rounded-full border border-[#f2fbfd]/25 bg-[#0b2a3d]/60 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#f2fbfd]/75 backdrop-blur-sm">
              {photo.credit}
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#f2b134]/45 bg-[#0b2a3d]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f2fbfd]/90 backdrop-blur-sm">
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

export { PoipuConditions } from "./conditions";
export { BookDirect } from "./booking";
