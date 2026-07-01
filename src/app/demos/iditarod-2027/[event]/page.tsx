import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { events, getEvent, HUB_PATH, SITE } from "../events";
import {
  HeritageShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  ticketBadge,
  accentText,
  eventJsonLd,
  faqJsonLd,
} from "../_shared";

// Static export: pre-render one page per event slug.
export function generateStaticParams() {
  return events.map((e) => ({ event: e.slug }));
}

type Params = { event: string };

// UNLISTED + NOINDEX per event — informational title/description for each
// event, but robots noindex so it never enters bluewaveprojects.com's index.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { event } = await params;
  const e = getEvent(event);
  if (!e) return { title: "Event not found" };
  return {
    title: `${e.metaTitle} · BlueWave Projects (sample)`,
    description: e.metaDescription,
    keywords: e.keywords,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
    alternates: { canonical: `${SITE}${HUB_PATH}/${e.slug}` },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { event } = await params;
  const e = getEvent(event);
  if (!e) notFound();

  const badge = ticketBadge[e.ticketed];
  // Informational framing — this is an event-details hub, not a checkout.
  // We point fans to the official Iditarod calendar rather than pushing a sale.
  const attendLabel =
    e.ticketed === "free-spectate"
      ? "How to attend"
      : e.ticketed === "auction"
        ? "How to attend"
        : "Tickets & how to attend";

  return (
    // Page-local "rugged heritage" theme (Direction 3): warm cream paper canvas,
    // deep spruce ink, rust/oxblood accents, aged-gold seal, vintage slab/
    // condensed display type. Every style is scoped under <HeritageShell>'s
    // `.idit-heritage` namespace — globals.css / tailwind.config / shared
    // components are left untouched so the rest of bluewaveprojects.com is
    // unchanged. No blue remains anywhere on this route.
    <HeritageShell>
      <main className="min-h-screen">
        <Nav />

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-6 pt-28">
          <nav className="idit-display text-[11px] tracking-[0.14em] text-[#6b5f4a]">
            <Link href={HUB_PATH} className="hover:text-[#B5502A]">
              Iditarod 2027 Hub
            </Link>
            <span className="mx-2 text-[#B5502A]">/</span>
            <span className="text-[#1f3d2f]">{e.shortName}</span>
          </nav>
        </div>

        {/* Hero — informational event header (what / when / where). This is an
            event-details page in the Iditarod 2027 information hub, not a pitch. */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-sm border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span className="idit-eyebrow !text-[11px] !tracking-[0.28em]">
              Iditarod 2027 · 55th running · Anchorage to Nome
            </span>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="idit-display mb-4 max-w-3xl text-4xl font-bold leading-[1.02] text-[#1f3d2f] sm:text-6xl">
                {e.h1}
              </h1>
              <div className="idit-perf-rule !mx-0" />
            </div>
            <Seal size={132} className="hidden shrink-0 sm:inline-flex" />
          </div>

          <div className="mb-6 mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="idit-display text-[11px] tracking-[0.14em] text-[#6b5f4a]">
                When ·{" "}
              </span>
              <span className={`font-semibold ${accentText[e.accent]}`}>
                {e.date}
              </span>
            </div>
            <div>
              <span className="idit-display text-[11px] tracking-[0.14em] text-[#6b5f4a]">
                Where ·{" "}
              </span>
              <span className="text-[#14241c]">{e.location}</span>
            </div>
          </div>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#14241c]">
            {e.intro}
          </p>

          <PhotoPlaceholder
            accent={e.accent}
            tall
            imageKey={e.slug}
            label={`${e.shortName} — ${e.city}, AK`}
            className="mb-8"
          />

          {/* Attend / details card — vintage ticket stub. Informational, not a
              checkout: it tells fans what to expect on price and points them to
              the official Iditarod calendar to attend. */}
          <div className="idit-ticket p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="idit-eyebrow mb-1">{attendLabel}</p>
                <p className="max-w-md text-sm leading-relaxed text-[#14241c]">
                  {e.priceStatus}
                </p>
              </div>
              <a
                href="https://iditarod.com/calendar/"
                target="_blank"
                rel="noopener noreferrer"
                className="idit-display whitespace-nowrap rounded-sm border-2 border-[#7d3517] bg-[#B5502A] px-8 py-3.5 text-sm font-semibold text-[#F3EAD7] shadow-[4px_4px_0_rgba(21,42,32,0.9)] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]"
              >
                Official Iditarod calendar →
              </a>
            </div>
            <p className="idit-stub-foot mt-4 pt-4 text-[11px] text-[#6b5f4a]">
              Dates, venues, and ticketing are set by the Iditarod Trail
              Committee. Always confirm the latest details and buy any tickets
              through the official links published on iditarod.com.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="idit-display mb-5 text-3xl font-bold text-[#1f3d2f] sm:text-4xl">
            About this event
          </h2>
          <div className="space-y-4">
            {e.body.map((p, i) => (
              <p key={i} className="leading-relaxed text-[#14241c]">
                {p}
              </p>
            ))}
          </div>

          <div className="idit-ticket mt-8 p-6">
            <h3 className="idit-eyebrow mb-2 !tracking-[0.2em]">
              Tickets &amp; how to attend
            </h3>
            <p className="leading-relaxed text-[#14241c]">{e.ticketInfo}</p>
            <p className="mt-3 text-xs text-[#6b5f4a]">
              Source:{" "}
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#B5502A] underline underline-offset-2 hover:text-[#7d3517]"
              >
                {e.sourceUrl.replace(/^https?:\/\//, "").split("/")[0]}
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="idit-display mb-6 text-3xl font-bold text-[#1f3d2f] sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {e.faq.map((f) => (
              <details
                key={f.q}
                className="group rounded-sm border-2 border-[#1f3d2f] bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] px-5 py-4 shadow-[4px_4px_0_rgba(31,61,47,0.12)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[#1f3d2f] marker:content-none">
                  {f.q}
                  <span className="text-[#B5502A] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#14241c]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other events */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="idit-display mb-6 text-2xl font-semibold text-[#1f3d2f]">
            More of the 2027 season
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {events
              .filter((o) => o.slug !== e.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`${HUB_PATH}/${o.slug}`}
                  className="flex items-center justify-between rounded-sm border-2 border-[#1f3d2f] bg-gradient-to-b from-[#fbf5e6] to-[#efe3c9] px-5 py-4 shadow-[3px_3px_0_rgba(31,61,47,0.14)] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_rgba(31,61,47,0.2)]"
                >
                  <div>
                    <div className="idit-display text-sm font-semibold text-[#1f3d2f]">
                      {o.shortName}
                    </div>
                    <div className="text-xs text-[#6b5f4a]">{o.date}</div>
                  </div>
                  <span className="text-[#B5502A]">→</span>
                </Link>
              ))}
          </div>
          <div className="mt-6">
            <Link
              href={HUB_PATH}
              className="idit-display text-sm font-medium text-[#B5502A] underline underline-offset-2 hover:text-[#7d3517]"
            >
              ← Back to the full Iditarod 2027 hub
            </Link>
          </div>
        </section>

        <SampleNote />
        <Footer />

        {/* schema.org Event + FAQPage — real date/location, no invented prices */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(e)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(e)) }}
        />
      </main>
    </HeritageShell>
  );
}
