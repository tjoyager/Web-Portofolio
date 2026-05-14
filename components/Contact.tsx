"use client";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. (Catatan: Ini adalah demo, hubungkan dengan backend/API form untuk fungsi nyata).');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="kontak" className="max-w-6xl mx-auto py-20 px-4 border-t border-slate-900">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-100">
        <span className="text-blue-500 font-mono text-xl">06.</span> Hubungi Saya
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            placeholder="Nama Anda" 
            required 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
          <input 
            type="email" 
            placeholder="Email Anda" 
            required 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-slate-100 focus:outline-none focus:border-blue-500 transition"
          />
          <textarea 
            placeholder="Pesan Anda" 
            rows={5} 
            required 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-slate-100 focus:outline-none focus:border-blue-500 transition"
          ></textarea>
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition w-full md:w-auto"
          >
            Kirim Pesan
          </button>
        </form>

        <div className="flex flex-col justify-between">
          <p className="text-slate-400 text-lg leading-relaxed">
            Silakan hubungi saya melalui form di samping atau melalui media sosial di bawah ini. Saya akan berusaha membalas secepat mungkin.
          </p>
          <div className="flex gap-6 mt-8">
            <a href="https://linkedin.com/in/hadryandimas" target="_blank" className="text-slate-400 hover:text-blue-400 transition text-lg">LinkedIn</a>
            <span className="text-slate-800">|</span>
            <a href="https://github.com/tjoyager" target="_blank" className="text-slate-400 hover:text-blue-400 transition text-lg">GitHub</a>
            <span className="text-slate-800">|</span>
            <a href="mailto:dimassaputraa779@gmail.com" className="text-slate-400 hover:text-blue-400 transition text-lg">Email</a>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; 2026 | Hadryan. Semua hak cipta dilindungi.</p>
      </footer>
    </section>
  );
}