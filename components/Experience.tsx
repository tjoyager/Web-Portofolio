"use client";
import { useLanguage } from "./LanguageProvider";
import type { ExperienceItem } from "@/types/profile";

interface ExperienceProps {
  experiences: ExperienceItem[];
  education: ExperienceItem[];
}

export default function Experience({ experiences, education }: ExperienceProps) {
  const { t } = useLanguage();

  return (
    <section id="pengalaman" className="max-w-6xl mx-auto py-20 px-4 border-t border-theme-divider">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
            <span className="text-blue-500 font-mono text-xl">04.</span> {t("experience.title")}
          </h2>
          <div className="space-y-12 border-l border-theme-border ml-3 pl-8 relative">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <h3 className="text-xl font-bold text-theme-heading">{exp.title}</h3>
                <span className="text-sm font-mono text-blue-400 block mb-2">{exp.period}</span>
                <p className="text-theme-muted">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href="/CV_Hadryan_Dimas.pdf" target="_blank" className="inline-block bg-transparent border border-theme-border-strong hover:border-blue-500 hover:text-blue-400 text-theme-muted px-8 py-3 rounded-lg font-medium transition">
              {t("experience.downloadCV")}
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
            <span className="text-blue-500 font-mono text-xl">05.</span> {t("experience.education")}
          </h2>
          <div className="space-y-12 border-l border-theme-border ml-3 pl-8 relative">
            {education.map((edu, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <h3 className="text-xl font-bold text-theme-heading">{edu.title}</h3>
                <span className="text-sm font-mono text-blue-400 block mb-2">{edu.period}</span>
                <p className="text-theme-muted">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}