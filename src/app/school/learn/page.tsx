import type { Metadata } from "next";
import SchoolPageClient from "../SchoolPageClient";

export const metadata: Metadata = {
  title: "Learn — BlueWave AI School",
  description:
    "Your AI learning dashboard. Pick up where you left off, browse waves, jump into the sandbox.",
  robots: { index: false, follow: false },
};

export default function SchoolLearnPage() {
  return <SchoolPageClient />;
}
