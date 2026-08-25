import { IconType } from 'react-icons';

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  taglines: string[];
  bio: string;
  bio2: string;
  location: string;
  availability: string;
  email: string;
  resume: string;
  social: SocialLinks;
}

export interface TechStackItem {
  id: number;
  label: string;
  icon: IconType;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  color: string;
  gradient: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  color: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon: string;
}
