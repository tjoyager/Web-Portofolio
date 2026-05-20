export interface Aspiration {
  title: string;
  description: string;
}

export interface UpcomingProject {
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  greeting: string;
  roles: string[];
  university: string;
  major: string;
  batch: string;
  summary: string;
  heroDescription: string;
  aspiration: Aspiration;
  upcomingProject: UpcomingProject;
  photo: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  title: string;
  period: string;
  description: string;
}

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  caption?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  gallery?: GalleryItem[];
}

export interface Contact {
  linkedin: string;
  github: string;
  email: string;
}

export interface TerminalLine {
  type: "command" | "output";
  text: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  icon?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar?: string;
}

export interface SyncMeta {
  lastSynced: string;
  source: string;
}

export interface ProfileData {
  profile: Profile;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: ExperienceItem[];
  projects: Project[];
  contact: Contact;
  terminal: TerminalLine[];
  certifications: Certification[];
  testimonials: Testimonial[];
  meta: SyncMeta;
}
