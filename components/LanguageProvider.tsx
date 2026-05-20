"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import idTranslations from "@/data/translations/id.json";
import enTranslations from "@/data/translations/en.json";

type Locale = "id" | "en";
type TranslationData = typeof idTranslations;

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const translations: Record<Locale, TranslationData> = {
  id: idTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "id",
  toggleLocale: () => {},
  t: (key: string) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && (stored === "id" || stored === "en")) {
      setLocale(stored);
    }
    setMounted(true);
  }, []);

  const toggleLocale = () => {
    const next = locale === "id" ? "en" : "id";
    setLocale(next);
    localStorage.setItem("locale", next);
  };

  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: any = translations[locale];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    return typeof value === "string" ? value : key;
  }, [locale]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
