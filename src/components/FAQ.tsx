"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    question: "How long does the AI School take?",
    answer:
      "8 waves, roughly 8-10 weeks at your own pace. Some people crush it in 4 weeks, others take their time and really dig deep into each wave. There's no deadline — your subscription stays active as long as you want.",
  },
  {
    question: "Do I need technical experience?",
    answer:
      "Nope. Wave 1 starts from absolute zero — if you can use a web browser, you're good. Developers and technical folks can skip ahead to the more advanced waves on automation, APIs, and custom agents.",
  },
  {
    question: "What's included in consulting?",
    answer:
      "Custom AI strategy tailored to your business, hands-on implementation of AI tools and workflows, training for your team, and ongoing support. Every engagement is different — we start with a free call to scope it out.",
  },
  {
    question: "Can you build an app for me?",
    answer:
      "Absolutely. We do full-stack web and mobile development — React, Next.js, Swift, Python, the works. Check out our portfolio section to see what we've shipped. Book a call and let's talk about your idea.",
  },
  {
    question: "What AI tools do you teach?",
    answer:
      "Claude, ChatGPT, Gemini, automation tools like n8n and Zapier, and more. We're tool-agnostic — we teach you how to think with AI, not just click buttons in one specific app. You'll be dangerous with all of them.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Cancel anytime. No contracts, no hassle. If you cancel mid-month, you keep access through the end of your billing period. We don't do refunds on past months, but we also don't lock you in.",
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
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
            Here are the ones we get the most. If yours isn&apos;t here, just reach out.
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
