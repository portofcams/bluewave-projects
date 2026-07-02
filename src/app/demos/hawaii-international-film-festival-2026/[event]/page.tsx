import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { deepScreenings, getScreening, HUB_PATH, SITE } from "../events";
import {
  PremiereShell,
  Seal,
  PhotoPlaceholder,
  SampleNote,
  ticketBadge,
  islandBadge,
  accentText,
  screeningJsonLd,
  faqJsonLd,
} from "../_shared";

// Static export: pre-render one page per featured screening slug.
export function generateStaticParams() {
  return deepScreenings.map((e) => ({ event: e.slug }));
}

type Params = { event: string };

// UNLISTED + NOINDEX per screening — informational title/description for
// each, but robots noindex so it never enters bluewaveprojects.com's index.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { event } = await params;
  const e = getScreening(event);
  if (!e) return { title: "Program not found" };
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

export default async function ScreeningPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { event } = await params;
  const e = getScreening(event);
  if (!e) notFound();

  const badge = ticketBadge[e.ticketed];
  const iBadge = islandBadge[e.island];
  // Informational framing — this is a program-details hub, not a checkout.
  // We point attendees to the official HIFF page rather than a sale.
  const attendLabel =
    e.ticketed === "free"
      ? "How to attend"
      : e.ticketed === "unpublished"
        ? "Ticketing status"
        : "Tickets & how to attend";

  const faqLd = faqJsonLd(e);

  return (
    // Page-local "golden hour premiere" theme, scoped under
    // <PremiereShell>'s `.hiff-premiere` namespace — globals.css / tailwind
    // config / shared components untouched, so the rest of
    // bluewaveprojects.com is unchanged.
    <PremiereShell>
      <main className="min-h-screen">
        <Nav />

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-6 pt-28">
          <nav className="hiff-cond text-[11px] tracking-[0.14em] text-[#9c8fae]">
            <Link href={HUB_PATH} className="hover:text-[#f5a742]">
              HIFF46 Hub
            </Link>
            <span className="mx-2 text-[#f5a742]">/</span>
            <span className="text-[#f7f2ea]">{e.shortName}</span>
          </nav>
        </div>

        {/* Hero — informational screening header (what / when / where). */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`hiff-cond inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-[10px] tracking-[0.16em] ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span
              className={`hiff-cond inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-[10px] tracking-[0.16em] ${iBadge.cls}`}
            >
              {e.island}
            </span>
            <span className="hiff-eyebrow !text-[11px] !tracking-[0.28em]">
              HIFF46 · Honolulu · Statewide
            </span>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="hiff-display mb-4 max-w-3xl text-4xl leading-[1.05] text-[#f7f2ea] sm:text-5xl">
                {e.deep.h1}
              </h1>
              <div className="hiff-rule !mx-0" />
            </div>
            <Seal size={132} className="hidden shrink-0 sm:inline-flex" />
          </div>

          <div className="mb-6 mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="hiff-cond text-[11px] tracking-[0.14em] text-[#9c8fae]">
                When ·{" "}
              </span>
              <span className={`font-semibold ${accentText[e.accent]}`}>
                {e.date}
              </span>
            </div>
            <div>
              <span className="hiff-cond text-[11px] tracking-[0.14em] text-[#9c8fae]">
                Where ·{" "}
              </span>
              <span className="text-[#f7f2ea]">
                {e.venue}, {e.city}, {e.region}
              </span>
            </div>
          </div>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#d8cfe2]">
            {e.deep.intro}
          </p>

          <PhotoPlaceholder
            accent={e.accent}
            tall
            imageKey={e.slug}
            label={`${e.shortName} — ${e.city}, HI`}
            className="mb-8"
          />

          {/* Attend / details card — informational, not a checkout: it tells
              attendees how tickets really work today and points them to the
              official HIFF page. */}
          <div className="hiff-panel hiff-lei p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="hiff-eyebrow mb-1">{attendLabel}</p>
                <p className="max-w-md text-sm leading-relaxed text-[#d8cfe2]">
                  {e.deep.priceStatus}
                </p>
              </div>
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hiff-cond whitespace-nowrap rounded-lg border border-[#d8862a] bg-[#f5a742] px-8 py-3.5 text-sm font-bold text-[#0e0819] shadow-[0_8px_24px_rgba(245,167,66,0.22)] transition-transform hover:-translate-y-0.5"
              >
                Official page →
              </a>
            </div>
            <p className="mt-4 border-t border-[#3a2652] pt-4 text-[11px] text-[#9c8fae]">
              Dates, venues, and ticketing are set by the Hawaiʻi
              International Film Festival. Always confirm the latest details
              and buy tickets through the official links published on
              hiff.org.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="hiff-display mb-5 text-3xl text-[#f7f2ea] sm:text-4xl">
            About this
          </h2>
          <div className="space-y-4">
            {e.deep.body.map((p, i) => (
              <p key={i} className="leading-relaxed text-[#d8cfe2]">
                {p}
              </p>
            ))}
          </div>

          <div className="hiff-panel mt-8 p-6">
            <h3 className="hiff-eyebrow mb-2 !tracking-[0.2em]">
              Tickets &amp; how to attend
            </h3>
            <p className="leading-relaxed text-[#d8cfe2]">{e.deep.ticketInfo}</p>
            <p className="mt-3 text-xs text-[#9c8fae]">
              Source:{" "}
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#f5a742] underline underline-offset-2 hover:text-[#d8862a]"
              >
                {e.sourceUrl.replace(/^https?:\/\//, "").split("/")[0]}
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="hiff-display mb-6 text-3xl text-[#f7f2ea] sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {e.deep.faq.map((f) => (
              <details key={f.q} className="group hiff-panel px-5 py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[#f7f2ea] marker:content-none">
                  {f.q}
                  <span className="text-[#f5a742] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#d8cfe2]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other featured programs */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="hiff-display mb-6 text-2xl text-[#f7f2ea]">
            More of HIFF46
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {deepScreenings
              .filter((o) => o.slug !== e.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`${HUB_PATH}/${o.slug}`}
                  className="hiff-panel flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <div className="hiff-cond text-sm font-semibold text-[#f7f2ea]">
                      {o.shortName}
                    </div>
                    <div className="text-xs text-[#9c8fae]">{o.date}</div>
                  </div>
                  <span className="text-[#f5a742]">→</span>
                </Link>
              ))}
          </div>
          <div className="mt-6">
            <Link
              href={HUB_PATH}
              className="hiff-cond text-sm font-medium text-[#f5a742] underline underline-offset-2 hover:text-[#d8862a]"
            >
              ← Back to the full HIFF46 hub
            </Link>
          </div>
        </section>

        <SampleNote />
        <Footer />

        {/* schema.org ScreeningEvent + FAQPage — real date/location, no
            invented prices */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(screeningJsonLd(e)) }}
        />
        {faqLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        )}
      </main>
    </PremiereShell>
  );
}
