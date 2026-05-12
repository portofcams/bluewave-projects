"use client";

// Animated radar / AIS scope — pure CSS + SVG, no JS animation loop.
// Maritime credibility flourish on the studio homepage. Designed to
// span the full content column and read like a real bridge display:
// bearing lines every 30°, range rings labeled in nm, an EBL (electronic
// bearing line), heading marker, vessel blips with CPA/TCPA/COG/SOG,
// and a status panel on the right with the AIS contact list.

type Blip = {
  rangeNm: number;     // distance from own ship
  bearing: number;     // degrees true, 0 = N
  mmsi: string;
  name: string;
  type: "FV" | "MV" | "SV" | "FT";   // fishing / motor / sail / fast
  cog: number;         // course over ground (degrees true)
  sog: number;         // speed over ground (knots)
  cpa: number;         // closest point of approach (nm)
  tcpa: string;        // time to CPA "mm:ss"
  flag: "US" | "JP" | "CA";
};

const blips: Blip[] = [
  { rangeNm: 1.2, bearing: 42,  mmsi: "366 845 220", name: "M/V SOUTHERN EXPLORER", type: "MV", cog: 245, sog: 11.4, cpa: 0.62, tcpa: "08:14", flag: "US" },
  { rangeNm: 2.8, bearing: 118, mmsi: "367 555 110", name: "S/V REALITY CHECK",     type: "SV", cog: 92,  sog:  5.2, cpa: 1.84, tcpa: "21:03", flag: "US" },
  { rangeNm: 3.4, bearing: 215, mmsi: "303 992 581", name: "F/V MR. B",             type: "FV", cog: 35,  sog:  9.0, cpa: 0.31, tcpa: "12:47", flag: "US" },
  { rangeNm: 2.1, bearing: 287, mmsi: "311 042 660", name: "M/V ACORN II",          type: "MV", cog: 178, sog:  8.7, cpa: 1.05, tcpa: "16:22", flag: "US" },
  { rangeNm: 4.4, bearing: 72,  mmsi: "338 119 040", name: "F/V OFF THE LEASH",     type: "FV", cog: 312, sog:  6.4, cpa: 2.20, tcpa: "—",    flag: "US" },
];

const TYPE_LABEL: Record<Blip["type"], string> = {
  FV: "Fishing",
  MV: "Motor",
  SV: "Sail",
  FT: "Fast",
};

const CENTER = 170;
const RADIUS = 152;
const MAX_RANGE_NM = 5;

function polarToXY(rangeNm: number, bearing: number) {
  const radiusPx = (rangeNm / MAX_RANGE_NM) * RADIUS;
  // Bearing 0 = up (N). Convert to math angle (CCW from +X axis).
  const rad = ((bearing - 90) * Math.PI) / 180;
  return {
    x: CENTER + radiusPx * Math.cos(rad),
    y: CENTER + radiusPx * Math.sin(rad),
  };
}

function vectorTip(x: number, y: number, cog: number, sog: number) {
  // Velocity vector length scales with speed; cap so it doesn't dominate.
  const scale = Math.min(sog * 1.8, 22);
  const rad = ((cog - 90) * Math.PI) / 180;
  return { x: x + scale * Math.cos(rad), y: y + scale * Math.sin(rad) };
}

