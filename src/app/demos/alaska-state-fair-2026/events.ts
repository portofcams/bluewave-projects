// Alaska State Fair 2026 — grounded data for the BlueWave Projects sample.
//
// UNLIKE the Iditarod/Rondy samples (next-year, [confirm]-flagged), this one
// targets the REAL published 2026 season: every concert date below was
// extracted from the Event JSON-LD on alaskastatefair.org's own event pages
// (verified 2026-07-01), and hours/closed days come from the official Fair
// Hours page verbatim: "11AM – 10PM everyday, Closed Tues & Weds – 8/25,
// 8/26, 9/1, 9/2."
//
// TICKETING REALITY (verified by following every Buy Tix link 2026-07-01):
// everything runs through ONE vendor — Etix — but exploded into 20+ separate
// checkout SKUs with no planning layer: one-day admission, 6-pack, MePlusThree
// 4-pack, youth/senior season passes, premier vs reserved parking, rodeo ×2,
// monster trucks ×3 — and EVERY concert exists as TWO SKUs ("[artist]" and
// "[artist] with fair admission") because buyers kept discovering at the gate
// that a concert ticket alone doesn't get you into the fair. The bundle SKU
// is the confusion, institutionalized. Carnival rides are Golden Wheel's own
// site; the campground is a separate setyoursites.com portal.
//
// Per the brief: do NOT invent prices, attendance figures, or unpublished
// times. Anything not published is marked "[confirm]".

export type FairCategory =
  | "concert"
  | "grandstand"
  | "signature"
  | "daily";

export type FairDeepContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  body: string[];
  faq: { q: string; a: string }[];
  ticketInfo: string;
  priceStatus: string;
};

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/alaska-state-fair-2026";
export const FAIR_URL = "https://www.alaskastatefair.org/site";

// ---------------------------------------------------------------------------
// THE 2026 CONCERT SERIES — Borealis Theatre. Dates from the fair's own
// Event JSON-LD. `bundleNote` = the two-SKU reality per show.
// ---------------------------------------------------------------------------

export type FairConcert = {
  slug: string; // the fair's own event slug
  name: string;
  /** ISO date (AKDT) from the fair's JSON-LD */
  date: string; // YYYY-MM-DD
  startTime: string; // "7:00 PM" | "6:00 PM"
  genreLine: string;
};

export const concerts: FairConcert[] = [
  { slug: "ajr", name: "AJR", date: "2026-08-21", startTime: "7:00 PM", genreLine: "Chart-topping pop trio — opening night" },
  { slug: "megadeth-2", name: "Megadeth", date: "2026-08-22", startTime: "7:00 PM", genreLine: "Thrash-metal royalty" },
  { slug: "ziggy-marley", name: "Ziggy Marley", date: "2026-08-23", startTime: "6:00 PM", genreLine: "Eight-time Grammy reggae legacy" },
  { slug: "amy-grant", name: "Amy Grant", date: "2026-08-24", startTime: "7:00 PM", genreLine: "Six-time Grammy pop & gospel icon" },
  { slug: "cake", name: "CAKE", date: "2026-08-27", startTime: "7:00 PM", genreLine: "Sacramento alt-rock originals" },
  { slug: "modest-mouse", name: "Modest Mouse", date: "2026-08-28", startTime: "7:00 PM", genreLine: "Indie-rock mainstays" },
  { slug: "nate-smith", name: "Nate Smith", date: "2026-08-29", startTime: "7:00 PM", genreLine: "Platinum country hitmaker" },
  { slug: "bigxthaplug", name: "BigXthaPlug", date: "2026-08-30", startTime: "7:00 PM", genreLine: "Texas hip-hop heavyweight" },
  { slug: "the-beach-boys", name: "The Beach Boys", date: "2026-08-31", startTime: "7:00 PM", genreLine: "Six decades of American harmony" },
  { slug: "max-mcnown", name: "Max McNown", date: "2026-09-03", startTime: "7:00 PM", genreLine: "Breakout folk-country songwriter" },
  { slug: "twisted-sister", name: "Twisted Sister ft. Sebastian Bach", date: "2026-09-04", startTime: "7:00 PM", genreLine: "80s arena-metal reunion" },
  { slug: "deadmau5", name: "deadmau5", date: "2026-09-05", startTime: "7:00 PM", genreLine: "Electronic music headliner" },
  { slug: "nick-offerman", name: "Nick Offerman", date: "2026-09-06", startTime: "6:00 PM", genreLine: "Comedy, woodcraft & Americana" },
  { slug: "lyle-lovett", name: "Lyle Lovett", date: "2026-09-07", startTime: "6:00 PM", genreLine: "Texas troubadour — closing night" },
];

