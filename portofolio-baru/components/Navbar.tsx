export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Hadryan.dev
        </span>
        <div className="space-x-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}