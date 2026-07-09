// Shared presentational pieces for the Valdez Fly-In & Air Show information hub.
//
// HONEST FRAMING (per brief): this is a cold-outreach SAMPLE information hub
// built on PUBLICLY VERIFIED information by BlueWave Projects. It is NOT an
// official product of, and is NOT affiliated with or endorsed by, the Valdez
// Fly-In & Air Show or its organizers. All imagery here is designed SVG art
// (no photographs), used only as sample placeholders — a real build would use
// the event's own official photography, branding, and logo.
//
// THEME — "Chugach alpine + STOL." A rugged bush-aviation aesthetic for a
// short-takeoff-and-landing fly-in boxed into a fjord under the Chugach: deep
// alpine-dusk teal-navy, glacier-cyan ice, snowfield white, and a signature
// BUSH-PLANE VERMILION accent (the fabric-and-cowl red-orange of an Alaskan
// taildragger) warmed by a low-alpine-sun gold. Deliberately distinct from the
// Great Alaska Aviation Gathering demo (pale sky-blue + amber/rust) and the
// Kachemak Bay water-taxi demo (bay-teal + fireweed magenta).
//
// SCOPING RULE: every style injected here is namespaced under the `.vfi`
// wrapper class (see <AlpineShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <AlpineShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/valdez-fly-in";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — Chugach alpine teal-navy / glacier ice / bush vermilion
// ---------------------------------------------------------------------------
export const VF = {
  night: "#08202b", // deepest alpine dusk
  deep: "#0f2f3d", // deep alpine teal
  alpine: "#1a4a52", // mid fjord teal-blue
  steel: "#2b5566", // steel slate
  ice: "#7ec8d6", // glacier ice cyan
  mist: "#cfe9ee", // pale glacier mist
  snow: "#eef7f7", // snowfield white / paper
  // accents
  vermilion: "#e0532f", // signature bush-plane vermilion
  vermilionDeep: "#b83c22", // deep vermilion
  gold: "#edb24a", // low-alpine-sun gold (secondary)
  goldDeep: "#cf9130", // deep gold
  // canvas
  canvas: "#eef4f4", // cool pale canvas
  canvasDeep: "#dbe9e9", // shaded canvas
  card: "#fbfefe", // lightest card
  // text
  ink: "#0d2a30", // deep alpine ink (body)
  inkSoft: "#35565c", // muted slate-teal
  muted: "#5d7b80", // captions / meta
} as const;

export type VfAccent = "alpine" | "steel" | "vermilion" | "gold" | "night" | "ice";

export const accentGradient: Record<VfAccent, string> = {
  alpine: "from-[#0f2f3d] via-[#1a4a52] to-[#08202b]",
  steel: "from-[#0f2f3d] via-[#2b5566] to-[#08202b]",
  vermilion: "from-[#b83c22] via-[#e0532f] to-[#1a4a52]",
  gold: "from-[#cf9130] via-[#edb24a] to-[#1a4a52]",
  night: "from-[#0f2f3d] via-[#08202b] to-[#040f14]",
  ice: "from-[#1a4a52] via-[#7ec8d6]/40 to-[#0f2f3d]",
};

