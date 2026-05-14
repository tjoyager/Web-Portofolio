export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          HD
        </span>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <a href="#beranda" className="hover:text-blue-400 transition">Beranda</a>
          <a href="#tentang" className="hover:text-blue-400 transition">Tentang</a>
          <a href="#portofolio" className="hover:text-blue-400 transition">Proyek</a>
          <a href="#pengalaman" className="hover:text-blue-400 transition">Pengalaman</a>
          <a href="#kontak" className="hover:text-blue-400 transition">Kontak</a>
        </div>
      </div>
    </nav>
  );
}