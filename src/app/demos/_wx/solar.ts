// Shared live-data library for BlueWave demos — SOLAR times.
//
// Pure, deterministic, no network. The NOAA sunrise/sunset algorithm, returning
// local sunrise/sunset (formatted for a given IANA time zone) plus a daylight
// duration. Extracted from the demo conditions panels so every demo computes
// daylight the same way. Parameterized by time zone so it works for Alaska
// (America/Anchorage) and Hawaii (Pacific/Honolulu) alike.
//
// This file is framework-agnostic (no "use client") and safe to import from
// server or client components.

export type SolarTimes = {
  sunrise: string; // "5:03 AM" (in `tz`) or "—"
  sunset: string; // "11:18 PM" (in `tz`) or "—"
  daylight: string; // "18h 15m" or "—"
};

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
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff =
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const zenith = 90.833; // official sunrise/sunset (includes refraction)
  const lngHour = lon / 15;

  function calcMinutesUTC(isSunrise: boolean): number | null {
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
    if (cosH > 1 || cosH < -1) return null; // sun never rises/sets that day
    let H = isSunrise ? 360 - deg * Math.acos(cosH) : deg * Math.acos(cosH);
    H = H / 15;
    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    return Math.round(UT * 60);
  }

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

  const riseMin = calcMinutesUTC(true);
  const setMin = calcMinutesUTC(false);
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
