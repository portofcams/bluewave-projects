import type { Metadata } from "next";
import { allWaves } from "@/lib/curriculum";
import SchoolPageClient from "./SchoolPageClient";

export const metadata: Metadata = {
  title: "AI School — Learn AI Like a Game | BlueWave Projects",
  description:
    "Learn AI like a game. 8 waves, 62 lessons, hands-on exercises. Master prompt engineering, AI workflows, automation, and more through progressive, gamified training.",
  alternates: { canonical: "https://bluewaveprojects.com/school" },
  openGraph: {
    title: "BlueWave AI School — 8 Waves, 62 Lessons",
    description:
      "Learn AI like a game. 8 waves, 62 lessons, hands-on exercises. Master AI skills through progressive, gamified training.",
    url: "https://bluewaveprojects.com/school",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-school.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave AI School — 8 Waves, 62 Lessons",
    description:
      "Learn AI like a game. Master AI skills through progressive, gamified training.",
    images: ["/og-school.png"],
  },
};

export default function SchoolPage() {
  const courseInstances = allWaves.map((wave) => ({
    "@type": "Course",
    name: wave.title,
    description: wave.description,
    provider: {
      "@type": "Organization",
      name: "BlueWave Projects",
      url: "https://bluewaveprojects.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: wave.weekRange,
    },
    numberOfCredits: wave.units.flatMap((u) => u.lessons).length,
    educationalLevel: "Beginner to Advanced",
  }));

  return (
    <>
      <SchoolPageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "BlueWave AI School Curriculum",
            description: "8 progressive waves covering AI foundations through advanced automation.",
            numberOfItems: allWaves.length,
            itemListElement: courseInstances.map((course, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: course,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://bluewaveprojects.com" },
              { "@type": "ListItem", position: 2, name: "AI School", item: "https://bluewaveprojects.com/school" },
            ],
          }),
        }}
      />
    </>
  );
}
