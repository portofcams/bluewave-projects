"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

const floatingItems = [
  { label: "Claude AI", x: "8%", y: "18%", delay: 0, icon: "sparkle" },
  { label: "React", x: "85%", y: "15%", delay: 0.5, icon: "code" },
  { label: "Next.js", x: "80%", y: "68%", delay: 1.2, icon: "bolt" },
  { label: "Python", x: "10%", y: "65%", delay: 0.8, icon: "terminal" },
  { label: "APIs", x: "92%", y: "40%", delay: 1.5, icon: "server" },
  { label: "iOS", x: "3%", y: "42%", delay: 0.3, icon: "phone" },
];

const icons: Record<string, ReactNode> = {
  sparkle: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
      <path d="M10 1l2.39 6.12L18.5 10l-6.11 2.88L10 19l-2.39-6.12L1.5 10l6.11-2.88z" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 5L2 10l5 5M13 5l5 5-5 5" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
      <path d="M11.3 1.5L4 11h5l-1.3 7.5L16 9h-5l1.3-7.5z" />
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7l4 3-4 3M10 14h6" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="14" height="5" rx="1" />
      <rect x="3" y="12" width="14" height="5" rx="1" />
      <circle cx="6" cy="5.5" r="1" fill="currentColor" />
      <circle cx="6" cy="14.5" r="1" fill="currentColor" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="10" height="16" rx="2" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </svg>
  ),
};

const stats = [
  { value: "6+", label: "Live Products" },
  { value: "400+", label: "Cameras Streaming" },
  { value: "99.9%", label: "API Uptime" },
];

// Animated wave SVG for the background
function OceanWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-20">
      <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
        <motion.path
          animate={{
            d: [
              "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,213.3C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,218.7C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,261.3C672,256,768,224,864,213.3C960,203,1056,213,1152,218.7C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          fill="url(#wave-fill-1)"
        />
        <motion.path
          animate={{
            d: [
              "M0,256L48,250.7C96,245,192,235,288,234.7C384,235,480,245,576,256C672,267,768,277,864,272C960,267,1056,245,1152,240C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,272L48,266.7C96,261,192,251,288,256C384,261,480,283,576,277.3C672,272,768,240,864,234.7C960,229,1056,251,1152,261.3C1248,272,1344,272,1392,272L1440,272L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,256L48,250.7C96,245,192,235,288,234.7C384,235,480,245,576,256C672,267,768,277,864,272C960,267,1056,245,1152,240C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          fill="url(#wave-fill-2)"
        />
        <defs>
          <linearGradient id="wave-fill-1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave-fill-2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0091cc" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Terminal-like code preview
function CodePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="hidden lg:block absolute right-[6%] top-[22%] w-[320px]"
    >
      <div className="glass rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-ocean-500/10">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
          <span className="text-[10px] text-white/20 ml-2 font-mono">bluewave-cli</span>
        </div>
        <div className="p-4 font-mono text-xs space-y-1.5">
          <div className="text-white/30">
            <span className="text-emerald-400/80">$</span> bluewave deploy --prod
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-ocean-400/70"
          >
            ▸ Building...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="text-ocean-400/70"
          >
            ▸ Running tests...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="text-emerald-400/80"
          >
            ✓ Deployed to production
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.5 }}
            className="text-white/20"
          >
            ▸ https://bluewaveprojects.com
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Floating metrics card
function MetricsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      className="hidden lg:block absolute left-[4%] top-[55%] w-[220px]"
    >
      <div className="glass rounded-xl p-4 border border-white/[0.08] shadow-2xl shadow-ocean-500/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/40 uppercase tracking-wider">Live Metrics</span>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/30">Cameras Online</span>
            <span className="text-xs font-mono text-emerald-400/80">412</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-ocean-400/60"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/30">API Requests/hr</span>
            <span className="text-xs font-mono text-ocean-400/80">2.4k</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-ocean-500/60 to-wave-400/60"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/30">Uptime</span>
            <span className="text-xs font-mono text-wave-400/80">99.97%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ocean-600/20 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-wave-500/15 rounded-full blur-[128px] animate-pulse-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ocean-800/20 rounded-full blur-[160px]" />
        {/* Extra fill - subtle radial light */}
        <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-wave-400/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-[15%] left-[15%] w-[350px] h-[350px] bg-ocean-500/8 rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated ocean waves at bottom */}
      <OceanWaves />

      {/* Floating tech pills */}
      {floatingItems.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 + item.delay, ease: "easeOut" }}
          className="absolute hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30 text-xs font-medium backdrop-blur-sm"
          style={{ left: item.x, top: item.y }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4 + item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-2"
          >
            {icons[item.icon]}
            {item.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Floating side elements to fill space */}
      <CodePreview />
      <MetricsCard />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/60 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now accepting AI consulting clients
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
        >
          <span className="text-white">We build the</span>
          <br />
          <span className="text-gradient">future, faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          AI consulting. Custom apps. Live platforms. R&amp;D that ships.
          <br className="hidden sm:block" />
          Born in the Pacific — building for everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="btn-primary px-8 py-4 rounded-full text-white font-medium text-lg"
          >
            See Our Work
          </a>
          <a
            href="/school"
            className="px-8 py-4 rounded-full text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 font-medium text-lg"
          >
            Learn AI
          </a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="relative z-10 mt-20 sm:mt-28 mb-8 w-full max-w-3xl mx-auto px-6"
      >
        <div className="glass rounded-2xl px-6 py-5 flex items-center justify-around divide-x divide-white/5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 text-center px-4">
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/30">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 mb-6"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
