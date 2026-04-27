export default function ProjectCard({ title, description, tags, link }: any) {
  return (
    <div className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-xl hover:-translate-y-2 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_10px_30px_-15px_rgba(37,99,235,0.3)]">
      <div className="flex justify-between items-start mb-6">
        <div className="text-blue-500">
          {/* Icon Folder */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <a href={link} target="_blank" className="text-slate-400 hover:text-blue-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {description}
      </p>
      
      <ul className="flex flex-wrap gap-3 mt-auto">
        {tags.map((tag: string) => (
          <li key={tag} className="text-xs font-mono text-blue-400/80 bg-blue-500/10 px-2 py-1 rounded">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}