"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

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
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={itemInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass glass-hover rounded-2xl overflow-hidden transition-all duration-500"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 sm:p-8 text-left cursor-pointer"
      >
        <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-ocean-400" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-6 sm:pb-8">
              <p className="text-white/40 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="faq" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
