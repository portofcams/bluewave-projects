// Iditarod 2027 — grounded event data for the BlueWave Projects sample pitch.
//
// SOURCE OF TRUTH: https://iditarod.com/calendar/ (verified live).
// Official 2027 dates: Musher's Banquet Mar 4 (Dena'ina Center), Ceremonial
// Start Mar 6 (Downtown Anchorage), Restart Mar 7 (Willow), Finisher's Banquet
// Mar 21 (Nome). 2027 is the 55th running (2025 ran the 53rd).
//
// Anything not published on the official calendar is marked "[confirm]" — these
// are real recurring events whose 2027 prices/exact dates are not yet posted.
// Per the brief: do NOT invent prices, table tiers, or attendance figures.

export type IditarodEvent = {
  slug: string;
  /** Card + hero name */
  name: string;
  /** Short label used on the hub card */
  shortName: string;
  /** Human-readable date string (verbatim from calendar where possible) */
  date: string;
  /** ISO 8601 start for schema.org (local Alaska time, -09:00) */
  isoStart: string;
  /** Optional ISO end */
  isoEnd?: string;
  location: string;
  /** Schema.org address parts */
  venue: string;
  city: string;
  region: string; // AK
  /** Whether this is a paid/ticketed event vs. free-to-spectate */
  ticketed: "paid" | "free-spectate" | "auction";
  /** One-line value/teaser for the card */
  teaser: string;
  /** Longer ticket reality used on the detail page */
  ticketInfo: string;
  /** Status of pricing certainty */
  priceStatus: string;
  sourceUrl: string;
  // --- SEO landing page content ---
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  /** Body paragraphs for the detail page */
  body: string[];
  faq: { q: string; a: string }[];
  /** Hero gradient accent (Tailwind class fragment) */
  accent: "ice" | "lava" | "ocean" | "glacier" | "aurora";
};

export const SITE = "https://bluewaveprojects.com";
export const HUB_PATH = "/demos/iditarod-2027";

