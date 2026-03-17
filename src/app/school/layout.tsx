'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { allWaves } from '@/lib/curriculum';
import { getTotalXP, getCurrentStreak, isLessonComplete } from '@/lib/school-progress';
import XPBar from '@/components/school/XPBar';

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedWaves, setExpandedWaves] = useState<string[]>(['wave-1']);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTotalXP(getTotalXP());
    setStreak(getCurrentStreak());
  }, [pathname]);

  const toggleWave = (waveId: string) => {
    setExpandedWaves(prev =>
      prev.includes(waveId) ? prev.filter(id => id !== waveId) : [...prev, waveId]
    );
  };

  return (
    <div className="min-h-screen bg-deep-900 flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 glass rounded-lg flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar overlay on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-deep-800/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-white/5">
          <Link href="/school" className="flex items-center gap-3 group" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-wave-400 to-ocean-600 flex items-center justify-center text-lg">
              🌊
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-wave-400 transition-colors">
                AI School
              </div>
              <div className="text-[10px] text-white/40">BlueWave Projects</div>
            </div>
          </Link>
          {mounted && (
            <div className="mt-3">
              <XPBar totalXP={totalXP} compact />
            </div>
          )}
          {mounted && streak > 0 && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-lava-500">
              <span>🔥</span>
              <span>{streak} day streak</span>
            </div>
          )}
        </div>

        {/* Wave / Unit / Lesson tree */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {allWaves.map(wave => {
            const isExpanded = expandedWaves.includes(wave.id);
            const waveLessons = wave.units.flatMap(u => u.lessons);
            const completedCount = mounted ? waveLessons.filter(l => isLessonComplete(l.id)).length : 0;

            return (
              <div key={wave.id} className="mb-1">
                {/* Wave header */}
                <button
                  onClick={() => toggleWave(wave.id)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
                >
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center text-xs shrink-0"
                    style={{ backgroundColor: wave.color + '20', color: wave.color }}
                  >
                    {wave.icon}
                  </span>
                  <span className="flex-1 text-xs font-semibold text-white/80 truncate">
                    {wave.title}
                  </span>
                  <span className="text-[10px] text-white/30">
                    {completedCount}/{waveLessons.length}
                  </span>
                  <svg
                    className={`w-3 h-3 text-white/30 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Units and lessons */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {wave.units.map(unit => (
                        <div key={unit.id} className="ml-4">
                          <div className="px-4 py-1.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">
                            {unit.title}
                          </div>
                          {unit.lessons.map(lesson => {
                            const isActive = pathname === `/school/lesson/${lesson.id}`;
                            const done = mounted && isLessonComplete(lesson.id);

                            return (
                              <Link
                                key={lesson.id}
                                href={`/school/lesson/${lesson.id}`}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-2 px-4 py-1.5 mx-2 rounded-md text-xs transition-colors ${
                                  isActive
                                    ? 'bg-wave-500/15 text-wave-400'
                                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                }`}
                              >
                                {done ? (
                                  <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" />
                                )}
                                <span className="truncate">{lesson.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to BlueWave
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen lg:pl-0">
        {children}
      </main>
    </div>
  );
}
