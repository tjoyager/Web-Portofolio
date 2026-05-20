"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { TerminalLine } from "@/types/profile";

interface TerminalBoxProps {
  lines: TerminalLine[];
}

export default function TerminalBox({ lines }: TerminalBoxProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);

  useEffect(() => {
    let currentLine = 0;
    setVisibleLines([]);
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        const nextLine = lines[currentLine];
        if (nextLine) {
          setVisibleLines((prev) => [...prev, nextLine]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="bg-theme-terminal rounded-lg border border-theme-border-strong font-mono text-sm overflow-hidden shadow-2xl">
      <div className="bg-theme-surface px-4 py-2 flex gap-2 border-b border-theme-border-strong">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-theme-muted text-xs">terminal — 80x24</span>
      </div>
      <div className="p-4 space-y-2 min-h-[220px]">
        {visibleLines.map((line, i) => (
          <motion.p 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={line.type === "command" ? "text-green-400" : "text-blue-300"}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}