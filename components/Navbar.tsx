"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("beranda");

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
    { name: "Beranda", id: "beranda" },
    { name: "Tentang", id: "tentang" },
    { name: "Proyek", id: "portofolio" },
    { name: "Pengalaman", id: "pengalaman" },
    { name: "Kontak", id: "kontak" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          HD
        </span>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
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
        </div>
      </div>
    </nav>
  );
}