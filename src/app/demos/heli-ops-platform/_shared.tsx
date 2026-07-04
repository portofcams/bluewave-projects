"use client";

// Shared theme shell + presentational primitives for the Heli-Ops Platform
// concept demo (Module 1: Scheduling / Manifest Board; Module 2 lands in the
// same page.tsx via a parallel build).
//
// NOTE ON "use client": added for Module 6 / feature 26 (dark/light mode) —
// OpsShell, PrototypeBanner, SectionHeading, and SampleTag now live inside
// the same file as <ThemeProvider>/useTheme(), which need real hook state.
// page.tsx (a Server Component, since it exports `metadata`) can still
// import and render all of these normally; Next.js simply treats this file
// as a client boundary from here down. No behavior changes for the
// presentational exports that don't touch theme state.
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
//
// -----------------------------------------------------------------------
// MODULE 6, FEATURE 26 — DARK/LIGHT MODE
//
// Every one of the 7 existing modules reads colors via `OPS.snow`,
// `OPS.ice`, etc. as plain object-property access baked into hundreds of
// inline `style={{...}}` props — NOT via CSS classes or CSS variables. To
// genuinely re-theme the whole demo WITHOUT rewriting every inline style
// across 7 files (a huge regression-risk surface the build brief explicitly
// flags), `OPS` below is turned into a single mutable object whose values
// are swapped in place by `applyOpsPalette()` whenever the theme toggles.
// Every module keeps importing `OPS` exactly as before and reading
// `OPS.xxx` exactly as before — nothing in Modules 1-5 needs to change.
// The genuine reactivity comes from `<ThemeProvider>`: it mutates the
// shared `OPS` object AND bumps a version number in React context, so every
// component that calls `useTheme()` (directly, or indirectly by being
// inside <OpsShell>, which itself calls it) re-renders and reads the
// freshly-mutated OPS values on its next paint. Components that don't call
// useTheme() themselves still repaint correctly because OpsShell wraps the
// entire page and a mode change re-renders its whole subtree.
// -----------------------------------------------------------------------

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/heli-ops-platform";

export type OpsMode = "dark" | "light";

// NOTE ON `snow` vs `cardSurface`: auditing every existing call site (see
// build notes) showed `OPS.snow` is used ~54 times, and all but two of those
// are TEXT color (headings, big stat numbers, select-dropdown text) meant to
// read as "the brightest, highest-contrast ink against the shell/panel
// background" — i.e. it behaves exactly like a second "heading" text color,
// not a surface. The only two genuine BACKGROUND usages (the manifest
// guide-group card in ManifestBoard.tsx and the `.hops-card` CSS class
// below) are repointed to the new `cardSurface` key, which stays a constant
// light "paper manifest" white in BOTH modes (a printed manifest card reads
// as light-on-a-clipboard regardless of whether the room lights are on) —
// see applyOpsPalette() below, which intentionally does NOT vary
// cardSurface/inkOnSnow/mutedOnSnow by mode. `snow` itself is genuinely
// theme-aware: near-white heading text on the dark shell, dark ink heading
// text on the light shell, so every one of those 52 text-color call sites
// re-themes correctly with zero edits to Modules 1-5.
export type OpsPalette = {
  night: string;
  charcoal: string;
  slate: string;
  slateSoft: string;
  line: string;
  snow: string;
  snowDim: string;
  cardSurface: string;
  ice: string;
  iceDeep: string;
  amber: string;
  amberDeep: string;
  red: string;
  redDeep: string;
  green: string;
  text: string;
  textMuted: string;
  inkOnSnow: string;
  mutedOnSnow: string;
};

