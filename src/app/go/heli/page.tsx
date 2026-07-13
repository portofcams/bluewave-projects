import type { Metadata } from "next";
import GoHeliRedirect from "./GoHeliRedirect";

// A tracked redirect hop, not a real page — keep it out of search indexes.
export const metadata: Metadata = {
  title: "Opening the Clearspar Heli live demo…",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function GoHeliPage() {
  return <GoHeliRedirect />;
}
