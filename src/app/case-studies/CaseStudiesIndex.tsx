"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { caseStudies } from "@/data/case-studies";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function CaseStudyCard({
  cs,
  index,
}: {
  cs: (typeof caseStudies)[number];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={`/case-studies/${cs.slug}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group glass glass-hover rounded-2xl p-8 flex flex-col transition-all duration-500 block"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${cs.tagColor}`}
        >
          {cs.tag}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
        {cs.title}
      </h2>

      <p className="text-white/40 leading-relaxed mb-6 flex-grow text-sm">
        {cs.excerpt}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {cs.stats.slice(0, 4).map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className={`text-lg font-bold bg-gradient-to-r ${cs.gradient} bg-clip-text text-transparent`}
            >
              {stat.value}
            </div>
            <div className="text-xs text-white/30">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {cs.techStack.slice(0, 5).map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/5">
        <span className="text-sm text-ocean-400 group-hover:text-ocean-300 transition-colors flex items-center gap-1">
          Read Case Study
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

export default function CaseStudiesIndex() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
              Case Studies
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">Built with</span>{" "}
              <span className="text-gradient">Claude AI</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              Real projects. Real results. Every platform below was architected,
              coded, and deployed by a solo developer working with Claude as the
              full engineering team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.slug} cs={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
