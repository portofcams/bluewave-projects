export interface Exercise {
  id: string;
  type: 'prompt-challenge' | 'quiz' | 'free-response' | 'matching' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  hint?: string;
  xpBonus: number;
}

export interface Lesson {
  id: string;
  waveId: string;
  unitId: string;
  title: string;
  description: string;
  content: string;
  exercises: Exercise[];
  xp: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
}

export interface Unit {
  id: string;
  waveId: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Wave {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: string;
  units: Unit[];
  totalXP: number;
  weekRange: string;
}

export interface Curriculum {
  waves: Wave[];
  totalLessons: number;
  totalXP: number;
}
