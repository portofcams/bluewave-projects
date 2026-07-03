// Shared presentational pieces for the Yukon Quest 2027 sample information hub.
//
// Honest framing: this is a sample built on public information, NOT an official
// Yukon Quest Alaska product. A couple of image slots use GENERIC, license-clean
// Alaska sled-dog / winter scenery from Wikimedia Commons (Creative Commons,
// license-verified and credited on-page + in the SampleNote; see
// /public/demos/yukon/CREDITS.md); every other slot keeps tasteful DESIGNED SVG
// placeholder art. No Iditarod imagery, no Yukon Quest event photo, and no
// identifiable musher/community member is used — slots that could misrepresent a
// specific checkpoint or community keep the SVG. An honest note states the final
// build uses the organization's own or licensed photography and logo. Nothing
// here is copied or imported from any other demo folder; this file is a
// self-contained copy adapted for the Yukon Quest.
//
// THEME: "Rugged heritage" — a vintage race-poster look on a warm cream paper
// canvas, deep spruce ink, rust/oxblood accents, and an aged-gold seal. It is
// the same family of aesthetic used across the BlueWave heritage demos, but
// every token, seal, and motif here is Yukon-Quest-specific (Interior Alaska,
// Fairbanks, the gold-rush mail trail, the "kept the trail alive" pride) and
// this file does not import from any sibling demo.
//
// SCOPING RULE: every style this file injects is namespaced under the
// `.yq-heritage` wrapper class (see <HeritageShell>). There are NO bare
// body/html/:root/h1/h2 selectors, so nothing leaks to the rest of
// bluewaveprojects.com. Pages MUST wrap content in <HeritageShell>.

import type { CSSProperties } from "react";

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/yukon-quest-2027";

// Page-local heritage palette (Yukon Quest edition). Kept intentionally close to
// the heritage family so the look is consistent, but this is its own copy.
export const QUEST = {
  paper: "#F3EAD7", // warm cream canvas
  paperDeep: "#efe3c9", // shaded cream (gradients / card wells)
  kraft: "#e6d7ba", // aged kraft tone
  ink: "#1f3d2f", // deep spruce ink (body text)
  inkDark: "#14241c", // darker spruce for small text
  spruce: "#1f3d2f", // primary accent (spruce green)
  spruceDeep: "#152a20", // deep spruce (borders / shadows)
  rust: "#B5502A", // secondary accent (rust / oxblood)
  rustDeep: "#7d3517", // shaded rust (button borders)
  gold: "#C08A2D", // aged gold (seal ring)
  muted: "#6b5f4a", // muted warm brown (captions / meta)
  border: "#d8c9a8", // hairline on cream
  text: "#1f3d2f",
} as const;

// Accent keys used by the SVG placeholder art wells.
export type QuestAccent = "trail" | "gold" | "aurora" | "river";

export const accentGradient: Record<QuestAccent, string> = {
  trail: "from-[#2b4d3b] via-[#1f3d2f] to-[#152a20]",
  gold: "from-[#c9922f] via-[#8a6320] to-[#1f3d2f]",
  aurora: "from-[#2b4d3b] via-[#1f3d2f] to-[#14241c]",
  river: "from-[#3a5c49] via-[#1f3d2f] to-[#152a20]",
};

// ---------------------------------------------------------------------------
// REAL, LICENSE-VERIFIED PHOTOGRAPHY
// ---------------------------------------------------------------------------
// Each image below was verified on Wikimedia Commons (via the Commons API)
// before use, with its author + source URL + exact license recorded in
// /public/demos/yukon/CREDITS.md. Only GENERIC, license-clean Alaska sled-dog /
// winter scenery is used here — deliberately NO Iditarod-labeled photo, NO
// copyrighted Yukon Quest event photo, NO identifiable competitor/musher, and NO
// identifiable Interior Alaska village residents. Slots that would misrepresent a
// specific checkpoint or community keep their designed SVG art instead (see
// CREDITS.md). CC-BY / CC-BY-SA images carry an on-image credit chip AND a line
// in the SampleNote. Files live only in /public/demos/yukon/.
export type QuestImage = {
  /** /public path */
  src: string;
  /** short credit shown on-image when attribution is required (CC) */
  credit?: string;
  /** full credit + license + source for the SampleNote */
  attribution?: string;
  /** how it should be framed in the placeholder box */
  position?: string;
  /** true for US-Government public-domain works (no attribution required) */
  publicDomain?: boolean;
};

