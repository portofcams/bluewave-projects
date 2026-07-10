"use client";

// Scrollytelling machinery for "One island, two heartbeats" — hand-rolled,
// dependency-free (IntersectionObserver + a sticky pane), static-export safe.
//
// Shape: a text column of <Step>s scrolls past a sticky graphic pane; the pane
// re-renders against the active step index, so the charts advance as the reader
// reads. On narrow screens the graphic pins to the top and the steps scroll
// beneath it on translucent cards (layout lives in _shared.tsx CSS).

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type ScrollyCtx = {
  active: number;
  register: (index: number, el: HTMLElement | null) => void;
};

const Ctx = createContext<ScrollyCtx | null>(null);

/**
 * <Scrolly graphic={(active) => <Charts step={active} />}>
 *   <Step index={0}>…prose…</Step>
 *   <Step index={1}>…prose…</Step>
 * </Scrolly>
 *
 * The active step is the last step whose center band has crossed the middle of
 * the viewport — steady under fast scrolling and correct when scrolling back up.
 */
export function Scrolly({
  graphic,
  children,
  className = "",
}: {
  graphic: (active: number) => React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const els = useRef(new Map<number, HTMLElement>());

  const register = useMemo(
    () => (index: number, el: HTMLElement | null) => {
      if (el) els.current.set(index, el);
      else els.current.delete(index);
    },
    []
  );

  useEffect(() => {
    // A step is "active" when its element straddles the horizontal band at the
    // middle of the viewport. Belt-and-suspenders: an IntersectionObserver for
    // efficiency PLUS an rAF-throttled scroll/resize listener (some embedded
    // webviews report a zero viewport or fire IO unreliably), both driving one
    // recompute. The viewport height falls back through clientHeight to 800 so
    // the math never divides by a broken zero.
    const recompute = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const mid = vh * 0.5;
      let best = 0;
      let bestDist = Infinity;
      for (const [idx, el] of els.current) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          best = idx;
          bestDist = -1;
          break;
        }
        const d = r.top > mid ? r.top - mid : mid - r.bottom;
        if (d < bestDist) {
          bestDist = d;
          best = idx;
        }
      }
      setActive((prev) => (prev === best ? prev : best));
    };

    const io = new IntersectionObserver(recompute, { rootMargin: "-49% 0px -49% 0px", threshold: 0 });
    for (const el of els.current.values()) io.observe(el);

    // setTimeout (not rAF) throttle: rAF never fires in hidden/background
    // tabs and some embedded panes, which would freeze the story's graphic.
    let pending: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (pending != null) return;
      pending = setTimeout(() => {
        pending = null;
        recompute();
      }, 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    recompute();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (pending != null) clearTimeout(pending);
    };
  }, []);

  const ctx = useMemo(() => ({ active, register }), [active, register]);

  return (
    <Ctx.Provider value={ctx}>
      <div className={`thb-scrolly ${className}`}>
        {/* Graphic FIRST in DOM: on mobile (block flow) it pins to the top and
            the steps scroll beneath it; on desktop the grid places it in
            column 2 with the text in column 1, both in row 1. Children render
            exactly ONCE — steps register their elements by index. */}
        <div className="thb-graphic-col">
          <div className="thb-sticky">{graphic(active)}</div>
        </div>
        <div className="thb-text-col">{children}</div>
      </div>
    </Ctx.Provider>
  );
}

export function Step({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ctx = useContext(Ctx);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ctx?.register(index, ref.current);
    return () => ctx?.register(index, null);
  }, [ctx, index]);

  return (
    <div ref={ref} className="thb-step" data-active={ctx ? ctx.active === index : false}>
      <div>{children}</div>
    </div>
  );
}
