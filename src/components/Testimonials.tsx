"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "I was spending 10+ hours a week chasing down unpaid invoices. BlueWave set up an AI system that sends reminders, follows up, and even flags at-risk accounts. I've saved roughly 12 hours a week and my cash flow has never been healthier.",
    name: "Derek W.",
    role: "Owner, Westside Plumbing Co.",
    stars: 5,
  },
  {
    quote:
      "I own 14 rental units and had zero tech background. After 8 weeks in the AI school, I built a tenant screening workflow that pulls comps, checks references, and scores applicants automatically. My vacancy turnaround dropped from 3 weeks to 5 days.",
    name: "Natasha R.",
    role: "Real Estate Investor",
    stars: 5,
  },
  {
    quote:
      "We needed someone who actually understood agency workflows, not just AI buzzwords. BlueWave built us a custom pipeline that drafts social copy, generates briefs, and routes approvals — cut our content turnaround time by 80%. Clients noticed immediately.",
    name: "Jordan P.",
    role: "Founder, Tidepool Creative Agency",
    stars: 5,
  },
  {
    quote:
      "Between scheduling 22 employees and managing food orders, I was drowning in spreadsheets. Now AI handles my weekly schedule drafts and flags inventory that's about to run low. I finally have my weekends back.",
    name: "Maria C.",
    role: "Owner, Lanai Kitchen & Bar",
    stars: 5,
  },
  {
    quote:
      "We had an idea for an internal tool but no dev team. BlueWave built our customer intake app in under three weeks — it integrates with our CRM, handles document uploads, and even auto-generates summary reports. Our onboarding time went from 45 minutes to about 8.",
    name: "Kevin L.",
    role: "Co-Founder, GreenLoop Logistics",
    stars: 5,
  },
  {
    quote:
      "I left a bank teller job with no coding experience. The AI school gave me a real skill set — not just theory, but actual projects I could show employers. I landed a junior automation role two months after finishing. Best investment I've made in myself.",
    name: "Alyssa T.",
    role: "Junior Automation Specialist",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 text-lava-500" fill="currentColor">
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass glass-hover rounded-2xl p-8 sm:p-10 transition-all duration-500 relative"
    >
      {/* Quote mark */}
      <div className="absolute top-6 right-8 text-6xl text-white/5 font-serif leading-none">
        &ldquo;
      </div>

      <StarRating count={testimonial.stars} />

      <p className="text-white/60 leading-relaxed mb-8 relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-wave-500 flex items-center justify-center text-sm font-bold text-white">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-white">{testimonial.name}</div>
          <div className="text-xs text-white/40">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="testimonials" className="py-32 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-wave-500/5 rounded-full blur-[128px]" />
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
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">People are</span>{" "}
            <span className="text-gradient">leveling up.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what our clients and students have to say.
          </p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-white/5 border border-white/10"
          >
            <div className="flex -space-x-2">
              {["bg-ocean-500", "bg-wave-500", "bg-lava-500", "bg-emerald-500"].map((bg, i) => (
                <div key={i} className={`w-6 h-6 rounded-full ${bg} border-2 border-deep-900`} />
              ))}
            </div>
            <span className="text-sm text-white/60">
              Join <span className="text-white font-medium">50+</span> students and clients
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