export const questImages: Record<string, QuestImage> = {
  // Sled-dog team on a sunlit winter trail, black-spruce treeline behind —
  // "Husky adventure, White Mountains, Alaska" (Interior Alaska, north of
  // Fairbanks). Markus Trienke, CC BY-SA 2.0.
  // https://commons.wikimedia.org/wiki/File:Alaska_2020-0296_(50790684031).jpg
  hero: {
    src: "/demos/yukon/hero-team.webp",
    credit: "Photo: Markus Trienke (CC BY-SA 2.0)",
    attribution:
      "Hero — sled-dog team on a winter trail, White Mountains, Interior Alaska. Photo by Markus Trienke, CC BY-SA 2.0, via Wikimedia Commons. Generic Alaska sled-dog scenery — not a Yukon Quest event photo.",
    position: "center 42%",
  },
  // Sled-dog team at rest in a snowy spruce forest — "Husky adventure, White
  // Mountains, Alaska" (Interior Alaska). Markus Trienke, CC BY-SA 2.0.
  // https://commons.wikimedia.org/wiki/File:Alaska_2020-0374_(50790799787).jpg
  trail: {
    src: "/demos/yukon/trail-team.webp",
    credit: "Photo: Markus Trienke (CC BY-SA 2.0)",
    attribution:
      "The race — sled-dog team at rest in the spruce, White Mountains, Interior Alaska. Photo by Markus Trienke, CC BY-SA 2.0, via Wikimedia Commons. Generic Alaska sled-dog scenery — not a Yukon Quest event photo.",
    position: "center 45%",
  },
};

// ---------------------------------------------------------------------------
// HERITAGE SHELL — the scoped wrapper every page mounts its content inside.
// ---------------------------------------------------------------------------
/**
 * Wraps page content in the `.yq-heritage` namespace and injects ONE scoped
 * <style> block: vintage display fonts imported INSIDE the shell, a pure-CSS
 * warm cream paper texture, the display-font helpers, the ticket-stub card
 * styles, and the perforation motifs. Every selector is prefixed with
 * `.yq-heritage`, so nothing leaks site-wide.
 */
