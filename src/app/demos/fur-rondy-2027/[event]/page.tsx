import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { deepEvents, getEvent, HUB_PATH, SITE } from "../events";
import {
  CarnivalShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  ticketBadge,
  accentText,
  eventJsonLd,
  faqJsonLd,
} from "../_shared";

// Static export: pre-render one page per featured event slug.
export function generateStaticParams() {
  return deepEvents.map((e) => ({ event: e.slug }));
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
    title: `${e.deep.metaTitle} · BlueWave Projects (sample)`,
    description: e.deep.metaDescription,
    keywords: e.deep.keywords,
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
  // We point attendees to the official furrondy.net page rather than a sale.
  const attendLabel =
    e.ticketed === "free"
      ? "How to attend"
      : e.ticketed === "register"
        ? "Registration & how to attend"
        : e.ticketed === "onsite"
          ? "How it works on-site"
          : "Tickets & how to attend";

  const faqLd = faqJsonLd(e);

  return (
    // Page-local "midwinter carnival" theme, scoped under <CarnivalShell>'s
    // `.rondy-carnival` namespace — globals.css / tailwind.config / shared
    // components untouched, so the rest of bluewaveprojects.com is unchanged.
    <CarnivalShell>
      <main className="min-h-screen">
        <Nav />

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-6 pt-28">
          <nav className="rondy-cond text-[11px] tracking-[0.14em] text-[#8992b8]">
            <Link href={HUB_PATH} className="hover:text-[#ffc65c]">
              Fur Rondy 2027 Hub
            </Link>
            <span className="mx-2 text-[#ffc65c]">/</span>
            <span className="text-[#eef2ff]">{e.shortName}</span>
          </nav>
        </div>

        {/* Hero — informational event header (what / when / where). */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`rondy-cond inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-[10px] tracking-[0.16em] ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span className="rondy-eyebrow !text-[11px] !tracking-[0.28em]">
              Fur Rondy 2027 · Anchorage · Est. 1935
            </span>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="rondy-display mb-4 max-w-3xl text-4xl leading-[1.05] text-[#eef2ff] sm:text-5xl">
                {e.deep.h1}
              </h1>
              <div className="rondy-rule !mx-0" />
            </div>
            <Seal size={132} className="hidden shrink-0 sm:inline-flex" />
          </div>

          <div className="mb-6 mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="rondy-cond text-[11px] tracking-[0.14em] text-[#8992b8]">
                When ·{" "}
              </span>
              <span className={`font-semibold ${accentText[e.accent]}`}>
                {e.date}
              </span>
            </div>
            <div>
              <span className="rondy-cond text-[11px] tracking-[0.14em] text-[#8992b8]">
                Where ·{" "}
              </span>
              <span className="text-[#eef2ff]">
                {e.venue}, {e.city}, {e.region}
              </span>
            </div>
          </div>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#c9d2f2]">
            {e.deep.intro}
          </p>

          <PhotoPlaceholder
            accent={e.accent}
            tall
            imageKey={e.slug}
            label={`${e.shortName} — ${e.city}, AK`}
            className="mb-8"
          />

          {/* Attend / details card — informational, not a checkout: it tells
              attendees how tickets really work today and points them to the
              official furrondy.net page. */}
          <div className="rondy-booth rondy-string p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="rondy-eyebrow mb-1">{attendLabel}</p>
                <p className="max-w-md text-sm leading-relaxed text-[#c9d2f2]">
                  {e.deep.priceStatus}
                </p>
              </div>
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rondy-cond whitespace-nowrap rounded-lg border border-[#d99a2b] bg-[#ffc65c] px-8 py-3.5 text-sm font-bold text-[#070b1e] shadow-[0_8px_24px_rgba(255,198,92,0.22)] transition-transform hover:-translate-y-0.5"
              >
                Official event page →
              </a>
            </div>
            <p className="mt-4 border-t border-[#26305c] pt-4 text-[11px] text-[#8992b8]">
              Dates, venues, and ticketing are set by Greater Anchorage, Inc.
              Always confirm the latest details and buy tickets through the
              official links published on furrondy.net.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="rondy-display mb-5 text-3xl text-[#eef2ff] sm:text-4xl">
            About this event
          </h2>
          <div className="space-y-4">
            {e.deep.body.map((p, i) => (
              <p key={i} className="leading-relaxed text-[#c9d2f2]">
                {p}
              </p>
            ))}
          </div>

          <div className="rondy-booth mt-8 p-6">
            <h3 className="rondy-eyebrow mb-2 !tracking-[0.2em]">
              Tickets &amp; how to attend
            </h3>
            <p className="leading-relaxed text-[#c9d2f2]">{e.deep.ticketInfo}</p>
            <p className="mt-3 text-xs text-[#8992b8]">
              Source:{" "}
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#ffc65c] underline underline-offset-2 hover:text-[#d99a2b]"
              >
                {e.sourceUrl.replace(/^https?:\/\//, "").split("/")[0]}
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="rondy-display mb-6 text-3xl text-[#eef2ff] sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {e.deep.faq.map((f) => (
              <details key={f.q} className="group rondy-booth px-5 py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[#eef2ff] marker:content-none">
                  {f.q}
                  <span className="text-[#ffc65c] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#c9d2f2]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other featured events */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="rondy-display mb-6 text-2xl text-[#eef2ff]">
            More of Rondy 2027
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {deepEvents
              .filter((o) => o.slug !== e.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`${HUB_PATH}/${o.slug}`}
                  className="rondy-booth flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <div className="rondy-cond text-sm font-semibold text-[#eef2ff]">
                      {o.shortName}
                    </div>
                    <div className="text-xs text-[#8992b8]">{o.date}</div>
                  </div>
                  <span className="text-[#ffc65c]">→</span>
                </Link>
              ))}
          </div>
          <div className="mt-6">
            <Link
              href={HUB_PATH}
              className="rondy-cond text-sm font-medium text-[#ffc65c] underline underline-offset-2 hover:text-[#d99a2b]"
            >
              ← Back to the full Fur Rondy 2027 hub
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
        {faqLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        )}
      </main>
    </CarnivalShell>
  );
}
