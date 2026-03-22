"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { getStoredUser } from "@/lib/auth";

const plans = [
  {
    name: "AI School",
    price: "$79",
    period: "/mo",
    description: "Self-paced AI mastery at your own speed.",
    features: [
      "8 waves of interactive content",
      "Hands-on exercises & projects",
      "XP tracking & achievements",
      "Community access",
      "New content added monthly",
      "Cancel anytime",
    ],
    cta: "Start Learning",
    planKey: "school",
    featured: false,
    gradient: "from-ocean-500 to-wave-500",
  },
  {
    name: "AI School + Coaching",
    price: "$249",
    period: "/mo",
    description: "Everything in School, plus personal guidance.",
    badge: "Most Popular",
    features: [
      "Everything in AI School",
      "2 monthly 1-on-1 sessions",
      "Priority support",
      "Custom exercises for your goals",
      "Direct access via chat",
      "Personalized learning path",
    ],
    cta: "Get Started",
    planKey: "pro",
    featured: true,
    gradient: "from-wave-400 to-glacier-300",
  },
  {
    name: "Consulting",
    price: "Custom",
    period: "",
    description: "For businesses ready to integrate AI.",
    features: [
      "Custom AI strategy & roadmap",
      "App development & automation",
      "Team training & workshops",
      "Ongoing technical support",
      "Priority project scheduling",
      "Dedicated Slack channel",
    ],
    cta: "Book a Call",
    planKey: "consulting",
    featured: false,
    gradient: "from-lava-500 to-amber-400",
  },
];

function PricingCard({ plan, index }: { plan: (typeof plans)[number]; index: number }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-40px" });
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (planKey: string) => {
    // Consulting plan links to booking page instead of Stripe
    if (planKey === "consulting") {
      window.location.href = "/booking";
      return;
    }
    setLoading(true);
    try {
      const user = getStoredUser();
      const res = await fetch("https://ai.portofcams.com/api/bluewave/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, email: user?.email || undefined }),
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative glass rounded-2xl p-10 transition-all duration-500 ${
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
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ocean-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Invest in your</span>{" "}
            <span className="text-gradient">future.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Whether you want to learn AI or leverage it for your business — there&apos;s a plan for you. No contracts. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
