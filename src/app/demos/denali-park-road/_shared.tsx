// Shared presentational pieces for the "Denali Park Road" sample / portfolio
// INFORMATION HUB.
//
// HONEST FRAMING (per brief): this is a SAMPLE built on PUBLIC information by
// BlueWave Projects. It is NOT an official National Park Service product and is
// NOT affiliated with or endorsed by the NPS. It's a visitor-info hub — a
// portfolio / inbound piece. A real pitch target would be a Denali-area lodge or
// tour operator, NOT the NPS. All photos are license-clean public-domain NPS
// imagery from Wikimedia Commons (see /public/demos/denali/CREDITS.md), used as
// sample placeholders — a final build would use official NPS information and
// licensed photography. No identifiable people as subjects.
//
// ROAD/LOTTERY STATUS IS FLUID. Nothing here asserts a settled open/closed
// state; every year-specific or changeable fact is marked [confirm] and readers
// are pointed to the official NPS Current Conditions page for live status.
//
// THEME: national-park / interior-Alaska. Topographic contour lines, a
// tundra-autumn palette (September = the historic Road Lottery season = fall
// colors), and the mountain. Deliberately distinct from the sibling demos (the
// aviation sectional-chart hub, the ocean hub) to prove range.
//
// SCOPING RULE: every style injected here is namespaced under the `.dena-topo`
// wrapper class (see <TopoShell>). No bare body/html/:root/h1/h2 selectors, so
// nothing leaks to the rest of bluewaveprojects.com. Pages MUST wrap content in
// <TopoShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/denali-park-road";
export const NPS_CONDITIONS_URL =
  "https://www.nps.gov/dena/planyourvisit/conditions.htm";
export const NPS_ROAD_LOTTERY_URL =
  "https://www.nps.gov/dena/planyourvisit/road-lottery.htm";
export const NPS_POLYCHROME_URL =
  "https://www.nps.gov/dena/getinvolved/polychrome-plan.htm";
export const RECREATION_GOV_URL = "https://www.recreation.gov";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — interior-Alaska tundra autumn
// ---------------------------------------------------------------------------
export const TUNDRA = {
  // deep spruce / night
  spruce: "#1d2b21", // deepest spruce-forest ink
  pine: "#26382b", // dark pine
  moss: "#3d5a44", // mossy green
  sage: "#6e8a6f", // faded sage
  // tundra-autumn warmth
  tundra: "#b4622b", // burnt-orange tundra
  amber: "#d98a3d", // autumn amber
  gold: "#e6b34e", // birch gold
  crowberry: "#7a2f3a", // crowberry / bearberry red
  // stone / mountain
  granite: "#7d8790", // granite grey
  snow: "#f2efe6", // snowfield / paper white
  glacier: "#a9c4cf", // pale glacier blue-grey
  // canvas
  canvas: "#f4f1e8", // warm tundra-paper canvas
  canvasDeep: "#e6e0d1", // shaded canvas
  card: "#faf8f1", // lightest card
  // text
  ink: "#22301f", // deep spruce ink (body)
  inkSoft: "#4a5a48", // muted moss-grey
  muted: "#7a8676", // captions / meta
} as const;

// Accent keys used across cards. Each maps to a duotone tundra/spruce well.
export type TopoAccent = "spruce" | "moss" | "tundra" | "gold" | "granite" | "crowberry";

export const accentGradient: Record<TopoAccent, string> = {
  spruce: "from-[#26382b] via-[#1d2b21] to-[#141f18]",
  moss: "from-[#3d5a44] via-[#26382b] to-[#1d2b21]",
  tundra: "from-[#b4622b] via-[#8a4a24] to-[#26382b]",
  gold: "from-[#d98a3d] via-[#b4622b] to-[#26382b]",
  granite: "from-[#7d8790] via-[#4a5a48] to-[#26382b]",
  crowberry: "from-[#7a2f3a] via-[#5a2731] to-[#26382b]",
};