export default function RadarScope() {
  return (
    <div className="relative w-full select-none">
      <div className="glass rounded-3xl p-5 sm:p-7 relative overflow-hidden">

        {/* Header strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/85 font-mono">
              AIS · Live · 5 contacts
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.16em] text-white/40 font-mono">
            <span>Range <span className="text-emerald-300/80">5.0 nm</span></span>
            <span>Mode <span className="text-emerald-300/80">N-up · True</span></span>
            <span>Gain <span className="text-emerald-300/80">Auto</span></span>
            <span>EBL <span className="text-emerald-300/80">072°</span></span>
          </div>
        </div>

        {/* Main two-column body: scope + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-6 items-start">
          {/* Scope */}
          <div className="relative">
            <svg
              viewBox="0 0 340 340"
              className="w-full h-auto block"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Animated AIS radar scope with 5 vessel contacts"
            >
              <defs>
                <radialGradient id="rg-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(56,189,248,0.15)" />
                  <stop offset="55%" stopColor="rgba(2,132,199,0.05)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <linearGradient id="rg-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(34,197,94,0)" />
                  <stop offset="92%" stopColor="rgba(34,197,94,0.55)" />
                  <stop offset="100%" stopColor="rgba(34,197,94,0.92)" />
                </linearGradient>
                <filter id="rg-blur"><feGaussianBlur stdDeviation="0.7" /></filter>
                <pattern id="rg-static" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                  <rect width="3" height="3" fill="transparent" />
                  <circle cx="1.5" cy="1.5" r="0.18" fill="rgba(125,211,252,0.18)" />
                </pattern>
              </defs>

              {/* Outer glow + static fill */}
              <circle cx={CENTER} cy={CENTER} r={RADIUS + 12} fill="url(#rg-glow)" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="rgba(2,6,23,0.45)" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#rg-static)" opacity="0.45" />

              {/* Range rings + labels (1, 2, 3, 4, 5 nm) */}
              {[1, 2, 3, 4, 5].map((r) => {
                const ringR = (r / MAX_RANGE_NM) * RADIUS;
                return (
                  <g key={r}>
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={ringR}
                      fill="none"
                      stroke="rgba(56,189,248,0.16)"
                      strokeWidth={r === MAX_RANGE_NM ? "0.8" : "0.45"}
                      strokeDasharray={r === MAX_RANGE_NM ? "0" : "2 3"}
                    />
                    <text
                      x={CENTER + ringR + 3}
                      y={CENTER - 2}
                      fontSize="6.5"
                      fill="rgba(125,211,252,0.45)"
                      fontFamily="ui-monospace, SF Mono, monospace"
                    >
                      {r}nm
                    </text>
                  </g>
                );
              })}

              {/* Bearing tick marks every 10°, labels every 30° */}
              {Array.from({ length: 36 }, (_, i) => i * 10).map((deg) => {
                const isMajor = deg % 30 === 0;
                const rad = ((deg - 90) * Math.PI) / 180;
                const r1 = RADIUS - (isMajor ? 8 : 4);
                const r2 = RADIUS;
                const x1 = CENTER + r1 * Math.cos(rad);
                const y1 = CENTER + r1 * Math.sin(rad);
                const x2 = CENTER + r2 * Math.cos(rad);
                const y2 = CENTER + r2 * Math.sin(rad);
                return (
                  <g key={deg}>
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={isMajor ? "rgba(125,211,252,0.55)" : "rgba(125,211,252,0.18)"}
                      strokeWidth="0.6"
                    />
                    {isMajor && (
                      <text
                        x={CENTER + (RADIUS - 16) * Math.cos(rad)}
                        y={CENTER + (RADIUS - 16) * Math.sin(rad) + 2}
                        textAnchor="middle"
                        fontSize="6"
                        fill="rgba(125,211,252,0.55)"
                        fontFamily="ui-monospace, SF Mono, monospace"
                      >
                        {String(deg).padStart(3, "0")}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Cardinal cross */}
              <line x1={CENTER} y1={CENTER - RADIUS} x2={CENTER} y2={CENTER + RADIUS} stroke="rgba(56,189,248,0.18)" strokeWidth="0.5" />
              <line x1={CENTER - RADIUS} y1={CENTER} x2={CENTER + RADIUS} y2={CENTER} stroke="rgba(56,189,248,0.18)" strokeWidth="0.5" />

              {/* Compass cardinals (outside ring) */}
              <text x={CENTER}            y={CENTER - RADIUS - 6} textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.7)" fontFamily="ui-monospace, SF Mono, monospace" fontWeight="bold">N</text>
              <text x={CENTER + RADIUS + 10} y={CENTER + 3}       textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.5)" fontFamily="ui-monospace, SF Mono, monospace">E</text>
              <text x={CENTER}            y={CENTER + RADIUS + 13} textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.5)" fontFamily="ui-monospace, SF Mono, monospace">S</text>
              <text x={CENTER - RADIUS - 10} y={CENTER + 3}       textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.5)" fontFamily="ui-monospace, SF Mono, monospace">W</text>

              {/* Heading marker — solid line up from center */}
              <line x1={CENTER} y1={CENTER} x2={CENTER} y2={CENTER - RADIUS} stroke="rgba(56,189,248,0.55)" strokeWidth="1" />

              {/* Electronic bearing line (EBL) — dashed at 072° */}
              {(() => {
                const rad = ((72 - 90) * Math.PI) / 180;
                const x2 = CENTER + RADIUS * Math.cos(rad);
                const y2 = CENTER + RADIUS * Math.sin(rad);
                return (
                  <line x1={CENTER} y1={CENTER} x2={x2} y2={y2}
                    stroke="rgba(250,204,21,0.5)" strokeWidth="0.8" strokeDasharray="3 2" />
                );
              })()}

              {/* Sweep — CSS rotation around scope center */}
              <g style={{ transformOrigin: `${CENTER}px ${CENTER}px`, animation: "rg-sweep 6s linear infinite" }}>
                <path
                  d={`M ${CENTER} ${CENTER} L ${CENTER + RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 0 ${CENTER + RADIUS * Math.cos(-Math.PI / 3)} ${CENTER + RADIUS * Math.sin(-Math.PI / 3)} Z`}
                  fill="url(#rg-sweep)"
                  opacity="0.7"
                />
              </g>

              {/* Vessel blips */}
              {blips.map((b, i) => {
                const { x, y } = polarToXY(b.rangeNm, b.bearing);
                const tip = vectorTip(x, y, b.cog, b.sog);
                return (
                  <g key={b.mmsi} style={{ animation: `rg-pulse 6s ease-in-out ${i * 0.6}s infinite` }}>
                    {/* COG/SOG velocity vector */}
                    <line x1={x} y1={y} x2={tip.x} y2={tip.y} stroke="rgba(134,239,172,0.65)" strokeWidth="0.8" />
                    {/* Contact triangle */}
                    <polygon
                      points={`${x - 3},${y + 2.5} ${x + 3},${y + 2.5} ${x},${y - 3.2}`}
                      fill="rgba(34,197,94,0.9)"
                      filter="url(#rg-blur)"
                    />
                    <circle cx={x} cy={y} r="1.2" fill="#86efac" />
                    {/* Compact label */}
                    <text
                      x={x + 6}
                      y={y - 3}
                      fontSize="5.5"
                      fill="rgba(134,239,172,0.95)"
                      fontFamily="ui-monospace, SF Mono, monospace"
                      letterSpacing="0.4"
                    >
                      {b.type}-{i + 1}
                    </text>
                    <text
                      x={x + 6}
                      y={y + 4.5}
                      fontSize="5"
                      fill="rgba(125,211,252,0.55)"
                      fontFamily="ui-monospace, SF Mono, monospace"
                    >
                      {b.rangeNm.toFixed(1)}nm · {String(b.bearing).padStart(3,"0")}°
                    </text>
                  </g>
                );
              })}

              {/* Own-ship marker */}
              <g>
                <circle cx={CENTER} cy={CENTER} r="4" fill="rgba(56,189,248,0.95)" />
                <circle cx={CENTER} cy={CENTER} r="10" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="0.8" />
                <text
                  x={CENTER + 14}
                  y={CENTER + 3}
                  fontSize="6"
                  fill="rgba(125,211,252,0.95)"
                  fontFamily="ui-monospace, SF Mono, monospace"
                  letterSpacing="0.4"
                >
                  OWN · 21.282° N  157.829° W
                </text>
              </g>

              {/* Bottom-left telemetry within scope */}
              <g fontFamily="ui-monospace, SF Mono, monospace" fontSize="5.5" fill="rgba(125,211,252,0.55)">
                <text x="6" y={CENTER + RADIUS + 22}>HDG 000°T  SOG 0.0 kt  COG ---°  RNG 5.0 nm</text>
              </g>
            </svg>
          </div>

          {/* Sidebar — vessel contacts panel */}
          <div className="flex flex-col gap-3">
            <div className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-mono flex justify-between pb-2 border-b border-white/5">
              <span>Contact</span>
              <span>RNG / BRG · CPA / TCPA</span>
            </div>
            {blips.map((b, i) => (
              <div key={b.mmsi} className="text-[10px] leading-relaxed font-mono">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-emerald-300/90 font-semibold tracking-wide">
                    {b.type}-{i + 1} · {b.name}
                  </span>
                  <span className="text-white/35">{b.flag}</span>
                </div>
                <div className="flex items-center justify-between text-white/50">
                  <span>MMSI {b.mmsi}</span>
                  <span className="text-white/45">{b.rangeNm.toFixed(1)}nm · {String(b.bearing).padStart(3,"0")}°</span>
                </div>
                <div className="flex items-center justify-between text-white/40">
                  <span>{TYPE_LABEL[b.type]} · COG {String(b.cog).padStart(3,"0")}° · SOG {b.sog.toFixed(1)} kt</span>
                  <span className={b.cpa < 1 ? "text-amber-400/90" : "text-white/45"}>
                    CPA {b.cpa.toFixed(2)}nm · {b.tcpa}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer status strip */}
        <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[9px] font-mono uppercase tracking-[0.16em]">
          <div>
            <div className="text-white/30">Position</div>
            <div className="text-emerald-300/85">21.282° N · 157.829° W</div>
          </div>
          <div>
            <div className="text-white/30">UTC offset</div>
            <div className="text-emerald-300/85">-10:00 HST</div>
          </div>
          <div>
            <div className="text-white/30">Closest CPA</div>
            <div className="text-amber-400/90">FV-3 · 0.31nm · 12:47</div>
          </div>
          <div>
            <div className="text-white/30">Source</div>
            <div className="text-emerald-300/85">AIS class-A · demo</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rg-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rg-pulse {
          0%, 90%, 100% { opacity: 0.45; }
          4%, 10% { opacity: 1; }
          25%, 80% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
