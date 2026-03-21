import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog — BlueWave Projects",
  description:
    "AI insights, tutorials & case studies. Thoughts on AI, building products, and the future of work.",
  openGraph: {
    title: "BlueWave Blog",
    description:
      "AI insights, tutorials & case studies. Thoughts on AI, building products, and the future of work.",
    url: "https://bluewaveprojects.com/blog",
    siteName: "BlueWave Projects",
    type: "website",
    images: [{ url: "/og-blog.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueWave Blog",
    description:
      "AI insights, tutorials & case studies. Thoughts on AI, building products, and the future of work.",
    images: ["/og-blog.png"],
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
