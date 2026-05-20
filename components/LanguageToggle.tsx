"use client";
import { useLanguage } from "./LanguageProvider";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      id="language-toggle"
      onClick={toggleLocale}
      className="relative w-10 h-10 rounded-lg border border-theme-border hover:border-blue-500/50 flex items-center justify-center transition-colors duration-300 bg-theme-card"
      aria-label={`Switch to ${locale === "id" ? "English" : "Bahasa Indonesia"}`}
    >
      <motion.span
        key={locale}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-bold text-blue-400 font-mono"
      >
        {locale === "id" ? "EN" : "ID"}
      </motion.span>
    </button>
  );
}
