import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Assessment — BlueWave Projects",
  description:
    "Take our 2-minute assessment to discover how AI can save your business time. Get a personalized automation roadmap.",
  alternates: {
    canonical: "https://bluewaveprojects.com/intake",
  },
  openGraph: {
    title: "Free AI Assessment — BlueWave Projects",
    description:
      "Take our 2-minute assessment to discover how AI can save your business time.",
    url: "https://bluewaveprojects.com/intake",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Assessment — BlueWave Projects",
    description:
      "Take our 2-minute assessment to discover how AI can save your business time.",
    images: ["/og-default.png"],
  },
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
