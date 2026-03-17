import { getAllLessons } from '@/lib/curriculum';
import LessonPageClient from './LessonPageClient';

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    id: lesson.id,
  }));
}

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonPageClient />;
}
