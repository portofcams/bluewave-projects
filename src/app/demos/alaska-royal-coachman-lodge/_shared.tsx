// Shared presentational pieces for the Royal Coachman Lodge sample /
// marketing-and-inquiry site.
//
// HONEST FRAMING (per brief): this is a sample built on PUBLICLY VERIFIED
// information by BlueWave Projects. It is NOT an official Royal Coachman
// Lodge product and is not affiliated with or endorsed by the lodge,
// Sweetwater Travel, or Scott Schumacher. All photos are license-clean
// (public-domain / Creative-Commons) Wood-Tikchik / Bristol Bay imagery from
// Wikimedia Commons (see /public/demos/royal-coachman/CREDITS.md), used only
// as sample placeholders — the final build would use the lodge's own
// official photography, branding, and logo. No Royal Coachman Lodge property
// photos, no identifiable guests, no lodge branding/logos are used.
//
// THEME: deep slate / river-blue with a warm copper accent — deliberately
// distinct from the sibling Alaska Rainbow Lodge demo's forest-green/amber
// palette. A refined serif display paired with a clean sans body, reading
// like a rare, remote, grandfathered fly-in outfitter's site.
//
// SCOPING RULE: every style injected here is namespaced under the `.rcl-lodge`
// wrapper class (see <LodgeShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <LodgeShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/alaska-royal-coachman-lodge";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — deep slate / river-blue / copper
// ---------------------------------------------------------------------------
export const LODGE = {
  night: "#0a1420", // deepest river-night ink
  deep: "#0f2033", // deep slate-blue
  river: "#16334a", // mid river-blue
  slate: "#233f56", // slate-blue
  mist: "#7fa3bd", // pale glacial mist blue
  paper: "#f2ede2", // warm parchment paper (cooler than ARL's)
  // copper + warm accents
  copper: "#c9793f", // warm copper accent
  copperDeep: "#a35f2c", // deep copper / rust
  rust: "#8a4a2a", // deeper rust for contrast text
  // canvas
  canvas: "#eef1ee", // cool stone canvas
  canvasDeep: "#dde3de", // shaded canvas
  card: "#f7f9f6", // lightest card
  // text
  ink: "#111f2b", // deep slate ink (body)
  inkSoft: "#3a4d5c", // muted slate-blue
  muted: "#647985", // captions / meta
} as const;

export type LodgeAccent = "river" | "slate" | "copper" | "night" | "mist";

export const accentGradient: Record<LodgeAccent, string> = {
  river: "from-[#0f2033] via-[#16334a] to-[#0a1420]",
  slate: "from-[#16334a] via-[#233f56] to-[#0f2033]",
  copper: "from-[#a35f2c] via-[#c9793f] to-[#16334a]",
  night: "from-[#0f2033] via-[#0a1420] to-[#060c14]",
  mist: "from-[#233f56] via-[#16334a] to-[#0f2033]",
};

