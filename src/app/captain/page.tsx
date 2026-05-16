import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";
import { resume } from "@/data/resume";

export const metadata: Metadata = {
  title: "John C. Thomas — Captain, Builder, Founder | BlueWave Projects",
  description:
    "USCG Master Captain, Honolulu design-build operator, and BlueWave Projects founder. 1,000+ sea days from Prince William Sound to Maui — now leading construction and SaaS from Waikiki.",
  alternates: { canonical: "https://bluewaveprojects.com/captain" },
  openGraph: {
    title: "John C. Thomas — Captain, Builder, Founder",
    description:
      "1,000+ sea days. Active Honolulu design-build practice. Founder of BlueWave Projects.",
    url: "https://bluewaveprojects.com/captain",
    siteName: "BlueWave Projects",
    type: "profile",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const trackStyle: Record<
  string,
  { dot: string; bar: string; pill: string; text: string }
> = {
  saas: {
    dot: "bg-wave-400",
    bar: "from-wave-400 to-ocean-500",
    pill: "bg-wave-500/10 text-wave-400 border-wave-500/25",
    text: "text-wave-400",
  },
  build: {
    dot: "bg-lava-500",
    bar: "from-lava-500 to-lava-600",
    pill: "bg-lava-500/10 text-lava-500 border-lava-500/25",
    text: "text-lava-500",
  },
  maritime: {
    dot: "bg-ocean-400",
    bar: "from-ocean-400 to-ocean-700",
    pill: "bg-ocean-500/10 text-ocean-300 border-ocean-500/25",
    text: "text-ocean-300",
  },
  snow: {
    dot: "bg-glacier-200",
    bar: "from-glacier-200 to-glacier-300",
    pill: "bg-glacier-300/10 text-glacier-200 border-glacier-300/25",
    text: "text-glacier-200",
  },
};

export default function CaptainPage() {
  const { identity, callings, experience, vessels, certifications, awaiting_mmc, education, highlights, download } =
    resume;

  return (
    <main className="ocean-gradient min-h-screen text-white">
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start">
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative">
              <div className="w-52 h-52 rounded-full overflow-hidden shadow-2xl ring-2 ring-ocean-500/30 shadow-ocean-500/20">
                <img
                  src={identity.photo}
                  alt={identity.full_name}
                  width={208}
                  height={208}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-deep-800 border-2 border-emerald-400 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2 w-full max-w-[208px] text-sm text-white/60">
              <a href={`mailto:${identity.email}`} className="hover:text-white transition-colors break-all">
                {identity.email}
              </a>
              <a href={`tel:${identity.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-white transition-colors">
                {identity.phone}
              </a>
              {identity.addresses.map((a) => (
                <div key={a.label} className="text-white/40 text-xs leading-relaxed">
                  <span className="text-white/55 font-medium">{a.label}:</span> {a.line}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Based in Honolulu · Open to operations, captain, and advisory work
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95] mb-4">
              {identity.display_name}
            </h1>
            <p className="text-xl sm:text-2xl text-gradient font-medium mb-6">
              {identity.headline}
            </p>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-6">
              {identity.summary}
            </p>
            <p className="text-base text-white/45 italic max-w-2xl mb-10">
              &ldquo;{identity.tagline}&rdquo;
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <TrackedCTA
                href="/captain/print"
                location="hero"
                className="btn-primary px-6 py-3 rounded-full text-white font-medium"
              >
                Download printable PDF
              </TrackedCTA>
              <TrackedCTA
                href={download.pdf_url}
                external
                location="hero"
                cta_text_override={download.pdf_label}
                className="px-6 py-3 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
              >
                {download.pdf_label}
              </TrackedCTA>
              <TrackedCTA
                href={`mailto:${identity.email}`}
                external
                location="hero"
                cta_text_override="Get in touch (captain résumé)"
                className="px-6 py-3 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
              >
                Get in touch
              </TrackedCTA>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="glass rounded-2xl p-5 text-center">
                  <div className="text-3xl font-bold text-gradient">{h.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-2">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three callings */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Three callings</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            On the water. On the ground. <span className="text-gradient">In the code.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {callings.map((c) => {
            const s = trackStyle[c.track];
            return (
              <div key={c.title} className="glass rounded-2xl p-8 flex flex-col">
                <div className={`text-xs uppercase tracking-[0.18em] mb-2 ${s.text}`}>{c.label}</div>
                <div className="text-3xl font-bold mb-3">{c.title}</div>
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${s.bar} mb-5`} />
                <p className="text-white/65 leading-relaxed">{c.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience timeline */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Where I&apos;ve been steering.</h2>
        </div>

        <div className="relative pl-6 sm:pl-10">
          <div className="absolute left-2 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-wave-400 via-ocean-500 to-lava-500/30" />
          <div className="flex flex-col gap-8">
            {experience.map((role, i) => {
              const s = trackStyle[role.track];
              return (
                <div key={`${role.company}-${i}`} className="relative">
                  <div
                    className={`absolute -left-6 sm:-left-10 top-3 w-4 h-4 rounded-full ${s.dot} ring-4 ring-deep-900`}
                  />
                  <div className="glass rounded-2xl p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className={`inline-block text-[10px] uppercase tracking-[0.18em] mb-2 px-2 py-0.5 rounded-full border ${s.pill}`}>
                          {role.track === "saas"
                            ? "SaaS · Code"
                            : role.track === "build"
                            ? "Design · Build"
                            : role.track === "maritime"
                            ? "Maritime"
                            : "Mountain"}
                        </div>
                        <h3 className="text-xl font-bold">{role.title}</h3>
                        <p className={`text-sm ${s.text} font-medium`}>
                          {role.company} · {role.location}
                        </p>
                      </div>
                      <div className="text-sm text-white/45 whitespace-nowrap">
                        {role.start} — {role.end}
                      </div>
                    </div>
                    <ul className="space-y-2 text-white/70 leading-relaxed">
                      {role.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3">
                          <span className={`mt-2 h-1 w-1 rounded-full ${s.dot} shrink-0`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vessels captained */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Vessels captained</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ten boats, two oceans, <span className="text-gradient">one logbook.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {vessels.map((v) => (
            <div key={v.name} className="glass rounded-2xl p-6">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="text-lg font-bold">{v.name}</h3>
                <span className="text-xs text-white/40 whitespace-nowrap">{v.period}</span>
              </div>
              <p className="text-sm text-ocean-300 mb-4">{v.classification}</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <Spec label="Gross tons" value={v.gross_tons ? String(v.gross_tons) : "—"} />
                <Spec label="Length" value={`${v.length_ft}′`} />
                <Spec label="Power" value={v.hp ? `${v.hp} hp` : "—"} />
              </div>
              <div className="text-sm text-white/60 leading-relaxed">
                <div><span className="text-white/40">Waters:</span> {v.waters}</div>
                <div><span className="text-white/40">Duty:</span> {v.duty}</div>
                <div><span className="text-white/40">Position:</span> {v.position}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Certifications & IDs</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Papers stamped.</h2>
        </div>

        <CertGroup
          title="USCG licenses & ratings"
          items={certifications.filter((c) => c.group === "license")}
          color="#7dd3fc"
        />
        <CertGroup
          title="STCW"
          items={certifications.filter((c) => c.group === "stcw")}
          color="#38bdf8"
        />
        <CertGroup
          title="Safety & rescue"
          items={certifications.filter((c) => c.group === "safety")}
          color="#bae6fd"
        />
        <CertGroup
          title="Firefighting"
          items={certifications.filter((c) => c.group === "fire")}
          color="#f97316"
        />
        <CertGroup
          title="Identification"
          items={certifications.filter((c) => c.group === "id")}
          color="#34d399"
        />

        <div className="mt-8 glass rounded-2xl p-6">
          <p className="text-sm text-white/45 uppercase tracking-[0.18em] mb-3">Awaiting return on filed MMC</p>
          <div className="flex flex-wrap gap-3">
            {awaiting_mmc.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-white/70 border border-white/15 bg-white/[0.02]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">Education</p>
            <h3 className="text-2xl font-bold mb-1">{education.school}</h3>
            <p className="text-ocean-300 mb-1">{education.school_location}</p>
            <p className="text-white/70 mb-4">{education.degree}</p>
            <p className="text-sm text-white/45">{education.period}</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-3">In college</p>
            <ul className="space-y-2 text-white/70 leading-relaxed">
              {education.activities.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-wave-400 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Need a captain, an operator, or a builder?
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-8">
          I take on a small number of off-platform engagements per year — advisory, ops consulting, expert witness, maritime surveying, and design-build in Hawaii.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${identity.email}`} className="btn-primary px-7 py-3.5 rounded-full text-white font-medium">
            Email John
          </a>
          <a
            href="/captain/print"
            className="px-7 py-3.5 rounded-full text-white/70 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 font-medium"
          >
            Print clean PDF
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm text-white/85 font-medium">{value}</div>
    </div>
  );
}

function CertGroup({
  title,
  items,
  color,
}: {
  title: string;
  items: { name: string }[];
  color: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-6">
      <h3 className="text-sm uppercase tracking-[0.18em] mb-3" style={{ color }}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((c) => (
          <span
            key={c.name}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm text-white/80 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
          >
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}
