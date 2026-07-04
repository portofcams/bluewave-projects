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
