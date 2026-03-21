'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface LessonContentProps {
  content: string;
  waveColor?: string;
}

/* ── Animated section wrapper ── */
function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/* ── Callout box component ── */
function Callout({ type, children }: { type: string; children: React.ReactNode[] }) {
  const config: Record<string, { bg: string; border: string; accent: string; icon: React.ReactNode; label: string }> = {
    tip: {
      bg: 'bg-cyan-500/5',
      border: 'border-cyan-500/20',
      accent: 'text-cyan-400',
      label: 'Pro Tip',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    },
    key: {
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/20',
      accent: 'text-amber-400',
      label: 'Key Concept',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />,
    },
    warning: {
      bg: 'bg-red-500/5',
      border: 'border-red-500/20',
      accent: 'text-red-400',
      label: 'Watch Out',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    },
    example: {
      bg: 'bg-purple-500/5',
      border: 'border-purple-500/20',
      accent: 'text-purple-400',
      label: 'Example',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    try: {
      bg: 'bg-green-500/5',
      border: 'border-green-500/20',
      accent: 'text-green-400',
      label: 'Try It',
      icon: <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />,
    },
  };
  const c = config[type] || config.tip;
  return (
    <div className={`my-6 rounded-xl ${c.bg} border ${c.border} p-5`}>
      <div className={`flex items-center gap-2 mb-3 ${c.accent}`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{c.icon}</svg>
        <span className="text-xs font-bold uppercase tracking-wider">{c.label}</span>
      </div>
      <div className="text-[15px] text-white/80 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

/* ── Markdown parser ── */
function parseMarkdown(content: string, waveColor: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let sectionIndex = 0;

  function nextKey() { return `md-${key++}`; }

  function parseInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let inlineKey = 0;

    while (remaining.length > 0) {
      // Bold + Italic
      const boldItalicMatch = remaining.match(/^\*\*\*(.*?)\*\*\*/);
      if (boldItalicMatch) {
        parts.push(<strong key={`bi-${inlineKey++}`} className="font-bold italic text-white">{boldItalicMatch[1]}</strong>);
        remaining = remaining.slice(boldItalicMatch[0].length);
        continue;
      }
      // Bold
      const boldMatch = remaining.match(/^\*\*(.*?)\*\*/);
      if (boldMatch) {
        parts.push(<strong key={`b-${inlineKey++}`} className="font-semibold text-white">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }
      // Italic
      const italicMatch = remaining.match(/^\*(.*?)\*/);
      if (italicMatch) {
        parts.push(<em key={`i-${inlineKey++}`} className="italic text-glacier-200">{italicMatch[1]}</em>);
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }
      // Inline code
      const codeMatch = remaining.match(/^`(.*?)`/);
      if (codeMatch) {
        parts.push(
          <code key={`c-${inlineKey++}`} className="px-1.5 py-0.5 rounded-md bg-wave-500/10 text-wave-400 font-mono text-[13px] border border-wave-500/10">
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }
      // Link
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a key={`a-${inlineKey++}`} href={linkMatch[2]} className="text-wave-400 hover:text-wave-300 underline underline-offset-2 font-medium" target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }
      const nextSpecial = remaining.search(/[\*`\[]/);
      if (nextSpecial === -1) { parts.push(remaining); break; }
      else if (nextSpecial === 0) { parts.push(remaining[0]); remaining = remaining.slice(1); }
      else { parts.push(remaining.slice(0, nextSpecial)); remaining = remaining.slice(nextSpecial); }
    }
    return parts;
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    // Callout blocks: :::tip / :::key / :::warning / :::example / :::try
    if (line.trim().startsWith(':::')) {
      const type = line.trim().slice(3).trim().toLowerCase();
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(':::')) {
        calloutLines.push(lines[i]);
        i++;
      }
      i++; // skip closing :::
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <Callout type={type}>
            {calloutLines.filter(l => l.trim()).map((cl, ci) => (
              <p key={ci}>{parseInline(cl)}</p>
            ))}
          </Callout>
        </AnimatedSection>
      );
      sectionIndex++;
      continue;
    }

    // Horizontal rule / visual separator
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(
        <div key={nextKey()} className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: waveColor }} />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      );
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <div className="my-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            {lang && (
              <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <span className="text-xs text-white/30 font-mono ml-2">{lang}</span>
              </div>
            )}
            <pre className="p-5 bg-deep-900/80 overflow-x-auto">
              <code className="text-[13px] font-mono text-glacier-200 leading-relaxed">{codeLines.join('\n')}</code>
            </pre>
          </div>
        </AnimatedSection>
      );
      sectionIndex++;
      continue;
    }

    // H1
    if (line.startsWith('# ')) {
      elements.push(
        <AnimatedSection key={nextKey()}>
          <h1 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ color: waveColor }}>
            {parseInline(line.slice(2))}
          </h1>
        </AnimatedSection>
      );
      i++; sectionIndex++; continue;
    }

    // H2 — section headers with accent bar
    if (line.startsWith('## ')) {
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <div className="mt-12 mb-5">
            <div className="w-10 h-1 rounded-full mb-3" style={{ backgroundColor: waveColor }} />
            <h2 className="text-2xl font-bold text-white leading-tight">
              {parseInline(line.slice(3))}
            </h2>
          </div>
        </AnimatedSection>
      );
      i++; sectionIndex++; continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <h3 className="text-lg font-bold text-white mt-8 mb-3">
            {parseInline(line.slice(4))}
          </h3>
        </AnimatedSection>
      );
      i++; sectionIndex++; continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith('>') || (lines[i].trim() === '' && i + 1 < lines.length && lines[i + 1]?.startsWith('>')))) {
        if (lines[i].trim() === '') quoteLines.push('');
        else quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <blockquote className="my-6 pl-5 border-l-3 rounded-r-xl py-4 pr-5 bg-white/[0.03]" style={{ borderLeftColor: waveColor + '60' }}>
            {quoteLines.map((ql, qi) =>
              ql === '' ? <div key={qi} className="h-2" /> : (
                <p key={qi} className="text-[15px] text-white/70 leading-relaxed">{parseInline(ql)}</p>
              )
            )}
          </blockquote>
        </AnimatedSection>
      );
      sectionIndex++;
      continue;
    }

    // Table — styled cards
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const headerCells = tableLines[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
        const bodyRows = tableLines.slice(2).map(row =>
          row.split('|').filter(c => c.trim() !== '').map(c => c.trim())
        );
        elements.push(
          <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
            <div className="my-6 overflow-x-auto rounded-xl border border-white/10 shadow-lg">
              <table className="w-full text-[14px]">
                <thead>
                  <tr style={{ backgroundColor: waveColor + '10' }}>
                    {headerCells.map((cell, ci) => (
                      <th key={ci} className="px-5 py-3 text-left font-bold text-white border-b border-white/10">
                        {parseInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, ri) => (
                    <tr key={ri} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-5 py-3 text-white/70">{parseInline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        );
        sectionIndex++;
      }
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        items.push(lines[i].replace(/^[-*]\s/, ''));
        i++;
      }
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <ul className="my-4 space-y-2.5 pl-1">
            {items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-[15px] text-white/75 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: waveColor }} />
                <span>{parseInline(item)}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      );
      sectionIndex++;
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
          <ol className="my-4 space-y-3 pl-1">
            {items.map((item, ii) => (
              <li key={ii} className="flex gap-3 text-[15px] text-white/75 leading-relaxed">
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{ backgroundColor: waveColor + '15', color: waveColor }}
                >
                  {ii + 1}
                </span>
                <span>{parseInline(item)}</span>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      );
      sectionIndex++;
      continue;
    }

    // Paragraph
    elements.push(
      <AnimatedSection key={nextKey()} delay={sectionIndex * 0.03}>
        <p className="text-[15px] text-white/70 leading-[1.8] my-4">
          {parseInline(line)}
        </p>
      </AnimatedSection>
    );
    i++;
    sectionIndex++;
  }

  return elements;
}

export default function LessonContent({ content, waveColor = '#0ea5e9' }: LessonContentProps) {
  const elements = parseMarkdown(content, waveColor);
  return <div className="max-w-none">{elements}</div>;
}
