"use client";

// The narrative + scrolly composition for "One island, two heartbeats."
// Numbers in the prose are INTERPOLATED from the baked dataset (data.json) —
// the story cannot drift from the data. The opening and closing beats fetch
// the live SWAN nowcast at the same two cells via the shared _wx library.

import { useEffect, useState } from "react";
import data from "./heartbeats-data.json";
import { fetchSwanWaves, type BuoyObservation, type SwanWaves } from "../_wx";
import { useBuoyObservation } from "../_wx/live";
import { Scrolly, Step } from "./scrolly";
import { BigDays, HeatStrips, NowTiles, SeasonLines, type NowDots } from "./charts";
import { THB } from "./_shared";

const CELLS = data.meta.cells;
const MONTHS = data.climatology.months;

const fmt1 = (v: number | null | undefined) => (v == null ? "—" : v.toFixed(1));
const fmt2 = (v: number | null | undefined) => (v == null ? "—" : v.toFixed(2));
const evMonthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" });

// derived story numbers (all straight from the dataset)
const nJan = data.climatology.north[0];
const nAug = data.climatology.north[7];
const sJul = data.climatology.south[6];
const sJan = data.climatology.south[0];
const northSwing = nJan != null && nAug != null ? (nJan / nAug).toFixed(1) : "—";
const southSwing = sJul != null && sJan != null ? (sJul / sJan).toFixed(2) : "—";

// Real NDBC buoys nearest the two story cells — the actual measurement each
// modeled cell is standing in for. Same relay as waikiki-surf-dive's buoy
// tile (an existing CORS-enabled proxy on the shared ai-app box, not a new
// one). Sample fallbacks are realistic July readings, never shown as live.
const NORTH_BUOY_STATION = "51201"; // Waimea Bay
const SOUTH_BUOY_STATION = "51211"; // Māmala Bay, off Waikīkī
const SAMPLE_BUOY_NORTH: BuoyObservation = {
  station: NORTH_BUOY_STATION,
  time: null,
  waveHeightM: 1.3,
  dominantPeriodS: 8,
  avgPeriodS: 5,
  waveDirDeg: 40,
  waterTempC: 26,
};
const SAMPLE_BUOY_SOUTH: BuoyObservation = {
  station: SOUTH_BUOY_STATION,
  time: null,
  waveHeightM: 1.0,
  dominantPeriodS: 6,
  avgPeriodS: 5,
  waveDirDeg: 160,
  waterTempC: 27,
};
const M_TO_FT = 3.28084;

