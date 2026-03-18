import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlueWave Projects — AI Consulting, Custom Apps & AI School",
  description:
    "AI consulting, custom app development, and gamified AI training. Built in the Pacific, serving everyone. Learn AI through interactive lessons or hire us to build.",
  keywords: [
    "AI consulting",
    "AI training",
    "learn AI",
    "prompt engineering",
    "custom apps",
    "BlueWave Projects",
  ],
  openGraph: {
    title: "BlueWave Projects — AI Consulting, Custom Apps & AI School",
    description:
      "AI consulting, custom app development, and gamified AI training. Built in the Pacific, serving everyone. Learn AI through interactive lessons or hire us to build.",
    url: "https://bluewaveprojects.com",
    siteName: "BlueWave Projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave Projects — AI Consulting, Custom Apps & AI School",
    description:
      "AI consulting, custom app development, and gamified AI training. Built in the Pacific, serving everyone. Learn AI through interactive lessons or hire us to build.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">{children}</body>
      <Script
        defer
        src="https://ai.portofcams.com/api/analytics/tracker.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
