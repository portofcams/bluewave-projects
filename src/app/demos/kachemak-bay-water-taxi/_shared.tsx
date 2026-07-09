// Shared presentational pieces for the Kachemak Bay water-taxi sample
// marketing / inquiry site.
//
// HONEST FRAMING (per brief): this is a cold-outreach SAMPLE built on
// PUBLICLY VERIFIED information by BlueWave Projects. It is NOT an official
// product of any operator and is NOT affiliated with or endorsed by the
// business named on the page. All imagery here is designed SVG art (no
// photographs) used only as sample placeholders — a real build would use the
// operator's own official photography, branding, and logo. No operator's
// boats, crew, guests, or copyrighted photography are used.
//
// THEME — "Kachemak Bay: spruce & fireweed." A small-boat, working-harbor
// aesthetic for a Homer, Alaska water-taxi / small-ferry operator: deep
// Kachemak bay-water teal, Kenai-spruce green, cool glacier mist, and a
// signature FIREWEED magenta accent (the flower that lines the Homer Spit
// road all summer) warmed by a spit-sunset gold. Deliberately distinct from
// the Lazy Otter Charters demo (glacier ice-teal + sunset coral/amber) and
// from the lodge demos — this should read like a Homer harbor water-taxi
// outfit, tide-driven and nautical, not a festival hub or a fly-in lodge.
//
// SCOPING RULE: every style injected here is namespaced under the `.kb-taxi`
// wrapper class (see <TideShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <TideShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/kachemak-bay-water-taxi";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — Kachemak bay-water teal / Kenai spruce / fireweed
// ---------------------------------------------------------------------------
export const KB = {
  night: "#08222b", // deepest bay-water ink
  deep: "#0d3540", // deep bay teal
  bay: "#166170", // mid bay blue-green
  spruce: "#1f5a4a", // Kenai spruce green (support)
  ice: "#6fc3cf", // glacier ice highlight
  mist: "#c9e9e9", // pale glacier mist
  paper: "#f3faf9", // cool white paper
  // accents
  fireweed: "#d9558c", // signature fireweed magenta
  fireweedDeep: "#b23a6e", // deep fireweed
  gold: "#e6a94b", // spit-sunset gold (secondary)
  goldDeep: "#c9882f", // deep gold
  // canvas
  canvas: "#eef6f5", // cool pale canvas
  canvasDeep: "#dcecea", // shaded canvas
  card: "#fbfefe", // lightest card
  // text
  ink: "#0c2a30", // deep bay-water ink (body)
  inkSoft: "#37585d", // muted slate-teal
  muted: "#5d7b7f", // captions / meta
} as const;

export type KbAccent = "bay" | "spruce" | "fireweed" | "gold" | "night" | "ice";

export const accentGradient: Record<KbAccent, string> = {
  bay: "from-[#0d3540] via-[#166170] to-[#08222b]",
  spruce: "from-[#0d3540] via-[#1f5a4a] to-[#08222b]",
  fireweed: "from-[#b23a6e] via-[#d9558c] to-[#166170]",
  gold: "from-[#c9882f] via-[#e6a94b] to-[#166170]",
  night: "from-[#0d3540] via-[#08222b] to-[#04141a]",
  ice: "from-[#166170] via-[#6fc3cf]/40 to-[#0d3540]",
};

