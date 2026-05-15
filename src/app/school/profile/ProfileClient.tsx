'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { allWaves, getAllLessons, getLessonById } from '@/lib/curriculum';
import {
  getProgress,
  getTotalXP,
  getCurrentStreak,
  getLevelFromXP,
  isWaveComplete,
  getWaveCompletionDate,
  resetProgress,
} from '@/lib/school-progress';

/* ── Badge definitions ── */
interface Badge {
  id: string;
  label: string;
  icon: string;
  description: string;
  check: (stats: {
    lessonsCompleted: number;
    xp: number;
    streak: number;
    wavesCompleted: number;
  }) => boolean;
}

const BADGES: Badge[] = [
  {
    id: 'first-lesson',
    label: 'First Lesson',
    icon: '1',
    description: 'Complete your first lesson',
    check: (s) => s.lessonsCompleted >= 1,
  },
  {
    id: '5-lessons',
    label: '5 Lessons',
    icon: '5',
    description: 'Complete 5 lessons',
    check: (s) => s.lessonsCompleted >= 5,
  },
  {
    id: 'full-wave',
    label: 'Full Wave',
    icon: 'W',
    description: 'Complete an entire wave',
    check: (s) => s.wavesCompleted >= 1,
  },
  {
    id: '100-xp',
    label: '100 XP',
    icon: 'C',
    description: 'Earn 100 XP',
    check: (s) => s.xp >= 100,
  },
  {
    id: '500-xp',
    label: '500 XP',
    icon: 'D',
    description: 'Earn 500 XP',
    check: (s) => s.xp >= 500,
  },
  {
    id: '7-day-streak',
    label: '7-Day Streak',
    icon: '7',
    description: 'Maintain a 7-day streak',
    check: (s) => s.streak >= 7,
  },
];

