import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";

export default function Home() {
  const projects = [
    {
      title: "AUV/ROV Autonomous System",
      description: "Pengembangan sistem kontrol 6-DoF untuk robot bawah air menggunakan ROS 2 dan simulasi Gazebo.",
      tags: ["ROS 2", "C++", "Gazebo", "ArduSub"],
      link: "https://github.com/tjoyager/Web-Portofolio" // Ganti dengan repo aslinya nanti
    },
    {
      title: "Vision-Based Object Detection",
      description: "Implementasi deteksi objek real-time menggunakan YOLOv11 dan OpenVINO untuk identifikasi target bawah air.",
      tags: ["Python", "YOLOv11", "OpenCV", "OpenVINO"],
      link: "#"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <Hero />
      
      <section id="projects" className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
          <span className="text-blue-500 font-mono text-xl">01.</span> 
          Featured Projects
          <div className="h-[1px] bg-slate-800 flex-grow"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}