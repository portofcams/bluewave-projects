// PagesFunction type — minimal local declaration so `next build` typechecks
// without pulling in @cloudflare/workers-types. The Cloudflare runtime
// doesn't read this annotation; it only matters for the local build.
type PagesFunction = (context: {
  params: Record<string, string | string[]>;
  next: () => Promise<Response>;
}) => Promise<Response> | Response;

// Cloudflare Pages Function — return 410 Gone for legacy AI-agency blog
// posts. These slugs existed when the site was positioned as an AI
// consulting + custom-app shop; the company has since pivoted to a
// contractor SaaS, and the old posts are off-topic enough that we want
// Google to deindex them aggressively. 410 Gone signals "permanently
// removed, don't crawl again" — Google deindexes faster than from a 404.
//
// New blog posts (when there are any) live in src/data/blog-posts.ts and
// get served as static HTML by Next.js export. Slugs not in this kill
// list fall through to `next()` and hit the normal blog post route or
// the 404 page.

const GONE = new Set<string>([
  "5-ai-prompts-every-business-owner-needs",
  "why-claude-is-my-secret-weapon",
  "how-i-built-6-apps-in-6-months",
  "the-beginners-guide-to-prompt-engineering",
  "ai-wont-replace-you-but-someone-using-ai-will",
  "from-zero-to-ai-architect-a-learning-path",
  "5-ai-tools-every-small-business-should-be-using-in-2026",
  "how-to-automate-your-business-without-writing-code",
  "why-your-business-needs-a-custom-ai-agent",
  "from-sea-captain-to-software-developer",
  "the-real-cost-of-not-using-ai-in-your-business",
  "ai-for-restaurants-bars-hotels",
  "ai-audit-what-to-expect",
  "build-your-first-ai-workflow-in-10-minutes",
  "how-we-built-a-24500-camera-streaming-platform",
  "building-ai-powered-apps-lessons-from-8-production-projects",
  "from-idea-to-launch-ship-products-in-days",
  "how-much-does-it-cost-to-build-an-app-in-2026",
  "claude-vs-chatgpt-vs-gemini-which-ai-for-business",
  "how-to-build-a-saas-product-as-a-solo-developer",
  "ai-for-hawaii-small-businesses-practical-guide",
  "what-is-an-ai-agent-and-why-your-business-needs-one",
  "idea-to-revenue-in-30-days-with-ai",
]);

export const onRequestGet: PagesFunction = async ({ params, next }) => {
  const slug = String(params.slug ?? "");
  if (GONE.has(slug)) {
    return new Response(
      `<!doctype html><html><head><meta charset="utf-8">
      <title>Gone — BlueWave Projects</title>
      <meta name="robots" content="noindex">
      <style>body{font-family:Georgia,serif;max-width:560px;margin:8em auto;padding:0 1em;color:#1a1a1a;line-height:1.5}
      h1{font-weight:400;font-size:1.4em}
      a{color:#0a6}</style></head>
      <body>
        <h1>This article has been retired.</h1>
        <p>BlueWave Projects has refocused on construction project management for design-build contractors. The AI-consulting era is over.</p>
        <p><a href="/">Visit the new BlueWave Projects →</a></p>
      </body></html>`,
      {
        status: 410,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=86400",
        },
      },
    );
  }
  return next();
};
