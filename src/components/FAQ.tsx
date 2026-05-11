"use client";

import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

const faqs = [
  {
    question: "Do I need an iPhone with LiDAR?",
    answer:
      "For the scope generator's photo + RoomPlan flow, yes — iPhone 12 Pro or newer (any Pro / Pro Max model). The rest of BlueWave Projects (project room, blueprint editor, client timelines, invoices) works on any device. Multiple crew members can share one iPhone if needed.",
  },
  {
    question: "Is this built for Hawaii contractors specifically?",
    answer:
      "It was built BY a Hawaii contractor — so Hawaii GET (General Excise Tax), §237-13(3)(B) sub deductions, and Honolulu DPP permit lookups all work out of the box. But there's nothing Hawaii-specific in the project management itself. Contractors in CA, TX, FL are using it; we just don't auto-compute their state's tax rules (yet).",
  },
  {
    question: "How does the free Solo tier work?",
    answer:
      "One active project, 5 scope generations per month, every other feature unlocked. No credit card to start. Use it for as long as it takes to be sure — most working GCs upgrade to Pro within 2-3 weeks once the workflow clicks.",
  },
  {
    question: "Can clients see my pricing?",
    answer:
      "Only what you choose to share. Invoices show the totals the client signed off on; internal scope notes, sub costs, and your margin stay private to your tenant. The client-shareable timeline shows milestones and progress photos, not financials.",
  },
  {
    question: "What happens to my data if I leave?",
    answer:
      "Your tenant's projects, scopes, blueprints, photos, and invoices all export as JSON + PDF on demand. No lock-in. We'd rather have you stay because the tool earns its keep than because you can't get your data out.",
  },
  {
    question: "Can I bring my whole crew?",
    answer:
      "Yes. Pro tier includes unlimited teammates at no per-seat cost. Subs get a limited-access role so they can log time and upload photos without seeing your margins or other projects.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useReveal();
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  return (
    <div
      ref={ref}
      className={`reveal-up-sm ${delayClass} ${inView ? "in" : ""} glass glass-hover rounded-2xl overflow-hidden transition-all duration-500`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 sm:p-8 text-left cursor-pointer"
      >
        <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
        <div className={`icon-rotate ${isOpen ? "open" : ""} shrink-0`}>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-ocean-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>

      <div className={`expand ${isOpen ? "open" : ""}`}>
        <div>
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <p className="text-white/40 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { ref, inView } = useReveal();

  return (
    <section id="faq" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-3xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Got</span>{" "}
            <span className="text-gradient">questions?</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            The ones working contractors ask before they sign up. If yours isn&apos;t here, start a free trial and try the workflow on a real walk-through — you&apos;ll know within a week.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
