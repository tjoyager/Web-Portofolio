"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ["Informatics Student", "Future System Engineer", "Robotics Enthusiast"];
  const speed = isDeleting ? 50 : 150;

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setText(currentRole.substring(0, text.length - 1));
      } else {
        setText(currentRole.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="beranda" className="pt-32 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <div className="h-8 mb-4">
            <h2 className="text-blue-400 font-mono text-lg">
              {text}<span className="animate-pulse">|</span>
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-6">
            Halo, Saya Hadryan.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Saya adalah mahasiswa sarjana Teknik Informatika di <span className="text-slate-100 font-semibold">Institut Teknologi Sepuluh Nopember (ITS)</span>, 
            dengan cita-cita untuk menjadi seorang profesional di bidang teknologi digital.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#kontak" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2"
            >
              Hubungi Saya
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-slate-800"
          >
            <Image 
              src="/hadryan.png" 
              alt="Hadryan Rizky Dimas Saputra" 
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}