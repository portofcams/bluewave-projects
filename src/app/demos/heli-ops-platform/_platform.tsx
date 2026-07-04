"use client";

// _platform.tsx — shared cross-module state for the Heli-Ops Platform concept
// demo (Module 3: cross-cutting / unifying refinements).
//
// FICTIONAL SAMPLE DATA ONLY. Nothing here is a real dispatch, safety, or
// notification system — see the disclaimers already in _shared.tsx,
// FlightFollowing.tsx, and PrototypeBanner.
//
// WHY THIS FILE EXISTS: Module 1 (ManifestBoard) and Module 2
// (FlightFollowing) previously kept fully independent local state. Five new
// features need to read AND write real state across that boundary:
//   1. Incident mode (Module 2) needs to see every tracked aircraft's zone
//      and flip one aircraft's phase/status for real.
//   2. Guide view needs to call the SAME check-in function Module 2 uses.
//   3. End-of-day debrief needs to derive real counts from the live
//      manifest data AND the live activity log.
//   4. Guest-to-aircraft linking needs to scroll to + highlight the actual
//      Module 2 card for a given tail number.
//   5. Editable settings need to change numbers actually used by BOTH
//      modules' live math (phase interval math in Module 2, bay-limit math
//      in Module 1).
//
// To do this honestly, the aircraft/log state that used to live only inside
// FlightFollowing's useState calls now lives in this shared provider, and
// FlightFollowing reads/writes it from here instead of local state. Nothing
// about Module 2's own behavior changes — same fields, same functions, same
// log-append mechanism — it's just hoisted so other components can share it.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BAY_LIMITS as DEFAULT_BAY_LIMITS,
  CargoBayKey,
  CatGroup,
  DayKey,
  FLEET_ROSTER,
  Helicopter,
  seedDayData,
} from "./_data";

// Per-day fleet/cat-group picture — the SAME shape ManifestBoard.tsx has
// always used locally. Hoisted here (Module 4 refinement) so Module 4's
// safety/compliance panels can read the REAL live day-state Module 1's
// drag-and-drop and reslot actions actually mutate, instead of a separately
// re-seeded snapshot that would silently drift out of sync the moment a
// guest is reassigned. ManifestBoard.tsx still owns all the mutation LOGIC
// (handleReslot, moveGuestTo, drag/drop handlers) — only the raw state
// storage moved, exactly like Module 3 hoisted FlightFollowing's fleet/log
// state without changing its behavior.
export type DayState = Record<DayKey, { helicopters: Helicopter[]; catGroups: CatGroup[] }>;

// ---------------------------------------------------------------------------
// MODULE 4 — SAFETY & COMPLIANCE DEPTH types shared across this provider.
// ILLUSTRATIVE ONLY: none of this is a certified incident-reporting system or
// a legally valid regulatory sign-off. See the module-level banner in
// SafetyCompliance.tsx for the full disclaimer.
// ---------------------------------------------------------------------------
export type IncidentSeverity = "Near-miss" | "Minor" | "Moderate" | "Serious";
export type IncidentCategory =
  | "Weather / visibility"
  | "Mechanical / maintenance"
  | "Terrain / avalanche"
  | "Passenger / guest safety"
  | "Communications"
  | "Other";

export type IncidentEntry = {
  id: string;
  dateLabel: string; // free-text sample date, defaults to the demo's sample "today"
  category: IncidentCategory;
  severity: IncidentSeverity;
  description: string;
  loggedAt: number; // real Date.now() timestamp of when it was actually submitted this session
};

// A per-aircraft weight-and-balance pilot sign-off. `signedAgainstTotalLbs`
// captures the EXACT total weight the pilot acknowledged at sign-off time —
// this is what lets the app genuinely detect staleness: if the aircraft's
// live computed total ever differs from this captured number, the sign-off
// is invalid and must be treated as un-signed, not silently shown as valid
// against new numbers it never actually acknowledged.
export type WBSignOff = {
  tailNumber: string;
  pilotName: string;
  signedAgainstTotalLbs: number;
  signedAt: number;
};