// ---------------------------------------------------------------------------
// DARK PALETTE (original / default) — slate/charcoal ops base, snow-white
// cards, amber/red alert, ice-blue info accent. Unchanged from the pre-
// Module-6 build.
// ---------------------------------------------------------------------------
const DARK_PALETTE: OpsPalette = {
  night: "#0a0e14", // deepest charcoal
  charcoal: "#12161f", // base panel ink
  slate: "#1b212d", // card/section base
  slateSoft: "#242b3a", // raised panel
  line: "#333c4d", // hairlines / dividers
  snow: "#f5f7fa", // heading/emphasis text — near-white against the dark shell
  snowDim: "#e4e8ee", // dimmer snow surface
  cardSurface: "#f5f7fa", // manifest / guide-group card background (constant)
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
};

// ---------------------------------------------------------------------------
// LIGHT PALETTE — a genuine, deliberately-chosen light equivalent, not a
// blind CSS invert. The "night/charcoal" shell background becomes a soft
// alpine-daylight off-white; "slate" panels become white cards with a
// visible cool-gray border (since they can no longer rely on being lighter
// than a dark shell to read as "raised"); `snow` (heading text) flips to a
// dark ink so headings stay legible against the now-light shell/panels,
// while `cardSurface` (the manifest card's paper-white background) and
// `inkOnSnow`/`mutedOnSnow` (text ON that card) are deliberately UNCHANGED
// from dark mode — see applyOpsPalette(). Every accent (ice/amber/red/green)
// is deepened from its dark-mode value so it clears WCAG-AA-ish contrast
// against a white/near-white surface — verified below by spot-checking each
// pairing, not assumed.
// ---------------------------------------------------------------------------
const LIGHT_PALETTE: OpsPalette = {
  night: "#eef1f6", // page background — soft alpine-daylight off-white
  charcoal: "#e4e9f0", // gradient partner for the shell background wash
  slate: "#ffffff", // card/section base — white panel
  slateSoft: "#ffffff", // raised panel — same white, border does the lifting
  line: "#c7cedb", // hairlines / dividers — visible on white
  snow: "#12161f", // heading/emphasis text — dark ink against the light shell
  snowDim: "#e4e8ee", // dimmer snow surface (expanded guest row) — unchanged
  cardSurface: "#f5f7fa", // manifest / guide-group card background (constant)
  // ice-blue info accent — the eyebrow/label use of this color is small
  // (11px) bold uppercase text, which does NOT qualify for WCAG's large-
  // text 3:1 exemption (that requires ~18.7px bold or ~24px regular); the
  // first attempt here (#0f7ea3) measured only 4.09:1 against the light
  // shell background — verified via a real contrast calculation, not
  // assumed — so it's deepened further to comfortably clear AA (7.07:1).
  ice: "#0a5773",
  iceDeep: "#083f52", // deep ice-blue, kept proportionally darker than ice
  // amber caution accent — first attempt (#a15f00) measured 4.47:1 against
  // the light shell, just under the 4.5:1 AA threshold for the same small-
  // bold-text reason as `ice` above; nudged darker to clear it (5.69:1).
  amber: "#8a5100",
  amberDeep: "#7a4700", // deep amber
  red: "#c22127", // alert red — deepened for AA contrast on white
  redDeep: "#8f181d", // deep red
  green: "#0f7a4f", // ok / within-limit green — deepened for AA contrast on white
  text: "#161b26", // primary body text (on light shell)
  textMuted: "#525d70", // secondary text (on light shell)
  inkOnSnow: "#131722", // body text on snow cards — unchanged, already dark-on-light
  mutedOnSnow: "#5b6579", // secondary text on snow cards — unchanged
};

const PALETTE_BY_MODE: Record<OpsMode, OpsPalette> = {
  dark: DARK_PALETTE,
  light: LIGHT_PALETTE,
};

// `OPS` is a single mutable object, seeded with the dark palette so every
// existing import (`import { OPS } from "./_shared"`) and every existing
// `OPS.snow` / `OPS.ice` / etc. read keeps working with zero changes to
// Modules 1-5. `applyOpsPalette()` below mutates its VALUES in place (never
// reassigns the binding) whenever the theme changes.
export const OPS: OpsPalette = { ...DARK_PALETTE };

