'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { allWaves } from '@/lib/curriculum';
import { getTotalXP, getCurrentStreak, isLessonComplete, getProgress } from '@/lib/school-progress';
import XPBar from '@/components/school/XPBar';

const difficultyColors: Record<string, string> = {
  beginner: 'text-green-400 bg-green-500/10',
  intermediate: 'text-amber-400 bg-amber-500/10',
  advanced: 'text-red-400 bg-red-500/10',
};

export default function SchoolPage() {
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTotalXP(getTotalXP());
    setStreak(getCurrentStreak());
    setCompletedCount(getProgress().completedLessons.length);
  }, []);

  const totalLessons = allWaves.reduce((sum, w) => sum + w.units.reduce((s, u) => s + u.lessons.length, 0), 0);
  const totalCurriculumXP = allWaves.reduce((sum, w) => sum + w.totalXP, 0);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/50 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-wave-500/5 rounded-full blur-[100px]" />

        <div className="relative px-6 pt-16 pb-10 lg:pt-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              AI School
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-xl mb-8">
              Master AI skills through 5 progressive waves. Complete lessons, earn XP, and level up your capabilities.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{mounted ? completedCount : 0}</div>
                <div className="text-xs text-white/40">of {totalLessons} lessons</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-gradient">{mounted ? totalXP : 0}</div>
                <div className="text-xs text-white/40">of {totalCurriculumXP} XP</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-lava-500">
                  {mounted && streak > 0 ? `🔥 ${streak}` : '0'}
                </div>
                <div className="text-xs text-white/40">day streak</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{allWaves.length}</div>
                <div className="text-xs text-white/40">waves</div>
              </div>
            </div>

            {mounted && <XPBar totalXP={totalXP} />}
          </motion.div>
        </div>
      </div>

      {/* Waves */}
      <div className="px-6 max-w-5xl mx-auto space-y-12">
        {allWaves.map((wave, wi) => {
          const waveLessons = wave.units.flatMap(u => u.lessons);
          const waveCompleted = mounted ? waveLessons.filter(l => isLessonComplete(l.id)).length : 0;
          const waveProgress = waveLessons.length > 0 ? (waveCompleted / waveLessons.length) * 100 : 0;

          return (
            <motion.section
              key={wave.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: wi * 0.1 }}
            >
              {/* Wave header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-lg"
                  style={{
                    backgroundColor: wave.color + '15',
                    boxShadow: `0 0 20px ${wave.color}15`,
                  }}
                >
                  {wave.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: wave.color + '20', color: wave.color }}
                    >
                      Wave {wave.number}
                    </span>
                    <span className="text-[10px] text-white/30">{wave.weekRange}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{wave.title}</h2>
                  <p className="text-xs text-white/40 mt-0.5">{wave.subtitle}</p>
                  <p className="text-xs text-white/30 mt-1 max-w-lg">{wave.description}</p>

                  {/* Wave progress bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-xs">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: wave.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${waveProgress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + wi * 0.1 }}
                      />
                    </div>
                    <span className="text-[10px] text-white/40">
                      {waveCompleted}/{waveLessons.length} complete
                    </span>
                    <span className="text-[10px] text-white/30">{wave.totalXP} XP</span>
                  </div>
                </div>
              </div>

              {/* Units and Lessons */}
              {wave.units.map(unit => (
                <div key={unit.id} className="mb-8">
                  <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 ml-1">
                    {unit.title}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {unit.lessons.map((lesson, li) => {
                      const done = mounted && isLessonComplete(lesson.id);
                      const lessonTotalXP = lesson.xp + lesson.exercises.reduce((s, e) => s + e.xpBonus, 0);

                      return (
                        <Link key={lesson.id} href={`/school/lesson/${lesson.id}`}>
                          <motion.div
                            className={`glass glass-hover rounded-xl p-4 h-full cursor-pointer group transition-all duration-300 ${
                              done ? 'ring-1 ring-green-500/20' : ''
                            }`}
                            whileHover={{ y: -2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * li }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-[10px] text-white/30">
                                Lesson {lesson.order}
                              </span>
                              {done && (
                                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>

                            <h4 className="text-sm font-semibold text-white group-hover:text-wave-400 transition-colors mb-1 leading-snug">
                              {lesson.title}
                            </h4>
                            <p className="text-[11px] text-white/40 mb-3 line-clamp-2 leading-relaxed">
                              {lesson.description}
                            </p>

                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] text-white/30">
                                {lesson.duration}
                              </span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${difficultyColors[lesson.difficulty]}`}>
                                {lesson.difficulty}
                              </span>
                              <span className="text-[10px] text-wave-400/70 ml-auto">
                                {lessonTotalXP} XP
                              </span>
                            </div>

                            {/* Exercise count */}
                            <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1">
                              {lesson.exercises.map((ex, ei) => (
                                <div
                                  key={ei}
                                  className="w-1.5 h-1.5 rounded-full bg-white/10"
                                  title={ex.type}
                                />
                              ))}
                              <span className="text-[10px] text-white/20 ml-1">
                                {lesson.exercises.length} exercises
                              </span>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Divider between waves */}
              {wi < allWaves.length - 1 && (
                <div className="flex items-center gap-4 mt-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
