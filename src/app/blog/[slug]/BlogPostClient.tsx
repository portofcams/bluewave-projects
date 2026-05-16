"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts } from "@/data/blog-posts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { InlinePropertyBrief } from "@/components/InlinePropertyBrief";

// Posts in the "Hawaii Real Estate" or "Hawaii Operators" category get
// an inline Property Brief banner right after the article content —
// the audience signal is already calibrated (they're reading about
// Hawaii property data) so conversion-to-PB-subscriber is highest here.
const PB_BANNER_CATEGORIES = new Set([
  "Hawaii Real Estate",
  "Hawaii Operators",
]);

function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={key++}
            className="bg-deep-700/50 border border-white/5 rounded-xl p-6 overflow-x-auto my-6"
          >
            <code className="text-sm text-glacier-300 font-mono">
              {codeLines.join("\n")}
            </code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4"
        >
          {line.replace("## ", "")}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3"
        >
          {line.replace("### ", "")}
        </h3>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      const text = line.replace("- ", "");
      elements.push(
        <li
          key={key++}
          className="text-white/60 leading-relaxed ml-4 mb-2 list-disc"
        >
          {renderInlineFormatting(text)}
        </li>
      );
      continue;
    }

    // Numbered list
    const numberedMatch = line.match(/^(\d+)\.\s/);
    if (numberedMatch) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        <li
          key={key++}
          className="text-white/60 leading-relaxed ml-4 mb-2 list-decimal"
        >
          {renderInlineFormatting(text)}
        </li>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-white/60 leading-relaxed mb-4 text-lg">
        {renderInlineFormatting(line)}
      </p>
    );
  }

  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Handle bold text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Handle inline code
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code
            key={`${i}-${j}`}
            className="bg-white/5 text-ocean-400 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {cp.slice(1, -1)}
          </code>
        );
      }
      return cp;
    });
  });
}

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-deep-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="text-ocean-400 hover:text-ocean-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <div className="min-h-screen ocean-gradient">
      <Nav />

      <article className="py-16 sm:py-24 pt-32 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors mb-10"
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
              Back to Blog
            </Link>
          </motion.div>

          {/* Post header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${post.categoryColor}`}
              >
                {post.category}
              </span>
              <span className="text-sm text-white/30">{post.date}</span>
              <span className="text-sm text-white/20">{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center gap-4 pb-8 mb-10 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-500 to-wave-500 flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-white/40 text-sm">{post.author.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Post content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderMarkdownContent(post.content)}
          </motion.div>

          {/* Inline Property Brief banner for Hawaii-property-relevant posts */}
          {PB_BANNER_CATEGORIES.has(post.category) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="my-12"
            >
              <InlinePropertyBrief variant="banner" />
            </motion.div>
          )}

          {/* Divider */}
          <div className="my-16 border-t border-white/10" />

          {/* Related posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              More from BlueWave
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group glass glass-hover rounded-xl p-6 transition-all duration-300"
                >
                  <div
                    className={`h-1 w-12 bg-gradient-to-r ${related.gradient} rounded-full mb-4`}
                  />
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${related.categoryColor} mb-3 inline-block`}
                  >
                    {related.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white group-hover:text-ocean-400 transition-colors leading-snug">
                    {related.title}
                  </h3>
                  <p className="text-xs text-white/30 mt-2">
                    {related.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
