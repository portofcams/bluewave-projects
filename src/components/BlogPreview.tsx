"use client";

import { useReveal } from "@/hooks/useReveal";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

const posts = blogPosts.slice(0, 3).map((post) => ({
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  readTime: post.readTime,
  tag: post.category,
  tagColor: post.categoryColor,
  gradient: post.gradient,
  slug: post.slug,
}));

function BlogCard({ post, index }: { post: (typeof posts)[number]; index: number }) {
  const { ref, inView } = useReveal();
  const delayClass = index >= 1 && index <= 8 ? `reveal-d-${index}` : "";

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        ref={ref}
        className={`reveal-up ${delayClass} ${inView ? "in" : ""} group glass glass-hover rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer`}
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
      </div>
    </Link>
  );
}

export default function BlogPreview() {
  const { ref, inView } = useReveal();

  return (
    <section id="blog" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-950/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={ref}
          className={`reveal-up ${inView ? "in" : ""} text-center mb-20`}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>

        <div
          className={`reveal-up-sm reveal-d-5 ${inView ? "in" : ""} text-center mt-12`}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            View All Posts
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