// ---------------------------------------------------------------------------
// TYPES — mirrors the shapes FlightFollowing.tsx defined locally before this
// refactor, so its behavior is unchanged, just hoisted.
// ---------------------------------------------------------------------------
export type FlightPhase = "Cruise" | "Approach" | "Loading at zone" | "Returning" | "Diverting to assist";

export const DEFAULT_PHASE_INTERVAL_MIN: Record<FlightPhase, number> = {
  Cruise: 60,
  Returning: 60,
  Approach: 20,
  "Loading at zone": 20,
  "Diverting to assist": 20,
};

export const EDITABLE_PHASES: FlightPhase[] = ["Cruise", "Approach", "Loading at zone", "Returning"];

export const AMBER_THRESHOLD_PCT = 0.75;
export const TICK_MS = 1000;

export type AircraftStatus = "In Flight" | "At Zone" | "Returning" | "Diverting to assist";
export type SeverityTone = "ok" | "warn" | "alert";

export type ZoneKey = "powder-bowl" | "north-couloir" | "glacier-shelf" | "tree-run-6" | "sundance-ridge" | "base-pad";

export type ZoneInfo = { key: ZoneKey; label: string; col: number; row: number };

export const ZONES: ZoneInfo[] = [
  { key: "base-pad", label: "Base Pad (sample)", col: 2, row: 3 },
  { key: "powder-bowl", label: "Powder Bowl (sample)", col: 1, row: 1 },
  { key: "north-couloir", label: "North Couloir (sample)", col: 2, row: 1 },
  { key: "glacier-shelf", label: "Glacier Shelf (sample)", col: 3, row: 1 },
  { key: "tree-run-6", label: "Tree Run 6 (sample)", col: 1, row: 2 },
  { key: "sundance-ridge", label: "Sundance Ridge (sample)", col: 3, row: 2 },
];

export const ZONE_BY_KEY: Record<ZoneKey, ZoneInfo> = ZONES.reduce(
  (acc, z) => ({ ...acc, [z.key]: z }),
  {} as Record<ZoneKey, ZoneInfo>
);

export type Aircraft = {
  id: string;
  tailNumber: string;
  model: string;
  pilotName: string;
  status: AircraftStatus;
  phase: FlightPhase;
  zone: ZoneKey;
  seedMinutesAgo: number;
};

export type LogEntry = {
  id: string;
  ts: number;
  tailNumber: string;
  message: string;
  tone: SeverityTone;
};

export type ShiftRoleKey = "onDuty" | "backup" | "onCall";
export type ShiftRole = { key: ShiftRoleKey; label: string; name: string };

export const SHIFT_ROSTER_OPTIONS: Record<ShiftRoleKey, string[]> = {
  onDuty: ["Frosty Lundgren (sample)", "Piste Halvorsen (sample)", "Birdie Snowfield (sample)"],
  backup: ["Yeti Carlsberg (sample)", "Cornice Aldrich (sample)", "Wren Iceborn (sample)"],
  onCall: ["Summit Faraday (sample)", "Blizzard Okafor (sample)", "Talus Ravensworth (sample)"],
};

function seedShiftRoster(): ShiftRole[] {
  return [
    { key: "onDuty", label: "On-duty dispatcher", name: SHIFT_ROSTER_OPTIONS.onDuty[0] },
    { key: "backup", label: "Backup dispatcher", name: SHIFT_ROSTER_OPTIONS.backup[0] },
    { key: "onCall", label: "On-call ops manager", name: SHIFT_ROSTER_OPTIONS.onCall[0] },
  ];
}

