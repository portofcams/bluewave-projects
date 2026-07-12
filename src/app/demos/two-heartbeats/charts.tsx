"use client";

// Charts for "One island, two heartbeats" — hand-rolled SVG per the dataviz
// skill: 2px round-join lines, ≥8px markers with a 2px surface ring, hairline
// solid gridlines, legend always present for two series plus selective direct
// end-labels, crosshair + one tooltip listing every series (values lead, line
// keys not boxes), per-cell hover with lift on the heatmap, 2px surface gaps
// between cells, table views so tooltips never gate, keyboard parity
// (focus + arrow keys), chart text in system sans + ink tokens only.
//
// Palette roles come from _shared.tsx (validated pair: north #3987e5 /
// south #c98500 on surface #16273a; sequential ramp = one blue hue,
// dark→light so low recedes into the dark surface and high glows).

import { Fragment, useCallback, useRef, useState } from "react";
import { THB } from "./_shared";

const M_TO_FT = 3.28084;
const fmtM = (v: number) => `${v.toFixed(2)} m`;
const fmtFt = (v: number) => `${(v * M_TO_FT).toFixed(1)} ft`;

// ---------------------------------------------------------------------------
// Tooltip chrome (shared): values lead in primary ink; series keyed by a short
// stroke of its color; all text system sans on the raised surface.
// ---------------------------------------------------------------------------
function TipRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" style={{ width: 12, height: 2.5, borderRadius: 2, background: color, flex: "0 0 auto" }} />
      <span className="font-semibold" style={{ color: THB.ink }}>{value}</span>
      <span style={{ color: THB.muted }}>{label}</span>
    </div>
  );
}

