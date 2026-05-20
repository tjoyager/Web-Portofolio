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
import MagneticCursor from "@/components/MagneticCursor";
import SyncBadge from "@/components/SyncBadge";
import GitHubStats from "@/components/GitHubStats";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import SpotifyWidget from "@/components/SpotifyWidget";
import profileData from "@/data/profile-data.json";
import type { ProfileData } from "@/types/profile";

const data = profileData as ProfileData;

export default function Home() {
  return (
    <main className="min-h-screen bg-theme-bg text-theme-text selection:bg-[var(--selection-bg)]">
      <MagneticCursor />
      <ScrollProgress />
      <Spotlight />
      <Navbar />

      {/* 01 - Hero */}
      <Hero 
        name={data.profile.name}
        greeting={data.profile.greeting}
        roles={data.profile.roles}
        university={data.profile.university}
        heroDescription={data.profile.heroDescription}
        photo={data.profile.photo}
      />
      
      {/* 02 - About */}
      <ScrollReveal>
        <About 
          summary={data.profile.summary}
          aspiration={data.profile.aspiration}
          upcomingProject={data.profile.upcomingProject}
          terminal={data.terminal}
        />
      </ScrollReveal>

      {/* 03 - Skills */}
      <ScrollReveal>
        <Skills skills={data.skills} />
      </ScrollReveal>

      {/* 04 - GitHub Stats */}
      <ScrollReveal>
        <GitHubStats username="tjoyager" />
      </ScrollReveal>
      
      {/* 05 - Projects */}
      <section id="portofolio" className="max-w-6xl mx-auto py-20 px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-theme-heading">
            <span className="text-blue-500 font-mono text-xl">04.</span> 
            Proyek
            <div className="h-[1px] bg-theme-border flex-grow"></div>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project, index) => (
            <ScrollReveal key={index}>
              <ProjectCard {...project} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 06 - Experience & Education */}
      <ScrollReveal>
        <Experience 
          experiences={data.experience}
          education={data.education}
        />
      </ScrollReveal>

      {/* 07 - Certifications */}
      <ScrollReveal>
        <Certifications certifications={data.certifications} />
      </ScrollReveal>

      {/* 08 - Testimonials */}
      <ScrollReveal>
        <Testimonials testimonials={data.testimonials} />
      </ScrollReveal>

      {/* 09 - Contact */}
      <ScrollReveal>
        <Contact contact={data.contact} />
      </ScrollReveal>

      {/* Floating widgets */}
      <SyncBadge 
        lastSynced={data.meta.lastSynced}
        source={data.meta.source}
      />
      <SpotifyWidget />
    </main>
  );
}