// ---------------------------------------------------------------------------
// TOPO CONTOUR field — a reusable decorative SVG of topographic contour lines.
// Purely decorative; the national-park map motif that ties the theme together.
// ---------------------------------------------------------------------------
export function TopoLines({
  className = "",
  stroke = "#f2efe6",
  opacity = 0.14,
}: {
  className?: string;
  stroke?: string;
  opacity?: number;
}) {
  // A set of nested, organically-offset contour rings suggesting a summit +
  // ridgelines. Hand-tuned paths — no data, just the look of a topo map.
  const rings = [
    "M120 470 C 260 380, 520 360, 720 300 C 900 246, 1040 300, 1160 260",
    "M100 420 C 280 330, 520 320, 700 258 C 880 200, 1020 250, 1180 210",
    "M140 370 C 300 296, 520 280, 690 220 C 860 164, 1000 206, 1160 168",
    "M180 322 C 330 258, 520 240, 670 190 C 820 140, 960 172, 1120 138",
    "M240 280 C 370 224, 520 206, 650 166 C 780 128, 900 150, 1050 120",
    "M320 244 C 420 200, 520 182, 630 150 C 740 120, 840 136, 970 112",
    "M410 214 C 480 186, 540 172, 620 150 C 700 130, 780 138, 890 118",
  ];
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 1280 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      {rings.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={i % 2 === 0 ? 1.3 : 0.8}
        />
      ))}
      {/* a couple of index-contour ticks for map flavor */}
      <circle cx="640" cy="150" r="3" fill={stroke} />
      <circle cx="720" cy="182" r="2" fill={stroke} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// TOPO SHELL — scoped wrapper. Injects ONE <style> block, all namespaced under
