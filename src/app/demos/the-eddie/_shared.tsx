// Shared presentational pieces for "The Eddie" information hub — a reverent,
// memorial-toned sample about the Eddie Aikau Big Wave Invitational at Waimea Bay.
//
// HONEST FRAMING (per brief): this is a sample information hub built on public
// information by BlueWave Projects. It is NOT an official Eddie Aikau Foundation,
// Aikau family, or Rip Curl product, and is not affiliated with or endorsed by
// them. All imagery is DESIGNED SVG placeholder art — no copyrighted photos, and
// no depiction is presented as a real photograph of a real person. A real build
// would use the organization's own or licensed photography.
//
// TONE: this honors a beloved Native Hawaiian hero and a memorial event. The
// voice is reverent, factual, and humble — never hype, never commercial. "Eddie
// Would Go" is treated as sacred shorthand, explained with dignity, never used
// as a slogan or call-to-action.
//
// THEME: a Waimea big-wave palette — deep Pacific blues, a cold-dawn light with
// warm gold on the horizon, and pale sand. Reverent and epic. Deliberately
// distinct from the lighter, warmer Duke's OceanFest demo (deep-blue night water
// vs. sunny teal sand).
//
// SCOPING RULE: every style injected here is namespaced under the `.eddie-hub`
// wrapper class (see <EddieShell>). There are NO bare body/html/:root/h1/h2
// selectors, so nothing leaks to the rest of bluewaveprojects.com. Pages MUST
// wrap their content in <EddieShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/the-eddie";

// ---------------------------------------------------------------------------
// PAGE-LOCAL PALETTE — Waimea big-wave, cold dawn over deep Pacific
// ---------------------------------------------------------------------------
export const WAIMEA = {
  // deep water / night ocean
  abyss: "#04121f", // deepest ink-blue
  deep: "#08243d", // deep Pacific blue
  ocean: "#0d3a5c", // ocean blue
  swell: "#134e78", // lit swell blue
  crest: "#2f7fb0", // brighter crest
  spray: "#bcd9ea", // pale spray / foam blue
  foam: "#eef5fa", // near-white foam
  // dawn light / horizon warmth
  gold: "#e6b062", // dawn gold
  goldSoft: "#f0cd93", // soft gold
  amber: "#c9853a", // deeper amber horizon
  // sand
  sand: "#efe7d6", // pale cool sand canvas
  sandDeep: "#e2d7c0", // shaded sand
  shell: "#f8f3ea", // lightest shell
  // text
  ink: "#0a2135", // deep blue ink (body)
  inkSoft: "#39536b", // muted blue-grey
  muted: "#6b7d8c", // captions / meta
} as const;

// Accent keys used across the section illustrations. Each maps to a duotone
// deep-Pacific well.
export type WaveAccent = "dawn" | "wall" | "channel" | "horizon" | "night";

export const accentGradient: Record<WaveAccent, string> = {
  dawn: "from-[#08243d] via-[#134e78] to-[#04121f]",
  wall: "from-[#0d3a5c] via-[#134e78] to-[#08243d]",
  channel: "from-[#08243d] via-[#0d3a5c] to-[#2f7fb0]",
  horizon: "from-[#c9853a] via-[#134e78] to-[#04121f]",
  night: "from-[#04121f] via-[#08243d] to-[#0d3a5c]",
};

