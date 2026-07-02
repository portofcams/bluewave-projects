// Hawai'i International Film Festival (HIFF) 2026 — grounded event data for
// the BlueWave Projects sample pitch.
//
// SOURCE OF TRUTH: https://hiff.org/ (verified live 2026-07-02).
// The site's own homepage banner confirms: "HIFF46 FALL FESTIVAL DATES
// ANNOUNCED | OCT 22 - NOV 1 at Kahala w/ Kick Off on Oct 21" — independently
// re-confirmed via a second fetch of hiff.org this session. A third-party
// aggregator (hawaii-guide.com) shows a conflicting "October 15-25, 2026"
// date; that is treated as stale/unreliable and NOT used anywhere on this
// page — the two hiff.org-sourced dates above are the ones we build on.
//
// HOOK — WHY THIS ISN'T A "SCATTERED TICKETING VENDORS" STORY (unlike AIFF):
// Direct verification this session (curl of hiff.org event pages, the HIFF45
// program archive, opiofest2026.hiff.org, and the HIFF calendar) shows HIFF
// checkout is genuinely SINGLE-VENDOR: every screening — main festival,
// 'Ōpio Fest, HIFF Selects year-round screenings — runs on an Elevent widget
// embedded directly on hiff.org pages (wp-content/plugins/Elevent-WordPress-
// Plug-in), backed by goelevent.com / readyset.goelevent.com. There is no
// second FilmBOT-style vendor. Forcing a vendor-scatter hook here would be
// dishonest, so this build uses HIFF's REAL complexity instead: one festival,
// stretched across SIX WEEKS and up to FIVE neighbor islands (Kaua'i, Maui,
// Moloka'i, Lāna'i, Hawai'i Island) plus the multi-day Honolulu run and a
// standalone industry conference — a genuine "which day, which island, which
// pass" planning problem for both attendees and the festival's own staff.
//
// 2026 PROGRAM STATUS: as of this build, HIFF46's film lineup, neighbor-
// island dates, and pass pricing have NOT been published — only the festival
// window (Oct 22–Nov 1, Kickoff Oct 21) and presenting-sponsor info are live.
// Per the brief's discipline (same as Iditarod/Rondy/Fair/AIFF): we do NOT
// invent a 2026 lineup or prices. The HIFF45 (2025) program below is real,
// independently verified public data, clearly labeled as past-festival
// reference — never presented as 2026 fact.

export type HiffCategory =
  | "feature"
  | "shorts"
  | "opio"
  | "industry"
  | "neighbor-island"
  | "special";

export type HiffTicketing =
  | "paid" // buy a ticket/pass to attend
  | "free" // free to attend, no ticket
  | "unpublished"; // 2026 ticketing not yet live

export type HiffDeepContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  body: string[];
  faq: { q: string; a: string }[];
  /** Longer ticket reality used on the detail page */
  ticketInfo: string;
  /** Status of pricing/program certainty */
  priceStatus: string;
};

export type HiffScreening = {
  slug: string;
  /** Full name for JSON-LD + detail hero */
  name: string;
  /** Card + schedule label */
  shortName: string;
  /** Human-readable date string — 2025 program, clearly labeled as past-festival reference, or 2026 confirmed window */
  date: string;
  /** Sort key: day offset from festival start; used only for reference schedule ordering */
  sortKey: number;
  /** ISO 8601 for schema.org */
  isoStart: string;
  venue: string;
  city: string;
  region: string;
  island: "Oʻahu" | "Kauaʻi" | "Maui" | "Molokaʻi" | "Lānaʻi" | "Hawaiʻi Island";
  category: HiffCategory;
  ticketed: HiffTicketing;
  /** Official HIFF site or vendor page */
  sourceUrl: string;
  /** One-line teaser for cards + schedule rows */
  teaser: string;
  accent: "sunset-gold" | "orchid" | "ocean-teal" | "dusk-violet" | "sand";
  /** Full landing-page content — only the featured items carry this */
  deep?: HiffDeepContent;
};

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/hawaii-international-film-festival-2026";
export const HIFF_URL = "https://hiff.org";

