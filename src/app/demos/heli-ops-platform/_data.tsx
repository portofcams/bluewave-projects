// Shared fleet/guest seed data for the Heli-Ops Platform concept demo.
//
// FICTIONAL SAMPLE DATA ONLY. Every tail number, pilot, guide, and guest name
// below is invented ski/snow-themed sample data for this concept demo. None
// of it reflects a real operator, a real guest, or a real flight/dispatch
// log. Names are deliberately playful (ski-pun themed) to keep the sample
// data from reading as anonymized real records.
//
// This module is the SINGLE SOURCE OF TRUTH for the fleet roster (tail
// numbers, models, pilots) so Module 1 (ManifestBoard) and Module 2
// (FlightFollowing) stay in lockstep, and so the top-of-page "Today's Ops
// Overview" strip can summarize both modules from one consistent shape
// instead of a separately hardcoded set of numbers.

export type Equipment = "Ski" | "Snowboard";

export type CargoBayKey = "interior" | "side" | "aft" | "basket";

export type Guest = {
  id: string;
  name: string;
  weightLbs: number;
  equipment: Equipment;
  medicalFlag: string; // "None" is a valid, clearly-labeled value
  weatherHold?: boolean; // true = flagged for wx roll, needs reslot
  rental?: RentalGear; // present only for guests renting gear this day
};

// ---------------------------------------------------------------------------
// RENTAL GEAR — specific size/serial info for guests marked as renting,
// replacing an aggregate-only rentals count with per-guest detail. Sample
// sizes only; not tied to a live rental-shop inventory system.
// ---------------------------------------------------------------------------
export type RentalGear = {
  skiOrBoardLengthCm: number; // ski length, or board length for snowboarders
  bootSizeMondo: number; // Mondopoint boot size (sample scale)
  serial: string; // sample rental-tag serial
};

export type GuideGroup = {
  id: string;
  guideName: string;
  cargoBay: CargoBayKey;
  guests: Guest[];
};

export type FleetAircraft = {
  id: string;
  tailNumber: string;
  model: string;
  pilotName: string;
};

export type Helicopter = FleetAircraft & {
  groups: GuideGroup[];
};

export type CatGroup = {
  id: string;
  catName: string;
  driverName: string;
  guideName: string;
  guests: Guest[];
};

// ---------------------------------------------------------------------------
// CARGO BAY CAPACITY LIMITS (configurable — sample defaults for this demo)
// ---------------------------------------------------------------------------
export const BAY_LIMITS: Record<CargoBayKey, number> = {
  interior: 720, // pax-internal seating, sample limit
  side: 480, // side basket / pod
  aft: 420, // aft compartment
  basket: 360, // external basket
};

export const BAY_LABEL: Record<CargoBayKey, string> = {
  interior: "Interior (pax-internal)",
  side: "Side basket",
  aft: "Aft compartment",
  basket: "External basket",
};

// A guide-group weight threshold used purely for the group-level flag —
// independent of the aircraft bay math, mirroring how a dispatcher would
// also sanity-check group totals against a per-group planning target.
export const GROUP_WARN_LBS = 620;
export const GROUP_MAX_LBS = 680;

// ---------------------------------------------------------------------------
// FLEET ROSTER — shared across Module 1 and Module 2. 5 fictional
// helicopters, invented tail numbers, ski/snow-pun pilot names.
// ---------------------------------------------------------------------------
export const FLEET_ROSTER: FleetAircraft[] = [
  { id: "heli-1", tailNumber: "N412QX", model: "A-Star sample", pilotName: "Pilot: Sunny Slopeman (sample)" },
  { id: "heli-2", tailNumber: "N287TR", model: "A-Star sample", pilotName: "Pilot: Frost Bittner (sample)" },
  { id: "heli-3", tailNumber: "N559HB", model: "A-Star sample", pilotName: "Pilot: Chip Powderhound (sample)" },
  { id: "heli-4", tailNumber: "N634VK", model: "A-Star sample", pilotName: "Pilot: Ivana Schuss (sample)" },
  { id: "heli-5", tailNumber: "N801ZL", model: "A-Star sample", pilotName: "Pilot: Sven Snowplow (sample)" },
];