// Tracks the current mode alongside OPS itself, so `panelTint()` below (a
// plain function, not a React hook) can compute a theme-correct value at
// whatever render happens to call it — same "mutate in place, re-render via
// useTheme() elsewhere" mechanism as OPS, just for a derived value instead
// of a fixed palette slot.
let currentOpsMode: OpsMode = "dark";

function applyOpsPalette(mode: OpsMode) {
  currentOpsMode = mode;
  const palette = PALETTE_BY_MODE[mode];
  (Object.keys(palette) as (keyof OpsPalette)[]).forEach((key) => {
    OPS[key] = palette[key];
  });
}

// ---------------------------------------------------------------------------
// PANEL TINT — dozens of call sites across every module use a very faint
// `rgba(255,255,255,.02–.08)` white tint to give a sub-row/sub-header inside
// a `.hops-panel` a barely-raised look against that panel's own dark
// background. On a WHITE `.hops-panel` (light mode), a white-on-white tint
// at that alpha is invisible — not illegible (the text colors are still
// correctly theme-aware), just visually flat. `panelTint(alpha)` returns the
// exact same dark-mode string as before when `mode === "dark"` (zero visual
// change there), and a matching dark-on-white tint in light mode so that
// same "barely raised" read survives the theme flip. Call sites pass the
// SAME alpha value they used to hardcode, e.g. `panelTint(0.02)` in place of
// the literal `"rgba(255,255,255,.02)"`.
// ---------------------------------------------------------------------------
export function panelTint(alpha: number): string {
  if (currentOpsMode === "dark") return `rgba(255,255,255,${alpha})`;
  const lightAlpha = Math.min(1, alpha * 1.6); // clamp — some call sites (e.g. a marker ring border) pass alpha up to .7
  return `rgba(15,22,31,${lightAlpha})`;
}

export type OpsAccent = "ice" | "amber" | "red" | "green" | "slate";

export const accentSolid: Record<OpsAccent, string> = {
  ice: OPS.ice,
  amber: OPS.amber,
  red: OPS.red,
  green: OPS.green,
  slate: OPS.line,
};

// ---------------------------------------------------------------------------
// THEME CONTEXT — real, persisted mode state. `localStorage` (not
// sessionStorage) is deliberately chosen for feature 26's toggle, since a
// display preference like light/dark is exactly the kind of setting a real
// viewer would expect to persist across visits/tabs — unlike this demo's
// other session-only settings (Settings panel numbers, the incident log),
// which are explicitly framed as "resets on reload." That distinction is
// called out in the toggle's own UI copy so it doesn't read as inconsistent
// with the rest of the demo's honesty framing.
//
// `applyOpsPalette()` mutates the shared `OPS` object the moment `mode`
// changes (both on mount and on every toggle), and `version` is bumped in
// the same state update so every consumer of `useTheme()` re-renders and
// repaints with the freshly-mutated OPS values. `<OpsShell>` itself calls
// `useTheme()`, so its whole subtree (the entire page) re-renders on toggle.
// ---------------------------------------------------------------------------
const THEME_STORAGE_KEY = "hops-demo-theme-mode";