// ---------------------------------------------------------------------------
// 2026 FESTIVAL FACTS — confirmed directly on hiff.org, not [confirm]-flagged.
// ---------------------------------------------------------------------------
export const FESTIVAL_2026 = {
  edition: "46th annual (HIFF46)",
  dates: "October 22 – November 1, 2026",
  kickoff: "Kickoff event October 21, 2026",
  isoStart: "2026-10-22",
  isoEnd: "2026-11-01",
  city: "Honolulu",
  region: "HI",
  venue: "Consolidated Theatres Kahala",
  tagline: "A Vanguard Forum of International Cinematic Achievement",
  mission:
    "An Academy Award®-qualifying festival celebrating dynamic cinema from Asia and the Pacific while championing Native Hawaiian and Indigenous filmmakers.",
  presentingSponsor: "Halekulani",
  // NOTE: hiff.org/hiff-sponsors/ is literally titled "HIFF 2026 Sponsors"
  // and lists Halekulani under a "PRESENTING" tier — verified live this
  // session. Halekulani has held the presenting-sponsor role since 2011
  // (Louis Vuitton held it 2002–2008 before that). Framed here as the
  // long-time presenting sponsor, confirmed current for 2026 by the page's
  // own title and tier listing.
} as const;

// ---------------------------------------------------------------------------
// THE 2025 PROGRAM (HIFF45) — real, verified, but explicitly PAST-FESTIVAL
// reference content (per the brief: never presented as 2026 fact). Sourced
// from hiff.org's own HIFF45 archive, HIFF45 passes page, and Hawaii News
// Now's HIFF45 coverage — verified 2026-07-02.
// ---------------------------------------------------------------------------

