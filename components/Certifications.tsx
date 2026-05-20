"use client";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon?: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const { t } = useLanguage();

  const issuerIcons: Record<string, string> = {
    "Google": "🔵",
    "Coursera": "📘",
    "Meta": "🔷",
    "AWS": "🟠",
    "Microsoft": "🟦",
    "Dicoding": "🟢",
    "HackerRank": "🟩",
    "Cisco": "🔴",
    "default": "📜",
  };

  const getIcon = (issuer: string) => {
    for (const [key, icon] of Object.entries(issuerIcons)) {
      if (issuer.toLowerCase().includes(key.toLowerCase())) return icon;
    }
    return issuerIcons.default;
  };

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
        <span className="text-blue-500 font-mono text-xl">07.</span>
        {t("certifications.title")}
        <div className="h-[1px] bg-theme-border flex-grow"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-xl border border-theme-border bg-theme-card group hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{cert.icon || getIcon(cert.issuer)}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-theme-heading font-bold text-sm leading-tight mb-1 truncate">{cert.title}</h3>
                <p className="text-blue-400 text-xs font-mono mb-1">{cert.issuer}</p>
                <p className="text-theme-subtle text-xs">{cert.date}</p>
              </div>
            </div>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                className="mt-4 inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                {t("certifications.verify")}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
