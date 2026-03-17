"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "React / Next.js", icon: "⚛️" },
  { name: "Swift / iOS", icon: "📱" },
  { name: "Python / FastAPI", icon: "🐍" },
  { name: "Claude / ChatGPT", icon: "🤖" },
  { name: "Docker / DevOps", icon: "🐳" },
  { name: "n8n / Automation", icon: "⚡" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
            About
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Meet the</span>{" "}
            <span className="text-gradient">captain.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo + name */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lg:items-center"
          >
            <div className="relative mb-8">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl shadow-ocean-500/20 ring-2 ring-ocean-500/30">
                <img src="/captain.jpg" alt="Captain J" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-deep-800 border-2 border-emerald-400 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">Captain J</h3>
            <p className="text-wave-400 font-medium mb-6">Founder & Lead Developer</p>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className="text-xs text-white/60">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 sm:p-10">
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                I build things that work and teach people to do the same.
              </p>
              <p className="text-white/40 leading-relaxed mb-6">
                Solo developer and AI consultant based in the Pacific. I&apos;ve built 6+ live products — from webcam streaming platforms to iOS apps to AI-powered automation tools. Every one of them is in production, serving real users.
              </p>
              <p className="text-white/40 leading-relaxed mb-6">
                I started BlueWave because I saw too many people overwhelmed by AI and too many consultants overcomplicating it. My approach is simple: show you what works, help you build it, and get out of the way.
              </p>
              <p className="text-white/40 leading-relaxed">
                Whether you&apos;re a business owner who wants to save 10 hours a week or a developer who wants to build AI-native apps — I&apos;ve been where you are, and I can get you where you want to go.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="glass rounded-xl px-6 py-4 text-center flex-1 min-w-[120px]">
                <div className="text-2xl font-bold text-gradient">6+</div>
                <div className="text-xs text-white/40 mt-1">Live Products</div>
              </div>
              <div className="glass rounded-xl px-6 py-4 text-center flex-1 min-w-[120px]">
                <div className="text-2xl font-bold text-gradient">50+</div>
                <div className="text-xs text-white/40 mt-1">Clients & Students</div>
              </div>
              <div className="glass rounded-xl px-6 py-4 text-center flex-1 min-w-[120px]">
                <div className="text-2xl font-bold text-gradient">24/7</div>
                <div className="text-xs text-white/40 mt-1">Systems Running</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