export function Story() {
  const [now, setNow] = useState<{ north: SwanWaves | null; south: SwanWaves | null; live: boolean }>({
    north: null,
    south: null,
    live: false,
  });

  useEffect(() => {
    // The PacIOOS ERDDAP can be slow/cold on the first hit — retry up to 3
    // times, keeping any cell that already answered.
    let alive = true;
    let n: SwanWaves | null = null;
    let s: SwanWaves | null = null;
    (async () => {
      for (let attempt = 0; attempt < 3 && alive && (n == null || s == null); attempt++) {
        if (attempt > 0) await new Promise((r) => setTimeout(r, 8000));
        const [nr, sr]: [SwanWaves | null, SwanWaves | null] = await Promise.all([
          n == null ? fetchSwanWaves(CELLS.north.lat, CELLS.north.lon360) : Promise.resolve(n),
          s == null ? fetchSwanWaves(CELLS.south.lat, CELLS.south.lon360) : Promise.resolve(s),
        ]);
        n = nr ?? n;
        s = sr ?? s;
        if (alive && (n != null || s != null)) setNow({ north: n, south: s, live: true });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const nowDots: NowDots = now.live
    ? {
        monthIdx: new Date().getUTCMonth(),
        north: now.north ? now.north.hsM : null,
        south: now.south ? now.south.hsM : null,
        live: true,
      }
    : null;

  const northBuoy = useBuoyObservation(NORTH_BUOY_STATION, { sample: SAMPLE_BUOY_NORTH });
  const southBuoy = useBuoyObservation(SOUTH_BUOY_STATION, { sample: SAMPLE_BUOY_SOUTH });
  const toBuoyReading = (b: typeof northBuoy) =>
    b.obs.waveHeightM != null
      ? { heightFt: b.obs.waveHeightM * M_TO_FT, periodS: b.obs.dominantPeriodS, live: b.source === "live" }
      : undefined;

  const graphic = (active: number) => {
    const frame = (() => {
      switch (active) {
        case 0:
          return (
            <NowTiles
              north={now.north}
              south={now.south}
              live={now.live}
              buoyNorth={toBuoyReading(northBuoy)}
              buoySouth={toBuoyReading(southBuoy)}
              sub="Modeled significant wave height at the two story cells (PacIOOS SWAN nowcast), with the real NDBC buoy nearest each cell (Waimea Bay north, Māmala Bay south) alongside it — the model and the measurement it's standing in for. If a feed is unreachable it reads as a labeled sample — never presented as live."
            />
          );
        case 1:
          return (
            <SeasonLines
              months={MONTHS}
              north={data.climatology.north}
              south={data.climatology.south}
              mode="north"
              caption={`Monthly mean modeled wave height, ${data.meta.climatologyYears}. North cell ${CELLS.north.lat}°N, ${CELLS.north.lonW}°W.`}
            />
          );
        case 2:
          return (
            <SeasonLines
              months={MONTHS}
              north={data.climatology.north}
              south={data.climatology.south}
              mode="south"
              caption={`Same axes, same years — the South Shore cell off Waikīkī (${CELLS.south.lat}°N, ${CELLS.south.lonW}°W). The whisper is real: metres of Hs understate what a 15-second pulse becomes on the reef.`}
            />
          );
        case 3:
          return (
            <SeasonLines
              months={MONTHS}
              north={data.climatology.north}
              south={data.climatology.south}
              mode="both"
              caption="The duet: one shared axis, deliberately — the drum and the pulse are not the same size, and pretending otherwise would be a prettier, falser chart."
            />
          );
        case 4:
          return (
            <HeatStrips
              months={MONTHS}
              years={data.heatmap.north.years}
              north={data.heatmap.north.grid}
              south={data.heatmap.south.grid}
              caption="Every month the model recorded, 2010–2026, one shared color scale. Dashed cells are gaps in the archive — shown, not smoothed over."
            />
          );
        case 5:
          return (
            <BigDays
              north={data.events.north}
              southSwell={data.events.southSwell}
              focus="north"
              filterNote={data.meta.southSwellFilter}
            />
          );
        case 6:
          return (
            <BigDays
              north={data.events.north}
              southSwell={data.events.southSwell}
              focus="south"
              filterNote={`Ranked honestly: only events with ${data.meta.southSwellFilter} count — raw height alone would crown winter storm chop.`}
            />
          );
        default:
          return (
            <SeasonLines
              months={MONTHS}
              north={data.climatology.north}
              south={data.climatology.south}
              mode="both"
              now={nowDots}
              caption="The 15-year rhythm, with today's live reading placed on it. Refresh tomorrow and the dots will have moved; the curves will not."
            />
          );
      }
    })();
    return (
      <div key={active} className="thb-frame">
        <style>{`.thb .thb-frame { animation: thbfade .45s ease; } @keyframes thbfade { from { opacity: 0; transform: translateY(6px);} to { opacity: 1; transform: none; } }`}</style>
        {frame}
      </div>
    );
  };

  return (
    <Scrolly graphic={graphic}>
      <Step index={0}>
        <p className="thb-eyebrow mb-3">I · Right now</p>
        <div className="thb-prose">
          <p>
            At this moment, off the two shores of Oʻahu, the ocean is doing two
            different things. It always is. The numbers beside this sentence are
            live — a wave model&apos;s present-tense reading of the island&apos;s
            north and south coasts.
          </p>
          <p>
            Ask a surfer which shore to drive to and they won&apos;t check the
            calendar — they <strong>are</strong> the calendar. This story is
            about the rhythm they carry in their bones, told by sixteen years of
            data.
          </p>
        </div>
      </Step>

      <Step index={1}>
        <p className="thb-eyebrow mb-3">II · The drum</p>
        <div className="thb-prose">
          <p>
            Winter on the North Shore is not weather; it is percussion. Storms
            spin off the Aleutians and their energy arrives at Waimea and Sunset
            as long-period northwest groundswell — seventeen seconds between
            crests on the biggest days.
          </p>
          <p>
            The model&apos;s January average at our north cell is{" "}
            <strong>{fmt2(nJan)} m of significant wave height</strong>; by
            August it collapses to <strong>{fmt2(nAug)} m</strong> — a{" "}
            <strong>{northSwing}× seasonal swing</strong>. That blue line is the
            drum: enormous, seasonal, unmistakable.
          </p>
        </div>
      </Step>

      <Step index={2}>
        <p className="thb-eyebrow mb-3">III · The pulse</p>
        <div className="thb-prose">
          <p>
            Flip the island. Summer south swells are born in Southern Ocean
            storms near New Zealand and travel five thousand miles to arrive at
            Waikīkī as clean, long lines. On this chart they are a whisper:{" "}
            <strong>{fmt2(sJul)} m in July against {fmt2(sJan)} m in January</strong>{" "}
            — a gentle {southSwing}× rise.
          </p>
          <p>
            Don&apos;t let the small number fool you. Significant wave height is
            an open-ocean measure, and a fifteen-second South Pacific pulse
            <strong> breaks at well over twice its offshore height</strong> when
            it stands up on the reef. A 0.9-metre whisper offshore is a
            head-high set at Queens.
          </p>
        </div>
      </Step>

      <Step index={3}>
        <p className="thb-eyebrow mb-3">IV · Counter-phase</p>
        <div className="thb-prose">
          <p>
            Put the two curves on one axis and the island breathes. When one
            shore rises the other settles — two heartbeats, half a year out of
            phase.
          </p>
          <p>
            The model is emphatic about winter: the North carries more energy
            than the South in{" "}
            <strong>{data.dominance.djfNorthPct}% of all modeled winter hours</strong>{" "}
            ({data.dominance.years}, {data.dominance.pairedHours.djf.toLocaleString()} paired hours).
            Summer is subtler — at two exposed cells the raw heights run close,
            and an honest chart says so — but the <em>character</em> flips
            completely: the South&apos;s median summer wave period is{" "}
            <strong>{data.summer.south.medianPper} seconds against the North&apos;s {data.summer.north.medianPper}</strong>,
            and long-period groundswell (twelve seconds or more) fills{" "}
            <strong>{data.summer.south.longPct}% of the South Shore&apos;s summer hours</strong>{" "}
            against {data.summer.north.longPct}% up north. In winter the island
            turns by force. In summer, by kind.
          </p>
        </div>
      </Step>

      <Step index={4}>
        <p className="thb-eyebrow mb-3">V · Sixteen years of months</p>
        <div className="thb-prose">
          <p>
            Zoom out and the heartbeat becomes a texture. Each row is a year;
            each cell a month; brightness is energy. The North Shore&apos;s
            winters stack into a bright column every December–February. The
            South Shore&apos;s summers glow softly every June–August, faint but
            never missing.
          </p>
          <p>
            The dashed cells are holes in the model&apos;s archive — about
            eighty-five days in sixteen years, including most of December 2015,
            one of the great El Niño big-wave months. We show the holes rather
            than smooth them, because a chart that hides its gaps is lying
            gently.
          </p>
        </div>
      </Step>

      <Step index={5}>
        <p className="thb-eyebrow mb-3">VI · The drum&apos;s biggest days</p>
        <div className="thb-prose">
          <p>
            The largest modeled day at the north cell lands in{" "}
            <strong>{data.events.north[0] ? evMonthYear(data.events.north[0].date) : "the record"}</strong>{" "}
            — and the leaderboard reads like the sport&apos;s own memory: the
            great mid-February day of 2019, the January 2014 swell that closed
            highways, and the February 2016 giants — among them the day the
            Eddie ran at Waimea. The model&apos;s biggest days are the
            community&apos;s biggest days — that agreement is what makes a
            hindcast trustworthy.
          </p>
          <p>
            One asterisk, held honestly: the archive has holes exactly where
            giants lived — late December 2015 among them — so &quot;biggest on
            record&quot; always means <em>in the modeled record, which has gaps</em>.
          </p>
        </div>
      </Step>

      <Step index={6}>
        <p className="thb-eyebrow mb-3">VII · The pulse&apos;s biggest days</p>
        <div className="thb-prose">
          <p>
            Ranking the South Shore honestly takes care. Sort by raw height and
            winter storm slop wins — short-period Kona chop that no one would
            call a south swell. So this list admits only true southern energy:
            long-period, from the south. What surfaces is the real canon —
            hurricane-driven days and the great July swells that empty offices
            from Ala Moana to Diamond Head.
          </p>
          <p>
            The whisper, at its loudest, is still smaller than the drum — and
            that&apos;s the point. On this island, meaning doesn&apos;t scale
            with metres.
          </p>
        </div>
      </Step>

      <Step index={7}>
        <p className="thb-eyebrow mb-3">VIII · Today, on the curve</p>
        <div className="thb-prose">
          <p>
            So — where are we? The dots on the chart are today&apos;s live
            reading, placed on the fifteen-year rhythm. Some days they sit
            right on the curve, the island keeping time. Some days they leap
            off it, and somewhere a phone is buzzing with the news.
          </p>
          <p>
            The curves are the climate; the dots are the weather; the space
            between them is why people check the ocean every single morning.
          </p>
        </div>
      </Step>
    </Scrolly>
  );
}

// small footnote-style component shared with the page (kept here so charts.tsx
// stays purely presentational)
export function TideWhisper() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl p-5" style={{ background: THB.surface, border: `1px solid ${THB.border}` }}>
        <div className="thb-sans text-[11px] uppercase tracking-[0.14em]" style={{ color: THB.muted }}>
          Beneath it all · the tide
        </div>
        <div className="thb-sans mt-1" style={{ fontSize: 30, fontWeight: 700, color: THB.ink }}>
          ~1.9 ft
        </div>
        <p className="thb-sans mt-1 text-[12px] leading-relaxed" style={{ color: THB.ink2 }}>
          Honolulu&apos;s mean daily tidal range across a century of NOAA
          monthly records (1911→). While the swell swings by metres, the whole
          tide is about waist-high — on Oʻahu, the swell is the story and the
          tide is a whisper under it.
        </p>
      </div>
      <div className="rounded-xl p-5" style={{ background: THB.surface, border: `1px solid ${THB.border}` }}>
        <div className="thb-sans text-[11px] uppercase tracking-[0.14em]" style={{ color: THB.muted }}>
          And the water itself
        </div>
        <div className="thb-sans mt-1" style={{ fontSize: 30, fontWeight: 700, color: THB.ink }}>
          78 → 83 °F
        </div>
        <p className="thb-sans mt-1 text-[12px] leading-relaxed" style={{ color: THB.ink2 }}>
          Honolulu&apos;s water runs its own quiet season — coolest in
          February, warmest in late August (NOAA, 2025 hourly). It lags the
          south swell by a beat: the ocean is warmest just as the pulse begins
          to fade.
        </p>
      </div>
    </div>
  );
}
