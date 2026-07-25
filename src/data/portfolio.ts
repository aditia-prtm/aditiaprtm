import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython} from "react-icons/fa6";
import { SiTailwindcss, SiNextdotjs, SiCplusplus, SiTypescript, SiMysql, SiPostgresql, SiSupabase, SiC} from "react-icons/si";

// ─── Portfolio Data ───────────────────────────────────────────────
// Central data file – edit here to customise the portfolio

export const personalInfo = {
  name: "Aditia Pratama",
  title: "Junior Frontend Developer",
  taglines: [
    "Sriwijaya University student",
    "Junior Frontend Developer", 
    
  ],
  bio: `I am an Computer Science (Informatics Engineering) student with a passion for software development, especially in full-stack web development. I enjoy turning ideas into real products by building responsive, scalable, and user-friendly applications. I continuously improve my skills by learning modern technologies, working on personal projects, and exploring new tools that can make development more efficient.`,
  bio2: `My goal is to become a software engineer who creates impactful digital products while constantly growing as a developer. I believe that consistency, curiosity, and problem-solving are the keys to building great software. Outside of coding, I enjoy competitive programming, learning new technologies, and challenging myself through projects that expand both my technical and creative abilities.`,
  location: "Ogan Komering Ilir, Indonesia",
  availability: "Open for Freelance",
  email: "mhdaditiapratama268@gmail.com",
  resume: "#",
  social: {
    github: "https://github.com/aditia-prtm",
    linkedin: "https://linkedin.com/in/m-aditia-putra-pratama-a3b0bb376/",
    instagram: "https://instagram.com/adtxprtm_",
    email: "mailto:mhdaditiapratama268@gmail.com",
  },
  funFacts: [
    "☕  Powered by specialty coffee",
    "⚽  Enjoying watching and playing football",
    "🎞️  I like watching movies",
  ],
};

// ─── Skills ──────────────────────────────────────────────────────
export const techStack = [
  {
    id : 1, 
    label : "HTML", 
    icon : FaHtml5, 
  },
  {
    id : 2, 
    label : "CSS", 
    icon : FaCss3Alt
  }, 
  {
    id : 3, 
    label : "Javascript", 
    icon : FaJs
  },
  {
    id : 4,
    label : "TypeScript", 
    icon : SiTypescript
  },
  {
    id : 5,
    label : "TailwindCSS", 
    icon : SiTailwindcss, 
  }, 
  {
    id : 6,
    label : "ReactJS", 
    icon : FaReact, 
  }, 
  {
    id : 7, 
    label : "NextJS", 
    icon : SiNextdotjs
  },
  {
    id : 8, 
    label : "Java", 
    icon : FaJava
  },
  {
    id : 9, 
    label : "Python", 
    icon : FaPython
  },
  {
    id : 10, 
    label : "C++", 
    icon : SiCplusplus
  },
  {
    id : 11, 
    label : "C", 
    icon : SiC
  },
  {
    id : 12, 
    label : "MySQL", 
    icon : SiMysql
  },
  {
    id : 13, 
    label : "PostgreSQL", 
    icon : SiPostgresql
  },
  {
    id : 14, 
    label : "Supabase", 
    icon : SiSupabase
  }
];

export const tools = [
  "Git",
  "Github", 
  "Vercel",
  "Visual Studio Code", 
  "Figma"
];

// ─── Projects ─────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "Book Vault",
    subtitle: "Library Management",
    description:
      "Modern dark book management system.",
    longDescription:
      "A personal book management system built with Next.js, TypeScript, Tailwind CSS v4, and Framer Motion. Features full CRUD operations, real-time search, status filtering, multi-criteria sorting, and a collection statistics dashboard — all managed with React useState, no additional state library required. This project will use Supabase soon.",
    tags: ["Next.js", "TailwindCSS"],
    category: "Mini Project",
    color: "#8b5cf6",
    gradient: "from-[#FFD166] via-[#F5A623] to-[#FF4D6D]",
    image: "BookVault.png",
    liveUrl: "https://book-vault-phi.vercel.app/",
    githubUrl: "https://github.com/aditia-prtm/BookVault",
    featured: false,
  },
  {
    id: 2,
    title: "FlashNote",
    subtitle: "A Simple Note-App Web",
    description:
      "My first project with database integration.",
    longDescription:
    "A minimalist notes app built with Next.js and Supabase. Create, edit, and delete personal notes with a clean dark UI.",
    tags: ["Next.js", "TailwindCSS", "Supabase"],
    category: "Mini Project",
    color: "#8b5cf6",
    gradient: "from-[#FFD166] via-[#F5A623] to-[#FF4D6D]",
    image: "FlashNote.png",
    liveUrl: "https://flash-note-two.vercel.app/",
    githubUrl: "https://github.com/aditia-prtm/FlashNote",
    featured: false,
  },
  {
    id: 3,
    title: "Tic-Tac-Toe",
    subtitle: "Play a Game vs Computer",
    description:
      "My first-ever toy project while learning basic HTML.",
    longDescription:
      "A simple web-based Tic-Tac-Toe game. Built entirely with Vanilla JS, it focuses on core looping logic and HTML element manipulation. The game includes a computer opponent that utilizes Math.random() to place its marks.",
    tags: ["HTML", "CSS", "Javascript"],
    category: "Toy Project",
    color: "#8b5cf6",
    gradient: "from-[#FFD166] via-[#F5A623] to-[#FF4D6D]",
    image: "tic-tac-toe.png",
    liveUrl: "https://aditia-prtm.github.io/tic-tac-toe/",
    githubUrl: "https://github.com/aditia-prtm/tic-tac-toe",
    featured: false,
  },
  
];

// ─── Experience ───────────────────────────────────────────────────
export const experiences = [
  {
    id: 1,
    role: "HMIF UNSRI - PTI Division",
    company: "Sriwijaya University",
    period: "2025 - 2026",
    type: "",
    description:
      "Currently exploring front-end web development within the PTI division of HMIF. I am focusing on building responsive user interfaces and applying my skills by developing foundational, hands-on web projects from scratch.",
    highlights: [
      "Built 5+ mini-projects",
      "Exploring TailwindCSS, React.js, and Next.js",
      "Integrated Supabase for database/auth",
      "Focused on writing clean code",
    ],
    color: "#ffc700",
  },
  {
    id: 2,
    role: "National Olympiad (OSN) Team",
    company: "SMA Negeri 1 Jejawi",
    period: "2023 - 2024",
    type: "",
    description:
      "Selected for the OSN team at senior high school, focusing on competitive programming. I explored advanced concepts like Dynamic Programming, Graph Algorithms, and Segment Trees to solve complex problems while competing directly against top students.",
    highlights: [
      "Top 7 Province Level 2024 (OSN-P)",
      "Top 2 Regency Level 2024 (OSN-K)",
      "Problem Solving and Algorithm",
      "First introduction to Informatics",
    ],
    color: "#10b981",
  },
];

// ─── Nav Links ────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "#hero", icon: "Home" },
  { label: "Skills", href: "#skills", icon: "Code2" },
  { label: "Projects", href: "#projects", icon: "Folder" },
  { label: "Experience", href: "#experience", icon: "Briefcase" },
  { label: "Contact", href: "#contact", icon: "Phone" },
];
