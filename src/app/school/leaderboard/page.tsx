import type { Metadata } from "next";
import LeaderboardClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Leaderboard — AI School | BlueWave Projects",
  description:
    "Track your AI School progress and see how you rank. XP, streaks, levels, and lessons completed.",
  alternates: { canonical: "https://bluewaveprojects.com/school/leaderboard" },
  openGraph: {
    title: "AI School Leaderboard — BlueWave Projects",
    description:
      "Track your AI School progress and see how you rank.",
    url: "https://bluewaveprojects.com/school/leaderboard",
    siteName: "BlueWave Projects",
    type: "website",
  },
};

export default function LeaderboardPage() {
  return (
    <>
      <LeaderboardClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://bluewaveprojects.com" },
              { "@type": "ListItem", position: 2, name: "AI School", item: "https://bluewaveprojects.com/school" },
              { "@type": "ListItem", position: 3, name: "Leaderboard", item: "https://bluewaveprojects.com/school/leaderboard" },
            ],
          }),
        }}
      />
    </>
  );
}
