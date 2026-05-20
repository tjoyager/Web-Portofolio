"use client";
import TerminalBox from "./TerminalBox";
import { useLanguage } from "./LanguageProvider";
import type { Aspiration, UpcomingProject, TerminalLine } from "@/types/profile";

interface AboutProps {
  summary: string;
  aspiration: Aspiration;
  upcomingProject: UpcomingProject;
  terminal: TerminalLine[];
}

export default function About({ summary, aspiration, upcomingProject, terminal }: AboutProps) {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="max-w-6xl mx-auto py-20 px-4 border-t border-theme-divider">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
        <span className="text-blue-500 font-mono text-xl">01.</span> {t("about.title")}
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="text-theme-muted space-y-4 text-lg">
          <p>
            {summary.split(aspiration.title).length > 1 ? (
              <>
                {summary.split(aspiration.title)[0]}
                <span className="text-blue-400 font-semibold"> {aspiration.title}</span>
                {summary.split(aspiration.title)[1]}
              </>
            ) : (
              <>
                {summary}{" "}
                <span className="text-blue-400 font-semibold">{aspiration.title}</span>.
              </>
            )}
          </p>
          <div className="pt-6">
            <h3 className="text-xl font-semibold text-theme-text mb-4">{t("about.aspiration")}</h3>
            <p className="text-base">
              <strong className="text-blue-400">{aspiration.title}:</strong> {aspiration.description}
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-semibold text-theme-text mb-4">{t("about.upcomingProject")}</h3>
            <p className="text-base">
              <strong className="text-blue-400">{upcomingProject.title}:</strong> {upcomingProject.description}
            </p>
          </div>
        </div>
        <div className="h-fit">
          <TerminalBox lines={terminal} />
        </div>
      </div>
    </section>
  );
}