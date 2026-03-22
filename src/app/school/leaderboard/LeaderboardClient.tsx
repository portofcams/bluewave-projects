'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getTotalXP, getCurrentStreak, getProgress, getLevelFromXP } from '@/lib/school-progress';

/* ── Types ── */
interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  lessonsCompleted: number;
  streak: number;
  isCurrentUser: boolean;
  avatarColor: string;
}

/* ── Avatar colors ── */
const AVATAR_COLORS = [
  'from-cyan-400 to-blue-500',
  'from-purple-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-400 to-rose-500',
  'from-yellow-400 to-amber-500',
  'from-sky-400 to-cyan-500',
  'from-violet-400 to-purple-500',
  'from-lime-400 to-green-500',
  'from-fuchsia-400 to-pink-500',
];

/* ── Sample leaderboard data ── */
const SAMPLE_ENTRIES: Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>[] = [
  { name: 'Sarah K.', xp: 4820, level: 9, lessonsCompleted: 55, streak: 34, avatarColor: AVATAR_COLORS[0] },
  { name: 'Mike R.', xp: 3750, level: 8, lessonsCompleted: 48, streak: 21, avatarColor: AVATAR_COLORS[1] },
  { name: 'Jenna T.', xp: 2980, level: 7, lessonsCompleted: 41, streak: 15, avatarColor: AVATAR_COLORS[2] },
  { name: 'Alex P.', xp: 2450, level: 6, lessonsCompleted: 36, streak: 12, avatarColor: AVATAR_COLORS[3] },
  { name: 'David L.', xp: 1680, level: 5, lessonsCompleted: 28, streak: 8, avatarColor: AVATAR_COLORS[4] },
  { name: 'Nina W.', xp: 1150, level: 4, lessonsCompleted: 20, streak: 6, avatarColor: AVATAR_COLORS[5] },
  { name: 'Chris B.', xp: 720, level: 3, lessonsCompleted: 14, streak: 4, avatarColor: AVATAR_COLORS[6] },
  { name: 'Taylor M.', xp: 380, level: 2, lessonsCompleted: 8, streak: 3, avatarColor: AVATAR_COLORS[7] },
  { name: 'Jordan F.', xp: 150, level: 2, lessonsCompleted: 4, streak: 1, avatarColor: AVATAR_COLORS[8] },
  { name: 'Pat H.', xp: 50, level: 1, lessonsCompleted: 2, streak: 1, avatarColor: AVATAR_COLORS[9] },
];

/* ── Rank badge colors ── */
function getRankStyle(rank: number): string {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-300';
  if (rank === 3) return 'text-amber-600';
  return 'text-gray-500';
}

function getRankBg(rank: number): string {
  if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/30';
  if (rank === 2) return 'bg-gray-400/10 border-gray-400/30';
  if (rank === 3) return 'bg-amber-600/10 border-amber-600/30';
  return '';
}

