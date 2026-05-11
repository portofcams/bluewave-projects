export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  gradient: string;
  author: {
    name: string;
    role: string;
  };
}

// 2026-05-10: Cleared all 22 prior posts. They were written when BlueWave
// was positioned as an AI consulting + custom apps shop; that positioning
// is gone, the company is now a contractor SaaS. The old slugs are 410'd
// at the edge via public/_redirects so Google deindexes them quickly.
//
// New posts will be construction-focused — RoomPlan vs Matterport,
// scoping a renovation in 60 seconds, Hawaii GC-B licensing, etc. See
// the editorial calendar in MEMORY.md.
export const blogPosts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, count);
}
