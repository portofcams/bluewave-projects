"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "Tell us where it hurts",
    description:
      "Fill out a quick intake form. We learn your business, your tools, and where your time goes.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We find the hours",
    description:
      "In your first session, we map your workflow and identify 10+ hours of automatable work.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "You get your life back",
    description:
      "We build the automations, teach you the tools, and your week gets shorter. Simple as that.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { ref, inView } = useReveal();

  return (
    <section id="how-it-works" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Three steps to</span>{" "}
            <span className="text-gradient">a shorter week.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            No long contracts. No complicated onboarding. Just a clear path to getting your time back.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[16.66%] right-[16.66%] h-[2px]">
            <div
              style={{
                transform: inView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 1s ease-out 0.4s",
              }}
              className="h-full bg-gradient-to-r from-ocean-500 via-wave-400 to-glacier-300"
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`reveal-up reveal-d-${(index + 1) * 2} ${inView ? "in" : ""} relative text-center`}
            >
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-500 to-wave-500 flex items-center justify-center text-white shadow-lg shadow-ocean-500/20">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-deep-800 border-2 border-ocean-400 flex items-center justify-center">
                    <span className="text-xs font-bold text-ocean-400">{step.number}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/40 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`reveal-up-sm reveal-d-7 ${inView ? "in" : ""} text-center mt-16`}
        >
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium text-lg"
          >
            Book a Free Audit
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
