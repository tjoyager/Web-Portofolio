"use client";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import type { SkillCategory } from "@/types/profile";

interface SkillsProps {
  skills: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  const { t } = useLanguage();

  return (
    <section id="skills" className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
        <span className="text-blue-500 font-mono text-xl">02.</span> 
        {t("skills.title")}
        <div className="h-[1px] bg-theme-border flex-grow"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((cat, i) => (
          <div key={i} className="p-6 rounded-xl border border-theme-border bg-theme-card group hover:border-blue-500/30 transition-colors duration-500">
            <h3 className="text-blue-400 font-mono mb-4 font-bold">{cat.category}</h3>
            <ul className="space-y-3">
              {cat.items.map((skill) => (
                <motion.li 
                  key={skill} 
                  whileHover={{ x: 5, color: "#60a5fa" }}
                  className="flex items-center gap-2 text-theme-muted cursor-default"
                >
                  <span className="text-blue-500 text-xs shadow-[0_0_10px_rgba(59,130,246,0.5)]">▹</span> 
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}