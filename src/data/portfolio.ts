import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiPython,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiNextdotjs,
  SiCplusplus,
  SiTypescript,
  SiC,
  SiMysql,
  SiPostgresql,
  SiPandas,
  SiNumpy,
  SiVercel,
  SiFigma
} from '@icons-pack/react-simple-icons';
import { VscVscode } from 'react-icons/vsc';
import { FaJava } from 'react-icons/fa6';
import { PersonalInfo, TechStackItem, Project, Experience, NavLink, TechStackCategory } from '../types';

// ─── Portfolio Data ───────────────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name: 'Aditia Pratama',
  title: 'Frontend Developer',
  taglines: [
    'Informatics Engineering',
    'Frontend Developer',
    'Competitive Programmer',
    'AI Engineer Wannabe :)',
    'Tech Enthusiast',
  ],
  bio: `Informatics Engineering student at`,
  bio2: ` Focused on full-stack web development, aiming to explore Artificial Intelligence and Machine Learning.`,
  location: 'Ogan Komering Ilir, Indonesia',
  availability: 'Open for Freelance',
  email: 'mhdaditiapratama268@gmail.com',
  resume: 'https://drive.google.com/file/d/1J842grmhWYJZO-Dvr_2c-lr3bEbLRg1m/view?usp=sharing',
  social: {
    github: 'https://github.com/aditia-prtm',
    linkedin: 'https://linkedin.com/in/m-aditia-putra-pratama-a3b0bb376/',
    instagram: 'https://instagram.com/adtxprtm_',
    email: 'mailto:mhdaditiapratama268@gmail.com',
  },

};

// ─── Skills ──────────────────────────────────────────────────────
export const techStackCategories: TechStackCategory[] = [
  {
    name: 'FRONTEND & UI',
    items: [
      { id: 1, label: 'HTML', icon: SiHtml5},
      { id: 2, label: 'CSS', icon: SiCss},
      { id: 3, label: 'TailwindCSS', icon: SiTailwindcss},
      { id: 4, label: 'ReactJS', icon: SiReact},
      { id: 5, label: 'NextJS', icon: SiNextdotjs},
      { id: 6, label: 'JavaScript', icon: SiJavascript},
      { id: 7, label: 'TypeScript', icon: SiTypescript},
      { id: 8, label: 'Figma', icon: SiFigma},
    ],
  },
  {
    name: 'DATA & BACKEND',
    items: [
      { id: 1, label: 'Python', icon: SiPython},
      { id: 2, label: 'Pandas', icon: SiPandas},
      { id: 3, label: 'NumPy', icon: SiNumpy},
      { id: 4, label: 'MySQL', icon: SiMysql},
      { id: 5, label: 'PostgreSQL', icon: SiPostgresql},
    ],
  },
  {
    name: 'TOOLS',
    items: [
      { id: 1, label: 'Git', icon: SiGit},
      { id: 2, label: 'GitHub', icon: SiGithub},
      { id: 3, label: 'VS Code', icon: VscVscode},
      { id: 4, label: 'Vercel', icon: SiVercel},
      { id: 5, label: 'C', icon: SiC},
      { id: 6, label: 'C++', icon: SiCplusplus},
      { id: 7, label: 'Java', icon: FaJava},
    ],
  },
];

// Legacy techStack for backward compatibility
export const techStack: TechStackItem[] = techStackCategories.flatMap(cat => cat.items);

