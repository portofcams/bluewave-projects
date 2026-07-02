// Shared presentational pieces for the Duke's OceanFest sample/proof hub.
//
// HONEST FRAMING (per brief): this is a sample built on public information by
// BlueWave Projects. It is NOT an official Outrigger Duke Kahanamoku Foundation
// (ODKF) product and is not affiliated with or endorsed by them. All imagery is
// DESIGNED SVG placeholder art — no hotlinked or invented photographs. The final
// build would use the organization's own official photography and logo.
//
// THEME: authentic Hawaiian / Waikiki ocean. Deep ocean teal + blue-green,
// warm sand, sunset gold / coral accents. Deliberately NOT a generic corporate
// blue, and deliberately distinct from the Alaska heritage demos (proves range).
//
// SCOPING RULE: every style injected here is namespaced under the `.duke-ocean`
// wrapper class (see <OceanShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <OceanShell>.

import type { CSSProperties } from "react";

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/dukes-oceanfest";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — Waikiki ocean
// ---------------------------------------------------------------------------
export const OCEAN = {
  // deep water
  abyss: "#062a33", // deepest teal ink
  deep: "#0a3d47", // deep ocean teal
  teal: "#0e5561", // ocean teal
  reef: "#1a7d80", // blue-green reef
  lagoon: "#2fb0a3", // bright lagoon green-teal
  foam: "#e8f6f2", // pale foam / near-white
  // sand + warmth
  sand: "#f4ecdc", // warm sand canvas
  sandDeep: "#ece0c8", // shaded sand
  shell: "#fbf6ec", // lightest shell
  // sunset accents
  gold: "#e8a54c", // sunset gold
  coral: "#e8734f", // coral / sunset orange
  coralDeep: "#c9522f", // deep coral
  // text
  ink: "#0b2b31", // deep teal ink (body)
  inkSoft: "#3a5a60", // muted teal-grey
  muted: "#6c7f80", // captions / meta
} as const;

// Accent keys used across event cards. Each maps to a duotone ocean/sunset well.
export type OceanAccent = "wave" | "paddle" | "swim" | "sunset" | "tandem" | "beach";

export const accentGradient: Record<OceanAccent, string> = {
  wave: "from-[#0a3d47] via-[#0e5561] to-[#062a33]",
  paddle: "from-[#0e5561] via-[#1a7d80] to-[#0a3d47]",
  swim: "from-[#0a3d47] via-[#1a7d80] to-[#2fb0a3]",
  sunset: "from-[#c9522f] via-[#e8734f] to-[#0e5561]",
  tandem: "from-[#1a7d80] via-[#2fb0a3] to-[#0e5561]",
  beach: "from-[#e8a54c] via-[#e8734f] to-[#0e5561]",
};

export const accentText: Record<OceanAccent, string> = {
  wave: "text-[#0e5561]",
  paddle: "text-[#1a7d80]",
  swim: "text-[#1a7d80]",
  sunset: "text-[#c9522f]",
  tandem: "text-[#0e5561]",
  beach: "text-[#c9522f]",
};