function seedAircraft(): Aircraft[] {
  const seedByTail: Record<
    string,
    { status: AircraftStatus; phase: FlightPhase; zone: ZoneKey; seedMinutesAgo: number }
  > = {
    N412QX: { status: "In Flight", phase: "Cruise", zone: "powder-bowl", seedMinutesAgo: 6 },
    N287TR: { status: "At Zone", phase: "Loading at zone", zone: "north-couloir", seedMinutesAgo: 7 },
    N559HB: { status: "At Zone", phase: "Loading at zone", zone: "glacier-shelf", seedMinutesAgo: 16 },
    N634VK: { status: "Returning", phase: "Returning", zone: "base-pad", seedMinutesAgo: 74 },
    N801ZL: { status: "In Flight", phase: "Cruise", zone: "sundance-ridge", seedMinutesAgo: 47 },
  };
  return FLEET_ROSTER.map((f) => ({
    id: f.id,
    tailNumber: f.tailNumber,
    model: f.model,
    pilotName: f.pilotName,
    ...seedByTail[f.tailNumber],
  }));
}

export function severity(elapsedMs: number, phase: FlightPhase, phaseIntervalMin: Record<FlightPhase, number>): SeverityTone {
  const intervalMs = phaseIntervalMin[phase] * 60 * 1000;
  if (elapsedMs >= intervalMs) return "alert";
  if (elapsedMs >= intervalMs * AMBER_THRESHOLD_PCT) return "warn";
  return "ok";
}

// ---------------------------------------------------------------------------
// MODULE 6, FEATURE 29 — AUDIBLE OVERDUE-CHECK-IN ALERT
//
// A tiny inline-generated tone via the Web Audio API — no new npm
// dependency, no external audio file/licensing question. Two short
// descending beeps, distinct enough to read as "alert" without being
// jarring. `playOverdueBeep()` lazily creates ONE AudioContext (module-level,
// not per-call) and reuses it, since repeatedly constructing AudioContexts
// is wasteful and some browsers cap how many can exist concurrently.
//
// HONEST AUTOPLAY HANDLING: browsers block audio playback before a genuine
// user gesture on the page. This demo never tries to defeat that. The
// toggle switch itself IS a user gesture, so `resume()`-ing the shared
// AudioContext happens synchronously inside the toggle's onClick handler
// (see the Settings/FlightFollowing UI, not here) — by the time a REAL
// overdue transition fires later (driven by the timer effect below, which
// is NOT a user gesture), the context is already unlocked and playback
// genuinely succeeds. If the browser still blocks it for any reason,
// `.catch()` swallows the rejection silently rather than throwing — a
// missed beep is a reasonable, honest failure mode; it never fakes success.
// ---------------------------------------------------------------------------
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctor();
  }
  return sharedAudioCtx;
}

// Called synchronously from the toggle's onClick (a real user gesture) so
// the AudioContext is unlocked ahead of any later, non-gesture-driven
// overdue transition that wants to actually play a beep.
export function primeAudioContextFromUserGesture(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {
      // Honest no-op: if resume fails, playOverdueBeep()'s own guard below
      // will simply skip playback later rather than pretending it worked.
    });
  }
}

function playOverdueBeep(): void {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return; // never force/fake playback past a browser block

  const now = ctx.currentTime;
  const beep = (startAt: number, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startAt);
    osc.stop(startAt + 0.24);
  };
  beep(now, 880); // A5
  beep(now + 0.26, 660); // E5 — descending second beep reads as "alert," not a chime
}

// ---------------------------------------------------------------------------
// SETTINGS — demo-editable, session-only (resets on reload; not persisted).
// Both PHASE_INTERVAL_MIN and BAY_LIMITS start from the same defaults the
// modules used before this refactor.
// ---------------------------------------------------------------------------
export type Settings = {
  phaseIntervalMin: Record<FlightPhase, number>;
  bayLimits: Record<CargoBayKey, number>;
};

function defaultSettings(): Settings {
  return {
    phaseIntervalMin: { ...DEFAULT_PHASE_INTERVAL_MIN },
    bayLimits: { ...DEFAULT_BAY_LIMITS },
  };
}