// ─── Projects ─────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: 'SRIFOTON 2026',
    subtitle: 'Sriwijaya Informatics Exhibition',
    description: 'Official website for SRIFOTON, a national annual informatics exhibition and competition by HMIF Unsri.',
    longDescription:
      'Sriwijaya Informatics Exhibition (SRIFOTON) is the largest annual event organized by the Informatics Student Association (HMIF) of Sriwijaya University. As a national-scale event, it serves as a venue for students across Indonesia to compete, learn, and exchange ideas through competitions, workshops, and related programs.',
    tags: ['Next.js', 'Supabase', 'Framer-Motion'],
    category: 'Event',
    color: '#b8860b',
    gradient: 'from-[#8a6808] via-[#b8860b] to-[#d4af37]',
    image: 'Srifoton.png',
    liveUrl: 'https://srifoton.hmifunsri.com',
    githubUrl: 'private-code',
    featured: true,
  },
  {
    id: 2,
    title: 'FootyPedia',
    subtitle: 'The Football Database and Encyclopedia',
    description: 'An interactive React-based football data platform powered by TheSportsDB API for exploring and bookmarking player and club statistics.',
    longDescription:
      'FootyPedia is a responsive React web application designed for searching and exploring real-time statistics of football players and clubs worldwide. Powered by TheSportsDB API, the platform features a dynamic favoriting system with segmented controls, skeleton loading states, mobile-first navigation, and fluid UI animations via Framer Motion.',
    tags: ['Next.js', 'TailwindCSS', 'Framer-Motion', 'TheSportsDB REST API'],
    category: 'Self-Project',
    color: '#b8860b',
    gradient: 'from-[#8a6808] via-[#b8860b] to-[#d4af37]',
    image: 'footypedia.png',
    liveUrl: 'https://footypedia-one.vercel.app/',
    githubUrl: 'https://github.com/aditia-prtm/FootyPedia',
    featured: false,
  },
];

// ─── Experience ───────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 1,
    role: 'HMIF UNSRI - PTI Division',
    company: 'Sriwijaya University',
    period: '2026 - Present',
    type: 'Organization',
    description:
      'Exploring front-end web development in HMIF (PTI division), building responsive UIs and hands-on web projects from scratch.',
    highlights: [
      'Built 5+ mini-projects',
      'Exploring TailwindCSS, React.js, and Next.js',
      'Integrated Supabase for database/auth',
    ],
    color: '#ffc700',
  },
  {
    id: 2,
    role: 'National Olympiad (OSN) Team',
    company: 'SMA Negeri 1 Jejawi',
    period: '2023 - 2024',
    type: 'Academic',
    description:
      'OSN Informatics team member competing in advanced algorithms, Dynamic Programming, and Graph theory against top national students.',
    highlights: [
      'Top 7 at Province Level 2024 (OSN-P)',
      '2nd Winner at Competitive Programming SRIFOTON 2025',
      'Problem Solving and Algorithm',
    ],
    color: '#10b981',
    completed: true,
  },
];

// ─── Education ────────────────────────────────────────────────────
export const educations: Experience[] = [
  {
    id: 1,
    role: 'Sriwijaya University',
    company: 'Informatics Engineering',
    period: '2025 - Present',
    type: 'Bachelor',
    description:
      'Focusing on full-stack web development, machine learning, and modern software technologies while actively participating in campus organizations.',
    highlights: [
      'GPA: 3.95 / 4.00',
      'Active member of Academic Divison HMIF',
      'Fullstack Web Development focus',
    ],
    color: '#3b82f6',
  },
  {
    id: 2,
    role: 'SMA Negeri 1 Jejawi',
    company: 'Mathematics & Natural Sciences',
    period: '2022 - 2025',
    type: 'High School',
    description:
      'Completed high school education with a strong emphasis on STEM disciplines, logic, and mathematical fundamentals.',
    highlights: [
      'School record-holder for academic achievement (SIMT)',
      'OSN Informatics competitor (Algorithms & Data Structures)',
      'Competing in regional & national Math/CP competitions',
    ],
    color: '#8b5cf6',
    completed: true,
  },
];

// ─── Nav Links ────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero', icon: 'Home' },
  { label: 'Skills', href: '#skills', icon: 'Code2' },
  { label: 'Projects', href: '#projects', icon: 'Folder' },
  { label: 'Experience', href: '#experience', icon: 'Briefcase' },
  { label: 'Contact', href: '#contact', icon: 'Phone' },
];
