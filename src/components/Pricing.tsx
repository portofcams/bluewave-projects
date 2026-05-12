"use client";

import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { getStoredUser } from "@/lib/auth";

const plans = [
  {
    name: "Solo",
    price: "Free",
    period: "trial",
    description: "One project room, every feature unlocked. For solo GCs proving the workflow.",
    features: [
      "1 active project",
      "AI scope generator (5 / month)",
      "RoomPlan blueprint editor",
      "Client-shareable timeline",
      "Daily logs + invoices",
      "Hawaii GET handling",
    ],
    cta: "Start free",
    planKey: "solo",
    featured: false,
    gradient: "from-ocean-500 to-wave-500",
  },
  {
    name: "Pro",
    price: "$99",
    period: "/ month",
    description: "Unlimited projects, full team, branded client portal.",
    badge: "Most builders pick this",
    features: [
      "Unlimited projects",
      "Unlimited scope generations",
      "Invite teammates (no per-seat fee)",
      "Custom subdomain + branding",
      "Change orders with public approve links",
      "Property Brief credits included",
    ],
    cta: "Start 14-day trial",
    planKey: "pro",
    featured: true,
    gradient: "from-wave-400 to-glacier-300",
  },
  {
    name: "Founding Builder",
    price: "$499",
    period: "/ month",
    description: "For shops doing $5M+ a year. Includes Aloha Network Builder tier.",
    features: [
      "Everything in Pro",
      "Aloha Off-Market Network — Builder tier",
      "Adjacent-permit alerts",
      "Direct line to the BlueWave team",
      "Quarterly underwriting workshop",
      "Locked-in price for life",
    ],
    cta: "Talk to us",
    planKey: "founding",
    featured: false,
    gradient: "from-lava-500 to-amber-400",
  },
];

function PricingCard({ plan, index }: { plan: (typeof plans)[number]; index: number }) {
  const { ref, inView } = useReveal();
  const [loading, setLoading] = useState(false);
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  const handleCheckout = async (planKey: string) => {
    // Solo = free trial → signup. Founding Builder is sales-touch → booking.
    // Pro is the only Stripe checkout path.
    if (planKey === "solo") {
      window.location.href = "/signup";
      return;
    }
    if (planKey === "founding") {
      window.location.href = "/booking";
      return;
    }
    setLoading(true);
    try {
      const user = getStoredUser();
      const res = await fetch("https://ai.portofcams.com/api/bluewave/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: planKey, email: user?.email || undefined }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal-up ${delayClass} ${inView ? "in" : ""} relative glass rounded-2xl p-10 transition-all duration-500 ${
        plan.featured
          ? "border-ocean-500/30 shadow-lg shadow-ocean-500/10 md:scale-105"
          : "glass-hover"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium text-white">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-sm text-white/40">{plan.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-bold ${plan.featured ? "text-gradient" : "text-white"}`}>
            {plan.price}
          </span>
          {plan.period && <span className="text-white/40 text-lg">{plan.period}</span>}
        </div>
        {plan.price !== "Custom" && (
          <span className="inline-block mt-2 text-xs font-medium text-lava-500 bg-lava-500/10 px-3 py-1 rounded-full">
            Early adopter — 50% off first month
          </span>
        )}
      </div>

      <ul className="space-y-4 mb-10">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg viewBox="0 0 24 24" className={`w-5 h-5 mt-0.5 shrink-0 ${plan.featured ? "text-wave-400" : "text-ocean-500"}`} fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-sm text-white/60">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleCheckout(plan.planKey)}
        disabled={loading}
        className={`block w-full text-center py-4 rounded-full font-medium text-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-wait ${
          plan.featured
            ? "btn-primary text-white"
            : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
        }`}
      >
        {loading ? "Redirecting..." : plan.cta}
      </button>
    </div>
  );
}

export default function Pricing() {
  const { ref, inView } = useReveal();

  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ocean-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Priced for</span>{" "}
            <span className="text-gradient">working contractors.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Start free. Upgrade when the workflow earns you back its first month. No per-seat
            tax, no setup fee, no contract.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