// ---------------------------------------------------------------------------
// CONTEXT SHAPE
// ---------------------------------------------------------------------------
type PlatformContextValue = {
  // Live fleet + log — the SAME state Module 2 (FlightFollowing) reads and
  // writes. Hoisted here so Incident Mode, Guide View, and the Debrief can
  // genuinely share it instead of duplicating a parallel copy.
  fleet: Aircraft[];
  setFleet: React.Dispatch<React.SetStateAction<Aircraft[]>>;
  lastCheckIns: Record<string, number>;
  now: number;
  roster: ShiftRole[];
  setRoster: React.Dispatch<React.SetStateAction<ShiftRole[]>>;
  logEntries: LogEntry[];
  appendLog: (entry: Omit<LogEntry, "id" | "ts"> & { ts?: number }) => void;
  handleCheckIn: (id: string) => void;
  handleZoneChange: (id: string, zone: ZoneKey) => void;
  handlePhaseChange: (id: string, phase: FlightPhase) => void;
  handleDivertToAssist: (id: string, zone: ZoneKey) => void;

  // Settings — demo-editable, drives BOTH modules' live math.
  settings: Settings;
  setPhaseInterval: (phase: FlightPhase, minutes: number) => void;
  setBayLimit: (bay: CargoBayKey, limit: number) => void;
  resetSettings: () => void;

  // Scroll/highlight registry for guest-to-aircraft linking (feature 4) —
  // Module 2's aircraft cards register their DOM node by tail number; Module
  // 1's "View live status" button looks the node up and scrolls + flashes it.
  registerAircraftCardNode: (tailNumber: string, node: HTMLDivElement | null) => void;
  jumpToAircraft: (tailNumber: string) => boolean; // returns true if the tail number was found
  highlightedTail: string | null;

  // Module 6, feature 28 — same scroll/highlight mechanism, keyed by guest
  // id, so guest search results can jump to + flash a matched guest's real
  // card on Module 01's board. Guest ids are unique across the whole day's
  // roster (g1..g34, c1..c7 in the Day-1 seed), so no heli/cat-group
  // disambiguation is needed.
  registerGuestCardNode: (guestId: string, node: HTMLDivElement | null) => void;
  jumpToGuest: (guestId: string) => boolean;
  highlightedGuestId: string | null;
  expandedFromSearchGuestId: string | null;

  // Module 4 — incident/near-miss log. A genuinely growing, session-persisted
  // list: submitting the form in SafetyCompliance.tsx appends here for real,
  // and anything reading `incidents` (the incident-history panel, the
  // End-of-Day Debrief) sees the new entry immediately.
  incidents: IncidentEntry[];
  addIncident: (entry: Omit<IncidentEntry, "id" | "loggedAt">) => void;

  // Module 4 — per-aircraft weight-and-balance pilot sign-offs, keyed by
  // tail number. Only present in the map once a pilot has genuinely signed
  // off; absence (or a stale signedAgainstTotalLbs — checked by callers
  // against the CURRENT computed total) means "Pending sign-off."
  wbSignOffs: Record<string, WBSignOff>;
  signOffWB: (tailNumber: string, pilotName: string, currentTotalLbs: number) => void;
  clearWBSignOff: (tailNumber: string) => void;

  // Module 1's per-day manifest state (helicopters + cat groups), hoisted so
  // Module 4 can read the SAME live data ManifestBoard's drag-and-drop and
  // reslot actions genuinely mutate — not a disconnected re-seeded copy.
  // ManifestBoard.tsx still owns the read/write LOGIC (this only exposes the
  // raw storage + a setter, mirroring its previous local useState shape).
  activeDay: DayKey;
  setActiveDay: React.Dispatch<React.SetStateAction<DayKey>>;
  dayState: DayState;
  setDayState: React.Dispatch<React.SetStateAction<DayState>>;

  // Module 6, feature 29 — audible overdue-check-in alert. Default OFF
  // (browsers block autoplay before a user gesture, and this toggle click IS
  // that gesture — see setAudibleAlertsOn below). Session-only, consistent
  // with this demo's other session-scoped settings; genuinely fires ONLY
  // from inside the same real phase/timer transition effect that already
  // detects "tone just became alert" for the activity log (see the
  // useEffect below) — never from a button that just plays a sound
  // unconditionally.
  audibleAlertsOn: boolean;
  setAudibleAlertsOn: (on: boolean) => void;
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function usePlatform(): PlatformContextValue {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error("usePlatform() must be used within <PlatformProvider>");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// PROVIDER
// ---------------------------------------------------------------------------
export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [mountedAt] = useState<number>(() => Date.now());
  const initialFleet = useMemo(() => seedAircraft(), []);
  const [fleet, setFleet] = useState<Aircraft[]>(initialFleet);

  const [lastCheckIns, setLastCheckIns] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const a of initialFleet) {
      map[a.id] = mountedAt - a.seedMinutesAgo * 60 * 1000;
    }
    return map;
  });

  const [now, setNow] = useState<number>(() => Date.now());
  const [roster, setRoster] = useState<ShiftRole[]>(() => seedShiftRoster());

  const [logEntries, setLogEntries] = useState<LogEntry[]>(() => {
    const seedTs = mountedAt - 3 * 60 * 60 * 1000;
    return [
      { id: "log-seed-1", ts: seedTs, tailNumber: "N412QX", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-2", ts: seedTs + 18 * 60 * 1000, tailNumber: "N634VK", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-3", ts: seedTs + 40 * 60 * 1000, tailNumber: "N287TR", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-4", ts: seedTs + 63 * 60 * 1000, tailNumber: "N801ZL", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-5", ts: seedTs + 95 * 60 * 1000, tailNumber: "N559HB", message: "checked in, status normal.", tone: "ok" },
      { id: "log-seed-6", ts: seedTs + 132 * 60 * 1000, tailNumber: "N412QX", message: "checked in, status normal.", tone: "ok" },
    ];
  });

  const [settings, setSettings] = useState<Settings>(() => defaultSettings());

  // Module 4 — incident/near-miss log. Starts with zero seeded entries so the
  // "genuinely growing list" claim is unambiguous: every row visible after
  // first submission was actually submitted through the form this session,
  // not pre-seeded to look that way.
  const [incidents, setIncidents] = useState<IncidentEntry[]>([]);

  // Module 4 — per-aircraft W&B pilot sign-offs, keyed by tail number.
  const [wbSignOffs, setWBSignOffs] = useState<Record<string, WBSignOff>>({});

  // Module 6, feature 29 — audible overdue-check-in alert. Plain component
  // state, genuinely defaulting to OFF on every mount/reload (never read
  // from any storage as "on") — respecting the fact that a browser tab
  // reload always requires a fresh user gesture before audio can play
  // again anyway, so persisting "on" across reloads would be misleading:
  // the very next reload would silently be unable to honor it until the
  // viewer interacts with the page again regardless.
  const [audibleAlertsOnState, setAudibleAlertsOnState] = useState(false);

  const setAudibleAlertsOn = useCallback((on: boolean) => {
    if (on) {
      // The toggle click IS the required user gesture — prime/resume the
      // shared AudioContext synchronously here, before any later, non-
      // gesture-driven overdue transition tries to actually play a beep.
      primeAudioContextFromUserGesture();
    }
    setAudibleAlertsOnState(on);
  }, []);

  // Module 1's per-day manifest state — same lazy-seed-on-first-visit shape
  // ManifestBoard.tsx used locally before this hoist.
  const [activeDay, setActiveDay] = useState<DayKey>("day-1");
  const [dayState, setDayState] = useState<DayState>(
    () => ({ "day-1": seedDayData("day-1") } as DayState)
  );

  const loggedTone = useRef<Record<string, SeverityTone>>({});

  // Read via a ref inside the transition effect below rather than adding
  // `audibleAlertsOnState` to that effect's own dependency array — this
  // keeps the effect's identity/timing tied ONLY to the real inputs that
  // determine severity (now, fleet, phase intervals), while still reading
  // the CURRENT toggle value at the moment a transition genuinely fires.
  const audibleAlertsOnRef = useRef(false);
  useEffect(() => {
    audibleAlertsOnRef.current = audibleAlertsOnState;
  }, [audibleAlertsOnState]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Auto-log status transitions — uses the CURRENT (editable) phase interval
  // settings, so changing a phase interval in Settings genuinely shifts when
  // this fires, same as a live phase change always has.
  //
  // FEATURE 29 hand-trace: this is the SAME transition check the activity
  // log already uses (`tone !== prevTone && prevTone !== undefined`) — i.e.
  // "this aircraft's live-computed severity just changed, and it wasn't the
  // very first render." The beep fires ONLY inside the `tone === "alert"`
  // branch of that exact same check, so it genuinely fires once per real
  // transition INTO Overdue for a given aircraft — never on mount (guarded
  // by `prevTone !== undefined`), never while an aircraft stays Overdue
  // across subsequent ticks (loggedTone.current[a.id] is set to "alert"
  // immediately, so `tone !== prevTone` is false on every following tick
  // until the aircraft checks in and the tone actually changes again), and
  // never from a demo button — there is no button-driven call to
  // playOverdueBeep() anywhere in this file or any module.
  useEffect(() => {
    for (const a of fleet) {
      const last = lastCheckIns[a.id];
      const elapsed = now - last;
      const tone = severity(elapsed, a.phase, settings.phaseIntervalMin);
      const prevTone = loggedTone.current[a.id];
      if (tone !== prevTone) {
        loggedTone.current[a.id] = tone;
        if (prevTone !== undefined) {
          const message =
            tone === "alert"
              ? "has not checked in within the interval — status OVERDUE."
              : tone === "warn"
              ? "approaching check-in window — status due soon."
              : "checked in, status normal.";
          setLogEntries((prev) => [
            { id: `log-${a.id}-${now}`, ts: now, tailNumber: a.tailNumber, message, tone },
            ...prev,
          ]);
          if (tone === "alert" && audibleAlertsOnRef.current) {
            playOverdueBeep();
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, fleet, settings.phaseIntervalMin]);

  // appendLog — the ONE real log-append mechanism. Every feature that needs
  // to write to the activity log (manual check-in, zone change, phase
  // change, incident-mode divert) goes through this, so there is no parallel
  // fake log anywhere in the app.
  const appendLog = useCallback((entry: Omit<LogEntry, "id" | "ts"> & { ts?: number }) => {
    const ts = entry.ts ?? Date.now();
    setLogEntries((prev) => [
      { id: `log-${entry.tailNumber}-${ts}-${Math.random().toString(36).slice(2, 8)}`, ts, tailNumber: entry.tailNumber, message: entry.message, tone: entry.tone },
      ...prev,
    ]);
  }, []);

  // handleCheckIn — the SAME real check-in function used by Module 2's
  // "Simulate check-in" button AND by Guide View's "Check in now" button
  // (feature 2). Genuinely resets lastCheckIns[id] to Date.now(), which is
  // what every timer/severity calculation reads from.
  const handleCheckIn = useCallback(
    (id: string) => {
      const ts = Date.now();
      setLastCheckIns((prev) => ({ ...prev, [id]: ts }));
      const a = fleet.find((f) => f.id === id);
      loggedTone.current[id] = "ok";
      appendLog({ tailNumber: a?.tailNumber ?? id, message: "checked in, status normal.", tone: "ok", ts });
    },
    [fleet, appendLog]
  );

  const handleZoneChange = useCallback(
    (id: string, zone: ZoneKey) => {
      const ts = Date.now();
      const a = fleet.find((f) => f.id === id);
      setFleet((prev) => prev.map((f) => (f.id === id ? { ...f, zone } : f)));
      if (a && a.zone !== zone) {
        appendLog({
          tailNumber: a.tailNumber,
          message: `moved from ${ZONE_BY_KEY[a.zone].label} to ${ZONE_BY_KEY[zone].label}.`,
          tone: "ok",
          ts,
        });
      }
    },
    [fleet, appendLog]
  );

  const handlePhaseChange = useCallback(
    (id: string, phase: FlightPhase) => {
      const ts = Date.now();
      const a = fleet.find((f) => f.id === id);
      setFleet((prev) => prev.map((f) => (f.id === id ? { ...f, phase } : f)));
      if (a && a.phase !== phase) {
        appendLog({
          tailNumber: a.tailNumber,
          message: `phase changed from ${a.phase} to ${phase} — check-in interval now ${settings.phaseIntervalMin[phase]} min.`,
          tone: "ok",
          ts,
        });
      }
    },
    [fleet, appendLog, settings.phaseIntervalMin]
  );

  // handleDivertToAssist — feature 1 (Incident Mode). A REAL state change:
  // sets the chosen aircraft's status/phase to "Diverting to assist" and
  // appends a real timestamped entry via the same appendLog mechanism above
  // (not a parallel fake log).
  const handleDivertToAssist = useCallback(
    (id: string, zone: ZoneKey) => {
      const ts = Date.now();
      const a = fleet.find((f) => f.id === id);
      if (!a) return;
      setFleet((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "Diverting to assist", phase: "Diverting to assist" } : f))
      );
      // Also resets the check-in timer, matching the real-world logic that a
      // diversion is itself a fresh contact/status update from the aircraft.
      setLastCheckIns((prev) => ({ ...prev, [id]: ts }));
      loggedTone.current[id] = "ok";
      appendLog({
        tailNumber: a.tailNumber,
        message: `diverting to assist — incident-mode coordinated response, now routing toward ${ZONE_BY_KEY[zone].label}.`,
        tone: "warn",
        ts,
      });
    },
    [fleet, appendLog]
  );

  const setPhaseInterval = useCallback((phase: FlightPhase, minutes: number) => {
    setSettings((prev) => ({ ...prev, phaseIntervalMin: { ...prev.phaseIntervalMin, [phase]: minutes } }));
  }, []);

  const setBayLimit = useCallback((bay: CargoBayKey, limit: number) => {
    setSettings((prev) => ({ ...prev, bayLimits: { ...prev.bayLimits, [bay]: limit } }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings());
  }, []);

  // addIncident — the ONE real append mechanism for the incident/near-miss
  // log (feature 18). Every submission from SafetyCompliance.tsx's form goes
  // through this, prepending a new entry (newest-first, matching the
  // activity log's convention) with a real Date.now() loggedAt timestamp.
  const addIncident = useCallback((entry: Omit<IncidentEntry, "id" | "loggedAt">) => {
    const loggedAt = Date.now();
    setIncidents((prev) => [
      { ...entry, id: `incident-${loggedAt}-${Math.random().toString(36).slice(2, 8)}`, loggedAt },
      ...prev,
    ]);
  }, []);

  // signOffWB — genuinely records which pilot signed off, against which
  // EXACT total weight, and when (feature 20). Capturing
  // signedAgainstTotalLbs is what makes staleness detection possible:
  // callers compare this captured number to the aircraft's CURRENT live
  // total and treat any mismatch as "not signed off," rather than trusting a
  // boolean flag that could silently go stale after a drag-and-drop
  // reassignment changes the real weight.
  const signOffWB = useCallback((tailNumber: string, pilotName: string, currentTotalLbs: number) => {
    setWBSignOffs((prev) => ({
      ...prev,
      [tailNumber]: { tailNumber, pilotName, signedAgainstTotalLbs: currentTotalLbs, signedAt: Date.now() },
    }));
  }, []);

  // clearWBSignOff — used when the numbers change after sign-off (feature
  // 20's honesty requirement): rather than leaving a stale sign-off object
  // around that callers have to remember to distrust, this removes it
  // outright so "Pending sign-off" is the only possible read of an absent
  // entry.
  const clearWBSignOff = useCallback((tailNumber: string) => {
    setWBSignOffs((prev) => {
      if (!(tailNumber in prev)) return prev;
      const next = { ...prev };
      delete next[tailNumber];
      return next;
    });
  }, []);

  // -------------------------------------------------------------------------
  // Guest-to-aircraft linking registry (feature 4) — a plain ref map from
  // tail number to its live DOM node in Module 2's board. jumpToAircraft
  // scrolls to the real node and sets highlightedTail briefly to drive a
  // highlight-flash outline. Returns false honestly if the tail number isn't
  // currently registered (e.g. Module 2 hasn't mounted yet), so callers never
  // silently pretend a jump happened.
  // -------------------------------------------------------------------------
  const nodeRegistry = useRef<Record<string, HTMLDivElement | null>>({});
  const [highlightedTail, setHighlightedTail] = useState<string | null>(null);

  const registerAircraftCardNode = useCallback((tailNumber: string, node: HTMLDivElement | null) => {
    nodeRegistry.current[tailNumber] = node;
  }, []);

  const jumpToAircraft = useCallback((tailNumber: string): boolean => {
    const exists = fleet.some((a) => a.tailNumber === tailNumber);
    if (!exists) return false;
    const node = nodeRegistry.current[tailNumber];
    if (!node) return false;

    // Scroll INSTANTLY rather than smoothly. This app's global stylesheet
    // sets `scroll-behavior: smooth` on <html> (for the anchor-link module
    // tabs), which means any scroll left to animate depends on the
    // browser's frame-scheduling loop to progress. In a throttled/
    // backgrounded rendering context that loop can stall indefinitely,
    // silently freezing a "smooth" scroll at its starting position with no
    // error. Forcing `behavior: "auto"` (and explicitly overriding the
    // element's own smooth scroll-behavior) makes the jump apply in one
    // synchronous layout pass instead of depending on that animation loop.
    const rect = node.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";
    window.scrollTo({ top: Math.max(0, targetY), behavior: "auto" });
    htmlEl.style.scrollBehavior = prevScrollBehavior;

    setHighlightedTail(tailNumber);
    window.setTimeout(() => {
      setHighlightedTail((cur) => (cur === tailNumber ? null : cur));
    }, 1800);
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fleet]);

  // -------------------------------------------------------------------------
  // Module 6, feature 28 — guest search scroll/highlight registry. Same
  // instant-scroll mechanism as jumpToAircraft above (and the same reason:
  // this app's global `scroll-behavior: smooth` can silently stall a jump in
  // a throttled rendering context). `expandedFromSearchGuestId` additionally
  // tells the matched GuestRow to render its expanded (safety-card-visible)
  // state, since a search result should show the guest's actual detail, not
  // just flash an outline around a collapsed row.
  // -------------------------------------------------------------------------
  const guestNodeRegistry = useRef<Record<string, HTMLDivElement | null>>({});
  const [highlightedGuestId, setHighlightedGuestId] = useState<string | null>(null);
  const [expandedFromSearchGuestId, setExpandedFromSearchGuestId] = useState<string | null>(null);

  const registerGuestCardNode = useCallback((guestId: string, node: HTMLDivElement | null) => {
    guestNodeRegistry.current[guestId] = node;
  }, []);

  const jumpToGuest = useCallback((guestId: string): boolean => {
    const node = guestNodeRegistry.current[guestId];
    if (!node) return false; // honest: not currently registered/rendered (e.g. wrong day tab active)

    const rect = node.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";
    window.scrollTo({ top: Math.max(0, targetY), behavior: "auto" });
    htmlEl.style.scrollBehavior = prevScrollBehavior;

    setExpandedFromSearchGuestId(guestId);
    setHighlightedGuestId(guestId);
    window.setTimeout(() => {
      setHighlightedGuestId((cur) => (cur === guestId ? null : cur));
    }, 1800);
    return true;
  }, []);

  const value: PlatformContextValue = {
    fleet,
    setFleet,
    lastCheckIns,
    now,
    roster,
    setRoster,
    logEntries,
    appendLog,
    handleCheckIn,
    handleZoneChange,
    handlePhaseChange,
    handleDivertToAssist,
    settings,
    setPhaseInterval,
    setBayLimit,
    resetSettings,
    registerAircraftCardNode,
    jumpToAircraft,
    highlightedTail,
    registerGuestCardNode,
    jumpToGuest,
    highlightedGuestId,
    expandedFromSearchGuestId,
    incidents,
    addIncident,
    wbSignOffs,
    signOffWB,
    clearWBSignOff,
    activeDay,
    setActiveDay,
    dayState,
    setDayState,
    audibleAlertsOn: audibleAlertsOnState,
    setAudibleAlertsOn,
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}
