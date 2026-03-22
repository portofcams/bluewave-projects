'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getLessonById,
  getWaveById,
  getUnitById,
  getAdjacentLessons,
  getLessonPositionInUnit,
} from '@/lib/curriculum';
import {
  getTotalXP,
  markLessonComplete,
  isLessonComplete,
  isExerciseComplete,
} from '@/lib/school-progress';
import { getStoredUser, isLoggedIn as checkLoggedIn, canAccessLesson, checkSubscription } from '@/lib/auth';
import LessonContent from '@/components/school/LessonContent';
import ExerciseRenderer from '@/components/school/ExerciseRenderer';
import XPBar from '@/components/school/XPBar';
import Paywall from '@/components/school/Paywall';

export default function LessonPageClient() {
  const params = useParams();
  const lessonId = params.id as string;

  const [totalXP, setTotalXP] = useState(0);
  const [lessonDone, setLessonDone] = useState(false);
  const [showLessonXP, setShowLessonXP] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const lesson = getLessonById(lessonId);
  const wave = lesson ? getWaveById(lesson.waveId) : undefined;
  const unit = lesson ? getUnitById(lesson.unitId) : undefined;
  const adjacent = lesson ? getAdjacentLessons(lessonId) : { prev: null, next: null };
  const position = lesson ? getLessonPositionInUnit(lessonId) : { index: 0, total: 1 };

  useEffect(() => {
    setMounted(true);
    setTotalXP(getTotalXP());
    setLessonDone(isLessonComplete(lessonId));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Check auth and subscription for paywall
    const isUserLoggedIn = checkLoggedIn();
    setLoggedIn(isUserLoggedIn);
    const storedUser = getStoredUser();
    if (storedUser?.plan) {
      setUserPlan(storedUser.plan);
      setAuthChecked(true);
    } else if (isUserLoggedIn) {
      // Check subscription from backend
      checkSubscription().then(sub => {
        setUserPlan(sub.plan);
        setAuthChecked(true);
      });
    } else {
      setAuthChecked(true);
    }
  }, [lessonId]);

  const handleXPEarned = useCallback((xp: number) => {
    setTotalXP(prev => prev + xp);
  }, []);

  const handleMarkLessonComplete = useCallback(() => {
    if (lessonDone || !lesson) return;
    markLessonComplete(lessonId, lesson.xp);
    setLessonDone(true);
    setTotalXP(prev => prev + lesson.xp);
    setShowLessonXP(true);
    setTimeout(() => setShowLessonXP(false), 1500);
  }, [lessonDone, lesson, lessonId]);

  if (!lesson || !wave || !unit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌊</div>
          <h1 className="text-xl font-bold text-white mb-2">Lesson Not Found</h1>
          <p className="text-white/50 text-sm mb-6">This lesson doesn&apos;t exist in our curriculum.</p>
          <Link href="/school" className="btn-primary px-6 py-2.5 rounded-lg text-sm font-medium text-white">
            Back to School
          </Link>
        </div>
      </div>
    );
  }

  const allExercisesDone = mounted && lesson.exercises.every(ex => isExerciseComplete(ex.id));

  // Paywall: Wave 1 is free, Waves 2-8 require a subscription
  if (mounted && authChecked && wave && !canAccessLesson(wave.number, userPlan)) {
    return (
      <Paywall
        waveNumber={wave.number}
        waveTitle={wave.title}
        waveColor={wave.color}
        lessonTitle={lesson.title}
        lessonDescription={lesson.description}
        isLoggedIn={loggedIn}
      />
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-20 bg-deep-900/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-3">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[10px] text-white/30 mb-2">
            <Link href="/school" className="hover:text-white/60 transition-colors">School</Link>
            <span>/</span>
            <span style={{ color: wave.color }}>{wave.title}</span>
            <span>/</span>
            <span>{unit.title}</span>
          </div>

          {/* Unit progress bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex gap-1">
              {Array.from({ length: position.total }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-1 rounded-full overflow-hidden bg-white/5"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: wave.color }}
                    initial={{ width: 0 }}
                    animate={{
                      width: idx < position.index ? '100%' : idx === position.index ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                </div>
              ))}
            </div>
            <span className="text-[10px] text-white/30 shrink-0">
              {position.index + 1}/{position.total}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        {/* Lesson header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: wave.color + '20', color: wave.color }}
            >
              Wave {wave.number}
            </span>
            <span className="text-[10px] text-white/30">{lesson.duration}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
              lesson.difficulty === 'beginner'
                ? 'text-green-400 bg-green-500/10'
                : lesson.difficulty === 'intermediate'
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-red-400 bg-red-500/10'
            }`}>
              {lesson.difficulty}
            </span>
            {lessonDone && (
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Complete
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-sm text-white/50">{lesson.description}</p>
        </motion.div>

        {/* XP Bar */}
        {mounted && (
          <div className="mb-8">
            <XPBar totalXP={totalXP} />
          </div>
        )}

        {/* Lesson content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12"
        >
          <LessonContent content={lesson.content} waveColor={wave?.color} />
        </motion.div>

        {/* Mark lesson complete button */}
        {!lessonDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-10 relative"
          >
            <AnimatePresence>
              {showLessonXP && (
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -30 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1 }}
                >
                  <span className="text-xl font-bold text-wave-400">+{lesson.xp} XP</span>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleMarkLessonComplete}
              className="w-full btn-primary py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mark Lesson Complete (+{lesson.xp} XP)
            </button>
          </motion.div>
        )}

        {lessonDone && (
          <div className="mb-10 glass rounded-xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <div className="text-sm font-medium text-green-400">Lesson Complete</div>
              <div className="text-[10px] text-white/40">+{lesson.xp} XP earned for reading this lesson</div>
            </div>
          </div>
        )}

        {/* Exercises section */}
        {lesson.exercises.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-bold text-white">Exercises</h2>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/30">
                {mounted ? lesson.exercises.filter(e => isExerciseComplete(e.id)).length : 0}/{lesson.exercises.length}
              </span>
            </div>

            <div className="space-y-4 mb-12">
              {lesson.exercises.map((exercise, idx) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                >
                  <ExerciseRenderer
                    exercise={exercise}
                    onXPEarned={handleXPEarned}
                  />
                </motion.div>
              ))}
            </div>

            {/* All exercises complete celebration */}
            <AnimatePresence>
              {allExercisesDone && lessonDone && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-12 p-6 rounded-xl text-center"
                  style={{
                    background: `linear-gradient(135deg, ${wave.color}10, ${wave.color}05)`,
                    border: `1px solid ${wave.color}30`,
                  }}
                >
                  <svg className="w-8 h-8 mb-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  <h3 className="text-lg font-bold text-white mb-1">Lesson Mastered!</h3>
                  <p className="text-xs text-white/50">
                    You&apos;ve completed all exercises and earned the maximum XP for this lesson.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-4 pt-8 border-t border-white/10">
          {adjacent.prev ? (
            <Link
              href={`/school/lesson/${adjacent.prev.id}`}
              className="flex-1 glass glass-hover rounded-xl p-4 group"
            >
              <div className="text-[10px] text-white/30 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous Lesson
              </div>
              <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors truncate">
                {adjacent.prev.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {adjacent.next ? (
            <Link
              href={`/school/lesson/${adjacent.next.id}`}
              className="flex-1 glass glass-hover rounded-xl p-4 group text-right"
            >
              <div className="text-[10px] text-white/30 mb-1 flex items-center gap-1 justify-end">
                Next Lesson
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors truncate">
                {adjacent.next.title}
              </div>
            </Link>
          ) : (
            <Link
              href="/school"
              className="flex-1 glass glass-hover rounded-xl p-4 group text-right"
            >
              <div className="text-[10px] text-white/30 mb-1 flex items-center gap-1 justify-end">
                Finish
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                Back to Dashboard
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
