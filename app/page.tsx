import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Spotlight from "@/components/Spotlight";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  const projects = [
    {
      title: "Mobile App Prototype: Diversity of Nusantara",
      description: "Diversity of Nusantara is a mobile application prototype created with Thunkable. This app focuses on introducing children to Indonesia's diversity. It features child-friendly graphics, animations, and buttons for navigating menus and performing tasks within the app.",
      tags: ["Thunkable", "UI/UX", "Educational"],
      link: "#",
      image: "/1.jpg"
    },
    {
      title: "Mobile App Prototype: EcoCycle",
      description: "This application is present as a smart solution to this problem by integrating digital technology in the management and recycling of household waste.",
      tags: ["Mobile App", "Sustainability", "Technology"],
      link: "#",
      image: "/2.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <ScrollProgress />
      <Spotlight />
      <Navbar />
      <Hero />
      
      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Skills />
      </ScrollReveal>
      
      <section id="portofolio" className="max-w-6xl mx-auto py-20 px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-slate-100">
            <span className="text-blue-500 font-mono text-xl">03.</span> 
            Proyek
            <div className="h-[1px] bg-slate-800 flex-grow"></div>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={index}>
              <ProjectCard {...project} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <Experience />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </main>
  );
}