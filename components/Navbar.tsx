"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import Link from "next/link";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["beranda", "tentang", "portofolio", "pengalaman", "kontak"];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: t("nav.home"), id: "beranda" },
    { name: t("nav.about"), id: "tentang" },
    { name: t("nav.projects"), id: "portofolio" },
    { name: t("nav.experience"), id: "pengalaman" },
    { name: t("nav.contact"), id: "kontak" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-theme-nav backdrop-blur-md border-b border-theme-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          HD
        </span>
        
        <div className="flex items-center gap-4">
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-6 text-sm font-medium text-theme-muted">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition relative py-1 ${
                  activeSection === link.id ? "text-blue-400" : "hover:text-blue-400"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                )}
              </a>
            ))}
            <Link
              href="/blog"
              className="transition py-1 hover:text-blue-400"
            >
              {t("blog.title")}
            </Link>
          </div>
          
          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-theme-border"
          >
            <span className={`w-5 h-0.5 bg-theme-muted transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-theme-muted transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-theme-muted transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-theme-nav border-t border-theme-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${
                activeSection === link.id ? "text-blue-400" : "text-theme-muted"
              }`}
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm font-medium text-theme-muted hover:text-blue-400"
          >
            {t("blog.title")}
          </Link>
        </div>
      )}
    </nav>
  );
}