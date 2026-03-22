import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Post Not Found — BlueWave Projects" };
  }

  const title = `${post.title} — BlueWave Projects`;
  const description = post.excerpt;
  const url = `https://bluewaveprojects.com/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "BlueWave Projects",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      images: [{ url: "/og-blog.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ["/og-blog.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  return (
    <>
      <BlogPostClient slug={slug} />
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              datePublished: new Date(post.date).toISOString(),
              author: {
                "@type": "Person",
                name: post.author.name,
                jobTitle: post.author.role,
              },
              publisher: {
                "@type": "Organization",
                name: "BlueWave Projects",
                url: "https://bluewaveprojects.com",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://bluewaveprojects.com/blog/${post.slug}`,
              },
              articleSection: post.category,
              wordCount: post.content.split(/\s+/).length,
              timeRequired: `PT${parseInt(post.readTime)}M`,
            }),
          }}
        />
      )}
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://bluewaveprojects.com" },
                { "@type": "ListItem", position: 2, name: "Blog", item: "https://bluewaveprojects.com/blog" },
                { "@type": "ListItem", position: 3, name: post.title, item: `https://bluewaveprojects.com/blog/${post.slug}` },
              ],
            }),
          }}
        />
      )}
    </>
  );
}
