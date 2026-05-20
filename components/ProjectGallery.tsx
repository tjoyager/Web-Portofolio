"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  caption?: string;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
  projectTitle: string;
}

export default function ProjectGallery({ items, projectTitle }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  if (!items || items.length === 0) return null;

  const goNext = () => setCurrent((prev) => (prev + 1) % items.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition font-mono"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
        {t("gallery.viewGallery")} ({items.length})
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">{projectTitle}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    {items[current].type === "image" ? (
                      <Image
                        src={items[current].src}
                        alt={items[current].caption || projectTitle}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <iframe
                        src={items[current].src}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {items.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Caption & dots */}
              {items[current].caption && (
                <p className="text-white/70 text-center mt-3 text-sm">{items[current].caption}</p>
              )}
              <div className="flex justify-center gap-2 mt-4">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-blue-500 w-6" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