// ---------------------------------------------------------------------------
// TIDE SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.kb-taxi`. Paints a cool bay-water canvas, defines the display serif
// + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function TideShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`kb-taxi ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool bay-water canvas (scoped) --- */
        .kb-taxi {
          position: relative;
          color: ${KB.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${KB.canvas};
          background-image:
            radial-gradient(circle at 90% 5%, rgba(217,85,140,.09) 0 3px, transparent 4px),
            radial-gradient(circle at 8% 95%, rgba(111,195,207,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${KB.card} 0%, ${KB.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .kb-taxi ::selection { background: rgba(217,85,140,.24); }

        /* Site Nav is styled for dark pages (white links); on the pale canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .kb-taxi nav a { color: rgba(12,42,48,.72); }
        .kb-taxi nav a:hover { color: ${KB.ink}; }
        .kb-taxi nav a[class*="bg-"] { color: ${KB.paper}; }
        .kb-taxi nav a[class*="bg-"]:hover { color: ${KB.paper}; }

        /* --- display type helpers --- */
        .kb-taxi .kb-display {
          font-family: 'Newsreader', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .kb-taxi .kb-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${KB.fireweedDeep};
        }
        /* --- mono meta (tide-log / conditions voice) --- */
        .kb-taxi .kb-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin fireweed/gold rule --- */
        .kb-taxi .kb-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${KB.fireweed}, ${KB.gold});
        }

        /* --- card (on canvas) --- */
        .kb-taxi .kb-card {
          position: relative;
          background: linear-gradient(180deg, ${KB.card}, ${KB.canvasDeep});
          border: 1px solid rgba(22,97,112,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(8,34,43,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .kb-taxi a.kb-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(8,34,43,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .kb-taxi .kb-glass {
          background: rgba(243,250,249,.06);
          border: 1px solid rgba(243,250,249,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "Kachemak Bay water taxi" stamp. Self-contained CSS/SVG.
// Deep bay disc, ice-blue ring, a simple water-taxi-on-the-bay glyph in the
// core. Purely decorative — a generic Homer harbor motif, NOT any operator's
// own logo or branding.
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
        background: `radial-gradient(circle at 50% 38%, rgba(243,250,249,.12), ${KB.night} 72%), ${KB.deep}`,
        border: `3px solid ${KB.paper}`,
        boxShadow: `0 0 0 5px ${KB.ice}, 0 0 0 7px ${KB.paper}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Kachemak Bay water taxi — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="kb-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="kb-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={KB.paper}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12.5px",
            letterSpacing: "2.6px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#kb-arc-top" startOffset="50%" textAnchor="middle">
            Kachemak Bay
          </textPath>
        </text>
        <text
          fill={KB.gold}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#kb-arc-bot" startOffset="50%" textAnchor="middle">
            Homer · Alaska
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={KB.gold} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core water-taxi-on-the-bay glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.44, height: size * 0.44 }} aria-hidden="true">
        {/* far mountains */}
        <path d="M8 46 L26 30 L38 42 L54 26 L70 44 L92 30 L92 52 L8 52 Z" fill={KB.spruce} opacity="0.55" />
        <path d="M50 28 L54 26 L60 34 L55 36 L60 42 L48 42 Z" fill={KB.mist} opacity="0.6" />
        {/* small water taxi */}
        <g fill="none" stroke={KB.mist} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 62 L34 52 L66 52 L72 62 Z" />
          <path d="M44 52 L44 44 L58 44 L58 52" />
        </g>
        <circle cx="51" cy="48" r="1.8" fill={KB.gold} />
        {/* bay water ripples */}
        <path
          d="M10 72 C 26 68, 40 76, 56 72 C 72 68, 82 76, 92 72"
          stroke={KB.ice}
          strokeWidth="2.4"
          fill="none"
          opacity="0.75"
        />
        <path
          d="M14 80 C 30 76, 44 84, 60 80 C 74 76, 82 82, 90 80"
          stroke={KB.ice}
          strokeWidth="1.8"
          fill="none"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO / ART TILE — the feature tile.
//
// This demo ships with DESIGNED SVG ART only (no photographs), so every tile
// renders a Kachemak Bay motif (bay / boat / spit / puffin / otter / glacier)
// behind a readable bay-teal scrim, honestly chipped "Illustration." The
// final build would swap in the operator's own official photography. Keeping
// it illustration-only avoids any image-licensing question on a live public
// sample page.
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "bay",
}: {
  accent: KbAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "bay" | "boat" | "spit" | "puffin" | "otter" | "glacier";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#166170]/25 bg-gradient-to-br ${accentGradient[accent]} ${
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
          <radialGradient id={`kb-sun-${accent}`} cx="74%" cy="22%" r="38%">
            <stop offset="0%" stopColor="#ffe0b0" stopOpacity="0.9" />
            <stop offset="55%" stopColor={KB.gold} stopOpacity="0.45" />
            <stop offset="100%" stopColor={KB.gold} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`kb-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5eef0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#d5eef0" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* sky wash + low sun */}
        <rect width="400" height="300" fill={`url(#kb-sky-${accent})`} />
        <circle cx="300" cy="70" r="120" fill={`url(#kb-sun-${accent})`} />
        <circle cx="300" cy="70" r="22" fill="#ffe0b0" opacity="0.82" />

        {/* Kenai mountains across the bay */}
        <path
          d="M-20 210 L54 160 L104 192 L168 146 L232 196 L300 152 L362 194 L440 162 L440 300 L-20 300 Z"
          fill="#08222b"
          opacity="0.34"
        />
        <path
          d="M-20 230 L70 196 L140 222 L220 188 L300 220 L380 194 L440 218 L440 300 L-20 300 Z"
          fill="#04141a"
          opacity="0.42"
        />
        {/* Grewingk-style ice streaks on a peak */}
        <path d="M150 196 L168 146 L190 176 L176 184 L186 194 Z" fill={KB.mist} opacity="0.5" />

        {/* bay water ribbon */}
        <path
          d="M-20 266 C 80 248, 140 278, 220 256 C 300 236, 340 262, 440 248 L440 300 L-20 300 Z"
          fill="#166170"
          opacity="0.55"
        />
        <path
          d="M-20 266 C 80 248, 140 278, 220 256 C 300 236, 340 262, 440 248"
          stroke={KB.mist}
          strokeWidth="1.4"
          fill="none"
          opacity="0.3"
        />

        {/* figure motifs */}
        {figure === "boat" && (
          <g transform="translate(150 138)" fill="#04141a" opacity="0.92">
            <path d="M-52 30 L-36 -4 L58 -4 L64 30 Z" />
            <rect x="-10" y="-30" width="30" height="26" opacity="0.85" />
            <rect x="16" y="-40" width="3" height="12" opacity="0.9" />
          </g>
        )}
        {figure === "spit" && (
          <g opacity="0.9">
            {/* the long low Homer Spit reaching into the bay */}
            <path d="M-20 250 L300 244 L440 246 L440 258 L-20 260 Z" fill="#04141a" opacity="0.6" />
            <rect x="70" y="236" width="10" height="10" fill="#04141a" opacity="0.7" />
            <rect x="120" y="234" width="8" height="12" fill="#04141a" opacity="0.7" />
            <rect x="170" y="236" width="9" height="10" fill="#04141a" opacity="0.7" />
            <path d="M96 236 L100 226 L104 236 Z" fill={KB.gold} opacity="0.8" />
          </g>
        )}
        {figure === "puffin" && (
          <g transform="translate(196 168)" opacity="0.94">
            <ellipse cx="0" cy="8" rx="20" ry="26" fill="#04141a" />
            <circle cx="0" cy="-16" r="13" fill="#04141a" />
            <path d="M-2 -16 q -16 2 -14 8 q 14 3 14 -1 Z" fill={KB.gold} />
            <circle cx="4" cy="-19" r="2.4" fill={KB.paper} />
          </g>
        )}
        {figure === "otter" && (
          <g transform="translate(190 162)" opacity="0.92">
            <ellipse cx="0" cy="0" rx="46" ry="20" fill="#04141a" />
            <circle cx="-34" cy="-16" r="13" fill="#04141a" />
            <path d="M-42 -20 L-50 -28 M-26 -20 L-20 -28" stroke="#04141a" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-36" cy="-18" r="2.6" fill={KB.gold} />
          </g>
        )}
        {figure === "glacier" && (
          <g transform="translate(168 148)" opacity="0.9">
            <path d="M-50 32 L-20 -20 L10 10 L40 -30 L70 32 Z" fill="#04141a" />
            <path d="M0 -8 L10 10 L-4 12 Z" fill={KB.mist} opacity="0.7" />
          </g>
        )}
        {figure === "bay" && (
          <path
            d="M40 96 C 140 80, 260 130, 380 100"
            stroke={KB.paper}
            strokeWidth="1.4"
            fill="none"
            opacity="0.24"
            strokeDasharray="2 7"
          />
        )}

        {/* thin light ripple */}
        <path
          d="M40 108 C 140 92, 260 142, 380 112"
          stroke={KB.paper}
          strokeWidth="1.2"
          fill="none"
          opacity="0.18"
          strokeDasharray="2 8"
        />
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08222b]/72 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="kb-display text-[15px] font-semibold leading-tight text-[#f3faf9] drop-shadow-[0_1px_3px_rgba(8,34,43,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e6a94b]/45 bg-[#08222b]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f3faf9]/90 backdrop-blur-sm">
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
// LIVE "KACHEMAK BAY TIDES RIGHT NOW" panel — the showpiece.
// Re-exported from conditions.tsx (a "use client" component): pulls live tide
// predictions for Homer (NOAA station 9455500) and a live Homer Airport
// (PAHO) weather read, and falls back to clearly-labeled samples if either
// feed is unreachable.
// ---------------------------------------------------------------------------
export { BayConditions } from "./conditions";
