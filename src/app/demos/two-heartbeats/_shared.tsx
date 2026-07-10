// Shared shell for "One island, two heartbeats" — a scroll-driven DATA STORY
// (editorial format, not a brochure): 15 years of Oʻahu surf from the PacIOOS
// SWAN hindcast, the North and South shores breathing out of phase.
//
// HONEST FRAMING: an independent editorial piece by BlueWave Projects built on
// public model data (PacIOOS SWAN — a MODEL hindcast, labeled as such, not
// buoys) and NOAA observations. Every number on the page traces to the baked
// dataset (generation date disclosed in the method notes) or to a live fetch.
// No photographs; the data itself is the artwork.
//
// DATAVIZ COMPLIANCE (per the dataviz skill, applied):
//   - Two categorical series — North #3987e5 / South #c98500 — VALIDATED with
//     scripts/validate_palette.js against this page's chart surface #16273a
//     (dark mode: ALL CHECKS PASS; worst adjacent CVD ΔE 113.5 ≥ 12).
//   - Sequential ramp (heatmap) = one blue hue; on this dark surface low values
//     recede toward the surface (dark) and high values glow light — lightness-
//     monotonic by construction.
//   - Chart text wears TEXT TOKENS in the system sans — never a serif, never a
//     series color. The editorial serif is for narrative prose only.
//   - This page is a deliberate single-theme (dark) editorial design; the
//     palette was validated against ITS surface, per the skill's dark-mode rule.
//
// THEME — "night ocean, editorial." Deep ocean-night canvas, Source Serif 4
// prose, storm-blue vs summer-gold as the two protagonists' colors. Deliberately
// unlike every brochure demo: typography-led, chart-led, no hero panel.
//
// SCOPING RULE: every style is namespaced under `.thb` (see <StoryShell>). No
// bare body/html/:root/h1/h2 selectors — nothing leaks.

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/two-heartbeats";

// ---------------------------------------------------------------------------
// PALETTE — roles, not raw hex, in the chart code. Series pair VALIDATED (see
// header). Sequential ramp = reference blue ramp, ordered dark→light for the
// dark surface (low recedes, high glows).
// ---------------------------------------------------------------------------
export const THB = {
  page: "#0b1320", // page plane — deep ocean night
  surface: "#16273a", // chart surface (palette validated against THIS)
  surfaceUp: "#1d3149", // raised surface (tooltips, cards)
  ink: "#f2f6fa", // primary text
  ink2: "#b9c6d4", // secondary text
  muted: "#7f92a6", // axis / captions
  grid: "#22364d", // hairline gridline, one step off surface
  baseline: "#2e4560", // axis baseline
  border: "rgba(255,255,255,0.10)",
  // the two protagonists (validated pair)
  north: "#3987e5", // storm blue — North Shore
  south: "#c98500", // summer gold — South Shore / Waikīkī
  // sequential ramp for magnitude on the DARK surface: index 0 = near zero
  // (recedes into the dark), last = maximum (glows light)
  ramp: ["#0d366b", "#104281", "#184f95", "#1c5cab", "#256abf", "#2a78d6", "#3987e5", "#5598e7", "#6da7ec", "#86b6ef", "#9ec5f4", "#cde2fb"],
} as const;

