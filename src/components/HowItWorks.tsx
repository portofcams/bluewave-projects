"use client";

import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    title: "Scan or upload",
    description:
      "Walk the site with RoomPlan on an iPhone — or drag in photos. The scope generator reads it, asks two clarifying questions, and writes a phase-by-phase scope of work in 60 seconds.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9V6a2 2 0 012-2h3M21 9V6a2 2 0 00-2-2h-3M3 15v3a2 2 0 002 2h3M21 15v3a2 2 0 01-2 2h-3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Turn it into a project",
    description:
      "Approved scope becomes a real project room: blueprint editor, daily logs, time clock, invoices with Hawaii tax accounting, change orders. One tenant, every project, your whole crew can see it.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14l-7-3-7 3z" />
        <path d="M9 9l3 3 3-3M12 12V5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Share with the client",
    description:
      "Every project gets a public timeline link the homeowner can check anytime — milestones, photos, change orders, invoice approvals. No more weekly “how’s it going” emails.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
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
            <span className="text-white">Scan, scope,</span>{" "}
            <span className="text-gradient">share.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            From the first site walk to the final invoice, every project moves through the same
            three steps. The client sees the same timeline you do.
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
