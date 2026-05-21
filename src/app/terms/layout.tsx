import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — BlueWave Projects",
  description:
    "Terms of service for BlueWave Projects — AI consulting, custom applications, APIs, and AI School.",
  alternates: {
    canonical: "https://bluewaveprojects.com/terms",
  },
  openGraph: {
    title: "Terms of Service — BlueWave Projects",
    description:
      "Terms of service for BlueWave Projects — AI consulting, custom applications, APIs, and AI School.",
    url: "https://bluewaveprojects.com/terms",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — BlueWave Projects",
    description: "Terms of service for BlueWave Projects.",
    images: ["/og-default.png"],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
