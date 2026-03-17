import { wave1 } from '@/data/wave1';
import { wave2 } from '@/data/wave2';
import { wave3 } from '@/data/wave3';
import { wave4 } from '@/data/wave4';
import { wave5 } from '@/data/wave5';
import { wave6 } from '@/data/wave6';
import { wave7 } from '@/data/wave7';
import { wave8 } from '@/data/wave8';
import type { Wave, Lesson, Unit } from '@/data/curriculum-types';

export const allWaves: Wave[] = [wave1, wave2, wave3, wave4, wave5, wave6, wave7, wave8];

export function getAllLessons(): Lesson[] {
  return allWaves.flatMap(w => w.units.flatMap(u => u.lessons));
}

export function getLessonById(id: string): Lesson | undefined {
  return getAllLessons().find(l => l.id === id);
}

export function getWaveById(id: string): Wave | undefined {
  return allWaves.find(w => w.id === id);
}

export function getUnitById(id: string): Unit | undefined {
  for (const wave of allWaves) {
    const unit = wave.units.find(u => u.id === id);
    if (unit) return unit;
  }
  return undefined;
}

export function getAdjacentLessons(lessonId: string): { prev: Lesson | null; next: Lesson | null } {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === lessonId);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function getLessonPositionInUnit(lessonId: string): { index: number; total: number } {
  const lesson = getLessonById(lessonId);
  if (!lesson) return { index: 0, total: 1 };
  const unit = getUnitById(lesson.unitId);
  if (!unit) return { index: 0, total: 1 };
  const idx = unit.lessons.findIndex(l => l.id === lessonId);
  return { index: idx, total: unit.lessons.length };
}

export function getTotalCurriculumXP(): number {
  return allWaves.reduce((sum, w) => sum + w.totalXP, 0);
}
