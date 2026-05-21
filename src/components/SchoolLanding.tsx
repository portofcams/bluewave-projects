"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { allWaves } from "@/lib/curriculum";
import { useReveal } from "@/hooks/useReveal";
import { isLoggedIn, checkSubscription } from "@/lib/auth";

// Event delegation: capture clicks on any anchor inside the school
// landing as cta_clicked with cta_location=school_landing. Saves
// wrapping each of the 15 Link/href references individually.
function handleSchoolClick(e: React.MouseEvent<HTMLElement>) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  const target = e.target as HTMLElement;
  const anchor = target.closest("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href") || "";
  const text = anchor.textContent?.trim().slice(0, 80) || "";
  posthog.capture("cta_clicked", {
    cta_location: "school_landing",
    cta_text: text,
    destination_path: href,
    source_page: window.location.pathname,
    is_pricing_tier: href.includes("plan=school-"),
  });
}

const totalLessons = allWaves.reduce(
  (n, w) => n + w.units.reduce((m, u) => m + u.lessons.length, 0),
  0,
);

const PLANS = [
  {
    name: "Solo",
    price: "$39",
    period: "/ month",
    description: "Nine waves. Live sandbox. XP, streaks, and certificates.",
    features: [
      "All 9 waves of the curriculum",
      `${totalLessons}+ lessons with hands-on exercises`,
      "Live AI sandbox built into every lesson",
      "Wave certificates as you complete each track",
      "XP, streaks, and a personal dashboard",
      "Cancel anytime",
    ],
    cta: "Start free trial",
    href: "/signup?plan=school-solo&redirect=/school/learn",
    featured: false,
    tone: "wave",
    footnote: "7-day free trial · no card required",
  },
  {
    name: "Lifetime",
    price: "$199",
    period: "one-time",
    description: "Pay once. Every wave, every future update, no subscription.",
    badge: "Founding student",
    features: [
      "Everything in Solo, forever",
      "All future wave releases included",
      "No monthly fee, no expiry",
      "Sandbox access for the life of the platform",
      "Lifetime certificate on your name",
      "Founding-student community channel",
    ],
    cta: "Get lifetime access",
    href: "/signup?plan=school-lifetime&redirect=/school/learn",
    featured: true,
    tone: "ocean",
    footnote: "Limited founding-student pricing · 100 spots",
  },
  {
    name: "Coaching",
    price: "$249",
    period: "/ month",
    description: "Solo plus monthly 1-on-1 coaching with the operator.",
    features: [
      "Everything in Solo",
      "One 60-minute 1-on-1 coaching call per month",
      "Async DM support for project review",
      "Personalized learning path based on your stack",
      "Priority on new wave releases",
      "Cancel anytime",
    ],
    cta: "Start free trial",
    href: "/signup?plan=school-coaching&redirect=/school/learn",
    featured: false,
    tone: "lava",
    footnote: "Limited to a small cohort at a time",
  },
];

