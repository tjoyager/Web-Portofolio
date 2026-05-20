import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Hadryan Rizky Dimas Saputra",
  description: "Artikel dan tulisan tentang robotika, pemrograman, dan teknologi.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-theme-bg text-theme-text">
      <div className="max-w-4xl mx-auto py-20 px-4">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 transition text-sm font-mono mb-8 inline-flex items-center gap-2"
        >
          ← Kembali
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-theme-heading mb-4">Blog</h1>
        <p className="text-theme-muted text-lg mb-12">
          Tulisan tentang robotika, pemrograman, dan teknologi.
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-theme-muted text-lg">Belum ada artikel. Coming soon! 🚀</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-6 rounded-xl border border-theme-border bg-theme-card hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-3">
                    <time className="text-blue-400 text-xs font-mono">{post.date}</time>
                    <span className="text-theme-subtle text-xs">·</span>
                    <span className="text-theme-subtle text-xs">{post.readingTime} min read</span>
                  </div>
                  <h2 className="text-xl font-bold text-theme-heading group-hover:text-blue-400 transition mb-2">
                    {post.title}
                  </h2>
                  <p className="text-theme-muted text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
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
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
