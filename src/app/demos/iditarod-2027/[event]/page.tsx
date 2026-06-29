import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { events, getEvent, HUB_PATH, SITE } from "../events";
import {
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

// UNLISTED + NOINDEX per event — real SEO copy in title/description for the
// pitch, but robots noindex so it never enters bluewaveprojects.com's index.
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
  const ctaLabel =
    e.ticketed === "free-spectate"
      ? "Plan your visit"
      : e.ticketed === "auction"
        ? "Bid / reserve your experience"
        : "Reserve / buy tickets";

  return (
    // Page-local Iditarod brand theme (snow white on Iditarod blue). Scoped to
    // this route only — globals.css / tailwind.config / shared components are
    // left untouched so the rest of bluewaveprojects.com is unchanged.
    <main className="min-h-screen bg-[#F5F8FB] text-[#1F2D3A]">
      <Nav />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-6 pt-28">
        <nav className="text-xs text-[#8A97A5]">
          <Link href={HUB_PATH} className="hover:text-[#23557D]">
            Iditarod 2027 Hub
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#5B6B7A]">{e.shortName}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-10 pt-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${badge.cls}`}
          >
            {badge.label}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#8A97A5]">
            Iditarod 2027 · 55th running
          </span>
        </div>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-[#1B4565] sm:text-5xl">
          {e.h1}
        </h1>

        <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-[#8A97A5]">When · </span>
            <span className={`font-semibold ${accentText[e.accent]}`}>
              {e.date}
            </span>
          </div>
          <div>
            <span className="text-[#8A97A5]">Where · </span>
            <span className="text-[#4A5868]">{e.location}</span>
          </div>
        </div>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#4A5868]">
          {e.intro}
        </p>

        <PhotoPlaceholder
          accent={e.accent}
          tall
          imageKey={e.slug}
          label={`${e.shortName} — ${e.city}, AK`}
          className="mb-8"
        />

        {/* Ticket CTA card */}
        <div className="rounded-2xl border border-[#E2EAF1] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[#327FA2]">
                {ctaLabel}
              </p>
              <p className="max-w-md text-sm leading-relaxed text-[#5B6B7A]">
                {e.priceStatus}
              </p>
            </div>
            <a
              href="https://iditarod.com/calendar/"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full bg-[#35A8DF] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#23557D]/20 transition-colors hover:bg-[#2A93C7]"
            >
              {ctaLabel} →
            </a>
          </div>
          <p className="mt-4 border-t border-[#EDF1F6] pt-4 text-[11px] text-[#8A97A5]">
            Sample CTA. In the live build this button would run a first-party,
            branded checkout on iditarod.com instead of redirecting to a
            third-party platform.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-5 text-2xl font-bold text-[#1B4565] sm:text-3xl">
          About this event
        </h2>
        <div className="space-y-4">
          {e.body.map((p, i) => (
            <p key={i} className="leading-relaxed text-[#4A5868]">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#E2EAF1] bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#327FA2]">
            How tickets work today
          </h3>
          <p className="leading-relaxed text-[#4A5868]">{e.ticketInfo}</p>
          <p className="mt-3 text-xs text-[#8A97A5]">
            Source:{" "}
            <a
              href={e.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#23557D] underline underline-offset-2 hover:text-[#35A8DF]"
            >
              {e.sourceUrl.replace(/^https?:\/\//, "").split("/")[0]}
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold text-[#1B4565] sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {e.faq.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-[#E2EAF1] bg-white px-5 py-4 shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[#1B4565] marker:content-none">
                {f.q}
                <span className="text-[#35A8DF] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#4A5868]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other events */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-xl font-semibold text-[#5B6B7A]">
          More of the 2027 season
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {events
            .filter((o) => o.slug !== e.slug)
            .map((o) => (
              <Link
                key={o.slug}
                href={`${HUB_PATH}/${o.slug}`}
                className="flex items-center justify-between rounded-xl border border-[#E2EAF1] bg-white px-5 py-4 shadow-sm transition-colors hover:border-[#35A8DF]/40 hover:bg-[#F0F7FC]"
              >
                <div>
                  <div className="text-sm font-semibold text-[#1B4565]">
                    {o.shortName}
                  </div>
                  <div className="text-xs text-[#8A97A5]">{o.date}</div>
                </div>
                <span className="text-[#35A8DF]">→</span>
              </Link>
            ))}
        </div>
        <div className="mt-6">
          <Link
            href={HUB_PATH}
            className="text-sm font-medium text-[#23557D] underline underline-offset-2 hover:text-[#35A8DF]"
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
  );
}
