import type { Metadata } from "next";
import { allWaves } from "@/lib/curriculum";
import SchoolLanding from "@/components/SchoolLanding";

export const metadata: Metadata = {
  title: "BlueWave AI School — Learn AI like an operator | from $39/mo or $199 lifetime|Learn AI like an operator | from $39/mo or $199 lifetime",
  description:
    "Eight waves, sixty-one lessons, a live sandbox. AI training built by an operator who ships six AI products on Claude.Learn AI like an operator | from $39/mo or $199 lifetime solo, $249/mo with 1-on-1 coaching.",
  alternates: { canonical: "https://bluewaveprojects.com/school" },
  openGraph: {
    title: "BlueWave AI School — Learn AI like an operator",
    description:
      "Eight waves, sixty-one lessons, a live sandbox. AI training built by an operator who ships AI products on Claude.",
    url: "https://bluewaveprojects.com/school",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-school.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave AI School — Learn AI like an operator",
    description: "Eight waves, sixty-one lessons, a live sandbox.Learn AI like an operator | from $39/mo or $199 lifetime.",
    images: ["/og-school.png"],
  },
};

export default function SchoolLandingPage() {
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
      <SchoolLanding />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "BlueWave AI School Curriculum",
            description:
              "Progressive waves covering AI foundations through advanced automation and a hands-on RAG build track.",
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://bluewaveprojects.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "AI School",
                item: "https://bluewaveprojects.com/school",
              },
            ],
          }),
        }}
      />
    </>
  );
}