// ---------------------------------------------------------------------------
// SIGNATURE NON-CONCERT MOMENTS with published dates (fair JSON-LD).
// ---------------------------------------------------------------------------

export type FairMoment = {
  name: string;
  date: string; // YYYY-MM-DD
  time?: string;
  note: string;
};

export const moments: FairMoment[] = [
  {
    name: "20th Annual Alaska Midnight Sun Great Pumpkin Weigh-Off",
    date: "2026-08-31",
    time: "2:00 PM",
    note: "Giant pumpkins on the scale — record chasers welcome.",
  },
  {
    name: "30th Annual Giant Cabbage Weigh-Off",
    date: "2026-09-04",
    time: "6:00 PM",
    note: "The fair's most famous tradition — Matanuska Valley giants under the lights.",
  },
];

// Grandstand shows sell on Etix but the fair pages don't publish their dates
// in structured data — honest [confirm] until pulled from Etix.
export const grandstand = [
  {
    name: "Rodeo Alaska Champions Tour",
    note: "Two rodeo dates at the Grandstand [confirm dates on Etix]",
    skus: 2,
  },
  {
    name: "All-Star Monster Trucks",
    note: "Three shows at the Grandstand [confirm dates on Etix]",
    skus: 3,
  },
];

// ---------------------------------------------------------------------------
// THE FAIR CALENDAR — every day of the 2026 run. Closed days verified from
// the official hours page. The planner is built from this single array.
// ---------------------------------------------------------------------------

export type FairDay = {
  date: string; // YYYY-MM-DD
  weekday: string;
  label: string; // "Fri, Aug 21"
  open: boolean;
  /** concert slug playing that night, if any */
  concert?: string;
  /** signature moments that day (indices into moments) */
  momentIdx?: number[];
  /** one-line day character for the planner */
  vibe: string;
};

const DAY_DEFS: Array<[string, string, string, boolean, string | undefined, number[] | undefined, string]> = [
  ["2026-08-21", "Friday", "Fri, Aug 21", true, "ajr", undefined, "Opening day — first rides, first cream puffs, AJR under the lights."],
  ["2026-08-22", "Saturday", "Sat, Aug 22", true, "megadeth-2", undefined, "First Saturday: full exhibit halls by day, Megadeth by night."],
  ["2026-08-23", "Sunday", "Sun, Aug 23", true, "ziggy-marley", undefined, "Family Sunday with a 6 PM Ziggy Marley show — earlier night."],
  ["2026-08-24", "Monday", "Mon, Aug 24", true, "amy-grant", undefined, "Quietest crowds of week one, then Amy Grant."],
  ["2026-08-25", "Tuesday", "Tue, Aug 25", false, undefined, undefined, "Fair closed — plan around it."],
  ["2026-08-26", "Wednesday", "Wed, Aug 26", false, undefined, undefined, "Fair closed — plan around it."],
  ["2026-08-27", "Thursday", "Thu, Aug 27", true, "cake", undefined, "The fair reopens rested — CAKE closes the night."],
  ["2026-08-28", "Friday", "Fri, Aug 28", true, "modest-mouse", undefined, "Second Friday — Modest Mouse."],
  ["2026-08-29", "Saturday", "Sat, Aug 29", true, "nate-smith", undefined, "Peak Saturday energy, Nate Smith at the Borealis."],
  ["2026-08-30", "Sunday", "Sun, Aug 30", true, "bigxthaplug", undefined, "BigXthaPlug brings the bounce to Palmer."],
  ["2026-08-31", "Monday", "Mon, Aug 31", true, "the-beach-boys", [0], "Giant pumpkins at 2 PM, The Beach Boys at 7 — best double-bill of the run."],
  ["2026-09-01", "Tuesday", "Tue, Sep 1", false, undefined, undefined, "Fair closed — plan around it."],
  ["2026-09-02", "Wednesday", "Wed, Sep 2", false, undefined, undefined, "Fair closed — plan around it."],
  ["2026-09-03", "Thursday", "Thu, Sep 3", true, "max-mcnown", undefined, "Final stretch begins — Max McNown."],
  ["2026-09-04", "Friday", "Fri, Sep 4", true, "twisted-sister", [1], "The 30th Giant Cabbage Weigh-Off at 6, Twisted Sister at 7. Only in Alaska."],
  ["2026-09-05", "Saturday", "Sat, Sep 5", true, "deadmau5", undefined, "Biggest Saturday of the year — deadmau5 closes it loud."],
  ["2026-09-06", "Sunday", "Sun, Sep 6", true, "nick-offerman", undefined, "Nick Offerman, 6 PM — bring dad."],
  ["2026-09-07", "Monday", "Mon, Sep 7", true, "lyle-lovett", undefined, "Labor Day finale — Lyle Lovett sends the summer off."],
];

