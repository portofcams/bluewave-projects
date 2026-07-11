// Shared live-data library for BlueWave demos — SOLAR times.
//
// Pure, deterministic, no network. The NOAA sunrise/sunset algorithm, returning
// local sunrise/sunset (formatted for a given IANA time zone) plus a daylight
// duration. Extracted from the demo conditions panels so every demo computes
// daylight the same way. Parameterized by time zone so it works for Alaska
// (America/Anchorage) and Hawaii (Pacific/Honolulu) alike.
//
// Also exposes a ZENITH-parameterized event helper (sunEventsNear / darkAt /
// reachesZenith / nextDarkCapableDate) for demos that need more than "is the
// sun up" — e.g. the aurora demo needs NAUTICAL twilight (12° below horizon),
// not civil sunset, as its "dark enough to matter" gate. IMPORTANT: for
// longitudes far from Greenwich, a single day's raw computed rise/set minutes
// can numerically "wrap" (that day's set can be numerically earlier than its
// rise), so anything comparing against "now" must work in absolute time
// across a multi-day window — never compare raw same-day minute values.
//
// This file is framework-agnostic (no "use client") and safe to import from
// server or client components.

export type SolarTimes = {
  sunrise: string; // "5:03 AM" (in `tz`) or "—"
  sunset: string; // "11:18 PM" (in `tz`) or "—"
  daylight: string; // "18h 15m" or "—"
};

/**
 * Rise/set time in UTC-minutes-of-day for the UTC calendar day of `date`, at
 * the given zenith angle (90.833 = official/civil sunrise-sunset including
 * refraction; 96 = civil twilight; 102 = nautical twilight; 108 = astronomical
 * twilight). Returns null if the sun never crosses that zenith that day (e.g.
 * a high-latitude summer where it never gets nautically or astronomically
 * dark). Internal building block shared by solarTimes and the event helpers
 * below — NOT exported directly because its return value is only meaningful
 * within the single UTC day it was computed for (see the module note above).
 */
function sunEventMinutesUTC(
  date: Date,
  lat: number,
  lon: number,
  isSunrise: boolean,
  zenith = 90.833
): number | null {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const lngHour = lon / 15;

  const t = dayOfYear + ((isSunrise ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  let L = M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634;
  L = ((L % 360) + 360) % 360;
  let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
  RA = ((RA % 360) + 360) % 360;
  const Lquadrant = Math.floor(L / 90) * 90;
  const RAquadrant = Math.floor(RA / 90) * 90;
  RA = (RA + (Lquadrant - RAquadrant)) / 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH =
    (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) /
    (cosDec * Math.cos(lat * rad));
  if (cosH > 1 || cosH < -1) return null; // sun never rises/sets that day at this zenith
  let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
  H = H / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  let UT = T - lngHour;
  UT = ((UT % 24) + 24) % 24;
  return Math.round(UT * 60);
}

/**
 * Sunrise / sunset / daylight for a date + coordinates, formatted in `tz`.
 * Uses the standard NOAA solar algorithm with the 90.833° refraction zenith.
 * Returns "—" for a value if the sun never rises/sets that day (polar cases).
 */
export function solarTimes(
  date: Date,
  lat: number,
  lon: number,
  tz: string
): SolarTimes {
  function fmt(minutesUTC: number | null): string | null {
    if (minutesUTC == null) return null;
    const d = new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        Math.floor(minutesUTC / 60),
        minutesUTC % 60
      )
    );
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
  }

  const riseMin = sunEventMinutesUTC(date, lat, lon, true);
  const setMin = sunEventMinutesUTC(date, lat, lon, false);
  let daylight = "—";
  if (riseMin != null && setMin != null) {
    let diffMin = setMin - riseMin;
    if (diffMin < 0) diffMin += 24 * 60;
    daylight = `${Math.floor(diffMin / 60)}h ${diffMin % 60}m`;
  }

  return {
    sunrise: fmt(riseMin) ?? "—",
    sunset: fmt(setMin) ?? "—",
    daylight,
  };
}

// ---------------------------------------------------------------------------
// Zenith-parameterized event helpers (nautical/astronomical twilight, etc.)
// ---------------------------------------------------------------------------

export type SunEvent = { at: Date; type: "rise" | "set" };

/**
 * All rise/set events at the given zenith within ±spanDays of `date`, as
 * absolute instants, sorted ascending. A day where the zenith isn't reached
 * contributes no event for that boundary. Always work from this (or darkAt/
 * reachesZenith below) rather than comparing two same-day minute values
 * directly — see the module-level wraparound note.
 */
export function sunEventsNear(
  date: Date,
  lat: number,
  lon: number,
  zenith = 90.833,
  spanDays = 2
): SunEvent[] {
  const events: SunEvent[] = [];
  for (let offset = -spanDays; offset <= spanDays; offset++) {
    const d = new Date(date.getTime() + offset * 86400000);
    const dayStart = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const r = sunEventMinutesUTC(d, lat, lon, true, zenith);
    const s = sunEventMinutesUTC(d, lat, lon, false, zenith);
    if (r != null) events.push({ at: new Date(dayStart + r * 60000), type: "rise" });
    if (s != null) events.push({ at: new Date(dayStart + s * 60000), type: "set" });
  }
  return events.sort((a, b) => a.at.getTime() - b.at.getTime());
}

/**
 * Is `date` within a dark window (at or after a "set" event, before the next
 * "rise") at the given zenith? Returns `false` if there's no covering event
 * within ±2 days (shouldn't happen at any real inhabited latitude) — a false
 * "not dark" is the honest failure mode.
 */
export function darkAt(date: Date, lat: number, lon: number, zenith = 90.833): boolean {
  const events = sunEventsNear(date, lat, lon, zenith);
  let last: SunEvent | null = null;
  for (const e of events) {
    if (e.at.getTime() <= date.getTime()) last = e;
    else break;
  }
  return last?.type === "set";
}

/** The next rise/set event (at the given zenith) strictly after `date`, or
 *  null if none falls within the ±2-day window `sunEventsNear` scans. */
export function nextSunEvent(date: Date, lat: number, lon: number, zenith = 90.833): SunEvent | null {
  const events = sunEventsNear(date, lat, lon, zenith);
  return events.find((e) => e.at.getTime() > date.getTime()) ?? null;
}

/** True if the sun crosses the given zenith at all on `date`'s UTC calendar
 *  day (false near a high-latitude solstice, when it stays above or below
 *  that zenith the whole day). */
export function reachesZenith(date: Date, lat: number, lon: number, zenith: number): boolean {
  return (
    sunEventMinutesUTC(date, lat, lon, true, zenith) != null &&
    sunEventMinutesUTC(date, lat, lon, false, zenith) != null
  );
}

/** Scan forward from `date` (up to `maxDays`) for the next UTC calendar day
 *  the given zenith is reachable at all. Returns null if none found within
 *  maxDays. Used for a high-latitude-summer "sky won't be dark enough again
 *  until ~Aug 18" readout — the gap this exists for is real (see the aurora
 *  demo) but the helper itself is generic solar geometry. */
export function nextDarkCapableDate(
  from: Date,
  lat: number,
  lon: number,
  zenith: number,
  maxDays = 150
): Date | null {
  for (let i = 0; i <= maxDays; i++) {
    const d = new Date(from.getTime() + i * 86400000);
    if (reachesZenith(d, lat, lon, zenith)) return d;
  }
  return null;
}