// ---------------------------------------------------------------------------
// EDDIE SHELL — scoped wrapper. Injects ONE <style> block, all namespaced under
// `.eddie-hub`. Paints a cool pale-sand canvas with a faint texture, defines the
// display serif + helper classes + card styles. Nothing leaks.
// ---------------------------------------------------------------------------
export function EddieShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`eddie-hub ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Outfit:wght@400;500;600;700&display=swap');

        /* --- cool pale-sand canvas + base type (scoped) --- */
        .eddie-hub {
          position: relative;
          color: ${WAIMEA.ink};
          font-family: 'Outfit', system-ui, sans-serif;
          line-height: 1.65;
          background-color: ${WAIMEA.sand};
          background-image:
            radial-gradient(circle at 18% 22%, rgba(19,78,120,.05) 0 2px, transparent 3px),
            radial-gradient(circle at 80% 34%, rgba(230,176,98,.045) 0 2px, transparent 3px),
            radial-gradient(circle at 48% 84%, rgba(13,58,92,.04) 0 1px, transparent 2px),
            linear-gradient(165deg, ${WAIMEA.shell} 0%, ${WAIMEA.sandDeep} 100%);
        }
        .eddie-hub ::selection { background: rgba(230,176,98,.28); }

        /* Site Nav is styled for dark pages (white links); on pale sand they
           wash out. Re-ink them, but leave any link carrying its own bg alone. */
        .eddie-hub nav a { color: rgba(10,33,53,.74); }
        .eddie-hub nav a:hover { color: ${WAIMEA.ink}; }
        .eddie-hub nav a[class*="bg-"] { color: ${WAIMEA.foam}; }
        .eddie-hub nav a[class*="bg-"]:hover { color: ${WAIMEA.foam}; }

        /* --- display type helpers --- */
        .eddie-hub .eddie-display {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          letter-spacing: -0.012em;
        }
        .eddie-hub .eddie-eyebrow {
          font-family: 'Outfit', sans-serif;
          text-transform: uppercase;
          letter-spacing: .32em;
          font-weight: 600;
          font-size: 12px;
          color: ${WAIMEA.amber};
        }

        /* --- thin dawn rule --- */
        .eddie-hub .eddie-rule {
          width: 112px; height: 3px; margin: 16px auto 0; border-radius: 3px;
          background: linear-gradient(90deg, ${WAIMEA.gold}, ${WAIMEA.amber});
        }

        /* --- pale card (on sand) --- */
        .eddie-hub .eddie-card {
          position: relative;
          background: linear-gradient(180deg, ${WAIMEA.shell}, ${WAIMEA.sandDeep});
          border: 1px solid rgba(13,58,92,.15);
          border-radius: 18px;
          box-shadow: 0 10px 30px -18px rgba(4,18,31,.5);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .eddie-hub a.eddie-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px -18px rgba(4,18,31,.55);
        }

        /* --- pull-quote / memorial emphasis (never a CTA) --- */
        .eddie-hub .eddie-quote {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: .005em;
        }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MEMORIAL MARK — a quiet circular emblem. Deep-ocean disc, dawn-gold ring, a
// single big-wave curl and a small lei-like arc of dots. Purely decorative
// (aria-hidden text). Honors Eddie and Waimea without inventing a logo, a
// portrait, or a quote.
// ---------------------------------------------------------------------------
export function MemorialMark({
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
        background: `radial-gradient(circle at 50% 34%, rgba(238,245,250,.10), ${WAIMEA.abyss} 74%), ${WAIMEA.deep}`,
        border: `3px solid ${WAIMEA.foam}`,
        boxShadow: `0 0 0 5px ${WAIMEA.gold}, 0 0 0 7px ${WAIMEA.foam}, 0 14px 34px rgba(0,0,0,.42)`,
      }}
      aria-label="In memory of Eddie Aikau — Waimea Bay"
    >
      <svg viewBox="0 0 230 230" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="eddie-arc-top" d="M 32 115 A 83 83 0 0 1 198 115" fill="none" />
          <path id="eddie-arc-bot" d="M 36 115 A 79 79 0 0 0 194 115" fill="none" />
        </defs>
        <text
          fill={WAIMEA.foam}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", letterSpacing: "2.4px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#eddie-arc-top" startOffset="50%" textAnchor="middle">
            In Memory of Eddie Aikau
          </textPath>
        </text>
        <text
          fill={WAIMEA.gold}
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10.5px", letterSpacing: "2.6px", textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#eddie-arc-bot" startOffset="50%" textAnchor="middle">
            Waimea Bay · 1946–1978
          </textPath>
        </text>
        <circle cx="115" cy="115" r="66" fill="none" stroke={WAIMEA.gold} strokeWidth="1.2" opacity="0.7" />
        {/* small lei-like arc of dots along the lower inner ring */}
        {Array.from({ length: 9 }).map((_, i) => {
          const a = Math.PI * (0.18 + (i / 8) * 0.64);
          const r = 58;
          const cx = 115 + Math.cos(a) * r;
          const cy = 128 + Math.sin(a) * r;
          return <circle key={i} cx={cx} cy={cy} r="1.7" fill={WAIMEA.goldSoft} opacity="0.75" />;
        })}
      </svg>
      {/* core big-wave curl glyph */}
      <svg viewBox="0 0 100 64" style={{ width: size * 0.46, height: size * 0.3 }} aria-hidden="true">
        {/* the wave face + curling lip */}
        <path
          d="M4 52 C 20 52, 34 44, 44 30 C 52 18, 66 10, 84 12 C 72 16, 66 26, 66 36 C 66 46, 74 52, 86 52 Z"
          fill={WAIMEA.crest}
          opacity="0.9"
        />
        <path
          d="M84 12 C 92 12, 96 18, 94 26 C 90 20, 84 18, 78 20"
          fill="none"
          stroke={WAIMEA.foam}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M4 52 C 20 52, 34 44, 44 30"
          fill="none"
          stroke={WAIMEA.foam}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// WAVE ILLUSTRATION — designed SVG big-wave art (never a hotlinked/invented
// photo, and never a depicted "real person"). A duotone deep-Pacific well with
// a towering Waimea wave face, cold-dawn horizon light, and a distant, tiny,
// abstract surfer/paddler silhouette (a mark on the wave, not a portrait).
// Carries an honest chip signaling the final build swaps in licensed photography.
// ---------------------------------------------------------------------------
export function WaveArt({
  accent,
  label,
  className = "",
  tall = false,
  figure = "wave",
}: {
  accent: WaveAccent;
  label: string;
  className?: string;
  tall?: boolean;
  figure?: "wave" | "surfer" | "canoe" | "bay";
}) {
  return (
    <div
      className={`group/ph relative overflow-hidden rounded-2xl border border-[#0d3a5c]/25 bg-gradient-to-br ${accentGradient[accent]} ${
        tall ? "min-h-[300px] sm:min-h-[380px]" : "min-h-[190px]"
      } ${className}`}
      role="img"
      aria-label={`Illustration placeholder — ${label}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`dawn-${accent}`} cx="70%" cy="20%" r="42%">
            <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.8" />
            <stop offset="55%" stopColor={WAIMEA.gold} stopOpacity="0.4" />
            <stop offset="100%" stopColor={WAIMEA.gold} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sky-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4d9a8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f4d9a8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`face-${accent}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#3a86b8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#04121f" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* cold-dawn sky wash + low sun glow near horizon */}
        <rect width="400" height="300" fill={`url(#sky-${accent})`} />
        <circle cx="284" cy="60" r="120" fill={`url(#dawn-${accent})`} />
        <circle cx="284" cy="60" r="22" fill="#ffe9c2" opacity="0.75" />

        {figure === "bay" && (
          <>
            {/* headland arc of the bay + calmer inner water */}
            <path d="M-20 150 C 80 132, 150 150, 220 146 S 360 138, 440 156 L440 300 L-20 300 Z" fill="#0d3a5c" opacity="0.5" />
            <path d="M-20 200 C 90 184, 160 210, 250 196 S 380 190, 440 210 L440 300 L-20 300 Z" fill="#08243d" opacity="0.55" />
            {/* headland silhouette left */}
            <path d="M-20 300 L-20 150 C 20 138, 54 150, 70 176 C 84 200, 70 300, 70 300 Z" fill="#04121f" opacity="0.7" />
          </>
        )}

        {(figure === "wave" || figure === "surfer") && (
          <>
            {/* the big wave — a towering face rising right to left */}
            <path
              d="M-20 300 L-20 210 C 60 208, 120 196, 170 158 C 210 128, 250 96, 320 92 C 372 90, 410 118, 440 150 L440 300 Z"
              fill={`url(#face-${accent})`}
            />
            {/* curling lip + spray */}
            <path
              d="M320 92 C 372 90, 404 112, 420 138 C 402 116, 372 108, 344 116 C 356 100, 344 92, 320 92 Z"
              fill="#eef5fa"
              opacity="0.22"
            />
            <path
              d="M170 158 C 210 128, 250 96, 320 92"
              stroke="#eef5fa"
              strokeWidth="1.6"
              fill="none"
              opacity="0.4"
            />
            {/* foam streaks down the face */}
            {[[210, 132], [252, 112], [292, 100]].map(([x, y], i) => (
              <path
                key={i}
                d={`M${x} ${y} C ${x - 6} ${y + 30}, ${x - 14} ${y + 60}, ${x - 26} ${y + 96}`}
                stroke="#bcd9ea"
                strokeWidth="1.3"
                fill="none"
                opacity={0.28 - i * 0.04}
              />
            ))}
          </>
        )}

        {figure === "surfer" && (
          // a tiny, distant, abstract mark low on the face — a rider, not a portrait
          <g transform="translate(120 196)" opacity="0.9">
            <ellipse cx="0" cy="10" rx="16" ry="3" fill="#04121f" opacity="0.6" />
            <g fill="#04121f">
              <ellipse cx="0" cy="-3" rx="2.6" ry="3.2" />
              <path d="M-2 0 L1 8 L6 5" stroke="#04121f" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M-1 0 L-8 -4 M1 0 L7 -3" stroke="#04121f" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {figure === "canoe" && (
          <>
            {/* open-ocean swells */}
            <path d="M-20 190 C 80 172, 150 206, 240 188 S 380 178, 440 200 L440 300 L-20 300 Z" fill="#08243d" opacity="0.55" />
            <path d="M-20 226 C 90 208, 160 240, 250 222 S 380 214, 440 234 L440 300 L-20 300 Z" fill="#04121f" opacity="0.5" />
            {/* double-hulled voyaging canoe silhouette (Hokule'a cue) — abstract, no people */}
            <g transform="translate(150 176)" fill="#04121f" opacity="0.82">
              {/* two hulls */}
              <path d="M-46 26 C -30 34, 30 34, 46 26 C 30 30, -30 30, -46 26 Z" />
              <path d="M-40 14 C -26 20, 26 20, 40 14 C 26 17, -26 17, -40 14 Z" />
              {/* cross beams */}
              <path d="M-30 14 L-30 26 M30 14 L30 26" stroke="#04121f" strokeWidth="2.4" />
              {/* twin crab-claw sails */}
              <path d="M-16 14 C -22 -14, -14 -30, -2 -34 C -6 -18, -8 -2, -8 12 Z" />
              <path d="M8 12 C 8 -8, 16 -24, 30 -30 C 20 -14, 14 -2, 12 12 Z" />
            </g>
          </>
        )}
      </svg>

      {/* soft vignette for caption legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#04121f]/75 to-transparent" />

      {/* caption + honest "illustration" chip */}
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <div className="flex w-full items-end justify-between gap-3">
          <span className="eddie-display text-[15px] font-semibold leading-tight text-[#eef5fa] drop-shadow-sm">
            {label}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e6b062]/45 bg-[#04121f]/50 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#eef5fa]/90 backdrop-blur-sm">
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
