import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation — BlueWave Projects",
  description:
    "Schedule a free 30-minute AI consulting session. We'll map out how to automate your biggest time sinks.",
  alternates: {
    canonical: "https://bluewaveprojects.com/booking",
  },
  openGraph: {
    title: "Book a Consultation — BlueWave Projects",
    description:
      "Schedule a free 30-minute AI consulting session. We'll map out how to automate your biggest time sinks.",
    url: "https://bluewaveprojects.com/booking",
    images: [{ url: "/og-default.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation — BlueWave Projects",
    description:
      "Schedule a free 30-minute AI consulting session.",
    images: ["/og-default.png"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
