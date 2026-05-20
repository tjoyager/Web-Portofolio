import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Blog Hadryan`,
    description: post.excerpt,
  };
}

function renderMarkdown(content: string): string {
  // Simple markdown to HTML converter
  let html = content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-theme-heading mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-theme-heading mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-theme-heading mt-8 mb-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-theme-heading font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 mb-2"><span class="text-blue-500 mt-1">▹</span><span>$1</span></li>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[hul]|<li)(.+)$/gm, '<p class="text-theme-muted leading-relaxed mb-4">$1</p>');
  
  // Wrap consecutive li elements in ul
  html = html.replace(
    /(<li[^>]*>.*?<\/li>\s*)+/gs,
    (match) => `<ul class="space-y-1 mb-6 ml-2">${match}</ul>`
  );

  return html;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-theme-bg text-theme-text">
      <article className="max-w-3xl mx-auto py-20 px-4">
        <Link
          href="/blog"
          className="text-blue-400 hover:text-blue-300 transition text-sm font-mono mb-8 inline-flex items-center gap-2"
        >
          ← Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <time className="text-blue-400 text-sm font-mono">{post.date}</time>
            <span className="text-theme-subtle">·</span>
            <span className="text-theme-subtle text-sm">{post.readingTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-theme-heading mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <div className="mt-16 pt-8 border-t border-theme-divider">
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 transition text-sm font-mono inline-flex items-center gap-2"
          >
            ← Kembali ke Blog
          </Link>
        </div>
      </article>
    </main>
  );
}
