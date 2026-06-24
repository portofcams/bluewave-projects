import type { Metadata } from "next";
import CaseStudiesIndex from "./CaseStudiesIndex";

export const metadata: Metadata = {
  title: "Case Studies — BlueWave Projects",
  description:
    "Real projects built with Claude AI. See how we scaled platforms, automated workflows, and shipped production apps with Claude as the engineering partner.",
  alternates: { canonical: "https://bluewaveprojects.com/case-studies" },
  openGraph: {
    title: "Case Studies — BlueWave Projects",
    description:
      "Real projects built with Claude AI. See how we scaled platforms, automated workflows, and shipped production apps.",
    url: "https://bluewaveprojects.com/case-studies",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesIndex />;
}
