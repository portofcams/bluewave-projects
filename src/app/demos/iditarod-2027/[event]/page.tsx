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
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-6 pt-28">
        <nav className="text-xs text-white/40">
          <Link href={HUB_PATH} className="hover:text-white/70">
            Iditarod 2027 Hub
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{e.shortName}</span>
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
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
            Iditarod 2027 · 55th running
          </span>
        </div>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          {e.h1}
        </h1>

        <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-white/40">When · </span>
            <span className={`font-medium ${accentText[e.accent]}`}>
              {e.date}
            </span>
          </div>
          <div>
            <span className="text-white/40">Where · </span>
            <span className="text-white/80">{e.location}</span>
          </div>
        </div>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/65">
          {e.intro}
        </p>

        <PhotoPlaceholder
          accent={e.accent}
          tall
          label={`${e.shortName} — ${e.city}, AK`}
          className="mb-8"
        />

        {/* Ticket CTA card */}
        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-wave-400">
                {ctaLabel}
              </p>
              <p className="max-w-md text-sm leading-relaxed text-white/60">
                {e.priceStatus}
              </p>
            </div>
            <a
              href="https://iditarod.com/calendar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap rounded-full px-8 py-3.5 text-sm font-semibold text-white"
            >
              {ctaLabel} →
            </a>
          </div>
          <p className="mt-4 border-t border-white/5 pt-4 text-[11px] text-white/35">
            Sample CTA. In the live build this button would run a first-party,
            branded checkout on iditarod.com instead of redirecting to a
            third-party platform.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
          About this event
        </h2>
        <div className="space-y-4">
          {e.body.map((p, i) => (
            <p key={i} className="leading-relaxed text-white/70">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/8 bg-white/3 p-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">
            How tickets work today
          </h3>
          <p className="leading-relaxed text-white/70">{e.ticketInfo}</p>
          <p className="mt-3 text-xs text-white/40">
            Source:{" "}
            <a
              href={e.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wave-400 underline underline-offset-2 hover:text-wave-300"
            >
              {e.sourceUrl.replace(/^https?:\/\//, "").split("/")[0]}
            </a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {e.faq.map((f) => (
            <details
              key={f.q}
              className="glass group rounded-2xl px-5 py-4"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-white/90 marker:content-none">
                {f.q}
                <span className="text-wave-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-white/65">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Other events */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-xl font-semibold text-white/70">
          More of the 2027 season
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {events
            .filter((o) => o.slug !== e.slug)
            .map((o) => (
              <Link
                key={o.slug}
                href={`${HUB_PATH}/${o.slug}`}
                className="glass glass-hover flex items-center justify-between rounded-xl px-5 py-4 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-white">
                    {o.shortName}
                  </div>
                  <div className="text-xs text-white/40">{o.date}</div>
                </div>
                <span className="text-wave-400">→</span>
              </Link>
            ))}
        </div>
        <div className="mt-6">
          <Link
            href={HUB_PATH}
            className="text-sm text-wave-400 underline underline-offset-2 hover:text-wave-300"
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
