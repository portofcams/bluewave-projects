'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { allWaves } from '@/lib/curriculum';
import { getTotalXP, getCurrentStreak, isLessonComplete, getProgress, saveProgressDirect, isWaveComplete } from '@/lib/school-progress';
import { getStoredUser, isLoggedIn, checkSubscription } from '@/lib/auth';
import { initProgressSync, mergeServerProgress } from '@/lib/progress-sync';
import XPBar from '@/components/school/XPBar';

/* ── Wave icon mapping (Lucide-style SVG paths, no emojis) ── */
const WAVE_ICONS: Record<number, React.ReactNode> = {
  1: <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
  2: <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />,
  3: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
  4: <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
  5: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  6: <><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" /><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 15h6" /></>,
  7: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  8: <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
  9: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l8-3 8 3M4 10l8-3 8 3M4 14l8-3 8 3M4 18l8-3 8 3" />,
};

const difficultyColors: Record<string, string> = {
  beginner: 'text-green-400 bg-green-500/10 border-green-500/20',
  intermediate: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  advanced: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export default function SchoolPage() {
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setTotalXP(getTotalXP());
    setStreak(getCurrentStreak());
    setCompletedCount(getProgress().completedLessons.length);

    // Check user subscription
    const loggedIn = isLoggedIn();
    const storedUser = getStoredUser();
    if (storedUser?.plan) {
      setUserPlan(storedUser.plan);
    } else if (loggedIn) {
      checkSubscription().then(sub => setUserPlan(sub.plan));
    }

    // Initialize progress syncing and merge server state
    const cleanup = initProgressSync();

    if (loggedIn) {
      const localProgress = getProgress();
      mergeServerProgress(localProgress).then(merged => {
        if (merged) {
          saveProgressDirect(merged);
          setTotalXP(Object.values(merged.xpEarned).reduce((s, x) => s + x, 0));
          setStreak(merged.currentStreak);
          setCompletedCount(merged.completedLessons.length);
        }
      });
    }

    return cleanup;
  }, []);

  const totalLessons = allWaves.reduce((sum, w) => sum + w.units.reduce((s, u) => s + u.lessons.length, 0), 0);
  const totalCurriculumXP = allWaves.reduce((sum, w) => sum + w.totalXP, 0);

  // Build a flat list of all lessons in order for the journey path
  const allLessons = allWaves.flatMap(w => w.units.flatMap(u => u.lessons));

  // Find the first incomplete lesson
  const firstIncompleteIndex = mounted
    ? allLessons.findIndex(l => !isLessonComplete(l.id))
    : 0;

  return (
    <div className="min-h-screen pb-16">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' }} />
          <div className="absolute top-20 right-1/4 w-[400px] h-[250px] rounded-full blur-[100px] opacity-8" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }} />
        </div>

        <div className="relative px-6 pt-16 pb-12 lg:pt-12 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-wave-400 mb-3">Your AI Journey</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              AI School
            </h1>
            <p className="text-white/40 text-base max-w-md mx-auto mb-10">
              Master AI skills through 9 progressive waves. Complete lessons, earn XP, and level up.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-12 mb-8">
              <div className="text-center">
                <div className="text-3xl font-black text-white">{mounted ? completedCount : 0}<span className="text-white/20 text-lg font-normal">/{totalLessons}</span></div>
                <div className="text-[11px] text-white/30 uppercase tracking-wider mt-1">Lessons</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-black text-wave-400">{mounted ? totalXP : 0}</div>
                <div className="text-[11px] text-white/30 uppercase tracking-wider mt-1">XP Earned</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-black text-lava-500">{mounted && streak > 0 ? streak : 0}</div>
                <div className="text-[11px] text-white/30 uppercase tracking-wider mt-1">Day Streak</div>
              </div>
            </div>

            {mounted && <div className="max-w-md mx-auto"><XPBar totalXP={totalXP} /></div>}
          </motion.div>
        </div>
      </div>

      {/* ── Journey Path ── */}
      <div className="px-4 max-w-3xl mx-auto">
        {allWaves.map((wave, wi) => {
          const waveLessons = wave.units.flatMap(u => u.lessons);
          const waveCompleted = mounted ? waveLessons.filter(l => isLessonComplete(l.id)).length : 0;
          const waveProgress = waveLessons.length > 0 ? (waveCompleted / waveLessons.length) * 100 : 0;
          const waveComplete = mounted && isWaveComplete(wave.id);

          return (
            <motion.section
              key={wave.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: wi * 0.08 }}
            >
              {/* ── Wave Header Banner ── */}
              <div
                className="relative rounded-2xl p-6 mb-2 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${wave.color}15, ${wave.color}08)` }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20"
                  style={{ backgroundColor: wave.color }}
                />
                <div className="relative flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: wave.color + '20', border: `1px solid ${wave.color}30` }}
                  >
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={wave.color} strokeWidth={1.8}>
                      {WAVE_ICONS[wave.number]}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: wave.color + '20', color: wave.color }}
                      >
                        Wave {wave.number}
                      </span>
                      {waveComplete && (
                        <Link
                          href={`/school/certificate/${wave.id}`}
                          className="text-[10px] font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                          Certificate
                        </Link>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-white leading-tight">{wave.title}</h2>
                    <p className="text-sm text-white/40 mt-0.5">{wave.subtitle}</p>
                  </div>
                  <div className="hidden sm:block text-right shrink-0">
                    <div className="text-2xl font-black" style={{ color: wave.color }}>{waveCompleted}/{waveLessons.length}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider">{wave.totalXP} XP</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: wave.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${waveProgress}%` }}
                    transition={{ duration: 1, delay: 0.3 + wi * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* ── Journey Nodes (Winding Path) ── */}
              <div className="relative py-4">
                {waveLessons.map((lesson, li) => {
                  const done = mounted && isLessonComplete(lesson.id);
                  const globalIndex = allLessons.findIndex(l => l.id === lesson.id);
                  const isCurrent = globalIndex === firstIncompleteIndex;
                  const isPremiumLocked = mounted && wave.number > 1 && userPlan !== 'school' && userPlan !== 'pro';
                  const isLocked = isPremiumLocked || (!done && globalIndex > firstIncompleteIndex + 2);
                  const lessonTotalXP = lesson.xp + lesson.exercises.reduce((s, e) => s + e.xpBonus, 0);

                  // Alternate left/right for winding path feel
                  const isRight = li % 2 === 1;
                  const isFirstInUnit = wave.units.some(u => u.lessons[0]?.id === lesson.id);
                  const unitForLesson = wave.units.find(u => u.lessons.some(l => l.id === lesson.id));

                  return (
                    <div key={lesson.id}>
                      {/* Unit divider */}
                      {isFirstInUnit && li > 0 && unitForLesson && (
                        <div className="flex items-center gap-3 my-4 px-4">
                          <div className="flex-1 h-px bg-white/5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white/20">{unitForLesson.title}</span>
                          <div className="flex-1 h-px bg-white/5" />
                        </div>
                      )}

                      {/* Connecting line */}
                      {li > 0 && (
                        <div className="flex justify-center">
                          <div
                            className="w-0.5 h-6"
                            style={{ backgroundColor: done ? wave.color + '40' : 'rgba(255,255,255,0.05)' }}
                          />
                        </div>
                      )}

                      {/* Lesson node */}
                      <motion.div
                        initial={{ opacity: 0, x: isRight ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: li * 0.05 }}
                        className={`flex items-center gap-4 ${isRight ? 'flex-row-reverse' : ''}`}
                      >
                        {/* Spacer for offset */}
                        <div className={`hidden md:block ${isRight ? 'flex-1' : 'w-16'}`} />

                        {/* Node circle */}
                        <Link
                          href={isLocked ? '#' : `/school/lesson/${lesson.id}`}
                          className={`relative shrink-0 ${isLocked ? 'pointer-events-none' : ''}`}
                        >
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              done
                                ? 'text-white shadow-lg'
                                : isCurrent
                                  ? 'text-white ring-4 shadow-lg'
                                  : isLocked
                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                            }`}
                            style={
                              done
                                ? { backgroundColor: wave.color, boxShadow: `0 0 20px ${wave.color}40` } as React.CSSProperties
                                : isCurrent
                                  ? { backgroundColor: wave.color + '30', borderColor: wave.color, boxShadow: `0 0 24px ${wave.color}30` } as React.CSSProperties
                                  : undefined
                            }
                          >
                            {done ? (
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : isLocked ? (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            ) : (
                              <span>{lesson.order}</span>
                            )}
                          </div>
                          {/* Pulse ring on current */}
                          {isCurrent && (
                            <div
                              className="absolute inset-0 rounded-full animate-ping opacity-20"
                              style={{ backgroundColor: wave.color }}
                            />
                          )}
                        </Link>

                        {/* Lesson card */}
                        <Link
                          href={isLocked ? '#' : `/school/lesson/${lesson.id}`}
                          className={`flex-1 max-w-md ${isLocked ? 'pointer-events-none' : ''}`}
                        >
                          <div
                            className={`rounded-xl p-4 transition-all duration-300 border ${
                              done
                                ? 'bg-white/[0.03] border-white/10'
                                : isCurrent
                                  ? 'bg-white/[0.06] border-white/15 shadow-lg hover:bg-white/[0.08]'
                                  : isLocked
                                    ? 'bg-white/[0.01] border-white/5 opacity-40'
                                    : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/15'
                            }`}
                            style={isCurrent ? { borderColor: wave.color + '40', boxShadow: `0 4px 24px ${wave.color}10` } : {}}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className={`text-[15px] font-bold leading-snug mb-1 transition-colors ${
                                  isLocked ? 'text-white/30' : 'text-white hover:text-wave-400'
                                }`}>
                                  {lesson.title}
                                </h4>
                                <p className={`text-[13px] leading-relaxed line-clamp-2 ${
                                  isLocked ? 'text-white/15' : 'text-white/40'
                                }`}>
                                  {lesson.description}
                                </p>
                              </div>
                              {done && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 shrink-0 mt-1">Done</span>
                              )}
                              {isCurrent && (
                                <span
                                  className="text-[10px] font-bold uppercase tracking-wider shrink-0 mt-1 px-2 py-0.5 rounded-full"
                                  style={{ backgroundColor: wave.color + '20', color: wave.color }}
                                >
                                  Start
                                </span>
                              )}
                            </div>

                            {!isLocked && (
                              <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <span className="text-[11px] text-white/25">{lesson.duration}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${difficultyColors[lesson.difficulty]}`}>
                                  {lesson.difficulty}
                                </span>
                                <span className="text-[11px] font-semibold ml-auto" style={{ color: wave.color + 'aa' }}>
                                  {lessonTotalXP} XP
                                </span>
                                {lesson.exercises.length > 0 && (
                                  <span className="text-[11px] text-white/20">
                                    {lesson.exercises.length} exercises
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* Spacer for offset */}
                        <div className={`hidden md:block ${isRight ? 'w-16' : 'flex-1'}`} />
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Wave divider */}
              {wi < allWaves.length - 1 && (
                <div className="flex items-center gap-4 py-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{ borderColor: allWaves[wi + 1].color + '30', backgroundColor: allWaves[wi + 1].color + '10' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={allWaves[wi + 1].color} strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                </div>
              )}
            </motion.section>
          );
        })}
      </div>

      {/* Upgrade CTA for free users */}
      {mounted && userPlan !== 'school' && userPlan !== 'pro' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto px-4 py-12"
        >
          <div className="glass rounded-2xl p-8 text-center border border-ocean-500/20">
            <div className="w-12 h-12 rounded-full bg-ocean-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-ocean-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Unlock All 9 Waves</h3>
            <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
              Wave 1 is free. Subscribe to access Waves 2-9 with advanced AI skills, automation, the capstone project, and the RAG &amp; Evals build track.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#pricing"
                className="btn-primary px-6 py-3 rounded-full text-sm font-semibold text-white"
              >
                View Plans
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
