'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Wave } from '@/data/curriculum-types';
import {
  isWaveComplete,
  getWaveCompletionDate,
  getCertificateName,
  setCertificateName,
  getProgress,
} from '@/lib/school-progress';

interface CertificateClientProps {
  wave: Wave;
  nextWaveId: string | null;
}

export default function CertificateClient({ wave, nextWaveId }: CertificateClientProps) {
  const [mounted, setMounted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [completionDate, setCompletionDate] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    setComplete(isWaveComplete(wave.id));
    setCompletionDate(getWaveCompletionDate(wave.id));
    setName(getCertificateName());
  }, [wave.id]);

  const handleNameChange = (value: string) => {
    setName(value);
    setCertificateName(value);
  };

  const totalLessons = wave.units.reduce((sum, u) => sum + u.lessons.length, 0);
  const totalExercises = wave.units.reduce(
    (sum, u) => sum + u.lessons.reduce((s, l) => s + l.exercises.length, 0),
    0
  );

  const waveXP = (() => {
    if (!mounted) return 0;
    const progress = getProgress();
    const lessonIds = wave.units.flatMap(u => u.lessons.map(l => l.id));
    const exerciseIds = wave.units.flatMap(u => u.lessons.flatMap(l => l.exercises.map(e => e.id)));
    const allIds = [...lessonIds, ...exerciseIds];
    return allIds.reduce((sum, id) => sum + (progress.xpEarned[id] || 0), 0);
  })();

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    window.print();
  };

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  // Wave not complete — show message
  if (!complete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-10 max-w-md text-center"
        >
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-3">Certificate Locked</h2>
          <p className="text-white/50 text-sm mb-6">
            Complete all lessons in <span className="text-white font-medium">Wave {wave.number}: {wave.title}</span> to earn your certificate.
          </p>
          <Link
            href="/school"
            className="btn-primary inline-block px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
          >
            Back to School
          </Link>
        </motion.div>
      </div>
    );
  }

  const formattedDate = completionDate
    ? new Date(completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Certificate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Gradient border wrapper */}
        <div className="p-[2px] rounded-2xl bg-gradient-to-br from-ocean-500 via-wave-400 to-glacier-300">
          <div className="rounded-2xl bg-deep-900 p-8 md:p-12 relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-wave-500/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-ocean-500/5 rounded-full blur-[60px]" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Org name */}
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30 mb-1">
                BlueWave Projects
              </div>
              <div className="text-[10px] text-white/20 mb-6">AI School</div>

              {/* Heading */}
              <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                Certificate of Completion
              </h1>

              {/* Wave name */}
              <div className="flex items-center justify-center gap-2 mt-4 mb-8">
                <span className="text-2xl">{wave.icon}</span>
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: wave.color + '20', color: wave.color }}
                  >
                    Wave {wave.number}
                  </span>
                  <h2 className="text-lg font-bold text-white mt-1">{wave.title}</h2>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

              {/* Awarded to */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                Awarded to
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter your name"
                className="bg-transparent border-b border-white/20 focus:border-wave-400 text-center text-xl md:text-2xl font-bold text-white outline-none pb-1 w-full max-w-sm mx-auto placeholder:text-white/20 transition-colors"
              />

              {/* Date */}
              <p className="text-sm text-white/40 mt-6">{formattedDate}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 mb-6">
                <div className="glass rounded-xl p-3">
                  <div className="text-lg font-bold text-gradient">{waveXP}</div>
                  <div className="text-[10px] text-white/40">XP Earned</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{totalLessons}</div>
                  <div className="text-[10px] text-white/40">Lessons</div>
                </div>
                <div className="glass rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{totalExercises}</div>
                  <div className="text-[10px] text-white/40">Exercises</div>
                </div>
              </div>

              {/* Decorative wave SVG */}
              <svg
                viewBox="0 0 400 40"
                className="w-full h-8 opacity-10 mt-2"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 20 Q25 5 50 20 Q75 35 100 20 Q125 5 150 20 Q175 35 200 20 Q225 5 250 20 Q275 35 300 20 Q325 5 350 20 Q375 35 400 20"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0091cc" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-8 print:hidden"
      >
        <button
          onClick={handleShare}
          className="glass glass-hover rounded-lg px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {copied ? 'Copied!' : 'Share'}
        </button>

        <button
          onClick={handleDownload}
          className="glass glass-hover rounded-lg px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>

        {nextWaveId && (
          <Link
            href={`/school/certificate/${nextWaveId}`}
            className="btn-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2"
          >
            Next Wave
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        )}

        <Link
          href="/school"
          className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
        >
          Back to School
        </Link>
      </motion.div>
    </div>
  );
}
