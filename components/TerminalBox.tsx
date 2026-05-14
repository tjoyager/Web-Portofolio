"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FULL_CONTENT = [
  "hadryan@its:~$ whoami",
  "Hadryan Rizky Dimas Saputra",
  "hadryan@its:~$ fetch info",
  "Role: Informatics Student",
  "Focus: System Engineering & Robotics",
  "Status: Searching for innovation...",
  "hadryan@its:~$ ls skills/",
  "C++  Python  ROS2  Linux  YOLO",
  "hadryan@its:~$ _"
];

export default function TerminalBox() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < FULL_CONTENT.length) {
        const nextLine = FULL_CONTENT[currentLine];
        if (nextLine) {
          setLines((prev) => [...prev, nextLine]);
        }
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 rounded-lg border border-slate-700 font-mono text-sm overflow-hidden shadow-2xl">
      <div className="bg-slate-800 px-4 py-2 flex gap-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-slate-400 text-xs">terminal — 80x24</span>
      </div>
      <div className="p-4 space-y-2 min-h-[220px]">
        {lines.map((line, i) => (
          <motion.p 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={line && line.startsWith("hadryan") ? "text-green-400" : "text-blue-300"}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}