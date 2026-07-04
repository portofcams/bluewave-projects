// Shared presentational pieces for the Alaska Rainbow Lodge sample /
// marketing-and-booking-inquiry site.
//
// HONEST FRAMING (per brief): this is a sample built on PUBLICLY VERIFIED
// information by BlueWave Projects. It is NOT an official Alaska Rainbow
// Lodge product and is not affiliated with or endorsed by the lodge or the
// Ferguson family. All photos are license-clean (public-domain / Creative-
// Commons) Bristol Bay / Alaska fly-fishing imagery from Wikimedia Commons
// (see /public/demos/rainbow-lodge/CREDITS.md), used only as sample
// placeholders — the final build would use the lodge's own official
// photography, branding, and logo. No Alaska Rainbow Lodge property photos,
// no identifiable guests, no lodge branding/logos are used.
//
// THEME: premium Alaska wilderness-lodge. Deep river-green / slate ink, warm
// amber / evening-light + salmon-red accents, a refined serif display paired
// with a clean sans body. Deliberately distinct from the event-info-hub demos
// (aviation gathering, festivals) — this should read like a $16,500/week
// outfitter's marketing site, not a festival information hub.
//
// SCOPING RULE: every style injected here is namespaced under the `.arl-lodge`
// wrapper class (see <LodgeShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <LodgeShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/alaska-rainbow-lodge";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — river green / evening amber / salmon
// ---------------------------------------------------------------------------
export const LODGE = {
  night: "#0c1a15", // deepest spruce-shadow ink
  deep: "#132b22", // deep river-green
  forest: "#1c3b2e", // mid forest green
  slate: "#2c4a3d", // slate-green
  moss: "#4f7a63", // muted moss
  mist: "#a9c4b6", // pale glacial mist green
  paper: "#f5f1e6", // warm parchment paper
  // evening-light + salmon accents
  amber: "#d79a3c", // evening-light amber
  amberDeep: "#b6772a", // deep amber / low sun
  salmon: "#c1553c", // salmon-red accent
  salmonDeep: "#9c4230", // deep salmon
  // canvas
  canvas: "#f3efe3", // warm parchment canvas
  canvasDeep: "#e7e0cd", // shaded canvas
  card: "#faf7ef", // lightest card
  // text
  ink: "#16281f", // deep forest ink (body)
  inkSoft: "#3d5347", // muted slate-green
  muted: "#6b7d70", // captions / meta
} as const;

export type LodgeAccent = "forest" | "slate" | "amber" | "salmon" | "night" | "moss";

export const accentGradient: Record<LodgeAccent, string> = {
  forest: "from-[#132b22] via-[#1c3b2e] to-[#0c1a15]",
  slate: "from-[#1c3b2e] via-[#2c4a3d] to-[#132b22]",
  amber: "from-[#b6772a] via-[#d79a3c] to-[#1c3b2e]",
  salmon: "from-[#9c4230] via-[#c1553c] to-[#1c3b2e]",
  night: "from-[#132b22] via-[#0c1a15] to-[#070f0c]",
  moss: "from-[#2c4a3d] via-[#1c3b2e] to-[#132b22]",
};

