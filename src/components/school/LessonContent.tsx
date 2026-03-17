'use client';

import React from 'react';

interface LessonContentProps {
  content: string;
}

// Simple markdown-to-React renderer (no external library)
function parseMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  function nextKey() {
    return `md-${key++}`;
  }

  // Parse inline formatting
  function parseInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let inlineKey = 0;

    while (remaining.length > 0) {
      // Bold + Italic
      const boldItalicMatch = remaining.match(/^\*\*\*(.*?)\*\*\*/);
      if (boldItalicMatch) {
        parts.push(
          <strong key={`bi-${inlineKey++}`} className="font-bold italic text-white">
            {boldItalicMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldItalicMatch[0].length);
        continue;
      }

      // Bold
      const boldMatch = remaining.match(/^\*\*(.*?)\*\*/);
      if (boldMatch) {
        parts.push(
          <strong key={`b-${inlineKey++}`} className="font-semibold text-white">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Italic
      const italicMatch = remaining.match(/^\*(.*?)\*/);
      if (italicMatch) {
        parts.push(
          <em key={`i-${inlineKey++}`} className="italic text-glacier-200">
            {italicMatch[1]}
          </em>
        );
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Inline code
      const codeMatch = remaining.match(/^`(.*?)`/);
      if (codeMatch) {
        parts.push(
          <code
            key={`c-${inlineKey++}`}
            className="px-1.5 py-0.5 rounded bg-white/10 text-wave-400 font-mono text-sm"
          >
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
          <a
            key={`a-${inlineKey++}`}
            href={linkMatch[2]}
            className="text-wave-400 hover:text-wave-300 underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // Find next special character
      const nextSpecial = remaining.search(/[\*`\[]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        // Special char but didn't match any pattern, treat as literal
        parts.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }

    return parts;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
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
      i++; // skip closing ```
      elements.push(
        <div key={nextKey()} className="my-4 rounded-lg overflow-hidden border border-white/10">
          {lang && (
            <div className="px-4 py-1.5 bg-white/5 border-b border-white/10 text-xs text-white/40 font-mono">
              {lang}
            </div>
          )}
          <pre className="p-4 bg-deep-800/80 overflow-x-auto">
            <code className="text-sm font-mono text-glacier-200 leading-relaxed">
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={nextKey()} className="text-lg font-semibold text-white mt-8 mb-3">
          {parseInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={nextKey()} className="text-xl font-bold text-white mt-10 mb-4 pb-2 border-b border-white/10">
          {parseInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={nextKey()} className="text-2xl md:text-3xl font-bold text-gradient mb-6">
          {parseInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith('>') || (lines[i].trim() === '' && i + 1 < lines.length && lines[i + 1]?.startsWith('>')))) {
        if (lines[i].trim() === '') {
          quoteLines.push('');
        } else {
          quoteLines.push(lines[i].replace(/^>\s?/, ''));
        }
        i++;
      }
      elements.push(
        <blockquote
          key={nextKey()}
          className="my-4 pl-4 border-l-2 border-wave-500/50 bg-wave-500/5 rounded-r-lg py-3 pr-4"
        >
          {quoteLines.map((ql, qi) =>
            ql === '' ? (
              <div key={qi} className="h-2" />
            ) : (
              <p key={qi} className="text-white/80 text-sm leading-relaxed">
                {parseInline(ql)}
              </p>
            )
          )}
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Parse header
      if (tableLines.length >= 2) {
        const headerCells = tableLines[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
        // Skip separator row (index 1)
        const bodyRows = tableLines.slice(2).map(row =>
          row.split('|').filter(c => c.trim() !== '').map(c => c.trim())
        );

        elements.push(
          <div key={nextKey()} className="my-4 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5">
                  {headerCells.map((cell, ci) => (
                    <th key={ci} className="px-4 py-2.5 text-left font-semibold text-white/90 border-b border-white/10">
                      {parseInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-white/70">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
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
        <ul key={nextKey()} className="my-3 space-y-2 pl-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2 text-white/80 text-sm leading-relaxed">
              <span className="text-wave-400 mt-1 shrink-0">&#8226;</span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
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
        <ol key={nextKey()} className="my-3 space-y-2 pl-1">
          {items.map((item, ii) => (
            <li key={ii} className="flex gap-2.5 text-white/80 text-sm leading-relaxed">
              <span className="text-wave-400 font-semibold shrink-0 min-w-[18px] text-right">
                {ii + 1}.
              </span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={nextKey()} className="text-white/75 text-sm leading-relaxed my-3">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

export default function LessonContent({ content }: LessonContentProps) {
  const elements = parseMarkdown(content);

  return (
    <div className="max-w-none">
      {elements}
    </div>
  );
}
