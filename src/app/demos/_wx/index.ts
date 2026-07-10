// Shared live-data library for BlueWave demos — barrel for PURE logic.
//
// Re-exports the framework-agnostic modules (solar / NWS / tides) so a demo can
// `import { decodeNwsObservation, densityAltitude, solarTimes } from "@/app/demos/_wx"`.
//
// The CLIENT hooks and UI atoms (useNwsObservation, useTidePredictions,
// useRelativeTime, UpdatedAgo, SourceBadge) live in "./live" and must be
// imported from there directly — keeping them out of this barrel means
// importing pure helpers never drags "use client" into a server component.

export * from "./solar";
export * from "./nws";
export * from "./tides";
export * from "./marine";
export * from "./ais";