// ---------------------------------------------------------------------------
// SEED DATA — 5 fictional helicopters, 2 fictional snowcats, each helicopter
// carrying 2-3 guide groups of 3-4 guests. All names, tail numbers, and
// guests are invented ski/snow-pun sample data for this demo.
// ---------------------------------------------------------------------------
export function seedHelicopters(): Helicopter[] {
  return [
    {
      ...FLEET_ROSTER[0],
      groups: [
        {
          id: "grp-1a",
          guideName: "Guide: Barry Steep (sample)",
          cargoBay: "interior",
          guests: [
            { id: "g1", name: "Powder McTurns", weightLbs: 182, equipment: "Ski", medicalFlag: "None", rental: { skiOrBoardLengthCm: 181, bootSizeMondo: 28.5, serial: "RNT-1042" } },
            { id: "g2", name: "Nadia Groomsworth", weightLbs: 154, equipment: "Snowboard", medicalFlag: "Bee sting allergy — EpiPen carried" },
            { id: "g3", name: "Corduroy Vance", weightLbs: 201, equipment: "Ski", medicalFlag: "None" },
            { id: "g4", name: "Skye Bluebird", weightLbs: 176, equipment: "Ski", medicalFlag: "Type 1 diabetic — glucose kit in pack", rental: { skiOrBoardLengthCm: 172, bootSizeMondo: 26, serial: "RNT-1043" } },
          ],
        },
        {
          id: "grp-1b",
          guideName: "Guide: Dusty Trail (sample)",
          cargoBay: "side",
          guests: [
            { id: "g5", name: "Wyatt Carvington", weightLbs: 168, equipment: "Snowboard", medicalFlag: "None", rental: { skiOrBoardLengthCm: 158, bootSizeMondo: 27, serial: "RNT-1044" } },
            { id: "g6", name: "Piper Whiteout", weightLbs: 149, equipment: "Ski", medicalFlag: "None" },
            { id: "g7", name: "Rocco Sideslip", weightLbs: 140, equipment: "Ski", medicalFlag: "Mild asthma — rescue inhaler carried" },
          ],
        },
      ],
    },
    {
      ...FLEET_ROSTER[1],
      groups: [
        {
          id: "grp-2a",
          guideName: "Guide: Mo Guls (sample)",
          cargoBay: "interior",
          guests: [
            { id: "g8", name: "Fawn Alpenglow", weightLbs: 189, equipment: "Ski", medicalFlag: "None", weatherHold: true },
            { id: "g9", name: "Bram Icefall", weightLbs: 150, equipment: "Snowboard", medicalFlag: "None" },
            { id: "g10", name: "Talia Frostbyte", weightLbs: 173, equipment: "Ski", medicalFlag: "Hormone therapy — carries own medication, no field action needed" },
          ],
        },
        {
          id: "grp-2b",
          guideName: "Guide: Ridge Runnerman (sample)",
          cargoBay: "aft",
          guests: [
            // Bay-level overweight sample group — severity 1 (aft bay limit
            // 420 lb; this group runs +55 lb over).
            { id: "g11", name: "Duncan Crevasse", weightLbs: 178, equipment: "Ski", medicalFlag: "None" },
            { id: "g12", name: "Anwen Icecap", weightLbs: 152, equipment: "Snowboard", medicalFlag: "Severe tree-nut allergy — EpiPen carried" },
            { id: "g13", name: "Rasmus Sidecountry", weightLbs: 145, equipment: "Ski", medicalFlag: "None" },
          ],
        },
      ],
    },
    {
      ...FLEET_ROSTER[2],
      groups: [
        {
          id: "grp-3a",
          guideName: "Guide: Cliff Hangerson (sample)",
          cargoBay: "basket",
          guests: [
            { id: "g14", name: "Josefine Powderly", weightLbs: 110, equipment: "Ski", medicalFlag: "None", rental: { skiOrBoardLengthCm: 156, bootSizeMondo: 23.5, serial: "RNT-1045" } },
            { id: "g15", name: "Emeka Snowden", weightLbs: 115, equipment: "Snowboard", medicalFlag: "None" },
            { id: "g16", name: "Ffion Glacierton", weightLbs: 120, equipment: "Ski", medicalFlag: "Seizure medication — carries own, notify guide if aura reported" },
          ],
        },
        {
          id: "grp-3b",
          guideName: "Guide: Torin Basewax (sample)",
          cargoBay: "interior",
          guests: [
            // Group-level near-limit sample (WARN band 620-680 lb) — a
            // second, milder flavor of flag distinct from the two bay
            // overweight groups above.
            { id: "g17", name: "Camille Snowdrift", weightLbs: 155, equipment: "Ski", medicalFlag: "None" },
            { id: "g18", name: "Youssef Halfpipe", weightLbs: 190, equipment: "Snowboard", medicalFlag: "None" },
            { id: "g19", name: "Petra Iceman", weightLbs: 167, equipment: "Ski", medicalFlag: "None", weatherHold: true },
            { id: "g20", name: "Otto Bindingsworth", weightLbs: 158, equipment: "Snowboard", medicalFlag: "None" },
          ],
        },
      ],
    },
    {
      ...FLEET_ROSTER[3],
      groups: [
        {
          id: "grp-4a",
          guideName: "Guide: Blizzard Beaumont (sample)",
          cargoBay: "interior",
          guests: [
            { id: "g21", name: "Della Snowcap", weightLbs: 171, equipment: "Ski", medicalFlag: "None" },
            { id: "g22", name: "Hugo Piste", weightLbs: 196, equipment: "Snowboard", medicalFlag: "None" },
            { id: "g23", name: "Marisol Chairlift", weightLbs: 148, equipment: "Ski", medicalFlag: "None" },
          ],
        },
        {
          id: "grp-4b",
          guideName: "Guide: Powder Higgins (sample)",
          cargoBay: "side",
          guests: [
            // Bay-level overweight sample group — severity 2 (side bay limit
            // 480 lb; this group runs only +8 lb over), a visibly lighter
            // flag than grp-2b's aft overage so the two read as different
            // severities rather than a single cherry-picked example.
            { id: "g24", name: "Ansel Steezeman", weightLbs: 199, equipment: "Ski", medicalFlag: "None" },
            { id: "g25", name: "Ingrid Cornice", weightLbs: 178, equipment: "Snowboard", medicalFlag: "Mild asthma — rescue inhaler carried" },
            { id: "g26", name: "Beckett Slushbrook", weightLbs: 111, equipment: "Ski", medicalFlag: "None" },
          ],
        },
        {
          id: "grp-4c",
          guideName: "Guide: Alpine Fetternly (sample)",
          cargoBay: "basket",
          guests: [
            { id: "g27", name: "Juniper Snowbank", weightLbs: 152, equipment: "Ski", medicalFlag: "None" },
            { id: "g28", name: "Reece Waxwell", weightLbs: 183, equipment: "Snowboard", medicalFlag: "None" },
          ],
        },
      ],
    },
    {
      ...FLEET_ROSTER[4],
      groups: [
        {
          id: "grp-5a",
          guideName: "Guide: Gnarly Winterbourne (sample)",
          cargoBay: "aft",
          guests: [
            { id: "g29", name: "Freya Snowplough", weightLbs: 145, equipment: "Ski", medicalFlag: "None" },
            { id: "g30", name: "Lachlan Backcountry", weightLbs: 150, equipment: "Snowboard", medicalFlag: "None" },
            { id: "g31", name: "Odette Frostfield", weightLbs: 110, equipment: "Ski", medicalFlag: "Bee sting allergy — EpiPen carried" },
          ],
        },
        {
          id: "grp-5b",
          guideName: "Guide: Summit Larkspur (sample)",
          cargoBay: "interior",
          guests: [
            { id: "g32", name: "Elin Glissade", weightLbs: 159, equipment: "Ski", medicalFlag: "None" },
            { id: "g33", name: "Magnus Traverston", weightLbs: 187, equipment: "Snowboard", medicalFlag: "None" },
            { id: "g34", name: "Runa Whiteroom", weightLbs: 164, equipment: "Ski", medicalFlag: "None" },
          ],
        },
      ],
    },
  ];
}

