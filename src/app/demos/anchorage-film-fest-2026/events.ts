// Anchorage International Film Festival (AIFF) 2026 — grounded event data for
// the BlueWave Projects sample pitch.
//
// SOURCE OF TRUTH: https://anchoragefilmfestival.org/ (verified live 2026-07-02).
// The site confirms the 26th annual festival runs December 4–13, 2026, in
// Anchorage, Alaska — but as of this build, the full 2026 program has NOT
// been published yet: /festival-schedule/ still shows the completed 2025
// slate (Dec 5–14, 2025). Per the brief's discipline (same as the Iditarod
// and Rondy samples): we do NOT invent a fake 2026 lineup. The 2025 program
// below is shown clearly labeled as "past festival" reference content, never
// presented as 2026 fact. Every 2026-specific claim (dates, venues, org info,
// ticketing platforms) is independently verified and cited.
//
// TICKETING REALITY (verified by following the site's own Tickets nav links
// and directly testing both platforms, 2026-07-02): AIFF sells screenings
// through TWO separate ticketing systems split by venue —
//   - Bear Tooth Theatrepub screenings → FilmBOT (beartooththeatre.filmbot.com),
//     Bear Tooth's own year-round box-office platform, shared with its regular
//     dine-in movie schedule, World Cup broadcasts, and unrelated events.
//   - Anchorage Museum, Alaska Experience Theater, and E Street Theater
//     screenings → GoElEvent (goelevent.com/AIFF), a separate ticketing SaaS.
// There is no single AIFF pass/checkout that spans both systems. A third
// platform, FilmFreeway (filmfreeway.com/AnchorageInternationalFilmFestival),
// exists but is exclusively for filmmaker SUBMISSIONS, not attendee tickets —
// never conflated with buyer-facing sales below.

export type AiffCategory =
  | "feature"
  | "shorts"
  | "special"
  | "free"
  | "awards";

export type AiffTicketing =
  | "paid" // buy a ticket to attend
  | "free" // free to attend, no ticket
  | "unpublished"; // 2026 ticketing not yet live

