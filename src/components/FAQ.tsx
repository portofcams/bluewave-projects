"use client";

import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";

const faqs = [
  {
    question: "How much time can I actually save?",
    answer:
      "Most clients save 10-15 hours per week within the first month. It depends on your business, but we find the wins fast.",
  },
  {
    question: "Do I need to be technical?",
    answer:
      "Not at all. We handle the technical side. You just need to know your business.",
  },
  {
    question: "What does a typical session look like?",
    answer:
      "30 minutes on Zoom. We screen-share, walk through your tools, and build automations together in real time.",
  },
  {
    question: "How fast do I see results?",
    answer:
      "Usually within the first week. We start with quick wins — the stuff that saves you time immediately.",
  },
  {
    question: "What if AI isn't right for my business?",
    answer:
      "We'll tell you honestly in the first session. No hard sell. If there's nothing to automate, we won't charge you.",
  },
  {
    question: "Can you build custom tools for my business?",
    answer:
      "Yes. If off-the-shelf AI doesn't cut it, we build exactly what you need. Apps, APIs, dashboards — whatever gets you your time back.",
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
            Here are the ones we get the most. If yours isn&apos;t here, book a free audit and ask us directly.
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
