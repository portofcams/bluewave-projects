// Bake script for "One island, two heartbeats" — fetches the full hourly SWAN
// hindcast (shgt + pper + pdir) at the two story cells, year-chunked, RESUMABLE
// (skips completed files). Rules per the adversarial verify: --max-time 240,
// one retry, validate table.rows exists, sleep 2s between requests, serial.
//
// Cells: north (21.68, 201.94) — full-depth cell (21.66 is null before
// 2011-11-16); south (21.26, 202.17). Cap: 2026-07-08T23:00:00Z (last full
// archived day at bake time; the axis tail is forecast).
//
// Run:  node bake.mjs          (needs network; ~30-60 min first run)
// Then: node aggregate.mjs     (computes the story dataset JSON)

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "raw");
mkdirSync(OUT, { recursive: true });

const CELLS = {
  north: { lat: 21.68, lon: 201.94 },
  south: { lat: 21.26, lon: 202.17 },
};
const FIRST = "2010-06-20T21:00:00Z"; // dataset start
const CAP = "2026-07-08T23:00:00Z"; // last archived day (tail is forecast)
const YEARS = [];
for (let y = 2010; y <= 2026; y++) YEARS.push(y);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function url(cell, y) {
  const t0 = y === 2010 ? FIRST : `${y}-01-01T00:00:00Z`;
  const t1 = y === 2026 ? CAP : `${y}-12-31T23:00:00Z`;
  const sub = `%5B(${t0}):(${t1})%5D%5B(0.0)%5D%5B(${cell.lat})%5D%5B(${cell.lon})%5D`;
  const q = ["shgt", "pper", "pdir"].map((v) => v + sub).join(",");
  return `https://pae-paha.pacioos.hawaii.edu/erddap/griddap/swan_oahu.json?${q}`;
}

function valid(path) {
  try {
    const j = JSON.parse(readFileSync(path, "utf8"));
    return Array.isArray(j?.table?.rows) && j.table.rows.length > 100;
  } catch {
    return false;
  }
}

let done = 0, fetched = 0, failed = [];
for (const [name, cell] of Object.entries(CELLS)) {
  for (const y of YEARS) {
    const f = join(OUT, `${name}_${y}.json`);
    if (existsSync(f) && valid(f)) { done++; continue; }
    let ok = false;
    for (let attempt = 1; attempt <= 2 && !ok; attempt++) {
      try {
        console.log(`[bake] ${name} ${y} (attempt ${attempt})…`);
        execFileSync("curl", ["-sS", "--max-time", "240", "-o", f, url(cell, y)], { stdio: ["ignore", "inherit", "inherit"] });
        ok = valid(f);
        if (!ok) console.log(`[bake]   invalid response, ${attempt < 2 ? "retrying" : "giving up"}`);
      } catch (e) {
        console.log(`[bake]   error: ${e.message?.slice(0, 120)}`);
      }
      await sleep(2000);
    }
    if (ok) fetched++;
    else failed.push(`${name}_${y}`);
  }
}
writeFileSync(join(DIR, "bake_status.json"), JSON.stringify({ done, fetched, failed, cap: CAP, finished: new Date().toISOString() }, null, 2));
console.log(`[bake] complete: ${done} cached, ${fetched} fetched, ${failed.length} failed ${failed.join(",")}`);
