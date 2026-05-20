"use client";

import { useLanguage } from "./LanguageProvider";
import VisitorCounter from "./VisitorCounter";
import Toast, { ToastType } from "./Toast";
import { useState, useCallback } from "react";
import type { Contact as ContactType } from "@/types/profile";

interface ContactProps {
  contact: ContactType;
}

export default function Contact({ contact }: ContactProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setToast({ message: t("contact.successAlert"), type: "success" });
      (e.target as HTMLFormElement).reset();
    } catch {
      setToast({ message: "Failed to send message.", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [t]);

  return (
    <section id="kontak" className="max-w-6xl mx-auto py-20 px-4 border-t border-theme-divider">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
        <span className="text-blue-500 font-mono text-xl">09.</span> {t("contact.title")}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" name="user_name"
            placeholder={t("contact.namePlaceholder")} required 
            className="w-full bg-theme-input border border-theme-border rounded-lg p-4 text-theme-heading focus:outline-none focus:border-blue-500 transition"
          />
          <input 
            type="email" name="user_email"
            placeholder={t("contact.emailPlaceholder")} required 
            className="w-full bg-theme-input border border-theme-border rounded-lg p-4 text-theme-heading focus:outline-none focus:border-blue-500 transition"
          />
          <textarea 
            name="message"
            placeholder={t("contact.messagePlaceholder")} rows={5} required 
            className="w-full bg-theme-input border border-theme-border rounded-lg p-4 text-theme-heading focus:outline-none focus:border-blue-500 transition"
          ></textarea>
          <button 
            type="submit" disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-4 rounded-lg font-medium transition w-full md:w-auto flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            )}
            {t("contact.send")}
          </button>
        </form>

        <div className="flex flex-col justify-between">
          <p className="text-theme-muted text-lg leading-relaxed">
            {t("contact.description")}
          </p>
          <div className="flex gap-6 mt-8">
            <a href={contact.linkedin} target="_blank" className="text-theme-muted hover:text-blue-400 transition text-lg">LinkedIn</a>
            <span className="text-theme-border">|</span>
            <a href={contact.github} target="_blank" className="text-theme-muted hover:text-blue-400 transition text-lg">GitHub</a>
            <span className="text-theme-border">|</span>
            <a href={`mailto:${contact.email}`} className="text-theme-muted hover:text-blue-400 transition text-lg">Email</a>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-theme-divider text-center space-y-4">
        <VisitorCounter />
        <p className="text-theme-subtle text-sm">&copy; 2026 | Hadryan. {t("contact.footer")}</p>
      </footer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </section>
  );
}