export default function SchoolLanding() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasSchool, setHasSchool] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { ref: heroRef, inView: heroInView } = useReveal();
  const { ref: curRef, inView: curInView } = useReveal();
  const { ref: priceRef, inView: priceInView } = useReveal();

  useEffect(() => {
    setMounted(true);
    setLoggedIn(isLoggedIn());
    checkSubscription()
      .then((s) => setHasSchool(s.active && /school/i.test(s.plan || "")))
      .catch(() => {});
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-deep-900 text-white" onClick={handleSchoolClick}>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className={`reveal-up ${heroInView ? "in" : ""} px-6 pt-32 pb-20 max-w-6xl mx-auto text-center`}
        >
          <span className="inline-block text-xs font-bold tracking-[0.22em] uppercase text-wave-400 mb-6">
            BlueWave AI School
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Learn AI</span>{" "}
            <span className="text-gradient">the way operators actually use it.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-10">
            Nine progressive waves. {totalLessons}+ lessons with hands-on exercises in a
            live AI sandbox. Built by an operator shipping six products on Claude — not a
            content shop, not a 12-hour webinar. Earn certificates as you go.
          </p>

          {mounted && loggedIn && hasSchool ? (
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <Link
                href="/school/learn"
                className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
              >
                Continue learning →
              </Link>
              <a
                href="#pricing"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                See plans
              </a>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <Link
                href="/signup?plan=school-solo&redirect=/school/learn"
                className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
              >
                Start free trial
              </Link>
              <Link
                href="/school/learn"
                className="px-8 py-4 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-colors text-lg"
              >
                Browse the curriculum
              </Link>
            </div>
          )}

          <p className="mt-6 text-xs text-white/40 tracking-widest uppercase">
            7-day free trial · cancel anytime · operator-built
          </p>
        </section>

        {/* ── CURRICULUM ───────────────────────────────────────────── */}
        <section
          id="curriculum"
          ref={curRef}
          className={`reveal-up ${curInView ? "in" : ""} px-6 py-24 max-w-6xl mx-auto`}
        >
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
              Curriculum
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Nine waves,{" "}
              <span className="text-gradient">{totalLessons} lessons,</span> one live sandbox.
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
              Each wave builds on the last — from prompt engineering foundations to
              multi-agent workflows. Every lesson includes hands-on exercises you run
              against real AI models in the embedded sandbox.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allWaves.map((wave, i) => {
              const lessonCount = wave.units.reduce(
                (n, u) => n + u.lessons.length,
                0,
              );
              return (
                <div
                  key={wave.id}
                  className="glass rounded-2xl p-6 border border-white/5 flex flex-col"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-wave-400 mb-3">
                    Wave {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {wave.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed flex-grow mb-4">
                    {wave.description}
                  </p>
                  <div className="text-xs text-white/40 pt-3 border-t border-white/5">
                    {lessonCount} lessons · {wave.weekRange}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/school/learn"
              className="inline-flex items-center gap-2 text-sm text-wave-400 hover:text-white transition-colors"
            >
              Browse all lessons →
            </Link>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────── */}
        <section
          id="pricing"
          ref={priceRef}
          className={`reveal-up ${priceInView ? "in" : ""} px-6 py-24 max-w-6xl mx-auto`}
        >
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Three plans.{" "}
              <span className="text-gradient">All honest.</span>
            </h2>
            <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
              Try monthly free for seven days. Or pay once for lifetime access.
              Either way: no per-seat fee, no setup, no contract.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative glass rounded-2xl p-8 transition-all duration-500 ${
                  plan.featured
                    ? "border-ocean-500/30 shadow-lg shadow-ocean-500/10 sm:scale-105"
                    : "border-white/5 glass-hover"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium text-white whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{plan.description}</p>
                </div>

                <div className="mb-7">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold ${plan.featured ? "text-gradient" : "text-white"}`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/40 text-base">{plan.period}</span>
                  </div>
                  {plan.footnote && (
                    <p className="text-[11px] text-white/40 mt-2 leading-relaxed">{plan.footnote}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-5 h-5 mt-0.5 shrink-0 ${plan.featured ? "text-wave-400" : "text-ocean-500"}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-white/65 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3.5 rounded-full font-medium text-base transition-all duration-300 ${
                    plan.featured
                      ? "btn-primary text-white"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-white/40 mt-8 tracking-widest uppercase">
            All plans include the full curriculum · founding pricing held for life on monthly tiers
          </p>
        </section>

        {/* ── OPERATOR PROOF ───────────────────────────────────────── */}
        <section className="px-6 py-24 max-w-4xl mx-auto text-center">
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Who teaches this
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Built by an operator shipping{" "}
            <span className="text-gradient">12+ AI products on Claude.</span>
          </h2>
          <p className="text-white/55 leading-relaxed max-w-2xl mx-auto mb-8">
            Not a content shop. Not an aggregator. The same studio operating BlueWave
            Projects, Binnacle AI, ProBuildCalc, Property Brief, Aloha Network, and the
            Hawaii Property data platform. Every lesson teaches a pattern we ship in
            production.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-wave-400 hover:text-white transition-colors"
          >
            See the studio →
          </Link>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="px-6 py-32 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            <span className="text-white">Start the free trial.</span>{" "}
            <span className="text-gradient">Ship something this week.</span>
          </h2>
          <Link
            href="/signup?plan=school-solo&redirect=/school/learn"
            className="btn-primary inline-block px-10 py-4 rounded-full text-white font-medium text-lg"
          >
            Start free trial
          </Link>
          <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
            7 days · cancel anytime · no card required for trial
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
