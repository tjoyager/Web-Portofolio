"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "border-green-500/50 bg-green-500/10 text-green-400",
    error: "border-red-500/50 bg-red-500/10 text-red-400",
    info: "border-blue-500/50 bg-blue-500/10 text-blue-400",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] px-6 py-4 rounded-xl border backdrop-blur-md flex items-center gap-3 shadow-2xl ${colors[type]}`}
        >
          <span className="text-lg font-bold">{icons[type]}</span>
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
            className="ml-4 opacity-50 hover:opacity-100 transition"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