export const screenings: HiffScreening[] = [
  // ------------------------------------------------------------------ deep 1
  {
    slug: "opening-night-rental-family",
    name: "HIFF45 Opening Night — Rental Family",
    shortName: "Opening Night: Rental Family",
    date: "Wednesday, October 15, 2025 [2025 program — reference only]",
    sortKey: 0,
    isoStart: "2025-10-15T19:00:00-10:00",
    venue: "Consolidated Theatres Kahala",
    city: "Honolulu",
    region: "HI",
    island: "Oʻahu",
    category: "feature",
    ticketed: "paid",
    sourceUrl: "https://hiff.org/hiff45/",
    teaser:
      "The festival's curtain-raiser — Hawaiʻi premiere of Hikari's \"Rental Family,\" starring Academy Award winner Brendan Fraser, opening HIFF45's eleven-day Honolulu run at Consolidated Theatres Kahala.",
    accent: "sunset-gold",
    deep: {
      metaTitle:
        "HIFF Opening Night 2026 — Consolidated Theatres Kahala, What to Expect",
      metaDescription:
        "How HIFF's opening night works — a red-carpet premiere at Consolidated Theatres Kahala kicking off the festival's Honolulu run. What the verified 2025 opening (Rental Family, starring Brendan Fraser) looked like, and what's confirmed so far for HIFF46, October 22–November 1, 2026.",
      keywords: [
        "HIFF 2026 opening night",
        "Hawaii International Film Festival Kahala",
        "HIFF46 tickets",
        "Consolidated Theatres Kahala film festival",
        "HIFF opening night Honolulu",
      ],
      h1: "Opening Night, Consolidated Theatres Kahala",
      intro:
        "HIFF's opening night anchors the festival's Honolulu run at Consolidated Theatres Kahala — the same venue confirmed for HIFF46's October 22–November 1, 2026 dates, with a kickoff event October 21. In the most recent (2025) program, opening night was a Hawaiʻi premiere: Hikari's \"Rental Family,\" starring Brendan Fraser, on Wednesday, October 15.",
      body: [
        "HIFF is the only statewide film festival in the United States, and Consolidated Theatres Kahala is its anchor venue — the address confirmed directly on hiff.org for HIFF46. In 2025, the Honolulu run stretched eleven days (October 15–26) before the festival moved to West Oʻahu and neighbor-island dates (October 28–30 and beyond), all built around Consolidated Theatres Kahala and Consolidated Theatres Ward with TITAN LUXE as the two Oʻahu venues.",
        "Opening night in 2025 carried real weight: a Hawaiʻi-premiere feature with a recognizable award-winning lead, the kind of curtain-raiser a 46-year-old festival uses to set the tone for the eleven days that follow. HIFF46's specific opening film for 2026 had not been announced as of this build — hiff.org confirms the festival window (October 22–November 1, kickoff October 21) but the day-by-day 2026 program was not yet published.",
        "One practical note carried over from the verified 2025 program: HIFF sells advance tickets to members at a discount (\"HIFF Members receive $3 off all advance tickets\" is the exact language on hiff.org's own ticketing guidance), and ticket sales for members/pass holders opened several days ahead of general public sales in 2025 (Sept 19 vs. Sept 22). Whether that same member-first window applies to 2026 hasn't been confirmed yet.",
      ],
      faq: [
        {
          q: "Is Rental Family the 2026 opening film?",
          a: "No — that was the confirmed 2025 opening-night film. HIFF has not yet announced its HIFF46 opening film as of this writing. This page uses the verified 2025 opening-night details as a reference for how the slot traditionally works.",
        },
        {
          q: "Where is HIFF46's opening night?",
          a: "Consolidated Theatres Kahala — confirmed directly on hiff.org for the HIFF46 festival window, October 22–November 1, 2026, with a kickoff event October 21.",
        },
        {
          q: "Do HIFF members get a ticket advantage?",
          a: "In the verified 2025 program, yes: hiff.org's own guidance states members get $3 off advance tickets, and member/pass-holder sales opened several days before general public sales. Whether the same structure applies in 2026 hasn't been confirmed yet.",
        },
        {
          q: "When does HIFF46 run?",
          a: "October 22–November 1, 2026, in Honolulu, with a kickoff event October 21 — confirmed directly on hiff.org. The full day-by-day program, including the opening film, was not yet announced as of this build.",
        },
      ],
      ticketInfo:
        "HIFF46 tickets and passes go on sale through hiff.org's own embedded Elevent checkout (the same system used for every HIFF screening, member and public alike) — no separate opening-night vendor. Exact 2026 on-sale dates were not yet published as of this build.",
      priceStatus:
        "HIFF46 opening-night film, time, and pricing not yet published. The verified 2025 opening night was a Wednesday, October 15 premiere at Consolidated Theatres Kahala.",
    },
  },

  // ------------------------------------------------------------------ deep 2
  {
    slug: "neighbor-island-tour",
    name: "HIFF Neighbor Island Screenings — Kauaʻi, Maui, Molokaʻi, Hawaiʻi Island",
    shortName: "Neighbor Island Tour",
    date: "Oct 28 – Nov 16, 2025 (varies by island) [2025 program — reference only]",
    sortKey: 12,
    isoStart: "2025-10-28T18:00:00-10:00",
    venue: "Venues vary by island",
    city: "Statewide",
    region: "HI",
    island: "Kauaʻi",
    category: "neighbor-island",
    ticketed: "paid",
    sourceUrl: "https://hiff.org/hiff45/",
    teaser:
      "HIFF's most-overlooked logistics problem: after Honolulu wraps, the same program tours neighbor islands over several more weeks — different islands, different dates, different venues, all on hiff.org's one Elevent checkout.",
    accent: "ocean-teal",
    deep: {
      metaTitle:
        "HIFF 2026 Neighbor Island Screenings — Kauaʻi, Maui, Molokaʻi & Hawaiʻi Island Dates",
      metaDescription:
        "HIFF is the only statewide film festival in the US — after the Honolulu run wraps, the program tours neighbor islands for weeks afterward. What the verified 2025 neighbor-island tour looked like (dates, venues, format), and what to expect for HIFF46 in 2026.",
      keywords: [
        "HIFF neighbor island screenings",
        "Hawaii International Film Festival Kauai Maui",
        "HIFF statewide film festival",
        "HIFF46 neighbor island dates",
        "Hawaii film festival Molokai Lanai",
      ],
      h1: "Neighbor Island Screenings — the Statewide Tail",
      intro:
        "HIFF bills itself as the only statewide film festival in the United States, and the neighbor-island leg is where that claim gets tested logistically. In the verified 2025 program, the Honolulu run (Oct 15–26) was followed by a separate West Oʻahu window (Oct 28–30) and then neighbor-island dates on Kauaʻi, Maui, Molokaʻi, and Hawaiʻi Island (Waimea and Hilo) — HIFF's own program page lists that full slate, though exact per-island dates for 2025 weren't itemized on every page we could verify directly.",
      body: [
        "The practical shape of this, confirmed from hiff.org's HIFF45 archive: \"Come out to watch many of HIFF45's best international and Made In Hawaiʻi features and short films on Kauaʻi, Maui, Hawaiʻi Island (Waimea & Hilo) and Molokaʻi\" — a genuine multi-week, multi-island tail after the main Honolulu festival closes. One neighbor-island date we could verify precisely: a Kauaʻi Community College showcase, Nov 1–2, 2025, with a single ticket covering all KCC screenings that weekend.",
        "This is where HIFF's actual complexity lives — not a scattered-vendor problem (every island's tickets run through the same hiff.org/Elevent checkout we verified this session), but a scattered-CALENDAR problem: a Maui resident, a Hilo resident, and an Oʻahu resident are each working from a genuinely different subset of the same festival, spread across roughly six weeks total (mid-October through mid-November in the 2025 pattern), and the festival's own site doesn't put all of those dates on one page.",
        "For HIFF46, hiff.org has confirmed the Honolulu window (October 22–November 1, 2026, kickoff October 21) but had not yet published neighbor-island dates or venues as of this build. Based on the 2025 pattern, expect neighbor-island screenings to extend into November — a reasonable inference from last year's structure, not a confirmed 2026 date.",
      ],
      faq: [
        {
          q: "Does HIFF actually screen on every island?",
          a: "The verified 2025 program named four neighbor islands explicitly — Kauaʻi, Maui, Molokaʻi, and Hawaiʻi Island (Waimea and Hilo) — plus a separate West Oʻahu window. Lānaʻi is referenced in some HIFF materials as part of the statewide footprint historically; we did not independently verify a 2025 Lānaʻi screening date and flag that as unconfirmed rather than asserting it.",
        },
        {
          q: "Do neighbor-island tickets use a different system than Honolulu?",
          a: "No — based on direct verification this session (checking hiff.org event pages, the calendar, and the 'Ōpio Fest subdomain), every HIFF ticket, regardless of island, runs through the same embedded Elevent checkout on hiff.org. The complexity here is calendar/logistics, not vendor fragmentation.",
        },
        {
          q: "When do HIFF46 neighbor-island dates get announced?",
          a: "Not yet, as of this build. hiff.org confirms only the Honolulu festival window (Oct 22–Nov 1, 2026) so far. In 2025, neighbor-island dates followed the Honolulu run by about two weeks and extended for several more weeks after that.",
        },
        {
          q: "Is there one pass that covers every island?",
          a: "Not confirmed either way for 2026. The verified 2025 example we found (a Kauaʻi Community College showcase) sold a single ticket covering just that weekend's KCC screenings — a local, venue-specific ticket rather than a statewide all-island pass.",
        },
      ],
      ticketInfo:
        "All neighbor-island tickets, like every other HIFF screening, run through hiff.org's embedded Elevent checkout — confirmed by direct inspection this session. No separate neighbor-island vendor or portal exists. Exact 2026 island dates and venues were not yet published as of this build.",
      priceStatus:
        "HIFF46 neighbor-island dates, venues, and pricing not yet published [confirm]. The verified 2025 pattern ran neighbor-island screenings from late October through at least mid-November.",
    },
  },

  // ------------------------------------------------------------------ deep 3
  {
    slug: "passes-and-pricing-explainer",
    name: "HIFF Passes & Pricing — What the 2025 Tiers Actually Cost",
    shortName: "Passes & Pricing Explainer",
    date: "Oct 22 – Nov 1, 2026 · 2026 pricing not yet live [confirm]",
    sortKey: -1,
    isoStart: "2026-10-22",
    venue: "hiff.org (Elevent checkout)",
    city: "Honolulu",
    region: "HI",
    island: "Oʻahu",
    category: "special",
    ticketed: "unpublished",
    sourceUrl: "https://hiff.org/hiff45-passes/",
    teaser:
      "HIFF's real pass ladder, from the verified 2025 pricing page: Matinée and Weekend Passes at $200, All-Access at $500, Platinum at $1,000 — a genuine tiering problem for a first-time attendee, all sold on one checkout.",
    accent: "orchid",
    deep: {
      metaTitle:
        "HIFF 2026 Passes & Pricing — What Matinée, Weekend, All-Access & Platinum Actually Get You",
      metaDescription:
        "HIFF sells at least six different pass tiers — from a $50 weekend pass at one venue to a $1,000 Platinum Pass with early theater access. What the verified 2025 pricing looked like, and what's still unpublished for HIFF46, October 22–November 1, 2026.",
      keywords: [
        "HIFF pass prices",
        "Hawaii International Film Festival Platinum Pass",
        "HIFF46 tickets 2026",
        "HIFF weekend pass matinee pass",
        "Hawaii film festival pass tiers",
      ],
      h1: "Passes & Pricing — the 2025 Ladder",
      intro:
        "HIFF doesn't sell one kind of ticket — the verified 2025 program (hiff.org/hiff45-passes/) listed at least eight distinct products: a KCCPAC Weekend Pass ($50 general / $25 members), a Matinée Pass ($200), a Weekend Pass ($200), an All-Access Pass ($500), a Platinum Pass ($1,000), an EDU Pass ($70), a 6-Pack ($90 general / $80 members), and a 12-Pack ($160 general / $150 members).",
      body: [
        "That's a real ladder, and it's not obvious from the outside which tier a given attendee actually needs — a first-timer wanting \"a few films over one weekend\" and a film-industry regular wanting \"early access to every panel and screening\" are shopping completely different products that happen to share a checkout page. Platinum, per HIFF's own site, adds early ticket selection, early theater access via a dedicated Pass Holder line, RSVP for reserved seating, and an invitation to an opening reception — meaningfully more than just \"more movies.\"",
        "Sales timing matters too: in 2025, members and pass holders got a head start — Friday, September 19 — while general ticket sales opened three days later, Monday, September 22. A pass, in other words, wasn't just about price; it was about getting first pick of seats and showtimes before the general public could buy anything at all.",
        "As of this build, hiff.org confirms the HIFF46 festival window (October 22–November 1, 2026, kickoff October 21) and the presenting sponsor (Halekulani), but had not published 2026 pass tiers, prices, or on-sale dates. The 2025 numbers above are shown as verified historical reference, not a 2026 price claim.",
      ],
      faq: [
        {
          q: "What's the difference between a Weekend Pass and an All-Access Pass?",
          a: "Based on the verified 2025 pricing page: Weekend Pass was $200 and (as the name suggests) scoped to a portion of the festival; All-Access was $500, covering the full run. Platinum, at $1,000, added early ticket selection, a dedicated Pass Holder theater-access line, reserved-seating RSVP, and an opening-reception invite — the top tier, not just a bigger version of All-Access.",
        },
        {
          q: "Is there a discount for HIFF members?",
          a: "Yes, on at least some tiers in 2025 — the KCCPAC Weekend Pass was $50 general / $25 members, and multi-packs (6-Pack, 12-Pack) also carried a member discount. Whether the same member pricing structure applies in 2026 hasn't been confirmed.",
        },
        {
          q: "Are 2026 pass prices out yet?",
          a: "Not as of this build. hiff.org confirms the HIFF46 dates and presenting sponsor but has not published 2026 pass tiers or pricing [confirm].",
        },
        {
          q: "Do passes cover neighbor-island screenings?",
          a: "Not confirmed either way. The pass tiers documented on the 2025 pricing page were tied to the Honolulu run; we found no explicit statement that any pass also covers the separate neighbor-island tour weeks later.",
        },
      ],
      ticketInfo:
        "All passes, regardless of tier, sell through hiff.org's own embedded Elevent checkout — verified directly this session. No separate portal per tier. 2026 tier names, prices, and on-sale dates were not yet published as of this build.",
      priceStatus:
        "2026 pass pricing not yet published [confirm]. Verified 2025 pricing ranged from $50 (KCCPAC Weekend Pass, general) to $1,000 (Platinum Pass).",
    },
  },

  // ------------------------------------------------------------------ deep 4
  {
    slug: "hifilm-industry-conference",
    name: "HIFILM Industry Conference",
    shortName: "HIFILM Industry Conference",
    date: "2025 edition held during HIFF45 [2025 — reference only]",
    sortKey: 5,
    isoStart: "2025-10-20T09:00:00-10:00",
    venue: "Consolidated Theatres Kahala area",
    city: "Honolulu",
    region: "HI",
    island: "Oʻahu",
    category: "industry",
    ticketed: "unpublished",
    sourceUrl: "https://hiff.org/hifilm-conference/",
    teaser:
      "A parallel track most attendees never notice: HIFILM, HIFF's year-round industry initiative launched 2023, runs its own conference alongside the festival — separate registration, separate audience, same week.",
    accent: "dusk-violet",
    deep: {
      metaTitle:
        "HIFILM Industry Conference 2026 — HIFF's Parallel Track for Filmmakers",
      metaDescription:
        "HIFILM is HIFF's year-round industry-development initiative, launched in 2023 — its conference runs alongside the main festival but is a genuinely separate program (Producers Lab, Storytellers Lab, industry panels). What the 2025 edition looked like, and what to expect during HIFF46, October 22–November 1, 2026.",
      keywords: [
        "HIFILM conference 2026",
        "HIFF industry conference",
        "Hawaii International Film Festival filmmakers",
        "HIFF46 producers lab",
        "HIFILM storytellers lab",
      ],
      h1: "HIFILM Industry Conference — the Parallel Track",
      intro:
        "Most HIFF coverage focuses on the public screening schedule, but the festival also runs HIFILM — a year-round professional-development initiative for Asia-Pacific filmmakers, launched in 2023, with its own conference, Producers Lab, and Storytellers Lab that happen alongside (not instead of) the regular festival week.",
      body: [
        "HIFF's own site frames HIFILM as a distinct program with its own hub, staffed by a dedicated HIFILM Industry Manager (per HIFF's staff listing) — a different audience and a different registration path from a general moviegoer buying a Weekend Pass. In 2025, HIFF ran both a HIFILM Conference and a separate 2025 Storytellers Lab, both linked from hiff.org's main industry hub.",
        "For someone building a single planning page for HIFF, this is the kind of thing that's easy to miss: a filmmaker checking \"what's happening at HIFF this week\" needs to see both the public film schedule AND the industry track, because they run concurrently but are organized, promoted, and (based on the site structure) likely ticketed completely separately.",
        "As of this build, hiff.org confirms HIFF46's public festival window (October 22–November 1, 2026) but the 2026 HIFILM Conference dates, format, and registration had not been published yet — the industry hub still points to 2025 program pages as the most recent content.",
      ],
      faq: [
        {
          q: "Is HIFILM the same thing as the film festival?",
          a: "No — HIFILM is a separate, year-round industry-development initiative (launched 2023) with its own conference and labs. It runs alongside the main festival week but is organized as its own program, with its own staff lead and hub page on hiff.org.",
        },
        {
          q: "Who is HIFILM for?",
          a: "Filmmakers and industry professionals, based on hiff.org's framing — Producers Lab and Storytellers Lab are development programs, not public screenings. A general festival attendee buying a Weekend Pass is a different audience than someone registering for HIFILM.",
        },
        {
          q: "When is the 2026 HIFILM Conference?",
          a: "Not yet announced as of this build. hiff.org's industry hub still displays 2025 program content (2025 HIFILM Conference, 2025 Storytellers Lab); no 2026 HIFILM dates had been published.",
        },
      ],
      ticketInfo:
        "HIFILM registration is managed separately from general festival passes, via hiff.org's industry hub — exact 2026 registration details were not yet published as of this build.",
      priceStatus:
        "2026 HIFILM Conference dates, format, and pricing not yet published [confirm].",
    },
  },

  // ----------------------------------------------------- the rest of the 2025 reference slate
  {
    slug: "opio-fest-2026",
    name: "ʻŌpio Fest 2026 — Student Showcase",
    shortName: "ʻŌpio Fest (Student Showcase)",
    date: "April 17–19, 2026 — confirmed dates, separate from the fall festival",
    sortKey: -5,
    isoStart: "2026-04-17",
    venue: "Consolidated Theatres Kahala",
    city: "Honolulu",
    region: "HI",
    island: "Oʻahu",
    category: "opio",
    ticketed: "paid",
    sourceUrl: "https://hiff.org/opio-fest-passes/",
    teaser:
      "HIFF's youth-filmmaker showcase — a confirmed spring 2026 event, entirely separate from the fall HIFF46 festival, with its own all-access pass ($350 general / $300 members).",
    accent: "sand",
  },
  {
    slug: "anchorage-museum-style-west-oahu",
    name: "HIFF45 West Oʻahu Screenings",
    shortName: "West Oʻahu Screenings",
    date: "October 28–30, 2025 [2025 — reference only]",
    sortKey: 11,
    isoStart: "2025-10-28T18:00:00-10:00",
    venue: "West Oʻahu venue (per HIFF45 program)",
    city: "Kapolei area",
    region: "HI",
    island: "Oʻahu",
    category: "feature",
    ticketed: "paid",
    sourceUrl: "https://hiff.org/hiff45/",
    teaser:
      "A distinct West Oʻahu window, three days after the main Honolulu run ends — its own mini-leg before the festival moves to neighbor islands.",
    accent: "ocean-teal",
  },
  {
    slug: "kauai-community-college-showcase",
    name: "HIFF45 Kauaʻi Community College Showcase",
    shortName: "Kauaʻi Showcase (KCC)",
    date: "Saturday–Sunday, November 1–2, 2025 [2025 — reference only]",
    sortKey: 13,
    isoStart: "2025-11-01T18:00:00-10:00",
    venue: "Kauaʻi Community College Performing Arts Center",
    city: "Puhi",
    region: "HI",
    island: "Kauaʻi",
    category: "neighbor-island",
    ticketed: "paid",
    sourceUrl: "https://hiff.org/hiff45-passes/",
    teaser:
      "One verified neighbor-island date: a single ticket covering all KCC screenings for the weekend — HIFF's most concretely documented Kauaʻi date in the 2025 program.",
    accent: "ocean-teal",
  },
  {
    slug: "opio-short-films-2026",
    name: "2026 ʻŌpio Short Films",
    shortName: "ʻŌpio Short Films",
    date: "Individual tickets from March 16, 2026 [confirmed on hiff.org]",
    sortKey: -6,
    isoStart: "2026-03-16",
    venue: "Consolidated Theatres Kahala",
    city: "Honolulu",
    region: "HI",
    island: "Oʻahu",
    category: "opio",
    ticketed: "paid",
    sourceUrl: "https://hiff.org/2026-opio-short-films/",
    teaser:
      "Student-made short films screening ahead of the full ʻŌpio Fest weekend — individual tickets, separate from the pass.",
    accent: "sand",
  },
];

/** Featured screenings — the four with full landing pages. */
export const deepScreenings = screenings.filter(
  (e): e is HiffScreening & { deep: HiffDeepContent } => Boolean(e.deep)
);

export function getScreening(slug: string) {
  return deepScreenings.find((e) => e.slug === slug);
}

/** Distinct islands represented across the reference schedule. */
export const islandsCovered = Array.from(
  new Set(screenings.map((e) => e.island))
) as HiffScreening["island"][];

/** Human labels for the category filter chips. */
export const categoryLabels: Record<HiffCategory, string> = {
  feature: "Features",
  shorts: "Shorts blocks",
  opio: "ʻŌpio Fest (youth)",
  industry: "HIFILM industry",
  "neighbor-island": "Neighbor island",
  special: "Passes & pricing",
};
