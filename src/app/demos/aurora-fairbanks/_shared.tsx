// Shared presentational pieces for the Fairbanks aurora-viewing sample
// marketing / inquiry site.
//
// HONEST FRAMING (per brief): this is a cold-outreach SAMPLE built on
// PUBLICLY VERIFIED information by BlueWave Projects. It is NOT an official
// product of any operator and is NOT affiliated with or endorsed by the
// business named on the page. All imagery here is designed SVG art (no
// photographs) used only as sample placeholders — a real build would use the
// operator's own official photography, branding, and logo.
//
// THEME — "Fairbanks: aurora night." A night-sky aesthetic for an Interior
// Alaska aurora-viewing operator: deep aurora-night navy, classic aurora
// green and violet as the signature two-tone band (the actual colors of the
// display, not a generic "Alaska" palette), and a cool starlight-white ink —
// deliberately NO warm gold/amber accent, unlike the Kachemak Bay (fireweed +
// gold) or Valdez (orange + teal) demos, so this reads as night-sky first.
//
// SCOPING RULE: every style injected here is namespaced under the `.aur-shell`
// wrapper class (see <AuroraShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <AuroraShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/aurora-fairbanks";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — aurora-night navy / classic aurora green & violet
// ---------------------------------------------------------------------------
export const AU = {
  night: "#05070f", // near-black night sky (deepest)
  deep: "#0b1330", // deep aurora-night navy
  navy: "#15224a", // mid navy (support)
  ice: "#eaf0ff", // starlight white (paper / text-on-dark)
  mist: "#9fb0d9", // muted slate-blue (captions on dark)
  // aurora signature — the actual colors of the display, not generic "Alaska"
  green: "#3fe6a4", // classic aurora green
  greenDeep: "#1f9d6e", // deep green
  violet: "#a06bff", // aurora violet/magenta band
  violetDeep: "#6f3fd6", // deep violet
  // canvas — cool pale, deliberately NOT warm (differs from Kachemak/Molokai)
  canvas: "#f2f4fa",
  canvasDeep: "#e3e7f5",
  card: "#fbfcff",
  // text (on light canvas)
  ink: "#0d1330", // deep navy ink (body)
  inkSoft: "#3c4570", // muted slate-navy
  muted: "#6b7494", // captions / meta
} as const;

export type AuAccent = "green" | "violet" | "navy" | "night" | "ice";

export const accentGradient: Record<AuAccent, string> = {
  green: "from-[#0b1330] via-[#1f9d6e]/70 to-[#05070f]",
  violet: "from-[#0b1330] via-[#6f3fd6]/70 to-[#05070f]",
  navy: "from-[#0b1330] via-[#15224a] to-[#05070f]",
  night: "from-[#0b1330] via-[#05070f] to-[#020308]",
  ice: "from-[#15224a] via-[#9fb0d9]/30 to-[#0b1330]",
};

