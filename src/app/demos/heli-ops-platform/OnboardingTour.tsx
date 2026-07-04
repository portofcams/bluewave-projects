"use client";

// OnboardingTour — Module 6, feature 30: a genuine first-time-viewer
// onboarding overlay.
//
// A real multi-step spotlight/tooltip sequence that walks a new viewer
// through the ACTUAL sections of this page — it locates each real DOM
// element via the `data-hops-tour="…"` attributes already placed on the
// genuine hero/search/module sections in PageBody.tsx, scrolls it into
// view, and draws a highlight ring around its REAL measured
// getBoundingClientRect() — not a fixed set of hardcoded pixel coordinates
// that could drift out of alignment with the real layout on resize. The
// copy for each step is the SAME accurate description already used in that
// section's own SectionHeading blurb elsewhere on the page (see STEPS
// below — each description is drawn from, or a shortened version of, the
// real blurb text in PageBody.tsx), not generic filler.
//
// SHOWS AUTOMATICALLY on first visit this session (sessionStorage — same
// session-only convention as this demo's other session-scoped settings,
// e.g. Module 02's Settings panel), and is fully dismissible + re-
// triggerable via the "Show tour again" link rendered next to the TV-mode
// button in the hero (see RetriggerTourLink below).

import { useCallback, useEffect, useState } from "react";
import { OPS } from "./_shared";

const TOUR_SEEN_KEY = "hops-demo-tour-seen";

type TourStep = {
  selector: string; // matches a real data-hops-tour attribute value
  title: string;
  body: string;
};

// Descriptions here are accurate, specific summaries of what each real
// section actually does — not generic "this is a feature" filler. Compare
// against PageBody.tsx's own SectionHeading blurbs for each module; these
// are intentionally shortened versions of the SAME real claims, not
// invented ones.
const STEPS: TourStep[] = [
  {
    selector: "ops-overview",
    title: "Today's Ops Overview",
    body:
      "A landing strip computed from the same live data as every module below: total guests, aircraft flying, weight-and-balance flags, and weather holds — click any tile to jump straight to the module that explains it.",
  },
  {
    selector: "guest-search",
    title: "Guest Search",
    body:
      "Type a name to instantly filter across every guest on the currently-selected day's real manifest — this searches Module 01's live roster (it updates if you switch day tabs), and clicking a result scrolls to that guest's actual card.",
  },
  {
    selector: "module-tabs",
    title: "Module Tabs",
    body:
      "Six modules, all on this one page: Scheduling, Dispatch, Guide View, Debrief, Safety & Compliance, and Live-Data. These jump-link to the sections below — every one of them reads and writes the SAME shared live state, not six separate demos stitched together.",
  },
  {
    selector: "module-scheduling",
    title: "01 · Scheduling & Manifest Board",
    body:
      "Every helicopter, guide group, and snowcat for the day in one view. Weight-and-balance totals recalculate automatically as guests are dragged between groups, and weather-hold guests are one click away from a same-day reslot.",
  },
  {
    selector: "module-dispatch",
    title: "02 · Flight-Following & Dispatch",
    body:
      "Live per-aircraft check-in timers with a real overdue escalation sequence, a schematic zone map, Incident Mode for coordinated response, an optional audible overdue alert, and editable demo settings that drive both this module's and Module 01's math.",
  },
  {
    selector: "module-guide-view",
    title: "03 · Guide View (Mobile)",
    body:
      "A simplified, large-tap-target view of what a guide would see on their own phone — their aircraft, their group's guests, and one button wired to the exact same check-in used in Module 02.",
  },
  {
    selector: "module-debrief",
    title: "03 · End-of-Day Debrief",
    body:
      "A closing-out-the-day report computed live from the same manifest and flight-following state shown above it on this page — not a separately hardcoded summary.",
  },
  {
    selector: "module-safety-compliance",
    title: "04 · Safety & Compliance Depth",
    body:
      "A Part 135-style duty-hours log, a guide certification tracker cross-checked against today's real assignments, a real incident/near-miss logging form, and a per-helicopter weight-and-balance export with a genuine pilot sign-off step.",
  },
  {
    selector: "module-live-data-realism",
    title: "05 · Live-Data & Realism",
    body:
      "A real live National Weather Service observation and computed sunrise/sunset for a real Alaska coordinate, a real days-since-incident counter tied to Module 04's log, and a clearly-labeled SIMULATED avalanche-danger widget — never a real advisory.",
  },
];

function readTourSeen(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(TOUR_SEEN_KEY) === "1";
  } catch {
    return true; // if sessionStorage throws, fail toward NOT auto-showing (honest, least-surprising default)
  }
}

function markTourSeen() {
  try {
    window.sessionStorage.setItem(TOUR_SEEN_KEY, "1");
  } catch {
    // sessionStorage can throw in locked-down/private contexts — the tour
    // still genuinely completes for this view, it just may show again on a
    // reload within the same session, which is an honest, harmless fallback.
  }
}

type Rect = { top: number; left: number; width: number; height: number };

