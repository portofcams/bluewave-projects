"use client";

import { motion } from "framer-motion";
import { caseStudies } from "@/data/case-studies";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

function Section({
  title,
  content,
  delay = 0,
}: {
  title: string;
  content: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        {title}
      </h2>
      <div className="prose prose-invert prose-lg max-w-none">
        {content.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
            return (
              <h3
                key={i}
                className="text-xl font-semibold text-white mt-8 mb-3"
              >
                {paragraph.replace(/\*\*/g, "")}
              </h3>
            );
          }
          if (paragraph.startsWith("- ")) {
            return (
              <ul key={i} className="space-y-2 my-4">
                {paragraph.split("\n").map((item, j) => (
                  <li key={j} className="text-white/60 leading-relaxed">
                    {formatText(item.replace(/^- /, ""))}
                  </li>
                ))}
              </ul>
            );
          }
          if (paragraph.match(/^\d+\./)) {
            return (
              <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
                {paragraph.split("\n").map((item, j) => (
                  <li key={j} className="text-white/60 leading-relaxed">
                    {formatText(item.replace(/^\d+\.\s*/, ""))}
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <p key={i} className="text-white/60 leading-relaxed mb-4">
              {formatText(paragraph)}
            </p>
          );
        })}
      </div>
    </motion.div>
  );
}

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.replace(/\*\*/g, "")}
        </strong>
      );
    }
    return part;
  });
}

export default function CaseStudyClient({ slug }: { slug: string }) {
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <main className="ocean-gradient min-h-screen">
        <Nav />
        <div className="pt-32 px-6 text-center">
          <h1 className="text-4xl font-bold text-white">
            Case study not found
          </h1>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="ocean-gradient min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${cs.tagColor}`}
              >
                {cs.tag}
              </span>
              <span className="text-sm text-white/30">Case Study</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {cs.title}
            </h1>
            <p className="text-lg text-white/50 leading-relaxed max-w-3xl">
              {cs.excerpt}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
          >
            {cs.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-6 text-center"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${cs.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <Section title="The Challenge" content={cs.challenge} delay={0.3} />

          <div className="border-t border-white/5" />

          <Section title="The Solution" content={cs.solution} delay={0.1} />

          <div className="border-t border-white/5" />

          <Section title="The Results" content={cs.results} delay={0.1} />

          {/* Claude's Role */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`glass rounded-2xl p-8 border-l-4 border-ocean-500`}
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              Claude&apos;s Role
            </h3>
            <p className="text-white/60 leading-relaxed">{cs.claudeRole}</p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {cs.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-4 py-2 rounded-full bg-white/5 text-white/50 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between glass rounded-2xl p-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Want results like these?
              </h3>
              <p className="text-white/40">
                Let&apos;s talk about what AI can do for your business.
              </p>
            </div>
            <div className="flex gap-3">
              {cs.url !== "#" && (
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium px-5 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  View Live Site
                </a>
              )}
              <a
                href="/booking"
                className="btn-primary text-sm font-medium px-5 py-2.5 rounded-full text-white"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