// `.dena-topo`. Paints a warm tundra-paper canvas with a faint contour texture,
// defines the display font + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function TopoShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`dena-topo ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- warm tundra-paper canvas + faint contour texture (scoped) --- */
        .dena-topo {
          position: relative;
          color: ${TUNDRA.ink};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${TUNDRA.canvas};
          background-image:
            radial-gradient(circle at 78% 8%, rgba(214,138,61,.10) 0 2px, transparent 3px),
            radial-gradient(ellipse 60% 40% at 20% 100%, rgba(61,90,68,.08), transparent 60%),
            linear-gradient(160deg, ${TUNDRA.card} 0%, ${TUNDRA.canvasDeep} 100%);
        }
        .dena-topo ::selection { background: rgba(214,138,61,.24); }

        /* Site Nav is styled for dark pages (white links); on the warm canvas
           they wash out. Re-ink them, but leave any link carrying its own bg
           (the CTA) alone. */
        .dena-topo nav a { color: rgba(34,48,31,.74); }
        .dena-topo nav a:hover { color: ${TUNDRA.ink}; }
        .dena-topo nav a[class*="bg-"] { color: ${TUNDRA.snow}; }
        .dena-topo nav a[class*="bg-"]:hover { color: ${TUNDRA.snow}; }

        /* --- display type helpers --- */
        .dena-topo .dena-display {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          letter-spacing: -0.012em;
        }
        .dena-topo .dena-eyebrow {
          font-family: 'Inter', sans-serif;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-weight: 700;
          font-size: 12px;
          color: ${TUNDRA.tundra};
        }
        /* --- mono meta (mile-marker / trail-sign voice) --- */
        .dena-topo .dena-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* --- thin tundra rule --- */
        .dena-topo .dena-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${TUNDRA.gold}, ${TUNDRA.tundra});
        }

        /* --- tundra card (on canvas) --- */
        .dena-topo .dena-card {
          position: relative;
          background: linear-gradient(180deg, ${TUNDRA.card}, ${TUNDRA.canvasDeep});
          border: 1px solid rgba(61,90,68,.18);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(29,43,33,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .dena-topo a.dena-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(29,43,33,.55);
        }

        /* --- glass tile used inside the dark conditions panel --- */
        .dena-topo .dena-glass {
          background: rgba(242,239,230,.06);
          border: 1px solid rgba(242,239,230,.14);
          border-radius: 14px;
          backdrop-filter: blur(4px);
        }

        /* --- status callout accents --- */
        .dena-topo .dena-alert {
          border: 1px solid rgba(180,98,43,.4);
          background: linear-gradient(180deg, rgba(214,138,61,.10), rgba(180,98,43,.05));
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MOUNTAIN SEAL — a circular "the high one" emblem. Self-contained CSS/SVG:
// a snow-capped summit disc ringed with contour text. Purely decorative — a
// generic mountain motif, NOT an NPS arrowhead or any official mark.
// ---------------------------------------------------------------------------
export function MountainSeal({
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
        background: `radial-gradient(circle at 50% 30%, rgba(242,239,230,.14), ${TUNDRA.spruce} 72%), ${TUNDRA.pine}`,
        border: `3px solid ${TUNDRA.snow}`,
        boxShadow: `0 0 0 5px ${TUNDRA.gold}, 0 0 0 7px ${TUNDRA.snow}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Denali — the high one — sample mountain emblem"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="dena-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="dena-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={TUNDRA.snow}
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "13px",
            letterSpacing: "2.6px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#dena-arc-top" startOffset="50%" textAnchor="middle">
            Denali · The High One
          </textPath>
        </text>
        <text
          fill={TUNDRA.gold}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          <textPath href="#dena-arc-bot" startOffset="50%" textAnchor="middle">
            Interior Alaska · 20,310 ft
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={TUNDRA.gold} strokeWidth="1.3" opacity="0.7" />
      </svg>
      {/* core: snow-capped summit glyph */}
      <svg viewBox="0 0 100 100" style={{ width: size * 0.42, height: size * 0.42 }} aria-hidden="true">
        {/* back ridge */}
        <path d="M8 76 L34 40 L52 60 L70 30 L92 76 Z" fill={TUNDRA.granite} opacity="0.55" />
        {/* main massif */}
        <path d="M14 78 L44 26 L62 52 L78 34 L90 78 Z" fill={TUNDRA.snow} opacity="0.9" />
        {/* snow-shadow */}
        <path d="M44 26 L54 40 L44 46 L36 40 Z" fill={TUNDRA.glacier} opacity="0.7" />
        <path d="M78 34 L86 52 L74 50 Z" fill={TUNDRA.glacier} opacity="0.6" />
        {/* tundra base line */}
        <rect x="8" y="76" width="84" height="4" rx="2" fill={TUNDRA.tundra} opacity="0.75" />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO — the feature tile.
//
// When a `photo` (license-clean public-domain NPS image, verified and stored
// under /public/demos/denali/) is supplied, we render that REAL photo behind a
// readable spruce scrim, with the label and an honest chip + on-image credit.
// When NO fitting licensed photo exists, `photo` is omitted and we fall back to
// the designed SVG tundra/mountain art below. Either way the tile carries the
// honest note that the final build swaps in official NPS / licensed photography.
// ---------------------------------------------------------------------------
export type PhotoSrc = {
  /** path under /public, e.g. "/demos/denali/park-road.webp" */
  src: string;
  /** short attribution shown on-image, e.g. "NPS Photo / Emily Mesner · Public domain" */
  credit: string;
  /** object-position, e.g. "center", "50% 30%" */
  position?: string;
};

export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  figure = "peak",
  photo,
}: {
  accent: TopoAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "peak" | "road" | "bus" | "wildlife";
  photo?: PhotoSrc;
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#3d5a44]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={photo ? `${label} — sample photo` : `Illustration placeholder — ${label}`}
    >
      {/* REAL PHOTO branch — license-clean image behind a readable spruce scrim */}
      {photo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={`${label} — sample Denali photo`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
          {/* spruce scrim: keeps the palette + makes the label legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#141f18]/35 via-[#1d2b21]/22 to-[#141f18]/45" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#141f18]/85 via-[#141f18]/35 to-transparent" />
          {/* on-image credit (top-left, unobtrusive) */}
          <span className="absolute left-3 top-3 rounded-full bg-[#141f18]/55 px-2 py-0.5 text-[9px] font-medium tracking-[0.04em] text-[#f2efe6]/80 backdrop-blur-sm">
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
            <radialGradient id={`dena-sun-${accent}`} cx="76%" cy="22%" r="40%">
              <stop offset="0%" stopColor="#f6e2b0" stopOpacity="0.85" />
              <stop offset="55%" stopColor={TUNDRA.gold} stopOpacity="0.45" />
              <stop offset="100%" stopColor={TUNDRA.gold} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`dena-sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cfe0e6" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#cfe0e6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* sky wash + low autumn sun */}
          <rect width="400" height="300" fill={`url(#dena-sky-${accent})`} />
          <circle cx="300" cy="66" r="110" fill={`url(#dena-sun-${accent})`} />
          <circle cx="300" cy="66" r="22" fill="#f6e2b0" opacity="0.8" />

          {/* faint contour lines behind */}
          <g stroke="#f2efe6" strokeWidth="0.7" fill="none" opacity="0.16">
            <path d="M-20 150 C 120 120, 260 132, 420 108" />
            <path d="M-20 176 C 120 146, 260 158, 420 132" />
            <path d="M-20 204 C 120 176, 260 188, 420 160" />
          </g>

          {/* Denali massif — snow-capped */}
          <path d="M-20 232 L70 150 L120 196 L170 120 L232 210 L300 158 L360 200 L440 168 L440 300 L-20 300 Z" fill="#26382b" opacity="0.5" />
          <path d="M60 232 L150 96 L196 160 L236 118 L300 232 Z" fill="#f2efe6" opacity="0.9" />
          <path d="M150 96 L168 124 L150 136 L134 124 Z" fill="#a9c4cf" opacity="0.7" />
          <path d="M236 118 L252 150 L228 150 Z" fill="#a9c4cf" opacity="0.6" />

          {/* tundra foreground */}
          <path d="M-20 238 L80 214 L180 236 L280 210 L440 238 L440 300 L-20 300 Z" fill="#3d5a44" opacity="0.55" />
          <path d="M-20 262 L120 244 L260 266 L440 246 L440 300 L-20 300 Z" fill="#26382b" opacity="0.5" />

          {figure === "road" && (
            <path d="M120 300 L188 236 L214 236 L210 300 Z" fill="#4a5a48" opacity="0.7" />
          )}
          {figure === "bus" && (
            <g transform="translate(168 232)" fill="#3d5a44" opacity="0.92">
              {/* green park bus silhouette */}
              <rect x="-30" y="-14" width="60" height="20" rx="4" />
              <rect x="-24" y="-10" width="48" height="7" rx="2" fill="#a9c4cf" opacity="0.5" />
              <circle cx="-18" cy="8" r="5" fill="#141f18" />
              <circle cx="18" cy="8" r="5" fill="#141f18" />
            </g>
          )}
          {figure === "wildlife" && (
            <g transform="translate(196 236)" fill="#1d2b21" opacity="0.9">
              {/* generic caribou/antlered silhouette */}
              <ellipse cx="0" cy="0" rx="20" ry="9" />
              <path d="M16 -4 Q 26 -8 30 -2" stroke="#1d2b21" strokeWidth="3" fill="none" />
              <path d="M26 -6 L24 -18 M30 -4 L34 -16 M22 -6 L18 -16" stroke="#1d2b21" strokeWidth="2" fill="none" />
              <rect x="-16" y="6" width="3" height="14" />
              <rect x="-6" y="6" width="3" height="14" />
              <rect x="6" y="6" width="3" height="14" />
              <rect x="15" y="6" width="3" height="14" />
            </g>
          )}

          {/* birds */}
          <g stroke="#f2efe6" strokeWidth="1.3" fill="none" opacity="0.4">
            <path d="M60 70 q 6 -6 12 0 q 6 -6 12 0" />
            <path d="M100 54 q 5 -5 10 0 q 5 -5 10 0" />
          </g>
        </svg>
      )}

      {/* soft vignette for caption legibility (SVG art only) */}
      {!photo && (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#141f18]/70 to-transparent" />
      )}

      {/* caption + honest chip: "Sample photo" over real imagery, "Illustration"
          over designed SVG art. Both signal a final build uses official / licensed
          photography. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="dena-display text-[15px] font-semibold leading-tight text-[#f2efe6] drop-shadow-[0_1px_3px_rgba(20,31,24,0.9)]">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e6b34e]/45 bg-[#141f18]/55 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#f2efe6]/90 backdrop-blur-sm">
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
// LIVE "DENALI RIGHT NOW" CONDITIONS — re-exported from conditions.tsx (a
// "use client" component): attempts a live NWS observation near the park
// entrance, and falls back to a clearly-labeled sample if the browser can't
// read it.
// ---------------------------------------------------------------------------
export { DenaliConditions } from "./conditions";
