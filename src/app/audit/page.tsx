import type { Metadata } from "next";
import AuditRedirectClient from "./AuditRedirectClient";

// Short, memorable CTA for Looms and phone calls: bluewaveprojects.com/audit
// It forwards to the audit request form on /booked-direct, preserving ?ref= so
// the lead still ties back to the prospect we pitched. noindex — it's a hop.
export const metadata: Metadata = {
  title: "Free Visibility Audit — BlueWave Projects",
  description:
    "Request your free, recorded local-search visibility audit for your Hawaii ocean-tour or charter operation.",
  robots: { index: false, follow: true },
};

export default function AuditRedirectPage() {
  return <AuditRedirectClient />;
}
