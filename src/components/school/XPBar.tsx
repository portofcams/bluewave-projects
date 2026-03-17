'use client';

import { motion } from 'framer-motion';
import { getLevelFromXP } from '@/lib/school-progress';

interface XPBarProps {
  totalXP: number;
  compact?: boolean;
}

export default function XPBar({ totalXP, compact = false }: XPBarProps) {
  const { level, currentXP, nextLevelXP } = getLevelFromXP(totalXP);
  const progress = nextLevelXP > 0 ? (currentXP / nextLevelXP) * 100 : 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-wave-400 to-ocean-500 flex items-center justify-center text-[10px] font-bold">
            {level}
          </div>
          <span className="text-xs text-white/60">{totalXP} XP</span>
        </div>
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden min-w-[60px]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-wave-400 to-ocean-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wave-400 to-ocean-500 flex items-center justify-center text-sm font-bold shadow-lg shadow-wave-500/20">
              {level}
            </div>
            <div className="absolute -inset-1 rounded-full bg-wave-400/20 animate-pulse-glow -z-10" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Level {level}</div>
            <div className="text-xs text-white/50">
              {currentXP} / {nextLevelXP} XP to next level
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gradient">{totalXP}</div>
          <div className="text-xs text-white/40">Total XP</div>
        </div>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: 'linear-gradient(90deg, var(--color-wave-500), var(--color-ocean-400), var(--color-glacier-300))',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
