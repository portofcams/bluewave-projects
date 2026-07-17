// Shared presentational pieces for the Kaimukī Supper House sample site.
//
// HONEST FRAMING: a cold-outreach SAMPLE built on PUBLICLY verifiable geography
// + live public data by BlueWave Projects. "Kaimukī Supper House" is a
// DELIBERATELY FICTIONAL sample brand — not a real business, not affiliated with
// or endorsed by any actual Kaimukī / Waiʻalae Avenue restaurant. All imagery is
// designed SVG art (no photographs). No real restaurant's name, menu, price,
// phone, or address appears. Landmarks only (Waiʻalae Avenue, Kaimukī, Diamond
// Head). Every dollar figure is ILLUSTRATIVE — the arithmetic is the point.
//
// WHY THIS DEMO EXISTS: the premium-hospitality lead run (2026-07-17) qualified 14
// chef-driven Hawaiʻi restaurants — several of them James Beard winners and
// semifinalists — and found the same shape at nearly every one: reservations
// rented from OpenTable/Resy, ordering rented from Toast/DoorDash/Uber Eats, gift
// cards rented from Toast, and NOT ONE owned guest email. The Poʻipū demo answers
// the lodging half of that run; this one answers the restaurant half.
//
// THEME — "Kaimukī: ember, brass, and a warm room after dark."
//
// SCOPING RULE: every style is namespaced under `.ksh` (see <SupperShell>). Pages
// MUST wrap their content in <SupperShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/kaimuki-supper-house";

export const KSH = {
  night: "#1a1614",
  char: "#2b2320",
  ember: "#c4451f",
  emberDeep: "#932f12",
  brass: "#d9a441",
  brassDeep: "#b3822c",
  moss: "#4a6b4f",
  cream: "#f7f0e4",
  canvas: "#f7f2e9",
  canvasDeep: "#ede4d4",
  card: "#fffdf9",
  ink: "#241d1a",
  inkSoft: "#584a44",
  muted: "#8a7a72",
} as const;

export type KshAccent = "ember" | "brass" | "moss" | "char" | "night";

export const accentGradient: Record<KshAccent, string> = {
  ember: "from-[#932f12] via-[#c4451f] to-[#2b2320]",
  brass: "from-[#b3822c] via-[#d9a441] to-[#2b2320]",
  moss: "from-[#2b2320] via-[#4a6b4f] to-[#1a1614]",
  char: "from-[#2b2320] via-[#1a1614] to-[#100d0c]",
  night: "from-[#1a1614] via-[#2b2320] to-[#932f12]",
};

