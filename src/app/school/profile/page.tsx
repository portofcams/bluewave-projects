import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "My Profile — AI School | BlueWave Projects",
  description:
    "Track your AI School progress, XP, streaks, wave completions, and achievement badges.",
  alternates: { canonical: "https://bluewaveprojects.com/school/profile" },
  openGraph: {
    title: "My AI School Profile — BlueWave Projects",
    description:
      "Track your AI School progress, XP, streaks, wave completions, and achievement badges.",
    url: "https://bluewaveprojects.com/school/profile",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-school.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "My AI School Profile — BlueWave Projects",
    description:
      "Track your AI School progress, XP, streaks, and achievements.",
    images: ["/og-school.png"],
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
