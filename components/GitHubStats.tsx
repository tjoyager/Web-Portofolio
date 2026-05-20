"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface GitHubData {
  repos: number;
  stars: number;
  followers: number;
  topLanguages: string[];
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const totalFrames = duration * 60;
    const increment = end / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      start += increment;
      setCount(Math.min(Math.floor(start), end));
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function GitHubStats({ username }: { username: string }) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const repos = await reposRes.json();

        const stars = repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

        const langCount: Record<string, number> = {};
        repos.forEach((repo: any) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });
        const topLanguages = Object.entries(langCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([lang]) => lang);

        setData({
          repos: user.public_repos,
          stars,
          followers: user.followers,
          topLanguages,
        });
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
        // Fallback data
        setData({
          repos: 0,
          stars: 0,
          followers: 0,
          topLanguages: ["Loading..."],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, [username]);

  const stats = [
    { label: t("github.repos"), value: data?.repos || 0, icon: "📦" },
    { label: t("github.stars"), value: data?.stars || 0, icon: "⭐" },
    { label: t("github.followers"), value: data?.followers || 0, icon: "👥" },
  ];

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
        <span className="text-blue-500 font-mono text-xl">03.</span>
        {t("github.title")}
        <div className="h-[1px] bg-theme-border flex-grow"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl border border-theme-border bg-theme-card text-center group hover:border-blue-500/30 transition-colors duration-500"
          >
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {loading ? (
                <span className="animate-pulse">—</span>
              ) : (
                <AnimatedCounter value={stat.value} />
              )}
            </div>
            <p className="text-theme-muted text-sm font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Top Languages */}
      <div className="p-6 rounded-xl border border-theme-border bg-theme-card">
        <h3 className="text-theme-heading font-semibold mb-4">{t("github.topLanguages")}</h3>
        <div className="flex flex-wrap gap-3">
          {(data?.topLanguages || []).map((lang, i) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 font-mono text-sm border border-blue-500/20"
            >
              {lang}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          className="inline-flex items-center gap-2 text-theme-muted hover:text-blue-400 transition text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          {t("github.viewProfile")}
        </a>
      </div>
    </section>
  );
}
