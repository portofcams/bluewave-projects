import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bluewaveprojects.com"),
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
  alternates: {
    canonical: "https://bluewaveprojects.com",
  },
  openGraph: {
    title: "BlueWave Projects — AI Consulting, Custom Apps & AI School",
    description:
      "AI consulting, custom app development, and gamified AI training. Built in the Pacific, serving everyone. Learn AI through interactive lessons or hire us to build.",
    url: "https://bluewaveprojects.com",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave Projects — AI Consulting, Custom Apps & AI School",
    description:
      "AI consulting, custom app development, and gamified AI training. Built in the Pacific, serving everyone. Learn AI through interactive lessons or hire us to build.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "BlueWave Projects",
              url: "https://bluewaveprojects.com",
              description:
                "AI consulting, custom app development, and gamified AI training.",
              sameAs: [],
              address: {
                "@type": "PostalAddress",
                addressRegion: "HI",
                addressCountry: "US",
              },
              areaServed: "Worldwide",
              serviceType: [
                "AI Consulting",
                "Custom App Development",
                "AI Training",
              ],
            }),
          }}
        />
      </body>
      <Script
        defer
        src="https://ai.portofcams.com/static/tracker.js"
        data-site="bluewaveprojects"
        strategy="afterInteractive"
      />
    </html>
  );
}
