import TerminalBox from "./TerminalBox";

export default function About() {
  return (
    <section id="tentang" className="max-w-6xl mx-auto py-20 px-4 border-t border-slate-900">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-100">
        <span className="text-blue-500 font-mono text-xl">01.</span> Tentang Saya
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="text-slate-400 space-y-4 text-lg">
          <p>
            Saya adalah mahasiswa Teknik Informatika ITS angkatan 2025 dengan cita-cita menjadi seorang 
            <span className="text-blue-400 font-semibold"> System Engineer</span>.
          </p>
          <div className="pt-6">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">Cita-Cita</h3>
            <p className="text-base">
              <strong className="text-blue-400">System Engineer:</strong> IT professional who designs, builds, installs, and maintains complex IT infrastructures.
            </p>
          </div>
          <div className="pt-6">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">Proyek Mendatang</h3>
            <p className="text-base">
              <strong className="text-blue-400">Finder:</strong> Mesin Pathfinding dan Simulasi Navigasi untuk mencari rute terpendek dan terefisien dari satu titik ke titik yang lain.
            </p>
          </div>
        </div>
        <div className="h-fit">
          <TerminalBox />
        </div>
      </div>
    </section>
  );
}