// ---------------------------------------------------------------------------
// STORY SHELL — scoped wrapper. Injects ONE <style> block under `.thb`:
// the committed dark editorial canvas, prose typography, scrolly layout, and
// the CSS custom properties the charts consume as roles.
// ---------------------------------------------------------------------------
export function StoryShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`thb ${className}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&display=swap');

        /* --- committed dark editorial canvas (scoped) --- */
        .thb {
          position: relative;
          background: ${THB.page};
          color: ${THB.ink2};
          font-family: 'Source Serif 4', Georgia, serif;
          line-height: 1.75;
          /* viz roles — charts reference these, never raw hex */
          --thb-page: ${THB.page};
          --thb-surface: ${THB.surface};
          --thb-surface-up: ${THB.surfaceUp};
          --thb-ink: ${THB.ink};
          --thb-ink2: ${THB.ink2};
          --thb-muted: ${THB.muted};
          --thb-grid: ${THB.grid};
          --thb-baseline: ${THB.baseline};
          --thb-north: ${THB.north};
          --thb-south: ${THB.south};
        }
        .thb ::selection { background: rgba(57,135,229,.35); }

        /* Site Nav sits on the dark canvas here — its white links already read
           correctly; just make sure links inherit properly. */
        .thb nav a { color: rgba(242,246,250,.75); }
        .thb nav a:hover { color: ${THB.ink}; }

        /* --- editorial typography (prose only; charts use the sans below) --- */
        .thb .thb-display {
          font-family: 'Source Serif 4', Georgia, serif;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: ${THB.ink};
        }
        .thb .thb-eyebrow {
          font-family: 'Inter', system-ui, sans-serif;
          text-transform: uppercase;
          letter-spacing: .3em;
          font-weight: 600;
          font-size: 11px;
          color: ${THB.muted};
        }
        .thb .thb-prose {
          max-width: 62ch;
          font-size: 1.075rem;
        }
        .thb .thb-prose strong { color: ${THB.ink}; font-weight: 600; }
        /* chart text & UI chrome: SYSTEM SANS + text tokens, per the dataviz
           skill — never serif, never series-colored */
        .thb .thb-sans {
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
        }
        .thb .thb-mono {
          font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
          letter-spacing: .02em;
        }

        /* series keys used in prose: a colored MARK beside neutral text (text
           never wears the data color) */
        .thb .thb-key {
          display: inline-block; width: 14px; height: 3px; border-radius: 2px;
          vertical-align: middle; margin-right: 6px; transform: translateY(-1px);
        }

        /* --- scrolly layout ---
           DOM order is [graphic, text] (mobile block flow wants the graphic
           pinned on top); on desktop the grid explicitly places text in
           column 1 and the graphic in column 2, both sharing row 1. The
           graphic column stretches to the full row height (default stretch —
           do NOT set align-items) so the sticky pane has room to travel. */
        .thb .thb-scrolly {
          display: grid;
          grid-template-columns: minmax(300px, 400px) 1fr;
          gap: clamp(1.5rem, 4vw, 4rem);
        }
        .thb .thb-graphic-col { grid-column: 2; grid-row: 1; min-width: 0; }
        .thb .thb-text-col { grid-column: 1; grid-row: 1; min-width: 0; }
        .thb .thb-sticky {
          position: sticky;
          top: 84px;
          height: calc(100vh - 108px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .thb .thb-step {
          min-height: 78vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0.32;
          transition: opacity .35s ease;
        }
        .thb .thb-step[data-active="true"] { opacity: 1; }
        .thb .thb-step:last-child { min-height: 60vh; }

        @media (max-width: 900px) {
          .thb .thb-scrolly { display: block; }
          /* the COLUMN is sticky on mobile — it travels within the whole tall
             scrolly container while the steps scroll beneath it */
          .thb .thb-graphic-col {
            position: sticky;
            top: 64px;
            z-index: 5;
            background: linear-gradient(${THB.page} 82%, transparent);
            padding-bottom: 12px;
          }
          .thb .thb-sticky {
            position: static;
            height: auto;
            max-height: 52vh;
          }
          .thb .thb-step {
            min-height: 62vh;
            opacity: 1; /* no dimming when text overlays scroll on mobile */
          }
          .thb .thb-step > div {
            background: rgba(11,19,32,.88);
            backdrop-filter: blur(6px);
            border: 1px solid ${THB.border};
            border-radius: 14px;
            padding: 1.1rem 1.25rem;
          }
        }

        /* --- chart card + table view --- */
        .thb .thb-card {
          background: ${THB.surface};
          border: 1px solid ${THB.border};
          border-radius: 16px;
        }
        .thb details.thb-table summary {
          cursor: pointer;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .14em;
          color: ${THB.muted};
        }
        .thb details.thb-table table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
        }
        .thb details.thb-table th, .thb details.thb-table td {
          text-align: right;
          padding: 4px 8px;
          border-bottom: 1px solid ${THB.grid};
          font-variant-numeric: tabular-nums;
          color: ${THB.ink2};
        }
        .thb details.thb-table th:first-child, .thb details.thb-table td:first-child { text-align: left; }
        .thb details.thb-table th { color: ${THB.muted}; font-weight: 600; }

        /* thin gold/blue rule for section breaks */
        .thb .thb-rule {
          width: 84px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, ${THB.north}, ${THB.south});
        }
      `}</style>
      {children}
    </div>
  );
}
