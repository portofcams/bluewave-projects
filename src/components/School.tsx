"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: "\u{1F3AE}",
    title: "Learn by Doing",
    description:
      "Interactive lessons where you type real prompts and see real results. No slides. No lectures. Just hands-on reps.",
  },
  {
    icon: "\u{1F3C6}",
    title: "XP & Streaks",
    description:
      "Earn points for every lesson completed. Build streaks. Unlock achievements. Your brain on dopamine learns faster.",
  },
  {
    icon: "\u{1F30A}",
    title: "Skill Waves",
    description:
      "Progress through skill waves — from basics to advanced automation. Each wave builds on the last.",
  },
  {
    icon: "\u{1F919}",
    title: "1-on-1 Sessions",
    description:
      "Book private coaching for personalized guidance. We meet you where you are and accelerate from there.",
  },
  {
    icon: "\u{1F9EA}",
    title: "Live Sandbox",
    description:
      "Practice with AI directly inside the platform. A safe space to experiment, fail, and level up.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Track Progress",
    description:
      "See exactly where you stand. Dashboard shows completed skills, time invested, and what's next.",
  },
];

const skillTree = [
  { name: "AI Foundations", level: 1, color: "bg-emerald-500" },
  { name: "Prompt Engineering", level: 2, color: "bg-ocean-500" },
  { name: "Email & Writing", level: 2, color: "bg-ocean-500" },
  { name: "Business Automation", level: 3, color: "bg-wave-500" },
  { name: "Data & Analysis", level: 3, color: "bg-wave-500" },
  { name: "Custom AI Agents", level: 4, color: "bg-violet-500" },
  { name: "Advanced Workflows", level: 4, color: "bg-violet-500" },
  { name: "AI Architect", level: 5, color: "bg-lava-500" },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const fRef = useRef(null);
  const fInView = useInView(fRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={fRef}
      initial={{ opacity: 0, y: 30 }}
      animate={fInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass glass-hover rounded-2xl p-8 transition-all duration-500"
    >
      <div className="text-3xl mb-4">{feature.icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function School() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="school" className="py-32 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-wave-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ocean-500/5 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-wave-400 uppercase tracking-widest mb-4 block">
            AI School
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Learn AI like a</span>{" "}
            <span className="text-gradient-warm">game.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            The BlueWave Learning Console. Interactive, gamified AI training
            that makes you dangerous with AI — at your own pace or with a guide.
          </p>
        </motion.div>

        {/* Skill tree preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 sm:p-10 mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-white/60">
              Skill Wave Preview
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {skillTree.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-300 group cursor-default"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${skill.color} shadow-lg`}
                />
                <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs text-white/20 ml-1">
                  Lv.{skill.level}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-grow h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: "15%" } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-wave-400"
              />
            </div>
            <span className="text-sm text-white/30 whitespace-nowrap">
              Your Journey
            </span>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/school"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium text-lg"
          >
            Start Learning
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p className="text-sm text-white/30 mt-4">
            8 waves. 61 lessons. Start free, upgrade anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