type ThemeContextValue = {
  mode: OpsMode;
  toggleMode: () => void;
  setMode: (mode: OpsMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredMode(): OpsMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" ? "light" : "dark";
  } catch {
    return "dark"; // localStorage can throw in locked-down/private contexts — fall back honestly to the default
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Seeded "dark" on the server and on first client render (so SSR/CSR markup
  // matches, avoiding a hydration mismatch), then genuinely synced from
  // localStorage in an effect right after mount — a real, if very brief,
  // dark-mode flash on a light-mode return visit is the honest tradeoff for
  // not risking a hydration error; it self-corrects within one paint.
  const [mode, setModeState] = useState<OpsMode>("dark");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const stored = readStoredMode();
    applyOpsPalette(stored);
    setModeState(stored);
    setVersion((v) => v + 1);
  }, []);

  const setMode = useCallback((next: OpsMode) => {
    applyOpsPalette(next);
    setModeState(next);
    setVersion((v) => v + 1);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage can throw in locked-down/private contexts — the mode
      // still genuinely applies for this page view, it just won't persist.
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, toggleMode, setMode }),
    // `version` is intentionally in the dep array even though it isn't read
    // in the object below — its only job is to force a fresh `value`
    // reference (and therefore a re-render of every consumer) on toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, toggleMode, setMode, version]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme() must be used within <ThemeProvider>");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// THEME TOGGLE BUTTON — a genuine control, not decorative. Rendered inside
// <OpsShell> (see below) so it's present on every module without each one
// needing to place it individually.
// ---------------------------------------------------------------------------
export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleMode}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="hops-mono flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
      style={{
        background: isDark ? "rgba(255,255,255,.06)" : "rgba(15,22,31,.06)",
        color: OPS.textMuted,
        borderColor: OPS.line,
      }}
    >
      <span aria-hidden="true">{isDark ? "🌙" : "☀️"}</span>
      {isDark ? "Dark" : "Light"}
      <span className="sr-only">— toggle dark/light mode (saved to this browser)</span>
    </button>
  );
}

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
  // Calling useTheme() here means OpsShell (and therefore its ENTIRE
  // children subtree — every module on this page) genuinely re-renders the
  // moment ThemeToggle flips `mode`, which is what makes the mutated OPS
  // object's fresh values actually reach every component's next paint,
  // not just this file's own JSX.
  const { mode } = useTheme();
  const isDark = mode === "dark";

  // Texture/tint values that must flip direction between modes (a "light
  // hairline on dark" texture would be invisible-to-wrong on a light shell,
  // and vice versa) are computed here rather than hardcoded, since they
  // aren't part of the OPS palette itself.
  const textureLine = isDark ? "rgba(255,255,255,.015)" : "rgba(15,22,31,.03)";
  const navLinkColor = isDark ? "rgba(233,237,243,.78)" : "rgba(22,27,38,.72)";
  const selectionBg = isDark ? "rgba(94,200,232,.30)" : "rgba(15,126,163,.22)";

  return (
    <div className={`hops-shell ${className}`} data-hops-theme={mode}>
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
            repeating-linear-gradient(115deg, ${textureLine} 0px, ${textureLine} 1px, transparent 1px, transparent 68px),
            linear-gradient(175deg, ${OPS.charcoal} 0%, ${OPS.night} 100%);
        }
        .hops-shell ::selection { background: ${selectionBg}; }

        /* Site Nav is styled for light-on-dark by default; in light mode it
           needs a dark-on-light equivalent to stay legible against the now-
           light shell background. */
        .hops-shell nav a { color: ${navLinkColor}; }
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

        /* ops panel (charcoal card in dark mode / white card in light mode) */
        .hops-shell .hops-panel {
          background: linear-gradient(180deg, ${OPS.slateSoft}, ${OPS.slate});
          border: 1px solid ${OPS.line};
          border-radius: 14px;
          box-shadow: 0 10px 28px -16px rgba(0,0,0,.6);
        }

        /* snow-white manifest card (readable data surface) — a constant
           "paper manifest" white in BOTH modes, see OpsPalette.cardSurface. */
        .hops-shell .hops-card {
          background: ${OPS.cardSurface};
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
  // NOTE ON useTheme() HERE: PrototypeBanner is rendered as `<PrototypeBanner
  // />` directly inside page.tsx (a Server Component), then passed down as a
  // static `children` element into <OpsShell>. A Server Component's element
  // tree is created exactly once; React does NOT re-invoke this component
  // just because a sibling client component (OpsShell) later re-renders on
  // its own state/context change — verified by hand-tracing a real toggle,
  // the exact same gap fixed in PageBody.tsx (see that file's comment for
  // the full explanation). Calling useTheme() is what subscribes this
  // component to theme changes so its border color genuinely updates too.
  useTheme();

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