// ---------------------------------------------------------------------------
// AURORA SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.aur-shell`. Paints a cool starlit canvas, defines the display serif
// + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function AuroraShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`aur-shell ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool starlit canvas (scoped) --- */
        .aur-shell {
          position: relative;
          color: ${AU.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${AU.canvas};
          background-image:
            radial-gradient(circle at 92% 6%, rgba(160,107,255,.10) 0 3px, transparent 4px),
            radial-gradient(circle at 6% 92%, rgba(63,230,164,.10) 0 3px, transparent 4px),
            linear-gradient(165deg, ${AU.card} 0%, ${AU.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .aur-shell ::selection { background: rgba(160,107,255,.24); }

        /* Site Nav is styled for dark pages (white links); on the pale canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .aur-shell nav a { color: rgba(13,19,48,.72); }
        .aur-shell nav a:hover { color: ${AU.ink}; }
        .aur-shell nav a[class*="bg-"] { color: ${AU.ice}; }
        .aur-shell nav a[class*="bg-"]:hover { color: ${AU.ice}; }

        /* --- display type helpers --- */
        .aur-shell .aur-display {
          font-family: 'Cormorant', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .aur-shell .aur-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${AU.violetDeep};
        }
        /* --- mono meta (readout voice) --- */
        .aur-shell .aur-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin aurora rule --- */
        .aur-shell .aur-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${AU.green}, ${AU.violet});
        }

        /* --- card (on canvas) --- */
        .aur-shell .aur-card {
          position: relative;
          background: linear-gradient(180deg, ${AU.card}, ${AU.canvasDeep});
          border: 1px solid rgba(21,34,74,.14);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(5,7,15,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .aur-shell a.aur-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(5,7,15,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .aur-shell .aur-glass {
          background: rgba(234,240,255,.06);
          border: 1px solid rgba(234,240,255,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "Fairbanks aurora" stamp. Self-contained CSS/SVG. Deep
// night disc, aurora-green ring, a simple ribbon-over-hills glyph in the core.
// Purely decorative — a generic Interior-Alaska motif, NOT any operator's own
// logo or branding.
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
        background: `radial-gradient(circle at 50% 38%, rgba(234,240,255,.10), ${AU.night} 72%), ${AU.deep}`,
        border: `3px solid ${AU.ice}`,
        boxShadow: `0 0 0 5px ${AU.green}, 0 0 0 7px ${AU.ice}, 0 14px 34px rgba(0,0,0,.5)`,
      }}
      aria-label="Fairbanks aurora — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="aur-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="aur-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={AU.ice}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12.5px",
            letterSpacing: "2.6px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#aur-arc-top" startOffset="50%" textAnchor="middle">
            Aurora Borealis
          </textPath>
        </text>
        <text
          fill={AU.green}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#aur-arc-bot" startOffset="50%" textAnchor="middle">
            Fairbanks · Alaska
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={AU.violet} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core ribbon-over-hills glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.44, height: size * 0.44 }} aria-hidden="true">
        {/* stars */}
        <circle cx="18" cy="18" r="1.1" fill={AU.ice} opacity="0.8" />
        <circle cx="78" cy="14" r="1" fill={AU.ice} opacity="0.7" />
        <circle cx="86" cy="30" r="0.9" fill={AU.ice} opacity="0.6" />
        <circle cx="12" cy="34" r="0.8" fill={AU.ice} opacity="0.6" />
        {/* aurora ribbon */}
        <path
          d="M6 34 C 24 20, 40 44, 58 26 C 74 12, 84 30, 94 20"
          stroke={AU.green}
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M6 44 C 26 30, 42 52, 60 36 C 76 22, 84 38, 94 30"
          stroke={AU.violet}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* far hills */}
        <path d="M4 70 L24 52 L40 66 L58 46 L76 64 L96 52 L96 76 L4 76 Z" fill={AU.night} opacity="0.9" />
        {/* spruce silhouettes */}
        <path d="M30 70 L34 58 L38 70 Z M50 70 L54 60 L58 70 Z" fill={AU.night} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO / ART TILE — the feature tile.
//
// This demo ships with DESIGNED SVG ART only (no photographs), so every tile
// renders a Fairbanks aurora motif (aurora ribbon / viewing cabin / summit
// dome / hot-springs steam / stars / moose) behind a readable night-navy
// scrim, honestly chipped "Illustration." The final build would swap in the
// operator's own official photography. Keeping it illustration-only avoids
// any image-licensing question on a live public sample page.
// ---------------------------------------------------------------------------
export function ArtTile({
  accent,
  label,
  className = "",
  tall = false,
  figure = "aurora",
}: {
  accent: AuAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "aurora" | "cabin" | "dome" | "hotsprings" | "stars" | "moose";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#15224a]/25 bg-gradient-to-br ${accentGradient[accent]} ${
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
        {/* star field */}
        {[
          [30, 26], [64, 44], [112, 20], [162, 34], [206, 16], [246, 40],
          [292, 22], [330, 36], [366, 18], [24, 60], [140, 58], [270, 62],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.6 : 1} fill={AU.ice} opacity={0.5 + (i % 4) * 0.1} />
        ))}

        {/* aurora ribbons (always present as ambient atmosphere) */}
        <path
          d="M-20 70 C 60 30, 140 90, 220 50 C 300 16, 340 60, 440 40"
          stroke={AU.green}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.32"
        />
        <path
          d="M-20 92 C 60 56, 140 116, 220 78 C 300 44, 340 84, 440 66"
          stroke={AU.violet}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.26"
        />

        {/* far mountains (Alaska Range-style silhouette) */}
        <path
          d="M-20 210 L54 150 L104 188 L168 132 L232 192 L300 142 L362 190 L440 152 L440 300 L-20 300 Z"
          fill={AU.night}
          opacity="0.42"
        />
        <path
          d="M-20 232 L70 196 L140 224 L220 186 L300 222 L380 192 L440 220 L440 300 L-20 300 Z"
          fill={AU.night}
          opacity="0.55"
        />

        {/* figure motifs */}
        {figure === "cabin" && (
          <g transform="translate(190 176)" opacity="0.95">
            <path d="M-38 40 L-38 6 L0 -22 L38 6 L38 40 Z" fill={AU.night} />
            <rect x="-10" y="10" width="20" height="30" fill={AU.deep} />
            <rect x="10" y="-4" width="12" height="12" fill={AU.green} opacity="0.55" />
            <rect x="-24" y="4" width="10" height="10" fill={AU.violet} opacity="0.5" />
          </g>
        )}
        {figure === "dome" && (
          <g opacity="0.95">
            <path d="M-20 220 C 60 150, 160 150, 230 210 C 300 150, 380 160, 440 220 L440 300 L-20 300 Z" fill={AU.night} opacity="0.7" />
            <path d="M40 208 L54 200 L62 208 Z" fill={AU.ice} opacity="0.4" />
          </g>
        )}
        {figure === "hotsprings" && (
          <g transform="translate(200 168)" opacity="0.92">
            <ellipse cx="0" cy="46" rx="70" ry="14" fill={AU.deep} opacity="0.8" />
            <ellipse cx="0" cy="42" rx="58" ry="10" fill={AU.violetDeep} opacity="0.5" />
            {/* steam */}
            <path d="M-24 30 C -30 12, -14 6, -20 -12" stroke={AU.ice} strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
            <path d="M2 30 C -4 10, 12 6, 6 -16" stroke={AU.ice} strokeWidth="2.5" fill="none" opacity="0.45" strokeLinecap="round" />
            <path d="M28 30 C 22 14, 38 8, 32 -10" stroke={AU.ice} strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round" />
          </g>
        )}
        {figure === "moose" && (
          <g transform="translate(210 172)" opacity="0.94">
            <ellipse cx="0" cy="10" rx="34" ry="18" fill={AU.night} />
            <path d="M-30 4 L-42 -14 L-32 -6 Z" fill={AU.night} />
            {/* antlers */}
            <path d="M-38 -12 C -50 -26, -46 -34, -56 -34 M -38 -12 C -34 -30, -40 -36, -30 -40" stroke={AU.night} strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <circle cx="-34" cy="-8" r="1.6" fill={AU.green} />
          </g>
        )}
        {figure === "stars" && (
          <g opacity="0.9">
            {[[100,90],[180,70],[260,100],[320,64]].map(([cx,cy],i)=>(
              <path key={i} d={`M${cx} ${cy-6} L${cx+2} ${cy-2} L${cx+6} ${cy} L${cx+2} ${cy+2} L${cx} ${cy+6} L${cx-2} ${cy+2} L${cx-6} ${cy} L${cx-2} ${cy-2} Z`} fill={AU.ice} opacity="0.7" />
            ))}
          </g>
        )}
        {figure === "aurora" && (
          <path
            d="M20 100 C 100 40, 200 130, 300 60 C 350 30, 390 70, 420 50"
            stroke={AU.ice}
            strokeWidth="1.4"
            fill="none"
            opacity="0.2"
            strokeDasharray="2 8"
          />
        )}
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#05070f]/76 to-transparent" />

      {/* caption + honest "Illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="aur-display text-[15px] font-semibold leading-tight text-[#eaf0ff] drop-shadow-[0_1px_3px_rgba(5,7,15,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#3fe6a4]/45 bg-[#05070f]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eaf0ff]/90 backdrop-blur-sm">
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
// LIVE "TONIGHT'S AURORA CHANCE" panel — the showpiece. Re-exported from
// conditions.tsx (a "use client" component): combines NOAA SWPC Kp + OVATION
// aurora probability, the computed nautical-darkness window for Fairbanks,
// and the latest Fairbanks Airport (PAFA) sky read into one honest verdict —
// falling back to clearly-labeled samples if a feed is unreachable.
// ---------------------------------------------------------------------------
export { AuroraConditions } from "./conditions";
