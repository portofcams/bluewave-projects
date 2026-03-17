'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Exercise } from '@/data/curriculum-types';
import { isExerciseComplete, markExerciseComplete } from '@/lib/school-progress';

interface ExerciseRendererProps {
  exercise: Exercise;
  onXPEarned: (xp: number) => void;
}

function XPPopup({ xp }: { xp: number }) {
  return (
    <motion.div
      className="absolute -top-2 right-2 pointer-events-none z-10"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -40 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <span className="text-lg font-bold text-wave-400 drop-shadow-lg">+{xp} XP</span>
    </motion.div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            background: i % 2 === 0 ? 'var(--color-wave-400)' : 'var(--color-glacier-300)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function ExerciseRenderer({ exercise, onXPEarned }: ExerciseRendererProps) {
  const [completed, setCompleted] = useState(() => isExerciseComplete(exercise.id));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [showXP, setShowXP] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [fillValue, setFillValue] = useState('');

  const completeExercise = useCallback(() => {
    if (completed) return;
    markExerciseComplete(exercise.id, exercise.xpBonus);
    setCompleted(true);
    setShowXP(true);
    setShowParticles(true);
    onXPEarned(exercise.xpBonus);
    setTimeout(() => setShowXP(false), 1200);
    setTimeout(() => setShowParticles(false), 900);
  }, [completed, exercise.id, exercise.xpBonus, onXPEarned]);

  const handleQuizSelect = (index: number) => {
    if (completed || showResult) return;
    setSelectedOption(index);
    const isCorrect = index === exercise.correctAnswer;
    setShowResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      completeExercise();
    } else {
      setTimeout(() => {
        setShowResult(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const handleFillBlank = () => {
    if (completed) return;
    const answer = fillValue.trim().toLowerCase();
    const correct = String(exercise.correctAnswer).toLowerCase();
    if (answer === correct) {
      setShowResult('correct');
      completeExercise();
    } else {
      setShowResult('wrong');
      setTimeout(() => setShowResult(null), 1500);
    }
  };

  const typeLabel: Record<string, string> = {
    quiz: 'Quiz',
    'prompt-challenge': 'Prompt Challenge',
    'free-response': 'Reflection',
    matching: 'Matching',
    'fill-blank': 'Fill in the Blank',
  };

  const typeColor: Record<string, string> = {
    quiz: 'bg-ocean-500/20 text-ocean-300',
    'prompt-challenge': 'bg-purple-500/20 text-purple-300',
    'free-response': 'bg-green-500/20 text-green-300',
    matching: 'bg-amber-500/20 text-amber-300',
    'fill-blank': 'bg-pink-500/20 text-pink-300',
  };

  return (
    <motion.div
      className={`relative glass rounded-xl p-5 transition-all duration-300 ${
        completed ? 'ring-1 ring-green-500/30' : ''
      } ${showResult === 'wrong' ? 'animate-shake' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence>{showXP && <XPPopup xp={exercise.xpBonus} />}</AnimatePresence>
      {showParticles && <Particles />}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeColor[exercise.type] || 'bg-white/10 text-white/60'}`}>
          {typeLabel[exercise.type] || exercise.type}
        </span>
        <span className="text-xs text-white/40 font-medium">
          {completed ? (
            <span className="text-green-400">+{exercise.xpBonus} XP earned</span>
          ) : (
            `+${exercise.xpBonus} XP`
          )}
        </span>
      </div>

      {/* Question */}
      <p className="text-sm text-white/90 font-medium mb-4 leading-relaxed">{exercise.question}</p>

      {/* Quiz / Matching */}
      {(exercise.type === 'quiz' || exercise.type === 'matching') && exercise.options && (
        <div className="space-y-2">
          {exercise.options.map((option, idx) => {
            let optionStyle = 'bg-white/5 hover:bg-white/10 border-white/10';
            if (completed && idx === exercise.correctAnswer) {
              optionStyle = 'bg-green-500/15 border-green-500/40 text-green-300';
            } else if (showResult === 'wrong' && idx === selectedOption) {
              optionStyle = 'bg-red-500/15 border-red-500/40 text-red-300';
            } else if (showResult === 'correct' && idx === selectedOption) {
              optionStyle = 'bg-green-500/15 border-green-500/40 text-green-300';
            }

            return (
              <motion.button
                key={idx}
                onClick={() => handleQuizSelect(idx)}
                disabled={completed || showResult !== null}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${optionStyle} ${
                  completed ? 'cursor-default opacity-80' : 'cursor-pointer'
                }`}
                whileTap={!completed && !showResult ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] shrink-0">
                    {completed && idx === exercise.correctAnswer ? (
                      <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : showResult === 'wrong' && idx === selectedOption ? (
                      <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className="text-white/80">{option}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Prompt Challenge */}
      {exercise.type === 'prompt-challenge' && (
        <div className="space-y-3">
          {exercise.hint && (
            <p className="text-xs text-white/40 italic bg-white/5 rounded-lg px-3 py-2">
              Hint: {exercise.hint}
            </p>
          )}
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            disabled={completed}
            placeholder="Write your notes here..."
            className="w-full h-24 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 placeholder:text-white/30 resize-none focus:outline-none focus:border-wave-500/50 transition-colors disabled:opacity-50"
          />
          {!completed && (
            <button
              onClick={completeExercise}
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white"
            >
              Mark Complete
            </button>
          )}
        </div>
      )}

      {/* Free Response */}
      {exercise.type === 'free-response' && (
        <div className="space-y-3">
          {exercise.hint && (
            <p className="text-xs text-white/40 italic bg-white/5 rounded-lg px-3 py-2">
              Hint: {exercise.hint}
            </p>
          )}
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            disabled={completed}
            placeholder="Type your response..."
            className="w-full h-28 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 placeholder:text-white/30 resize-none focus:outline-none focus:border-wave-500/50 transition-colors disabled:opacity-50"
          />
          {!completed && (
            <button
              onClick={() => {
                if (textValue.trim().length > 10) {
                  completeExercise();
                }
              }}
              disabled={textValue.trim().length <= 10}
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Response
            </button>
          )}
        </div>
      )}

      {/* Fill in the Blank */}
      {exercise.type === 'fill-blank' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={fillValue}
              onChange={(e) => setFillValue(e.target.value)}
              disabled={completed}
              placeholder="Type your answer..."
              className={`flex-1 bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder:text-white/30 focus:outline-none transition-colors disabled:opacity-50 ${
                showResult === 'correct'
                  ? 'border-green-500/50'
                  : showResult === 'wrong'
                  ? 'border-red-500/50'
                  : 'border-white/10 focus:border-wave-500/50'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !completed) handleFillBlank();
              }}
            />
            {!completed && (
              <button
                onClick={handleFillBlank}
                disabled={!fillValue.trim()}
                className="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                Check
              </button>
            )}
          </div>
          {showResult === 'wrong' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-red-400"
            >
              Not quite. Try again!
            </motion.p>
          )}
          {exercise.hint && !completed && (
            <p className="text-xs text-white/40 italic">Hint: {exercise.hint}</p>
          )}
        </div>
      )}

      {/* Completed overlay glow */}
      {completed && (
        <div className="absolute top-3 right-3">
          <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </motion.div>
  );
}
