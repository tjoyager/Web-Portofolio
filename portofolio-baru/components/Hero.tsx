"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-blue-400 font-mono mb-4">Halo, nama saya</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6">
          Hadryan Dimas
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Informatics Engineering Student at ITS
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition">
            Projects
          </button>
          <button className="border border-slate-700 hover:bg-slate-800 text-slate-200 px-8 py-3 rounded-lg font-medium transition">
            Resume
          </button>
        </div>
      </div>
    </section>
  );
}