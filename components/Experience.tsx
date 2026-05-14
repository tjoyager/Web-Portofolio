export default function Experience() {
  const experiences = [
    {
      title: "Staff Divisi Programming - Tim Riset Banyubramanta ITS",
      period: "2025 - Sekarang",
      description: "Bertanggung jawab dalam pengembangan perangkat lunak untuk riset robotika bawah air."
    },
    {
      title: "Ketua Pelaksana - SMAN 1 Kepanjen",
      period: "2024",
      description: "Menjadi Ketua/Penanggung Jawab dalam kegiatan sosial berupa Sosialiasi Makan Sehat Bergizi di SD Negeri 4 Panggungrejo Kabupaten Malang."
    },
    {
      title: "Editor Dokumen - Masjid Sabilul Muhtadin",
      period: "2022",
      description: "Berpartisipasi sebagai editor dokumen dalam panitia pembangunan masjid di domisili asal saya."
    }
  ];

  const education = [
    {
      title: "Institut Teknologi Sepuluh Nopember (ITS)",
      period: "2025 - Sekarang",
      description: "Sarjana Teknik Informatika"
    },
    {
      title: "SMAN 1 Kepanjen",
      period: "2022 - 2025",
      description: "Jurusan IPA - Teknik"
    },
    {
      title: "SMPN 2 Sumberpucung",
      period: "2019 - 2022",
      description: "Dikenal dengan SMP TGP (Tentara Genie Peladjar)"
    }
  ];

  return (
    <section id="pengalaman" className="max-w-6xl mx-auto py-20 px-4 border-t border-slate-900">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-100">
            <span className="text-blue-500 font-mono text-xl">04.</span> Pengalaman
          </h2>
          <div className="space-y-12 border-l border-slate-800 ml-3 pl-8 relative">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <h3 className="text-xl font-bold text-slate-100">{exp.title}</h3>
                <span className="text-sm font-mono text-blue-400 block mb-2">{exp.period}</span>
                <p className="text-slate-400">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href="/CV_Hadryan_Dimas.pdf" target="_blank" className="inline-block bg-transparent border border-slate-700 hover:border-blue-500 hover:text-blue-400 text-slate-400 px-8 py-3 rounded-lg font-medium transition">
              Unduh CV Lengkap (PDF)
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-100">
            <span className="text-blue-500 font-mono text-xl">05.</span> Pendidikan
          </h2>
          <div className="space-y-12 border-l border-slate-800 ml-3 pl-8 relative">
            {education.map((edu, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <h3 className="text-xl font-bold text-slate-100">{edu.title}</h3>
                <span className="text-sm font-mono text-blue-400 block mb-2">{edu.period}</span>
                <p className="text-slate-400">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}