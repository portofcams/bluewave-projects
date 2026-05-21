import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { TrackedCTA } from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Thanks — BlueWave Projects",
  description:
    "Thanks for signing up. Here's what happens next, what to expect in your inbox, and where to go from here.",
  alternates: { canonical: "https://bluewaveprojects.com/thanks" },
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      <section className="px-6 pt-32 pb-20 max-w-3xl mx-auto text-center">
        <div className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-wave-400 mb-6">
          You're in
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">Thanks for signing up.</span>{" "}
          <span className="text-gradient">Here's what happens next.</span>
        </h1>
        <p className="text-lg text-white/65 leading-relaxed">
          You'll get a welcome email within the next 5 minutes. If it doesn't
          show up, check spam — or hit reply to this one and we'll fix it.
        </p>
      </section>

      <section className="px-6 py-12 max-w-3xl mx-auto">
        <div className="glass rounded-2xl p-8 border border-white/5 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">What's in your inbox</h2>
          <ul className="space-y-3 text-white/65 text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-wave-400 mt-1">→</span>
              <span><strong className="text-white">Welcome email</strong> with your account details, login link, and a 60-second walkthrough video</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-wave-400 mt-1">→</span>
              <span><strong className="text-white">First Wednesday brief</strong> (Property Brief subscribers) arrives this coming Wednesday at 6:30am HST</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-wave-400 mt-1">→</span>
              <span><strong className="text-white">Onboarding sequence</strong> over the next three weeks (founding members) — Week 1 access link, Week 2 onboarding session invite, Week 3 your first share prompt</span>
            </li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-8 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-3">While you're here</h2>
          <p className="text-white/65 text-sm leading-relaxed mb-5">
            A few things worth a click if you have a minute:
          </p>
          <div className="flex flex-wrap gap-3">
            <TrackedCTA
              href="/ikena"
              location="inline"
              className="px-5 py-2.5 rounded-full bg-white/5 text-white border border-white/15 hover:bg-white/10 transition-all text-sm"
            >
              See Ikena (flagship)
            </TrackedCTA>
            <TrackedCTA
              href="/blog/hawaii-tmk-system-decoded"
              location="inline"
              className="px-5 py-2.5 rounded-full bg-white/5 text-white border border-white/15 hover:bg-white/10 transition-all text-sm"
            >
              Read the TMK explainer
            </TrackedCTA>
            <TrackedCTA
              href="/property-brief-sample.html"
              external
              location="inline"
              className="px-5 py-2.5 rounded-full bg-white/5 text-white border border-white/15 hover:bg-white/10 transition-all text-sm"
            >
              See a sample brief
            </TrackedCTA>
            <TrackedCTA
              href="/aloha"
              location="inline"
              className="px-5 py-2.5 rounded-full bg-white/5 text-white border border-white/15 hover:bg-white/10 transition-all text-sm"
            >
              Aloha Network
            </TrackedCTA>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <p className="text-white/40 text-sm">
          Any issues with your signup? Reply to your welcome email or hit{" "}
          <a href="mailto:portofcams@gmail.com" className="text-wave-400 underline">portofcams@gmail.com</a> — same-day reply.
        </p>
      </section>

      <Footer />
    </main>
  );
}