export const events: IditarodEvent[] = [
  {
    slug: "mushers-banquet",
    name: "Iditarod 2027 Musher's Meet & Greet and Drawing Banquet",
    shortName: "Musher's Banquet & Bib Draw",
    date: "Thursday, March 4, 2027",
    isoStart: "2027-03-04T17:30:00-09:00",
    location: "Dena'ina Civic & Convention Center, Anchorage, AK",
    venue: "Dena'ina Civic & Convention Center",
    city: "Anchorage",
    region: "AK",
    ticketed: "paid",
    teaser:
      "The flagship paid event: plated dinner, live & silent fundraising auction, fan autograph meet-and-greet, and the mushers' bib draw.",
    ticketInfo:
      "This is the flagship ticketed event of race week — a plated dinner with a live and silent fundraising auction, the fan autograph and meet-and-greet, and the mushers' bib draw that sets the starting order. Tickets are not sold on iditarod.com itself: the official \"Musher's Banquet\" link 301-redirects out to a third-party fundraising-auction platform (iditarod.com → auctria.events → app.auctria.com). Prior-year individual seats and table sponsorships were sold there.",
    priceStatus:
      "Exact 2027 individual-seat and table-sponsorship pricing [confirm] once the Auctria event for 2027 opens.",
    sourceUrl: "https://iditarod.com/calendar/",
    metaTitle:
      "Iditarod 2027 Musher's Banquet Tickets — Drawing Banquet, Dena'ina Center, March 4",
    metaDescription:
      "How to attend the Iditarod 2027 Musher's Meet & Greet and Drawing Banquet — Thursday, March 4, 2027 at the Dena'ina Center in Anchorage. Dinner, fundraising auction, autograph meet-and-greet, and the mushers' bib draw. Ticket details and how the banquet sale works.",
    keywords: [
      "Iditarod 2027 mushers banquet tickets",
      "Iditarod banquet Dena'ina Center March 2027",
      "Iditarod 2027 drawing banquet",
      "Iditarod bib draw 2027",
      "Iditarod 2027 schedule and dates",
    ],
    h1: "Iditarod 2027 Musher's Banquet & Bib Draw — Anchorage, March 4",
    intro:
      "The Musher's Meet & Greet and Drawing Banquet is the social and fundraising centerpiece of Iditarod race week. It is where fans share a room with the mushers, the live auction raises money for the trail, and the bib draw sets who leaves the chute first.",
    body: [
      "Held Thursday, March 4, 2027 at the Dena'ina Civic & Convention Center in downtown Anchorage, the banquet pairs a plated dinner with a live and silent fundraising auction, a fan autograph and meet-and-greet session, and the mushers' bib draw that determines the starting order for the 2027 race.",
      "It is the highest-intent night of the season for a fan — the one event people fly in for, buy a table for, and bring family to. That makes it the single most important ticket the Iditarod Trail Committee sells.",
      "Today, buying that ticket means leaving iditarod.com. The official \"Musher's Banquet\" link performs a double redirect out to a third-party fundraising-auction tool (iditarod.com → auctria.events → app.auctria.com), so the buyer finishes the purchase on a generic auction interface rather than on the Iditarod brand. This sample page shows what a first-party banquet ticket page could look like instead.",
    ],
    faq: [
      {
        q: "When and where is the Iditarod 2027 Musher's Banquet?",
        a: "Thursday, March 4, 2027, at the Dena'ina Civic & Convention Center in downtown Anchorage, Alaska. The date and venue are published on the official Iditarod calendar at iditarod.com/calendar.",
      },
      {
        q: "What happens at the banquet?",
        a: "A plated dinner, a live and silent fundraising auction, a fan autograph and meet-and-greet with the mushers, and the bib draw that sets the starting order for the race.",
      },
      {
        q: "How much are tickets?",
        a: "Exact 2027 individual-seat and table-sponsorship pricing is not yet published. In prior years tickets and table sponsorships were sold through a third-party auction platform. Confirm current pricing on the official Iditarod ticketing link when it opens for 2027.",
      },
      {
        q: "Where do I buy banquet tickets?",
        a: "On the official site the \"Musher's Banquet\" link currently redirects out to a third-party fundraising-auction platform (Auctria). Always purchase through the link published by the Iditarod Trail Committee on iditarod.com.",
      },
    ],
    accent: "aurora",
  },
  {
    slug: "ceremonial-start",
    name: "Iditarod 2027 Ceremonial Start",
    shortName: "Ceremonial Start",
    date: "Saturday, March 6, 2027 · 10:00 AM",
    isoStart: "2027-03-06T10:00:00-09:00",
    location: "Downtown Anchorage (4th Avenue), AK",
    venue: "4th Avenue, Downtown Anchorage",
    city: "Anchorage",
    region: "AK",
    ticketed: "auction",
    teaser:
      "Free to watch along 4th Avenue — but the Idita-Rider sled seat (ride the ceremonial leg) and VIP grandstand views are sold by auction.",
    ticketInfo:
      "The Ceremonial Start is free to spectate along the downtown Anchorage route, but it is also one of the most ticketable experiences of the race. Official \"Idita-Rider\" auction seats put a fan in a musher's sled for the ceremonial leg, and VIP / grandstand viewing has been sold in past years through auctions and tour packages. There is no first-party ticketing widget on iditarod.com — these high-margin experiences are currently routed through auctions and outside tour operators.",
    priceStatus: "2027 Idita-Rider auction and VIP pricing [confirm].",
    sourceUrl: "https://iditarod.com/calendar/",
    metaTitle:
      "Iditarod Ceremonial Start 2027 Anchorage — Idita-Rider Sled Seat & VIP Tickets, March 6",
    metaDescription:
      "Iditarod 2027 Ceremonial Start in downtown Anchorage — Saturday, March 6, 2027 at 10:00 AM. Free to watch along 4th Avenue, plus how the Idita-Rider auction sled seat and VIP grandstand experiences work. The 2027 ceremonial start guide.",
    keywords: [
      "Iditarod ceremonial start 2027 Anchorage tickets",
      "Iditarod Idita-Rider auction seat 2027",
      "Iditarod VIP race start experience tickets",
      "how to attend the Iditarod 2027",
      "Iditarod 2027 schedule and dates",
    ],
    h1: "Iditarod 2027 Ceremonial Start — Downtown Anchorage, March 6",
    intro:
      "The Ceremonial Start is the photogenic kickoff of the Iditarod: teams run a short, festive leg through downtown Anchorage in front of the biggest crowd of the year. Watching is free — but riding in a sled is the experience fans pay real money for.",
    body: [
      "The 2027 Ceremonial Start runs Saturday, March 6, 2027 at 10:00 AM down 4th Avenue in downtown Anchorage. Anyone can line the route and watch for free.",
      "The paid experience is the Idita-Rider program: an auction seat that puts a fan in a musher's sled basket for the ceremonial leg, plus VIP and grandstand viewing packages that have been sold in past years. These are the highest-margin fan experiences of the entire race.",
      "Right now there is no first-party way to buy them on iditarod.com — Idita-Rider seats go through auction, and premium viewing is largely handled by outside tour operators. This sample page shows how the Iditarod Trail Committee could sell the sled seat and VIP viewing directly, on its own brand, instead of handing that margin to resellers.",
    ],
    faq: [
      {
        q: "When is the Iditarod 2027 Ceremonial Start?",
        a: "Saturday, March 6, 2027 at 10:00 AM in downtown Anchorage, Alaska, per the official Iditarod calendar at iditarod.com/calendar.",
      },
      {
        q: "Is the Ceremonial Start free?",
        a: "Yes — spectating along the 4th Avenue route in downtown Anchorage is free and open to the public.",
      },
      {
        q: "What is an Idita-Rider seat?",
        a: "An Idita-Rider seat is an auctioned spot riding in a musher's sled for the ceremonial leg of the race. It has historically been sold via auction rather than a fixed-price ticket.",
      },
      {
        q: "How much is an Idita-Rider seat or VIP viewing for 2027?",
        a: "2027 Idita-Rider auction and VIP pricing is not yet published. Confirm details through the official Iditarod Trail Committee channels when they open.",
      },
    ],
    accent: "ocean",
  },
  {
    slug: "restart-willow",
    name: "Iditarod 2027 Official Restart",
    shortName: "Official Restart (Willow)",
    date: "Sunday, March 7, 2027 · 2:00 PM",
    isoStart: "2027-03-07T14:00:00-09:00",
    location: "Willow, AK (Willow Lake)",
    venue: "Willow Lake",
    city: "Willow",
    region: "AK",
    ticketed: "free-spectate",
    teaser:
      "The competitive start where the clock really begins. A strong candidate for paid VIP, heated-tent, or parking passes — none sold direct today.",
    ticketInfo:
      "The Official Restart is the competitive start of the race — the point where the timed run to Nome actually begins. It is a spectator event, with admission and parking historically managed locally. It is a strong upsell candidate for paid VIP, heated-tent, or premium parking passes, but there is no first-party ticketing on iditarod.com today.",
    priceStatus: "Paid-access and parking details for 2027 [confirm].",
    sourceUrl: "https://iditarod.com/calendar/",
    metaTitle:
      "Iditarod 2027 Restart in Willow — Date, Time & How to Attend, March 7",
    metaDescription:
      "Iditarod 2027 Official Restart at Willow Lake — Sunday, March 7, 2027 at 2:00 PM. The competitive start of the race to Nome. How to attend, where to watch, and what a direct VIP / parking pass could look like. The 2027 Willow restart guide.",
    keywords: [
      "Iditarod 2027 restart Willow",
      "Iditarod restart Willow 2027 tickets",
      "how to attend the Iditarod 2027",
      "Iditarod 2027 schedule and dates",
      "Iditarod VIP race start experience tickets",
    ],
    h1: "Iditarod 2027 Official Restart — Willow Lake, March 7",
    intro:
      "If the Ceremonial Start is the photo op, the Restart is the real thing. At Willow Lake the race clock starts and the teams head out on the trail to Nome. It draws serious fans who want to see the competitive start up close.",
    body: [
      "The 2027 Official Restart takes place Sunday, March 7, 2027 at 2:00 PM at Willow Lake in Willow, Alaska — about 75 miles north of Anchorage. This is the competitive start: the point at which the timed run to Nome begins.",
      "Admission and parking at the restart have historically been managed locally. For an event of this scale, it is a natural fit for direct paid access — VIP viewing areas, heated-tent hospitality, and premium parking passes — yet none of that is sold on iditarod.com today.",
      "This sample page demonstrates how the restart could carry its own branded, bookable VIP and parking inventory, capturing demand from out-of-state fans who currently have no clean way to reserve premium access before they arrive.",
    ],
    faq: [
      {
        q: "When and where is the Iditarod 2027 Restart?",
        a: "Sunday, March 7, 2027 at 2:00 PM at Willow Lake in Willow, Alaska, per the official Iditarod calendar at iditarod.com/calendar.",
      },
      {
        q: "What is the difference between the Ceremonial Start and the Restart?",
        a: "The Ceremonial Start in Anchorage is a festive, untimed run for the crowds. The Restart in Willow is the competitive start where the race clock begins and teams head out toward Nome.",
      },
      {
        q: "Is there an admission or parking fee at Willow?",
        a: "Admission and parking have historically been managed locally. Specific 2027 paid-access and parking details are not yet published — confirm closer to the race.",
      },
      {
        q: "Can I buy VIP access to the restart?",
        a: "There is no first-party VIP ticketing for the restart on iditarod.com today. Any premium-access details for 2027 should be confirmed through official channels.",
      },
    ],
    accent: "glacier",
  },
  {
    slug: "finishers-banquet-nome",
    name: "Iditarod 2027 Finisher's Banquet",
    shortName: "Finisher's Banquet (Nome)",
    date: "Sunday, March 21, 2027",
    isoStart: "2027-03-21T17:00:00-09:00",
    location: "Nome, AK",
    venue: "Nome",
    city: "Nome",
    region: "AK",
    ticketed: "paid",
    teaser:
      "The awards night in Nome — speed, sportsmanship, dog-care awards, and the Red Lantern. Currently bundled inside tour packages, not sold clean.",
    ticketInfo:
      "The Finisher's Banquet is the ticketed awards night that honors every musher who completes the race — speed, sportsmanship, and dog-care awards, plus the Red Lantern for the final finisher. It is currently sold mainly bundled inside third-party tour operators' Nome finish packages rather than as a clean standalone ticket on iditarod.com.",
    priceStatus: "2027 standalone-ticket price [confirm].",
    sourceUrl: "https://iditarod.com/calendar/",
    metaTitle:
      "Iditarod Finisher's Banquet Nome 2027 — Awards Night Tickets, March 21",
    metaDescription:
      "Iditarod 2027 Finisher's Banquet in Nome, Alaska — Sunday, March 21, 2027. The awards night honoring every finisher, from the champion to the Red Lantern. How the banquet ticket works today and what a direct standalone ticket could look like.",
    keywords: [
      "Iditarod finishers banquet Nome tickets",
      "Iditarod 2027 finishers banquet Nome",
      "Iditarod Red Lantern award 2027",
      "how to attend the Iditarod 2027",
      "Iditarod 2027 schedule and dates",
    ],
    h1: "Iditarod 2027 Finisher's Banquet — Nome, March 21",
    intro:
      "Nome is where the Iditarod ends and where the whole field is honored. The Finisher's Banquet hands out the awards — fastest team, best dog care, sportsmanship, and the famous Red Lantern for the last musher across the line.",
    body: [
      "The 2027 Finisher's Banquet is scheduled for Sunday, March 21, 2027 in Nome, Alaska. It is the ticketed awards night that celebrates every musher who completes the run to the Bering Sea coast — from the champion down to the Red Lantern, the award for the final finisher.",
      "Today, getting a seat at this banquet usually means buying a multi-day Nome finish package from an outside tour operator. There is no clean standalone banquet ticket on iditarod.com, which means a fan who only wants the banquet has to go through a reseller — and the Trail Committee gives up both the direct relationship and the margin.",
      "This sample page shows how a standalone Finisher's Banquet ticket could be sold directly on the Iditarod brand, alongside (not buried inside) the tour packages.",
    ],
    faq: [
      {
        q: "When and where is the Iditarod 2027 Finisher's Banquet?",
        a: "Sunday, March 21, 2027 in Nome, Alaska, per the official Iditarod calendar at iditarod.com/calendar.",
      },
      {
        q: "What awards are given at the Finisher's Banquet?",
        a: "Awards honoring all finishers — including speed, sportsmanship, and dog-care awards, and the Red Lantern award for the final musher to complete the race.",
      },
      {
        q: "Can I buy a standalone ticket to the banquet?",
        a: "Currently the banquet is sold mainly bundled inside third-party tour operators' Nome finish packages rather than as a clean standalone ticket on the official site. Standalone-ticket details for 2027 are not yet published.",
      },
      {
        q: "How much is the 2027 banquet?",
        a: "The 2027 standalone-ticket price is not yet published. Confirm through official Iditarod Trail Committee channels.",
      },
    ],
    accent: "ice",
  },
  {
    slug: "documentary-premiere",
    name: "Iditarod Documentary Premiere",
    shortName: "Documentary Premiere",
    date: "Summer 2027 (post-race) · date [confirm]",
    isoStart: "2027-07-01T19:00:00-09:00",
    location: "Bear Tooth Theatrepub, Anchorage, AK (recurring venue)",
    venue: "Bear Tooth Theatrepub",
    city: "Anchorage",
    region: "AK",
    ticketed: "paid",
    teaser:
      "The annual theatrical premiere of the official race documentary — a recurring ticketed event ITC doesn't currently merchandise on its own event pages.",
    ticketInfo:
      "Each year the Iditarod Trail Committee releases an official race documentary, premiered theatrically in Anchorage (the Iditarod 53 film premiered July 14, 2025 at the Bear Tooth Theatrepub). Tickets are handled by the theater, not iditarod.com; ITC also sells a paid documentary stream through its WooCommerce shop. It is a natural recurring ticketed event that ITC does not currently merchandise on its own event pages.",
    priceStatus:
      "The 2027 premiere is post-race and its date is not yet set — Summer 2027 [confirm].",
    sourceUrl:
      "https://www.youralaskalink.com/news/things_to_do/documentary-premiere-celebrates-holmes-historic-iditarod-53-victory/article_ceaae3ed-117c-4e37-945f-bc659a983a61.html",
    metaTitle:
      "Iditarod Documentary Premiere 2027 — Official Race Film Tickets, Anchorage",
    metaDescription:
      "The Iditarod 2027 documentary premiere — the annual theatrical debut of the official race film in Anchorage. How tickets work today (handled by the theater, with a paid stream via the ITC shop) and why it's a recurring ticketed event worth centralizing.",
    keywords: [
      "Iditarod documentary premiere tickets 2027",
      "Iditarod race film 2027",
      "Iditarod documentary stream",
      "Iditarod Insider subscription vs in-person events",
      "how to attend the Iditarod 2027",
    ],
    h1: "Iditarod Documentary Premiere 2027 — Anchorage",
    intro:
      "After the race, the Iditarod tells its story on screen. The official race documentary premieres each year in Anchorage and then sells as a paid stream — a recurring, ticketed product that lives almost entirely off the Iditarod's own event pages.",
    body: [
      "The Iditarod Trail Committee produces an official documentary of each race. The Iditarod 53 film premiered July 14, 2025 at the Bear Tooth Theatrepub in Anchorage, the recurring venue for these premieres. A 2027 premiere will follow the same post-race pattern, though its exact summer date is not yet set.",
      "Tickets to the theatrical premiere are sold by the theater, not by iditarod.com. Separately, ITC sells a paid stream of the documentary through its WooCommerce shop. So the same product is monetized in two disconnected places — neither of which is the event calendar where fans look first.",
      "This sample page treats the premiere as what it is: a recurring ticketed event. It shows how the in-person premiere and the paid stream could live together on the Iditarod brand, captured in the same events hub as every other ticket of the season.",
    ],
    faq: [
      {
        q: "When is the Iditarod 2027 documentary premiere?",
        a: "The documentary premieres after the race, in summer, in Anchorage. The Iditarod 53 film premiered July 14, 2025 at the Bear Tooth Theatrepub. The exact 2027 date is not yet set.",
      },
      {
        q: "Where does the premiere take place?",
        a: "The Bear Tooth Theatrepub in Anchorage has been the recurring venue for the official race documentary premiere.",
      },
      {
        q: "Can I watch the documentary if I can't attend the premiere?",
        a: "Yes — the Iditarod Trail Committee sells a paid stream of the official documentary through its online shop, separate from the in-person premiere tickets handled by the theater.",
      },
      {
        q: "Is this the same as the Iditarod Insider subscription?",
        a: "No. Iditarod Insider is a separate digital product (GPS tracking and live race video). The documentary is a standalone film with its own theatrical premiere and paid stream.",
      },
    ],
    accent: "lava",
  },
];

export function getEvent(slug: string): IditarodEvent | undefined {
  return events.find((e) => e.slug === slug);
}