export type AiffDeepContent = {
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

export type AiffScreening = {
  slug: string;
  /** Full name for JSON-LD + detail hero */
  name: string;
  /** Card + schedule label */
  shortName: string;
  /** Human-readable date string — 2025 program, clearly labeled as past-festival reference */
  date: string;
  /** Sort key: day offset from 2025 festival start; used only for the reference schedule ordering */
  sortKey: number;
  /** ISO 8601 for schema.org — 2025 program dates (historical reference, not 2026 fact) */
  isoStart: string;
  venue: string;
  city: string;
  region: string;
  category: AiffCategory;
  ticketed: AiffTicketing;
  /** Which system actually sells/handles this venue's tickets (the scatter) */
  ticketVia?: "FilmBOT" | "GoElEvent";
  /** Official AIFF site or vendor page */
  sourceUrl: string;
  /** One-line teaser for cards + schedule rows */
  teaser: string;
  accent: "marquee" | "aurora-blue" | "reel-red" | "midnight" | "frost";
  /** Full landing-page content — only the featured items carry this */
  deep?: AiffDeepContent;
};

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/anchorage-film-fest-2026";
export const AIFF_URL = "https://anchoragefilmfestival.org";

// ---------------------------------------------------------------------------
// 2026 FESTIVAL FACTS — confirmed, not [confirm]-flagged.
// ---------------------------------------------------------------------------
export const FESTIVAL_2026 = {
  edition: "26th annual",
  dates: "December 4–13, 2026",
  isoStart: "2026-12-04",
  isoEnd: "2026-12-13",
  city: "Anchorage",
  region: "AK",
  venues: [
    "Bear Tooth Theatrepub",
    "Anchorage Museum",
    "E Street Theater",
    "Alaska Experience Theater",
  ],
  filmCount: "100+",
  tagline: "Films Worth Freezing For",
  recognition:
    'Named one of the "25 Coolest Film Festivals in the World" by MovieMaker Magazine; billed by the festival as "the Icy Road to the Oscars."',
} as const;

// ---------------------------------------------------------------------------
// THE 2025 PROGRAM — real, verified, but explicitly PAST-FESTIVAL reference
// content (per the brief: never presented as 2026 fact). Pulled from AIFF's
// own /festival-schedule/ page, verified 2026-07-02. This is what "the hub
// would look like once 2026 goes live" — populated with the most recent real
// data available, honestly labeled.
// ---------------------------------------------------------------------------

export const screenings: AiffScreening[] = [
  // ------------------------------------------------------------------ deep 1
  {
    slug: "opening-night-burt",
    name: "AIFF 2025 Opening Night — Burt",
    shortName: "Opening Night: Burt",
    date: "Friday, December 5, 2025 [2025 program — reference only]",
    sortKey: 0,
    isoStart: "2025-12-05T19:30:00-09:00",
    venue: "Bear Tooth Theatrepub",
    city: "Anchorage",
    region: "AK",
    category: "feature",
    ticketed: "paid",
    ticketVia: "FilmBOT",
    sourceUrl: "https://beartooththeatre.filmbot.com/",
    teaser:
      "The festival's traditional curtain-raiser — a feature premiere at Bear Tooth Theatrepub, sold through Bear Tooth's own FilmBOT box office alongside its regular dine-in movie schedule.",
    accent: "marquee",
    deep: {
      metaTitle:
        "AIFF Opening Night 2026 — Bear Tooth Theatrepub, How Tickets Actually Work",
      metaDescription:
        "How opening night works at the Anchorage International Film Festival — traditionally a Friday premiere at Bear Tooth Theatrepub, ticketed through Bear Tooth's own FilmBOT box office. What to expect and how the 26th annual festival's December 4–13, 2026 window compares to the most recent (2025) program.",
      keywords: [
        "AIFF 2026 opening night",
        "Anchorage International Film Festival Bear Tooth",
        "Anchorage Film Festival tickets FilmBOT",
        "AIFF 26th annual",
        "Bear Tooth Theatrepub film festival",
      ],
      h1: "Opening Night, Bear Tooth Theatrepub",
      intro:
        "AIFF's opening night has traditionally landed at Bear Tooth Theatrepub — Anchorage's dine-in indie theater and one of the festival's four venues. In the most recent (2025) program, opening night was a Friday 7:30 PM premiere, ticketed through Bear Tooth's own box-office platform, FilmBOT.",
      body: [
        "Bear Tooth Theatrepub sits apart from AIFF's other three venues in one important way: it's not a rented-for-the-week screening room, it's a full-time dine-in theater that runs its own year-round program — Hollywood releases, classic-film nights, sports broadcasts, and its own \"Trilogy Tuesdays\" series. AIFF screenings simply slot into that existing FilmBOT ticketing system for festival week.",
        "That has a real, practical consequence for festivalgoers: an AIFF Bear Tooth screening books exactly like a normal night out at Bear Tooth — reserved seating, food and drink service, tickets released on FilmBOT's own schedule (Bear Tooth's standard cadence, confirmed via its box-office page, is new tickets released Tuesdays at 10:30 AM for the coming Friday). It is a genuinely different purchase flow from the festival's other three venues, which sell exclusively through a separate platform, GoElEvent.",
        "The 26th annual festival runs December 4–13, 2026, across Bear Tooth, the Anchorage Museum, E Street Theater, and Alaska Experience Theater — confirmed by AIFF directly. The full day-by-day 2026 schedule, including which film opens the festival, had not yet been published on anchoragefilmfestival.org as of this build; the 2025 detail above is shown as the most recent real reference, not a 2026 claim.",
      ],
      faq: [
        {
          q: "Is Burt the 2026 opening film?",
          a: "No — that was the confirmed 2025 opening-night film. AIFF has not yet published its 2026 program lineup as of this writing. This page uses the verified 2025 opening-night details as a reference for how the slot traditionally works.",
        },
        {
          q: "Where do Bear Tooth tickets come from?",
          a: "FilmBOT (beartooththeatre.filmbot.com) — Bear Tooth's own year-round box office, not a festival-specific platform. It is a completely separate checkout from the GoElEvent system used at AIFF's other three venues.",
        },
        {
          q: "Is Bear Tooth Theatrepub only used for AIFF?",
          a: "No. It's a working dine-in theater year-round — during the research for this page, its live schedule included regular Hollywood releases, World Cup broadcasts, and a classic-film series, alongside the AIFF slate slotted into the same booking system.",
        },
        {
          q: "When does the 2026 festival run?",
          a: "December 4–13, 2026 — the 26th annual AIFF, confirmed directly by the festival. The specific opening-night film and time for 2026 were not yet announced as of this build.",
        },
      ],
      ticketInfo:
        "Bear Tooth Theatrepub screenings sell through FilmBOT, Bear Tooth's own box-office platform — reserved seating, dine-in service, tickets released on Bear Tooth's standard weekly cadence. This is a separate system from GoElEvent, used at AIFF's other three 2026 venues (Anchorage Museum, E Street Theater, Alaska Experience Theater).",
      priceStatus:
        "2026 opening-night film, time, and pricing not yet published. The verified 2025 opening night was a 7:30 PM Friday premiere at Bear Tooth Theatrepub.",
    },
  },

  // ------------------------------------------------------------------ deep 2
  {
    slug: "anchorage-museum-screenings",
    name: "AIFF Anchorage Museum Screening Block",
    shortName: "Anchorage Museum Screenings",
    date: "Multiple days, Dec 6–14, 2025 [2025 program — reference only]",
    sortKey: 1,
    isoStart: "2025-12-06T10:00:00-09:00",
    venue: "Anchorage Museum",
    city: "Anchorage",
    region: "AK",
    category: "feature",
    ticketed: "paid",
    ticketVia: "GoElEvent",
    sourceUrl: "https://www.goelevent.com/AIFF/e/Search",
    teaser:
      "AIFF's busiest single venue — features and shorts blocks running most days of the festival, ticketed through the separate GoElEvent platform rather than Bear Tooth's FilmBOT.",
    accent: "aurora-blue",
    deep: {
      metaTitle:
        "AIFF at the Anchorage Museum 2026 — Screenings, Venue Info & GoElEvent Tickets",
      metaDescription:
        "The Anchorage International Film Festival's busiest venue is the Anchorage Museum — features, documentaries, and shorts blocks running most days of the 26th annual festival, December 4–13, 2026. Tickets sell through GoElEvent, a different platform from Bear Tooth's FilmBOT.",
      keywords: [
        "AIFF Anchorage Museum",
        "Anchorage International Film Festival tickets GoElEvent",
        "Anchorage Museum film festival screenings",
        "AIFF 2026 venues",
        "Anchorage Film Festival museum screenings",
      ],
      h1: "Anchorage Museum Screenings",
      intro:
        "The Anchorage Museum at 625 C Street is AIFF's anchor venue — in the most recent (2025) program it hosted screenings on nearly every festival day, from 10 AM feature blocks to 8:30 PM late slots, more total screening slots than any other single venue.",
      body: [
        "Unlike Bear Tooth's dine-in, reserved-seat format, Museum screenings run through GoElEvent, a ticketing platform used exclusively by AIFF's three non-Bear-Tooth venues (Anchorage Museum, Alaska Experience Theater, and E Street Theater). Testing the vendor directly in mid-2026 (between festivals) confirmed it's a real, active checkout system — it currently shows \"There are no upcoming events. Please check back later,\" which is exactly what an honest, dormant off-season ticketing page should say.",
        "The museum's practical logistics, confirmed from AIFF's own program notes: enter via the 7th Avenue entrance, and use the paid parking garage if driving — different from Bear Tooth's own surface lot at 1230 W. 27th Ave.",
        "In the 2025 program, the Museum hosted a genuine mix of formats: single features, curated shorts blocks (documentary, comedy, international, \"Alaskan Shorts\"), and even an outdoor Front Lawn free community movie night — the festival's one confirmed no-ticket-required screening.",
      ],
      faq: [
        {
          q: "Is the Anchorage Museum the festival's main venue?",
          a: "By screening count, yes — in the verified 2025 program it hosted more total slots than Bear Tooth, E Street, or Alaska Experience Theater. Whether that holds for 2026 hasn't been published yet.",
        },
        {
          q: "How do Museum tickets differ from Bear Tooth tickets?",
          a: "Different platform entirely. Museum (and E Street, and Alaska Experience Theater) screenings sell through GoElEvent; Bear Tooth sells through its own FilmBOT box office. A ticket bought on one platform does not appear on, or work at, the other.",
        },
        {
          q: "Is there parking at the Anchorage Museum?",
          a: "Yes — a paid parking garage, confirmed from AIFF's own program notes for the venue. Enter the museum itself via the 7th Avenue entrance.",
        },
        {
          q: "Was anything free at the Museum in 2025?",
          a: "Yes — a Community Movie Night on the Museum's Front Lawn (verified 2025: Monday, December 8, 6–8 PM) was explicitly no-ticket-required. Whether a 2026 equivalent is planned hasn't been announced.",
        },
      ],
      ticketInfo:
        "Anchorage Museum screenings sell through GoElEvent (goelevent.com/AIFF) — the same platform used at Alaska Experience Theater and E Street Theater, and a completely separate checkout from Bear Tooth's FilmBOT. Verified live and functional (currently showing no active listings between festivals) as of 2026-07-02.",
      priceStatus:
        "2026 Museum program and per-screening pricing not yet published. GoElEvent's site references passes, memberships, and donation options generally, but lists no specific 2026 prices yet.",
    },
  },

  // ------------------------------------------------------------------ deep 3
  {
    slug: "all-access-pass-explainer",
    name: "AIFF Passes & Memberships — What Actually Covers What",
    shortName: "Passes & Memberships Explainer",
    date: "Dec 4–13, 2026 · ticketing not yet live [confirm]",
    sortKey: -1,
    isoStart: "2026-12-04",
    venue: "GoElEvent (all non–Bear Tooth venues)",
    city: "Anchorage",
    region: "AK",
    category: "special",
    ticketed: "unpublished",
    ticketVia: "GoElEvent",
    sourceUrl: "https://www.goelevent.com/AIFF",
    teaser:
      "GoElEvent's AIFF page references passes, memberships, and donation tiers — but as of this build, no 2026 pass actually spans BOTH ticketing systems. A Bear Tooth screening is always a separate FilmBOT purchase.",
    accent: "reel-red",
    deep: {
      metaTitle:
        "AIFF 2026 Passes & Memberships — What a Festival Pass Actually Covers",
      metaDescription:
        "Does an AIFF festival pass get you into every venue? Not automatically — GoElEvent (the Anchorage Museum / Alaska Experience Theater / E Street Theater platform) offers passes and memberships, but Bear Tooth Theatrepub always sells separately through its own FilmBOT box office. What to check before you buy.",
      keywords: [
        "AIFF all access pass",
        "Anchorage Film Festival pass",
        "AIFF membership",
        "Anchorage International Film Festival tickets explained",
        "film festival pass Anchorage 2026",
      ],
      h1: "Passes & Memberships — What Actually Covers What",
      intro:
        "GoElEvent's AIFF storefront lists passes, memberships, and donation tiers as general offerings. What it does not do — because no platform-spanning pass currently exists — is cover Bear Tooth Theatrepub. Bear Tooth is a separate box office (FilmBOT) with its own reserved seating and its own checkout.",
      body: [
        "This is the single most useful thing an attendee can know before buying: AIFF's ticketing is genuinely split by venue, not just by convenience. Anchorage Museum, Alaska Experience Theater, and E Street Theater all run through GoElEvent, where a single account can plausibly hold a pass or membership that covers all three. Bear Tooth Theatrepub does not participate in that system at all — every Bear Tooth screening, including opening night in past years, is booked directly on FilmBOT, Bear Tooth's own year-round box office that also sells tickets to its regular movie schedule and unrelated events.",
        "Practically: if a 2026 all-venues pass is announced, confirm explicitly whether it includes Bear Tooth screenings or not — based on the current two-platform structure, the safest assumption is that it doesn't, and a Bear Tooth screening will always need its own separate FilmBOT ticket regardless of what pass you're holding elsewhere.",
        "As of this build, GoElEvent's AIFF search page shows no active 2026 listings yet (\"There are no upcoming events. Please check back later\") — confirmed by testing the live checkout directly. This is expected in the off-season between festivals, not a sign anything is broken.",
      ],
      faq: [
        {
          q: "Does a GoElEvent pass get me into Bear Tooth screenings?",
          a: "Not based on the current two-platform structure. Bear Tooth Theatrepub sells exclusively through its own FilmBOT box office, separate from GoElEvent's passes and memberships. Always confirm what a specific 2026 pass covers before assuming it's all-venue.",
        },
        {
          q: "Is there a 2026 All-Access Pass yet?",
          a: "Not published as of this build. GoElEvent's AIFF page references passes and memberships as a general category, but no specific 2026 pass, price, or venue coverage had been announced.",
        },
        {
          q: "Why are there two ticketing systems at all?",
          a: "Bear Tooth Theatrepub is a working, independently-run dine-in theater with its own year-round box office (FilmBOT) — it isn't a venue AIFF rents and re-tickets. The other three venues use GoElEvent, a general festival/event ticketing platform, for the week.",
        },
        {
          q: "What should I do to avoid a ticketing mistake?",
          a: "Check each screening's venue before buying. Bear Tooth screenings need a FilmBOT ticket; Museum, Alaska Experience Theater, and E Street Theater screenings need a GoElEvent ticket. Don't assume a pass or membership purchased on one platform works at the other.",
        },
      ],
      ticketInfo:
        "No single 2026 pass has been confirmed to span both platforms. GoElEvent (goelevent.com/AIFF) hosts passes/memberships for the Museum, Alaska Experience Theater, and E Street Theater; Bear Tooth Theatrepub tickets are always separate, via FilmBOT.",
      priceStatus:
        "2026 pass types and pricing not yet published on either platform as of this build [confirm].",
    },
  },

  // ------------------------------------------------------------------ deep 4
  {
    slug: "awards-night-williwaw",
    name: "AIFF Awards Ceremony — Williwaw Social",
    shortName: "Awards Ceremony",
    date: "Friday, December 12, 2025, 8:00 PM [2025 program — reference only]",
    sortKey: 8,
    isoStart: "2025-12-12T20:00:00-09:00",
    venue: "Williwaw Social",
    city: "Anchorage",
    region: "AK",
    category: "awards",
    ticketed: "paid",
    sourceUrl: "https://anchoragefilmfestival.org/festival-schedule/",
    teaser:
      "The festival's closing-weekend awards night moves off the regular four-venue circuit entirely, to Williwaw Social downtown — a fifth-venue wrinkle attendees need to know about.",
    accent: "midnight",
    deep: {
      metaTitle:
        "AIFF Awards Ceremony 2026 — Williwaw Social, What to Know",
      metaDescription:
        "The Anchorage International Film Festival's Awards Ceremony traditionally moves off its four main screening venues entirely, to Williwaw Social in downtown Anchorage. What the 2025 program showed, and what's confirmed (and not yet confirmed) for December 2026.",
      keywords: [
        "AIFF awards ceremony",
        "Anchorage Film Festival Williwaw Social",
        "AIFF closing night",
        "Anchorage International Film Festival awards",
        "Williwaw Social Anchorage events",
      ],
      h1: "Awards Ceremony — Williwaw Social",
      intro:
        "AIFF's Awards Ceremony is the one program element that leaves the festival's four core screening venues altogether. In the verified 2025 program, it was held Friday, December 12 at 8:00 PM at Williwaw Social — a downtown Anchorage venue distinct from Bear Tooth, the Museum, E Street, and Alaska Experience Theater.",
      body: [
        "For attendees tracking the festival's ticketing scatter, the Awards Ceremony is a useful reminder that the four-venue, two-platform structure (FilmBOT for Bear Tooth, GoElEvent for the other three) doesn't cover the entire festival. The 2025 Awards Ceremony's exact ticket path wasn't listed on the same schedule page as the venue's screenings — attendees are best served by checking the official festival-schedule page directly for the current year's awards-night ticket link when it's announced.",
        "Williwaw Social, at 609 F Street, is a downtown Anchorage bar and event space — a genuinely different format from a theater screening: a closing-weekend gathering to recognize the festival's juried and audience-choice winners after ten days of programming.",
        "The 26th annual festival's December 4–13, 2026 window strongly suggests an awards night landing on or near the festival's final Saturday, December 12, 2026, following the 2025 pattern (final Friday of a Thursday-start, ten-day run) — but this is a reasonable inference from the pattern, not a confirmed 2026 date, and is flagged accordingly.",
      ],
      faq: [
        {
          q: "Is the Awards Ceremony at one of the four main venues?",
          a: "No — it's the one program element that moves off Bear Tooth, the Museum, E Street, and Alaska Experience Theater entirely. The verified 2025 ceremony was at Williwaw Social, a downtown Anchorage bar/event space at 609 F Street.",
        },
        {
          q: "When is the 2026 Awards Ceremony?",
          a: "Not yet announced. The 2025 ceremony ran the festival's second Friday night; if 2026 follows the same pattern, that would land near December 11 or 12, 2026 — a reasonable inference, not a confirmed date [confirm].",
        },
        {
          q: "How do I get tickets to the Awards Ceremony?",
          a: "Not confirmed for 2026 as of this build. Check anchoragefilmfestival.org's festival-schedule page directly closer to December 2026 for the official ticket link.",
        },
      ],
      ticketInfo:
        "The 2025 Awards Ceremony's specific ticket vendor wasn't documented on the same page as the venue screening schedule. Check anchoragefilmfestival.org directly for the 2026 awards-night ticket link once published.",
      priceStatus:
        "2026 Awards Ceremony date, venue confirmation, and ticketing are not yet published [confirm]. Based on the 2025 pattern, expect it near the festival's second Friday.",
    },
  },

  // ----------------------------------------------------- the rest of the 2025 reference slate
  {
    slug: "e-street-theater-shorts",
    name: "AIFF E Street Theater Shorts Blocks",
    shortName: "E Street Theater Shorts",
    date: "Multiple days, Dec 7–11, 2025 [2025 — reference only]",
    sortKey: 2,
    isoStart: "2025-12-07T10:30:00-09:00",
    venue: "E Street Theater",
    city: "Anchorage",
    region: "AK",
    category: "shorts",
    ticketed: "paid",
    ticketVia: "GoElEvent",
    sourceUrl: "https://www.goelevent.com/AIFF/e/Search",
    teaser:
      "Curated shorts programming — narrative, documentary, and international blocks — at the festival's smallest dedicated venue, sold via GoElEvent.",
    accent: "frost",
  },
  {
    slug: "alaska-experience-theater-screenings",
    name: "AIFF Alaska Experience Theater Screenings",
    shortName: "Alaska Experience Theater",
    date: "Multiple days, Dec 6–12, 2025 [2025 — reference only]",
    sortKey: 3,
    isoStart: "2025-12-06T10:00:00-09:00",
    venue: "Alaska Experience Theater",
    city: "Anchorage",
    region: "AK",
    category: "feature",
    ticketed: "paid",
    ticketVia: "GoElEvent",
    sourceUrl: "https://www.goelevent.com/AIFF/e/Search",
    teaser:
      "A downtown 4th Avenue screening room mixing animation shorts, features, and thematic blocks — third GoElEvent venue in the festival's split-ticketing footprint.",
    accent: "aurora-blue",
  },
  {
    slug: "community-movie-night",
    name: "AIFF Free Community Movie Night — Museum Front Lawn",
    shortName: "Free Community Movie Night",
    date: "Monday, December 8, 2025, 6–8 PM [2025 — reference only]",
    sortKey: 3,
    isoStart: "2025-12-08T18:00:00-09:00",
    venue: "Anchorage Museum — Front Lawn",
    city: "Anchorage",
    region: "AK",
    category: "free",
    ticketed: "free",
    sourceUrl: "https://anchoragefilmfestival.org/festival-schedule/",
    teaser:
      "The festival's one confirmed no-ticket screening — AIFF short films projected outdoors on the Museum's Front Lawn, free and open to the public.",
    accent: "frost",
  },
  {
    slug: "native-voices-shorts",
    name: "AIFF Native Voices Shorts Block",
    shortName: "Native Voices Shorts",
    date: "Saturday, December 13, 2025, 3:00 PM [2025 — reference only]",
    sortKey: 9,
    isoStart: "2025-12-13T15:00:00-09:00",
    venue: "Bear Tooth Theatrepub",
    city: "Anchorage",
    region: "AK",
    category: "shorts",
    ticketed: "paid",
    ticketVia: "FilmBOT",
    sourceUrl: "https://beartooththeatre.filmbot.com/",
    teaser:
      "A closing-weekend shorts block spotlighting Alaska Native and Indigenous filmmakers, back at Bear Tooth on FilmBOT.",
    accent: "reel-red",
  },
];

/** Featured screenings — the four with full landing pages. */
export const deepScreenings = screenings.filter(
  (e): e is AiffScreening & { deep: AiffDeepContent } => Boolean(e.deep)
);

export function getScreening(slug: string) {
  return deepScreenings.find((e) => e.slug === slug);
}

/** Distinct ticketing systems in use across the venues today. */
export const ticketSystems = Array.from(
  new Set(screenings.map((e) => e.ticketVia).filter(Boolean))
) as string[];

/** Human labels for the category filter chips. */
export const categoryLabels: Record<AiffCategory, string> = {
  feature: "Features",
  shorts: "Shorts blocks",
  special: "Passes & special",
  free: "Free",
  awards: "Awards",
};