function TipBox({ x, w, title, children }: { x: number; w: number; title: string; children: React.ReactNode }) {
  // flip side so the tooltip never leaves the frame
  const left = x < w * 0.55;
  return (
    <div
      className="thb-sans pointer-events-none absolute top-2 z-10 rounded-lg px-3 py-2 text-[12px] leading-relaxed"
      style={{
        [left ? "left" : "right"]: left ? Math.min(x + 14, w - 170) : Math.max(w - x + 14, 8),
        background: THB.surfaceUp,
        border: `1px solid ${THB.border}`,
        boxShadow: "0 8px 24px -12px rgba(0,0,0,.6)",
        minWidth: 150,
      } as React.CSSProperties}
    >
      <div className="mb-1 text-[10px] uppercase tracking-[0.12em]" style={{ color: THB.muted }}>{title}</div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SEASON LINES — the counter-phase chart. Modes drive the scrolly reveal:
//   "north" — north line, south ghosted · "south" — reverse ·
//   "both" — full duet (+ optional live "today" dots via `now`)
// ---------------------------------------------------------------------------
export type NowDots = { monthIdx: number; north: number | null; south: number | null; live: boolean } | null;

export function SeasonLines({
  months,
  north,
  south,
  mode,
  now = null,
  caption,
}: {
  months: string[];
  north: (number | null)[];
  south: (number | null)[];
  mode: "north" | "south" | "both";
  now?: NowDots;
  caption: string;
}) {
  const W = 640, H = 360, L = 44, R = 16, T = 18, B = 34;
  const iw = W - L - R, ih = H - T - B;
  const yMax = 2.6; // fixed: honest shared scale, north's drum vs south's pulse
  const xOf = (i: number) => L + (i / 11) * iw;
  const yOf = (v: number) => T + ih - (v / yMax) * ih;

  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const path = (vals: (number | null)[]) =>
    vals.map((v, i) => (v == null ? "" : `${i === 0 || vals[i - 1] == null ? "M" : "L"} ${xOf(i).toFixed(1)} ${yOf(v).toFixed(1)}`)).join(" ");

  const ghost = "rgba(185,198,212,0.28)";
  const nColor = mode === "south" ? ghost : THB.north;
  const sColor = mode === "north" ? ghost : THB.south;

  const onMove = useCallback((e: React.PointerEvent) => {
    const el = svgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - L) / iw) * 11);
    setHover(Math.max(0, Math.min(11, i)));
  }, [iw]);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { setHover((h) => Math.min(11, (h ?? 0) + 1)); e.preventDefault(); }
    if (e.key === "ArrowLeft") { setHover((h) => Math.max(0, (h ?? 11) - 1)); e.preventDefault(); }
    if (e.key === "Escape") setHover(null);
  }, []);

  return (
    <figure className="relative m-0">
      {/* legend — always present for two series; line keys mirror the mark */}
      <div className="thb-sans mb-2 flex items-center gap-4 text-[12px]" style={{ color: THB.ink2 }}>
        <span className="flex items-center gap-1.5"><span style={{ width: 16, height: 2.5, borderRadius: 2, background: nColor }} />North Shore</span>
        <span className="flex items-center gap-1.5"><span style={{ width: 16, height: 2.5, borderRadius: 2, background: sColor }} />South Shore</span>
        {now?.live && (
          <span className="ml-auto rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
            style={{ borderColor: "rgba(95,208,160,.5)", background: "rgba(95,208,160,.14)", color: "#a6e6c8" }}>
            today · live
          </span>
        )}
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full select-none"
          role="application"
          aria-label={caption}
          tabIndex={0}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover((h) => h ?? 6)}
          onBlur={() => setHover(null)}
          onKeyDown={onKey}
          style={{ background: "var(--thb-surface)", borderRadius: 12, outline: "none", touchAction: "pan-y" }}
        >
          {/* hairline grid + clean ticks */}
          {[0, 1, 2].map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={yOf(v)} y2={yOf(v)} stroke={THB.grid} strokeWidth={1} />
              <text x={L - 8} y={yOf(v) + 4} textAnchor="end" fontSize={11} fill={THB.muted} className="thb-sans" style={{ fontVariantNumeric: "tabular-nums" }}>
                {v} m
              </text>
            </g>
          ))}
          <line x1={L} x2={W - R} y1={yOf(0)} y2={yOf(0)} stroke={THB.baseline} strokeWidth={1} />
          {months.map((m, i) => (
            <text key={m} x={xOf(i)} y={H - 12} textAnchor="middle" fontSize={10.5} fill={THB.muted} className="thb-sans">
              {m[0]}
            </text>
          ))}

          {/* crosshair — snaps to the month, never asks the reader to hit a 2px line */}
          {hover != null && <line x1={xOf(hover)} x2={xOf(hover)} y1={T} y2={T + ih} stroke={THB.ink2} strokeWidth={1} opacity={0.45} />}

          {/* the two series — 2px, round join/cap */}
          <path d={path(north)} fill="none" stroke={nColor} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={path(south)} fill="none" stroke={sColor} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {/* hover markers: ≥8px with a 2px surface ring */}
          {hover != null && north[hover] != null && (
            <circle cx={xOf(hover)} cy={yOf(north[hover]!)} r={4.5} fill={nColor} stroke={THB.surface} strokeWidth={2} />
          )}
          {hover != null && south[hover] != null && (
            <circle cx={xOf(hover)} cy={yOf(south[hover]!)} r={4.5} fill={sColor} stroke={THB.surface} strokeWidth={2} />
          )}

          {/* selective direct end-labels (Dec ends are well separated) */}
          {mode !== "south" && north[11] != null && (
            <text x={W - R - 2} y={yOf(north[11]!) - 8} textAnchor="end" fontSize={11} fontWeight={600} fill={THB.ink2} className="thb-sans">North</text>
          )}
          {mode !== "north" && south[11] != null && (
            <text x={W - R - 2} y={yOf(south[11]!) + 16} textAnchor="end" fontSize={11} fontWeight={600} fill={THB.ink2} className="thb-sans">South</text>
          )}

          {/* live "today" dots — placed at the current month on the climatology */}
          {now && now.north != null && (
            <g>
              <circle cx={xOf(now.monthIdx)} cy={yOf(Math.min(now.north, yMax))} r={5.5} fill={THB.north} stroke={THB.surface} strokeWidth={2} />
              <circle cx={xOf(now.monthIdx)} cy={yOf(Math.min(now.north, yMax))} r={9} fill="none" stroke={THB.north} strokeWidth={1.2} opacity={0.5} />
            </g>
          )}
          {now && now.south != null && (
            <g>
              <circle cx={xOf(now.monthIdx)} cy={yOf(Math.min(now.south, yMax))} r={5.5} fill={THB.south} stroke={THB.surface} strokeWidth={2} />
              <circle cx={xOf(now.monthIdx)} cy={yOf(Math.min(now.south, yMax))} r={9} fill="none" stroke={THB.south} strokeWidth={1.2} opacity={0.5} />
            </g>
          )}
        </svg>

        {/* the one tooltip — every series at the hovered X, values leading */}
        {hover != null && (
          <TipBox x={(xOf(hover) / W) * (svgRef.current?.getBoundingClientRect().width ?? W)} w={svgRef.current?.getBoundingClientRect().width ?? W} title={`${months[hover]} · monthly mean (2011–2025)`}>
            {north[hover] != null && <TipRow color={THB.north} label={`North · ${fmtFt(north[hover]!)}`} value={fmtM(north[hover]!)} />}
            {south[hover] != null && <TipRow color={THB.south} label={`South · ${fmtFt(south[hover]!)}`} value={fmtM(south[hover]!)} />}
          </TipBox>
        )}
      </div>

      <figcaption className="thb-sans mt-2 text-[11px] leading-relaxed" style={{ color: THB.muted }}>{caption}</figcaption>

      {/* table view — the tooltip never gates */}
      <details className="thb-table mt-2">
        <summary>View the data</summary>
        <table>
          <thead><tr><th scope="col">Month</th><th scope="col">North (m)</th><th scope="col">South (m)</th></tr></thead>
          <tbody>
            {months.map((m, i) => (
              <tr key={m}><td>{m}</td><td>{north[i]?.toFixed(2) ?? "—"}</td><td>{south[i]?.toFixed(2) ?? "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// HEAT STRIPS — years × months, one strip per shore, ONE shared sequential
// scale (the asymmetry must stay visible). Null months are visible holes.
// ---------------------------------------------------------------------------
export function HeatStrips({
  months,
  years,
  north,
  south,
  caption,
}: {
  months: string[];
  years: number[];
  north: (number | null)[][];
  south: (number | null)[][];
  caption: string;
}) {
  const [hover, setHover] = useState<{ shore: "North" | "South"; y: number; m: number; v: number } | null>(null);
  const VMAX = 2.5;
  const rampAt = (v: number) => THB.ramp[Math.max(0, Math.min(THB.ramp.length - 1, Math.floor((v / VMAX) * THB.ramp.length)))];

  const cell = 100 / 12; // percentage width per month
  const Strip = ({ label, grid }: { label: "North" | "South"; grid: (number | null)[][] }) => (
    <div className="thb-sans">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: THB.ink2 }}>
        <span style={{ width: 10, height: 10, borderRadius: 3, background: label === "North" ? THB.north : THB.south }} />
        {label} Shore
      </div>
      <div role="img" aria-label={`${label} Shore monthly mean wave height, ${years[0]}–${years[years.length - 1]}`}>
        {years.map((y, yi) => (
          <div key={y} className="flex items-center" style={{ gap: 2, marginBottom: 2 }}>
            <span className="w-9 shrink-0 text-right text-[9.5px]" style={{ color: THB.muted, fontVariantNumeric: "tabular-nums", paddingRight: 6 }}>
              {y}
            </span>
            <div className="flex min-w-0 flex-1" style={{ gap: 2 }}>
              {grid[yi].map((v, mi) => {
                const isHover = hover && hover.shore === label && hover.y === y && hover.m === mi;
                return (
                  <button
                    key={mi}
                    type="button"
                    aria-label={v == null ? `${months[mi]} ${y}: model gap` : `${months[mi]} ${y}: ${v.toFixed(2)} meters`}
                    onPointerEnter={() => v != null && setHover({ shore: label, y, m: mi, v })}
                    onFocus={() => v != null && setHover({ shore: label, y, m: mi, v })}
                    onPointerLeave={() => setHover(null)}
                    onBlur={() => setHover(null)}
                    className="block"
                    style={{
                      width: `${cell}%`,
                      height: 13,
                      borderRadius: 2.5,
                      border: v == null ? `1px dashed ${THB.grid}` : "none",
                      background: v == null ? "transparent" : rampAt(v),
                      outline: isHover ? `1.5px solid ${THB.ink}` : "none",
                      outlineOffset: 1,
                      padding: 0,
                      cursor: v == null ? "default" : "pointer",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <figure className="relative m-0">
      <div className="grid gap-4">
        <Strip label="North" grid={north} />
        <Strip label="South" grid={south} />
      </div>

      {/* shared ramp legend + gap key */}
      <div className="thb-sans mt-3 flex items-center gap-3 text-[10.5px]" style={{ color: THB.muted }}>
        <span>0 m</span>
        <div className="h-2 w-36 rounded-full" style={{ background: `linear-gradient(90deg, ${THB.ramp[0]}, ${THB.ramp[5]}, ${THB.ramp[11]})` }} />
        <span>{VMAX.toFixed(1)} m · monthly mean</span>
        <span className="ml-2 inline-block h-3 w-5 rounded-sm" style={{ border: `1px dashed ${THB.grid}` }} />
        <span>model gap</span>
      </div>

      {hover && (
        <div className="thb-sans pointer-events-none absolute right-2 top-2 z-10 rounded-lg px-3 py-2 text-[12px]"
          style={{ background: THB.surfaceUp, border: `1px solid ${THB.border}` }}>
          <div className="text-[10px] uppercase tracking-[0.12em]" style={{ color: THB.muted }}>{months[hover.m]} {hover.y} · {hover.shore}</div>
          <div className="font-semibold" style={{ color: THB.ink }}>{fmtM(hover.v)} <span className="font-normal" style={{ color: THB.muted }}>≈ {fmtFt(hover.v)}</span></div>
        </div>
      )}

      <figcaption className="thb-sans mt-2 text-[11px] leading-relaxed" style={{ color: THB.muted }}>{caption}</figcaption>

      <details className="thb-table mt-2">
        <summary>View the data</summary>
        <div style={{ maxHeight: 260, overflowY: "auto" }}>
          <table>
            <thead><tr><th scope="col">Year</th><th scope="col">Shore</th>{months.map((m) => <th key={m} scope="col">{m}</th>)}</tr></thead>
            <tbody>
              {years.map((y, yi) => (
                <Fragment key={y}>
                  <tr><td>{y}</td><td>North</td>{north[yi].map((v, i) => <td key={i}>{v?.toFixed(2) ?? "—"}</td>)}</tr>
                  <tr><td>{y}</td><td>South</td>{south[yi].map((v, i) => <td key={i}>{v?.toFixed(2) ?? "—"}</td>)}</tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// BIG DAYS — hero figure + the top modeled events per shore (south filtered to
// true swell). Hero ≥48px in the system sans, proportional figures.
// ---------------------------------------------------------------------------
export type StoryEvent = { date: string; hs: number; pper: number | null; pdir: number | null };

const evDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export function BigDays({
  north,
  southSwell,
  focus,
  filterNote,
}: {
  north: StoryEvent[];
  southSwell: StoryEvent[];
  focus: "north" | "south";
  filterNote: string;
}) {
  const hero = focus === "north" ? north[0] : southSwell[0];
  const list = focus === "north" ? north.slice(0, 6) : southSwell.slice(0, 6);
  const color = focus === "north" ? THB.north : THB.south;
  const max = Math.max(...list.map((e) => e.hs));

  return (
    <figure className="m-0">
      {/* hero figure — one per view, system sans, proportional figures */}
      <div className="thb-sans">
        <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: THB.muted }}>
          {focus === "north" ? "Largest modeled day · North Shore" : "Largest modeled south-swell day · South Shore"}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05, color: THB.ink }}>
          {hero ? `${hero.hs.toFixed(1)} m` : "—"}
          <span style={{ fontSize: 20, fontWeight: 600, color: THB.ink2, marginLeft: 10 }}>{hero ? `≈ ${fmtFt(hero.hs)} Hs` : ""}</span>
        </div>
        <div className="mt-1 text-[13px]" style={{ color: THB.ink2 }}>
          {hero ? `${evDate(hero.date)}${hero.pper ? ` · ${hero.pper.toFixed(0)} s` : ""}${hero.pdir != null ? ` from ${hero.pdir}°` : ""}` : ""}
        </div>
      </div>

      {/* lollipop list — thin marks, value labeled at the tip */}
      <div className="thb-sans mt-5 grid gap-2">
        {list.map((e) => (
          <div key={e.date} className="flex items-center gap-3 text-[12px]">
            <span className="w-24 shrink-0" style={{ color: THB.muted, fontVariantNumeric: "tabular-nums" }}>{evDate(e.date)}</span>
            <div className="relative h-[6px] min-w-0 flex-1 overflow-visible rounded-full" style={{ background: THB.grid }}>
              <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${(e.hs / max) * 100}%`, background: color }} />
              <span className="absolute top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full" style={{ left: `calc(${(e.hs / max) * 100}% - 5px)`, background: color, border: `2px solid ${THB.surface}` }} />
            </div>
            <span className="w-14 shrink-0 text-right font-semibold" style={{ color: THB.ink, fontVariantNumeric: "tabular-nums" }}>{e.hs.toFixed(2)} m</span>
          </div>
        ))}
      </div>

      <figcaption className="thb-sans mt-3 text-[11px] leading-relaxed" style={{ color: THB.muted }}>
        Model Hs at the story cell — not buoy heights, not wave faces. {focus === "south" ? filterNote : "Cross-checked against buoy records and documented swells."}
      </figcaption>

      <details className="thb-table mt-2">
        <summary>View the data</summary>
        <table>
          <thead><tr><th scope="col">Date (UTC)</th><th scope="col">Hs (m)</th><th scope="col">Peak period (s)</th><th scope="col">Direction (°)</th></tr></thead>
          <tbody>
            {(focus === "north" ? north : southSwell).map((e) => (
              <tr key={e.date}><td>{evDate(e.date)}</td><td>{e.hs.toFixed(2)}</td><td>{e.pper?.toFixed(1) ?? "—"}</td><td>{e.pdir ?? "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// NOW TILES — the live opening beat: two stat tiles (label · value · context),
// system sans, with the honest live/sample badge.
// ---------------------------------------------------------------------------
type BuoyReading = { heightFt: number; periodS: number | null; live: boolean } | null;

export function NowTiles({
  north,
  south,
  live,
  buoyNorth,
  buoySouth,
  sub,
}: {
  north: { hsFt: number; peakPeriodS: number | null; dirCardinal: string | null } | null;
  south: { hsFt: number; peakPeriodS: number | null; dirCardinal: string | null } | null;
  live: boolean;
  buoyNorth?: BuoyReading;
  buoySouth?: BuoyReading;
  sub: string;
}) {
  const Tile = ({
    label,
    color,
    d,
    buoy,
  }: {
    label: string;
    color: string;
    d: typeof north;
    buoy?: BuoyReading;
  }) => (
    <div className="rounded-xl p-4" style={{ background: THB.surface, border: `1px solid ${THB.border}` }}>
      <div className="thb-sans mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em]" style={{ color: THB.muted }}>
        <span style={{ width: 10, height: 3, borderRadius: 2, background: color }} />
        {label}
      </div>
      <div className="thb-sans" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.1, color: THB.ink }}>
        {d ? `${d.dirCardinal ? d.dirCardinal + " " : ""}${d.hsFt.toFixed(1)} ft` : "—"}
      </div>
      <div className="thb-sans mt-0.5 text-[11px]" style={{ color: THB.muted }}>
        {d?.peakPeriodS != null ? `${Math.round(d.peakPeriodS)} s period · modeled Hs` : "modeled Hs"}
      </div>
      {buoy && (
        <div className="thb-sans mt-1.5 flex items-center gap-1.5 text-[10px]" style={{ color: THB.muted }}>
          <span
            className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: buoy.live ? "#5fd0a0" : "rgba(207,224,230,.4)" }}
          />
          buoy {buoy.heightFt.toFixed(1)} ft{buoy.periodS != null ? `, ${buoy.periodS}s` : ""} ·{" "}
          {buoy.live ? "live NDBC" : "sample"}
        </div>
      )}
    </div>
  );
  return (
    <div>
      <div className="thb-sans mb-2 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: THB.muted }}>Oʻahu, right now</span>
        <span className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
          style={live
            ? { borderColor: "rgba(95,208,160,.5)", background: "rgba(95,208,160,.14)", color: "#a6e6c8" }
            : { borderColor: "rgba(207,224,230,.25)", background: "rgba(207,224,230,.08)", color: "rgba(207,224,230,.7)" }}>
          {live ? "Live · PacIOOS" : "Sample"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Tile label="North Shore" color={THB.north} d={north} buoy={buoyNorth} />
        <Tile label="South Shore" color={THB.south} d={south} buoy={buoySouth} />
      </div>
      <p className="thb-sans mt-2 text-[11px] leading-relaxed" style={{ color: THB.muted }}>{sub}</p>
    </div>
  );
}