export function HeritageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`yq-heritage ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Zilla+Slab:ital,wght@0,400;0,600;0,700;1,500&family=Rye&display=swap');

        /* --- paper canvas + base type (scoped to the shell) --- */
        .yq-heritage {
          position: relative;
          color: ${QUEST.ink};
          font-family: 'Zilla Slab', Georgia, serif;
          line-height: 1.55;
          background-color: ${QUEST.paper};
          background-image:
            radial-gradient(circle at 18% 22%, rgba(181,80,42,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 72% 64%, rgba(31,61,47,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 40% 88%, rgba(20,36,28,.04) 0 1px, transparent 2px),
            repeating-linear-gradient(90deg, rgba(20,36,28,.018) 0 2px, transparent 2px 5px),
            repeating-linear-gradient(0deg, rgba(20,36,28,.02) 0 2px, transparent 2px 6px),
            linear-gradient(135deg, #f6eeda 0%, ${QUEST.paperDeep} 100%);
        }
        .yq-heritage ::selection { background: rgba(181,80,42,.22); }

        /* The shared site Nav is styled for dark pages; on cream it washes out.
           Re-ink the links — but leave any link carrying its own bg untouched. */
        .yq-heritage nav a { color: rgba(31,61,47,.72); }
        .yq-heritage nav a:hover { color: ${QUEST.ink}; }
        .yq-heritage nav a[class*="bg-"] { color: #F3EAD7; }
        .yq-heritage nav a[class*="bg-"]:hover { color: #F3EAD7; }

        /* --- display type helpers --- */
        .yq-heritage .yq-display {
          font-family: 'Oswald', 'Zilla Slab', sans-serif;
          text-transform: uppercase;
          letter-spacing: .02em;
        }
        .yq-heritage .yq-eyebrow {
          font-family: 'Oswald', sans-serif;
          text-transform: uppercase;
          letter-spacing: .4em;
          font-weight: 600;
          font-size: 12px;
          color: ${QUEST.rust};
        }
        .yq-heritage .yq-fancy { font-family: 'Rye', 'Oswald', serif; }

        /* --- dashed section rule (vintage perforation motif) --- */
        .yq-heritage .yq-perf-rule {
          width: 120px; height: 3px; margin: 16px auto 0;
          background: repeating-linear-gradient(90deg, ${QUEST.spruce} 0 10px, transparent 10px 16px);
        }

        /* --- TICKET-STUB CARD ---------------------------------------------- */
        .yq-heritage .yq-ticket {
          position: relative;
          background: linear-gradient(180deg, #fbf5e6, ${QUEST.paperDeep});
          border: 2px solid ${QUEST.spruce};
          box-shadow: 6px 6px 0 rgba(31,61,47,.18);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .yq-heritage .yq-ticket:hover {
          transform: translateY(-5px);
          box-shadow: 9px 12px 0 rgba(31,61,47,.22);
        }
        .yq-heritage .yq-ticket::before,
        .yq-heritage .yq-ticket::after {
          content: ""; position: absolute; width: 22px; height: 22px;
          border-radius: 50%;
          background: ${QUEST.paper};
          border: 2px solid ${QUEST.spruce};
          top: 58%; transform: translateY(-50%); z-index: 3;
        }
        .yq-heritage .yq-ticket::before { left: -13px; }
        .yq-heritage .yq-ticket::after  { right: -13px; }
        .yq-heritage .yq-stub-tear { border-bottom: 2px dashed ${QUEST.spruce}; }
        .yq-heritage .yq-stub-foot { border-top: 2px dashed rgba(31,61,47,.4); }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEAL — circular vintage stamp for the Yukon Quest Alaska hub.
// ---------------------------------------------------------------------------
/**
 * A self-contained CSS/SVG seal. Gold ring on a spruce disc, curved text top &
 * bottom. Yukon-Quest-specific copy: "Yukon Quest Alaska · Interior Alaska" and
 * a "750 MILES" core. Purely presentational (aria-hidden). Carries its own
 * inline colors so it does not depend on <HeritageShell>.
 */
export function Seal({
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
        transform: "rotate(-8deg)",
        background: `radial-gradient(circle at 50% 45%, rgba(243,234,215,.14), ${QUEST.spruceDeep} 72%), ${QUEST.spruce}`,
        border: `3px solid ${QUEST.paper}`,
        boxShadow: `0 0 0 6px ${QUEST.gold}, 0 0 0 8px ${QUEST.paper}, 0 14px 34px rgba(0,0,0,.45)`,
      }}
      aria-label="Yukon Quest Alaska — Interior Alaska sled-dog race"
    >
      <svg
        viewBox="0 0 230 230"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <path id="yq-seal-arc-top" d="M 30 115 A 85 85 0 0 1 200 115" fill="none" />
          <path id="yq-seal-arc-bot" d="M 34 115 A 81 81 0 0 0 196 115" fill="none" />
        </defs>
        <text
          fill={QUEST.paper}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "12px",
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#yq-seal-arc-top" startOffset="50%" textAnchor="middle">
            Yukon Quest Alaska
          </textPath>
        </text>
        <text
          fill={QUEST.paper}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <textPath href="#yq-seal-arc-bot" startOffset="50%" textAnchor="middle">
            Fairbanks · Interior Alaska
          </textPath>
        </text>
        <circle cx="115" cy="115" r="70" fill="none" stroke={QUEST.gold} strokeWidth="1.5" opacity="0.8" />
      </svg>
      <div
        className="relative text-center"
        style={{
          color: QUEST.paper,
          fontFamily: "'Oswald', sans-serif",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "block", fontSize: 10, letterSpacing: "0.24em" }}>
          The
        </span>
        <b
          style={{
            display: "block",
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1,
            color: QUEST.rust,
            textShadow: "0 1px 2px rgba(0,0,0,.6)",
          }}
        >
          750
        </b>
        <span
          style={{
            display: "block",
            fontSize: 10.5,
            letterSpacing: "0.26em",
            marginTop: 6,
            color: "#e9dcbf",
          }}
        >
          Mile Trail
        </span>
      </div>
    </div>
  );
}

/**
 * Photo block. When an `imageKey` resolves to a license-verified photo (see
 * `questImages`), the real image is shown behind a warm heritage spruce/rust
 * wash + sepia grade so text stays readable and the photo sits in the palette.
 * When no verified image exists for a slot, this gracefully falls back to the
 * designed spruce/gold woodcut SVG art (aurora arc, snow drifts, a winding trail,
 * and a sled-dog team + musher silhouette) — never an empty hole, never an
 * unverified or misrepresenting image. An honest caption chip either carries the
 * required photo credit or signals that the live build swaps in Yukon Quest
 * Alaska's own official photography and logo. Nothing hotlinked.
 */
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  imageKey,
  stub = false,
}: {
  accent: QuestAccent;
  label: string;
  className?: string;
  tall?: boolean;
  /** key into questImages — e.g. "hero" or "trail" */
  imageKey?: string;
  stub?: boolean;
}) {
  const img = imageKey ? questImages[imageKey] : undefined;

  return (
    <div
      className={`group/ph relative overflow-hidden bg-gradient-to-br ${accentGradient[accent]} ${
        stub
          ? "border-2 border-[#1f3d2f] shadow-[6px_6px_0_rgba(31,61,47,0.18)]"
          : "rounded-3xl border border-[#1f3d2f]/25"
      } ${tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"} ${className}`}
      role="img"
      aria-label={
        img
          ? `Yukon Quest — ${label}`
          : `Yukon Quest illustration placeholder — ${label}`
      }
    >
      {/* Real, license-verified photo (when available) behind a warm heritage
          wash. The sepia grade + spruce/rust multiply layer keep the caption
          legible and pull every photo into the cream/spruce palette. */}
      {img && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover/ph:scale-[1.04]"
            style={{
              objectPosition: img.position ?? "center",
              filter: "sepia(.1) saturate(1) contrast(1.05) brightness(1.06)",
            }}
          />
          {/* subtle spruce tint (NORMAL blend — no multiply, which crushed the
              bright B&W snow/sky) + a bottom vignette for label legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f3d2f]/22 via-[#1f3d2f]/8 to-[#14241c]/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14241c]/85 via-[#14241c]/8 to-transparent" />
        </>
      )}

      {/* Woodcut aurora arc + snow drift + a sled team on the trail. Always
          rendered: it is the fallback art when no verified photo exists, and a
          subtle texture layer (dimmed) when a real photo sits behind it. Inline
          SVG in cream/gold on spruce — nothing hotlinked. */}
      <svg
        className={`absolute inset-0 h-full w-full transition-opacity ${
          img ? "opacity-0" : "opacity-100"
        }`}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`yq-aurora-${accent}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C08A2D" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#e9dcbf" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#B5502A" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`yq-glow-${accent}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F3EAD7" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#F3EAD7" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill={`url(#yq-glow-${accent})`} />

        {/* aurora ribbons (aged-gold woodcut arcs) */}
        <path
          d="M-20 60 C 80 20, 160 90, 250 50 S 420 30, 440 70"
          stroke={`url(#yq-aurora-${accent})`}
          strokeWidth="34"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M-20 95 C 90 70, 180 120, 260 88 S 420 78, 440 104"
          stroke={`url(#yq-aurora-${accent})`}
          strokeWidth="20"
          fill="none"
          opacity="0.7"
        />

        {/* stars (cream flecks) */}
        {[28, 72, 150, 210, 300, 360, 120, 250].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={18 + (i % 4) * 14}
            r={i % 3 === 0 ? 1.4 : 0.9}
            fill="#F3EAD7"
            opacity="0.6"
          />
        ))}

        {/* snow horizon / drifts (cream) */}
        <path
          d="M0 210 C 70 196, 130 224, 210 208 S 340 196, 400 214 L400 300 L0 300 Z"
          fill="#F3EAD7"
          opacity="0.10"
        />
        <path
          d="M0 240 C 90 226, 150 256, 230 240 S 350 230, 400 246 L400 300 L0 300 Z"
          fill="#F3EAD7"
          opacity="0.15"
        />

        {/* black spruce treeline (Interior Alaska motif) */}
        <g fill="#14241c" opacity="0.5">
          {[20, 52, 300, 340, 372].map((x, i) => (
            <path
              key={x}
              transform={`translate(${x} ${196 - (i % 2) * 6})`}
              d="M0 26 L5 10 L2 12 L6 0 L10 12 L7 10 L12 26 Z"
            />
          ))}
        </g>

        {/* trail line winding to the horizon (cream dashes) */}
        <path
          d="M40 286 C 120 262, 150 250, 200 244 S 280 234, 318 226"
          stroke="#F3EAD7"
          strokeWidth="1.4"
          strokeDasharray="2 6"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />

        {/* a sled dog team + musher woodcut silhouette on the trail */}
        <g fill="#14241c" opacity="0.85" transform="translate(86 232) scale(1.05)">
          <path d="M2 14 L120 4" stroke="#14241c" strokeWidth="1" opacity="0.5" fill="none" />
          {[112, 86, 60, 34].map((x) => (
            <g key={x} transform={`translate(${x} 6)`}>
              <ellipse cx="0" cy="4" rx="7" ry="3.4" />
              <circle cx="6.5" cy="2" r="2.4" />
              <path d="M-6 6 L-9 11 M-2 6 L-4 12 M3 6 L2 12 M6 6 L7 11" stroke="#14241c" strokeWidth="1" />
              <path d="M-7 3 L-11 1" stroke="#14241c" strokeWidth="1.3" />
            </g>
          ))}
          <g transform="translate(-2 0)">
            <path d="M-12 14 L8 12" stroke="#14241c" strokeWidth="1.6" />
            <path d="M-12 14 L-15 8 M-10 14 L-12 6" stroke="#14241c" strokeWidth="1.4" />
            <ellipse cx="-13" cy="2" rx="2.6" ry="3.4" />
            <rect x="-15" y="5" width="5" height="6" rx="1.5" />
          </g>
        </g>
      </svg>

      {/* Soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#14241c]/60 to-transparent" />

      {/* Honest caption. With a real photo it carries the required license
          credit; without one it signals the final build uses Yukon Quest
          Alaska's own official image. */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="yq-display text-[13px] font-semibold leading-tight tracking-[0.02em] text-[#F3EAD7] drop-shadow-sm">
            {label}
          </span>
          {img?.credit ? (
            // CC images: on-image attribution chip (required by license).
            <span className="inline-flex shrink-0 items-center rounded-sm border border-[#F3EAD7]/25 bg-[#14241c]/45 px-2.5 py-1 text-[9px] font-medium leading-tight text-[#F3EAD7]/90 backdrop-blur-sm">
              {img.credit}
            </span>
          ) : (
            // SVG fallback: signal the live build swaps in Yukon Quest art.
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-[#C08A2D]/45 bg-[#1f3d2f]/40 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#F3EAD7]/90 backdrop-blur-sm">
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

/**
 * Page-local hero motion: gentle falling flecks, a soft aged-gold aurora
 * shimmer, and a spruce sled-dog team + musher woodcut running across on a slow
 * seamless loop. CSS/SVG only — no JS, no canvas, no new deps. All keyframes /
 * classes are namespaced `yq-*` and defined in a scoped <style> block. Every
 * animation is wrapped in `prefers-reduced-motion: no-preference`; reduced-motion
 * users get a still scene. aria-hidden + pointer-events:none throughout.
 */
export function QuestMotion() {
  const flakes = [
    { l: "6%", s: 2.2, d: 13, delay: 0, o: 0.5 },
    { l: "15%", s: 1.4, d: 18, delay: 4, o: 0.4 },
    { l: "24%", s: 2.8, d: 11, delay: 1.5, o: 0.55 },
    { l: "33%", s: 1.6, d: 16, delay: 6, o: 0.38 },
    { l: "42%", s: 2.0, d: 14, delay: 2.5, o: 0.5 },
    { l: "51%", s: 1.3, d: 20, delay: 8, o: 0.35 },
    { l: "60%", s: 2.6, d: 12, delay: 3.5, o: 0.55 },
    { l: "69%", s: 1.7, d: 17, delay: 5.5, o: 0.42 },
    { l: "78%", s: 2.3, d: 13, delay: 0.8, o: 0.5 },
    { l: "87%", s: 1.5, d: 19, delay: 7, o: 0.4 },
    { l: "94%", s: 2.1, d: 15, delay: 2, o: 0.48 },
    { l: "11%", s: 1.2, d: 22, delay: 9, o: 0.32 },
    { l: "47%", s: 1.4, d: 21, delay: 10, o: 0.34 },
    { l: "83%", s: 1.3, d: 23, delay: 11, o: 0.33 },
  ];

  return (
    <div className="yq-motion pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="yq-aurora absolute inset-x-0 top-0 h-2/3" />

      <div className="absolute inset-0 overflow-hidden">
        {flakes.map((f, i) => (
          <span
            key={i}
            className="yq-flake absolute -top-2 rounded-full bg-[#F3EAD7]"
            style={
              {
                left: f.l,
                width: `${f.s}px`,
                height: `${f.s}px`,
                opacity: f.o,
                ["--yq-fall" as string]: `${f.d}s`,
                ["--yq-delay" as string]: `${f.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="yq-team-track absolute bottom-[12%] left-0 w-[42%] max-w-[520px] min-w-[300px]">
        <svg viewBox="0 0 320 70" className="h-auto w-full" fill="none" aria-hidden="true">
          <path d="M14 52 L300 40" stroke="#1f3d2f" strokeWidth="1.4" opacity="0.55" />
          {[300, 268, 236, 204, 172, 140, 108, 76].map((x, i) => (
            <g key={x} transform={`translate(${x} ${40 + i * 1.6})`} fill="#1f3d2f" opacity="0.88">
              <ellipse cx="0" cy="6" rx="11" ry="5" />
              <circle cx="10" cy="2.5" r="3.6" />
              <path d="M12.5 0.5 L15.5 -2.5" stroke="#1f3d2f" strokeWidth="1.6" />
              <path d="M-11 4 L-15 1" stroke="#1f3d2f" strokeWidth="2" />
              <g className="yq-legs">
                <path d="M-8 10 L-10 18 M-3 10 L-5 19 M3 10 L4 18 M8 10 L10 19" stroke="#1f3d2f" strokeWidth="1.7" />
              </g>
            </g>
          ))}
          <g transform="translate(40 38)" fill="#1f3d2f" opacity="0.9">
            <path d="M-22 16 L10 12" stroke="#1f3d2f" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M-22 16 L-27 6 M-18 16 L-23 4" stroke="#1f3d2f" strokeWidth="2" />
            <ellipse cx="-24" cy="-2" rx="3.6" ry="4.6" />
            <rect x="-27" y="2" width="6.5" height="10" rx="2.2" />
            <path d="M-21 5 L-13 9" stroke="#1f3d2f" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <style>{`
        .yq-team-track { transform: translateX(58%); opacity: 0.16; }
        .yq-aurora {
          background:
            radial-gradient(120% 80% at 20% 0%, rgba(192,138,45,0.18), transparent 60%),
            radial-gradient(120% 90% at 75% 0%, rgba(181,80,42,0.13), transparent 62%);
          opacity: 0.8;
          filter: blur(2px);
        }
        .yq-flake { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .yq-flake {
            display: block;
            animation: yq-fall var(--yq-fall, 16s) linear infinite;
            animation-delay: var(--yq-delay, 0s);
          }
          @keyframes yq-fall {
            0%   { transform: translate(0, -10px); }
            100% { transform: translate(14px, 105vh); }
          }

          .yq-aurora { animation: yq-shimmer 14s ease-in-out infinite; }
          @keyframes yq-shimmer {
            0%, 100% { opacity: 0.55; transform: translateX(-2%) scaleY(1); }
            50%      { opacity: 0.95; transform: translateX(3%) scaleY(1.08); }
          }

          .yq-team-track { opacity: 0.18; animation: yq-run 30s linear infinite; }
          @keyframes yq-run {
            0%   { transform: translateX(-65%); }
            100% { transform: translateX(255%); }
          }

          .yq-legs { animation: yq-gait 0.5s steps(2, jump-none) infinite; transform-origin: center; }
          @keyframes yq-gait {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-0.8px); }
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Sample disclaimer shown at the foot of the hub, per the brief. States plainly
 * that all imagery is designed placeholder art, that dates/details are grounded
 * on public info with [confirm] tags where 2027 isn't yet published, and that
 * the page is not affiliated with or endorsed by Yukon Quest Alaska.
 */
export function SampleNote() {
  // Credits for the openly-licensed photography actually used on this sample,
  // drawn from the single source of truth in `questImages` so they can never
  // drift from what is rendered.
  const credits = Object.values(questImages)
    .map((i) => i.attribution)
    .filter((a): a is string => Boolean(a));

  return (
    <div className="mx-auto max-w-5xl px-6 pb-12">
      <div className="rounded-sm border-2 border-[#1f3d2f]/30 bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] px-5 py-4 text-center text-xs leading-relaxed text-[#6b5f4a] shadow-[4px_4px_0_rgba(31,61,47,0.12)]">
        <p>
          A few slots on this sample use{" "}
          <span className="font-semibold text-[#1f3d2f]">
            openly-licensed, generic Alaska sled-dog and winter scenery
          </span>{" "}
          (Creative Commons photos, credited below); every remaining slot is{" "}
          <span className="font-semibold text-[#1f3d2f]">
            designed placeholder illustration
          </span>
          . No Iditarod imagery, no Yukon Quest event photo, and no identifiable
          musher or community member is used. The final build would use{" "}
          <span className="font-semibold text-[#1f3d2f]">
            Yukon Quest Alaska&apos;s own or licensed photography
          </span>{" "}
          and logo in their place. This information hub was built by{" "}
          <a
            href={SITE}
            className="font-semibold text-[#B5502A] underline underline-offset-2 hover:text-[#7d3517]"
          >
            BlueWave Projects
          </a>{" "}
          on public information. Items marked{" "}
          <span className="rounded-sm bg-[#1f3d2f]/8 px-1 py-0.5 font-mono text-[#B5502A]">
            [confirm]
          </span>{" "}
          are real recurring details whose exact 2027 dates or figures were not
          yet officially published when this sample was made — always verify with
          Yukon Quest Alaska before making plans. This page is not affiliated with
          or endorsed by Yukon Quest Alaska.
        </p>

        {credits.length > 0 && (
          <details className="mt-3 text-left">
            <summary className="yq-display cursor-pointer text-center text-[11px] font-semibold tracking-[0.14em] text-[#1f3d2f] marker:content-none">
              Image credits &amp; licenses
            </summary>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#8a7d63]">
              {credits.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}
