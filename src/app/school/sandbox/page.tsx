import type { Metadata } from "next";
import SandboxClient from "./SandboxClient";

export const metadata: Metadata = {
  title: "Prompt Playground — AI School | BlueWave Projects",
  description:
    "Practice prompt engineering with templates, an interactive builder, and challenges. Master the art of writing effective AI prompts.",
  alternates: { canonical: "https://bluewaveprojects.com/school/sandbox" },
  openGraph: {
    title: "Prompt Playground — BlueWave AI School",
    description:
      "Practice prompt engineering with templates, an interactive builder, and challenges.",
    url: "https://bluewaveprojects.com/school/sandbox",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-school.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Playground — BlueWave AI School",
    description:
      "Practice prompt engineering with templates, an interactive builder, and challenges.",
    images: ["/og-school.png"],
  },
};

export default function SandboxPage() {
  return (
    <>
      <SandboxClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://bluewaveprojects.com" },
              { "@type": "ListItem", position: 2, name: "AI School", item: "https://bluewaveprojects.com/school" },
              { "@type": "ListItem", position: 3, name: "Prompt Playground", item: "https://bluewaveprojects.com/school/sandbox" },
            ],
          }),
        }}
      />
    </>
  );
}