export default function LeaderboardClient() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userStats, setUserStats] = useState({
    xp: 0,
    level: 1,
    lessonsCompleted: 0,
    streak: 0,
    rank: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const xp = getTotalXP();
    const streak = getCurrentStreak();
    const progress = getProgress();
    const { level } = getLevelFromXP(xp);
    const lessonsCompleted = progress.completedLessons.length;

    /* Build the combined leaderboard */
    const currentUser: Omit<LeaderboardEntry, 'rank'> = {
      name: 'You',
      xp,
      level,
      lessonsCompleted,
      streak,
      isCurrentUser: true,
      avatarColor: 'from-cyan-300 to-blue-400',
    };

    const allEntries = [
      currentUser,
      ...SAMPLE_ENTRIES.map((e) => ({ ...e, isCurrentUser: false })),
    ];

    /* Sort by XP descending, assign ranks */
    allEntries.sort((a, b) => b.xp - a.xp);
    const ranked: LeaderboardEntry[] = allEntries.map((e, i) => ({
      ...e,
      rank: i + 1,
    }));

    const userRank = ranked.find((e) => e.isCurrentUser)?.rank ?? ranked.length;

    setEntries(ranked);
    setUserStats({ xp, level, lessonsCompleted, streak, rank: userRank });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Header ── */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
        <Link
          href="/school"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to AI School
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
        >
          Leaderboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400"
        >
          Track your progress and see where you stand.
        </motion.p>
      </div>

      {/* ── Your Stats Card ── */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-5 overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 flex items-center justify-center text-black font-bold text-lg">
                Y
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Your Position</h2>
                <p className="text-sm text-cyan-400">Rank #{userStats.rank} of {entries.length}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatBox label="Total XP" value={userStats.xp.toLocaleString()} icon="star" />
              <StatBox label="Level" value={String(userStats.level)} icon="level" />
              <StatBox label="Lessons" value={String(userStats.lessonsCompleted)} icon="book" />
              <StatBox label="Streak" value={`${userStats.streak}d`} icon="fire" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Leaderboard Table ── */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[3rem_1fr_4rem_4.5rem_3.5rem_3.5rem] sm:grid-cols-[3.5rem_1fr_5rem_5rem_5rem_4.5rem] gap-2 px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-800">
            <span>#</span>
            <span>Student</span>
            <span className="text-right">XP</span>
            <span className="text-right">Level</span>
            <span className="text-right hidden sm:block">Lessons</span>
            <span className="text-right">Streak</span>
          </div>

          {/* Entries */}
          {entries.map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              className={`
                grid grid-cols-[3rem_1fr_4rem_4.5rem_3.5rem_3.5rem] sm:grid-cols-[3.5rem_1fr_5rem_5rem_5rem_4.5rem] gap-2 px-4 py-3 items-center
                border-b border-gray-800/50 last:border-b-0
                ${entry.isCurrentUser
                  ? 'bg-cyan-500/5 border-l-2 border-l-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.08)]'
                  : 'hover:bg-gray-900/50'}
                ${getRankBg(entry.rank) ? `${getRankBg(entry.rank)}` : ''}
                transition-colors
              `}
            >
              {/* Rank */}
              <span className={`text-sm font-bold ${getRankStyle(entry.rank)}`}>
                {entry.rank <= 3 ? (
                  <span className="text-lg">{entry.rank === 1 ? '\u{1F947}' : entry.rank === 2 ? '\u{1F948}' : '\u{1F949}'}</span>
                ) : (
                  `#${entry.rank}`
                )}
              </span>

              {/* Name + Avatar */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-br ${entry.avatarColor} flex items-center justify-center text-xs font-bold text-black`}
                >
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <span className={`text-sm truncate ${entry.isCurrentUser ? 'text-cyan-300 font-semibold' : 'text-gray-200'}`}>
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-medium">
                      YOU
                    </span>
                  )}
                </span>
              </div>

              {/* XP */}
              <span className="text-sm text-right font-mono text-gray-300">
                {entry.xp.toLocaleString()}
              </span>

              {/* Level */}
              <span className="text-sm text-right text-gray-400">
                Lv. {entry.level}
              </span>

              {/* Lessons (hidden on small screens) */}
              <span className="text-sm text-right text-gray-500 hidden sm:block">
                {entry.lessonsCompleted}
              </span>

              {/* Streak */}
              <span className="text-sm text-right text-gray-400">
                {entry.streak}d
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Coming Soon Notice ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-sm font-semibold text-blue-400">Live Leaderboard Coming Soon</h3>
          </div>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Right now this leaderboard tracks your personal progress alongside sample students.
            A live leaderboard with other students is on the way — keep learning and your rank will carry over.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Stat box sub-component ── */
function StatBox({ label, value, icon }: { label: string; value: string; icon: string }) {
  const iconPath = {
    star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    level: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    fire: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
  }[icon];

  return (
    <div className="rounded-lg bg-gray-900/60 border border-gray-800 p-3 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-auto mb-1 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[11px] text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}
