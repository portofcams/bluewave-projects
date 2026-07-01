// Fur Rondy 2027 — grounded event data for the BlueWave Projects sample pitch.
//
// SOURCE OF TRUTH: https://furrondy.net/events (verified live 2026-07-01).
// furrondy.net still shows the full 2026 slate; the 2027 festival window
// (Thursday, February 25 – Sunday, March 7, 2027) is published by Visit
// Anchorage (anchorage.net). Every recurring event below is mapped to its
// traditional weekday slot inside that 2027 window and marked "[confirm]"
// until Greater Anchorage, Inc. publishes the official 2027 calendar.
//
// Per the brief (same discipline as the Iditarod 2027 sample): do NOT invent
// prices, start times that were never published, or attendance figures.
//
// TICKETING REALITY (verified by following every GET TICKETS link on
// furrondy.net, 2026-07-01): tickets and registrations are scattered across
// TEN-PLUS separate systems — Eventbrite, CenterTix, MyAlaskaTix, RunSignup,
// Curling.io, event.gives, Zeffy, Global Pickleball Network,
// anchoragesports.com, on-site sales, plus a Shopify store for merchandise.
// Each event below records where its tickets actually live (`ticketVia`).

export type RondyCategory =
  | "signature"
  | "race"
  | "nightlife"
  | "competition"
  | "family"
  | "market";

export type RondyTicketing =
  | "paid" // buy a ticket to attend
  | "register" // free/paid registration to participate; free to watch
  | "free" // free to attend, no ticket
  | "onsite"; // pay at the gate/booth, no online sales

export type RondyDeepContent = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  body: string[];
  faq: { q: string; a: string }[];
  /** Longer ticket reality used on the detail page */
  ticketInfo: string;
  /** Status of pricing certainty */
  priceStatus: string;
};

export type RondyEvent = {
  slug: string;
  /** Full name for JSON-LD + detail hero */
  name: string;
  /** Card + schedule label */
  shortName: string;
  /** Human-readable 2027 date string */
  date: string;
  /** Sort key: day offset from festival start (Feb 25 2027 = 0); multi-day
   *  events sort by first day. Pre-festival events go negative. */
  sortKey: number;
  /** ISO 8601 for schema.org — date-only when no 2027 time is published */
  isoStart: string;
  isoEnd?: string;
  venue: string;
  city: string;
  region: string;
  category: RondyCategory;
  ticketed: RondyTicketing;
  /** Which system actually sells/handles this event today (the scatter) */
  ticketVia?: string;
  /** Official furrondy.net event page */
  sourceUrl: string;
  /** One-line teaser for cards + schedule rows */
  teaser: string;
  /** true = 2027 date is mapped from the 2026 pattern, not yet published */
  confirm: boolean;
  accent: "aurora" | "violet" | "ember" | "ice" | "midnight";
  /** Full landing-page content — only the featured events carry this */
  deep?: RondyDeepContent;
};

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/fur-rondy-2027";

// ---------------------------------------------------------------------------
// THE FULL OFFICIAL SLATE — hub schedule rows. Six featured events carry
// `deep` content and get their own landing pages.
// ---------------------------------------------------------------------------