export function SupperShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ksh ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .ksh {
          position: relative;
          color: ${KSH.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${KSH.canvas};
          background-image:
            radial-gradient(circle at 88% 6%, rgba(217,164,65,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 10% 94%, rgba(196,69,31,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${KSH.card} 0%, ${KSH.canvasDeep} 100%);
        }
        .ksh ::selection { background: rgba(217,164,65,.28); }

        .ksh nav a { color: rgba(36,29,26,.72); }
        .ksh nav a:hover { color: ${KSH.ink}; }
        .ksh nav a[class*="bg-"] { color: ${KSH.cream}; }
        .ksh nav a[class*="bg-"]:hover { color: ${KSH.cream}; }

        .ksh .ksh-display { font-family: 'Fraunces', Georgia, serif; font-weight: 700; letter-spacing: -0.015em; }
        .ksh .ksh-eyebrow { font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: .26em; font-weight: 600; font-size: 12px; color: ${KSH.emberDeep}; }
        .ksh .ksh-mono { font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace; letter-spacing: .02em; }

        .ksh .ksh-rule { width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px; background: linear-gradient(90deg, ${KSH.ember}, ${KSH.brass}); }

        .ksh .ksh-card {
          position: relative;
          background: linear-gradient(180deg, ${KSH.card}, ${KSH.canvasDeep});
          border: 1px solid rgba(196,69,31,.14);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(26,22,20,.42);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .ksh a.ksh-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(26,22,20,.5); }

        .ksh .ksh-glass {
          background: rgba(247,240,228,.06);
          border: 1px solid rgba(247,240,228,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// EMBLEM — circular supper-house stamp: ember arch over a set table.
export function Emblem({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 38%, rgba(247,240,228,.12), ${KSH.night} 72%), ${KSH.char}`,
        border: `3px solid ${KSH.cream}`,
        boxShadow: `0 0 0 5px ${KSH.brass}, 0 0 0 7px ${KSH.cream}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Kaimukī Supper House — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="ksh-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="ksh-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text fill={KSH.cream} style={{ fontFamily: "'Fraunces', serif", fontSize: "15px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 700 }}>
          <textPath href="#ksh-arc-top" startOffset="50%" textAnchor="middle">Kaimukī Supper House</textPath>
        </text>
        <text fill={KSH.brass} style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "2.2px", textTransform: "uppercase", fontWeight: 600 }}>
          <textPath href="#ksh-arc-bot" startOffset="50%" textAnchor="middle">Waiʻalae Avenue</textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={KSH.brass} strokeWidth="1.4" opacity="0.7" />
      </svg>
      {/* ember arch over a set table */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.44, height: size * 0.44 }} aria-hidden="true">
        <path d="M26 54 A 24 24 0 0 1 74 54" stroke={KSH.ember} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="44" r="7" fill={KSH.brass} opacity="0.9" />
        <rect x="24" y="62" width="52" height="3" rx="1.5" fill={KSH.cream} opacity="0.9" />
        <path d="M34 62 L34 74 M66 62 L66 74" stroke={KSH.cream} strokeWidth="2" opacity="0.5" />
        <circle cx="42" cy="58" r="2.4" fill={KSH.moss} />
        <circle cx="58" cy="58" r="2.4" fill={KSH.moss} />
      </svg>
    </div>
  );
}

export function ArtTile({
  accent,
  label,
  className = "",
  figure = "table",
}: {
  accent: KshAccent;
  label: string;
  className?: string;
  figure?: "table" | "fire" | "greens" | "room";
}) {
  return (
    <div
      className={`relative min-h-[190px] overflow-hidden rounded-2xl border border-[#c4451f]/25 bg-gradient-to-br ${accentGradient[accent]} ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`ksh-glow-${accent}`} cx="70%" cy="26%" r="46%">
            <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.85" />
            <stop offset="60%" stopColor={KSH.brass} stopOpacity="0.35" />
            <stop offset="100%" stopColor={KSH.brass} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="286" cy="86" r="122" fill={`url(#ksh-glow-${accent})`} />

        {figure === "table" && (
          <g opacity="0.94">
            <rect x="70" y="196" width="260" height="6" rx="3" fill={KSH.cream} opacity="0.85" />
            <circle cx="140" cy="176" r="16" fill="none" stroke={KSH.cream} strokeWidth="2.4" opacity="0.8" />
            <circle cx="260" cy="176" r="16" fill="none" stroke={KSH.cream} strokeWidth="2.4" opacity="0.8" />
            <path d="M196 160 L196 196 M188 160 L188 178 M204 160 L204 178" stroke={KSH.brass} strokeWidth="2.2" opacity="0.9" />
          </g>
        )}
        {figure === "fire" && (
          <g transform="translate(200 180)" opacity="0.95">
            <path d="M0 -46 C 18 -22, 26 -12, 26 4 C 26 22, 12 34, 0 34 C -12 34, -26 22, -26 4 C -26 -12, -18 -22, 0 -46 Z" fill={KSH.ember} opacity="0.85" />
            <path d="M0 -20 C 9 -8, 13 -2, 13 6 C 13 16, 6 22, 0 22 C -6 22, -13 16, -13 6 C -13 -2, -9 -8, 0 -20 Z" fill={KSH.brass} opacity="0.9" />
          </g>
        )}
        {figure === "greens" && (
          <g transform="translate(196 178)" opacity="0.92">
            <path d="M0 34 C -6 6, -22 -6, -40 -8 C -30 14, -16 30, 0 34 Z" fill={KSH.moss} />
            <path d="M0 34 C 6 6, 22 -6, 40 -8 C 30 14, 16 30, 0 34 Z" fill={KSH.moss} opacity="0.8" />
            <path d="M0 36 L0 -2" stroke={KSH.cream} strokeWidth="2" opacity="0.7" />
          </g>
        )}
        {figure === "room" && (
          <g opacity="0.9">
            <rect x="96" y="120" width="208" height="96" rx="6" fill={KSH.night} opacity="0.5" />
            <circle cx="150" cy="150" r="9" fill={KSH.brass} opacity="0.9" />
            <circle cx="250" cy="150" r="9" fill={KSH.brass} opacity="0.9" />
            <path d="M110 196 L290 196" stroke={KSH.cream} strokeWidth="2" opacity="0.6" />
          </g>
        )}
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1a1614]/78 to-transparent" />
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="ksh-display text-[15px] font-semibold leading-tight text-[#f7f0e4] drop-shadow-[0_1px_3px_rgba(26,22,20,0.9)]">{label}</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d9a441]/45 bg-[#1a1614]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f7f0e4]/90 backdrop-blur-sm">
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

export { CommissionLeak } from "./leak";
export { ReserveDirect } from "./reserve";
