import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog — AI Insights & Tutorials | BlueWave Projects",
  description:
    "AI insights, tutorials & case studies. Practical advice on AI prompts, automation, building products, and the future of work.",
  alternates: { canonical: "https://bluewaveprojects.com/blog" },
  openGraph: {
    title: "BlueWave Blog — AI Insights & Tutorials",
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
  return (
    <>
      <BlogPageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "BlueWave Projects Blog",
            description: "AI insights, tutorials & case studies.",
            url: "https://bluewaveprojects.com/blog",
            publisher: {
              "@type": "Organization",
              name: "BlueWave Projects",
              url: "https://bluewaveprojects.com",
            },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: new Date(post.date).toISOString(),
              author: { "@type": "Person", name: post.author.name },
              url: `https://bluewaveprojects.com/blog/${post.slug}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://bluewaveprojects.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://bluewaveprojects.com/blog" },
            ],
          }),
        }}
      />
    </>
  );
}