export const events: RondyEvent[] = [
  // ------------------------------------------------------------------ deep 1
  {
    slug: "running-of-the-reindeer",
    name: "Fur Rondy 2027 Running of the Reindeer",
    shortName: "Running of the Reindeer",
    date: "Saturday, March 6, 2027 [confirm]",
    sortKey: 9,
    isoStart: "2027-03-06T16:00:00-09:00",
    venue: "4th Avenue between D & H Streets",
    city: "Anchorage",
    region: "AK",
    category: "signature",
    ticketed: "register",
    ticketVia: "Eventbrite",
    sourceUrl: "https://furrondy.net/events/reindeer",
    teaser:
      "The one you've seen on the news: waves of costumed runners sprint down 4th Avenue with a herd of reindeer on their heels. Registration to run; free to watch from the fence line.",
    confirm: true,
    accent: "ember",
    deep: {
      metaTitle:
        "Running of the Reindeer 2027 — Fur Rondy, 4th Avenue Anchorage, How to Run or Watch",
      metaDescription:
        "How to run (or just watch) the Fur Rondy 2027 Running of the Reindeer on 4th Avenue in downtown Anchorage — traditionally the festival's final Saturday, the same day the Iditarod ceremonially starts a few blocks away. Registration details, what to wear, and what to expect.",
      keywords: [
        "Running of the Reindeer 2027",
        "Fur Rondy reindeer run Anchorage",
        "Running of the Reindeer registration",
        "Fur Rendezvous 2027 events",
        "Anchorage winter festival reindeer",
      ],
      h1: "Running of the Reindeer 2027",
      intro:
        "Pamplona has bulls. Anchorage has reindeer — and a lot more costumes. Every year on Fur Rondy's big final Saturday, waves of runners take off down 4th Avenue with a herd of reindeer loping through the pack. It is loud, ridiculous, over in minutes, and one of the most photographed moments in Alaska.",
      body: [
        "The Running of the Reindeer has closed down 4th Avenue nearly every year since 2008. Runners are released in waves — traditionally grouped so friends, families, and the truly costume-committed each get their moment — and then the reindeer are let loose behind them. The animals are faster than you. That is the entire point.",
        "The run is a registered event: you sign up in advance, pick up a bib at packet pickup the day before, and line up in your wave on Saturday afternoon. Spectating is free — the fence line along 4th Avenue fills early, so claim a spot ahead of the posted start if you want the classic head-on view of runners-then-antlers.",
        "In 2027 the timing is special even by Rondy standards. The festival's final Saturday falls on March 6 — the same day the Iditarod's Ceremonial Start runs down the very same street that morning [confirm]. Sled dogs at 10 a.m., reindeer in the afternoon, and the Rondy Music Fest at the Egan Center that night: it is the single biggest day on Anchorage's winter calendar.",
        "Costumes are not required, but you will feel underdressed without one. Superheroes, banana suits, wedding dresses, full moose onesies — if it doesn't restrict your sprint, it qualifies. Anchorage in early March is typically in the 20s°F; plan a costume you can run in over warm layers.",
      ],
      faq: [
        {
          q: "When is the Running of the Reindeer in 2027?",
          a: "Traditionally it runs on Fur Rondy's final Saturday — March 6 in 2027 — with a late-afternoon start on 4th Avenue between D and H Streets. The exact 2027 date and start time are not yet posted by Greater Anchorage, Inc. [confirm]; the 2026 edition started at 4:00 PM.",
        },
        {
          q: "Do I need a ticket to watch?",
          a: "No. Watching from the street-side fencing along 4th Avenue is free. Registration (with a fee) is only required if you want to run with the herd.",
        },
        {
          q: "How do I register to run?",
          a: "Registration for the 2026 running was handled through Eventbrite, linked from the official event page at furrondy.net. Expect the 2027 sign-up to open on the official site as the festival approaches — register early; waves have capacity limits.",
        },
        {
          q: "Is it dangerous? Do the reindeer actually chase you?",
          a: "The reindeer are experienced festival professionals from a local herd, and they're more interested in getting past you than at you. Runners sign a waiver, and the biggest hazard is usually other costumed humans. It's a sprint of a few city blocks, not a marathon.",
        },
        {
          q: "What else happens in Anchorage that day?",
          a: "March 6, 2027 is the busiest day of the Alaska winter: the Iditarod Ceremonial Start runs down 4th Avenue that morning, the reindeer run in the afternoon, and the Rondy Music Fest takes over the Egan Center that evening [confirm]. Book lodging early — it's effectively two festivals sharing one downtown.",
        },
      ],
      ticketInfo:
        "Registration for the most recent running was sold through Eventbrite — one of at least ten separate ticketing and registration systems used across Fur Rondy events today. The official event page at furrondy.net links out to the current sign-up. Spectating is free along the 4th Avenue fence line.",
      priceStatus:
        "2027 registration pricing and wave times are not yet published [confirm] — they'll appear on furrondy.net when the 2027 calendar goes live.",
    },
  },

  // ------------------------------------------------------------------ deep 2
  {
    slug: "world-championship-sled-dog-races",
    name: "Fur Rondy 2027 Open World Championship Sled Dog Races",
    shortName: "World Championship Sled Dog Races",
    date: "Feb 26–28, 2027 [confirm]",
    sortKey: 1,
    isoStart: "2027-02-26",
    isoEnd: "2027-02-28",
    venue: "4th Avenue & D Street start line",
    city: "Anchorage",
    region: "AK",
    category: "race",
    ticketed: "free",
    sourceUrl:
      "https://furrondy.net/events/open-world-championship-sled-dog-races",
    teaser:
      "Three days of world-class sprint mushing out of downtown Anchorage — the crown jewel Rondy has run since 1946, and it's free to watch from the whole 25-mile course.",
    confirm: true,
    accent: "ice",
    deep: {
      metaTitle:
        "Fur Rondy World Championship Sled Dog Races 2027 — Schedule, Course & Where to Watch",
      metaDescription:
        "The Open World Championship Sled Dog Races at Fur Rondy 2027 — three days of sprint mushing from 4th Avenue through the Anchorage trail system. Race history since 1946, how the three-heat format works, and the best free viewing spots.",
      keywords: [
        "Fur Rondy sled dog races 2027",
        "Open World Championship Sled Dog Race Anchorage",
        "Fur Rendezvous sprint mushing",
        "Anchorage sled dog race February 2027",
        "where to watch Fur Rondy dog races",
      ],
      h1: "Open World Championship Sled Dog Races 2027",
      intro:
        "Before the Iditarod existed, this was THE dog race in Alaska. The Open World Championship has run out of downtown Anchorage since 1946 — three consecutive days, one cumulative clock, and teams of sprint dogs that cover ground almost twice as fast as their long-distance cousins.",
      body: [
        "The format is simple and brutal: the same teams run roughly 25 miles a day, three days in a row, and the lowest combined time wins. Sprint mushing is a different sport from the Iditarod's endurance game — bigger teams, faster dogs, and a course that leaves 4th Avenue at a dead run and threads through Anchorage's in-town trail system before looping back downtown.",
        "It's also the most spectator-friendly world championship you'll ever attend. The start line at 4th and D is the classic spot, but the whole course is lined with free vantage points — Cordova Hill, the Chester Creek trail crossings, and neighborhood corners where locals set up lawn chairs, fire pits, and cocoa stands to cheer teams through.",
        "The races traditionally anchor Rondy's first weekend — mapped to February 26–28 in 2027 [confirm] — with the ceremonial bib pull happening downtown a night or two before. Race standings build day over day, so the final Sunday heat regularly comes down to seconds after seventy-five miles of racing.",
        "The event is free to watch everywhere on the course. If you only have one afternoon at Fur Rondy and you want the thing the festival was built around, this is it — the carnival, the blanket toss, and 4th Avenue's vendor booths are all a short walk from the start chute.",
      ],
      faq: [
        {
          q: "When are the 2027 World Championship Sled Dog Races?",
          a: "Traditionally the three heats run Friday through Sunday on Rondy's first weekend — February 26–28 in 2027 [confirm]. Official dates and daily start times will be posted on furrondy.net when the 2027 calendar is published.",
        },
        {
          q: "Is it free to watch?",
          a: "Yes — completely. There's no ticket, no gate, and about 25 miles of course to choose from. The 4th Avenue start chute is the marquee view; the trail crossings give you the full-speed action shots.",
        },
        {
          q: "How is this different from the Iditarod?",
          a: "Distance and speed. The Iditarod is a 1,000-mile endurance run to Nome over more than a week. The Open World Championship is sprint racing: about 25 miles a day at speeds that can top 20 mph, three days, cumulative time. Many Alaskans will tell you the sprint championship is the better spectator event.",
        },
        {
          q: "Who puts on the race?",
          a: "The race is run with the Alaskan Sled Dog & Racing Association (ASDRA), which has organized sprint racing in Anchorage since the 1940s, as part of the Fur Rendezvous festival.",
        },
        {
          q: "Where should I stand for the best view?",
          a: "For the pageantry: the start line at 4th & D. For speed: any of the trail crossings along Cordova Street or the Chester Creek greenbelt. Arrive 30–45 minutes before the first team goes out and you'll walk right up to the fence.",
        },
      ],
      ticketInfo:
        "Free to spectate along the entire course — no ticket system involved. Race operations and entries run through ASDRA (asdra.org), linked from the official furrondy.net event page.",
      priceStatus:
        "Free to watch. 2027 heat dates and start times are not yet published [confirm].",
    },
  },

  // ------------------------------------------------------------------ deep 3
  {
    slug: "first-saturday-downtown",
    name: "Fur Rondy 2027 First Saturday — Grand Parade, Outhouse Races & Fireworks",
    shortName: "First Saturday: Parade, Outhouse Races & Fireworks",
    date: "Saturday, February 27, 2027 [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    venue: "Downtown Anchorage — 5th & 6th Avenues, 4th Avenue, Ship Creek",
    city: "Anchorage",
    region: "AK",
    category: "signature",
    ticketed: "free",
    sourceUrl: "https://furrondy.net/events/rondy-grand-parade",
    teaser:
      "One free downtown day, start to finish: pancake breakfast, the Grand Parade down 5th and 6th, outhouses racing on 4th, and fireworks over Ship Creek after dark.",
    confirm: true,
    accent: "aurora",
    deep: {
      metaTitle:
        "Fur Rondy 2027 First Saturday — Grand Parade, Outhouse Races & Fireworks in One Day",
      metaDescription:
        "How to do Fur Rondy 2027's biggest free day in downtown Anchorage — the pancake breakfast, Grand Parade on 5th & 6th Avenues, the Outhouse Races on 4th, and the Fireworks Extravaganza over Ship Creek. A start-to-finish plan, no tickets required.",
      keywords: [
        "Fur Rondy Grand Parade 2027",
        "Fur Rondy Outhouse Races",
        "Anchorage fireworks Fur Rendezvous",
        "Fur Rondy first weekend schedule",
        "free Fur Rondy events downtown Anchorage",
      ],
      h1: "First Saturday Downtown: Parade to Fireworks",
      intro:
        "Rondy's first Saturday is the festival's best free day, and everything happens within a few walkable blocks. Here's the whole day as one plan — breakfast to parade to racing outhouses to fireworks — the way locals actually do it.",
      body: [
        "Start with the Pioneers of Alaska Pancake Breakfast at Pioneer Hall — a Rondy tradition where sourdoughs flip hotcakes and the line is half the fun. From there it's a five-minute walk to the parade route.",
        "The Grand Parade rolls down 5th and 6th Avenues late morning: marching groups, fur-clad royalty, dog teams, military units from JBER, and floats from every corner of Southcentral Alaska. It's the festival's biggest single crowd, so stake out a curb spot on the sunny side early.",
        "The afternoon belongs to the Outhouse Races on 4th Avenue — teams push custom-built outhouses (one rider required, costumes strongly encouraged) down the snow-packed street in head-to-head heats. It is exactly as dignified as it sounds, and it's been a Rondy institution for decades. The carnival, blanket toss, fur auction stage, and vendor booths all run the same block, so the whole afternoon fills itself.",
        "After dark, walk down toward Ship Creek for the Fireworks Extravaganza — one of the only big fireworks shows in America that happens in February, because in Anchorage it's actually dark enough. The Small Boat Harbor and the Government Hill overlook both give clean sightlines. Dress for standing still in the cold: the show is worth it.",
        "Every event in this itinerary is free. In 2027 this maps to Saturday, February 27 [confirm] — the official day-by-day schedule lands on furrondy.net when Greater Anchorage, Inc. publishes the 2027 calendar.",
      ],
      faq: [
        {
          q: "Is the Grand Parade free?",
          a: "Yes — the parade, the Outhouse Races, the fireworks, and the street festival between them are all free. The only money you'll spend on First Saturday is on pancakes, carnival rides, and hot drinks.",
        },
        {
          q: "What time does the parade start?",
          a: "The 2027 start time isn't posted yet [confirm]; the parade traditionally steps off late morning on the first Saturday, running down 5th Avenue and back along 6th. Check furrondy.net for the official 2027 time before you go.",
        },
        {
          q: "What are the Outhouse Races, exactly?",
          a: "Teams build (or borrow) an outhouse on skis, put one brave member on the throne, and push it down 4th Avenue against another team's outhouse. Heats run all afternoon. There are trophies. Nobody involved takes it — or themselves — seriously.",
        },
        {
          q: "Where's the best place to watch the fireworks?",
          a: "The show fires over the Ship Creek area. The Small Boat Harbor lot and the Government Hill side both work well; anywhere with a clear north-facing view from downtown catches most of it. Arrive early for parking and keep the car warm.",
        },
        {
          q: "Is there a paid option for the fireworks?",
          a: "In recent years a separate indoor fireworks watch party has been offered through its own ticketing page (sold via event.gives in 2026) — one of the many separate systems Rondy events currently sell through. The fireworks themselves are free from anywhere with a sightline.",
        },
      ],
      ticketInfo:
        "No tickets needed for any of it — parade, outhouse races, and fireworks are free public events. The one paid add-on in recent years, an indoor fireworks watch party, sold through event.gives, separate from every other Rondy ticketing system.",
      priceStatus:
        "Free. 2027 parade step-off and fireworks times are not yet published [confirm].",
    },
  },

  // ------------------------------------------------------------------ deep 4
  {
    slug: "rondy-carnival",
    name: "Fur Rondy 2027 Carnival",
    shortName: "Rondy Carnival",
    date: "Feb 25 – Mar 7, 2027 [confirm]",
    sortKey: 0,
    isoStart: "2027-02-25",
    isoEnd: "2027-03-07",
    venue: "3rd Avenue & E Street",
    city: "Anchorage",
    region: "AK",
    category: "family",
    ticketed: "onsite",
    ticketVia: "On-site sales",
    sourceUrl: "https://furrondy.net/events/rondy-carnival",
    teaser:
      "A full midway of carnival rides running outdoors through an Anchorage winter — Ferris wheel views of the Chugach included. Runs the entire festival.",
    confirm: true,
    accent: "violet",
    deep: {
      metaTitle:
        "Rondy Carnival 2027 — Anchorage's Winter Carnival Midway, Rides & Hours",
      metaDescription:
        "The Fur Rondy 2027 Carnival at 3rd & E in downtown Anchorage — a real midway of rides and games running outdoors in February. What it is, when it runs across the full festival window, and how ride tickets work.",
      keywords: [
        "Rondy Carnival 2027",
        "Fur Rondy carnival rides Anchorage",
        "Anchorage winter carnival",
        "Fur Rendezvous carnival 3rd and E",
        "carnival rides in the snow Alaska",
      ],
      h1: "Rondy Carnival 2027",
      intro:
        "Most carnivals fold up when it snows. This one waits for it. The Rondy Carnival sets up a full midway at 3rd and E — Ferris wheel, spinning rides, games, fry bread — and runs it straight through an Anchorage winter, every day of the festival.",
      body: [
        "The carnival is Rondy's constant: while individual events come and go across the eleven-day festival, the midway at 3rd Avenue and E Street runs the whole window — mapped to February 25 through March 7 in 2027 [confirm]. Evening is the magic hour, when the ride lights come up against the winter dark and you can see the lit-up Ferris wheel from half of downtown.",
        "Yes, the rides run in the cold. The carnival has operated through Rondy weather for generations — dress like you're going sledding, not like you're going to a fair in July, and the Ferris wheel at dusk over the Cook Inlet is one of the best views in the city.",
        "Ride tickets and wristbands are sold on-site at the carnival booths — there's currently no online sales channel for the midway, so plan on buying when you arrive. The carnival sits one block off 4th Avenue's festival core, which means it pairs naturally with everything else: sled dog races, the blanket toss, the fur auction, and the vendor booths are all within two blocks.",
        "It's the most kid-friendly anchor of the festival, and the classic move is to promise the carnival as the reward after a day of spectating. Budget accordingly.",
      ],
      faq: [
        {
          q: "When is the Rondy Carnival open in 2027?",
          a: "The carnival traditionally runs the entire festival window — February 25 through March 7 in 2027 [confirm]. Daily hours vary (weekday evenings, longer weekend hours) and will be posted on furrondy.net with the official 2027 schedule.",
        },
        {
          q: "How do I buy ride tickets?",
          a: "At the carnival itself — ride tickets and passes are sold on-site at the booth. There's no advance online sales channel for the midway today.",
        },
        {
          q: "Do the rides really operate in winter?",
          a: "They do — it's the carnival's whole identity. Rides run through normal Anchorage winter conditions, with weather calls made on-site for extreme days. Dress in real winter layers; the wind chill on the Ferris wheel is part of the experience.",
        },
        {
          q: "Where is it?",
          a: "3rd Avenue & E Street, downtown Anchorage — one block from the 4th Avenue festival core, an easy walk from the sled dog start line, the blanket toss, and the Running of the Reindeer route.",
        },
      ],
      ticketInfo:
        "Ride tickets and wristbands are sold on-site only — the midway is one of the few Rondy attractions with no online ticketing at all, alongside events that sell through Eventbrite, CenterTix, MyAlaskaTix, and half a dozen other separate systems.",
      priceStatus:
        "2027 ride ticket and wristband pricing is set at the carnival booth; hours and pricing are not published online [confirm].",
    },
  },

  // ------------------------------------------------------------------ deep 5
  {
    slug: "rondy-music-fest",
    name: "Fur Rondy 2027 Music Fest — Oktoberrrfest, Silent Disco & 80s Tribute",
    shortName: "Rondy Music Fest (3 shows)",
    date: "Saturday, March 6, 2027 [confirm]",
    sortKey: 9,
    isoStart: "2027-03-06T17:00:00-09:00",
    venue: "Egan Center",
    city: "Anchorage",
    region: "AK",
    category: "nightlife",
    ticketed: "paid",
    ticketVia: "MyAlaskaTix",
    sourceUrl: "https://furrondy.net/events/rondy-music-fest",
    teaser:
      "Three events under one roof on the festival's final Saturday night — Oktoberrrfest, a silent disco, and an 80s tribute — currently sold as three separate tickets.",
    confirm: true,
    accent: "midnight",
    deep: {
      metaTitle:
        "Rondy Music Fest 2027 — Oktoberrrfest, Silent Disco & 80s Tribute at the Egan Center",
      metaDescription:
        "Fur Rondy 2027's Music Fest packs three shows into the Egan Center on the festival's final Saturday night — Oktoberrrfest, a silent disco, and an 80s tribute act. How the three-event night works, and how ticketing for it is currently sold.",
      keywords: [
        "Rondy Music Fest 2027",
        "Fur Rondy Oktoberrrfest",
        "Fur Rondy silent disco Egan Center",
        "Anchorage 80s tribute concert Fur Rondy",
        "Fur Rendezvous nightlife 2027",
      ],
      h1: "Rondy Music Fest 2027",
      intro:
        "Rondy's closing Saturday doesn't end when the reindeer cross the finish line. That night the Egan Center turns into three parties under one roof — an Oktoberrrfest hall (the extra R's are for the cold), a silent disco, and a full 80s tribute show.",
      body: [
        "The Music Fest is the festival's big indoor night: one venue, one evening — 5 to 11 PM in its 2026 edition — and three distinct events running as a triple bill. Oktoberrrfest brings the beer-hall energy with Alaska brewers; the silent disco hands you the headphones and three channels of DJs; and the 80s tribute act closes the main stage.",
        "Here's the quirk attendees should know going in: the three shows are currently listed as three separate events with three separate ticket purchases, all pointing into the same MyAlaskaTix event page. If you're planning the full night, check what each ticket actually admits you to before you buy — and watch furrondy.net for whether 2027 offers a combined pass.",
        "The timing makes it the nightcap of the biggest day in Alaska's winter: March 6, 2027 is also the traditional slot for the Running of the Reindeer down 4th Avenue and the morning's Iditarod Ceremonial Start [confirm]. The Egan Center sits right on 5th Avenue in the middle of it all — you can spectate all day and walk to the show.",
        "It's a 21-and-up-leaning night (the Oktoberrrfest hall in particular); check age policies per show when 2027 details post.",
      ],
      faq: [
        {
          q: "Is the Music Fest one ticket or three?",
          a: "In the most recent edition, Oktoberrrfest, the Silent Disco, and the 80s Tribute were listed as three separate ticketed events — sold through MyAlaskaTix — even though they share the Egan Center on the same night. Verify what your ticket covers before buying, and watch for 2027 bundle options on furrondy.net.",
        },
        {
          q: "When is it?",
          a: "Traditionally the festival's final Saturday night — March 6, 2027, mapped from the 2026 pattern [confirm]. The 2026 edition ran 5:00–11:00 PM at the Egan Center.",
        },
        {
          q: "What's a silent disco?",
          a: "Everyone gets wireless headphones with multiple DJ channels; you pick your channel and dance. To anyone without headphones the room is nearly quiet, which is half the entertainment — and it means three parties can share one building without drowning each other out.",
        },
        {
          q: "Is it 21+?",
          a: "Age policy has varied by show — the beer-hall portions lean 21+. Check the individual event listings when 2027 tickets go live.",
        },
        {
          q: "How does it fit with the rest of the final Saturday?",
          a: "Perfectly — that's the design. Iditarod Ceremonial Start in the morning, Running of the Reindeer in the late afternoon, Music Fest at night, all within about six downtown blocks [confirm]. It's the one day to build your whole Rondy trip around.",
        },
      ],
      ticketInfo:
        "The three Music Fest shows currently sell as three separate tickets through MyAlaskaTix — a different system from the Eventbrite listings, CenterTix shows, and RunSignup registrations used elsewhere in the same festival. All three link from the official furrondy.net event pages.",
      priceStatus:
        "2027 lineups, per-show pricing, and any combined-pass option are not yet published [confirm].",
    },
  },

  // ------------------------------------------------------------------ deep 6
  {
    slug: "rondy-melodrama",
    name: "Fur Rondy 2027 Melodrama",
    shortName: "Fur Rondy Melodrama",
    date: "Feb 26 – Mar 7, 2027, showtimes vary [confirm]",
    sortKey: 1,
    isoStart: "2027-02-26",
    isoEnd: "2027-03-07",
    venue: "49th State Brewery — Heritage Theatre",
    city: "Anchorage",
    region: "AK",
    category: "nightlife",
    ticketed: "paid",
    ticketVia: "CenterTix",
    sourceUrl:
      "https://furrondy.net/events/fur-rondy-melodrama-pirates-of-the-aleutians-salloon-girls-gone-wild",
    teaser:
      "A gloriously over-acted, boo-the-villain stage show that runs nearly every night of the festival — a Rondy classic performed with a drink in reach.",
    confirm: true,
    accent: "ember",
    deep: {
      metaTitle:
        "Fur Rondy Melodrama 2027 — Showtimes, Tickets & What to Expect at the Heritage Theatre",
      metaDescription:
        "The Fur Rondy 2027 Melodrama at 49th State Brewery's Heritage Theatre — Anchorage's boo-the-villain, cheer-the-hero saloon theater tradition, running showtimes across nearly the whole festival. What it is, why locals never miss it, and how tickets work.",
      keywords: [
        "Fur Rondy Melodrama 2027",
        "Rondy melodrama tickets",
        "49th State Brewery Heritage Theatre",
        "Anchorage melodrama show",
        "Fur Rendezvous theater 2027",
      ],
      h1: "Fur Rondy Melodrama 2027",
      intro:
        "Every festival needs one indoor tradition for the coldest nights, and Rondy's is the Melodrama: an intentionally over-the-top saloon-era stage show where the audience's job is to cheer the hero, boo the villain, and never, ever take it seriously.",
      body: [
        "The Melodrama is community theater in the best Alaska sense — a rotating cast of locals, a script stuffed with Anchorage in-jokes and gold-rush-era villainy, and production values that are exactly as serious as a show titled like a B-movie needs to be. Recent editions carried names like 'Pirates of the Aleutians' — the titles alone tell you the tone.",
        "It runs at the Heritage Theatre inside 49th State Brewery downtown, with showtimes spread across nearly the entire festival — mapped to February 26 through March 7 in 2027 [confirm]. That makes it the easiest Rondy event to actually fit into a trip: whatever your schedule, there's probably a performance that night.",
        "Tickets are sold through CenterTix, the Alaska Center for the Performing Arts' box-office system — a different platform from the Eventbrite events, the MyAlaskaTix Music Fest, and the various registration systems used across the same festival. The venue serves its own beer and a full menu, which is very much part of the format: this is dinner theater where heckling is encouraged.",
        "Shows often sell out on the weekends around the parade and the reindeer run. If your dates overlap the two big Saturdays, book the Melodrama early and anchor your evenings around it.",
      ],
      faq: [
        {
          q: "What exactly is a melodrama?",
          a: "A deliberately hammy throwback to frontier-saloon theater: clear-cut hero, mustache-twirling villain, damsel, narrator — and an audience armed with cheers, boos, and hisses as part of the script. It's interactive, family-tolerant but adult-funny, and a Rondy institution.",
        },
        {
          q: "When does it play in 2027?",
          a: "Showtimes traditionally run across almost the whole festival — February 26 to March 7 in 2027, mapped from the 2026 pattern [confirm]. Exact dates and curtain times post on furrondy.net and CenterTix when the 2027 season is announced.",
        },
        {
          q: "Where do I buy tickets?",
          a: "Through CenterTix (centertix.com), linked from the official furrondy.net event page. Note that this is a different ticketing system from most other Rondy events — buying your reindeer registration won't show you melodrama seats.",
        },
        {
          q: "Is there food and drink?",
          a: "Yes — it plays in the Heritage Theatre at 49th State Brewery, so the brewery's beer and menu are part of the night. Arrive early enough to order before curtain.",
        },
      ],
      ticketInfo:
        "Sold through CenterTix, the performing-arts box office — separate from the Eventbrite, MyAlaskaTix, RunSignup, and other systems used by the rest of the festival's ticketed events. The official furrondy.net event page links to the current listing.",
      priceStatus:
        "2027 title, showtimes, and pricing are not yet announced [confirm].",
    },
  },

  // ----------------------------------------------------- the rest of the slate
  {
    slug: "rondyritaville-kickoff",
    name: "Rondy Kickoff Party: Wasting Away in Rondyrittaville",
    shortName: "Kickoff: Rondyrittaville (21+)",
    date: "Friday, February 26, 2027 [confirm]",
    sortKey: 1,
    isoStart: "2027-02-26",
    venue: "Egan Center",
    city: "Anchorage",
    region: "AK",
    category: "nightlife",
    ticketed: "paid",
    ticketVia: "Eventbrite",
    sourceUrl: "https://furrondy.net/events/rondyritaville",
    teaser:
      "The festival's opening-night beach party — tropical shirts, margaritas, and 20°F outside. Alaska's finest act of collective denial.",
    confirm: true,
    accent: "violet",
  },
  {
    slug: "snow-sculpture-championship",
    name: "Alaska State Snow Sculpture Championship",
    shortName: "Snow Sculpture Championship",
    date: "Late Feb – Mar 2027, on display daily [confirm]",
    sortKey: -1,
    isoStart: "2027-02-20",
    isoEnd: "2027-02-28",
    venue: "Ship Creek Avenue",
    city: "Anchorage",
    region: "AK",
    category: "family",
    ticketed: "free",
    sourceUrl:
      "https://furrondy.net/events/alaska-state-snow-sculpture-championship",
    teaser:
      "Teams carve building-sized blocks of snow into art along Ship Creek — free to wander, best seen twice: mid-carve and finished.",
    confirm: true,
    accent: "ice",
  },
  {
    slug: "frostbite-footrace",
    name: "Frostbite Footrace, Costume Fun Run & Frosty Paw Dog Jog",
    shortName: "Frostbite Footrace & Costume Fun Run",
    date: "Saturday, February 27, 2027 [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    venue: "Downtown Anchorage",
    city: "Anchorage",
    region: "AK",
    category: "race",
    ticketed: "register",
    ticketVia: "RunSignup",
    sourceUrl: "https://furrondy.net/events/frostbite-footrace",
    teaser:
      "Three races in one morning — a competitive 5K, a costume fun run, and a dog jog — before the Grand Parade takes the streets.",
    confirm: true,
    accent: "aurora",
  },
  {
    slug: "talent-competition",
    name: "Great Alaska Talent Competition",
    shortName: "Great Alaska Talent Competition",
    date: "Prelims Feb 25 & 27 · Finals Mar 4, 2027 [confirm]",
    sortKey: 0,
    isoStart: "2027-02-25",
    isoEnd: "2027-03-04",
    venue: "Williwaw Social · Finals at Discovery Theatre, Alaska PAC",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "paid",
    ticketVia: "Eventbrite + CenterTix",
    sourceUrl:
      "https://furrondy.net/events/great-alaska-talent-competition-preliminaries",
    teaser:
      "Alaska's best amateur acts battle through club prelims to a finals night on the Discovery Theatre stage — currently ticketed through two different systems.",
    confirm: true,
    accent: "midnight",
  },
  {
    slug: "curling-bonspiel",
    name: "Fur Rondy Open Curling Bonspiel",
    shortName: "Rondy Curling Bonspiel",
    date: "Feb 25–28, 2027 [confirm]",
    sortKey: 0,
    isoStart: "2027-02-25",
    isoEnd: "2027-02-28",
    venue: "Anchorage Curling Club",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "register",
    ticketVia: "Curling.io",
    sourceUrl:
      "https://furrondy.net/events/69th-annual-fur-rondy-curling-bonspiel",
    teaser:
      "One of the longest-running bonspiels in Alaska — team registration to play, free to wander in and watch with a beverage.",
    confirm: true,
    accent: "ice",
  },
  {
    slug: "blanket-toss",
    name: "Fur Rondy Blanket Toss",
    shortName: "Blanket Toss",
    date: "Daily during the festival core [confirm]",
    sortKey: 2,
    isoStart: "2027-02-26",
    isoEnd: "2027-03-06",
    venue: "3rd Avenue & E Street",
    city: "Anchorage",
    region: "AK",
    category: "signature",
    ticketed: "free",
    sourceUrl: "https://furrondy.net/events/blanket-toss",
    teaser:
      "The Alaska Native tradition at the heart of Rondy since 1950 — dozens of pullers launch a jumper skyward off a walrus-hide blanket. Free, downtown, unforgettable.",
    confirm: true,
    accent: "aurora",
  },
  {
    slug: "outdoor-hockey-tournament",
    name: "Fur Rondy World Championship Outdoor Hockey Tournament",
    shortName: "Outdoor Hockey Tournament",
    date: "Runs the full festival [confirm]",
    sortKey: 0,
    isoStart: "2027-02-25",
    isoEnd: "2027-03-07",
    venue: "Cusack Memorial Outdoor Rinks",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "register",
    ticketVia: "Eventbrite",
    sourceUrl: "https://furrondy.net/events/outdoor-hockey-tournament",
    teaser:
      "Pond-hockey-style world championship on outdoor ice, running bracket play across the whole festival. Team entry to play; free to watch.",
    confirm: true,
    accent: "ice",
  },
  {
    slug: "snowshoe-softball",
    name: "Rondy Snowshoe Softball Classic",
    shortName: "Snowshoe Softball",
    date: "Feb 27–28, 2027 [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    isoEnd: "2027-02-28",
    venue: "Kosinski Fields",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "register",
    ticketVia: "anchoragesports.com",
    sourceUrl: "https://furrondy.net/events/snowshoe-softball",
    teaser:
      "Softball, except everyone's in snowshoes and the outfield is two feet of powder. Exactly as graceful as it sounds.",
    confirm: true,
    accent: "violet",
  },
  {
    slug: "rondyball-pickleball",
    name: "RondyBall Pickleball Tournament",
    shortName: "RondyBall Pickleball",
    date: "Feb 25–27, 2027 [confirm]",
    sortKey: 0,
    isoStart: "2027-02-25",
    isoEnd: "2027-02-27",
    venue: "Arctic Recreation Center",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "register",
    ticketVia: "Global Pickleball Network",
    sourceUrl: "https://furrondy.net/events/rondy-pickleball",
    teaser:
      "The festival's newest bracket — indoor pickleball with Rondy bragging rights on the line.",
    confirm: true,
    accent: "midnight",
  },
  {
    slug: "pancake-breakfast",
    name: "Pioneers of Alaska Pancake Breakfast",
    shortName: "Pioneers Pancake Breakfast",
    date: "Saturday, February 27, 2027 [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    venue: "Pioneer Hall",
    city: "Anchorage",
    region: "AK",
    category: "family",
    ticketed: "onsite",
    sourceUrl:
      "https://www.furrondy.net/events/pioneers-of-alaska-pancake-breakfast",
    teaser:
      "Sourdough hotcakes served by actual sourdoughs before the Grand Parade — the correct way to start First Saturday.",
    confirm: true,
    accent: "ember",
  },
  {
    slug: "ice-bowling",
    name: "Rondy Ice Bowling",
    shortName: "Ice Bowling",
    date: "Feb 27 – Mar 7, 2027 [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    isoEnd: "2027-03-07",
    venue: "Peanut Farm Pond",
    city: "Anchorage",
    region: "AK",
    category: "family",
    ticketed: "onsite",
    sourceUrl: "https://furrondy.net/events/ice-bowling",
    teaser:
      "Bowling on a frozen pond with pins that don't stand a chance. A midweek classic when you need one more excuse to be outside.",
    confirm: true,
    accent: "ice",
  },
  {
    slug: "native-arts-market",
    name: "Charlotte Jensen Native Arts Market",
    shortName: "Charlotte Jensen Native Arts Market",
    date: "Mar 3–6, 2027 [confirm]",
    sortKey: 6,
    isoStart: "2027-03-03",
    isoEnd: "2027-03-06",
    venue: "The Dimond Center",
    city: "Anchorage",
    region: "AK",
    category: "market",
    ticketed: "free",
    sourceUrl:
      "https://furrondy.net/events/charlotte-jensen-native-arts-market",
    teaser:
      "Alaska Native artists selling carving, beadwork, skin-sewing, and jewelry direct — one of the best places in the state to buy authentic Native art.",
    confirm: true,
    accent: "aurora",
  },
  {
    slug: "fur-auction",
    name: "Alaska Trappers Association Fur Auction & State Hide + Horn Auction",
    shortName: "Fur Auction & Hide + Horn",
    date: "Second weekend, 3rd & E stage [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    isoEnd: "2027-03-07",
    venue: "3rd Avenue & E Street",
    city: "Anchorage",
    region: "AK",
    category: "market",
    ticketed: "free",
    sourceUrl: "https://furrondy.net/events/fur-auction-hide-and-horn",
    teaser:
      "The festival's namesake: live-auctioned furs from Alaska trappers, plus the State of Alaska's hide and horn auction. Rondy started as exactly this, in 1935.",
    confirm: true,
    accent: "ember",
  },
  {
    slug: "cornhole-championships",
    name: "Fur Rondy Alaska Cornhole Championships & Ice Breaker Tournament",
    shortName: "Cornhole Championships",
    date: "Mar 5–7, 2027 [confirm]",
    sortKey: 8,
    isoStart: "2027-03-05",
    isoEnd: "2027-03-07",
    venue: "Moose Lodge 1534 · Dimond Center",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "register",
    ticketVia: "Eventbrite",
    sourceUrl: "https://furrondy.net/events/alaska-cornhole-championships",
    teaser:
      "An ice-breaker Friday tournament and a weekend state championship — brackets for everyone from first-timers to the terrifyingly accurate.",
    confirm: true,
    accent: "violet",
  },
  {
    slug: "holdem-tournament",
    name: "Alaska Hold'Em Tournament of Champions",
    shortName: "Alaska Hold'Em Tournament",
    date: "Saturday, March 6, 2027 [confirm]",
    sortKey: 9,
    isoStart: "2027-03-06",
    venue: "Dena'ina Civic & Convention Center",
    city: "Anchorage",
    region: "AK",
    category: "competition",
    ticketed: "register",
    sourceUrl:
      "https://furrondy.net/events/alaska-holdem-tournament-of-champions",
    teaser:
      "Texas Hold'Em, Alaska stakes — a tournament of champions at the Dena'ina Center on the festival's biggest day.",
    confirm: true,
    accent: "midnight",
  },
  {
    slug: "fireworks-watch-party",
    name: "Rondy Fireworks Watch Party",
    shortName: "Fireworks Watch Party",
    date: "Saturday, February 27, 2027 [confirm]",
    sortKey: 2,
    isoStart: "2027-02-27",
    venue: "Ship Creek area",
    city: "Anchorage",
    region: "AK",
    category: "nightlife",
    ticketed: "paid",
    ticketVia: "event.gives",
    sourceUrl: "https://furrondy.net/events/fireworks-watch-party",
    teaser:
      "The warm-side option: an indoor ticketed party with a front-row view of the Fireworks Extravaganza over Ship Creek.",
    confirm: true,
    accent: "violet",
  },
  {
    slug: "big-fat-ride",
    name: "Rondy Big Fat Ride",
    shortName: "Big Fat Ride",
    date: "During the festival [confirm]",
    sortKey: 3,
    isoStart: "2027-02-28",
    venue: "Downtown Anchorage",
    city: "Anchorage",
    region: "AK",
    category: "race",
    ticketed: "register",
    ticketVia: "Zeffy",
    sourceUrl: "https://furrondy.net/events/rondy-big-fat-ride",
    teaser:
      "A mass fat-tire bike cruise through snowy downtown — Anchorage's favorite way to prove winter is a cycling season.",
    confirm: true,
    accent: "aurora",
  },
  {
    slug: "skate-with-the-critters",
    name: "Westchester Family Skate — Skating with the Critters",
    shortName: "Skating with the Critters",
    date: "Final weekend, Westchester Lagoon [confirm]",
    sortKey: 10,
    isoStart: "2027-03-07",
    venue: "Westchester Lagoon",
    city: "Anchorage",
    region: "AK",
    category: "family",
    ticketed: "free",
    sourceUrl: "https://furrondy.net/events/skating-with-the-critters",
    teaser:
      "A free family skate on the lagoon with costumed critters on the ice — the festival's gentle wind-down.",
    confirm: true,
    accent: "ice",
  },
  {
    slug: "iditarod-ceremonial-start",
    name: "Iditarod 55 Ceremonial Start (on the Rondy calendar)",
    shortName: "Iditarod Ceremonial Start",
    date: "Saturday, March 6, 2027",
    sortKey: 9,
    isoStart: "2027-03-06T10:00:00-09:00",
    venue: "4th Avenue & D Street",
    city: "Anchorage",
    region: "AK",
    category: "signature",
    ticketed: "free",
    sourceUrl: "https://iditarod.com/calendar/",
    teaser:
      "The Last Great Race ceremonially starts down 4th Avenue on Rondy's final Saturday — the two festivals share the street, the crowd, and the best day of the Alaska winter.",
    confirm: false,
    accent: "midnight",
  },
];

/** Featured events — the six with full landing pages. */
export const deepEvents = events.filter(
  (e): e is RondyEvent & { deep: RondyDeepContent } => Boolean(e.deep)
);

export function getEvent(slug: string) {
  return deepEvents.find((e) => e.slug === slug);
}

/** Distinct ticketing/registration systems in use across the slate today. */
export const ticketSystems = Array.from(
  new Set(events.map((e) => e.ticketVia).filter(Boolean))
) as string[];

/** Human labels for the category filter chips. */
export const categoryLabels: Record<RondyCategory, string> = {
  signature: "Signature",
  race: "Races",
  nightlife: "Nightlife & shows",
  competition: "Tournaments",
  family: "Family",
  market: "Markets & auctions",
};