export const days: FairDay[] = DAY_DEFS.map(
  ([date, weekday, label, open, concert, momentIdx, vibe]) => ({
    date,
    weekday,
    label,
    open,
    concert,
    momentIdx,
    vibe,
  })
);

// Every open day also carries the daily constants (carnival, exhibits,
// vendors, 4-H) — rendered by the planner as the standing card.
export const DAILY_CONSTANTS = [
  "Golden Wheel carnival midway (ride passes sold on-site / Golden Wheel's site)",
  "Exhibit halls: giant crops, art, baked goods, livestock & 4-H",
  "Hundreds of food & non-food vendors",
  "Free entertainment stages throughout the grounds",
];

// The Etix SKU map — the hook, made visible. Grounded in the actual Buy Tix
// page links (2026-07-01).
export const SKU_GROUPS = [
  {
    group: "Getting in",
    items: [
      "One-day fair admission",
      "6-pack fair admissions",
      "MePlusThree 4-pack",
      "Youth season pass",
      "Senior season pass",
    ],
  },
  {
    group: "Parking",
    items: ["Premier parking", "Reserved parking"],
  },
  {
    group: "Concerts (× 14 shows)",
    items: [
      "“Artist” ticket (does NOT include fair admission)",
      "“Artist with fair admission” bundle",
    ],
  },
  {
    group: "Grandstand",
    items: ["Rodeo Alaska Champions Tour (×2 dates)", "All-Star Monster Trucks (×3 shows)"],
  },
  {
    group: "Not on Etix at all",
    items: [
      "Carnival ride passes (Golden Wheel's own site / on-site)",
      "RV & tent camping (separate campground portal)",
    ],
  },
];