// ---------------------------------------------------------------------------
// ALPINE SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.vfi`. Paints a cool alpine canvas, defines the display face + helper
// classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function AlpineShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`vfi ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool alpine canvas (scoped) --- */
        .vfi {
          position: relative;
          color: ${VF.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${VF.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(224,83,47,.08) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(126,200,214,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${VF.card} 0%, ${VF.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .vfi ::selection { background: rgba(224,83,47,.22); }

        /* Site Nav is styled for dark pages (white links); on the pale canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .vfi nav a { color: rgba(13,42,48,.72); }
        .vfi nav a:hover { color: ${VF.ink}; }
        .vfi nav a[class*="bg-"] { color: ${VF.snow}; }
        .vfi nav a[class*="bg-"]:hover { color: ${VF.snow}; }

        /* --- display type helpers --- */
        .vfi .vfi-display {
          font-family: 'Archivo', system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .vfi .vfi-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${VF.vermilionDeep};
        }
        /* --- mono meta (METAR / log voice) --- */
        .vfi .vfi-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin vermilion/gold rule --- */
        .vfi .vfi-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${VF.vermilion}, ${VF.gold});
        }

        /* --- card (on canvas) --- */
        .vfi .vfi-card {
          position: relative;
          background: linear-gradient(180deg, ${VF.card}, ${VF.canvasDeep});
          border: 1px solid rgba(26,74,82,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(8,32,43,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .vfi a.vfi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(8,32,43,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .vfi .vfi-glass {
          background: rgba(238,247,247,.06);
          border: 1px solid rgba(238,247,247,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ROUNDEL — circular "Valdez Fly-In" aviation stamp. Self-contained CSS/SVG.
// Deep alpine disc, ice ring, a simple STOL taildragger over peaks in the core.
// Purely decorative — a generic bush-aviation motif, NOT the event's own logo.
// ---------------------------------------------------------------------------
export function Roundel({
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
        background: `radial-gradient(circle at 50% 38%, rgba(238,247,247,.12), ${VF.night} 72%), ${VF.deep}`,
        border: `3px solid ${VF.snow}`,
        boxShadow: `0 0 0 5px ${VF.ice}, 0 0 0 7px ${VF.snow}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Valdez Fly-In & Air Show — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="vfi-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="vfi-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={VF.snow}
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: "13px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 700 }}
        >
          <textPath href="#vfi-arc-top" startOffset="50%" textAnchor="middle">
            Valdez Fly-In
          </textPath>
        </text>
        <text
          fill={VF.gold}
          style={{ fontFamily: "'Archivo', sans-serif", fontSize: "10.5px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#vfi-arc-bot" startOffset="50%" textAnchor="middle">
            STOL · Air Show
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={VF.gold} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core STOL-plane-over-peaks glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.46, height: size * 0.46 }} aria-hidden="true">
        {/* Chugach peaks */}
        <path d="M8 64 L26 44 L38 56 L54 38 L70 58 L92 42 L92 68 L8 68 Z" fill={VF.alpine} opacity="0.6" />
        <path d="M50 40 L54 38 L60 46 L55 48 L60 54 L46 54 Z" fill={VF.mist} opacity="0.6" />
        {/* high-wing taildragger, banking */}
        <g fill="none" stroke={VF.vermilion} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 40 L70 40" />
          <path d="M50 40 L50 50" />
          <path d="M42 50 L58 50" />
          <path d="M66 40 L72 35" />
        </g>
        <circle cx="50" cy="40" r="2.2" fill={VF.gold} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ART TILE — the feature tile. Designed SVG art only (no photographs), so each
// tile renders a Valdez bush-aviation motif behind a readable alpine scrim,
// honestly chipped "Illustration." The final build would swap in the event's
// own official photography.
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "range",
}: {
  accent: VfAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "range" | "stol" | "glacier" | "plane" | "camp" | "fjord";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#1a4a52]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration — ${label}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`vfi-sun-${accent}`} cx="76%" cy="22%" r="38%">
            <stop offset="0%" stopColor="#ffe1b4" stopOpacity="0.9" />
            <stop offset="55%" stopColor={VF.gold} stopOpacity="0.45" />
            <stop offset="100%" stopColor={VF.gold} stopOpacity="0" />
          </radialGradient>
          <pattern id={`vfi-grid-${accent}`} width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M46 0H0V46" fill="none" stroke="#e7f1f2" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>

        {/* sectional grid wash + low sun */}
        <rect width="400" height="300" fill={`url(#vfi-grid-${accent})`} opacity="0.25" />
        <circle cx="300" cy="70" r="120" fill={`url(#vfi-sun-${accent})`} />
        <circle cx="300" cy="70" r="22" fill="#ffe1b4" opacity="0.82" />

        {/* Chugach ranges */}
        <path d="M-20 205 L54 150 L104 186 L168 138 L232 190 L300 146 L362 188 L440 152 L440 300 L-20 300 Z" fill="#08202b" opacity="0.36" />
        <path d="M-20 228 L70 190 L140 220 L220 184 L300 220 L380 190 L440 216 L440 300 L-20 300 Z" fill="#040f14" opacity="0.44" />
        {/* snow/ice streaks on a peak */}
        <path d="M150 190 L168 138 L192 172 L176 182 L188 192 Z" fill={VF.mist} opacity="0.55" />

        {/* fjord water ribbon */}
        <path d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250 L440 300 L-20 300 Z" fill="#1a4a52" opacity="0.55" />

        {/* figure motifs */}
        {figure === "stol" && (
          <g opacity="0.94">
            {/* short green strip + a taildragger with cones marking the line */}
            <path d="M40 244 L360 240 L360 250 L40 254 Z" fill="#1c5a3e" opacity="0.7" />
            <g transform="translate(150 214)" fill="none" stroke={VF.vermilion} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M-26 0 L26 0" />
              <path d="M0 0 L0 12" />
              <path d="M-8 12 L8 12" />
              <path d="M20 0 L28 -6" />
            </g>
            <circle cx="150" cy="214" r="2.6" fill={VF.gold} />
            <path d="M96 240 L100 232 L104 240 Z" fill={VF.vermilion} opacity="0.85" />
            <path d="M296 238 L300 230 L304 238 Z" fill={VF.vermilion} opacity="0.85" />
          </g>
        )}
        {figure === "plane" && (
          <g transform="translate(196 120)" fill="none" stroke={VF.vermilion} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
            <path d="M-34 0 L34 0" />
            <path d="M0 0 L0 16" />
            <path d="M-11 16 L11 16" />
            <path d="M28 0 L38 -8" />
            <circle cx="0" cy="0" r="2.4" fill={VF.gold} stroke="none" />
          </g>
        )}
        {figure === "camp" && (
          <g transform="translate(180 176)" opacity="0.92">
            <path d="M-24 24 L0 -14 L24 24 Z" fill="#04141a" />
            <path d="M0 -14 L0 24" stroke={VF.gold} strokeWidth="2" />
            {/* wing tip of a plane parked alongside */}
            <path d="M28 24 L64 16" stroke={VF.vermilion} strokeWidth="5" strokeLinecap="round" />
          </g>
        )}
        {figure === "glacier" && (
          <g transform="translate(168 148)" opacity="0.9">
            <path d="M-50 32 L-20 -20 L10 10 L40 -30 L70 32 Z" fill="#04141a" />
            <path d="M0 -8 L10 10 L-4 12 Z" fill={VF.mist} opacity="0.7" />
          </g>
        )}
        {figure === "fjord" && (
          <path d="M40 96 C 140 80, 260 130, 380 100" stroke={VF.snow} strokeWidth="1.4" fill="none" opacity="0.24" strokeDasharray="2 7" />
        )}
        {/* range: peaks already drawn above, add a contrail */}
        {figure === "range" && (
          <path d="M20 90 C 130 74, 250 120, 388 92" stroke={VF.snow} strokeWidth="1.4" fill="none" opacity="0.28" strokeDasharray="3 9" />
        )}

        {/* thin light ripple */}
        <path d="M40 110 C 140 94, 260 144, 380 114" stroke={VF.snow} strokeWidth="1.1" fill="none" opacity="0.16" strokeDasharray="2 8" />
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08202b]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="vfi-display text-[15px] font-semibold leading-tight text-[#eef7f7] drop-shadow-[0_1px_3px_rgba(8,32,43,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#edb24a]/45 bg-[#08202b]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eef7f7]/90 backdrop-blur-sm">
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
// LIVE "FLYING IN?" PAVD conditions — the showpiece. Re-exported from
// conditions.tsx (a "use client" component): live NWS observation for Valdez
// Pioneer Field (PAVD), decoded to aviation units with a STOL density-altitude
// read, honest Live/Sample/Computed fallback.
// ---------------------------------------------------------------------------
export { ValdezConditions } from "./conditions";