// ---------------------------------------------------------------------------
// OCEAN SHELL — scoped wrapper. Injects ONE <style> block, all namespaced
// under `.duke-ocean`. Paints the warm-sand canvas with a pure-CSS texture,
// defines the display font + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function OceanShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`duke-ocean ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Outfit:wght@400;500;600;700&display=swap');

        /* --- warm-sand canvas + base type (scoped) --- */
        .duke-ocean {
          position: relative;
          color: ${OCEAN.ink};
          font-family: 'Outfit', system-ui, sans-serif;
          line-height: 1.6;
          background-color: ${OCEAN.sand};
          background-image:
            radial-gradient(circle at 15% 20%, rgba(47,176,163,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 78% 30%, rgba(232,165,76,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 45% 82%, rgba(14,85,97,.04) 0 1px, transparent 2px),
            linear-gradient(160deg, ${OCEAN.shell} 0%, ${OCEAN.sandDeep} 100%);
        }
        .duke-ocean ::selection { background: rgba(232,115,79,.24); }

        /* Site Nav is styled for dark pages (white links); on sand they wash out.
           Re-ink them, but leave any link carrying its own bg (the CTA) alone. */
        .duke-ocean nav a { color: rgba(11,43,49,.72); }
        .duke-ocean nav a:hover { color: ${OCEAN.ink}; }
        .duke-ocean nav a[class*="bg-"] { color: ${OCEAN.foam}; }
        .duke-ocean nav a[class*="bg-"]:hover { color: ${OCEAN.foam}; }

        /* --- display type helpers --- */
        .duke-ocean .duke-display {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .duke-ocean .duke-eyebrow {
          font-family: 'Outfit', sans-serif;
          text-transform: uppercase;
          letter-spacing: .3em;
          font-weight: 600;
          font-size: 12px;
          color: ${OCEAN.coralDeep};
        }

        /* --- thin sunset rule --- */
        .duke-ocean .duke-rule {
          width: 108px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${OCEAN.gold}, ${OCEAN.coral});
        }

        /* --- ocean card (on sand) --- */
        .duke-ocean .duke-card {
          position: relative;
          background: linear-gradient(180deg, ${OCEAN.shell}, ${OCEAN.sandDeep});
          border: 1px solid rgba(14,85,97,.16);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(6,42,51,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .duke-ocean a.duke-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -18px rgba(6,42,51,.55);
        }

        /* --- glass tile used inside the dark live-conditions panel --- */
        .duke-ocean .duke-glass {
          background: rgba(232,246,242,.06);
          border: 1px solid rgba(232,246,242,.14);
          border-radius: 16px;
          backdrop-filter: blur(4px);
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEAL — circular "Ambassador of Aloha" stamp. Self-contained CSS/SVG.
// Ocean-teal disc, sunset-gold ring, a simple wave glyph in the core. Purely
// decorative (aria-hidden). Honors Duke without inventing quotes or logos.
// ---------------------------------------------------------------------------
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
        background: `radial-gradient(circle at 50% 40%, rgba(232,246,242,.12), ${OCEAN.abyss} 72%), ${OCEAN.deep}`,
        border: `3px solid ${OCEAN.foam}`,
        boxShadow: `0 0 0 5px ${OCEAN.gold}, 0 0 0 7px ${OCEAN.foam}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="Duke Kahanamoku — Ambassador of Aloha"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="duke-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="duke-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={OCEAN.foam}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#duke-arc-top" startOffset="50%" textAnchor="middle">
            Duke Kahanamoku
          </textPath>
        </text>
        <text
          fill={OCEAN.gold}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10.5px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#duke-arc-bot" startOffset="50%" textAnchor="middle">
            Ambassador of Aloha
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={OCEAN.gold} strokeWidth="1.4" opacity="0.75" />
      </svg>
      {/* core wave glyph */}
      <svg viewBox="0 0 100 60" style={{ width: size * 0.42, height: size * 0.25 }} aria-hidden="true">
        <path
          d="M2 40 C 16 20, 30 20, 42 34 C 52 46, 64 46, 74 34 C 82 24, 92 26, 98 34"
          fill="none"
          stroke={OCEAN.lagoon}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M2 52 C 16 34, 30 34, 42 48"
          fill="none"
          stroke={OCEAN.foam}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PHOTO PLACEHOLDER — designed SVG ocean art (never a hotlinked/invented photo).
// A duotone ocean/sunset well with layered waves, a sun/horizon, and a small
// surfer or paddler silhouette. Carries an honest chip signaling the final build
// swaps in the organization's own official photography.
// ---------------------------------------------------------------------------
export function PhotoPlaceholder({
  accent,
  label,
  className = "",
  tall = false,
  figure = "surfer",
}: {
  accent: OceanAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "surfer" | "paddler" | "swimmer" | "sun";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#0e5561]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Ocean illustration placeholder — ${label}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`sun-${accent}`} cx="72%" cy="26%" r="34%">
            <stop offset="0%" stopColor="#ffe6b8" stopOpacity="0.95" />
            <stop offset="55%" stopColor={OCEAN.gold} stopOpacity="0.55" />
            <stop offset="100%" stopColor={OCEAN.gold} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd9a3" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#ffd9a3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* warm sky wash + sun glow */}
        <rect width="400" height="300" fill={`url(#sky-${accent})`} />
        <circle cx="288" cy="78" r="120" fill={`url(#sun-${accent})`} />
        <circle cx="288" cy="78" r="26" fill="#ffe6b8" opacity="0.85" />

        {/* layered waves (foam highlights) */}
        <path d="M-20 168 C 60 150, 120 186, 200 166 S 360 150, 440 172 L440 300 L-20 300 Z" fill="#ffffff" opacity="0.06" />
        <path d="M-20 198 C 70 180, 140 214, 220 194 S 370 182, 440 202 L440 300 L-20 300 Z" fill="#ffffff" opacity="0.08" />
        <path d="M-20 232 C 80 214, 150 246, 240 226 S 380 216, 440 236 L440 300 L-20 300 Z" fill="#062a33" opacity="0.30" />

        {/* wave crest lines */}
        <path d="M-20 168 C 60 150, 120 186, 200 166 S 360 150, 440 172" stroke="#e8f6f2" strokeWidth="1.4" fill="none" opacity="0.35" />
        <path d="M-20 198 C 70 180, 140 214, 220 194 S 370 182, 440 202" stroke="#e8f6f2" strokeWidth="1.2" fill="none" opacity="0.28" />

        {/* sun glint on water */}
        {[210, 250, 290, 330].map((x, i) => (
          <ellipse key={x} cx={x} cy={176 + i * 12} rx={30 - i * 4} ry={1.6} fill="#ffe6b8" opacity={0.32 - i * 0.05} />
        ))}

        {/* figure */}
        {figure === "surfer" && (
          <g transform="translate(120 176)" opacity="0.92">
            {/* board */}
            <ellipse cx="0" cy="26" rx="34" ry="6" fill="#062a33" opacity="0.55" />
            {/* body leaning into a turn */}
            <g fill="#0a2126">
              <ellipse cx="-2" cy="2" rx="4" ry="5" />
              <path d="M-6 6 L2 18 L10 12" stroke="#0a2126" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M-4 6 L-14 -2" stroke="#0a2126" strokeWidth="4" strokeLinecap="round" />
              <path d="M2 6 L12 0" stroke="#0a2126" strokeWidth="4" strokeLinecap="round" />
              <path d="M2 18 L-6 24 M10 12 L14 24" stroke="#0a2126" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          </g>
        )}
        {figure === "paddler" && (
          <g transform="translate(150 158)" opacity="0.92" fill="#0a2126">
            {/* board */}
            <ellipse cx="0" cy="52" rx="48" ry="6" fill="#062a33" opacity="0.5" />
            {/* standing paddler */}
            <ellipse cx="0" cy="6" rx="4" ry="5" />
            <rect x="-3.5" y="10" width="7" height="26" rx="3" />
            <path d="M0 16 L18 2" stroke="#0a2126" strokeWidth="4" strokeLinecap="round" />
            <path d="M18 2 L18 40" stroke="#0a2126" strokeWidth="3" strokeLinecap="round" />
            <path d="M0 34 L-6 52 M2 34 L8 52" stroke="#0a2126" strokeWidth="5" strokeLinecap="round" />
          </g>
        )}
        {figure === "swimmer" && (
          <g transform="translate(150 214)" opacity="0.92">
            <g fill="#0a2126" stroke="#0a2126">
              <ellipse cx="0" cy="0" rx="16" ry="5" />
              <circle cx="-14" cy="-1" r="4.5" />
              <path d="M-24 -6 C -30 -14, -20 -18, -14 -12" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M14 2 L26 8" strokeWidth="4" strokeLinecap="round" />
            </g>
            {/* splash */}
            <path d="M-30 -8 l-4 -6 M-26 -12 l-2 -6" stroke="#e8f6f2" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </g>
        )}
        {figure === "sun" && (
          <g transform="translate(0 0)">
            {/* palm silhouette lower-left as a Waikiki cue */}
            <g transform="translate(48 300)" fill="#0a2126" opacity="0.7">
              <path d="M0 0 C 6 -60, 10 -90, 6 -128" stroke="#0a2126" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d="M6 -128 C -18 -140, -34 -132, -46 -118 C -30 -126, -14 -126, 4 -124" fill="#0a2126" />
              <path d="M6 -128 C 30 -142, 48 -136, 60 -120 C 42 -128, 24 -128, 6 -124" fill="#0a2126" />
              <path d="M6 -128 C -8 -152, -6 -168, 2 -182 C 4 -164, 8 -146, 8 -126" fill="#0a2126" />
              <path d="M6 -128 C 22 -150, 38 -152, 52 -150 C 34 -146, 20 -140, 8 -126" fill="#0a2126" />
            </g>
          </g>
        )}
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#062a33]/70 to-transparent" />

      {/* caption + honest "official photo" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="duke-display text-[15px] font-semibold leading-tight text-[#e8f6f2] drop-shadow-sm">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e8a54c]/45 bg-[#062a33]/45 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#e8f6f2]/90 backdrop-blur-sm">
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
// LIVE OCEAN CONDITIONS — the showpiece.
// ---------------------------------------------------------------------------
// Client component. Tide + water temperature are pulled LIVE, client-side, from
// NOAA CO-OPS (Tides & Currents), station 1612340 "Honolulu" — the closest
// official gauge to Waikiki. These endpoints send Access-Control-Allow-Origin:*
// so they work from the browser with no API key. Values fetched live are clearly
// badged "LIVE · NOAA".
//
// Sunrise / sunset are computed client-side with the standard NOAA solar
// algorithm for Waikiki's coordinates — no network, deterministic, honest.
//
// Surf / swell has no reliable no-key CORS source for Waikiki, so it is shown as
// a clearly-labeled SAMPLE (badged "Sample") — never presented as live data. The
// panel note explains that the full build wires the org's chosen live surf feed.
export { OceanConditions } from "./conditions";
