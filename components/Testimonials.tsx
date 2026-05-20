"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t } = useLanguage();

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (testimonials.length === 0) return null;

  const item = testimonials[current];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
        <span className="text-blue-500 font-mono text-xl">08.</span>
        {t("testimonials.title")}
        <div className="h-[1px] bg-theme-border flex-grow"></div>
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Quote marks */}
        <div className="absolute -top-4 -left-2 text-blue-500/20 text-8xl font-serif select-none">&ldquo;</div>

        <div className="min-h-[200px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full text-center px-8"
            >
              <p className="text-theme-muted text-lg md:text-xl leading-relaxed italic mb-8">
                &ldquo;{item.message}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {item.avatar ? (
                    <span className="text-2xl">{item.avatar}</span>
                  ) : (
                    item.name.charAt(0)
                  )}
                </div>
                <div className="text-left">
                  <p className="text-theme-heading font-semibold">{item.name}</p>
                  <p className="text-blue-400 text-sm font-mono">{item.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-theme-border hover:border-blue-500/50 flex items-center justify-center text-theme-muted hover:text-blue-400 transition"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-blue-500 w-6" : "bg-theme-border hover:bg-blue-500/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-theme-border hover:border-blue-500/50 flex items-center justify-center text-theme-muted hover:text-blue-400 transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
