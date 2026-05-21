import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — BlueWave Projects",
  description:
    "Privacy policy for BlueWave Projects — what we collect, how we use it, your rights, and how to reach us.",
  alternates: {
    canonical: "https://bluewaveprojects.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy — BlueWave Projects",
    description:
      "Privacy policy for BlueWave Projects — what we collect, how we use it, your rights, and how to reach us.",
    url: "https://bluewaveprojects.com/privacy",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — BlueWave Projects",
    description: "Privacy policy for BlueWave Projects.",
    images: ["/og-default.png"],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