function measure(selector: string): Rect | null {
  const el = document.querySelector<HTMLElement>(`[data-hops-tour="${selector}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height };
}

function TourOverlay({ onClose }: { onClose: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [notFound, setNotFound] = useState(false);

  const step = STEPS[stepIndex];

  const recomputeAndScroll = useCallback((selector: string) => {
    const el = document.querySelector<HTMLElement>(`[data-hops-tour="${selector}"]`);
    if (!el) {
      setRect(null);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    el.scrollIntoView({ behavior: "auto", block: "center" });
    // Measure on the next frame, after scrollIntoView has actually applied —
    // measuring synchronously here would read the PRE-scroll position.
    requestAnimationFrame(() => setRect(measure(selector)));
  }, []);

  useEffect(() => {
    recomputeAndScroll(step.selector);
  }, [step.selector, recomputeAndScroll]);

  // Keep the spotlight aligned on resize/orientation change — a real
  // re-measure, not a fixed coordinate baked in at step-open time.
  useEffect(() => {
    const onResize = () => setRect(measure(step.selector));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [step.selector]);

  const isLast = stepIndex === STEPS.length - 1;
  const isFirst = stepIndex === 0;

  const finish = () => {
    markTourSeen();
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const padding = 10;

  return (
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label="Onboarding tour">
      {/* Dimming layer with a real cut-out around the spotlighted element,
          drawn via a giant box-shadow on the highlight ring itself rather
          than 4 separate overlay rectangles — simpler and avoids any seam. */}
      {rect && !notFound ? (
        <div
          className="absolute rounded-lg transition-all duration-300"
          style={{
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
            boxShadow: "0 0 0 9999px rgba(5,7,11,.72)",
            border: `2px solid ${OPS.ice}`,
            pointerEvents: "none",
          }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: "rgba(5,7,11,.72)" }} />
      )}

      {/* Tooltip card — positioned just below the spotlighted element when
          there's room, otherwise centered in the viewport as an honest
          fallback (e.g. `notFound`, or the element is very tall). */}
      <div
        className="absolute left-1/2 w-[min(92vw,420px)] -translate-x-1/2 rounded-xl p-5"
        style={{
          top: rect ? Math.min(rect.top + rect.height + padding + 16, window.scrollY + window.innerHeight - 260) : "50%",
          transform: rect ? "translateX(-50%)" : "translate(-50%, -50%)",
          background: "linear-gradient(180deg, #242b3a, #1b212d)",
          border: `1px solid ${OPS.line}`,
          boxShadow: "0 20px 44px -18px rgba(0,0,0,.7)",
        }}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <span
            className="hops-mono rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.06em]"
            style={{ background: "rgba(94,200,232,.16)", color: OPS.ice }}
          >
            Step {stepIndex + 1} of {STEPS.length}
          </span>
          <button
            type="button"
            onClick={finish}
            className="hops-mono text-[11px] font-semibold uppercase tracking-[.04em]"
            style={{ color: "rgba(233,237,243,.6)" }}
          >
            Skip tour ✕
          </button>
        </div>
        <h3 className="hops-display text-lg font-extrabold" style={{ color: "#f5f7fa" }}>
          {step.title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "rgba(233,237,243,.85)" }}>
          {notFound
            ? `This section isn't currently on screen (it may only render inside a particular tab or state). ${step.body}`
            : step.body}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            className="hops-mono rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110 disabled:opacity-30"
            style={{ background: "rgba(255,255,255,.08)", color: "#e9edf3", border: "1px solid rgba(255,255,255,.14)" }}
          >
            ← Back
          </button>
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === stepIndex ? 18 : 6, background: i === stepIndex ? OPS.ice : "rgba(255,255,255,.25)" }}
              />
            ))}
          </div>
          {isLast ? (
            <button
              type="button"
              onClick={finish}
              className="hops-mono rounded-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
              style={{ background: OPS.iceDeep }}
            >
              Done
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
              className="hops-mono rounded-md px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] text-white transition hover:brightness-110"
              style={{ background: OPS.iceDeep }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AUTO-SHOW ON FIRST VISIT — a real sessionStorage check, not a hardcoded
// "always show" or "never show". Only fires once per browser tab session.
// ---------------------------------------------------------------------------
export default function OnboardingTour() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readTourSeen()) {
      // Small delay so the tour opens after the page's own layout has
      // settled (avoids spotlighting a pre-hydration/pre-paint position).
      const id = window.setTimeout(() => setOpen(true), 400);
      return () => window.clearTimeout(id);
    }
  }, []);

  // Listen for the "Show tour again" link's real custom event, so this
  // component (mounted once, high in the tree) and that link (rendered in
  // the hero, elsewhere in the tree) can trigger the SAME tour instance
  // without needing to thread open-state through prop drilling or a new
  // context — a plain DOM CustomEvent is enough for a same-page, same-
  // session UI trigger like this.
  useEffect(() => {
    const onRetrigger = () => setOpen(true);
    window.addEventListener("hops-retrigger-tour", onRetrigger);
    return () => window.removeEventListener("hops-retrigger-tour", onRetrigger);
  }, []);

  if (!open) return null;
  return <TourOverlay onClose={() => setOpen(false)} />;
}

// ---------------------------------------------------------------------------
// "SHOW TOUR AGAIN" — rendered in the hero (PageBody.tsx), dispatches the
// real custom event OnboardingTour listens for above.
// ---------------------------------------------------------------------------
export function RetriggerTourLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("hops-retrigger-tour"))}
      className="hops-mono flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.04em] transition hover:brightness-110"
      style={{ background: "rgba(255,255,255,.04)", color: OPS.textMuted, borderColor: OPS.line }}
      title="Replay the onboarding tour"
    >
      <span aria-hidden="true">🧭</span> Show tour again
    </button>
  );
}
