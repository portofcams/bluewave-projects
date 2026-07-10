// Aggregates the baked SWAN chunks into the tiny dataset the story page ships.
// Honesty rules baked in:
//  - climatology uses FULL years 2011–2025 only (2010/2026 are partial)
//  - a heatmap month needs ≥200 hourly points or it ships as null — the model's
//    gaps become VISIBLE holes in the chart, not hidden averages
//  - south events are filtered to genuine SOUTH SWELL (pper ≥ 12 s, pdir
//    150–230°) — raw-Hs ranking would headline winter Kona storm chop
//  - all math in UTC (disclosed); values are model Hs in meters at the cells
//
// Run after bake.mjs:  node aggregate.mjs
// Writes: ../../..../src? -> no: writes heartbeats-data.json HERE; the build
// copies it into the repo (kept out of node so paths stay simple).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const RAW = join(DIR, "raw");
const CAP = Date.parse("2026-07-08T23:00:00Z");

const CELLS = {
  north: { lat: 21.68, lon360: 201.94, lonW: -158.06 },
  south: { lat: 21.26, lon360: 202.17, lonW: -157.83 },
};

function loadShore(name) {
  const rows = [];
  const missing = [];
  for (let y = 2010; y <= 2026; y++) {
    const f = join(RAW, `${name}_${y}.json`);
    if (!existsSync(f)) { missing.push(y); continue; }
    let j;
    try {
      j = JSON.parse(readFileSync(f, "utf8"));
      if (!Array.isArray(j?.table?.rows)) throw new Error("no rows");
    } catch (e) {
      console.warn(`[aggregate] SKIPPING invalid ${name}_${y}.json (${e.message}) — REFETCH before shipping`);
      missing.push(y);
      continue;
    }
    for (const r of j.table.rows) {
      const t = Date.parse(r[0]);
      const hs = r[4];
      if (!Number.isFinite(t) || t > CAP) continue;
      if (hs == null || !Number.isFinite(hs)) continue;
      rows.push({ t, hs, pper: r[5], pdir: r[6] });
    }
  }
  rows.sort((a, b) => a.t - b.t);
  if (missing.length) console.warn(`[aggregate] ${name} is MISSING years: ${missing.join(", ")}`);
  return rows;
}

const north = loadShore("north");
const south = loadShore("south");
console.log(`hours: north=${north.length} south=${south.length}`);

const monthOf = (t) => new Date(t).getUTCMonth(); // 0-11
const yearOf = (t) => new Date(t).getUTCFullYear();

// ---- climatology (full years 2011–2025) ----
function climatology(rows) {
  const sum = Array(12).fill(0), n = Array(12).fill(0);
  for (const r of rows) {
    const y = yearOf(r.t);
    if (y < 2011 || y > 2025) continue;
    const m = monthOf(r.t);
    sum[m] += r.hs;
    n[m]++;
  }
  return sum.map((s, i) => (n[i] ? +(s / n[i]).toFixed(3) : null));
}

// ---- heatmap: year × month mean, null when < 200 hours ----
function heatmap(rows) {
  const acc = new Map(); // "y-m" -> {s,n}
  for (const r of rows) {
    const k = `${yearOf(r.t)}-${monthOf(r.t)}`;
    const a = acc.get(k) ?? { s: 0, n: 0 };
    a.s += r.hs;
    a.n++;
    acc.set(k, a);
  }
  const years = [];
  const grid = [];
  for (let y = 2010; y <= 2026; y++) {
    years.push(y);
    const row = [];
    for (let m = 0; m < 12; m++) {
      const a = acc.get(`${y}-${m}`);
      row.push(a && a.n >= 200 ? +(a.s / a.n).toFixed(3) : null);
    }
    grid.push(row);
  }
  return { years, grid };
}

// ---- dominance: paired hours, 2012–2025 ----
function dominance() {
  const sMap = new Map(south.map((r) => [r.t, r.hs]));
  let jjaS = 0, jjaN = 0, djfN = 0, djfT = 0, jjaT = 0;
  for (const r of north) {
    const y = yearOf(r.t);
    if (y < 2012 || y > 2025) continue;
    const s = sMap.get(r.t);
    if (s == null) continue;
    const m = monthOf(r.t) + 1;
    if (m === 6 || m === 7 || m === 8) {
      jjaT++;
      if (s > r.hs) jjaS++;
    } else if (m === 12 || m === 1 || m === 2) {
      djfT++;
      if (r.hs > s) djfN++;
    }
  }
  return {
    jjaSouthPct: +((100 * jjaS) / jjaT).toFixed(1),
    djfNorthPct: +((100 * djfN) / djfT).toFixed(1),
    pairedHours: { jja: jjaT, djf: djfT },
    years: "2012–2025",
  };
}

