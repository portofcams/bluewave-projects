"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-ocean-500/8 rounded-full blur-[128px]" />
      </div>

      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, -200, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 1440 200"
            className="w-[200%] h-32 text-ocean-900/40"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,112C672,107,768,117,864,133.3C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,200L0,200Z"
            />
          </svg>
        </motion.div>
        <motion.div
          animate={{ x: [0, 150, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg
            viewBox="0 0 1440 200"
            className="w-[200%] h-24 text-ocean-800/30"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,165.3C840,171,960,149,1080,128C1200,107,1320,85,1380,74.7L1440,64L1440,200L0,200Z"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-2xl"
      >
        {/* Big 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[10rem] sm:text-[14rem] font-black leading-none text-gradient select-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-4 -mt-4"
        >
          Looks like you drifted off course.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-white/40 mb-10"
        >
          This page doesn&apos;t exist, but we&apos;ve got plenty that do.
        </motion.p>

        {/* Navigation links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="btn-primary px-8 py-3 rounded-full text-white font-medium text-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/school"
            className="px-8 py-3 rounded-full glass glass-hover text-white/60 hover:text-white font-medium text-lg transition-colors"
          >
            AI School
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 rounded-full glass glass-hover text-white/60 hover:text-white font-medium text-lg transition-colors"
          >
            Blog
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
