import type { Metadata } from "next";
import { getAllLessons, getLessonById, getWaveById } from "@/lib/curriculum";
import LessonPageClient from "./LessonPageClient";

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    id: lesson.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) {
    return { title: "Lesson Not Found — BlueWave AI School" };
  }

  const wave = getWaveById(lesson.waveId);
  const waveName = wave ? wave.title : "";
  const title = `${lesson.title} — ${waveName} | BlueWave AI School`;
  const description = lesson.description;
  const url = `https://bluewaveprojects.com/school/lesson/${lesson.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: lesson.title,
      description,
      url,
      siteName: "BlueWave Projects",
      type: "article",
      images: [{ url: "/og-school.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} — BlueWave AI School`,
      description,
      images: ["/og-school.png"],
    },
  };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLessonById(id);
  const wave = lesson ? getWaveById(lesson.waveId) : null;

  return (
    <>
      <LessonPageClient />
      {lesson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LearningResource",
              name: lesson.title,
              description: lesson.description,
              educationalLevel: lesson.difficulty,
              timeRequired: `PT${parseInt(lesson.duration)}M`,
              isPartOf: wave
                ? {
                    "@type": "Course",
                    name: `${wave.title} — BlueWave AI School`,
                    description: wave.description,
                    provider: {
                      "@type": "Organization",
                      name: "BlueWave Projects",
                      url: "https://bluewaveprojects.com",
                    },
                  }
                : undefined,
              learningResourceType: "lesson",
              teaches: lesson.title,
            }),
          }}
        />
      )}
      {lesson && wave && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://bluewaveprojects.com" },
                { "@type": "ListItem", position: 2, name: "AI School", item: "https://bluewaveprojects.com/school" },
                { "@type": "ListItem", position: 3, name: wave.title, item: `https://bluewaveprojects.com/school#${wave.id}` },
                { "@type": "ListItem", position: 4, name: lesson.title, item: `https://bluewaveprojects.com/school/lesson/${lesson.id}` },
              ],
            }),
          }}
        />
      )}
    </>
  );
}
