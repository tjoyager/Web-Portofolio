import * as fs from "fs";
import * as path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), "data", "blog");

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function parseFrontmatter(fileContent: string): { metadata: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const metadata: Record<string, any> = {};
  const lines = match[1].split("\n");
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    
    // Handle arrays like tags: [tag1, tag2]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1);
      metadata[key] = value.split(",").map((v: string) => v.trim().replace(/['"]/g, ""));
    } else {
      metadata[key] = value.replace(/['"]/g, "");
    }
  }

  return { metadata, content: match[2] };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts: BlogPost[] = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { metadata, content } = parseFrontmatter(fileContent);
    const slug = filename.replace(/\.(mdx|md)$/, "");

    return {
      slug,
      title: metadata.title || slug,
      date: metadata.date || "",
      excerpt: metadata.excerpt || content.slice(0, 160).replace(/[#*_]/g, "").trim() + "...",
      content,
      tags: metadata.tags || [],
      readingTime: estimateReadingTime(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}
