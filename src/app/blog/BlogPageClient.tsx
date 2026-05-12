"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function BlogCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass glass-hover rounded-2xl overflow-hidden transition-all duration-500"
    >
      <div className={`h-1.5 bg-gradient-to-r ${post.gradient}`} />

      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${post.categoryColor}`}
          >
            {post.category}
          </span>
          <span className="text-xs text-white/30">{post.date}</span>
          <span className="text-xs text-white/20">{post.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
          {post.title}
        </h3>

        <p className="text-white/40 leading-relaxed mb-6">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-ocean-400 text-sm font-medium group-hover:gap-3 transition-all duration-300"
        >
          Read More
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen ocean-gradient">
      <Nav />

      <div className="py-24 pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm font-medium text-ocean-400 uppercase tracking-widest mb-4 block">
              From the Lab
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">The BlueWave</span>{" "}
              <span className="text-gradient">Blog.</span>
            </h1>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              Thoughts on AI, building products, and the future of work. No
              fluff — just signal.
            </p>
          </motion.div>

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
