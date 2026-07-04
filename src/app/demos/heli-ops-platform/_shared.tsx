// Shared theme shell + presentational primitives for the Heli-Ops Platform
// concept demo (Module 1: Scheduling / Manifest Board; Module 2 lands in the
// same page.tsx via a parallel build).
//
// HONEST FRAMING: this is a GENERIC, FICTIONAL concept prototype for a
// heli-ski / heli-charter operations platform. It is not affiliated with,
// endorsed by, or representative of any specific real operator, and it is
// not a certified or currently-in-use operational safety system. Every
// aircraft, pilot, guide, guest, and cat-group name on this page is invented
// sample data for demonstration only.
//
// THEME: alpine / mountain-ops dashboard — deep slate/charcoal base, snow-
// white cards, amber/red alert accent for weight-and-balance flags, ice-blue
// accent for informational/status elements. Built to read like real
// operational software (a dispatcher's board), not a marketing brochure —
// deliberately distinct from the warm-parchment lodge marketing site and the
// festival/event hub demos elsewhere in this repo.
//
// SCOPING RULE: every style here is namespaced under the `.hops-shell`
// wrapper class. No bare body/html/:root/h1/h2 selectors — nothing leaks
// outside the shell. Pages must wrap content in <OpsShell>.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/heli-ops-platform";

// ---------------------------------------------------------------------------
// PALETTE — slate/charcoal ops base, snow-white cards, amber/red alert,
// ice-blue info accent.
// ---------------------------------------------------------------------------
export const OPS = {
  night: "#0a0e14", // deepest charcoal
  charcoal: "#12161f", // base panel ink
  slate: "#1b212d", // card/section base
  slateSoft: "#242b3a", // raised panel
  line: "#333c4d", // hairlines / dividers
  snow: "#f5f7fa", // snow-white card
  snowDim: "#e4e8ee", // dimmer snow surface
  ice: "#5ec8e8", // ice-blue info accent
  iceDeep: "#2d94b8", // deep ice-blue
  amber: "#f0a83c", // amber caution accent
  amberDeep: "#c97f1e", // deep amber
  red: "#e5484d", // alert red (overweight / hold)
  redDeep: "#a52a2f", // deep red
  green: "#3ecf8e", // ok / within-limit green
  text: "#e9edf3", // primary body text (on dark)
  textMuted: "#9aa5b6", // secondary text (on dark)
  inkOnSnow: "#131722", // body text on snow cards
  mutedOnSnow: "#5b6579", // secondary text on snow cards
} as const;

export type OpsAccent = "ice" | "amber" | "red" | "green" | "slate";

export const accentSolid: Record<OpsAccent, string> = {
  ice: OPS.ice,
  amber: OPS.amber,
  red: OPS.red,
  green: OPS.green,
  slate: OPS.line,
};

// ---------------------------------------------------------------------------
// OPS SHELL — scoped wrapper. Injects one <style> block, namespaced under
// `.hops-shell`. Dark charcoal/slate canvas with a faint topographic-contour
// wash, monospace-leaning display type for that "dispatch board" read.
// ---------------------------------------------------------------------------
export function OpsShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`hops-shell ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        .hops-shell {
          position: relative;
          color: ${OPS.text};
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.55;
          background-color: ${OPS.night};
          background-image:
            radial-gradient(circle at 88% 4%, rgba(94,200,232,.10) 0 2px, transparent 3px),
            radial-gradient(circle at 6% 96%, rgba(240,168,60,.08) 0 2px, transparent 3px),
            repeating-linear-gradient(115deg, rgba(255,255,255,.015) 0px, rgba(255,255,255,.015) 1px, transparent 1px, transparent 68px),
            linear-gradient(175deg, ${OPS.charcoal} 0%, ${OPS.night} 100%);
        }
        .hops-shell ::selection { background: rgba(94,200,232,.30); }

        /* Site Nav is styled for light-on-dark already; keep links legible
           on our darker charcoal too, but don't fight the CTA pill. */
        .hops-shell nav a { color: rgba(233,237,243,.78); }
        .hops-shell nav a:hover { color: ${OPS.snow}; }

        .hops-shell .hops-mono {
          font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          letter-spacing: .01em;
        }
        .hops-shell .hops-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: .22em;
          font-weight: 600;
          font-size: 11px;
          color: ${OPS.ice};
        }
        .hops-shell .hops-display {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        /* dark ops panel (charcoal card) */
        .hops-shell .hops-panel {
          background: linear-gradient(180deg, ${OPS.slateSoft}, ${OPS.slate});
          border: 1px solid ${OPS.line};
          border-radius: 14px;
          box-shadow: 0 10px 28px -16px rgba(0,0,0,.6);
        }

        /* snow-white manifest card (readable data surface) */
        .hops-shell .hops-card {
          background: ${OPS.snow};
          color: ${OPS.inkOnSnow};
          border: 1px solid rgba(19,23,34,.08);
          border-radius: 12px;
          box-shadow: 0 8px 20px -14px rgba(0,0,0,.5);
        }

        /* status pill base */
        .hops-shell .hops-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 999px;
          padding: 3px 10px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .04em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* thin ice rule */
        .hops-shell .hops-rule {
          width: 88px; height: 3px; border-radius: 3px;
          background: linear-gradient(90deg, ${OPS.ice}, ${OPS.iceDeep});
        }

        .hops-shell .hops-scroll::-webkit-scrollbar { height: 8px; width: 8px; }
        .hops-shell .hops-scroll::-webkit-scrollbar-thumb {
          background: ${OPS.line}; border-radius: 8px;
        }
        .hops-shell .hops-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PROTOTYPE BANNER — the mandatory, unmissable honesty banner. Persistent,
// high-contrast, placed at the very top of the shell content (not a footnote).
// ---------------------------------------------------------------------------
export function PrototypeBanner() {
  return (
    <div
      className="relative z-20 border-b"
      style={{ borderColor: OPS.line, background: `linear-gradient(90deg, ${OPS.redDeep}, ${OPS.amberDeep})` }}
      role="note"
      aria-label="Concept prototype disclosure"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
        <span className="hops-pill shrink-0 bg-black/25 text-white">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
            <path d="M8 1.5 L15 14 H1 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M8 6 V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11.6" r="0.9" fill="currentColor" />
          </svg>
          Concept prototype
        </span>
        <p className="text-[12.5px] font-medium leading-snug text-white/95 sm:text-[13px]">
          Sample / fictional data throughout. This is a portfolio concept demo of a heli-ski / heli-charter
          operations platform — <strong className="font-bold">not a certified or currently-in-use operational
          safety system</strong>, and <strong className="font-bold">not affiliated with or representing any
          specific real operator</strong>. Every aircraft, person, and guest shown is invented for demonstration.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SECTION HEADING helper
// ---------------------------------------------------------------------------
export function SectionHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="mb-6">
      <div className="hops-eyebrow mb-2">{eyebrow}</div>
      <h2 className="hops-display text-2xl sm:text-3xl" style={{ color: OPS.snow }}>
        {title}
      </h2>
      <div className="hops-rule mt-3" />
      {blurb && (
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: OPS.textMuted }}>
          {blurb}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SAMPLE-DATA TAG — small inline chip to stamp fictional data wherever it
// appears close to the numbers, reinforcing the banner.
// ---------------------------------------------------------------------------
export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`hops-pill ${className}`}
      style={{ background: "rgba(94,200,232,.12)", color: OPS.ice, border: `1px solid rgba(94,200,232,.35)` }}
    >
      Sample data
    </span>
  );
}