// ---- summer CHARACTER: raw height is nearly even between exposed cells in
// JJA, but the wave QUALITY flips — the south runs long-period groundswell,
// the north runs short-period trade chop. Median peak period + share of hours
// with ≥12 s energy, JJA 2012–2025, per shore.
function summerCharacter(rows) {
  const ppers = [];
  let long = 0, total = 0;
  for (const r of rows) {
    const y = yearOf(r.t);
    if (y < 2012 || y > 2025) continue;
    const m = monthOf(r.t) + 1;
    if (m !== 6 && m !== 7 && m !== 8) continue;
    if (r.pper == null || !Number.isFinite(r.pper)) continue;
    ppers.push(r.pper);
    total++;
    if (r.pper >= 12) long++;
  }
  ppers.sort((a, b) => a - b);
  const median = ppers.length ? ppers[Math.floor(ppers.length / 2)] : null;
  return {
    medianPper: median != null ? +median.toFixed(1) : null,
    longPct: total ? +((100 * long) / total).toFixed(1) : null,
    hours: total,
  };
}

// ---- events: top-N with 72h dedup ----
function topEvents(rows, n, filter = () => true) {
  const sorted = rows.filter(filter).sort((a, b) => b.hs - a.hs);
  const out = [];
  for (const r of sorted) {
    if (out.some((e) => Math.abs(e.t - r.t) < 72 * 3600 * 1000)) continue;
    out.push(r);
    if (out.length >= n) break;
  }
  return out.map((r) => ({
    date: new Date(r.t).toISOString().slice(0, 16) + "Z", // "2018-08-24T00:00Z" — valid ISO (T00Z is not)
    hs: +r.hs.toFixed(2),
    pper: r.pper != null ? +r.pper.toFixed(1) : null,
    pdir: r.pdir != null ? Math.round(r.pdir) : null,
  }));
}

const isSouthSwell = (r) =>
  r.pper != null && r.pper >= 12 && r.pdir != null && r.pdir >= 150 && r.pdir <= 230;

const data = {
  meta: {
    title: "One island, two heartbeats",
    source: "PacIOOS SWAN Oʻahu nearshore wave model (hindcast archive of daily forecast runs)",
    generated: new Date().toISOString().slice(0, 10),
    span: "2010-06-20 → 2026-07-08 (UTC; axis tail beyond is forecast and excluded)",
    cells: CELLS,
    hours: { north: north.length, south: south.length },
    climatologyYears: "2011–2025 (full calendar years only)",
    heatmapRule: "a month ships only with ≥200 modeled hours — gaps stay visible",
    southSwellFilter: "peak period ≥ 12 s and direction 150–230° (true south swell, not winter storm chop)",
    notes: [
      "Model significant wave height (Hs, meters) at two grid cells — not buoy measurements, not surf face heights; long-period south swell breaks well above its Hs.",
      "The archive has gaps (~85 days total), the largest: Aug 13–29 2012, Dec 6–30 2015, Oct 24–Nov 16 2025; 2010 starts June 20.",
      "The dataset is an archive of daily model runs; a 2025 correction re-dated most of 2024 (leap-year bug), leaving a short seam near Feb 29 2024.",
    ],
  },
  climatology: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    north: climatology(north),
    south: climatology(south),
  },
  heatmap: { north: heatmap(north), south: heatmap(south) },
  dominance: dominance(),
  summer: { north: summerCharacter(north), south: summerCharacter(south), years: "JJA 2012–2025" },
  events: {
    north: topEvents(north, 8),
    southSwell: topEvents(south, 6, isSouthSwell),
  },
};

// quick console sanity
console.log("climatology north:", data.climatology.north.map((v) => v?.toFixed(2)).join(" "));
console.log("climatology south:", data.climatology.south.map((v) => v?.toFixed(2)).join(" "));
console.log("dominance:", JSON.stringify(data.dominance));
console.log("summer character:", JSON.stringify(data.summer));
console.log("north top:", JSON.stringify(data.events.north.slice(0, 3)));
console.log("southSwell top:", JSON.stringify(data.events.southSwell.slice(0, 3)));

const out = join(DIR, "heartbeats-data.json");
writeFileSync(out, JSON.stringify(data));
console.log(`wrote ${out} (${(JSON.stringify(data).length / 1024).toFixed(1)} KB)`);
