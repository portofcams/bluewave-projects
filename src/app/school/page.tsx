import type { Metadata } from "next";
import SchoolPageClient from "./SchoolPageClient";

export const metadata: Metadata = {
  title: "AI School — BlueWave Projects",
  description:
    "Learn AI like a game. 8 waves, 61 lessons, hands-on exercises. Master AI skills through progressive, gamified training.",
  openGraph: {
    title: "BlueWave AI School",
    description:
      "Learn AI like a game. 8 waves, 61 lessons, hands-on exercises. Master AI skills through progressive, gamified training.",
    url: "https://bluewaveprojects.com/school",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-school.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave AI School",
    description:
      "Learn AI like a game. 8 waves, 61 lessons, hands-on exercises. Master AI skills through progressive, gamified training.",
    images: ["/og-school.svg"],
  },
};

export default function SchoolPage() {
  return <SchoolPageClient />;
}
