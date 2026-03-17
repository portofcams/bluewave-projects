"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/50 to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            Let&apos;s Talk
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Ready to</span>{" "}
            <span className="text-gradient">ride the wave?</span>
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-12">
            Whether you need an app built, want to learn AI, or have an idea
            that needs R&amp;D — we&apos;re here for it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 sm:p-12"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/40 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/40 mb-2">
                What are you interested in?
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all appearance-none">
                <option value="">Select one...</option>
                <option value="consulting">AI Consulting / 1-on-1</option>
                <option value="school">AI School Access</option>
                <option value="app">Custom App Development</option>
                <option value="api">API / Infrastructure</option>
                <option value="other">Something Else</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/40 mb-2">
                Tell us more
              </label>
              <textarea
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ocean-500/50 focus:ring-1 focus:ring-ocean-500/30 transition-all resize-none"
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 rounded-xl text-white font-medium text-lg"
            >
              Send It
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