// ---------------------------------------------------------------------------
// LODGE SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.rcl-lodge`. Paints a cool stone canvas, defines the display serif +
// helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function LodgeShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rcl-lodge ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- cool stone canvas (scoped) --- */
        .rcl-lodge {
          position: relative;
          color: ${LODGE.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${LODGE.canvas};
          background-image:
            radial-gradient(circle at 85% 8%, rgba(201,121,63,.09) 0 3px, transparent 4px),
            radial-gradient(circle at 12% 92%, rgba(35,63,86,.07) 0 3px, transparent 4px),
            linear-gradient(165deg, ${LODGE.card} 0%, ${LODGE.canvasDeep} 100%);
          background-size: 100% 100%, 100% 100%, 100% 100%;
        }
        .rcl-lodge ::selection { background: rgba(201,121,63,.28); }

        /* Site Nav is styled for dark pages (white links); on the stone
           canvas they wash out. Re-ink them, but leave any link carrying its
           own bg (the CTA) alone. */
        .rcl-lodge nav a { color: rgba(17,31,43,.72); }
        .rcl-lodge nav a:hover { color: ${LODGE.ink}; }
        .rcl-lodge nav a[class*="bg-"] { color: ${LODGE.paper}; }
        .rcl-lodge nav a[class*="bg-"]:hover { color: ${LODGE.paper}; }

        /* --- display type helpers --- */
        .rcl-lodge .rcl-display {
          font-family: 'Fraunces', 'Georgia', serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .rcl-lodge .rcl-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .28em;
          font-weight: 600;
          font-size: 12px;
          color: ${LODGE.rust};
        }
        /* --- mono meta (ledger / rate-card voice) --- */
        .rcl-lodge .rcl-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin copper rule --- */
        .rcl-lodge .rcl-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${LODGE.copper}, ${LODGE.river});
        }

        /* --- lodge card (on canvas) --- */
        .rcl-lodge .rcl-card {
          position: relative;
          background: linear-gradient(180deg, ${LODGE.card}, ${LODGE.canvasDeep});
          border: 1px solid rgba(35,63,86,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(10,20,32,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .rcl-lodge a.rcl-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(10,20,32,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .rcl-lodge .rcl-glass {
          background: rgba(242,237,226,.06);
          border: 1px solid rgba(242,237,226,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// EMBLEM — circular "royal coachman fly + river" stamp. Self-contained
// CSS/SVG. Deep slate disc, copper ring, a simple fishing-fly glyph in the
// core. Purely decorative — a generic lodge motif, NOT the Royal Coachman
// Lodge's own logo or branding.
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
        background: `radial-gradient(circle at 50% 38%, rgba(242,237,226,.12), ${LODGE.night} 72%), ${LODGE.deep}`,
        border: `3px solid ${LODGE.paper}`,
        boxShadow: `0 0 0 5px ${LODGE.copper}, 0 0 0 7px ${LODGE.paper}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Wood-Tikchik fly-in fishing — sample emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="rcl-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="rcl-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
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
          <textPath href="#rcl-arc-top" startOffset="50%" textAnchor="middle">
            Wood-Tikchik Alaska
          </textPath>
        </text>
        <text
          fill={LODGE.copper}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10.5px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#rcl-arc-bot" startOffset="50%" textAnchor="middle">
            Fly-In Only · Nuyakuk River
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={LODGE.copper} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core fly/hook glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.42, height: size * 0.42 }} aria-hidden="true">
        <g fill="none" stroke={LODGE.mist} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 18 C 62 18, 70 28, 68 40 C 66 52, 56 60, 50 72 C 44 60, 34 52, 32 40 C 30 28, 38 18, 50 18 Z" />
          <path d="M50 72 C 46 78, 46 84, 50 88" />
        </g>
        <circle cx="50" cy="30" r="3" fill={LODGE.copper} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO — the feature tile.
//
// When a `photo` (license-clean public-domain/Creative-Commons image,
// verified and stored under /public/demos/royal-coachman/) is supplied, we
// render that REAL photo behind a readable slate scrim, with the label and
// an honest chip + on-image credit. When NO fitting licensed photo exists,
// `photo` is omitted and we fall back to designed SVG lodge art (a river/
// mountain scene with a fish, cabin, or float motif). Either way the tile
// carries the honest note that the final build swaps in the lodge's own
// photography.
// ---------------------------------------------------------------------------
export type PhotoSrc = {
  /** path under /public, e.g. "/demos/royal-coachman/aleknagik-lake.webp" */
  src: string;
  /** short attribution shown on-image, e.g. "Alex Smith · CC BY 3.0 US" */
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
  figure?: "river" | "fish" | "float" | "cabin" | "map";
  photo?: PhotoSrc;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#233f56]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `${label} — sample photo` : `Lodge illustration placeholder — ${label}`}
    >
      {/* REAL PHOTO branch — license-clean image behind a readable slate scrim */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={`${label} — sample Wood-Tikchik / Bristol Bay photo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* deep-slate scrim: keeps the palette + makes the label legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1420]/35 via-[#0f2033]/25 to-[#0a1420]/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0a1420]/85 via-[#0a1420]/35 to-transparent" />
          {/* on-image credit (top-left, unobtrusive) */}
          <span className="absolute left-3 top-3 rounded-full bg-[#0a1420]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f2ede2]/80 backdrop-blur-sm">
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
            <radialGradient id={`rcl-sun-${accent}`} cx="76%" cy="24%" r="36%">
              <stop offset="0%" stopColor="#ffd9ae" stopOpacity="0.9" />
              <stop offset="55%" stopColor={LODGE.copper} stopOpacity="0.5" />
              <stop offset="100%" stopColor={LODGE.copper} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`rcl-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfe0ea" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#cfe0ea" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* sky wash + low evening sun */}
          <rect width="400" height="300" fill={`url(#rcl-sky-${accent})`} />
          <circle cx="304" cy="72" r="120" fill={`url(#rcl-sun-${accent})`} />
          <circle cx="304" cy="72" r="24" fill="#ffd9ae" opacity="0.82" />

          {/* mountain horizon */}
          <path
            d="M-20 214 L60 168 L110 196 L170 150 L232 200 L300 158 L360 198 L440 168 L440 300 L-20 300 Z"
            fill="#0a1420"
            opacity="0.32"
          />
          <path
            d="M-20 232 L70 198 L140 224 L220 190 L300 222 L380 196 L440 220 L440 300 L-20 300 Z"
            fill="#060c14"
            opacity="0.4"
          />

          {/* river ribbon */}
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250 L440 300 L-20 300 Z"
            fill="#16334a"
            opacity="0.55"
          />
          <path
            d="M-20 268 C 80 250, 140 280, 220 258 C 300 238, 340 264, 440 250"
            stroke="#7fa3bd"
            strokeWidth="1.4"
            fill="none"
            opacity="0.3"
          />

          {/* figure motifs */}
          {figure === "fish" && (
            <g transform="translate(190 150) rotate(-14)" opacity="0.92">
              <path
                d="M-58 0 C -30 -34, 30 -34, 66 -6 C 30 8, -10 6, -32 22 C -10 22, 10 30, 30 44 C -12 40, -44 22, -58 0 Z"
                fill="#081119"
              />
              <path d="M66 -6 L84 -20 M66 -6 L84 8" stroke="#081119" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-38" cy="-4" r="3" fill={LODGE.copper} />
            </g>
          )}
          {figure === "float" && (
            <g transform="translate(150 118)" fill="#081119" opacity="0.92">
              <rect x="-44" y="-10" width="88" height="6" rx="3" />
              <path d="M-28 0 Q 0 -6 42 0 Q 48 4 42 8 Q 0 12 -28 8 Z" />
              <rect x="-26" y="16" width="56" height="6" rx="3" />
              <path d="M-18 8 L-16 16 M18 8 L20 16" stroke="#081119" strokeWidth="2" />
              <path d="M-28 2 L-42 -8 L-40 4 Z" />
            </g>
          )}
          {figure === "cabin" && (
            <g transform="translate(140 190)" fill="#081119" opacity="0.9">
              <path d="M0 40 L28 -6 L56 40 Z" />
              <rect x="10" y="14" width="36" height="26" opacity="0.85" />
              <path d="M22 40 L22 24 L34 24 L34 40 Z" fill="#f2ede2" opacity="0.4" />
              <rect x="46" y="-2" width="6" height="16" opacity="0.9" />
            </g>
          )}
          {figure === "map" && (
            <g transform="translate(150 150)" opacity="0.9">
              <path
                d="M-70 30 L-40 -20 L0 10 L40 -30 L70 20 L40 40 L0 20 Z"
                fill="none"
                stroke="#081119"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <circle cx="-40" cy="-20" r="4" fill={LODGE.copper} />
              <circle cx="40" cy="-30" r="4" fill={LODGE.copper} />
              <circle cx="0" cy="10" r="3" fill="#081119" />
            </g>
          )}
          {figure === "river" && (
            <g transform="translate(170 150)" opacity="0.9">
              <path
                d="M-40 20 C -10 -6, 30 -6, 60 20"
                stroke="#081119"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M-40 20 L-50 12 L-48 26 Z" fill="#081119" />
            </g>
          )}

          {/* thin evening light ripple */}
          <path
            d="M40 96 C 140 80, 260 130, 380 100"
            stroke="#f2ede2"
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
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1420]/70 to-transparent" />
      )}

      {/* caption + honest chip: "Sample photo" over real imagery, "Illustration"
          over the designed SVG art. Both signal the final build uses the
          lodge's own official photography. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="rcl-display text-[15px] font-semibold leading-tight text-[#f2ede2] drop-shadow-[0_1px_3px_rgba(10,20,32,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#c9793f]/45 bg-[#0a1420]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f2ede2]/90 backdrop-blur-sm">
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
// LIVE "DILLINGHAM RIGHT NOW" CONDITIONS — the showpiece. Re-exported from
// conditions.tsx (a "use client" component): attempts a live PADL observation,
// decodes it, and falls back to a clearly-labeled sample if unreachable.
// ---------------------------------------------------------------------------
export { LodgeConditions } from "./conditions";
