import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlueWave Projects | AI Consulting, Apps & Innovation",
  description:
    "We build intelligent software, teach AI productivity, and launch products that matter. Based in the Pacific — powered by curiosity.",
  openGraph: {
    title: "BlueWave Projects",
    description: "AI Consulting, Apps & Innovation",
    type: "website",
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
    </html>
  );
}