export function getConcert(slug: string) {
  return concerts.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------------
// DEEP PAGES — five featured guides.
// ---------------------------------------------------------------------------

export type FairPage = {
  slug: string;
  name: string;
  shortName: string;
  date: string;
  isoStart: string;
  isoEnd?: string;
  venue: string;
  city: string;
  region: string;
  ticketed: "paid" | "free" | "onsite" | "included";
  ticketVia?: string;
  sourceUrl: string;
  teaser: string;
  accent: "wheat" | "cabbage" | "ribbon" | "barn" | "sky";
  deep: FairDeepContent;
};

export const pages: FairPage[] = [
  {
    slug: "concert-series",
    name: "Alaska State Fair 2026 Concert Series at the Borealis Theatre",
    shortName: "The 2026 Concert Series",
    date: "Nightly, Aug 21 – Sep 7, 2026",
    isoStart: "2026-08-21T19:00:00-08:00",
    isoEnd: "2026-09-07T22:00:00-08:00",
    venue: "Borealis Theatre",
    city: "Palmer",
    region: "AK",
    ticketed: "paid",
    ticketVia: "Etix (2 SKUs per show)",
    sourceUrl: "https://www.alaskastatefair.org/site/concerts/",
    teaser:
      "Fourteen nights, fourteen headliners — AJR to deadmau5 to The Beach Boys — on an outdoor stage under the end-of-summer Alaska sky.",
    accent: "ribbon",
    deep: {
      metaTitle:
        "Alaska State Fair 2026 Concerts — Full Borealis Theatre Lineup, Dates & How Tickets Work",
      metaDescription:
        "Every 2026 Alaska State Fair concert in one place: AJR, Megadeth, Ziggy Marley, Amy Grant, CAKE, Modest Mouse, Nate Smith, BigXthaPlug, The Beach Boys, Max McNown, Twisted Sister, deadmau5, Nick Offerman, and Lyle Lovett — with dates, start times, and the fair-admission ticket rule explained.",
      keywords: [
        "Alaska State Fair 2026 concerts",
        "Borealis Theatre lineup 2026",
        "Alaska State Fair concert tickets",
        "deadmau5 Alaska State Fair",
        "Beach Boys Palmer Alaska",
      ],
      h1: "The 2026 Concert Series",
      intro:
        "Every night of the fair ends at the Borealis Theatre. The 2026 series runs fourteen headliners in eighteen days — thrash metal to reggae royalty to a woodworking comedian — and it's the single biggest reason to check the calendar before you pick your fair day.",
      body: [
        "The run, in order: AJR opens Friday, August 21. Then Megadeth (Aug 22), Ziggy Marley (Aug 23, 6 PM), Amy Grant (Aug 24), CAKE (Aug 27), Modest Mouse (Aug 28), Nate Smith (Aug 29), BigXthaPlug (Aug 30), and The Beach Boys close August on the 31st. September brings Max McNown (Sep 3), Twisted Sister featuring Sebastian Bach (Sep 4 — the same night as the Giant Cabbage Weigh-Off), deadmau5 (Sep 5), Nick Offerman (Sep 6, 6 PM), and Lyle Lovett closing Labor Day night. Most shows start at 7 PM; Sunday and Labor Day shows start at 6.",
        "Here's the one rule that catches people every year, straight from how the tickets are actually sold: a concert ticket alone does not admit you to the fair. Each show sells as two separate products — the concert ticket, and a 'with fair admission' bundle. If you're spending the day on the grounds first (you should), you need admission plus the show, or the bundle.",
        "The Borealis is an outdoor amphitheater, and this is Alaska in late August: bring a layer for after sunset, and check the fair's bag and security policy before you go. There is no bad seat for the northern sky — September shows have a real shot at aurora overhead.",
        "Note the dark nights: the fair — and therefore the stage — is closed Tuesdays and Wednesdays (Aug 25–26 and Sep 1–2). If your trip window includes those dates, the planner on this hub will route you around them.",
      ],
      faq: [
        {
          q: "Does a concert ticket get me into the fair?",
          a: "No — and this is the most important thing on this page. Concert tickets and fair admission are separate purchases; each show also sells a 'with fair admission' bundle. Check exactly what your ticket covers before you buy.",
        },
        {
          q: "What time do shows start?",
          a: "Most 2026 shows start at 7:00 PM. The Ziggy Marley (Aug 23), Nick Offerman (Sep 6), and Lyle Lovett (Sep 7) shows start at 6:00 PM. Times come from the fair's own event listings.",
        },
        {
          q: "Where do I buy tickets?",
          a: "All concert tickets sell through Etix, linked from each show's page on alaskastatefair.org. Buy only through the official links — resale sites list the same shows at marked-up prices.",
        },
        {
          q: "Is the venue outdoors?",
          a: "Yes — the Borealis Theatre is the fair's outdoor amphitheater. Dress for an Alaska evening: it's often 60°F at showtime and 48°F by the encore.",
        },
        {
          q: "Which nights have no concert?",
          a: "Tuesdays and Wednesdays — August 25, 26 and September 1, 2 — when the whole fair is closed.",
        },
      ],
      ticketInfo:
        "All fourteen shows sell through Etix — but every show is TWO separate products there: the concert alone, and the concert bundled with fair admission. That's 28 concert checkout links for one series, before you've bought parking. The fair's own site links each show to its Etix pages.",
      priceStatus:
        "Per-show pricing varies by artist and tier — see each show's official Etix listing. Prices are not republished here.",
    },
  },
  {
    slug: "which-ticket",
    name: "Which Alaska State Fair 2026 Ticket Do I Actually Need?",
    shortName: "Which ticket do I need?",
    date: "Aug 21 – Sep 7, 2026",
    isoStart: "2026-08-21",
    isoEnd: "2026-09-07",
    venue: "Alaska State Fairgrounds",
    city: "Palmer",
    region: "AK",
    ticketed: "paid",
    ticketVia: "Etix + Golden Wheel + campground portal",
    sourceUrl: "https://www.alaskastatefair.org/site/buy-tix/",
    teaser:
      "Admission, 6-packs, season passes, two kinds of parking, two SKUs per concert, carnival passes somewhere else entirely — untangled into one honest guide.",
    accent: "barn",
    deep: {
      metaTitle:
        "Alaska State Fair 2026 Tickets Explained — Admission, Concerts, Parking & Carnival",
      metaDescription:
        "The honest guide to Alaska State Fair 2026 ticketing: what one-day admission covers, how the concert 'with fair admission' bundles work, season passes, premier vs reserved parking, and why carnival ride passes are a separate purchase.",
      keywords: [
        "Alaska State Fair tickets 2026",
        "Alaska State Fair admission price",
        "does concert ticket include fair admission",
        "Alaska State Fair parking",
        "Alaska State Fair season pass",
      ],
      h1: "Which ticket do I actually need?",
      intro:
        "The fair sells more than twenty different things that all look like 'a ticket.' Here's the untangling — what each one covers, what it doesn't, and the three questions that tell you exactly what to buy.",
      body: [
        "Question one: how many days are you coming? One or two days, buy one-day admissions (or the MePlusThree 4-pack for a family day, or the 6-pack if you're splitting with friends). Three days or more, the season passes start winning — youth and senior passes are their own products.",
        "Question two: are you seeing a show? Every Borealis concert sells as two products: the concert ticket alone (which does NOT get you into the fair) and a 'with fair admission' bundle. If you're arriving early to do the fair first — the correct move — the bundle usually replaces the separate admission for that day. That single rule is the most common ticket mistake at the fair.",
        "Question three: how are you getting there? Parking sells in advance in two tiers — premier and reserved — and both routinely sell out for concert nights. If you're camping the weekend, the RV and tent campground books through an entirely separate reservation portal, not Etix.",
        "And the carnival: ride passes aren't on Etix at all. Golden Wheel Amusements sells wristbands and ride credits through its own site and on the midway. Budget for it separately — admission never includes rides.",
        "Everything above reflects how the tickets are actually sold today, linked from the fair's official Buy Tix page. Prices vary by product and date and are not republished here — always buy through alaskastatefair.org's links.",
      ],
      faq: [
        {
          q: "Does fair admission include carnival rides?",
          a: "No. Admission covers the grounds, exhibits, free stages, and atmosphere. Carnival rides are sold separately by Golden Wheel Amusements — wristbands and credits, on the midway or via their site.",
        },
        {
          q: "Does a concert ticket include fair admission?",
          a: "Not by itself. Each show sells both a concert-only ticket and a 'with fair admission' bundle — pick the bundle if you're making a day of it.",
        },
        {
          q: "Should I pre-buy parking?",
          a: "For concert nights, yes — premier and reserved parking both sell in advance on Etix and go fast for the big shows. Arriving without it can mean a long walk on a cold night.",
        },
        {
          q: "When does a season pass beat day tickets?",
          a: "Do the math at three or more visits. With four open days a week and fourteen concerts, plenty of Valley locals clear that bar easily.",
        },
        {
          q: "What days is the fair closed?",
          a: "Tuesdays and Wednesdays: August 25–26 and September 1–2, 2026. Hours otherwise are 11 AM to 10 PM, per the fair's official hours page.",
        },
      ],
      ticketInfo:
        "Twenty-plus SKUs across three systems: admissions, passes, parking, rodeo, and monster trucks on Etix (plus two SKUs per concert × 14 shows); carnival rides through Golden Wheel; camping through a separate campground portal. This page — and the day planner on the hub — exists because no official surface currently answers 'what do I need for MY day' in one place.",
      priceStatus:
        "Prices vary by product and are set by the fair and its vendors — always check the official Buy Tix links for current pricing.",
    },
  },
  {
    slug: "giant-cabbage-weigh-off",
    name: "30th Annual Giant Cabbage Weigh-Off — Alaska State Fair 2026",
    shortName: "Giant Cabbage Weigh-Off",
    date: "Friday, September 4, 2026 · 6:00 PM",
    isoStart: "2026-09-04T18:00:00-08:00",
    isoEnd: "2026-09-04T20:00:00-08:00",
    venue: "Alaska State Fairgrounds",
    city: "Palmer",
    region: "AK",
    ticketed: "included",
    sourceUrl:
      "https://www.alaskastatefair.org/site/events/27th-annual-giant-cabbage-weigh-off/",
    teaser:
      "The fair's most famous hour: Matanuska Valley growers roll hundred-pound cabbages onto the scale, chasing records under the midnight-sun mythology that grew them.",
    accent: "cabbage",
    deep: {
      metaTitle:
        "Giant Cabbage Weigh-Off 2026 — Alaska State Fair's 30th Annual, September 4",
      metaDescription:
        "The 30th Annual Giant Cabbage Weigh-Off at the Alaska State Fair — Friday, September 4, 2026 at 6 PM. Why Matanuska Valley cabbages grow past 100 pounds, what happens at the weigh-off, and how to see it (included with fair admission).",
      keywords: [
        "Giant Cabbage Weigh-Off 2026",
        "Alaska State Fair giant cabbage",
        "Matanuska Valley giant vegetables",
        "Alaska giant pumpkin weigh-off",
        "Palmer Alaska state fair traditions",
      ],
      h1: "The 30th Giant Cabbage Weigh-Off",
      intro:
        "Every fair has a signature. Alaska's is a vegetable the size of a beanbag chair. On the first Friday of September, the Matanuska Valley's growers bring their giants to the scale for the 30th time — and the crowd treats it like a title fight.",
      body: [
        "The physics are real: nineteen-plus hours of summer daylight in the Matanuska Valley push brassicas to absurd size. Record cabbages here have cleared 130 pounds — hoisted onto the scale by teams of handlers while the announcer works the crowd. The 2026 edition is the 30th annual weigh-off, Friday, September 4 at 6 PM.",
        "It's a genuine competition with prize money and a record board, but the show is the point: growers babying their entries like prizefighters at a weigh-in, kids posing next to cabbages that outweigh them, and a genuine gasp when the number posts.",
        "There's no separate ticket — the weigh-off is included with fair admission. Come early: the fair's giant-crops exhibit runs all day, every day, so you can meet the pumpkins and kohlrabi before the main event.",
        "Pro scheduling note: September 4 is also Twisted Sister night at the Borealis (7 PM). Cabbage at six, Sebastian Bach at seven — there is no more Alaska sentence than that. The pumpkins get their own moment too: the 20th Annual Midnight Sun Great Pumpkin Weigh-Off runs Monday, August 31 at 2 PM.",
      ],
      faq: [
        {
          q: "When is the 2026 Giant Cabbage Weigh-Off?",
          a: "Friday, September 4, 2026 at 6:00 PM — the 30th annual. The date and time come from the fair's own event listing.",
        },
        {
          q: "Do I need a ticket?",
          a: "Just fair admission — the weigh-off itself is included. No separate SKU, refreshingly.",
        },
        {
          q: "How big do the cabbages actually get?",
          a: "The valley's giants have cleared 130 pounds at past weigh-offs — genuinely too heavy for one person to lift. Long summer daylight plus serious grower craft does the rest.",
        },
        {
          q: "Is there a pumpkin version?",
          a: "Yes — the 20th Annual Alaska Midnight Sun Great Pumpkin Weigh-Off, Monday, August 31, 2026 at 2:00 PM, same fair, same admission.",
        },
      ],
      ticketInfo:
        "Included with fair admission — one of the few marquee moments with no extra checkout. Pair it with that night's concert (Twisted Sister, 7 PM, separate Etix ticket or admission bundle) for the definitive fair Friday.",
      priceStatus:
        "No separate charge; fair admission required. Admission pricing via the official Buy Tix links.",
    },
  },
  {
    slug: "grandstand-shows",
    name: "Rodeo & Monster Trucks — Alaska State Fair 2026 Grandstand",
    shortName: "Rodeo & Monster Trucks",
    date: "Multiple dates during the fair [confirm]",
    isoStart: "2026-08-21",
    isoEnd: "2026-09-07",
    venue: "The Grandstand, Alaska State Fairgrounds",
    city: "Palmer",
    region: "AK",
    ticketed: "paid",
    ticketVia: "Etix (5 separate SKUs)",
    sourceUrl: "https://www.alaskastatefair.org/site/buy-tix/",
    teaser:
      "The dirt-and-diesel side of the fair: two nights of Alaska Champions Tour rodeo and three All-Star Monster Truck shows at the Grandstand.",
    accent: "wheat",
    deep: {
      metaTitle:
        "Alaska State Fair 2026 Rodeo & Monster Trucks — Grandstand Shows, Dates & Tickets",
      metaDescription:
        "The Alaska State Fair 2026 Grandstand slate: Rodeo Alaska Champions Tour (two dates) and All-Star Monster Trucks (three shows), each ticketed separately from fair admission on Etix. What to expect and how the tickets work.",
      keywords: [
        "Alaska State Fair rodeo 2026",
        "monster trucks Alaska State Fair",
        "Rodeo Alaska Champions Tour",
        "Palmer grandstand events",
        "Alaska State Fair grandstand tickets",
      ],
      h1: "Rodeo & Monster Trucks at the Grandstand",
      intro:
        "Away from the Borealis stage, the Grandstand runs the fair's loudest traditions: bulls and broncs with the Rodeo Alaska Champions Tour, and three afternoons of All-Star Monster Trucks turning the infield into a crush zone.",
      body: [
        "Rodeo Alaska's Champions Tour brings the state's cowboys and cowgirls to Palmer for two fair dates — bull riding, broncs, barrels, and the full program. It's Alaska's biggest rodeo stage of the year.",
        "The All-Star Monster Trucks run three separate shows across the fair — engines, crush cars, and freestyle that plays exactly as well at a state fair as you'd hope. Three shows also means three separate tickets; pick your date carefully.",
        "Both series sell on Etix as their own tickets, separate from fair admission — the same two-purchases rule as the concerts. The 2026 show dates live on the fair's Buy Tix page and each Etix listing [confirm exact dates there].",
        "The Grandstand is general seating; big shows fill early. Arrive with time to spare and grab food on the way in — you're in the heart of vendor row.",
      ],
      faq: [
        {
          q: "Are grandstand shows included with admission?",
          a: "No — rodeo and monster truck tickets are separate purchases on Etix, on top of fair admission. Five separate SKUs across the two series in 2026.",
        },
        {
          q: "When are the shows?",
          a: "Two rodeo dates and three monster truck shows are scheduled across the 2026 fair; exact dates are published on the fair's Buy Tix page and Etix listings [confirm]. Remember the fair is closed Tuesdays and Wednesdays.",
        },
        {
          q: "Is it family-friendly?",
          a: "Extremely — monster trucks are the single most kid-requested show at the fair. Ear protection for little ones is a genuinely good idea; it is LOUD.",
        },
      ],
      ticketInfo:
        "Five separate Etix SKUs (rodeo ×2, monster trucks ×3), each independent of fair admission — the grandstand shows are the clearest case of the fair's many-checkouts problem after the concert bundles.",
      priceStatus:
        "Pricing per show on the official Etix listings; 2026 grandstand dates [confirm] there.",
    },
  },
  {
    slug: "carnival-midway",
    name: "Golden Wheel Carnival Midway — Alaska State Fair 2026",
    shortName: "The Carnival Midway",
    date: "All 14 open days, 11 AM – 10 PM",
    isoStart: "2026-08-21",
    isoEnd: "2026-09-07",
    venue: "The Midway, Alaska State Fairgrounds",
    city: "Palmer",
    region: "AK",
    ticketed: "onsite",
    ticketVia: "Golden Wheel Amusements",
    sourceUrl: "https://www.alaskastatefair.org/site/carnival/",
    teaser:
      "Full-scale midway with Pioneer Peak looming over the Ferris wheel — rides, games, and the fried-everything corridor, every open day of the fair.",
    accent: "sky",
    deep: {
      metaTitle:
        "Alaska State Fair 2026 Carnival — Golden Wheel Midway Rides, Passes & Tips",
      metaDescription:
        "The Golden Wheel carnival midway at the Alaska State Fair 2026: how ride passes work (separate from fair admission), when the midway runs, and why the Ferris wheel view of Pioneer Peak is worth the line.",
      keywords: [
        "Alaska State Fair carnival 2026",
        "Golden Wheel Amusements Alaska",
        "Alaska State Fair rides",
        "state fair midway Palmer",
        "Alaska State Fair ride wristbands",
      ],
      h1: "The Carnival Midway",
      intro:
        "The midway is the fair's heartbeat — a full Golden Wheel carnival dropped into the Matanuska Valley, with Pioneer Peak photobombing every Ferris wheel photo. It runs all fourteen open days, from gates to close.",
      body: [
        "Golden Wheel Amusements — the same operator that lights up Anchorage's Fur Rondy each winter — runs the fair's midway: the big wheel, spinning rides, kiddie land, and the games row, open 11 AM to 10 PM every fair day.",
        "Ride access is its own economy: wristbands and ride credits sell through Golden Wheel directly — on the midway and via their own site's promotions — not through the fair's Etix system. Fair admission never includes rides, so budget the midway as its own line item.",
        "Watch the fair's Deals & Discounts page and Golden Wheel's promotions for wristband specials on slower days — the quieter Mondays and Thursdays are also when lines are shortest.",
        "One photo assignment: ride the Ferris wheel in the last hour before close, when the light goes gold on Pioneer Peak and the whole valley shows off. It's the postcard the fair was built for.",
      ],
      faq: [
        {
          q: "Are rides included with fair admission?",
          a: "No — ride wristbands and credits are sold separately by Golden Wheel Amusements, on the midway and through their own promotions. It's a separate system from the fair's Etix ticketing.",
        },
        {
          q: "When is the midway open?",
          a: "Every open fair day, 11 AM to 10 PM (the fair is closed Tuesdays and Wednesdays: Aug 25–26 and Sep 1–2).",
        },
        {
          q: "When are the lines shortest?",
          a: "Weekday afternoons — Mondays and Thursdays especially — and dinner hour, when everyone else is deep in the food rows. Concert nights empty the midway right before showtime.",
        },
      ],
      ticketInfo:
        "Carnival access is the third ticketing system of the fair: Etix never touches it. Golden Wheel sells wristbands and credits directly — check their promotions page and the fair's Deals & Discounts for current offers.",
      priceStatus:
        "Wristband and credit pricing set by Golden Wheel; not republished here — see their official promotions.",
    },
  },
];

export function getPage(slug: string) {
  return pages.find((p) => p.slug === slug);
}
