import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import CaseStudyClient from "./CaseStudyClient";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found — BlueWave Projects" };

  const title = `${cs.title} — BlueWave Projects`;
  const url = `https://bluewaveprojects.com/case-studies/${cs.slug}`;

  return {
    title,
    description: cs.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: cs.title,
      description: cs.excerpt,
      url,
      siteName: "BlueWave Projects",
      type: "article",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.title,
      description: cs.excerpt,
      images: ["/og-default.png"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);

  return (
    <>
      <CaseStudyClient slug={slug} />
      {cs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: cs.title,
              description: cs.excerpt,
              url: `https://bluewaveprojects.com/case-studies/${cs.slug}`,
              author: {
                "@type": "Organization",
                name: "BlueWave Projects",
              },
              publisher: {
                "@type": "Organization",
                name: "BlueWave Projects",
                url: "https://bluewaveprojects.com",
              },
            }),
          }}
        />
      )}
    </>
  );
}
