import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pages, getPage, HUB_PATH, SITE } from "../events";
import {
  PosterShell,
  Rosette,
  PhotoPlaceholder,
  SampleNote,
  ticketBadge,
  accentText,
  eventJsonLd,
  faqJsonLd,
} from "../_shared";

// Static export: one page per featured guide.
export function generateStaticParams() {
  return pages.map((p) => ({ event: p.slug }));
}

type Params = { event: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { event } = await params;
  const p = getPage(event);
  if (!p) return { title: "Guide not found" };
  return {
    title: `${p.deep.metaTitle} · BlueWave Projects (sample)`,
    description: p.deep.metaDescription,
    keywords: p.deep.keywords,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
    alternates: { canonical: `${SITE}${HUB_PATH}/${p.slug}` },
  };
}

export default async function FairGuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { event } = await params;
  const p = getPage(event);
  if (!p) notFound();

  const badge = ticketBadge[p.ticketed];
  const attendLabel =
    p.ticketed === "included"
      ? "Included with admission"
      : p.ticketed === "onsite"
        ? "How the midway sells"
        : "Tickets & how it works";

  return (
    <PosterShell>
      <main className="min-h-screen">
        <Nav />

        {/* Breadcrumb */}
        <div className="mx-auto max-w-5xl px-6 pt-28">
          <nav className="fair-cond text-[11px] tracking-[0.14em] text-[#7d7458]">
            <Link href={HUB_PATH} className="hover:text-[#c43a2d]">
              Alaska State Fair 2026 Hub
            </Link>
            <span className="mx-2 text-[#c43a2d]">/</span>
            <span className="text-[#22381f]">{p.shortName}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`fair-cond inline-flex items-center gap-1.5 rounded-sm border px-3 py-1 text-[10px] tracking-[0.16em] ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span className="fair-eyebrow !text-[11px] !tracking-[0.28em]">
              Alaska State Fair · Palmer · Aug 21 – Sep 7, 2026
            </span>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="fair-display mb-4 max-w-3xl text-4xl leading-[1.02] text-[#22381f] sm:text-6xl">
                {p.deep.h1}
              </h1>
              <div className="fair-rule !mx-0" />
            </div>
            <Rosette size={110} className="hidden shrink-0 sm:inline-flex" />
          </div>

          <div className="mb-6 mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="fair-cond text-[11px] tracking-[0.14em] text-[#7d7458]">
                When ·{" "}
              </span>
              <span className={`font-semibold ${accentText[p.accent]}`}>
                {p.date}
              </span>
            </div>
            <div>
              <span className="fair-cond text-[11px] tracking-[0.14em] text-[#7d7458]">
                Where ·{" "}
              </span>
              <span className="text-[#22381f]">
                {p.venue}, {p.city}, {p.region}
              </span>
            </div>
          </div>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#4a5c40]">
            {p.deep.intro}
          </p>

          <PhotoPlaceholder
            accent={p.accent}
            tall
            imageKey={p.slug}
            label={`${p.shortName} — ${p.city}, AK`}
            className="mb-8"
          />

          {/* Attend card */}
          <div className="fair-card fair-band p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="fair-eyebrow mb-1">{attendLabel}</p>
                <p className="max-w-md text-sm leading-relaxed text-[#4a5c40]">
                  {p.deep.priceStatus}
                </p>
              </div>
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fair-cond whitespace-nowrap rounded-md border-2 border-[#93291f] bg-[#c43a2d] px-8 py-3.5 text-sm font-bold text-[#f6eed9] shadow-[4px_4px_0_rgba(34,56,31,0.3)] transition-transform hover:-translate-y-0.5"
              >
                Official page →
              </a>
            </div>
            <p className="mt-4 border-t-2 border-dashed border-[#22381f]/25 pt-4 text-[11px] text-[#7d7458]">
              Dates, hours, and ticketing are set by Alaska State Fair, Inc.
              Always confirm details and buy through the official links on
              alaskastatefair.org.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="fair-display mb-5 text-3xl text-[#22381f] sm:text-4xl">
            The guide
          </h2>
          <div className="space-y-4">
            {p.deep.body.map((para, i) => (
              <p key={i} className="leading-relaxed text-[#22381f]">
                {para}
              </p>
            ))}
          </div>

          <div className="fair-card mt-8 p-6">
            <h3 className="fair-eyebrow mb-2 !tracking-[0.2em]">
              Tickets &amp; how to attend
            </h3>
            <p className="leading-relaxed text-[#22381f]">{p.deep.ticketInfo}</p>
            <p className="mt-3 text-xs text-[#7d7458]">
              Source:{" "}
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#c43a2d] underline underline-offset-2 hover:text-[#93291f]"
              >
                {p.sourceUrl.replace(/^https?:\/\//, "").split("/")[0]}
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-10">
          <h2 className="fair-display mb-6 text-3xl text-[#22381f] sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {p.deep.faq.map((f) => (
              <details key={f.q} className="group fair-card px-5 py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[#22381f] marker:content-none">
                  {f.q}
                  <span className="text-[#c43a2d] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-[#4a5c40]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other guides */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h2 className="fair-display mb-6 text-2xl text-[#22381f]">
            More of the 2026 fair
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {pages
              .filter((o) => o.slug !== p.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`${HUB_PATH}/${o.slug}`}
                  className="fair-card flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <div className="fair-cond text-sm font-semibold text-[#22381f]">
                      {o.shortName}
                    </div>
                    <div className="text-xs text-[#7d7458]">{o.date}</div>
                  </div>
                  <span className="text-[#c43a2d]">→</span>
                </Link>
              ))}
          </div>
          <div className="mt-6">
            <Link
              href={HUB_PATH}
              className="fair-cond text-sm font-medium text-[#c43a2d] underline underline-offset-2 hover:text-[#93291f]"
            >
              ← Back to the hub &amp; day planner
            </Link>
          </div>
        </section>

        <SampleNote />
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(p)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(p)) }}
        />
      </main>
    </PosterShell>
  );
}
