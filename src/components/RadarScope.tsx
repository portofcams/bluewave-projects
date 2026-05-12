"use client";

// Animated radar scope — pure CSS + SVG, no JS animation loop.
// Maritime-themed accent for the homepage tying John's USCG Captain
// background to the studio brand. The sweep is a CSS rotation; the blips
// are static SVG with staggered fade-in.

const blips = [
  { x: 132, y: 88,  mmsi: "366 845 220", label: "M/V SOUTHERN EXPLORER", brg: "045°", delay: 0.0 },
  { x: 84,  y: 156, mmsi: "303 992 581", label: "F/V MR. B",              brg: "215°", delay: 0.7 },
  { x: 168, y: 192, mmsi: "367 555 110", label: "S/V REALITY CHECK",      brg: "118°", delay: 1.2 },
  { x: 60,  y: 96,  mmsi: "311 042 660", label: "M/V ACORN II",           brg: "284°", delay: 1.8 },
  { x: 200, y: 132, mmsi: "338 119 040", label: "F/V OFF THE LEASH",      brg: "072°", delay: 2.4 },
];

const RADIUS = 110;
const CENTER = 130;

export default function RadarScope() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none">
      {/* Glass frame */}
      <div className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80 font-mono">
              Scope · Live
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">
            MMSI · UTC -10
          </span>
        </div>

        <svg
          viewBox="0 0 260 260"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Animated radar scope showing five vessels by MMSI"
        >
          <defs>
            <radialGradient id="rg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.18)" />
              <stop offset="60%" stopColor="rgba(2,132,199,0.06)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="rg-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(34,197,94,0)" />
              <stop offset="92%" stopColor="rgba(34,197,94,0.55)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0.9)" />
            </linearGradient>
            <filter id="rg-blur"><feGaussianBlur stdDeviation="0.7" /></filter>
          </defs>

          {/* Background scope glow */}
          <circle cx={CENTER} cy={CENTER} r={RADIUS + 12} fill="url(#rg-glow)" />

          {/* Range rings */}
          {[0.28, 0.55, 0.82, 1].map((s, i) => (
            <circle
              key={i}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS * s}
              fill="none"
              stroke="rgba(56,189,248,0.18)"
              strokeWidth="0.5"
              strokeDasharray={i === 3 ? "0" : "2 3"}
            />
          ))}

          {/* Cardinal cross */}
          <line x1={CENTER} y1={CENTER - RADIUS} x2={CENTER} y2={CENTER + RADIUS} stroke="rgba(56,189,248,0.12)" strokeWidth="0.5" />
          <line x1={CENTER - RADIUS} y1={CENTER} x2={CENTER + RADIUS} y2={CENTER} stroke="rgba(56,189,248,0.12)" strokeWidth="0.5" />

          {/* Compass tick labels */}
          <text x={CENTER} y={CENTER - RADIUS - 4} textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.55)" fontFamily="ui-monospace, SF Mono, monospace">N</text>
          <text x={CENTER + RADIUS + 8} y={CENTER + 3} textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.35)" fontFamily="ui-monospace, SF Mono, monospace">E</text>
          <text x={CENTER} y={CENTER + RADIUS + 11} textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.35)" fontFamily="ui-monospace, SF Mono, monospace">S</text>
          <text x={CENTER - RADIUS - 8} y={CENTER + 3} textAnchor="middle" fontSize="8" fill="rgba(125,211,252,0.35)" fontFamily="ui-monospace, SF Mono, monospace">W</text>

          {/* Sweep — CSS rotation around scope center */}
          <g style={{ transformOrigin: `${CENTER}px ${CENTER}px`, animation: "rg-sweep 6s linear infinite" }}>
            <path
              d={`M ${CENTER} ${CENTER} L ${CENTER + RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 0 ${CENTER + RADIUS * Math.cos(-Math.PI / 3)} ${CENTER + RADIUS * Math.sin(-Math.PI / 3)} Z`}
              fill="url(#rg-sweep)"
              opacity="0.65"
            />
          </g>

          {/* Vessel blips */}
          {blips.map((b, i) => (
            <g key={b.mmsi} style={{ animation: `rg-pulse 6s ease-in-out ${b.delay}s infinite` }}>
              <circle cx={b.x} cy={b.y} r="3.5" fill="rgba(34,197,94,0.95)" filter="url(#rg-blur)" />
              <circle cx={b.x} cy={b.y} r="1.5" fill="#86efac" />
              <text
                x={b.x + 8}
                y={b.y + 3}
                fontSize="6.5"
                fill="rgba(134,239,172,0.9)"
                fontFamily="ui-monospace, SF Mono, monospace"
                letterSpacing="0.5"
              >
                {b.mmsi}
              </text>
              {i === 0 ? (
                <text
                  x={b.x + 8}
                  y={b.y - 4}
                  fontSize="5"
                  fill="rgba(255,255,255,0.55)"
                  fontFamily="ui-monospace, SF Mono, monospace"
                  letterSpacing="0.4"
                >
                  {b.label}
                </text>
              ) : null}
            </g>
          ))}

          {/* Own-ship marker */}
          <g>
            <circle cx={CENTER} cy={CENTER} r="4" fill="rgba(56,189,248,0.9)" />
            <circle cx={CENTER} cy={CENTER} r="9" fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="0.8" />
            <text
              x={CENTER + 13}
              y={CENTER + 3}
              fontSize="6"
              fill="rgba(125,211,252,0.95)"
              fontFamily="ui-monospace, SF Mono, monospace"
              letterSpacing="0.4"
            >
              OWN · 21.282° N  157.829° W
            </text>
          </g>
        </svg>

        {/* Footer telemetry strip */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-[9px] font-mono uppercase tracking-[0.14em] text-white/40">
          <div>
            <div className="text-white/30">Range</div>
            <div className="text-emerald-300/80">5 nm</div>
          </div>
          <div className="text-center">
            <div className="text-white/30">Targets</div>
            <div className="text-emerald-300/80">5 contacts</div>
          </div>
          <div className="text-right">
            <div className="text-white/30">Mode</div>
            <div className="text-emerald-300/80">N-up · AIS</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rg-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rg-pulse {
          0%, 90%, 100% { opacity: 0.4; }
          5%, 12% { opacity: 1; }
          25%, 80% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
