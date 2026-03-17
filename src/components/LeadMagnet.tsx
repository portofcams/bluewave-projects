"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const previewItems = [
  "The \"CEO Briefing\" prompt — summarize anything in 30 seconds",
  "The \"Email Rewriter\" — turn rough drafts into polished messages",
  "The \"Meeting Prep\" prompt — never go in unprepared again",
  "The \"Content Machine\" — generate a week of posts in 10 min",
  "The \"Decision Matrix\" — AI-powered pros/cons analysis",
];

export default function LeadMagnet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already submitted
  useEffect(() => {
    const savedEmail = localStorage.getItem("bluewave_lead_email");
    if (savedEmail) {
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://ai.portofcams.com/api/bluewave/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      localStorage.setItem("bluewave_lead_email", email);
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-ocean-500/8 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ocean-500/30 via-wave-500/20 to-glacier-300/30 p-[1px]">
            <div className="w-full h-full rounded-3xl bg-deep-900" />
          </div>

          <div className="relative glass rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: copy + form */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="text-sm font-medium text-lava-500 uppercase tracking-widest mb-4 block">
                    Free Resource
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    <span className="text-white">Download the</span>{" "}
                    <span className="text-gradient-warm">AI Starter Kit</span>
                  </h2>
                  <p className="text-lg text-white/40 mb-8 leading-relaxed">
                    10 prompts that will change how you work. No fluff, no signup wall — just the good stuff. Drop your email and it&apos;s yours.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-emerald-400 font-medium">Check your inbox! The AI Starter Kit is on its way.</span>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        disabled={loading}
                        className="flex-grow px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-ocean-500/50 focus:ring-2 focus:ring-ocean-500/20 transition-all disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Get the Kit"
                        )}
                      </button>
                    </form>
                  )}

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-400 mt-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  <p className="text-xs text-white/20 mt-4">
                    No spam. Unsubscribe anytime. We respect your inbox.
                  </p>
                </motion.div>
              </div>

              {/* Right: mock PDF preview */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="glass rounded-2xl p-8 relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lava-500 to-amber-400 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">AI Starter Kit</div>
                      <div className="text-xs text-white/30">BlueWave Projects</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {previewItems.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/3"
                      >
                        <div className="w-5 h-5 rounded-full bg-ocean-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs text-ocean-400 font-bold">{i + 1}</span>
                        </div>
                        <span className="text-sm text-white/50">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 text-center text-xs text-white/20">
                    + 5 more inside...
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
