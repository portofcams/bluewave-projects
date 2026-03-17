"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const posts = [
  {
    title: "5 AI Prompts Every Business Owner Needs",
    excerpt:
      "Stop Googling \"best AI prompts.\" Here are five I use daily that actually move the needle for small businesses.",
    date: "Mar 12, 2026",
    readTime: "4 min read",
    tag: "Prompts",
    tagColor: "bg-ocean-500/20 text-ocean-400",
    gradient: "from-ocean-500 to-wave-500",
  },
  {
    title: "Why Claude is My Secret Weapon",
    excerpt:
      "I've used every major AI model extensively. Here's why Claude became my daily driver — and why it might become yours too.",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    tag: "Tools",
    tagColor: "bg-wave-500/20 text-wave-400",
    gradient: "from-wave-500 to-glacier-300",
  },
  {
    title: "How I Built 6 Apps in 6 Months",
    excerpt:
      "From idea to production in record time. The stack, the process, and the AI tools that made it possible as a solo developer.",
    date: "Feb 26, 2026",
    readTime: "8 min read",
    tag: "Building",
    tagColor: "bg-lava-500/20 text-lava-500",
    gradient: "from-lava-500 to-amber-400",
  },
];

function BlogCard({ post, index }: { post: (typeof posts)[number]; index: number }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass glass-hover rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer"
    >
      {/* Gradient header bar */}
      <div className={`h-1.5 bg-gradient-to-r ${post.gradient}`} />

      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${post.tagColor}`}>
            {post.tag}
          </span>
          <span className="text-xs text-white/30">{post.date}</span>
          <span className="text-xs text-white/20">{post.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {post.title}
        </h3>

        <p className="text-white/40 leading-relaxed mb-6">{post.excerpt}</p>

        <div className="flex items-center gap-2 text-ocean-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
          Read More
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-32 px-6 relative">
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
            From the Lab
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Latest from</span>{" "}
            <span className="text-gradient">BlueWave.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Thoughts on AI, building products, and the future of work. No fluff — just signal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            View All Posts
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