export function seedCatGroups(): CatGroup[] {
  return [
    {
      id: "cat-1",
      catName: "Snowcat 1 (sample)",
      driverName: "Driver: Hollis Groomer (sample)",
      guideName: "Guide: Renata Switchback (sample)",
      guests: [
        { id: "c1", name: "Mateus Snowline", weightLbs: 172, equipment: "Ski", medicalFlag: "None", rental: { skiOrBoardLengthCm: 178, bootSizeMondo: 29, serial: "RNT-1046" } },
        { id: "c2", name: "Sigrid Powderpuff", weightLbs: 148, equipment: "Snowboard", medicalFlag: "None" },
        { id: "c3", name: "Amos Ridgeline", weightLbs: 210, equipment: "Ski", medicalFlag: "None" },
        { id: "c4", name: "Winnifred Iceberg", weightLbs: 158, equipment: "Ski", medicalFlag: "Bee sting allergy — EpiPen carried" },
      ],
    },
    {
      id: "cat-2",
      catName: "Snowcat 2 (sample)",
      driverName: "Driver: Petra Slushpile (sample)",
      guideName: "Guide: Jonas Whiteout (sample)",
      guests: [
        { id: "c5", name: "Declan Snowshoe", weightLbs: 185, equipment: "Snowboard", medicalFlag: "None" },
        { id: "c6", name: "Liora Frostline", weightLbs: 151, equipment: "Ski", medicalFlag: "None" },
        { id: "c7", name: "Osric Deepsnow", weightLbs: 199, equipment: "Ski", medicalFlag: "None" },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// MATH HELPERS — shared so page-level overview math matches module math.
// ---------------------------------------------------------------------------
export function groupWeight(g: GuideGroup): number {
  return g.guests.reduce((sum, guest) => sum + guest.weightLbs, 0);
}

export function bayLoadForHeli(heli: Helicopter): Record<CargoBayKey, number> {
  const totals: Record<CargoBayKey, number> = { interior: 0, side: 0, aft: 0, basket: 0 };
  for (const g of heli.groups) {
    totals[g.cargoBay] += groupWeight(g);
  }
  return totals;
}

export function heliTotalWeight(heli: Helicopter): number {
  return heli.groups.reduce((sum, g) => sum + groupWeight(g), 0);
}

export function totalGuestCount(helicopters: Helicopter[], catGroups: CatGroup[]): number {
  const heliGuests = helicopters.reduce(
    (sum, h) => sum + h.groups.reduce((s2, g) => s2 + g.guests.length, 0),
    0
  );
  const catGuests = catGroups.reduce((sum, c) => sum + c.guests.length, 0);
  return heliGuests + catGuests;
}

// `bayLimits` defaults to the static sample BAY_LIMITS so existing callers
// (e.g. OpsOverview, which only ever reads the seeded/default picture of the
// day) are unaffected. ManifestBoard passes the live, demo-editable settings
// value (see _platform.tsx feature 5) so this count genuinely reacts to a
// changed bay limit instead of silently grading against the old default.
export function weightBalanceFlagCount(
  helicopters: Helicopter[],
  bayLimits: Record<CargoBayKey, number> = BAY_LIMITS
): number {
  const overweightGroups = helicopters.reduce(
    (sum, h) => sum + h.groups.filter((g) => groupWeight(g) > GROUP_MAX_LBS).length,
    0
  );
  const overweightBays = helicopters.reduce((sum, h) => {
    const bays = bayLoadForHeli(h);
    return sum + (Object.keys(bays) as CargoBayKey[]).filter((b) => bays[b] > bayLimits[b]).length;
  }, 0);
  return overweightGroups + overweightBays;
}

export function weatherHoldCount(helicopters: Helicopter[]): number {
  return helicopters.reduce(
    (sum, h) => sum + h.groups.reduce((s2, g) => s2 + g.guests.filter((gu) => gu.weatherHold).length, 0),
    0
  );
}

// ---------------------------------------------------------------------------
// RENTALS / EQUIPMENT — small illustrative snapshot for the day. Static
// sample counts, shown alongside the live-computed fleet numbers.
// ---------------------------------------------------------------------------
export type RentalSnapshot = {
  newSetsOut: number;
  guestOwnGear: number;
  pendingFitting: number;
};

export function seedRentalSnapshot(): RentalSnapshot {
  return { newSetsOut: 2, guestOwnGear: 5, pendingFitting: 1 };
}

// ---------------------------------------------------------------------------
// MULTI-DAY CALENDAR — a small day-picker's worth of sample days. Each day
// gets its own independent deep-cloned copy of the fleet/cat seed data so
// ManifestBoard can hold separate live state per day without days bleeding
// into one another. The weather-hold -> reslot cascade across days is now
// driven by REAL state moves at click-time (see ManifestBoard's
// handleReslot), not by scripted seed data — so no day's seed hardcodes a
// guest arriving from a prior day's hold.
// ---------------------------------------------------------------------------
export type DayKey = "day-1" | "day-2" | "day-3";

// The day that follows a given day in the reslot sequence (Day 1 -> Day 2 ->
// Day 3), or null if there is no further day to roll into.
export const NEXT_DAY: Record<DayKey, DayKey | null> = {
  "day-1": "day-2",
  "day-2": "day-3",
  "day-3": null,
};

export type DayInfo = {
  key: DayKey;
  label: string; // short tab label, e.g. "Today"
  dateLabel: string; // sample calendar date
};

export const SAMPLE_DAYS: DayInfo[] = [
  { key: "day-1", label: "Today", dateLabel: "Thu · Jan 15" },
  { key: "day-2", label: "Tomorrow", dateLabel: "Fri · Jan 16" },
  { key: "day-3", label: "+2 days", dateLabel: "Sat · Jan 17" },
];

function cloneHelicopters(helis: Helicopter[]): Helicopter[] {
  return helis.map((h) => ({
    ...h,
    groups: h.groups.map((g) => ({ ...g, guests: g.guests.map((gu) => ({ ...gu })) })),
  }));
}

function cloneCatGroups(cats: CatGroup[]): CatGroup[] {
  return cats.map((c) => ({ ...c, guests: c.guests.map((gu) => ({ ...gu })) }));
}

// Day 1 = the existing single-day seed, unchanged (also used standalone by
// Module 2 / OpsOverview via seedHelicopters()/seedCatGroups()).
function seedDay1(): { helicopters: Helicopter[]; catGroups: CatGroup[] } {
  return { helicopters: seedHelicopters(), catGroups: seedCatGroups() };
}

// Day 2 = a lighter roster (some guests only booked for Day 1). A fresh
// Day-2 weather hold (Youssef Halfpipe, g18) is seeded independently here —
// any Day-1 -> Day-2 guest movement instead happens for real at click-time
// via ManifestBoard's handleReslot, which genuinely removes the guest from
// Day 1's live state and adds them into Day 2's live state.
function seedDay2(): { helicopters: Helicopter[]; catGroups: CatGroup[] } {
  const base = cloneHelicopters(seedHelicopters());
  const cats = cloneCatGroups(seedCatGroups());

  for (const heli of base) {
    for (const group of heli.groups) {
      group.guests = group.guests.filter((g) => g.id !== "g19"); // one guest not booked Day 2
      if (group.id === "grp-3b") {
        // A fresh Day-2 weather hold, independent of any Day-1 cascade.
        group.guests = group.guests.map((g) =>
          g.id === "g18" ? { ...g, weatherHold: true } : g
        );
      }
    }
  }
  return { helicopters: base, catGroups: cats };
}

// Day 3 = a trimmed roster (later in the trip week, fewer guests booked) —
// just enough variation to make the day-picker feel like real distinct days
// rather than the same board redrawn three times.
function seedDay3(): { helicopters: Helicopter[]; catGroups: CatGroup[] } {
  const base = cloneHelicopters(seedHelicopters());
  const cats = cloneCatGroups(seedCatGroups());
  for (const heli of base) {
    for (const group of heli.groups) {
      // Trim one guest per group (the last one) to vary Day 3's totals.
      if (group.guests.length > 1) group.guests = group.guests.slice(0, -1);
    }
  }
  return { helicopters: base, catGroups: cats.slice(0, 1) };
}

export function seedDayData(day: DayKey): { helicopters: Helicopter[]; catGroups: CatGroup[] } {
  if (day === "day-2") return seedDay2();
  if (day === "day-3") return seedDay3();
  return seedDay1();
}

// ---------------------------------------------------------------------------
// AUTO-SUGGEST REBALANCING — given the current fleet, find a SINGLE guest
// whose move from an overweight guide group to a different group (same
// helicopter or another) would bring BOTH the origin and destination group
// under their weight limits. This is computed for real against live state,
// not a canned string — if no single-guest swap resolves a given group's
// overage, callers are told honestly that no such swap exists.
// ---------------------------------------------------------------------------
export type RebalanceSuggestion = {
  guestId: string;
  guestName: string;
  guestWeightLbs: number;
  fromGroupId: string;
  fromGroupLabel: string;
  toGroupId: string;
  toGroupLabel: string;
  toHeliId: string;
};

/**
 * Looks at one overweight guide group (`group`, on helicopter `heliId`) and
 * searches every OTHER guide group across the whole fleet for a single guest
 * whose move would resolve the overage without creating a new one. Returns
 * the first valid suggestion found, or null if none exists.
 */
export function findRebalanceSuggestion(
  helicopters: Helicopter[],
  heliId: string,
  group: GuideGroup,
  bayLimits: Record<CargoBayKey, number> = BAY_LIMITS
): RebalanceSuggestion | null {
  const fromTotal = groupWeight(group);
  const overBy = fromTotal - GROUP_MAX_LBS;
  if (overBy <= 0) return null;

  for (const guest of group.guests) {
    const fromTotalAfter = fromTotal - guest.weightLbs;
    if (fromTotalAfter > GROUP_MAX_LBS) continue; // moving this guest alone doesn't fix the origin

    for (const heli of helicopters) {
      // Bay loads computed AS IF this guest has already left the origin
      // group — otherwise, when origin and destination share a bay (e.g.
      // two groups both loaded into "interior"), the origin group's own
      // pre-move weight would get double-counted against the bay limit.
      const destBayLoadsAfterRemoval = bayLoadForHeli(heli);
      if (heli.id === heliId) {
        destBayLoadsAfterRemoval[group.cargoBay] -= guest.weightLbs;
      }

      for (const destGroup of heli.groups) {
        if (destGroup.id === group.id) continue;
        const destTotal = groupWeight(destGroup);
        const destTotalAfter = destTotal + guest.weightLbs;
        if (destTotalAfter > GROUP_MAX_LBS) continue; // would overload the destination

        // Also respect destination cargo-bay capacity, not just the
        // per-group planning threshold, so the suggestion is honest about
        // aircraft-level weight-and-balance too.
        const destBayAfter = destBayLoadsAfterRemoval[destGroup.cargoBay] + guest.weightLbs;
        if (destBayAfter > bayLimits[destGroup.cargoBay]) continue;

        return {
          guestId: guest.id,
          guestName: guest.name,
          guestWeightLbs: guest.weightLbs,
          fromGroupId: group.id,
          fromGroupLabel: group.guideName,
          toGroupId: destGroup.id,
          toGroupLabel: destGroup.guideName,
          toHeliId: heli.id,
        };
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// MODULE 4 — SAFETY & COMPLIANCE DEPTH
//
// FICTIONAL SAMPLE DATA ONLY. Pilot names below are the SAME FLEET_ROSTER
// pilots used throughout Module 1/2; guide names below are the SAME guide
// names already assigned to Day 1's guide groups in seedHelicopters(). No
// new fictional people are invented here — the cert tracker and duty-hours
// log reuse the existing roster so this module's "who's assigned today"
// check is a real cross-reference against Module 1's actual manifest, not a
// parallel invented cast.
//
// ILLUSTRATIVE ONLY — NOT REAL REGULATORY RECORDKEEPING. The duty-hour
// limit and cert-expiry logic below are simplified teaching examples of the
// SHAPE a Part 135 duty log / cert tracker could take. They are not legal
// advice, not a certified recordkeeping system, and must never be used as a
// substitute for an operator's real FAA-accepted duty/rest and currency
// tracking process.
// ---------------------------------------------------------------------------

// A single flight/duty segment logged against a pilot, today or earlier this
// week. `durationMin` is flight time in minutes for that segment. This is
// the real seed data the duty-hours log sums — nothing here is a canned
// "total" string computed once and hardcoded.
export type DutySegment = {
  id: string;
  pilotName: string; // matches FleetAircraft.pilotName exactly
  dateLabel: string; // sample calendar date, e.g. "Thu · Jan 15"
  isToday: boolean; // true for segments counted in "today's" total
  durationMin: number;
  note: string;
};

// 14 CFR 135.267 sets an 8-hour flight-time limit in 24 consecutive hours for
// a one-pilot crew (this fleet flies single-pilot A-Star-sample airframes),
// with flight time allowed to run under a duty period of up to 14 hours
// under specific rest-period conditions. Verified via eCFR 14 CFR 135.267
// (https://www.ecfr.gov/current/title-14/chapter-I/subchapter-G/part-135/subpart-F/section-135.267)
// on 2026-07-03. Cited here as the TYPICAL Part 135 single-pilot limit, not
// asserted as a substitute for an operator's actual FAR analysis — duty-day
// structuring, rest-period timing, and any operator-specific exemptions are
// all real regulatory judgment calls this demo does not attempt to make.
export const PART135_FLIGHT_TIME_LIMIT_HRS = 8;
export const PART135_DUTY_PERIOD_LIMIT_HRS = 14;
// A conservative illustrative "approaching limit" band used only to color
// this demo's flags — NOT a regulatory figure itself.
export const DUTY_WARN_PCT = 0.75;

export function seedDutySegments(): DutySegment[] {
  return [
    // Sunny Slopeman (N412QX) — long today, close to the flight-time limit.
    { id: "duty-1", pilotName: "Pilot: Sunny Slopeman (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 255, note: "AM + midday runs, Powder Bowl / North Couloir" },
    { id: "duty-2", pilotName: "Pilot: Sunny Slopeman (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 130, note: "PM runs, Glacier Shelf" },
    { id: "duty-3", pilotName: "Pilot: Sunny Slopeman (sample)", dateLabel: "Wed · Jan 14", isToday: false, durationMin: 210, note: "Prior day, full rotation" },
    { id: "duty-4", pilotName: "Pilot: Sunny Slopeman (sample)", dateLabel: "Tue · Jan 13", isToday: false, durationMin: 195, note: "Prior day, full rotation" },

    // Frost Bittner (N287TR) — moderate today.
    { id: "duty-5", pilotName: "Pilot: Frost Bittner (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 180, note: "AM + midday runs, North Couloir" },
    { id: "duty-6", pilotName: "Pilot: Frost Bittner (sample)", dateLabel: "Wed · Jan 14", isToday: false, durationMin: 160, note: "Prior day, full rotation" },
    { id: "duty-7", pilotName: "Pilot: Frost Bittner (sample)", dateLabel: "Mon · Jan 12", isToday: false, durationMin: 150, note: "Prior day, full rotation" },

    // Chip Powderhound (N559HB) — light today, still building weekly total.
    { id: "duty-8", pilotName: "Pilot: Chip Powderhound (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 95, note: "AM runs, Glacier Shelf" },
    { id: "duty-9", pilotName: "Pilot: Chip Powderhound (sample)", dateLabel: "Wed · Jan 14", isToday: false, durationMin: 205, note: "Prior day, full rotation" },
    { id: "duty-10", pilotName: "Pilot: Chip Powderhound (sample)", dateLabel: "Tue · Jan 13", isToday: false, durationMin: 190, note: "Prior day, full rotation" },
    { id: "duty-11", pilotName: "Pilot: Chip Powderhound (sample)", dateLabel: "Mon · Jan 12", isToday: false, durationMin: 175, note: "Prior day, full rotation" },

    // Ivana Schuss (N634VK) — over the illustrative warn band today.
    { id: "duty-12", pilotName: "Pilot: Ivana Schuss (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 220, note: "AM runs, Base Pad shuttle + returns" },
    { id: "duty-13", pilotName: "Pilot: Ivana Schuss (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 145, note: "Midday runs, Base Pad" },
    { id: "duty-14", pilotName: "Pilot: Ivana Schuss (sample)", dateLabel: "Wed · Jan 14", isToday: false, durationMin: 200, note: "Prior day, full rotation" },

    // Sven Snowplow (N801ZL) — over the illustrative flight-time limit today
    // (deliberate sample flag so the alert state has a real example to show).
    { id: "duty-15", pilotName: "Pilot: Sven Snowplow (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 260, note: "AM + midday runs, Sundance Ridge" },
    { id: "duty-16", pilotName: "Pilot: Sven Snowplow (sample)", dateLabel: "Thu · Jan 15", isToday: true, durationMin: 230, note: "PM runs, Sundance Ridge" },
    { id: "duty-17", pilotName: "Pilot: Sven Snowplow (sample)", dateLabel: "Tue · Jan 13", isToday: false, durationMin: 180, note: "Prior day, full rotation" },
    { id: "duty-18", pilotName: "Pilot: Sven Snowplow (sample)", dateLabel: "Mon · Jan 12", isToday: false, durationMin: 165, note: "Prior day, full rotation" },
  ];
}

export type PilotDutySummary = {
  pilotName: string;
  todayMin: number;
  weekMin: number;
  todayHrs: number;
  weekHrs: number;
  pctOfDailyLimit: number; // todayHrs / PART135_FLIGHT_TIME_LIMIT_HRS
  tone: "ok" | "warn" | "alert";
};

// Sums real DutySegment rows per pilot — today's total and this week's
// running total — and flags anyone at/over the illustrative daily
// flight-time limit, or within DUTY_WARN_PCT of it. Computed fresh from the
// segment list every call, so editing seedDutySegments() (or, in a fuller
// build, appending live segments) changes these totals for real.
export function computePilotDutySummaries(segments: DutySegment[]): PilotDutySummary[] {
  const byPilot = new Map<string, { todayMin: number; weekMin: number }>();
  for (const seg of segments) {
    const entry = byPilot.get(seg.pilotName) ?? { todayMin: 0, weekMin: 0 };
    entry.weekMin += seg.durationMin;
    if (seg.isToday) entry.todayMin += seg.durationMin;
    byPilot.set(seg.pilotName, entry);
  }
  return FLEET_ROSTER.map((f) => {
    const entry = byPilot.get(f.pilotName) ?? { todayMin: 0, weekMin: 0 };
    const todayHrs = entry.todayMin / 60;
    const weekHrs = entry.weekMin / 60;
    const pctOfDailyLimit = todayHrs / PART135_FLIGHT_TIME_LIMIT_HRS;
    const tone: "ok" | "warn" | "alert" =
      todayHrs >= PART135_FLIGHT_TIME_LIMIT_HRS ? "alert" : pctOfDailyLimit >= DUTY_WARN_PCT ? "warn" : "ok";
    return {
      pilotName: f.pilotName,
      todayMin: entry.todayMin,
      weekMin: entry.weekMin,
      todayHrs: Math.round(todayHrs * 10) / 10,
      weekHrs: Math.round(weekHrs * 10) / 10,
      pctOfDailyLimit,
      tone,
    };
  });
}

// ---------------------------------------------------------------------------
// GUIDE CERT / AVALANCHE-TRAINING TRACKER
//
// Certification records per guide, keyed by the SAME guide name strings
// already used in seedHelicopters()'s Day-1 groups (e.g. "Guide: Barry Steep
// (sample)"). Expiration dates are sample dates relative to the demo's
// sample "today" (Thu · Jan 15 — the same sample date used throughout the
// day-picker). A cert is "expiring soon" inside CERT_WARN_DAYS of that
// sample today, or "expired" if its date is already past it.
// ---------------------------------------------------------------------------
export type CertType = "Avalanche training" | "First aid / CPR" | "Helicopter ops orientation";

export type GuideCert = {
  id: string;
  guideName: string; // matches GuideGroup.guideName / CatGroup.guideName exactly
  certType: CertType;
  levelLabel: string; // e.g. "Level 2", "Wilderness First Responder"
  expiresLabel: string; // sample calendar date string, e.g. "Jan 20"
  expiresSampleDayOffset: number; // days from sample "today" (Thu Jan 15); negative = already past
};

// Sample "today" for this demo, matching SAMPLE_DAYS[0].dateLabel ("Thu ·
// Jan 15"). Used only to derive expired/expiring-soon flags below.
export const SAMPLE_TODAY_LABEL = "Thu · Jan 15";
export const CERT_WARN_DAYS = 14;

export function seedGuideCerts(): GuideCert[] {
  return [
    // grp-1a / grp-1b (heli-1, N412QX)
    { id: "cert-1", guideName: "Guide: Barry Steep (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "Jan 20", expiresSampleDayOffset: 5 },
    { id: "cert-2", guideName: "Guide: Barry Steep (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "Mar 02", expiresSampleDayOffset: 46 },
    // Dusty Trail — EXPIRED avalanche cert, deliberate sample flag: assigned
    // today to grp-1b on N412QX, so this genuinely trips the "assigned
    // today with an expired cert" check.
    { id: "cert-3", guideName: "Guide: Dusty Trail (sample)", certType: "Avalanche training", levelLabel: "Level 1", expiresLabel: "Jan 09", expiresSampleDayOffset: -6 },
    { id: "cert-4", guideName: "Guide: Dusty Trail (sample)", certType: "First aid / CPR", levelLabel: "Standard First Aid", expiresLabel: "Apr 11", expiresSampleDayOffset: 86 },

    // grp-2a / grp-2b (heli-2, N287TR)
    { id: "cert-5", guideName: "Guide: Mo Guls (sample)", certType: "Avalanche training", levelLabel: "Level 3", expiresLabel: "Jun 18", expiresSampleDayOffset: 154 },
    { id: "cert-6", guideName: "Guide: Mo Guls (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "Feb 01", expiresSampleDayOffset: 17 },
    // Ridge Runnerman — EXPIRING SOON (within CERT_WARN_DAYS), assigned today
    // to grp-2b on N287TR.
    { id: "cert-7", guideName: "Guide: Ridge Runnerman (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "Jan 22", expiresSampleDayOffset: 7 },
    { id: "cert-8", guideName: "Guide: Ridge Runnerman (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "May 05", expiresSampleDayOffset: 110 },

    // grp-3a / grp-3b (heli-3, N559HB)
    { id: "cert-9", guideName: "Guide: Cliff Hangerson (sample)", certType: "Avalanche training", levelLabel: "Level 3", expiresLabel: "Aug 09", expiresSampleDayOffset: 206 },
    { id: "cert-10", guideName: "Guide: Cliff Hangerson (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "Mar 14", expiresSampleDayOffset: 58 },
    { id: "cert-11", guideName: "Guide: Torin Basewax (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "Feb 27", expiresSampleDayOffset: 43 },
    { id: "cert-12", guideName: "Guide: Torin Basewax (sample)", certType: "First aid / CPR", levelLabel: "Standard First Aid", expiresLabel: "Jan 19", expiresSampleDayOffset: 4 },

    // grp-4a / grp-4b / grp-4c (heli-4, N634VK)
    { id: "cert-13", guideName: "Guide: Blizzard Beaumont (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "Sep 30", expiresSampleDayOffset: 258 },
    { id: "cert-14", guideName: "Guide: Blizzard Beaumont (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "Apr 22", expiresSampleDayOffset: 97 },
    { id: "cert-15", guideName: "Guide: Powder Higgins (sample)", certType: "Avalanche training", levelLabel: "Level 1", expiresLabel: "Jul 04", expiresSampleDayOffset: 170 },
    { id: "cert-16", guideName: "Guide: Powder Higgins (sample)", certType: "First aid / CPR", levelLabel: "Standard First Aid", expiresLabel: "Feb 14", expiresSampleDayOffset: 30 },
    { id: "cert-17", guideName: "Guide: Alpine Fetternly (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "May 28", expiresSampleDayOffset: 133 },
    { id: "cert-18", guideName: "Guide: Alpine Fetternly (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "Mar 30", expiresSampleDayOffset: 74 },

    // grp-5a / grp-5b (heli-5, N801ZL)
    { id: "cert-19", guideName: "Guide: Gnarly Winterbourne (sample)", certType: "Avalanche training", levelLabel: "Level 3", expiresLabel: "Oct 11", expiresSampleDayOffset: 269 },
    { id: "cert-20", guideName: "Guide: Gnarly Winterbourne (sample)", certType: "First aid / CPR", levelLabel: "Wilderness First Responder", expiresLabel: "Jun 06", expiresSampleDayOffset: 142 },
    { id: "cert-21", guideName: "Guide: Summit Larkspur (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "Nov 02", expiresSampleDayOffset: 291 },
    { id: "cert-22", guideName: "Guide: Summit Larkspur (sample)", certType: "First aid / CPR", levelLabel: "Standard First Aid", expiresLabel: "Aug 21", expiresSampleDayOffset: 218 },

    // Snowcat guides (cat-1, cat-2) — included for completeness of the cert
    // roster, even though today's helicopter-assignment cross-check (which
    // reads Module 1's heli groups) only applies to heli-assigned guides.
    { id: "cert-23", guideName: "Guide: Renata Switchback (sample)", certType: "Avalanche training", levelLabel: "Level 2", expiresLabel: "Dec 01", expiresSampleDayOffset: 320 },
    { id: "cert-24", guideName: "Guide: Jonas Whiteout (sample)", certType: "Avalanche training", levelLabel: "Level 1", expiresLabel: "Jan 17", expiresSampleDayOffset: 2 },
  ];
}

export type CertFlagTone = "ok" | "warn" | "alert";

export type GuideCertFlag = {
  guideName: string;
  cert: GuideCert;
  tone: CertFlagTone; // alert = expired, warn = expiring within CERT_WARN_DAYS, ok = fine
  daysUntilExpiry: number;
};

function certTone(daysUntilExpiry: number): CertFlagTone {
  if (daysUntilExpiry < 0) return "alert";
  if (daysUntilExpiry <= CERT_WARN_DAYS) return "warn";
  return "ok";
}

// Every cert record, flagged ok/warn/alert against the sample "today" —
// cert-level view, independent of who's assigned where today.
export function flagAllCerts(certs: GuideCert[]): GuideCertFlag[] {
  return certs.map((cert) => ({
    guideName: cert.guideName,
    cert,
    tone: certTone(cert.expiresSampleDayOffset),
    daysUntilExpiry: cert.expiresSampleDayOffset,
  }));
}

// THE REAL CROSS-CHECK (feature 17's core honesty requirement): given
// Module 1's ACTUAL Day-1 helicopter roster (so this reads live assigned
// guide names, not a separately hardcoded list) and the cert roster, return
// one flag per (assigned guide × cert) pair that is expired or expiring
// soon — plus which aircraft/group they're actually assigned to today, so
// the flag reads as "this guide, assigned to this real group today, has
// this real problem" rather than a cert list shown in isolation.
export type AssignedGuideCertFlag = GuideCertFlag & {
  tailNumber: string;
  heliId: string;
  groupId: string;
};

export function flagAssignedGuideCerts(
  helicopters: Helicopter[],
  certs: GuideCert[]
): AssignedGuideCertFlag[] {
  const assignedToday = new Map<string, { tailNumber: string; heliId: string; groupId: string }>();
  for (const heli of helicopters) {
    for (const group of heli.groups) {
      // First assignment found wins if a guide name somehow appears twice —
      // not expected with this sample roster, but avoids silently
      // overwriting with a later one without reason.
      if (!assignedToday.has(group.guideName)) {
        assignedToday.set(group.guideName, { tailNumber: heli.tailNumber, heliId: heli.id, groupId: group.id });
      }
    }
  }

  const flags: AssignedGuideCertFlag[] = [];
  for (const cert of certs) {
    const assignment = assignedToday.get(cert.guideName);
    if (!assignment) continue; // this guide isn't assigned to a helicopter group today
    const tone = certTone(cert.expiresSampleDayOffset);
    if (tone === "ok") continue; // only surface real problems here
    flags.push({
      guideName: cert.guideName,
      cert,
      tone,
      daysUntilExpiry: cert.expiresSampleDayOffset,
      tailNumber: assignment.tailNumber,
      heliId: assignment.heliId,
      groupId: assignment.groupId,
    });
  }
  // Alerts (expired) before warns (expiring soon).
  return flags.sort((a, b) => (a.tone === b.tone ? 0 : a.tone === "alert" ? -1 : 1));
}

// ---------------------------------------------------------------------------
// MODULE 5 — LIVE-DATA & REALISM
//
// FICTIONAL SAMPLE DATA ONLY, except where explicitly marked REAL below. This
// module intentionally mixes two very different honesty tiers, and the two
// must never be confused:
//   - Item 21 (live weather) and Item 22 (sunrise/sunset) are REAL — a real
//     public NWS API call and a real astronomical calculation, computed for
//     an ACTUAL Alaska coordinate (Thompson Pass, a real mountain pass near
//     Valdez). This is a generic, representative South-Central Alaska
//     alpine coordinate — it is NOT presented as, and must never be read as,
//     any specific real operator's actual base of operations.
//   - Item 25 (avalanche danger widget) is 100% FICTIONAL / ILLUSTRATIVE
//     SAMPLE DATA per zone. It is styled after the real public avalanche.org
//     5-level North American Public Avalanche Danger Scale (colors verified
//     against the National Avalanche Center's own published color reference,
//     2026-07-03: Low #50B848, Moderate #FFF200, Considerable #F7941E, High
//     #ED1C24, Extreme #231F20), but it is NOT wired to any real avalanche
//     center API or real current advisory. It must never be mistaken for a
//     real current avalanche forecast — see the explicit disclaimer rendered
//     alongside it in LiveDataRealism.tsx.
// ---------------------------------------------------------------------------

// A real, specific South-Central Alaska alpine coordinate — Thompson Pass,
// near Valdez, AK (61.1286°N, 145.7297°W; verified via public sources
// 2026-07-03). Used for the REAL weather (item 21) and REAL sunrise/sunset
// (item 22) panels below. Framed generically as "a representative
// South-Central Alaska heli-ski coordinate" — not tied to, or implying, any
// specific real operator's actual base.
export const REALISM_COORD_LABEL = "Thompson Pass, AK (representative South-Central Alaska heli-ski coordinate)";
export const REALISM_LAT = 61.1286;
export const REALISM_LON = -145.7297;
// Nearest NWS gridpoint office/point for this coordinate — resolved via the
// NWS `/points/{lat},{lon}` endpoint at runtime (see LiveDataRealism.tsx);
// no ICAO station id is hardcoded here since the panel resolves the current
// forecast office and gridpoint live.

// ---------------------------------------------------------------------------
// AVALANCHE DANGER WIDGET (item 25) — SIMULATED / ILLUSTRATIVE SAMPLE DATA
// ONLY. Tied to the SAME 6 zone keys already defined in _platform.tsx's
// ZONES (Base Pad, Powder Bowl, North Couloir, Glacier Shelf, Tree Run 6,
// Sundance Ridge) so selecting a zone shows a rating for that real zone —
// but the rating itself is invented sample data, not a real current
// avalanche advisory. NEVER wired to any real avalanche.org API/data.
// ---------------------------------------------------------------------------
export type AvalancheDangerLevel = 1 | 2 | 3 | 4 | 5;

export const AVALANCHE_LEVEL_LABEL: Record<AvalancheDangerLevel, string> = {
  1: "Low",
  2: "Moderate",
  3: "Considerable",
  4: "High",
  5: "Extreme",
};

// Verified against the National Avalanche Center's own published Danger
// Scale color reference (avalanche.org / NationalAvalancheCenter GitHub,
// checked 2026-07-03): Low #50B848, Moderate #FFF200, Considerable #F7941E,
// High #ED1C24, Extreme #231F20.
export const AVALANCHE_LEVEL_COLOR: Record<AvalancheDangerLevel, string> = {
  1: "#50B848",
  2: "#FFF200",
  3: "#F7941E",
  4: "#ED1C24",
  5: "#231F20",
};

// Text color to render ON TOP of each level's background swatch — the
// official scale's yellow (Moderate) and green (Low) need dark ink for
// legible contrast; the darker levels need light ink.
export const AVALANCHE_LEVEL_TEXT_ON_COLOR: Record<AvalancheDangerLevel, string> = {
  1: "#0d2b0c",
  2: "#2b2600",
  3: "#2b1600",
  4: "#ffffff",
  5: "#ffffff",
};

export type ZoneAvalancheRating = {
  zone: ZoneKeyForAvalanche;
  level: AvalancheDangerLevel;
  problemLabel: string; // e.g. "Wind slab", "Persistent slab" — illustrative
  aspectElevNote: string; // illustrative aspect/elevation note
};

// Re-declared narrowly here (rather than importing ZoneKey from _platform.tsx)
// to keep _data.tsx free of a dependency on the "use client" platform module;
// the literal keys below are kept in exact lockstep with _platform.tsx's
// ZONES list — LiveDataRealism.tsx cross-checks this at render time by
// mapping over the real ZONES array, not a separately hardcoded zone list.
export type ZoneKeyForAvalanche = "base-pad" | "powder-bowl" | "north-couloir" | "glacier-shelf" | "tree-run-6" | "sundance-ridge";

// Illustrative sample rating per zone — deliberately varied across the full
// 1-5 scale so the widget's color-coding has real visual range to
// demonstrate, not a single flat rating repeated six times.
export function seedZoneAvalancheRatings(): ZoneAvalancheRating[] {
  return [
    { zone: "base-pad", level: 1, problemLabel: "Generally stable", aspectElevNote: "Low-angle approach terrain, sample rating" },
    { zone: "powder-bowl", level: 2, problemLabel: "Wind slab", aspectElevNote: "N/NE aspects, sample rating" },
    { zone: "north-couloir", level: 3, problemLabel: "Persistent slab", aspectElevNote: "All aspects near ridgeline, sample rating" },
    { zone: "glacier-shelf", level: 2, problemLabel: "Wet loose", aspectElevNote: "S-facing sun-exposed slopes, sample rating" },
    { zone: "tree-run-6", level: 1, problemLabel: "Generally stable", aspectElevNote: "Sheltered tree terrain, sample rating" },
    { zone: "sundance-ridge", level: 4, problemLabel: "Storm slab / cornice fall", aspectElevNote: "Lee-loaded aspects, ridge cornices, sample rating" },
  ];
}

// ---------------------------------------------------------------------------
// DAYS-SINCE-LAST-INCIDENT COUNTER (item 23) — REAL computed value, derived
// from Module 4's REAL incident/near-miss log (_platform.tsx's `incidents`
// array, appended to by SafetyCompliance.tsx's actual form submissions).
// Genuinely recomputes from `loggedAt` (a real Date.now() timestamp captured
// at submission time) — NOT a hardcoded number. If the log is empty, falls
// back to a real seeded "day zero" baseline timestamp (also a genuine
// Date.now()-derived value, fixed once per module load) rather than
// fabricating a plausible-looking streak.
// ---------------------------------------------------------------------------

// A real safety-culture baseline: this demo session's "day zero" is treated
// as 47 days before the module first loads. This is itself a real computed
// timestamp (Date.now() minus a fixed real offset), not a hardcoded date
// string — it exists only so the counter has a sensible starting point when
// zero incidents have been logged yet this session.
export const INCIDENT_FREE_BASELINE_DAYS = 47;

export function daysSinceLastIncident(
  incidents: { loggedAt: number }[],
  nowMs: number = Date.now()
): { days: number; sinceLabel: string } {
  if (incidents.length === 0) {
    const baselineMs = nowMs - INCIDENT_FREE_BASELINE_DAYS * 24 * 60 * 60 * 1000;
    const days = Math.floor((nowMs - baselineMs) / (24 * 60 * 60 * 1000));
    return { days, sinceLabel: "sample baseline — no incidents logged this session" };
  }
  const mostRecentMs = Math.max(...incidents.map((i) => i.loggedAt));
  const days = Math.floor((nowMs - mostRecentMs) / (24 * 60 * 60 * 1000));
  return { days, sinceLabel: "most recent logged incident/near-miss, this session" };
}