// ---------------------------------------------------------------------------
// LODGE SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.arl-lodge`. Paints a warm parchment canvas, defines the display
// serif + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function LodgeShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`arl-lodge ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- warm parchment canvas (scoped) --- */
        .arl-lodge {
          position: relative;
          color: ${LODGE.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${LODGE.canvas};
          background-image:
            radial-gradient(circle at 85% 8%, rgba(215,154,60,.08) 0 3px, transparent 4px),
            radial-gradient(circle at 12% 92%, rgba(76,110,90,.06) 0 3px, transparent 4px),
            linear-gradient(165deg, ${LODGE.card} 0%, ${LODGE.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .arl-lodge ::selection { background: rgba(215,154,60,.28); }

        /* Site Nav is styled for dark pages (white links); on the parchment
           canvas they wash out. Re-ink them, but leave any link carrying its
           own bg (the CTA) alone. */
        .arl-lodge nav a { color: rgba(22,40,31,.72); }
        .arl-lodge nav a:hover { color: ${LODGE.ink}; }
        .arl-lodge nav a[class*="bg-"] { color: ${LODGE.paper}; }
        .arl-lodge nav a[class*="bg-"]:hover { color: ${LODGE.paper}; }

        /* --- display type helpers --- */
        .arl-lodge .arl-display {
          font-family: 'Fraunces', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .arl-lodge .arl-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${LODGE.salmonDeep};
        }
        /* --- mono meta (ledger / rate-card voice) --- */
        .arl-lodge .arl-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin amber rule --- */
        .arl-lodge .arl-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${LODGE.amber}, ${LODGE.salmon});
        }

        /* --- lodge card (on canvas) --- */
        .arl-lodge .arl-card {
          position: relative;
          background: linear-gradient(180deg, ${LODGE.card}, ${LODGE.canvasDeep});
          border: 1px solid rgba(44,74,61,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(12,26,21,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .arl-lodge a.arl-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(12,26,21,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .arl-lodge .arl-glass {
          background: rgba(245,241,230,.06);
          border: 1px solid rgba(245,241,230,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "rainbow trout + river" stamp. Self-contained CSS/SVG.
// Deep forest disc, amber ring, a simple leaping-fish glyph in the core.
// Purely decorative — a generic lodge motif, NOT the Alaska Rainbow Lodge's
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
        background: `radial-gradient(circle at 50% 38%, rgba(245,241,230,.12), ${LODGE.night} 72%), ${LODGE.deep}`,
        border: `3px solid ${LODGE.paper}`,
        boxShadow: `0 0 0 5px ${LODGE.amber}, 0 0 0 7px ${LODGE.paper}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Bristol Bay fly-in fishing — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="arl-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="arl-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={LODGE.paper}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            letterSpacing: "2.4px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#arl-arc-top" startOffset="50%" textAnchor="middle">
            Bristol Bay Alaska
          </textPath>
        </text>
        <text
          fill={LODGE.amber}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#arl-arc-bot" startOffset="50%" textAnchor="middle">
            Fly-In Only · Since 1982
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={LODGE.amber} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core leaping-trout glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.42, height: size * 0.42 }} aria-hidden="true">
        <g fill="none" stroke={LODGE.mist} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 62 C 32 40, 58 28, 78 24 C 70 34, 66 42, 66 50 C 66 58, 70 66, 78 76 C 58 72, 32 60, 20 62 Z" />
          <path d="M78 24 L88 16 M78 76 L88 84" />
        </g>
        <circle cx="30" cy="52" r="2.6" fill={LODGE.amber} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO — the feature tile.
//
// When a `photo` (license-clean public-domain/Creative-Commons image,
// verified and stored under /public/demos/rainbow-lodge/) is supplied, we
// render that REAL photo behind a readable forest-green scrim, with the
// label and an honest chip + on-image credit. When NO fitting licensed photo
// exists, `photo` is omitted and we fall back to designed SVG lodge art (a
// river/mountain well with a fish, cabin, or float motif). Either way the
// tile carries the honest note that the final build swaps in the lodge's own
// photography.
// ---------------------------------------------------------------------------
export type PhotoSrc = {
  /** path under /public, e.g. "/demos/rainbow-lodge/kvichak-river.webp" */
  src: string;
  /** short attribution shown on-image, e.g. "United States Senate · Public domain" */
  credit: string;
  /** object-position, e.g. "center", "50% 30%" */
  position?: string;
};

export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  figure = "river",
  photo,
}: {
  accent: LodgeAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "river" | "fish" | "float" | "cabin" | "bear";
  photo?: PhotoSrc;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#2c4a3d]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `${label} — sample photo` : `Lodge illustration placeholder — ${label}`}
    >
      {/* REAL PHOTO branch — license-clean image behind a readable forest scrim */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={`${label} — sample Bristol Bay photo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* deep-forest scrim: keeps the palette + makes the label legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a15]/35 via-[#132b22]/25 to-[#0c1a15]/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0c1a15]/85 via-[#0c1a15]/35 to-transparent" />
          {/* on-image credit (top-left, unobtrusive) */}
          <span className="absolute left-3 top-3 rounded-full bg-[#0c1a15]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f5f1e6]/80 backdrop-blur-sm">
            {photo.credit}
          </span>
        </>
      )}

      {/* SVG ART branch — only when no licensed photo is supplied */}
      {!photo && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`arl-sun-${accent}`} cx="76%" cy="24%" r="36%">
              <stop offset="0%" stopColor="#ffe0a8" stopOpacity="0.9" />
              <stop offset="55%" stopColor={LODGE.amber} stopOpacity="0.5" />
              <stop offset="100%" stopColor={LODGE.amber} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`arl-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dcead0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#dcead0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* sky wash + low evening sun */}
          <rect width="400" height="300" fill={`url(#arl-sky-${accent})`} />
          <circle cx="304" cy="72" r="120" fill={`url(#arl-sun-${accent})`} />
          <circle cx="304" cy="72" r="24" fill="#ffe0a8" opacity="0.82" />

          {/* mountain horizon */}
          <path
            d="M-20 214 L60 168 L110 196 L170 150 L232 200 L300 158 L360 198 L440 168 L440 300 L-20 300 Z"
            fill="#0c1a15"
            opacity="0.32"
          />
          <path
            d="M-20 232 L70 198 L140 224 L220 190 L300 222 L380 196 L440 220 L440 300 L-20 300 Z"
            fill="#070f0c"
            opacity="0.4"
          />

          {/* river ribbon */}
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250 L440 300 L-20 300 Z"
            fill="#1c3b2e"
            opacity="0.55"
          />
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250"
            stroke="#a9c4b6"
            strokeWidth="1.4"
            fill="none"
            opacity="0.3"
          />

          {/* figure motifs */}
          {figure === "fish" && (
            <g transform="translate(190 150) rotate(-14)" opacity="0.92">
              <path
                d="M-58 0 C -30 -34, 30 -34, 66 -6 C 30 8, -10 6, -32 22 C -10 22, 10 30, 30 44 C -12 40, -44 22, -58 0 Z"
                fill="#0a2118"
              />
              <path d="M66 -6 L84 -20 M66 -6 L84 8" stroke="#0a2118" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-38" cy="-4" r="3" fill={LODGE.amber} />
            </g>
          )}
          {figure === "float" && (
            <g transform="translate(150 118)" fill="#0a2118" opacity="0.92">
              <rect x="-44" y="-10" width="88" height="6" rx="3" />
              <path d="M-28 0 Q 0 -6 42 0 Q 48 4 42 8 Q 0 12 -28 8 Z" />
              <rect x="-26" y="16" width="56" height="6" rx="3" />
              <path d="M-18 8 L-16 16 M18 8 L20 16" stroke="#0a2118" strokeWidth="2" />
              <path d="M-28 2 L-42 -8 L-40 4 Z" />
            </g>
          )}
          {figure === "cabin" && (
            <g transform="translate(140 190)" fill="#0a2118" opacity="0.9">
              <path d="M0 40 L28 -6 L56 40 Z" />
              <rect x="10" y="14" width="36" height="26" opacity="0.85" />
              <path d="M22 40 L22 24 L34 24 L34 40 Z" fill="#f5f1e6" opacity="0.4" />
              <rect x="46" y="-2" width="6" height="16" opacity="0.9" />
            </g>
          )}
          {figure === "bear" && (
            <g transform="translate(160 176)" fill="#0a2118" opacity="0.9">
              <ellipse cx="0" cy="14" rx="30" ry="16" />
              <circle cx="-24" cy="-4" r="13" />
              <circle cx="-32" cy="-14" r="4" />
              <circle cx="-18" cy="-14" r="4" />
              <path d="M22 14 Q 40 6 46 -6" stroke="#0a2118" strokeWidth="6" fill="none" strokeLinecap="round" />
            </g>
          )}
          {figure === "river" && (
            <g transform="translate(170 150)" opacity="0.9">
              <path
                d="M-40 20 C -10 -6, 30 -6, 60 20"
                stroke="#0a2118"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M-40 20 L-50 12 L-48 26 Z" fill="#0a2118" />
            </g>
          )}

          {/* thin evening light ripple */}
          <path
            d="M40 96 C 140 80, 260 130, 380 100"
            stroke="#f5f1e6"
            strokeWidth="1.4"
            fill="none"
            opacity="0.22"
            strokeDasharray="2 7"
          />
        </svg>
      )}

      {/* soft vignette for caption legibility (SVG art only — the photo branch
          already lays down its own bottom scrim) */}
      {!photo && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c1a15]/70 to-transparent" />
      )}

      {/* caption + honest chip: "Sample photo" over real imagery, "Illustration"
          over the designed SVG art. Both signal the final build uses the
          lodge's own official photography. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="arl-display text-[15px] font-semibold leading-tight text-[#f5f1e6] drop-shadow-[0_1px_3px_rgba(12,26,21,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#d79a3c]/45 bg-[#0c1a15]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f5f1e6]/90 backdrop-blur-sm">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
              <path d="M2 11 L6 7.5 L9 10 L11 8.5 L14 11" stroke="currentColor" strokeWidth="1.3" fill="none" />
            </svg>
            {photo ? "Sample photo" : "Illustration"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LIVE "KING SALMON RIGHT NOW" CONDITIONS — the showpiece. Re-exported from
// conditions.tsx (a "use client" component): attempts a live PAKN observation,
// decodes it, and falls back to a clearly-labeled sample if unreachable.
// ---------------------------------------------------------------------------
export { LodgeConditions } from "./conditions";
