import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython } from 'react-icons/fa6';
import { SiTailwindcss, SiNextdotjs, SiCplusplus, SiTypescript, SiC, SiMysql} from 'react-icons/si';
import { PersonalInfo, TechStackItem, Project, Experience, NavLink } from '../types';

// ─── Portfolio Data ───────────────────────────────────────────────
export const personalInfo: PersonalInfo = {
  name: 'Aditia Pratama',
  title: 'Frontend Developer',
  taglines: [
    'Sriwijaya University student',
    'Frontend Developer',
    'Competitive Programmer',
    'AI Engineer wannabe :)',
  ],
  bio: `I am a Computer Science (Informatics Engineering) student with a passion for software development, especially in full-stack web development. I enjoy turning ideas into real products by building responsive, scalable, and user-friendly applications. I continuously improve my skills by learning modern technologies, working on personal projects, and exploring new tools that can make development more efficient.`,
  bio2: `My goal is to become a software engineer who creates impactful digital products while constantly growing as a developer. I believe that consistency, curiosity, and problem-solving are the keys to building great software. Outside of coding, I enjoy competitive programming, learning new technologies, and challenging myself through projects that expand both my technical and creative abilities.`,
  location: 'Ogan Komering Ilir, Indonesia',
  availability: 'Open for Freelance',
  email: 'mhdaditiapratama268@gmail.com',
  resume: 'https://drive.google.com/file/d/18YqR4GFk3YJWnWESvLE5E67uzcOoFHwn/view?usp=sharing',
  social: {
    github: 'https://github.com/aditia-prtm',
    linkedin: 'https://linkedin.com/in/m-aditia-putra-pratama-a3b0bb376/',
    instagram: 'https://instagram.com/adtxprtm_',
    email: 'mailto:mhdaditiapratama268@gmail.com',
  },

};

// ─── Skills ──────────────────────────────────────────────────────
export const techStack: TechStackItem[] = [
  {
    id: 1,
    label: 'HTML',
    icon: FaHtml5,
  },
  {
    id: 2,
    label: 'CSS',
    icon: FaCss3Alt,
  },
  {
    id: 3,
    label: 'Javascript',
    icon: FaJs,
  },
  {
    id: 4,
    label: 'TypeScript',
    icon: SiTypescript,
  },
  {
    id: 5,
    label: 'TailwindCSS',
    icon: SiTailwindcss,
  },
  {
    id: 6,
    label: 'ReactJS',
    icon: FaReact,
  },
  {
    id: 7,
    label: 'NextJS',
    icon: SiNextdotjs,
  },
  {
    id: 8,
    label: 'Java',
    icon: FaJava,
  },
  {
    id: 9,
    label: 'Python',
    icon: FaPython,
  },
  {
    id: 10,
    label: 'C++',
    icon: SiCplusplus,
  },
  {
    id: 11,
    label: 'C',
    icon: SiC,
  },
  {
    id: 12,
    label: 'MySQL',
    icon: SiMysql,
  },
];

export const tools: string[] = [
  'Git',
  'Github',
  'Vercel',
  'Visual Studio Code',
  'Antigravity',
  'Figma',
];

// ─── Projects ─────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: 'SRIFOTON 2026',
    subtitle: 'Sriwijaya Informatics Exhibition',
    description: 'Official website for SRIFOTON, a national annual informatics exhibition and competition by HMIF Unsri.',
    longDescription:
      'Sriwijaya Informatics Exhibition (SRIFOTON) is the largest annual event organized by the Informatics Student Association (HMIF) of Sriwijaya University. As a national-scale event, it serves as a venue for students across Indonesia to compete, learn, and exchange ideas through competitions, workshops, and related programs.',
    tags: ['Next.js', 'Supabase', 'Google Gemini API', 'Groq API'],
    category: 'Event',
    color: '#b8860b',
    gradient: 'from-[#8a6808] via-[#b8860b] to-[#d4af37]',
    image: 'Srifoton.png',
    liveUrl: 'https://srifoton.hmifunsri.com',
    githubUrl: 'private-repository',
    featured: true,
  },
];

// ─── Experience ───────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 1,
    role: 'HMIF UNSRI - PTI Division',
    company: 'Sriwijaya University',
    period: '2025 - 2026',
    type: 'Organization',
    description:
      'Currently exploring front-end web development within the PTI division of HMIF. I am focusing on building responsive user interfaces and applying my skills by developing foundational, hands-on web projects from scratch.',
    highlights: [
      'Built 5+ mini-projects',
      'Exploring TailwindCSS, React.js, and Next.js',
      'Integrated Supabase for database/auth',
      'Focused on writing clean code',
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
      'Selected for the OSN team at senior high school, focusing on competitive programming. I explored advanced concepts like Dynamic Programming, Graph Algorithms, and Segment Trees to solve complex problems while competing directly against top students.',
    highlights: [
      'Top 7 at Province Level 2024 (OSN-P)',
      '2nd Winner at Competitive Programming SRIFOTON 2025',
      'Problem Solving and Algorithm',
      'First introduction to Informatics',
    ],
    color: '#10b981',
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
