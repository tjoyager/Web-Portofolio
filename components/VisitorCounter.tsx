"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Simple visitor counter using localStorage + random increment for demo
    // Replace with a real API (e.g., CountAPI, Vercel KV, or your own backend)
    try {
      const stored = localStorage.getItem("visitor_count");
      const lastVisit = localStorage.getItem("last_visit_date");
      const today = new Date().toDateString();
      
      let currentCount = stored ? parseInt(stored) : 1247; // Start from a realistic number
      
      if (lastVisit !== today) {
        currentCount += 1;
        localStorage.setItem("last_visit_date", today);
        localStorage.setItem("visitor_count", currentCount.toString());
      }
      
      setCount(currentCount);
    } catch {
      setCount(1247);
    }
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-flex items-center gap-2 text-theme-subtle text-sm"
    >
      <span className="text-lg">👀</span>
      <span className="font-mono text-blue-400 font-semibold">{count.toLocaleString()}</span>
      <span>{t("visitor.visitors")}</span>
    </motion.div>
  );
}
