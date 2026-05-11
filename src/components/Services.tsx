"use client";

import { useReveal } from "@/hooks/useReveal";
import { type ReactNode } from "react";

interface Service {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: ReactNode;
  gradient: string;
}

const services: Service[] = [
  {
    title: "AI Scope Generator",
    description:
      "Photos and an address in. Phase-by-phase scope of work, line-item ranges, and Hawaii GET gross-up out — in 60 seconds. Send it as a real lead with one click.",
    href: "/scope",
    cta: "See how scoping works",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7h18M3 12h12M3 17h7" strokeLinecap="round" />
        <path d="M18 14l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-ocean-500 to-wave-400",
  },
  {
    title: "Project Room (Tenant)",
    description:
      "One tenant per company, every project inside. RoomPlan blueprints, client-shareable timelines, daily logs, invoices with GET handling, change orders with public approve links.",
    href: "/signup",
    cta: "Start free trial",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-400",
  },
  {
    title: "Property Brief",
    description:
      "$15 / month homeowner intel. Your address every Wednesday: TMK, zoning, lava zone, permit history, comps. Built on the same Hawaii data layer the scope generator uses.",
    href: "/property-brief",
    cta: "$15 / month — preview free",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    title: "Aloha Off-Market Network",
    description:
      "Deal flow before MLS. Three tiers — $99 watcher, $499 builder, $1,500 founding member. Hawaii adjacency alerts, distressed-permit signals, intros to vetted agents + lenders.",
    href: "/aloha",
    cta: "Compare tiers",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18l4-8 5 6 4-3 5 5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="10" r="1.2" fill="currentColor" />
        <circle cx="12" cy="16" r="1.2" fill="currentColor" />
        <circle cx="16" cy="13" r="1.2" fill="currentColor" />
      </svg>
    ),
    gradient: "from-lava-500 to-amber-400",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { ref, inView } = useReveal();
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  return (
    <a
      href={service.href}
      ref={ref}
      className={`reveal-up ${delayClass} ${inView ? "in" : ""} group glass glass-hover rounded-2xl p-10 transition-all duration-500 block`}
    >
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        {service.icon}
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

      <p className="text-white/50 leading-relaxed mb-6">{service.description}</p>

      <div className="text-ocean-400 group-hover:text-ocean-300 transition-colors text-sm font-medium inline-flex items-center gap-2">
        {service.cta}
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

export default function Services() {
  const { ref, inView } = useReveal();

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            What&apos;s in your tenant
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Four tools,</span>{" "}
            <span className="text-gradient">one project room.</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Built by a Honolulu design-build practice that needed all of this
            and couldn&apos;t find it anywhere. Each piece works alone — together
            they replace your scoping spreadsheet, your CRM, and your
            client-update emails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