export default function ProfileClient() {
  const [mounted, setMounted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Derived data (only meaningful after mount) ── */
  const progress = mounted ? getProgress() : null;
  const totalXP = mounted ? getTotalXP() : 0;
  const streak = mounted ? getCurrentStreak() : 0;
  const level = getLevelFromXP(totalXP);

  const allLessonsList = useMemo(() => getAllLessons(), []);
  const totalLessons = allLessonsList.length;
  const completedLessons = progress?.completedLessons ?? [];
  const completedExercises = progress?.completedExercises ?? [];

  const wavesCompleted = mounted
    ? allWaves.filter((w) => isWaveComplete(w.id)).length
    : 0;

  /* ── Wave stats ── */
  const waveStats = useMemo(() => {
    return allWaves.map((wave) => {
      const lessonIds = wave.units.flatMap((u) => u.lessons.map((l) => l.id));
      const completed = mounted
        ? lessonIds.filter((id) => completedLessons.includes(id)).length
        : 0;
      const total = lessonIds.length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      const isComplete = mounted ? isWaveComplete(wave.id) : false;
      const certDate = mounted ? getWaveCompletionDate(wave.id) : null;
      return { wave, completed, total, pct, isComplete, certDate };
    });
  }, [mounted, completedLessons]);

  /* ── Recent activity (last 8 completed lessons, newest first) ── */
  const recentActivity = useMemo(() => {
    if (!mounted) return [];
    // completedLessons is in chronological order (oldest first)
    return [...completedLessons]
      .reverse()
      .slice(0, 8)
      .map((id) => {
        const lesson = getLessonById(id);
        return lesson ? { id, title: lesson.title, waveId: lesson.waveId, xp: lesson.xp } : null;
      })
      .filter(Boolean) as { id: string; title: string; waveId: string; xp: number }[];
  }, [mounted, completedLessons]);

  /* ── Badge check ── */
  const badgeStats = {
    lessonsCompleted: completedLessons.length,
    xp: totalXP,
    streak,
    wavesCompleted,
  };

  /* ── Reset handler ── */
  function handleReset() {
    resetProgress();
    setShowResetConfirm(false);
    window.location.reload();
  }

  /* ── Skeleton while hydrating ── */
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/school/learn"
            className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to School
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-white mb-8"
        >
          My Profile
        </motion.h1>

        {/* ── Section 1: Stats Dashboard ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-10"
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Stats</h2>

          {/* Level + XP progress */}
          <div className="glass rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-500/20 flex items-center justify-center text-ocean-400 font-bold text-lg">
                  {level.level}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Level {level.level}</div>
                  <div className="text-[10px] text-white/40">{totalXP} total XP</div>
                </div>
              </div>
              {streak > 0 && (
                <div className="flex items-center gap-1.5 text-lava-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 23c-3.6 0-8-2.4-8-7.7 0-3.3 2-6.3 4-8.3.4-.4 1.1-.2 1.2.3l.5 2.2c.1.4.5.5.8.3C12.5 8 14 5.5 14 3c0-.5.4-.9.8-.8C18.5 3.5 22 7.4 22 12c0 4.4-3.4 8-6 9.3-.4.2-.8.4-1.3.5-.9.2-1.8.2-2.7.2z" />
                  </svg>
                  <span className="text-sm font-bold">{streak}</span>
                  <span className="text-[10px] text-white/40">day streak</span>
                </div>
              )}
            </div>

            {/* Level progress bar */}
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-ocean-500 to-wave-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((level.currentXP / level.nextLevelXP) * 100, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-white/30">{level.currentXP} / {level.nextLevelXP} XP to next level</span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Lessons" value={`${completedLessons.length}/${totalLessons}`} color="ocean" />
            <StatCard label="Exercises" value={`${completedExercises.length}`} color="wave" />
            <StatCard label="Total XP" value={`${totalXP}`} color="lava" />
            <StatCard label="Waves Done" value={`${wavesCompleted}/8`} color="ocean" />
          </div>
        </motion.section>

        {/* ── Section 2: Wave Progress ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Wave Progress</h2>
          <div className="space-y-3">
            {waveStats.map(({ wave, completed, total, pct, isComplete, certDate }, idx) => (
              <motion.div
                key={wave.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + idx * 0.04 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: wave.color + '20', color: wave.color }}
                    >
                      Wave {wave.number}
                    </span>
                    <span className="text-sm text-white font-medium truncate">{wave.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40">{completed}/{total}</span>
                    {isComplete && (
                      <span className="text-[10px] text-green-400 flex items-center gap-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {certDate ? 'Certified' : 'Complete'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: wave.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.15 + idx * 0.04 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 3: Recent Activity ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10"
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Recent Activity</h2>
          {recentActivity.length === 0 ? (
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-sm text-white/40">No lessons completed yet. Start learning!</p>
              <Link
                href="/school/learn"
                className="inline-block mt-3 text-sm text-ocean-400 hover:text-ocean-300 transition-colors"
              >
                Go to curriculum
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentActivity.map((item, idx) => {
                const wave = allWaves.find((w) => w.id === item.waveId);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.17 + idx * 0.03 }}
                  >
                    <Link
                      href={`/school/lesson/${item.id}`}
                      className="glass glass-hover rounded-lg p-3 flex items-center gap-3 group"
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: wave?.color ?? '#3b82f6' }}
                      />
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors truncate flex-1">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-white/30 shrink-0">+{item.xp} XP</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ── Section 4: Achievement Badges ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BADGES.map((badge, idx) => {
              const earned = badge.check(badgeStats);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.22 + idx * 0.04 }}
                  className={`glass rounded-xl p-4 text-center transition-all ${
                    earned ? 'border border-wave-500/30' : 'opacity-40'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                      earned
                        ? 'bg-wave-500/20 text-wave-400'
                        : 'bg-white/5 text-white/20'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div className={`text-xs font-semibold ${earned ? 'text-white' : 'text-white/30'}`}>
                    {badge.label}
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5">{badge.description}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Section 5: Reset Progress ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10 pt-8 border-t border-white/10"
        >
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Danger Zone</h2>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="glass rounded-xl p-5">
              <p className="text-sm text-white/70 mb-4">
                This will permanently delete all your progress, XP, streaks, and certificates. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-colors"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

/* ── Small stat card component ── */
function StatCard({ label, value, color }: { label: string; value: string; color: 'ocean' | 'wave' | 'lava' }) {
  const colorMap = {
    ocean: 'text-ocean-400 bg-ocean-500/10',
    wave: 'text-wave-400 bg-wave-500/10',
    lava: 'text-lava-400 bg-lava-500/10',
  };

  return (
    <div className="glass rounded-xl p-4 text-center">
      <div className={`text-lg font-bold ${colorMap[color].split(' ')[0]}`}>{value}</div>
      <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
    </div>
  );
}
